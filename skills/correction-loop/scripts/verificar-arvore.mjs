#!/usr/bin/env node
// Verifica se a árvore de um correction-loop está completa e coerente. Sem dependências.
// Uso: node verificar-arvore.mjs correcao/<nome-curto-do-erro>     (pasta com arvore.md, ou o próprio ficheiro)
// Sai com 0 se está completa; com 1 e a lista do que falta, se não está.

import { readFileSync, existsSync, statSync } from 'node:fs';
import { join, dirname, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const AQUI = dirname(fileURLToPath(import.meta.url));
const PROFUNDIDADE_MAXIMA = 3; // divisões abaixo da raiz
const ESTADOS = new Set(['aberto', 'em curso', 'fechado', 'abandonado']);
const NAO_NO_ULTIMO_NIVEL = new Set(['dividir', 'propagar']);
const DIAGNOSTICO = ['C1', 'C2', 'C3', 'C4', 'C5', 'C6'];
const ORIGENS = new Set(['pedido', 'ambiente', 'assumida', 'pergunta', 'execução']);

const semComentarios = (t) => t.replace(/<!--[\s\S]*?-->/g, '');
const sem = (v) => !v || /^_por definir_$/.test(v.trim());
const paiDe = (id) => id.split('.').slice(0, -1).join('.');

function seccoes(texto) {
  const out = {};
  let atual = '';
  for (const linha of texto.split(/\r?\n/)) {
    const m = linha.match(/^##\s+(.+?)\s*$/);
    if (m) { atual = m[1]; out[atual] = ''; continue; }
    if (atual) out[atual] += linha + '\n';
  }
  return out;
}

function linhasDeTabela(texto = '') {
  return texto.split(/\r?\n/)
    .filter((l) => /^\s*\|/.test(l) && !/^\s*\|[\s:|-]+\|\s*$/.test(l))
    .slice(1)
    .map((l) => l.trim().replace(/^\||\|$/g, '').split(/(?<!\\)\|/).map((c) => c.trim().replace(/\\\|/g, '|')));
}

// Os nomes válidos vêm da terceira coluna da tabela de algoritmos.md, para haver uma só lista.
export function metodosValidos(caminho = join(AQUI, '..', 'algoritmos.md')) {
  const tabela = seccoes(readFileSync(caminho, 'utf8'))['Tabela'];
  return new Set(linhasDeTabela(tabela).map((c) => (c[2] || '').replace(/`/g, '')).filter(Boolean));
}

const origensValidas = (celula = '') => {
  const partes = celula.toLowerCase().split(/\s*,\s*|\s+e\s+/).filter(Boolean);
  return partes.length > 0 && partes.every((p) => ORIGENS.has(p));
};

function verificarDiagnostico(texto) {
  if (texto === undefined) return ['falta a secção «Diagnóstico»'];
  const falhas = [];
  const linhas = new Map(linhasDeTabela(texto).map((c) => [c[0], c]));
  const ids = [...DIAGNOSTICO, ...[...linhas.keys()].filter((id) => /^S\d+$/.test(id))];
  for (const id of ids) {
    const c = linhas.get(id);
    if (!c || sem(c[2])) falhas.push(`diagnóstico: ${id} sem resposta`);
    else if (!origensValidas(c[3])) falhas.push(`diagnóstico: ${id} com origem «${c[3] || 'vazia'}» (pedido, ambiente, assumida, pergunta ou execução)`);
  }
  return falhas;
}

/** @returns {string[]} lista de falhas */
export function verificarArvore(bruto, metodos = metodosValidos()) {
  const falhas = [];
  const texto = semComentarios(bruto);
  const s = seccoes(texto);

  if (/<(objetivo|data)>/.test(texto)) falhas.push('marcadores do modelo por preencher');
  for (const campo of ['Objetivo', 'Critério de sucesso']) {
    const m = (s['Raiz'] || '').match(new RegExp(`\\*\\*${campo}:\\*\\*\\s*(.*)`));
    if (!m || sem(m[1])) falhas.push(`raiz sem «${campo}»`);
  }
  falhas.push(...verificarDiagnostico(s['Diagnóstico']));

  const nos = new Map();
  for (const c of linhasDeTabela(s['Nós'])) {
    const [id, criterio, metodo, dependeDe, estado, prova, memo] = c;
    if (nos.has(id)) { falhas.push(`nó ${id} repetido`); continue; }
    nos.set(id, { id, criterio, metodo, dependeDe, estado: (estado || '').toLowerCase(), prova: prova || '', memo: memo || '' });
  }
  if (!nos.has('1')) { falhas.push('falta o nó raiz (ID 1)'); return falhas; }

  const abandonados = new Map(linhasDeTabela(s['Ramos abandonados']).map((c) => [c[0], c[1] || '']));
  const filhosDe = (id) => [...nos.values()].filter((n) => paiDe(n.id) === id);

  for (const n of nos.values()) {
    if (!/^1(\.\d+)*$/.test(n.id)) { falhas.push(`nó ${n.id}: ID inválido (esperado 1, 1.2, 1.2.3)`); continue; }
    const nivel = n.id.split('.').length - 1;
    if (nivel > PROFUNDIDADE_MAXIMA) falhas.push(`nó ${n.id}: está ${nivel} divisões abaixo da raiz (máximo ${PROFUNDIDADE_MAXIMA})`);
    if (n.id !== '1' && !nos.has(paiDe(n.id))) falhas.push(`nó ${n.id}: o pai ${paiDe(n.id)} não existe`);
    if (!n.criterio) falhas.push(`nó ${n.id} sem critério`);
    if (!metodos.has(n.metodo)) falhas.push(`nó ${n.id}: método «${n.metodo || 'vazio'}» não está na tabela de algoritmos.md`);
    else if (nivel === PROFUNDIDADE_MAXIMA && NAO_NO_ULTIMO_NIVEL.has(n.metodo)) falhas.push(`nó ${n.id}: no último nível não se divide mais`);
    if (!ESTADOS.has(n.estado)) { falhas.push(`nó ${n.id}: estado «${n.estado || 'vazio'}» inválido`); continue; }
    for (const d of (n.dependeDe || '').split(/[,;]\s*/).filter((x) => x && !/^(-|–|—|nenhum)$/i.test(x))) {
      if (!nos.has(d)) falhas.push(`nó ${n.id}: depende de ${d}, que não existe`);
    }

    const filhos = filhosDe(n.id);
    if (n.estado === 'aberto' || n.estado === 'em curso') falhas.push(`nó ${n.id} ainda está «${n.estado}»`);
    if (n.estado === 'abandonado' && !abandonados.get(n.id)) falhas.push(`nó ${n.id} abandonado sem razão em «Ramos abandonados»`);
    if (n.estado === 'fechado') {
      if (!n.prova) falhas.push(`nó ${n.id} fechado sem prova`);
      const porFechar = filhos.filter((f) => f.estado !== 'fechado' && f.estado !== 'abandonado');
      if (porFechar.length) falhas.push(`nó ${n.id} fechado com filhos por fechar (${porFechar.map((f) => f.id).join(', ')})`);
      if (filhos.length && filhos.every((f) => f.estado === 'abandonado')) falhas.push(`nó ${n.id} fechado só com filhos abandonados`);
    }
  }

  // Memo: com a mesma chave, só um nó traz prova própria; os outros reutilizam-na.
  const porChave = new Map();
  for (const n of nos.values()) {
    if (n.estado !== 'fechado' || !n.memo || n.memo === '-') continue;
    const reutiliza = n.prova.match(/^reutiliza\s+([\d.]+)/i);
    if (reutiliza) {
      const origem = nos.get(reutiliza[1].replace(/\.$/, ''));
      if (!origem || origem.estado !== 'fechado') falhas.push(`nó ${n.id}: reutiliza ${reutiliza[1]}, que não existe ou não está fechado`);
      else if (origem.memo !== n.memo) falhas.push(`nó ${n.id}: reutiliza ${origem.id}, que tem outra chave de memo`);
      continue;
    }
    porChave.set(n.memo, [...(porChave.get(n.memo) || []), n.id]);
  }
  for (const [chave, ids] of porChave) {
    if (ids.length > 1) falhas.push(`chave de memo «${chave}» resolvida ${ids.length} vezes (${ids.join(', ')}): só um nó traz a prova, os outros reutilizam-na`);
  }

  const estado = ((texto.match(/\*\*Estado:\*\*\s*(.+)/) || [])[1] || '').trim();
  const linha = (s['Aceitação'] || '').split(/\r?\n/).find((l) => /aceite por/i.test(l)) || '';
  if (!/^\s*-\s*\[[xX]\]/.test(linha)) falhas.push('aceitação da correção por marcar');
  else if (!/aceite por:\s*(?!_por definir_)\S.*,\s*em\s*(?!_por definir_)\S/i.test(linha)) falhas.push('aceitação sem nome e data');
  if (/^Concluído$/i.test(estado) && nos.get('1').estado !== 'fechado') falhas.push('estado «Concluído» com a raiz por fechar');

  return falhas;
}

if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) {
  const alvo = process.argv[2];
  if (!alvo) { console.error('Uso: node verificar-arvore.mjs correcao/<nome-curto-do-erro>'); process.exit(2); }
  let caminho = resolve(alvo);
  if (existsSync(caminho) && statSync(caminho).isDirectory()) caminho = join(caminho, 'arvore.md');
  if (!existsSync(caminho)) { console.log(`✗ Árvore incompleta (1 falha(s)):\n  - ${caminho}: ficheiro em falta`); process.exit(1); }
  const falhas = verificarArvore(readFileSync(caminho, 'utf8'));
  if (falhas.length) {
    console.log(`✗ Árvore incompleta (${falhas.length} falha(s)):`);
    for (const f of falhas) console.log(`  - ${f}`);
    process.exit(1);
  }
  console.log('✓ Árvore verificada: diagnóstico completo, todos os nós fechados com prova, ramos abandonados com razão, correção aceite.');
}

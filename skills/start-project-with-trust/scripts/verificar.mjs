#!/usr/bin/env node
// Verifica se um arranque está completo. Sem dependências.
// Uso: node verificar.mjs arranque/<projeto>             (plano: marco «Plano aprovado»)
//      node verificar.mjs arranque/<projeto> --entrega   (plano e entrega: estado «Concluído»)
// Sai com 0 se está completo; com 1 e a lista do que falta, se não está.

import { readFileSync, existsSync } from 'node:fs';
import { join, dirname, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const AQUI = dirname(fileURLToPath(import.meta.url));
const DOCUMENTOS = ['objetivo.md', 'necessidades.md', 'plano.md', 'custo-beneficio.md'];
const FECHADOS = new Set(['respondida', 'assumida']);

const semComentarios = (t) => t.replace(/<!--[\s\S]*?-->/g, '');

// Devolve { titulo -> texto } para as secções "## " de um documento.
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

// Linhas de dados de uma tabela Markdown, como listas de células.
function linhasDeTabela(texto = '') {
  return texto.split(/\r?\n/)
    .filter((l) => /^\s*\|/.test(l) && !/^\s*\|[\s:|-]+\|\s*$/.test(l))
    .slice(1) // cabeçalho
    .map((l) => l.trim().replace(/^\||\|$/g, '').split('|').map((c) => c.trim()));
}

function cabecalhoDeTabela(texto = '') {
  const l = texto.split(/\r?\n/).find((x) => /^\s*\|/.test(x));
  return l ? l.trim().replace(/^\||\|$/g, '').split('|').map((c) => c.trim()) : [];
}

function ler(pasta, nome, substituir) {
  if (nome in substituir) return substituir[nome];
  const p = join(pasta, nome);
  return existsSync(p) ? readFileSync(p, 'utf8') : null;
}

// Estado de cada pergunta (P e S) registada em objetivo.md.
function estadosDasPerguntas(objetivo) {
  const obj = seccoes(semComentarios(objetivo));
  const estados = new Map();
  for (const c of linhasDeTabela(obj['Perguntas obrigatórias'])) estados.set(c[0], (c[2] || '').toLowerCase());
  for (const c of linhasDeTabela(obj['Perguntas de seguimento'])) estados.set(c[0], (c[3] || '').toLowerCase());
  return estados;
}

const POR_DEFINIR = /^\s*_por definir_\s*$/;

/**
 * Rastreabilidade: cada ação, decisão e o orquestrador respondem a perguntas (P/S) que existem e estão fechadas;
 * com `cobertura`, todas as perguntas obrigatórias têm pelo menos uma ação ou decisão que lhes responde.
 * @returns {string[]} lista de falhas
 */
export function verificarRastreabilidade(pasta, substituir = {}, { cobertura = true } = {}) {
  const falhas = [];
  const objetivo = ler(pasta, 'objetivo.md', substituir);
  if (!objetivo) return falhas;
  const estados = estadosDasPerguntas(objetivo);
  const referidos = new Set();

  const verificarRefs = (onde, valor) => {
    const ids = (valor || '').match(/\b[PS]\d+\b/g) || [];
    if (!ids.length) { falhas.push(`${onde}: sem «Responde a» (indica as perguntas P/S a que responde)`); return; }
    for (const id of ids) {
      referidos.add(id);
      if (!estados.has(id)) falhas.push(`${onde}: «Responde a» cita ${id}, que não existe em objetivo.md`);
      else if (!FECHADOS.has(estados.get(id))) falhas.push(`${onde}: apoia-se em ${id}, que ainda está «${estados.get(id) || 'sem estado'}»`);
    }
  };

  const plano = ler(pasta, 'plano.md', substituir);
  if (plano) {
    const acoes = seccoes(semComentarios(plano))['Ações'];
    const linhas = linhasDeTabela(acoes);
    const col = cabecalhoDeTabela(acoes).findIndex((h) => /responde a/i.test(h));
    if (linhas.length && col < 0) falhas.push('plano.md: a tabela «Ações» não tem a coluna «Responde a»');
    else for (const c of linhas) verificarRefs(`plano.md: ação ${c[0]}`, c[col]);
  }

  const cb = ler(pasta, 'custo-beneficio.md', substituir);
  if (cb) {
    const s = seccoes(semComentarios(cb));
    const decisoes = (s['Decisões'] || '').split(/^###\s+/m).slice(1);
    for (const bloco of decisoes) {
      const titulo = bloco.split(/\r?\n/)[0].trim();
      if (/<decisão>/.test(titulo)) continue; // modelo ainda por preencher
      const m = bloco.match(/\*\*Responde a:\*\*(.*)/);
      if (!m) falhas.push(`custo-beneficio.md: decisão «${titulo}» sem linha «**Responde a:**»`);
      else if (POR_DEFINIR.test(m[1]) && !cobertura) continue;
      else verificarRefs(`custo-beneficio.md: decisão «${titulo}»`, m[1]);
    }
    const orq = (s['Orquestrador'] || '').match(/\*\*Responde a:\*\*(.*)/);
    if (orq && !(POR_DEFINIR.test(orq[1]) && !cobertura)) verificarRefs('custo-beneficio.md: Orquestrador', orq[1]);
  }

  if (cobertura) {
    for (const id of idsObrigatorios()) {
      if (!referidos.has(id)) falhas.push(`rastreabilidade: ${id} não tem nenhuma ação, decisão ou orquestrador que lhe responda`);
    }
  }
  return falhas;
}

function idsObrigatorios() {
  for (const p of [join(AQUI, 'PERGUNTAS.md'), join(AQUI, '..', 'PERGUNTAS.md')]) {
    if (existsSync(p)) {
      return linhasDeTabela(readFileSync(p, 'utf8')).map((c) => c[0]).filter((id) => /^P\d+$/.test(id));
    }
  }
  throw new Error('PERGUNTAS.md não encontrado junto do verificador.');
}

/**
 * @param {string} pasta  pasta do arranque (arranque/<projeto>)
 * @param {Record<string,string>} [substituir]  conteúdos a usar em vez dos ficheiros (usado pelo hook)
 * @returns {string[]} lista de falhas; vazia se o arranque está completo
 */
export function verificar(pasta, substituir = {}) {
  const falhas = [];
  const docs = {};
  for (const nome of DOCUMENTOS) {
    if (nome in substituir) { docs[nome] = substituir[nome]; continue; }
    const p = join(pasta, nome);
    if (!existsSync(p)) { falhas.push(`${nome}: ficheiro em falta`); continue; }
    docs[nome] = readFileSync(p, 'utf8');
  }
  if (!docs['objetivo.md']) return falhas;

  for (const [nome, bruto] of Object.entries(docs)) {
    const texto = semComentarios(bruto);
    const porDefinir = (texto.match(/_por definir_/g) || []).length;
    if (porDefinir) falhas.push(`${nome}: ${porDefinir} campo(s) «por definir»`);
    const marcadores = texto.match(/<(projeto|data|decisão)>/g);
    if (marcadores) falhas.push(`${nome}: marcadores do modelo por preencher (${[...new Set(marcadores)].join(', ')})`);
    for (const l of texto.split(/\r?\n/)) {
      if (/^\s*-\s*\[ \]\s*Validado/i.test(l)) falhas.push(`${nome}: validação do utilizador por marcar`);
    }
  }

  const obj = seccoes(semComentarios(docs['objetivo.md']));
  const assumidas = [];

  // Perguntas obrigatórias: todas presentes e fechadas.
  const obrig = linhasDeTabela(obj['Perguntas obrigatórias']);
  const porId = new Map(obrig.map((c) => [c[0], c]));
  for (const id of idsObrigatorios()) {
    const c = porId.get(id);
    if (!c) { falhas.push(`objetivo.md: pergunta obrigatória ${id} não está na tabela`); continue; }
    const estado = (c[2] || '').toLowerCase();
    if (!FECHADOS.has(estado)) falhas.push(`objetivo.md: ${id} está «${c[2] || 'sem estado'}»`);
    if (estado === 'assumida') assumidas.push(id);
    if (FECHADOS.has(estado) && !(c[3] || '').trim()) falhas.push(`objetivo.md: ${id} está fechada mas sem resposta registada`);
  }

  // Perguntas de seguimento: todas fechadas.
  for (const c of linhasDeTabela(obj['Perguntas de seguimento'])) {
    const estado = (c[3] || '').toLowerCase();
    if (!FECHADOS.has(estado)) falhas.push(`objetivo.md: seguimento ${c[0]} está «${c[3] || 'sem estado'}»`);
    if (estado === 'assumida') assumidas.push(c[0]);
  }

  // Cada pergunta assumida tem o pressuposto registado.
  const pressupostos = new Set(linhasDeTabela(obj['Pressupostos aceites']).map((c) => c[1]));
  for (const id of assumidas) {
    if (!pressupostos.has(id)) falhas.push(`objetivo.md: ${id} está «assumida» mas não tem linha em «Pressupostos aceites»`);
  }

  // Confirmação final marcada, com nome e data.
  const conf = obj['Confirmação final'] || '';
  const linhaConf = conf.split(/\r?\n/).find((l) => /Entendimento comum/i.test(l)) || '';
  if (!/^\s*-\s*\[[xX]\]/.test(linhaConf)) falhas.push('objetivo.md: confirmação final do utilizador por marcar');
  else if (!/confirmado por:\s*\S.*,\s*em\s*\S/i.test(linhaConf)) falhas.push('objetivo.md: confirmação final sem nome e data');

  // Os planos têm conteúdo.
  if (docs['plano.md'] && linhasDeTabela(seccoes(docs['plano.md'])['Ações']).length === 0) falhas.push('plano.md: tabela «Ações» vazia');
  if (docs['custo-beneficio.md']) {
    const sessoes = seccoes(semComentarios(docs['custo-beneficio.md']))['Sessões'];
    const linhas = linhasDeTabela(sessoes);
    const colTipo = cabecalhoDeTabela(sessoes).findIndex((h) => /^tipo$/i.test(h));
    if (linhas.length === 0) falhas.push('custo-beneficio.md: tabela «Sessões» vazia');
    else if (colTipo < 0) falhas.push('custo-beneficio.md: tabela «Sessões» sem a coluna «Tipo»');
    else if (!linhas.some((c) => /orquestrador/i.test(c[colTipo] || ''))) falhas.push('custo-beneficio.md: nenhuma sessão do tipo «orquestrador»');
    for (const obrigatoria of ['Publicação e exposição', 'Adotar ou construir', 'Execução em paralelo']) {
      if (!new RegExp(`^###\\s+D\\d+\\s+[—-]\\s+${obrigatoria}`, 'mi').test(docs['custo-beneficio.md'])) falhas.push(`custo-beneficio.md: falta a decisão «${obrigatoria}»`);
    }
  }

  // Cada decisão responde a um pedido, e cada pedido tem resposta.
  falhas.push(...verificarRastreabilidade(pasta, substituir, { cobertura: true }));

  falhas.push(...segredosEmAcessos(pasta, substituir));
  return falhas;
}

// Padrões de segredos que nunca podem estar no inventário de acessos.
const SEGREDOS = [
  [/-----BEGIN [A-Z ]*PRIVATE KEY-----/, 'chave privada'],
  [/\b(password|passwd|pwd|senha|palavra-passe|token|secret|segredo)\s*[:=]\s*[^\s|`]{4,}/i, 'password ou token em texto'],
  [/\bAKIA[0-9A-Z]{16}\b/, 'chave de acesso AWS'],
  [/\bgh[pousr]_[A-Za-z0-9]{30,}\b/, 'token do GitHub'],
  [/\bsk-[A-Za-z0-9_-]{20,}\b/, 'chave de API'],
];

function segredosEmAcessos(pasta, substituir = {}) {
  const texto = ler(pasta, 'acessos.md', substituir);
  if (!texto) return [];
  const falhas = [];
  texto.split(/\r?\n/).forEach((l, i) => {
    for (const [re, tipo] of SEGREDOS) if (re.test(l)) falhas.push(`acessos.md, linha ${i + 1}: parece conter um segredo (${tipo}); guarda-o no cofre e deixa só a referência`);
  });
  return falhas;
}

/**
 * Entrega: cada ação do plano foi executada e verificada com prova, a publicação e os acessos
 * estão verificados (ou justificados como não aplicáveis) e o utilizador aceitou a entrega.
 * @returns {string[]} lista de falhas
 */
export function verificarEntrega(pasta, substituir = {}) {
  const bruto = ler(pasta, 'entrega.md', substituir);
  if (!bruto) return ['entrega.md: ficheiro em falta'];
  const falhas = [];
  const texto = semComentarios(bruto);
  const porDefinir = (texto.match(/_por definir_/g) || []).length;
  if (porDefinir) falhas.push(`entrega.md: ${porDefinir} campo(s) «por definir»`);
  if (/<(projeto|data)>/.test(texto)) falhas.push('entrega.md: marcadores do modelo por preencher');
  const s = seccoes(texto);

  const plano = ler(pasta, 'plano.md', substituir);
  const acoes = plano ? linhasDeTabela(seccoes(semComentarios(plano))['Ações']).map((c) => c[0]) : [];
  const execucao = new Map(linhasDeTabela(s['Execução']).map((c) => [c[0], c]));
  const verificacao = new Map(linhasDeTabela(s['Verificação']).map((c) => [c[0], c]));
  for (const n of acoes) {
    const e = execucao.get(n);
    if (!e) falhas.push(`entrega.md: ação ${n} sem linha em «Execução»`);
    else if (!/^feito$/i.test(e[1] || '')) falhas.push(`entrega.md: ação ${n} está «${e[1] || 'sem estado'}» na execução`);
    const v = verificacao.get(n);
    if (!v) { falhas.push(`entrega.md: ação ${n} sem linha em «Verificação»`); continue; }
    if (!(v[2] || '').trim()) falhas.push(`entrega.md: ação ${n} sem prova`);
    if (!/✓/.test(v[3] || '')) falhas.push(`entrega.md: ação ${n} com resultado «${v[3] || 'vazio'}» (tem de ser ✓)`);
  }

  const naoAplicavel = (t = '') => /Não aplicável:\s*\S/i.test(t);
  const pub = s['Publicação'] || '';
  if (!/✓ Publicação verificada/.test(pub) && !naoAplicavel(pub)) {
    falhas.push('entrega.md: «Publicação» sem a saída «✓ Publicação verificada» de verificar-publicacao.mjs, nem «Não aplicável:» com a razão');
  }

  const acessos = s['Acessos'] || '';
  if (!naoAplicavel(acessos)) {
    const inventario = ler(pasta, 'acessos.md', substituir);
    if (!/acessos\.md/.test(acessos)) falhas.push('entrega.md: «Acessos» sem referência a acessos.md, nem «Não aplicável:» com a razão');
    else if (!inventario) falhas.push('acessos.md: ficheiro em falta');
    else if (!linhasDeTabela(seccoes(semComentarios(inventario))['Acessos']).length) falhas.push('acessos.md: tabela «Acessos» vazia');
  }

  const linha = (s['Aceitação'] || '').split(/\r?\n/).find((l) => /Entrega aceite/i.test(l)) || '';
  if (!/^\s*-\s*\[[xX]\]/.test(linha)) falhas.push('entrega.md: aceitação da entrega pelo utilizador por marcar');
  else if (!/aceite por:\s*\S.*,\s*em\s*\S/i.test(linha)) falhas.push('entrega.md: aceitação sem nome e data');

  return falhas;
}

if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) {
  const pasta = process.argv[2];
  const entrega = process.argv.includes('--entrega');
  if (!pasta) { console.error('Uso: node verificar.mjs arranque/<projeto> [--entrega]'); process.exit(2); }
  const falhas = verificar(resolve(pasta));
  if (entrega) falhas.push(...verificarEntrega(resolve(pasta)));
  if (falhas.length) {
    console.log(`✗ ${entrega ? 'Entrega incompleta' : 'Arranque incompleto'} (${falhas.length} falha(s)):`);
    for (const f of falhas) console.log(`  - ${f}`);
    process.exit(1);
  }
  if (entrega) console.log('✓ Entrega verificada: cada ação feita e provada, publicação e acessos verificados, entrega aceite.');
  else console.log('✓ Arranque completo: todas as perguntas fechadas, documentos preenchidos e validados, confirmação registada.');
}

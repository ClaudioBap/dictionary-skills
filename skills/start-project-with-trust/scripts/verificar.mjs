#!/usr/bin/env node
// Verifica se um arranque está completo. Sem dependências.
// Uso: node verificar.mjs arranque/<projeto>
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
  if (docs['custo-beneficio.md'] && linhasDeTabela(seccoes(docs['custo-beneficio.md'])['Sessões']).length === 0) falhas.push('custo-beneficio.md: tabela «Sessões» vazia');

  return falhas;
}

if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) {
  const pasta = process.argv[2];
  if (!pasta) { console.error('Uso: node verificar.mjs arranque/<projeto>'); process.exit(2); }
  const falhas = verificar(resolve(pasta));
  if (falhas.length) {
    console.log(`✗ Arranque incompleto (${falhas.length} falha(s)):`);
    for (const f of falhas) console.log(`  - ${f}`);
    process.exit(1);
  }
  console.log('✓ Arranque completo: todas as perguntas fechadas, documentos preenchidos e validados, confirmação registada.');
}

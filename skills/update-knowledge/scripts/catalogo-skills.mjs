#!/usr/bin/env node
// O catálogo das skills. Cada skill diz no metadata do SKILL.md se é mãe ou sub (`tipo`), que skills usa (`usa`) e o
// impacto nas cinco áreas (`impacto`, de 0 a 10), diz na descrição se é mãe ou sub, e tem um EXEMPLOS.md com
// «Quando usar». Este script verifica-o e escreve a tabela do README entre <!-- skills:inicio --> e <!-- skills:fim -->.
// Uma skill nova que não traga tudo faz falhar a verificação: o que se acrescenta fica igual ao que já existe.
// Uso: node catalogo-skills.mjs <raiz do repositório> [--verificar]

import { existsSync, readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const RAIZ = process.argv[2];
const VERIFICAR = process.argv.includes('--verificar');
if (!RAIZ || !existsSync(join(RAIZ, 'skills'))) { console.error('Uso: node catalogo-skills.mjs <raiz do repositório> [--verificar]'); process.exit(2); }

const AREAS = [['ia', 'IA'], ['seguranca', 'Segurança'], ['nuvem', 'Nuvem'], ['desenvolvimento', 'Desenvolvimento'], ['web', 'Web']];
const sem = (t) => t.normalize('NFD').replace(/\p{M}/gu, '').toLowerCase();
const nomes = readdirSync(join(RAIZ, 'skills')).filter((n) => existsSync(join(RAIZ, 'skills', n, 'SKILL.md'))).sort();
const falhas = [];

function cabecalho(texto) {
  const m = texto.replace(/^﻿/, '').match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!m) return null;
  const linhas = m[1].split(/\r?\n/);
  const descricao = (linhas.find((l) => l.startsWith('description:')) ?? '').slice(12).trim().replace(/^"(.*)"$/, '$1');
  const meta = {};
  const i = linhas.findIndex((l) => /^metadata:\s*$/.test(l));
  if (i >= 0) for (const l of linhas.slice(i + 1)) {
    const c = l.match(/^\s+([\w-]+):\s*(.*?)\s*$/);
    if (!c) break;
    meta[c[1]] = c[2];
  }
  return { descricao, meta };
}

const skills = [];
for (const nome of nomes) {
  const c = cabecalho(readFileSync(join(RAIZ, 'skills', nome, 'SKILL.md'), 'utf8'));
  if (!c) { falhas.push(`${nome}: o SKILL.md não tem cabeçalho`); continue; }
  const tipo = sem(c.meta.tipo ?? '');
  if (tipo !== 'mae' && tipo !== 'sub') falhas.push(`${nome}: metadata.tipo tem de ser «mãe» ou «sub»`);
  const frase = tipo === 'mae' ? 'skill mae' : 'sub skill';
  if ((tipo === 'mae' || tipo === 'sub') && !sem(c.descricao).includes(frase)) falhas.push(`${nome}: a descrição tem de dizer «${tipo === 'mae' ? 'skill mãe' : 'sub skill'}»`);
  let usa = null;
  const u = (c.meta.usa ?? '').trim();
  if (u === 'todas') {
    usa = 'todas';
    if (tipo !== 'mae') falhas.push(`${nome}: só uma skill mãe pode usar «todas»`);
  } else if (/^\[.*\]$/.test(u)) {
    usa = u.slice(1, -1).split(',').map((x) => x.trim()).filter(Boolean);
    for (const x of usa) if (x === nome || !nomes.includes(x)) falhas.push(`${nome}: metadata.usa tem «${x}», que não é outra skill deste repositório`);
  } else falhas.push(`${nome}: metadata.usa tem de ser uma lista ([a, b], ou [] sem nenhuma) ou «todas»`);
  const impacto = {};
  const im = (c.meta.impacto ?? '').match(/^\{(.*)\}$/);
  for (const par of im ? im[1].split(',') : []) {
    const p = par.match(/^\s*([\w]+)\s*:\s*(\d+)\s*$/);
    if (p) impacto[p[1]] = Number(p[2]);
  }
  for (const [k] of AREAS) if (!(Number.isInteger(impacto[k]) && impacto[k] >= 0 && impacto[k] <= 10)) falhas.push(`${nome}: metadata.impacto.${k} tem de ser um número de 0 a 10`);
  const exemplos = join(RAIZ, 'skills', nome, 'EXEMPLOS.md');
  const quando = existsSync(exemplos) ? readFileSync(exemplos, 'utf8').match(/^## Quando usar\s*\n+((?:- .*\n?)+)/m) : null;
  if (!quando) falhas.push(`${nome}: falta o EXEMPLOS.md com a secção «Quando usar» e pelo menos um caso`);
  skills.push({ nome, tipo, usa, impacto, estado: c.meta.estado ?? 'testes' });
}

const celulaUsa = (s) => s.usa === 'todas' ? 'qualquer uma' : s.usa?.length ? s.usa.map((x) => `\`${x}\``).join(', ') : 'nenhuma';
const ordem = [...skills].sort((a, b) => (a.tipo === 'mae' ? 0 : 1) - (b.tipo === 'mae' ? 0 : 1) || a.nome.localeCompare(b.nome));
const tabela = [
  `| Skill | Tipo | Usa | ${AREAS.map(([, t]) => t).join(' | ')} |`,
  `|---|---|---|${AREAS.map(() => '---:').join('|')}|`,
  ...ordem.map((s) => `| \`${s.nome}\` | ${s.tipo === 'mae' ? 'mãe' : 'sub'} | ${celulaUsa(s)} | ${AREAS.map(([k]) => s.impacto[k] ?? '').join(' | ')} |`),
].join('\n');

const readme = join(RAIZ, 'README.md');
const texto = readFileSync(readme, 'utf8');
const bloco = /(<!-- skills:inicio -->)[\s\S]*?(<!-- skills:fim -->)/;
if (!bloco.test(texto)) falhas.push('README.md: faltam as marcas <!-- skills:inicio --> e <!-- skills:fim -->');
const novo = texto.replace(bloco, `$1\n${tabela}\n$2`);

if (VERIFICAR) {
  if (novo !== texto) falhas.push('README.md: a tabela das skills está desatualizada; corre «node catalogo-skills.mjs <raiz>»');
  if (falhas.length) { for (const f of falhas) console.log(f); process.exit(1); }
  console.log(`✓ ${skills.length} skills com tipo, usa, impacto e «Quando usar»; tabela do README atualizada.`);
} else {
  if (falhas.length) { for (const f of falhas) console.log(`✗ ${f}`); process.exit(1); }
  if (novo !== texto) writeFileSync(readme, novo);
  console.log(`✓ ${skills.length} skills; tabela do README ${novo !== texto ? 'escrita' : 'já estava certa'}.`);
}

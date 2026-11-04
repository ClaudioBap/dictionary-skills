#!/usr/bin/env node
// Reconstrói as listas de entradas de knowledge/INDEX.md e de cada <secção>/README.md
// a partir dos próprios ficheiros (título, resumo e páginas no frontmatter).
// Mantém a ordem existente, acrescenta entradas novas no fim da secção e retira as apagadas.
// Uso: node indice.mjs <pasta knowledge> [--verificar]   (--verificar: não escreve; sai com 1 se estiver desatualizado)

import { readFileSync, writeFileSync, readdirSync, existsSync, statSync } from 'node:fs';
import { join } from 'node:path';

const K = process.argv[2];
const SO_VERIFICAR = process.argv.includes('--verificar');
if (!K || !existsSync(join(K, 'INDEX.md'))) { console.error('Uso: node indice.mjs <pasta knowledge> [--verificar]'); process.exit(2); }

const PDF = 'Dicionario-Boas-Praticas.pdf';
const ler = (p) => readFileSync(p, 'utf8').replace(/\r\n/g, '\n');

function entrada(sec, slug) {
  const t = ler(join(K, sec, slug + '.md'));
  const fm = (t.match(/^---\n([\s\S]*?)\n---/) || [])[1] || '';
  const campo = (n) => ((fm.match(new RegExp('^' + n + ':\\s*(.*)$', 'm')) || [])[1] || '').trim();
  const titulo = campo('titulo').replace(/^"|"$/g, '').replace(/\\"/g, '"');
  const paginas = campo('paginas').replace(/^\[|\]$/g, '').trim();
  const resumo = ((t.match(/^\*\*Resumo:\*\* (.*)$/m) || [])[1] || '').trim();
  const fonte = campo('fonte').replace(/^"|"$/g, '');
  return { titulo, paginas, resumo, fonte };
}
const pm = (p) => (p === '' ? 'fora do PDF' : (p.includes(',') ? 'págs. ' : 'pág. ') + p);
const linha = (e, link) => `- [${e.titulo}](${link}) — ${e.resumo} *(${pm(e.paginas)})*`;

const seccoes = readdirSync(K).filter((d) => statSync(join(K, d)).isDirectory() && existsSync(join(K, d, 'README.md')));
const alterados = [];
let nPdf = 0, nFora = 0, nRefs = 0;
const listaPorSeccao = {};

for (const sec of seccoes) {
  const readme = ler(join(K, sec, 'README.md'));
  const [cabeca, corpo = ''] = readme.split(/^## Entradas\n/m);
  const ficheiros = new Set(readdirSync(join(K, sec)).filter((f) => f.endsWith('.md') && f !== 'README.md' && f !== 'ATUALIZACOES.md' && f !== 'ATUALIZACOES-ARQUIVO.md').map((f) => f.slice(0, -3)));
  const itens = [];
  // Ordem existente
  for (const m of corpo.matchAll(/^- \[[^\]]*\]\(([^)]+)\.md\)/gm)) {
    const alvo = m[1];
    if (alvo.startsWith('../')) { // referência a entrada noutra secção
      const [s2, slug2] = alvo.slice(3).split('/');
      if (existsSync(join(K, s2, slug2 + '.md'))) { itens.push({ ref: true, sec: s2, slug: slug2 }); nRefs++; }
    } else if (ficheiros.has(alvo)) { itens.push({ sec, slug: alvo }); ficheiros.delete(alvo); }
  }
  // Entradas novas, no fim
  for (const slug of [...ficheiros].sort()) itens.push({ sec, slug });

  const linhas = itens.map((it) => {
    const e = entrada(it.sec, it.slug);
    if (!it.ref) { if (e.fonte === PDF) nPdf++; else nFora++; }
    return linha(e, it.ref ? `../${it.sec}/${it.slug}.md` : `${it.slug}.md`);
  });
  listaPorSeccao[sec] = itens;
  const novo = cabeca + '## Entradas\n\n' + linhas.join('\n') + '\n';
  if (novo !== readme) { alterados.push(`${sec}/README.md`); if (!SO_VERIFICAR) writeFileSync(join(K, sec, 'README.md'), novo); }
}

// INDEX.md: cabeçalhos das secções (contagem) e listas
let index = ler(join(K, 'INDEX.md'));
const original = index;
index = index.replace(/^(### \d+\. \[[^\]]+\]\(([^/]+)\/README\.md\) — .*?\()(\d+)( entradas\))\n\n((?:- .*\n?)*)/gm, (todo, ini, sec, _n, fim) => {
  const itens = listaPorSeccao[sec];
  if (!itens) return todo;
  const linhas = itens.map((it) => linha(entrada(it.sec, it.slug), `${it.sec}/${it.slug}.md`));
  return `${ini}${itens.length}${fim}\n\n${linhas.join('\n')}\n`;
});
const totalFicheiros = nPdf + nFora;
index = index.replace(/^- Totais: .*$/m,
  `- Totais: ${seccoes.length} secções; ${nPdf + nRefs} entradas do PDF em ${nPdf} ficheiros; ${nFora} entradas fora do PDF; ${totalFicheiros} ficheiros de entrada no total.`);
// Secções novas que ainda não estão no INDEX
for (const sec of seccoes) if (!new RegExp(`\\]\\(${sec}/README\\.md\\)`).test(index)) console.error(`AVISO: a secção ${sec} não está no INDEX.md; acrescenta o cabeçalho à mão.`);
if (index !== original) { alterados.push('INDEX.md'); if (!SO_VERIFICAR) writeFileSync(join(K, 'INDEX.md'), index); }

if (SO_VERIFICAR) {
  if (alterados.length) { console.log(`✗ Índice desatualizado: ${alterados.join(', ')}`); process.exit(1); }
  console.log('✓ Índice e README atualizados.');
} else {
  console.log(alterados.length ? `Atualizados: ${alterados.join(', ')}` : 'Nada a atualizar.');
}

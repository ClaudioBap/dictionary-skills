// Pesquisa leve (BM25, sem base vetorial) sobre as entradas de knowledge/: título, descrição, cabeçalhos e secção.
// Serve para dar a cada novidade as entradas candidatas, em vez de pôr o modelo a navegar a biblioteca.
// Módulo, não script. Uso:
//   import { criarRecuperador } from './recuperar.mjs';
//   const r = criarRecuperador(raiz);          // lê knowledge/ uma vez
//   r.candidatas('texto da novidade', 'ia', 5) // [{ id, titulo, seccao, descricao, pontos }]
//   r.compacto()                               // [{ id, titulo, seccao, descricao }] de todas as entradas

import { readdirSync, readFileSync, statSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const NAO_ENTRADAS = new Set(['README.md', 'ATUALIZACOES.md', 'ATUALIZACOES-ARQUIVO.md', 'INDEX.md', 'CHANGELOG.md', 'FONTES.md']);
const PARAGEM = new Set(('a o os as um uma uns umas de do da dos das em no na nos nas por para com sem sob sobre que se e ou mas como mais ao aos ' +
  'the of and or to in on for with is are be by as at an it its this that from not no was were has have had will can may').split(' '));

export const semAcentos = (s) => String(s).normalize('NFD').replace(/[̀-ͯ]/g, '');

// Tokenização simples PT/EN: minúsculas, sem acentos, sem palavras vazias, plural cortado.
export function tokenizar(texto) {
  const saida = [];
  for (let t of semAcentos(texto).toLowerCase().split(/[^a-z0-9#+.]+/)) {
    t = t.replace(/^[.+]+|[.+]+$/g, '');
    if (t.length < 2 || PARAGEM.has(t)) continue;
    if (t.length > 4 && t.endsWith('s') && !t.endsWith('ss')) t = t.slice(0, -1);
    saida.push(t);
  }
  return saida;
}

// Tema do «A vigiar» → pasta da secção (os temas são texto livre).
const TEMAS = { ia: 'ia', 'ia (regulacao)': 'ia', publicacao: 'publicacao', 'acesso remoto': 'acesso-remoto', plataformas: 'plataformas', 'c#': 'csharp', soberania: 'soberania', 'base de dados': 'base-de-dados', seguranca: 'seguranca', 'seguranca (regulacao)': 'seguranca', 'portais de agentes': 'portais-de-agentes' };
export const seccaoDeTema = (t) => (t == null ? null : TEMAS[semAcentos(String(t)).toLowerCase().trim()] ?? String(t));

function frontmatter(texto) {
  const fm = (texto.match(/^---\n([\s\S]*?)\n---/) || [])[1] || '';
  const campo = (n) => ((fm.match(new RegExp(`^${n}:\\s*(.*)$`, 'm')) || [])[1] || '').trim().replace(/^"|"$/g, '').replace(/\\"/g, '"');
  return { id: campo('id'), titulo: campo('titulo'), seccao: campo('seccao') };
}

export function lerEntradas(raiz) {
  const K = join(raiz, 'knowledge');
  const entradas = [];
  const visitar = (pasta, rel) => {
    for (const f of readdirSync(pasta)) {
      const p = join(pasta, f);
      if (statSync(p).isDirectory()) { visitar(p, rel ? `${rel}/${f}` : f); continue; }
      if (!f.endsWith('.md') || NAO_ENTRADAS.has(f) || !rel) continue;
      const t = readFileSync(p, 'utf8').replace(/\r\n/g, '\n');
      const fm = frontmatter(t);
      const resumo = ((t.match(/^\*\*Resumo:\*\* (.*)$/m) || [])[1] || '').trim();
      const cabecalhos = [...t.matchAll(/^## (.+)$/gm)].map((m) => m[1].trim()).filter((c) => !/^(Conteúdo|Histórico|Para uma skill|Fontes oficiais)$/i.test(c));
      const id = `${rel}/${f.slice(0, -3)}`;
      entradas.push({ id, titulo: fm.titulo || f.slice(0, -3), seccaoTitulo: fm.seccao, seccao: id.split('/')[0], descricao: resumo, cabecalhos });
    }
  };
  if (existsSync(K)) visitar(K, '');
  return entradas;
}

// BM25 (k1 1,5; b 0,75). Os campos pesam repetindo os termos: título ×3, cabeçalhos ×2, descrição ×2, caminho ×2.
export function construirIndice(entradas) {
  const docs = entradas.map((e) => {
    const termos = [...Array(3).fill(tokenizar(e.titulo)).flat(), ...Array(2).fill(tokenizar(e.cabecalhos.join(' '))).flat(), ...Array(2).fill(tokenizar(e.descricao)).flat(), ...Array(2).fill(tokenizar(e.id.replace(/[-/]/g, ' '))).flat()];
    const tf = new Map();
    for (const t of termos) tf.set(t, (tf.get(t) || 0) + 1);
    return { e, tf, len: termos.length };
  });
  const df = new Map();
  for (const d of docs) for (const t of d.tf.keys()) df.set(t, (df.get(t) || 0) + 1);
  const media = docs.reduce((s, d) => s + d.len, 0) / (docs.length || 1);
  return { docs, df, media, n: docs.length };
}

const BONUS_SECCAO = 1.6;
// As `n` entradas mais próximas do texto; as da secção da fonte ganham prioridade (pontos ×1,6).
export function candidatas(indice, texto, seccao, n = 5) {
  const consulta = [...new Set(tokenizar(texto))];
  const sec = seccaoDeTema(seccao);
  const k1 = 1.5, b = 0.75;
  const pontuadas = [];
  for (const d of indice.docs) {
    let s = 0;
    for (const t of consulta) {
      const f = d.tf.get(t);
      if (!f) continue;
      const idf = Math.log(1 + (indice.n - indice.df.get(t) + 0.5) / (indice.df.get(t) + 0.5));
      s += idf * ((f * (k1 + 1)) / (f + k1 * (1 - b + b * (d.len / indice.media))));
    }
    if (s <= 0) continue;
    if (sec && d.e.seccao === sec) s *= BONUS_SECCAO;
    pontuadas.push({ ...d.e, pontos: Math.round(s * 100) / 100 });
  }
  pontuadas.sort((x, y) => y.pontos - x.pontos);
  return pontuadas.slice(0, n).map(({ id, titulo, seccao: s, descricao, pontos }) => ({ id, titulo, seccao: s, descricao: descricao.slice(0, 200), pontos }));
}

export const indiceCompacto = (entradas) => entradas.map(({ id, titulo, seccao, descricao }) => ({ id, titulo, seccao, descricao: descricao.slice(0, 200) }));

export function criarRecuperador(raiz) {
  const entradas = lerEntradas(raiz);
  const indice = construirIndice(entradas);
  return { entradas, candidatas: (texto, seccao, n = 5) => candidatas(indice, texto, seccao, n), compacto: () => indiceCompacto(entradas) };
}

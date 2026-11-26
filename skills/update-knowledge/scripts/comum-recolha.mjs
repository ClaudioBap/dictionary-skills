// Partes comuns dos scripts de recolha: pedidos com limites, extração de texto de HTML e de feeds,
// contagem de tokens e chamada ao `claude -p` (subscrição, sem ferramentas). Só módulos nativos.
// Não é um script: é importado por recolher.mjs, analisar.mjs e contexto.mjs.

import { createHash } from 'node:crypto';
import { spawn } from 'node:child_process';
import { existsSync, mkdirSync, renameSync, writeFileSync, readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';

export const AGENTE = 'Mozilla/5.0 (compatible; leitor-de-novidades/1.0)';

// ---------- utilitários ----------

export const hoje = () => new Date().toLocaleDateString('sv-SE'); // AAAA-MM-DD, hora local
export const estimarTokens = (s) => Math.ceil(String(s ?? '').length / 4); // 4 carateres ≈ 1 token
export const sha = (s) => createHash('sha256').update(s).digest('hex');

export function lerJson(caminho, porOmissao) {
  try { return JSON.parse(readFileSync(caminho, 'utf8')); } catch { return porOmissao; }
}
export function escreverAtomico(caminho, texto) {
  mkdirSync(dirname(caminho), { recursive: true });
  const tmp = `${caminho}.${process.pid}.tmp`;
  writeFileSync(tmp, texto);
  renameSync(tmp, caminho);
}
export const escreverJson = (caminho, obj) => escreverAtomico(caminho, JSON.stringify(obj, null, 2) + '\n');

export function opcoes(argv, comValor = []) {
  const pos = [], o = {};
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a.startsWith('--')) {
      const nome = a.slice(2);
      if (comValor.includes(nome)) o[nome] = argv[++i]; else o[nome] = true;
    } else pos.push(a);
  }
  return { pos, o };
}

export const normalizarBloco = (t) => String(t).toLowerCase().replace(/\s+/g, ' ').trim();
export const hashBloco = (t) => sha(normalizarBloco(t)).slice(0, 12);

export function dominio(url) {
  try { return new URL(url).hostname.toLowerCase().replace(/^www\./, ''); } catch { return ''; }
}
// Dois domínios batem se forem iguais ou um for subdomínio do outro.
export function mesmoDominio(a, b) {
  const x = dominio(a) || String(a).toLowerCase(), y = dominio(b) || String(b).toLowerCase();
  if (!x || !y) return false;
  return x === y || x.endsWith('.' + y) || y.endsWith('.' + x);
}

// ---------- pedidos com limites (2 por domínio, 8 no total) ----------

class Semaforo {
  constructor(n) { this.n = n; this.fila = []; }
  async entrar() { if (this.n > 0) { this.n--; return; } await new Promise((r) => this.fila.push(r)); }
  sair() { const r = this.fila.shift(); if (r) r(); else this.n++; }
}
const global = new Semaforo(8);
const porDominio = new Map();
async function limitado(url, fn) {
  const d = dominio(url);
  if (!porDominio.has(d)) porDominio.set(d, new Semaforo(2));
  const s = porDominio.get(d);
  await s.entrar();
  try { await global.entrar(); try { return await fn(); } finally { global.sair(); } } finally { s.sair(); }
}

// Devolve { status, url_final, etag, last_modified, content_type, texto } ou { erro }.
// Identifica-se com um User-Agent genérico e nunca tenta contornar bloqueios.
export async function pedir(url, { cabecalhos = {}, prazo = 20000, maxBytes = 6_000_000 } = {}) {
  return limitado(url, async () => {
    try {
      const r = await fetch(url, {
        headers: { 'User-Agent': AGENTE, Accept: 'text/html,application/xhtml+xml,application/xml,application/json;q=0.9,*/*;q=0.8', 'Accept-Language': 'en,pt;q=0.8', ...cabecalhos },
        redirect: 'follow',
        signal: AbortSignal.timeout(prazo),
      });
      const tipo = r.headers.get('content-type') || '';
      const res = { status: r.status, url_final: r.url || url, etag: r.headers.get('etag'), last_modified: r.headers.get('last-modified'), content_type: tipo, texto: '' };
      if (r.status === 304 || !r.ok) { try { await r.body?.cancel(); } catch { /* nada */ } return res; }
      if (/pdf|image\/|audio\/|video\/|zip|octet-stream/i.test(tipo)) { try { await r.body?.cancel(); } catch { /* nada */ } return res; }
      const tam = Number(r.headers.get('content-length') || 0);
      if (tam > maxBytes) { try { await r.body?.cancel(); } catch { /* nada */ } return { ...res, erro: 'resposta demasiado grande' }; }
      res.texto = await r.text();
      return res;
    } catch (e) {
      return { erro: e?.name === 'TimeoutError' ? 'prazo de 20 s excedido' : String(e?.cause?.code || e?.message || e) };
    }
  });
}

// ---------- HTML ----------

const ENTIDADES = { amp: '&', lt: '<', gt: '>', quot: '"', apos: "'", nbsp: ' ', mdash: '—', ndash: '–', hellip: '…', rsquo: '’', lsquo: '‘', ldquo: '“', rdquo: '”', copy: '©', middot: '·', bull: '•', laquo: '«', raquo: '»', euro: '€' };
export function decodificar(s) {
  return String(s).replace(/&(#x[0-9a-f]+|#\d+|[a-z]+);/gi, (m, e) => {
    if (e[0] === '#') { const n = e[1].toLowerCase() === 'x' ? parseInt(e.slice(2), 16) : parseInt(e.slice(1), 10); try { return String.fromCodePoint(n); } catch { return ' '; } }
    return ENTIDADES[e.toLowerCase()] ?? m;
  });
}

const MARCA = '§H§';
// Extrai o texto principal e divide-o em blocos (títulos h1-h4, parágrafos, li, linhas de tabela).
// Devolve { titulo_pagina, data, blocos:[{cabecalho, texto}], texto_util } — o cabeçalho é o último título acima do bloco.
export function htmlParaBlocos(html) {
  const titulo = decodificar(((html.match(/<title[^>]*>([\s\S]*?)<\/title>/i) || [])[1] || '').replace(/<[^>]+>/g, '')).replace(/\s+/g, ' ').trim();
  const meta = (html.match(/<meta[^>]+(?:article:published_time|datePublished|og:published_time)[^>]*content=["']([^"']+)["']/i) || html.match(/<time[^>]+datetime=["']([^"']+)["']/i) || [])[1];
  const d = meta ? new Date(meta) : null;
  const data = d && !isNaN(d) ? d.toISOString().slice(0, 10) : null;

  let h = html.replace(/<!--[\s\S]*?-->/g, ' ').replace(/<head\b[\s\S]*?<\/head\s*>/i, ' ');
  h = h.replace(/<(script|style|noscript|svg|template|iframe|nav|header|footer|aside|form|button|select|dialog)\b[\s\S]*?<\/\1\s*>/gi, ' ');
  // Prefere <main> ou <article>, se tiverem texto que chegue.
  for (const tag of ['main', 'article']) {
    const m = h.match(new RegExp(`<${tag}\\b[\\s\\S]*<\\/${tag}\\s*>`, 'i'));
    if (m && m[0].replace(/<[^>]+>/g, '').trim().length >= 300) { h = m[0]; break; }
  }
  h = h.replace(/<(h[1-4])\b[^>]*>/gi, `\n${MARCA}`).replace(/<\/h[1-4]\s*>/gi, '\n');
  h = h.replace(/<\/(td|th)\s*>/gi, ' | ');
  h = h.replace(/<\/?(p|div|li|tr|br|section|article|ul|ol|table|thead|tbody|pre|blockquote|dt|dd|h5|h6|figure|figcaption|details|summary|hr|main)\b[^>]*>/gi, '\n');
  h = decodificar(h.replace(/<[^>]+>/g, ''));

  const blocos = [];
  let cabecalho = '', util = 0;
  for (const bruta of h.split('\n')) {
    let l = bruta.replace(/\s+/g, ' ').trim();
    const titulo_ = l.startsWith(MARCA);
    if (titulo_) l = l.slice(MARCA.length).trim();
    l = l.replace(/(\s*\|)+$/, '').trim();
    if (l.length < 3) continue;
    util += l.length;
    if (titulo_) { cabecalho = l; continue; }
    blocos.push({ cabecalho, texto: l });
  }
  return { titulo_pagina: titulo, data, blocos, texto_util: util };
}

// Texto corrido de uma página (para o texto do item de um feed), cortado a `maxPalavras`.
export function textoPrincipal(html, maxPalavras = 1500) {
  const { blocos } = htmlParaBlocos(html);
  const palavras = [];
  let cab = '';
  for (const b of blocos) {
    const linha = b.cabecalho && b.cabecalho !== cab ? `${b.cabecalho}\n${b.texto}` : b.texto;
    cab = b.cabecalho;
    palavras.push(...linha.split(/(\s+)/).filter(Boolean));
    if (palavras.filter((p) => !/^\s+$/.test(p)).length > maxPalavras) break;
    palavras.push('\n');
  }
  return cortarPalavras(palavras.join('').trim(), maxPalavras);
}
export function cortarPalavras(t, max) {
  const partes = t.split(/(\s+)/);
  let n = 0, saida = '';
  for (const p of partes) { if (!/^\s*$/.test(p)) { if (++n > max) return saida.trim() + ' […]'; } saida += p; }
  return saida;
}

// ---------- feeds RSS/Atom e JSON ----------

export function pareceFeed(texto, tipo = '') {
  const ini = texto.slice(0, 2000).replace(/^﻿/, '').trimStart();
  if (/^<\?xml|^<(rss|feed|rdf:RDF)\b/i.test(ini) && /<(item|entry)\b/i.test(texto)) return true;
  return /(rss|atom)\+?xml/i.test(tipo) && /<(item|entry)\b/i.test(texto);
}

const semTags = (s = '') => decodificar(String(s).replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, '$1').replace(/<[^>]+>/g, ' ')).replace(/\s+/g, ' ').trim();
const cdata = (s = '') => String(s).replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, '$1');
const tag = (bloco, nome) => (bloco.match(new RegExp(`<${nome}\\b[^>]*>([\\s\\S]*?)</${nome}>`, 'i')) || [])[1];

// [{ id, titulo, url, data, resumo }] pela ordem do feed.
export function itensDoFeed(xml) {
  const blocos = [...xml.matchAll(/<(item|entry)\b[\s\S]*?<\/\1>/gi)].map((m) => m[0]);
  return blocos.map((b) => {
    let link = tag(b, 'link');
    const atom = [...b.matchAll(/<link\b[^>]*>/gi)].map((m) => m[0]);
    if (!link || !link.trim()) {
      const alt = atom.find((l) => !/rel=["'](?!alternate)/i.test(l)) || atom[0] || '';
      link = (alt.match(/href=["']([^"']+)["']/i) || [])[1];
    }
    link = decodificar(semTags(link || '')).trim();
    const dt = tag(b, 'pubDate') ?? tag(b, 'published') ?? tag(b, 'updated') ?? tag(b, 'dc:date');
    const d = dt ? new Date(semTags(dt)) : null;
    const id = semTags(tag(b, 'guid') ?? tag(b, 'id') ?? '') || link || semTags(tag(b, 'title'));
    const corpo = tag(b, 'content:encoded') ?? tag(b, 'content') ?? tag(b, 'description') ?? tag(b, 'summary') ?? '';
    return { id, titulo: semTags(tag(b, 'title')), url: link, data: d && !isNaN(d) ? d.toISOString().slice(0, 10) : null, resumo: semTags(decodificar(cdata(corpo))) };
  });
}

// Achata um JSON em linhas «caminho: valor», cada uma um bloco completo em si mesma.
export function jsonParaBlocos(texto) {
  let obj;
  try { obj = JSON.parse(texto); } catch { return null; }
  const blocos = [];
  const ir = (v, caminho) => {
    if (v && typeof v === 'object') { for (const [k, x] of Object.entries(v)) ir(x, Array.isArray(v) ? `${caminho}[${k}]` : (caminho ? `${caminho}.${k}` : k)); }
    else blocos.push({ cabecalho: '', texto: `${caminho}: ${v}` });
  };
  ir(obj, '');
  return blocos;
}

// ---------- chamada ao claude -p ----------

export function executavelClaude() {
  const p = process.env.APPDATA && join(process.env.APPDATA, 'npm', 'node_modules', '@anthropic-ai', 'claude-code', 'bin', 'claude.exe');
  return p && existsSync(p) ? p : 'claude';
}

function correrClaude(args, entrada, cwd, prazoMs) {
  return new Promise((resolve, reject) => {
    const filho = spawn(executavelClaude(), args, { cwd, env: { ...process.env, RETOMA_SEM_INTERFACE: '1' }, stdio: ['pipe', 'pipe', 'pipe'], windowsHide: true });
    let out = '', err = '';
    const relogio = setTimeout(() => { filho.kill(); reject(new Error(`claude sem resposta em ${prazoMs / 1000} s`)); }, prazoMs);
    filho.stdout.on('data', (d) => (out += d));
    filho.stderr.on('data', (d) => (err += d));
    filho.on('error', (e) => { clearTimeout(relogio); reject(e); });
    filho.on('close', (codigo) => { clearTimeout(relogio); resolve({ codigo, out, err }); });
    filho.stdin.on('error', () => { /* o processo pode fechar antes de ler tudo */ });
    filho.stdin.end(entrada);
  });
}

// O modelo que fez o trabalho: o de maior custo em modelUsage (o claude pode usar um modelo pequeno para tarefas auxiliares).
export function modeloPrincipal(uso = {}) {
  const e = Object.entries(uso).sort((a, b) => (b[1]?.costUSD ?? 0) - (a[1]?.costUSD ?? 0))[0];
  return e ? e[0] : null;
}

// Uma chamada sem ferramentas, com resposta em JSON validada pelo esquema.
// `validar(saida)` (opcional) lança um erro se a resposta não servir; há uma nova tentativa.
// Devolve { saida, sessao, modelo, entrada, saida_tokens, escrita, leitura, ms, custo_usd }.
export async function chamarClaude({ modelo, effort, sistema, esquema, entrada, cwd, validar, prazoMs = 600_000 }) {
  const args = ['-p', '--model', modelo, '--effort', effort, '--tools', '', '--system-prompt', sistema, '--json-schema', JSON.stringify(esquema), '--output-format', 'json', '--setting-sources', 'project'];
  let ultimoErro;
  for (let tentativa = 1; tentativa <= 2; tentativa++) {
    const t0 = Date.now();
    try {
      const { codigo, out, err } = await correrClaude(args, entrada, cwd, prazoMs);
      let r;
      try { r = JSON.parse(out); } catch { throw new Error(`resposta que não é JSON (código ${codigo}): ${(out || err).slice(0, 300)}`); }
      if (r.is_error) throw new Error(`erro do claude: ${String(r.result ?? r.subtype).slice(0, 300)}`);
      let saida = r.structured_output;
      if (saida == null && typeof r.result === 'string') { try { saida = JSON.parse(r.result); } catch { /* fica nulo */ } }
      if (saida == null || typeof saida !== 'object') throw new Error('sem structured_output na resposta');
      if (validar) validar(saida);
      const u = r.usage || {};
      return {
        saida, sessao: r.session_id ?? null, modelo: modeloPrincipal(r.modelUsage) ?? modelo,
        entrada: u.input_tokens ?? 0, saida_tokens: u.output_tokens ?? 0, escrita: u.cache_creation_input_tokens ?? 0, leitura: u.cache_read_input_tokens ?? 0,
        ms: r.duration_ms ?? Date.now() - t0, custo_usd: r.total_cost_usd ?? null, turnos: r.num_turns ?? null,
      };
    } catch (e) {
      ultimoErro = e;
      console.error(`chamada ao claude falhou (tentativa ${tentativa}/2): ${e.message}`);
    }
  }
  const erro = new Error(`claude falhou duas vezes: ${ultimoErro?.message}`);
  erro.codigoSaida = 3;
  throw erro;
}

// Linha do registo das chamadas, no formato de novidades.json.
export const registoChamada = (etapa, r, entrada = null) => ({ etapa, modelo: r.modelo, sessao: r.sessao, entrada: r.entrada, saida: r.saida_tokens, escrita: r.escrita, leitura: r.leitura, ms: r.ms, custo_usd: r.custo_usd, turnos: r.turnos, ...(entrada ? { entrada_conhecimento: entrada } : {}) });

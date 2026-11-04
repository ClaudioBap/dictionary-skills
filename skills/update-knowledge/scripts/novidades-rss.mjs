#!/usr/bin/env node
// Lê um feed RSS ou Atom oficial e lista as entradas publicadas a partir de uma data.
// Identifica-se de forma honesta (cliente Node por omissão); não tenta contornar bloqueios.
// Uso: node novidades-rss.mjs <url do feed> [--desde AAAA-MM-DD]
// Saída: JSON com [{ titulo, url, data_lancamento }], do mais recente para o mais antigo.

const url = process.argv[2];
const i = process.argv.indexOf('--desde');
const desde = i > 0 ? new Date(process.argv[i + 1] + 'T00:00:00Z') : null;
if (!url) { console.error('Uso: node novidades-rss.mjs <url do feed> [--desde AAAA-MM-DD]'); process.exit(2); }

const resp = await fetch(url, { signal: AbortSignal.timeout(30000) });
if (!resp.ok) { console.error(`Feed indisponível (HTTP ${resp.status}). Não contornar: pedir o conteúdo ao utilizador.`); process.exit(1); }
const xml = await resp.text();

const tira = (s = '') => s.replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, '$1').replace(/<[^>]+>/g, '').trim();
const tag = (bloco, nome) => (bloco.match(new RegExp(`<${nome}[^>]*>([\\s\\S]*?)</${nome}>`)) || [])[1];
const blocos = [...xml.matchAll(/<(item|entry)\b[\s\S]*?<\/\1>/g)].map((m) => m[0]);

const itens = blocos.map((b) => {
  const link = tag(b, 'link') ?? (b.match(/<link[^>]*href="([^"]+)"/) || [])[1];
  const data = tag(b, 'pubDate') ?? tag(b, 'published') ?? tag(b, 'updated') ?? tag(b, 'dc:date');
  const d = data ? new Date(tira(data)) : null;
  return { titulo: tira(tag(b, 'title')), url: tira(link), data_lancamento: d && !isNaN(d) ? d.toISOString().slice(0, 10) : null };
}).filter((it) => !desde || (it.data_lancamento && new Date(it.data_lancamento) >= desde))
  .sort((a, b) => String(b.data_lancamento).localeCompare(String(a.data_lancamento)));

console.log(JSON.stringify(itens, null, 2));

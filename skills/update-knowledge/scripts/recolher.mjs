#!/usr/bin/env node
// Vai às fontes de knowledge/FONTES.md (e, se houver, aos feeds do jornal) SEM IA e escreve um dossier só com o que mudou.
// Pedido condicional (ETag, Last-Modified), feeds com ids já vistos, HTML por hash de blocos de texto.
// Nunca contorna bloqueios: 401/403/429, captcha e páginas que só mostram texto com JavaScript ficam em «por_ler».
// Uso: node recolher.mjs <raiz do repositório> --estado <pasta> [--feeds-jornal <fontes.json>] [--linha-de-base] [--limite N] [--verificadas <ficheiro>]
// Saída: <estado>/dossier-AAAA-MM-DD.json e, no stdout, { dossier, fontes, itens }.

import { existsSync, readFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { pedir, itensDoFeed, pareceFeed, htmlParaBlocos, textoPrincipal, jsonParaBlocos, hashBloco, hoje, lerJson, escreverJson, opcoes, cortarPalavras, sha } from './comum-recolha.mjs';

const MAX_ITENS_FEED = 15, MAX_BLOCOS_ITEM = 80, MAX_PALAVRAS_ITEM = 1500, MAX_HASHES = 40000, MAX_IDS = 2500, MIN_UTIL = 200;

// ---------- análise do FONTES.md ----------

const LIGACAO = /\[([^\]]*)\]\((https?:\/\/[^)\s]+)\)/;
// Devolve [{ url, nome, seccao, para_que, por_ler?, vigiar? }], sem repetidos (o 1.º registo manda).
export function lerFontes(md) {
  const fontes = new Map();
  let seccao = null, modo = null; // modo: 'fonte' | 'vigiar'
  const acrescentar = (f) => {
    const antiga = fontes.get(f.url);
    if (!antiga) fontes.set(f.url, f);
    else if (f.vigiar && !antiga.vigiar) antiga.vigiar = f.vigiar;
  };
  for (const linha of md.replace(/\r\n/g, '\n').split('\n')) {
    const t = linha.match(/^## (.*)$/);
    if (t) {
      const sec = t[1].match(/\]\(([^/)]+)\/README\.md\)/);
      if (sec) { seccao = sec[1]; modo = 'fonte'; } else if (/^A vigiar/i.test(t[1].trim())) { seccao = null; modo = 'vigiar'; } else { seccao = null; modo = null; }
      continue;
    }
    if (!linha.startsWith('|') || !modo) continue;
    const celulas = linha.replace(/^\||\|\s*$/g, '').split(/(?<!\\)\|/).map((c) => c.trim());
    if (modo === 'fonte' && seccao && celulas.length >= 2) {
      const m = celulas[0].match(LIGACAO);
      if (!m) continue;
      const para = celulas.slice(1).join(' | ');
      const nl = para.match(/\(não lida:\s*([^)]*)\)/i);
      acrescentar({ url: m[2], nome: m[1], seccao, para_que: para, ...(nl ? { por_ler: nl[1].trim() } : {}) });
    } else if (modo === 'vigiar' && celulas.length >= 3) {
      const m = celulas[2].match(LIGACAO);
      if (!m) continue;
      acrescentar({ url: m[2], nome: `A vigiar: ${celulas[0]}`, seccao: celulas[0], para_que: celulas[1], vigiar: celulas[1] });
    }
  }
  return [...fontes.values()];
}

export function urlDePedido(url) {
  const m = url.match(/^(https:\/\/github\.com\/[^/]+\/[^/]+)\/releases\/?$/i);
  return m ? `${m[1]}/releases.atom` : url;
}
export function tipoDeFonte(url) {
  if (/^https:\/\/github\.com\/[^/]+\/[^/]+\/releases\/?$/i.test(url)) return 'github';
  if (/\.json(\?|$)/i.test(url)) return 'json';
  return 'html';
}

// ---------- diferenças ----------

// Só os blocos cujo hash ainda não foi visto; cada um já traz o último título acima dele.
export function blocosNovos(blocos, vistos) {
  const agora = new Set(), novos = [];
  for (const b of blocos) {
    const h = hashBloco(b.texto);
    if (agora.has(h)) continue;
    agora.add(h);
    if (!vistos.has(h)) novos.push(b);
  }
  return { novos, hashes: [...agora] };
}
// Os valores de agora primeiro, depois os antigos; corta os mais antigos.
const juntar = (antigos, atuais, max) => [...new Set([...atuais, ...antigos])].slice(0, max);

function limitarBlocos(blocos) {
  let palavras = 0;
  const saida = [];
  for (const b of blocos) {
    const n = b.texto.split(/\s+/).length;
    if (saida.length >= MAX_BLOCOS_ITEM || palavras + n > MAX_PALAVRAS_ITEM * 2) break;
    saida.push(b); palavras += n;
  }
  return { blocos: saida, omitidos: blocos.length - saida.length };
}

const BLOQUEIO = /captcha|cf-chl|just a moment|attention required|access denied|enable javascript and cookies|verify you are a human|are you a robot/i;

// ---------- uma fonte ----------

// Devolve { estado: 'iguais'|'mudaram'|'por_ler'|'erro'|'base', itens, motivo, novoEstado }.
export async function processarFonte(fonte, prev, { base = false } = {}) {
  const tipo = tipoDeFonte(fonte.url);
  const pedido = urlDePedido(fonte.url);
  const cond = {};
  if (prev?.etag) cond['If-None-Match'] = prev.etag;
  if (prev?.last_modified) cond['If-Modified-Since'] = prev.last_modified;
  const r = await pedir(pedido, { cabecalhos: cond });
  const novo = { ...(prev || {}), visto_em: hoje() };
  if (r.erro) return { estado: 'erro', motivo: r.erro, novoEstado: { ...novo, codigo: 0, erro: r.erro } };
  novo.codigo = r.status;
  if (r.url_final && r.url_final !== pedido) novo.redirecionado_para = r.url_final; else delete novo.redirecionado_para;
  if (r.status === 304) return { estado: 'iguais', itens: [], novoEstado: novo };
  if ([401, 403, 429].includes(r.status)) return { estado: 'por_ler', motivo: `HTTP ${r.status}: a fonte recusa o acesso automático`, novoEstado: novo };
  if (r.status < 200 || r.status >= 300) return { estado: 'erro', motivo: `HTTP ${r.status}`, novoEstado: novo };
  if (!r.texto) return { estado: 'por_ler', motivo: `conteúdo que não é texto (${r.content_type || 'tipo desconhecido'})`, novoEstado: novo };
  novo.etag = r.etag || undefined; novo.last_modified = r.last_modified || undefined;
  const redir = novo.redirecionado_para;
  const sem = !prev || (!prev.hashes && !prev.ids);

  // Feed
  if (pareceFeed(r.texto, r.content_type)) {
    const todos = itensDoFeed(r.texto);
    const vistos = new Set(prev?.ids || []);
    novo.tipo = tipo === 'github' ? 'github' : 'feed';
    const ids = todos.map((i) => i.id);
    if (base || sem) { novo.ids = juntar(prev?.ids || [], ids, MAX_IDS); return { estado: 'base', itens: [], novoEstado: novo }; }
    const novos = todos.filter((i) => !vistos.has(i.id)).sort((a, b) => String(b.data).localeCompare(String(a.data))).slice(0, MAX_ITENS_FEED);
    novo.ids = juntar(prev.ids, ids, MAX_IDS);
    const itens = [];
    for (const it of novos) {
      let texto = it.resumo;
      if (novo.tipo !== 'github' && texto.length < 400 && it.url) {
        const p = await pedir(it.url);
        if (!p.erro && p.status >= 200 && p.status < 300 && p.texto && !BLOQUEIO.test(p.texto.slice(0, 3000))) {
          const t = textoPrincipal(p.texto, MAX_PALAVRAS_ITEM);
          if (t.length >= MIN_UTIL) texto = t;
        }
      }
      itens.push({ titulo_pagina: it.titulo, url: it.url || fonte.url, data: it.data, redirecionado_para: redir ?? null, blocos: [{ cabecalho: it.titulo, texto: cortarPalavras(texto || it.titulo, MAX_PALAVRAS_ITEM) }], guid: it.id });
    }
    return { estado: itens.length ? 'mudaram' : 'iguais', itens, novoEstado: novo };
  }

  // JSON
  let corpo;
  if (tipo === 'json' || /json/i.test(r.content_type)) {
    corpo = jsonParaBlocos(r.texto);
    novo.tipo = 'json';
    if (!corpo) return { estado: 'erro', motivo: 'JSON inválido', novoEstado: novo };
    corpo = { titulo_pagina: fonte.nome, data: null, blocos: corpo, texto_util: 9999 };
  } else {
    // HTML
    novo.tipo = 'html';
    if (BLOQUEIO.test(r.texto.slice(0, 5000)) && r.texto.length < 30000) return { estado: 'por_ler', motivo: 'bloqueio (captcha ou verificação) — não contornado', novoEstado: novo };
    corpo = htmlParaBlocos(r.texto);
    if (corpo.texto_util < MIN_UTIL) return { estado: 'por_ler', motivo: 'só mostra texto depois de correr JavaScript (texto útil < 200 carateres)', novoEstado: novo };
  }
  const vistos = new Set(prev?.hashes || []);
  const { novos, hashes } = blocosNovos(corpo.blocos, vistos);
  novo.hashes = juntar(prev?.hashes || [], hashes, MAX_HASHES);
  if (base || sem) return { estado: 'base', itens: [], novoEstado: novo };
  if (!novos.length) return { estado: 'iguais', itens: [], novoEstado: novo };
  const { blocos, omitidos } = limitarBlocos(novos);
  return { estado: 'mudaram', itens: [{ titulo_pagina: corpo.titulo_pagina, url: fonte.url, data: corpo.data, redirecionado_para: redir ?? null, blocos, ...(omitidos ? { blocos_omitidos: omitidos } : {}) }], novoEstado: novo };
}

// ---------- principal ----------

function fontesDoJornal(ficheiro) {
  const j = lerJson(ficheiro, null);
  if (!j?.fontes) return [];
  return j.fontes.filter((f) => f.url_feed).map((f) => ({ url: f.url_feed, nome: f.nome || f.url_feed, seccao: f.tema || 'jornal', para_que: `feed do jornal (${f.tema ?? ''})`, jornal: true }));
}

async function principal() {
  const { pos, o } = opcoes(process.argv.slice(2), ['estado', 'feeds-jornal', 'limite', 'verificadas']);
  const raiz = pos[0] && resolve(pos[0]);
  if (!raiz || !existsSync(join(raiz, 'knowledge', 'FONTES.md')) || !o.estado) {
    console.error('Uso: node recolher.mjs <raiz do repositório> --estado <pasta> [--feeds-jornal <fontes.json>] [--linha-de-base] [--limite N] [--verificadas <ficheiro>]');
    process.exit(2);
  }
  const t0 = Date.now();
  const pastaEstado = resolve(o.estado);
  const ficheiroEstado = join(pastaEstado, 'fontes.json');
  const estado = lerJson(ficheiroEstado, { versao: 1, fontes: {} });
  let fontes = lerFontes(readFileSync(join(raiz, 'knowledge', 'FONTES.md'), 'utf8'));
  if (o['feeds-jornal']) {
    const ja = new Set(fontes.map((f) => f.url));
    fontes.push(...fontesDoJornal(resolve(o['feeds-jornal'])).filter((f) => !ja.has(f.url) && ja.add(f.url)));
  }
  if (o.limite) fontes = fontes.slice(0, Number(o.limite));

  const cont = { vistas: 0, iguais: 0, mudaram: 0, por_ler: 0, erros: 0 };
  const itens = [], porLer = [], erros = [], verificadas = [];
  let n = 0;
  await Promise.all(fontes.map(async (f) => {
    if (f.por_ler) { cont.por_ler++; porLer.push({ url: f.url, motivo: `marcada em FONTES.md: ${f.por_ler}` }); return; }
    let res;
    try { res = await processarFonte(f, estado.fontes[f.url], { base: !!o['linha-de-base'] }); }
    catch (e) { res = { estado: 'erro', motivo: String(e?.message || e), novoEstado: estado.fontes[f.url] || {} }; }
    estado.fontes[f.url] = res.novoEstado;
    if (res.estado === 'erro') { cont.erros++; erros.push({ url: f.url, motivo: res.motivo }); }
    else if (res.estado === 'por_ler') { cont.por_ler++; porLer.push({ url: f.url, motivo: res.motivo }); }
    else {
      cont.vistas++; verificadas.push(f.url);
      if (res.estado === 'mudaram') {
        cont.mudaram++;
        for (const it of res.itens) itens.push({ id: `i${sha(f.url + '|' + (it.guid ?? it.url)).slice(0, 10)}`, url: it.url, fonte_url: f.url, fonte_nome: f.nome, seccao: f.seccao, tipo: res.novoEstado.tipo, titulo_pagina: it.titulo_pagina, redirecionado_para: it.redirecionado_para, ...(f.vigiar ? { vigiar: f.vigiar } : {}), blocos: it.blocos, ...(it.blocos_omitidos ? { blocos_omitidos: it.blocos_omitidos } : {}), data: it.data });
      } else cont.iguais++;
    }
    if (++n % 50 === 0) console.error(`… ${n}/${fontes.length} fontes`);
  }));

  estado.atualizado_em = new Date().toISOString();
  escreverJson(ficheiroEstado, estado);

  const dossier = join(pastaEstado, `dossier-${hoje()}.json`);
  escreverJson(dossier, { gerado_em: new Date().toISOString(), linha_de_base: !!o['linha-de-base'], fontes: cont, itens, por_ler: porLer, erros });

  // fontes-verificadas.json (mapa URL → data)
  const aqui = dirname(fileURLToPath(import.meta.url));
  const fv = o.verificadas ? resolve(o.verificadas) : join(aqui, '..', 'fontes-verificadas.json');
  const j = lerJson(fv, { atualizado_em: '', fontes: {} });
  for (const u of verificadas) j.fontes[u] = hoje();
  j.atualizado_em = `${hoje()}T00:00:00Z`;
  escreverJson(fv, j);
  console.log(JSON.stringify({ dossier, fontes: cont, itens: itens.length, segundos: Math.round((Date.now() - t0) / 1000) }));
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) await principal();

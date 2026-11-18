#!/usr/bin/env node
// Lê ficheiros-padrão da casa (Word, Excel, PowerPoint, PDF) e escreve <pasta>/padrao.json com as letras,
// as cores, a página, o logo e o rodapé que os documentos gerados vão seguir. Do conteúdo não tira nada.
// Uso: node padrao.mjs <ficheiro>... [--pasta documentacao]

import { readFileSync, writeFileSync, mkdirSync, existsSync, rmSync } from 'node:fs';
import { join, resolve, basename, extname } from 'node:path';
import { pathToFileURL } from 'node:url';
import { inflateSync, constants as zlib } from 'node:zlib';
import { lerZip, lerRelacoes, desesc, atributos } from './ooxml.mjs';

export const OMISSAO = {
  letra: { titulos: 'Calibri', texto: 'Calibri', tamanho_texto_pt: 11 },
  cores: {
    texto: '#222222', fundo: '#FFFFFF', titulos: '#1F3A5F', destaque: ['#1F3A5F'], ligacao: '#0563C1',
    cabecalho_tabela: '#1F3A5F', cabecalho_tabela_texto: '#FFFFFF', linha_alternada: '#F2F4F7',
  },
  pagina: { largura_mm: 210, altura_mm: 297, margens_mm: { cima: 25, baixo: 25, esquerda: 25, direita: 25 } },
  logo: null,
  rodape: null,
};

const HEX = /^#[0-9A-Fa-f]{6}$/;
const rgb = (hex) => [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16));
const hex = (cores) => '#' + cores.map((c) => Math.round(Math.min(255, Math.max(0, c))).toString(16).padStart(2, '0')).join('').toUpperCase();

// Mistura uma cor com branco: 0 fica a cor, 1 fica branco.
export const clarear = (cor, quanto) => hex(rgb(cor).map((c) => c + (255 - c) * quanto));

const luminancia = (cor) => {
  const [r, g, b] = rgb(cor).map((c) => { c /= 255; return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4; });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};
const letraSobre = (fundo, escura) => (luminancia(fundo) < 0.4 ? '#FFFFFF' : escura);

/**
 * O estilo para gerar: o padrão de <pasta>/padrao.json por cima do estilo por omissão.
 * O caminho do logo sai absoluto, e só se o ficheiro existir.
 */
export function lerPadrao(pasta, avisos = []) {
  const e = structuredClone(OMISSAO);
  const caminho = join(pasta, 'padrao.json');
  e.origem = [];
  if (!existsSync(caminho)) return e;
  let p;
  try { p = JSON.parse(readFileSync(caminho, 'utf8')); } catch (err) {
    avisos.push(`padrao.json não se lê (${err.message}); fica o estilo por omissão`);
    return e;
  }
  e.origem = Array.isArray(p.origem) ? p.origem : [];
  for (const k of ['titulos', 'texto']) if (typeof p.letra?.[k] === 'string' && p.letra[k].trim()) e.letra[k] = p.letra[k].trim();
  if (Number(p.letra?.tamanho_texto_pt) > 0) e.letra.tamanho_texto_pt = Number(p.letra.tamanho_texto_pt);
  for (const [k, v] of Object.entries(p.cores || {})) {
    if (k === 'destaque') { const d = (Array.isArray(v) ? v : []).filter((c) => HEX.test(c)); if (d.length) e.cores.destaque = d; continue; }
    if (!(k in e.cores)) continue;
    if (HEX.test(v)) e.cores[k] = v.toUpperCase();
    else if (v != null) avisos.push(`padrao.json: cor «${k}» inválida (${v}); fica ${e.cores[k]}`);
  }
  if (!HEX.test(p.cores?.linha_alternada || '') && HEX.test(p.cores?.cabecalho_tabela || '')) e.cores.linha_alternada = clarear(e.cores.cabecalho_tabela, 0.94);
  for (const k of ['largura_mm', 'altura_mm']) if (Number(p.pagina?.[k]) > 0) e.pagina[k] = Number(p.pagina[k]);
  for (const k of ['cima', 'baixo', 'esquerda', 'direita']) if (Number(p.pagina?.margens_mm?.[k]) >= 0 && p.pagina?.margens_mm?.[k] != null) e.pagina.margens_mm[k] = Number(p.pagina.margens_mm[k]);
  if (p.logo) {
    const logo = resolve(pasta, p.logo);
    if (existsSync(logo)) e.logo = logo;
    else avisos.push(`padrao.json: o logo ${p.logo} não existe; os documentos saem sem logo`);
  }
  if (typeof p.rodape === 'string' && p.rodape.trim()) e.rodape = p.rodape.trim();
  return e;
}

const texto = (zip, nome) => (zip.has(nome) ? zip.get(nome).toString('utf8') : '');
const primeiro = (t, re) => (t.match(re) || [])[1];
const mm = (valor, porMm) => Math.round((Number(valor) / porMm) * 10) / 10;
const TWIPS_POR_MM = 1440 / 25.4;
const EMU_POR_MM = 36000;
const IMAGEM = /\.(png|jpe?g)$/i;

const NOMES_COR = ['dk1', 'lt1', 'dk2', 'lt2', 'accent1', 'accent2', 'accent3', 'accent4', 'accent5', 'accent6', 'hlink'];

function lerTema(xml) {
  if (!xml) return null;
  const esquema = primeiro(xml, /<a:clrScheme\b[^>]*>([\s\S]*?)<\/a:clrScheme>/) || '';
  const cores = {};
  for (const n of NOMES_COR) {
    const bloco = primeiro(esquema, new RegExp(`<a:${n}>([\\s\\S]*?)</a:${n}>`)) || '';
    const v = primeiro(bloco, /<a:srgbClr val="([0-9A-Fa-f]{6})"/) || primeiro(bloco, /<a:sysClr\b[^>]*lastClr="([0-9A-Fa-f]{6})"/);
    if (v) cores[n] = '#' + v.toUpperCase();
  }
  const letra = (q) => desesc(primeiro(xml, new RegExp(`<a:${q}Font>[\\s\\S]*?<a:latin typeface="([^"]*)"`)) || '') || null;
  return { cores, maior: letra('major'), menor: letra('minor') };
}

// A maior imagem PNG ou JPEG entre as referidas pelas partes dadas.
function maiorImagem(zip, partes) {
  let melhor = null, outros = 0;
  for (const parte of partes) {
    const xml = texto(zip, parte);
    const usados = new Set([...xml.matchAll(/r:(?:embed|id|link)="([^"]+)"/g)].map((m) => m[1]));
    for (const r of lerRelacoes(zip, parte)) {
      if (!usados.has(r.id) || !r.parte || !zip.has(r.parte) || !/\/image$/.test(r.tipo)) continue;
      if (!IMAGEM.test(r.parte)) { outros++; continue; }
      if (!melhor || zip.get(r.parte).length > zip.get(melhor).length) melhor = r.parte;
    }
  }
  return { parte: melhor, outros };
}

function lerWord(zip, notas) {
  const tema = lerTema(texto(zip, 'word/theme/theme1.xml'));
  const estilos = texto(zip, 'word/styles.xml');
  const fonteDe = (rPr) => {
    const rf = primeiro(rPr || '', /(<w:rFonts\b[^>]*>)/) || '';
    const direta = primeiro(rf, /w:ascii="([^"]+)"/);
    if (direta) return desesc(direta);
    const doTema = primeiro(rf, /w:asciiTheme="([^"]+)"/);
    if (doTema && tema) return doTema.startsWith('major') ? tema.maior : tema.menor;
    return null;
  };
  const tamanhoDe = (rPr) => { const v = primeiro(rPr || '', /<w:sz w:val="(\d+)"/); return v ? Number(v) / 2 : null; };

  const rPrPredefinido = primeiro(estilos, /<w:rPrDefault>([\s\S]*?)<\/w:rPrDefault>/);
  const blocos = estilos.match(/<w:style\b[\s\S]*?<\/w:style>/g) || [];
  // O estilo Normal pode mudar a letra e o tamanho dos docDefaults; vale o dele.
  const normal = blocos.find((b) => /<w:style\b[^>]*w:type="paragraph"[^>]*w:default="1"/.test(b) || /<w:style\b[^>]*w:default="1"[^>]*w:type="paragraph"/.test(b)) || '';
  const rPrNormal = primeiro(normal, /<w:rPr>([\s\S]*?)<\/w:rPr>/);
  // O styleId do título 1 muda com a língua do Word (Ttulo1 em pt-PT); o nome interno não.
  const h1 = blocos.find((b) => /<w:name w:val="heading 1"\s*\/>/i.test(b)) || '';
  const rPrH1 = primeiro(h1, /<w:rPr>([\s\S]*?)<\/w:rPr>/);
  const corH1 = primeiro(rPrH1 || '', /<w:color w:val="([0-9A-Fa-f]{6})"/);

  const documento = texto(zip, 'word/document.xml');
  const seccao = (documento.match(/<w:sectPr\b[\s\S]*?<\/w:sectPr>/g) || []).at(-1) || '';
  const tamanho = atributos(primeiro(seccao, /<w:pgSz\b([^>]*)\/?>/) || '');
  const margens = atributos(primeiro(seccao, /<w:pgMar\b([^>]*)\/?>/) || '');
  const pagina = tamanho['w:w'] && margens['w:top'] ? {
    largura_mm: mm(tamanho['w:w'], TWIPS_POR_MM), altura_mm: mm(tamanho['w:h'], TWIPS_POR_MM),
    margens_mm: {
      cima: mm(Math.abs(margens['w:top']), TWIPS_POR_MM), baixo: mm(Math.abs(margens['w:bottom']), TWIPS_POR_MM),
      esquerda: mm(margens['w:left'], TWIPS_POR_MM), direita: mm(margens['w:right'], TWIPS_POR_MM),
    },
  } : null;

  const cabecalhos = [...zip.keys()].filter((n) => /^word\/header\d*\.xml$/.test(n)).sort();
  let { parte: logo, outros } = maiorImagem(zip, cabecalhos);
  if (!logo) logo = [...zip.keys()].filter((n) => /^word\/media\//.test(n) && IMAGEM.test(n)).sort()[0] || null;
  if (!logo && outros) notas.push('Word: o logo do cabeçalho não é PNG nem JPEG; exporta-o em PNG e põe-no em padrao/logo.png');

  // Rodapé: só se for texto fixo. Com campos (número de página, data) fica de fora.
  let rodape = null;
  const rodapes = [...zip.keys()].filter((n) => /^word\/footer\d*\.xml$/.test(n)).sort();
  for (const r of rodapes) {
    const xml = texto(zip, r);
    const t = (xml.match(/<w:p\b[\s\S]*?<\/w:p>/g) || [])
      .map((p) => [...p.matchAll(/<w:t(?:\s[^>]*)?>([^<]*)<\/w:t>/g)].map((m) => desesc(m[1])).join(''))
      .map((s) => s.trim()).filter(Boolean).join(' ');
    if (!t) continue;
    if (/<w:fldSimple|<w:instrText|<w:fldChar/.test(xml)) { notas.push(`Word: o rodapé tem campos (ex.: número de página); o texto «${t}» não foi aproveitado`); continue; }
    rodape = t;
    break;
  }

  return {
    tipo: 'Word', tema,
    letra: { titulos: fonteDe(rPrH1) || tema?.maior || null, texto: fonteDe(rPrNormal) || fonteDe(rPrPredefinido) || tema?.menor || null, tamanho: tamanhoDe(rPrNormal) || tamanhoDe(rPrPredefinido) },
    titulos: corH1 ? '#' + corH1.toUpperCase() : null,
    pagina, logo, rodape,
  };
}

function lerPowerPoint(zip) {
  const apresentacao = texto(zip, 'ppt/presentation.xml');
  const sld = atributos(primeiro(apresentacao, /<p:sldSz\b([^>]*)\/?>/) || '');
  const mestres = [...zip.keys()].filter((n) => /^ppt\/slideMasters\/slideMaster\d+\.xml$/.test(n)).sort((a, b) => a.length - b.length || a.localeCompare(b));
  const mestre = mestres[0];
  const relTema = mestre ? lerRelacoes(zip, mestre).find((r) => /\/theme$/.test(r.tipo)) : null;
  const tema = lerTema(texto(zip, relTema?.parte || 'ppt/theme/theme1.xml'));
  const { parte: logo } = mestre ? maiorImagem(zip, [mestre]) : { parte: null };
  return {
    tipo: 'PowerPoint', tema,
    letra: { titulos: tema?.maior || null, texto: tema?.menor || null, tamanho: null },
    diapositivo: sld.cx ? { largura_mm: mm(sld.cx, EMU_POR_MM), altura_mm: mm(sld.cy, EMU_POR_MM) } : null,
    logo,
  };
}

// HLS do Excel para o tint das cores do tema.
function aplicarTint(cor, tint) {
  if (!tint) return cor;
  let [r, g, b] = rgb(cor).map((c) => c / 255);
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h = 0, s = 0, l = (max + min) / 2;
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    h = max === r ? (g - b) / d + (g < b ? 6 : 0) : max === g ? (b - r) / d + 2 : (r - g) / d + 4;
    h /= 6;
  }
  l = tint < 0 ? l * (1 + tint) : l * (1 - tint) + tint;
  const f = (p, q, t) => { if (t < 0) t += 1; if (t > 1) t -= 1; if (t < 1 / 6) return p + (q - p) * 6 * t; if (t < 1 / 2) return q; if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6; return p; };
  if (!s) [r, g, b] = [l, l, l];
  else {
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s, p = 2 * l - q;
    [r, g, b] = [f(p, q, h + 1 / 3), f(p, q, h), f(p, q, h - 1 / 3)];
  }
  return hex([r, g, b].map((c) => c * 255));
}

function lerExcel(zip) {
  const tema = lerTema(texto(zip, 'xl/theme/theme1.xml'));
  const estilos = texto(zip, 'xl/styles.xml');
  const listaDe = (nome, item) => (primeiro(estilos, new RegExp(`<${nome}\\b[^>]*>([\\s\\S]*?)</${nome}>`)) || '').match(new RegExp(`<${item}\\b[\\s\\S]*?</${item}>|<${item}\\b[^>]*/>`, 'g')) || [];
  const fontes = listaDe('fonts', 'font');
  const preenchimentos = listaDe('fills', 'fill');
  const xfs = (primeiro(estilos, /<cellXfs\b[^>]*>([\s\S]*?)<\/cellXfs>/) || '').match(/<xf\b[^>]*?(?:\/>|>[\s\S]*?<\/xf>)/g) || [];
  // No Excel, theme="0" é lt1 e theme="1" é dk1: a ordem do tema com os pares trocados.
  const ORDEM = ['lt1', 'dk1', 'lt2', 'dk2', 'accent1', 'accent2', 'accent3', 'accent4', 'accent5', 'accent6', 'hlink'];
  const cor = (etiqueta) => {
    const a = atributos(etiqueta || '');
    let c = null;
    if (/^[0-9A-Fa-f]{8}$/.test(a.rgb || '')) c = '#' + a.rgb.slice(2).toUpperCase();
    else if (a.theme != null && tema?.cores[ORDEM[Number(a.theme)]]) c = tema.cores[ORDEM[Number(a.theme)]];
    return c ? aplicarTint(c, Number(a.tint || 0)) : null;
  };

  const f0 = fontes[0] || '';
  const letra = desesc(primeiro(f0, /<name val="([^"]+)"/) || '') || null;
  const tamanho = Number(primeiro(f0, /<sz val="([\d.]+)"/)) || null;

  // Cabeçalho: a primeira célula com texto e preenchimento sólido nas primeiras 5 linhas da primeira folha.
  let cabecalho = null;
  const folhas = [...zip.keys()].filter((n) => /^xl\/worksheets\/sheet\d+\.xml$/.test(n)).sort((a, b) => a.length - b.length || a.localeCompare(b));
  for (const folha of folhas.slice(0, 1)) {
    for (const m of texto(zip, folha).matchAll(/<c\b([^>]*?)(?:\/>|>([\s\S]*?)<\/c>)/g)) {
      const a = atributos(m[1]);
      const linha = Number(primeiro(a.r || '', /(\d+)$/));
      if (linha > 5) break;
      if (a.s == null || !m[2] || !/<v>|<is>/.test(m[2])) continue;
      const xf = atributos(primeiro(xfs[Number(a.s)] || '', /<xf\b([^>]*)/) || '');
      const fill = preenchimentos[Number(xf.fillId)] || '';
      if (!/patternType="solid"/.test(fill)) continue;
      const fundo = cor(primeiro(fill, /<fgColor\b([^>]*)\/?>/));
      if (!fundo) continue;
      const letraCor = cor(primeiro(fontes[Number(xf.fontId)] || '', /<color\b([^>]*)\/?>/));
      cabecalho = { fundo, texto: letraCor };
      break;
    }
  }
  return { tipo: 'Excel', tema, letra: { titulos: null, texto: letra, tamanho }, cabecalho };
}

// Nomes de letras de um PDF: /BaseFont no texto e nos streams FlateDecode (onde ficam as object streams).
function lerPdf(buf) {
  const nomes = new Set();
  const procurar = (t) => {
    for (const m of t.matchAll(/\/BaseFont\s*\/([^\s/\[\]<>(){}%]+)/g)) {
      nomes.add(m[1].replace(/#([0-9A-Fa-f]{2})/g, (_, h) => String.fromCharCode(parseInt(h, 16))).replace(/^[A-Z]{6}\+/, ''));
    }
  };
  const bruto = buf.toString('latin1');
  procurar(bruto);
  for (const m of bruto.matchAll(/(?<!end)stream\r?\n/g)) {
    const inicio = m.index + m[0].length;
    const fim = bruto.indexOf('endstream', inicio);
    if (fim < 0) continue;
    const antes = bruto.slice(Math.max(0, m.index - 1000), m.index);
    if (!/FlateDecode/.test(antes.slice(Math.max(0, antes.lastIndexOf(' obj'))))) continue;
    try { procurar(inflateSync(buf.subarray(inicio, fim), { finishFlush: zlib.Z_SYNC_FLUSH }).toString('latin1')); } catch { /* stream que não é zlib */ }
  }
  const SIMBOLOS = /^(Symbol|ZapfDingbats|Wingdings|Webdings|MT-Extra|Marlett)/i;
  // ArialMT e TimesNewRomanPSMT perdem o sufixo; em GillSansMT ou TwCenMT o «MT» faz parte do nome.
  const familia = (n) => {
    let base = n.split(/[-,]/)[0];
    if (/PSMT$/.test(base)) base = base.slice(0, -4);
    else if (/MT$/.test(base) && !/[a-z][A-Z]/.test(base.slice(0, -2))) base = base.slice(0, -2);
    return base.replace(/([a-z])([A-Z])/g, '$1 $2');
  };
  const letras = [...nomes].filter((n) => !SIMBOLOS.test(n));
  const negrito = (n) => /bold|black|heavy|demi/i.test(n);
  const texto = letras.find((n) => !negrito(n));
  const titulos = letras.find(negrito) || texto;
  return {
    tipo: 'PDF', tema: null, nomes: letras,
    letra: { titulos: titulos ? familia(titulos) : null, texto: texto ? familia(texto) : null, tamanho: null },
  };
}

// Junta as fontes pela ordem de prioridade; quando discordam, fica a primeira e regista-se a nota.
function escolher(rotulo, candidatos, notas, mostrar = (v) => `«${v}»`) {
  const validos = candidatos.filter((c) => c.valor != null && c.valor !== '');
  if (!validos.length) return null;
  const [primeiroValor, ...resto] = validos;
  const diferentes = resto.filter((c) => String(c.valor).toLowerCase() !== String(primeiroValor.valor).toLowerCase());
  if (diferentes.length) {
    notas.push(`${rotulo}: fica ${mostrar(primeiroValor.valor)} (${primeiroValor.tipo}); ${diferentes.map((c) => `${c.tipo} tem ${mostrar(c.valor)}`).join(', ')}`);
  }
  return primeiroValor.valor;
}

/**
 * @param {string[]} ficheiros
 * @returns {{ padrao: object, logo: { dados: Buffer, ext: string, de: string }|null, avisos: string[] }}
 */
export function extrairPadrao(ficheiros) {
  const notas = [], avisos = [];
  const lidos = [];
  for (const f of ficheiros) {
    const ext = extname(f).toLowerCase();
    if (!existsSync(f)) { avisos.push(`${f}: não existe`); continue; }
    try {
      const buf = readFileSync(f);
      if (ext === '.pdf') { lidos.push({ ...lerPdf(buf), ficheiro: f }); continue; }
      if (!['.docx', '.xlsx', '.pptx', '.dotx', '.xltx', '.potx'].includes(ext)) { avisos.push(`${basename(f)}: formato não suportado (só .docx, .xlsx, .pptx e .pdf)`); continue; }
      const zip = lerZip(buf);
      const lido = ext.startsWith('.d') ? lerWord(zip, notas) : ext.startsWith('.p') ? lerPowerPoint(zip) : lerExcel(zip);
      lidos.push({ ...lido, zip, ficheiro: f });
    } catch (err) {
      avisos.push(`${basename(f)}: não se lê (${err.message})`);
    }
  }
  const por = (tipo) => lidos.find((l) => l.tipo === tipo);
  const word = por('Word'), ppt = por('PowerPoint'), excel = por('Excel'), pdf = por('PDF');
  const ordemLetras = [word, ppt, excel, pdf].filter(Boolean);
  const ordemCores = [word, ppt, excel].filter((l) => l?.tema);
  const cand = (lista, f) => lista.map((l) => ({ tipo: l.tipo, valor: f(l) }));
  const daCor = (nome) => (l) => l.tema?.cores[nome];

  const letra = {
    titulos: escolher('Letra dos títulos', cand(ordemLetras, (l) => l.letra.titulos), notas),
    texto: escolher('Letra do texto', cand(ordemLetras, (l) => l.letra.texto), notas),
    tamanho_texto_pt: escolher('Tamanho do texto', cand(ordemLetras, (l) => l.letra.tamanho), notas, (v) => `${v} pt`),
  };
  const cores = {
    texto: escolher('Cor do texto', cand(ordemCores, daCor('dk1')), notas, String),
    fundo: escolher('Cor de fundo', cand(ordemCores, daCor('lt1')), notas, String),
    // Só o Word tem uma cor de título própria; sem ela, fica o primeiro acento do tema.
    titulos: escolher('Cor dos títulos', cand(ordemCores, (l) => l.titulos), notas, String) || ordemCores[0]?.tema.cores.accent1 || null,
    destaque: null,
    ligacao: escolher('Cor das ligações', cand(ordemCores, daCor('hlink')), notas, String),
    cabecalho_tabela: excel?.cabecalho?.fundo || null,
    cabecalho_tabela_texto: excel?.cabecalho?.texto || null,
  };
  const temaPrincipal = ordemCores[0]?.tema;
  if (temaPrincipal) {
    const d = ['accent1', 'accent2', 'accent3', 'accent4', 'accent5', 'accent6'].map((n) => temaPrincipal.cores[n]).filter(Boolean);
    if (d.length) cores.destaque = d;
  }

  const sem = [];
  const NOMES = {
    letra: { titulos: 'letra dos títulos', texto: 'letra do texto', tamanho_texto_pt: 'tamanho do texto' },
    cores: { texto: 'cor do texto', fundo: 'cor de fundo', titulos: 'cor dos títulos', destaque: 'cores de destaque', ligacao: 'cor das ligações' },
  };
  for (const k of Object.keys(NOMES.letra)) if (letra[k] == null) { letra[k] = OMISSAO.letra[k]; sem.push(NOMES.letra[k]); }
  for (const k of Object.keys(NOMES.cores)) if (cores[k] == null) { cores[k] = OMISSAO.cores[k]; sem.push(NOMES.cores[k]); }
  if (!cores.cabecalho_tabela) cores.cabecalho_tabela = cores.titulos;
  if (!cores.cabecalho_tabela_texto) cores.cabecalho_tabela_texto = letraSobre(cores.cabecalho_tabela, cores.texto);
  cores.linha_alternada = clarear(cores.cabecalho_tabela, 0.94);

  let pagina = word?.pagina;
  if (!pagina) { pagina = structuredClone(OMISSAO.pagina); sem.push('página (sem Word, fica A4 com margens de 25 mm)'); }
  if (sem.length && lidos.length) notas.push(`Sem dados nos ficheiros, fica o estilo por omissão para: ${sem.join(', ')}`);

  let logo = null;
  for (const l of [word, ppt]) {
    if (l?.logo) { logo = { dados: l.zip.get(l.logo), ext: extname(l.logo).toLowerCase().replace('.jpeg', '.jpg'), de: `${l.tipo} (${basename(l.ficheiro)})` }; break; }
  }

  const padrao = {
    origem: lidos.map((l) => basename(l.ficheiro)),
    letra, cores, pagina,
    ...(ppt?.diapositivo ? { diapositivo: ppt.diapositivo } : {}),
    logo: logo ? `padrao/logo${logo.ext}` : null,
    rodape: word?.rodape || null,
    notas,
  };
  return { padrao, logo, avisos, lidos };
}

function resumo(padrao, logo, lidos) {
  const l = [];
  l.push(`Padrão encontrado em ${padrao.origem.length} ficheiro(s): ${padrao.origem.join(', ') || 'nenhum'}`);
  l.push(`  Letras: títulos ${padrao.letra.titulos}; texto ${padrao.letra.texto} ${padrao.letra.tamanho_texto_pt} pt`);
  const c = padrao.cores;
  l.push(`  Cores: texto ${c.texto}, fundo ${c.fundo}, títulos ${c.titulos}, ligações ${c.ligacao}`);
  l.push(`         destaque ${c.destaque.join(' ')}`);
  l.push(`         cabeçalho das tabelas ${c.cabecalho_tabela} com letra ${c.cabecalho_tabela_texto}; linhas alternadas ${c.linha_alternada}`);
  const p = padrao.pagina, m = p.margens_mm;
  l.push(`  Página: ${p.largura_mm} × ${p.altura_mm} mm; margens ${m.cima} cima, ${m.baixo} baixo, ${m.esquerda} esquerda, ${m.direita} direita (mm)`);
  if (padrao.diapositivo) l.push(`  Diapositivo: ${padrao.diapositivo.largura_mm} × ${padrao.diapositivo.altura_mm} mm`);
  l.push(`  Logo: ${logo ? `${padrao.logo}, do ${logo.de}` : 'nenhum'}`);
  l.push(`  Rodapé: ${padrao.rodape ? `«${padrao.rodape}»` : 'nenhum'}`);
  const pdf = lidos.find((x) => x.tipo === 'PDF');
  if (pdf) l.push(`  Letras no PDF ${basename(pdf.ficheiro)}: ${pdf.nomes.join(', ') || 'nenhuma encontrada'}`);
  if (padrao.notas.length) { l.push('  Notas:'); for (const n of padrao.notas) l.push(`    - ${n}`); }
  return l.join('\n');
}

if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) {
  const args = process.argv.slice(2);
  const ficheiros = [];
  let pasta = 'documentacao';
  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--pasta') pasta = args[++i];
    else ficheiros.push(resolve(args[i]));
  }
  if (!ficheiros.length || !pasta) { console.error('Uso: node padrao.mjs <ficheiro>... [--pasta documentacao]'); process.exit(2); }

  const { padrao, logo, avisos, lidos } = extrairPadrao(ficheiros);
  for (const a of avisos) console.error(`AVISO: ${a}`);
  if (!lidos.length) { console.error('Nenhum ficheiro lido; padrao.json não foi escrito.'); process.exit(1); }

  const destino = resolve(pasta);
  mkdirSync(destino, { recursive: true });
  const pastaLogo = join(destino, 'padrao');
  for (const ext of ['.png', '.jpg']) if (existsSync(join(pastaLogo, `logo${ext}`))) rmSync(join(pastaLogo, `logo${ext}`));
  if (logo) {
    mkdirSync(pastaLogo, { recursive: true });
    writeFileSync(join(pastaLogo, `logo${logo.ext}`), logo.dados);
  }
  writeFileSync(join(destino, 'padrao.json'), JSON.stringify(padrao, null, 2) + '\n');

  console.log(resumo(padrao, logo, lidos));
  if (lidos.some((x) => x.tipo === 'PDF')) {
    console.log('\nO PDF dá só as letras. As cores, a página e o logo completam-se à mão no padrao.json depois de o ver.');
  }
  console.log(`\nEscrito: ${join(destino, 'padrao.json')}${logo ? ` e ${join(pastaLogo, `logo${logo.ext}`)}` : ''}`);
  console.log('Confirma com o utilizador antes de gerar os documentos.');
}


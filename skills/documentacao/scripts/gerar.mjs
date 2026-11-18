#!/usr/bin/env node
// Gera a documentação de um projeto a partir dos relatórios de processo, do git log e de dois Markdown:
// processos-e-estatisticas.xlsx, entendimento.docx e relatorio-final.docx, no estilo de padrao.json.
// Uso: node gerar.mjs [--raiz <repo>] [--pasta documentacao] [--processos <pasta>]...
// --pasta e --processos são relativos à raiz. Sem --processos, lê <pasta>/processos/**/*.md e orquestracao/*/saidas/*.md.

import { readFileSync, writeFileSync, existsSync, readdirSync, statSync, mkdirSync } from 'node:fs';
import { join, resolve, relative, sep, basename } from 'node:path';
import { execFileSync } from 'node:child_process';
import { pathToFileURL } from 'node:url';
import { escreverZip, esc, XML, REL, tiposDeConteudo, relacoes } from './ooxml.mjs';
import { lerPadrao, clarear } from './padrao.mjs';

export const ESTADOS = ['feito', 'parcial', 'falhou', 'cancelado'];
const OBRIGATORIOS = ['id', 'titulo', 'skill', 'inicio', 'estado', 'prova'];
export const GERADOS = { livro: 'processos-e-estatisticas.xlsx', entendimento: 'entendimento.docx', final: 'relatorio-final.docx' };

export const rel = (de, para) => relative(de, para).split(sep).join('/');

export function argumentos(lista) {
  const a = { processos: [] };
  for (let i = 0; i < lista.length; i++) {
    const nome = lista[i].replace(/^--/, '');
    if (!lista[i].startsWith('--') || !['raiz', 'pasta', 'processos'].includes(nome)) throw new Error(`argumento desconhecido: ${lista[i]}`);
    const valor = lista[++i];
    if (valor == null || valor.startsWith('--')) throw new Error(`falta o valor de --${nome}`);
    if (nome === 'processos') a.processos.push(valor); else a[nome] = valor;
  }
  return a;
}

export function caminhos(a) {
  let raiz = a.raiz ? resolve(a.raiz) : null;
  if (!raiz) {
    try {
      raiz = resolve(execFileSync('git', ['rev-parse', '--show-toplevel'], { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] }).trim());
    } catch { throw new Error('esta pasta não está num repositório git; indica a raiz com --raiz <repo>'); }
  }
  return { raiz, pasta: resolve(raiz, a.pasta || 'documentacao'), processos: a.processos.map((p) => resolve(raiz, p)) };
}

export function mdsEm(caminho) {
  if (!existsSync(caminho)) return [];
  if (!statSync(caminho).isDirectory()) return caminho.toLowerCase().endsWith('.md') ? [caminho] : [];
  return readdirSync(caminho).sort().flatMap((nome) => mdsEm(join(caminho, nome)));
}

export function ficheirosDeProcessos({ raiz, pasta, processos = [] }) {
  if (processos.length) return processos.flatMap(mdsEm);
  const lista = mdsEm(join(pasta, 'processos'));
  const orquestracao = join(raiz, 'orquestracao');
  if (existsSync(orquestracao)) {
    for (const d of readdirSync(orquestracao).sort()) {
      const saidas = join(orquestracao, d, 'saidas');
      if (!existsSync(saidas) || !statSync(saidas).isDirectory()) continue;
      lista.push(...readdirSync(saidas).sort().filter((f) => f.toLowerCase().endsWith('.md')).map((f) => join(saidas, f)));
    }
  }
  return lista;
}

/** Cabeçalho YAML simples: só «chave: valor», com o valor opcionalmente entre aspas. Campos sem valor ficam ''. */
export function frontmatter(texto) {
  const limpo = texto.replace(/^\uFEFF/, '');
  const m = limpo.match(/^---[ \t]*\r?\n([\s\S]*?)\r?\n---[ \t]*(?:\r?\n|$)/);
  if (!m) return { campos: null, corpo: limpo };
  const campos = {};
  for (const linha of m[1].split(/\r?\n/)) {
    const c = linha.match(/^([A-Za-z_][\w-]*)[ \t]*:(.*)$/);
    if (!c) continue;
    let v = c[2].trim();
    if (v.length >= 2 && v[0] === '"' && v.at(-1) === '"') v = v.slice(1, -1).replace(/\\(["\\])/g, '$1');
    else if (v.length >= 2 && v[0] === "'" && v.at(-1) === "'") v = v.slice(1, -1).replace(/''/g, "'");
    else if (v === '~' || v === 'null') v = '';
    campos[c[1]] = v.trim();
  }
  return { campos, corpo: limpo.slice(m[0].length) };
}

const DATA = /^(\d{4})-(\d{2})-(\d{2})(?:[T ](\d{2}):(\d{2})(?::(\d{2})(?:[.,]\d+)?)?)?(?:Z|[+-]\d{2}(?::?\d{2})?)?$/;

// A hora fica como foi escrita (relógio de quem trabalhou); o fuso, se vier, não a converte.
export function lerData(texto) {
  const m = String(texto ?? '').trim().match(DATA);
  if (!m) return null;
  const [a, mes, d, h, mi, s] = m.slice(1, 7).map((x) => Number(x || 0));
  const ms = Date.UTC(a, mes - 1, d, h, mi, s);
  const dt = new Date(ms);
  if (dt.getUTCMonth() !== mes - 1 || dt.getUTCDate() !== d || h > 23 || mi > 59) return null;
  return { ms, serie: (ms - Date.UTC(1899, 11, 30)) / 86400000, comHora: m[4] != null, mes: Date.UTC(a, mes - 1, 1) };
}
const serieDe = (ms) => (ms - Date.UTC(1899, 11, 30)) / 86400000;

const lista = (v) => String(v || '').split(',').map((s) => s.trim()).filter(Boolean);
const numero = (v) => {
  if (v == null || v === '') return null;
  const n = Number(String(v).replace(',', '.'));
  return Number.isFinite(n) ? n : String(v);
};

export function lerProcessos(ficheiros) {
  const processos = [], ignorados = [];
  for (const ficheiro of ficheiros) {
    const { campos } = frontmatter(readFileSync(ficheiro, 'utf8'));
    if (!campos?.id) { ignorados.push(ficheiro); continue; }
    const c = campos;
    processos.push({
      ficheiro, c,
      skills: lista(c.skill),
      inicio: lerData(c.inicio), fim: lerData(c.fim),
      estado: (c.estado || '').toLowerCase(),
      prova: /^sim$/i.test(c.prova || '') ? 'sim' : /^n[aã]o$/i.test(c.prova || '') ? 'não' : (c.prova || ''),
      duracao: numero(c.duracao_min), retrabalho: numero(c.retrabalho),
      reconstruido: /^(true|sim)$/i.test(c.reconstruido || '') ? 'sim' : 'não',
      commits: lista(c.commits),
    });
  }
  processos.sort((x, y) => (x.inicio?.ms ?? Infinity) - (y.inicio?.ms ?? Infinity) || x.c.id.localeCompare(y.c.id));
  return { processos, ignorados };
}

// Uma saída antiga sem cabeçalho que um relatório já cita está documentada: só se conta. As outras são trabalho por documentar.
export function avisosSemCabecalho(processos, ignorados, raiz) {
  const textos = processos.map((p) => readFileSync(p.ficheiro, 'utf8'));
  const semCabecalho = ignorados.map((f) => rel(raiz, f).replace(/\\/g, '/'));
  const citadas = semCabecalho.filter((r) => textos.some((t) => t.includes(r)));
  const avisos = [];
  if (citadas.length) avisos.push(`${citadas.length} ${citadas.length === 1 ? 'saída sem cabeçalho já citada' : 'saídas sem cabeçalho já citadas'} por relatórios de processo; não contam à parte`);
  for (const r of semCabecalho.filter((s) => !citadas.includes(s))) avisos.push(`${r}: sem cabeçalho e nenhum relatório a cita; falta o relatório deste processo`);
  return avisos;
}

export function falhasDosProcessos(processos, raiz) {
  const falhas = [];
  const porId = new Map();
  for (const p of processos) {
    const onde = rel(raiz, p.ficheiro);
    for (const k of OBRIGATORIOS) if (!p.c[k]) falhas.push(`${onde}: falta o campo obrigatório «${k}»`);
    if (p.c.estado && !ESTADOS.includes(p.estado)) falhas.push(`${onde}: estado «${p.c.estado}» inválido (${ESTADOS.join(', ')})`);
    if (p.c.prova && !/^(sim|n[aã]o)$/i.test(p.c.prova)) falhas.push(`${onde}: prova «${p.c.prova}» inválida (sim ou nao)`);
    if (p.c.inicio && !p.inicio) falhas.push(`${onde}: início «${p.c.inicio}» não é AAAA-MM-DD nem data ISO com hora`);
    porId.set(p.c.id, [...(porId.get(p.c.id) || []), onde]);
  }
  for (const [id, onde] of porId) if (onde.length > 1) falhas.push(`id «${id}» repetido em ${onde.join(' e ')}`);
  return falhas;
}

export function lerCommits(raiz) {
  let saida;
  try {
    saida = execFileSync('git', ['-C', raiz, '-c', 'core.quotepath=false', '-c', 'i18n.logOutputEncoding=UTF-8', 'log', '--numstat', '--date=iso-strict',
      '--pretty=format:%x1e%H%x1f%h%x1f%ad%x1f%an%x1f%s'], { encoding: 'utf8', maxBuffer: 1024 * 1024 * 1024, stdio: ['ignore', 'pipe', 'pipe'] });
  } catch (err) {
    return { commits: [], aviso: `sem commits no git log (${String(err.stderr || err.message).trim().split(/\r?\n/)[0]})` };
  }
  const commits = [];
  for (const bloco of saida.split('\x1e').slice(1)) {
    const [cabeca, ...resto] = bloco.split('\n');
    const [hash, curto, data, autor, mensagem] = cabeca.split('\x1f');
    let ficheiros = 0, mais = 0, menos = 0;
    for (const l of resto) {
      const m = l.match(/^(\d+|-)\t(\d+|-)\t/);
      if (!m) continue;
      ficheiros++;
      if (m[1] !== '-') mais += Number(m[1]);
      if (m[2] !== '-') menos += Number(m[2]);
    }
    commits.push({ hash, curto, data: lerData(data), autor, mensagem, ficheiros, mais, menos });
  }
  return { commits: commits.reverse() };
}

const coluna = (i) => { let s = ''; for (i++; i; i = Math.floor((i - 1) / 26)) s = String.fromCharCode(65 + ((i - 1) % 26)) + s; return s; };
const num = (n) => String(Math.round(n * 1e10) / 1e10);

function estilosExcel(e) {
  const fontes = [], formatos = new Map(), xfs = [], cache = new Map();
  const preenchimentos = ['<fill><patternFill patternType="none"/></fill>', '<fill><patternFill patternType="gray125"/></fill>'];
  const indice = (l, x) => { const i = l.indexOf(x); return i >= 0 ? i : l.push(x) - 1; };
  const argb = (c) => 'FF' + c.slice(1).toUpperCase();
  const fonte = ({ negrito, cor = e.cores.texto, sublinhado, tamanho = e.letra.tamanho_texto_pt, letra = e.letra.texto }) =>
    indice(fontes, `<font>${negrito ? '<b/>' : ''}${sublinhado ? '<u/>' : ''}<sz val="${tamanho}"/><color rgb="${argb(cor)}"/><name val="${esc(letra)}"/><family val="2"/></font>`);
  const formato = (codigo) => {
    if (!codigo) return 0;
    if (codigo === '0%') return 9;
    if (!formatos.has(codigo)) formatos.set(codigo, 164 + formatos.size);
    return formatos.get(codigo);
  };
  fonte({});
  xfs.push('<xf numFmtId="0" fontId="0" fillId="0" borderId="0" xfId="0"/>');
  return {
    xf(p = {}) {
      const chave = JSON.stringify(p);
      if (cache.has(chave)) return cache.get(chave);
      const f = fonte(p), n = formato(p.formato);
      const fill = p.fundo ? indice(preenchimentos, `<fill><patternFill patternType="solid"><fgColor rgb="${argb(p.fundo)}"/><bgColor indexed="64"/></patternFill></fill>`) : 0;
      const alinhamento = p.alinhar ? `<alignment horizontal="${p.alinhar}"/>` : '';
      const i = indice(xfs, `<xf numFmtId="${n}" fontId="${f}" fillId="${fill}" borderId="0" xfId="0"${n ? ' applyNumberFormat="1"' : ''}${f ? ' applyFont="1"' : ''}${fill ? ' applyFill="1"' : ''}${alinhamento ? ` applyAlignment="1">${alinhamento}</xf>` : '/>'}`);
      cache.set(chave, i);
      return i;
    },
    xml: () => XML + '<styleSheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main">'
      + (formatos.size ? `<numFmts count="${formatos.size}">${[...formatos].map(([c, id]) => `<numFmt numFmtId="${id}" formatCode="${esc(c)}"/>`).join('')}</numFmts>` : '')
      + `<fonts count="${fontes.length}">${fontes.join('')}</fonts>`
      + `<fills count="${preenchimentos.length}">${preenchimentos.join('')}</fills>`
      + '<borders count="1"><border><left/><right/><top/><bottom/><diagonal/></border></borders>'
      + '<cellStyleXfs count="1"><xf numFmtId="0" fontId="0" fillId="0" borderId="0"/></cellStyleXfs>'
      + `<cellXfs count="${xfs.length}">${xfs.join('')}</cellXfs>`
      + '<cellStyles count="1"><cellStyle name="Normal" xfId="0" builtinId="0"/></cellStyles>'
      + '<dxfs count="0"/><tableStyles count="0"/></styleSheet>',
  };
}

// Uma célula: { v } valor (texto ou número), { f, v } fórmula com o valor em cache, { s } estilo.
function celulaXml(ref, c, idTexto) {
  if (!c) return '';
  const s = c.s ? ` s="${c.s}"` : '';
  if (c.f != null) {
    const texto = typeof c.v === 'string';
    return `<c r="${ref}"${s}${texto ? ' t="str"' : ''}><f>${esc(c.f)}</f><v>${texto ? esc(c.v) : num(c.v)}</v></c>`;
  }
  if (c.v == null || c.v === '') return c.s ? `<c r="${ref}"${s}/>` : '';
  if (typeof c.v === 'number') return `<c r="${ref}"${s}><v>${num(c.v)}</v></c>`;
  return `<c r="${ref}"${s} t="s"><v>${idTexto(String(c.v))}</v></c>`;
}

function folhaXml(folha, idTexto, primeira) {
  const nColunas = Math.max(1, ...folha.linhas.map((l) => l.length));
  const vista = folha.congelar ? '<pane ySplit="1" topLeftCell="A2" activePane="bottomLeft" state="frozen"/><selection pane="bottomLeft" activeCell="A2" sqref="A2"/>' : '';
  const linhas = folha.linhas.map((l, r) => {
    const celulas = l.map((c, k) => celulaXml(`${coluna(k)}${r + 1}`, c, idTexto)).join('');
    return celulas ? `<row r="${r + 1}">${celulas}</row>` : '';
  }).join('');
  return XML + '<worksheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships">'
    + `<dimension ref="A1:${coluna(nColunas - 1)}${Math.max(1, folha.linhas.length)}"/>`
    + `<sheetViews><sheetView workbookViewId="0"${primeira ? ' tabSelected="1"' : ''}>${vista}</sheetView></sheetViews>`
    + '<sheetFormatPr defaultRowHeight="15"/>'
    + `<cols>${folha.larguras.map((w, i) => `<col min="${i + 1}" max="${i + 1}" width="${w}" customWidth="1"/>`).join('')}</cols>`
    + `<sheetData>${linhas}</sheetData>`
    + (folha.filtro ? `<autoFilter ref="${folha.filtro}"/>` : '')
    + (folha.ligacoes?.length ? `<hyperlinks>${folha.ligacoes.map((l, i) => `<hyperlink ref="${l.ref}" r:id="rId${i + 1}"/>`).join('')}</hyperlinks>` : '')
    + '<pageMargins left="0.7" right="0.7" top="0.75" bottom="0.75" header="0.3" footer="0.3"/>'
    + '</worksheet>';
}

// Larguras pelo texto mais comprido de cada coluna; o cabeçalho leva mais espaço para a seta do filtro.
function larguras(linhas, minimo = 8, maximo = 60) {
  const n = Math.max(...linhas.map((l) => l.length));
  return Array.from({ length: n }, (_, k) => {
    let maior = 0;
    linhas.forEach((l, r) => {
      const c = l[k];
      if (!c || c.v == null) return;
      const t = c.mostrar ?? (typeof c.v === 'number' ? num(c.v) : String(c.v));
      maior = Math.max(maior, t.length + (r === 0 && c.cabecalho ? 4 : 0));
    });
    return Math.min(maximo, Math.max(minimo, Math.ceil(maior * 1.1 + 2)));
  });
}

const alvoRelativo = (caminho) => caminho.replace(/%/g, '%25').replace(/ /g, '%20').replace(/#/g, '%23');

export function livroExcel({ processos, commits, pasta, estilo: e }) {
  const x = estilosExcel(e);
  const cabecalho = x.xf({ negrito: true, cor: e.cores.cabecalho_tabela_texto, fundo: e.cores.cabecalho_tabela });
  const cab = (t) => ({ v: t, s: cabecalho, cabecalho: true });

  const COLUNAS = ['ID', 'Título', 'Fase', 'Skill', 'Sessão', 'Modelo', 'Effort', 'Início', 'Fim', 'Duração (min)', 'Estado', 'Prova', 'Retrabalho', 'Responde a', 'Commits', 'Reconstruído', 'Relatório'];
  const linhasP = [COLUNAS.map(cab)];
  const ligacoes = [];
  processos.forEach((p, i) => {
    const fundo = i % 2 ? e.cores.linha_alternada : undefined;
    const st = (props = {}) => x.xf({ ...props, ...(fundo ? { fundo } : {}) });
    const t = (v) => ({ v: v === '' || v == null ? null : v, s: st() });
    const data = (d, bruto) => (d ? { v: d.serie, s: st({ formato: d.comHora ? 'dd/mm/yyyy hh:mm' : 'dd/mm/yyyy' }), mostrar: d.comHora ? '00/00/0000 00:00' : '00/00/0000' } : t(bruto));
    const alvo = rel(pasta, p.ficheiro);
    linhasP.push([
      t(p.c.id), t(p.c.titulo), t(p.c.fase), t(p.skills.join(', ')), t(p.c.sessao), t(p.c.modelo), t(p.c.effort),
      data(p.inicio, p.c.inicio), data(p.fim, p.c.fim), t(p.duracao), t(p.estado), t(p.prova), t(p.retrabalho),
      t(p.c.responde_a), t(p.commits.join(', ')), t(p.reconstruido),
      { v: alvo, s: st({ cor: e.cores.ligacao, sublinhado: true }) },
    ]);
    ligacoes.push({ ref: `Q${i + 2}`, alvo: alvoRelativo(alvo) });
  });

  const linhasC = [['Data', 'Hash', 'Autor', 'Mensagem', 'Ficheiros', 'Linhas +', 'Linhas −'].map(cab)];
  commits.forEach((c, i) => {
    const fundo = i % 2 ? e.cores.linha_alternada : undefined;
    const st = (props = {}) => x.xf({ ...props, ...(fundo ? { fundo } : {}) });
    linhasC.push([
      c.data ? { v: c.data.serie, s: st({ formato: 'dd/mm/yyyy hh:mm' }), mostrar: '00/00/0000 00:00' } : { v: null, s: st() },
      { v: c.curto, s: st() }, { v: c.autor, s: st() }, { v: c.mensagem, s: st() },
      { v: c.ficheiros, s: st() }, { v: c.mais, s: st() }, { v: c.menos, s: st() },
    ]);
  });

  const { linhas: linhasE, resumo } = estatisticas(processos, commits, x, e, cab);

  const folhas = [
    { nome: 'Processos', linhas: linhasP, larguras: larguras(linhasP), congelar: true, filtro: `A1:${coluna(COLUNAS.length - 1)}${linhasP.length}`, ligacoes },
    { nome: 'Estatísticas', linhas: linhasE, larguras: [28, 14, 14, 14, 16, 18] },
    { nome: 'Commits', linhas: linhasC, larguras: larguras(linhasC, 8, 80), congelar: true, filtro: `A1:G${linhasC.length}` },
  ];

  const textos = new Map();
  const idTexto = (s) => { if (!textos.has(s)) textos.set(s, textos.size); return textos.get(s); };
  const partes = folhas.map((f, i) => folhaXml(f, idTexto, i === 0));
  let usos = 0;
  for (const f of folhas) for (const l of f.linhas) for (const c of l) if (c && c.f == null && typeof c.v === 'string' && c.v !== '') usos++;

  const T = 'application/vnd.openxmlformats-officedocument.spreadsheetml.';
  const filtros = folhas.map((f, i) => (f.filtro ? `<definedName name="_xlnm._FilterDatabase" localSheetId="${i}" hidden="1">'${f.nome}'!${f.filtro.replace(/([A-Z]+)(\d+)/g, '$$$1$$$2')}</definedName>` : '')).join('');
  const entradas = [
    { nome: '[Content_Types].xml', dados: tiposDeConteudo(
      { rels: 'application/vnd.openxmlformats-package.relationships+xml', xml: 'application/xml' },
      {
        '/xl/workbook.xml': T + 'sheet.main+xml', '/xl/styles.xml': T + 'styles+xml', '/xl/sharedStrings.xml': T + 'sharedStrings+xml',
        ...Object.fromEntries(folhas.map((_, i) => [`/xl/worksheets/sheet${i + 1}.xml`, T + 'worksheet+xml'])),
      }) },
    { nome: '_rels/.rels', dados: relacoes([{ id: 'rId1', tipo: REL.documento, alvo: 'xl/workbook.xml' }]) },
    { nome: 'xl/workbook.xml', dados: XML + '<workbook xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships">'
      + '<bookViews><workbookView xWindow="0" yWindow="0" windowWidth="28800" windowHeight="15000" activeTab="0"/></bookViews>'
      + `<sheets>${folhas.map((f, i) => `<sheet name="${esc(f.nome)}" sheetId="${i + 1}" r:id="rId${i + 1}"/>`).join('')}</sheets>`
      + (filtros ? `<definedNames>${filtros}</definedNames>` : '')
      + '<calcPr calcId="191029" fullCalcOnLoad="1"/></workbook>' },
    { nome: 'xl/_rels/workbook.xml.rels', dados: relacoes([
      ...folhas.map((_, i) => ({ id: `rId${i + 1}`, tipo: REL.folha, alvo: `worksheets/sheet${i + 1}.xml` })),
      { id: `rId${folhas.length + 1}`, tipo: REL.estilos, alvo: 'styles.xml' },
      { id: `rId${folhas.length + 2}`, tipo: REL.textos, alvo: 'sharedStrings.xml' },
    ]) },
    ...partes.map((dados, i) => ({ nome: `xl/worksheets/sheet${i + 1}.xml`, dados })),
    ...folhas.flatMap((f, i) => (f.ligacoes?.length ? [{ nome: `xl/worksheets/_rels/sheet${i + 1}.xml.rels`,
      dados: relacoes(f.ligacoes.map((l, k) => ({ id: `rId${k + 1}`, tipo: REL.ligacao, alvo: l.alvo, externo: true }))) }] : [])),
    { nome: 'xl/styles.xml', dados: x.xml() },
    { nome: 'xl/sharedStrings.xml', dados: XML + `<sst xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" count="${usos}" uniqueCount="${textos.size}">`
      + [...textos.keys()].map((t) => `<si><t xml:space="preserve">${esc(t)}</t></si>`).join('') + '</sst>' },
  ];
  return { zip: escreverZip(entradas), resumo };
}

// Folha Estatísticas: só fórmulas sobre Processos e Commits, cada uma com o valor que dá guardado em cache.
// As contas em JavaScript imitam as do Excel (COUNTIFS não distingue maiúsculas; "*"&skill&"*" apanha a skill dentro da lista).
function estatisticas(processos, commits, x, e, cab) {
  const linhas = [];
  const lc = (s) => String(s ?? '').toLowerCase();
  const soma = (l) => l.reduce((a, b) => a + b, 0);
  const numeros = (l) => l.filter((v) => typeof v === 'number');
  const st = {
    titulo: x.xf({ negrito: true, cor: e.cores.titulos, tamanho: e.letra.tamanho_texto_pt + 5, letra: e.letra.titulos }),
    bloco: x.xf({ negrito: true, cor: e.cores.titulos, tamanho: e.letra.tamanho_texto_pt + 1, letra: e.letra.titulos }),
    pct: x.xf({ formato: '0%' }), dec: x.xf({ formato: '0.0' }), mes: x.xf({ formato: 'yyyy-mm', alinhar: 'left' }),
  };
  const proxima = () => linhas.length + 1;
  const f = (formula, valor, s) => ({ f: formula, v: valor, s });

  linhas.push([{ v: 'Estatísticas', s: st.titulo }], []);

  const n = processos.length;
  linhas.push([{ v: 'Totais', s: st.bloco }]);
  const rTotal = proxima();
  const feitos = processos.filter((p) => p.estado === 'feito').length;
  const comProva = processos.filter((p) => lc(p.prova) === 'sim').length;
  linhas.push([{ v: 'Processos' }, f('COUNTA(Processos!$A:$A)-1', n)]);
  linhas.push([{ v: 'Feitos' }, f('COUNTIFS(Processos!$K:$K,"feito")', feitos)]);
  linhas.push([{ v: 'Com prova' }, f('COUNTIFS(Processos!$L:$L,"sim")', comProva)]);
  linhas.push([{ v: '% com prova' }, f(`IF(B${rTotal}=0,0,B${rTotal + 2}/B${rTotal})`, n ? comProva / n : 0, st.pct)]);
  // Sem nenhuma duração registada a célula fica vazia: um 0 leria-se como «zero minutos».
  const duracoes = numeros(processos.map((p) => p.duracao));
  linhas.push([{ v: 'Duração registada (min)' }, f('IF(COUNT(Processos!$J:$J)=0,"",SUM(Processos!$J:$J))', duracoes.length ? soma(duracoes) : '')]);
  linhas.push([{ v: 'Retrabalho total' }, f('SUM(Processos!$M:$M)', soma(numeros(processos.map((p) => p.retrabalho))))]);
  const reconstruidos = processos.filter((p) => p.reconstruido === 'sim').length;
  linhas.push([{ v: 'Reconstruídos' }, f('COUNTIFS(Processos!$P:$P,"sim")', reconstruidos)]);
  linhas.push([]);

  // Um bloco por agrupamento: o critério em fórmula e o mesmo critério em JavaScript.
  const grupo = (titulo, rotulo, itens) => {
    linhas.push([{ v: titulo, s: st.bloco }]);
    linhas.push([rotulo, 'Processos', 'Feitos', '% com prova', 'Duração (min)', 'Retrabalho médio'].map(cab));
    for (const { nome, criterio, apanha } of itens) {
      const r = proxima();
      const c = criterio(r);
      const sel = processos.filter(apanha);
      const total = sel.length;
      const retrabalho = numeros(sel.map((p) => p.retrabalho));
      linhas.push([
        { v: nome },
        f(`COUNTIFS(${c})`, total),
        f(`COUNTIFS(${c},Processos!$K:$K,"feito")`, sel.filter((p) => p.estado === 'feito').length),
        f(`IF(B${r}=0,0,COUNTIFS(${c},Processos!$L:$L,"sim")/B${r})`, total ? sel.filter((p) => lc(p.prova) === 'sim').length / total : 0, st.pct),
        f(`IF(COUNTIFS(${c},Processos!$J:$J,"<>")=0,"",SUMIFS(Processos!$J:$J,${c}))`, numeros(sel.map((p) => p.duracao)).length ? soma(numeros(sel.map((p) => p.duracao))) : ''),
        f(`IFERROR(AVERAGEIFS(Processos!$M:$M,${c}),"")`, retrabalho.length ? soma(retrabalho) / retrabalho.length : '', st.dec),
      ]);
    }
    linhas.push([]);
  };

  const unicos = (valores) => {
    const vistos = new Map();
    for (const v of valores) if (v && !vistos.has(lc(v))) vistos.set(lc(v), v);
    return [...vistos.values()];
  };
  const skills = unicos(processos.flatMap((p) => p.skills)).sort((a, b) => a.localeCompare(b));
  const textoSkills = new Map(processos.map((p) => [p, lc(p.skills.join(', '))]));
  grupo('Por skill', 'Skill', skills.map((s) => ({
    nome: s, criterio: (r) => `Processos!$D:$D,"*"&A${r}&"*"`, apanha: (p) => textoSkills.get(p).includes(lc(s)),
  })));

  const fases = unicos(processos.map((p) => p.c.fase));
  const itensFase = fases.map((fase) => ({ nome: fase, criterio: (r) => `Processos!$C:$C,A${r}`, apanha: (p) => lc(p.c.fase) === lc(fase) }));
  if (processos.some((p) => !p.c.fase)) {
    itensFase.push({ nome: '(sem fase)', criterio: () => 'Processos!$C:$C,"",Processos!$A:$A,"<>"', apanha: (p) => !p.c.fase });
  }
  grupo('Por fase', 'Fase', itensFase);

  linhas.push([{ v: 'Por estado', s: st.bloco }]);
  linhas.push(['Estado', 'Processos', '% do total'].map(cab));
  for (const estado of ESTADOS) {
    const r = proxima();
    const k = processos.filter((p) => p.estado === estado).length;
    linhas.push([{ v: estado }, f(`COUNTIFS(Processos!$K:$K,A${r})`, k), f(`IF($B$${rTotal}=0,0,B${r}/$B$${rTotal})`, n ? k / n : 0, st.pct)]);
  }
  linhas.push([]);

  const meses = [...new Set([...processos.map((p) => p.inicio?.mes), ...commits.map((c) => c.data?.mes)].filter((m) => m != null))].sort((a, b) => a - b);
  linhas.push([{ v: 'Por mês', s: st.bloco }]);
  linhas.push(['Mês', 'Processos', 'Commits'].map(cab));
  for (const mes of meses) {
    const r = proxima();
    const d = new Date(mes);
    const ini = serieDe(mes), fim = serieDe(Date.UTC(d.getUTCFullYear(), d.getUTCMonth() + 1, 1));
    const dentro = (s) => s != null && s >= ini && s < fim;
    const ate = `DATE(YEAR(A${r}),MONTH(A${r})+1,1)`;
    linhas.push([
      { v: ini, s: st.mes, mostrar: '0000-00' },
      f(`COUNTIFS(Processos!$H:$H,">="&A${r},Processos!$H:$H,"<"&${ate})`, processos.filter((p) => dentro(p.inicio?.serie)).length),
      f(`COUNTIFS(Commits!$A:$A,">="&A${r},Commits!$A:$A,"<"&${ate})`, commits.filter((c) => dentro(c.data?.serie)).length),
    ]);
  }
  linhas.push([]);

  linhas.push([{ v: 'Commits', s: st.bloco }]);
  const fimAutores = Math.max(2, commits.length + 1);
  const intervalo = `Commits!$C$2:$C$${fimAutores}`;
  const autores = new Set(commits.map((c) => lc(c.autor)).filter(Boolean)).size;
  linhas.push([{ v: 'Commits' }, f('COUNTA(Commits!$B:$B)-1', commits.length)]);
  linhas.push([{ v: 'Autores' }, f(`SUMPRODUCT((${intervalo}<>"")/COUNTIF(${intervalo},${intervalo}&""))`, autores)]);
  linhas.push([{ v: 'Linhas acrescentadas' }, f('SUM(Commits!$F:$F)', soma(commits.map((c) => c.mais)))]);
  linhas.push([{ v: 'Linhas retiradas' }, f('SUM(Commits!$G:$G)', soma(commits.map((c) => c.menos)))]);

  return { linhas, resumo: { processos: n, feitos, comProva, reconstruidos, skills: skills.length, fases: fases.length, meses: meses.length, autores } };
}

const QUEBRA = '\u0001quebra';
const CERCA = /^\s*(`{3,}|~{3,})/;
const TITULO = /^(#{1,6})\s+(.*?)(?:\s+#+)?\s*$/;
const REGRA = /^\s*([-*_])(?:\s*\1){2,}\s*$/;
const ITEM = /^(\s*)([-*+]|\d{1,9}[.)])\s+(.*)$/;
const SEPARADOR = /^\s*\|?\s*:?-+:?\s*(\|\s*:?-+:?\s*)*\|?\s*$/;
const INDICE = /^\s*\[\[indice\]\]\s*$/i;

// Tira os comentários HTML, também os de várias linhas, fora dos blocos de código.
// <!-- quebra --> fica como uma linha marcada, que vira quebra de página.
export function semComentarios(texto) {
  const out = [];
  let cerca = null, dentro = false;
  for (const linha of texto.split('\n')) {
    if (!dentro) {
      const f = linha.match(CERCA);
      if (cerca) {
        out.push(linha);
        if (f && f[1][0] === cerca[0] && f[1].length >= cerca.length && /^\s*[`~]+\s*$/.test(linha)) cerca = null;
        continue;
      }
      if (f) { cerca = f[1]; out.push(linha); continue; }
    }
    let resto = linha, atual = '';
    const pedacos = [];
    while (resto) {
      if (dentro) {
        const fim = resto.indexOf('-->');
        if (fim < 0) { resto = ''; break; }
        resto = resto.slice(fim + 3);
        dentro = false;
        continue;
      }
      const ini = resto.indexOf('<!--');
      if (ini < 0) { atual += resto; break; }
      atual += resto.slice(0, ini);
      const fim = resto.indexOf('-->', ini + 4);
      if (fim < 0) { dentro = true; resto = ''; break; }
      if (/^quebra$/i.test(resto.slice(ini + 4, fim).trim())) { pedacos.push(atual, QUEBRA); atual = ''; }
      resto = resto.slice(fim + 3);
      // «texto <!-- nota --> texto» fica com um só espaço.
      if (/\s$/.test(atual)) resto = resto.replace(/^\s+/, '');
    }
    pedacos.push(atual);
    for (const p of pedacos) out.push(p === QUEBRA ? p : (p.trim() ? p : ''));
  }
  return out.join('\n');
}

const vazia = (l) => /^\s*$/.test(l);
const recuo = (l) => l.match(/^\s*/)[0].replace(/\t/g, '    ').length;
const eTabela = (l, seguinte) => l.includes('|') && seguinte != null && SEPARADOR.test(seguinte) && seguinte.includes('-');
const comecaBloco = (l, seguinte) => l === QUEBRA || INDICE.test(l) || CERCA.test(l) || TITULO.test(l) || REGRA.test(l) || /^\s*>/.test(l) || ITEM.test(l) || eTabela(l, seguinte);

function celulasDe(l) {
  let s = l.trim();
  if (s.startsWith('|')) s = s.slice(1);
  if (s.endsWith('|') && !s.endsWith('\\|')) s = s.slice(0, -1);
  return s.split(/(?<!\\)\|/).map((c) => c.trim().replace(/\\\|/g, '|'));
}

// Linhas de um parágrafo: dois espaços ou «\» no fim quebram a linha; o resto junta-se com um espaço.
const juntar = (linhas) => linhas.map((l, i) => {
  const t = l.trim();
  if (i === linhas.length - 1) return t.replace(/\\$/, '');
  return /( {2,}|\\)$/.test(l.replace(/\r$/, '')) ? t.replace(/\\$/, '') + '\n' : t + ' ';
}).join('');

export function blocosMarkdown(texto) {
  const linhas = semComentarios(texto.replace(/\r\n?/g, '\n')).split('\n');
  const blocos = [];
  let i = 0;
  while (i < linhas.length) {
    const l = linhas[i];
    let m;
    if (vazia(l)) { i++; continue; }
    if (l === QUEBRA) { blocos.push({ tipo: 'quebra' }); i++; continue; }
    if (INDICE.test(l)) { blocos.push({ tipo: 'indice' }); i++; continue; }
    if ((m = l.match(CERCA))) {
      const fecho = new RegExp(`^\\s*${m[1][0] === '`' ? '`' : '~'}{${m[1].length},}\\s*$`);
      const codigo = [];
      for (i++; i < linhas.length && !fecho.test(linhas[i]); i++) codigo.push(linhas[i]);
      i++;
      blocos.push({ tipo: 'codigo', linhas: codigo });
      continue;
    }
    if ((m = l.match(TITULO))) { blocos.push({ tipo: 'titulo', nivel: Math.min(3, m[1].length), texto: m[2] }); i++; continue; }
    if (REGRA.test(l)) { blocos.push({ tipo: 'regra' }); i++; continue; }
    if (/^\s*>/.test(l)) {
      const dentro = [];
      while (i < linhas.length && /^\s*>/.test(linhas[i])) dentro.push(linhas[i++].replace(/^\s*>\s?/, ''));
      const paragrafos = [];
      let atual = [];
      for (const d of [...dentro, '']) {
        if (vazia(d)) { if (atual.length) paragrafos.push(juntar(atual)); atual = []; } else atual.push(d);
      }
      blocos.push({ tipo: 'citacao', paragrafos });
      continue;
    }
    if (eTabela(l, linhas[i + 1])) {
      const cabecalho = celulasDe(l);
      const alinhamento = celulasDe(linhas[i + 1]).map((c) => (/^:-+:$/.test(c) ? 'center' : /-:$/.test(c) ? 'right' : null));
      const corpo = [];
      for (i += 2; i < linhas.length && !vazia(linhas[i]) && linhas[i].includes('|'); i++) corpo.push(celulasDe(linhas[i]));
      const n = cabecalho.length;
      blocos.push({ tipo: 'tabela', cabecalho, alinhamento: alinhamento.slice(0, n), linhas: corpo.map((r) => Array.from({ length: n }, (_, k) => r[k] ?? '')) });
      continue;
    }
    if (ITEM.test(l) && !REGRA.test(l)) {
      const base = recuo(l);
      const itens = [];
      while (i < linhas.length) {
        const x = linhas[i];
        if (vazia(x)) {
          let j = i + 1;
          while (j < linhas.length && vazia(linhas[j])) j++;
          if (j < linhas.length && ((ITEM.test(linhas[j]) && !REGRA.test(linhas[j])) || recuo(linhas[j]) > base)) { i = j; continue; }
          break;
        }
        const it = x.match(ITEM);
        if (it && !REGRA.test(x) && recuo(x) >= base) {
          const nivel = recuo(x) > base ? 1 : 0, ordenada = /\d/.test(it[2]);
          // Trocar de marcas para números (ou o contrário) no primeiro nível começa outra lista.
          if (nivel === 0 && itens.length && itens[0].ordenada !== ordenada) break;
          itens.push({ nivel, ordenada, numero: parseInt(it[2], 10) || 1, texto: it[3].trim() });
          i++;
          continue;
        }
        if (recuo(x) > base || !comecaBloco(x, linhas[i + 1])) { itens.at(-1).texto += ' ' + x.trim(); i++; continue; }
        break;
      }
      blocos.push({ tipo: 'lista', itens });
      continue;
    }
    const partes = [l];
    for (i++; i < linhas.length && !vazia(linhas[i]) && !comecaBloco(linhas[i], linhas[i + 1]); i++) partes.push(linhas[i]);
    blocos.push({ tipo: 'paragrafo', texto: juntar(partes) });
  }
  return blocos;
}

// Procura o fecho de uma marca (** ou *) a partir de i, saltando escapes e código.
function fechoDe(texto, i, marca) {
  for (let j = i; j < texto.length; j++) {
    const c = texto[j];
    if (c === '\\') { j++; continue; }
    if (c === '`') { const f = texto.indexOf('`', j + 1); if (f > 0) { j = f; continue; } }
    if (texto.startsWith(marca, j) && j > i && !/\s/.test(texto[j - 1])) {
      if (marca.length === 1 && texto[j + 1] === marca) { j++; continue; }
      if (marca[0] === '_' && /[\p{L}\p{N}]/u.test(texto[j + marca.length] || '')) continue;
      return j;
    }
  }
  return -1;
}

function parenteseDe(texto, i) {
  let nivel = 0;
  for (let j = i; j < texto.length; j++) {
    if (texto[j] === '\\') { j++; continue; }
    if (texto[j] === '[') nivel++;
    else if (texto[j] === ']' && --nivel === 0) return j;
  }
  return -1;
}

/** Texto em linha -> pedaços { texto, negrito, italico, codigo, ligacao } ou { imagem, alt, ligacao }. */
export function emLinha(texto, fmt = {}) {
  const out = [];
  let buf = '';
  const largar = () => { if (buf) out.push({ ...fmt, texto: buf }); buf = ''; };
  for (let i = 0; i < texto.length;) {
    const c = texto[i];
    const resto = texto.slice(i);
    let m;
    if (c === '\\' && /[\\`*_{}[\]()#+\-.!|<>~]/.test(texto[i + 1] || '')) { buf += texto[i + 1]; i += 2; continue; }
    if (c === '`') {
      const n = resto.match(/^`+/)[0].length;
      const fim = texto.indexOf('`'.repeat(n), i + n);
      if (fim > 0) { largar(); out.push({ ...fmt, texto: texto.slice(i + n, fim).replace(/^ (.*) $/, '$1'), codigo: true }); i = fim + n; continue; }
    }
    if (c === '!' && (m = resto.match(/^!\[([^\]]*)\]\(\s*<?([^)\s>]+)>?(?:\s+"[^"]*")?\s*\)/))) {
      largar(); out.push({ ...fmt, imagem: m[2], alt: m[1] }); i += m[0].length; continue;
    }
    if (c === '[') {
      const fecho = parenteseDe(texto, i);
      if (fecho > 0 && (m = texto.slice(fecho + 1).match(/^\(\s*<?([^)\s>]*)>?(?:\s+"[^"]*")?\s*\)/))) {
        largar(); out.push(...emLinha(texto.slice(i + 1, fecho), { ...fmt, ligacao: m[1] })); i = fecho + 1 + m[0].length; continue;
      }
    }
    if (c === '<' && (m = resto.match(/^<((?:https?|mailto):[^>\s]+)>/))) {
      largar(); out.push({ ...fmt, texto: m[1].replace(/^mailto:/, ''), ligacao: m[1] }); i += m[0].length; continue;
    }
    if ((c === '*' || c === '_') && !/\s/.test(texto[i + 1] || ' ') && !(c === '_' && /[\p{L}\p{N}]/u.test(texto[i - 1] || ''))) {
      const marca = resto.startsWith(c.repeat(3)) ? c.repeat(3) : resto.startsWith(c.repeat(2)) ? c.repeat(2) : c;
      const fim = fechoDe(texto, i + marca.length, marca);
      if (fim > 0) {
        largar();
        const novo = { ...fmt, ...(marca.length !== 1 ? { negrito: true } : {}), ...(marca.length !== 2 ? { italico: true } : {}) };
        out.push(...emLinha(texto.slice(i + marca.length, fim), novo));
        i = fim + marca.length;
        continue;
      }
    }
    buf += c;
    i++;
  }
  largar();
  return out;
}

const textoSimples = (pedacos) => pedacos.map((p) => p.texto ?? p.alt ?? '').join('');

/** Dimensões de um PNG ou JPEG pelo cabeçalho, com a densidade (dpi) quando vem no ficheiro. */
export function dimensoesDeImagem(b) {
  if (b.length > 24 && b.readUInt32BE(0) === 0x89504e47) {
    let dpi = 96;
    for (let p = 8; p + 12 <= b.length;) {
      const tam = b.readUInt32BE(p), tipo = b.toString('ascii', p + 4, p + 8);
      if (tipo === 'pHYs' && b[p + 16] === 1) dpi = Math.round(b.readUInt32BE(p + 8) * 0.0254) || 96;
      if (tipo === 'IDAT' || tipo === 'IEND') break;
      p += 12 + tam;
    }
    return { tipo: 'png', largura: b.readUInt32BE(16), altura: b.readUInt32BE(20), dpi };
  }
  if (b[0] === 0xff && b[1] === 0xd8) {
    let dpi = 96;
    for (let p = 2; p + 9 < b.length;) {
      if (b[p] !== 0xff) { p++; continue; }
      const marca = b[p + 1];
      if (marca === 0xff) { p++; continue; }
      if (marca === 0xd8 || marca === 0x01 || (marca >= 0xd0 && marca <= 0xd7)) { p += 2; continue; }
      const tam = b.readUInt16BE(p + 2);
      if (marca === 0xe0 && b.toString('ascii', p + 4, p + 9) === 'JFIF\0') {
        const unidade = b[p + 11], densidade = b.readUInt16BE(p + 12);
        if (unidade === 1 && densidade) dpi = densidade;
        if (unidade === 2 && densidade) dpi = Math.round(densidade * 2.54);
      }
      if (marca >= 0xc0 && marca <= 0xcf && ![0xc4, 0xc8, 0xcc].includes(marca)) {
        return { tipo: 'jpeg', altura: b.readUInt16BE(p + 5), largura: b.readUInt16BE(p + 7), dpi };
      }
      p += 2 + tam;
    }
  }
  return null;
}

const NS_W = 'xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships" xmlns:wp="http://schemas.openxmlformats.org/drawingml/2006/wordprocessingDrawing"';
const NS_A = 'http://schemas.openxmlformats.org/drawingml/2006/main';
const NS_PIC = 'http://schemas.openxmlformats.org/drawingml/2006/picture';
const twips = (mm) => Math.round((mm * 1440) / 25.4);
const EMU_MM = 36000;
const MONO = 'Consolas';
const CINZA_CODIGO = 'F2F2F2';

function estilosWord(e) {
  const meios = (pt) => Math.round(pt * 2);
  const letra = (n) => `<w:rFonts w:ascii="${esc(n)}" w:hAnsi="${esc(n)}" w:eastAsia="${esc(n)}" w:cs="${esc(n)}"/>`;
  const cor = (c) => c.slice(1).toUpperCase();
  const tamanho = (pt) => `<w:sz w:val="${meios(pt)}"/><w:szCs w:val="${meios(pt)}"/>`;
  const t = e.letra.tamanho_texto_pt;
  const secundario = cor(clarear(e.cores.texto, 0.35));
  const borda = cor(clarear(e.cores.texto, 0.75));
  const estilo = (tipo, id, nome, { base, seguinte, extra = '', pPr = '', rPr = '', tblPr = '', resto = '', omissao = false } = {}) =>
    `<w:style w:type="${tipo}"${omissao ? ' w:default="1"' : ''} w:styleId="${id}"><w:name w:val="${nome}"/>`
    + (base ? `<w:basedOn w:val="${base}"/>` : '') + (seguinte ? `<w:next w:val="${seguinte}"/>` : '') + extra
    + (pPr ? `<w:pPr>${pPr}</w:pPr>` : '') + (rPr ? `<w:rPr>${rPr}</w:rPr>` : '') + (tblPr ? `<w:tblPr>${tblPr}</w:tblPr>` : '') + resto + '</w:style>';
  const titulo = (n, antes, depois, pt) => estilo('paragraph', `Heading${n}`, `heading ${n}`, {
    base: 'Normal', seguinte: 'Normal', extra: '<w:uiPriority w:val="9"/><w:qFormat/>',
    pPr: `<w:keepNext/><w:keepLines/><w:spacing w:before="${antes}" w:after="${depois}"/><w:outlineLvl w:val="${n - 1}"/>`,
    rPr: `${letra(e.letra.titulos)}<w:b/><w:bCs/><w:color w:val="${cor(e.cores.titulos)}"/>${tamanho(pt)}`,
  });
  const indice = (n) => estilo('paragraph', `TOC${n}`, `toc ${n}`, {
    base: 'Normal', seguinte: 'Normal', extra: '<w:uiPriority w:val="39"/><w:unhideWhenUsed/>',
    pPr: `<w:spacing w:after="60"/><w:ind w:left="${(n - 1) * 220}"/>`,
  });
  const linhaBorda = (lado, c, espaco = 0, sz = 4) => `<w:${lado} w:val="single" w:sz="${sz}" w:space="${espaco}" w:color="${c}"/>`;

  return XML + `<w:styles ${NS_W}>`
    + `<w:docDefaults><w:rPrDefault><w:rPr>${letra(e.letra.texto)}<w:color w:val="${cor(e.cores.texto)}"/>${tamanho(t)}<w:lang w:val="pt-PT" w:eastAsia="en-US" w:bidi="ar-SA"/></w:rPr></w:rPrDefault>`
    + '<w:pPrDefault><w:pPr><w:spacing w:after="160" w:line="276" w:lineRule="auto"/></w:pPr></w:pPrDefault></w:docDefaults>'
    + estilo('paragraph', 'Normal', 'Normal', { omissao: true, extra: '<w:qFormat/>' })
    + estilo('character', 'DefaultParagraphFont', 'Default Paragraph Font', { omissao: true, extra: '<w:uiPriority w:val="1"/><w:semiHidden/><w:unhideWhenUsed/>' })
    + estilo('table', 'TableNormal', 'Normal Table', { omissao: true, extra: '<w:uiPriority w:val="99"/><w:semiHidden/><w:unhideWhenUsed/>',
      tblPr: '<w:tblInd w:w="0" w:type="dxa"/><w:tblCellMar><w:top w:w="0" w:type="dxa"/><w:left w:w="108" w:type="dxa"/><w:bottom w:w="0" w:type="dxa"/><w:right w:w="108" w:type="dxa"/></w:tblCellMar>' })
    + estilo('numbering', 'NoList', 'No List', { omissao: true, extra: '<w:uiPriority w:val="99"/><w:semiHidden/><w:unhideWhenUsed/>' })
    + estilo('paragraph', 'Title', 'Title', { base: 'Normal', seguinte: 'Normal', extra: '<w:uiPriority w:val="10"/><w:qFormat/>',
      pPr: '<w:spacing w:after="240" w:line="240" w:lineRule="auto"/><w:contextualSpacing/>',
      rPr: `${letra(e.letra.titulos)}<w:b/><w:bCs/><w:color w:val="${cor(e.cores.titulos)}"/><w:kern w:val="28"/>${tamanho(t + 17)}` })
    + estilo('paragraph', 'Subtitle', 'Subtitle', { base: 'Normal', seguinte: 'Normal', extra: '<w:uiPriority w:val="11"/><w:qFormat/>',
      pPr: '<w:spacing w:after="480"/>', rPr: `${letra(e.letra.titulos)}<w:color w:val="${secundario}"/>${tamanho(t + 3)}` })
    + titulo(1, 360, 120, t + 5) + titulo(2, 280, 80, t + 2) + titulo(3, 200, 60, t + 1)
    + estilo('paragraph', 'Quote', 'Quote', { base: 'Normal', seguinte: 'Normal', extra: '<w:uiPriority w:val="29"/><w:qFormat/>',
      pPr: `<w:pBdr>${linhaBorda('left', cor(e.cores.destaque[0] || e.cores.titulos), 8, 18)}</w:pBdr><w:spacing w:before="120" w:after="120"/><w:ind w:left="284" w:right="284"/>`,
      rPr: `<w:i/><w:iCs/><w:color w:val="${secundario}"/>` })
    + estilo('paragraph', 'Code', 'Code', { base: 'Normal', extra: '<w:uiPriority w:val="39"/><w:qFormat/>',
      pPr: `<w:pBdr>${['top', 'left', 'bottom', 'right'].map((l) => linhaBorda(l, CINZA_CODIGO, 4)).join('')}</w:pBdr><w:shd w:val="clear" w:color="auto" w:fill="${CINZA_CODIGO}"/><w:spacing w:after="0" w:line="240" w:lineRule="auto"/>`,
      rPr: `${letra(MONO)}<w:noProof/>${tamanho(t - 1.5)}` })
    + estilo('character', 'CodeChar', 'Code Char', { base: 'DefaultParagraphFont', extra: '<w:uiPriority w:val="39"/>',
      rPr: `${letra(MONO)}<w:noProof/><w:shd w:val="clear" w:color="auto" w:fill="${CINZA_CODIGO}"/>` })
    + estilo('paragraph', 'ListParagraph', 'List Paragraph', { base: 'Normal', extra: '<w:uiPriority w:val="34"/><w:qFormat/>',
      pPr: '<w:spacing w:after="60"/><w:ind w:left="720"/>' })
    + estilo('character', 'Hyperlink', 'Hyperlink', { base: 'DefaultParagraphFont', extra: '<w:uiPriority w:val="99"/><w:unhideWhenUsed/>',
      rPr: `<w:color w:val="${cor(e.cores.ligacao)}"/><w:u w:val="single"/>` })
    + estilo('paragraph', 'Header', 'header', { base: 'Normal', extra: '<w:uiPriority w:val="99"/><w:unhideWhenUsed/>',
      pPr: '<w:spacing w:after="0" w:line="240" w:lineRule="auto"/>', rPr: `<w:color w:val="${secundario}"/>${tamanho(t - 2)}` })
    + estilo('paragraph', 'Footer', 'footer', { base: 'Normal', extra: '<w:uiPriority w:val="99"/><w:unhideWhenUsed/>',
      pPr: '<w:spacing w:after="0" w:line="240" w:lineRule="auto"/>', rPr: `<w:color w:val="${secundario}"/>${tamanho(t - 2)}` })
    + estilo('paragraph', 'TOCHeading', 'TOC Heading', { base: 'Heading1', seguinte: 'Normal', extra: '<w:uiPriority w:val="39"/><w:unhideWhenUsed/><w:qFormat/>',
      pPr: '<w:outlineLvl w:val="9"/>' })
    + indice(1) + indice(2) + indice(3)
    + estilo('table', 'Tabela', 'Tabela', { base: 'TableNormal', extra: '<w:uiPriority w:val="59"/>',
      pPr: '<w:spacing w:before="40" w:after="40" w:line="240" w:lineRule="auto"/>', rPr: tamanho(t - 1),
      tblPr: `<w:tblBorders>${linhaBorda('top', borda)}${linhaBorda('bottom', borda)}${linhaBorda('insideH', borda)}</w:tblBorders>`
        + '<w:tblCellMar><w:top w:w="40" w:type="dxa"/><w:left w:w="100" w:type="dxa"/><w:bottom w:w="40" w:type="dxa"/><w:right w:w="100" w:type="dxa"/></w:tblCellMar>',
      resto: `<w:tblStylePr w:type="firstRow"><w:rPr><w:b/><w:bCs/><w:color w:val="${cor(e.cores.cabecalho_tabela_texto)}"/></w:rPr><w:tcPr><w:shd w:val="clear" w:color="auto" w:fill="${cor(e.cores.cabecalho_tabela)}"/></w:tcPr></w:tblStylePr>`
        + `<w:tblStylePr w:type="band2Horz"><w:tcPr><w:shd w:val="clear" w:color="auto" w:fill="${cor(e.cores.linha_alternada)}"/></w:tcPr></w:tblStylePr>` })
    + '</w:styles>';
}

const DATA_LONGA = new Intl.DateTimeFormat('pt-PT', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' });

/**
 * Converte um Markdown num .docx com o estilo dado.
 * @returns {{ zip: Buffer, contagem: object, titulo: string }}
 */
export function documentoWord(md, { pastaMd, estilo: e, tituloPorOmissao, avisos = [], onde = 'documento' }) {
  const { campos, corpo: textoCorpo } = frontmatter(md);
  const fm = campos || {};
  const blocos = blocosMarkdown(textoCorpo);
  const p = e.pagina, m = p.margens_mm;
  const larguraUtilMm = p.largura_mm - m.esquerda - m.direita;
  const alturaUtilMm = p.altura_mm - m.cima - m.baixo;
  const larguraUtil = twips(larguraUtilMm);
  const contagem = { titulos: 0, tabelas: 0, listas: 0, imagens: 0, ligacoes: 0, codigo: 0, citacoes: 0, quebras: 0, indice: false, capa: false };

  const media = new Map(); // caminho -> { nome, dados, dim }
  const relsDoc = [], relsCab = [];
  const novaRel = (lista, tipo, alvo, externo = false) => {
    const igual = lista.find((r) => r.tipo === tipo && r.alvo === alvo && r.externo === externo);
    if (igual) return igual.id;
    const id = `rId${lista.length + 1}`;
    lista.push({ id, tipo, alvo, externo });
    return id;
  };
  let idDesenho = 0;

  const lerImagem = (caminho) => {
    if (!media.has(caminho)) {
      const dados = readFileSync(caminho);
      const dim = dimensoesDeImagem(dados);
      if (!dim) return null;
      media.set(caminho, { nome: `media/imagem${media.size + 1}.${dim.tipo === 'png' ? 'png' : 'jpeg'}`, dados, dim });
    }
    return media.get(caminho);
  };
  const desenho = (img, rId, larguraMaxMm, alturaMaxMm, alt, ampliar = false) => {
    const emuPorPx = 914400 / img.dim.dpi;
    let cx = img.dim.largura * emuPorPx, cy = img.dim.altura * emuPorPx;
    let fator = Math.min((larguraMaxMm * EMU_MM) / cx, (alturaMaxMm * EMU_MM) / cy);
    if (!ampliar) fator = Math.min(1, fator);
    cx = Math.round(cx * fator); cy = Math.round(cy * fator);
    const id = ++idDesenho;
    return `<w:r><w:drawing><wp:inline distT="0" distB="0" distL="0" distR="0"><wp:extent cx="${cx}" cy="${cy}"/><wp:effectExtent l="0" t="0" r="0" b="0"/>`
      + `<wp:docPr id="${id}" name="Imagem ${id}" descr="${esc(alt)}"/><wp:cNvGraphicFramePr><a:graphicFrameLocks xmlns:a="${NS_A}" noChangeAspect="1"/></wp:cNvGraphicFramePr>`
      + `<a:graphic xmlns:a="${NS_A}"><a:graphicData uri="${NS_PIC}"><pic:pic xmlns:pic="${NS_PIC}"><pic:nvPicPr><pic:cNvPr id="${id}" name="${esc(basename(img.nome))}"/><pic:cNvPicPr/></pic:nvPicPr>`
      + `<pic:blipFill><a:blip r:embed="${rId}"/><a:stretch><a:fillRect/></a:stretch></pic:blipFill>`
      + `<pic:spPr><a:xfrm><a:off x="0" y="0"/><a:ext cx="${cx}" cy="${cy}"/></a:xfrm><a:prstGeom prst="rect"><a:avLst/></a:prstGeom></pic:spPr></pic:pic></a:graphicData></a:graphic></wp:inline></w:drawing></w:r>`;
  };

  const runTexto = (t, { negrito, italico, codigo, ligacao } = {}) => {
    const rPr = (codigo ? '<w:rStyle w:val="CodeChar"/>' : ligacao != null ? '<w:rStyle w:val="Hyperlink"/>' : '')
      + (negrito ? '<w:b/><w:bCs/>' : '') + (italico ? '<w:i/><w:iCs/>' : '');
    const conteudo = t.split('\n').map((linha) => linha.split('\t').map((s) => (s ? `<w:t xml:space="preserve">${esc(s)}</w:t>` : '')).join('<w:tab/>')).join('<w:br/>');
    return `<w:r>${rPr ? `<w:rPr>${rPr}</w:rPr>` : ''}${conteudo}</w:r>`;
  };

  const imagemEmLinha = (pd) => {
    if (/^[a-z][a-z0-9+.-]*:/i.test(pd.imagem)) {
      avisos.push(`${onde}: imagem remota ${pd.imagem} não entra no Word; fica o texto alternativo`);
      return runTexto(pd.alt || pd.imagem, { italico: true });
    }
    let caminho = pd.imagem;
    try { caminho = decodeURI(caminho); } catch { /* fica como está */ }
    caminho = resolve(pastaMd, caminho);
    if (!existsSync(caminho)) { avisos.push(`${onde}: a imagem ${pd.imagem} não existe`); return runTexto(pd.alt || pd.imagem, { italico: true }); }
    const img = lerImagem(caminho);
    if (!img) { avisos.push(`${onde}: ${pd.imagem} não é PNG nem JPEG`); return runTexto(pd.alt || pd.imagem, { italico: true }); }
    contagem.imagens++;
    return desenho(img, novaRel(relsDoc, REL.imagem, img.nome), larguraUtilMm, alturaUtilMm * 0.8, pd.alt);
  };

  const idLigacao = (alvo) => {
    contagem.ligacoes++;
    if (/^[a-z][a-z0-9+.-]*:/i.test(alvo)) return novaRel(relsDoc, REL.ligacao, alvo, true);
    let caminho = alvo.split('#')[0];
    try { caminho = decodeURI(caminho); } catch { /* fica como está */ }
    return novaRel(relsDoc, REL.ligacao, alvoRelativo(caminho.replace(/\\/g, '/')), true);
  };

  const runs = (pedacos) => {
    let out = '', grupo = null;
    const fechar = () => {
      if (!grupo) return;
      out += grupo.id ? `<w:hyperlink r:id="${grupo.id}" w:history="1">${grupo.xml}</w:hyperlink>` : grupo.xml;
      grupo = null;
    };
    for (const original of pedacos) {
      // Âncoras dentro do documento e ligações vazias ficam como texto simples, sem o aspeto de ligação.
      const pd = original.ligacao && !original.ligacao.startsWith('#') ? original : { ...original, ligacao: undefined };
      const xml = pd.imagem != null ? imagemEmLinha(pd) : runTexto(pd.texto, pd);
      if (pd.ligacao == null) { fechar(); out += xml; continue; }
      if (!grupo || grupo.alvo !== pd.ligacao) { fechar(); grupo = { alvo: pd.ligacao, id: idLigacao(pd.ligacao), xml: '' }; }
      grupo.xml += xml;
    }
    fechar();
    return out;
  };

  const paragrafo = (estiloP, conteudo, pPr = '') => `<w:p>${estiloP || pPr ? `<w:pPr>${estiloP ? `<w:pStyle w:val="${estiloP}"/>` : ''}${pPr}</w:pPr>` : ''}${conteudo}</w:p>`;
  const quebra = '<w:p><w:r><w:br w:type="page"/></w:r></w:p>';

  const titulos = blocos.filter((b) => b.tipo === 'titulo').map((b, k) => ({ ...b, marca: `_Toc${String(k + 1).padStart(8, '0')}`, simples: textoSimples(emLinha(b.texto)) }));
  const temIndice = blocos.some((b) => b.tipo === 'indice');
  const tituloDoc = fm.titulo || titulos.find((t) => t.nivel === 1)?.simples || tituloPorOmissao;

  const listas = [];
  const corpo = [];

  if (fm.titulo) {
    contagem.capa = true;
    if (e.logo) {
      const img = lerImagem(e.logo);
      if (img) corpo.push(paragrafo(null, desenho(img, novaRel(relsDoc, REL.imagem, img.nome), 60, 25, 'Logo', true)));
    }
    corpo.push(paragrafo('Title', runTexto(fm.titulo), `<w:spacing w:before="${e.logo ? 2880 : 3600}"/>`));
    if (fm.subtitulo) corpo.push(paragrafo('Subtitle', runTexto(fm.subtitulo)));
    const d = lerData(fm.data);
    for (const linha of [d ? DATA_LONGA.format(new Date(d.ms)) : fm.data, fm.autor, fm.versao ? `Versão ${fm.versao}` : '']) {
      if (linha) corpo.push(paragrafo(null, runTexto(linha), '<w:spacing w:after="40"/>'));
    }
    corpo.push(quebra);
  }

  let idMarca = 0, k = 0;
  for (const b of blocos) {
    switch (b.tipo) {
      case 'titulo': {
        const t = titulos[k++];
        contagem.titulos++;
        const id = ++idMarca;
        corpo.push(`<w:p><w:pPr><w:pStyle w:val="Heading${b.nivel}"/></w:pPr>${temIndice ? `<w:bookmarkStart w:id="${id}" w:name="${t.marca}"/>` : ''}${runs(emLinha(b.texto))}${temIndice ? `<w:bookmarkEnd w:id="${id}"/>` : ''}</w:p>`);
        break;
      }
      case 'paragrafo': corpo.push(paragrafo(null, runs(emLinha(b.texto)))); break;
      case 'citacao': contagem.citacoes++; for (const t of b.paragrafos) corpo.push(paragrafo('Quote', runs(emLinha(t)))); break;
      case 'codigo':
        contagem.codigo++;
        for (const l of b.linhas.length ? b.linhas : ['']) corpo.push(paragrafo('Code', l ? runTexto(l) : ''));
        break;
      case 'lista': {
        contagem.listas++;
        const niveis = [0, 1].map((n) => b.itens.find((it) => it.nivel === n) || { ordenada: false, numero: 1 });
        listas.push(niveis);
        const numId = listas.length;
        // O último item leva o espaço de um parágrafo, para a lista não colar ao que vem a seguir.
        b.itens.forEach((it, i) => corpo.push(paragrafo('ListParagraph', runs(emLinha(it.texto)),
          `<w:numPr><w:ilvl w:val="${it.nivel}"/><w:numId w:val="${numId}"/></w:numPr>${i === b.itens.length - 1 ? '<w:spacing w:after="160"/>' : ''}`)));
        break;
      }
      case 'tabela': {
        contagem.tabelas++;
        const n = b.cabecalho.length;
        const comprimentos = Array.from({ length: n }, (_, c) => Math.min(40, Math.max(4, ...[b.cabecalho, ...b.linhas].map((r) => textoSimples(emLinha(r[c] || '')).length))));
        const total = comprimentos.reduce((a, x) => a + x, 0);
        const larguras = comprimentos.map((c) => Math.floor((larguraUtil * c) / total));
        const linha = (celulas, cab) => `<w:tr>${cab ? '<w:trPr><w:tblHeader/></w:trPr>' : ''}${celulas.map((c, i) =>
          `<w:tc><w:tcPr><w:tcW w:w="${larguras[i]}" w:type="dxa"/></w:tcPr>${paragrafo(null, runs(emLinha(c || '')), b.alinhamento[i] ? `<w:jc w:val="${b.alinhamento[i]}"/>` : '')}</w:tc>`).join('')}</w:tr>`;
        corpo.push('<w:tbl><w:tblPr><w:tblStyle w:val="Tabela"/>'
          + `<w:tblW w:w="${larguras.reduce((a, x) => a + x, 0)}" w:type="dxa"/>`
          + '<w:tblLook w:val="0420" w:firstRow="1" w:lastRow="0" w:firstColumn="0" w:lastColumn="0" w:noHBand="0" w:noVBand="1"/></w:tblPr>'
          + `<w:tblGrid>${larguras.map((w) => `<w:gridCol w:w="${w}"/>`).join('')}</w:tblGrid>`
          + linha(b.cabecalho, true) + b.linhas.map((l) => linha(l, false)).join('') + '</w:tbl>');
        // Uma tabela seguida de outra junta-se numa só no Word; um parágrafo pequeno separa-as.
        corpo.push('<w:p><w:pPr><w:spacing w:after="0"/></w:pPr></w:p>');
        break;
      }
      case 'quebra': contagem.quebras++; corpo.push(quebra); break;
      case 'regra': corpo.push(`<w:p><w:pPr><w:pBdr><w:bottom w:val="single" w:sz="6" w:space="1" w:color="${clarear(e.cores.texto, 0.75).slice(1)}"/></w:pBdr></w:pPr></w:p>`); break;
      case 'indice': {
        contagem.indice = true;
        const comeco = '<w:r><w:fldChar w:fldCharType="begin"/></w:r><w:r><w:instrText xml:space="preserve"> TOC \\o "1-3" \\h \\z \\u </w:instrText></w:r><w:r><w:fldChar w:fldCharType="separate"/></w:r>';
        const fim = '<w:r><w:fldChar w:fldCharType="end"/></w:r>';
        corpo.push(paragrafo('TOCHeading', runTexto('Índice')));
        if (!titulos.length) { corpo.push(`<w:p>${comeco}${runTexto('Sem títulos.')}${fim}</w:p>`); break; }
        // O resultado do campo leva os títulos com ligação; os números de página põe-nos o Word ao atualizar o campo.
        titulos.forEach((t, i) => corpo.push(`<w:p><w:pPr><w:pStyle w:val="TOC${t.nivel}"/></w:pPr>${i === 0 ? comeco : ''}`
          + `<w:hyperlink w:anchor="${t.marca}" w:history="1">${runTexto(t.simples)}</w:hyperlink>${i === titulos.length - 1 ? fim : ''}</w:p>`));
        break;
      }
    }
  }

  // Cabeçalho (logo à esquerda, título à direita) e rodapé (texto da casa e «Página X de Y»).
  let logoCab = '';
  if (e.logo) {
    const img = lerImagem(e.logo);
    if (img) logoCab = desenho(img, novaRel(relsCab, REL.imagem, img.nome), 45, Math.min(10, m.cima * 0.4), 'Logo', true);
    else avisos.push(`o logo ${e.logo} não é PNG nem JPEG; os documentos saem sem logo`);
  }
  const tabDireita = `<w:tabs><w:tab w:val="right" w:pos="${larguraUtil}"/></w:tabs>`;
  const cabecalho = XML + `<w:hdr ${NS_W}>${paragrafo('Header', `${logoCab}<w:r><w:tab/></w:r>${runTexto(tituloDoc)}`, tabDireita)}</w:hdr>`;
  const campo = (instr) => `<w:fldSimple w:instr=" ${instr} ">${runTexto('1')}</w:fldSimple>`;
  const rodape = XML + `<w:ftr ${NS_W}>${paragrafo('Footer', `${e.rodape ? runTexto(e.rodape) : ''}<w:r><w:tab/></w:r>${runTexto('Página ')}${campo('PAGE')}${runTexto(' de ')}${campo('NUMPAGES')}`, tabDireita)}</w:ftr>`;
  const vazio = (raiz, estiloP) => XML + `<w:${raiz} ${NS_W}>${paragrafo(estiloP, '')}</w:${raiz}>`;

  const ids = { estilos: 'rIdEstilos', definicoes: 'rIdDefinicoes', numeracao: 'rIdNumeracao', cab: 'rIdCabecalho', rod: 'rIdRodape', cabCapa: 'rIdCabecalhoCapa', rodCapa: 'rIdRodapeCapa' };
  const margemCab = twips(Math.max(5, Math.min(12.5, m.cima * 0.4)));
  const margemRod = twips(Math.max(5, Math.min(12.5, m.baixo * 0.4)));
  const seccao = '<w:sectPr>'
    + `<w:headerReference w:type="default" r:id="${ids.cab}"/>${contagem.capa ? `<w:headerReference w:type="first" r:id="${ids.cabCapa}"/>` : ''}`
    + `<w:footerReference w:type="default" r:id="${ids.rod}"/>${contagem.capa ? `<w:footerReference w:type="first" r:id="${ids.rodCapa}"/>` : ''}`
    + `<w:pgSz w:w="${twips(p.largura_mm)}" w:h="${twips(p.altura_mm)}"${p.largura_mm > p.altura_mm ? ' w:orient="landscape"' : ''}/>`
    + `<w:pgMar w:top="${twips(m.cima)}" w:right="${twips(m.direita)}" w:bottom="${twips(m.baixo)}" w:left="${twips(m.esquerda)}" w:header="${margemCab}" w:footer="${margemRod}" w:gutter="0"/>`
    + `<w:cols w:space="708"/>${contagem.capa ? '<w:titlePg/>' : ''}<w:docGrid w:linePitch="360"/></w:sectPr>`;
  const documento = XML + `<w:document ${NS_W}><w:body>${corpo.join('')}${seccao}</w:body></w:document>`;

  const nivelXml = (i, { ordenada, numero }) => `<w:lvl w:ilvl="${i}"><w:start w:val="${ordenada ? numero : 1}"/>`
    + `<w:numFmt w:val="${ordenada ? (i ? 'lowerLetter' : 'decimal') : 'bullet'}"/><w:lvlText w:val="${ordenada ? `%${i + 1}.` : (i ? '–' : '•')}"/>`
    + `<w:lvlJc w:val="left"/><w:pPr><w:ind w:left="${720 * (i + 1)}" w:hanging="360"/></w:pPr></w:lvl>`;
  const numeracao = XML + `<w:numbering ${NS_W}>`
    + listas.map((niveis, i) => `<w:abstractNum w:abstractNumId="${i}"><w:multiLevelType w:val="hybridMultilevel"/>${niveis.map((n, j) => nivelXml(j, n)).join('')}</w:abstractNum>`).join('')
    + listas.map((_, i) => `<w:num w:numId="${i + 1}"><w:abstractNumId w:val="${i}"/></w:num>`).join('')
    + '</w:numbering>';

  const definicoes = XML + '<w:settings xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main"><w:zoom w:percent="100"/>'
    + '<w:defaultTabStop w:val="708"/><w:characterSpacingControl w:val="doNotCompress"/>'
    + '<w:compat><w:compatSetting w:name="compatibilityMode" w:uri="http://schemas.microsoft.com/office/word" w:val="15"/></w:compat></w:settings>';

  const W = 'application/vnd.openxmlformats-officedocument.wordprocessingml.';
  const partes = {
    '/word/document.xml': W + 'document.main+xml', '/word/styles.xml': W + 'styles+xml', '/word/settings.xml': W + 'settings+xml',
    '/word/header1.xml': W + 'header+xml', '/word/footer1.xml': W + 'footer+xml',
  };
  const relsDocumento = [
    ...relsDoc,
    { id: ids.estilos, tipo: REL.estilos, alvo: 'styles.xml' },
    { id: ids.definicoes, tipo: REL.definicoes, alvo: 'settings.xml' },
    { id: ids.cab, tipo: REL.cabecalho, alvo: 'header1.xml' },
    { id: ids.rod, tipo: REL.rodape, alvo: 'footer1.xml' },
  ];
  const entradas = [
    { nome: 'word/document.xml', dados: documento },
    { nome: 'word/styles.xml', dados: estilosWord(e) },
    { nome: 'word/settings.xml', dados: definicoes },
    { nome: 'word/header1.xml', dados: cabecalho },
    { nome: 'word/footer1.xml', dados: rodape },
  ];
  if (relsCab.length) entradas.push({ nome: 'word/_rels/header1.xml.rels', dados: relacoes(relsCab) });
  if (contagem.capa) {
    partes['/word/header2.xml'] = W + 'header+xml';
    partes['/word/footer2.xml'] = W + 'footer+xml';
    relsDocumento.push({ id: ids.cabCapa, tipo: REL.cabecalho, alvo: 'header2.xml' }, { id: ids.rodCapa, tipo: REL.rodape, alvo: 'footer2.xml' });
    entradas.push({ nome: 'word/header2.xml', dados: vazio('hdr', 'Header') }, { nome: 'word/footer2.xml', dados: vazio('ftr', 'Footer') });
  }
  if (listas.length) {
    partes['/word/numbering.xml'] = W + 'numbering+xml';
    relsDocumento.push({ id: ids.numeracao, tipo: REL.numeracao, alvo: 'numbering.xml' });
    entradas.push({ nome: 'word/numbering.xml', dados: numeracao });
  }
  for (const img of media.values()) entradas.push({ nome: `word/${img.nome}`, dados: img.dados, comprimir: false });
  entradas.push({ nome: 'word/_rels/document.xml.rels', dados: relacoes(relsDocumento) });
  entradas.unshift(
    { nome: '[Content_Types].xml', dados: tiposDeConteudo({ rels: 'application/vnd.openxmlformats-package.relationships+xml', xml: 'application/xml', png: 'image/png', jpeg: 'image/jpeg' }, partes) },
    { nome: '_rels/.rels', dados: relacoes([{ id: 'rId1', tipo: REL.documento, alvo: 'word/document.xml' }]) },
  );
  return { zip: escreverZip(entradas), contagem, titulo: tituloDoc };
}

function gravar(caminho, dados) {
  try { writeFileSync(caminho, dados); } catch (err) {
    if (['EBUSY', 'EPERM', 'EACCES'].includes(err.code)) throw new Error(`não consigo escrever ${basename(caminho)}; se estiver aberto no Excel ou no Word, fecha-o e corre de novo`);
    throw err;
  }
}

const plural = (n, um, varios) => `${n} ${n === 1 ? um : varios}`;

export function gerar(opcoes) {
  const { raiz, pasta } = opcoes;
  const avisos = [];
  mkdirSync(pasta, { recursive: true });
  const estilo = lerPadrao(pasta, avisos);
  const { processos, ignorados } = lerProcessos(ficheirosDeProcessos(opcoes));
  avisos.push(...avisosSemCabecalho(processos, ignorados, raiz));
  avisos.push(...falhasDosProcessos(processos, raiz));
  for (const p of processos) {
    for (const [campo, v] of [['duracao_min', p.duracao], ['retrabalho', p.retrabalho]]) if (typeof v === 'string') avisos.push(`${rel(raiz, p.ficheiro)}: ${campo} «${v}» não é um número`);
    if (p.c.fim && !p.fim) avisos.push(`${rel(raiz, p.ficheiro)}: fim «${p.c.fim}» não é uma data`);
  }
  const { commits, aviso } = lerCommits(raiz);
  if (aviso) avisos.push(aviso);

  const escritos = [];
  const { zip, resumo } = livroExcel({ processos, commits, pasta, estilo });
  gravar(join(pasta, GERADOS.livro), zip);
  escritos.push(`${GERADOS.livro}: ${plural(resumo.processos, 'processo', 'processos')} (${plural(resumo.feitos, 'feito', 'feitos')}, ${resumo.comProva} com prova, ${plural(resumo.reconstruidos, 'reconstruído', 'reconstruídos')}), `
    + `${plural(commits.length, 'commit', 'commits')} de ${plural(resumo.autores, 'autor', 'autores')}, ${plural(resumo.skills, 'skill', 'skills')}, ${plural(resumo.fases, 'fase', 'fases')}, ${plural(resumo.meses, 'mês', 'meses')}`);

  for (const [md, docx, titulo] of [['entendimento.md', GERADOS.entendimento, 'Entendimento do desenvolvimento'], ['relatorio-final.md', GERADOS.final, 'Relatório final']]) {
    const origem = join(pasta, md);
    if (!existsSync(origem)) { escritos.push(`${docx}: não gerado, falta ${md}`); continue; }
    const r = documentoWord(readFileSync(origem, 'utf8'), { pastaMd: pasta, estilo, tituloPorOmissao: titulo, avisos, onde: md });
    gravar(join(pasta, docx), r.zip);
    const c = r.contagem;
    const se = (n, um, varios) => n > 0 && plural(n, um, varios);
    escritos.push(`${docx}: ${[c.capa && 'capa', c.indice && 'índice', plural(c.titulos, 'título', 'títulos'), se(c.tabelas, 'tabela', 'tabelas'),
      se(c.listas, 'lista', 'listas'), se(c.imagens, 'imagem', 'imagens'), se(c.ligacoes, 'ligação', 'ligações'),
      se(c.codigo, 'bloco de código', 'blocos de código'), se(c.citacoes, 'citação', 'citações')].filter(Boolean).join(', ')}`);
  }

  const referidos = processos.flatMap((p) => p.commits.map((h) => h.toLowerCase()));
  const semRelatorio = commits.filter((c) => !referidos.some((h) => h.length >= 4 && c.hash.startsWith(h))).length;
  return { escritos, avisos, estilo, semRelatorio, commits: commits.length, processos: processos.length };
}

if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) {
  try {
    const opcoes = caminhos(argumentos(process.argv.slice(2)));
    const r = gerar(opcoes);
    const onde = rel(opcoes.raiz, opcoes.pasta);
    console.log(`Escrito em ${onde.startsWith('..') ? opcoes.pasta : (onde || '.') + '/'}:`);
    for (const l of r.escritos) console.log(`  ${l}`);
    console.log(`Commits sem relatório de processo: ${r.semRelatorio} de ${r.commits}`);
    console.log(`Estilo: ${r.estilo.origem.length ? `padrao.json (${r.estilo.origem.join(', ')})` : existsSync(join(opcoes.pasta, 'padrao.json')) ? 'padrao.json' : 'por omissão'}`);
    if (r.avisos.length) {
      console.log(`Avisos (${r.avisos.length}):`);
      for (const a of r.avisos) console.log(`  - ${a}`);
    }
  } catch (err) {
    console.error(`✗ ${err.message}`);
    console.error('Uso: node gerar.mjs [--raiz <repo>] [--pasta documentacao] [--processos <pasta>]...');
    process.exit(2);
  }
}


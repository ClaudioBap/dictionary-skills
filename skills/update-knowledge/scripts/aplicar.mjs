#!/usr/bin/env node
// Escreve no conhecimento, SEM IA, o que o analisar.mjs decidiu: linhas em <secção>/ATUALIZACOES.md, edições de entradas
// (com «Histórico»), fontes em FONTES.md, entradas novas e a linha do CHANGELOG.md de cada alteração. No fim corre o
// indice.mjs e o verificar-alteracoes.mjs; não publica (isso é o publicar.mjs).
// Uso: node aplicar.mjs <raiz do repositório> --novidades <novidades.json> --saida <aplicadas.json> [--feito-por "<texto>"] [--hoje AAAA-MM-DD]
// Saída: { aplicadas:[{ tipo, ficheiro, texto, fonte_url, data_lancamento, confianca, categoria, item, modelo, contexto }], saltadas:[{ motivo, novidade }], verificacao }
// Código 1 se o verificador falhar.

import { existsSync, readFileSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import { dirname, join, relative, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { hoje as hojeReal, lerJson, escreverJson, escreverAtomico, opcoes, mesmoDominio } from './comum-recolha.mjs';

const APROVACAO_PERMANENTE = 'Cláudio Baptista (aprovação permanente das propostas da noite, 2026-11-26)';
const LIMITES = { texto: 900, nome: 150, categoria: 50, fonte_texto: 300, entrada_nova: 15000, trecho: 6000 };
const aqui = dirname(fileURLToPath(import.meta.url));

// ---------- funções puras ----------

const lf = (t) => t.replace(/\r\n/g, '\n');
const celula = (t) => String(t).replace(/\s+/g, ' ').replace(/\|/g, '\\|').trim();
const semPonto = (t) => String(t).trim().replace(/\.$/, '');
// «A AWS WAF…» → «a AWS WAF…», mas «OpenAI…» e «AWS…» ficam.
const minuscula = (t) => (/^[A-ZÁÉÍÓÚÂÊÔÃÕÇ][a-záéíóúâêôãõç]/.test(t) ? t[0].toLowerCase() + t.slice(1) : t);

// A 1.ª frase (até ~220 carateres) para a linha do CHANGELOG, que se quer curta.
export function primeiraFrase(t) {
  const x = semPonto(String(t).replace(/\s+/g, ' '));
  const m = x.match(/^(.{30,}?)(?<=[a-zà-ú0-9)»`])\. (?=[A-ZÀ-Ú])/);
  const f = m ? m[1] : x;
  return f.length > 220 ? `${f.slice(0, 217).replace(/\s+\S*$/, '')}…` : f;
}

export function tituloDe(md) {
  const fm = (lf(md).match(/^---\n([\s\S]*?)\n---/) || [])[1] || '';
  return ((fm.match(/^titulo:\s*(.*)$/m) || [])[1] || '').trim().replace(/^"|"$/g, '').replace(/\\"/g, '"');
}

// «- **<data>** em [<título>](<caminho>): <texto>. Fonte: [<nome>](<url>). Confiança: <nível>. Adicionado a <hoje>.»
export function linhaAtualizacao({ data, tituloEntrada, caminho, texto, fonte_nome, fonte_url, confianca, hoje }) {
  const d = data || 'data não indicada';
  const em = tituloEntrada ? ` em [${tituloEntrada}](${caminho})` : '';
  return `- **${d}**${em}: ${semPonto(texto).replace(/\s+/g, ' ')}. Fonte: [${fonte_nome}](${fonte_url}). Confiança: ${confianca}. Adicionado a ${hoje}.`;
}

// Insere a linha debaixo de «## <categoria>», da mais recente para a mais antiga; cria a categoria se faltar.
export function inserirAtualizacao(md, categoria, linha, data) {
  const L = lf(md).split('\n');
  const ini = L.findIndex((l) => l.trim().toLowerCase() === `## ${categoria}`.toLowerCase());
  if (ini < 0) {
    while (L.length && L.at(-1) === '') L.pop();
    L.push('', `## ${categoria}`, '', linha, '');
    return L.join('\n');
  }
  let fim = L.findIndex((l, i) => i > ini && l.startsWith('## '));
  if (fim < 0) fim = L.length;
  let pos = null, ultimo = -1;
  for (let i = ini + 1; i < fim; i++) {
    if (!L[i].startsWith('- ')) continue;
    ultimo = i;
    const m = L[i].match(/^- \*\*(\d{4}-\d{2}-\d{2})\*\*/);
    if (pos == null && (!data || (m && m[1] < data))) pos = i;
  }
  if (ultimo < 0) { L.splice(ini + 1, 0, '', linha); return L.join('\n'); }
  L.splice(pos ?? ultimo + 1, 0, linha);
  return L.join('\n');
}

const NOVO_FICHEIRO = (sec, titulo) => `# Atualizações: ${titulo}\n\nNovidades com confiança alta ou média (as de média levam «Confiança: media»), organizadas por categoria e da mais recente para a mais antiga. Não alteram o texto das entradas. Cada linha tem o seu registo no [CHANGELOG](../CHANGELOG.md).\n`;

function setCampo(fm, nome, valor, depoisDe) {
  const re = new RegExp(`^${nome}:.*$`, 'm');
  if (re.test(fm)) return fm.replace(re, `${nome}: ${valor}`);
  if (depoisDe && new RegExp(`^${depoisDe}:.*$`, 'm').test(fm)) return fm.replace(new RegExp(`^(${depoisDe}:.*)$`, 'm'), `$1\n${nome}: ${valor}`);
  return `${fm}\n${nome}: ${valor}`;
}

// Substitui `trecho_antes` (só se existir tal e qual, uma vez, fora do Histórico), acrescenta a linha ao Histórico e
// atualiza verificado_em / editado_em. Devolve { texto } ou { erro }.
export function aplicarEdicaoTexto(original, { trecho_antes, trecho_depois, historico }, hoje) {
  const t = lf(original);
  if (!trecho_antes || trecho_antes.length > LIMITES.trecho || (trecho_depois ?? '').length > LIMITES.trecho) return { erro: 'trecho vazio ou grande demais' };
  const partes = t.split(trecho_antes);
  if (partes.length !== 2) return { erro: partes.length === 1 ? 'trecho_antes não existe na entrada tal e qual' : 'trecho_antes aparece mais de uma vez' };
  const fimFm = t.indexOf('\n---', 4);
  const posHist = t.search(/^## Histórico\s*$/m);
  const pos = partes[0].length;
  if (pos <= fimFm) return { erro: 'trecho_antes está no frontmatter' };
  if (posHist >= 0 && pos >= posHist) return { erro: 'trecho_antes está no Histórico' };
  let novo = partes[0] + trecho_depois + partes[1];
  if (!/^- \*\*.+\*\*: antes, «/.test(historico ?? '')) return { erro: 'linha do Histórico fora do formato' };
  const linha = historico.replace(/\s*\n\s*/g, ' ').trim();
  if (/^## Histórico\s*$/m.test(novo)) {
    const L = novo.split('\n');
    const i = L.findIndex((l) => /^## Histórico\s*$/.test(l));
    let j = i + 1;
    while (j < L.length && L[j] === '') j++;
    L.splice(j, 0, linha);
    if (j === i + 1) L.splice(j, 0, ''); // sem linha em branco debaixo do título
    novo = L.join('\n');
  } else novo = `${novo.replace(/\n+$/, '')}\n\n## Histórico\n\n${linha}\n`;
  const m = novo.match(/^---\n([\s\S]*?)\n---/);
  if (m) {
    let fm = setCampo(m[1], 'verificado_em', hoje);
    fm = setCampo(fm, 'editado_em', hoje, 'verificado_em');
    novo = novo.replace(m[0], `---\n${fm}\n---`);
  }
  return { texto: novo };
}

export function linhaChangelog({ hoje, alteracao, ficheiro, fonte_nome, fonte_url, data, confianca, aprovado }) {
  return `| ${hoje} | ${celula(alteracao)} | ${ficheiro} | [${celula(fonte_nome)}](${fonte_url}) | ${data || 'data não indicada'} | ${confianca} | ${aprovado} |`;
}

export const aprovadoPor = (tipo, confianca, feitoPor) => (['fonte', 'entrada_nova', 'retirar_a_vigiar'].includes(tipo) ? feitoPor : `aplicada sem aprovação (fonte ${confianca === 'alta' ? 'alta' : 'média'}); corrida da noite`);

export function dominiosConfirmados(n) { return [n.item_url, n.item_fonte_url, n.item_redirecionado_para].filter(Boolean); }
export const dominioConfirmado = (url, n) => dominiosConfirmados(n).some((d) => mesmoDominio(url, d));

// Insere uma linha de fonte no fim da tabela da secção em FONTES.md.
export function inserirFonte(md, seccao, linha) {
  const L = lf(md).split('\n');
  const i = L.findIndex((l) => l.startsWith('## ') && l.includes(`](${seccao}/README.md)`));
  if (i < 0) return null;
  return inserirNaTabela(L, i, linha);
}
export function inserirVigiar(md, linha) {
  const L = lf(md).split('\n');
  const i = L.findIndex((l) => /^## A vigiar/i.test(l));
  return i < 0 ? null : inserirNaTabela(L, i, linha);
}
function inserirNaTabela(L, i, linha) {
  let fim = L.findIndex((l, k) => k > i && l.startsWith('## '));
  if (fim < 0) fim = L.length;
  let ult = -1;
  for (let k = i + 1; k < fim; k++) if (L[k].startsWith('|')) ult = k;
  if (ult < 0) return null;
  L.splice(ult + 1, 0, linha);
  return L.join('\n');
}
export function removerVigiar(md, url) {
  const L = lf(md).split('\n');
  const i = L.findIndex((l) => /^## A vigiar/i.test(l));
  if (i < 0) return null;
  let fim = L.findIndex((l, k) => k > i && l.startsWith('## '));
  if (fim < 0) fim = L.length;
  const k = L.findIndex((l, n) => n > i && n < fim && l.startsWith('|') && l.includes(`](${url})`));
  if (k < 0) return null;
  L.splice(k, 1);
  return L.join('\n');
}

// Verifica o que o indice.mjs lê de uma entrada nova.
export function validarEntradaNova(caminho, texto) {
  if (!/^[a-z0-9-]+\/([a-z0-9-]+\/)?[a-z0-9-]+\.md$/.test(caminho)) return 'caminho inválido';
  const t = lf(texto);
  const fm = (t.match(/^---\n([\s\S]*?)\n---\n/) || [])[1];
  if (!fm) return 'sem frontmatter';
  const campo = (n) => ((fm.match(new RegExp(`^${n}:\\s*(.*)$`, 'm')) || [])[1] || '').trim();
  if (campo('id') !== caminho.replace(/\.md$/, '')) return 'id do frontmatter não bate com o caminho';
  for (const c of ['titulo', 'seccao', 'fonte', 'verificado_em']) if (!campo(c)) return `falta «${c}» no frontmatter`;
  if (!/^paginas:/m.test(fm)) return 'falta «paginas» no frontmatter';
  if (!['alta', 'media'].includes(campo('confianca'))) return 'confiança inválida';
  if (!/^\*\*Resumo:\*\* \S/m.test(t)) return 'sem «**Resumo:**»';
  return null;
}

// ---------- aplicação ----------

function correr(script, args, raiz) {
  const r = spawnSync(process.execPath, [join(aqui, script), ...args], { cwd: raiz, encoding: 'utf8' });
  return { ok: r.status === 0, saida: `${r.stdout || ''}${r.stderr || ''}`.trim() };
}

export function aplicar(raiz, novidades, { hoje = hojeReal(), feitoPor = APROVACAO_PERMANENTE } = {}) {
  const K = join(raiz, 'knowledge');
  const aplicadas = [], saltadas = [], changelog = [];
  const salta = (motivo, novidade) => saltadas.push({ motivo, novidade });
  const ler = (rel) => lf(readFileSync(join(K, rel), 'utf8'));
  const gravar = (rel, texto) => escreverAtomico(join(K, rel), texto);
  const seccaoExiste = (s) => /^[a-z0-9-]+$/.test(s) && existsSync(join(K, s, 'README.md'));
  const tituloSeccao = (s) => ((ler(`${s}/README.md`).match(/^# (.+)$/m) || [])[1] || s).trim();
  const registar = (n, tipo, alteracao, ficheiro, extra = {}) => {
    const aprovado = aprovadoPor(tipo, n.confianca, feitoPor);
    changelog.push(linhaChangelog({ hoje, alteracao, ficheiro, fonte_nome: n.fonte_nome, fonte_url: n.fonte_url, data: n.data_lancamento, confianca: n.confianca, aprovado }));
    aplicadas.push({ tipo, ficheiro, texto: n.texto, fonte_url: n.fonte_url, data_lancamento: n.data_lancamento ?? null, confianca: n.confianca, categoria: n.categoria ?? null, item: n.item, modelo: n.modelo ?? null, contexto: n.contexto ?? null, ...extra });
  };

  const comuns = (n) => {
    if (!n || typeof n !== 'object') return 'novidade inválida';
    if (!['alta', 'media'].includes(n.confianca)) return 'confiança não é alta nem média';
    if (typeof n.texto !== 'string' || !n.texto.trim() || n.texto.length > (n.tipo === 'entrada_nova' ? LIMITES.entrada_nova : LIMITES.texto)) return 'texto vazio ou grande demais';
    if (typeof n.fonte_nome !== 'string' || !n.fonte_nome || n.fonte_nome.length > LIMITES.nome) return 'nome da fonte vazio ou grande demais';
    if (!/^https:\/\/[^\s)]+$/.test(n.fonte_url ?? '')) return 'fonte_url inválido (tem de ser https)';
    if (n.categoria && n.categoria.length > LIMITES.categoria) return 'categoria grande demais';
    if (n.data_lancamento == null && n.confianca === 'alta') n.confianca = 'media';
    if (n.data_lancamento != null && !/^\d{4}-\d{2}-\d{2}$/.test(n.data_lancamento)) return 'data inválida';
    if (!dominioConfirmado(n.fonte_url, n)) return `domínio de fonte_url (${n.fonte_url}) não confirmado pelo item lido`;
    return null;
  };

  for (const n of novidades.novidades || []) {
    const erro = comuns(n);
    if (erro) { salta(erro, n); continue; }
    const secao = (n.entrada || n.seccao || '').split('/')[0];
    try {
      if (n.tipo === 'atualizacao') {
        if (!n.entrada || !existsSync(join(K, n.entrada))) { salta('a entrada não existe', n); continue; }
        if (!seccaoExiste(secao)) { salta('a secção não existe', n); continue; }
        if (!n.categoria) { salta('sem categoria', n); continue; }
        const f = `${secao}/ATUALIZACOES.md`;
        const atual = existsSync(join(K, f)) ? ler(f) : NOVO_FICHEIRO(secao, tituloSeccao(secao));
        const prefixo = semPonto(n.texto).replace(/\s+/g, ' ').slice(0, 60);
        if (atual.includes(prefixo)) { salta('já existe em ATUALIZACOES.md', n); continue; }
        const linha = linhaAtualizacao({ data: n.data_lancamento, tituloEntrada: tituloDe(ler(n.entrada)), caminho: relative(secao, n.entrada).replace(/\\/g, '/'), texto: n.texto, fonte_nome: n.fonte_nome, fonte_url: n.fonte_url, confianca: n.confianca, hoje });
        gravar(f, inserirAtualizacao(atual, n.categoria, linha, n.data_lancamento));
        registar(n, 'atualizacao', `Atualização (${n.categoria}): ${minuscula(primeiraFrase(n.texto))}`, f);
      } else if (n.tipo === 'edicao') {
        const e = (novidades.edicoes || []).find((x) => x.novidade?.item === n.item && x.novidade?.texto === n.texto);
        if (!e) { salta('sem edição gerada para esta novidade', n); continue; }
        if (!n.entrada || !existsSync(join(K, n.entrada))) { salta('a entrada não existe', n); continue; }
        const r = aplicarEdicaoTexto(ler(n.entrada), e, hoje);
        if (r.erro) { salta(`edição não aplicada: ${r.erro}`, n); continue; }
        gravar(n.entrada, r.texto);
        registar(n, 'edicao', `Edição: ${minuscula(primeiraFrase(n.texto))}`, n.entrada);
      } else if (n.tipo === 'fonte') {
        const vigiar = /^a_vigiar:/i.test(n.categoria ?? '');
        if (!vigiar && !seccaoExiste(n.seccao)) { salta('a secção não existe', n); continue; }
        if (n.texto.length > LIMITES.fonte_texto) { salta('descrição da fonte grande demais', n); continue; }
        const md = ler('FONTES.md');
        if (md.includes(`](${n.fonte_url})`)) { salta('a fonte já está em FONTES.md', n); continue; }
        const novo = vigiar
          ? inserirVigiar(md, `| ${celula(n.categoria.replace(/^a_vigiar:/i, ''))} | ${celula(n.texto)} | [${n.fonte_url}](${n.fonte_url}) |`)
          : inserirFonte(md, n.seccao, `| [${celula(n.fonte_nome)}](${n.fonte_url}) | ${celula(n.texto)} |`);
        if (!novo) { salta('não encontrei a tabela em FONTES.md', n); continue; }
        gravar('FONTES.md', novo);
        registar(n, 'fonte', vigiar ? `Fontes: ${semPonto(n.texto)} passa a «A vigiar»` : `Fontes: ${semPonto(n.texto)}`, 'FONTES.md');
      } else if (n.tipo === 'retirar_a_vigiar') {
        const novo = removerVigiar(ler('FONTES.md'), n.fonte_url);
        if (!novo) { salta('o ponto não está em «A vigiar»', n); continue; }
        gravar('FONTES.md', novo);
        registar(n, 'retirar_a_vigiar', `Fontes: ${semPonto(n.texto)} (retirado de «A vigiar»)`, 'FONTES.md');
      } else if (n.tipo === 'entrada_nova') {
        const motivo = validarEntradaNova(n.entrada ?? '', n.texto);
        if (motivo) { salta(`entrada nova recusada: ${motivo}`, n); continue; }
        if (!seccaoExiste(secao)) { salta('a secção não existe', n); continue; }
        if (existsSync(join(K, n.entrada))) { salta('já existe uma entrada com esse caminho', n); continue; }
        gravar(n.entrada, lf(n.texto).replace(/\n*$/, '\n'));
        registar(n, 'entrada_nova', `Nova entrada: ${tituloDe(n.texto)}`, n.entrada);
      } else salta(`tipo desconhecido: ${n.tipo}`, n);
    } catch (e) { salta(`erro ao escrever: ${e.message}`, n); }
  }

  if (changelog.length) {
    const f = join(K, 'CHANGELOG.md');
    let t = lf(readFileSync(f, 'utf8')).replace(/\n*$/, '\n');
    t += changelog.join('\n') + '\n';
    escreverAtomico(f, t);
  }
  return { aplicadas, saltadas };
}

function principal() {
  const { pos, o } = opcoes(process.argv.slice(2), ['novidades', 'saida', 'feito-por', 'hoje']);
  const raiz = pos[0] && resolve(pos[0]);
  if (!raiz || !existsSync(join(raiz, 'knowledge')) || !o.novidades || !o.saida) { console.error('Uso: node aplicar.mjs <raiz do repositório> --novidades <novidades.json> --saida <aplicadas.json> [--feito-por "<texto>"]'); process.exit(2); }
  const nov = lerJson(resolve(o.novidades), null);
  if (!nov) { console.error('novidades.json ilegível.'); process.exit(2); }
  const res = aplicar(raiz, nov, { hoje: o.hoje || hojeReal(), feitoPor: o['feito-por'] || APROVACAO_PERMANENTE });
  const indice = correr('indice.mjs', [join(raiz, 'knowledge')], raiz);
  const verif = correr('verificar-alteracoes.mjs', [raiz], raiz);
  const saida = { ...res, verificacao: { indice: indice.ok, verificador: verif.ok, saida: verif.saida } };
  escreverJson(resolve(o.saida), saida);
  console.log(verif.saida);
  console.log(JSON.stringify({ aplicadas: res.aplicadas.length, saltadas: res.saltadas.length, verificado: indice.ok && verif.ok }));
  if (!indice.ok || !verif.ok) process.exit(1);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) principal();

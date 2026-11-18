#!/usr/bin/env node
// Verifica a documentação de um projeto: os relatórios de processo, as ligações relativas
// e os ficheiros gerados (existem, estão atualizados, são zips válidos com as partes e o XML certos).
// Uso: node verificar.mjs [--raiz <repo>] [--pasta documentacao] [--processos <pasta>]...
// Sai com 0 e um resumo se está tudo certo; com 1 e a lista de falhas, se não.

import { readFileSync, existsSync, statSync } from 'node:fs';
import { join, resolve, dirname } from 'node:path';
import { pathToFileURL } from 'node:url';
import { lerZip, erroDeXml, lerRelacoes } from './ooxml.mjs';
import { argumentos, caminhos, ficheirosDeProcessos, lerProcessos, falhasDosProcessos, avisosSemCabecalho, mdsEm, rel, GERADOS } from './gerar.mjs';

const PARTES = {
  xlsx: ['[Content_Types].xml', '_rels/.rels', 'xl/workbook.xml', 'xl/_rels/workbook.xml.rels', 'xl/styles.xml', 'xl/sharedStrings.xml',
    'xl/worksheets/sheet1.xml', 'xl/worksheets/sheet2.xml', 'xl/worksheets/sheet3.xml'],
  docx: ['[Content_Types].xml', '_rels/.rels', 'word/document.xml', 'word/_rels/document.xml.rels', 'word/styles.xml', 'word/settings.xml'],
};

const externo = (alvo) => /^[a-z][a-z0-9+.-]*:/i.test(alvo) || alvo.startsWith('//');

// Alvos relativos das ligações e imagens de um Markdown, fora do código e dos comentários.
export function ligacoesRelativas(md) {
  const texto = md
    .replace(/^---\r?\n[\s\S]*?\r?\n---[ \t]*(\r?\n|$)/, '')
    .replace(/<!--[\s\S]*?-->/g, '')
    .replace(/^\s*(`{3,}|~{3,})[^\n]*\n[\s\S]*?^\s*\1[`~]*\s*$/gm, '')
    .replace(/(`+)[\s\S]*?\1/g, '');
  const alvos = [];
  for (const m of texto.matchAll(/!?\[(?:[^\]\\]|\\.)*\]\(\s*<?([^)\s>]+)>?(?:\s+"[^"]*")?\s*\)/g)) {
    const alvo = m[1];
    if (!alvo || alvo.startsWith('#') || externo(alvo)) continue;
    alvos.push(alvo);
  }
  return alvos;
}

// Um alvo relativo existe se o ficheiro ou a pasta existir, sem a âncora e sem o %20.
function existe(base, alvo) {
  let caminho = alvo.split('#')[0].split('?')[0];
  try { caminho = decodeURI(caminho); } catch { /* fica como está */ }
  return caminho === '' || existsSync(resolve(base, caminho));
}

function falhasDoPacote(caminho, tipo, nome) {
  let zip;
  try { zip = lerZip(readFileSync(caminho)); } catch (err) { return { falhas: [`${nome}: não é um zip válido (${err.message})`] }; }
  const falhas = [];
  for (const p of PARTES[tipo]) if (!zip.has(p)) falhas.push(`${nome}: falta a parte obrigatória ${p}`);
  for (const [parte, dados] of zip) {
    if (!/\.(xml|rels)$/.test(parte)) continue;
    const erro = erroDeXml(dados.toString('utf8'));
    if (erro) falhas.push(`${nome}: ${parte} mal formado (${erro})`);
  }
  for (const parte of ['', ...zip.keys()]) {
    if (parte.endsWith('.rels')) continue;
    for (const r of lerRelacoes(zip, parte)) {
      if (!r.externo && r.parte && !zip.has(r.parte)) falhas.push(`${nome}: ${parte || 'o pacote'} aponta para ${r.parte}, que não existe`);
    }
  }
  return { falhas, zip };
}

export function verificar(opcoes) {
  const { raiz, pasta } = opcoes;
  const falhas = [], avisos = [];
  const { processos, ignorados } = lerProcessos(ficheirosDeProcessos(opcoes));
  falhas.push(...falhasDosProcessos(processos, raiz));
  avisos.push(...avisosSemCabecalho(processos, ignorados, raiz));

  let ligacoes = 0;
  for (const md of mdsEm(pasta)) {
    for (const alvo of ligacoesRelativas(readFileSync(md, 'utf8'))) {
      if (existe(dirname(md), alvo)) ligacoes++;
      else falhas.push(`${rel(raiz, md)}: a ligação «${alvo}» não existe`);
    }
  }

  const fontes = [
    [GERADOS.livro, 'xlsx', processos.map((p) => p.ficheiro)],
    [GERADOS.entendimento, 'docx', [join(pasta, 'entendimento.md')]],
    [GERADOS.final, 'docx', [join(pasta, 'relatorio-final.md')]],
  ];
  let certos = 0;
  for (const [nome, tipo, origens] of fontes) {
    const caminho = join(pasta, nome);
    for (const o of origens) if (!existsSync(o)) falhas.push(`falta ${rel(raiz, o)}, de onde sai ${nome}`);
    if (!existsSync(caminho)) { falhas.push(`falta ${rel(raiz, caminho)}; corre node gerar.mjs`); continue; }
    const quando = statSync(caminho).mtimeMs;
    const novas = origens.filter((o) => existsSync(o) && statSync(o).mtimeMs > quando);
    if (novas.length) falhas.push(`${nome} é mais antigo que ${novas.map((o) => rel(raiz, o)).join(', ')}; corre node gerar.mjs`);
    const { falhas: doPacote, zip } = falhasDoPacote(caminho, tipo, nome);
    falhas.push(...doPacote);
    if (tipo === 'docx' && zip) {
      for (const r of lerRelacoes(zip, 'word/document.xml')) {
        if (!r.externo || !/\/hyperlink$/.test(r.tipo) || externo(r.alvo)) continue;
        if (existe(pasta, r.alvo)) ligacoes++;
        else falhas.push(`${nome}: a ligação «${r.alvo}» não existe a partir de ${rel(raiz, pasta) || '.'}`);
      }
    }
    if (!novas.length && !doPacote.length) certos++;
  }
  return { falhas, avisos, resumo: { processos: processos.length, gerados: certos, ligacoes } };
}

if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) {
  let opcoes;
  try { opcoes = caminhos(argumentos(process.argv.slice(2))); } catch (err) {
    console.error(`✗ ${err.message}`);
    console.error('Uso: node verificar.mjs [--raiz <repo>] [--pasta documentacao] [--processos <pasta>]...');
    process.exit(2);
  }
  const { falhas, avisos, resumo } = verificar(opcoes);
  for (const a of avisos) console.log(`AVISO: ${a}`);
  if (falhas.length) {
    console.log(`✗ Documentação com ${falhas.length} falha(s):`);
    for (const f of falhas) console.log(`  - ${f}`);
    process.exit(1);
  }
  console.log(`✓ Documentação verificada: ${resumo.processos} relatórios de processo, ${resumo.gerados} ficheiros gerados atualizados e válidos, ${resumo.ligacoes} ligações relativas que existem.`);
}

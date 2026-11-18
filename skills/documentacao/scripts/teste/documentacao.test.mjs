// Testes dos scripts de documentação. Cada teste que gera trabalha num repositório git temporário,
// criado a partir de teste/dados com quatro commits de datas conhecidas.
// Correr: node --test skills/documentacao/scripts/teste/

import { test, after } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, cpSync, writeFileSync, readFileSync, rmSync, utimesSync, mkdirSync, existsSync, appendFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, dirname } from 'node:path';
import { execFileSync, spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { escreverZip, lerZip, erroDeXml, crc32, desesc } from '../ooxml.mjs';
import { extrairPadrao } from '../padrao.mjs';
import { frontmatter, blocosMarkdown } from '../gerar.mjs';

const AQUI = dirname(fileURLToPath(import.meta.url));
const SCRIPTS = join(AQUI, '..');
const DADOS = join(AQUI, 'dados');
const criados = [];
after(() => { for (const p of criados) rmSync(p, { recursive: true, force: true }); });

function repositorio() {
  const raiz = mkdtempSync(join(tmpdir(), 'documentacao-'));
  criados.push(raiz);
  cpSync(DADOS, raiz, { recursive: true });
  const git = (args, env = {}) => execFileSync('git', ['-c', 'commit.gpgsign=false', '-c', 'core.autocrlf=false', ...args],
    { cwd: raiz, env: { ...process.env, ...env }, stdio: 'pipe' });
  git(['init', '-q']);
  const commit = (data, [nome, email], mensagem, ficheiros) => {
    for (const [f, conteudo] of Object.entries(ficheiros)) {
      mkdirSync(dirname(join(raiz, f)), { recursive: true });
      writeFileSync(join(raiz, f), conteudo);
    }
    git(['add', ...Object.keys(ficheiros)]);
    git(['commit', '-q', '-m', mensagem], {
      GIT_AUTHOR_NAME: nome, GIT_AUTHOR_EMAIL: email, GIT_COMMITTER_NAME: nome, GIT_COMMITTER_EMAIL: email,
      GIT_AUTHOR_DATE: data, GIT_COMMITTER_DATE: data,
    });
  };
  const ana = ['Ana Silva', 'ana@example.com'], bruno = ['Bruno Costa', 'bruno@example.com'];
  const linhas = (n, p = 'linha') => Array.from({ length: n }, (_, i) => `${p} ${i + 1}\n`).join('');
  commit('2026-10-06T11:00:00+01:00', ana, 'Estrutura inicial', { 'README.md': linhas(3), 'src/app.js': linhas(10) });
  commit('2026-10-21T15:00:00+01:00', bruno, 'Modelo de dados', { 'src/dados.js': linhas(20) });
  commit('2026-11-03T10:00:00+00:00', ana, 'Ecrã de entrada', { 'src/app.js': 'nova 1\nnova 2\n' + linhas(10).split('\n').slice(2).join('\n') + linhas(3, 'extra') });
  commit('2026-11-10T17:00:00+00:00', ana, 'Publicação', { 'deploy.yml': linhas(8), 'logo.bin': Buffer.from([0, 1, 2, 0, 255]) });
  return raiz;
}

const correr = (script, raiz) => spawnSync(process.execPath, [join(SCRIPTS, script), '--raiz', raiz], { encoding: 'utf8' });

function gerado(raiz) {
  const r = correr('gerar.mjs', raiz);
  assert.equal(r.status, 0, r.stderr + r.stdout);
  return r.stdout;
}

// Células de uma folha: referência -> { f, v, s }, com os textos partilhados já resolvidos.
function folha(zip, n) {
  const textos = [...zip.get('xl/sharedStrings.xml').toString('utf8').matchAll(/<si><t[^>]*>([\s\S]*?)<\/t><\/si>/g)].map((m) => desesc(m[1]));
  const celulas = new Map();
  for (const m of zip.get(`xl/worksheets/sheet${n}.xml`).toString('utf8').matchAll(/<c r="([A-Z]+\d+)"([^>]*?)(?:\/>|>([\s\S]*?)<\/c>)/g)) {
    const [, ref, atributos, dentro = ''] = m;
    const f = (dentro.match(/<f>([\s\S]*?)<\/f>/) || [])[1];
    let v = (dentro.match(/<v>([\s\S]*?)<\/v>/) || [])[1];
    if (/t="s"/.test(atributos)) v = textos[Number(v)];
    else if (/t="str"/.test(atributos)) v = desesc(v ?? '');
    else if (v != null) v = Number(v);
    celulas.set(ref, { f: f && desesc(f), v, s: Number((atributos.match(/s="(\d+)"/) || [])[1] || 0) });
  }
  return celulas;
}

const linhaCom = (celulas, rotulo, depoisDe = 0) => {
  for (let r = depoisDe + 1; r < 200; r++) if (celulas.get(`A${r}`)?.v === rotulo) return r;
  assert.fail(`sem linha «${rotulo}»`);
};

test('zip: escreve e relê entradas comprimidas e guardadas, e recusa um zip estragado', () => {
  assert.equal(crc32(Buffer.from('123456789')), 0xcbf43926);
  const zip = escreverZip([
    { nome: 'a.xml', dados: '<a>olá, ação</a>' },
    { nome: 'pasta/b.bin', dados: Buffer.from([0, 1, 2, 3, 255]), comprimir: false },
    { nome: 'vazio.txt', dados: '' },
  ]);
  const lido = lerZip(zip);
  assert.deepEqual([...lido.keys()], ['a.xml', 'pasta/b.bin', 'vazio.txt']);
  assert.equal(lido.get('a.xml').toString('utf8'), '<a>olá, ação</a>');
  assert.deepEqual([...lido.get('pasta/b.bin')], [0, 1, 2, 3, 255]);
  assert.equal(lido.get('vazio.txt').length, 0);
  // A entrada guardada fica com o método 0 no diretório central.
  const central = zip.indexOf(Buffer.from('PK\x01\x02', 'latin1'));
  const segunda = zip.indexOf(Buffer.from('PK\x01\x02', 'latin1'), central + 4);
  assert.equal(zip.readUInt16LE(segunda + 10), 0);

  const estragado = Buffer.from(zip);
  estragado[30 + 'a.xml'.length + 2] ^= 0xff;
  assert.throws(() => lerZip(estragado));
  assert.throws(() => lerZip(Buffer.from('isto não é um zip')), /não é um zip/);
});

test('xml: a verificação simples apanha etiquetas trocadas e & soltos', () => {
  assert.equal(erroDeXml('<?xml version="1.0"?><a x="1"><b/>texto &amp; mais<!-- <c> --></a>'), null);
  assert.match(erroDeXml('<a><b></a>'), /fecha/);
  assert.match(erroDeXml('<a>x & y</a>'), /&/);
  assert.match(erroDeXml('<a></a><b/>'), /raiz/);
});

test('cabeçalho: campos sem valor ficam vazios, nunca «null»', () => {
  const { campos } = frontmatter('---\nid: P-1\nfim:\nfase:   \ntitulo: "Com: dois pontos"\nsessao: \'S1\'\n---\ncorpo');
  assert.deepEqual(campos, { id: 'P-1', fim: '', fase: '', titulo: 'Com: dois pontos', sessao: 'S1' });
});

test('markdown: comentários de uma e de várias linhas desaparecem; <!-- quebra --> é quebra de página', () => {
  const b = blocosMarkdown('Antes <!-- some --> depois\n\n<!--\nvárias\nlinhas\n-->\n\n<!-- quebra -->\n\n```\n<!-- fica no código -->\n```');
  assert.deepEqual(b.map((x) => x.tipo), ['paragrafo', 'quebra', 'codigo']);
  assert.equal(b[0].texto, 'Antes depois');
  assert.deepEqual(b[2].linhas, ['<!-- fica no código -->']);
});

test('gerar: o livro tem as três folhas, as fórmulas e os valores em cache certos', () => {
  const raiz = repositorio();
  const saida = gerado(raiz);
  assert.match(saida, /6 processos \(3 feitos, 3 com prova, 1 reconstruído\), 4 commits de 2 autores/);
  assert.match(saida, /orquestracao\/demo\/saidas\/S1\.md: sem cabeçalho e nenhum relatório a cita/);
  assert.match(saida, /documentacao\/processos\/LEIA-ME\.md: sem cabeçalho e nenhum relatório a cita/);

  const zip = lerZip(readFileSync(join(raiz, 'documentacao', 'processos-e-estatisticas.xlsx')));
  for (const [parte, dados] of zip) if (/\.(xml|rels)$/.test(parte)) assert.equal(erroDeXml(dados.toString('utf8')), null, parte);
  const livro = zip.get('xl/workbook.xml').toString('utf8');
  assert.match(livro, /<sheet name="Processos"[^>]*\/><sheet name="Estatísticas"[^>]*\/><sheet name="Commits"/);
  assert.match(livro, /<calcPr [^>]*fullCalcOnLoad="1"/);

  // As colunas que as fórmulas usam são as que o cabeçalho diz.
  const p = folha(zip, 1);
  const cab = { A: 'ID', C: 'Fase', D: 'Skill', H: 'Início', J: 'Duração (min)', K: 'Estado', L: 'Prova', M: 'Retrabalho', P: 'Reconstruído', Q: 'Relatório' };
  for (const [col, nome] of Object.entries(cab)) assert.equal(p.get(`${col}1`).v, nome);
  assert.deepEqual([2, 3, 4, 5, 6, 7].map((r) => p.get(`A${r}`).v), ['P-0001', 'P-0002', 'P-0003', 'P-0004', 'P-0005', 'P-0006']);
  assert.equal(p.get('D3').v, 'start-project-with-trust, orchestrate-sessions');
  assert.equal(p.get('M2').v, 0, 'retrabalho 0 fica 0');
  assert.equal(p.get('C7')?.v, undefined, 'fase vazia fica vazia');
  assert.ok(![...p.values()].some((c) => c.v === 'null'), 'nenhuma célula com «null»');

  // Datas verdadeiras: número de série com formato de data.
  assert.equal(p.get('H2').v, 46301);
  assert.ok(Math.abs(p.get('H3').v - (46302 + 9.5 / 24)) < 1e-9, '07/10/2026 09:30');
  const estilos = zip.get('xl/styles.xml').toString('utf8');
  const xfs = estilos.match(/<cellXfs[^>]*>([\s\S]*?)<\/cellXfs>/)[1].match(/<xf [^>]*?(?:\/>|>[\s\S]*?<\/xf>)/g);
  const formato = (s) => { const id = xfs[s].match(/numFmtId="(\d+)"/)[1]; return (estilos.match(new RegExp(`numFmtId="${id}" formatCode="([^"]+)"`)) || [])[1]; };
  assert.equal(formato(p.get('H2').s), 'dd/mm/yyyy');
  assert.equal(formato(p.get('H3').s), 'dd/mm/yyyy hh:mm');

  const s1 = zip.get('xl/worksheets/sheet1.xml').toString('utf8');
  assert.match(s1, /<pane ySplit="1" topLeftCell="A2" activePane="bottomLeft" state="frozen"\/>/);
  assert.match(s1, /<autoFilter ref="A1:Q7"\/>/);
  const rels = zip.get('xl/worksheets/_rels/sheet1.xml.rels').toString('utf8');
  assert.match(rels, /Target="processos\/P-0001-requisitos\.md" TargetMode="External"/);
  assert.match(rels, /Target="processos\/fase-2\/P-0004-ecra-de-entrada\.md" TargetMode="External"/);
  assert.match(rels, /Target="\.\.\/orquestracao\/demo\/saidas\/S2\.md" TargetMode="External"/);

  const e = folha(zip, 2);
  for (const [ref, c] of e) if (!ref.startsWith('A') && c.v !== undefined && c.f === undefined && typeof c.v === 'number') assert.fail(`${ref}: Estatísticas só tem fórmulas fora da coluna dos rótulos`);
  const valor = (r, col = 'B') => e.get(`${col}${r}`);

  const t = linhaCom(e, 'Processos');
  assert.deepEqual(valor(t), { f: 'COUNTA(Processos!$A:$A)-1', v: 6, s: 0 });
  assert.equal(valor(linhaCom(e, 'Feitos')).v, 3);
  assert.equal(valor(linhaCom(e, 'Com prova')).f, 'COUNTIFS(Processos!$L:$L,"sim")');
  assert.equal(valor(linhaCom(e, 'Com prova')).v, 3);
  assert.equal(valor(linhaCom(e, '% com prova')).v, 0.5);
  assert.equal(valor(linhaCom(e, 'Duração registada (min)')).v, 690);
  assert.equal(valor(linhaCom(e, 'Retrabalho total')).v, 4);
  assert.equal(valor(linhaCom(e, 'Reconstruídos')).v, 1);

  const sk = linhaCom(e, 'start-project-with-trust');
  assert.equal(valor(sk).f, `COUNTIFS(Processos!$D:$D,"*"&A${sk}&"*")`);
  assert.deepEqual(['B', 'C', 'D', 'E', 'F'].map((c) => valor(sk, c).v), [2, 2, 1, 240, 0.5]);
  assert.equal(valor(sk, 'F').f, `IFERROR(AVERAGEIFS(Processos!$M:$M,Processos!$D:$D,"*"&A${sk}&"*"),"")`);
  const infra = linhaCom(e, 'infra-deploy');
  assert.deepEqual(['B', 'C', 'D', 'E', 'F'].map((c) => valor(infra, c).v), [1, 0, 0, '', '']);
  assert.equal(linhaCom(e, 'backend-dados') < linhaCom(e, 'design-ux'), true, 'skills por ordem alfabética');

  const fase = linhaCom(e, 'Construção');
  assert.equal(valor(fase).f, `COUNTIFS(Processos!$C:$C,A${fase})`);
  assert.deepEqual(['B', 'C', 'D', 'E', 'F'].map((c) => valor(fase, c).v), [2, 1, 0.5, 420, 1.5]);
  const semFase = linhaCom(e, '(sem fase)');
  assert.equal(valor(semFase).f, 'COUNTIFS(Processos!$C:$C,"",Processos!$A:$A,"<>")');
  assert.deepEqual(['B', 'E', 'F'].map((c) => valor(semFase, c).v), [1, 30, '']);

  assert.deepEqual(['feito', 'parcial', 'falhou', 'cancelado'].map((x) => valor(linhaCom(e, x)).v), [3, 1, 1, 1]);
  assert.equal(valor(linhaCom(e, 'falhou'), 'C').f, `IF($B$${t}=0,0,B${linhaCom(e, 'falhou')}/$B$${t})`);

  const meses = [...e.entries()].filter(([ref, c]) => /^A\d+$/.test(ref) && typeof c.v === 'number').map(([ref, c]) => [Number(ref.slice(1)), c.v]);
  assert.deepEqual(meses.map(([, v]) => v), [46296, 46327], 'outubro e novembro de 2026, como datas');
  const [[outubro], [novembro]] = meses;
  assert.equal(valor(outubro).f, `COUNTIFS(Processos!$H:$H,">="&A${outubro},Processos!$H:$H,"<"&DATE(YEAR(A${outubro}),MONTH(A${outubro})+1,1))`);
  assert.deepEqual([valor(outubro).v, valor(outubro, 'C').v, valor(novembro).v, valor(novembro, 'C').v], [3, 2, 3, 2]);

  const c = linhaCom(e, 'Commits', linhaCom(e, 'Commits'));
  assert.equal(valor(c).v, 4);
  assert.equal(valor(linhaCom(e, 'Autores')).f, 'SUMPRODUCT((Commits!$C$2:$C$5<>"")/COUNTIF(Commits!$C$2:$C$5,Commits!$C$2:$C$5&""))');
  assert.equal(valor(linhaCom(e, 'Autores')).v, 2);
  assert.equal(valor(linhaCom(e, 'Linhas acrescentadas')).v, 46);
  assert.equal(valor(linhaCom(e, 'Linhas retiradas')).v, 2);

  const k = folha(zip, 3);
  assert.deepEqual(['A1', 'B1', 'C1', 'D1', 'E1', 'F1', 'G1'].map((r) => k.get(r).v), ['Data', 'Hash', 'Autor', 'Mensagem', 'Ficheiros', 'Linhas +', 'Linhas −']);
  assert.deepEqual([2, 3, 4, 5].map((r) => k.get(`D${r}`).v), ['Estrutura inicial', 'Modelo de dados', 'Ecrã de entrada', 'Publicação'], 'do mais antigo para o mais recente');
  assert.deepEqual(['E5', 'F5', 'G5', 'F4', 'G4'].map((r) => k.get(r).v), [2, 8, 0, 5, 2]);
});

test('gerar: os Word têm capa, índice, estilos e todos os elementos do Markdown', () => {
  const raiz = repositorio();
  gerado(raiz);
  const zip = lerZip(readFileSync(join(raiz, 'documentacao', 'entendimento.docx')));
  for (const [parte, dados] of zip) if (/\.(xml|rels)$/.test(parte)) assert.equal(erroDeXml(dados.toString('utf8')), null, parte);
  const doc = zip.get('word/document.xml').toString('utf8');
  const texto = desesc(doc.replace(/<[^>]+>/g, ''));

  for (const estilo of ['Title', 'Subtitle', 'Heading1', 'Heading2', 'Heading3', 'Quote', 'Code', 'ListParagraph', 'TOCHeading', 'TOC1']) {
    assert.match(doc, new RegExp(`<w:pStyle w:val="${estilo}"/>`), estilo);
  }
  assert.match(doc, /<w:instrText xml:space="preserve"> TOC \\o "1-3" \\h \\z \\u <\/w:instrText>/);
  assert.match(doc, /<w:hyperlink w:anchor="_Toc00000001"/);
  assert.equal(doc.match(/<w:br w:type="page"\/>/g).length, 3, 'capa e duas <!-- quebra -->');
  assert.equal(doc.match(/<w:tbl>/g).length, 2);
  assert.match(doc, /<w:tblHeader\/>/);
  assert.match(doc, /<w:jc w:val="center"\/>/);
  assert.match(doc, /<w:jc w:val="right"\/>/);
  assert.match(doc, /<w:rStyle w:val="CodeChar"\/><\/w:rPr><w:t xml:space="preserve">npm test/);
  assert.match(doc, /<w:b\/><w:bCs\/><w:i\/><w:iCs\/><\/w:rPr><w:t xml:space="preserve">riscos/);
  assert.match(doc, /<w:br\/><w:t xml:space="preserve">Esta linha começa/);
  assert.match(texto, /Mostra o estado ao cliente \| e ao balcão/);
  assert.match(doc, /<wp:extent cx="2286000" cy="857250"\/>/, 'PNG de 240×90 px a 96 dpi, mais pequeno que a largura útil');
  assert.doesNotMatch(texto, /Comentário de várias linhas|nota em linha|\[\[indice\]\]/);
  assert.match(texto, /18 de novembro de 2026/);
  assert.match(texto, /Versão 1\.2/);

  const numeracao = zip.get('word/numbering.xml').toString('utf8');
  assert.equal(numeracao.match(/<w:abstractNum /g).length, 2);
  assert.match(numeracao, /<w:numFmt w:val="decimal"\/>/);
  assert.match(numeracao, /<w:numFmt w:val="bullet"\/>/);
  assert.equal(doc.match(/<w:ilvl w:val="1"\/>/g).length, 3, 'três itens no segundo nível');

  const rels = zip.get('word/_rels/document.xml.rels').toString('utf8');
  for (const alvo of ['processos-e-estatisticas.xlsx', 'processos/P-0001-requisitos.md', 'https://example.com/equipa', 'processos/']) {
    assert.match(rels, new RegExp(`Target="${alvo.replace(/[./]/g, '\\$&')}" TargetMode="External"`), alvo);
  }
  assert.doesNotMatch(rels, /#limites/, 'âncora interna fica como texto');
  assert.match(doc, /<w:r><w:t xml:space="preserve">Limites<\/w:t><\/w:r>/, 'e sem o estilo de ligação');
  assert.match(texto, /antes de publicar\. A fonte/, 'o comentário em linha não deixa dois espaços');
  assert.equal(doc.match(/<\/w:numPr><w:spacing w:after="160"\/>/g).length, 2, 'o último item de cada lista separa-se do que vem a seguir');
  assert.match(rels, /Target="media\/imagem1\.png"/);
  assert.ok(zip.has('word/media/imagem1.png'));

  const rodape = zip.get('word/footer1.xml').toString('utf8');
  assert.match(rodape, /w:instr=" PAGE "/);
  assert.match(rodape, /w:instr=" NUMPAGES "/);
  assert.doesNotMatch(zip.get('word/settings.xml').toString('utf8'), /updateFields/);
  const seccao = doc.match(/<w:sectPr>[\s\S]*<\/w:sectPr>/)[0];
  assert.match(seccao, /<w:pgSz w:w="11906" w:h="16838"\/>/);
  assert.match(seccao, /w:top="1417" w:right="1417" w:bottom="1417" w:left="1417"/);
  assert.match(seccao, /<w:titlePg\/>/);

  const estilos = zip.get('word/styles.xml').toString('utf8');
  assert.match(estilos, /<w:style w:type="paragraph" w:styleId="Heading1"><w:name w:val="heading 1"\/>[\s\S]*?<w:color w:val="1F3A5F"\/>/);
  assert.match(estilos, /<w:tblStylePr w:type="firstRow"><w:rPr><w:b\/><w:bCs\/><w:color w:val="FFFFFF"\/><\/w:rPr><w:tcPr><w:shd w:val="clear" w:color="auto" w:fill="1F3A5F"\/>/);
  assert.match(estilos, /w:fill="F2F4F7"/);

  const final = lerZip(readFileSync(join(raiz, 'documentacao', 'relatorio-final.docx')));
  const relsFinal = final.get('word/_rels/document.xml.rels').toString('utf8');
  for (const alvo of ['entendimento.docx', 'processos-e-estatisticas.xlsx', 'processos/', 'processos/fase-2/P-0004-ecra-de-entrada.md']) assert.ok(relsFinal.includes(`Target="${alvo}"`), alvo);
});

test('verificar: passa com tudo gerado, também com a ligação à pasta processos/', () => {
  const raiz = repositorio();
  gerado(raiz);
  const r = correr('verificar.mjs', raiz);
  assert.equal(r.status, 0, r.stdout);
  assert.match(r.stdout, /✓ Documentação verificada: 6 relatórios de processo, 3 ficheiros gerados atualizados e válidos/);
});

test('verificar: apanha ids repetidos, campos em falta e valores inválidos', () => {
  const raiz = repositorio();
  gerado(raiz);
  const processos = join(raiz, 'documentacao', 'processos');
  writeFileSync(join(processos, 'P-0007-copia.md'), '---\nid: P-0003\ntitulo: Cópia\nskill: backend-dados\ninicio: 2026-11-15\nestado: feito\nprova: sim\n---\n');
  writeFileSync(join(processos, 'P-0008-incompleto.md'), '---\nid: P-0008\ntitulo:\ninicio: 15/11/2026\nestado: acabado\nprova: talvez\n---\n');
  const r = correr('verificar.mjs', raiz);
  assert.equal(r.status, 1);
  assert.match(r.stdout, /id «P-0003» repetido em documentacao\/processos\/P-0003-modelo-de-dados\.md e documentacao\/processos\/P-0007-copia\.md/);
  assert.match(r.stdout, /P-0008-incompleto\.md: falta o campo obrigatório «titulo»/);
  assert.match(r.stdout, /P-0008-incompleto\.md: falta o campo obrigatório «skill»/);
  assert.match(r.stdout, /estado «acabado» inválido/);
  assert.match(r.stdout, /prova «talvez» inválida/);
  assert.match(r.stdout, /início «15\/11\/2026» não é AAAA-MM-DD/);
});

test('verificar: apanha ligações partidas no Markdown e no Word', () => {
  const raiz = repositorio();
  appendFileSync(join(raiz, 'documentacao', 'relatorio-final.md'), '\nVer também [o anexo](anexos/nao-existe.pdf) e [a pasta](nao-ha/).\n');
  gerado(raiz);
  const r = correr('verificar.mjs', raiz);
  assert.equal(r.status, 1);
  assert.match(r.stdout, /documentacao\/relatorio-final\.md: a ligação «anexos\/nao-existe\.pdf» não existe/);
  assert.match(r.stdout, /documentacao\/relatorio-final\.md: a ligação «nao-ha\/» não existe/);
  assert.match(r.stdout, /relatorio-final\.docx: a ligação «anexos\/nao-existe\.pdf» não existe/);
  assert.doesNotMatch(r.stdout, /«processos\/»/);
});

test('verificar: apanha ficheiros gerados em falta, desatualizados ou estragados', () => {
  const raiz = repositorio();
  gerado(raiz);
  const pasta = join(raiz, 'documentacao');
  const futuro = new Date(Date.now() + 60_000);
  utimesSync(join(pasta, 'processos', 'P-0001-requisitos.md'), futuro, futuro);
  utimesSync(join(pasta, 'entendimento.md'), futuro, futuro);
  writeFileSync(join(pasta, 'relatorio-final.docx'), 'não é um zip');
  const r = correr('verificar.mjs', raiz);
  assert.equal(r.status, 1);
  assert.match(r.stdout, /processos-e-estatisticas\.xlsx é mais antigo que documentacao\/processos\/P-0001-requisitos\.md/);
  assert.match(r.stdout, /entendimento\.docx é mais antigo que documentacao\/entendimento\.md/);
  assert.match(r.stdout, /relatorio-final\.docx: não é um zip válido/);

  const semLivro = repositorio();
  const r2 = correr('verificar.mjs', semLivro);
  assert.equal(r2.status, 1);
  assert.match(r2.stdout, /falta documentacao\/processos-e-estatisticas\.xlsx/);
});

test('padrao: lê do Word o tema, as letras, o título 1 em pt-PT, a página, o logo e o rodapé', () => {
  const pasta = mkdtempSync(join(tmpdir(), 'padrao-'));
  criados.push(pasta);
  const png = readFileSync(join(DADOS, 'documentacao', 'imagens', 'diagrama.png'));
  const W = 'xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships"';
  const tema = '<a:theme xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main"><a:themeElements><a:clrScheme name="Casa">'
    + '<a:dk1><a:sysClr val="windowText" lastClr="101820"/></a:dk1><a:lt1><a:sysClr val="window" lastClr="FFFFFF"/></a:lt1>'
    + '<a:dk2><a:srgbClr val="203040"/></a:dk2><a:lt2><a:srgbClr val="EEEEEE"/></a:lt2>'
    + ['8A1538', '2E7D32', '1565C0', 'F9A825', '6A1B9A', '00838F'].map((c, i) => `<a:accent${i + 1}><a:srgbClr val="${c}"/></a:accent${i + 1}>`).join('')
    + '<a:hlink><a:srgbClr val="0B5394"/></a:hlink><a:folHlink><a:srgbClr val="674EA7"/></a:folHlink></a:clrScheme>'
    + '<a:fontScheme name="Casa"><a:majorFont><a:latin typeface="Georgia"/></a:majorFont><a:minorFont><a:latin typeface="Verdana"/></a:minorFont></a:fontScheme></a:themeElements></a:theme>';
  const docx = escreverZip([
    { nome: 'word/theme/theme1.xml', dados: tema },
    { nome: 'word/styles.xml', dados: `<w:styles ${W}><w:docDefaults><w:rPrDefault><w:rPr><w:rFonts w:asciiTheme="minorHAnsi" w:hAnsiTheme="minorHAnsi"/><w:sz w:val="20"/></w:rPr></w:rPrDefault></w:docDefaults>`
      + '<w:style w:type="paragraph" w:default="1" w:styleId="Normal"><w:name w:val="Normal"/></w:style>'
      + '<w:style w:type="paragraph" w:styleId="Ttulo1"><w:name w:val="heading 1"/><w:rPr><w:rFonts w:asciiTheme="majorHAnsi"/><w:color w:val="8A1538" w:themeColor="accent1"/></w:rPr></w:style></w:styles>' },
    { nome: 'word/document.xml', dados: `<w:document ${W}><w:body><w:p/><w:sectPr><w:headerReference w:type="default" r:id="rId9"/><w:pgSz w:w="11906" w:h="16838"/><w:pgMar w:top="1134" w:right="1134" w:bottom="1418" w:left="1701" w:header="708" w:footer="708" w:gutter="0"/></w:sectPr></w:body></w:document>` },
    { nome: 'word/header1.xml', dados: `<w:hdr ${W}><w:p><w:r><w:drawing><a:blip xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main" r:embed="rId1"/></w:drawing></w:r></w:p></w:hdr>` },
    { nome: 'word/_rels/header1.xml.rels', dados: '<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/image" Target="media/image1.png"/></Relationships>' },
    { nome: 'word/media/image1.png', dados: png, comprimir: false },
    { nome: 'word/footer1.xml', dados: `<w:ftr ${W}><w:p><w:r><w:t>Casa, Lda.</w:t></w:r><w:r><w:t xml:space="preserve"> · Confidencial</w:t></w:r></w:p></w:ftr>` },
  ]);
  const caminho = join(pasta, 'modelo.docx');
  writeFileSync(caminho, docx);

  const { padrao, logo } = extrairPadrao([caminho]);
  assert.deepEqual(padrao.letra, { titulos: 'Georgia', texto: 'Verdana', tamanho_texto_pt: 10 });
  assert.equal(padrao.cores.texto, '#101820');
  assert.equal(padrao.cores.titulos, '#8A1538');
  assert.equal(padrao.cores.ligacao, '#0B5394');
  assert.deepEqual(padrao.cores.destaque, ['#8A1538', '#2E7D32', '#1565C0', '#F9A825', '#6A1B9A', '#00838F']);
  assert.equal(padrao.cores.cabecalho_tabela, '#8A1538');
  assert.equal(padrao.cores.cabecalho_tabela_texto, '#FFFFFF');
  assert.deepEqual(padrao.pagina, { largura_mm: 210, altura_mm: 297, margens_mm: { cima: 20, baixo: 25, esquerda: 30, direita: 20 } });
  assert.equal(padrao.logo, 'padrao/logo.png');
  assert.deepEqual(logo.dados, png);
  assert.equal(padrao.rodape, 'Casa, Lda. · Confidencial');

  // O CLI escreve padrao.json e o logo; o gerar segue-os.
  const raiz = repositorio();
  const r = spawnSync(process.execPath, [join(SCRIPTS, 'padrao.mjs'), caminho, '--pasta', join(raiz, 'documentacao')], { encoding: 'utf8' });
  assert.equal(r.status, 0, r.stderr);
  assert.match(r.stdout, /Letras: títulos Georgia; texto Verdana 10 pt/);
  assert.ok(existsSync(join(raiz, 'documentacao', 'padrao', 'logo.png')));
  assert.match(gerado(raiz), /Estilo: padrao\.json \(modelo\.docx\)/);
  const gerados = lerZip(readFileSync(join(raiz, 'documentacao', 'entendimento.docx')));
  const estilos = gerados.get('word/styles.xml').toString('utf8');
  assert.match(estilos, /<w:rPrDefault><w:rPr><w:rFonts w:ascii="Verdana"[^>]*\/><w:color w:val="101820"\/><w:sz w:val="20"\/>/);
  assert.match(estilos, /w:styleId="Heading1">[\s\S]*?<w:rFonts w:ascii="Georgia"[\s\S]*?<w:color w:val="8A1538"\/>/);
  assert.match(gerados.get('word/footer1.xml').toString('utf8'), /Casa, Lda\. · Confidencial/);
  assert.match(gerados.get('word/document.xml').toString('utf8'), /w:top="1134" w:right="1134" w:bottom="1417" w:left="1701"/);
  assert.ok(gerados.has('word/_rels/header1.xml.rels'), 'logo no cabeçalho');
  const livro = lerZip(readFileSync(join(raiz, 'documentacao', 'processos-e-estatisticas.xlsx'))).get('xl/styles.xml').toString('utf8');
  assert.match(livro, /<fgColor rgb="FF8A1538"\/>/);
  assert.match(livro, /<name val="Verdana"\/>/);
});

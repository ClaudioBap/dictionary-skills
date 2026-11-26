import test from 'node:test';
import assert from 'node:assert/strict';
import { linhaAtualizacao, inserirAtualizacao, aplicarEdicaoTexto, linhaChangelog, aprovadoPor, inserirFonte, inserirVigiar, removerVigiar, validarEntradaNova, dominioConfirmado, primeiraFrase } from './aplicar.mjs';

test('linha de atualização no formato da skill', () => {
  const l = linhaAtualizacao({ data: '2026-11-23', tituloEntrada: 'Escolher o modelo Claude', caminho: 'escolher-o-modelo-claude.md', texto: 'O Opus 4.5 é retirado a 2027-01-22.', fonte_nome: 'Notas', fonte_url: 'https://p.com/n', confianca: 'alta', hoje: '2026-11-26' });
  assert.equal(l, '- **2026-11-23** em [Escolher o modelo Claude](escolher-o-modelo-claude.md): O Opus 4.5 é retirado a 2027-01-22. Fonte: [Notas](https://p.com/n). Confiança: alta. Adicionado a 2026-11-26.');
  assert.match(linhaAtualizacao({ data: null, texto: 'x', fonte_nome: 'n', fonte_url: 'u', confianca: 'media', hoje: 'h' }), /^- \*\*data não indicada\*\*: x\./);
});

const MD = '# Atualizações: X\n\nIntro.\n\n## Claude\n\n- **2026-11-20** a\n- **2026-11-10** b\n\n## OpenAI\n\n- **2026-11-17** c\n';
test('inserir por categoria e por data', () => {
  const meio = inserirAtualizacao(MD, 'Claude', '- **2026-11-15** novo', '2026-11-15').split('\n');
  assert.deepEqual(meio.slice(5, 10), ['', '- **2026-11-20** a', '- **2026-11-15** novo', '- **2026-11-10** b', '']);
  assert.ok(inserirAtualizacao(MD, 'Claude', '- **2026-12-01** topo', '2026-12-01').includes('## Claude\n\n- **2026-12-01** topo'));
  assert.ok(inserirAtualizacao(MD, 'Claude', '- **2026-01-01** fim', '2026-01-01').includes('- **2026-11-10** b\n- **2026-01-01** fim'));
  assert.ok(inserirAtualizacao(MD, 'AWS', '- **2026-11-01** z', '2026-11-01').endsWith('## AWS\n\n- **2026-11-01** z\n'));
});

const ENTRADA = '---\nid: ia/x\ntitulo: "X"\nverificado_em: 2026-11-10\neditado_em: 2026-11-10\n---\n\n# X\n\nO modelo A é o padrão.\n\nOutro parágrafo.\n\n## Histórico\n\n- **2026-11-09**: antes, «velho» (PDF). Mudou porque y. Editado a 2026-11-10.\n\nFonte: pág. 1\n';
const HIST = '- **2026-11-23**: antes, «O modelo A é o padrão.» (PDF pág. 1). Mudou porque saiu o B. Fonte: [N](https://p.com). Editado a 2026-11-26.';
test('edição: substitui só se existir, atualiza datas e Histórico', () => {
  const r = aplicarEdicaoTexto(ENTRADA, { trecho_antes: 'O modelo A é o padrão.', trecho_depois: 'O modelo B é o padrão.', historico: HIST }, '2026-11-26');
  assert.ok(r.texto.includes('# X\n\nO modelo B é o padrão.\n\nOutro'));
  assert.ok(r.texto.includes('## Histórico\n\n' + HIST + '\n- **2026-11-09**'));
  assert.match(r.texto, /verificado_em: 2026-11-26\neditado_em: 2026-11-26/);
  assert.match(aplicarEdicaoTexto(ENTRADA, { trecho_antes: 'não existe', trecho_depois: 'z', historico: HIST }, 'h').erro, /não existe/);
  assert.match(aplicarEdicaoTexto(ENTRADA, { trecho_antes: 'velho', trecho_depois: 'z', historico: HIST }, 'h').erro, /Histórico/);
  assert.match(aplicarEdicaoTexto(ENTRADA, { trecho_antes: 'O modelo A é o padrão.', trecho_depois: 'z', historico: 'lixo' }, 'h').erro, /Histórico/);
  const sem = aplicarEdicaoTexto(ENTRADA.replace(/## Histórico[\s\S]*Fonte/, 'Fonte'), { trecho_antes: 'Outro parágrafo.', trecho_depois: 'z', historico: HIST }, 'h');
  assert.ok(sem.texto.endsWith('## Histórico\n\n' + HIST + '\n'));
});

test('changelog e quem aprovou', () => {
  const l = linhaChangelog({ hoje: '2026-11-26', alteracao: 'Atualização (AWS): a | b', ficheiro: 'nuvem/ATUALIZACOES.md', fonte_nome: 'AWS', fonte_url: 'https://a.com', data: null, confianca: 'media', aprovado: aprovadoPor('atualizacao', 'media') });
  assert.equal(l, '| 2026-11-26 | Atualização (AWS): a \\| b | nuvem/ATUALIZACOES.md | [AWS](https://a.com) | data não indicada | media | aplicada sem aprovação (fonte média); corrida da noite |');
  assert.equal(aprovadoPor('atualizacao', 'alta'), 'aplicada sem aprovação (fonte alta); corrida da noite');
  assert.equal(aprovadoPor('fonte', 'alta', 'Fulano'), 'Fulano');
});

const FONTES = '## [Segurança](seguranca/README.md)\n\n| Fonte | Para quê |\n|---|---|\n| [A](https://a.org/) | a |\n\n## A vigiar\n\n| Tema | O que vigiar | Onde |\n|---|---|---|\n| IA | x | [https://u.org/](https://u.org/) |\n';
test('FONTES.md: inserir e retirar', () => {
  assert.ok(inserirFonte(FONTES, 'seguranca', '| [B](https://b.org/) | b |').includes('| [A](https://a.org/) | a |\n| [B](https://b.org/) | b |\n'));
  assert.equal(inserirFonte(FONTES, 'nao-existe', 'x'), null);
  assert.ok(inserirVigiar(FONTES, '| Tema | y | [https://v.org/](https://v.org/) |').trimEnd().endsWith('[https://v.org/](https://v.org/) |'));
  assert.ok(!removerVigiar(FONTES, 'https://u.org/').includes('u.org'));
  assert.equal(removerVigiar(FONTES, 'https://outro.org/'), null);
});

test('entrada nova e domínios', () => {
  const ok = '---\nid: ia/nova\ntitulo: "Nova"\nseccao: "IA"\npaginas: []\nfonte: "https://a.com"\ndata_lancamento: null\nconfianca: media\nverificado_em: 2026-11-26\n---\n\n# Nova\n\n**Resumo:** algo.\n';
  assert.equal(validarEntradaNova('ia/nova.md', ok), null);
  assert.match(validarEntradaNova('ia/outra.md', ok), /id/);
  assert.match(validarEntradaNova('ia/nova.md', ok.replace('**Resumo:**', 'x')), /Resumo/);
  assert.match(validarEntradaNova('../x.md', ok), /caminho/);
  const n = { item_url: 'https://platform.claude.com/docs/x', item_fonte_url: 'https://platform.claude.com/docs/x', item_redirecionado_para: 'https://docs.claude.com/y' };
  assert.ok(dominioConfirmado('https://platform.claude.com/outra', n) && dominioConfirmado('https://docs.claude.com/z', n));
  assert.ok(!dominioConfirmado('https://claude-gratis.com/', n));
});

test('primeiraFrase para o CHANGELOG', () => {
  assert.equal(primeiraFrase('A AWS WAF passa a cobrar por recurso a 2027-02-01. Há 2 500 WCU incluídas.'), 'A AWS WAF passa a cobrar por recurso a 2027-02-01');
  assert.equal(primeiraFrase('Frase única sem ponto final'), 'Frase única sem ponto final');
  assert.ok(primeiraFrase('palavra '.repeat(80)).length <= 221);
});

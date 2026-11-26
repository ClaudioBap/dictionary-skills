import test from 'node:test';
import assert from 'node:assert/strict';
import { lerFontes, urlDePedido, tipoDeFonte, blocosNovos } from './recolher.mjs';
import { htmlParaBlocos, textoPrincipal, itensDoFeed, pareceFeed, jsonParaBlocos, hashBloco, mesmoDominio } from './comum-recolha.mjs';

const MD = `# Fontes
## [Segurança](seguranca/README.md)

| Fonte | Para quê |
|---|---|
| [OWASP](https://owasp.org/) | receitas |
| [CNCS](https://www.cncs.gov.pt/) | referência (não lida: bloqueia acesso automático) |
| [OWASP repetido](https://owasp.org/) | outra vez |

## [Construir com IA](ia/README.md)

| Fonte | Para quê |
|---|---|
| [Releases](https://github.com/org/repo/releases) | versões |

## A vigiar

| Tema | O que vigiar | Onde |
|---|---|---|
| IA | preço do TTS | [https://cloud.google.com/tts](https://cloud.google.com/tts) |
| Segurança | outra vez o OWASP | [https://owasp.org/](https://owasp.org/) |
`;

test('lerFontes: secções, não lidas, repetidos e «A vigiar»', () => {
  const f = lerFontes(MD);
  assert.equal(f.length, 4);
  assert.deepEqual(f.map((x) => x.seccao), ['seguranca', 'seguranca', 'ia', 'IA']);
  assert.equal(f[1].por_ler, 'bloqueia acesso automático');
  assert.equal(f[0].vigiar, 'outra vez o OWASP'); // o repetido fica com a secção da 1.ª vez e ganha o ponto a vigiar
  assert.equal(f[3].vigiar, 'preço do TTS');
});

test('github /releases usa releases.atom', () => {
  assert.equal(urlDePedido('https://github.com/org/repo/releases'), 'https://github.com/org/repo/releases.atom');
  assert.equal(tipoDeFonte('https://github.com/org/repo/releases'), 'github');
  assert.equal(tipoDeFonte('https://x.org/a.json'), 'json');
  assert.equal(urlDePedido('https://x.org/a'), 'https://x.org/a');
});

const HTML = `<html><head><title>Notas &amp; novidades</title><script>var x="não sou texto"</script></head><body>
<nav><a>Menu</a><a>Outro</a></nav><header>Cabeçalho</header>
<main><h1>Versão 2</h1><p>Primeiro parágrafo com   espaços.</p><ul><li>Item um</li><li>Item dois</li></ul>
<h2>Preços</h2><table><tr><td>Plano</td><td>10 €</td></tr></table><p>Fim</p></main><footer>Rodapé</footer></body></html>`;

test('htmlParaBlocos: tira nav/script, divide em blocos e dá o último título', () => {
  const r = htmlParaBlocos(HTML);
  assert.equal(r.titulo_pagina, 'Notas & novidades');
  const textos = r.blocos.map((b) => b.texto);
  assert.deepEqual(textos, ['Primeiro parágrafo com espaços.', 'Item um', 'Item dois', 'Plano | 10 €', 'Fim']);
  assert.equal(r.blocos[0].cabecalho, 'Versão 2');
  assert.equal(r.blocos[3].cabecalho, 'Preços');
  assert.ok(!JSON.stringify(r).includes('Menu') && !JSON.stringify(r).includes('Rodapé'));
});

test('blocosNovos: só o que o hash ainda não viu; removidos não contam', () => {
  const antes = htmlParaBlocos(HTML).blocos;
  const vistos = new Set(antes.map((b) => hashBloco(b.texto)));
  const depois = htmlParaBlocos(HTML.replace('<p>Fim</p>', '<p>Fim</p><h2>Novo</h2><p>Bloco acrescentado</p>')).blocos;
  const { novos } = blocosNovos(depois, vistos);
  assert.deepEqual(novos, [{ cabecalho: 'Novo', texto: 'Bloco acrescentado' }]);
  assert.equal(blocosNovos(antes.slice(0, 2), vistos).novos.length, 0);
  assert.equal(hashBloco('  Olá   MUNDO '), hashBloco('olá mundo'));
});

test('textoPrincipal corta às palavras pedidas', () => {
  const t = textoPrincipal('<main>' + '<p>palavra </p>'.repeat(400) + '</main>', 50);
  assert.ok(t.endsWith('[…]'));
  assert.equal(t.split(/\s+/).filter((x) => x === 'palavra').length, 50);
});

test('feeds RSS e Atom', () => {
  const rss = `<?xml version="1.0"?><rss><channel><item><title><![CDATA[Olá]]></title><link>https://a.org/1</link><guid>g1</guid><pubDate>Mon, 24 Nov 2026 10:00:00 GMT</pubDate><description>Resumo &lt;b&gt;x&lt;/b&gt;</description></item></channel></rss>`;
  const atom = `<feed><entry><title>V1</title><link rel="alternate" href="https://g.com/r/1"/><id>tag:1</id><updated>2026-11-20T00:00:00Z</updated><content type="html">&lt;p&gt;Notas&lt;/p&gt;</content></entry></feed>`;
  assert.ok(pareceFeed(rss) && pareceFeed(atom) && !pareceFeed('<html></html>'));
  assert.deepEqual(itensDoFeed(rss)[0], { id: 'g1', titulo: 'Olá', url: 'https://a.org/1', data: '2026-11-24', resumo: 'Resumo x' });
  const a = itensDoFeed(atom)[0];
  assert.equal(a.url, 'https://g.com/r/1');
  assert.equal(a.id, 'tag:1');
  assert.equal(a.resumo, 'Notas');
});

test('JSON em linhas e domínios', () => {
  assert.deepEqual(jsonParaBlocos('{"a":{"b":1},"c":[2]}').map((b) => b.texto), ['a.b: 1', 'c[0]: 2']);
  assert.ok(mesmoDominio('https://www.openai.com/x', 'https://platform.openai.com/y'));
  assert.ok(!mesmoDominio('https://evil.com', 'https://openai.com'));
});

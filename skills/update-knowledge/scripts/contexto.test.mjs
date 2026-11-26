import test from 'node:test';
import assert from 'node:assert/strict';
import { normalizarTitulo, ligarPorTitulo, limparEntradas } from './contexto.mjs';

const aplicadas = [
  { texto: 'O Claude Opus 4.5 está descontinuado e é retirado a 2027-01-22; a migração é para o Opus 5.5.', fonte_url: 'https://p.com/n', data_lancamento: '2026-11-23' },
  { texto: 'Outra novidade completamente diferente.', fonte_url: 'https://p.com/n', data_lancamento: '2026-11-23' },
  { texto: 'Preço novo.', fonte_url: 'https://q.com/preco', data_lancamento: '2026-11-23' },
];
const noticias = [
  { id: 'n1', titulo: 'O Claude Opus 4.5 está descontinuado e é retirado a 2027-01-22; a migração é para o Opus 5.5…', fonte_url: 'https://p.com/n' },
  { id: 'n2', titulo: 'Texto sem relação nenhuma com isto', fonte_url: 'https://p.com/n' },
  { id: 'n3', titulo: 'Outra novidade completamente diferente.', fonte_url: 'https://outro.com/n' },
];

test('normalizarTitulo: Markdown, espaços e «…»', () => {
  assert.equal(normalizarTitulo('Um  [link](http://x) **forte**…'), 'um link forte');
});

test('ligação por título e fonte_url', () => {
  const { ligadas, restantes } = ligarPorTitulo(aplicadas, noticias);
  assert.deepEqual(ligadas.map((l) => [l.noticia.id, l.aplicada.texto.slice(0, 11)]), [['n1', 'O Claude Op']]);
  assert.equal(restantes.length, 2); // a 2.ª tem outro fonte_url na notícia; a 3.ª ainda não apareceu
});

test('limparEntradas: só as que existem', () => {
  const m = new Map([['ia/a', { titulo: 'A' }]]);
  assert.deepEqual(limparEntradas([{ id: 'ia/a.md', titulo: 'errado' }, { id: 'ia/b', titulo: 'B' }, { id: 'ia/a', titulo: 'A' }], m), [{ id: 'ia/a', titulo: 'A' }]);
});

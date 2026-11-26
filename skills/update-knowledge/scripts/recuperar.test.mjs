import test from 'node:test';
import assert from 'node:assert/strict';
import { tokenizar, construirIndice, candidatas, seccaoDeTema, criarRecuperador } from './recuperar.mjs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

test('tokenizar: sem acentos, sem palavras vazias, sem plural', () => {
  assert.deepEqual(tokenizar('A migração dos Modelos para o Claude'), ['migracao', 'modelo', 'claude']);
});

const E = [
  { id: 'ia/modelo', titulo: 'Escolher o modelo Claude', seccao: 'ia', descricao: 'preços e modelos Claude', cabecalhos: [] },
  { id: 'publicacao/waf', titulo: 'Regras WAF na Cloudflare', seccao: 'publicacao', descricao: 'proteção web com WAF', cabecalhos: ['Preços'] },
  { id: 'nuvem/waf-aws', titulo: 'AWS WAF', seccao: 'nuvem', descricao: 'firewall de aplicações web da AWS', cabecalhos: [] },
];
test('BM25: relevância e prioridade da secção', () => {
  const ix = construirIndice(E);
  assert.equal(candidatas(ix, 'o modelo Claude Opus foi descontinuado', 'ia', 3)[0].id, 'ia/modelo');
  assert.equal(candidatas(ix, 'WAF', 'nuvem', 3)[0].id, 'nuvem/waf-aws');
  assert.equal(candidatas(ix, 'WAF', 'publicacao', 3)[0].id, 'publicacao/waf');
  assert.equal(candidatas(ix, 'zzzz inexistente', 'ia').length, 0);
});

test('tema do «A vigiar» → secção', () => {
  assert.equal(seccaoDeTema('Acesso remoto'), 'acesso-remoto');
  assert.equal(seccaoDeTema('C#'), 'csharp');
  assert.equal(seccaoDeTema('ia'), 'ia');
});

test('índice real do repositório', () => {
  const raiz = join(fileURLToPath(import.meta.url), '..', '..', '..', '..');
  const r = criarRecuperador(raiz);
  assert.ok(r.entradas.length > 200);
  const c = r.candidatas('Claude Opus 4.5 descontinuado migração para Opus 5.5', 'ia', 5);
  assert.ok(c.some((x) => x.id === 'ia/escolher-o-modelo-claude'), JSON.stringify(c.map((x) => x.id)));
  assert.ok(r.compacto()[0].descricao.length <= 200);
});

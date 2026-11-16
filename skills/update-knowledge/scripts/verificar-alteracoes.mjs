#!/usr/bin/env node
// Verifica, antes do commit, que cada ficheiro alterado em knowledge/ tem a sua linha no CHANGELOG
// e que o índice está atualizado. Regra do PDF (pág. 42): «toda a alteração à referência leva uma linha neste registo».
// Uso: node verificar-alteracoes.mjs <raiz do repositório>

import { execFileSync } from 'node:child_process';
import { existsSync, readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const RAIZ = process.argv[2];
const KREL = 'knowledge';
if (!RAIZ || !existsSync(join(RAIZ, KREL))) { console.error('Uso: node verificar-alteracoes.mjs <raiz do repositório>'); process.exit(2); }
const git = (...a) => execFileSync('git', ['-C', RAIZ, ...a], { encoding: 'utf8' });

const IGNORAR = /(^|\/)(INDEX|README|CHANGELOG)\.md$/;
const mudados = new Set([
  ...git('diff', '--name-only', 'HEAD', '--', KREL).split('\n'),
  ...git('ls-files', '--others', '--exclude-standard', '--', KREL).split('\n'),
].filter(Boolean).map((p) => p.slice(KREL.length + 1)).filter((p) => !IGNORAR.test(p)));

const changelog = join(KREL, 'CHANGELOG.md');
const acrescentado = git('diff', 'HEAD', '--', changelog).split('\n')
  .filter((l) => l.startsWith('+') && !l.startsWith('+++')).join('\n')
  + (git('ls-files', '--others', '--exclude-standard', '--', changelog).trim() ? readFileSync(join(RAIZ, changelog), 'utf8') : '');

const falhas = [];
for (const p of mudados) if (!acrescentado.includes(p)) falhas.push(`${p}: alterado sem linha nova no CHANGELOG.md`);
if (/^-\|/m.test(git('diff', 'HEAD', '--', changelog).replace(/^--- .*$/m, ''))) falhas.push('CHANGELOG.md: há linhas apagadas; o registo é só de acrescentar');

const indice = join(dirname(fileURLToPath(import.meta.url)), 'indice.mjs');
try { execFileSync(process.execPath, [indice, join(RAIZ, KREL), '--verificar'], { encoding: 'utf8' }); }
catch { falhas.push('INDEX.md/README.md desatualizados: corre «node indice.mjs <knowledge>»'); }

if (falhas.length) {
  console.log(`✗ Alterações por registar (${falhas.length}):`);
  for (const f of falhas) console.log(`  - ${f}`);
  process.exit(1);
}
console.log(`✓ ${mudados.size} ficheiro(s) alterado(s), todos com linha no CHANGELOG; índice atualizado.`);

#!/usr/bin/env node
// Publica o fim de uma corrida: índice, verificador, commit no main, pull --rebase e push.
// Corre sem perguntar no fim de cada corrida (decisão do utilizador a 2026-11-16), para o conhecimento não se acumular
// por gravar. Só junta ao commit knowledge/, fontes-verificadas.json, o README.md e o README.en.md (as contagens que o
// indice.mjs escreve) e os caminhos dados com --incluir.
// Uso: node publicar.mjs <raiz do repositório> [--incluir <caminho>]... [--mensagem "<primeira linha>"] [--coautor "<Nome <email>>"]
import { execFileSync, spawnSync } from 'node:child_process';
import { existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const args = process.argv.slice(2);
const RAIZ = args[0];
const KREL = 'knowledge';
if (!RAIZ || !existsSync(join(RAIZ, KREL))) { console.error('Uso: node publicar.mjs <raiz do repositório> [--incluir <caminho>]... [--mensagem "<texto>"]'); process.exit(2); }
const valores = (opcao) => args.flatMap((a, i) => (a === opcao && args[i + 1] ? [args[i + 1]] : []));
const incluir = valores('--incluir');
const mensagem = valores('--mensagem')[0];
const coautor = valores('--coautor')[0];
const aqui = dirname(fileURLToPath(import.meta.url));

const git = (...a) => execFileSync('git', ['-C', RAIZ, ...a], { encoding: 'utf8' }).trim();
const parar = (texto, codigo = 1) => { console.log(`✗ ${texto}`); process.exit(codigo); };
const correr = (script, ...a) => spawnSync(process.execPath, [join(aqui, script), ...a], { encoding: 'utf8' });

// 1. No main. Um ramo sem commits próprios (como o que uma corrida antiga deixou) passa para o main com as alterações.
const ramo = git('rev-parse', '--abbrev-ref', 'HEAD');
if (ramo !== 'main') {
  if (git('rev-list', '--count', `main..${ramo}`) !== '0') parar(`o ramo ${ramo} tem commits que o main não tem: junta-os à mão antes de publicar.`);
  git('checkout', 'main');
  console.log(`Passei do ramo ${ramo} para o main (sem commits próprios).`);
}

// 2. Índice (duas passagens: entradas novas numa subpasta só ficam no sítio à segunda) e verificador.
for (let i = 0; i < 3 && !/Nada a atualizar/.test(correr('indice.mjs', join(RAIZ, KREL)).stdout); i++);
const verificacao = correr('verificar-alteracoes.mjs', RAIZ);
process.stdout.write(verificacao.stdout);
if (verificacao.status !== 0) parar('o verificador falhou: corrige e volta a correr.');

// 3. O que entra no commit.
const caminhos = [KREL, 'skills/update-knowledge/fontes-verificadas.json', ...['README.md', 'README.en.md'].filter((f) => existsSync(join(RAIZ, f))), ...incluir];
git('add', '-A', '--', ...caminhos);
const fora = git('status', '--porcelain', '--', 'skills').split('\n').filter((l) => l && !/^[MADR] /.test(l));
if (fora.length) console.log(`Ficam fora do commit (não são da corrida; usa --incluir se forem):\n${fora.map((l) => `  ${l}`).join('\n')}`);
if (!git('diff', '--cached', '--name-only')) { console.log('✓ Nada a publicar.'); process.exit(0); }

// 4. Mensagem: a primeira linha resume, o corpo junta a coluna «Alteração» das linhas novas do CHANGELOG.
const novas = git('diff', '--cached', '--', `${KREL}/CHANGELOG.md`).split('\n')
  .filter((l) => /^\+\| \d{4}-/.test(l))
  .map((l) => l.split('|')[2].trim());
const hoje = new Date().toISOString().slice(0, 10);
const titulo = mensagem ?? `Conhecimento: ${novas.length} ${novas.length === 1 ? 'alteração' : 'alterações'} (${hoje})`;
const corpo = novas.map((n) => `- ${n}`).join('\n');
git('commit', '-m', titulo, ...(corpo ? ['-m', corpo] : []), ...(coautor ? ['-m', `Co-Authored-By: ${coautor}`] : []));
const commit = git('rev-parse', '--short', 'HEAD');
console.log(`Commit ${commit}: ${titulo}`);

// 5. Pull e push, sem forçar. Se algo falhar, o commit fica local e diz-se porquê.
const pull = spawnSync('git', ['-C', RAIZ, 'pull', '--rebase', 'origin', 'main'], { encoding: 'utf8' });
if (pull.status !== 0) {
  spawnSync('git', ['-C', RAIZ, 'rebase', '--abort'], { encoding: 'utf8' });
  parar(`o git pull --rebase falhou; o commit ${commit} ficou local.\n${pull.stderr.trim()}`);
}
const push = spawnSync('git', ['-C', RAIZ, 'push', 'origin', 'main'], { encoding: 'utf8' });
if (push.status !== 0) parar(`o git push falhou; o commit ficou local.\n${push.stderr.trim()}`);
console.log(`✓ Publicado no main: ${git('rev-parse', '--short', 'HEAD')}.`);

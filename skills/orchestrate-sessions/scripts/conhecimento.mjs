#!/usr/bin/env node
// Imprime o caminho absoluto da pasta knowledge/ do Dictionary-Skills. Sem dependências.
// Ordem: 1. DICTIONARY_SKILLS_KNOWLEDGE; 2. campo «repositorio» de ~/.start-project-with-trust/config.json;
//        3. o clone a que este script pertence (../../../knowledge); 4. ~/.dictionary-skills (clona se faltar).
// Uso: node conhecimento.mjs [--atualizar]   (--atualizar: git pull --ff-only no clone de ~/.dictionary-skills)
// Noutros scripts: import { caminhoConhecimento } from './conhecimento.mjs'

import { execFileSync } from 'node:child_process';
import { existsSync, readFileSync } from 'node:fs';
import { homedir } from 'node:os';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const REPOSITORIO = 'https://github.com/ClaudioBap/dictionary-skills';

export function caminhoConhecimento({ atualizar = false } = {}) {
  const tem = (p) => p && existsSync(join(p, 'INDEX.md'));

  const env = process.env.DICTIONARY_SKILLS_KNOWLEDGE;
  if (env) {
    if (tem(resolve(env))) return resolve(env);
    throw new Error(`DICTIONARY_SKILLS_KNOWLEDGE aponta para ${env}, que não tem um INDEX.md.`);
  }

  const config = join(homedir(), '.start-project-with-trust', 'config.json');
  if (existsSync(config)) {
    let repositorio;
    try { repositorio = JSON.parse(readFileSync(config, 'utf8').replace(/^﻿/, '')).repositorio; }
    catch (e) { throw new Error(`Não consegui ler ${config}: ${e.message}`); }
    if (repositorio) {
      const k = join(resolve(repositorio), 'knowledge');
      if (tem(k)) return k;
      throw new Error(`${config} indica o repositório ${repositorio}, mas ${k} não existe.`);
    }
  }

  const clone = resolve(dirname(fileURLToPath(import.meta.url)), '..', '..', '..', 'knowledge');
  if (tem(clone)) return clone;

  const casa = join(homedir(), '.dictionary-skills');
  const k = join(casa, 'knowledge');
  try {
    if (!existsSync(k)) execFileSync('git', ['clone', '--depth', '1', REPOSITORIO, casa], { stdio: ['ignore', 'ignore', 'pipe'] });
    else if (atualizar) execFileSync('git', ['-C', casa, 'pull', '--ff-only'], { stdio: ['ignore', 'ignore', 'pipe'] });
  } catch (e) {
    throw new Error(`Não consegui clonar ou atualizar ${REPOSITORIO} em ${casa}: ${e.stderr || e.message}`.trim());
  }
  if (tem(k)) return k;
  throw new Error(`Não encontrei a base de conhecimento. Define DICTIONARY_SKILLS_KNOWLEDGE, ou o campo «repositorio» em ${config}, ou clona ${REPOSITORIO} para ${casa}.`);
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  try { console.log(caminhoConhecimento({ atualizar: process.argv.includes('--atualizar') })); }
  catch (e) { console.error(e.message); process.exit(1); }
}

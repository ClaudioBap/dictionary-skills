#!/usr/bin/env node
// Hook PreToolUse do Claude Code (matcher: Write|Edit|MultiEdit|Bash).
// Bloqueia marcar um arranque como «Plano aprovado», «Fase 4» ou «Fase 5» enquanto o verificador
// do plano encontrar falhas, e como «Concluído» enquanto o plano ou a entrega tiverem falhas. Tudo o resto passa.
// Protocolo: lê o evento em JSON do stdin; sai com 2 para bloquear (a razão vai no stderr).

import { readFileSync, existsSync } from 'node:fs';
import { dirname } from 'node:path';
import { verificar, verificarEntrega } from './verificar.mjs';

const OBJETIVO = /(^|[\\/])arranque[\\/][^\\/]+[\\/]objetivo\.md$/;
const CONCLUIDO = /\*\*Estado:\*\*\s*Conclu[ií]do/i;
const PLANO_APROVADO = /\*\*Estado:\*\*\s*(Plano aprovado|Fase 4|Fase 5)/i;
const semComentarios = (t) => t.replace(/<!--[\s\S]*?-->/g, '');

function bloquear(razao) {
  process.stderr.write(`[start-project-with-trust] Bloqueado: ${razao}\n`);
  process.exit(2);
}

let evento;
try { evento = JSON.parse(readFileSync(0, 'utf8')); } catch { process.exit(0); }
const { tool_name: ferramenta, tool_input: entrada = {} } = evento;

// Bash: não se escreve o objetivo.md pela shell a marcar conclusão.
if (ferramenta === 'Bash') {
  const cmd = String(entrada.command || '');
  if (/objetivo\.md/.test(cmd) && /Conclu[ií]do|Plano aprovado|Fase [45]/i.test(cmd)) {
    bloquear('o estado do arranque só pode ser alterado com Write/Edit em objetivo.md, para passar pelo verificador.');
  }
  process.exit(0);
}

const ficheiro = String(entrada.file_path || '');
if (!OBJETIVO.test(ficheiro)) process.exit(0);

// Conteúdo que o objetivo.md teria depois desta escrita.
const atual = existsSync(ficheiro) ? readFileSync(ficheiro, 'utf8') : '';
let novo = atual;
if (ferramenta === 'Write') novo = String(entrada.content ?? '');
else {
  const edicoes = Array.isArray(entrada.edits) ? entrada.edits : [entrada];
  for (const e of edicoes) {
    if (typeof e.old_string !== 'string') continue;
    novo = e.replace_all ? novo.split(e.old_string).join(e.new_string ?? '') : novo.replace(e.old_string, e.new_string ?? '');
  }
}

const estado = semComentarios(novo);
const concluido = CONCLUIDO.test(estado);
if (!concluido && !PLANO_APROVADO.test(estado)) process.exit(0);

const pasta = dirname(ficheiro);
const falhas = verificar(pasta, { 'objetivo.md': novo });
if (concluido) falhas.push(...verificarEntrega(pasta, { 'objetivo.md': novo }));
if (falhas.length) {
  const etapa = concluido ? 'a entrega ainda não está verificada' : 'o plano ainda não pode ser aprovado';
  bloquear(`${etapa}. Falta:\n${falhas.map((f) => `  - ${f}`).join('\n')}\nVolta ao goal-loop e resolve estes pontos com o utilizador.`);
}
process.exit(0);

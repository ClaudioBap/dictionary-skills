#!/usr/bin/env node
// Hook PostToolUse do Claude Code (matcher: Write|Edit|MultiEdit), camada 1 (determinística).
// Depois de cada escrita em arranque/<projeto>/{plano,custo-beneficio,objetivo}.md, confirma que
// cada ação, decisão e o orquestrador respondem a perguntas do utilizador (P/S) que existem e estão fechadas.
// No goal-loop confirma também que todas as perguntas obrigatórias têm resposta no plano.
// Protocolo: lê o evento em JSON do stdin; sai com 2 para devolver o feedback ao Claude (stderr).

import { readFileSync, existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { verificarRastreabilidade } from './verificar.mjs';

const ALVO = /(^|[\\/])arranque[\\/][^\\/]+[\\/](plano|custo-beneficio|objetivo)\.md$/;

let evento;
try { evento = JSON.parse(readFileSync(0, 'utf8')); } catch { process.exit(0); }
const ficheiro = String(evento?.tool_input?.file_path || '');
if (!['Write', 'Edit', 'MultiEdit'].includes(evento?.tool_name) || !ALVO.test(ficheiro)) process.exit(0);

const pasta = dirname(ficheiro);
const objetivo = join(pasta, 'objetivo.md');
if (!existsSync(objetivo)) process.exit(0);

// A cobertura total só se exige a partir do goal-loop (depois da Fase 3).
const estado = (readFileSync(objetivo, 'utf8').replace(/<!--[\s\S]*?-->/g, '').match(/\*\*Estado:\*\*\s*([^\r\n]*)/) || [])[1] || '';
const cobertura = /goal-loop|conclu/i.test(estado);

const falhas = verificarRastreabilidade(pasta, {}, { cobertura });
if (falhas.length) {
  process.stderr.write(
    `[start-project-with-trust] Rastreabilidade: há decisões que não respondem a um pedido do utilizador.\n` +
    falhas.map((f) => `  - ${f}`).join('\n') +
    `\nCorrige a ligação «Responde a» se for um erro de registo. Se a decisão não responde a nenhum pedido, ou se um pedido ficou sem resposta,` +
    ` regista-o em objetivo.md como pergunta de seguimento «aberta» (S<n>) e resolve-a com o utilizador no goal-loop.\n`
  );
  process.exit(2);
}
process.exit(0);

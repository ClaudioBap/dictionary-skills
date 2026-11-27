#!/usr/bin/env node
// Linha de estado do Claude Code que guarda o uso do plano para o modo contínuo.
// Recebe no stdin o JSON que o Claude Code dá à linha de estado, grava os limites de uso e o custo
// em ~/.start-project-with-trust/estado-uso.json e imprime uma linha curta.
// Instalar em settings.json: "statusLine": { "type": "command", "command": "node <pasta desta skill>/scripts/estado-uso.mjs" }
// Os campos rate_limits só existem em planos claude.ai (Pro, Max) e depois da primeira resposta da API.
// Com várias subscrições (uma pasta CLAUDE_CONFIG_DIR cada), instala-se no settings.json de cada uma, e o uso de cada
// subscrição fica também em estado-uso-contas.json, de onde a retoma escolhe uma com quota.

import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { homedir } from 'node:os';
import { join } from 'node:path';
import { ficheiroUsoPorConta, lerContasClaude, lerUsoPorConta, subscricaoDaPasta } from './fornecedores.mjs';

let dados = {};
try { dados = JSON.parse(readFileSync(0, 'utf8')); } catch { /* sem stdin válido: imprime só a linha */ }

const limites = dados.rate_limits || {};
const estado = {
  atualizado_em: new Date().toISOString(),
  subscricao: subscricaoDaPasta(process.env.CLAUDE_CONFIG_DIR, lerContasClaude()),
  modelo: dados.model?.display_name || dados.model?.id || null,
  cinco_horas: limites.five_hour || null,
  sete_dias: limites.seven_day || null,
  custo_usd: dados.cost?.total_cost_usd ?? null,
};

const pasta = join(homedir(), '.start-project-with-trust');
try {
  mkdirSync(pasta, { recursive: true });
  writeFileSync(join(pasta, 'estado-uso.json'), JSON.stringify(estado, null, 2) + '\n');
  const porConta = lerUsoPorConta();
  porConta[estado.subscricao] = { atualizado_em: estado.atualizado_em, cinco_horas: estado.cinco_horas, sete_dias: estado.sete_dias };
  writeFileSync(ficheiroUsoPorConta(), JSON.stringify(porConta, null, 2) + '\n');
} catch { /* sem permissão para escrever: a linha de estado continua a funcionar */ }

const pct = (j) => (j && typeof j.used_percentage === 'number') ? `${Math.round(j.used_percentage)}%` : '—';
const hora = (j) => (j && j.resets_at) ? new Date(j.resets_at * 1000).toLocaleTimeString('pt-PT', { hour: '2-digit', minute: '2-digit' }) : '—';
process.stdout.write(`${estado.modelo || ''} | 5h ${pct(estado.cinco_horas)} (repõe ${hora(estado.cinco_horas)}) | 7d ${pct(estado.sete_dias)}`);

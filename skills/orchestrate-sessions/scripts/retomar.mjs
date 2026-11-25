#!/usr/bin/env node
// Retoma uma orquestração parada. Corre pelo Agendador de Tarefas (ver agendar-retoma.mjs), de 15 em 15
// minutos e ao iniciar sessão no Windows.
// Uso: node retomar.mjs <pasta da orquestração> <pasta onde as sessões abrem> [--modelo opus] [--simular]
//
// Só relança quando há trabalho por fazer em <pasta>/estado.json, ninguém escreve nas conversas da pasta
// das sessões há 20 minutos, não há pausa em curso e não há outra retoma viva. Lança `claude -p` sem
// interface, com as permissões de <pasta>/retoma-permissoes.json. O que faz fica em <pasta>/retoma.log.

import { spawn } from "node:child_process";
import {
  existsSync,
  readFileSync,
  readdirSync,
  statSync,
  writeFileSync,
  appendFileSync,
  rmSync,
} from "node:fs";
import { homedir } from "node:os";
import { join, resolve } from "node:path";

const args = process.argv.slice(2);
const opcao = (nome, omissao) => {
  const i = args.indexOf(nome);
  return i >= 0 && args[i + 1] ? args[i + 1] : omissao;
};
const posicionais = args.filter((a, i) => !a.startsWith("--") && !args[i - 1]?.startsWith("--modelo"));
if (posicionais.length < 2) {
  console.error("Uso: node retomar.mjs <pasta da orquestração> <pasta onde as sessões abrem> [--modelo opus] [--simular]");
  process.exit(2);
}
const pasta = resolve(posicionais[0]);
const raiz = resolve(posicionais[1]);
const modelo = opcao("--modelo", "opus");
const simular = args.includes("--simular");
const ficheiroEstado = join(pasta, "estado.json");
const ficheiroTrinco = join(pasta, "retoma.lock");
const SILENCIO_MIN = Number(process.env.RETOMAR_SILENCIO_MIN ?? 20);
const PAUSAS_MIN = [30, 60, 120, 300]; // recuo depois de corridas seguidas que falham ou não avançam

function registar(texto) {
  appendFileSync(join(pasta, "retoma.log"), `${new Date().toISOString()} ${simular ? "(simulação) " : ""}${texto}\n`);
}

function decidir(motivo) {
  // Sem trabalho para fazer: só se diz porquê quando se está a simular, para o registo não crescer a cada 15 minutos.
  if (simular) console.log(`não relança: ${motivo}`);
}

function lerEstado() {
  // O PowerShell grava UTF-8 com BOM, que o JSON.parse recusa.
  return JSON.parse(readFileSync(ficheiroEstado, "utf8").replace(/^﻿/, ""));
}

function gravarEstado(mudancas) {
  // Relê antes de gravar: a sessão que orquestra também escreve neste ficheiro.
  const estado = { ...lerEstado(), ...mudancas, atualizado_em: new Date().toISOString() };
  writeFileSync(ficheiroEstado, JSON.stringify(estado, null, 2) + "\n");
}

const retrato = (estado) => JSON.stringify([estado.terminado, (estado.tarefas ?? []).map((t) => [t.id, t.estado])]);

function processoVivo(pid) {
  try {
    process.kill(pid, 0);
    return true;
  } catch {
    return false;
  }
}

// Trinco com o PID deste processo, que fica vivo até a corrida acabar. Criado com «wx» para que duas
// retomas lançadas ao mesmo tempo não passem as duas.
function ficarComOTrinco() {
  for (let tentativa = 0; tentativa < 2; tentativa++) {
    try {
      writeFileSync(ficheiroTrinco, String(process.pid), { flag: "wx" });
      return true;
    } catch (erro) {
      if (erro.code !== "EEXIST") throw erro;
      const pid = Number(readFileSync(ficheiroTrinco, "utf8"));
      if (pid && processoVivo(pid)) return false;
      rmSync(ficheiroTrinco, { force: true });
    }
  }
  return false;
}

function maisRecente(dir, limite = 4) {
  let ultimo = 0;
  if (limite < 0 || !existsSync(dir)) return ultimo;
  for (const nome of readdirSync(dir, { withFileTypes: true })) {
    const caminho = join(dir, nome.name);
    if (nome.isDirectory()) ultimo = Math.max(ultimo, maisRecente(caminho, limite - 1));
    else if (nome.name.endsWith(".jsonl")) ultimo = Math.max(ultimo, statSync(caminho).mtimeMs);
  }
  return ultimo;
}

// O Claude Code guarda as conversas de cada pasta em ~/.claude/projects/<caminho com hífenes>,
// incluindo as dos subagentes.
function minutosDesdeAUltimaAtividade() {
  const projetos = join(homedir(), ".claude", "projects");
  const alvo = raiz.replace(/[^A-Za-z0-9]/g, "-").toLowerCase();
  if (!existsSync(projetos)) return Infinity;
  const pastaDoProjeto = readdirSync(projetos).find((n) => n.toLowerCase() === alvo);
  if (!pastaDoProjeto) return Infinity;
  const ultimo = maisRecente(join(projetos, pastaDoProjeto));
  return ultimo ? (Date.now() - ultimo) / 60000 : Infinity;
}

// A CLI autónoma; a extensão do VS Code traz uma cópia própria que não está no PATH.
function executavel() {
  const candidatos = [
    join(process.env.APPDATA ?? "", "npm", "node_modules", "@anthropic-ai", "claude-code", "bin", "claude.exe"),
    join(homedir(), ".local", "bin", process.platform === "win32" ? "claude.exe" : "claude"),
  ];
  return candidatos.find((c) => existsSync(c)) ?? "claude";
}

const PEDIDO = `És a sessão 0 (orquestradora) de um trabalho que parou a meio e que retomas agora, sem ninguém a ver.

Pasta do trabalho: ${pasta}
Lê, por esta ordem: plano.md (se existir), sessoes.md ou custo-beneficio.md, estado.json, os briefings e o que houver em saidas/.

Depois continua:
1. Para cada tarefa «em curso» em estado.json: se a saída existe e tem as provas pedidas no briefing, confirma as que puderes reproduzir e marca «feito»; se não existe, relança-a com a ferramenta Agent, com o modelo indicado em estado.json e o pedido «lê o briefing <caminho> e executa-o até ao fim», dizendo-lhe para começar por ver o que já está feito no disco.
2. Lança as tarefas «por fazer» cujas dependências estão feitas. Se o briefing ainda não existe, escreve-o a partir do plano e das saídas anteriores, no estilo dos briefings que já lá estão. Em paralelo, só tarefas de sessões diferentes, e em lotes de 3 a 4, para um limite de uso levar só o que está a meio. Cada subagente grava a saída que o briefing indica antes de devolver. As tarefas da sessão 0 fazes tu.
3. No fim de cada onda, corre os verificadores que o plano ou os briefings indicam e faz um commit local por repositório com o que essa onda mudou, se o nível de autonomia em «Decisões» o permitir.
4. Atualiza estado.json e sessoes.md a cada tarefa. Acrescenta uma linha a «Pausas e retomas».
5. Quando todas as tarefas estiverem feitas, põe "terminado": true em estado.json.

Regras: segue o nível de autonomia registado em «Decisões». Nunca git push, nunca publicar, nunca ler .env. O que precisar de um segredo, de uma conta ou de uma decisão do dono fica em «Por preencher» e segues para a tarefa seguinte. Não repitas trabalho que já tem saída com prova. Os campos pausado_ate e falhas_seguidas de estado.json são do script de retoma: não lhes mexas.
Ninguém pode aprovar permissões nesta corrida: o que pedisse aprovação é negado. Na linha de comandos, um comando de cada vez, sem «cd ... &&» nem redirecionamentos (no git, usa «git -C <pasta>»), e diz o mesmo a cada subagente que lançares.`;

async function principal() {
  if (!existsSync(ficheiroEstado)) return decidir(`não há ${ficheiroEstado}`);
  const estado = lerEstado();
  if (estado.terminado) return decidir("o trabalho está terminado");
  if (!(estado.tarefas ?? []).some((t) => t.estado !== "feito")) return decidir("todas as tarefas estão feitas");
  if (estado.pausado_ate && Date.parse(estado.pausado_ate) > Date.now()) {
    return decidir(`em pausa até ${estado.pausado_ate}`);
  }

  const parado = minutosDesdeAUltimaAtividade();
  if (parado < SILENCIO_MIN) return decidir(`há atividade nas conversas de ${raiz} há ${Math.round(parado)} min`);

  if (!ficarComOTrinco()) return decidir("outra retoma está a correr");
  try {
    const silencio = Number.isFinite(parado)
      ? `sem atividade há ${Math.round(parado)} min`
      : "sem conversas registadas na pasta das sessões";
    if (simular) {
      registar(`${silencio}; relançaria com o modelo ${modelo}`);
      console.log("relançaria agora");
      return;
    }
    registar(`${silencio}; a relançar com o modelo ${modelo}`);
    await correr(retrato(estado));
  } finally {
    rmSync(ficheiroTrinco, { force: true });
  }
}

async function correr(antes) {
  const inicio = Date.now();
  const filho = spawn(
    executavel(),
    [
      "-p",
      "--model",
      modelo,
      "--permission-mode",
      "acceptEdits",
      "--permission-prompts",
      "none",
      "--settings",
      join(pasta, "retoma-permissoes.json"),
      "--add-dir",
      pasta,
      "--output-format",
      "json",
      "--max-turns",
      "400",
    ],
    {
      cwd: raiz,
      // Sem este valor, uma corrida -p pára os subagentes em segundo plano ao fim de 10 minutos de espera.
      env: { ...process.env, RETOMA_SEM_INTERFACE: "1", CLAUDE_CODE_PRINT_BG_WAIT_CEILING_MS: "0" },
      stdio: ["pipe", "pipe", "pipe"],
      windowsHide: true,
    },
  );
  filho.stdin.end(PEDIDO);

  let saida = "";
  filho.stdout.on("data", (d) => (saida += d));
  filho.stderr.on("data", (d) => (saida += d));
  const codigo = await new Promise((fim) => {
    filho.on("error", (erro) => {
      saida += String(erro);
      fim(-1);
    });
    filho.on("close", fim);
  });

  let resultado = {};
  try {
    resultado = JSON.parse(saida.slice(saida.indexOf("{")));
  } catch {
    // saída que não é JSON: fica o texto no registo
  }
  const minutos = Math.round((Date.now() - inicio) / 60000);
  const falhou = codigo !== 0 || resultado.is_error === true;
  const depois = lerEstado();
  const semProgresso = !falhou && !depois.terminado && retrato(depois) === antes;

  if (falhou || semProgresso) {
    // Limite de uso, outro erro, ou uma corrida que não mudou o estado de nenhuma tarefa (por exemplo, parada
    // numa permissão): espera cada vez mais antes de voltar a tentar, para não gastar a quota em vão.
    const falhas = (depois.falhas_seguidas ?? 0) + 1;
    const espera = PAUSAS_MIN[Math.min(falhas, PAUSAS_MIN.length) - 1];
    gravarEstado({ falhas_seguidas: falhas, pausado_ate: new Date(Date.now() + espera * 60000).toISOString() });
    const porque = falhou
      ? `falhou ao fim de ${minutos} min (código ${codigo}, estado ${resultado.api_error_status ?? "?"})`
      : `terminou ao fim de ${minutos} min sem mudar o estado de nenhuma tarefa`;
    const resumo = String(resultado.result ?? saida).replace(/\s+/g, " ").slice(0, 300);
    registar(`${porque}; nova tentativa daqui a ${espera} min. ${resumo}`);
  } else {
    gravarEstado({ falhas_seguidas: 0, pausado_ate: null });
    const custo = typeof resultado.total_cost_usd === "number" ? `, ${resultado.total_cost_usd.toFixed(2)} USD estimados` : "";
    registar(
      `corrida de ${minutos} min terminou (${resultado.num_turns ?? "?"} turnos${custo})${depois.terminado ? "; trabalho terminado" : ""}`,
    );
  }
}

principal().catch((erro) => {
  try {
    registar(`erro do script: ${erro.stack ?? erro}`);
  } catch {
    // sem pasta para registar
  }
  process.exitCode = 1;
});

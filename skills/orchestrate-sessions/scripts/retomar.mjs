#!/usr/bin/env node
// Retoma uma orquestração parada. Corre pelo Agendador de Tarefas (ver agendar-retoma.mjs), de 15 em 15
// minutos e ao iniciar sessão no Windows.
// Uso: node retomar.mjs <pasta da orquestração> <pasta onde as sessões abrem> [--modelo opus] [--simular]
//
// Só relança quando há trabalho por fazer em <pasta>/estado.json, ninguém escreve nas conversas da pasta
// das sessões há 20 minutos, não há pausa em curso e não há outra retoma viva. Lança `claude -p` sem
// interface, com as permissões de <pasta>/retoma-permissoes.json. O que faz fica em <pasta>/retoma.log.
// Corre na subscrição de `subscricao` em estado.json (a principal, se não houver). Quando ela fica sem quota, só
// passa para outra de `subscricoes` com a autonomia «Máxima»; nos outros níveis, a troca fica para o utilizador.

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
import {
  FORNECEDORES,
  PRINCIPAL,
  ambienteDaConta,
  escolherSubscricao,
  lerContasClaude,
  lerUsoPorConta,
} from "./fornecedores.mjs";

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
const contas = lerContasClaude();
// null na principal, undefined numa subscrição que não está em contas-ia.json.
const pastaDaConta = (id) => (id === PRINCIPAL ? null : contas.find((c) => c.id === id)?.pasta);
// Para trocar, só contam as subscrições que se conseguem lançar.
const comContasConhecidas = (estado) =>
  estado.subscricoes ? { ...estado, subscricoes: estado.subscricoes.filter((id) => pastaDaConta(id) !== undefined) } : estado;

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
// incluindo as dos subagentes. Cada subscrição tem a sua pasta, por isso contam também as do trabalho.
function minutosDesdeAUltimaAtividade(pastasDasContas) {
  const alvo = raiz.replace(/[^A-Za-z0-9]/g, "-").toLowerCase();
  let ultimo = 0;
  for (const conta of [join(homedir(), ".claude"), ...pastasDasContas]) {
    const projetos = join(conta, "projects");
    if (!existsSync(projetos)) continue;
    const pastaDoProjeto = readdirSync(projetos).find((n) => n.toLowerCase() === alvo);
    if (pastaDoProjeto) ultimo = Math.max(ultimo, maisRecente(join(projetos, pastaDoProjeto)));
  }
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

const pedido = (subscricao) => `És a sessão 0 (orquestradora) de um trabalho que parou a meio e que retomas agora, sem ninguém a ver.

Pasta do trabalho: ${pasta}
Esta corrida usa a subscrição «${subscricao}»: escreve-a no campo subscricao de cada tarefa que lançares ou relançares em estado.json.
Lê, por esta ordem: plano.md (se existir), sessoes.md ou custo-beneficio.md, estado.json, os briefings e o que houver em saidas/.
Se estado.json tiver orquestracao com agente e manifesto, consulta o manifesto pelo comando orquestracao estado e continua a revisão aprovada pelo comando orquestracao executar quando aplicável. As sessões desse manifesto continuam pelo agente ou são abertas manualmente pela pessoa. A ferramenta Agent só pode retomar as tarefas dos pontos seguintes que estejam fora desse manifesto.

Depois continua:
1. Para cada tarefa «em curso» em estado.json: se a saída existe e tem as provas pedidas no briefing, confirma as que puderes reproduzir e marca «feito»; se não existe, relança-a com a ferramenta Agent, com o modelo indicado em estado.json e o pedido «lê o briefing <caminho> e executa-o até ao fim», dizendo-lhe para começar por ver o que já está feito no disco.
2. Lança as tarefas «por fazer» cujas dependências estão feitas. Se o briefing ainda não existe, escreve-o a partir do plano e das saídas anteriores, no estilo dos briefings que já lá estão. Em paralelo, só tarefas de sessões diferentes, e em lotes de 3 a 4, para um limite de uso levar só o que está a meio. Cada subagente grava a saída que o briefing indica antes de devolver. As tarefas da sessão 0 fazes tu.
3. No fim de cada onda, corre os verificadores que o plano ou os briefings indicam e faz um commit local por repositório com o que essa onda mudou, se o nível de autonomia em «Decisões» o permitir.
4. Atualiza estado.json e sessoes.md a cada tarefa. Acrescenta uma linha a «Pausas e retomas».
5. Quando todas as tarefas estiverem feitas, põe "terminado": true em estado.json.

Regras: segue o nível de autonomia registado em «Decisões». Nunca git push, nunca publicar, nunca ler .env. O que precisar de um segredo, de uma conta ou de uma decisão do dono fica em «Por preencher» e segues para a tarefa seguinte. Não repitas trabalho que já tem saída com prova. Os campos pausado_ate, falhas_seguidas, sem_quota e subscricao (o do topo) de estado.json são do script de retoma: não lhes mexas.
Ninguém pode aprovar permissões nesta corrida: o que pedisse aprovação é negado. Na linha de comandos, um comando de cada vez, sem «cd ... &&» nem redirecionamentos (no git, usa «git -C <pasta>»), e diz o mesmo a cada subagente que lançares.`;

async function principal() {
  if (!existsSync(ficheiroEstado)) return decidir(`não há ${ficheiroEstado}`);
  const estado = lerEstado();
  if (estado.terminado) return decidir("o trabalho está terminado");
  if (!(estado.tarefas ?? []).some((t) => t.estado !== "feito")) return decidir("todas as tarefas estão feitas");
  if (estado.pausado_ate && Date.parse(estado.pausado_ate) > Date.now()) {
    return decidir(`em pausa até ${estado.pausado_ate}`);
  }

  const atual = estado.subscricao || PRINCIPAL;
  const escolha = escolherSubscricao(comContasConhecidas(estado), { uso: lerUsoPorConta() });
  if (escolha.sem_quota_ate && !escolha.trocar) {
    const outra = escolha.alternativa
      ? `; a ${escolha.alternativa} tem quota, mas trocar pede a decisão do utilizador (autonomia «${estado.autonomia ?? "não registada"}»)`
      : "";
    return decidir(`a subscrição ${atual} está sem quota até ${escolha.sem_quota_ate}${outra}`);
  }
  if (pastaDaConta(escolha.id) === undefined) return decidir(`a subscrição ${escolha.id} não está em contas-ia.json`);

  const parado = minutosDesdeAUltimaAtividade((estado.subscricoes ?? [atual]).map(pastaDaConta).filter(Boolean));
  if (parado < SILENCIO_MIN) return decidir(`há atividade nas conversas de ${raiz} há ${Math.round(parado)} min`);

  if (!ficarComOTrinco()) return decidir("outra retoma está a correr");
  try {
    const silencio = Number.isFinite(parado)
      ? `sem atividade há ${Math.round(parado)} min`
      : "sem conversas registadas na pasta das sessões";
    if (simular) {
      registar(`${silencio}; relançaria com o modelo ${modelo} na subscrição ${escolha.id}`);
      console.log("relançaria agora");
      return;
    }
    if (escolha.trocar) {
      gravarEstado({ subscricao: escolha.id });
      registar(`a subscrição ${atual} está sem quota até ${escolha.sem_quota_ate}; passa para a ${escolha.id} (autonomia «Máxima»)`);
    }
    registar(`${silencio}; a relançar com o modelo ${modelo} na subscrição ${escolha.id}`);
    await correr(retrato(estado), escolha.id, pastaDaConta(escolha.id), estado.ultima_sessao);
  } finally {
    rmSync(ficheiroTrinco, { force: true });
  }
}

async function correr(antes, subscricao, pastaConta, continua) {
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
      env: {
        ...ambienteDaConta(FORNECEDORES.claude, process.env, pastaConta),
        RETOMA_SEM_INTERFACE: "1",
        CLAUDE_CODE_PRINT_BG_WAIT_CEILING_MS: "0",
        // Cada corrida continua a anterior (2026-11-27): no portal de agentes é a mesma sessão, também quando passa
        // para outra subscrição, sem deixar a de antes como fantasma.
        ...(continua ? { CID_CONTINUA: continua } : {}),
      },
      stdio: ["pipe", "pipe", "pipe"],
      windowsHide: true,
    },
  );
  filho.stdin.end(pedido(subscricao));

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
  // O id desta corrida, para a seguinte dizer ao portal que a continua.
  if (typeof resultado.session_id === "string" && /^[0-9a-f-]{36}$/i.test(resultado.session_id))
    gravarEstado({ ultima_sessao: resultado.session_id.toLowerCase() });
  const minutos = Math.round((Date.now() - inicio) / 60000);
  const falhou = codigo !== 0 || resultado.is_error === true;
  const depois = lerEstado();
  const semProgresso = !falhou && !depois.terminado && retrato(depois) === antes;

  if (falhou || semProgresso) {
    // Limite de uso, outro erro, ou uma corrida que não mudou o estado de nenhuma tarefa (por exemplo, parada
    // numa permissão): espera cada vez mais antes de voltar a tentar, para não gastar a quota em vão.
    const falhas = (depois.falhas_seguidas ?? 0) + 1;
    const espera = PAUSAS_MIN[Math.min(falhas, PAUSAS_MIN.length) - 1];
    const pausa = new Date(Date.now() + espera * 60000).toISOString();
    const resumo = String(resultado.result ?? saida).replace(/\s+/g, " ").slice(0, 300);
    // Parou por limite de uso: a subscrição fica sem quota até à reposição (ou até ao fim da pausa, se a saída não a
    // traz). A deteção foi confirmada numa corrida real a 2026-11-27 (ver fornecedores.mjs).
    const limite = falhou ? FORNECEDORES.claude.lerSaida(saida, codigo).limite : null;
    let nota = "";
    const mudancas = { falhas_seguidas: falhas, pausado_ate: pausa };
    if (limite) {
      mudancas.sem_quota = { ...depois.sem_quota, [subscricao]: limite.repoe_em ?? pausa };
      const escolha = escolherSubscricao(comContasConhecidas({ ...depois, subscricao, sem_quota: mudancas.sem_quota }), {
        uso: lerUsoPorConta(),
      });
      if (escolha.trocar) {
        gravarEstado({ sem_quota: mudancas.sem_quota, subscricao: escolha.id, falhas_seguidas: 0, pausado_ate: null });
        registar(
          `parou por limite de uso ao fim de ${minutos} min na subscrição ${subscricao} (sem quota até ${mudancas.sem_quota[subscricao]}); a próxima corrida usa a ${escolha.id} (autonomia «Máxima»). ${resumo}`,
        );
        return;
      }
      if (escolha.alternativa) nota = ` A ${escolha.alternativa} tem quota, mas trocar pede a decisão do utilizador.`;
    }
    gravarEstado(mudancas);
    const porque = falhou
      ? `falhou ao fim de ${minutos} min (código ${codigo}, estado ${resultado.api_error_status ?? "?"}${limite ? `, limite de uso na subscrição ${subscricao}` : ""})`
      : `terminou ao fim de ${minutos} min sem mudar o estado de nenhuma tarefa`;
    registar(`${porque}; nova tentativa daqui a ${espera} min.${nota} ${resumo}`);
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

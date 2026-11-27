// As ferramentas de IA com que o par.mjs fala, e as subscrições de cada uma neste PC.
// Por agora só o Claude Code. Outra ferramenta (Codex, Mistral Vibe) entra com uma entrada nova em FORNECEDORES, com os
// mesmos campos e funções, sem mudar o par.mjs. Antes de pôr um fornecedor novo a ver um projeto, a resposta à P11
// (Dados e conformidade) tem de o permitir.

import { existsSync, readFileSync } from "node:fs";
import { homedir } from "node:os";
import { delimiter, extname, isAbsolute, join, resolve } from "node:path";

export const PRINCIPAL = "principal";
const ID_SUBSCRICAO = /^[a-z0-9][a-z0-9-]{0,29}$/;
const ID_SESSAO = /^[A-Za-z0-9][A-Za-z0-9-]{7,63}$/;
// O que pode ir na linha de comandos do cmd.exe: valores das listas fechadas e ids de sessão.
const ARGUMENTO_SEGURO = /^[A-Za-z0-9._:=-]+$/;
const MAXIMA = /^m[aá]xima$/i;

// A pasta do agente do portal neste PC; o registo das subscrições é o contas-ia.json dela.
export const pastaBase = (env = process.env) => env.REMOTO_DIR || join(homedir(), ".start-project-with-trust");
// Onde o estado-uso.mjs guarda o uso de cada subscrição, ao lado do estado-uso.json.
export const ficheiroUsoPorConta = () => join(homedir(), ".start-project-with-trust", "estado-uso-contas.json");

export function lerJson(ficheiro, omissao) {
  try {
    // O PowerShell grava UTF-8 com BOM, que o JSON.parse recusa.
    return JSON.parse(readFileSync(ficheiro, "utf8").replace(/^﻿/, ""));
  } catch {
    return omissao;
  }
}

export const lerUsoPorConta = () => lerJson(ficheiroUsoPorConta(), {});

// As subscrições do Claude registadas além da principal, na ordem do ficheiro. As entradas fora do formato ficam de fora.
export function lerContasClaude(env = process.env) {
  const lista = lerJson(join(pastaBase(env), "contas-ia.json"), []);
  if (!Array.isArray(lista)) return [];
  const vistas = new Set();
  const contas = [];
  for (const c of lista) {
    if (!c || typeof c.id !== "string" || !ID_SUBSCRICAO.test(c.id) || c.id === PRINCIPAL || vistas.has(c.id)) continue;
    if (typeof c.pasta !== "string" || !isAbsolute(c.pasta)) continue;
    vistas.add(c.id);
    contas.push({ id: c.id, nome: typeof c.nome === "string" ? c.nome.trim() : c.id, pasta: c.pasta });
  }
  return contas;
}

const mesmaPasta = (a, b) => {
  const normal = (p) => (process.platform === "win32" ? resolve(p).toLowerCase() : resolve(p));
  return normal(a) === normal(b);
};

// O id da subscrição de uma pasta de configuração: «principal» sem pasta (ou com a de sempre), o id registado, ou a
// própria pasta quando não está registada.
export function subscricaoDaPasta(pasta, contas) {
  if (!pasta || mesmaPasta(pasta, join(homedir(), ".claude"))) return PRINCIPAL;
  return contas.find((c) => mesmaPasta(c.pasta, pasta))?.id ?? pasta;
}

const claude = {
  nome: "Claude Code",
  comando: "claude",
  // Para os testes: um caminho para outro comando (um .mjs corre com o node).
  variavelComando: "PAR_CLAUDE",
  modelos: ["haiku", "sonnet", "opus", "fable"],
  // Cada subscrição é uma pasta de configuração própria, com o seu login e as suas sessões.
  variavelConta: "CLAUDE_CONFIG_DIR",
  // Numa corrida -p ganham ao login da subscrição: com elas no ambiente, a pasta da conta não contava e a sessão podia
  // faturar à API (knowledge/portais-de-agentes/agente-local-licenca-e-emparelhamento.md).
  variaveisQueGanham: ["ANTHROPIC_API_KEY", "ANTHROPIC_AUTH_TOKEN", "CLAUDE_CODE_OAUTH_TOKEN"],
  // O par não tem a quem perguntar: os hooks do portal de agentes não esperam por ninguém, como no retomar.mjs. Sem
  // isto, o hook Stop ficava à escuta de instruções do portal e a volta nunca acabava (visto a 2026-11-27).
  ambienteSemInterface: { RETOMA_SEM_INTERFACE: "1" },
  contas: lerContasClaude,

  candidatos(env, plataforma) {
    if (plataforma !== "win32") return [join(homedir(), ".local", "bin", "claude")];
    return [
      env.APPDATA && join(env.APPDATA, "npm", "node_modules", "@anthropic-ai", "claude-code", "bin", "claude.exe"),
      join(homedir(), ".local", "bin", "claude.exe"),
    ].filter(Boolean);
  },

  // Uma volta: o pedido vai sempre pelo stdin, e nos argumentos só entram valores das listas fechadas.
  argumentos({ modelo, sessao = null, soLeitura = true }) {
    if (!claude.modelos.includes(modelo)) throw new Error(`modelo desconhecido no Claude Code: ${modelo}`);
    if (sessao !== null && !ID_SESSAO.test(sessao)) throw new Error(`id de sessão inválido: ${sessao}`);
    const args = ["-p", "--output-format", "stream-json", "--verbose", "--model", modelo];
    args.push("--permission-mode", soLeitura ? "plan" : "acceptEdits");
    if (sessao) args.push("--resume", sessao);
    return args;
  },

  // A saída em stream-json: uma linha JSON por evento. O `system`/`init` e o `result` trazem o `session_id`; o
  // `result` traz o texto em `result` e `is_error`.
  lerSaida(stdout, codigo, stderr = "") {
    const eventos = [];
    const soltas = [];
    for (const linha of String(stdout).split(/\r?\n/)) {
      const texto = linha.trim();
      if (!texto) continue;
      try {
        const evento = JSON.parse(texto);
        if (evento && typeof evento === "object") eventos.push(evento);
        else soltas.push(texto);
      } catch {
        soltas.push(texto);
      }
    }
    const fim = eventos.findLast((e) => e.type === "result");
    const sessao = [fim, ...eventos].find((e) => typeof e?.session_id === "string")?.session_id ?? null;
    const texto = typeof fim?.result === "string" ? fim.result : "";
    if (codigo === 0 && fim && fim.is_error !== true) return { texto, sessao, limite: null, erro: null };

    // Não confirmado: a forma como uma paragem por limite de uso aparece em stream-json não foi vista numa corrida real.
    // Contam o `rate_limit_info` com status «rejected» (é assim que as transcrições a guardam), o estado 429 e o texto
    // do erro. Corrigir aqui depois de um teste a sério; a saída bruta de cada falha fica em par-<nome>/.
    const indicios = [texto, fim?.subtype, fim?.error, ...soltas, stderr].filter((t) => typeof t === "string").join("\n");
    const resumo = indicios.replace(/\s+/g, " ").trim();
    const rejeitado = eventos.some((e) => [...objetos(e)].some((o) => o.status === "rejected" && ("resetsAt" in o || "rateLimitType" in o)));
    if (rejeitado || fim?.api_error_status === 429 || SINAL_DE_LIMITE.test(indicios)) {
      return { texto, sessao, limite: { repoe_em: horaDeReposicao(eventos, indicios), mensagem: resumo.slice(0, 300) }, erro: null };
    }
    return { texto, sessao, limite: null, erro: (resumo || `saiu com o código ${codigo}`).slice(0, 500) };
  },
};

export const FORNECEDORES = { claude };

const SINAL_DE_LIMITE = /usage limit|rate[ _-]?limit|limit reached|limite de uso/i;

function* objetos(valor, fundo = 0) {
  if (!valor || typeof valor !== "object" || fundo > 8) return;
  yield valor;
  for (const v of Object.values(valor)) yield* objetos(v, fundo + 1);
}

function paraIso(valor) {
  if (typeof valor === "string" && /^\d+$/.test(valor)) valor = Number(valor);
  const ms = typeof valor === "number" ? (valor > 1e12 ? valor : valor * 1000) : Date.parse(valor);
  return Number.isFinite(ms) && ms > Date.UTC(2020, 0, 1) && ms < Date.UTC(2100, 0, 1) ? new Date(ms).toISOString() : null;
}

// A hora de reposição, quando a saída a traz: num campo `resetsAt` (de preferência o de um limite «rejected»), em
// segundos desde 1970 depois de «limit reached|», ou numa data ISO no texto. Não confirmado, como a deteção.
export function horaDeReposicao(eventos, texto) {
  let qualquer = null;
  for (const evento of eventos) {
    for (const o of objetos(evento)) {
      for (const chave of ["resetsAt", "resets_at", "resetAt", "reset_at"]) {
        const iso = o[chave] !== undefined ? paraIso(o[chave]) : null;
        if (!iso) continue;
        if (o.status === "rejected") return iso;
        qualquer ??= iso;
      }
    }
  }
  if (qualquer) return qualquer;
  const epoch = texto.match(/\|(\d{10,13})\b/);
  if (epoch) return paraIso(epoch[1]);
  const data = texto.match(/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}(?::\d{2}(?:\.\d+)?)?(?:Z|[+-]\d{2}:?\d{2})?/);
  return data ? paraIso(data[0]) : null;
}

// O comando a correr: o indicado na variável do fornecedor, a instalação conhecida, ou o primeiro no PATH.
export function executavel(fornecedor, env = process.env, plataforma = process.platform) {
  if (env[fornecedor.variavelComando]) return env[fornecedor.variavelComando];
  const candidato = fornecedor.candidatos(env, plataforma).find((c) => existsSync(c));
  if (candidato) return candidato;
  const nomes = plataforma === "win32" ? [".exe", ".cmd"].map((e) => fornecedor.comando + e) : [fornecedor.comando];
  for (const pasta of (env.PATH ?? env.Path ?? "").split(delimiter).filter(Boolean)) {
    for (const nome of nomes) if (existsSync(join(pasta, nome))) return join(pasta, nome);
  }
  return fornecedor.comando;
}

// Como lançar o comando. Um .cmd só corre pelo cmd.exe, que lê a linha inteira: por isso o caminho não pode ter o que o
// cmd.exe interpreta, e os argumentos só podem ser os das listas fechadas.
export function prepararExecucao(caminho, args, plataforma = process.platform) {
  const extensao = extname(caminho).toLowerCase();
  if (extensao === ".mjs" || extensao === ".js") return { ficheiro: process.execPath, argumentos: [caminho, ...args], opcoes: {} };
  if (plataforma === "win32" && (extensao === ".cmd" || extensao === ".bat")) {
    if (/["%^&|<>!\r\n]/.test(caminho)) throw new Error(`o caminho do comando tem caracteres que o cmd.exe interpreta: ${caminho}`);
    const fora = args.find((a) => !ARGUMENTO_SEGURO.test(a));
    if (fora !== undefined) throw new Error(`argumento que não pode ir para o cmd.exe: ${fora}`);
    return {
      ficheiro: process.env.ComSpec || "cmd.exe",
      argumentos: ["/d", "/s", "/c", `""${caminho}" ${args.join(" ")}"`],
      opcoes: { windowsVerbatimArguments: true },
    };
  }
  return { ficheiro: caminho, argumentos: args, opcoes: {} };
}

// O ambiente de uma corrida, sempre sem interface. Na principal, a pasta fica a de sempre; noutra subscrição, a
// variável da conta aponta para a pasta dela. Em todas saem as variáveis que ganhariam ao login da subscrição: uma
// chave de API no ambiente fazia a volta faturar à API sem ninguém dar por isso (como o agente do portal faz).
export function ambienteDaConta(fornecedor, env, pastaConta) {
  const fora = { ...env, ...fornecedor.ambienteSemInterface };
  if (pastaConta) fora[fornecedor.variavelConta] = pastaConta;
  for (const v of fornecedor.variaveisQueGanham) delete fora[v];
  return fora;
}

// A subscrição de um par ou de uma corrida: «principal» (sem pasta), uma registada pelo id, ou uma pasta indicada.
export function resolverSubscricao(fornecedor, { id, pastaConta, env = process.env }) {
  if (pastaConta) {
    if (!isAbsolute(pastaConta)) throw new Error("--pasta-conta tem de ser um caminho absoluto");
    return { id: id ?? null, pasta: pastaConta };
  }
  if (!id || id === PRINCIPAL) return { id: PRINCIPAL, pasta: null };
  const contas = fornecedor.contas(env);
  const conta = contas.find((c) => c.id === id);
  if (!conta) {
    const registadas = [PRINCIPAL, ...contas.map((c) => c.id)].join(", ");
    throw new Error(`subscrição desconhecida: ${id} (registadas: ${registadas})`);
  }
  return { id, pasta: conta.pasta };
}

// Até quando uma subscrição está sem quota, ou null. Conta o que ficou em `sem_quota` de estado.json (corridas que
// pararam nela) e, se `uso` vier, o que a linha de estado guardou dela (100% gasto e reposição no futuro).
export function semQuotaAte(id, estado, uso = {}, agora = Date.now()) {
  const datas = [estado.sem_quota?.[id]];
  for (const janela of [uso[id]?.cinco_horas, uso[id]?.sete_dias]) {
    if (janela?.used_percentage >= 100 && janela.resets_at) datas.push(janela.resets_at * 1000);
  }
  const futuras = datas.map((d) => (typeof d === "number" ? d : Date.parse(d))).filter((ms) => ms > agora);
  return futuras.length ? new Date(Math.max(...futuras)).toISOString() : null;
}

// Em que subscrição corre a retoma. A que está em uso só se dá por gasta quando uma corrida parou nela; as outras de
// `subscricoes` também pela linha de estado. Trocar só em «Máxima»; nos outros níveis fica a alternativa para o
// utilizador decidir. Um estado.json sem estes campos fica na principal, como antes.
export function escolherSubscricao(estado, { uso = {}, agora = Date.now() } = {}) {
  const atual = estado.subscricao || PRINCIPAL;
  const ate = semQuotaAte(atual, estado, {}, agora);
  if (!ate) return { id: atual, trocar: false, sem_quota_ate: null, alternativa: null };
  const lista = Array.isArray(estado.subscricoes) ? estado.subscricoes : [atual];
  const alternativa = lista.find((id) => id !== atual && !semQuotaAte(id, estado, uso, agora)) ?? null;
  const trocar = Boolean(alternativa) && MAXIMA.test(String(estado.autonomia ?? "").trim());
  return { id: trocar ? alternativa : atual, trocar, sem_quota_ate: ate, alternativa };
}

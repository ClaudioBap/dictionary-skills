// As ferramentas de IA com que o par.mjs fala, e as subscrições de cada uma neste PC: o Claude Code, o Codex CLI da
// OpenAI (plano do ChatGPT), modelos abertos servidos pelo Ollama através do Codex (neste PC ou num servidor) e o
// Mistral Vibe. Outra ferramenta entra com uma entrada nova em FORNECEDORES, com os mesmos campos e funções, sem mudar o
// par.mjs. Antes de pôr um fornecedor a ver um projeto, a resposta à P11 (Dados e conformidade) tem de o permitir.

import { existsSync, readFileSync } from "node:fs";
import { homedir } from "node:os";
import { delimiter, extname, isAbsolute, join, resolve } from "node:path";

export const PRINCIPAL = "principal";
const ID_SUBSCRICAO = /^[a-z0-9][a-z0-9-]{0,29}$/;
const ID_SESSAO = /^[A-Za-z0-9][A-Za-z0-9-]{7,63}$/;
// O que pode ir na linha de comandos do cmd.exe: valores das listas fechadas e ids de sessão.
const ARGUMENTO_SEGURO = /^[A-Za-z0-9._:=,-]+$/;
// E um caminho absoluto do Windows, entre aspas, sem o que o cmd.exe interpreta mesmo entre aspas e sem uma barra no
// fim (que tiraria o valor à aspa de fecho).
const CAMINHO_SEGURO = /^[A-Za-z]:\\[^"%^&|<>!\r\n]*[^"%^&|<>!\r\n\\]$/;
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

// As subscrições de um fornecedor registadas além da principal, na ordem do ficheiro. Cada entrada diz o fornecedor em
// `fornecedor`; as que não o dizem são do Claude, como eram antes de haver outros. As entradas fora do formato ficam de fora.
export function lerContas(fornecedorId, env = process.env) {
  const lista = lerJson(join(pastaBase(env), "contas-ia.json"), []);
  if (!Array.isArray(lista)) return [];
  const vistas = new Set();
  const contas = [];
  for (const c of lista) {
    if (!c || (c.fornecedor ?? "claude") !== fornecedorId) continue;
    if (typeof c.id !== "string" || !ID_SUBSCRICAO.test(c.id) || c.id === PRINCIPAL || vistas.has(c.id)) continue;
    if (typeof c.pasta !== "string" || !isAbsolute(c.pasta)) continue;
    vistas.add(c.id);
    contas.push({ id: c.id, nome: typeof c.nome === "string" ? c.nome.trim() : c.id, pasta: c.pasta });
  }
  return contas;
}

export const lerContasClaude = (env = process.env) => lerContas("claude", env);

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
  skillsNativas: true,
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
  // As variáveis do próprio fornecedor que chegam ao par, além das de base (ambienteDoPar).
  ambiente: ["CLAUDE_CONFIG_DIR"],
  // O par não tem a quem perguntar: os hooks do portal de agentes não esperam por ninguém, como no retomar.mjs. Sem
  // isto, o hook Stop ficava à escuta de instruções do portal e a volta nunca acabava (visto a 2026-11-27).
  ambienteSemInterface: { RETOMA_SEM_INTERFACE: "1" },
  // O que vai em --settings, num ficheiro da pasta do par (o JSON não passava pelo cmd.exe): as ferramentas de
  // ficheiros recusam o que está fora da pasta do projeto e, em qualquer sítio, os .env, as credenciais das contas e as
  // pastas das chaves. As regras seguem o gitignore: «//» é a raiz do disco e «~/» a pasta do utilizador.
  definicoes: {
    permissions: {
      blockReadsOutsideWorkingDirectories: true,
      deny: [
        "Read(//**/.env)",
        "Read(//**/.env.*)",
        "Read(//**/.credentials.json)",
        "Read(~/.ssh/**)",
        "Read(~/.start-project-with-trust/**)",
        "Read(~/.codex/**)",
        "Read(~/.vibe/**)",
      ],
    },
  },
  contas: lerContasClaude,

  candidatos(env, plataforma) {
    if (plataforma !== "win32") return [join(homedir(), ".local", "bin", "claude")];
    return [
      env.APPDATA && join(env.APPDATA, "npm", "node_modules", "@anthropic-ai", "claude-code", "bin", "claude.exe"),
      join(homedir(), ".local", "bin", "claude.exe"),
    ].filter(Boolean);
  },

  // Uma volta: o pedido vai sempre pelo stdin, e nos argumentos só entram valores das listas fechadas e o caminho do
  // ficheiro das definições. O par só tem as ferramentas de ler e pesquisar (mais as de editar com --pode-escrever),
  // sem a shell nem a web, e nenhum servidor MCP do utilizador.
  argumentos({ modelo, sessao = null, soLeitura = true, definicoes = null }) {
    if (!claude.modelos.includes(modelo)) throw new Error(`modelo desconhecido no Claude Code: ${modelo}`);
    if (sessao !== null && !ID_SESSAO.test(sessao)) throw new Error(`id de sessão inválido: ${sessao}`);
    if (!definicoes) throw new Error("falta o ficheiro das definições do par");
    const args = ["-p", "--output-format", "stream-json", "--verbose", "--model", modelo];
    args.push("--permission-mode", soLeitura ? "plan" : "acceptEdits");
    args.push("--tools", soLeitura ? "Read,Grep,Glob" : "Read,Grep,Glob,Edit,Write", "--strict-mcp-config", "--settings", definicoes);
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

    // Confirmado a 2026-11-27, numa subscrição Pro sem quota semanal: antes do `result` vem um `rate_limit_event` com
    // `rate_limit_info.status` «rejected», o tipo em `rateLimitType` («seven_day», «five_hour») e a reposição em
    // `resetsAt` (segundos desde 1970); depois, uma mensagem do modelo «<synthetic>» com «You've hit your weekly limit»
    // e a hora, e o `result` com `terminal_reason` «api_error». O processo sai com 1 ao fim de segundos. Esse evento
    // lê-se primeiro; outro objeto «rejected», o estado 429 e o texto ficam como segunda via. A saída bruta de cada
    // falha fica em par-<nome>/.
    const indicios = [texto, fim?.subtype, fim?.error, ...soltas, stderr].filter((t) => typeof t === "string").join("\n");
    const resumo = indicios.replace(/\s+/g, " ").trim();
    const recusa = eventos.findLast((e) => e.type === "rate_limit_event" && e.rate_limit_info?.status === "rejected")?.rate_limit_info;
    if (recusa) {
      const tipo = typeof recusa.rateLimitType === "string" ? recusa.rateLimitType : null;
      const repoe_em = paraIso(recusa.resetsAt) ?? horaDeReposicao(eventos, indicios);
      return { texto, sessao, limite: { repoe_em, tipo, mensagem: (resumo || `limite ${tipo ?? "de uso"} atingido`).slice(0, 300) }, erro: null };
    }
    const rejeitado = eventos.some((e) => [...objetos(e)].some((o) => o.status === "rejected" && ("resetsAt" in o || "rateLimitType" in o)));
    if (rejeitado || fim?.api_error_status === 429 || SINAL_DE_LIMITE.test(indicios)) {
      return { texto, sessao, limite: { repoe_em: horaDeReposicao(eventos, indicios), mensagem: resumo.slice(0, 300) }, erro: null };
    }
    return { texto, sessao, limite: null, erro: (resumo || `saiu com o código ${codigo}`).slice(0, 500) };
  },
};

// Os nomes dos modelos que não vêm de uma lista fechada: só letras minúsculas, algarismos, ponto, hífen e sublinhado. Os do Ollama
// levam sempre a etiqueta (qwen3-8b-16k:latest): sem ela, o Codex tenta descarregar o modelo e falha (visto a 2026-11-27).
const MODELO_SIMPLES = /^[a-z0-9][a-z0-9._-]{0,63}$/;
const MODELO_OLLAMA = /^[a-z0-9][a-z0-9._-]{0,63}:[a-z0-9][a-z0-9._-]{0,63}$/;
// O Ollama de um servidor, normalmente por um túnel SSH (http://127.0.0.1:11435). Em http só esta máquina, porque o
// pedido leva o código do projeto; outra máquina só por https. Aceita o /v1 no fim, que se tira.
const SERVIDOR_OLLAMA = /^((?:http:\/\/(?:localhost|127\.0\.0\.1|\[::1\])|https:\/\/[A-Za-z0-9.-]+)(?::\d{1,5})?)(?:\/v1)?\/?$/;

export function urlDoServidor(valor) {
  const m = SERVIDOR_OLLAMA.exec(String(valor ?? ""));
  if (!m) {
    throw new Error(
      `--servidor tem de ser http://localhost, http://127.0.0.1 ou http://[::1] com a porta (por exemplo o túnel SSH em http://127.0.0.1:11435), ou um endereço https://: ${valor}`,
    );
  }
  return m[1];
}

// Uma linha JSON por evento, e as linhas que não são JSON à parte.
function linhasJson(stdout) {
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
  return { eventos, soltas };
}

const resumir = (partes) => partes.filter((t) => typeof t === "string" && t.trim()).join("\n");

// O fim de uma volta que não acabou bem: limite de uso ou erro. Não confirmado para o Codex e para o Vibe: a forma como
// uma paragem por limite aparece não foi vista numa corrida real. Corrigir aqui depois de um teste a sério; a saída
// bruta de cada falha fica em par-<nome>/.
function falhaDaVolta(eventos, indicios, { texto = "", sessao = null, codigo }) {
  const resumo = indicios.replace(/\s+/g, " ").trim();
  if (SINAL_DE_LIMITE.test(indicios) || /\b429\b/.test(indicios)) {
    return { texto, sessao, limite: { repoe_em: horaDeReposicao(eventos, indicios), mensagem: resumo.slice(0, 300) }, erro: null };
  }
  const omissao = codigo === 0 ? "o par acabou sem resposta" : `saiu com o código ${codigo}`;
  return { texto, sessao, limite: null, erro: (resumo || omissao).slice(0, 500) };
}

// O que o par do Codex consegue fazer: no Windows, a sandbox só de leitura recusa todos os comandos («blocked by
// policy»), por isso o par não lê ficheiros e tudo tem de ir na mensagem (visto a 2026-11-27, Codex 0.172.0, com o
// windows_sandbox_service ainda «under development»). Em escrita, no Windows, não confirmado: o par.mjs recusa-a
// (semEscritaNoWindows).
function capacidadesCodex({ plataforma, soLeitura }) {
  if (plataforma === "win32") {
    return {
      leFicheiros: false,
      linha:
        "Neste PC (Windows), a sandbox só de leitura recusa todos os comandos: não consegues ler ficheiros nem correr nada, e não alteras nada. O diff, o código que interessa e a saída dos testes vêm na mensagem. Onde o teu papel diz para confirmares nos ficheiros, confirma no que vem na mensagem, e pede o que faltar em vez de adivinhares.",
    };
  }
  return {
    leFicheiros: true,
    linha: soLeitura
      ? "Estás em modo só de leitura: lês os ficheiros com comandos de leitura, mas não alteras nada."
      : "Podes alterar ficheiros dentro da pasta do projeto, mas só quando a mensagem o pedir de forma explícita e isso couber no teu papel.",
  };
}

// Uma volta do Codex: `codex exec` com as opções antes de `resume`, e o pedido pelo stdin (o `-` no fim). A pasta do
// projeto é a pasta em que corre, por isso não vai nos argumentos.
function argumentosCodex(fornecedor, ligacao, { modelo, sessao = null, soLeitura = true }) {
  if (!fornecedor.padraoModelo.test(modelo)) throw new Error(`modelo inválido no ${fornecedor.nome}: ${modelo}`);
  if (sessao !== null && !ID_SESSAO.test(sessao)) throw new Error(`id de sessão inválido: ${sessao}`);
  const args = ["exec", "--json", "--skip-git-repo-check", "--sandbox", soLeitura ? "read-only" : "workspace-write", "-m", modelo, ...ligacao];
  if (sessao) args.push("resume", sessao);
  args.push("-");
  return args;
}

// A saída de `codex exec --json`: `thread.started` traz o id da sessão, cada `item.completed` com um `agent_message`
// traz texto (a resposta é o último), e a volta acaba em `turn.completed` ou `turn.failed`. Os eventos `error` pelo
// caminho («Reconnecting...») e os avisos («Model metadata ... not found») não contam quando a volta acaba bem.
function lerSaidaCodex(stdout, codigo, stderr = "") {
  const { eventos, soltas } = linhasJson(stdout);
  const sessao = eventos.find((e) => e.type === "thread.started" && typeof e.thread_id === "string")?.thread_id ?? null;
  const respostas = eventos.filter((e) => e.type === "item.completed" && e.item?.type === "agent_message" && typeof e.item.text === "string");
  const texto = respostas.at(-1)?.item.text ?? "";
  const falhou = eventos.findLast((e) => e.type === "turn.failed");
  const acabou = eventos.some((e) => e.type === "turn.completed");
  if (codigo === 0 && acabou && !falhou && texto.trim()) return { texto, sessao, limite: null, erro: null };
  const ultimoErro = eventos.findLast((e) => e.type === "error")?.message;
  const indicios = resumir([falhou?.error?.message, ultimoErro, ...soltas, stderr]);
  return falhaDaVolta(eventos, indicios, { texto, sessao, codigo });
}

const candidatosCodex = (env, plataforma) => {
  if (plataforma !== "win32") return [join(homedir(), ".local", "bin", "codex")];
  // A instalação pelo npm: o codex.js corre com o node, sem passar pelo cmd.exe.
  return [env.APPDATA && join(env.APPDATA, "npm", "node_modules", "@openai", "codex", "bin", "codex.js")].filter(Boolean);
};

const CHAVES_OPENAI = ["OPENAI_API_KEY", "CODEX_API_KEY", "CODEX_ACCESS_TOKEN"];

const codex = {
  skillsNativas: true,
  nome: "Codex",
  comando: "codex",
  variavelComando: "PAR_CODEX",
  padraoModelo: MODELO_SIMPLES,
  ajudaModelo: "o nome de um modelo do plano do ChatGPT no Codex",
  // Cada conta do ChatGPT é uma pasta CODEX_HOME própria, com o login, a configuração e as sessões. A pasta tem de existir.
  variavelConta: "CODEX_HOME",
  // Com uma chave no ambiente, a volta podia faturar à API em vez de gastar o plano do ChatGPT da conta.
  variaveisQueGanham: CHAVES_OPENAI,
  // O login fica na pasta CODEX_HOME: nenhuma chave da OpenAI chega ao par.
  ambiente: ["CODEX_HOME"],
  ambienteSemInterface: { RETOMA_SEM_INTERFACE: "1" },
  // A sandbox de escrita do Codex no Windows não está confirmada: o par.mjs recusa --pode-escrever.
  semEscritaNoWindows: true,
  contas: (env) => lerContas("codex", env),
  candidatos: candidatosCodex,
  argumentos: (pedido) => argumentosCodex(codex, [], pedido),
  lerSaida: lerSaidaCodex,
  capacidades: capacidadesCodex,
};

// Um modelo aberto servido pelo Ollama, pelo Codex. Sem --servidor, o Ollama deste PC (`--oss --local-provider ollama`);
// com --servidor, um fornecedor próprio na configuração (`model_providers.<id>.base_url`, a forma documentada, porque o
// id `ollama` é reservado). Nada passa por uma conta: não há subscrição nem quota.
const local = {
  skillsNativas: true,
  nome: "Codex com um modelo do Ollama",
  comando: "codex",
  variavelComando: "PAR_CODEX",
  padraoModelo: MODELO_OLLAMA,
  ajudaModelo: "o nome completo no Ollama, com a etiqueta, por exemplo qwen3-8b-16k:latest",
  aceitaServidor: true,
  // Num PC sem GPU, a primeira volta levou 18 minutos, perto dos 20 dos outros: cerca de 10 minutos a ler os 10 833 tokens
  // do pedido (17 a 20 tokens por segundo) e o resto a escrever 475, a pouco mais de 1 por segundo (visto a 2026-11-27).
  prazoMinutos: 60,
  variavelConta: null,
  variaveisQueGanham: [],
  // A pasta do Codex e onde está o Ollama: o --oss do Codex lê CODEX_OSS_BASE_URL e CODEX_OSS_PORT (vistos no binário
  // do Codex 0.172.0), e o OLLAMA_HOST é o do próprio Ollama.
  ambiente: ["CODEX_HOME", "CODEX_OSS_BASE_URL", "CODEX_OSS_PORT", "OLLAMA_HOST"],
  ambienteSemInterface: { RETOMA_SEM_INTERFACE: "1" },
  semEscritaNoWindows: true,
  contas: () => [],
  candidatos: candidatosCodex,
  argumentos({ servidor = null, ...pedido }) {
    const ligacao = servidor
      ? ["-c", "model_providers.par_ollama.name=Ollama", "-c", `model_providers.par_ollama.base_url=${urlDoServidor(servidor)}/v1`, "-c", "model_provider=par_ollama"]
      : ["--oss", "--local-provider", "ollama"];
    return argumentosCodex(local, ligacao, pedido);
  },
  lerSaida: lerSaidaCodex,
  capacidades: capacidadesCodex,
};

// Mistral Vibe. Sem variável documentada para mudar a pasta ~/.vibe, e com a chave guardada no cofre do sistema: uma
// conta da Mistral por PC. O id da sessão e o resultado vêm do export.json que o --output-dir escreve em cada saída.
const vibe = {
  nome: "Mistral Vibe",
  comando: "vibe",
  variavelComando: "PAR_VIBE",
  padraoModelo: MODELO_SIMPLES,
  ajudaModelo: "um alias de modelo da configuração do Vibe",
  variavelConta: null,
  variaveisQueGanham: [],
  // A chave de que o Vibe precisa para entrar, quando não está no cofre do sistema: é a única que lhe chega.
  ambiente: ["MISTRAL_API_KEY"],
  ambienteSemInterface: { RETOMA_SEM_INTERFACE: "1" },
  contas: () => [],
  candidatos: (env, plataforma) => [join(homedir(), ".local", "bin", plataforma === "win32" ? "vibe.exe" : "vibe")],

  // Sem interface, o Vibe recusa o que precisa de aprovação, mas a política por omissão (accept-edits) aprova as
  // edições: por isso, em leitura, só ficam as ferramentas de ler e pesquisar. Em escrita, accept-edits explícito (como o
  // acceptEdits do Claude), e a shell continua recusada. O modelo só se escolhe numa sessão nova.
  argumentos({ modelo, sessao = null, soLeitura = true, pastaVolta = null }) {
    if (!MODELO_SIMPLES.test(modelo)) throw new Error(`modelo inválido no Mistral Vibe: ${modelo}`);
    if (sessao !== null && !ID_SESSAO.test(sessao)) throw new Error(`id de sessão inválido: ${sessao}`);
    const args = ["-p", "--output", "text"];
    if (pastaVolta) args.push("--output-dir", pastaVolta);
    if (soLeitura) args.push("--enabled-tools", "read_file", "--enabled-tools", "grep");
    else args.push("--approval-policy", "accept-edits");
    if (sessao) args.push("--resume", sessao);
    else args.push("--model", modelo);
    return args;
  },

  // A resposta é o stdout (--output text). O export.json diz como a volta acabou (`outcome`, «finished» quando acabou
  // bem), o `session_id` e o `error`. Códigos: 0 acabou, 1 não arrancou, 2 falhou a API ou o runtime, 3 parou antes.
  lerSaida(stdout, codigo, stderr = "", { pastaVolta = null } = {}) {
    const exportacao = pastaVolta ? lerJson(join(pastaVolta, "export.json"), null) : null;
    const sessao = typeof exportacao?.session_id === "string" ? exportacao.session_id : null;
    const texto = String(stdout).trim();
    const fim = exportacao?.outcome ?? null;
    if (codigo === 0 && (fim === null || fim === "finished") && texto) return { texto, sessao, limite: null, erro: null };
    const indicios = resumir([exportacao?.error?.message, exportacao?.error?.code != null ? `código ${exportacao.error.code}` : null, fim, stderr]);
    return falhaDaVolta([exportacao].filter(Boolean), indicios, { texto, sessao, codigo });
  },

  capacidades: ({ soLeitura }) => ({
    leFicheiros: true,
    linha: soLeitura
      ? "Estás em modo só de leitura: só tens as ferramentas de ler ficheiros e de pesquisar no projeto, sem comandos nem escrita."
      : "Podes ler e editar ficheiros, mas só quando a mensagem o pedir de forma explícita e isso couber no teu papel. Os comandos da shell são recusados, porque não há ninguém para os aprovar.",
  }),
};

export const FORNECEDORES = { claude, codex, local, vibe };

const SINAL_DE_LIMITE = /usage limit|rate[ _-]?limit|limit reached|hit your (?:\w+ )?limit|limite de uso/i;

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
// segundos desde 1970 depois de «limit reached|», ou numa data ISO no texto. É a segunda via do Claude, depois do
// `rate_limit_event`, e a única do Codex e do Vibe, onde não está confirmada.
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
// cmd.exe interpreta, e os argumentos só podem ser os das listas fechadas ou um caminho absoluto, que vai entre aspas.
export function prepararExecucao(caminho, args, plataforma = process.platform) {
  const extensao = extname(caminho).toLowerCase();
  if (extensao === ".mjs" || extensao === ".js") return { ficheiro: process.execPath, argumentos: [caminho, ...args], opcoes: {} };
  if (plataforma === "win32" && (extensao === ".cmd" || extensao === ".bat")) {
    if (/["%^&|<>!\r\n]/.test(caminho)) throw new Error(`o caminho do comando tem caracteres que o cmd.exe interpreta: ${caminho}`);
    const fora = args.find((a) => !ARGUMENTO_SEGURO.test(a) && !CAMINHO_SEGURO.test(a));
    if (fora !== undefined) throw new Error(`argumento que não pode ir para o cmd.exe: ${fora}`);
    const linha = args.map((a) => (ARGUMENTO_SEGURO.test(a) ? a : `"${a}"`)).join(" ");
    return {
      ficheiro: process.env.ComSpec || "cmd.exe",
      argumentos: ["/d", "/s", "/c", `""${caminho}" ${linha}"`],
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

// O que qualquer destas ferramentas precisa para correr no Windows, no Linux e no macOS: onde estão os programas, as
// pastas do sistema e do utilizador, a língua, o terminal e o proxy (com os certificados de um proxy que abre o TLS).
// No Windows os nomes não distinguem maiúsculas, por isso comparam-se em maiúsculas.
const AMBIENTE_DE_BASE = new Set([
  ...["PATH", "PATHEXT", "SYSTEMROOT", "WINDIR", "COMSPEC", "TEMP", "TMP", "TMPDIR", "NUMBER_OF_PROCESSORS", "PROCESSOR_ARCHITECTURE", "OS"],
  ...["HOME", "USERPROFILE", "HOMEDRIVE", "HOMEPATH", "APPDATA", "LOCALAPPDATA", "USERNAME", "USER", "LOGNAME", "SHELL"],
  ...["PROGRAMDATA", "PROGRAMFILES", "PROGRAMFILES(X86)", "PROGRAMW6432", "COMMONPROGRAMFILES"],
  ...["LANG", "LC_ALL", "TERM", "HTTP_PROXY", "HTTPS_PROXY", "NO_PROXY", "NODE_EXTRA_CA_CERTS", "SSL_CERT_FILE"],
]);
// Os testes (par.test.mjs) dizem aos fornecedores a fingir o que fazer e onde registar cada chamada.
const AMBIENTE_DOS_TESTES = ["CLAUDE_FALSO_MODO", "CLAUDE_FALSO_REGISTO", "FALSO_MODO", "FALSO_REGISTO"];

// O ambiente do par é uma lista fechada: o de base, as variáveis do próprio fornecedor (a pasta da conta, a
// MISTRAL_API_KEY no Vibe) e o modo sem interface. Tudo o resto fica de fora: as chaves dos outros fornecedores, as
// que fariam a volta faturar à API e os tokens que não são de nenhum (GitHub, Cloudflare). O par.mjs junta depois o
// CID_PAPEL e o CID_PAR_DE.
export function ambienteDoPar(fornecedor, env, pastaConta) {
  const fora = {};
  for (const [nome, valor] of Object.entries(env)) {
    const maiusculas = nome.toUpperCase();
    if (AMBIENTE_DE_BASE.has(maiusculas) || maiusculas.startsWith("XDG_") || fornecedor.ambiente.includes(nome) || AMBIENTE_DOS_TESTES.includes(nome)) {
      fora[nome] = valor;
    }
  }
  Object.assign(fora, fornecedor.ambienteSemInterface);
  if (pastaConta) fora[fornecedor.variavelConta] = pastaConta;
  return fora;
}

// A subscrição de um par ou de uma corrida: «principal» (sem pasta), uma registada pelo id, ou uma pasta indicada.
export function resolverSubscricao(fornecedor, { id, pastaConta, env = process.env }) {
  if (!fornecedor.variavelConta && (pastaConta || (id && id !== PRINCIPAL))) {
    throw new Error(`o ${fornecedor.nome} só tem uma conta neste PC: tira o --subscricao e o --pasta-conta`);
  }
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
  const podeExecutar = (id) => !["planeador", "verificador"].includes(estado.papeis_contas?.["claude:" + id]);
  const alternativa = lista.find((id) => id !== atual && podeExecutar(id) && !semQuotaAte(id, estado, uso, agora)) ?? null;
  const trocar = Boolean(alternativa) && MAXIMA.test(String(estado.autonomia ?? "").trim());
  return { id: trocar ? alternativa : atual, trocar, sem_quota_ate: ate, alternativa };
}

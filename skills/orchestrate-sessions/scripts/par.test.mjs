// Testes do par.mjs e do fornecedores.mjs. O par é um claude, um codex ou um vibe a fingir (teste/*-falso.mjs), e cada
// cenário tem a sua pasta temporária com o trabalho, o projeto e um contas-ia.json com uma subscrição do Claude e uma
// do Codex além da principal.
// Correr: node --test skills/orchestrate-sessions/scripts/

import { after, test } from "node:test";
import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { copyFileSync, existsSync, mkdirSync, mkdtempSync, readFileSync, realpathSync, rmSync, writeFileSync } from "node:fs";
import { homedir, tmpdir } from "node:os";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import {
  FORNECEDORES,
  ambienteDaConta,
  ambienteDoPar,
  escolherSubscricao,
  lerContas,
  lerContasClaude,
  prepararExecucao,
  resolverSubscricao,
  subscricaoDaPasta,
} from "./fornecedores.mjs";
import { instrucoes, terminaEmAprovado } from "./par.mjs";

const AQUI = dirname(fileURLToPath(import.meta.url));
const PAR = join(AQUI, "par.mjs");
const FALSO = join(AQUI, "teste", "claude-falso.mjs");
const CODEX_FALSO = join(AQUI, "teste", "codex-falso.mjs");
const VIBE_FALSO = join(AQUI, "teste", "vibe-falso.mjs");
const claude = FORNECEDORES.claude;
const { codex, local, vibe } = FORNECEDORES;
const WINDOWS = process.platform === "win32";
const criadas = [];
after(() => {
  for (const p of criadas) rmSync(p, { recursive: true, force: true });
});

function cenario() {
  const raiz = mkdtempSync(join(tmpdir(), "par-"));
  criadas.push(raiz);
  const trabalho = join(raiz, "orquestracao", "t1");
  const projeto = join(raiz, "projeto");
  const base = join(raiz, "base");
  const conta2 = join(raiz, "conta-2");
  const contaCodex = join(raiz, "codex-2");
  for (const p of [trabalho, projeto, base, conta2, contaCodex]) mkdirSync(p, { recursive: true });
  writeFileSync(
    join(base, "contas-ia.json"),
    JSON.stringify([
      { id: "conta-2", nome: "Conta 2", pasta: conta2 },
      { id: "chatgpt-2", nome: "ChatGPT 2", pasta: contaCodex, fornecedor: "codex" },
    ]),
  );
  const registo = join(raiz, "registo.jsonl");
  const env = {
    ...process.env,
    REMOTO_DIR: base,
    PAR_CLAUDE: FALSO,
    PAR_CODEX: CODEX_FALSO,
    PAR_VIBE: VIBE_FALSO,
    CLAUDE_FALSO_REGISTO: registo,
    FALSO_REGISTO: registo,
    ANTHROPIC_API_KEY: "chave-de-teste",
    OPENAI_API_KEY: "chave-de-teste",
    MISTRAL_API_KEY: "chave-de-teste",
    // O Claude Code põe o id da sessão no ambiente das ferramentas: os testes começam sem ele.
    CLAUDE_CODE_SESSION_ID: "",
    CLAUDE_SESSION_ID: "",
  };
  for (const v of ["CLAUDE_CONFIG_DIR", "CODEX_HOME", "CODEX_API_KEY", "CODEX_ACCESS_TOKEN", "CLAUDE_CODE_OAUTH_TOKEN"]) delete env[v];
  let n = 0;
  return {
    raiz,
    trabalho,
    projeto,
    conta2,
    contaCodex,
    env,
    par(args, { modo = "normal", extra = {} } = {}) {
      const r = spawnSync(process.execPath, [PAR, ...args], { env: { ...env, CLAUDE_FALSO_MODO: modo, FALSO_MODO: modo, ...extra }, encoding: "utf8" });
      return { codigo: r.status, json: r.stdout.trim() ? JSON.parse(r.stdout) : null, stderr: r.stderr };
    },
    chamadas: () => (existsSync(registo) ? readFileSync(registo, "utf8").trim().split("\n").map((l) => JSON.parse(l)) : []),
    mensagem(texto) {
      const ficheiro = join(raiz, `mensagem-${++n}.md`);
      writeFileSync(ficheiro, texto);
      return ficheiro;
    },
    pares: (pasta = trabalho) => JSON.parse(readFileSync(join(pasta, "pares.json"), "utf8")).pares,
  };
}

const abrir = (c, nome, extra = [], par = "claude:opus") =>
  c.par(["abrir", "--trabalho", c.trabalho, "--nome", nome, "--par", par, "--forma", "verificar", "--pasta", c.projeto, ...extra]);
const dizer = (c, nome, texto, opcoes) => c.par(["dizer", "--trabalho", c.trabalho, "--nome", nome, "--texto-ficheiro", c.mensagem(texto)], opcoes);
const real = (p) => realpathSync.native(p).toLowerCase();

test("contas-ia.json: só entram as subscrições no formato", () => {
  const c = cenario();
  writeFileSync(
    join(c.env.REMOTO_DIR, "contas-ia.json"),
    JSON.stringify([
      { id: "conta-2", nome: "Conta 2", pasta: c.conta2 },
      { id: "principal", nome: "Outra", pasta: c.conta2 },
      { id: "relativa", nome: "Relativa", pasta: "conta" },
      { id: "Maiusculas", nome: "X", pasta: c.conta2 },
      { id: "conta-2", nome: "Repetida", pasta: c.raiz },
    ]),
  );
  assert.deepEqual(lerContasClaude(c.env), [{ id: "conta-2", nome: "Conta 2", pasta: c.conta2 }]);
  assert.deepEqual(lerContasClaude({ REMOTO_DIR: join(c.raiz, "nao-existe") }), []);
});

test("subscrição para pasta: principal, registada, indicada e desconhecida", () => {
  const c = cenario();
  assert.deepEqual(resolverSubscricao(claude, { env: c.env }), { id: "principal", pasta: null });
  assert.deepEqual(resolverSubscricao(claude, { id: "principal", env: c.env }), { id: "principal", pasta: null });
  assert.deepEqual(resolverSubscricao(claude, { id: "conta-2", env: c.env }), { id: "conta-2", pasta: c.conta2 });
  assert.deepEqual(resolverSubscricao(claude, { pastaConta: c.raiz, env: c.env }), { id: null, pasta: c.raiz });
  assert.throws(() => resolverSubscricao(claude, { id: "conta-9", env: c.env }), /desconhecida: conta-9 \(registadas: principal, conta-2\)/);
  assert.throws(() => resolverSubscricao(claude, { pastaConta: "relativa", env: c.env }), /absoluto/);
  const contas = lerContasClaude(c.env);
  assert.equal(subscricaoDaPasta(undefined, contas), "principal");
  assert.equal(subscricaoDaPasta(join(homedir(), ".claude"), contas), "principal");
  assert.equal(subscricaoDaPasta(c.conta2, contas), "conta-2");
  assert.equal(subscricaoDaPasta(c.raiz, contas), c.raiz);
});

test("argumentos do claude: só leitura por omissão e --resume só com sessão", () => {
  const primeira = claude.argumentos({ modelo: "opus" });
  assert.deepEqual(primeira, ["-p", "--output-format", "stream-json", "--verbose", "--model", "opus", "--permission-mode", "plan"]);
  const seguinte = claude.argumentos({ modelo: "sonnet", sessao: "0a1b2c3d-1111", soLeitura: false });
  assert.deepEqual(seguinte.slice(-4), ["--permission-mode", "acceptEdits", "--resume", "0a1b2c3d-1111"]);
  assert.throws(() => claude.argumentos({ modelo: "gpt" }), /modelo desconhecido/);
  assert.throws(() => claude.argumentos({ modelo: "opus", sessao: "abc & del" }), /id de sessão inválido/);
});

test("ambiente: sempre sem interface e sem o que ganha ao login; outra subscrição muda a pasta", () => {
  const env = { PATH: "x", ANTHROPIC_API_KEY: "k", CLAUDE_CODE_OAUTH_TOKEN: "t" };
  assert.deepEqual(ambienteDaConta(claude, env, null), { PATH: "x", RETOMA_SEM_INTERFACE: "1" });
  assert.deepEqual(ambienteDaConta(claude, env, "C:/contas/c2"), {
    PATH: "x",
    RETOMA_SEM_INTERFACE: "1",
    CLAUDE_CONFIG_DIR: "C:/contas/c2",
  });
});

test("leitura da saída: resposta, erro e as formas de limite", () => {
  const linhas = (...o) => o.map((x) => JSON.stringify(x)).join("\n");
  const normal = claude.lerSaida(
    linhas({ type: "system", subtype: "init", session_id: "s-123456789" }, { type: "result", is_error: false, result: "Tudo certo." }),
    0,
  );
  assert.deepEqual(normal, { texto: "Tudo certo.", sessao: "s-123456789", limite: null, erro: null });

  const fala = claude.lerSaida(linhas({ type: "result", is_error: false, result: "O rate limit da API está bem.", session_id: "s1" }), 0);
  assert.equal(fala.limite, null);

  const erro = claude.lerSaida(linhas({ type: "result", is_error: true, result: "API Error: 500", session_id: "s1" }), 1);
  assert.equal(erro.limite, null);
  assert.match(erro.erro, /API Error: 500/);

  const epoch = claude.lerSaida(linhas({ type: "result", is_error: true, result: "Claude AI usage limit reached|1893456000" }), 1);
  assert.equal(epoch.limite.repoe_em, "2030-01-01T00:00:00.000Z");

  const rejeitado = claude.lerSaida(
    linhas(
      { type: "assistant", isApiErrorMessage: true, apiErrorParams: { rate_limit_info: { status: "rejected", rateLimitType: "five_hour", resetsAt: 1893459600 } } },
      { type: "result", is_error: true, result: "You've hit your limit" },
    ),
    1,
  );
  assert.equal(rejeitado.limite.repoe_em, "2030-01-01T01:00:00.000Z");

  const semJson = claude.lerSaida("", 1, "Error: usage limit reached, resets 2030-01-01T10:00:00Z");
  assert.equal(semJson.limite.repoe_em, "2030-01-01T10:00:00.000Z");

  const semHora = claude.lerSaida(linhas({ type: "result", is_error: true, result: "5-hour limit reached, resets 3pm" }), 1);
  assert.equal(semHora.limite.repoe_em, null);
  assert.match(semHora.limite.mensagem, /resets 3pm/);
});

test("limite semanal do claude, como saiu numa corrida real a 2026-11-27: o rate_limit_event primeiro, o texto depois", () => {
  const linhas = (...o) => o.map((x) => JSON.stringify(x)).join("\n");
  // O texto real traz um ponto médio entre o limite e a hora; fica escrito com o código, como na saída.
  const aviso = `You've hit your weekly limit ${String.fromCharCode(0xb7)} resets 3am (Europe/Lisbon)`;
  const evento = {
    type: "rate_limit_event",
    rate_limit_info: {
      status: "rejected",
      resetsAt: 1795834800,
      rateLimitType: "seven_day",
      overageStatus: "rejected",
      overageDisabledReason: "out_of_credits",
      isUsingOverage: false,
      unifiedWindows: {
        five_hour: { utilization: 0, resetsAt: 1795837200, status: "allowed" },
        seven_day: { utilization: 1, resetsAt: 1795834800, status: "rejected", surpassedThreshold: 1 },
      },
    },
    session_id: "s-123456789",
  };
  const saida = linhas(
    { type: "system", subtype: "init", session_id: "s-123456789" },
    evento,
    { type: "assistant", message: { model: "<synthetic>", content: [{ type: "text", text: aviso }] }, session_id: "s-123456789" },
    { type: "result", is_error: true, result: aviso, terminal_reason: "api_error", session_id: "s-123456789" },
  );
  const lida = claude.lerSaida(saida, 1);
  assert.equal(lida.erro, null);
  assert.equal(lida.limite.repoe_em, "2026-11-28T03:00:00.000Z");
  assert.equal(lida.limite.tipo, "seven_day");
  assert.match(lida.limite.mensagem, /weekly limit/);

  // Sem o evento, o texto chega para dar pelo limite, mas sem hora de reposição.
  const soTexto = claude.lerSaida(linhas({ type: "result", is_error: true, result: aviso, terminal_reason: "api_error" }), 1);
  assert.equal(soTexto.erro, null);
  assert.equal(soTexto.limite.repoe_em, null);
  assert.equal(soTexto.limite.tipo, undefined);

  // Um evento «allowed» não é limite.
  const permitido = { ...evento, rate_limit_info: { ...evento.rate_limit_info, status: "allowed", unifiedWindows: {} } };
  const erro = claude.lerSaida(linhas(permitido, { type: "result", is_error: true, result: "API Error: 500" }), 1);
  assert.equal(erro.limite, null);
});

test("aprovação: só uma última linha APROVADO", () => {
  assert.equal(terminaEmAprovado("Está bom.\n\nAPROVADO"), true);
  assert.equal(terminaEmAprovado("Está bom.\n\n**APROVADO**\n"), true);
  assert.equal(terminaEmAprovado("APROVADO\n\nMas falta o teste."), false);
  assert.equal(terminaEmAprovado("Não está APROVADO"), false);
  assert.equal(terminaEmAprovado(""), false);
});

test("abrir e dizer: volta 1, resume na 2, ficheiros numerados, só leitura e código 4 no fim das voltas", () => {
  const c = cenario();
  const aberto = abrir(c, "api", ["--subscricao", "conta-2", "--voltas", "2"]);
  assert.equal(aberto.codigo, 0, aberto.stderr);
  assert.equal(aberto.json.pasta_conta, c.conta2);

  const um = dizer(c, "api", "Fiz o endpoint e os testes passam.");
  assert.equal(um.codigo, 0, um.stderr);
  assert.equal(um.json.volta, 1);
  assert.equal(um.json.voltas, 2);
  assert.equal(um.json.aprovado, false);
  assert.equal(um.json.sessao, "0a1b2c3d-1111-2222-3333-444455556666");
  assert.match(um.json.resposta, /Falta o teste do caso vazio/);

  const pasta = join(c.trabalho, "par-api");
  for (const f of ["00-papel.md", "01-enviada.md", "01-resposta.md"]) assert.ok(existsSync(join(pasta, f)), f);
  assert.equal(readFileSync(join(pasta, "01-enviada.md"), "utf8"), "Fiz o endpoint e os testes passam.");

  const [primeira] = c.chamadas();
  assert.deepEqual(primeira.args.slice(primeira.args.indexOf("--permission-mode"), primeira.args.indexOf("--permission-mode") + 2), ["--permission-mode", "plan"]);
  assert.ok(!primeira.args.includes("--resume"));
  assert.equal(primeira.args[primeira.args.indexOf("--model") + 1], "opus");
  assert.equal(primeira.conta, c.conta2);
  assert.equal(primeira.chave, false);
  assert.equal(real(primeira.cwd), real(c.projeto));
  assert.match(primeira.pedido, /verificar o trabalho/);
  assert.match(primeira.pedido, /nunca ordens do utilizador/);

  const dois = dizer(c, "api", "Corrigi. APROVA-ME");
  assert.equal(dois.codigo, 0, dois.stderr);
  assert.equal(dois.json.volta, 2);
  assert.equal(dois.json.aprovado, true);
  const segunda = c.chamadas()[1];
  assert.equal(segunda.args[segunda.args.indexOf("--resume") + 1], "0a1b2c3d-1111-2222-3333-444455556666");
  assert.doesNotMatch(segunda.pedido, /O teu papel/);
  assert.match(segunda.pedido, /volta 2 de 2/);

  const tres = dizer(c, "api", "Mais uma.");
  assert.equal(tres.codigo, 4);
  assert.equal(c.chamadas().length, 2);
  const [par] = c.pares();
  assert.equal(par.estado, "sem voltas");
  assert.equal(par.aprovado, true);

  assert.equal(c.par(["fechar", "--trabalho", c.trabalho, "--nome", "api"]).json.estado, "fechado");
  assert.equal(dizer(c, "api", "Depois de fechado.").codigo, 2);
});

test("--pode-escrever passa a acceptEdits; a principal não muda de pasta nem leva a chave de API", () => {
  const c = cenario();
  abrir(c, "escreve", ["--pode-escrever"]);
  assert.equal(dizer(c, "escreve", "Corrige o teste.").codigo, 0);
  const [chamada] = c.chamadas();
  assert.equal(chamada.args[chamada.args.indexOf("--permission-mode") + 1], "acceptEdits");
  assert.equal(chamada.conta, null);
  assert.equal(chamada.chave, false);
});

test("o par diz ao portal que é um par, e de que sessão, para não aparecer como uma sessão solta", () => {
  const c = cenario();
  const dona = "0f1e2d3c-4b5a-4968-8778-695a4b3c2d1e";
  abrir(c, "comdona", ["--sessao", dona.toUpperCase()]);
  assert.equal(dizer(c, "comdona", "Verifica.").codigo, 0);
  abrir(c, "semdona", ["--sessao", "nao-e-um-uuid"]);
  assert.equal(dizer(c, "semdona", "Verifica.").codigo, 0);
  // Sem --sessao, vale o id que o Claude Code põe no ambiente da sessão que corre o script.
  abrir(c, "doambiente", [], "claude:opus");
  const ambiente = c.par(
    ["dizer", "--trabalho", c.trabalho, "--nome", "doambiente", "--texto-ficheiro", c.mensagem("Verifica.")],
    {},
  );
  assert.equal(ambiente.codigo, 0);
  const [com, sem] = c.chamadas();
  assert.equal(com.papel, "par");
  assert.equal(com.parDe, dona);
  assert.equal(sem.papel, "par");
  assert.equal(sem.parDe, null);
  const sozinho = c.par(
    ["abrir", "--trabalho", c.trabalho, "--nome", "comid", "--par", "claude:opus", "--forma", "verificar", "--pasta", c.projeto],
    { extra: { CLAUDE_CODE_SESSION_ID: dona } },
  );
  assert.equal(sozinho.codigo, 0);
  assert.equal(sozinho.json.par_de, dona);
});

test("sem quota: código 3 com a reposição e as alternativas, registo em pares.json e retoma depois", () => {
  const c = cenario();
  abrir(c, "rev");
  const r = dizer(c, "rev", "Revê isto.", { modo: "limite" });
  assert.equal(r.codigo, 3, r.stderr);
  assert.equal(r.json.subscricao, "principal");
  assert.equal(r.json.repoe_em, "2030-01-01T00:00:00.000Z");
  assert.deepEqual(r.json.alternativas, [{ id: "conta-2", nome: "Conta 2" }]);
  assert.ok(existsSync(join(c.trabalho, "par-rev", "01-saida-bruta.txt")));
  let [par] = c.pares();
  assert.equal(par.estado, "sem quota");
  assert.equal(par.volta, 0);
  assert.equal(par.sem_quota.repoe_em, "2030-01-01T00:00:00.000Z");

  const depois = dizer(c, "rev", "Revê isto.");
  assert.equal(depois.codigo, 0);
  assert.equal(depois.json.volta, 1);
  [par] = c.pares();
  assert.equal(par.estado, "aberto");
  assert.equal(par.sem_quota, null);
});

test("o par falha: código 1 e a volta não avança", () => {
  const c = cenario();
  abrir(c, "falha");
  const r = dizer(c, "falha", "Olá.", { modo: "erro" });
  assert.equal(r.codigo, 1);
  assert.match(r.json.detalhe, /API Error: 500/);
  const [par] = c.pares();
  assert.equal(par.volta, 0);
  assert.match(par.ultimo_erro.detalhe, /500/);
});

test("20 000 caracteres: mensagem maior recusada, resposta maior cortada", () => {
  const c = cenario();
  abrir(c, "grande");
  const grande = dizer(c, "grande", "a".repeat(20_001));
  assert.equal(grande.codigo, 2);
  assert.match(grande.stderr, /20000/);
  assert.equal(c.chamadas().length, 0);
  const longa = dizer(c, "grande", "Responde muito.", { modo: "longo" });
  assert.equal(longa.codigo, 0);
  assert.equal(longa.json.resposta.length, 20_000);
  assert.equal(longa.json.cortada, true);
  assert.equal(readFileSync(longa.json.ficheiro, "utf8").length, 25_000);
});

test("erros de uso: código 2", () => {
  const c = cenario();
  assert.equal(abrir(c, "x", ["--subscricao", "conta-9"]).codigo, 2);
  assert.equal(abrir(c, "Nome Mau").codigo, 2);
  assert.equal(abrir(c, "x", ["--voltas", "21"]).codigo, 2);
  assert.equal(c.par(["abrir", "--trabalho", c.trabalho, "--nome", "y", "--par", "gemini:pro", "--forma", "verificar", "--pasta", c.projeto]).codigo, 2);
  assert.equal(abrir(c, "x").codigo, 0);
  assert.equal(abrir(c, "x").codigo, 2);
  assert.equal(c.par(["dizer", "--trabalho", c.trabalho, "--nome", "nao-ha", "--texto-ficheiro", c.mensagem("a")]).codigo, 2);
  assert.equal(c.par(["apagar"]).codigo, 2);
});

test("pares de trabalhos diferentes não se tocam", () => {
  const c = cenario();
  const outro = join(c.raiz, "orquestracao", "t2");
  mkdirSync(outro);
  abrir(c, "api");
  assert.equal(c.par(["abrir", "--trabalho", outro, "--nome", "api", "--par", "claude:sonnet", "--forma", "consultar", "--pasta", c.projeto]).codigo, 0);
  dizer(c, "api", "Só no t1.");
  assert.equal(c.pares()[0].volta, 1);
  assert.equal(c.pares(outro)[0].volta, 0);
  assert.equal(c.pares(outro)[0].modelo, "sonnet");
  assert.ok(!existsSync(join(outro, "par-api")));
});

test("cmd.exe: recusa o que ele interpretaria", () => {
  assert.throws(() => prepararExecucao("C:\\a%PATH%\\claude.cmd", ["-p"], "win32"), /cmd.exe interpreta/);
  assert.throws(() => prepararExecucao("C:\\a\\claude.cmd", ["-p", "a b"], "win32"), /não pode ir/);
  const cmd = prepararExecucao("C:\\Pasta com espaço\\claude.cmd", ["-p", "--model", "opus"], "win32");
  assert.deepEqual(cmd.argumentos.slice(0, 3), ["/d", "/s", "/c"]);
  assert.equal(cmd.argumentos[3], '""C:\\Pasta com espaço\\claude.cmd" -p --model opus"');
  assert.equal(prepararExecucao("/x/falso.mjs", ["-p"], "linux").ficheiro, process.execPath);
});

test("cmd.exe: um .cmd com espaço e acento no caminho corre de ponta a ponta", { skip: process.platform !== "win32" || /[^\x20-\x7e]/.test(process.execPath) }, () => {
  const c = cenario();
  // O cmd.exe lê o .cmd na página de código da consola: o conteúdo fica em ASCII, e o acento só no caminho.
  copyFileSync(FALSO, join(c.raiz, "claude-falso.mjs"));
  const bin = join(c.raiz, "bin com espaço");
  mkdirSync(bin);
  const comando = join(bin, "claude.cmd");
  writeFileSync(comando, `@"${process.execPath}" "%~dp0..\\claude-falso.mjs" %*\r\n`);
  abrir(c, "cmd");
  const r = dizer(c, "cmd", "Pelo cmd.exe. APROVA-ME", { extra: { PAR_CLAUDE: comando } });
  assert.equal(r.codigo, 0, r.stderr);
  assert.equal(r.json.aprovado, true);
  assert.equal(c.chamadas()[0].args.join(" "), "-p --output-format stream-json --verbose --model opus --permission-mode plan");
});

test("retoma: troca de subscrição só em «Máxima» e só para uma com quota", () => {
  const agora = Date.parse("2030-01-01T00:00:00Z");
  const depois = "2030-01-01T03:00:00.000Z";
  const antes = "2029-12-31T20:00:00.000Z";
  const base = { subscricao: "principal", subscricoes: ["principal", "conta-2"] };

  assert.deepEqual(escolherSubscricao({}, { agora }), { id: "principal", trocar: false, sem_quota_ate: null, alternativa: null });
  assert.equal(escolherSubscricao({ ...base, sem_quota: { principal: antes } }, { agora }).sem_quota_ate, null);

  const maxima = escolherSubscricao({ ...base, autonomia: "Máxima", sem_quota: { principal: depois } }, { agora });
  assert.deepEqual(maxima, { id: "conta-2", trocar: true, sem_quota_ate: depois, alternativa: "conta-2" });

  const registar = escolherSubscricao({ ...base, autonomia: "Executar e registar", sem_quota: { principal: depois } }, { agora });
  assert.deepEqual(registar, { id: "principal", trocar: false, sem_quota_ate: depois, alternativa: "conta-2" });

  const ambas = escolherSubscricao({ ...base, autonomia: "Máxima", sem_quota: { principal: depois, "conta-2": depois } }, { agora });
  assert.equal(ambas.trocar, false);
  assert.equal(ambas.alternativa, null);

  const uso = { "conta-2": { cinco_horas: { used_percentage: 100, resets_at: agora / 1000 + 3600 } } };
  const pelaLinha = escolherSubscricao({ ...base, autonomia: "maxima", sem_quota: { principal: depois } }, { agora, uso });
  assert.equal(pelaLinha.trocar, false);

  // A que está em uso só se dá por gasta quando uma corrida parou nela, não pela linha de estado.
  const usoPrincipal = { principal: { cinco_horas: { used_percentage: 100, resets_at: agora / 1000 + 3600 } } };
  assert.equal(escolherSubscricao({ ...base, autonomia: "Máxima" }, { agora, uso: usoPrincipal }).sem_quota_ate, null);
});

// Outros fornecedores: Codex (plano do ChatGPT), modelos do Ollama pelo Codex e Mistral Vibe.

test("contas-ia.json: as contas do Codex não se misturam com as do Claude", () => {
  const c = cenario();
  assert.deepEqual(lerContasClaude(c.env), [{ id: "conta-2", nome: "Conta 2", pasta: c.conta2 }]);
  assert.deepEqual(lerContas("codex", c.env), [{ id: "chatgpt-2", nome: "ChatGPT 2", pasta: c.contaCodex }]);
  assert.deepEqual(resolverSubscricao(codex, { id: "chatgpt-2", env: c.env }), { id: "chatgpt-2", pasta: c.contaCodex });
  assert.throws(() => resolverSubscricao(codex, { id: "conta-2", env: c.env }), /registadas: principal, chatgpt-2/);
  assert.deepEqual(resolverSubscricao(vibe, { env: c.env }), { id: "principal", pasta: null });
  assert.throws(() => resolverSubscricao(vibe, { id: "outra", env: c.env }), /só tem uma conta/);
  assert.throws(() => resolverSubscricao(local, { pastaConta: c.raiz, env: c.env }), /só tem uma conta/);
});

test("argumentos do codex e do local: sandbox, resume antes do stdin e o servidor do Ollama", () => {
  assert.deepEqual(codex.argumentos({ modelo: "gpt-5.5" }), ["exec", "--json", "--skip-git-repo-check", "--sandbox", "read-only", "-m", "gpt-5.5", "-"]);
  const retomada = codex.argumentos({ modelo: "gpt-5.5", sessao: "019a2b3c-4d5e", soLeitura: false });
  assert.deepEqual(retomada.slice(3, 5), ["--sandbox", "workspace-write"]);
  assert.deepEqual(retomada.slice(-3), ["resume", "019a2b3c-4d5e", "-"]);
  assert.throws(() => codex.argumentos({ modelo: "gpt 5" }), /modelo inválido/);
  assert.throws(() => codex.argumentos({ modelo: "gpt-5.5", sessao: "a&b" }), /id de sessão inválido/);

  assert.deepEqual(local.argumentos({ modelo: "qwen3-8b-16k:latest" }).slice(-4), ["--oss", "--local-provider", "ollama", "-"]);
  const servidor = local.argumentos({ modelo: "qwen3-8b-16k:latest", servidor: "http://127.0.0.1:11435/v1" });
  assert.ok(!servidor.includes("--oss"));
  assert.ok(servidor.includes("model_providers.par_ollama.base_url=http://127.0.0.1:11435/v1"));
  assert.ok(servidor.includes("model_provider=par_ollama"));
  assert.throws(() => local.argumentos({ modelo: "qwen3-8b-16k:latest", servidor: "http://a b" }), /--servidor/);
  assert.equal(local.padraoModelo.test("qwen3-8b-16k"), false);
});

test("argumentos do vibe: em leitura só ler e pesquisar, em escrita accept-edits, o modelo só na sessão nova", () => {
  const primeira = vibe.argumentos({ modelo: "mistral-large-4-0", pastaVolta: "/t/01-exportacao" });
  assert.deepEqual(primeira, ["-p", "--output", "text", "--output-dir", "/t/01-exportacao", "--enabled-tools", "read_file", "--enabled-tools", "grep", "--model", "mistral-large-4-0"]);
  const seguinte = vibe.argumentos({ modelo: "mistral-large-4-0", sessao: "5e55a0b1-1111", soLeitura: false });
  assert.deepEqual(seguinte, ["-p", "--output", "text", "--approval-policy", "accept-edits", "--resume", "5e55a0b1-1111"]);
  assert.ok(!primeira.includes("--auto-approve") && !seguinte.includes("--auto-approve"));
});

test("ambiente do par: só a chave de que o fornecedor precisa, nunca a de outro", () => {
  const env = { PATH: "x", ANTHROPIC_API_KEY: "a", OPENAI_API_KEY: "o", CODEX_API_KEY: "c", MISTRAL_API_KEY: "m" };
  assert.deepEqual(ambienteDoPar(claude, env, null), { PATH: "x", RETOMA_SEM_INTERFACE: "1" });
  assert.deepEqual(ambienteDoPar(codex, env, "C:/contas/chatgpt-2"), { PATH: "x", RETOMA_SEM_INTERFACE: "1", CODEX_HOME: "C:/contas/chatgpt-2" });
  assert.deepEqual(ambienteDoPar(local, env, null), { PATH: "x", RETOMA_SEM_INTERFACE: "1" });
  assert.deepEqual(ambienteDoPar(vibe, env, null), { PATH: "x", RETOMA_SEM_INTERFACE: "1", MISTRAL_API_KEY: "m" });
  // O ambienteDaConta (o do retomar.mjs) continua a tirar só as do próprio fornecedor.
  assert.equal(ambienteDaConta(claude, env, null).OPENAI_API_KEY, "o");
});

test("leitura da saída do codex: resposta, erros pelo caminho, falha e limite", () => {
  const linhas = (...o) => o.map((x) => JSON.stringify(x)).join("\n");
  const inicio = [{ type: "thread.started", thread_id: "019a-0001-abcd" }, { type: "turn.started" }];
  const normal = codex.lerSaida(
    linhas(
      ...inicio,
      { type: "error", message: "Reconnecting... 1/5" },
      { type: "item.completed", item: { type: "error", message: "Model metadata not found" } },
      { type: "item.completed", item: { type: "agent_message", text: "Primeira." } },
      { type: "item.completed", item: { type: "agent_message", text: "Está certo." } },
      { type: "turn.completed", usage: {} },
    ),
    0,
  );
  assert.deepEqual(normal, { texto: "Está certo.", sessao: "019a-0001-abcd", limite: null, erro: null });

  const falha = codex.lerSaida(linhas(...inicio, { type: "turn.failed", error: { message: "request exceeds the available context size" } }), 1);
  assert.equal(falha.limite, null);
  assert.match(falha.erro, /available context size/);
  assert.equal(falha.sessao, "019a-0001-abcd");

  const semResposta = codex.lerSaida(linhas(...inicio, { type: "turn.completed", usage: {} }), 0);
  assert.match(semResposta.erro, /sem resposta/);

  const limite = codex.lerSaida(linhas(...inicio, { type: "turn.failed", error: { message: "You've hit your usage limit. Try again at 2030-01-01T09:00:00Z." } }), 1);
  assert.equal(limite.limite.repoe_em, "2030-01-01T09:00:00.000Z");
  assert.match(codex.lerSaida("", 1, "Error: OSS setup failed: No running Ollama server detected.").erro, /No running Ollama server/);
});

test("par codex: conta pelo CODEX_HOME, sem chaves, resume na volta 2 e o que o par consegue fazer", () => {
  const c = cenario();
  const aberto = abrir(c, "gpt", ["--subscricao", "chatgpt-2"], "codex:gpt-5.5");
  assert.equal(aberto.codigo, 0, aberto.stderr);
  assert.equal(aberto.json.pasta_conta, c.contaCodex);
  assert.equal(aberto.json.le_ficheiros, !WINDOWS);

  const um = dizer(c, "gpt", "Fiz o endpoint.");
  assert.equal(um.codigo, 0, um.stderr);
  assert.equal(um.json.sessao, "019a2b3c-4d5e-7f60-8a9b-0c1d2e3f4a5b");
  assert.match(um.json.resposta, /Falta o teste do caso vazio/);
  const [primeira] = c.chamadas();
  assert.deepEqual(primeira.args.slice(0, 7), ["exec", "--json", "--skip-git-repo-check", "--sandbox", "read-only", "-m", "gpt-5.5"]);
  assert.ok(!primeira.args.includes("resume"));
  assert.equal(primeira.conta, c.contaCodex);
  assert.deepEqual(primeira.chaves, []);
  assert.equal(primeira.sem_interface, "1");
  assert.equal(real(primeira.cwd), real(c.projeto));
  assert.match(primeira.pedido, /português de Portugal/);
  assert.match(primeira.pedido, WINDOWS ? /não consegues ler ficheiros/ : /lês os ficheiros com comandos de leitura/);

  const dois = dizer(c, "gpt", "Corrigi. APROVA-ME");
  assert.equal(dois.codigo, 0, dois.stderr);
  assert.equal(dois.json.aprovado, true);
  const segunda = c.chamadas()[1];
  assert.deepEqual(segunda.args.slice(-3), ["resume", "019a2b3c-4d5e-7f60-8a9b-0c1d2e3f4a5b", "-"]);
  assert.doesNotMatch(segunda.pedido, /O teu papel/);
});

test("par codex: falha com código 1 e limite com código 3, com as outras contas do Codex", () => {
  const c = cenario();
  abrir(c, "gpt", [], "codex:gpt-5.5");
  const falha = dizer(c, "gpt", "Olá.", { modo: "erro" });
  assert.equal(falha.codigo, 1);
  assert.match(falha.json.detalhe, /500 Internal Server Error/);
  const limite = dizer(c, "gpt", "Olá.", { modo: "limite" });
  assert.equal(limite.codigo, 3, limite.stderr);
  assert.equal(limite.json.repoe_em, null);
  assert.match(limite.json.mensagem, /usage limit/);
  assert.deepEqual(limite.json.alternativas, [{ id: "chatgpt-2", nome: "ChatGPT 2" }]);
  assert.ok(existsSync(join(c.trabalho, "par-gpt", "01-saida-bruta.txt")));
  assert.equal(c.pares()[0].volta, 0);
});

test("par local: modelo com etiqueta, --oss ou o servidor, sem conta nem chaves", () => {
  const c = cenario();
  assert.equal(abrir(c, "sem-etiqueta", [], "local:qwen3-8b-16k").codigo, 2);
  assert.equal(abrir(c, "conta", ["--subscricao", "conta-2"], "local:qwen3-8b-16k:latest").codigo, 2);
  assert.equal(abrir(c, "servidor-mau", ["--servidor", "ftp://casa"], "local:qwen3-8b-16k:latest").codigo, 2);
  assert.equal(abrir(c, "servidor-claude", ["--servidor", "http://127.0.0.1:11435"]).codigo, 2);

  assert.equal(abrir(c, "pc", [], "local:qwen3-8b-16k:latest").codigo, 0);
  const aqui = dizer(c, "pc", "Revê isto.");
  assert.equal(aqui.codigo, 0, aqui.stderr);
  const casa = abrir(c, "casa", ["--servidor", "http://127.0.0.1:11435/"], "local:qwen3-8b-16k:latest");
  assert.equal(casa.json.servidor, "http://127.0.0.1:11435");
  const la = dizer(c, "casa", "Revê isto.");
  assert.equal(la.codigo, 0, la.stderr);

  const [pc, servidor] = c.chamadas();
  assert.ok(pc.args.includes("--oss"));
  assert.equal(pc.args[pc.args.indexOf("-m") + 1], "qwen3-8b-16k:latest");
  assert.equal(pc.conta, null);
  assert.deepEqual(pc.chaves, []);
  assert.ok(servidor.args.includes("model_providers.par_ollama.base_url=http://127.0.0.1:11435/v1"));
});

test("par vibe: só a chave da Mistral, sessão do export.json, resume e só leitura", () => {
  const c = cenario();
  assert.equal(abrir(c, "eu", [], "vibe:mistral-large-4-0").json.le_ficheiros, true);
  const um = dizer(c, "eu", "Fiz o endpoint.");
  assert.equal(um.codigo, 0, um.stderr);
  assert.equal(um.json.sessao, "5e55a0b1-1111-2222-3333-444455556666");
  assert.ok(existsSync(join(c.trabalho, "par-eu", "01-exportacao", "export.json")));
  const [primeira] = c.chamadas();
  assert.deepEqual(primeira.chaves, ["MISTRAL_API_KEY"]);
  assert.equal(primeira.sem_interface, "1");
  assert.ok(primeira.args.includes("--enabled-tools"));
  assert.equal(primeira.args[primeira.args.indexOf("--output-dir") + 1], join(c.trabalho, "par-eu", "01-exportacao"));
  assert.match(primeira.pedido, /ferramentas de ler ficheiros e de pesquisar/);

  const dois = dizer(c, "eu", "Corrigi. APROVA-ME");
  assert.equal(dois.json.aprovado, true);
  const segunda = c.chamadas()[1];
  assert.equal(segunda.args[segunda.args.indexOf("--resume") + 1], "5e55a0b1-1111-2222-3333-444455556666");
  assert.ok(!segunda.args.includes("--model"));
});

test("par vibe: falha com código 1, limite com código 3 e sem alternativas", () => {
  const c = cenario();
  abrir(c, "eu", ["--pode-escrever"], "vibe:mistral-large-4-0");
  const falha = dizer(c, "eu", "Olá.", { modo: "erro" });
  assert.equal(falha.codigo, 1);
  assert.match(falha.json.detalhe, /API error 500/);
  const limite = dizer(c, "eu", "Olá.", { modo: "limite" });
  assert.equal(limite.codigo, 3, limite.stderr);
  assert.match(limite.json.mensagem, /Rate limit/);
  assert.deepEqual(limite.json.alternativas, []);
  const [chamada] = c.chamadas();
  assert.equal(chamada.args[chamada.args.indexOf("--approval-policy") + 1], "accept-edits");
});

test("instruções: as do Claude ficam como estavam; o codex no Windows não lê ficheiros", () => {
  const base = { pasta: "/p", voltas: 5, forma: "verificar", pode_escrever: false };
  const doClaude = instrucoes({ ...base, fornecedor: "claude" });
  assert.match(doClaude, /Estás em modo só de leitura: lês os ficheiros, mas não alteras nada\./);
  assert.doesNotMatch(doClaude, /português de Portugal/);
  assert.equal(codex.capacidades({ plataforma: "win32", soLeitura: true }).leFicheiros, false);
  assert.equal(codex.capacidades({ plataforma: "linux", soLeitura: true }).leFicheiros, true);
  assert.match(codex.capacidades({ plataforma: "win32", soLeitura: true }).linha, /pede o que faltar/);
});

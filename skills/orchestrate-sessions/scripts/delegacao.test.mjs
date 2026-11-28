import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";
import { NIVEIS, perguntasDaDelegacao } from "./delegacao.mjs";
import { inventarioDoAgente, normalizarInventario, obterInventario } from "./inventario.mjs";
import { opcoesDoInventario, perguntasDoInventario } from "./perguntas-inventario.mjs";

const modelo = (alteracoes = {}) => ({
  fornecedor: "codex",
  conta: "principal",
  ligacao: "Principal",
  acesso: "subscricao",
  modelo: "gpt-5.2",
  estado: "disponivel",
  capacidades: ["manual", "delegar", "planeador", "executor", "verificador", "steer"],
  ...alteracoes,
});

const inventario = (modelos, portal = { estado: "ligado", maquina: "PC", nome: "PC" }) => ({
  versao: 1, modelos, portal, origem: portal.estado === "ligado" ? "ligacoes" : "local",
});

function temporario(t) {
  const pasta = mkdtempSync(join(tmpdir(), "cid-inventario-"));
  t.after(() => rmSync(pasta, { recursive: true, force: true }));
  return pasta;
}

test("o agente conhecido fornece inventário sem alterar identificadores ou copiar metadados fora do contrato", (t) => {
  const agente = join(temporario(t), "agente.mjs");
  writeFileSync(agente, "");
  const dados = inventario([
    modelo(),
    modelo({ fornecedor: "outro-fornecedor", conta: "dev", ligacao: "Desenvolvimento", acesso: "api", modelo: "modelo-v1", campo_extra: "fora do contrato" }),
    { fornecedor: "sem-modelo" },
  ]);
  const resultado = inventarioDoAgente({
    caminho: agente,
    soLocal: true,
    executar: (ficheiro, args, opcoes) => {
      assert.equal(ficheiro, process.execPath);
      assert.deepEqual(args, [agente, "orquestracao", "inventario", "--local"]);
      assert.equal(opcoes.windowsHide, true);
      return JSON.stringify(dados);
    },
  });
  assert.equal(resultado.inventario.modelos.length, 2);
  assert.equal(resultado.inventario.modelos[1].modelo, "modelo-v1");
  assert.equal(resultado.inventario.modelos[1].campo_extra, undefined);
  assert.equal(resultado.estado, "ligado");
  assert.equal(normalizarInventario({ ...dados, versao: 2 }), null);
});

test("o percurso local mostra perfis por verificar e deteta os modelos Ollama no loopback", async (t) => {
  const pasta = temporario(t);
  const programa = join(pasta, "codex.mjs");
  writeFileSync(programa, "");
  writeFileSync(join(pasta, "contas-ia.json"), JSON.stringify([
    { fornecedor: "codex", id: "trabalho", nome: "Trabalho", pasta },
  ]));
  const resultado = await obterInventario({
    env: {
      REMOTO_DIR: pasta, PAR_CODEX: programa, PAR_VIBE: programa,
      PAR_CLAUDE: join(pasta, "ausente.mjs"),
    },
    pedir: async (url, opcoes) => {
      assert.equal(url, "http://127.0.0.1:11434/api/tags");
      assert.equal(opcoes.redirect, "error");
      return { ok: true, json: async () => ({ models: [null, { name: "qwen3:8b" }] }) };
    },
  });
  assert.equal(resultado.origem, "local");
  assert.equal(resultado.portal.estado, "ausente");
  assert.deepEqual(resultado.modelos.map(({ fornecedor, conta, acesso, modelo, estado }) => [fornecedor, conta, acesso, modelo, estado]), [
    ["codex", "principal", "subscricao", null, "por-verificar"],
    ["codex", "trabalho", "subscricao", null, "por-verificar"],
    ["vibe", "principal", "api", null, "por-verificar"],
    ["ollama", "local", "local", "qwen3:8b", "disponivel"],
  ]);
});

test("a confirmação mostra todos os modelos e anuncia o plano antes das opções de papéis", () => {
  const dados = inventario([
    modelo(),
    modelo({ fornecedor: "outro-fornecedor", conta: "dev", ligacao: "Desenvolvimento", acesso: "api", modelo: "modelo-v1" }),
    modelo({ fornecedor: "ollama", conta: "local", ligacao: "Ollama", acesso: "local", modelo: "qwen3:8b", capacidades: ["manual", "verificador"] }),
    modelo({ fornecedor: "claude", conta: "equipa", modelo: null, estado: "por-verificar" }),
    modelo({ conta: "pro", modelo: "gpt-5.2", estado: "indisponivel", motivo: "Ligação por validar." }),
  ]);
  const perguntas = perguntasDoInventario(dados, {
    permitidos: ["codex", "ollama", "claude"],
    perguntaAutonomia: perguntasDaDelegacao([], null),
  });
  const [confirmar, autonomia, papeis, modos] = perguntas.perguntas;
  assert.deepEqual([confirmar.id, autonomia.id, papeis.id, modos.id],
    ["confirmar_modelos", "autonomia", "papeis_modelos", "abertura_sessoes"]);
  assert.match(confirmar.mensagem, /Ligações, na máquina PC,/);
  for (const { modelo: nome } of perguntas.modelos.filter(({ modelo: nome }) => nome))
    assert.ok(confirmar.mensagem.includes(nome));
  assert.match(confirmar.mensagem, /vou preparar um plano para a tua aprovação/);
  assert.match(confirmar.mensagem, /política de dados do projeto/);
  assert.match(confirmar.mensagem, /Codex, Principal \(subscrição\): gpt-5\.2, indisponível\. Ligação por validar\./);
  assert.match(confirmar.mensagem, /Claude, Principal \(subscrição\): modelos por verificar\. Confirma o modelo/);
  assert.match(confirmar.mensagem, /- Ollama \(modelo local\): qwen3:8b, disponível\./);
  assert.doesNotMatch(confirmar.mensagem, /\u00B7/);
  assert.equal(papeis.modelos.length, 2);
  assert.deepEqual(papeis.modelos[1].papeis.map(({ id }) => id), ["verificador"]);
  assert.deepEqual(modos.opcoes.map(({ id }) => id), ["manual", "delegada", "mista"]);
  assert.equal(papeis.opcoes.some(({ id }) => id === "planear-em-conjunto"), false);
  assert.deepEqual(autonomia.opcoes, NIVEIS);
});

test("os modelos da mesma ligação ficam numa linha, e o portal indisponível diz porquê", async () => {
  const dados = inventario([
    modelo({ fornecedor: "claude", modelo: "sonnet" }),
    modelo({ fornecedor: "claude", modelo: "haiku" }),
    modelo({ fornecedor: "claude", modelo: "opus" }),
    modelo({ fornecedor: "codex", conta: "api", ligacao: "OpenAI API", acesso: "api", modelo: null, estado: "indisponivel", motivo: "Chave por configurar." }),
  ], { estado: "indisponivel", maquina: "6f1c2c1e-0000-4000-8000-000000000000", motivo: "O agente está parado." });
  const resultado = await obterInventario({ lerAgente: () => ({ agente: null, inventario: normalizarInventario(dados) }) });
  const { mensagem } = perguntasDoInventario(resultado, { permitidos: ["claude", "codex"] }).perguntas[0];
  assert.match(mensagem, /^Não consegui usar Ligações\. O agente está parado\. Podes verificar a ligação e atualizar a lista\.\nConsultei a configuração deste PC/);
  assert.match(mensagem, /- Claude, Principal \(subscrição\): sonnet, haiku e opus, disponíveis\./);
  assert.match(mensagem, /- Codex, OpenAI API \(chave de API\): indisponível\. Chave por configurar\./);
  assert.equal(mensagem.split("\n").filter((l) => l.startsWith("- ")).length, 2);
  assert.doesNotMatch(mensagem, /6f1c2c1e/);
});

test("dois modelos da mesma conta podem planear, e a autonomia explícita fica disponível na resposta", () => {
  const dados = inventario([modelo(), modelo({ modelo: "gpt-5" })]);
  const perguntas = perguntasDoInventario(dados, {
    permitidos: ["codex"],
    nivel: NIVEIS[3],
    perguntaAutonomia: perguntasDaDelegacao([], "Máxima"),
  });
  const papeis = perguntas.perguntas.find(({ id }) => id === "papeis_modelos");
  assert.notEqual(papeis.modelos[0].id, papeis.modelos[1].id);
  assert.ok(papeis.opcoes.some(({ id }) => id === "planear-em-conjunto"));
  assert.equal(perguntas.perguntas.some(({ id }) => id === "autonomia"), false);
  assert.equal(perguntas.autonomia.nome, "Máxima");
});

test("um modelo manual confirmado continua sujeito à política de dados e preserva estados verificados pelo agente", async () => {
  const opcoes = opcoesDoInventario(["--local", "--modelo-manual", "claude", "principal", "subscricao", "sonnet"]);
  const dados = inventario([
    modelo({ fornecedor: "claude", modelo: "sonnet", estado: "indisponivel" }),
    modelo({ fornecedor: "claude", modelo: null, estado: "por-verificar" }),
  ], { estado: "indisponivel" });
  const resultado = await obterInventario({
    ...opcoes,
    lerAgente: () => ({ agente: null, inventario: dados }),
  });
  const perguntas = perguntasDoInventario(resultado);
  assert.equal(resultado.modelos.length, 2);
  assert.equal(resultado.modelos[0].estado, "indisponivel");
  assert.equal(perguntas.perguntas.some(({ id }) => id === "papeis_modelos"), false);
  assert.match(perguntas.perguntas[0].mensagem, /portal está indisponível/);
  assert.throws(() => opcoesDoInventario(["--modelo-manual", "claude", "pessoal", "api", "conteúdo inválido"]));
});

test("o comando mantém compatibilidade com a seleção anterior por conta", (t) => {
  const destino = fileURLToPath(new URL("./delegacao.mjs", import.meta.url));
  const resultado = spawnSync(process.execPath, [destino, "claude", "codex"], {
    encoding: "utf8", env: { ...process.env, REMOTO_DIR: temporario(t), CID_AUTONOMIA: "Máxima" },
  });
  assert.equal(resultado.status, 0, resultado.stderr);
  const [pergunta] = JSON.parse(resultado.stdout);
  assert.equal(pergunta.id, "papeis_contas");
  assert.deepEqual(pergunta.contas.map(({ fornecedor }) => fornecedor), ["claude", "codex"]);
});

test("o comando usa o inventário JSON de um agente com um único modelo e mostra os respetivos papéis", (t) => {
  const destino = fileURLToPath(new URL("./delegacao.mjs", import.meta.url));
  const agente = join(temporario(t), "agente.mjs");
  const dados = inventario([modelo({ fornecedor: "novo", modelo: "modelo-v1", capacidades: ["manual", "executor"] })]);
  writeFileSync(agente, `console.log(JSON.stringify(${JSON.stringify(dados)}));`);
  const resultado = spawnSync(process.execPath, [destino, "--inventario", "--agente", agente, "--permitir", "novo"], {
    encoding: "utf8",
  });
  assert.equal(resultado.status, 0, resultado.stderr);
  const { agente: caminho, perguntas } = JSON.parse(resultado.stdout);
  const papeis = perguntas.find(({ id }) => id === "papeis_modelos");
  const abertura = perguntas.find(({ id }) => id === "abertura_sessoes");
  assert.equal(caminho, agente);
  assert.deepEqual(papeis.modelos[0].papeis.map(({ id }) => id), ["executor"]);
  assert.deepEqual(abertura.opcoes.map(({ id }) => id), ["manual"]);
});

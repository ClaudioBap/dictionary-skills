#!/usr/bin/env node
// Um codex a fingir, para os testes do par.mjs (pares codex: e local:). O que faz escolhe-se em FALSO_MODO: normal
// (responde), erro (falha) ou limite (pára por limite de uso). Cada chamada acrescenta uma linha a FALSO_REGISTO com os
// argumentos, a pasta, a conta, as chaves e os nomes das variáveis que lhe chegaram e o pedido. Os eventos seguem os de
// `codex exec --json` vistos no Codex 0.172.0; o texto do limite segue relatos da comunidade (não confirmado).

import { appendFileSync, readFileSync } from "node:fs";

const CHAVES = ["ANTHROPIC_API_KEY", "CLAUDE_CODE_OAUTH_TOKEN", "OPENAI_API_KEY", "CODEX_API_KEY", "CODEX_ACCESS_TOKEN", "MISTRAL_API_KEY"];
const args = process.argv.slice(2);
const pedido = readFileSync(0, "utf8");
const modo = process.env.FALSO_MODO ?? "normal";
if (process.env.FALSO_REGISTO) {
  const chamada = {
    args,
    cwd: process.cwd(),
    conta: process.env.CODEX_HOME ?? null,
    chaves: CHAVES.filter((c) => c in process.env),
    variaveis: Object.keys(process.env),
    sem_interface: process.env.RETOMA_SEM_INTERFACE ?? null,
    pedido,
  };
  appendFileSync(process.env.FALSO_REGISTO, JSON.stringify(chamada) + "\n");
}

const i = args.indexOf("resume");
const thread = i >= 0 ? args[i + 1] : "019a2b3c-4d5e-7f60-8a9b-0c1d2e3f4a5b";
const evento = (o) => process.stdout.write(JSON.stringify(o) + "\n");
evento({ type: "thread.started", thread_id: thread });
evento({ type: "turn.started" });

if (modo === "limite") {
  const mensagem = "You've hit your usage limit. Upgrade to Pro or try again at Nov 28th, 2030 3:45 PM.";
  evento({ type: "error", message: mensagem });
  evento({ type: "turn.failed", error: { message: mensagem } });
  process.exit(1);
}
if (modo === "erro") {
  evento({ type: "error", message: "Reconnecting... 1/5 (stream disconnected before completion)" });
  evento({ type: "turn.failed", error: { message: "unexpected status 500 Internal Server Error" } });
  process.exit(1);
}

evento({ type: "item.completed", item: { id: "item_0", type: "error", message: "Model metadata for `x` not found. Defaulting to fallback metadata." } });
evento({ type: "item.completed", item: { id: "item_1", type: "reasoning", text: "A pensar." } });
evento({ type: "item.completed", item: { id: "item_2", type: "agent_message", text: "Primeira parte, que não conta." } });
const texto = `Li ${pedido.length} caracteres na sessão ${thread}.\n\n` + (pedido.includes("APROVA-ME") ? "APROVADO" : "Falta o teste do caso vazio.");
evento({ type: "item.completed", item: { id: "item_3", type: "agent_message", text: texto } });
evento({ type: "turn.completed", usage: { input_tokens: 100, cached_input_tokens: 0, output_tokens: 20 } });

#!/usr/bin/env node
// Um claude a fingir, para os testes do par.mjs. O que faz escolhe-se em CLAUDE_FALSO_MODO: normal (responde), erro
// (falha), limite (pára por limite de uso) ou longo (resposta acima do máximo). Cada chamada acrescenta uma linha a
// CLAUDE_FALSO_REGISTO com os argumentos, a pasta, a conta, se havia chave da API, os nomes das variáveis que lhe
// chegaram e o pedido.

import { appendFileSync, readFileSync } from "node:fs";

const args = process.argv.slice(2);
const pedido = readFileSync(0, "utf8");
const modo = process.env.CLAUDE_FALSO_MODO ?? "normal";
if (process.env.CLAUDE_FALSO_REGISTO) {
  const chamada = {
    args,
    cwd: process.cwd(),
    conta: process.env.CLAUDE_CONFIG_DIR ?? null,
    chave: "ANTHROPIC_API_KEY" in process.env,
    papel: process.env.CID_PAPEL ?? null,
    parDe: process.env.CID_PAR_DE ?? null,
    variaveis: Object.keys(process.env),
    pedido,
  };
  appendFileSync(process.env.CLAUDE_FALSO_REGISTO, JSON.stringify(chamada) + "\n");
}

const i = args.indexOf("--resume");
const sessao = i >= 0 ? args[i + 1] : "0a1b2c3d-1111-2222-3333-444455556666";
const evento = (o) => process.stdout.write(JSON.stringify(o) + "\n");
evento({ type: "system", subtype: "init", session_id: sessao, model: args[args.indexOf("--model") + 1] });

if (modo === "limite") {
  evento({ type: "result", subtype: "success", is_error: true, result: "Claude AI usage limit reached|1893456000", session_id: sessao });
  process.exit(1);
}
if (modo === "erro") {
  evento({ type: "result", subtype: "error_during_execution", is_error: true, result: "API Error: 500 erro interno", session_id: sessao });
  process.exit(1);
}

const texto =
  modo === "longo"
    ? "x".repeat(25_000)
    : `Li ${pedido.length} caracteres.\n\n` + (pedido.includes("APROVA-ME") ? "**APROVADO**" : "Falta o teste do caso vazio.");
evento({ type: "assistant", message: { content: [{ type: "text", text: texto }] }, session_id: sessao });
evento({ type: "result", subtype: "success", is_error: false, result: texto, session_id: sessao });

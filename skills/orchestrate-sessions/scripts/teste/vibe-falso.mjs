#!/usr/bin/env node
// Um vibe a fingir, para os testes do par.mjs. O que faz escolhe-se em FALSO_MODO: normal (responde), erro (falha a
// API) ou limite (pára por limite de uso). Escreve o export.json na pasta de --output-dir, como o Mistral Vibe 3.1.5, e
// acrescenta uma linha a FALSO_REGISTO com os argumentos, a pasta, as chaves que lhe chegaram e o pedido. O texto do
// limite é inventado: a forma real não foi vista (não confirmado).

import { appendFileSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const CHAVES = ["ANTHROPIC_API_KEY", "CLAUDE_CODE_OAUTH_TOKEN", "OPENAI_API_KEY", "CODEX_API_KEY", "CODEX_ACCESS_TOKEN", "MISTRAL_API_KEY"];
const args = process.argv.slice(2);
const pedido = readFileSync(0, "utf8");
const modo = process.env.FALSO_MODO ?? "normal";
if (process.env.FALSO_REGISTO) {
  const chamada = {
    args,
    cwd: process.cwd(),
    chaves: CHAVES.filter((c) => c in process.env),
    sem_interface: process.env.RETOMA_SEM_INTERFACE ?? null,
    pedido,
  };
  appendFileSync(process.env.FALSO_REGISTO, JSON.stringify(chamada) + "\n");
}

const i = args.indexOf("--resume");
const sessao = i >= 0 ? args[i + 1] : "5e55a0b1-1111-2222-3333-444455556666";
const pasta = args.includes("--output-dir") ? args[args.indexOf("--output-dir") + 1] : null;
const exportar = (outcome, error) => {
  if (!pasta) return;
  mkdirSync(pasta, { recursive: true });
  writeFileSync(join(pasta, "export.json"), JSON.stringify({ outcome, stop_reason: null, error, session_id: sessao, schema_version: 1, vibe_version: "3.1.5" }, null, 2));
};

if (modo === "limite") {
  exportar("infrastructure_failure", { message: "Rate limit exceeded: monthly Vibe Code allowance reached", code: "429" });
  process.stderr.write("Error: Rate limit exceeded\n");
  process.exit(2);
}
if (modo === "erro") {
  exportar("infrastructure_failure", { message: "API error 500: internal server error", code: null });
  process.stderr.write("Error: API error 500\n");
  process.exit(2);
}

exportar("finished", null);
process.stdout.write(`Li ${pedido.length} caracteres na sessão ${sessao}.\n\n` + (pedido.includes("APROVA-ME") ? "APROVADO\n" : "Falta o teste do caso vazio.\n"));

---
id: node/logging-e-observabilidade
titulo: "Logging e observabilidade"
seccao: "Boas práticas de Node.js"
paginas: []
fonte: "Fontes oficiais (documentação do Node.js, npm, OWASP, Docker e projetos citados), ligadas em cada ponto; consultadas a 2026-11-03. Pontos marcados «sem fonte oficial» são convenções escritas pelo assistente. Não vem do PDF."
verificado_em: 2026-11-03
---

# Logging e observabilidade

**Resumo:** Logger estruturado com campos sensíveis ocultos, identificador de pedido com `AsyncLocalStorage` e OpenTelemetry carregado antes da aplicação.

## Conteúdo

- Logger estruturado em JSON, por exemplo pino; ocultar campos sensíveis com a opção `redact`. — [pino](https://github.com/pinojs/pino/blob/main/README.md), [pino: redaction](https://github.com/pinojs/pino/blob/main/docs/redaction.md)
- **Utilidade:** propagar o identificador de pedido com `AsyncLocalStorage` (Stable). — [nodejs.org/api/async_context.html](https://nodejs.org/api/async_context.html)
- Traces e métricas com OpenTelemetry (Stable; logs ainda em desenvolvimento), carregado antes do código com `node --import`. — [opentelemetry.io: JS](https://opentelemetry.io/docs/languages/js/), [opentelemetry.io: Node.js](https://opentelemetry.io/docs/languages/js/getting-started/nodejs/)
- Não registar tokens, passwords nem dados pessoais sensíveis. — [OWASP Logging Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Logging_Cheat_Sheet.html)
- Usar o logger da aplicação em vez de `console.*`. *(sem fonte oficial)*

**Para uma skill:** logs estruturados com identificador de pedido e sem dados sensíveis.

## Ver também

- [Observabilidade e alertas](../seguranca/observabilidade-e-alertas.md) (Segurança)

Fonte: Fontes oficiais (documentação do Node.js, npm, OWASP, Docker e projetos citados), ligadas em cada ponto; consultadas a 2026-11-03. Pontos marcados «sem fonte oficial» são convenções escritas pelo assistente. Não vem do PDF.

---
id: node/logging-e-observabilidade
titulo: "Logging e observabilidade"
seccao: "Boas práticas de Node.js"
paginas: []
fonte: "Conhecimento do assistente (Claude), sem fonte verificada; escrito a 2026-11-03 a pedido do utilizador. Não vem do PDF."
verificado_em: 2026-11-03
---

# Logging e observabilidade

**Resumo:** Logger estruturado com identificador de pedido, sem `console.log` em produção nem segredos.

## Conteúdo

- Logger estruturado em JSON (ex.: pino), com níveis; nada de `console.log` de diagnóstico em produção.
- Identificador de pedido em cada linha de log; métricas e traces com OpenTelemetry.
- Não registar segredos, tokens nem dados pessoais.

**Para uma skill:** logs estruturados com identificador de pedido e sem dados sensíveis.

## Ver também

- [Observabilidade e alertas](../seguranca/observabilidade-e-alertas.md) (Segurança)

Fonte: Conhecimento do assistente (Claude), sem fonte verificada; escrito a 2026-11-03 a pedido do utilizador. Não vem do PDF.

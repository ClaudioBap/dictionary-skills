---
id: ia/prompt-engineering-e-saida-estruturada
titulo: "Prompt engineering e saída estruturada"
seccao: "Construir com IA (Claude e Anthropic)"
paginas: [67]
fonte: Dicionario-Boas-Praticas.pdf
verificado_em: 2026-11-03
fontes_oficiais_consultadas_em: 2026-11-04
---

# Prompt engineering e saída estruturada

**Resumo:** Instruções claras com estrutura, e saída estruturada validada por esquema para JSON.

## Conteúdo

- Instruções claras, exemplos, e estrutura (secções, delimitadores) em vez de prompts longos e prescritivos de mais (os modelos novos pioram com excesso de regras).
- Para JSON fiável, usar saída estruturada (`output_config.format`, ou `messages.parse()` que valida contra o esquema), não truques de prefixo.

**Para uma skill:** quando se quer JSON, usa-se saída estruturada validada por esquema, não parsing frágil de texto.

## Fontes oficiais

*Ligações externas que apoiam esta entrada, consultadas a 2026-11-04. Não alteram o texto acima.*

- [Structured outputs](https://platform.claude.com/docs/en/build-with-claude/structured-outputs) — `output_config.format` com JSON schema; `messages.parse()` valida contra o esquema
- [Prompting best practices](https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices) — clareza, exemplos, XML; linguagem agressiva leva a sobre-acionamento em modelos novos

> **Nota (fonte oficial):** `messages.parse()` é um helper do SDK, não um parâmetro da API; o antigo `output_format` está depreciado.

Fonte: pág. 67 (Dicionario-Boas-Praticas.pdf)

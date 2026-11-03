---
id: ia/prompt-engineering-e-saida-estruturada
titulo: "Prompt engineering e saída estruturada"
seccao: "Construir com IA (Claude e Anthropic)"
paginas: [67]
fonte: Dicionario-Boas-Praticas.pdf
verificado_em: 2026-11-03
---

# Prompt engineering e saída estruturada

**Resumo:** Instruções claras com estrutura, e saída estruturada validada por esquema para JSON.

## Conteúdo

- Instruções claras, exemplos, e estrutura (secções, delimitadores) em vez de prompts longos e prescritivos de mais (os modelos novos pioram com excesso de regras).
- Para JSON fiável, usar saída estruturada (`output_config.format`, ou `messages.parse()` que valida contra o esquema), não truques de prefixo.

**Para uma skill:** quando se quer JSON, usa-se saída estruturada validada por esquema, não parsing frágil de texto.

Fonte: pág. 67 (Dicionario-Boas-Praticas.pdf)

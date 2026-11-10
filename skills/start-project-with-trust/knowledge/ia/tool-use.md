---
id: ia/tool-use
titulo: "Tool use (ferramentas e function calling)"
seccao: "Construir com IA"
paginas: [67]
fonte: Dicionario-Boas-Praticas.pdf
verificado_em: 2026-11-03
fontes_oficiais_consultadas_em: 2026-11-04
---

# Tool use (ferramentas e function calling)

**Resumo:** Ferramentas que deixam o modelo agir, com esquema estrito e erros devolvidos marcados.

## Conteúdo

- As ferramentas que defines deixam o modelo agir (chamar funções tuas); `strict: true` garante argumentos válidos ao esquema; chamadas paralelas por omissão (devolver todos os resultados numa só mensagem).
- Há ferramentas do lado do servidor (pesquisa web, execução de código) que correm na infraestrutura da Anthropic.

**Para uma skill:** cada ferramenta tem esquema estrito e os resultados de erro voltam marcados, não se perdem.

## Fontes oficiais

*Ligações externas que apoiam esta entrada, consultadas a 2026-11-04. Não alteram o texto acima.*

- [Tool use with Claude](https://platform.claude.com/docs/en/agents-and-tools/tool-use/overview) — ferramentas cliente vs servidor (pesquisa web, execução de código na Anthropic); `strict: true`
- [Handle tool calls](https://platform.claude.com/docs/en/agents-and-tools/tool-use/handle-tool-calls) — erros devolvidos com `is_error: true` no `tool_result`
- [Parallel tool use](https://platform.claude.com/docs/en/agents-and-tools/tool-use/parallel-tool-use) — paralelas por omissão; todos os resultados numa só mensagem do utilizador

Fonte: pág. 67 (Dicionario-Boas-Praticas.pdf)

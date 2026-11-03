---
id: ia/tool-use
titulo: "Tool use (ferramentas e function calling)"
seccao: "Construir com IA (Claude e Anthropic)"
paginas: [67]
fonte: Dicionario-Boas-Praticas.pdf
verificado_em: 2026-11-03
---

# Tool use (ferramentas e function calling)

**Resumo:** Ferramentas que deixam o modelo agir, com esquema estrito e erros devolvidos marcados.

## Conteúdo

- As ferramentas que defines deixam o modelo agir (chamar funções tuas); `strict: true` garante argumentos válidos ao esquema; chamadas paralelas por omissão (devolver todos os resultados numa só mensagem).
- Há ferramentas do lado do servidor (pesquisa web, execução de código) que correm na infraestrutura da Anthropic.

**Para uma skill:** cada ferramenta tem esquema estrito e os resultados de erro voltam marcados, não se perdem.

Fonte: pág. 67 (Dicionario-Boas-Praticas.pdf)

---
id: csharp/excecoes
titulo: "Exceções"
seccao: "Boas práticas de C#"
paginas: [39]
fonte: Dicionario-Boas-Praticas.pdf
verificado_em: 2026-11-03
---

# Exceções

**Resumo:** Apanhar o mais específico, nunca `catch` vazio, relançar com `throw;`.

## Conteúdo

- Apanhar o mais específico; nunca `catch` vazio; relançar com `throw;` (não `throw ex;`).
- Exceções para o excecional, não para o fluxo normal; mensagens úteis.

**Para uma skill:** nenhum `catch` que engole o erro; `throw;` preserva o stack.

Fonte: pág. 39 (Dicionario-Boas-Praticas.pdf)

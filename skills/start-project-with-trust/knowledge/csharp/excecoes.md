---
id: csharp/excecoes
titulo: "Exceções"
seccao: "Boas práticas de C#"
paginas: [39]
fonte: Dicionario-Boas-Praticas.pdf
verificado_em: 2026-11-03
fontes_oficiais_consultadas_em: 2026-11-04
---

# Exceções

**Resumo:** Apanhar o mais específico, nunca `catch` vazio, relançar com `throw;`.

## Conteúdo

- Apanhar o mais específico; nunca `catch` vazio; relançar com `throw;` (não `throw ex;`).
- Exceções para o excecional, não para o fluxo normal; mensagens úteis.

**Para uma skill:** nenhum `catch` que engole o erro; `throw;` preserva o stack.

## Fontes oficiais

*Ligações externas que apoiam esta entrada, consultadas a 2026-11-04. Não alteram o texto acima.*

- [Best practices for exceptions](https://learn.microsoft.com/en-us/dotnet/standard/exceptions/best-practices-for-exceptions) — `throw;` preserva stack; não usar exceções em fluxo normal
- [.NET Coding Conventions](https://learn.microsoft.com/en-us/dotnet/csharp/fundamentals/coding-style/coding-conventions) — apanhar só o que se trata; evitar `catch (Exception)` genérico

Fonte: pág. 39 (Dicionario-Boas-Praticas.pdf)

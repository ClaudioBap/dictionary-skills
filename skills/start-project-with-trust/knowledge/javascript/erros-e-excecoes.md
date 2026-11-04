---
id: javascript/erros-e-excecoes
titulo: "Erros e exceções"
seccao: "Boas práticas de JavaScript"
paginas: []
fonte: "Fontes oficiais (MDN, TypeScript, ESLint, Prettier, web.dev, OWASP, W3C e documentação das ferramentas citadas), ligadas em cada ponto; consultadas a 2026-11-03. Pontos marcados «sem fonte oficial» são convenções escritas pelo assistente. Não vem do PDF."
verificado_em: 2026-11-03
---

# Erros e exceções

**Resumo:** Lançar sempre `Error` com `cause`, só apanhar o recuperável, nunca `catch` vazio, e mostrar ao utilizador uma resposta genérica com o detalhe no log.

## Conteúdo

- Lançar sempre um `Error` ou subclasse (regra `no-throw-literal`); encadear com `new Error(msg, { cause })` (Baseline Widely available). — [MDN: throw](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/throw), [MDN: Error.cause](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error/cause), [eslint.org: no-throw-literal](https://eslint.org/docs/latest/rules/no-throw-literal)
- Só apanhar erros recuperáveis; nenhum `catch` vazio (regra `no-empty`); o resto propaga-se. — [MDN: guia de estilo](https://developer.mozilla.org/en-US/docs/MDN/Writing_guidelines/Code_style_guide/JavaScript), [eslint.org: no-empty](https://eslint.org/docs/latest/rules/no-empty)
- **Utilidade:** classes de erro próprias (`class MyError extends Error`) para distinguir com `instanceof`, e distinguir erros pela `cause`, não pelo texto da mensagem. — [MDN: Error](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error)
- Ao utilizador, uma resposta genérica, com sugestão de correção quando se conhece; o detalhe vai para o log. — [OWASP Error Handling](https://cheatsheetseries.owasp.org/cheatsheets/Error_Handling_Cheat_Sheet.html), [W3C WCAG 2.2: Error Suggestion](https://www.w3.org/WAI/WCAG22/Understanding/error-suggestion.html)

**Para uma skill:** nenhum `catch` engole o erro; os erros têm mensagem e causa.

## Ver também

- [Estados, erros e resiliência na UI](../design/estados-erros-e-resiliencia-na-ui.md) (Design e experiência de utilizador)

Fonte: Fontes oficiais (MDN, TypeScript, ESLint, Prettier, web.dev, OWASP, W3C e documentação das ferramentas citadas), ligadas em cada ponto; consultadas a 2026-11-03. Pontos marcados «sem fonte oficial» são convenções escritas pelo assistente. Não vem do PDF.

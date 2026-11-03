---
id: javascript/estilo-e-formatacao
titulo: "Estilo e formatação"
seccao: "Boas práticas de JavaScript"
paginas: []
fonte: "Conhecimento do assistente (Claude), sem fonte verificada; escrito a 2026-11-03 a pedido do utilizador. Não vem do PDF."
verificado_em: 2026-11-03
---

# Estilo e formatação

**Resumo:** ESLint e Prettier no CI, `const`/`let` em vez de `var` e comparação estrita.

## Conteúdo

- Formatador (`prettier`) e linter (`eslint`) a correr no CI e no pre-commit, para não discutir estilo à mão.
- `const` por omissão, `let` quando é preciso reatribuir, nunca `var`.
- Comparar sempre com `===` / `!==`; nomes em `camelCase` para variáveis e funções, `PascalCase` para classes e componentes.

**Para uma skill:** o código passa o eslint e o prettier sem avisos antes de entrar.

## Ver também

- [Ferramentas: linters e formatadores](../cicd/ferramentas-linters-e-formatadores.md) (CI/CD e ferramentas)

Fonte: Conhecimento do assistente (Claude), sem fonte verificada; escrito a 2026-11-03 a pedido do utilizador. Não vem do PDF.

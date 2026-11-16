---
id: javascript/estilo-e-formatacao
titulo: "Estilo e formatação"
seccao: "Boas práticas de JavaScript"
paginas: []
fonte: "Fontes oficiais (MDN, TypeScript, ESLint, Prettier, web.dev, OWASP, W3C e documentação das ferramentas citadas), ligadas em cada ponto; consultadas a 2026-11-03. Pontos marcados «sem fonte oficial» são convenções escritas pelo assistente. Não vem do PDF."
verificado_em: 2026-11-03
---

# Estilo e formatação

**Resumo:** Prettier para a formatação e ESLint para a qualidade, ambos a falhar o CI; `const`/`let` e comparação estrita.

## Conteúdo

- Prettier para a formatação e ESLint para a qualidade do código (com `eslint-config-prettier` a desligar as regras que chocam); ambos no pre-commit e no CI. — [prettier.io: integrar com linters](https://prettier.io/docs/integrating-with-linters), [prettier.io: pre-commit](https://prettier.io/docs/precommit), [MDN: guia de estilo JavaScript](https://developer.mozilla.org/en-US/docs/MDN/Writing_guidelines/Code_style_guide/JavaScript)
- **Utilidade:** no CI, `prettier --check .` devolve o código 1 se houver ficheiros por formatar, sem os reescrever. — [prettier.io: CLI](https://prettier.io/docs/cli)
- `let` e `const`, nunca `var`; `const` quando a variável não é reatribuída. — [MDN: guia de estilo JavaScript](https://developer.mozilla.org/en-US/docs/MDN/Writing_guidelines/Code_style_guide/JavaScript)
- Comparar com `===`/`!==`; a única exceção aceitável é `== null`. Impor com as regras `eqeqeq` (opção `"smart"`) e `no-var`. — [MDN: guia de estilo JavaScript](https://developer.mozilla.org/en-US/docs/MDN/Writing_guidelines/Code_style_guide/JavaScript), [eslint.org: eqeqeq](https://eslint.org/docs/latest/rules/eqeqeq), [eslint.org: no-var](https://eslint.org/docs/latest/rules/no-var)
- `PascalCase` para classes, `camelCase` para propriedades e métodos. — [MDN: guia de estilo JavaScript](https://developer.mozilla.org/en-US/docs/MDN/Writing_guidelines/Code_style_guide/JavaScript)

**Para uma skill:** `eslint --max-warnings 0` e `prettier --check` passam no CI (código de saída 0).

## Ver também

- [Ferramentas: linters e formatadores](../cicd/ferramentas-linters-e-formatadores.md) (CI/CD e ferramentas)

Fonte: Fontes oficiais (MDN, TypeScript, ESLint, Prettier, web.dev, OWASP, W3C e documentação das ferramentas citadas), ligadas em cada ponto; consultadas a 2026-11-03. Pontos marcados «sem fonte oficial» são convenções escritas pelo assistente. Não vem do PDF.

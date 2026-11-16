---
id: javascript/typescript-e-tipagem
titulo: "TypeScript e tipagem"
seccao: "Boas práticas de JavaScript"
paginas: []
fonte: "Fontes oficiais (MDN, TypeScript, ESLint, Prettier, web.dev, OWASP, W3C e documentação das ferramentas citadas), ligadas em cada ponto; consultadas a 2026-11-03. Pontos marcados «sem fonte oficial» são convenções escritas pelo assistente. Não vem do PDF."
verificado_em: 2026-11-03
---

# TypeScript e tipagem

**Resumo:** TypeScript com `strict`, sem `any` (usar `unknown` nas fronteiras), `satisfies` e `tsc --noEmit` no CI.

## Conteúdo

- Ligar `"strict": true`, que dá garantias mais fortes de correção. — [typescriptlang.org: strict](https://www.typescriptlang.org/tsconfig/#strict)
- Não usar `any`; nas fronteiras (respostas de API, `JSON.parse`) usar `unknown` e validar antes de usar. — [typescriptlang.org: Do's and Don'ts](https://www.typescriptlang.org/docs/handbook/declaration-files/do-s-and-don-ts.html), [typescriptlang.org: functions](https://www.typescriptlang.org/docs/handbook/2/functions.html)
- Correr `tsc --noEmit` no CI como verificador de tipos. — [typescriptlang.org: noEmit](https://www.typescriptlang.org/tsconfig/#noEmit)
- **Utilidade:** `satisfies` valida um objeto contra um tipo sem perder o tipo inferido (TypeScript 4.9+). — [typescriptlang.org: TypeScript 4.9](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-4-9.html)
- **Utilidade:** `noUncheckedIndexedAccess` acrescenta `undefined` ao tipo nos acessos por índice (não faz parte de `strict`). — [typescriptlang.org: noUncheckedIndexedAccess](https://www.typescriptlang.org/tsconfig/#noUncheckedIndexedAccess)

**Para uma skill:** compila com `strict: true`; nenhum `any` explícito fora das fronteiras validadas.

## Ver também

- [Ferramentas: tipagem estática](../cicd/ferramentas-tipagem-estatica.md) (CI/CD e ferramentas)
- [TypeScript nativo](../node/typescript-nativo.md) (Boas práticas de Node.js)

Fonte: Fontes oficiais (MDN, TypeScript, ESLint, Prettier, web.dev, OWASP, W3C e documentação das ferramentas citadas), ligadas em cada ponto; consultadas a 2026-11-03. Pontos marcados «sem fonte oficial» são convenções escritas pelo assistente. Não vem do PDF.

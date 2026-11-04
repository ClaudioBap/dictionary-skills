---
id: javascript/tipos-numeros-e-coercao
titulo: "Tipos, números e coerção"
seccao: "Boas práticas de JavaScript"
paginas: []
fonte: "Fontes oficiais (MDN, TypeScript, ESLint, Prettier, web.dev, OWASP, W3C e documentação das ferramentas citadas), ligadas em cada ponto; consultadas a 2026-11-03. Pontos marcados «sem fonte oficial» são convenções escritas pelo assistente. Não vem do PDF."
verificado_em: 2026-11-03
---

# Tipos, números e coerção

**Resumo:** Evitar a coerção implícita; os números são vírgula flutuante, por isso dinheiro em cêntimos ou com biblioteca, e inteiros grandes em `BigInt` ou string.

## Conteúdo

- Evitar a igualdade solta e a coerção implícita; converter com `Number()` e validar com `Number.isNaN`. — [MDN: igualdade](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Equality_comparisons_and_sameness), [MDN: Number.isNaN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/isNaN)
- Os `number` são vírgula flutuante IEEE 754 e não representam `0.1` exatamente. Dinheiro em inteiros (cêntimos) ou com biblioteca decimal. — [MDN: Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number), [MDN: EPSILON](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/EPSILON), [TC39: proposta Decimal](https://github.com/tc39/proposal-decimal)
- Inteiros só são exatos até `Number.MAX_SAFE_INTEGER`; IDs grandes em JSON devem chegar como string ou `BigInt`. `JSON.stringify` com `BigInt` lança `TypeError`. — [MDN: Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number), [MDN: BigInt](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt)
- **Utilidade:** `??` e `?.` para tratar `null`/`undefined` (Baseline Widely available). — [MDN: ??](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Nullish_coalescing), [MDN: ?.](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Optional_chaining)

**Para uma skill:** nenhum valor monetário é calculado em vírgula flutuante.

## Ver também

- [Tipos de dados](../base-de-dados/tipos-de-dados.md) (Base de dados)

Fonte: Fontes oficiais (MDN, TypeScript, ESLint, Prettier, web.dev, OWASP, W3C e documentação das ferramentas citadas), ligadas em cada ponto; consultadas a 2026-11-03. Pontos marcados «sem fonte oficial» são convenções escritas pelo assistente. Não vem do PDF.

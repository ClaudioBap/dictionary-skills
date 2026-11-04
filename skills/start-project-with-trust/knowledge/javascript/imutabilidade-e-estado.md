---
id: javascript/imutabilidade-e-estado
titulo: "Imutabilidade e estado"
seccao: "Boas práticas de JavaScript"
paginas: []
fonte: "Fontes oficiais (MDN, TypeScript, ESLint, Prettier, web.dev, OWASP, W3C e documentação das ferramentas citadas), ligadas em cada ponto; consultadas a 2026-11-03. Pontos marcados «sem fonte oficial» são convenções escritas pelo assistente. Não vem do PDF."
verificado_em: 2026-11-03
---

# Imutabilidade e estado

**Resumo:** Não mutar argumentos; preferir os métodos de cópia (`toSorted`, `with`) e `structuredClone` para cópias profundas.

## Conteúdo

- Não mutar objetos que existiam antes da chamada; devolver novos valores. — [react.dev: componentes puros](https://react.dev/learn/keeping-components-pure)
- Spread, `map`, `filter` e `Object.assign` fazem cópias rasas; para cópia profunda usar `structuredClone` (Baseline Widely available), que lança `DataCloneError` com valores não serializáveis. — [MDN: shallow copy](https://developer.mozilla.org/en-US/docs/Glossary/Shallow_copy), [MDN: structuredClone](https://developer.mozilla.org/en-US/docs/Web/API/Window/structuredClone)
- **Utilidade:** `toSorted()`, `toReversed()`, `toSpliced()` e `with()` em vez de `sort`/`reverse`/`splice`, que mutam o array (Baseline Widely available). — [MDN: toSorted](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/toSorted), [MDN: Array, métodos que mutam](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)
- `Object.freeze` em constantes de configuração; é raso e, fora do modo estrito, as escritas falham em silêncio. — [MDN: Object.freeze](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/freeze)

**Para uma skill:** as funções não mutam os argumentos que recebem.

Fonte: Fontes oficiais (MDN, TypeScript, ESLint, Prettier, web.dev, OWASP, W3C e documentação das ferramentas citadas), ligadas em cada ponto; consultadas a 2026-11-03. Pontos marcados «sem fonte oficial» são convenções escritas pelo assistente. Não vem do PDF.

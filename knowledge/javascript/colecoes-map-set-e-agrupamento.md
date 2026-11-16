---
id: javascript/colecoes-map-set-e-agrupamento
titulo: "Coleções: Map, Set e agrupamento"
seccao: "Boas práticas de JavaScript"
paginas: []
fonte: "Fontes oficiais (MDN, TypeScript, ESLint, Prettier, web.dev, OWASP, W3C e documentação das ferramentas citadas), ligadas em cada ponto; consultadas a 2026-11-03. Pontos marcados «sem fonte oficial» são convenções escritas pelo assistente. Não vem do PDF."
verificado_em: 2026-11-03
---

# Coleções: Map, Set e agrupamento

**Resumo:** `Map` para dicionários dinâmicos ou com chaves de fora; `Object.groupBy` para agrupar.

## Conteúdo

- `Map` quando as chaves mudam muito ou vêm de fora: um objeto simples tem protótipo, com chaves que podem colidir. — [MDN: Map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map)
- **Utilidade:** `Object.groupBy(items, fn)` em vez de um `reduce` feito à mão (Baseline Widely available). — [MDN: Object.groupBy](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/groupBy)

**Para uma skill:** nenhum objeto simples é usado como dicionário com chaves vindas do utilizador.

## Ver também

- [Segurança em Node.js](../node/seguranca-em-node.md) (Boas práticas de Node.js)

Fonte: Fontes oficiais (MDN, TypeScript, ESLint, Prettier, web.dev, OWASP, W3C e documentação das ferramentas citadas), ligadas em cada ponto; consultadas a 2026-11-03. Pontos marcados «sem fonte oficial» são convenções escritas pelo assistente. Não vem do PDF.

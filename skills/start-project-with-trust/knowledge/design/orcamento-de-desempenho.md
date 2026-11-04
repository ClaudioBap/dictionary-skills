---
id: design/orcamento-de-desempenho
titulo: "Orçamento de desempenho"
seccao: "Design e experiência de utilizador"
paginas: [14]
fonte: Dicionario-Boas-Praticas.pdf
verificado_em: 2026-11-03
fontes_oficiais_consultadas_em: 2026-11-04
---

# Orçamento de desempenho

**Resumo:** Um orçamento por página verificado no CI, com compressão, caching e o pesado carregado tarde.

## Conteúdo

- Um orçamento por página (peso, tempo até interativo) verificado no CI (Lighthouse).
- Comprimir (gzip/brotli), caching com impressão digital no URL, carregar o pesado só quando é preciso.

**Para uma skill:** um ecrã novo não ultrapassa o orçamento; o pesado carrega tarde.

## Ver também

- [Desempenho web (Core Web Vitals)](../design/desempenho-web-core-web-vitals.md) (Design e experiência de utilizador)

## Fontes oficiais

*Ligações externas que apoiam esta entrada, consultadas a 2026-11-04. Não alteram o texto acima.*

- [web.dev – Performance budgets 101](https://web.dev/articles/performance-budgets-101) — Orçamentos de desempenho aplicados no build (Lighthouse CI)
- [web.dev – HTTP cache](https://web.dev/articles/http-cache) — URLs com impressão digital e max-age longo
- [MDN – Lazy loading](https://developer.mozilla.org/en-US/docs/Web/Performance/Guides/Lazy_loading) — Carregar recursos só quando são precisos

Fonte: pág. 14 (Dicionario-Boas-Praticas.pdf)

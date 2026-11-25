---
id: design/orcamento-de-desempenho
titulo: "Orçamento de desempenho"
seccao: "Design e experiência de utilizador"
paginas: [14]
fonte: Dicionario-Boas-Praticas.pdf
verificado_em: 2026-11-25
editado_em: 2026-11-25
fontes_oficiais_consultadas_em: 2026-11-04
---

# Orçamento de desempenho

**Resumo:** Um orçamento por página verificado no CI, com compressão, caching e o pesado carregado tarde.

## Conteúdo

- Um orçamento por página verificado no CI com o Lighthouse CI: peso por tipo de recurso (por exemplo, o JavaScript em telemóvel) e tempos medidos em laboratório, com os limiares dos Core Web Vitals como teto (LCP até 2,5 s, CLS até 0,1; o INP não se mede em laboratório e o TBT serve de aproximação). Cada valor é uma asserção por auditoria com `maxNumericValue`, ao nível `warn` ou `error`. Fontes: [Lighthouse CI: configuração](https://github.com/GoogleChrome/lighthouse-ci/blob/main/docs/configuration.md), [web.dev: Web Vitals (2024-10-31)](https://web.dev/articles/vitals)
- Comprimir (gzip/brotli), caching com impressão digital no URL, carregar o pesado só quando é preciso.

**Para uma skill:** um ecrã novo não ultrapassa o orçamento; o pesado carrega tarde.

## Ver também

- [Desempenho web (Core Web Vitals)](../design/desempenho-web-core-web-vitals.md) (Design e experiência de utilizador)

## Fontes oficiais

*Ligações externas que apoiam esta entrada, consultadas a 2026-11-04. Não alteram o texto acima.*

- [web.dev – Performance budgets 101](https://web.dev/articles/performance-budgets-101) — Orçamentos de desempenho aplicados no build (Lighthouse CI)
- [web.dev – HTTP cache](https://web.dev/articles/http-cache) — URLs com impressão digital e max-age longo
- [MDN – Lazy loading](https://developer.mozilla.org/en-US/docs/Web/Performance/Guides/Lazy_loading) — Carregar recursos só quando são precisos
- [Lighthouse CI: configuração](https://github.com/GoogleChrome/lighthouse-ci/blob/main/docs/configuration.md) — Asserções com maxNumericValue, consultada a 2026-11-25
- [Chrome for Developers: Lighthouse 10](https://developer.chrome.com/blog/lighthouse-10-0) — O TTI saiu na versão 10, consultada a 2026-11-25

## Histórico

- **2023-02-09**: antes, «Um orçamento por página (peso, tempo até interativo) verificado no CI (Lighthouse).» (PDF pág. 14). Mudou porque o Lighthouse 10 retirou a métrica Time to Interactive (TTI) e passou o peso dela para o CLS. Fonte: [Chrome for Developers: Lighthouse 10](https://developer.chrome.com/blog/lighthouse-10-0). Editado a 2026-11-25.

Fonte: pág. 14 (Dicionario-Boas-Praticas.pdf)

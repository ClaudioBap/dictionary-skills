---
id: cicd/ci-vs-cd
titulo: "CI vs CD"
seccao: "CI/CD e ferramentas"
paginas: [45]
fonte: Dicionario-Boas-Praticas.pdf
verificado_em: 2026-11-03
fontes_oficiais_consultadas_em: 2026-11-04
---

# CI vs CD

**Resumo:** CI integra e verifica cada alteração cedo; CD deixa pronto ou publica o que passa, em lotes pequenos e frequentes.

## Conteúdo

- **CI (integração contínua):** cada alteração é integrada e verificada cedo e muitas vezes (build, lint, testes) num branch partilhado.
- **CD (entrega/implantação contínua):** o que passa no CI fica pronto a publicar (entrega) ou é publicado automaticamente (implantação).
- Objetivo: lotes pequenos e frequentes, feedback rápido, menos risco por mudança.

**Para uma skill:** toda a mudança passa por CI antes de juntar, e o caminho até produção é automatizado e repetível.

## Fontes oficiais

*Ligações externas que apoiam esta entrada, consultadas a 2026-11-04. Não alteram o texto acima.*

- [Continuous Integration](https://martinfowler.com/articles/continuousIntegration.html) — Integrar no mainline pelo menos diariamente, com build auto-testado
- [Continuous Delivery](https://martinfowler.com/bliki/ContinuousDelivery.html) — Entrega: publicável a qualquer momento; implantação: cada mudança vai a produção
- [About continuous integration](https://docs.github.com/en/actions/about-github-actions/about-continuous-integration-with-github-actions) — Cada alteração construída e testada automaticamente para detetar erros cedo

Fonte: pág. 45 (Dicionario-Boas-Praticas.pdf)

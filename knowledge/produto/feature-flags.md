---
id: produto/feature-flags
titulo: "Feature flags (toggles)"
seccao: "Modularização e produtização"
paginas: []
fonte: "https://martinfowler.com/articles/feature-toggles.html; consultado a 2026-11-10. Não vem do PDF."
data_lancamento: 2017-10-09
confianca: alta
verificado_em: 2026-11-10
---

# Feature flags (toggles)

**Resumo:** Uma flag liga ou desliga um comportamento sem mudar o código instalado; há quatro tipos, e o de permissão é o que dá a um cliente uma funcionalidade que os outros não têm, sem copiar o projeto.

## Conteúdo

- Flags de lançamento: «Release Toggles allow incomplete and un-tested codepaths to be shipped to production as latent code». Fonte: [Feature Toggles (Hodgson, 2017-10-09)](https://martinfowler.com/articles/feature-toggles.html)
- Flags de experiência: «Experiment Toggles are used to perform multivariate or A/B testing». Fonte: o mesmo artigo.
- Flags de operação: «These flags are used to control operational aspects of our system's behavior». Fonte: o mesmo artigo.
- Flags de permissão: «These flags are used to change the features or product experience that certain users receive». Fonte: o mesmo artigo.
- Para a reutilização *(interpretação)*: uma funcionalidade pedida por um só cliente fica atrás de uma flag de permissão, no mesmo código que serve os outros, em vez de dar origem a uma cópia do projeto que depois diverge.

**Para uma skill:** uma funcionalidade que só alguns clientes têm fica atrás de uma flag de permissão no mesmo código, e não numa cópia do projeto.

## Ver também

- [Específico ou modular](especifico-ou-modular.md) (Modularização e produtização)
- [Multi-inquilino (modelos de tenancy)](multi-inquilino.md) (Modularização e produtização)

Fonte: https://martinfowler.com/articles/feature-toggles.html, consultado a 2026-11-10. Não vem do PDF.

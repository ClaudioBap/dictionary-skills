---
id: produto/multi-inquilino
titulo: "Multi-inquilino (modelos de tenancy)"
seccao: "Modularização e produtização"
paginas: []
fonte: "https://learn.microsoft.com/en-us/azure/architecture/guide/multitenant/considerations/tenancy-models; consultado a 2026-11-10. Não vem do PDF."
data_lancamento: 2025-06-11
confianca: alta
verificado_em: 2026-11-10
---

# Multi-inquilino (modelos de tenancy)

**Resumo:** Servir vários clientes com uma instalação partilhada é mais barato e mais arriscado do que uma instalação por cliente; a escolha depende do número de clientes previsto e é também uma decisão comercial.

## Conteúdo

- A página descreve um espetro de isolamento e nomeia quatro padrões: instalações de um só inquilino automatizadas, instalações totalmente multi-inquilino, instalações partilhadas na vertical e instalações partilhadas na horizontal. Fonte: [Tenancy models (Azure Architecture Center, 2025-06-11)](https://learn.microsoft.com/en-us/azure/architecture/guide/multitenant/considerations/tenancy-models)
- Um inquilino por instalação: «data for each tenant is isolated, which reduces the risk of accidental leakage»; em contrapartida, «cost efficiency is low because you don't share infrastructure among your tenants». Fonte: a mesma página.
- Totalmente multi-inquilino: «operating a solution that has shared components is less expensive than using individual resources for each tenant»; mas «it's also often riskier because changes might affect your entire customer base». Fonte: a mesma página.
- Partilha vertical: «Your codebase needs to be designed to support both multitenant and single-tenant deployments». Partilha horizontal: «can help you mitigate a noisy neighbor problem». Fonte: a mesma página.
- Orientação: «If you expect your business to scale to a large number of customers, it's important to deploy shared infrastructure»; «if you expect that your business will have only a few customers, you might want to consider using single-tenant resources that are dedicated to each customer». E «Selecting a tenancy model isn't only a technical decision. It's also a commercial decision.» Fonte: a mesma página.

**Para uma skill:** a decisão de servir vários clientes regista o modelo de tenancy escolhido, o número de clientes previsto e o isolamento de dados exigido pelas regras de dados e conformidade do projeto.

## Ver também

- [Específico ou modular](especifico-ou-modular.md) (Modularização e produtização)
- [Feature flags (toggles)](feature-flags.md) (Modularização e produtização)

Fonte: https://learn.microsoft.com/en-us/azure/architecture/guide/multitenant/considerations/tenancy-models, consultado a 2026-11-10. Não vem do PDF.

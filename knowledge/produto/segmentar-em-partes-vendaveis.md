---
id: produto/segmentar-em-partes-vendaveis
titulo: "Segmentar em partes vendáveis"
seccao: "Modularização e produtização"
paginas: []
fonte: "https://docs.stripe.com/billing/entitlements; consultado a 2026-11-25, página sem data. Não vem do PDF."
data_lancamento: null
confianca: media
verificado_em: 2026-11-25
---

# Segmentar em partes vendáveis

**Resumo:** Quando um projeto se vai vender por partes, cada parte vendável é uma funcionalidade com chave estável e módulo próprio, e o que cada plano inclui vive fora do código.

## Conteúdo

- A unidade que se vende é a funcionalidade: «An entitlement represents a customer’s access to a feature.» Cada funcionalidade tem um nome e uma «Lookup Key» única, liga-se a produtos, e «You can add a single feature to multiple products». Fonte: [Stripe Entitlements](https://docs.stripe.com/billing/entitlements) (data não indicada)
- O mapeamento entre funcionalidades e produtos serve para «Launch, change, and experiment with your pricing without needing to change your codebase». Fonte: a mesma página.
- Para a segmentação *(interpretação)*: a parte vendável é uma funcionalidade com chave estável (por exemplo `relatorios-avancados`), e não um plano. Os planos são conjuntos de chaves e mudam no catálogo de faturação ou na configuração; o código só conhece as chaves. Cada parte vive num módulo com fronteira própria (pasta, pacote ou serviço), com as suas rotas, dados e interface, para se poder ligar, desligar ou deixar de fora sem mexer nas outras.
- Quando *(interpretação)*: só quando a decisão em [Específico ou modular](especifico-ou-modular.md) é a opção 3 ou 4 e há intenção de vender por partes. Sem isso, segmentar é abstrair sem um segundo caso à vista.

**Para uma skill:** existe uma lista das partes vendáveis, cada uma com chave estável, módulo próprio e as rotas e dados que lhe pertencem; o código não tem nomes de planos, só chaves de funcionalidade.

## Ver também

- [Direitos por plano no servidor](direitos-por-plano-no-servidor.md) (Modularização e produtização)
- [Não entregar o que não se comprou](nao-entregar-o-que-nao-se-comprou.md) (Modularização e produtização)
- [Núcleo e adaptadores (arquitetura hexagonal)](nucleo-e-adaptadores.md) (Modularização e produtização)
- [Pagamentos e faturação (Stripe Billing, Invoice Ninja)](../plataformas/pagamentos-e-faturacao.md) (Plataformas para adotar antes de construir)

Fonte: https://docs.stripe.com/billing/entitlements, consultado a 2026-11-25, página sem data. Não vem do PDF.

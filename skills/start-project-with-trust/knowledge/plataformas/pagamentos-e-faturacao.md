---
id: plataformas/pagamentos-e-faturacao
titulo: "Pagamentos e faturação (Stripe Billing, Invoice Ninja)"
seccao: "Plataformas para adotar antes de construir"
paginas: []
fonte: "Documentação do Stripe Billing, site e repositório do Invoice Ninja, ligados em cada ponto; consultados a 2026-11-10, páginas sem data. Não vem do PDF."
data_lancamento: null
confianca: media
verificado_em: 2026-11-10
---

# Pagamentos e faturação (Stripe Billing, Invoice Ninja)

**Resumo:** Subscrições, uso medido e faturas resolvem-se com uma plataforma de pagamentos; na faturação dita open source, a licença tem de se ler, porque «source available» não é open source.

## Conteúdo

- Stripe Billing: «Create and manage subscriptions, track usage, and issue invoices.» Modelos de preço: fixo, por lugar, por uso, por escalões, variável e multimoeda; faturação por uso «with Stripe and Metronome»; faturas automáticas e personalizadas; smart retries; portal do cliente. A página não tem preços. Localização dos dados na UE: não confirmada nas páginas lidas. Fonte: [Stripe Billing](https://docs.stripe.com/billing)
- Invoice Ninja: «Free Source Available Invoicing, Expenses & Time-Tracking.» Cobre clientes, faturas, pagamentos, impostos, fluxos recorrentes, API e desenvolvimento de gateways de pagamento. Instala-se por CLI, Docker ou à mão «for your own infrastructure», e há uma nuvem gerida. Fonte: [Invoice Ninja](https://invoiceninja.github.io/)
- Licença do Invoice Ninja: «Elastic License» (sem versão indicada), que é source available e não é aprovada pela OSI; entra na coluna «Risco». Fonte: [invoiceninja/invoiceninja](https://github.com/invoiceninja/invoiceninja)
- Faturação integrada num ERP: ver [ERP e CRM (Odoo, Dolibarr)](erp-e-crm.md). As exigências legais de software de faturação em Portugal não foram lidas nestas fontes: não confirmado.

**Para uma skill:** um pedido de pagamentos ou subscrições tem o Stripe Billing como opção em «Adotar ou construir», e um pedido de faturação regista a licença do candidato (a Elastic License não é OSI) na coluna «Risco».

## Ver também

- [ERP e CRM (Odoo, Dolibarr)](erp-e-crm.md) (Plataformas para adotar antes de construir)
- [Adotar antes de construir](adotar-antes-de-construir.md) (Plataformas para adotar antes de construir)
- [Inventário de dependências por jurisdição](../soberania/inventario-de-dependencias-por-jurisdicao.md) (Soberania digital)

Fonte: documentação do Stripe Billing, site e repositório do Invoice Ninja, ligados em cada ponto; consultados a 2026-11-10, páginas sem data. Não vem do PDF.

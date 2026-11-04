---
id: publicacao/alojamento-dinamico-e-de-teste-gratuito
titulo: "Alojamento dinâmico e de teste gratuito"
seccao: "Publicação e alojamento web"
paginas: []
fonte: "Fontes oficiais dos fornecedores e organismos citados (documentação, preços, limites e termos), ligadas em cada ponto; consultadas a 2026-11-04. Os planos e preços mudam com frequência: confirmar antes de decidir. Não vem do PDF."
verificado_em: 2026-11-03
---

# Alojamento dinâmico e de teste gratuito

**Resumo:** Para testar back-ends sem custo há escalões grátis permanentes (Cloudflare Workers, Render, Oracle Always Free, Google Cloud Free Tier) e créditos iniciais temporários (AWS, Google Cloud, Azure), cada um com limites de uso, regiões, prazos e, em alguns casos, cartão obrigatório.

## Conteúdo

- Cloudflare Workers Free: 100 000 pedidos/dia e 10 ms de CPU por invocação; o plano pago tem mínimo de 5 USD/mês por conta e inclui 10 milhões de pedidos e 30 milhões de ms de CPU/mês (a 2026-11-04) — [Preços dos Workers](https://developers.cloudflare.com/workers/platform/pricing/)
- Render Free: o serviço web adormece após 15 min sem tráfego e demora cerca de 1 min a acordar; 750 horas de instância grátis/mês por workspace; Postgres grátis de 1 GB expira 30 dias após a criação (mais 14 dias para fazer upgrade antes de apagar); Key Value grátis só em memória; a Render diz «Do not use them for production applications» (a 2026-11-04) — [Render Free](https://render.com/docs/free)
- Oracle Cloud Always Free: Ampere A1 até 2 OCPU e 12 GB de memória, até 2 VM AMD micro (1/8 OCPU, 1 GB), 200 GB de armazenamento em bloco, 10 TB/mês de dados de saída; só na região de origem da tenancy; a Oracle pode recuperar instâncias inativas (CPU, rede e memória abaixo de 20 % em 7 dias) (a 2026-11-04) — [Recursos Always Free](https://docs.oracle.com/en-us/iaas/Content/FreeTier/freetier_topic-Always_Free_Resources.htm)
- Google Cloud: Free Tier sem data de fim com 1 VM e2-micro só em us-west1, us-central1 ou us-east1, 30 GB-mês de disco e 1 GB de saída; Cloud Run com 2 milhões de pedidos, 180 000 vCPU-segundos e 360 000 GB-segundos/mês; à parte, crédito de 300 USD por 90 dias para novos clientes (a 2026-11-04) — [Free Tier e Free Trial](https://docs.cloud.google.com/free/docs/free-cloud-features)
- AWS Free Tier: novos clientes recebem 100 USD e podem ganhar mais até 100 USD (total até 200 USD), válidos 6 meses; no plano Free só alguns serviços e sem cobrança, no plano Paid todos; mais de 30 serviços sempre grátis dentro de limites mensais; contas já existentes não são elegíveis aos créditos (a 2026-11-04) — [AWS Free Tier](https://aws.amazon.com/free/), [FAQ do Free Tier](https://aws.amazon.com/free/free-tier-faqs/)
- Azure free account: 200 USD de crédito para 30 dias, 20+ serviços grátis durante 12 meses (só clientes novos) e 65+ serviços sempre grátis; uma conta gratuita por cliente novo; para manter os 12 meses é preciso passar a pay-as-you-go (a 2026-11-04) — [Conta Azure](https://azure.microsoft.com/en-us/pricing/purchase-options/azure-account), [Serviços grátis Azure](https://azure.microsoft.com/en-us/pricing/free-services)

**Para uma skill:** o serviço de teste grátis escolhido cobre a carga prevista dentro dos limites, tem prazo ou expiração conhecidos e registados, e não é usado para produção quando o fornecedor o desaconselha

## Ver também

- [Serverless vs. sempre-ligado](../custo/serverless-vs-sempre-ligado.md) (Sessões, orquestração e custo-eficiência)
- [Orçamento e alertas de custo](../custo/orcamento-e-alertas-de-custo.md) (Sessões, orquestração e custo-eficiência)
- [Escolher o fornecedor de nuvem](../nuvem/escolher-o-fornecedor-de-nuvem.md) (Nuvem e identidade (AWS, Azure, Microsoft, OVH))
- [AWS (Amazon Web Services)](../nuvem/aws.md) (Nuvem e identidade (AWS, Azure, Microsoft, OVH))
- [Microsoft Azure e Entra ID](../nuvem/microsoft-azure-e-entra-id.md) (Nuvem e identidade (AWS, Azure, Microsoft, OVH))

Fonte: Fontes oficiais dos fornecedores e organismos citados (documentação, preços, limites e termos), ligadas em cada ponto; consultadas a 2026-11-04. Os planos e preços mudam com frequência: confirmar antes de decidir. Não vem do PDF.

---
id: ia/operacao/uso-e-custo-da-claude-api
titulo: "Uso e custo da Claude API"
seccao: "Construir com IA"
paginas: []
fonte: "https://platform.claude.com/docs/en/manage-claude/usage-cost-api; consultado a 2026-11-10, página sem data. Não vem do PDF."
data_lancamento: null
confianca: media
verificado_em: 2026-11-10
---

# Uso e custo da Claude API

**Resumo:** A organização lê por API os tokens e o custo em dólares, por modelo, workspace ou chave, com uma chave de administração; a Usage and Cost API passou a legacy e a recomendada para integrações novas é a Usage and Cost Analytics API.

## Conteúdo

- A Usage and Cost API está marcada como legacy, mas continua suportada. Para integrações novas, a página recomenda a [Usage and Cost Analytics API](https://platform.claude.com/docs/en/manage-claude/usage-cost-analytics-api), que não foi lida; está em beta desde 2026-10-29 (ver [Atualizações](../ATUALIZACOES.md)). Fonte: [Usage and Cost API](https://platform.claude.com/docs/en/manage-claude/usage-cost-api)
- Uso: `GET /v1/organizations/usage_report/messages`, com intervalos «1m», «1h» ou «1d», agrupamento e filtros por modelo, workspace, chave, service tier, `inference_geo` e velocidade. Separa «uncached input, cached input, cache creation, and output tokens». Fonte: a mesma página.
- Custo: `/v1/organizations/cost_report`, em dólares como «decimal strings in lowest units (cents)», só com intervalos «1d», agrupado por `workspace_id` ou descrição. Os custos do Priority Tier não entram neste endpoint. Fonte: a mesma página.
- Número de intervalos por pedido: «1m» por omissão 60, máximo 1 440; «1h» por omissão 24, máximo 168; «1d» por omissão 7, máximo 31. Fonte: a mesma página.
- Acesso: chave de administração (`sk-ant-admin01-...`) ou token OAuth `org:admin`; as chaves de workspace não funcionam. Não existe para contas individuais nem na Claude Platform on AWS. As organizações Enterprise do claude.ai usam uma chave da Analytics API. Fonte: a mesma página.
- Os dados «typically appears within 5 minutes», e para uso contínuo a página recomenda consultar «once per minute». Fonte: a mesma página.

**Para uma skill:** o custo de IA de um projeto mede-se com os dados de uso e custo da organização, agrupados por workspace ou chave do projeto, e não por estimativa; uma integração nova usa a Analytics API.

## Ver também

- [Otimização de custo da IA](../otimizacao-de-custo-da-ia.md) (Construir com IA)
- [Gateway de LLM (LiteLLM)](gateway-de-llm-litellm.md) (Construir com IA)

Fonte: https://platform.claude.com/docs/en/manage-claude/usage-cost-api, consultado a 2026-11-10, página sem data. Não vem do PDF.

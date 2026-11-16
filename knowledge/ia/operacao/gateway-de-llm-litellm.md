---
id: ia/operacao/gateway-de-llm-litellm
titulo: "Gateway de LLM (LiteLLM)"
seccao: "Construir com IA"
paginas: []
fonte: "https://docs.litellm.ai; consultado a 2026-11-10, página sem data. Não vem do PDF."
data_lancamento: null
confianca: media
verificado_em: 2026-11-10
---

# Gateway de LLM (LiteLLM)

**Resumo:** Um gateway põe todas as aplicações a falar com os modelos por um só ponto, com uma chave por aplicação ou pessoa, orçamento, limite de pedidos e custo registado por pedido.

## Conteúdo

- O LiteLLM é um gateway open source com uma API única para mais de 100 fornecedores de LLM, e também para ferramentas MCP e agentes A2A. Fonte: [LiteLLM docs](https://docs.litellm.ai)
- Orçamentos: «each app or person gets a virtual key with a budget and a rate limit», e o custo de cada pedido fica registado. Fonte: [Virtual keys](https://docs.litellm.ai/docs/proxy/virtual_keys)
- O SDK trata de streaming, novas tentativas, fallbacks e do custo de cada chamada. Começa-se com `uv add litellm` e `completion()`. Fonte: [LiteLLM docs](https://docs.litellm.ai)
- O proxy arranca com Docker e Postgres: «Docker and Postgres, the admin UI, and your first virtual key in 5 minutes». Fonte: [Docker quick start](https://docs.litellm.ai/docs/proxy/docker_quick_start)
- Licença MIT. Uma chave de licença empresarial junta SSO, SCIM, registo de auditoria das alterações de administração e administradores por equipa; vende-se por contacto comercial, com «A free 30-day trial». Fonte: [LiteLLM docs](https://docs.litellm.ai)

**Para uma skill:** quando várias aplicações ou pessoas usam LLM, o plano considera um gateway com uma chave por aplicação, orçamento e limite definidos, e regista que funcionalidades precisam da licença empresarial.

## Ver também

- [Observabilidade de aplicações com LLM](observabilidade-de-llm.md) (Construir com IA)
- [Otimização de custo da IA](../otimizacao-de-custo-da-ia.md) (Construir com IA)

Fonte: https://docs.litellm.ai, consultado a 2026-11-10, página sem data. Não vem do PDF.

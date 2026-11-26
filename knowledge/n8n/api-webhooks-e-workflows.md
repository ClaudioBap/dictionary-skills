---
id: n8n/api-webhooks-e-workflows
titulo: "API, webhooks e workflows no n8n"
seccao: "n8n"
paginas: []
fonte: "Documentação oficial do n8n e blog oficial, ligados em cada ponto; consultados a 2026-11-26. Não vem do PDF."
verificado_em: 2026-11-26
editado_em: 2026-11-26
---

# API, webhooks e workflows no n8n

**Resumo:** Os workflows falam com outros sistemas pelo nó Webhook (um URL de teste e outro de produção, com autenticação) e pela API pública (chave no cabeçalho `X-N8N-API-KEY`, limites por chave). Cada workflow tem um error workflow; o controlo de versões em Git só existe nos planos Business e Enterprise.

## Conteúdo

### API pública

- A chave cria-se nas definições («n8n API») e vai no cabeçalho `X-N8N-API-KEY`, com a base `/api/v1`. Não existe durante o período experimental. Há âmbitos (scopes) em todos os planos desde a 2.14.0. Fonte: [autenticação da API](https://docs.n8n.io/api/authentication/)
- Limites por chave, à parte para leituras e escritas, desligados por omissão (1 200 leituras e 600 escritas por 60 segundos quando ligados), com resposta 429 quando se excedem, em todos os planos desde a 2.47.0; chaves de idempotência desde a 2.45.0. Fonte: [blog do n8n](https://blog.n8n.io/new-in-n8n-public-api-rate-limits-that-keep-every-team-on-your-instance-running/). Confiança: media (lido num resultado de pesquisa, data aproximada de 2026-11-13).

### Webhooks

- O nó Webhook tem um URL de teste (ativo enquanto o editor escuta) e um de produção (depois de publicar o workflow); autenticação Basic, Header, JWT ou n8n User Auth; pedidos até 16 MB (`N8N_PAYLOAD_SIZE_MAX`); lista de IPs permitidos. Fonte: [nó Webhook](https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.webhook/)

### Workflows

- O error workflow começa com o nó Error Trigger e escolhe-se nas definições de cada workflow; o mesmo serve vários. Fonte: [tratar erros](https://docs.n8n.io/build/flow-logic/handle-errors-gracefully). Desde a 2.38 (2026-09-01), as execuções do error workflow não contam para a quota. Fonte: [release notes](https://docs.n8n.io/release-notes/)
- Sub-workflows com os nós Execute Workflow e Execute Workflow Trigger; a 3.0 retira as fontes «Local File» e «URL». Fonte: [breaking changes da 3.0](https://docs.n8n.io/changelog/v30-breaking-changes)
- Controlo de versões em Git (source control) só nos planos Business e Enterprise, ligado por um owner ou admin. Fonte: [source control](https://docs.n8n.io/source-control-environments/). Fora desses planos, o workflow exporta-se em JSON para o repositório do projeto. *(interpretação)*

**Para uma skill:** cada workflow entregue fica com o JSON exportado no repositório do projeto e um error workflow atribuído, os webhooks de produção têm autenticação, e a entrega prova-se com um pedido real ao URL de produção e a execução bem-sucedida que ele deixa no histórico.

## Ver também

- [Segurança de uma instância n8n](seguranca.md) (n8n)
- [Automação e integração (n8n, Node-RED)](../plataformas/automacao-e-integracao.md) (Plataformas para adotar antes de construir)

Fonte: Documentação oficial do n8n e blog oficial, ligados em cada ponto; consultados a 2026-11-26. Não vem do PDF.

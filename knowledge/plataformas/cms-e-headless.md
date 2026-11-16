---
id: plataformas/cms-e-headless
titulo: "CMS e headless (WordPress, Directus, Strapi)"
seccao: "Plataformas para adotar antes de construir"
paginas: []
fonte: "Sites, documentação e repositórios oficiais de cada plataforma, ligados em cada ponto; consultados a 2026-11-04. Não vem do PDF."
verificado_em: 2026-11-04
---

# CMS e headless (WordPress, Directus, Strapi)

**Resumo:** Para sites e conteúdos, o WordPress (GPLv2+) é o CMS clássico com API REST; o Strapi (MIT, fora do `ee/`) e o Directus (licença MSCL, com restrições) são headless, com REST, GraphQL, webhooks e servidor MCP oficial.

## Conteúdo

### WordPress

- Licença GPLv2 ou posterior. Fonte: [licença](https://wordpress.org/about/license/)
- Self-hosted; o wordpress.org não tem cloud própria e só recomenda alojamentos de terceiros. Fonte: [alojamento](https://wordpress.org/hosting/)
- API REST em JSON. Fonte: [REST API](https://developer.wordpress.org/rest-api/)
- Sem webhooks no core: os hooks do WordPress são internos (PHP), e o envio de eventos para fora faz-se com plugins. Fonte: [hooks](https://developer.wordpress.org/plugins/hooks/)
- MCP oficial como pacote à parte, o MCP Adapter, que não faz parte do core. Fonte: [MCP Adapter](https://github.com/WordPress/mcp-adapter)
- Versão 7.1.4, de 2026-10-28. Fonte: [releases](https://wordpress.org/download/releases/)

### Directus

- Backend e CMS headless sobre uma base de dados SQL já existente.
- Licença Monospace Sustainable Core License (MSCL-1.0-GPL): restringe o uso concorrente e cada versão passa a GPL-3.0 quatro anos depois. Não é uma licença aprovada pela OSI. Fontes: [licença](https://github.com/directus/directus/blob/main/license), [MSCL](https://directus.com/mscl)
- Self-hosted (gratuito para organizações com menos de 5 M de receita anual e menos de 50 pessoas, pelo Open Innovation Grant) ou Cloud Core a 89 $ por mês com faturação anual (a 2026-11-04). Fonte: [preços](https://directus.com/pricing)
- API REST e GraphQL, e webhooks como trigger nos Flows. Fontes: [API](https://directus.com/docs/api), [triggers](https://directus.com/docs/guides/flows/triggers)
- Servidor MCP oficial integrado desde a v11.12. Fonte: [MCP](https://directus.com/docs/guides/ai/mcp)
- Versão 12.6.0, de 2026-10-27. Fonte: [releases](https://github.com/directus/directus/releases/tag/v12.6.0)

### Strapi

- Licença MIT para o código fora das pastas `ee/`, que têm licença Enterprise. Fonte: [LICENSE](https://github.com/strapi/strapi/blob/develop/LICENSE)
- Self-hosted ou Strapi Cloud. Os preços da cloud estão na [página de preços](https://strapi.io/pricing-cloud), que não foi lida (bloqueia acesso automático): confirmar à mão.
- API REST, GraphQL por plugin e webhooks. Fontes: [REST](https://docs.strapi.io/cms/api/rest), [GraphQL](https://docs.strapi.io/cms/api/graphql), [webhooks](https://docs.strapi.io/cms/backend-customization/webhooks)
- Servidor MCP oficial integrado desde a 5.47.0, no endpoint `/mcp`. Fonte: [Strapi MCP](https://docs.strapi.io/cms/features/strapi-mcp-server)
- Versão 5.60.0, de 2026-10-28. Fonte: [releases](https://github.com/strapi/strapi/releases/tag/v5.60.0)

**Para uma skill:** um site de conteúdos ou um backend de dados tem o WordPress ou um CMS headless como opção na decisão «Adotar ou construir», com a licença na coluna «Risco».

## Ver também

- [Adotar antes de construir](adotar-antes-de-construir.md) (Plataformas para adotar antes de construir)
- [Alojamento estático gratuito](../publicacao/alojamento-estatico-gratuito.md) (Publicação e alojamento web)

Fonte: Sites, documentação e repositórios oficiais de cada plataforma, ligados em cada ponto; consultados a 2026-11-04. Não vem do PDF.

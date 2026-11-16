---
id: plataformas/automacao-e-integracao
titulo: "Automação e integração (n8n, Node-RED)"
seccao: "Plataformas para adotar antes de construir"
paginas: []
fonte: "Sites, documentação e repositórios oficiais de cada plataforma, ligados em cada ponto; consultados a 2026-11-04. Não vem do PDF."
verificado_em: 2026-11-04
---

# Automação e integração (n8n, Node-RED)

**Resumo:** Para ligar plataformas sem código à medida, o Node-RED (Apache 2.0) é open source e corre em qualquer lado; o n8n tem nós MCP oficiais e cloud, mas usa uma licença que o próprio projeto não chama open source.

## Conteúdo

### n8n

- Licença Sustainable Use License (fair-code), com ficheiros `.ee.` sob licença Enterprise. O projeto diz: «we do not call ourselves open source». Fontes: [licença](https://docs.n8n.io/privacy-and-security/sustainable-use-license), [LICENSE.md](https://github.com/n8n-io/n8n/blob/master/LICENSE.md)
- Self-hosted ou cloud: Starter a 20 € por mês com 2 500 execuções e Pro a 50 € por mês, com faturação anual (a 2026-11-04). Fonte: [preços](https://n8n.io/pricing/)
- API REST pública (não disponível no período experimental) e nó Webhook. Fontes: [API](https://docs.n8n.io/api/), [Webhook](https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.webhook/)
- MCP oficial: o nó MCP Server Trigger expõe um workflow como servidor MCP, o nó MCP Client Tool chama servidores MCP externos, e a própria instância pode ser servidor MCP. Fontes: [MCP Server Trigger](https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-langchain.mcptrigger/), [MCP Client Tool](https://docs.n8n.io/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.toolmcp/), [MCP da instância](https://docs.n8n.io/connect/connect-to-n8n-mcp-server)
- Versão 2.46.4, de 2026-11-02. Fonte: [releases](https://github.com/n8n-io/n8n/releases/tag/n8n%402.46.4)

### Node-RED

- Programação low-code para aplicações orientadas a eventos. Fonte: [nodered.org](https://nodered.org/)
- Licença Apache 2.0. Fonte: [LICENSE](https://github.com/node-red/node-red/blob/master/LICENSE)
- Self-hosted (local, Docker, Raspberry Pi). A documentação lista opções de alojamento de terceiros, sem cloud do próprio projeto. Fonte: [começar](https://nodered.org/docs/getting-started/)
- API HTTP de administração, e o nó HTTP In cria endpoints que recebem chamadas de outros sistemas. Fontes: [Admin API](https://nodered.org/docs/api/admin/), [endpoint HTTP](https://cookbook.nodered.org/http/create-an-http-endpoint)
- MCP: só servidores da comunidade.
- Versão 5.0.9, de 2026-10-21. Fonte: [releases](https://github.com/node-red/node-red/releases/tag/5.0.9)

**Para uma skill:** quando duas plataformas adotadas têm de trocar dados, o plano usa os webhooks e a API delas através do n8n ou do Node-RED antes de propor um serviço de integração escrito à medida.

## Ver também

- [Adotar antes de construir](adotar-antes-de-construir.md) (Plataformas para adotar antes de construir)
- [MCP (Model Context Protocol)](../ia/mcp-model-context-protocol.md) (Construir com IA)

Fonte: Sites, documentação e repositórios oficiais de cada plataforma, ligados em cada ponto; consultados a 2026-11-04. Não vem do PDF.

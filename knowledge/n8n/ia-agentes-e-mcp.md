---
id: n8n/ia-agentes-e-mcp
titulo: "IA, agentes e MCP no n8n"
seccao: "n8n"
paginas: []
fonte: "Documentação oficial do n8n sobre IA e MCP, ligada em cada ponto; consultada a 2026-11-26. Não vem do PDF."
verificado_em: 2026-11-26
editado_em: 2026-11-26
---

# IA, agentes e MCP no n8n

**Resumo:** O nó AI Agent trabalha sempre como agente com ferramentas e aceita modelos da Anthropic, entre outros. O MCP entra de três formas: um workflow exposto como servidor MCP, um nó que chama servidores MCP externos, e a instância inteira como servidor MCP, a que o Claude Code se liga por OAuth.

## Conteúdo

### Agentes

- O nó AI Agent funciona sempre como «Tools Agent» e precisa de pelo menos uma ferramenta; a 3.0 retira a versão 1 e os modos antigos. Fontes: [AI Agent](https://docs.n8n.io/integrations/builtin/cluster-nodes/root-nodes/n8n-nodes-langchain.agent/), [breaking changes da 3.0](https://docs.n8n.io/changelog/v30-breaking-changes)
- A Anthropic está entre os fornecedores de modelos de chat; há nós de avaliação (Evaluation e Evaluation Trigger) e aprovação humana antes de uma ferramenta correr. Fonte: [IA no n8n](https://docs.n8n.io/build/integrate-ai). Confiança: media (lido o índice, não cada página).

### MCP

- Três formas: o nó MCP Server Trigger expõe um workflow como servidor MCP; o nó MCP Client Tool deixa um agente chamar servidores MCP externos; a própria instância pode ser servidor MCP. Fonte: [MCP da instância](https://docs.n8n.io/connect/connect-to-n8n-mcp-server/)
- MCP da instância: liga-se nas definições («Instance-level MCP», «Enable MCP access»), por um owner ou admin; o URL acaba em `/mcp-server/http`; a autenticação é por OAuth (recomendada) ou por token Bearer; cada workflow só aparece se for marcado «Available in MCP»; `N8N_DISABLED_MODULES=mcp` desliga o módulo. As ferramentas deixam pesquisar, executar e construir workflows. Fonte: [MCP da instância](https://docs.n8n.io/connect/connect-to-n8n-mcp-server/)
- Claude Code: `claude mcp add --transport http n8n https://<domínio>/mcp-server/http`, e depois a autenticação OAuth. O diálogo «Connect a client» (desde a 2.33.0) dá os passos para cada cliente. Fonte: [clientes MCP](https://docs.n8n.io/connect/connect-to-n8n-mcp-server/mcp-client-examples)

**Para uma skill:** um workflow exposto por MCP prova-se com a lista de ferramentas vista no cliente (no Claude Code, `claude mcp list` ou `/mcp`) e com uma execução que aparece no histórico do n8n; só ficam «Available in MCP» os workflows de que o pedido precisa.

## Ver também

- [MCP (Model Context Protocol)](../ia/mcp-model-context-protocol.md) (Construir com IA)
- [Injeção de prompt: ameaças e mitigações](../ia/seguranca/injecao-de-prompt-mitigacoes.md) (Construir com IA)
- [Segurança de uma instância n8n](seguranca.md) (n8n)

Fonte: Documentação oficial do n8n sobre IA e MCP, ligada em cada ponto; consultada a 2026-11-26. Não vem do PDF.

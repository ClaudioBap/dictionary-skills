---
id: ia/agentes/protocolo-a2a
titulo: "Protocolo A2A (Agent2Agent)"
seccao: "Construir com IA"
paginas: []
fonte: "https://a2a-protocol.org e https://a2a-protocol.org/latest/specification/; consultados a 2026-11-10, páginas sem data. Não vem do PDF."
data_lancamento: null
confianca: media
verificado_em: 2026-11-10
---

# Protocolo A2A (Agent2Agent)

**Resumo:** Padrão aberto para agentes independentes conversarem entre si como pares; complementa o MCP, que liga um agente a ferramentas e dados.

## Conteúdo

- O A2A é «an open standard designed to facilitate communication and interoperability between independent, potentially opaque AI agent systems». A versão publicada mais recente é a 1.0.0; antes houve a 0.3.0, a 0.2.6 e a 0.1.0. Licença Apache 2.0. Fonte: [Especificação A2A](https://a2a-protocol.org/latest/specification/)
- Relação com o MCP: «A2A and MCP are complementary protocols designed for different aspects of agentic systems.» O MCP «focuses on standardizing how AI models and agents connect to and interact with tools, APIs, data sources and other external resources»; o A2A «focuses on standardizing how independent, often opaque, AI agents communicate and collaborate with each other as peers». Um agente cliente A2A pode pedir uma tarefa a um agente servidor, que por sua vez usa MCP para chegar às ferramentas. Fonte: o mesmo documento, anexo B.
- Governação: o repositório diz que é um projeto open source da Linux Foundation, contribuído pela Google, e o site anuncia a entrada na Agentic AI Foundation. A data desta mudança não foi confirmada. Fonte: [a2a-protocol.org](https://a2a-protocol.org)
- Para começar: a especificação, um tutorial em Python e SDKs estão ligados na página principal. As páginas lidas não dizem quando usar e quando não usar. Fonte: [a2a-protocol.org](https://a2a-protocol.org)

**Para uma skill:** um plano com vários agentes de sistemas diferentes regista se a comunicação entre eles usa A2A e se o acesso às ferramentas usa MCP.

## Ver também

- [MCP (Model Context Protocol)](../mcp-model-context-protocol.md) (Construir com IA)
- [Frameworks de agentes](frameworks-de-agentes.md) (Construir com IA)

Fonte: https://a2a-protocol.org e https://a2a-protocol.org/latest/specification/, consultados a 2026-11-10, páginas sem data. Não vem do PDF.

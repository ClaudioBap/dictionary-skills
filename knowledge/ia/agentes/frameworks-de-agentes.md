---
id: ia/agentes/frameworks-de-agentes
titulo: "Frameworks de agentes (OpenAI Agents SDK, Google ADK, LangGraph)"
seccao: "Construir com IA"
paginas: []
fonte: "Documentação oficial e repositórios de cada framework, ligados em cada ponto; consultados a 2026-11-10, páginas sem data. Não vem do PDF."
data_lancamento: null
confianca: media
verificado_em: 2026-11-10
---

# Frameworks de agentes (OpenAI Agents SDK, Google ADK, LangGraph)

**Resumo:** Três frameworks open source para quando o ciclo do agente já não cabe em código simples; escolhe-se pelo controlo que se quer sobre o estado e pelo fornecedor.

## Conteúdo

- OpenAI Agents SDK (licença MIT): «enables you to build agentic AI apps in a lightweight, easy-to-use package with very few abstractions». Tem passagem de tarefas entre agentes («allow agents to delegate to other agents for specific tasks»), guardrails («enable validation of agent inputs and outputs») e tracing. Serve quando se quer que o runtime gira os turnos, as ferramentas, os guardrails e as sessões. Não serve quando se quer gerir o ciclo e o estado à mão, ou quando o fluxo é curto: aí, a documentação manda usar a Responses API diretamente. Instala-se com `pip install openai-agents`. Fonte: [OpenAI Agents SDK](https://openai.github.io/openai-agents-python/)
- Google Agent Development Kit (licença Apache 2.0): «the open-source agent development framework that lets you build, debug, and deploy reliable AI agents at enterprise scale». Existe para Python, TypeScript, Go, Java e Kotlin. A versão 2.0 trouxe workflows em grafo, que juntam código determinístico com o raciocínio do modelo, e há secções sobre MCP e A2A. Instala-se com `pip install google-adk`. As páginas lidas não dizem quando não usar. Fonte: [ADK](https://adk.dev/)
- LangGraph (licença MIT, segundo o repositório): «a low-level orchestration framework and runtime for long-running, stateful agents». «Use LangGraph when you need explicit control over state and control flow.» Os checkpointers dão memória curta por conversa e permitem parar, rever e continuar com uma pessoa a meio («Pause execution, inspect or edit state, then continue»), com um `thread_id`. Os stores dão memória longa entre conversas. Em produção, o `InMemorySaver` perde os dados ao reiniciar, por isso usa-se um checkpointer persistente como o `PostgresSaver`. Instala-se com `pip install -U langgraph`. Fonte: [LangGraph](https://docs.langchain.com/oss/python/langgraph/overview), [Durable execution](https://docs.langchain.com/oss/python/langgraph/durable-execution)

**Para uma skill:** um framework de agentes só entra no plano depois de se mostrar que a API direta não chega (ver os padrões de agentes); e um agente com aprovação humana a meio guarda o estado numa base persistente.

## Ver também

- [Padrões de agentes](padroes-de-agentes.md) (Construir com IA)
- [Protocolo A2A](protocolo-a2a.md) (Construir com IA)
- [Agentes: as quatro formas de construir](../agentes-as-quatro-formas-de-construir.md) (Construir com IA)
- [Claude Code e Claude Agent SDK](../claude-code-e-claude-agent-sdk.md) (Construir com IA)

Fonte: documentação oficial e repositórios de cada framework, ligados em cada ponto; consultados a 2026-11-10, páginas sem data. Não vem do PDF.

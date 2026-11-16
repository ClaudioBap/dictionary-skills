---
id: ia/rag/memoria-de-agentes
titulo: "Memória de agentes (Mem0, Graphiti, A-MEM, Letta, memory tool)"
seccao: "Construir com IA"
paginas: []
fonte: "Artigos (arXiv), repositórios e documentação oficiais, ligados em cada ponto; consultados a 2026-11-10, só o resumo dos artigos. Não vem do PDF."
data_lancamento: 2025-04-28
confianca: media
verificado_em: 2026-11-10
---

# Memória de agentes (Mem0, Graphiti, A-MEM, Letta, memory tool)

**Resumo:** Um agente que trabalha durante semanas guarda o que aprendeu numa memória própria, em vez de reenviar a conversa inteira; isso baixa tokens e latência, e um grafo temporal regista como os factos mudam.

## Conteúdo

- Mem0: camada de memória que extrai, consolida e recupera o que importa da conversa. No benchmark LOCOMO, os autores reportam «26% relative improvements in the LLM-as-a-Judge metric over OpenAI», e face a enviar o contexto todo, «a 91% lower p95 latency» e «more than 90% token cost» poupado. Licença Apache 2.0. Fonte: [Mem0 (arXiv, 2025-04-28)](https://arxiv.org/abs/2504.19413), [mem0ai/mem0](https://github.com/mem0ai/mem0)
- Zep e Graphiti: o Graphiti é um grafo de conhecimento temporal, que regista quando cada relação passou a valer e deixou de valer, e junta conversa com dados de negócio. Os autores reportam 94.8% contra 93.4% do MemGPT no benchmark DMR, e ganhos de exatidão até 18.5% no LongMemEval. O Graphiti tem licença Apache 2.0 e funciona com Neo4j, FalkorDB ou Amazon Neptune. Os servidores de referência, incluindo o MCP, «have no authentication, no authorization, and no prompt-injection protection» e «are not production deployments». Fonte: [Zep (arXiv, 2025-01-20)](https://arxiv.org/abs/2501.13956), [getzep/graphiti](https://github.com/getzep/graphiti)
- A-MEM: memória em notas ligadas, «following the basic principles of the Zettelkasten method». Uma memória nova pode atualizar as antigas. Licença não confirmada. Fonte: [A-MEM (arXiv, 2025-02-17)](https://arxiv.org/abs/2502.12110)
- Letta (antes MemGPT): plataforma open source para agentes com estado e memória. Licença Apache 2.0. Fonte: [letta-ai/letta](https://github.com/letta-ai/letta)
- Memory tool da Claude Platform (`memory_20250818`): «operates client-side», guardando ficheiros em `/memories`, e é a tua aplicação que decide onde e como os dados ficam guardados. Fonte: [Memory tool](https://platform.claude.com/docs/en/agents-and-tools/tool-use/memory-tool)
- Os números são dos próprios autores, em benchmarks escolhidos por eles.

**Para uma skill:** um agente com conversas longas ou recorrentes tem uma memória com dono e local de armazenamento definidos (que dados, onde, por quanto tempo), em vez de reenviar o histórico; um servidor de referência sem autenticação não vai para produção.

## Ver também

- [Gestão de contexto e fiabilidade](../gestao-de-contexto-e-fiabilidade.md) (Construir com IA)
- [RAG em grafos (GraphRAG e LazyGraphRAG)](rag-em-grafos-graphrag.md) (Construir com IA)
- [Segurança e governação de IA](../seguranca-e-governacao-de-ia.md) (Construir com IA)

Fonte: artigos (arXiv), repositórios e documentação oficiais, ligados em cada ponto; consultados a 2026-11-10, só o resumo dos artigos. Não vem do PDF.

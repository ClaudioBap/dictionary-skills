---
id: ia/rag/rag-em-grafos-graphrag
titulo: "RAG em grafos (GraphRAG e LazyGraphRAG)"
seccao: "Construir com IA"
paginas: []
fonte: "Artigo, documentação, blogue de investigação e pacote oficiais da Microsoft, ligados em cada ponto; consultados a 2026-11-10. Não vem do PDF."
data_lancamento: 2024-04-24
confianca: alta
verificado_em: 2026-11-10
---

# RAG em grafos (GraphRAG e LazyGraphRAG)

**Resumo:** Um grafo de entidades com resumos por comunidade responde a perguntas sobre o corpus inteiro, que a pesquisa vetorial não cobre; o preço é o custo de indexação, que a LazyGraphRAG baixa para o nível do RAG vetorial.

## Conteúdo

- O RAG vetorial tem dificuldade em ligar informação espalhada por várias fontes e em resumir os temas de uma coleção grande. O GraphRAG usa um LLM para extrair um grafo de entidades e relações, gera resumos por comunidade e combina-os na resposta. Fonte: [From Local to Global (arXiv, 2024-04-24)](https://arxiv.org/abs/2404.16130), [documentação do GraphRAG](https://microsoft.github.io/graphrag/)
- Modos de consulta: Global (perguntas sobre o corpus inteiro), Local (entidades concretas), DRIFT, e Basic (top-k vetorial, para o que o RAG normal já resolve). Fonte: [documentação do GraphRAG](https://microsoft.github.io/graphrag/)
- Custo: na LazyGraphRAG, «data indexing costs are identical to vector RAG and 0.1% of the costs of full GraphRAG». Em perguntas globais, a qualidade é comparável à da Global Search, com «more than 700 times lower query cost». Fonte: [LazyGraphRAG (Microsoft Research, 2024-11-25)](https://www.microsoft.com/en-us/research/blog/lazygraphrag-setting-a-new-standard-for-quality-and-cost/)
- O índice completo do GraphRAG (resumos de entidades, relações e comunidades) também se lê e partilha como relatório, o que o índice da LazyGraphRAG não dá. Fonte: o mesmo artigo.
- A LazyGraphRAG foi integrada no Microsoft Discovery e no Azure Local (nota editorial de 2025-06-06 no mesmo artigo). Não está confirmado que exista no pacote open source.
- O pacote `graphrag` (licença MIT) está «largely in maintenance mode» e não recebe funcionalidades novas. A última versão é a 3.3.0, de 2026-10-08. Fonte: [graphrag no PyPI](https://pypi.org/project/graphrag/), [repositório](https://github.com/microsoft/graphrag)

**Para uma skill:** antes de propor GraphRAG, o plano compara o custo de indexar com o de consultar e regista se as perguntas são globais (sobre o corpus) ou locais; as locais começam por RAG vetorial ou pela LazyGraphRAG.

## Ver também

- [Grafos mais leves (LightRAG e HippoRAG)](grafos-leves-lightrag-e-hipporag.md) (Construir com IA)
- [Recuperação contextual, pesquisa híbrida e reranking](rag-recuperacao-contextual-hibrida-e-reranking.md) (Construir com IA)
- [Otimização de custo da IA](../otimizacao-de-custo-da-ia.md) (Construir com IA)

Fonte: artigo, documentação, blogue de investigação e pacote oficiais da Microsoft, ligados em cada ponto; consultados a 2026-11-10. Não vem do PDF.

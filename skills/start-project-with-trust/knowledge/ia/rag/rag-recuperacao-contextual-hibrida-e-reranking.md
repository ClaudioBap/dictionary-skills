---
id: ia/rag/rag-recuperacao-contextual-hibrida-e-reranking
titulo: "Recuperação contextual, pesquisa híbrida e reranking"
seccao: "Construir com IA"
paginas: []
fonte: "https://www.anthropic.com/news/contextual-retrieval; consultado a 2026-11-10. Não vem do PDF."
data_lancamento: 2024-09-19
confianca: alta
verificado_em: 2026-11-10
---

# Recuperação contextual, pesquisa híbrida e reranking

**Resumo:** Antes de montar um RAG, vê-se se a base cabe no prompt; se não cabe, junta-se contexto a cada pedaço, pesquisa por palavras (BM25) com embeddings, e reranking.

## Conteúdo

- Uma base com menos de 200 000 tokens (cerca de 500 páginas) vai inteira no prompt, com prompt caching, em vez de RAG. Fonte: [Contextual Retrieval (Anthropic, 2024-09-19)](https://www.anthropic.com/news/contextual-retrieval)
- Recuperação contextual: antes de indexar, o LLM escreve para cada pedaço um contexto curto que o situa no documento, e esse contexto entra nos embeddings e no BM25. O custo é único: «$1.02 per million document tokens», com prompt caching. Fonte: o mesmo artigo.
- Falhas de recuperação no top 20, nos testes da Anthropic: menos 35% só com embeddings contextuais, menos 49% juntando o BM25 contextual, menos 67% com reranking. Fonte: o mesmo artigo.
- Pesquisa híbrida: o BM25 apanha correspondências exatas (identificadores, códigos) que os embeddings falham, e os dois rankings juntam-se por fusão. No Elasticsearch, a fusão RRF usa a constante 60 por omissão (documentação sem data). Fonte: o mesmo artigo, [Reciprocal rank fusion (Elastic)](https://www.elastic.co/docs/reference/elasticsearch/rest-apis/reciprocal-rank-fusion)
- Reranking: recuperar 150 pedaços, reordená-los e passar 20 ao modelo. Mais pedaços dão mais precisão, e também mais latência e custo. Fonte: [Contextual Retrieval](https://www.anthropic.com/news/contextual-retrieval)

**Para uma skill:** um plano com RAG justifica porque a base não cabe no prompt, e inclui pesquisa híbrida e reranking ou regista porque não.

## Ver também

- [Gestão de contexto e fiabilidade](../gestao-de-contexto-e-fiabilidade.md) (Construir com IA)
- [Embeddings e base vetorial](embeddings-e-base-vetorial.md) (Construir com IA)
- [RAG em grafos (GraphRAG e LazyGraphRAG)](rag-em-grafos-graphrag.md) (Construir com IA)

Fonte: https://www.anthropic.com/news/contextual-retrieval, consultado a 2026-11-10. Não vem do PDF.

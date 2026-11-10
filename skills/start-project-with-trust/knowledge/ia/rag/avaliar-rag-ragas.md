---
id: ia/rag/avaliar-rag-ragas
titulo: "Avaliar um RAG (RAGAS)"
seccao: "Construir com IA"
paginas: []
fonte: "https://arxiv.org/abs/2309.15217 e https://docs.ragas.io/; consultados a 2026-11-10, só o resumo do artigo. Não vem do PDF."
data_lancamento: 2023-09-26
confianca: media
verificado_em: 2026-11-10
---

# Avaliar um RAG (RAGAS)

**Resumo:** Um RAG avalia-se em três partes separadas (o que se recuperou, a fidelidade da resposta ao que se recuperou e a qualidade da resposta), o que diz onde está a falha.

## Conteúdo

- O RAGAS é «a framework for reference-free evaluation of Retrieval Augmented Generation (RAG) pipelines», que avalia «without having to rely on ground truth human annotations». Fonte: [Ragas (arXiv, 2023-09-26, revisto a 2025-04-28)](https://arxiv.org/abs/2309.15217)
- Mede três coisas: «the ability of the retrieval system to identify relevant and focused context passages», «the ability of the LLM to exploit such passages in a faithful way» e «the quality of the generation itself». Fonte: o mesmo artigo.
- As métricas usam um LLM como avaliador. A lista de métricas está na documentação do projeto. Fonte: [docs.ragas.io](https://docs.ragas.io/)

**Para uma skill:** a eval de um RAG mede em separado a recuperação, a fidelidade ao contexto e a qualidade da resposta, para saber se a correção é na pesquisa ou no prompt.

## Ver também

- [Avaliação (evals)](../avaliacao-evals.md) (Construir com IA)
- [Grafos mais leves (LightRAG e HippoRAG)](grafos-leves-lightrag-e-hipporag.md) (Construir com IA)

Fonte: https://arxiv.org/abs/2309.15217 e https://docs.ragas.io/, consultados a 2026-11-10, só o resumo do artigo. Não vem do PDF.

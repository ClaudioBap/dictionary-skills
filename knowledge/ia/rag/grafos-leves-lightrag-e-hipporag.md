---
id: ia/rag/grafos-leves-lightrag-e-hipporag
titulo: "Grafos mais leves (LightRAG e HippoRAG)"
seccao: "Construir com IA"
paginas: []
fonte: "Artigos (arXiv) e repositórios dos autores, ligados em cada ponto; consultados a 2026-11-10, só o resumo dos artigos. Não vem do PDF."
data_lancamento: 2024-05-23
confianca: media
verificado_em: 2026-11-10
---

# Grafos mais leves (LightRAG e HippoRAG)

**Resumo:** Alternativas ao GraphRAG que juntam grafo e vetores com menos chamadas ao LLM; os métodos com grafo podem ficar abaixo do RAG normal em perguntas factuais simples.

## Conteúdo

- LightRAG: grafo e vetores no mesmo índice, recuperação a dois níveis e atualização incremental, pensado para dados que mudam depressa. Licença MIT. Os autores dizem que melhora o tempo de resposta, sem números no resumo. Fonte: [LightRAG (arXiv, 2024-10-08)](https://arxiv.org/abs/2410.05779), [HKUDS/LightRAG](https://github.com/HKUDS/LightRAG)
- HippoRAG: grafo de conhecimento com Personalized PageRank. Em perguntas multi-hop, a recuperação num só passo é comparável ou melhor que o IRCoT, «while being 10-30 times cheaper and 6-13 times faster». Fonte: [HippoRAG (arXiv, 2024-05-23)](https://arxiv.org/abs/2405.14831)
- HippoRAG 2: nos métodos com grafo anteriores, o desempenho em tarefas factuais básicas «drops considerably below standard RAG». A versão 2 diz corrigir isso e consegue «a 7% improvement in associative memory tasks over the state-of-the-art embedding model». Licença MIT. Fonte: [HippoRAG 2 (arXiv, 2025-02-20)](https://arxiv.org/abs/2502.14802), [OSU-NLP-Group/HippoRAG](https://github.com/OSU-NLP-Group/HippoRAG)
- Os números são dos próprios autores, em benchmarks escolhidos por eles.

**Para uma skill:** um RAG com grafo só entra no plano com uma eval que o compare com o RAG vetorial nas perguntas reais do cliente, incluindo as factuais simples.

## Ver também

- [RAG em grafos (GraphRAG e LazyGraphRAG)](rag-em-grafos-graphrag.md) (Construir com IA)
- [Avaliação (evals)](../avaliacao-evals.md) (Construir com IA)

Fonte: artigos (arXiv) e repositórios dos autores, ligados em cada ponto; consultados a 2026-11-10, só o resumo dos artigos. Não vem do PDF.

---
id: ia/rag/rag-adaptativo-e-autocorretivo
titulo: "RAG adaptativo e autocorretivo (Self-RAG, CRAG, RAPTOR)"
seccao: "Construir com IA"
paginas: []
fonte: "Artigos dos autores (arXiv), ligados em cada ponto; consultados a 2026-11-10, só o resumo. Não vem do PDF."
data_lancamento: 2023-10-17
confianca: media
verificado_em: 2026-11-10
---

# RAG adaptativo e autocorretivo (Self-RAG, CRAG, RAPTOR)

**Resumo:** Em vez de recuperar sempre o mesmo número de pedaços, o sistema decide quando recuperar, avalia o que recuperou e corrige; para documentos longos, recupera em vários níveis de resumo.

## Conteúdo

- Self-RAG: um modelo treinado que recupera passagens só quando precisa e usa «reflection tokens» para criticar o que recuperou e o que escreveu. Parte de que recuperar um número fixo de passagens, precise ou não, pode piorar a resposta. Fonte: [Self-RAG (arXiv, 2023-10-17)](https://arxiv.org/abs/2310.11511)
- CRAG (Corrective RAG): um avaliador leve dá uma nota aos documentos recuperados e, conforme a confiança, usa-os, filtra-os ou alarga a pesquisa à web. Útil quando a recuperação na base própria é fraca. Fonte: [Corrective Retrieval Augmented Generation (arXiv, 2024-01-29)](https://arxiv.org/abs/2401.15884)
- RAPTOR: agrupa e resume os pedaços de forma recursiva, numa árvore com vários níveis de resumo, e recupera em todos os níveis. Resolve perguntas sobre o documento inteiro, que pedaços curtos não cobrem. Fonte: [RAPTOR (arXiv, 2024-01-31)](https://arxiv.org/abs/2401.18059)
- Nenhum dos três resumos indica custo, latência ou custo de indexação.

**Para uma skill:** quando a recuperação falha em perguntas reais, o plano considera primeiro avaliar e filtrar o que se recuperou (CRAG) antes de trocar de arquitetura, e mede o custo extra das chamadas ao modelo.

## Ver também

- [Recuperação contextual, pesquisa híbrida e reranking](rag-recuperacao-contextual-hibrida-e-reranking.md) (Construir com IA)
- [RAG em grafos (GraphRAG e LazyGraphRAG)](rag-em-grafos-graphrag.md) (Construir com IA)

Fonte: artigos dos autores (arXiv), ligados em cada ponto; consultados a 2026-11-10, só o resumo. Não vem do PDF.

---
id: plataformas/pesquisa
titulo: "Pesquisa (Meilisearch, Typesense)"
seccao: "Plataformas para adotar antes de construir"
paginas: []
fonte: "Documentação e ficheiro de licença do Meilisearch e documentação do Typesense, ligados em cada ponto; consultados a 2026-11-10, páginas sem data. Não vem do PDF."
data_lancamento: null
confianca: media
verificado_em: 2026-11-10
---

# Pesquisa (Meilisearch, Typesense)

**Resumo:** Pesquisa de texto com tolerância a erros e facetas vem de um motor próprio; a licença do Meilisearch é dupla (MIT, e BUSL-1.1 na edição Enterprise) e a do Typesense não se conseguiu ler.

## Conteúdo

- Meilisearch: texto completo, tolerância a gralhas, facetas, pesquisa semântica, híbrida e RAG. «Deploy on your own infrastructure»; é um «single binary with a REST API». A nuvem começa com «Start with a 14-day free trial», sem valores na página. Localização dos dados na UE: não confirmada nas páginas lidas. Fonte: [Meilisearch docs](https://www.meilisearch.com/docs)
- Licença do Meilisearch: SPDX «MIT AND BUSL-1.1», MIT na maior parte e «Business Source License 1.1» nas partes da Enterprise Edition. A parte que se usa decide a licença que se aceita. Fonte: [LICENSE (meilisearch/meilisearch)](https://github.com/meilisearch/meilisearch/blob/main/LICENSE)
- Typesense: a documentação não indica a licença do motor (só diz que o site da documentação é open source), e os ficheiros LICENSE tentados no repositório devolveram 404: licença não confirmada. Localização dos dados na UE: não confirmada nas páginas lidas. Fonte: [Typesense docs](https://typesense.org/docs/)
- OpenSearch e a comparação com o Meilisearch: ver [Pesquisa (OpenSearch, Meilisearch)](../infraestrutura/pesquisa-opensearch-meilisearch.md). Pesquisa semântica e híbrida sobre documentos: ver a secção de RAG.

**Para uma skill:** um pedido de pesquisa tem um motor próprio como opção em «Adotar ou construir», com a licença da parte que se vai usar na coluna «Risco», e `LIKE` na base nunca é a única resposta.

## Ver também

- [Pesquisa (OpenSearch, Meilisearch)](../infraestrutura/pesquisa-opensearch-meilisearch.md) (Serviços de infraestrutura)
- [Recuperação contextual, pesquisa híbrida e reranking](../ia/rag/rag-recuperacao-contextual-hibrida-e-reranking.md) (Construir com IA)
- [Embeddings e base vetorial](../ia/rag/embeddings-e-base-vetorial.md) (Construir com IA)

Fonte: documentação e ficheiro de licença do Meilisearch e documentação do Typesense, ligados em cada ponto; consultados a 2026-11-10, páginas sem data. Não vem do PDF.

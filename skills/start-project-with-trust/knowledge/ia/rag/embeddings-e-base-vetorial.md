---
id: ia/rag/embeddings-e-base-vetorial
titulo: "Embeddings e base vetorial"
seccao: "Construir com IA"
paginas: []
fonte: "Documentação da Claude Platform e repositório do pgvector, ligados em cada ponto; consultados a 2026-11-10, páginas sem data. Não vem do PDF."
data_lancamento: null
confianca: media
verificado_em: 2026-11-10
---

# Embeddings e base vetorial

**Resumo:** A Anthropic não tem modelo de embeddings, por isso o fornecedor e a base vetorial são uma decisão à parte; o pgvector guarda os vetores no PostgreSQL que o projeto já tem.

## Conteúdo

- «Anthropic does not offer its own embedding model.» A documentação aponta a Voyage AI (MongoDB) como um fornecedor e diz para avaliar outros. Modelos gerais recomendados: voyage-4-large (qualidade), voyage-4 (equilíbrio) e voyage-4-lite (latência e custo). Fonte: [Embeddings (Claude Platform)](https://platform.claude.com/docs/en/build-with-claude/embeddings)
- pgvector: extensão do PostgreSQL com índices HNSW e IVFFlat. A versão nas instruções de instalação é a 0.8.7; a 0.9.0 está por lançar. Licença do tipo PostgreSQL, permissiva *(interpretação: o ficheiro LICENSE não diz o nome)*. Fonte: [pgvector](https://github.com/pgvector/pgvector), [CHANGELOG](https://github.com/pgvector/pgvector/blob/master/CHANGELOG.md)
- Guardar os vetores na base de dados que o projeto já tem evita mais um serviço e mantém os dados na mesma jurisdição *(interpretação)*.

**Para uma skill:** o modelo de embeddings e a base vetorial são decisões com fonte, e prefere-se a base de dados do projeto quando ela suporta vetores.

## Ver também

- [Recuperação contextual, pesquisa híbrida e reranking](rag-recuperacao-contextual-hibrida-e-reranking.md) (Construir com IA)
- [Inventário de dependências por jurisdição](../../soberania/inventario-de-dependencias-por-jurisdicao.md) (Soberania digital)

Fonte: documentação da Claude Platform e repositório do pgvector, ligados em cada ponto; consultados a 2026-11-10, páginas sem data. Não vem do PDF.

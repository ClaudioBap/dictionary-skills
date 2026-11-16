---
id: ia/rag/rag-de-documentos-visuais-colpali
titulo: "RAG de documentos visuais (ColPali)"
seccao: "Construir com IA"
paginas: []
fonte: "https://arxiv.org/abs/2407.01449; consultado a 2026-11-10, só o resumo. Não vem do PDF."
data_lancamento: 2024-06-27
confianca: media
verificado_em: 2026-11-10
---

# RAG de documentos visuais (ColPali)

**Resumo:** Quando a informação está em tabelas, figuras ou na paginação, indexar a imagem da página evita a extração de texto e o que ela perde.

## Conteúdo

- O ColPali cria os embeddings diretamente a partir das imagens das páginas, em vez do texto extraído, com vários vetores por página e «late interaction» na comparação com a pergunta. Fonte: [ColPali (arXiv, 2024-06-27)](https://arxiv.org/abs/2407.01449)
- Serve documentos que comunicam por figuras, tabelas, paginação ou tipo de letra. Os autores descrevem as cadeias de extração de texto como lentas e frágeis e dizem que o ColPali as supera; o resumo não dá números. Fonte: o mesmo artigo.
- O resumo não fala de custo de computação, latência nem espaço ocupado pelos vários vetores por página.

**Para uma skill:** num RAG sobre PDFs com tabelas e figuras (faturas, relatórios, contratos digitalizados), o plano compara a recuperação por imagem da página com a extração de texto, numa amostra dos documentos do cliente.

## Ver também

- [Embeddings e base vetorial](embeddings-e-base-vetorial.md) (Construir com IA)

Fonte: https://arxiv.org/abs/2407.01449, consultado a 2026-11-10, só o resumo. Não vem do PDF.

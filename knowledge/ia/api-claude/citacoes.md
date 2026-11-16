---
id: ia/api-claude/citacoes
titulo: "Citações"
seccao: "Construir com IA"
paginas: []
fonte: "Documentação da Claude Platform, ligada em cada ponto; consultada a 2026-11-10, páginas sem data. Não vem do PDF."
data_lancamento: null
confianca: media
verificado_em: 2026-11-10
---

# Citações

**Resumo:** Com as citações ligadas, cada afirmação da resposta vem acompanhada do excerto exato do documento que a apoia.

## Conteúdo

- O que é: «Citations return the exact passages that support each claim.» Funciona em todos os modelos ativos. Fonte: [Citations](https://platform.claude.com/docs/en/build-with-claude/citations)
- Como usar: no bloco do documento, `"citations": {"enabled": true}`, ligado em todos os documentos do pedido ou em nenhum. São aceites PDFs, texto simples (`"type":"text","media_type":"text/plain"`) e documentos de conteúdo personalizado. Fonte: [Citations](https://platform.claude.com/docs/en/build-with-claude/citations)
- O que volta: os blocos de texto trazem um array `citations`, com `type`, `cited_text`, `document_index` e `document_title`, e a localização: `char_location` (`start_char_index`, a contar de 0, em texto simples), `page_location` (`start_page_number`, a contar de 1, em PDF) ou `content_block_location` (conteúdo personalizado). Fonte: [Citations](https://platform.claude.com/docs/en/build-with-claude/citations)
- Limites e custo: «Citations cannot be used together with structured outputs», e com `output_config.format` a API devolve 400. Só há citações de texto. Ligar as citações acrescenta um pouco de custo de entrada; o `cited_text` não conta como tokens de saída nem como entrada nos turnos seguintes. Combina com prompt caching, contagem de tokens e batches. Fonte: [Citations](https://platform.claude.com/docs/en/build-with-claude/citations)

**Para uma skill:** as respostas sobre documentos do cliente (contratos, políticas, relatórios) mostram ao utilizador o excerto citado e a página, a partir de `citations`.

## Ver também

- [Recuperação contextual, pesquisa híbrida e reranking](../rag/rag-recuperacao-contextual-hibrida-e-reranking.md) (Construir com IA)
- [Saída estruturada (JSON e strict tool use)](saida-estruturada.md) (Construir com IA)

Fonte: documentação da Claude Platform, ligada em cada ponto; consultada a 2026-11-10, páginas sem data. Não vem do PDF.

---
id: ia/api-claude/streaming
titulo: "Streaming"
seccao: "Construir com IA"
paginas: []
fonte: "Documentação da Claude Platform, ligada em cada ponto; consultada a 2026-11-10, páginas sem data. Não vem do PDF."
data_lancamento: null
confianca: media
verificado_em: 2026-11-10
---

# Streaming

**Resumo:** Com `"stream": true`, a resposta chega aos poucos como server-sent events, em vez de chegar toda no fim.

## Conteúdo

- Como usar: `"stream": true` no pedido. Os SDK têm ajudas que juntam a mensagem final: `stream.get_final_message()` em Python e `stream.finalMessage()` em TypeScript. Fonte: [Streaming](https://platform.claude.com/docs/en/build-with-claude/streaming)
- Ordem dos eventos: `message_start`; por cada bloco de conteúdo, `content_block_start`, um ou mais `content_block_delta` e `content_block_stop`; depois um ou mais `message_delta`; no fim, `message_stop`. Os eventos `ping` e `error` podem aparecer em qualquer altura. Fonte: [Streaming](https://platform.claude.com/docs/en/build-with-claude/streaming)
- Tipos de delta: `text_delta`, `input_json_delta`, `thinking_delta` e `signature_delta`. O `usage` em `message_delta` é cumulativo. Fonte: [Streaming](https://platform.claude.com/docs/en/build-with-claude/streaming)
- Erros a meio da resposta: um `overloaded_error` chega como evento `error`; fora de streaming, seria um HTTP 529. Fonte: [Streaming](https://platform.claude.com/docs/en/build-with-claude/streaming)
- Para pedidos longos, a documentação de erros recomenda streaming ou batches, sobretudo acima de 10 minutos. Fonte: [Errors](https://platform.claude.com/docs/en/api/errors)

**Para uma skill:** as interfaces que mostram a resposta ao utilizador, e os pedidos que podem passar de 10 minutos, usam streaming, e o código trata o evento `error` a meio da resposta.

## Ver também

- [Limites de taxa e erros](limites-de-taxa-e-erros.md) (Construir com IA)
- [Message Batches API](message-batches.md) (Construir com IA)

Fonte: documentação da Claude Platform, ligada em cada ponto; consultada a 2026-11-10, páginas sem data. Não vem do PDF.

---
id: ia/api-claude/limites-de-taxa-e-erros
titulo: "Limites de taxa e erros"
seccao: "Construir com IA"
paginas: []
fonte: "Documentação da Claude Platform, ligada em cada ponto; consultada a 2026-11-10, páginas sem data. Não vem do PDF."
data_lancamento: null
confianca: media
verificado_em: 2026-11-10
---

# Limites de taxa e erros

**Resumo:** Os limites contam pedidos e tokens por minuto, por classe de modelo; a leitura da cache não conta para a entrada, e os erros 429 e 529 tratam-se com novas tentativas e espera crescente.

## Conteúdo

- Como se medem: RPM, ITPM e OTPM por classe de modelo, com um balde de tokens em que «capacity is continuously replenished». Picos curtos podem disparar o limite: 60 RPM pode ser aplicado como 1 pedido por segundo. Fonte: [Rate limits](https://platform.claude.com/docs/en/api/rate-limits)
- Cache: «Claude's default ITPM rate limits count only uncached input tokens». Contam `input_tokens` e `cache_creation_input_tokens`; não conta `cache_read_input_tokens`. O OTPM conta os tokens gerados, e o `max_tokens` não entra na conta. Os limites são partilhados entre todos os valores de `inference_geo`. Fonte: [Rate limits](https://platform.claude.com/docs/en/api/rate-limits)
- Escalões: Start, Build, Scale e Custom. No Opus 5.5: Start com 4 000 RPM, 2 000 000 ITPM e 400 000 OTPM; Build com 10 000, 5 000 000 e 1 000 000; Scale com 13 000, 10 000 000 e 2 000 000. Tetos de gasto mensais: $500 (Start), $1 000 (Build) e $200 000 (Scale); o Custom não tem teto. As tabelas completas estão na página. Fonte: [Rate limits](https://platform.claude.com/docs/en/api/rate-limits)
- Cabeçalhos: `retry-after` (em segundos; não vem nos 429 por teto de gasto), e `anthropic-ratelimit-requests-limit`, `anthropic-ratelimit-requests-remaining` e `anthropic-ratelimit-requests-reset` (RFC 3339), com equivalentes para `tokens-`, `input-tokens-` e `output-tokens-`. Os valores restantes vêm arredondados ao milhar. Fonte: [Rate limits](https://platform.claude.com/docs/en/api/rate-limits)
- Erros: 400 `invalid_request_error`, 401 `authentication_error`, 402 `billing_error`, 403 `permission_error`, 404 `not_found_error`, 409 `conflict_error`, 413 `request_too_large`, 429 `rate_limit_error`, 500 `api_error`, 504 `timeout_error` e 529 `overloaded_error`, que «can occur when the API experiences high traffic across all users». Tamanho máximo do pedido: 128 MB (Messages), 256 MB (Batch) e 500 MB (Files). Cada resposta traz um `request-id`. Fonte: [Errors](https://platform.claude.com/docs/en/api/errors)
- Novas tentativas: os SDK repetem «twice by default», com espera exponencial e respeitando `retry-after`; configura-se com `max_retries`. Nos erros 500, a documentação manda repetir com espera exponencial. Para pedidos longos, streaming ou batches, sobretudo acima de 10 minutos. Fonte: [Errors](https://platform.claude.com/docs/en/api/errors)

**Para uma skill:** o cliente da API repete os erros 429, 500 e 529 com espera exponencial e `retry-after`, regista o `request-id` de cada falha, e o plano confirma que o escalão da organização cobre o volume previsto.

## Ver também

- [Prompt caching](prompt-caching.md) (Construir com IA)
- [Streaming](streaming.md) (Construir com IA)
- [Gestão de contexto e fiabilidade](../gestao-de-contexto-e-fiabilidade.md) (Construir com IA)

Fonte: documentação da Claude Platform, ligada em cada ponto; consultada a 2026-11-10, páginas sem data. Não vem do PDF.

---
id: ia/fornecedores/openai-api
titulo: "OpenAI API: batch, cache, saída estruturada e controlo de dados"
seccao: "Construir com IA"
paginas: []
fonte: "Documentação oficial da OpenAI (developers.openai.com), ligada em cada ponto; consultada a 2026-11-10, páginas sem data. Não vem do PDF."
data_lancamento: null
confianca: media
verificado_em: 2026-11-10
---

# OpenAI API: batch, cache, saída estruturada e controlo de dados

**Resumo:** O que a API da OpenAI oferece para trabalho em lote, cache, saída estruturada, pesquisa em ficheiros e voz, e em que condições guarda os dados e os mantém na Europa.

## Conteúdo

- Batch API: «50% cost discount compared to synchronous APIs». A janela de conclusão é fixa: «For now, the completion window can only be set to `24h`.» Limites: «A single batch may include up to 50,000 requests, and a batch input file can be up to 200 MB in size» e «You can create up to 2,000 batches per hour». Para usar: carregar um `.jsonl` pela Files API com `purpose: "batch"` e criar o batch com `input_file_id`, `endpoint` e `completion_window` (`"24h"`). Aceita `/v1/responses`, `/v1/chat/completions`, `/v1/embeddings`, `/v1/completions`, `/v1/moderations`, `/v1/images/generations` e `/v1/images/edits`. Fonte: [Batch API](https://developers.openai.com/api/docs/guides/batch)
- Responses API: «While Chat Completions remains supported, Responses is recommended for all new projects.» Na migração, `messages` passa a `input`, as instruções vão em `instructions`, `response_format` passa a `text.format`, e `previous_response_id` encadeia os turnos. Fonte: [Migrate to Responses](https://developers.openai.com/api/docs/guides/migrate-to-responses)
- Prompt caching: «Prompt caching is enabled by default for supported OpenAI models.» Mínimo: «The minimum cacheable prompt length is 1,024 tokens for GPT-5.6 and later.» A entrada em cache tem desconto até 95%. No GPT-5.6 e seguintes, ler da cache custa 0,1 vezes o preço normal de entrada, e 0,05 vezes no GPT-6.1 Sol e no GPT-6.1 Terra. A duração escolhe-se com `prompt_cache_options.ttl`: `"30m"` por omissão ou `"12h"`. Fonte: [Prompt caching](https://developers.openai.com/api/docs/guides/prompt-caching)
- Saída estruturada: na Responses API, `text.format` com `{ type: "json_schema", strict: true, schema: ... }`. Na Chat Completions, `response_format` com JSON schema só é suportado em versões antigas específicas. Os limites dos esquemas suportados não foram lidos até ao fim. Fonte: [Structured outputs](https://developers.openai.com/api/docs/guides/structured-outputs)
- Pesquisa em ficheiros: ferramenta `"file_search"` sobre vector stores. Preço: «File search storage: $0.10 / GB per day 1 GB free» e «File search tool calls: $2.50 / 1k calls». Fonte: [File search](https://developers.openai.com/api/docs/guides/tools-file-search), [Pricing](https://developers.openai.com/api/docs/pricing)
- Realtime API: voz para voz com estado da conversa e chamadas a ferramentas, por WebRTC (no browser) ou WebSocket (no servidor). O servidor cria um segredo temporário com `POST /v1/realtime/client_secrets`. A página não dá preços. Fonte: [Realtime](https://developers.openai.com/api/docs/guides/realtime)
- Fine-tuning: «OpenAI is winding down the fine-tuning platform.» Já não aceita utilizadores novos, e os atuais podem criar treinos nos próximos meses. Métodos listados: supervisionado e DPO (família gpt-4.1 de 2025-04-14) e visão (gpt-4o-2024-08-06). Fonte: [Model optimization](https://developers.openai.com/api/docs/guides/model-optimization)
- Dados: «As of March 1, 2023, data sent to the OpenAI API is not used to train or improve OpenAI models.» Por omissão, «abuse monitoring logs are generated for all API feature usage and retained for up to 30 days». A retenção zero está «subject to prior approval by OpenAI». Para guardar dados fora dos EUA, «you must be approved»; na Europa (EEE e Suíça) é preciso ter «Zero Data Retention, Modified Abuse Monitoring, Private Retention with PSP, or Safety Retention». Há um acréscimo de preço para os «models released on or after March 5, 2026, that are eligible for data residency». Fonte: [Your data](https://developers.openai.com/api/docs/guides/your-data)

**Para uma skill:** um plano que use a API da OpenAI com dados de clientes europeus regista se a residência na Europa foi aprovada e que modo de retenção a cobre; um plano novo não depende do fine-tuning da OpenAI.

## Ver também

- [Batch e cache entre fornecedores](batch-e-cache-entre-fornecedores.md) (Construir com IA)
- [Gemini API](gemini-api.md) (Construir com IA)
- [Otimização de custo da IA](../otimizacao-de-custo-da-ia.md) (Construir com IA)

Fonte: documentação oficial da OpenAI (developers.openai.com), ligada em cada ponto; consultada a 2026-11-10, páginas sem data. Não vem do PDF.

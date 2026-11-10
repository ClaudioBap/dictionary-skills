---
id: ia/fornecedores/gemini-api
titulo: "Gemini API: modelos, batch, cache, grounding e dados"
seccao: "Construir com IA"
paginas: []
fonte: "Documentação oficial da Google (aistudio.google.com/docs e docs.cloud.google.com), ligada em cada ponto; consultada a 2026-11-10, páginas sem data salvo indicação. Não vem do PDF."
data_lancamento: null
confianca: media
verificado_em: 2026-11-10
---

# Gemini API: modelos, batch, cache, grounding e dados

**Resumo:** O que a API do Gemini oferece para trabalho em lote, cache, pesquisa na web, saída estruturada, ficheiros e voz, e a diferença entre o escalão grátis e o pago no uso dos dados.

## Conteúdo

- A documentação passou de ai.google.dev para aistudio.google.com/docs (redirecionamento permanente). Fonte: [Models](https://aistudio.google.com/docs/models)
- Modelos listados: Gemini 4 Argon (`gemini-4-argon`, sem estado indicado), Gemini 3.8 Flash, 3.8 Live e 3.8 Live Extended Thinking (novos), 3.6 Flash, 3.5 Flash-Lite e 3.1 Flash-Lite (estáveis), 3.1 Pro (`gemini-3.1-pro-preview`), 3 Flash (preview), 2.5 Flash e 2.5 Pro (descontinuados) e 2.5 Flash-Lite, que «will continue to be served until further notice». Só o Gemini 4 Argon tem contexto indicado: «a shared 1M context window and long decodes up to 1M tokens». Fonte: [Models](https://aistudio.google.com/docs/models)
- Batch: «at 50% of the standard cost». «The target turnaround time is 24 hours, but in majority of cases, it is much quicker.» Pedidos inline com o total abaixo de 20 MB; ficheiro de entrada até 2 GB. Cria-se com `client.batches.create` (Python) ou `ai.batches.create` (JavaScript), com `model`, `src` e `config`. Fonte: [Batch API](https://aistudio.google.com/docs/batch-api)
- Cache: «Implicit caching is enabled by default for all Gemini 2.5 and newer models.» A cache explícita existe nos modelos 3 e 2.5 suportados, mas «is not supported in the Interactions API, or for Gemini 4 Argon and onward». Mínimo de tokens: 4 096 no Gemini 4 Argon, 3.8 Flash, 3.6 Flash e 3.1 Pro Preview; 2 048 no 2.5 Flash e 2.5 Pro. Os acertos leem-se em `usage.total_cached_tokens`. Exemplos de preço no escalão pago: 2.5 Flash, entrada em cache «$0.03» e armazenamento «$1.00 / 1,000,000 tokens per hour»; 2.5 Pro, «$0.125, prompts <= 200k tokens» e «$4.50 / 1,000,000 tokens per hour». A duração da cache por omissão não foi confirmada. Fonte: [Context caching](https://aistudio.google.com/docs/caching), [Pricing](https://aistudio.google.com/docs/pricing)
- Grounding com Google Search: ativa-se com a ferramenta `google_search`. No Gemini 3 e seguintes, a cobrança é por pesquisa: «5,000 free search requests per month shared across all Gemini 3 and newer models, and then costs $14 per 1,000 search requests», com um limite de 1 500 pedidos por dia e por projeto no escalão pago. No Gemini 2.5 e anteriores, a cobrança é por prompt, e a página de preços indica para o 2.5 Flash e o 2.5 Pro «1,500 RPD (free), then $35 / 1,000 grounded prompts». As duas páginas descrevem modelos de cobrança diferentes; confirmar o preço em vigor antes de o citar. Fonte: [Grounding with Google Search](https://aistudio.google.com/docs/google-search), [Pricing](https://aistudio.google.com/docs/pricing)
- Saída estruturada: `response_format` com um objeto do tipo `text`, `mime_type` `application/json` e o esquema no campo `schema`. Com ferramentas, está em preview e só nos modelos da série Gemini 3. Fonte: [Structured output](https://aistudio.google.com/docs/structured-output)
- Files API: «per-file maximum size of 2 GB», até 20 GB por projeto, e «Files are automatically deleted after 48 hours.» Fonte: [Files API](https://aistudio.google.com/docs/files)
- Live API: «The Live API enables low-latency, real-time voice and vision interactions with Gemini», por uma ligação WebSocket com estado, em 70 línguas, com interrupção pelo utilizador, chamadas a funções e Google Search. Quais os modelos de áudio nativo não foi confirmado. Fonte: [Live API](https://aistudio.google.com/docs/live-api)
- Dados no escalão grátis (termos em vigor desde 2026-03-23): «Google uses the content you submit to the Services and any generated responses to provide, improve, and develop», e os termos desaconselham enviar dados sensíveis, confidenciais ou pessoais; revisores humanos podem lê-los. Nos serviços pagos, a Google não usa os prompts nem as respostas para melhorar os produtos. Fonte: [Terms](https://aistudio.google.com/docs/terms)
- Residência na UE (Vertex AI): «The European Union multi-region (`eu`) endpoint strictly covers data residency within EU member states.» Os endpoints globais «don't provide regional isolation or data residency guarantees». A multirregião UE está listada para os modelos Google (exceto Chirp 2) e para modelos de parceiros (Claude, Mistral, Codestral). Fonte: [Vertex AI data residency](https://docs.cloud.google.com/vertex-ai/generative-ai/docs/learn/data-residency)

**Para uma skill:** um plano com o Gemini e dados de clientes usa o escalão pago e, para residência na UE, o endpoint `eu` da Vertex AI; o escalão grátis só serve dados públicos ou de teste.

## Ver também

- [OpenAI API](openai-api.md) (Construir com IA)
- [Batch e cache entre fornecedores](batch-e-cache-entre-fornecedores.md) (Construir com IA)

Fonte: documentação oficial da Google (aistudio.google.com/docs e docs.cloud.google.com), ligada em cada ponto; consultada a 2026-11-10, páginas sem data salvo indicação. Não vem do PDF.

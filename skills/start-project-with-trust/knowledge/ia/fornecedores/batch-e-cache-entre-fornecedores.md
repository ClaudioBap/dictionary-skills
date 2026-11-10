---
id: ia/fornecedores/batch-e-cache-entre-fornecedores
titulo: "Batch e cache entre fornecedores (Claude, OpenAI, Gemini)"
seccao: "Construir com IA"
paginas: []
fonte: "Documentação oficial da Anthropic, da OpenAI e da Google, ligada em cada ponto; consultada a 2026-11-10, páginas sem data. Não vem do PDF."
data_lancamento: null
confianca: media
verificado_em: 2026-11-10
---

# Batch e cache entre fornecedores (Claude, OpenAI, Gemini)

**Resumo:** Os três fornecedores cobram metade em batch e descontam a entrada em cache, mas diferem nos limites, no tempo de resposta, no mínimo para a cache e na duração dela.

## Conteúdo

Batch:

| | Claude | OpenAI | Gemini |
|---|---|---|---|
| Desconto | 50% | 50% | 50% |
| Limite por batch | 100 000 pedidos ou 256 MB | 50 000 pedidos, ficheiro até 200 MB | Pedidos inline até 20 MB; ficheiro até 2 GB; número máximo de pedidos não indicado |
| Tempo | A maioria em menos de 1 hora; expira se não terminar em 24 horas | Janela fixa de 24 horas | Objetivo de 24 horas, quase sempre menos |
| Resultados guardados | 29 dias | Não indicado | Não indicado |

Cache de prompt:

| | Claude | OpenAI | Gemini |
|---|---|---|---|
| Como se ativa | Automática (um `cache_control` no pedido) ou explícita por bloco | Automática nos modelos suportados | Implícita por omissão (2.5 e seguintes); explícita nos modelos 3 e 2.5 suportados, não no 4 Argon |
| Mínimo | 512 tokens no Haiku 5.5 e Opus 5.5; outros modelos de 1 024 a 4 096 | 1 024 tokens no GPT-5.6 e seguintes | 4 096 no 4 Argon, 3.8 Flash, 3.6 Flash e 3.1 Pro Preview; 2 048 no 2.5 |
| Ler da cache | 0,1 vezes a entrada; 0,05 no Opus 5.5 e Sonnet 5.5; 0,025 no Fable e no Mythos | 0,1 vezes no GPT-5.6 e seguintes; 0,05 no GPT-6.1 Sol e Terra | Preço por modelo, mais armazenamento por hora |
| Escrever na cache | 1,25 vezes (5 minutos) ou 2 vezes (1 hora) | Não indicado | Armazenamento por milhão de tokens e por hora |
| Duração | 5 minutos, renovados a cada uso, ou 1 hora | 30 minutos por omissão ou 12 horas | Não confirmada |

- Na Claude API, batch e cache combinam-se, e a documentação recomenda a cache de 1 hora porque os batches podem demorar mais de 5 minutos. Fonte: [Batch processing](https://platform.claude.com/docs/en/build-with-claude/batch-processing), [Prompt caching](https://platform.claude.com/docs/en/build-with-claude/prompt-caching)
- Fontes da OpenAI: [Batch API](https://developers.openai.com/api/docs/guides/batch), [Prompt caching](https://developers.openai.com/api/docs/guides/prompt-caching)
- Fontes da Google: [Batch API](https://aistudio.google.com/docs/batch-api), [Context caching](https://aistudio.google.com/docs/caching), [Pricing](https://aistudio.google.com/docs/pricing)
- «Não indicado» quer dizer que a página lida não o diz, e não que não exista.

**Para uma skill:** trabalho que pode esperar até 24 horas vai em batch, e o prompt partilhado fica em cache com uma duração maior do que o tempo do batch; o plano regista o mínimo de tokens do modelo escolhido, porque abaixo dele não há cache.

## Ver também

- [OpenAI API](openai-api.md) (Construir com IA)
- [Gemini API](gemini-api.md) (Construir com IA)
- [Otimização de custo da IA](../otimizacao-de-custo-da-ia.md) (Construir com IA)

Fonte: documentação oficial da Anthropic, da OpenAI e da Google, ligada em cada ponto; consultada a 2026-11-10, páginas sem data. Não vem do PDF.

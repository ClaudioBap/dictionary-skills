---
id: ia/api-claude/prompt-caching
titulo: "Prompt caching"
seccao: "Construir com IA"
paginas: []
fonte: "Documentação da Claude Platform, ligada em cada ponto; consultada a 2026-11-10, páginas sem data. Não vem do PDF."
data_lancamento: null
confianca: media
verificado_em: 2026-11-10
---

# Prompt caching

**Resumo:** A API retoma o processamento a partir de prefixos que já estão em cache, o que baixa o preço da entrada repetida para uma fração do normal.

## Conteúdo

- O que é: «letting the API resume from specific prefixes in your prompts». Serve para prompts com muitos exemplos, contexto grande, tarefas repetidas com as mesmas instruções e conversas longas. Está disponível em todos os modelos ativos, no modo automático e no explícito. Fonte: [Prompt caching](https://platform.claude.com/docs/en/build-with-claude/prompt-caching)
- Como usar: no modo automático, um único `"cache_control": { "type": "ephemeral" }` no topo do pedido; no modo explícito, `cache_control` em blocos de conteúdo, por exemplo num bloco de texto em `system`. Há até 4 pontos de cache, cada um com uma janela de 20 blocos para trás. A cache de 1 hora pede-se com `"cache_control": { "type": "ephemeral", "ttl": "1h" }`. Fonte: [Prompt caching](https://platform.claude.com/docs/en/build-with-claude/prompt-caching)
- Preço, em múltiplos do preço de entrada: escrita com 5 minutos «1.25 times», escrita com 1 hora «2 times», leitura «0.1 times». Na leitura há exceções: 0,05 no Opus 5.5 e no Sonnet 5.5, 0,025 no Fable 5.1. A cache de 5 minutos renova-se sem custo sempre que é usada. Fonte: [Prompt caching](https://platform.claude.com/docs/en/build-with-claude/prompt-caching)
- Tamanho mínimo: 512 tokens no Haiku 5.5 e no Opus 5.5, entre outros; 1 024 no Sonnet 5, Sonnet 4.6 e Opus 4.8; 2 048 no Opus 4.7; 4 096 no Haiku 4.5, Opus 4.6 e Opus 4.5. «Shorter prompts cannot be cached», e a API não devolve erro. Fonte: [Prompt caching](https://platform.claude.com/docs/en/build-with-claude/prompt-caching)
- Confirmar que funcionou: em `usage`, `cache_creation_input_tokens` (escrita), `cache_read_input_tokens` (leitura) e `input_tokens` (o que vem depois do último ponto de cache). Se os dois campos de cache forem 0, nada ficou em cache. Fonte: [Prompt caching](https://platform.claude.com/docs/en/build-with-claude/prompt-caching)
- Os tokens lidos da cache não contam para o limite de tokens de entrada por minuto. Fonte: [Rate limits](https://platform.claude.com/docs/en/api/rate-limits)

**Para uma skill:** um pedido com prefixo repetido (instruções, documentos, exemplos) leva `cache_control`, e a verificação mostra `cache_read_input_tokens` acima de 0 a partir do segundo pedido.

## Ver também

- [Gestão de contexto e fiabilidade](../gestao-de-contexto-e-fiabilidade.md) (Construir com IA)
- [Otimização de custo da IA](../otimizacao-de-custo-da-ia.md) (Construir com IA)
- [Message Batches API](message-batches.md) (Construir com IA)

Fonte: documentação da Claude Platform, ligada em cada ponto; consultada a 2026-11-10, páginas sem data. Não vem do PDF.

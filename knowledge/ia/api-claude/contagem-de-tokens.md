---
id: ia/api-claude/contagem-de-tokens
titulo: "Contagem de tokens"
seccao: "Construir com IA"
paginas: []
fonte: "Documentação da Claude Platform, ligada em cada ponto; consultada a 2026-11-10, páginas sem data. Não vem do PDF."
data_lancamento: null
confianca: media
verificado_em: 2026-11-10
---

# Contagem de tokens

**Resumo:** Um endpoint grátis devolve uma estimativa dos tokens de entrada antes de o pedido ser enviado, para controlar custo, limites e escolha de modelo.

## Conteúdo

- Para quê: contar os tokens de entrada antes de enviar a mensagem. A documentação dá como usos «Proactively manage rate limits and costs», «Make smart model routing decisions» e «Optimize prompts to a specific length». Fonte: [Token counting](https://platform.claude.com/docs/en/build-with-claude/token-counting)
- Como usar: `POST /v1/messages/count_tokens` com os mesmos campos de um pedido Messages (`model`, `system`, `messages`, `tools`, imagens, PDFs, `thinking`). A resposta tem a forma `{ "input_tokens": 14 }`. Fonte: [Token counting](https://platform.claude.com/docs/en/build-with-claude/token-counting)
- Limites: o valor é uma estimativa. O endpoint devolve `invalid_request_error` com ferramentas de servidor (exceto o advisor tool), com o conector MCP e com blocos `image` ou `document` de origem `url` ou `file`; as imagens e os PDFs vão em base64. Os tokenizadores mais recentes (Claude 4.7 em diante) geram «approximately 30 percent more tokens» para o mesmo texto. Fonte: [Token counting](https://platform.claude.com/docs/en/build-with-claude/token-counting)
- Preço: «Token counting is free to use», com limites próprios de pedidos por minuto: 5 000 (Start), 10 000 (Build) e 20 000 (Scale), separados dos limites de criação de mensagens. Funciona em todos os modelos ativos. Fonte: [Token counting](https://platform.claude.com/docs/en/build-with-claude/token-counting)

**Para uma skill:** um caminho que escolhe o modelo ou corta contexto pelo tamanho do pedido conta os tokens com este endpoint, e não com uma estimativa por número de caracteres.

## Ver também

- [Escolher o modelo Claude](../escolher-o-modelo-claude.md) (Construir com IA)
- [Limites de taxa e erros](limites-de-taxa-e-erros.md) (Construir com IA)

Fonte: documentação da Claude Platform, ligada em cada ponto; consultada a 2026-11-10, páginas sem data. Não vem do PDF.

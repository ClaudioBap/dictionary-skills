---
id: ia/api-claude/message-batches
titulo: "Message Batches API"
seccao: "Construir com IA"
paginas: []
fonte: "Documentação da Claude Platform, ligada em cada ponto; consultada a 2026-11-10, páginas sem data. Não vem do PDF."
data_lancamento: null
confianca: media
verificado_em: 2026-11-10
---

# Message Batches API

**Resumo:** Pedidos que não precisam de resposta imediata vão num batch assíncrono a metade do preço, com os resultados disponíveis durante 29 dias.

## Conteúdo

- O que é: «Process large volumes of Messages requests asynchronously with the Message Batches API, cutting costs by 50 percent and increasing throughput.» Serve para grandes volumes, resultados que não são precisos já, redução de custo e avaliações grandes. Fonte: [Batch processing](https://platform.claude.com/docs/en/build-with-claude/batch-processing)
- Como usar: cria-se o batch com os pedidos Messages, consulta-se o estado e leem-se os resultados. Endpoints: `messages/batches/{id}` (estado), `messages/batches?limit=20` (lista) e `messages/batches/{id}/results` (resultados), também disponíveis em `results_url` quando o processamento termina. A documentação recomenda ler os resultados em streaming. Fonte: [Batch processing](https://platform.claude.com/docs/en/build-with-claude/batch-processing)
- Limites: «A Message Batch is limited to either 100,000 Message requests or 256 MB in size, whichever is reached first.» A maioria termina em menos de 1 hora. Os resultados ficam acessíveis quando todos os pedidos acabam ou ao fim de 24 horas, e o batch expira se não terminar em 24 horas. «Batch results are available for 29 days after creation.» Cada pedido precisa de `max_tokens` de pelo menos 1, e os pedidos com resultado `expired` não são cobrados. Fonte: [Batch processing](https://platform.claude.com/docs/en/build-with-claude/batch-processing)
- Preço: «All usage is charged at 50 percent of the standard API prices.» Fonte: [Batch processing](https://platform.claude.com/docs/en/build-with-claude/batch-processing)
- Com prompt caching: combinam. Como um batch pode demorar mais de 5 minutos, a documentação recomenda a cache de 1 hora com contexto partilhado entre os pedidos. Fonte: [Batch processing](https://platform.claude.com/docs/en/build-with-claude/batch-processing)
- Os batches não entram na retenção zero de dados e ficam guardados 29 dias. Fonte: [API and data retention](https://platform.claude.com/docs/en/manage-claude/api-and-data-retention)

**Para uma skill:** o trabalho que pode esperar até 24 horas (avaliações, classificação em massa, geração de conteúdos) corre em batch, ou o plano regista porque não.

## Ver também

- [Otimização de custo da IA](../otimizacao-de-custo-da-ia.md) (Construir com IA)
- [Prompt caching](prompt-caching.md) (Construir com IA)
- [Retenção de dados e retenção zero (ZDR)](retencao-de-dados-e-zdr.md) (Construir com IA)

Fonte: documentação da Claude Platform, ligada em cada ponto; consultada a 2026-11-10, páginas sem data. Não vem do PDF.

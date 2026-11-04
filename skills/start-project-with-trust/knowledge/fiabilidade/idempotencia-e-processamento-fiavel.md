---
id: fiabilidade/idempotencia-e-processamento-fiavel
titulo: "Idempotência e processamento fiável"
seccao: "Fiabilidade e resiliência"
paginas: [12]
fonte: Dicionario-Boas-Praticas.pdf
verificado_em: 2026-11-03
fontes_oficiais_consultadas_em: 2026-11-04
---

# Idempotência e processamento fiável

**Resumo:** Operações repetíveis são idempotentes, com chaves de idempotência e filas com dead-letter.

## Conteúdo

- Operações que podem repetir (retries, reentregas de fila) têm de ser idempotentes: repetir não duplica efeitos.
- Chaves de idempotência nos pedidos; filas com confirmação e dead-letter para o que falha sempre.

**Para uma skill:** operações repetíveis são idempotentes; as filas têm tratamento do que falha.

## Ver também

- [Mensageria e filas (RabbitMQ, Kafka, NATS)](../infraestrutura/mensageria-e-filas.md) (Serviços de infraestrutura)

## Fontes oficiais

*Ligações externas que apoiam esta entrada, consultadas a 2026-11-04. Não alteram o texto acima.*

- [AWS REL04-BP04 Make mutating operations idempotent](https://docs.aws.amazon.com/wellarchitected/latest/reliability-pillar/rel_prevent_interaction_failure_idempotent.html) — Tokens de idempotência em pedidos e mensagens de fila
- [Amazon Builders' Library – Idempotent APIs](https://aws.amazon.com/builders-library/making-retries-safe-with-idempotent-APIs/) — Identificador do cliente torna retries seguros
- [Amazon SQS – Dead-letter queues](https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/sqs-dead-letter-queues.html) — Isolar mensagens que falham sempre o processamento

Fonte: pág. 12 (Dicionario-Boas-Praticas.pdf)

---
id: fiabilidade/idempotencia-e-processamento-fiavel
titulo: "Idempotência e processamento fiável"
seccao: "Fiabilidade e resiliência"
paginas: [12]
fonte: Dicionario-Boas-Praticas.pdf
verificado_em: 2026-11-25
editado_em: 2026-11-25
fontes_oficiais_consultadas_em: 2026-11-04
---

# Idempotência e processamento fiável

**Resumo:** Operações repetíveis são idempotentes, com chaves de idempotência e filas com dead-letter.

## Conteúdo

- Operações que podem repetir (retries, reentregas de fila) têm de ser idempotentes: repetir não duplica efeitos.
- Chaves de idempotência nos pedidos; filas com confirmação e dead-letter para o que falha sempre.
- O registo da chave e todas as escritas do pedido fazem-se numa só operação ACID, tudo ou nada, para nunca ficar a chave gravada sem os efeitos, nem os efeitos sem a chave. Um pedido repetido com a mesma chave recebe uma resposta equivalente à primeira; a mesma chave com parâmetros diferentes recebe um erro de validação.
- Na fila, define-se quantas vezes uma mensagem pode ser recebida antes de passar à dead-letter (no Amazon SQS, `maxReceiveCount`).

**Para uma skill:** operações repetíveis são idempotentes e as filas têm tratamento do que falha. A prova é um teste que envia o mesmo pedido duas vezes com a mesma chave e confirma um só efeito e respostas equivalentes, e uma fila com dead-letter e limite de receções definido.

## Ver também

- [Mensageria e filas (RabbitMQ, Kafka, NATS)](../infraestrutura/mensageria-e-filas.md) (Serviços de infraestrutura)

## Fontes oficiais

*Ligações externas que apoiam esta entrada, consultadas a 2026-11-04. Não alteram o texto acima.*

- [AWS REL04-BP04 Make mutating operations idempotent](https://docs.aws.amazon.com/wellarchitected/latest/reliability-pillar/rel_prevent_interaction_failure_idempotent.html) — Tokens de idempotência em pedidos e mensagens de fila
- [Amazon Builders' Library – Idempotent APIs](https://aws.amazon.com/builders-library/making-retries-safe-with-idempotent-APIs/) — Identificador do cliente torna retries seguros
- [Amazon SQS – Dead-letter queues](https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/sqs-dead-letter-queues.html) — Isolar mensagens que falham sempre o processamento

## Histórico

- **data não indicada**: antes, «**Para uma skill:** operações repetíveis são idempotentes; as filas têm tratamento do que falha.» (PDF pág. 12). Mudou porque o critério não dizia o que um teste tem de mostrar; a Amazon Builders' Library diz como se grava a chave e como se responde a uma repetição. Fonte: [Amazon Builders' Library – Idempotent APIs](https://aws.amazon.com/builders-library/making-retries-safe-with-idempotent-APIs/). Editado a 2026-11-25.

Fonte: pág. 12 (Dicionario-Boas-Praticas.pdf)

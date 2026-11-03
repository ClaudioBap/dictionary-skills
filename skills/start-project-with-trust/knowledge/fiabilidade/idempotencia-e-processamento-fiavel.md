---
id: fiabilidade/idempotencia-e-processamento-fiavel
titulo: "Idempotência e processamento fiável"
seccao: "Fiabilidade e resiliência"
paginas: [12]
fonte: Dicionario-Boas-Praticas.pdf
verificado_em: 2026-11-03
---

# Idempotência e processamento fiável

**Resumo:** Operações repetíveis são idempotentes, com chaves de idempotência e filas com dead-letter.

## Conteúdo

- Operações que podem repetir (retries, reentregas de fila) têm de ser idempotentes: repetir não duplica efeitos.
- Chaves de idempotência nos pedidos; filas com confirmação e dead-letter para o que falha sempre.

**Para uma skill:** operações repetíveis são idempotentes; as filas têm tratamento do que falha.

## Ver também

- [Mensageria e filas (RabbitMQ, Kafka, NATS)](../infraestrutura/mensageria-e-filas.md) (Serviços de infraestrutura)

Fonte: pág. 12 (Dicionario-Boas-Praticas.pdf)

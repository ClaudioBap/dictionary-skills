---
id: custo/orquestracao-de-trabalho
titulo: "Orquestração de trabalho (filas, workers, agendadores)"
seccao: "Sessões, orquestração e custo-eficiência"
paginas: [64]
fonte: Dicionario-Boas-Praticas.pdf
verificado_em: 2026-11-03
---

# Orquestração de trabalho (filas, workers, agendadores)

**Resumo:** A API responde depressa e põe o trabalho pesado numa fila, processada por workers com concorrência limitada.

## Conteúdo

- Separar o pedido do trabalho pesado: a API responde depressa e põe o trabalho numa fila; workers processam ao ritmo que a capacidade permite.
- Agendadores para tarefas periódicas; concorrência limitada para não rebentar os recursos nem a fatura.

**Para uma skill:** o trabalho pesado é assíncrono, por fila e workers, com concorrência limitada.

## Ver também

- [Mensageria e filas (RabbitMQ, Kafka, NATS)](../infraestrutura/mensageria-e-filas.md) (Serviços de infraestrutura)

Fonte: pág. 64 (Dicionario-Boas-Praticas.pdf)

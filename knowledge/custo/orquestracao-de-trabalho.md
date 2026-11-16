---
id: custo/orquestracao-de-trabalho
titulo: "Orquestração de trabalho (filas, workers, agendadores)"
seccao: "Sessões, orquestração e custo-eficiência"
paginas: [64]
fonte: Dicionario-Boas-Praticas.pdf
verificado_em: 2026-11-03
fontes_oficiais_consultadas_em: 2026-11-04
---

# Orquestração de trabalho (filas, workers, agendadores)

**Resumo:** A API responde depressa e põe o trabalho pesado numa fila, processada por workers com concorrência limitada.

## Conteúdo

- Separar o pedido do trabalho pesado: a API responde depressa e põe o trabalho numa fila; workers processam ao ritmo que a capacidade permite.
- Agendadores para tarefas periódicas; concorrência limitada para não rebentar os recursos nem a fatura.

**Para uma skill:** o trabalho pesado é assíncrono, por fila e workers, com concorrência limitada.

## Ver também

- [Mensageria e filas (RabbitMQ, Kafka, NATS)](../infraestrutura/mensageria-e-filas.md) (Serviços de infraestrutura)

## Fontes oficiais

*Ligações externas que apoiam esta entrada, consultadas a 2026-11-04. Não alteram o texto acima.*

- [Queue-Based Load Leveling pattern](https://learn.microsoft.com/en-us/azure/architecture/patterns/queue-based-load-leveling) — fila como amortecedor; consumidores ao seu ritmo; limitar concorrência; custo
- [Design to scale out](https://learn.microsoft.com/en-us/azure/architecture/guide/design-principles/scale-out) — descarregar tarefas pesadas/assíncronas para background jobs e filas

Fonte: pág. 64 (Dicionario-Boas-Praticas.pdf)

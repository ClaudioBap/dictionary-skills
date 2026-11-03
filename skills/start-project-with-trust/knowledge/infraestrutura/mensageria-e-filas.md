---
id: infraestrutura/mensageria-e-filas
titulo: "Mensageria e filas (RabbitMQ, Kafka, NATS)"
seccao: "Serviços de infraestrutura"
paginas: [55]
fonte: Dicionario-Boas-Praticas.pdf
verificado_em: 2026-11-03
---

# Mensageria e filas (RabbitMQ, Kafka, NATS)

**Resumo:** Filas que desacoplam serviços, absorvem picos e permitem processar em segundo plano.

## Conteúdo

- Desacoplam serviços: um produz, outro consome, sem esperar; absorvem picos e permitem processar em segundo plano.
- **RabbitMQ:** filas clássicas, entrega fiável. **Kafka:** fluxo de eventos de alto volume, com histórico. **NATS:** leve e rápido.

**Para uma skill:** o trabalho pesado ou assíncrono passa por uma fila, com reprocessamento do que falha.

## Ver também

- [Orquestração de trabalho (filas, workers, agendadores)](../custo/orquestracao-de-trabalho.md) (Sessões, orquestração e custo-eficiência)
- [Idempotência e processamento fiável](../fiabilidade/idempotencia-e-processamento-fiavel.md) (Fiabilidade e resiliência)

Fonte: pág. 55 (Dicionario-Boas-Praticas.pdf)

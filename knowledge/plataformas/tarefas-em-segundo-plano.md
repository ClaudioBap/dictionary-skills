---
id: plataformas/tarefas-em-segundo-plano
titulo: "Tarefas em segundo plano (Temporal, BullMQ)"
seccao: "Plataformas para adotar antes de construir"
paginas: []
fonte: "Documentação do Temporal e do BullMQ e ficheiros de licença, ligados em cada ponto; consultados a 2026-11-10, páginas sem data. Não vem do PDF."
data_lancamento: null
confianca: media
verificado_em: 2026-11-10
---

# Tarefas em segundo plano (Temporal, BullMQ)

**Resumo:** Trabalho que demora ou pode falhar sai do pedido HTTP para uma fila com repetições (BullMQ) ou para um motor de workflows duráveis que retoma onde parou (Temporal); ambos têm licença MIT.

## Conteúdo

- Temporal: os workflows correm até ao fim «whether that takes seconds or months»; se um worker cai, o substituto retoma «at the line where execution stopped, with local variables and progress intact»; as políticas de repetição são aplicadas pelo serviço; há temporizadores duráveis, um registo completo e durável de eventos, e versionamento de workers. Fonte: [Why Temporal](https://docs.temporal.io/evaluate/why-temporal)
- Licença do Temporal: «The MIT License». Fonte: [LICENSE (temporalio/temporal)](https://github.com/temporalio/temporal/blob/main/LICENSE)
- BullMQ: «Released under the MIT License.» Trabalhos atrasados e com prioridade, repetições, agendadores, fluxos, limitação de taxa e métricas Prometheus. O Redis 6.2+ é «the default»; o PostgreSQL 13+ também é suportado. O «BullMQ Pro» é a versão comercial e o Taskforce.sh é o painel oficial. Fonte: [BullMQ](https://docs.bullmq.io/)
- Quando cada um *(interpretação)*: BullMQ para filas simples numa aplicação Node que já tem Redis; Temporal quando um processo tem vários passos que têm de sobreviver a falhas e podem durar dias.
- Localização dos dados na UE: não confirmada nas páginas lidas; ambos se auto-alojam, por isso os dados ficam onde correrem *(interpretação)*.

**Para uma skill:** trabalho pesado ou de vários passos não corre dentro do pedido HTTP: o plano escolhe fila ou workflow durável, com a razão, e o critério de fim inclui um worker parado a meio e o trabalho concluído na mesma.

## Ver também

- [Orquestração de trabalho (filas, workers, agendadores)](../custo/orquestracao-de-trabalho.md) (Sessões, orquestração e custo-eficiência)
- [Mensageria e filas (RabbitMQ, Kafka, NATS)](../infraestrutura/mensageria-e-filas.md) (Serviços de infraestrutura)
- [Idempotência e processamento fiável](../fiabilidade/idempotencia-e-processamento-fiavel.md) (Fiabilidade e resiliência)

Fonte: documentação do Temporal e do BullMQ e ficheiros de licença, ligados em cada ponto; consultados a 2026-11-10, páginas sem data. Não vem do PDF.

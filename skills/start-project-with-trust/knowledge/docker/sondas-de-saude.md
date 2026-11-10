---
id: docker/sondas-de-saude
titulo: "Sondas de saúde (liveness, readiness, startup)"
seccao: "Docker e orquestração"
paginas: []
fonte: "https://kubernetes.io/docs/concepts/configuration/liveness-readiness-startup-probes/; consultada a 2026-11-10, página sem data, lida em parte. Não vem do PDF."
data_lancamento: null
confianca: media
verificado_em: 2026-11-10
---

# Sondas de saúde (liveness, readiness, startup)

**Resumo:** Três sondas com funções diferentes: a de liveness reinicia o contentor preso, a de readiness tira-o do tráfego até estar pronto, e a de startup dá tempo ao arranque antes de as outras duas começarem.

## Conteúdo

- Liveness: «Liveness probes determine when to restart a container. For example, liveness probes could catch a deadlock, where an application is running, but unable to make progress. Restarting a container in such a state can help to make the application more available despite bugs.» Fonte: [Liveness, Readiness and Startup Probes (Kubernetes)](https://kubernetes.io/docs/concepts/configuration/liveness-readiness-startup-probes/)
- Readiness: «Readiness probes determine when a container is ready to accept traffic. This is useful when waiting for an application to perform time-consuming initial tasks, such as establishing network connections, loading files, and warming caches. Readiness probes can also be useful later in the container's lifecycle, for example, when recovering from temporary faults or overloads.» Fonte: a mesma página.
- Startup: «Startup probes verify whether the application within a container is started. If a startup probe is configured, Kubernetes does not execute liveness or readiness probes until the startup probe succeeds, allowing the application time to finish its initialization.» Fonte: a mesma página.
- A entrada [Kubernetes: saúde e armazenamento](kubernetes-saude-e-armazenamento.md) já pedia sondas de liveness e readiness em cada serviço; esta junta a sonda de startup e as definições oficiais. A parte final da página (cerca de 15% do texto) não foi lida.

**Para uma skill:** cada serviço define as três sondas, ou justifica a ausência da de startup, e a de readiness só passa quando as dependências respondem; a prova é a descrição do pod com as sondas e um reinício provocado pela de liveness.

## Ver também

- [Kubernetes: saúde e armazenamento](kubernetes-saude-e-armazenamento.md) (Docker e orquestração)
- [Degradação graciosa](../fiabilidade/degradacao-graciosa.md) (Fiabilidade e resiliência)
- [Prontidão operacional e passagem](../fiabilidade/prontidao-operacional-e-passagem.md) (Fiabilidade e resiliência)

Fonte: https://kubernetes.io/docs/concepts/configuration/liveness-readiness-startup-probes/; consultada a 2026-11-10, página sem data, lida em parte. Não vem do PDF.

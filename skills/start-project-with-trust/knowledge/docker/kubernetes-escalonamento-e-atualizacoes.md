---
id: docker/kubernetes-escalonamento-e-atualizacoes
titulo: "Kubernetes: escalonamento e atualizações"
seccao: "Docker e orquestração"
paginas: [53]
fonte: Dicionario-Boas-Praticas.pdf
verificado_em: 2026-11-03
fontes_oficiais_consultadas_em: 2026-11-04
---

# Kubernetes: escalonamento e atualizações

**Resumo:** Escalar por métrica com HPA e atualizar sem downtime, com rollback.

## Conteúdo

- Réplicas no Deployment; `HPA` escala pelo uso (CPU/métricas); rolling update sem downtime, com rollback.
- `requests` / `limits` de recursos; `PodDisruptionBudget` para não derrubar tudo de uma vez.

**Para uma skill:** os serviços escalam por métrica e atualizam sem downtime.

## Fontes oficiais

*Ligações externas que apoiam esta entrada, consultadas a 2026-11-04. Não alteram o texto acima.*

- [Horizontal Pod Autoscaling](https://kubernetes.io/docs/tasks/run-application/horizontal-pod-autoscale/) — HPA escala por CPU, memória ou métricas personalizadas
- [Deployments](https://kubernetes.io/docs/concepts/workloads/controllers/deployment/) — Réplicas, rolling update e rollback para revisão anterior
- [Disruptions](https://kubernetes.io/docs/concepts/workloads/pods/disruptions/) — PodDisruptionBudget limita pods em baixo em simultâneo

Fonte: pág. 53 (Dicionario-Boas-Praticas.pdf)

---
id: docker/kubernetes-escalonamento-e-atualizacoes
titulo: "Kubernetes: escalonamento e atualizações"
seccao: "Docker e orquestração"
paginas: [53]
fonte: Dicionario-Boas-Praticas.pdf
verificado_em: 2026-11-03
---

# Kubernetes: escalonamento e atualizações

**Resumo:** Escalar por métrica com HPA e atualizar sem downtime, com rollback.

## Conteúdo

- Réplicas no Deployment; `HPA` escala pelo uso (CPU/métricas); rolling update sem downtime, com rollback.
- `requests` / `limits` de recursos; `PodDisruptionBudget` para não derrubar tudo de uma vez.

**Para uma skill:** os serviços escalam por métrica e atualizam sem downtime.

Fonte: pág. 53 (Dicionario-Boas-Praticas.pdf)

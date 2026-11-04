---
id: docker/kubernetes-saude-e-armazenamento
titulo: "Kubernetes: saúde e armazenamento"
seccao: "Docker e orquestração"
paginas: [53]
fonte: Dicionario-Boas-Praticas.pdf
verificado_em: 2026-11-03
fontes_oficiais_consultadas_em: 2026-11-04
---

# Kubernetes: saúde e armazenamento

**Resumo:** Probes de liveness e readiness e estado persistente em PV/PVC.

## Conteúdo

- `liveness` (reiniciar se preso) e `readiness` (só receber tráfego quando pronto) probes.
- Armazenamento persistente com `PersistentVolume` / `PersistentVolumeClaim`; o estado não vive no pod.

**Para uma skill:** cada serviço tem probes de saúde; o estado persistente está em PV/PVC.

## Fontes oficiais

*Ligações externas que apoiam esta entrada, consultadas a 2026-11-04. Não alteram o texto acima.*

- [Liveness, Readiness and Startup Probes](https://kubernetes.io/docs/concepts/configuration/liveness-readiness-startup-probes/) — Liveness reinicia o contentor; readiness retira-o do tráfego
- [Persistent Volumes](https://kubernetes.io/docs/concepts/storage/persistent-volumes/) — PV/PVC com ciclo de vida independente do pod

Fonte: pág. 53 (Dicionario-Boas-Praticas.pdf)

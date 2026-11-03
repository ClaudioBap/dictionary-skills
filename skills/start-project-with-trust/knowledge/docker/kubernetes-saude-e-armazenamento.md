---
id: docker/kubernetes-saude-e-armazenamento
titulo: "Kubernetes: saúde e armazenamento"
seccao: "Docker e orquestração"
paginas: [53]
fonte: Dicionario-Boas-Praticas.pdf
verificado_em: 2026-11-03
---

# Kubernetes: saúde e armazenamento

**Resumo:** Probes de liveness e readiness e estado persistente em PV/PVC.

## Conteúdo

- `liveness` (reiniciar se preso) e `readiness` (só receber tráfego quando pronto) probes.
- Armazenamento persistente com `PersistentVolume` / `PersistentVolumeClaim`; o estado não vive no pod.

**Para uma skill:** cada serviço tem probes de saúde; o estado persistente está em PV/PVC.

Fonte: pág. 53 (Dicionario-Boas-Praticas.pdf)

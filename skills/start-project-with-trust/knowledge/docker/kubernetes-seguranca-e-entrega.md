---
id: docker/kubernetes-seguranca-e-entrega
titulo: "Kubernetes: segurança e entrega"
seccao: "Docker e orquestração"
paginas: [53]
fonte: Dicionario-Boas-Praticas.pdf
verificado_em: 2026-11-03
---

# Kubernetes: segurança e entrega

**Resumo:** Non-root, NetworkPolicy e RBAC, com entrega por Helm e GitOps.

## Conteúdo

- Segurança: non-root, `NetworkPolicy` (quem fala com quem), `RBAC` (quem pode o quê), políticas de admissão.
- Entrega: empacotar com `Helm`; GitOps (Argo CD, Flux) para o cluster seguir o git.

**Para uma skill:** os manifestos vêm do git (GitOps), com RBAC e network policies definidos.

Fonte: pág. 53 (Dicionario-Boas-Praticas.pdf)

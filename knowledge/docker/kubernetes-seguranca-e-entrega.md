---
id: docker/kubernetes-seguranca-e-entrega
titulo: "Kubernetes: segurança e entrega"
seccao: "Docker e orquestração"
paginas: [53]
fonte: Dicionario-Boas-Praticas.pdf
verificado_em: 2026-11-03
fontes_oficiais_consultadas_em: 2026-11-04
---

# Kubernetes: segurança e entrega

**Resumo:** Non-root, NetworkPolicy e RBAC, com entrega por Helm e GitOps.

## Conteúdo

- Segurança: non-root, `NetworkPolicy` (quem fala com quem), `RBAC` (quem pode o quê), políticas de admissão.
- Entrega: empacotar com `Helm`; GitOps (Argo CD, Flux) para o cluster seguir o git.

**Para uma skill:** os manifestos vêm do git (GitOps), com RBAC e network policies definidos.

## Fontes oficiais

*Ligações externas que apoiam esta entrada, consultadas a 2026-11-04. Não alteram o texto acima.*

- [Network Policies](https://kubernetes.io/docs/concepts/services-networking/network-policies/) — Controlar que pods comunicam entre si
- [Using RBAC Authorization](https://kubernetes.io/docs/reference/access-authn-authz/rbac/) — Acesso a recursos regulado por papéis
- [Flux core concepts](https://fluxcd.io/flux/concepts/) — GitOps: ambiente reconciliado com o estado definido no git

> **Nota (fonte oficial):** Non-root está na política Restricted das Pod Security Standards (https://kubernetes.io/docs/concepts/security/pod-security-standards/: runAsNonRoot=true). O NSA/CISA Kubernetes Hardening Guide (media.defense.gov) devolveu 403 e não foi lido.

Fonte: pág. 53 (Dicionario-Boas-Praticas.pdf)

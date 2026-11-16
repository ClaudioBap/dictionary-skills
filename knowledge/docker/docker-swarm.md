---
id: docker/docker-swarm
titulo: "Docker Swarm"
seccao: "Docker e orquestração"
paginas: [52]
fonte: Dicionario-Boas-Praticas.pdf
verificado_em: 2026-11-03
fontes_oficiais_consultadas_em: 2026-11-04
---

# Docker Swarm

**Resumo:** Orquestração simples sobre o Docker, degrau intermédio antes do Kubernetes.

## Conteúdo

- Orquestração simples sobre o próprio Docker: `services` com réplicas, rede overlay, segredos, rolling updates.
- Degrau intermédio quando o Kubernetes é demasiado; menos poderoso, muito mais simples.

**Para uma skill:** para poucas máquinas, considerar Swarm antes de saltar para Kubernetes.

## Fontes oficiais

*Ligações externas que apoiam esta entrada, consultadas a 2026-11-04. Não alteram o texto acima.*

- [Swarm mode overview](https://docs.docker.com/engine/swarm/) — Escala por réplicas, rede overlay, rolling updates com rollback
- [Manage sensitive data with Docker secrets](https://docs.docker.com/engine/swarm/secrets/) — Segredos do Swarm montados em runtime, fora da imagem
- [Overlay network driver](https://docs.docker.com/engine/network/drivers/overlay/) — Rede overlay entre nós do Swarm

Fonte: pág. 52 (Dicionario-Boas-Praticas.pdf)

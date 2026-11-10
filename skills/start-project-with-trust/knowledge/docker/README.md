# Docker e orquestração

Tag no Logseq: `#docker`.

Do simples (imagens e Compose) ao complexo (réplicas, Swarm, Kubernetes).

Fonte: págs. 51–53 (Dicionario-Boas-Praticas.pdf)

## Entradas

- [Imagens e Dockerfile](imagens-e-dockerfile.md) — Imagens multi-stage com base pequena fixada por digest e `.dockerignore`. *(pág. 51)*
- [Imagem endurecida](imagem-endurecida.md) — Imagens non-root, só-leitura, com healthcheck, sem segredos e escaneadas. *(pág. 51)*
- [Contentores: execução e configuração](contentores-execucao-e-configuracao.md) — Configuração por ambiente, segredos montados e limites de recursos. *(pág. 51)*
- [Volumes e persistência](volumes-e-persistencia.md) — Os dados que têm de durar vivem em volumes com backup; o contentor é descartável. *(pág. 51)*
- [Redes do Docker](redes-do-docker.md) — Rede interna entre serviços e só o proxy a publicar portas. *(págs. 51, 52)*
- [Docker Compose](docker-compose.md) — A stack multi-serviço descrita e versionada num ficheiro, que sobe com um comando. *(pág. 52)*
- [Escalonar com réplicas](escalonar-com-replicas.md) — Várias réplicas atrás de um balanceador, com a aplicação sem estado. *(pág. 52)*
- [Docker Swarm](docker-swarm.md) — Orquestração simples sobre o Docker, degrau intermédio antes do Kubernetes. *(pág. 52)*
- [Kubernetes: conceitos](kubernetes-conceitos.md) — Orquestrador declarativo que mantém o estado desejado: Pod, Deployment, Service e Ingress. *(pág. 52)*
- [Kubernetes: configuração e segredos](kubernetes-configuracao-e-segredos.md) — ConfigMap para configuração e segredos num cofre, nunca na imagem. *(pág. 53)*
- [Kubernetes: escalonamento e atualizações](kubernetes-escalonamento-e-atualizacoes.md) — Escalar por métrica com HPA e atualizar sem downtime, com rollback. *(pág. 53)*
- [Kubernetes: saúde e armazenamento](kubernetes-saude-e-armazenamento.md) — Probes de liveness e readiness e estado persistente em PV/PVC. *(pág. 53)*
- [Kubernetes: segurança e entrega](kubernetes-seguranca-e-entrega.md) — Non-root, NetworkPolicy e RBAC, com entrega por Helm e GitOps. *(pág. 53)*
- [Sondas de saúde (liveness, readiness, startup)](sondas-de-saude.md) — Três sondas com funções diferentes: a de liveness reinicia o contentor preso, a de readiness tira-o do tráfego até estar pronto, e a de startup dá tempo ao arranque antes de as outras duas começarem. *(fora do PDF)*

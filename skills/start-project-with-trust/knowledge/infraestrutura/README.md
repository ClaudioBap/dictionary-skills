# Serviços de infraestrutura

Tag no Logseq: `#infra`.

Blocos de construção comuns e para que servem.

Fonte: págs. 54–56 (Dicionario-Boas-Praticas.pdf)

## Entradas

- [Jump server (bastion)](jump-server-bastion.md) — Uma porta de entrada única, endurecida e auditada para os servidores privados, ou alternativas por identidade. *(pág. 54)*
- [Proxy reverso e borda (Traefik, Nginx, Caddy)](proxy-reverso-e-borda.md) — O proxy fica à frente dos serviços e faz TLS, encaminhamento e limites num só sítio. *(pág. 54)*
- [Cache e sessões (Redis / Valkey)](cache-e-sessoes-redis-valkey.md) — Armazém chave-valor em memória para cache, sessões partilhadas, filas simples e locks. *(págs. 54, 55)*
- [Base de dados relacional (PostgreSQL)](base-de-dados-relacional-postgresql.md) — PostgreSQL como escolha soberana por omissão, com réplicas de leitura, backups e PITR. *(pág. 55)*
- [Mensageria e filas (RabbitMQ, Kafka, NATS)](mensageria-e-filas.md) — Filas que desacoplam serviços, absorvem picos e permitem processar em segundo plano. *(pág. 55)*
- [Observabilidade (Grafana, Prometheus, Loki, Tempo)](observabilidade-grafana-prometheus-loki-tempo.md) — Métricas, logs e traces centralizados, com painéis e alertas no Grafana. *(pág. 55)*
- [Pesquisa (OpenSearch, Meilisearch)](pesquisa-opensearch-meilisearch.md) — Um motor de pesquisa próprio para texto, em vez de `LIKE` na base. *(pág. 55)*
- [Armazenamento de objetos (MinIO, S3)](armazenamento-de-objetos-minio-s3.md) — Ficheiros grandes em armazenamento de objetos, fora da base e do contentor. *(págs. 55, 56)*
- [Gestão de segredos (Vault / OpenBao)](gestao-de-segredos-vault-openbao.md) — Um cofre central que guarda, controla, audita e roda segredos. *(pág. 56)*
- [Identidade (Keycloak)](identidade-keycloak.md) — Servidor de identidade aberto com SSO, OIDC/SAML e MFA, alternativa soberana. *(pág. 56)*

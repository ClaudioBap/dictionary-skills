---
id: infraestrutura/base-de-dados-relacional-postgresql
titulo: "Base de dados relacional (PostgreSQL)"
seccao: "Serviços de infraestrutura"
paginas: [55]
fonte: Dicionario-Boas-Praticas.pdf
verificado_em: 2026-11-03
fontes_oficiais_consultadas_em: 2026-11-04
---

# Base de dados relacional (PostgreSQL)

**Resumo:** PostgreSQL como escolha soberana por omissão, com réplicas de leitura, backups e PITR.

## Conteúdo

- Base relacional aberta e robusta: transações ACID, JSON, pesquisa, extensões (PostGIS, etc.).
- Boa escolha soberana por omissão; réplicas de leitura para escalar a leitura; backups e PITR.

**Para uma skill:** o estado relacional vive num PostgreSQL com backups e restauro testado.

## Fontes oficiais

*Ligações externas que apoiam esta entrada, consultadas a 2026-11-04. Não alteram o texto acima.*

- [About PostgreSQL](https://www.postgresql.org/about/) — Aberto, ACID, JSON/JSONB, extensões como PostGIS
- [Continuous Archiving and PITR](https://www.postgresql.org/docs/current/continuous-archiving.html) — Backups base mais arquivo WAL para recuperação pontual
- [Hot Standby](https://www.postgresql.org/docs/current/hot-standby.html) — Réplicas standby aceitam consultas só de leitura

Fonte: pág. 55 (Dicionario-Boas-Praticas.pdf)

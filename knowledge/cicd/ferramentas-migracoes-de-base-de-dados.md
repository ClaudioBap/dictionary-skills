---
id: cicd/ferramentas-migracoes-de-base-de-dados
titulo: "Ferramentas: migrações de base de dados"
seccao: "CI/CD e ferramentas"
paginas: [49]
fonte: Dicionario-Boas-Praticas.pdf
verificado_em: 2026-11-03
fontes_oficiais_consultadas_em: 2026-11-04
---

# Ferramentas: migrações de base de dados

**Resumo:** Ferramentas que versionam o esquema com tabela de controlo.

## Conteúdo

- `Flyway`, `Liquibase` (genéricos), `Alembic` (Python/SQLAlchemy), `EF Core Migrations` (C#).
- Versionam o esquema, com tabela de controlo e aplicação determinística.

**Para uma skill:** o esquema muda por migração versionada, nunca à mão.

## Ver também

- [Migrações](../base-de-dados/migracoes.md) (Base de dados)

## Fontes oficiais

*Ligações externas que apoiam esta entrada, consultadas a 2026-11-04. Não alteram o texto acima.*

- [DATABASECHANGELOG table](https://docs.liquibase.com/concepts/tracking-tables/databasechangelog-table.html) — Tabela de controlo regista os changesets aplicados
- [Alembic](https://alembic.sqlalchemy.org/en/latest/) — Ferramenta de migrações para SQLAlchemy
- [Migrations Overview (EF Core)](https://learn.microsoft.com/en-us/ef/core/managing-schemas/migrations/) — Migrações versionadas com tabela de histórico de aplicação

Fonte: pág. 49 (Dicionario-Boas-Praticas.pdf)

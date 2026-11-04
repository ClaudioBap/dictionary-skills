---
id: base-de-dados/migracoes
titulo: "Migrações"
seccao: "Base de dados"
paginas: [29]
fonte: Dicionario-Boas-Praticas.pdf
verificado_em: 2026-11-03
fontes_oficiais_consultadas_em: 2026-11-04
---

# Migrações

**Resumo:** Toda a mudança de esquema é uma migração versionada, de preferência aditiva e reversível.

## Conteúdo

- Migrações versionadas, numa ferramenta (Flyway/Liquibase/Alembic), com tabela de controlo; nada de alterações manuais à mão sem registo.
- Preferir migrações aditivas e reversíveis; expandir-depois-contrair para mudanças sem downtime.

**Para uma skill:** toda a mudança de esquema é uma migração versionada; sem drift manual entre ambientes.

## Ver também

- [Integridade dos dados e migrações aditivas](../seguranca/integridade-e-migracoes-aditivas.md) (Segurança)
- [Ferramentas: migrações de base de dados](../cicd/ferramentas-migracoes-de-base-de-dados.md) (CI/CD e ferramentas)
- [Infraestrutura e migrações no fluxo](../cicd/infraestrutura-e-migracoes-no-fluxo.md) (CI/CD e ferramentas)

## Fontes oficiais

*Ligações externas que apoiam esta entrada, consultadas a 2026-11-04. Não alteram o texto acima.*

- [Migrations (Flyway)](https://documentation.red-gate.com/fd/migrations-271585107.html) — Migrações versionadas aplicadas por ordem e registadas em tabela de histórico
- [What is a Changelog? (Liquibase)](https://docs.liquibase.com/concepts/changelogs/home.html) — Changesets em sequência, controlados pela tabela DATABASECHANGELOG
- [Tutorial (Alembic)](https://alembic.sqlalchemy.org/en/latest/tutorial.html) — Scripts com upgrade()/downgrade() e tabela alembic_version

> **Nota (fonte oficial):** «Expandir-depois-contrair» sem fonte oficial encontrada.

Fonte: pág. 29 (Dicionario-Boas-Praticas.pdf)

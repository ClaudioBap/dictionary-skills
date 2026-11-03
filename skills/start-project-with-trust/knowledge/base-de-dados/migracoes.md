---
id: base-de-dados/migracoes
titulo: "Migrações"
seccao: "Base de dados"
paginas: [29]
fonte: Dicionario-Boas-Praticas.pdf
verificado_em: 2026-11-03
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

Fonte: pág. 29 (Dicionario-Boas-Praticas.pdf)

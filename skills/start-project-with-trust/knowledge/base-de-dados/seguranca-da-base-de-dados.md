---
id: base-de-dados/seguranca-da-base-de-dados
titulo: "Segurança da base de dados"
seccao: "Base de dados"
paginas: [29]
fonte: Dicionario-Boas-Praticas.pdf
verificado_em: 2026-11-03
fontes_oficiais_consultadas_em: 2026-11-04
---

# Segurança da base de dados

**Resumo:** Conta da aplicação com permissões mínimas, queries parametrizadas e dados sensíveis cifrados.

## Conteúdo

- Menor privilégio: a conta da aplicação só com o que usa; sem DDL nem permissões a mais.
- Queries sempre parametrizadas; segredos e dados sensíveis cifrados; não guardar segredos de aplicação na base.

**Para uma skill:** a conta da app tem permissões mínimas; sem SQL concatenado.

## Ver também

- [Menor privilégio na base de dados](../seguranca/menor-privilegio-na-base-de-dados.md) (Segurança)
- [Queries parametrizadas (sem injeção de SQL)](../seguranca/queries-parametrizadas.md) (Segurança)

## Fontes oficiais

*Ligações externas que apoiam esta entrada, consultadas a 2026-11-04. Não alteram o texto acima.*

- [SQL Injection Prevention (OWASP)](https://cheatsheetseries.owasp.org/cheatsheets/SQL_Injection_Prevention_Cheat_Sheet.html) — Queries parametrizadas; conta da aplicação com privilégio mínimo, nunca DBA
- [Privileges (PostgreSQL)](https://www.postgresql.org/docs/current/ddl-priv.html) — GRANT/REVOKE de privilégios por objeto
- [Encryption Options (PostgreSQL)](https://www.postgresql.org/docs/current/encryption-options.html) — Cifra de colunas (pgcrypto), SSL, armazenamento e lado do cliente

Fonte: pág. 29 (Dicionario-Boas-Praticas.pdf)

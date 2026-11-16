---
id: seguranca/menor-privilegio-na-base-de-dados
titulo: "Menor privilégio na base de dados"
seccao: "Segurança"
paginas: [4]
fonte: Dicionario-Boas-Praticas.pdf
verificado_em: 2026-11-03
fontes_oficiais_consultadas_em: 2026-11-04
---

# Menor privilégio na base de dados

**Resumo:** A identidade da aplicação na base de dados tem só o que precisa, separada por função, com regras críticas impostas também na base.

## Conteúdo

- A identidade com que a aplicação fala com a base de dados tem só o que precisa: sem DDL, sem apagar o que não deve.
- Separar identidades por função (operacional vs. a que escreve no histórico sensível), para um bug ou fuga não dar poder total.
- Regras críticas impostas também na base de dados (procedimentos, permissões), não só no código.

**Para uma skill:** a conta da aplicação não tem permissões além das que os seus endpoints usam.

## Ver também

- [Segurança da base de dados](../base-de-dados/seguranca-da-base-de-dados.md) (Base de dados)

## Fontes oficiais

*Ligações externas que apoiam esta entrada, consultadas a 2026-11-04. Não alteram o texto acima.*

- [OWASP Database Security Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Database_Security_Cheat_Sheet.html) — menor privilégio da conta da aplicação; conta não dona da base
- [OWASP SQL Injection Prevention Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/SQL_Injection_Prevention_Cheat_Sheet.html) — minimizar privilégios de cada conta de base de dados

Fonte: pág. 4 (Dicionario-Boas-Praticas.pdf)

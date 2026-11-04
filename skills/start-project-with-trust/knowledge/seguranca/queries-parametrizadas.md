---
id: seguranca/queries-parametrizadas
titulo: "Queries parametrizadas (sem injeção de SQL)"
seccao: "Segurança"
paginas: [4]
fonte: Dicionario-Boas-Praticas.pdf
verificado_em: 2026-11-03
fontes_oficiais_consultadas_em: 2026-11-04
---

# Queries parametrizadas (sem injeção de SQL)

**Resumo:** Todo o acesso à base de dados usa parâmetros; texto do utilizador nunca entra no comando por concatenação.

## Conteúdo

- Todo o acesso à base de dados usa parâmetros; texto do utilizador nunca entra no comando por concatenação.
- Nomes de tabela ou coluna dinâmicos só a partir de uma lista fixa do código, nunca de dados de fora.
- Leitura restrita a objetos declarados numa lista de permissão, não a qualquer tabela.

**Para uma skill:** zero SQL montado com dados do utilizador; só parâmetros.

## Ver também

- [Segurança da base de dados](../base-de-dados/seguranca-da-base-de-dados.md) (Base de dados)

## Fontes oficiais

*Ligações externas que apoiam esta entrada, consultadas a 2026-11-04. Não alteram o texto acima.*

- [OWASP SQL Injection Prevention Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/SQL_Injection_Prevention_Cheat_Sheet.html) — prepared statements; nomes de tabela/coluna só de lista fixa do código
- [OWASP Query Parameterization Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Query_Parameterization_Cheat_Sheet.html) — exemplos de queries parametrizadas por linguagem

Fonte: pág. 4 (Dicionario-Boas-Praticas.pdf)

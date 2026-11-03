---
id: seguranca/queries-parametrizadas
titulo: "Queries parametrizadas (sem injeção de SQL)"
seccao: "Segurança"
paginas: [4]
fonte: Dicionario-Boas-Praticas.pdf
verificado_em: 2026-11-03
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

Fonte: pág. 4 (Dicionario-Boas-Praticas.pdf)

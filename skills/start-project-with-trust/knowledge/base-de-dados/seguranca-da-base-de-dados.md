---
id: base-de-dados/seguranca-da-base-de-dados
titulo: "Segurança da base de dados"
seccao: "Base de dados"
paginas: [29]
fonte: Dicionario-Boas-Praticas.pdf
verificado_em: 2026-11-03
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

Fonte: pág. 29 (Dicionario-Boas-Praticas.pdf)

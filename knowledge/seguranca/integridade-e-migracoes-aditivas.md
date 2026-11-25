---
id: seguranca/integridade-e-migracoes-aditivas
titulo: "Integridade dos dados e migrações aditivas"
seccao: "Segurança"
paginas: [4]
fonte: Dicionario-Boas-Praticas.pdf
verificado_em: 2026-11-03
fontes_oficiais_consultadas_em: 2026-11-25
---

# Integridade dos dados e migrações aditivas

**Resumo:** Nunca perder o rasto de um dado: ledger, chaves referenciadas estáveis, correções por versão e migrações só aditivas por release.

## Conteúdo

- Registo (ledger) do que foi gravado onde, para nunca se perder o rasto de um dado aprovado.
- Nunca renumerar nem recriar chaves primárias referenciadas; corrigir marcando versões, não apagando.
- Migrações só aditivas por release, para a versão anterior servir o esquema novo.

**Para uma skill:** nenhuma migração remove ou renomeia no mesmo release; as correções preservam o histórico.

## Ver também

- [Migrações](../base-de-dados/migracoes.md) (Base de dados)
- [Chaves primárias](../base-de-dados/chaves-primarias.md) (Base de dados)

## Fontes oficiais

*Ligações externas que apoiam esta entrada, consultadas a 2026-11-25. Não alteram o texto acima.*

- [Ledger overview (Microsoft Learn, ms.date 2025-08-07, atualizada a 2026-10-19, lida a 2026-11-25)](https://learn.microsoft.com/en-us/sql/relational-databases/security/ledger/ledger-overview): o ledger guarda numa tabela de histórico o valor anterior de cada linha alterada, há tabelas que só aceitam inserções e a adulteração fica detetável
- [Constraints (documentação do PostgreSQL 19, lida a 2026-11-25)](https://www.postgresql.org/docs/current/ddl-constraints.html): a chave estrangeira mantém a integridade referencial, e mudar uma chave referenciada dispara a ação `ON UPDATE` nas linhas que a referem
- [Expand and contract (documentação do Prisma, sem data, lida a 2026-11-25)](https://www.prisma.io/docs/guides/database/data-migration): primeiro acrescenta-se a coluna nova e copiam-se os dados; a antiga só se remove quando já nada a lê
- [Avoiding downtime in migrations (documentação do GitLab, sem data, lida a 2026-11-25)](https://docs.gitlab.com/development/database/avoiding_downtime_in_migrations/): deixar de usar uma coluna e apagá-la não devem acontecer no mesmo release, e mudar o nome de uma coluna da forma habitual obriga a parar o serviço

> **Nota (fonte oficial):** a 2026-11-04 não se encontrou fonte oficial; as de cima foram encontradas a 2026-11-25.

Fonte: pág. 4 (Dicionario-Boas-Praticas.pdf)

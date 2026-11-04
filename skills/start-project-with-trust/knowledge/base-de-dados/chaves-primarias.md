---
id: base-de-dados/chaves-primarias
titulo: "Chaves primárias"
seccao: "Base de dados"
paginas: [27]
fonte: Dicionario-Boas-Praticas.pdf
verificado_em: 2026-11-03
fontes_oficiais_consultadas_em: 2026-11-04
---

# Chaves primárias

**Resumo:** Toda a tabela tem chave primária estável, e as chaves referenciadas nunca se reutilizam nem renumeram.

## Conteúdo

- Toda a tabela tem chave primária; preferir uma chave substituta (surrogate: identidade/sequência ou UUID) estável.
- UUID para distribuído ou IDs públicos; sequência para densidade e ordem; nunca reutilizar nem renumerar chaves referenciadas.

**Para uma skill:** toda a tabela tem PK; chaves referenciadas nunca se renumeram.

## Ver também

- [Integridade dos dados e migrações aditivas](../seguranca/integridade-e-migracoes-aditivas.md) (Segurança)

## Fontes oficiais

*Ligações externas que apoiam esta entrada, consultadas a 2026-11-04. Não alteram o texto acima.*

- [Constraints (PostgreSQL)](https://www.postgresql.org/docs/current/ddl-constraints.html) — «Todas as tabelas devem ter chave primária»; não imposto, mas recomendado
- [Identity Columns (PostgreSQL)](https://www.postgresql.org/docs/current/ddl-identity-columns.html) — Colunas identidade geradas por sequência para valores de chave
- [UUID Type (PostgreSQL)](https://www.postgresql.org/docs/current/datatype-uuid.html) — UUID com melhor unicidade em sistemas distribuídos; UUIDv4 e UUIDv7 nativos

Fonte: pág. 27 (Dicionario-Boas-Praticas.pdf)

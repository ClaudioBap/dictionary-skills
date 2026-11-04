---
id: base-de-dados/chaves-estrangeiras-e-integridade-referencial
titulo: "Chaves estrangeiras e integridade referencial"
seccao: "Base de dados"
paginas: [27]
fonte: Dicionario-Boas-Praticas.pdf
verificado_em: 2026-11-03
fontes_oficiais_consultadas_em: 2026-11-04
---

# Chaves estrangeiras e integridade referencial

**Resumo:** Declarar as chaves estrangeiras com ação intencional e indexar as suas colunas.

## Conteúdo

- Declarar as chaves estrangeiras; escolher a ação (`ON DELETE RESTRICT/CASCADE/SET NULL`) com intenção.
- Indexar as colunas de chave estrangeira; não deixar a integridade só ao código da aplicação.

**Para uma skill:** toda a relação tem FK declarada e a coluna indexada.

## Fontes oficiais

*Ligações externas que apoiam esta entrada, consultadas a 2026-11-04. Não alteram o texto acima.*

- [Constraints — Foreign Keys (PostgreSQL)](https://www.postgresql.org/docs/current/ddl-constraints.html) — Ações ON DELETE RESTRICT/CASCADE/SET NULL; FK não cria índice, convém indexar

Fonte: pág. 27 (Dicionario-Boas-Praticas.pdf)

---
id: base-de-dados/nomenclatura
titulo: "Nomenclatura"
seccao: "Base de dados"
paginas: [27]
fonte: Dicionario-Boas-Praticas.pdf
verificado_em: 2026-11-03
fontes_oficiais_consultadas_em: 2026-11-04
---

# Nomenclatura

**Resumo:** Nomes consistentes em `snake_case`, uma convenção mantida e nomes que dizem o conteúdo.

## Conteúdo

- Nomes consistentes: `snake_case`, minúsculas, sem espaços nem palavras reservadas; o nome diz o que lá está.
- Escolher e manter uma convenção (tabelas no singular ou plural, mas sempre a mesma); nada de tabelas genéricas com coluna discriminadora.
- Colunas claras (`data_criacao`, não `dc`); chaves estrangeiras com nome que aponta a tabela (`cliente_id`).

**Para uma skill:** uma tabela ou coluna nova segue a convenção e o nome diz o conteúdo.

## Fontes oficiais

*Ligações externas que apoiam esta entrada, consultadas a 2026-11-04. Não alteram o texto acima.*

- [Lexical Structure (PostgreSQL)](https://www.postgresql.org/docs/current/sql-syntax-lexical.html) — Nomes sem aspas são convertidos para minúsculas; com aspas, sensíveis a maiúsculas
- [SQL Key Words (PostgreSQL)](https://www.postgresql.org/docs/current/sql-keywords-appendix.html) — Lista de palavras reservadas que causam erros como identificadores

> **Nota (fonte oficial):** A convenção snake_case em si não tem fonte oficial; o PostgreSQL apenas torna minúsculas os nomes sem aspas, o que a favorece.

Fonte: pág. 27 (Dicionario-Boas-Praticas.pdf)

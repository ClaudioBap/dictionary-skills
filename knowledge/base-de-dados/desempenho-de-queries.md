---
id: base-de-dados/desempenho-de-queries
titulo: "Desempenho de queries"
seccao: "Base de dados"
paginas: [29]
fonte: Dicionario-Boas-Praticas.pdf
verificado_em: 2026-11-03
fontes_oficiais_consultadas_em: 2026-11-04
---

# Desempenho de queries

**Resumo:** Pedir só o necessário, paginar, evitar N+1 e analisar as queries lentas pelo plano.

## Conteúdo

- Pedir só as colunas necessárias (sem `SELECT *`); paginar resultados grandes; evitar o problema N+1.
- Ler o plano de execução (`EXPLAIN`); filtrar na base, não na aplicação; cuidado com funções sobre colunas indexadas.

**Para uma skill:** nenhuma query traz tudo sem paginar; as lentas são analisadas pelo plano.

## Fontes oficiais

*Ligações externas que apoiam esta entrada, consultadas a 2026-11-04. Não alteram o texto acima.*

- [Using EXPLAIN (PostgreSQL)](https://www.postgresql.org/docs/current/using-explain.html) — EXPLAIN e EXPLAIN ANALYZE para ler o plano e comparar estimativas
- [Indexes on Expressions (PostgreSQL)](https://www.postgresql.org/docs/current/indexes-expressional.html) — Função sobre coluna só usa índice definido sobre essa expressão

> **Nota (fonte oficial):** Evitar SELECT * e o problema N+1 sem fonte oficial encontrada.

Fonte: pág. 29 (Dicionario-Boas-Praticas.pdf)

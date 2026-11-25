---
id: base-de-dados/desempenho-de-queries
titulo: "Desempenho de queries"
seccao: "Base de dados"
paginas: [29]
fonte: Dicionario-Boas-Praticas.pdf
verificado_em: 2026-11-25
editado_em: 2026-11-25
fontes_oficiais_consultadas_em: 2026-11-04
---

# Desempenho de queries

**Resumo:** Pedir só o necessário, paginar, evitar N+1 e analisar as queries lentas pelo plano.

## Conteúdo

- Pedir só as colunas necessárias (sem `SELECT *`); paginar resultados grandes; evitar o problema N+1.
- Ler o plano de execução (`EXPLAIN`); filtrar na base, não na aplicação; cuidado com funções sobre colunas indexadas.
- `EXPLAIN ANALYZE` executa mesmo a instrução: numa escrita (`INSERT`, `UPDATE`, `DELETE`, `MERGE`), corre-se entre `BEGIN;` e `ROLLBACK;` para não mudar os dados. A opção `BUFFERS` mostra os blocos encontrados na cache e os lidos do disco.
- Numa base cobrada pelas linhas que lê, como a D1 da Cloudflare, o desempenho e o custo de cada query medem-se pelas linhas lidas: «Rows read measure how many rows a query reads (scans), regardless of the size of each row.» O plano Workers Free tem um teto de 5 milhões de linhas lidas por dia, e um índice no campo do filtro reduz as linhas lidas. Fonte: [Cloudflare D1: Pricing](https://developers.cloudflare.com/d1/platform/pricing/). A D1 devolve as linhas lidas e escritas em cada resposta da Workers Binding API, e o comando `wrangler d1 insights`, ainda experimental, mostra as queries que mais leem. Fonte: [Cloudflare D1: Metrics and analytics](https://developers.cloudflare.com/d1/observability/metrics-analytics/). No portal de origem, o primeiro deploy falhou por passar os 5 milhões diários, e a correção foi juntar índices às queries que mais liam, encontradas com o `wrangler d1 insights` *(experiência do projeto, 2026-11-21)*.

**Para uma skill:** nenhuma query traz tudo sem paginar; as lentas são analisadas pelo plano; numa base cobrada por linhas lidas, as queries que mais leem têm as linhas lidas medidas e comparadas com o teto do plano.

## Fontes oficiais

*Ligações externas que apoiam esta entrada, consultadas a 2026-11-04. Não alteram o texto acima.*

- [Using EXPLAIN (PostgreSQL)](https://www.postgresql.org/docs/current/using-explain.html) — EXPLAIN e EXPLAIN ANALYZE para ler o plano e comparar estimativas
- [Indexes on Expressions (PostgreSQL)](https://www.postgresql.org/docs/current/indexes-expressional.html) — Função sobre coluna só usa índice definido sobre essa expressão
- [Cloudflare D1: Pricing](https://developers.cloudflare.com/d1/platform/pricing/) — Linhas lidas como medida de custo, o teto do plano Free e os índices que as reduzem (consultada a 2026-11-25)
- [Cloudflare D1: Metrics and analytics](https://developers.cloudflare.com/d1/observability/metrics-analytics/) — Linhas lidas em cada query e o `wrangler d1 insights` (consultada a 2026-11-25)

> **Nota (fonte oficial):** Evitar SELECT * e o problema N+1 sem fonte oficial encontrada.

## Histórico

- **2026-11-25**: antes, «**Para uma skill:** nenhuma query traz tudo sem paginar; as lentas são analisadas pelo plano.» (PDF pág. 29). Mudou porque numa base cobrada por linhas lidas o custo e o teto do plano dependem de cada query: o critério passa a pedir as linhas lidas medidas. Fonte: [Cloudflare D1: Pricing](https://developers.cloudflare.com/d1/platform/pricing/). Editado a 2026-11-25.

Fonte: pág. 29 (Dicionario-Boas-Praticas.pdf)

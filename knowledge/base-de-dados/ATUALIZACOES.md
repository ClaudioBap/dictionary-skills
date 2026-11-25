# Atualizações: Base de dados

Novidades com confiança alta ou média (as de média levam «Confiança: media»), organizadas por categoria e da mais recente para a mais antiga. Não alteram o texto das entradas. Cada linha tem o seu registo no [CHANGELOG](../CHANGELOG.md).

## PostgreSQL

- **2026-11-19** em [Desempenho de queries](desempenho-de-queries.md): Saiu o PostgreSQL 19. Traz o comando `REPACK`, que recupera o espaço perdido em tabelas inchadas e substitui o `VACUUM FULL` e o `CLUSTER` (que continuam disponíveis); com `REPACK (CONCURRENTLY)`, fá-lo sem bloquear leituras nem escritas. Traz também a extensão `pg_plan_advice`, para estabilizar a escolha de planos, e a opção `IO` do `EXPLAIN ANALYZE`, que mostra a atividade de I/O assíncrono. As verificações de chaves estrangeiras ficaram mais rápidas: nos testes do projeto, as inserções em massa foram quase 2 vezes mais rápidas. Fonte: [PostgreSQL 19 Released!](https://www.postgresql.org/about/news/postgresql-19-released-3449/). Confiança: alta. Adicionado a 2026-11-25.

- **2026-11-12** em [Segurança da base de dados](seguranca-da-base-de-dados.md): Saíram o PostgreSQL 18.7, 17.12, 16.16, 15.20 e 14.25, que corrigem 52 vulnerabilidades de segurança e mais de 140 bugs. A 14.25 é a última versão do PostgreSQL 14: «PostgreSQL 14 is now end-of-life and will no longer receive security and bug fixes.» Quem ainda está no 14 planeia a passagem para uma versão suportada. Saiu também o PostgreSQL 19 RC 2, e a versão final do 19 está prevista para 2026-11-19, se não aparecer um problema que obrigue a adiar. Fonte: [PostgreSQL News](https://www.postgresql.org/about/news/postgresql-187-1712-1616-1520-1425-and-19-rc-2-released-3442/). Confiança: alta. Adicionado a 2026-11-14.

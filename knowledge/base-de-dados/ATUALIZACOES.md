# Atualizações: Base de dados

Novidades com confiança alta ou média (as de média levam «Confiança: media»), organizadas por categoria e da mais recente para a mais antiga. Não alteram o texto das entradas. Cada linha tem o seu registo no [CHANGELOG](../CHANGELOG.md).

## PostgreSQL

- **2026-11-19** em [Desempenho de queries](desempenho-de-queries.md): Saiu o PostgreSQL 19. Traz o comando `REPACK`, que recupera o espaço perdido em tabelas inchadas e substitui o `VACUUM FULL` e o `CLUSTER` (que continuam disponíveis); com `REPACK (CONCURRENTLY)`, fá-lo sem bloquear leituras nem escritas. Traz também a extensão `pg_plan_advice`, para estabilizar a escolha de planos, e a opção `IO` do `EXPLAIN ANALYZE`, que mostra a atividade de I/O assíncrono. As verificações de chaves estrangeiras ficaram mais rápidas: nos testes do projeto, as inserções em massa foram quase 2 vezes mais rápidas. Fonte: [PostgreSQL 19 Released!](https://www.postgresql.org/about/news/postgresql-19-released-3449/). Confiança: alta. Adicionado a 2026-11-25.

- **2026-11-12** em [Segurança da base de dados](seguranca-da-base-de-dados.md): Saíram o PostgreSQL 18.7, 17.12, 16.16, 15.20 e 14.25, que corrigem 52 vulnerabilidades de segurança e mais de 140 bugs. A 14.25 é a última versão do PostgreSQL 14: «PostgreSQL 14 is now end-of-life and will no longer receive security and bug fixes.» Quem ainda está no 14 planeia a passagem para uma versão suportada. Saiu também o PostgreSQL 19 RC 2, e a versão final do 19 está prevista para 2026-11-19, se não aparecer um problema que obrigue a adiar. Fonte: [PostgreSQL News](https://www.postgresql.org/about/news/postgresql-187-1712-1616-1520-1425-and-19-rc-2-released-3442/). Confiança: alta. Adicionado a 2026-11-14.

## MongoDB

- **2026-11-10** em [MongoDB: consistência, réplicas, sharding, segurança e Atlas](mongodb-consistencia-escala-seguranca-e-atlas.md): Saiu o MongoDB 9.0.7, com muitas correções de segurança, entre elas a CVE-2026-118383 e as CVE-2026-120803 a CVE-2026-120828. A 9.0.8 saiu no mesmo dia e só corrige o nome de um diretório de arquivo na compilação cruzada (SERVER-138547). Fonte: [MongoDB 9.0 release notes](https://www.mongodb.com/docs/manual/release-notes/9.0/). Confiança: alta. Adicionado a 2026-11-26.

## Microsoft Fabric

- **novembro de 2026** em [Microsoft Fabric (OneLake, Lakehouse, Warehouse, capacidade e segurança)](microsoft-fabric.md): O surge protection ao nível do espaço de trabalho passou a disponibilidade geral: os administradores da capacidade podem limitar a computação de um espaço de trabalho, bloquear de forma automática ou manual os maiores consumidores e isentar os espaços de trabalho críticos. A página dá só o mês. Fonte: [What's new in Microsoft Fabric](https://learn.microsoft.com/en-us/fabric/fundamentals/whats-new). Confiança: media. Adicionado a 2026-11-26.
- **setembro de 2026** em [Microsoft Fabric (OneLake, Lakehouse, Warehouse, capacidade e segurança)](microsoft-fabric.md): O capacity overage passou a disponibilidade geral nas SKUs F e vem ligado por omissão quando se cria uma capacidade: «It pays for eligible excess capacity usage to help prevent throttling, up to a configurable rolling 24-hour threshold.» A página dá só o mês. Fonte: [What's new in Microsoft Fabric](https://learn.microsoft.com/en-us/fabric/fundamentals/whats-new). Confiança: media. Adicionado a 2026-11-26.

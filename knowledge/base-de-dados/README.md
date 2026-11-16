# Base de dados

Tag no Logseq: `#bd`.

Fonte: págs. 27–30 (Dicionario-Boas-Praticas.pdf)

## Entradas

- [Nomenclatura](nomenclatura.md) — Nomes consistentes em `snake_case`, uma convenção mantida e nomes que dizem o conteúdo. *(pág. 27)*
- [Chaves primárias](chaves-primarias.md) — Toda a tabela tem chave primária estável, e as chaves referenciadas nunca se reutilizam nem renumeram. *(pág. 27)*
- [Chaves estrangeiras e integridade referencial](chaves-estrangeiras-e-integridade-referencial.md) — Declarar as chaves estrangeiras com ação intencional e indexar as suas colunas. *(pág. 27)*
- [Constraints e integridade](constraints-e-integridade.md) — A base impõe as regras invariantes com `NOT NULL`, `UNIQUE`, `CHECK` e `DEFAULT`. *(pág. 27)*
- [Tipos de dados](tipos-de-dados.md) — Escolher o tipo certo: dinheiro em decimal, tempo em UTC, nada de números em texto. *(pág. 28)*
- [Normalização e desenho](normalizacao-e-desenho.md) — Normalizar até à 3.ª forma normal por omissão e só desnormalizar com razão medida e documentada. *(pág. 28)*
- [Índices](indices.md) — Indexar o que se filtra, junta e ordena, sem sobre-indexar, medindo com o plano de execução. *(pág. 28)*
- [Transações e ACID](transacoes-e-acid.md) — Agrupar em transações curtas as escritas que têm de acontecer todas ou nenhuma. *(pág. 28)*
- [Isolamento e concorrência](isolamento-e-concorrencia.md) — Conhecer os níveis de isolamento e escolher explicitamente controlo otimista ou pessimista. *(págs. 28, 29)*
- [Migrações](migracoes.md) — Toda a mudança de esquema é uma migração versionada, de preferência aditiva e reversível. *(pág. 29)*
- [Auditoria e apagamento](auditoria-e-apagamento.md) — Colunas de auditoria, histórico append-only para o sensível e apagamento que preserva o rasto. *(pág. 29)*
- [Desempenho de queries](desempenho-de-queries.md) — Pedir só o necessário, paginar, evitar N+1 e analisar as queries lentas pelo plano. *(pág. 29)*
- [Segurança da base de dados](seguranca-da-base-de-dados.md) — Conta da aplicação com permissões mínimas, queries parametrizadas e dados sensíveis cifrados. *(pág. 29)*
- [Backups e recuperação](backups-e-recuperacao.md) — Backups regulares, cifrados e fora do servidor, com restauro ensaiado. *(págs. 29, 30)*
- [Big data e lakehouse (Parquet, Delta, Iceberg, Spark, Kafka)](big-data-e-lakehouse.md) — Só se sai da base relacional quando os dados são demasiado grandes ou variados para ela, ou chegam como fluxo sem fim. Nesse caso guardam-se em ficheiros Parquet com um formato de tabela aberto (Delta ou Iceberg), processam-se com Spark em lote ou em fluxo, usa-se Kafka para os eventos e organizam-se em camadas bronze, prata e ouro. *(fora do PDF)*
- [Microsoft Fabric (OneLake, Lakehouse, Warehouse, capacidade e segurança)](microsoft-fabric.md) — O Fabric é uma plataforma de análise em SaaS sobre um só lago, o OneLake. Escolhe-se Lakehouse para Spark e dados de qualquer forma, Warehouse para T-SQL com transações entre tabelas, e base de dados SQL para o operacional; paga-se por uma capacidade (SKU F) que se pode pausar, e a segurança de cada dado impõe-se na origem. *(fora do PDF)*
- [MongoDB: consistência, réplicas, sharding, segurança e Atlas](mongodb-consistencia-escala-seguranca-e-atlas.md) — O MongoDB tem transações entre documentos, mas o desenho do esquema deve evitá-las. Uma réplica (replica set) dá disponibilidade, o sharding só se usa com uma boa chave, o controlo de acesso vem desligado por omissão, e o Atlas é o serviço gerido, com um escalão gratuito limitado e sem backups nele. *(fora do PDF)*
- [MongoDB: modelo de documentos, índices e agregação](mongodb-modelo-indices-e-agregacao.md) — Usa-se MongoDB quando os dados se leem juntos e o esquema muda; o que se lê junto guarda-se junto (embutido), e referencia-se quando o filho cresce sem limite. Os índices compostos seguem a regra Igualdade, Ordenação, Intervalo (ESR) e medem-se com `explain`, e a agregação corre em estágios com limite de memória. *(fora do PDF)*

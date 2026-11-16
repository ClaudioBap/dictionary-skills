---
id: base-de-dados/mongodb-consistencia-escala-seguranca-e-atlas
titulo: "MongoDB: consistência, réplicas, sharding, segurança e Atlas"
seccao: "Base de dados"
paginas: []
fonte: "https://www.mongodb.com/docs/manual/replication/"
data_lancamento: null
confianca: media
verificado_em: 2026-11-16
---

# MongoDB: consistência, réplicas, sharding, segurança e Atlas

**Resumo:** O MongoDB tem transações entre documentos, mas o desenho do esquema deve evitá-las. Uma réplica (replica set) dá disponibilidade, o sharding só se usa com uma boa chave, o controlo de acesso vem desligado por omissão, e o Atlas é o serviço gerido, com um escalão gratuito limitado e sem backups nele.

## Conteúdo

- Transações: o MongoDB suporta transações ACID entre vários documentos, em réplicas e em clusters com sharding (a partir das versões de compatibilidade 4.0 e 4.2). A página diz que a disponibilidade de transações distribuídas «should not be a replacement for effective schema design». Há no máximo uma transação aberta por sessão; por omissão uma transação tem de durar menos de um minuto (`transactionLifetimeLimitSeconds`, 60 segundos) e espera até 5 ms por locks. Dentro da transação não se indica write concern por operação e o read concern de coleção e base de dados é ignorado. Fonte: [Transactions](https://www.mongodb.com/docs/manual/core/transactions/), [Production considerations](https://www.mongodb.com/docs/manual/core/transactions-production-consideration/), [Limits](https://www.mongodb.com/docs/manual/reference/limits/)
- Write concern: o valor implícito por omissão é `w: majority` (`w: 1` se os árbitros forem maioria dos votantes). `j: true` sozinho não garante que a escrita não é revertida numa mudança de primário. Evitar `majority` em topologias P-S-A, onde todos os membros com dados e voto têm de estar disponíveis. Fonte: [Write concern](https://www.mongodb.com/docs/manual/reference/write-concern/)
- Read concern: `local` é o valor por omissão e os dados «may be rolled back»; `majority` devolve dados duráveis mesmo com falha; `linearizable` só no primário; `snapshot` dá dados confirmados pela maioria num instante, entre shards. Fonte: [Read concern](https://www.mongodb.com/docs/manual/reference/read-concern/)
- Réplicas: um grupo de processos `mongod` com os mesmos dados. O primário recebe as escritas e os secundários replicam o oplog de forma assíncrona; por omissão os clientes leem do primário. A eleição de novo primário começa passado `electionTimeoutMillis` (10 s por omissão) e a mediana não deve passar 12 s. Um árbitro vota mas não guarda dados. Uma réplica tem até 50 membros, dos quais até 7 votam. Fonte: [Replication](https://www.mongodb.com/docs/manual/replication/), [Limits](https://www.mongodb.com/docs/manual/reference/limits/)
- Sharding: reparte uma coleção por vários shards, cada um uma réplica; o `mongos` encaminha as consultas e os servidores de configuração são também uma réplica (a partir da 8.0 podem guardar dados, como config shard). Uma consulta sem a chave de shard vai a todos os shards. A chave ideal distribui os documentos por igual e serve as consultas comuns. A cardinalidade da chave limita o número de chunks. Um valor que só cresce concentra as inserções num só chunk, e a página sugere sharding por hash. A chave refina-se acrescentando campos ou muda-se com `reshardCollection` (desde a 5.0). Fonte: [Sharding](https://www.mongodb.com/docs/manual/sharding/), [Shard keys](https://www.mongodb.com/docs/manual/core/sharding-shard-key/), [Choose a shard key](https://www.mongodb.com/docs/manual/core/sharding-choose-a-shard-key/)
- Segurança: «MongoDB does not enable access control by default»; ativa-se com `--auth` ou `security.authorization`, e o mecanismo por omissão é o SCRAM. O primeiro utilizador criado é um administrador de utilizadores. Papéis concedem privilégios e «never limit privileges»; aplica-se o menor privilégio. A autenticação LDAP está descontinuada desde a 8.0. Fonte: [Security checklist](https://www.mongodb.com/docs/manual/administration/security-checklist/), [Authorization](https://www.mongodb.com/docs/manual/core/authorization/)
- Cifra: TLS em todas as ligações; o MongoDB desativa TLS 1.0 e 1.1 onde há TLS 1.2 ou superior. A cifra em repouso nativa do WiredTiger é do Enterprise (AES256-CBC por omissão, com KMIP recomendado); os dados não são cifrados na rede nativamente, e a Queryable Encryption dá cifra de ponta a ponta desde a 7.0. A auditoria também é do Enterprise. A rede onde corre deve ser de confiança, com firewall ou grupos de segurança. Fonte: [TLS](https://www.mongodb.com/docs/manual/core/security-transport-encryption/), [Encryption at rest](https://www.mongodb.com/docs/manual/core/security-encryption-at-rest/)
- Atlas: serviço multi-cloud (AWS, Azure e Google Cloud) para criar e gerir bases. O escalão gratuito (Free) tem 512 MB, um cluster por projeto, 500 ligações, 100 operações por segundo, ordenação em memória de 32 MB (ignora `allowDiskUse`), sem sharding, sem private endpoints nem peering, e pausa automática após 30 dias sem atividade. A página recomenda M30 ou superior para produção. Fonte: [Atlas](https://www.mongodb.com/docs/atlas/), [Manage clusters](https://www.mongodb.com/docs/atlas/manage-clusters/), [Free cluster limits](https://www.mongodb.com/docs/atlas/reference/free-shared-limitations/)
- Backups no Atlas: as cópias na nuvem estão disponíveis a partir do M10 e não nos clusters Free, onde se usa `mongodump` e `mongorestore`; o Flex tem cópias diárias. Durante um restauro não se escreve no cluster. A política de conformidade impede apagar cópias ou mudar a retenção. Fonte: [Back up and restore](https://www.mongodb.com/docs/atlas/backup-restore-cluster/)
- Versões e fim de vida (a 2026-11-16): a série estável atual é a 9.0 (lançada em setembro de 2026, fim de vida a 31 de outubro de 2031); a 8.0 termina a 31 de outubro de 2029, a 7.0 a 31 de agosto de 2027, a 6.0 já terminou a 31 de julho de 2025. A política diz que drivers lançados mais de 3 anos depois do fim de vida de uma versão do servidor deixam de ser compatíveis com ela. Os valores são os do Enterprise Advanced. Fonte: [Release notes](https://www.mongodb.com/docs/manual/release-notes/), [Ciclos de vida do MongoDB](https://www.mongodb.com/legal/support-policy/lifecycles)

**Para uma skill:** em MongoDB, o desenho evita transações por esquema e só as usa quando preciso, curtas. Declara o write concern e o read concern que a aplicação exige, em vez de confiar nos valores por omissão. Só propõe sharding com a chave justificada por cardinalidade e padrão de consulta. Liga o controlo de acesso desde o primeiro dia, com TLS e papéis mínimos. No Atlas, o escalão Free serve para teste: produção pede M30 ou superior com cópias ligadas, e a proposta confirma a região (ver [Minimização e residência dos dados](../soberania/minimizacao-e-residencia-dos-dados.md)). A versão do servidor escolhida está dentro do fim de vida da tabela acima.

## Ver também

- [MongoDB: modelo de documentos, índices e agregação](mongodb-modelo-indices-e-agregacao.md) (Base de dados)
- [Transações e ACID](transacoes-e-acid.md) (Base de dados)
- [Isolamento e concorrência](isolamento-e-concorrencia.md) (Base de dados)
- [Segurança da base de dados](seguranca-da-base-de-dados.md) (Base de dados)
- [Backups e recuperação](backups-e-recuperacao.md) (Base de dados)

Fonte: documentação oficial do MongoDB, ligada em cada ponto; lida a 2026-11-16. As páginas do manual não indicam data; a versão vem do seletor «9.0 (Current)». Confiança média por essa razão. Não vem do PDF.

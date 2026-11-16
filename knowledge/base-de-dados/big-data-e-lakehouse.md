---
id: base-de-dados/big-data-e-lakehouse
titulo: "Big data e lakehouse (Parquet, Delta, Iceberg, Spark, Kafka)"
seccao: "Base de dados"
paginas: []
fonte: "https://learn.microsoft.com/en-us/azure/architecture/databases/guide/big-data-architectures"
data_lancamento: 2025-09-12
confianca: alta
verificado_em: 2026-11-16
---

# Big data e lakehouse (Parquet, Delta, Iceberg, Spark, Kafka)

**Resumo:** Só se sai da base relacional quando os dados são demasiado grandes ou variados para ela, ou chegam como fluxo sem fim. Nesse caso guardam-se em ficheiros Parquet com um formato de tabela aberto (Delta ou Iceberg), processam-se com Spark em lote ou em fluxo, usa-se Kafka para os eventos e organizam-se em camadas bronze, prata e ouro.

## Conteúdo

- Quando deixa de caber: uma arquitetura de big data trata dados «too large or complex for traditional database systems». O limiar não é um número: há organizações com centenas de gigabytes e outras com centenas de terabytes, e a definição desloca-se do tamanho para o valor tirado de análise avançada. A página indica três razões para a considerar: volumes demasiado grandes para uma base tradicional, dados não estruturados a transformar para análise, e fluxos sem fim a processar em tempo real ou com baixa latência. Fonte: [Big data architectures (Microsoft Learn, ms.date 2025-09-12, lida a 2026-11-16)](https://learn.microsoft.com/en-us/azure/architecture/databases/guide/big-data-architectures)
- Lakehouse: «combines the best elements of data lakes and data warehouses», sobre formatos abertos como Parquet ou ORC. Fonte: a mesma página.
- Parquet: formato de ficheiro open source, orientado a colunas, com compressão e codificação para dados em volume. A especificação está no repositório parquet-format, que não traz bibliotecas de leitura e escrita. A página avisa que nem todas as implementações suportam as mesmas funcionalidades, por isso se testa ao combinar ferramentas. Fonte: [Apache Parquet: overview (sem data, lida a 2026-11-16)](https://parquet.apache.org/docs/overview/)
- Delta Lake: projeto open source para montar um lakehouse sobre data lakes (S3, ADLS, GCS e HDFS). Dá isolamento serializável («readers never see inconsistent data»), versões dos dados para voltar atrás e auditar, e uma tabela que é ao mesmo tempo origem e destino de fluxo. A última versão indicada na página de versões é a 4.3.x, compatível com Spark 4.0.x e 4.1.x (página sem data, lida a 2026-11-16). Fonte: [Delta Lake: introdução](https://docs.delta.io/latest/delta-intro.html), [Delta Lake: versões](https://docs.delta.io/latest/releases.html)
- Apache Iceberg: «open table format for huge analytic datasets», com evolução de esquema que não ressuscita dados apagados, partições escondidas e viagem no tempo. Os escritores criam os metadados de forma otimista e o commit troca o ponteiro, repetindo se a base já não for a atual; os leitores não adquirem locks. Spark, Trino, Flink, Presto, Hive e Impala trabalham sobre as mesmas tabelas. A especificação está na versão 3 e a 4 «is under active development and has not been formally adopted». A página dá a 1.12.0 como a última (sem data, lida a 2026-11-16). Fonte: [Apache Iceberg](https://iceberg.apache.org/docs/latest/), [Especificação do Iceberg](https://iceberg.apache.org/spec/) *(só li uma parte da especificação)*
- Delta ou Iceberg: ambos são abertos e nenhuma das páginas lidas diz qual escolher. O OneLake do Microsoft Fabric guarda tabelas em Delta Parquet ou Iceberg e converte os metadados entre os dois (ver [Microsoft Fabric](microsoft-fabric.md)). A escolha depende dos motores que vão ler *(interpretação)*.
- Spark: «unified analytics engine for large-scale data processing», com APIs em Java, Scala, Python e R; a documentação lida é da 4.3.0. O mesmo código descreve lote e fluxo («You can express your streaming computation the same way you would express a batch computation on static data»). O fluxo corre por omissão em micro-lotes, com latências de cerca de 100 ms, e dá exactly-once de ponta a ponta com checkpoints e write-ahead logs. O Continuous Processing desce a 1 ms, mas só com at-least-once. Fonte: [Spark](https://spark.apache.org/docs/latest/), [Spark Streaming](https://spark.apache.org/docs/latest/streaming/index.html) (sem data, lidas a 2026-11-16)
- Kafka: guarda eventos (chave, valor, instante e cabeçalhos opcionais) em tópicos repartidos por partições. Ler não apaga: os eventos só saem quando acaba a retenção configurada por tópico. Eventos com a mesma chave vão para a mesma partição e são lidos pela ordem em que foram escritos. A replicação faz-se por partição e um fator 3 é uma definição comum em produção. Fonte: [Apache Kafka: introdução (sem data, lida a 2026-11-16)](https://kafka.apache.org/intro)
- Lote e fluxo juntos: a arquitetura Lambda tem um caminho frio (lote) e um caminho quente (tempo real); a Kappa passa tudo por um só caminho de fluxo e evita a lógica duplicada. Fonte: a página de Big data architectures.
- Camadas bronze, prata e ouro (arquitetura medalhão): descrevem a qualidade dos dados. Bronze guarda o estado original da fonte, só acrescenta e valida o mínimo; prata limpa, valida e desduplica; ouro agrega e modela para relatórios. Seguir a arquitetura é uma boa prática recomendada, «but not a requirement». No Fabric recomenda-se um espaço de trabalho por camada e atalhos no bronze em vez de copiar. Fonte: [Medallion architecture (Microsoft Learn, ms.date 2026-10-29)](https://learn.microsoft.com/en-us/azure/databricks/lakehouse/medallion), [Medallion no Fabric (ms.date 2026-02-12)](https://learn.microsoft.com/en-us/fabric/onelake/onelake-medallion-lakehouse-architecture)

**Para uma skill:** antes de propor big data, medir se a base relacional já responde (ver [Desempenho de queries](desempenho-de-queries.md)); só se justifica com volume, variedade ou fluxo que ela não aguenta, e o texto da proposta diz qual. Se justificar, as tabelas ficam em Parquet com Delta ou Iceberg, o processamento é Spark (em lote, e em fluxo só se houver requisito de latência), os eventos passam por Kafka, e os dados organizam-se em bronze (cru, só acrescentar), prata (limpo) e ouro (para quem consome). Cada versão citada leva a data em que foi lida.

## Ver também

- [Microsoft Fabric](microsoft-fabric.md) (Base de dados)
- [Normalização e desenho](normalizacao-e-desenho.md) (Base de dados)
- [Mensageria e filas](../infraestrutura/mensageria-e-filas.md) (Serviços de infraestrutura)

Fonte: documentação oficial da Microsoft, do Apache Spark, Delta Lake, Apache Iceberg, Apache Parquet e Apache Kafka, ligada em cada ponto; lida a 2026-11-16. As páginas do Apache e do Delta não indicam data. Não vem do PDF.

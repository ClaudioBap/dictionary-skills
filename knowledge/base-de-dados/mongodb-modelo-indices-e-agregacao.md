---
id: base-de-dados/mongodb-modelo-indices-e-agregacao
titulo: "MongoDB: modelo de documentos, índices e agregação"
seccao: "Base de dados"
paginas: []
fonte: "https://www.mongodb.com/docs/manual/data-modeling/"
data_lancamento: null
confianca: media
verificado_em: 2026-11-16
---

# MongoDB: modelo de documentos, índices e agregação

**Resumo:** Usa-se MongoDB quando os dados se leem juntos e o esquema muda; o que se lê junto guarda-se junto (embutido), e referencia-se quando o filho cresce sem limite. Os índices compostos seguem a regra Igualdade, Ordenação, Intervalo (ESR) e medem-se com `explain`, e a agregação corre em estágios com limite de memória.

## Conteúdo

- Quando usar documentos: o esquema é flexível, os documentos de uma coleção não precisam de ter os mesmos campos nem tipos, e novos campos acrescentam-se sem reescrever os existentes nem migrar. A página avisa para desenhar o esquema antes de ir para produção. O princípio é que «data that's accessed together should be stored together». Fonte: [Data modeling (manual 9.0, sem data, lida a 2026-11-16)](https://www.mongodb.com/docs/manual/data-modeling/)
- Embutir ou referenciar: embute-se quando há uma relação «has-a» ou «contains» e a aplicação lê as peças juntas; referencia-se quando os dados embutidos crescem sem limite ou o lado filho tem cardinalidade alta. Embutir evita junções entre coleções. Fonte: [Embedding vs references](https://www.mongodb.com/docs/manual/data-modeling/concepts/embedding-vs-references/)
- Atomicidade: uma escrita é atómica ao nível de um só documento, e uma transação distribuída custa mais do que escritas de um documento. Embutir dá, por isso, atomicidade sem transação. Fonte: a mesma página.
- Limites: um documento BSON tem no máximo 16 MiB, 100 níveis de aninhamento; uma coleção tem no máximo 64 índices e um índice composto 32 campos. A página de limites chegou truncada, por isso outros limites ficam por confirmar. Fonte: [Limits and thresholds](https://www.mongodb.com/docs/manual/reference/limits/)
- Validação de esquema: regras sobre tipos e intervalos; por omissão o MongoDB rejeita a escrita que produz um documento inválido, e pode em alternativa aceitá-la e registar um aviso. A página diz que serve sobretudo a uma aplicação já estabelecida e com estrutura definida. Fonte: [Schema validation](https://www.mongodb.com/docs/manual/core/schema-validation/)
- Índices: sem índice o MongoDB percorre todos os documentos da coleção; um índice custa nas escritas; usam estrutura B-tree; o índice sobre `_id` existe sempre e não se apaga; um índice sobre documento embutido só serve consultas que indicam o documento inteiro. Fonte: [Indexes](https://www.mongodb.com/docs/manual/indexes/)
- Ordem num índice composto (regra ESR): campos de igualdade primeiro, depois os de ordenação, depois os de intervalo, para evitar ordenar em memória. Se o intervalo da consulta for muito seletivo, vai antes da ordenação (ERS). `$ne` e `$nin` contam como intervalo, e um `$in` com 201 elementos ou mais também. Fonte: [ESR guideline](https://www.mongodb.com/docs/manual/tutorial/equality-sort-range-guideline/)
- Medir: `explain` mostra `COLLSCAN` (percurso da coleção) ou `IXSCAN` (percurso do índice); com `executionStats` compara-se `totalDocsExamined` com o que foi devolvido; uma consulta coberta tem um `IXSCAN` que não é descendente de um `FETCH`. `executionTimeMillis` «is not necessarily representative of actual query time». Fonte: [Explain results](https://www.mongodb.com/docs/manual/reference/explain-results/)
- Agregação: um pipeline de estágios; o mesmo estágio pode repetir-se, exceto `$out`, `$merge` e `$geoNear`. Um pipeline só altera documentos se tiver `$merge` ou `$out`. Cada documento do resultado respeita os 16 MiB, e um pipeline tem no máximo 1000 estágios. Os estágios que precisam de mais de 100 MB de memória escrevem ficheiros temporários em disco por omissão (parâmetro `allowDiskUseByDefault`, desde a 6.0), e o `$push` não consegue. Na 9.0 o limite por omissão é 1 GB ou 20 % da memória do processo, o que for maior. O map-reduce está descontinuado desde a 5.0. Fonte: [Aggregation pipeline](https://www.mongodb.com/docs/manual/core/aggregation-pipeline/), [Aggregation pipeline limits](https://www.mongodb.com/docs/manual/core/aggregation-pipeline-limits/)

**Para uma skill:** escolher MongoDB só se os dados se leem em blocos e o esquema muda; para relações entre entidades independentes com integridade, a base relacional continua a ser a primeira escolha *(interpretação)*. O desenho diz, por relação, se embute (lido junto e limitado) ou referencia (cresce sem limite), valida o esquema com regras de validação e cria os índices pela regra ESR a partir das consultas reais, provando-os com `explain` (`IXSCAN`, e `totalDocsExamined` próximo do devolvido). Cada valor de versão ou limite leva a data em que foi lido.

## Ver também

- [Índices](indices.md) (Base de dados)
- [Normalização e desenho](normalizacao-e-desenho.md) (Base de dados)
- [MongoDB: consistência, escala, segurança e Atlas](mongodb-consistencia-escala-seguranca-e-atlas.md) (Base de dados)

Fonte: documentação oficial do MongoDB (manual, seletor de versão «9.0 (Current)»), ligada em cada ponto; lida a 2026-11-16. As páginas do manual não indicam data. Confiança média porque a versão vem do seletor da página e não do corpo, e uma das páginas chegou truncada. Não vem do PDF.

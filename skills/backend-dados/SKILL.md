---
name: backend-dados
description: Mini skill para desenhar e construir a API e a base de dados de um projeto. Começa pelo contrato da API (OpenAPI), desenha o esquema com chaves, restrições e tipos certos, escreve migrações aditivas e reversíveis, torna idempotentes as escritas e o processamento em segundo plano, e prova tudo com testes de contrato no pipeline. Usar sozinha ou numa sessão lançada pela orchestrate-sessions. É uma sub skill, que faz uma parte do trabalho, sozinha ou chamada por uma skill mãe.
argument-hint: "Pasta do projeto e o que se quer: API nova, esquema novo, alteração ao que existe, ou tudo"
metadata:
  estado: produção
  tipo: sub
  usa: [humanizar]
  impacto: { ia: 0, seguranca: 5, nuvem: 5, desenvolvimento: 10, web: 0 }
---

# Backend e dados

O caminho do conhecimento obtém-se com `node ../orchestrate-sessions/scripts/conhecimento.mjs`; as referências `knowledge/...` são relativas a esse caminho.

O conhecimento está em `knowledge/`: `api/`, `base-de-dados/` e `fiabilidade/`. Se `~/.start-project-with-trust/knowledge/` tiver uma entrada com o mesmo caminho, vale a pessoal: é a versão já atualizada.

## Regras

- Seguem-se as regras de `../orchestrate-sessions/regras.md`, incluindo a autonomia depois da decisão: decidido o contrato e o esquema, constróis até ao fim; as credenciais da base de dados e os acessos a sistemas existentes ficam «Por preencher», e o resto continua.
- Modelo e effort segundo `../orchestrate-sessions/modelo-e-effort.md`: o contrato, o esquema e uma migração sobre dados existentes são «Rever e decidir com risco»; implementar endpoints e repositórios já desenhados é «Construir»; ler o esquema atual é «Ler».
- O contrato vem antes do código: nenhum endpoint se implementa sem estar no OpenAPI validado. Base: `api/contrato-e-documentacao-de-api.md`.
- Migrações só aditivas e reversíveis em produção; o que remove ou renomeia faz-se em dois passos. Base: `base-de-dados/migracoes.md`, `seguranca/integridade-e-migracoes-aditivas.md`.
- Dados reais nunca entram em testes nem em documentos. Base: `seguranca/dados-de-teste-sinteticos-e-minimizacao.md`.

## Âmbito

Sabe fazer, com base em `api/`, `base-de-dados/` e `fiabilidade/`:

- o contrato de uma API REST em OpenAPI, com paginação, filtros, limites, versões e testes de contrato; em GraphQL, decidir se compensa e com que cuidados;
- o esquema relacional: normalização, nomes, chaves, restrições, tipos e índices, com transações, isolamento e consultas;
- migrações aditivas e reversíveis, também sobre dados que já existem;
- escritas e tarefas em segundo plano idempotentes, com filas;
- retenção, apagamento e auditoria de dados pessoais no esquema;
- MongoDB, lakehouse e Microsoft Fabric, quando o pedido os nomeia.

Não sabe fazer, e para onde vai:

- autenticação, autorização e auditoria de segurança da API: `seguranca`;
- uma consulta ou uma API lenta sem se saber porquê: `performance-verifier`, que mede primeiro;
- cópias de segurança com restauro, alertas e runbooks da base em produção: `operar`;
- alojar a base, o pipeline e os contentores: `infra-deploy`;
- bases vetoriais e recuperação para RAG: `ia-aplicada`;
- gRPC e WebSockets: fora da base. Segue a secção «Quando falta conhecimento» de `../update-knowledge/SKILL.md` antes de responder.

Pedidos que se confundem:

- «Base de dados» é muita coisa. Desenhar o esquema e as migrações de uma aplicação, sim. Afinar o motor de uma base em produção (parâmetros, réplicas, cópias), não: a base não cobre a afinação do motor, as cópias são da `operar` e o alojamento é da `infra-deploy`.
- «Uma API»: o contrato e o servidor da nossa API, sim. Chamar a API de um modelo de IA é da `ia-aplicada`.
- «Relatórios sobre os dados»: nenhuma skill os constrói. A entrada `plataformas/bi-e-dashboards.md` manda considerar o Metabase ou o Superset antes de construir.

## 1. O que vamos construir

Chamada por uma mãe, o briefing já traz o objeto, o objetivo e o nível: passa ao passo 2. Sozinha, se o pedido não o diz, pergunta como diz `../orchestrate-sessions/regras.md` e pára quando tiver o que precisa (no máximo 5 perguntas):

1. **O quê:** API nova; esquema de base de dados novo; alteração a uma API ou esquema que já existe; processamento em segundo plano (filas, tarefas); ou tudo.
2. **Para quê:** o que tem de ficar garantido, por exemplo um voto por visitante, mudar uma coluna sem parar a produção ou uma tarefa que não repete trabalho. É daqui que saem os critérios de fim.
3. **Até onde**, do mais barato ao mais caro:
   - só o desenho: o contrato validado e o esquema aplicado numa base vazia;
   - o desenho e as migrações, aplicadas e revertidas numa cópia;
   - tudo, até aos testes de contrato verdes no pipeline (recomendado quando o código vai para produção).
4. **Restrições**, só as que faltam: tecnologia imposta (P10), dados pessoais e retenção (P11), objetivos de desempenho (P3), de `../orchestrate-sessions/PERGUNTAS.md`.

Se parte do pedido é de outra skill (ver «Âmbito»), diz qual e porquê: chamada por uma mãe, devolve-lhe essa parte; sozinha, recomenda a skill. Depois lança um subagente (`haiku`, `low`) para inventariar o que existe: contrato atual, esquema, migrações, testes.

## 2. Ler só o que interessa

- API: `api/contrato-e-documentacao-de-api.md`, `api/design-de-api-rest.md`, `api/paginacao-filtros-e-limites.md`, `api/versionamento-e-compatibilidade-de-api.md`, `api/testes-de-contrato.md`; só se o pedido falar em GraphQL, `api/graphql-quando-e-cuidados.md`.
- Esquema: `base-de-dados/normalizacao-e-desenho.md`, `base-de-dados/nomenclatura.md`, `base-de-dados/chaves-primarias.md`, `base-de-dados/chaves-estrangeiras-e-integridade-referencial.md`, `base-de-dados/constraints-e-integridade.md`, `base-de-dados/tipos-de-dados.md`, `base-de-dados/indices.md`.
- Operações e concorrência: `base-de-dados/transacoes-e-acid.md`, `base-de-dados/isolamento-e-concorrencia.md`, `base-de-dados/desempenho-de-queries.md`, `fiabilidade/idempotencia-e-processamento-fiavel.md`, `fiabilidade/degradacao-graciosa.md`.
- Alterações e dados: `base-de-dados/migracoes.md`, `base-de-dados/auditoria-e-apagamento.md`, `base-de-dados/backups-e-recuperacao.md`, `base-de-dados/seguranca-da-base-de-dados.md`, `seguranca/menor-privilegio-na-base-de-dados.md`, `seguranca/queries-parametrizadas.md`.
- Só se o pedido falar em big data, Fabric ou MongoDB: `base-de-dados/big-data-e-lakehouse.md`, `base-de-dados/microsoft-fabric.md`, `base-de-dados/mongodb-modelo-indices-e-agregacao.md`, `base-de-dados/mongodb-consistencia-escala-seguranca-e-atlas.md`.
- Segundo plano: `custo/orquestracao-de-trabalho.md`, `infraestrutura/mensageria-e-filas.md`, `plataformas/tarefas-em-segundo-plano.md`.

## 3. Se a biblioteca não tem a resposta

Quando nenhuma entrada cobre a tecnologia em causa (um motor de base de dados, uma biblioteca de migrações, um formato de contrato), segue «Quando falta conhecimento» em `../update-knowledge/SKILL.md` antes de responder. Fontes oficiais deste tema: a documentação do motor ou da biblioteca e a especificação do standard.

## 4. Construir, pela ordem

O critério de fim de cada passo é a linha «Para uma skill» da entrada que o cobre.

1. **Contrato.** Escreve ou altera o OpenAPI: recursos, verbos, códigos de erro, paginação, filtros e limites, versão. Valida-o com a ferramenta do projeto. Mostra o resumo ao utilizador; as escolhas com mais de uma opção (estilo de paginação, estratégia de versão) vão a ele no formato das perguntas de `../orchestrate-sessions/regras.md`. Prova: o contrato validado.
2. **Esquema.** Entidades normalizadas, nomes pela convenção do projeto, chaves primárias e estrangeiras, restrições e tipos que impedem dados inválidos, índices para as consultas do contrato. Prova: o esquema aplicado numa base vazia sem erros.
3. **Migrações.** Uma migração por alteração, aditiva, com reversão. Prova: aplicar e reverter numa cópia da base, com a saída.
4. **Implementação.** Endpoints que cumprem o contrato, queries parametrizadas, transações onde há mais de uma escrita, escritas e tarefas idempotentes com chave de idempotência, erros devolvidos como o contrato diz. Prova: os testes unitários e de integração a passar.
5. **Testes de contrato.** No pipeline, a implementação verificada contra o OpenAPI, e o consumidor contra o fornecedor quando há mais de um serviço. Prova: a execução verde no pipeline.
6. **Dados pessoais.** Se P11 os tem: retenção, apagamento e auditoria no esquema, e privilégios mínimos no utilizador da aplicação. Prova: o apagamento de um registo de teste e o registo de auditoria.
7. **Humanizar.** O código, o contrato, os dados de exemplo e os commits não podem deixar perceber que foram feitos por uma IA. Corre a mini skill `humanizar` (ou `node ../humanizar/scripts/humanizar.mjs <ficheiros tocados> --commits <n>`) e relê o que o verificador não apanha com as secções «Código» e «Commits, documentação e dados» de `../humanizar/marcas.md`. Corriges só com autorização, categoria a categoria. Prova: a saída final do verificador.

As credenciais da base de dados e os acessos a sistemas que já existem ficam no `.env.example` e em «O que ficou por preencher» do relatório; se o projeto vem da start-project-with-trust, também em «Por preencher» de `entrega.md`. O resto faz-se até ao fim.

## Relatório

- O inventário do que existia antes (contrato, esquema, migrações, testes) e o que mudou.
- O contrato (caminho do OpenAPI) e as decisões tomadas, com quem as tomou.
- O esquema e as migrações, cada uma com a prova de aplicar e reverter.
- Os testes de contrato e a execução no pipeline.
- A saída final do verificador da `humanizar`, com os achados que ficaram e porquê.
- O que ficou por preencher.
- As fontes que foste buscar, se a biblioteca não chegava.


## Documentação

Se a skill `documentacao` estiver instalada (existe `../documentacao/SKILL.md`), no fim de um trabalho com resultado escreve o relatório do processo, como diz o modo «processo» dela. Uma consulta sem alterações não leva relatório.

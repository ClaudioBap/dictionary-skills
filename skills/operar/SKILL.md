---
name: operar
description: Mini skill que deixa uma plataforma pronta para quem a vai operar sem saber como foi construída. Percorre a prontidão operacional item a item (monitorização dos quatro sinais, objetivos de serviço, runbooks, cópias de segurança 3-2-1 testadas, processo de incidentes, registo de alterações, sondas de saúde), cada um com prova, e escreve o documento de operação com as rotinas e as emergências da plataforma. Usar sozinha sobre uma plataforma que já existe, numa sessão lançada pela orchestrate-sessions, ou na Fase 5 de um projeto da start-project-with-trust. É uma sub skill, que faz uma parte do trabalho, sozinha ou chamada por uma skill mãe.
argument-hint: "Pasta do projeto ou URL da plataforma a preparar para operação"
metadata:
  estado: produção
  tipo: sub
  usa: [humanizar]
  impacto: { ia: 2, seguranca: 3, nuvem: 10, desenvolvimento: 2, web: 0 }
---

# Operar

O caminho do conhecimento obtém-se com `node ../orchestrate-sessions/scripts/conhecimento.mjs`; as referências `knowledge/...` são relativas a esse caminho.

O conhecimento está em `knowledge/`: `fiabilidade/`, `docker/`, `cicd/` e `estrutura/registo-de-alteracoes.md`. O ponto de partida é `fiabilidade/prontidao-operacional-e-passagem.md`, que lista o que tem de existir antes da passagem. Se `~/.start-project-with-trust/knowledge/` tiver uma entrada com o mesmo caminho, vale a pessoal: é a versão já atualizada.

## Regras

- Seguem-se as regras de `../orchestrate-sessions/regras.md`, incluindo a autonomia depois da decisão: o que só o utilizador pode dar (contas de alerta, destino das cópias, quem é chamado) fica «Por preencher», e o resto continua.
- Modelo e effort segundo `../orchestrate-sessions/modelo-e-effort.md`: inventariar o que existe é «Ler»; escrever runbooks e configurar monitorização é «Construir»; definir o processo de incidentes e os objetivos de serviço é «Rever e decidir com risco».
- «Está configurado» não é prova. A prova de uma cópia de segurança é um restauro feito; a de uma sonda é a resposta que devolve; a de um alerta é um disparo de teste.
- O documento de operação é para quem não construiu a plataforma: cada rotina diz o que fazer, passo a passo, sem exigir que a pessoa perceba o código.
- Publicar é uma rotina de um só pedido, feita de A a Z (o utilizador decidiu a 2026-11-22: «quando eu pedir isso deves fazer de A a Z»):
  - trazer o que há de novo;
  - correr as verificações do próprio repositório e corrigir o que falhar;
  - se outras sessões ou pessoas publicam no mesmo repositório, antes do push: rebase sobre a ponta atual, confirmar que não há CI a correr no branch de produção e avisá-las (o utilizador pediu este cuidado a 2026-11-25, com duas sessões a publicar ao mesmo tempo);
  - fazer commit do que está pronto e push;
  - acompanhar o CI e o deploy até ao fim.

  Só se pára numa falha que não se consegue resolver, e diz-se qual. Uma verificação obrigatória a falhar não se contorna com push direto nem com merge de administrador: corrige-se a causa no próprio pedido, ou pára-se aí (`cicd/pipeline-como-portao.md`). O runbook de publicar escreve-se assim, sem pontos de confirmação pelo caminho. Num portal de agentes, o botão manda este pedido a uma sessão já aberta com o repositório (`portais-de-agentes/caixa-de-perguntas-a-distancia.md`, «Publicar com um toque»).

## Âmbito

Sabe fazer, com base em `fiabilidade/`, `docker/`, `cicd/` e `estrutura/registo-de-alteracoes.md`:

- preparar uma plataforma para a passagem: monitorização dos quatro sinais, objetivos de serviço, sondas de saúde, cópias 3-2-1 com restauro, runbooks, processo de incidentes, registo de alterações e reversão;
- o documento de operação para quem não construiu a plataforma;
- a recuperação de desastre com RTO e RPO, quando o nível o pede;
- a observabilidade com Grafana, Prometheus, Loki e Tempo, e a de uma solução com LLM.

Não sabe fazer, e para onde vai:

- montar o pipeline, os contentores e o alojamento: `infra-deploy`;
- descobrir porque está lenta, ou medir o limite de carga: `performance-verifier`;
- auditar a segurança da plataforma: `seguranca`;
- mudar o esquema ou as migrações da base de dados: `backend-dados`;
- configurar uma ferramenta de alertas ou de escalas de serviço que a base não cobre: fora da base. Segue a secção «Quando falta conhecimento» de `../update-knowledge/SKILL.md`, com a documentação do fornecedor.

Pedidos que se confundem:

- «Operar» é muita coisa. Deixar a plataforma pronta para quem a vai operar, sim. Ficar de serviço a um incidente que está a acontecer agora, não: a skill escreve e ensaia o runbook, mas as decisões em produção são do utilizador, e o diagnóstico vai para a `performance-verifier` (lentidão) ou para a `seguranca` (suspeita de ataque).
- «Cópias de segurança»: o plano 3-2-1 e o restauro provado, sim. A retenção e o apagamento de dados pessoais no esquema são da `backend-dados`.
- «Publicar»: a rotina de publicar escrita como runbook, sim (regra acima). O pipeline que publica é da `infra-deploy`.

## 1. O que há para operar

Chamada por uma mãe, o briefing já traz a plataforma, quem a opera e o nível: passa ao passo 2. Sozinha, se o pedido não o diz, pergunta como diz `../orchestrate-sessions/regras.md` e pára quando tiver o que precisa (no máximo 5 perguntas):

1. **Que plataforma e onde corre:** um servidor ou máquina virtual; contentores com Docker Compose; Kubernetes; alojamento gerido, em que o fornecedor faz parte da operação.
2. **Quem a vai operar e com que conhecimento:** o próprio utilizador; uma equipa de suporte que não conhece o código; o cliente. A resposta decide a linguagem do `OPERACAO.md`.
3. **Que nível de prontidão**, do mais barato ao mais caro:
   - leve: sondas de saúde, uma cópia restaurada e um runbook curto (recomendado para quem opera sozinho);
   - completa: todos os itens do passo 4, cada um com prova (recomendado para passar a outra equipa ou a um cliente);
   - completa com recuperação de desastre: além disso, RTO e RPO definidos e um restauro completo ensaiado (`fiabilidade/recuperacao-de-desastre.md`).
4. **Que objetivos de serviço já existem** (P3 e P12 de `../orchestrate-sessions/PERGUNTAS.md`). Só se pergunta se o nível não for leve.

No nível leve, cada item que fica de fora leva «Não aplicável:» e, como razão, a escolha do utilizador. Se parte do pedido é de outra skill (ver «Âmbito»), diz qual e porquê: chamada por uma mãe, devolve-lhe essa parte; sozinha, recomenda a skill. Depois lança um subagente (`haiku`, `low`) para inventariar o que já está feito: sondas, dashboards, alertas, cópias, pipelines, documentação.

## 2. Ler só o que interessa

- Sempre: `fiabilidade/prontidao-operacional-e-passagem.md`, `fiabilidade/monitorizacao-quatro-sinais.md`, `fiabilidade/operacao-padronizada-e-runbooks.md`, `fiabilidade/incidentes-e-postmortem-sem-culpa.md`, `fiabilidade/copias-de-seguranca-3-2-1.md`, `estrutura/registo-de-alteracoes.md`.
- Objetivos de serviço e degradação: `fiabilidade/slo-sli-e-orcamento-de-erro.md`, `fiabilidade/degradacao-graciosa.md`, `fiabilidade/recuperacao-de-desastre.md`, `base-de-dados/backups-e-recuperacao.md`.
- Contentores e Kubernetes: `docker/sondas-de-saude.md`, `docker/kubernetes-saude-e-armazenamento.md`, `docker/kubernetes-escalonamento-e-atualizacoes.md`, `docker/volumes-e-persistencia.md`.
- Entrega e reversão: `cicd/rollback-e-recuperacao.md`, `cicd/observabilidade-do-deploy.md`, `cicd/estrategias-de-deploy.md`, `cicd/ferramentas-observabilidade.md`.
- Ferramentas de observabilidade: `infraestrutura/observabilidade-grafana-prometheus-loki-tempo.md`; com LLM, `ia/operacao/observabilidade-de-llm.md`.

## 3. Se a biblioteca não tem a resposta

Quando nenhuma entrada cobre o que é preciso (uma plataforma de alojamento com a sua própria forma de fazer cópias, uma ferramenta de alertas que a base não tem), segue «Quando falta conhecimento» em `../update-knowledge/SKILL.md` antes de responder. Fontes oficiais deste tema: a documentação do fornecedor ou da ferramenta.

## 4. Preparar, item a item

Para cada item de `fiabilidade/prontidao-operacional-e-passagem.md`, o critério de fim é a linha «Para uma skill» da entrada que o cobre, e a prova é o que qualquer pessoa pode repetir:

1. **Monitorização dos quatro sinais**: latência, tráfego, erros e saturação medidos por serviço, com um alerta por sinal. Cada tarefa que corre sozinha (sincronização, cópia, agendamento, hook) tem a hora do último sucesso e um alerta quando passa o tempo de duas corridas sem sucesso, porque os quatro sinais não dão por uma tarefa que parou (`fiabilidade/monitorizacao-quatro-sinais.md`). Prova: o painel, um alerta de teste disparado e a hora do último sucesso de cada tarefa.
2. **Sondas de saúde**: liveness, readiness e, se o arranque é lento, startup, em cada contentor. Prova: a resposta de cada sonda.
3. **Cópias de segurança 3-2-1**: três cópias, dois suportes, uma fora do local, com um restauro feito num ambiente de teste. Prova: o restauro e o tempo que demorou.
4. **Runbooks**: um por rotina (atualizar, reiniciar, rodar segredos, repor uma cópia) e um por emergência prevista (serviço em baixo, disco cheio, certificado expirado, base de dados inacessível), com passos, comandos e como saber que resultou. Numa plataforma que já existe, confere cada runbook com a plataforma de hoje (como se entra, que tokens há, que comandos correm), e deixa escrito que a alteração que muda uma rotina atualiza o runbook no mesmo commit (`fiabilidade/operacao-padronizada-e-runbooks.md`). Prova: um runbook seguido do início ao fim por alguém que não o escreveu, ou por ti numa sessão nova.
5. **Processo de incidentes**: quem é avisado, por onde, quem decide, e o postmortem sem culpa depois. Prova: o documento e um exercício de mesa.
6. **Registo de alterações e reversão**: cada versão com data e alterações, e a reversão testada. Prova: o `CHANGELOG` e uma reversão feita em teste.
7. **Objetivo de serviço**: o que é «estar bem» em cada serviço (SLO), decidido pelo utilizador, e o indicador que o mede (SLI). Prova: o SLO escrito no `OPERACAO.md` e o valor medido no painel.

O que depender de decisões ou acessos do utilizador (quem recebe os alertas, onde ficam as cópias, o fornecedor de alertas) fica em «Por preencher»; o resto faz-se até ao fim.

## 5. Documento de operação e entrega

1. Escreve `OPERACAO.md` no sítio onde o projeto guarda a documentação (ou na raiz, se não houver), com as secções: como saber que está vivo (sondas, painel), rotinas (um runbook por rotina), emergências (um runbook por emergência), cópias e restauro, incidentes (quem, por onde), atualizar e reverter, registo de alterações, e o que falta preencher. Linguagem para quem não construiu a plataforma.
2. Regista a prontidão com um item por linha: o que ficou feito e a prova, ou «Não aplicável:» e a razão.
   - Se o projeto vem da start-project-with-trust (existe `arranque/<projeto>/entrega.md`), preenche a secção «Operação» desse ficheiro, no formato de `../start-project-with-trust/modelos/entrega.md`, corre `node ../start-project-with-trust/scripts/verificar.mjs <pasta do arranque> --entrega` e mostra a saída.
   - Fora disso, escreve a tabela no fim do `OPERACAO.md`, numa secção «Prontidão» (`| Item | O que ficou feito | Prova |`). Nenhuma linha fica sem prova ou sem razão. Numa sessão lançada pela orchestrate-sessions, a saída da sessão aponta para esta tabela.

**Humanizar.** O `OPERACAO.md` e os runbooks são lidos por quem não construiu a plataforma e não podem deixar perceber que foram feitos por uma IA. Corre a mini skill `humanizar` (ou `node ../humanizar/scripts/humanizar.mjs <ficheiros tocados> --commits <n>`) e relê o que o verificador não apanha com as secções «Código» e «Commits, documentação e dados» de `../humanizar/marcas.md`. Corriges só com autorização, categoria a categoria, e a saída final entra no relatório.

## Relatório

- Os itens da operação, cada um com a prova ou a razão de não se aplicar.
- Onde ficou o `OPERACAO.md` e a lista de runbooks.
- O que ficou por preencher e quem o tem de dar.
- A saída do verificador da entrega, se o projeto vem da start-project-with-trust; fora disso, a tabela «Prontidão» do `OPERACAO.md`.
- As fontes que foste buscar, se a biblioteca não chegava.


## Documentação

Se a skill `documentacao` estiver instalada (existe `../documentacao/SKILL.md`), no fim de um trabalho com resultado escreve o relatório do processo, como diz o modo «processo» dela. Uma consulta sem alterações não leva relatório.

---
name: operar
description: Mini skill que deixa uma plataforma pronta para quem a vai operar sem saber como foi construída. Preenche a secção «Operação» da entrega item a item (monitorização dos quatro sinais, runbooks, cópias de segurança 3-2-1 testadas, processo de incidentes, registo de alterações, sondas de saúde), cada um com prova, e escreve o documento de operação com as rotinas e as emergências da plataforma. Usar na Fase 5 da start-project-with-trust, numa sessão lançada pela orchestrate-sessions, ou sozinha sobre uma plataforma que já existe.
argument-hint: "Pasta do projeto ou URL da plataforma a preparar para operação"
---

# Operar

O caminho do conhecimento obtém-se com `node ../start-project-with-trust/scripts/conhecimento.mjs`; as referências `knowledge/...` são relativas a esse caminho.

O conhecimento está em `knowledge/`: `fiabilidade/`, `docker/`, `cicd/` e `estrutura/registo-de-alteracoes.md`. O ponto de partida é `fiabilidade/prontidao-operacional-e-passagem.md`, que lista o que tem de existir antes da passagem. Se `~/.start-project-with-trust/knowledge/` tiver uma entrada com o mesmo caminho, vale a pessoal: é a versão já atualizada.

## Regras

- Seguem-se as regras da secção «Regras em todas as fases» de `../start-project-with-trust/SKILL.md`, incluindo a autonomia depois da decisão: o que só o utilizador pode dar (contas de alerta, destino das cópias, quem é chamado) fica «Por preencher», e o resto continua.
- Modelo e effort segundo `../orchestrate-sessions/modelo-e-effort.md`: inventariar o que existe é «Ler»; escrever runbooks e configurar monitorização é «Construir»; definir o processo de incidentes e os objetivos de serviço é «Rever e decidir com risco».
- «Está configurado» não é prova. A prova de uma cópia de segurança é um restauro feito; a de uma sonda é a resposta que devolve; a de um alerta é um disparo de teste.
- O documento de operação é para quem não construiu a plataforma: cada rotina diz o que fazer, passo a passo, sem exigir que a pessoa perceba o código.

## 1. O que há para operar

Se o pedido já o diz, passa ao passo 2. Se não, pergunta no formato da Fase 1 da `start-project-with-trust`: que plataforma é (serviços, bases de dados, filas, contentores), onde corre, quem a vai operar e com que conhecimento, e que objetivos de serviço já existem (P3 e P12 do projeto). Lança um subagente (`haiku`, `low`) para inventariar o que já está feito: sondas, dashboards, alertas, cópias, pipelines, documentação.

## 2. Ler só o que interessa

- Sempre: `fiabilidade/prontidao-operacional-e-passagem.md`, `fiabilidade/monitorizacao-quatro-sinais.md`, `fiabilidade/operacao-padronizada-e-runbooks.md`, `fiabilidade/incidentes-e-postmortem-sem-culpa.md`, `fiabilidade/copias-de-seguranca-3-2-1.md`, `estrutura/registo-de-alteracoes.md`.
- Objetivos de serviço e degradação: `fiabilidade/slo-sli-e-orcamento-de-erro.md`, `fiabilidade/degradacao-graciosa.md`, `fiabilidade/recuperacao-de-desastre.md`, `base-de-dados/backups-e-recuperacao.md`.
- Contentores e Kubernetes: `docker/sondas-de-saude.md`, `docker/kubernetes-saude-e-armazenamento.md`, `docker/kubernetes-escalonamento-e-atualizacoes.md`, `docker/volumes-e-persistencia.md`.
- Entrega e reversão: `cicd/rollback-e-recuperacao.md`, `cicd/observabilidade-do-deploy.md`, `cicd/estrategias-de-deploy.md`, `cicd/ferramentas-observabilidade.md`.
- Ferramentas de observabilidade: `infraestrutura/observabilidade-grafana-prometheus-loki-tempo.md`; com LLM, `ia/operacao/observabilidade-de-llm.md`.

## 3. Se a biblioteca não tem a resposta

Quando nenhuma entrada cobre o que é preciso (uma plataforma de alojamento com a sua própria forma de fazer cópias, uma ferramenta de alertas que a base não tem):

1. Escolhe as fontes oficiais primárias certas (a documentação do fornecedor ou da ferramenta) e lê-as. Não contornes bloqueios: se uma fonte recusar o acesso automático, pede ao utilizador o conteúdo ou regista-a como não lida.
2. Dá a cada facto a confiança segundo os critérios de `../update-knowledge/SKILL.md` (`alta`, `media`, `baixa`). Um facto `baixa` não serve de base.
3. Regista o que encontraste antes de responder: numa cópia git do repositório, propõe a entrada nova na secção certa, no formato do passo 3 de `../update-knowledge/SKILL.md`, e só a escreves com a aprovação do utilizador; fora disso, no conhecimento pessoal (`~/.start-project-with-trust/knowledge/<secção>/<slug>.md`, fonte em `FONTES.md` pessoal, linha no `CHANGELOG.md` pessoal). Se o que encontraste substitui o que uma entrada diz, segue a regra de edição da `update-knowledge`: a entrada passa a dizer o que vale hoje e o texto anterior fica no «Histórico» dela.
4. Diz ao utilizador que fontes leste e o que registaste.

## 4. Preparar, item a item

Para cada item de `fiabilidade/prontidao-operacional-e-passagem.md`, o critério de fim é a linha «Para uma skill» da entrada que o cobre, e a prova é o que qualquer pessoa pode repetir:

1. **Monitorização dos quatro sinais**: latência, tráfego, erros e saturação medidos por serviço, com um alerta por sinal. Prova: o painel e um alerta de teste disparado.
2. **Sondas de saúde**: liveness, readiness e, se o arranque é lento, startup, em cada contentor. Prova: a resposta de cada sonda.
3. **Cópias de segurança 3-2-1**: três cópias, dois suportes, uma fora do local, com um restauro feito num ambiente de teste. Prova: o restauro e o tempo que demorou.
4. **Runbooks**: um por rotina (atualizar, reiniciar, rodar segredos, repor uma cópia) e um por emergência prevista (serviço em baixo, disco cheio, certificado expirado, base de dados inacessível), com passos, comandos e como saber que resultou. Prova: um runbook seguido do início ao fim por alguém que não o escreveu, ou por ti numa sessão nova.
5. **Processo de incidentes**: quem é avisado, por onde, quem decide, e o postmortem sem culpa depois. Prova: o documento e um exercício de mesa.
6. **Registo de alterações e reversão**: cada versão com data e alterações, e a reversão testada. Prova: o `CHANGELOG` e uma reversão feita em teste.

O que depender de decisões ou acessos do utilizador (quem recebe os alertas, onde ficam as cópias, o fornecedor de alertas) fica em «Por preencher»; o resto faz-se até ao fim.

## 5. Documento de operação e entrega

1. Escreve `OPERACAO.md` no sítio onde o projeto guarda a documentação (ou na raiz, se não houver), com as secções: como saber que está vivo (sondas, painel), rotinas (um runbook por rotina), emergências (um runbook por emergência), cópias e restauro, incidentes (quem, por onde), atualizar e reverter, registo de alterações, e o que falta preencher. Linguagem para quem não construiu a plataforma.
2. Preenche a secção «Operação» de `entrega.md`, no formato de `../start-project-with-trust/modelos/entrega.md`: um item por linha, com o que ficou feito e a prova, ou «Não aplicável:» e a razão. Corre `node ../start-project-with-trust/scripts/verificar.mjs <pasta do arranque> --entrega` e mostra a saída.

## Relatório

- Os itens da operação, cada um com a prova ou a razão de não se aplicar.
- Onde ficou o `OPERACAO.md` e a lista de runbooks.
- O que ficou por preencher e quem o tem de dar.
- A saída do verificador da entrega.
- As fontes que foste buscar, se a biblioteca não chegava.

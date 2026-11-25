# Orquestração de <trabalho>

- **Estado:** Questionário <!-- Questionário | Tarefas | Sessões | Execução | Concluído -->
- **Última atualização:** <data>
- **Objetivo:** _por definir_
- **Critério de sucesso:** _por definir_ <!-- verificável: comando, teste, URL ou ficheiro -->

## Perguntas

<!-- O questionário (SKILL.md, «Questionário»): as P1 a P16 de PERGUNTAS.md com os mesmos números, as de seguimento (S1, S2, com a de origem entre parênteses na pergunta) e as das skills que vão entrar (com o nome da skill no ID). Estado: aberta | respondida | assumida (pressuposto aceite pelo utilizador, escrito na resposta). -->

| ID | Pergunta | Estado | Resposta |
|----|----------|--------|----------|

## Tarefas

<!-- Tipo, nível (simples | profissional | topo), modelo e effort segundo modelo-e-effort.md. «Quem executa»: sessão <n> ou subagente da sessão <n>. -->

| # | Tarefa | Tipo | Nível | Parte | Mini skill | Depende de | Sessão | Quem executa | Modelo | Effort | Critério de fim | Estado |
|---|--------|------|-------|-------|------------|------------|--------|--------------|--------|--------|-----------------|--------|
<!-- Parte: núcleo | específico | — (um caso só). -->

## Plano de delegação

<!-- Sai do questionário e dos passos 1 a 4 do SKILL.md; o utilizador valida-o inteiro no fim do passo 4. Parte 1 em «Skills no trabalho»; partes 2 a 4 em «Decisões» (autonomia, sessões do VS Code, agentes por sessão). -->

### Skills no trabalho

<!-- Uma linha por skill, escolhida como diz «Que skill faz cada tarefa» do SKILL.md. Quando entra: a fase ou o sinal que a chama. Critério de saída: o que tem de estar provado para a skill sair. -->

| Skill | Quando entra | O que faz | O que entrega | Critério de saída |
|-------|--------------|-----------|---------------|-------------------|

### Decisões

- **Fable:** _por definir_ <!-- sim | não (usa opus com o effort um nível acima) -->
- **Autonomia:** _por definir_ <!-- um dos quatro níveis de modo-continuo.md; em «Só executar o aprovado», uma dúvida pára a sua tarefa e vai logo ao utilizador; nos outros, as perguntas juntam-se para o fim e o trabalho continua -->
- **Sessões do VS Code:** _por definir_ <!-- quantas trabalham ao mesmo tempo além da sessão 0; o detalhe de cada uma fica em «Sessões» -->
- **Agentes por sessão:** _por definir_ <!-- sem agentes | só no orquestrador | em cada sessão | em todas; quantos em cada sessão, com o modelo e o effort de cada um, na coluna «Subagentes» de «Sessões»; correm em lotes de 3 a 4 -->
- **Modo contínuo:** _por definir_ <!-- não | sim: onde corre, quota e nome da tarefa agendada (ver modo-continuo.md); o estado que a retoma lê fica em estado.json -->

## Pausas e retomas

<!-- Só em modo contínuo. Uma linha por pausa: quando, porquê (limite de 5 h, de 7 dias, quota escolhida), hora de reposição e o que ficou a meio. -->

| Pausado em | Porquê | Retoma às | Retomado em | O que ficou a meio |
|------------|--------|-----------|-------------|--------------------|

## Sessões

| # | Tipo | Tarefas | Mini skill | Modelo | Effort | Subagentes | Em paralelo com | Como abrir | Critério de fim | Custo (/usage) |
|---|------|---------|------------|--------|--------|------------|-----------------|------------|-----------------|----------------|
| 0 | orquestrador | Dividir, preparar briefings, integrar | — | _por definir_ | _por definir_ | _por definir_ | — | É a sessão que corre esta skill | Todas as tarefas com prova | |

## Subidas de nível

| Tarefa | De | Para | Porquê |
|--------|----|------|--------|

## Por preencher

<!-- Uma linha por valor que só o utilizador pode dar (segredos, identificadores, URLs do cliente), sem valores reais. -->

| Valor | Para quê | Onde se obtém | Formato de exemplo |
|-------|----------|---------------|--------------------|

## Publicação

<!-- Com o trabalho exposto na internet: a saída completa de `node scripts/verificar-publicacao.mjs https://<domínio> --admin <caminho>`, que tem de acabar em «✓ Publicação verificada». Sem exposição: «Não aplicável:» e a razão. -->

## Validação

- [ ] Plano de delegação validado pelo utilizador em _por definir_
- [ ] Resultado aceite pelo utilizador em _por definir_

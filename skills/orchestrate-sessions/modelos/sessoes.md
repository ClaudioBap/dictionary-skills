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

| # | Tarefa | Tipo | Nível | Parte | Mini skill | Depende de | Sessão | Quem executa | Modelo | Effort | Par | Critério de fim | Estado |
|---|--------|------|-------|-------|------------|------------|--------|--------------|--------|--------|-----|-----------------|--------|
<!-- Parte: núcleo | específico | — (um caso só). Par: — | a forma, o modelo e a subscrição de quem verifica (parte 3 do plano de delegação). -->

## Plano de delegação

<!-- Sai do questionário e dos passos 1 a 4 do SKILL.md; o utilizador valida-o inteiro no fim do passo 4. Parte 1 em «Skills no trabalho»; partes 2 a 5 em «Decisões» (autonomia, verificação por outro modelo, sessões do VS Code, agentes por sessão). -->

### Skills no trabalho

<!-- Uma linha por skill, escolhida como diz «Que skill faz cada tarefa» do SKILL.md. Quando entra: a fase ou o sinal que a chama. Critério de saída: o que tem de estar provado para a skill sair. -->

| Skill | Quando entra | O que faz | O que entrega | Critério de saída |
|-------|--------------|-----------|---------------|-------------------|

### Decisões

Registar o nível de autonomia, as ações que autoriza e quando pede decisão. Guardar a origem do inventário, o fornecedor, a conta, o tipo de acesso, o modelo e os papéis. Indicar quem executa o plano aprovado, a revisão e, se publicado, o ID do plano na Oficina 3D.

- **Inventário confirmado:** _por definir_ <!-- Ligações, com máquina, ou local. Regista as combinações escolhidas e as indisponíveis. -->
- **Papéis por modelo:** _por definir_ <!-- Planeamento, execução, verificação ou ficar de fora. -->
- **Abertura de sessões:** _por definir_ <!-- Manual, delegada ou mista. Em modo misto, guarda a escolha por sessão. -->
- **Fable (se proposto):** _por definir_
- **Autonomia:** _por definir_ <!-- um dos quatro níveis de modo-continuo.md; em «Só executar o aprovado», uma dúvida pára a sua tarefa e vai logo ao utilizador; nos outros, as perguntas juntam-se para o fim e o trabalho continua -->
- **Verificação por outro modelo:** _por definir_ <!-- sem par, e a razão | a forma (consultar a pedido, debater no planeamento, verificar até aprovar), os tipos de tarefa, o modelo e a subscrição de quem verifica e as voltas no máximo; só se pergunta com mais de uma subscrição ou mais de um modelo aceite. --pode-escrever só com a razão aqui -->
- **Sessões do VS Code:** _por definir_ <!-- quantas trabalham ao mesmo tempo além da sessão 0; o detalhe de cada uma fica em «Sessões» -->
- **Agentes por sessão:** _por definir_ <!-- sem agentes | só no orquestrador | em cada sessão | em todas; quantos em cada sessão, com o modelo e o effort de cada um, na coluna «Subagentes» de «Sessões»; correm em lotes de 3 a 4 -->
- **Modo contínuo:** _por definir_ <!-- não | sim: onde corre, quota e nome da tarefa agendada (ver modo-continuo.md), e, com mais de uma subscrição, as que o trabalho pode usar; o estado que a retoma lê fica em estado.json -->

## Pausas e retomas

<!-- Em modo contínuo, e quando uma subscrição acaba numa sessão ou num par. Uma linha por pausa: quando, porquê (limite de 5 h, de 7 dias, quota escolhida, a subscrição <id> sem quota), hora de reposição e o que ficou a meio ou se fez sem verificação. -->

| Pausado em | Porquê | Retoma às | Retomado em | O que ficou a meio |
|------------|--------|-----------|-------------|--------------------|

## Sessões

<!-- Subscrição: principal, ou o id em contas-ia.json. Como abrir, noutra subscrição: no PowerShell `$env:CLAUDE_CONFIG_DIR="<pasta>"; claude --model <modelo> --effort <nível>`, noutros terminais `CLAUDE_CONFIG_DIR=<pasta> claude --model <modelo> --effort <nível>`. -->

| # | Tipo | Tarefas | Mini skill | Fornecedor | Conta e tipo de acesso | Modelo | Effort | Subagentes | Em paralelo com | Modo | Como abrir | Critério de fim | Custo (/usage) |
|---|------|---------|------------|------------|------------------------|--------|--------|------------|-----------------|------|------------|-----------------|----------------|
| 0 | orquestrador | Dividir, preparar briefings, integrar | — | _por definir_ | _por definir_ | _por definir_ | _por definir_ | _por definir_ | — | — | É a sessão que corre esta skill | Todas as tarefas com prova | |

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

- [ ] Plano de delegação, revisão _por definir_, aprovado pelo utilizador em _por definir_
- [ ] Resultado aceite pelo utilizador em _por definir_

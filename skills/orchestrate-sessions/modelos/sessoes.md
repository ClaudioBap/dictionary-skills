# Orquestração — <trabalho>

- **Estado:** Tarefas <!-- Tarefas | Sessões | Execução | Concluído -->
- **Última atualização:** <data>
- **Objetivo:** _por definir_
- **Critério de sucesso:** _por definir_ <!-- verificável: comando, teste, URL ou ficheiro -->

## Tarefas

<!-- Tipo, nível (simples | profissional | topo), modelo e effort segundo modelo-e-effort.md. «Quem executa»: sessão <n> ou subagente da sessão <n>. -->

| # | Tarefa | Tipo | Nível | Parte | Mini skill | Depende de | Sessão | Quem executa | Modelo | Effort | Critério de fim | Estado |
|---|--------|------|-------|-------|------------|------------|--------|--------------|--------|--------|-----------------|--------|
<!-- Parte: núcleo | específico | — (um caso só). -->

## Decisões

- **Fable:** _por definir_ <!-- sim | não (usa opus com o effort um nível acima) -->
- **Sessões em paralelo:** _por definir_
- **Agentes:** _por definir_ <!-- sem agentes | só no orquestrador | em cada sessão | em todas -->
- **Modo contínuo:** _por definir_ <!-- não | sim: nível de autonomia, onde corre, quota e nome da tarefa agendada (ver modo-continuo.md); o estado que a retoma lê fica em estado.json -->

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

## Validação

- [ ] Divisão validada pelo utilizador em _por definir_
- [ ] Resultado aceite pelo utilizador em _por definir_

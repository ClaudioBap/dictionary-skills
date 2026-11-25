# Exemplos: orchestrate-sessions

## O que faz

É por onde se começa um trabalho. Primeiro faz um questionário, uma pergunta de cada vez, até não haver dúvidas sobre o que se quer, e tira dele um plano de delegação: que skills entram e quando, o nível de autonomia, quantas sessões do VS Code se abrem e quantos agentes corre cada uma. Depois divide o trabalho em tarefas e distribui-as por essas sessões, cada uma com a mini skill certa. A sessão que a corre é o orquestrador: dá a cada tarefa o modelo e o effort mais baratos que a fazem (`modelo-e-effort.md`), escreve os briefings e recolhe as saídas com prova. O estado fica em `orquestracao/<trabalho>/sessoes.md`, por isso o trabalho pára e retoma onde ficou.

## Quando usar

- Começar um trabalho, sobretudo com um pedido vago ou que toca mais de uma skill: o questionário percebe o que se quer, e o plano de delegação diz que skills entram.
- Um trabalho grande que se divide em partes independentes.
- Quando o trabalho deve continuar sozinho depois de um limite de uso (modo contínuo).
- Para saber quanto custou cada sessão e que tarefas pediram um modelo acima do previsto.

## Quando não usar

- Um pedido claro que cabe numa só skill: chama-se essa skill, que faz o seu pequeno questionário se faltar alguma coisa.
- O arranque de um projeto de cliente com goal-loop e os verificadores do plano e da entrega: a `start-project-with-trust`, que está em testes e se instala pelo nome.

## Exemplo: a fase 1 do site de notícias

**Pedido:** «/orchestrate-sessions fase-1. Quero construir a fase 1 do meu site de notícias com a orquestradora e as mini skills. O pedido está em requisitos.md.»

**O que a skill faz:**

1. No início, regista em «Decisões» o acesso ao Fable e o modo contínuo, com a autonomia máxima e a quota a 100%.
2. Divide o trabalho em 13 tarefas com critério de fim verificável, cada uma com o tipo, o nível, o modelo, o effort e a mini skill (`infra-deploy` no esqueleto, `backend-dados` na API, `design-ux` na interface, `seguranca` na revisão), e pede validação.
3. Agrupa as tarefas pelas dependências e pergunta quantas sessões em paralelo: o Cláudio escolheu 3, uma para a sincronização, outra para a API e a administração, outra para a interface.
4. Escreve os briefings das sessões (`S1.md` a `S4.md`) e os dos subagentes do orquestrador, e lança estes com o modelo e o effort de cada tarefa.
5. Recolhe cada saída e repete a prova (os testes, a corrida local) antes de dar a tarefa por feita; o que falta passa a tarefa nova, como a T9b com as correções da revisão de segurança.

**Resultado:** Foi assim que se construiu a fase 1 do site de notícias, em `orquestracao/fase-1/`. As pausas por limite de uso e as retomas ficaram escritas no mesmo ficheiro.

## Exemplo: mudar de rumo a meio

**Pedido:** «Eu gostava de ter um site de notícias que fosse visualmente bonito como se alguém estivesse mesmo a paginar um jornal e aparecesse notícias.»

**O que a skill faz:**

1. Interrompe a tarefa em curso sem perder os commits que já tinha, e abre `orquestracao/reformulacao/`, que continua a da fase 1 com as mesmas decisões de início.
2. Escreve o ADR 0010, a especificação, as regras comuns e cinco briefings, de R1 (base de dados e API) a R5 (conhecimento e primeira edição).
3. Distribui pelas cinco sessões que o Cláudio abriu, cada uma com as suas pastas e portas.
4. Quando o limite de 5 horas parou todas as sessões ao fim de cerca de 15 minutos, escreve a pausa e a hora de retoma em `sessoes.md` e retoma o trabalho depois da reposição.

**Resultado:** É a orquestração que está a fazer o jornal e a Redação do site de notícias. Depois dessa pausa, a construção passou para subagentes `sonnet` e o `fable` ficou só no desenho.

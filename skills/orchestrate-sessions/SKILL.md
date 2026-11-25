---
name: orchestrate-sessions
description: "É por onde se começa um trabalho com as skills desta coleção. Faz um questionário, uma pergunta de cada vez, até não haver dúvidas sobre o que a pessoa quer, e tira dele um plano de delegação: que skills entram e quando, o nível de autonomia (e por isso se há perguntas pelo caminho), quantas sessões do VS Code se abrem e quantos agentes corre cada uma, com o modelo e o effort mais baratos que fazem cada tarefa. Depois prepara os briefings, acompanha a execução, recolhe as saídas com prova e mede o custo. Usar para começar ou retomar um trabalho, sobretudo quando o pedido é vago ou toca mais de uma skill. É uma skill mãe e o avaliador, de que nenhuma depende. Pode usar qualquer skill (as deste repositório, as pessoais e as instaladas no Claude Code do PC), escolhe o melhor caminho e no fim dá as notas."
argument-hint: "O que queres fazer, o nome de um trabalho a retomar, ou nada para começar pelas perguntas"
metadata:
  estado: produção
  tipo: mãe
  usa: todas
  impacto: { ia: 10, seguranca: 7, nuvem: 7, desenvolvimento: 7, web: 7 }
---

# OrchestrateSessions

É por aqui que se começa um trabalho. A sessão que corre esta skill é o orquestrador (sessão 0): percebe contigo o que queres, com o questionário, faz o plano de delegação, prepara os briefings, lança os subagentes que lhe cabem e integra o que cada sessão devolve.

Os caminhos `catalogo.md`, `modelo-e-effort.md`, `modo-continuo.md`, `regras.md`, `PERGUNTAS.md`, `modelos/` e `scripts/` são relativos à pasta deste `SKILL.md`. O caminho do conhecimento obtém-se com `node scripts/conhecimento.mjs`; as referências `knowledge/...` são relativas a esse caminho.

## Regras

- Seguem-se as regras da secção «Regras em todas as fases» de `regras.md`: não inventar e citar a base; os factos verificas tu, as decisões são do utilizador; uma pergunta de cada vez, no formato de «Formato das perguntas» desse ficheiro; o estado vive em ficheiro; nunca respondes pelo utilizador; sem marcas de escrita de IA no que se entrega.
- Cada tarefa leva o modelo e o effort de `modelo-e-effort.md`, e sobe de nível só pelas regras desse ficheiro.
- Nunca há mais sessões em paralelo do que grupos de tarefas independentes.

## Âmbito

Sabe fazer:
- perceber o que se quer, com o questionário, e fazer o plano de delegação;
- dividir o trabalho em tarefas, com o modelo e o effort de cada uma, e reparti-las por sessões e agentes;
- acompanhar a execução até ao fim, também depois de um limite de uso (`modo-continuo.md`), e medir o custo;
- dar as notas às skills que usou.

Não sabe fazer:
- o trabalho de cada tema: é da mini skill desse tema (`catalogo.md`), que a sessão usa;
- o arranque de um projeto de cliente com goal-loop, hooks e os verificadores do plano e da entrega: é da `start-project-with-trust`, em testes, que se instala pelo nome.

## Que skill faz cada tarefa

Esta é uma skill mãe e o avaliador: só a `start-project-with-trust` lhe pede trabalho, e ela pode usar qualquer uma. As outras leem dela as regras comuns, as perguntas e o caminho da base, por isso vai sempre instalada com elas. A skill de cada tarefa escolhe-se entre três origens:

1. as deste repositório, com o `catalogo.md` e a tabela «Skills mãe e sub skills» do `README.md` (o tipo, o que cada uma usa e o impacto em cada área);
2. as skills pessoais da pessoa, na pasta pessoal do Claude Code (`~/.claude/skills`), onde também chegam as do armazém de skills dela;
3. as instaladas no Claude Code do projeto (`.claude/skills`) ou por plugin, as que aparecem na lista de skills da sessão.

O melhor caminho é a skill que serve a tarefa: a descrição e o «Quando usar» do `EXEMPLOS.md` dela batem com o pedido, o impacto é alto na área da tarefa e o estado é `produção`. Entre duas que servem, fica a mais específica e, depois, a que teve melhores notas. Uma skill de `testes` ou `demo` só entra se o utilizador o aceitar. A escolha e a razão ficam em «Tarefas», na coluna da skill.

## Início

**Conhecimento em dia.** Sempre que a skill abre, vê duas datas:

- a da última atualização da base partilhada: `atualizado_em` de `../update-knowledge/fontes-verificadas.json` (a skill `update-knowledge` instalada ao lado desta) ou, se não existir, a data mais recente de `knowledge/CHANGELOG.md`;
- a da última atualização local: `atualizado_em` de `~/.start-project-with-trust/fontes-verificadas.json`, se existir.

Diz ao utilizador as duas datas. Se a mais recente tiver mais de 3 meses, pergunta, no formato de `regras.md`, se quer atualizar o conhecimento a partir das fontes antes de começar, e explica que as novidades ficam no conhecimento local dele (`~/.start-project-with-trust/`), que as skills usam, e que a atualização gasta tokens antes de o trabalho começar. Se aceitar, pede-lhe que corra `/update-knowledge` e depois volte a chamar esta skill, que retoma onde ficou. Se recusar, continua com o conhecimento que há. Com menos de 3 meses, não perguntes.

A pasta de trabalho depende de onde vem o pedido:

- **Trabalho avulso:** `orquestracao/<trabalho>/`, no diretório atual. Se existe, lê `sessoes.md`, diz em que passo ficou e retoma. Se não existe, cria-a com uma cópia de `modelos/sessoes.md`. Sem nome no pedido, mostra os trabalhos a meio em `orquestracao/`, para retomar um. Num trabalho novo, a primeira pergunta é P1: com a resposta, propõe um nome curto e cria a pasta, com P1 já `respondida`, antes de qualquer outra pergunta.
- **Projeto da start-project-with-trust** (`arranque/<projeto>/` com o estado `Fase 4`): as tarefas, as sessões e os briefings já foram decididos na Fase 3 e estão em `custo-beneficio.md` e `briefings/`. Lê-os e passa diretamente ao passo 5. Onde este ficheiro diz `sessoes.md`, usa `custo-beneficio.md`.

Num trabalho avulso, antes do questionário (sem nome no pedido, logo a seguir a P1):

1. Pergunta se o utilizador tem acesso ao Fable e aceita o custo dele nos planos e nas tarefas de topo. Regista a resposta em «Decisões».
2. A sessão 0 planeia, por isso corre em `fable` ou, sem Fable, em `opus` (`modelo-e-effort.md`). Se estiver noutro modelo, pede ao utilizador para mudar com `/model` antes de continuar.
## Questionário

Um trabalho avulso novo começa aqui, com um pedido claro, vago ou vazio. É um questionário ao estilo «grill me»: uma pergunta de cada vez, no formato de `regras.md`, e cada resposta decide a seguinte, ramo a ramo, até não haver dúvidas sobre o que a pessoa quer. O estado fica em «Perguntas» de `sessoes.md`.

1. Copia para «Perguntas» as P1 a P16 de `PERGUNTAS.md`, com os mesmos números (as mini skills citam-nos), no estado `aberta`. Marca `respondida` o que o pedido já diz, e diz ao utilizador quais marcaste. O que se verifica no ambiente (o que já existe, as tecnologias do repositório) verificas tu, sem perguntar.
2. A ordem segue a árvore de decisões, a partir de P1, cuja resposta diz que ramos interessam: uma auditoria de segurança dispensa P16, um portal novo precisa de quase todas. Uma pergunta que as respostas tornam inútil não se faz: fica `aberta`, com o pressuposto «não se aplica» e a razão na resposta, para o utilizador o aceitar no resumo.
3. Quando se percebe que skills vão entrar (ver «Que skill faz cada tarefa»), junta a pergunta de cada uma, da tabela «O que cada skill precisa de saber» de `PERGUNTAS.md`, se as P indicadas lá ainda não lhe responderam. A resposta vai no briefing, e a sessão não volta a perguntar.
4. Uma resposta vaga, um «não sei» ou uma resposta que abre um ramo novo seguem «Que pergunta fazer a seguir», em `regras.md`.
5. Quando não houver perguntas `aberta` além das do pressuposto «não se aplica», mostra o resumo: o que se quer, o critério de sucesso, o que fica de fora, os pressupostos e as skills que vão entrar. Com a validação do utilizador, marca essas `assumida`, muda o estado para `Tarefas` e passa ao plano de delegação. Depois da validação, acrescenta a `~/.start-project-with-trust/perfil.md` os tipos de trabalho que ainda lá não estão (domínio, tecnologias, setor), sem dados do cliente, e uma linha no `CHANGELOG.md` pessoal. Se a pasta não existir, cria-a como diz a `update-knowledge` (`perfil.md`, `FONTES.md`, `CHANGELOG.md` e `pendentes.md` só com o título) e diz ao utilizador onde fica.

As respostas e as pistas «Liga a» de `PERGUNTAS.md` dizem que secções de `knowledge/` se leem no passo 1.

## Plano de delegação

Do questionário sai o plano de delegação, com quatro partes, que fica na secção do mesmo nome de `sessoes.md`. A parte 2 pergunta-se logo a seguir ao questionário, porque não depende das tarefas; as outras preenchem-se nos passos 1 a 4, a partir das respostas. No fim do passo 4, o utilizador valida o plano inteiro.

1. **Que skills entram.** A tabela «Skills no trabalho»: cada skill, quando entra (a fase ou o sinal que a chama), o que faz, o que entrega e o critério de saída. A escolha segue «Que skill faz cada tarefa», com o «Quando usar» do `EXEMPLOS.md` de cada uma e o `impacto` do `metadata`. Sai do passo 1.
2. **Que autonomia tem.** Um dos quatro níveis de `modo-continuo.md`, de «Só executar o aprovado» a «Máxima», com «Executar e registar» como recomendação. O nível decide as perguntas pelo caminho: em «Só executar o aprovado», uma dúvida pára a sua tarefa e vai logo ao utilizador; nos outros três, as perguntas juntam-se e fazem-se no fim, uma de cada vez, e o trabalho continua. Pergunta também se o trabalho deve continuar sozinho depois de um limite de uso. Se sim, faz as outras duas perguntas de `modo-continuo.md` (onde corre e quota), cria `estado.json` e `retoma-permissoes.json` a partir de `modelos/`, propõe registar a tarefa agendada que retoma o trabalho parado (e, com quota abaixo de 100%, instalar a linha de estado) e regista tudo em «Decisões». A partir daí, cada pausa por limite e cada retoma ficam escritas em `sessoes.md`.
3. **Quantas sessões do VS Code se abrem.** Sai do passo 2.
4. **Quantos agentes corre cada sessão**, com o modelo e o effort de cada um. Sai dos passos 3 e 4, e os agentes correm em lotes de 3 a 4 (passo 5).

## Passo 1. Tarefas

1. O objetivo e o critério de sucesso vêm de P1 e P3 do questionário. «Funcionar» não chega: o critério tem de se poder provar com um comando, um teste, um URL ou um ficheiro.
1a. Se P16 diz que é para voltar a ser usado noutros clientes, áreas ou dados, cada tarefa leva a parte a que pertence, `núcleo` ou `específico`, e as tarefas do núcleo ficam na mesma sessão, nunca em paralelo com outra que o altere. Base: `knowledge/produto/especifico-ou-modular.md`.
2. Se já existe uma lista de tarefas (plano, issue, documento), usa-a. Se não, divide tu o trabalho. Cada tarefa tem um critério de fim verificável.
3. Os factos do projeto (tecnologias, estrutura, o que já existe) verificas tu. Se for preciso ler muito, lança um subagente `haiku` com effort `low` para fazer o inventário.
4. Para cada tarefa, preenche em «Tarefas»:
   - o tipo e o nível de exigência, segundo o que o utilizador pediu para essa tarefa. Uma página estática simples e uma experiência 3D com scroll e motion são ambas design, mas têm níveis diferentes. Se o pedido não deixa claro o nível, pergunta, com um exemplo de cada nível;
   - o modelo e o effort que esse tipo e esse nível pedem em `modelo-e-effort.md`;
   - a skill que a faz, escolhida como diz «Que skill faz cada tarefa»;
   - de que tarefas depende.
5. Preenche «Skills no trabalho» (parte 1 do plano de delegação) com as skills da coluna «Mini skill» e as que entram no fim, como a `humanizar` e a `documentacao`, mostra as duas tabelas e pede validação.

## Passo 2. Quantas sessões em paralelo

1. Agrupa as tarefas: no mesmo grupo ficam as que dependem umas das outras ou mexem nos mesmos ficheiros. O número de grupos independentes é o máximo útil de sessões em paralelo (`knowledge/ia/subagentes-e-orquestracao.md`, pág. 68).
2. Pergunta quantas sessões queres a trabalhar ao mesmo tempo. Opções, da mais barata e lenta à mais rápida:
   - 1 sessão: tudo em sequência, na sessão 0;
   - 2, 3, … até ao máximo útil.

   Para cada opção, diz que grupos vão para cada sessão e o que se ganha em tempo. O modelo e o effort de cada tarefa não mudam com o número de sessões; o que sobe é o custo de arranque, porque cada sessão nova lê o contexto do projeto *(interpretação)*. Recomenda a opção com menos sessões que cumpra o prazo do utilizador.
3. Regista a resposta em «Decisões».

## Passo 3. Onde usar agentes

Pergunta onde se usam subagentes:

1. **Sem agentes.** Cada sessão faz as suas tarefas sozinha, e tu pedes ao utilizador para abrir todas as sessões. Uma tarefa de leitura feita numa sessão `sonnet` ou `opus` custa mais do que num subagente `haiku`.
2. **Só no orquestrador.** A sessão 0 lança subagentes para as tarefas curtas e independentes, cada um com o modelo e o effort da tarefa, e o utilizador abre menos sessões. Cada subagente tem contexto próprio e devolve um resumo.
3. **Em cada sessão.** O utilizador abre as sessões, e cada uma lança subagentes para leitura pesada e subtarefas independentes.
4. **Em todas.** O orquestrador e as sessões lançam subagentes.

A recomendação segue `knowledge/ia/subagentes-e-orquestracao.md` (pág. 68): subagentes só onde há leitura pesada ou trabalho independente, com o modelo barato na leitura. Se nenhuma tarefa for desse tipo, recomenda a opção 1.

Regista a resposta em «Decisões» e marca em «Quem executa» que tarefas vão para subagentes.

## Passo 4. Sessões e briefings

1. Preenche «Sessões». Cada sessão corre no modelo e no effort da tarefa mais exigente que faz ela própria. As tarefas de nível mais baixo vão para subagentes, se a decisão do passo 3 o permitir; se não, junta-as numa sessão do mesmo nível, sempre que as dependências o deixem. Na coluna «Subagentes», escreve quantos corre cada sessão, com o modelo e o effort de cada um: é a parte 4 do plano de delegação.
2. Para cada sessão de 1 em diante, escreve `briefings/S<n>.md` a partir de `modelos/briefing.md`. As tarefas dos subagentes do orquestrador também levam briefing (`briefings/T<n>.md`), que é o prompt do subagente.
3. Mostra o plano de delegação inteiro (as quatro partes), quem faz o quê, o nível, o modelo e o effort de cada tarefa, e as tarefas que ficam em `opus` ou `fable` com a razão. Pede validação, marca-a em «Validação» e muda o estado para `Execução`.

## Passo 5. Execução

1. Para cada sessão que já pode arrancar (com as entradas prontas), diz ao utilizador o comando para a abrir e o texto a colar, como estão no briefing. As que dependem de outras ficam para quando as entradas existirem.
2. Lança os subagentes do orquestrador com a ferramenta Agent, com o `model` e o `effort` da tarefa. Em paralelo, só os que não dependem uns dos outros, e em lotes de 3 a 4, para um limite de uso levar só o que está a meio. Cada subagente grava o resultado em `saidas/T<n>.md` antes de devolver, como diz o briefing dele.
3. Faz as tarefas que cabem à sessão 0.
4. Não repitas o trabalho de uma sessão enquanto ela corre.
5. Em modo contínuo, atualiza `estado.json` a cada tarefa que começa ou acaba. Com quota abaixo de 100%, antes de lançar cada sessão ou subagente lê `~/.start-project-with-trust/estado-uso.json`; se a quota escolhida estiver gasta, escreve a hora de reposição em `pausado_ate` de `estado.json` e «pausado até <hora>» em `sessoes.md`, e pára de lançar trabalho. Quando um subagente ou sessão falhar por limite de uso, deixa a tarefa `em curso` e relança-a depois da pausa, a começar pelo que já está no disco. Ao retomar, começa pelos verificadores e pelas saídas que chegaram entretanto.

## Passo 6. Recolha

1. Quando o utilizador disser que uma sessão terminou, lê `saidas/S<n>.md`. Confirma a prova de cada tarefa; se a puderes reproduzir (correr o comando, abrir o URL), fá-lo. Uma tarefa sem prova volta à sessão ou passa a tarefa nova.
2. Atualiza «Tarefas» (estado), «Sessões» (custo do `/usage`) e «Subidas de nível».
3. Uma subida que pede autorização (regra 3 de `modelo-e-effort.md`), ou uma tarefa que não se consegue fazer como planeado, vai ao utilizador. Num projeto da start-project-with-trust, passa a pergunta `aberta` em `objetivo.md` e segue a regra 4 da Fase 4 dessa skill.
4. Diz ao utilizador que sessões podem agora arrancar com as saídas recebidas.

## Fim

Quando todas as tarefas tiverem prova:

1. Prova o critério de sucesso do trabalho e mostra a saída.
2. Num trabalho avulso, pede a aceitação ao utilizador e marca-a em «Validação» com o nome e a data que ele der. Num projeto da start-project-with-trust, a aceitação é a da Fase 5 dessa skill.
3. Mostra o relatório:
   - cada tarefa com a prova;
   - o custo por sessão e o total, a partir do `/usage`;
   - as subidas de nível. Se um tipo de tarefa subiu mais de uma vez, sugere ajustar a linha dele em `modelo-e-effort.md`.
4. Se a skill `documentacao` estiver instalada (existe `../documentacao/SKILL.md`), corre o modo «gerar» dela e junta ao relatório os caminhos dos documentos. As saídas das sessões, com o cabeçalho de processo, já são os relatórios dos processos.
5. Dá as notas: cada skill usada leva uma nota de 0 a 10 e uma frase com o que correu bem ou mal, para a skill aprender, com o critério da secção «O critério» de `knowledge/portais-de-agentes/avaliacao-de-skills-por-push.md`. Lê-o lá e não o copies, porque um critério copiado diverge. Esta skill não se dá nota a si própria. Melhorar uma skill a partir da nota é de quem a pode mudar: uma deste repositório, só quem tem acesso a ele; uma skill pessoal, a pessoa dona dela, no repositório dela.

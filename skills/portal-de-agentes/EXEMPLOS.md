# Exemplos: portal-de-agentes

## O que faz

Decide e desenha um portal onde uma equipa acompanha o trabalho dos seus agentes de IA. Faz as perguntas uma a uma, propõe um mundo para cada público a partir do que o produto é, desenha a maqueta antes do código, divide o trabalho em fases e devolve o plano à skill mãe que a chamou, que reparte a execução pelas mini skills. Também recria o portal de origem com as escolhas dele, e aí só pergunta o nome, as contas, o domínio e os segredos. O portal que sai daqui lê o repositório das skills e mostra qualquer skill nova sem mudar código.

## Quando usar

- Ver, a partir do telemóvel, o que as sessões do Claude Code de uma equipa estão a fazer e responder-lhes.
- Dar a uma equipa um sítio com o trabalho de cada pessoa e de cada repositório.
- Criar outro mundo para um portal que já existe.
- Recriar o portal de origem com as escolhas dele, mudando só o nome, as contas, o domínio e os segredos.
- Quando a `orchestrate-sessions` ou a `start-project-with-trust` têm um trabalho que pede um portal: decide, desenha a maqueta e devolve-lhes o plano.

## Quando não usar

- Só um painel com o estado das sessões, sem mundo: uma lista chega, e a `design-ux` fá-la.
- Só a cena 3D de um portal que já tem os eventos: `design-3d-motion`.
- Só proteger um portal que já existe: `seguranca`.
- Um portal de clientes, uma intranet ou um site de conteúdos, sem agentes a acompanhar: `design-ux` e `backend-dados`.

## Exemplo: um portal para a equipa

**Pedido:** «Quero ver no telemóvel o que as minhas sessões estão a fazer e responder-lhes quando param a perguntar alguma coisa. A equipa também vai usar.»

**O que a skill faz:**

1. Pergunta primeiro o que a pessoa quer ver e porquê. A resposta («quem está à espera de mim») pede só uma lista de estados e uma caixa de perguntas, e a skill propõe isso como opção mais barata. A pessoa quer também ver a equipa a trabalhar, num mundo.
2. Segue `perguntas-antes-de-construir.md`: contas pelo fornecedor de acesso, um espaço por pessoa, um projeto por repositório git, perguntas e instruções privadas, notas às skills em cada push, sem agente local por agora.
3. Propõe três mundos para o público da equipa (uma lista com estados, um escritório em open space, uma escola em que o projeto é o professor e as skills são alunos). A pessoa escolhe a escola.
4. A `design-3d-motion` faz a maqueta com cada estado, a 390 px e em ecrã largo, em claro e em escuro. A pessoa aprova.
5. O plano sai em cinco fases. A primeira só fecha quando uma sessão real aparece na lista e muda de estado.

**Resultado:** As decisões registadas, a maqueta aprovada e um plano em cinco fases, cada uma com a sua prova. O projeto de onde vem a secção `portais-de-agentes/` chegou à escola por decisões como estas; o agente local entrou numa fase posterior, depois de lidas as regras de licença.

## Exemplo: outro mundo para o mesmo portal

**Pedido:** «A nossa equipa trabalha em manutenção de aviões. Queremos o mesmo portal, mas que pareça um hangar.»

**O que a skill faz:**

1. Lê `decisoes.md` e vê que as contas, os projetos e a Caixa já estão decididos; só o mundo muda.
2. Aplica `um-mundo-por-publico.md`: o que o produto tem (projetos, skills, sessões, perguntas) passa a aviões em manutenção, especialistas e o chefe de turno. Põe de parte o que só traz estética (pistas, torre de controlo).
3. Confirma que nenhuma regra do portal entra nas skills: o aspeto de cada especialista calcula-se a partir do nome da skill e ajusta-se na administração.
4. Pede a maqueta à `design-3d-motion` e só depois devolve a fase à mãe que a chamou.

**Resultado:** O hangar substitui a escola sem mexer nos eventos, nas contas nem na Caixa, porque a cena lê do mesmo modelo.

---
name: portal-de-agentes
description: "Mini skill para construir um portal onde uma equipa vê e acompanha o trabalho dos seus agentes de IA (sessões do Claude Code, skills, subagentes): um mundo próprio para cada público, um espaço por pessoa e um projeto por repositório, perguntas das sessões respondidas à distância e no telemóvel, notas às skills em cada push e, se se quiser, um agente local que conduz o Claude Code a partir do portal. Conduz as decisões com knowledge/portais-de-agentes/, uma de cada vez, desenha a maqueta antes de construir, distribui a execução pelas mini skills e prova com capturas. O portal lê o repositório das skills e adapta-se a qualquer conjunto delas. Usar quando alguém quer criar o seu portal de agentes, ou um mundo novo para o mesmo fim. É uma skill mãe, que reparte a construção pelas sub skills através da orchestrate-sessions."
argument-hint: "O que queres ver dos teus agentes, ou nada para começar pelas perguntas"
metadata:
  estado: produção
  tipo: mãe
  usa: [orchestrate-sessions, design-3d-motion, design-ux, backend-dados, seguranca, infra-deploy, ia-aplicada, operar, humanizar, documentacao]
  impacto: { ia: 10, seguranca: 5, nuvem: 5, desenvolvimento: 7, web: 7 }
---

# PortalDeAgentes

O caminho do conhecimento obtém-se com `node ../start-project-with-trust/scripts/conhecimento.mjs`; as referências `knowledge/...` são relativas a esse caminho.

O conhecimento está em `knowledge/portais-de-agentes/`, começando pelo `README.md` da secção. O mundo 3D movido por eventos está em `knowledge/3d-webgl/mundo-3d-movido-por-agentes.md`. Esta skill decide e conduz; a construção é das mini skills de cada tema.

## Regras

- Seguem-se as regras da secção «Regras em todas as fases» de `../start-project-with-trust/SKILL.md`: cada facto cita o ficheiro da base ou o URL da fonte; os factos verificas tu, as decisões são do utilizador; uma pergunta de cada vez, no formato da Fase 1; sem marcas de escrita de IA no que se entrega; autonomia depois da decisão, com contas, domínios e segredos em «Por preencher».
- **Nível e modelo** (`../orchestrate-sessions/modelo-e-effort.md`): as perguntas, os mundos, a maqueta e o plano são «Planear». O mundo, quando o dono escolhe o nível topo, é 3D e movimento ligados ao tema, e isso não se volta a discutir nas fases seguintes.
- **Dependência num só sentido.** O portal lê o repositório das skills, que fica em configuração, e descobre sozinho as skills e as categorias do conhecimento. Nada do portal se escreve nas skills: nem o nome a mostrar, nem o aspeto, nem regras do portal. Uma skill que o portal não conhece recebe um aspeto calculado, que a administração pode ajustar (`papeis-e-aspeto-dos-agentes.md`).
- **Telemóvel primeiro.** Cada entrega prova-se primeiro a 390 e 360 px, com toque. O que só se faz no PC (instalar o agente) aparece no telemóvel como instrução curta.
- **Os eventos não levam conteúdo.** Perguntas, permissões e instruções são só de quem as fez (`eventos-e-origem-das-skills.md`, `espaco-por-pessoa-e-projeto-por-repositorio.md`).
- **Licença.** Se houver agente local, as regras de `agente-local-licenca-e-emparelhamento.md` são critérios de sucesso, não recomendações.

## 1. Perguntas

O estado vive em `orquestracao/<nome do portal>/decisoes.md`, na pasta que a `orchestrate-sessions` vai usar a seguir. Se existe, lê-o e retoma.

1. A primeira pergunta é sempre o que a pessoa quer ver dos agentes e porquê. Aplica `portal-de-agentes-quando-e-como.md`: se uma lista com estados responde, propõe a lista primeiro, como opção mais barata.
2. Segue `perguntas-antes-de-construir.md`, pela ordem dela: cada decisão com opções da mais barata à mais cara, a base de cada uma e a escolha do projeto de origem como exemplo. Marca como respondidas as que o pedido já cobre e pergunta só o que falta.
3. Regista cada resposta em `decisoes.md` antes da pergunta seguinte.

## 2. Mundos e maqueta

1. Para cada público, um mundo (`um-mundo-por-publico.md`): lista o que o produto tem (o que se guarda, quem trabalha, quem pede), escolhe um lugar conhecido onde essas relações existem e põe de parte o que traz a estética de outro produto. Propõe duas ou três metáforas, com a lista ou a tabela como a mais barata. O dono escolhe.
2. Os papéis e o aspeto (`papeis-e-aspeto-dos-agentes.md`): quem é sessão, skill, avaliador e ajudante, e como se lê cada papel sem depender só da cor.
3. A maqueta antes do código, pela `design-3d-motion`: as salas, os bonecos e cada estado (a trabalhar, à espera de resposta, parado, em falha), com capturas a 390 px e em ecrã largo, em claro e em escuro. O dono aprova a maqueta antes de se construir.

## 3. Plano por fases

A ordem que resultou está em `portal-de-agentes-quando-e-como.md`. Cada fase fecha com prova e é aceite pelo dono a ver as capturas:

1. Eventos das sessões e o modelo sem 3D, com a lista acessível. Prova: uma sessão real aparece e muda de estado.
2. A vista do mundo, a ler desse modelo.
3. Contas, um espaço por pessoa e os projetos por repositório.
4. A Caixa de perguntas, com avisos no telemóvel.
5. As notas às skills em cada push (`avaliacao-de-skills-por-push.md`).
6. O agente local, só se o dono o escolheu.

A execução é da `orchestrate-sessions`, com estas mini skills: `design-3d-motion` (mundo), `design-ux` (ecrãs e telemóvel), `backend-dados` (servidor, eventos, base de dados), `seguranca` (contas, privacidade, emparelhamento, cofre), `infra-deploy` (publicação em HTTPS), `ia-aplicada` (hooks, Claude Code, licença), `operar` (runbook) e `humanizar` no fim.

## 4. O que tem de ficar provado

- Uma skill nova no repositório das skills aparece no portal, com aspeto próprio, sem mexer no código nem publicar. O mesmo para uma categoria nova do conhecimento.
- Um evento capturado mostra que não leva conteúdo.
- Cada estado de um agente vê-se na cena e na lista em texto, também sem WebGL e com movimento reduzido.
- No telemóvel, a 390 e 360 px, os fluxos fazem-se do princípio ao fim com toque. As capturas de telemóvel vêm primeiro no relatório.
- Uma pergunta respondida no telemóvel chega à sessão, e a primeira resposta ganha.
- Um push gera o pedido de notas, e o avaliador não se avalia.
- Com agente local: nenhum caminho do código lê credenciais do Claude, o agente verifica a assinatura de cada pedido e recusa pastas fora da lista.
- Reconstruir a interface nunca deixa o ecrã em branco, e o conteúdo ocupa a largura toda.
- A saída final do verificador da `humanizar`.

## Relatório

- As decisões, com quem as tomou.
- Os mundos escolhidos, com a maqueta aprovada.
- Cada fase com a prova, as capturas de telemóvel primeiro.
- O que ficou por preencher (contas, domínio, tokens), uma linha por valor, sem valores reais.
- As fontes que foste buscar, se a biblioteca não chegava.

## Documentação

Se a skill `documentacao` estiver instalada (existe `../documentacao/SKILL.md`), no fim de cada fase escreve o relatório do processo, como diz o modo «processo» dela.

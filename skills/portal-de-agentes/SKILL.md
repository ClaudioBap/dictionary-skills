---
name: portal-de-agentes
description: "Mini skill para decidir e desenhar um portal onde uma equipa vê e acompanha o trabalho dos seus agentes de IA (sessões do Claude Code, skills, subagentes): um mundo próprio para cada público, um espaço por pessoa e um projeto por repositório, perguntas das sessões respondidas à distância e no telemóvel, notas às skills em cada push e, se se quiser, um agente local que conduz o Claude Code a partir do portal. Conduz as decisões com knowledge/portais-de-agentes/, uma de cada vez, ou recria o portal de origem e só pergunta o nome, as contas, o domínio e os segredos; desenha a maqueta antes do código e devolve o plano por fases a quem a chamou. O portal lê o repositório das skills e adapta-se a qualquer conjunto delas. Usar quando alguém quer o seu portal de agentes, recriar o de origem ou um mundo novo para o mesmo fim, ou quando a orchestrate-sessions ou a start-project-with-trust têm um trabalho que pede um portal. É uma sub skill, que faz uma parte do trabalho, sozinha ou chamada por uma skill mãe."
argument-hint: "O que queres ver dos teus agentes, «recriar» para o portal de origem, ou nada para começar pelas perguntas"
metadata:
  estado: produção
  tipo: sub
  usa: [design-3d-motion, design-ux, backend-dados, seguranca, infra-deploy, ia-aplicada, operar, humanizar, documentacao]
  impacto: { ia: 10, seguranca: 5, nuvem: 5, desenvolvimento: 7, web: 7 }
---

# PortalDeAgentes

O caminho do conhecimento obtém-se com `node ../orchestrate-sessions/scripts/conhecimento.mjs`; as referências `knowledge/...` são relativas a esse caminho.

O conhecimento está em `knowledge/portais-de-agentes/`, começando pelo `README.md` da secção. O mundo 3D movido por eventos está em `knowledge/3d-webgl/mundo-3d-movido-por-agentes.md`. Esta skill decide, desenha a maqueta e devolve o plano por fases a quem a chamou; a construção é da mãe, que a reparte pelas mini skills de cada tema.

## Âmbito

Sabe, com `knowledge/portais-de-agentes/` e `knowledge/3d-webgl/mundo-3d-movido-por-agentes.md`:
- dizer se um portal compensa ou se chega uma lista, um aviso ou o Remote Control (`portal-de-agentes-quando-e-como.md`);
- conduzir as onze decisões do dono, ou recriar o portal de origem com as escolhas dele (`perguntas-antes-de-construir.md`);
- escolher o mundo de cada público e os papéis dos agentes (`um-mundo-por-publico.md`, `papeis-e-aspeto-dos-agentes.md`) e pedir a maqueta à `design-3d-motion`;
- fazer o plano por fases, com a prova de cada uma e os critérios de eventos sem conteúdo, perguntas à distância, notas por push e agente local.

Não faz, e diz para onde vai:
- construir o portal: o plano volta à mãe que a chamou; chamada sozinha, recomenda a `orchestrate-sessions`;
- só a cena 3D de um portal que já tem os eventos: `design-3d-motion`;
- só uma lista de estados ou um painel, sem mundo: `design-ux`;
- auditar ou proteger um portal que já existe: `seguranca`;
- publicar: `infra-deploy`; medir velocidade ou custo: `performance-verifier`;
- acompanhar agentes que não correm no Claude Code: fora da base, que só cobre os hooks do Claude Code. Vai às fontes oficiais do fornecedor e regista pelo procedimento da `update-knowledge` antes de decidir;
- dizer se um uso concreto das credenciais de subscrição é permitido: a decisão 9 de `perguntas-antes-de-construir.md` manda perguntar à Anthropic, e a skill não decide no lugar dela.

Pedidos que se confundem:
- «portal» para acompanhar as sessões, as skills e os subagentes de uma equipa, sim; portal de clientes, intranet ou site de conteúdos, não: é da `design-ux` e da `backend-dados`, repartido por uma mãe;
- «monitorizar agentes» no sentido de ver quem trabalha e quem espera, e responder-lhes, sim; métricas de um agente de IA em produção (custo por pedido, latência, avaliações), não: `ia-aplicada` e `performance-verifier`.

O que é de outra skill encaminha-se pelo padrão de `../orchestrate-sessions/regras.md`.

## Regras

- Seguem-se as regras de `../orchestrate-sessions/regras.md`: cada facto cita o ficheiro da base ou o URL da fonte; os factos verificas tu, as decisões são do utilizador; uma pergunta de cada vez, no formato dessas regras; sem marcas de escrita de IA no que se entrega; autonomia depois da decisão, com contas, domínios e segredos em «Por preencher».
- **Nível e modelo** (`../orchestrate-sessions/modelo-e-effort.md`): as perguntas, os mundos, a maqueta e o plano são «Planear». O mundo, quando o dono escolhe o nível topo, é 3D e movimento ligados ao tema, e isso não se volta a discutir nas fases seguintes.
- **Dependência num só sentido.** O portal lê o repositório das skills, que fica em configuração, e descobre sozinho as skills e as categorias do conhecimento. Nada do portal se escreve nas skills: nem o nome a mostrar, nem o aspeto, nem regras do portal. Uma skill que o portal não conhece recebe um aspeto calculado, que a administração pode ajustar (`papeis-e-aspeto-dos-agentes.md`).
- **Telemóvel primeiro.** Cada entrega prova-se primeiro a 390 e 360 px, com toque. O que só se faz no PC (instalar o agente) aparece no telemóvel como instrução curta.
- **Os eventos não levam conteúdo.** Perguntas, permissões e instruções são só de quem as fez (`eventos-e-origem-das-skills.md`, `espaco-por-pessoa-e-projeto-por-repositorio.md`).
- **Licença.** Se houver agente local, as regras de `agente-local-licenca-e-emparelhamento.md` são critérios de sucesso, não recomendações.

## 1. Perguntas

O estado vive em `decisoes.md`, na pasta de trabalho da mãe que te chamou (`orquestracao/<trabalho>/` ou `arranque/<projeto>/`); chamada sozinha, em `orquestracao/<nome do portal>/`. Se existe, lê-o e retoma.

1. **O que a pessoa quer.** Se o pedido já diz o objeto, o objetivo e o nível, passa ao ponto seguinte. Se não, pergunta o que falta, uma coisa de cada vez e no máximo cinco perguntas, no formato de `../orchestrate-sessions/regras.md`, e pára quando tens as três:
   - o objeto e o modo, sempre em primeiro, com as opções da mais barata à mais cara: uma lista com estados e avisos, sem portal; recriar o portal de origem com as escolhas dele; um portal novo, decisão a decisão; um mundo novo para um portal que já existe. Aplica `portal-de-agentes-quando-e-como.md`: se a lista responde, é ela a recomendada;
   - o objetivo: o que a pessoa quer ver dos agentes e porquê (quem está à espera dela, o trabalho da equipa, mostrar o trabalho para fora);
   - o nível, da tabela com estados ao 3D ligado ao tema («topo»), que responde à decisão 5 de `perguntas-antes-de-construir.md`; no modo recriar, vem do projeto de origem.
   O que for de outra skill encaminha-se como diz «Âmbito».
2. **Recriar o portal de origem.** Cada decisão de `perguntas-antes-de-construir.md` vem preenchida com a linha «No projeto de origem» dela. Mostra-as numa só tabela, com a data `verificado_em` da entrada, e pergunta só o que é da pessoa: o nome do portal, as contas (o fornecedor de acesso e quem entra), o domínio e os segredos, que ficam em «Por preencher». Uma escolha que a pessoa queira mudar passa a ser perguntada como no ponto 3. Na secção 2, a metáfora e os papéis já vêm do projeto de origem: só se faz e aprova a maqueta.
3. **Portal novo ou mundo novo.** Segue `perguntas-antes-de-construir.md`, pela ordem dela: cada decisão com opções da mais barata à mais cara, a base de cada uma e a escolha do projeto de origem como exemplo. Marca como respondidas as que o pedido já cobre e pergunta só o que falta.
4. Regista cada resposta em `decisoes.md` antes da pergunta seguinte.

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

O plano é o que esta skill entrega. Devolve-o a quem a chamou com as decisões, a maqueta aprovada e, em cada fase, a mini skill que a faz: `design-3d-motion` (mundo), `design-ux` (ecrãs e telemóvel), `backend-dados` (servidor, eventos, base de dados), `seguranca` (contas, privacidade, emparelhamento, cofre), `infra-deploy` (publicação em HTTPS), `ia-aplicada` (hooks, Claude Code, licença), `operar` (runbook) e `humanizar` no fim. É a mãe que reparte a construção e lança as sessões. Chamada sozinha, a skill pára aqui e recomenda a `orchestrate-sessions` para executar o plano.

## 4. O que tem de ficar provado

Estes critérios vão no plano devolvido. A mãe só dá uma fase por fechada quando o critério dela tem prova. Esta skill prova já a maqueta (passo 2).

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
- O plano por fases, cada uma com a prova que a fecha e a mini skill que a faz.
- O que ficou por preencher (contas, domínio, tokens), uma linha por valor, sem valores reais.
- As fontes que foste buscar, se a biblioteca não chegava.

## Documentação

Se a skill `documentacao` estiver instalada (existe `../documentacao/SKILL.md`), no fim escreve o relatório do processo, como diz o modo «processo» dela.

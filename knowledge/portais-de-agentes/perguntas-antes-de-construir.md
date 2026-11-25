---
id: portais-de-agentes/perguntas-antes-de-construir
titulo: "Perguntas antes de construir um portal de agentes"
seccao: "Portais e mundos de agentes"
paginas: []
fonte: "https://code.claude.com/docs/en/hooks"
data_lancamento: null
confianca: media
verificado_em: 2026-11-25
editado_em: 2026-11-25
---

# Perguntas antes de construir um portal de agentes

**Resumo:** Onze decisões que só o dono pode tomar, pedidas uma a uma antes de qualquer código, cada uma com as opções da mais barata à mais cara e com a escolha do projeto de origem como exemplo; as respostas fixam o tamanho do portal, o que fica privado e o mundo de cada público.

## Conteúdo

Origem: as decisões tomadas, e algumas refeitas, nas quatro fases do projeto de origem *(experiência do projeto)*. O que se diz do Claude Code, do Cloudflare Access e da WCAG vem das fontes oficiais em baixo, lidas a 2026-11-18. A linha «No projeto de origem» de cada pergunta é um exemplo do que se escolheu ali, não uma recomendação.

### Como perguntar

- Uma pergunta de cada vez, com as opções da mais barata à mais cara, o que cada uma dá e o que custa, e a recomendada com a razão.
- Cada resposta fica numa tabela «Decisões tomadas» do plano; as que mudam a arquitetura ganham também um registo de decisão. Uma decisão tomada não se reabre num briefing nem numa skill. Só o dono a muda.
- O que o dono já disse noutro sítio (requisitos, conversa) não se pergunta outra vez: confirma-se numa linha.
- Perguntas de execução (nomes, valores, contas a criar) juntam-se para o fim e não param o trabalho.
- *(experiência do projeto)* Várias respostas mudaram depois de o dono ver o portal a correr: um só dono passou a equipa, a pasta passou a repositório, o privado passou a partilhado por repositório. Junta a cada pergunta «e daqui a um mês?» e desenha para que a opção seguinte não obrigue a refazer o resto.

### 1. Pessoas e contas

Quem entra, e como se sabe quem é quem?

| Opção | O que dá | O que custa |
|---|---|---|
| Só o dono, em local, sem login | Arranca já | Não sai do PC: nada de telemóvel nem de equipa |
| Só o dono, com o portal publicado atrás de um fornecedor de acesso | Telemóvel, sem código de login nosso | Uma conta no fornecedor e uma política com o email do dono |
| Equipa por lista de emails, um token por PC | Cada pessoa vê o seu | Por pessoa nova: o email na política e um token para o PC dela |
| Várias equipas ou clientes | Separação por inquilino | Outro produto ([Multi-inquilino](../produto/multi-inquilino.md)) |

O segundo fator também se decide aqui. No Cloudflare Access, a imposição do segundo fator pelo fornecedor de identidade só existe com Okta, Microsoft Entra ID, OIDC genérico e SAML 2.0 genérico. Com outro fornecedor, como o GitHub, o segundo fator fica a cargo da conta de cada pessoa, a não ser que se ligue o segundo fator do próprio Access.

No projeto de origem: começou só com o dono e passou a equipa. Entra-se pelo fornecedor de acesso com uma conta Google ou com o email e um código de uso único; o GitHub saiu da entrada porque pedia leitura das organizações. Entrar só autentica: quem entra pela primeira vez fica à espera de aprovação, e os papéis (utilizador e administrador) e a lista de bloqueados vivem na base do portal e gerem-se no ecrã das pessoas, sem tocar no fornecedor. Cada PC liga-se com um token que o próprio portal cria ao adicionar o PC, sem tokens de serviço do fornecedor *(experiência do projeto, 2026-11-25)*.

### 2. O que é um projeto

| Opção | O que dá | O que custa |
|---|---|---|
| A pasta onde a sessão abre | Nada a configurar | Pastas com o mesmo nome juntam-se; clones do mesmo repositório separam-se |
| O repositório git, pelo endereço do `origin` normalizado ou, sem ele, pelo primeiro commit | Clones, worktrees e subpastas caem no mesmo projeto | Sessões fora de repositórios git não aparecem |
| Um grupo criado no portal, com vários repositórios | Projetos feitos de mais de um repositório | Mais um conceito a gerir |

E ainda: o projeto aparece sozinho na primeira sessão, ou só quando a pessoa o adiciona?

No projeto de origem: o repositório git, adicionado à mão por cada pessoa ([Um espaço por pessoa, um projeto por repositório](espaco-por-pessoa-e-projeto-por-repositorio.md)). Mais tarde cada pessoa passou a poder ter vários espaços («Pessoal», «Empresa», um por cliente), para não misturar projetos.

### 3. O que é privado e o que se partilha

| Opção | O que dá | O que custa |
|---|---|---|
| Tudo privado por conta | Nada a explicar à equipa | Duas pessoas no mesmo repositório não se veem |
| Partilha por repositório: quem adicionou o mesmo repositório vê o trabalho do outro nele | Corresponde ao trabalho real | Consentimento implícito, que a equipa tem de conhecer antes de adicionar |
| Partilha por convite | Consentimento claro | Mais um fluxo e mais estados |
| Tudo visível à equipa | Simples | Mostra projetos que os outros não pediram para ver |

Duas perguntas vêm com esta. O administrador vê o trabalho de cada colega? Se sim, a equipa sabe antes de instalar os hooks. E quanto tempo fica cada coisa: eventos, perguntas, mensagens, notas ([Minimização e retenção](../privacidade/minimizacao-e-retencao.md))?

No projeto de origem: privado por conta com o administrador a ver todos; depois partilha por repositório, entre quem adicionou o mesmo repositório; e por fim um grupo por projeto, por convite: só quem aceita vê o projeto inteiro, e mexer pede privilégios do grupo (criar, alterar, apagar). Os projetos novos nascem por partilhar na vista comum, e cada PC escolhe o que manda ao portal (contas git, pedidos, atividade, tokens), tudo desligado por omissão. Perguntas, permissões, anexos e conversas com o Claude ficam sempre só de quem as fez. Eventos 7 dias, mensagens 24 horas, notas sem prazo *(experiência do projeto, 2026-11-25)*.

### 4. Quantos públicos

Quem vai olhar para isto, e o que vem cada um fazer?

| Opção | O que dá | O que custa |
|---|---|---|
| Um público: quem gere | Um só mundo para desenhar | Quem só quer acompanhar vê uma ferramenta |
| Dois: quem gere e quem acompanha o seu trabalho | Cada um vê o que precisa | Dois mundos |
| Três: mais um público anónimo, só de leitura | O trabalho mostra-se para fora | Um terceiro mundo, mais o cuidado com o que é público |

Cada público tem o seu mundo, e o de um não se estende a outro ([Escolher o mundo de cada público](um-mundo-por-publico.md)).

No projeto de origem: três. Um jornal público que se folheia, com as notícias do conhecimento; uma administração com aspeto de ferramenta, onde o conhecimento e as skills se veem por todos os que entram e só o administrador os muda; e uma cidade da equipa, onde cada pessoa acompanha as suas sessões e vê o que os colegas escolhem partilhar *(experiência do projeto, 2026-11-25)*.

### 5. Metáfora e nível

| Opção | O que dá | O que custa |
|---|---|---|
| Nenhuma: tabela com estados | Rápida, acessível, boa no telemóvel | Com muitos projetos, não se vê de relance quem espera por quem |
| 2D: ícones, planta, linha do tempo | Leve, um passo acima da tabela | Pouco efeito |
| 3D ligado ao tema | O dono vê o trabalho a acontecer | O mais caro de construir e de medir; a tabela fica como alternativa |

Se o dono escolher o nível «topo», o 3D e o movimento ficam decididos e não se reabrem. Depois pergunta-se qual metáfora, com duas ou três propostas e uma maqueta.

No projeto de origem: topo. Uma cidade 3D com um quarteirão por pessoa, um edifício por conta git, mais alto quanto mais projetos tem, e um andar por projeto; em cada andar, uma sala (de aula, escritório, oficina ou laboratório) onde os bonecos mostram as sessões e onde se entra a pé com um avatar. O conhecimento e as skills ficam num armazém da mesma cidade, com uma estante por categoria e as skills em plintos *(experiência do projeto, 2026-11-25)*.

### 6. Papéis

Que atores aparecem e que papel tem cada um?

| Opção | O que dá | O que custa |
|---|---|---|
| Só as sessões | Quem trabalha e quem espera | Não se vê que skills trabalham |
| Sessões e skills | Que skills cada projeto usa | Um boneco por skill |
| Sessões, skills, subagentes e um avaliador | O trabalho todo, com notas | Regras para cada papel e para quando há vários do mesmo |

Pergunta também quem é o principal quando há várias sessões no mesmo projeto.

No projeto de origem: cada sessão tem a sua sala e é o professor dela, e uma continuação que começa pouco depois de outra acabar fica com a sala dessa; as skills são alunos, o orquestrador é o avaliador, presente só na primeira sala, que nunca desaparece, e os subagentes são ajudantes ([Papéis e aspeto dos agentes na cena](papeis-e-aspeto-dos-agentes.md)) *(experiência do projeto, 2026-11-25)*.

### 7. Como se respondem as perguntas das sessões

| Opção | O que dá | O que custa |
|---|---|---|
| Não se respondem: só um aviso | Um hook `Notification` reencaminha o aviso; o hook não bloqueia nem muda a notificação | Responde-se ao PC |
| Remote Control | Responder pela aplicação Claude ou por claude.ai/code, sem código nosso | Plano com subscrição; transcrição nos servidores da Anthropic; fica fora do portal |
| Hook de permissão que devolve a resposta dada no portal | Perguntas e permissões respondidas no portal | Um hook que espera; prazos; quem pode responder |
| Conversa completa no portal, por um agente local | Trabalhar sem o PC à frente | Ver a pergunta 9 |

O hook `PermissionRequest` corre quando o Claude Code está para pedir permissão para uma ferramenta. Para responder a um `AskUserQuestion` por um hook, a decisão tem de levar `decision.updatedInput`. *(experiência do projeto)* Com o Claude Code 2.1.325, a pergunta ficou ao mesmo tempo no diálogo local e no portal, e valeu a primeira resposta, de qualquer dos lados.

Perguntas que vêm com esta: a pergunta tem prazo? Sem resposta, o que acontece? Quem pode responder?

No projeto de origem: começou com prazo de 10 minutos e passou a sem prazo, respondida de qualquer dos lados ([Responder às sessões à distância](caixa-de-perguntas-a-distancia.md)).

### 8. Notas às skills

| Opção | O que dá | O que custa |
|---|---|---|
| Sem notas | Nada a construir | Não se sabe que skill trabalha bem |
| Cálculo automático (testes, tempo, tamanho do diff) | Sem tokens | Não mede se a skill fez o que promete |
| A sessão dá nota a cada skill usada, num momento fixo como o push | Quem fez o trabalho sabe o que cada skill entregou | Tende a ser generosa consigo: precisa de teto sem prova |
| Um avaliador à parte, noutra sessão | Mais isento | Tokens e tempo por avaliação |

No projeto de origem: a sessão dá de 0 a 10 em cada push, com uma frase; sem prova o teto é 6; o orquestrador é o avaliador e não recebe nota. O cálculo automático foi posto de parte pelo dono ([Avaliar as skills em cada push](avaliacao-de-skills-por-push.md)).

### 9. Agente local e licença

O portal só mostra e responde, ou também lança e conduz sessões?

| Opção | O que dá | O que custa |
|---|---|---|
| Sem agente: só hooks, sessões abertas à mão | Simples, sem dúvida de licença | Não se lança trabalho a partir do portal |
| Remote Control | Oficial, sem código nosso | Fica fora do portal |
| Agente local que corre o `claude` oficial, sem modificações, com o login que cada pessoa fez no seu PC | Lançar e conduzir sessões a partir do portal, com a subscrição de cada um | Ler a política de autenticação; emparelhamento; cofre local |
| O mesmo agente com uma chave de API | Sem dúvida de licença | Paga-se por utilização |

O que a política da Anthropic diz: quem constrói produtos ou serviços sobre o Claude, incluindo com o Agent SDK, usa chaves de API. A Anthropic não deixa terceiros oferecer o login do claude.ai nas suas aplicações, nem encaminhar pedidos através das credenciais dos planos Free, Pro, Max ou Ultra em nome dos seus utilizadores, nem recolher, guardar ou intermediar essas credenciais. Isso não impede uma pessoa de entrar no binário do Claude Code, sem modificações, com a sua subscrição. Para dúvidas sobre um caso concreto, a página manda contactar a Anthropic.

No projeto de origem: agente local com a subscrição de cada pessoa, com quatro regras no código (binário sem modificações, corrido como subprocesso; nunca ler, guardar nem enviar credenciais do Claude; sem Agent SDK; `ANTHROPIC_API_KEY` tirada do ambiente das sessões). A leitura de «intermediar», para uma ferramenta interna da equipa, ficou por confirmar com a Anthropic ([Licença, emparelhamento e cofre do agente local](agente-local-licenca-e-emparelhamento.md)).

### 10. Telemóvel

| Opção | O que dá | O que custa |
|---|---|---|
| Só PC | Nada a adaptar | O dono preso ao PC |
| Telemóvel para ver e responder | Respostas fora de casa | Portal publicado com https e avisos ([Avisos Web Push com VAPID, sem corpo](../design/avisos-web-push-com-vapid.md)) |
| Telemóvel como ecrã principal: tudo o que o portal faz, faz-se no telemóvel | Trabalhar a partir do telemóvel | Cada ecrã desenhado primeiro a 390 px; provas com toque; prova num telemóvel real só depois de publicar |

Para os alvos de toque, a WCAG 2.2 pede pelo menos 24 por 24 px no nível AA (2.5.8) e 44 por 44 no nível AAA (2.5.5).

No projeto de origem: ecrã principal, com alvos de 44 px. O que só se faz no PC (instalar o agente, gerir credenciais) aparece no telemóvel como instrução curta.

### 11. Publicação

| Opção | O que dá | O que custa |
|---|---|---|
| Só local | Nada exposto | Sem telemóvel nem equipa |
| Alojamento gratuito atrás de um fornecedor de acesso, com os PCs a entrar por tokens de serviço | Telemóvel e equipa sem servidores próprios | Conta no fornecedor; limites do plano ([Limites e condições dos planos gratuitos](../publicacao/limites-e-condicoes-dos-planos-gratuitos.md)) |
| Domínio próprio e login da empresa | Marca e políticas da empresa | Custo e aprovações |

E quem publica: o dono, com um guia passo a passo, ou quem constrói, com autorização?

No projeto de origem: construído e provado em local, publicado pelo dono com um guia; a publicação subiu de fase por causa do telemóvel.

### Por reconfirmar na fonte

- O diálogo local e o hook `PermissionRequest` ao mesmo tempo, com a primeira resposta a valer: provado no projeto de origem com o Claude Code 2.1.325. Na referência de hooks lida a 2026-11-18 isto não está dito; a página só diz que, com `--permission-prompt-tool` ou `canUseTool`, os hooks correm ao lado do anfitrião e vale a primeira decisão.

**Para uma skill:** antes de qualquer código de um portal de agentes, faz as onze perguntas por esta ordem, uma de cada vez, com as opções da mais barata à mais cara e uma recomendada; regista cada resposta na tabela de decisões do plano e não decidas nenhuma em silêncio.

## Ver também

- [Quando compensa um portal de agentes e como se monta](portal-de-agentes-quando-e-como.md) (Portais e mundos de agentes)
- [Escolher o mundo de cada público](um-mundo-por-publico.md) (Portais e mundos de agentes)
- [Papéis e aspeto dos agentes na cena](papeis-e-aspeto-dos-agentes.md) (Portais e mundos de agentes)
- [Um espaço por pessoa, um projeto por repositório](espaco-por-pessoa-e-projeto-por-repositorio.md) (Portais e mundos de agentes)
- [Eventos das sessões e origem das skills](eventos-e-origem-das-skills.md) (Portais e mundos de agentes)
- [Responder às sessões à distância](caixa-de-perguntas-a-distancia.md) (Portais e mundos de agentes)
- [Avaliar as skills em cada push](avaliacao-de-skills-por-push.md) (Portais e mundos de agentes)
- [Licença, emparelhamento e cofre do agente local](agente-local-licenca-e-emparelhamento.md) (Portais e mundos de agentes)
- [Especificação antes do código](../estrutura/especificacao-antes-do-codigo.md) (Estrutura e documentação)
- [Decisões registadas (ADR)](../estrutura/decisoes-registadas-adr.md) (Estrutura e documentação)
- [Acesso restrito à área de administração](../publicacao/acesso-restrito-a-area-de-administracao.md) (Publicação e alojamento web)
- [MFA imposto pelo fornecedor de identidade, não pela aplicação](../seguranca/mfa-imposto-pelo-fornecedor-de-identidade.md) (Segurança)

## Fontes oficiais

*Lidas a 2026-11-18.*

- [Claude Code: referência de hooks](https://code.claude.com/docs/en/hooks): `Notification` para reencaminhar avisos, sem bloquear; `PermissionRequest` e `decision.updatedInput`, de que o `AskUserQuestion` precisa
- [Claude Code: Remote Control](https://code.claude.com/docs/en/remote-control): planos, chaves de API não aceites, computador ligado, transcrição nos servidores da Anthropic
- [Claude Code: legal e conformidade](https://code.claude.com/docs/en/legal-and-compliance): «Authentication and credential use», o que se pode fazer com credenciais de subscrição e com chaves de API
- [Cloudflare One: requisitos de MFA](https://developers.cloudflare.com/cloudflare-one/access-controls/policies/mfa-requirements/): fornecedores com imposição de MFA e o MFA independente do Access
- [Cloudflare One: GitHub como fornecedor de identidade](https://developers.cloudflare.com/cloudflare-one/integrations/identity-providers/github/): entrar com a conta do GitHub
- [W3C: WCAG 2.2](https://www.w3.org/TR/WCAG22/): 2.5.8 Target Size (Minimum), 24 por 24 px, e 2.5.5 Target Size (Enhanced), 44 por 44 px

Fonte: experiência do projeto de origem e as fontes acima. Não vem do PDF.

## Histórico

- **2026-11-25**: antes, «No projeto de origem: começou só com o dono e passou a equipa, todos a entrar pela conta do GitHub através do Cloudflare Access. A conta é o email que o Access valida, e cada PC tem o seu token de serviço.» (experiência do projeto de 2026-11-18). Mudou porque, no projeto de origem, o GitHub saiu da entrada quando entrou o primeiro colega (pedia leitura das organizações), os papéis passaram para a base do portal, com aprovação de quem entra pela primeira vez, e o dono recusou os tokens de serviço do fornecedor: cada PC passou a ligar-se com um token criado pelo portal. Editado a 2026-11-25.
- **2026-11-25**: antes, «No projeto de origem: privado por conta com o administrador a ver todos, e depois partilha por repositório. Perguntas, permissões, mensagens às sessões e instruções ficam sempre só de quem as fez. Eventos 7 dias, mensagens 24 horas, notas sem prazo.» (experiência do projeto de 2026-11-18). Mudou porque o projeto de origem juntou um grupo por projeto, com convite aceite e privilégios para mexer, pôs os projetos novos a nascer por partilhar e deixou a cada PC a escolha do que manda ao portal, desligada por omissão; as mensagens às sessões deixaram de ser só de quem as fez, porque os membros do grupo as veem e, com o privilégio de criar, as mandam. Editado a 2026-11-25.
- **2026-11-25**: antes, «No projeto de origem: três. Um jornal público que se folheia, com as notícias do conhecimento; uma administração com aspeto de ferramenta; e uma escola, onde cada pessoa acompanha as suas sessões.» (experiência do projeto de 2026-11-18). Mudou porque a escola de cada pessoa passou a uma cidade aberta a toda a equipa, e o conhecimento passou a ver-se por todos os que entram, com a mudança reservada ao administrador. Editado a 2026-11-25.
- **2026-11-25**: antes, «No projeto de origem: topo. Uma biblioteca com oficina na administração (estantes para o conhecimento, bancadas para as skills) e uma escola para o trabalho de cada pessoa.» (experiência do projeto de 2026-11-18). Mudou porque a escola deu lugar a uma cidade com um edifício por conta git e um andar por projeto, a sala ganhou quatro tipos e entrada a pé, e a biblioteca com oficina deu lugar a um armazém do conhecimento dentro da cidade. Editado a 2026-11-25.
- **2026-11-25**: antes, «No projeto de origem: a sessão mais antiga é o professor e as outras auxiliares, as skills são alunos, o orquestrador é o avaliador e os subagentes são ajudantes ([Papéis e aspeto dos agentes na cena](papeis-e-aspeto-dos-agentes.md)).» (experiência do projeto de 2026-11-18). Mudou porque o dono pediu uma sala por sessão, já que com várias sessões os bonecos ficavam uns em cima dos outros: deixou de haver uma sessão principal com auxiliares, e o avaliador ficou só na primeira sala, que nunca desaparece. Editado a 2026-11-25.

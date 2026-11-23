---
id: portais-de-agentes/portal-de-agentes-quando-e-como
titulo: "Quando compensa um portal de agentes e como se monta"
seccao: "Portais e mundos de agentes"
paginas: []
fonte: "https://code.claude.com/docs/en/hooks"
data_lancamento: null
confianca: alta
verificado_em: 2026-11-18
editado_em: 2026-11-23
---

# Quando compensa um portal de agentes e como se monta

**Resumo:** Um portal de agentes junta num site o que as sessões do Claude Code de uma ou mais pessoas estão a fazer e deixa responder-lhes longe do PC; compensa com muitas sessões, várias pessoas ou o telemóvel como ecrã principal, monta-se com hooks no PC, um servidor, um modelo sem 3D e uma vista por público, e lê o repositório das skills como configuração.

## Conteúdo

Origem: o projeto de origem, um portal construído em quatro fases, de 2026-11-12 a 2026-11-18, para acompanhar as sessões de uma equipa. O que vem dessa experiência está marcado *(experiência do projeto)*. O que se diz do Claude Code e do Cloudflare Access vem das fontes oficiais em baixo, lidas a 2026-11-18.

### O que é

Um site onde se vê quem está a trabalhar, quem espera uma resposta, que skills foram chamadas, em que projeto e por quem. Pode ter também uma caixa onde se respondem as perguntas das sessões, notas às skills e, no extremo, conversa com as sessões a partir do browser.

### Quando compensa e quando uma lista chega

Antes de propor um portal, vê se o que já existe responde:

| Situação | O que chega |
|---|---|
| Uma pessoa, uma ou duas sessões, ao PC | O próprio Claude Code; um hook `Notification` pode reencaminhar o aviso para fora |
| Uma pessoa que quer continuar uma sessão no telemóvel | O Remote Control, função oficial: a sessão corre no PC e vê-se em claude.ai/code ou na aplicação Claude, sem código nosso |
| Várias sessões em vários projetos, para ver de relance quem espera por quem | Um portal com uma tabela de sessões e estados |
| Uma equipa, salas por projeto, histórico, notas às skills, telemóvel como ecrã principal | Um portal completo, pela ordem de construção em baixo |

O Remote Control tem condições que pesam na escolha. Precisa de um plano Pro, Max, Ultra, Team ou Enterprise e não aceita chaves de API. O computador fica ligado, com o processo `claude` a correr. Enquanto está ligado, a transcrição da sessão fica guardada nos servidores da Anthropic. O que a documentação descreve é continuar uma sessão local noutro aparelho; uma vista de vários projetos e de várias pessoas não está lá.

Mesmo com portal, a primeira vista é uma tabela com o estado de cada sessão. Um mundo 3D entra quando o dono pede esse nível ou quando mostra o que a tabela não mostra ([Mundo 3D movido por agentes](../3d-webgl/mundo-3d-movido-por-agentes.md)).

### As peças

```
PC de cada pessoa               Servidor                         Browser ou telemóvel
Claude Code + hooks     ──▶     sessões, eventos, perguntas  ◀── uma vista por público,
(agente local, opcional)        projetos, pessoas, notas         todas a ler do modelo
só pedidos de saída             lê o repositório das skills      sem 3D
```

1. No PC, os hooks do Claude Code. São comandos que o Claude Code corre em pontos do ciclo de vida e recebem em JSON, entre outros campos, `session_id`, `cwd` e `hook_event_name`. Registados em `~/.claude/settings.json`, valem em todos os projetos dessa pessoa naquela máquina; no `.claude/settings.json` de um projeto valem só nessa pasta, e para os colegas se o ficheiro for para o git. Os que só contam o que aconteceu correm com `async: true` e não atrasam a sessão; pela mesma razão não decidem nada. Os que decidem (responder a uma pergunta, aprovar uma permissão) correm sem `async` e são outro desenho ([Responder às sessões à distância](caixa-de-perguntas-a-distancia.md)).
2. No PC, o agente local, só se o portal tiver de lançar ou conduzir sessões. É a peça mais cara e a que tem regras de licença ([Licença, emparelhamento e cofre do agente local](agente-local-licenca-e-emparelhamento.md)).
3. O servidor. Guarda sessões, eventos sem conteúdo, perguntas, projetos e notas. As pessoas entram por um fornecedor de acesso; cada PC entra com um token de serviço próprio, que se revoga sem tocar nos outros. O PC só faz pedidos de saída e nada entra nele ([Um espaço por pessoa, um projeto por repositório](espaco-por-pessoa-e-projeto-por-repositorio.md)).
4. O modelo sem 3D, uma função que aplica eventos a um estado. A cena, a lista acessível e a repetição leem todas dele ([Mundo 3D movido por agentes](../3d-webgl/mundo-3d-movido-por-agentes.md)).
5. As vistas: um mundo por público ([Um mundo por público](um-mundo-por-publico.md)), a caixa de perguntas e as tabelas de gestão.

### A dependência vai num só sentido

O portal lê o repositório das skills e adapta-se a ele. As skills e o conhecimento não sabem que o portal existe.

- O endereço do repositório das skills é configuração do portal. Trocá-lo troca o catálogo.
- O portal descobre as skills pelo frontmatter de cada `SKILL.md` (`name` e `description`) e as categorias pelas pastas do conhecimento. Uma skill ou uma categoria nova aparece na sincronização seguinte, sem mexer no código do portal.
- O que só serve o portal (nome a mostrar, aspeto, papel de avaliador, critério das notas por push) vive no portal, calculado por omissão e ajustável na administração ([Papéis e aspeto dos agentes na cena](papeis-e-aspeto-dos-agentes.md)).
- O campo `metadata` do `SKILL.md`, que o Claude Code ignora, leva só o que é da própria skill e serve qualquer leitor: o estado (`produção`, `testes` ou `demo`), se é mãe ou sub (`tipo`), as skills a que pede trabalho (`usa`) e o impacto em cada área (`impacto`, de 0 a 10). Os casos de uso ficam no «Quando usar» do `EXEMPLOS.md`. Nada disto nomeia o portal. O portal lê-os em cada leitura, e um verificador no repositório das skills falha se uma skill nova não os trouxer: uma skill nova aparece no portal com o que faz e o impacto, sem mexer no portal *(experiência do projeto)*.
- *(experiência do projeto)* No projeto de origem, um agente do portal escreveu o critério das notas dentro da skill orquestradora, e os nomes e o aspeto das skills ficaram em tabelas fixas no código da cena. As duas coisas tiveram de ser desfeitas: a primeira prendia as skills a um portal, a segunda obrigava a publicar o portal por cada skill nova.

- **Uma só fonte, viva.** O que o portal mostra do repositório vem da última leitura dele, e o que se calcula daí calcula-se de novo em cada leitura: as alterações do `CHANGELOG.md`, os dias com mudança, os níveis e a «última atualização». Nunca de uma cópia feita quando se construiu o portal. As páginas abertas voltam a ler quando se abrem e quando se volta ao separador, e redesenham-se no mesmo sítio quando há uma leitura nova *(experiência do projeto)*. Na origem, as alterações e o impacto ficaram parados no dia de uma cópia antiga depois de cada publicação: os dias com mudança contavam-se uma vez, a partir dela.

Teste: procurar no repositório das skills o nome, os caminhos ou as rotas do portal não devolve nada, e uma skill de teste criada nesse repositório aparece no portal sem o publicar. Uma linha nova no `CHANGELOG.md` aparece nas alterações e na «última atualização» depois da leitura seguinte, sem recarregar a página.

### Ordem de construção, do que se vê para o que se gere

Cada fase fecha com prova e usa-se sozinha *(experiência do projeto)*.

| Fase | O que entrega | Prova |
|---|---|---|
| 0 | As decisões do dono ([Perguntas antes de construir um portal de agentes](perguntas-antes-de-construir.md)) e uma maqueta navegável com dados de exemplo | O dono diz «é isto» |
| 1 | A face que o dono vê, com conteúdo verdadeiro e rico | Capturas com dados reais, vistas pelo dono |
| 2 | O canal de eventos (hooks, servidor, modelo) e uma sala ao vivo, só para ver | Uma sessão real a mexer a sala; capturas de cada estado |
| 3 | Responder à distância; se o telemóvel é o ecrã principal, o portal publica-se aqui, com https | Uma pergunta respondida no telemóvel chega à sessão |
| 4 | Pessoas, projetos e salas partilhadas | Uma conta nunca lê dados de outra; dois clones caem na mesma sala |
| 5 | Notas às skills ([Avaliar as skills em cada push](avaliacao-de-skills-por-push.md)) | Um push real gera notas |
| 6 | O agente local: lançar e conduzir sessões a partir do portal | Licença lida antes do código; um browser não emparelhado não dá ordens |

No projeto de origem a publicação estava no fim e subiu para a fase 3. Sem o portal publicado o telemóvel não lhe chega, e o objetivo era trabalhar a partir do telemóvel.

### Lições *(experiência do projeto)*

- Começa pelo que o dono vê. A primeira versão tinha números e pouco conteúdo, e o dono rejeitou-a como «fatela». O que ele vê tem de ser rico e visual, e só se dá por feito depois de capturas com dados reais; números de desempenho não substituem a captura.
- Não ponhas de lado, por decisão técnica, uma fonte de conteúdo que o dono criou. Um registo de decisão deixou de ler o único ficheiro com resumos, imagens e vídeos, e o portal ficou pobre. Quando duas fontes divergem, junta-as e pergunta qual manda.
- O telemóvel é o ecrã principal. Cada entrega prova-se primeiro a 390 e a 360 px, com toque simulado e sem scroll horizontal. O que só se faz no PC, como instalar o agente, aparece no telemóvel como instrução curta.
- Ao reconstruir, o ecrã nunca fica em branco. Constrói-se para uma pasta nova e troca-se no fim, com o `index.html` por último, porque o dono usa o portal enquanto se trabalha nele.
- O conteúdo ocupa o ecrã inteiro, com colunas, sem largura máxima centrada.
- Menos é mais: cada dado aparece uma vez, o novo vem primeiro, um gráfico só entra se responder a uma pergunta de quem o vê, e o «como se calcula» fica fora do ecrã.
- Tabelas como no Excel, com ordenação e filtro no cabeçalho, em vez de filtros em comprimidos e listas com bolas ([Tabelas e dados densos](../design/tabelas-e-dados-densos.md)).
- A administração é uma ferramenta e não herda a metáfora nem o estilo da face pública ([Um mundo por público](um-mundo-por-publico.md)).

**Para uma skill:** antes de propor um portal de agentes, confirma que o Claude Code com um aviso ou o Remote Control não chegam; depois faz as perguntas ao dono, constrói pela ordem da tabela (o que o dono vê primeiro, o agente local por último) e fecha cada fase com capturas a 390 px. O portal lê o repositório das skills e nada nas skills fala do portal.

## Ver também

- [Perguntas antes de construir um portal de agentes](perguntas-antes-de-construir.md) (Portais e mundos de agentes)
- [Escolher o mundo de cada público](um-mundo-por-publico.md) (Portais e mundos de agentes)
- [Papéis e aspeto dos agentes na cena](papeis-e-aspeto-dos-agentes.md) (Portais e mundos de agentes)
- [Um espaço por pessoa, um projeto por repositório](espaco-por-pessoa-e-projeto-por-repositorio.md) (Portais e mundos de agentes)
- [Eventos das sessões e origem das skills](eventos-e-origem-das-skills.md) (Portais e mundos de agentes)
- [Responder às sessões à distância](caixa-de-perguntas-a-distancia.md) (Portais e mundos de agentes)
- [Avaliar as skills em cada push](avaliacao-de-skills-por-push.md) (Portais e mundos de agentes)
- [Licença, emparelhamento e cofre do agente local](agente-local-licenca-e-emparelhamento.md) (Portais e mundos de agentes)
- [Mundo 3D movido por agentes](../3d-webgl/mundo-3d-movido-por-agentes.md) (3D, WebGL e animação)
- [Painel de administração e controlo](../design/painel-de-administracao-e-controlo.md) (Design e experiência de utilizador)
- [Design responsivo e multi-dispositivo](../design/design-responsivo-e-multi-dispositivo.md) (Design e experiência de utilizador)
- [Service tokens do Cloudflare Access (um programa a entrar numa aplicação protegida)](../publicacao/service-tokens-do-cloudflare-access.md) (Publicação e alojamento web)

## Fontes oficiais

*Lidas a 2026-11-18.*

- [Claude Code: referência de hooks](https://code.claude.com/docs/en/hooks): campos comuns da entrada (`session_id`, `cwd`, `hook_event_name`), lista de eventos, `async: true` sem efeito em decisões, `Notification` para reencaminhar avisos
- [Claude Code: definições](https://code.claude.com/docs/en/settings): `~/.claude/settings.json` vale em todos os projetos da máquina; `.claude/settings.json` partilha-se pelo git
- [Claude Code: skills](https://code.claude.com/docs/en/skills): campos do frontmatter do `SKILL.md`; `metadata` livre, que o Claude Code não usa
- [Claude Code: Remote Control](https://code.claude.com/docs/en/remote-control): sessão local continuada noutro aparelho, planos, só pedidos de saída, transcrição guardada nos servidores da Anthropic
- [Cloudflare One: service tokens](https://developers.cloudflare.com/cloudflare-one/access-controls/service-credentials/service-tokens/): credenciais para sistemas automáticos, revogáveis uma a uma

## Histórico

- **2026-11-23**: reescrito o ponto sobre o `metadata` do `SKILL.md`, em «A dependência vai num só sentido». Antes dizia: «O que o portal acrescenta (nome a mostrar, aspeto, papel de avaliador, critério das notas) vive no portal, calculado por omissão e ajustável na administração. O `SKILL.md` aceita um campo `metadata` livre, que o Claude Code ignora; mesmo assim não se usa para o portal, porque a skill passaria a saber dele.» As notas de impacto de cada skill estavam escritas à mão no portal, e uma skill nova ficava sem elas. O que é da própria skill (estado, tipo, o que usa, impacto) passou para o `metadata`, verificado no repositório. Experiência do projeto. Editado a 2026-11-23.
- **2026-11-23**: acrescentado o ponto «Uma só fonte, viva» em «A dependência vai num só sentido», e uma frase no teste dessa secção. O texto que já lá estava não mudou. Experiência do projeto. Editado a 2026-11-23.

Fonte: experiência do projeto de origem e as fontes acima. Não vem do PDF.

---
id: portais-de-agentes/papeis-e-aspeto-dos-agentes
titulo: "Papéis e aspeto dos agentes na cena"
seccao: "Portais e mundos de agentes"
paginas: []
fonte: "https://www.w3.org/TR/WCAG22/"
data_lancamento: null
confianca: alta
verificado_em: 2026-11-25
editado_em: 2026-11-25
---

# Papéis e aspeto dos agentes na cena

**Resumo:** Cada tipo de ator que os eventos do Claude Code mostram (sessão, skill, subagente, orquestrador) ganha um papel no mundo, que se lê pela silhueta e não só pela cor; o aspeto de uma skill que o portal ainda não conhece calcula-se a partir do nome, fica guardado no portal e ajusta-se na administração, sem tabelas no código e sem nada declarado dentro da skill.

## Conteúdo

Origem: a escola do projeto de origem, hoje uma cidade com uma sala por sessão, onde a sessão é o professor, as skills são alunos, o orquestrador é o avaliador e os subagentes são ajudantes *(experiência do projeto)*. O que se diz do Claude Code e da WCAG vem das fontes oficiais em baixo, lidas a 2026-11-18.

### Dos eventos aos papéis

Os papéis saem dos atores que os eventos mostram. Um papel sem evento que o alimente fica parado na cena e mente.

| Ator | Como o portal o conhece | Papel na escola |
|---|---|---|
| Sessão | `session_id` em todos os hooks; `SessionStart` e `SessionEnd` | Professor da sua sala; auxiliar, se estiver numa sala com outra sessão mais antiga de quem vê |
| Skill | O Claude chama-a pela ferramenta Skill, que um hook `PreToolUse` vê passar | Aluno, um por skill que o projeto usou |
| Subagente | `SubagentStart` e `SubagentStop`, com `agent_id` e `agent_type` | Ajudante, ao lado de quem o lançou, enquanto trabalha |
| Orquestrador | Uma skill como as outras; o portal sabe qual é por configuração | Avaliador |
| Pessoa | A conta que mandou o evento | Cachecol na cor dela |

Regras de cada papel *(experiência do projeto)*:

- Cada sessão tem a sua sala e é o professor dela. A primeira sala, com o contexto do projeto, a pauta e o avaliador, nunca desaparece; uma continuação, que começa pouco depois de outra acabar, fica com a sala dessa; quando uma sessão acaba, quem estava na sala dela passa para a primeira. Quando várias sessões ficam na mesma sala, a mais antiga de quem está a ver é o professor e as outras são auxiliares: a mais antiga dá estabilidade, e uma sessão nova não tira o lugar a quem já lá estava *(experiência do projeto, 2026-11-25)*. Numa sala partilhada, o professor é a sessão mais antiga de quem está a ver, e as dos colegas são auxiliares com o nome da pessoa.
- As skills são alunos, e só entram as que o projeto usou. Uma skill nova ocupa a secretária livre seguinte, que fica sua. Numa sala partilhada há um aluno por pessoa que usou a skill.
- O orquestrador é o avaliador e não se avalia a si próprio: dá as notas e não recebe nenhuma. Qual das skills faz de avaliador é configuração do portal, nem constante no código nem marca na skill.
- Os subagentes são ajudantes. Aparecem quando começam e saem quando acabam. O `SubagentStop` dispara também quando acaba um agente interno do Claude Code (sugestões, perguntas laterais), e nesses o `agent_type` vem vazio ou com o nome do agente da própria sessão. O projeto de origem ignora os que vêm sem tipo.

Noutro mundo os nomes mudam (mestre e aprendizes, chefe de turno e operários). A regra fica: um papel por tipo de ator, e uma regra escrita para quando há mais de um do mesmo tipo.

### O papel lê-se pela forma

A WCAG 2.2 diz duas coisas que contam aqui. Pelo 1.4.1, a cor não pode ser o único meio visual de passar informação nem de distinguir um elemento. Pelo 1.4.11, as partes de um gráfico necessárias para o perceber têm contraste de pelo menos 3:1 com as cores ao lado.

Como o projeto de origem o aplicou:

| O que se quer ler | Forma | Cor, só como reforço |
|---|---|---|
| Sessão | Bata comprida, aberta à frente; o professor com capelo, o auxiliar mais pequeno e com uma pasta debaixo do braço | Bata clara |
| Avaliador | Bata comprida e prancheta | A cor da skill orquestradora |
| Aluno | Roupa, chapéu e objeto próprios da skill | A cor da skill |
| Ajudante | Mais pequeno, sem chapéu, com mochila | Neutra |
| Quem usou | Cachecol, e o nome da pessoa na etiqueta e no cartão | A cor da pessoa |
| De onde vem a skill | Placa de nome na secretária, e «Vem de» no cartão | Madeira clara nas da própria pessoa, a cor do colega nas de um colega, metal cinzento nas da Anthropic e do Claude Code, preto nas de um plugin |

- O cachecol e a placa distinguem-se sobretudo pela cor. Por isso o mesmo dado está também em texto: o nome da pessoa e a origem da skill na etiqueta, no cartão e na lista acessível.
- As marcas que contam (silhueta, cachecol, placa) passam o 3:1 contra o chão e as mesas, em claro e em escuro. Uma paleta pequena e fixa para as pessoas, verificada nos dois temas, resolve isto de uma vez; o projeto de origem usa oito cores, e cada pessoa escolhe a sua.
- A legenda («Bata: sessão», «Mochila: subagente», «Cachecol: quem usou», «Placa: de onde vem a skill») só aparece no visualizador de cada boneco. Na sala não há legenda.
- O dono recusou a primeira forma, um emblema branco no peito e o tampo da secretária pintado. Mostra-lhe as marcas em capturas antes de as dar por feitas.

Para saber de onde vem uma skill, segue-se a documentação do Claude Code. As skills vivem na pasta gerida pela organização, na pasta pessoal (`~/.claude/skills`), na do projeto (`.claude/skills`, também em subpastas), nas pastas juntas com `--add-dir`, nos plugins (com o nome `plugin:skill`) e nas da conta claude.ai, sincronizadas para `~/.claude/skills/synced/`. Com nomes iguais, a da organização ganha à pessoal e a pessoal ganha à do projeto. O pormenor está em [Eventos das sessões e origem das skills](eventos-e-origem-das-skills.md).

### O aspeto de uma skill que o portal não conhece

Contraexemplo *(experiência do projeto)*. O projeto de origem começou com tabelas fixas no código da cena: o nome a mostrar de cada skill conhecida, a roupa, o chapéu e o objeto de dezasseis skills, e uma lista das que tinham outra figura. Uma skill fora das tabelas recebia uma de sete cores, pela soma do nome, e um caderno genérico. Duas skills novas ficavam parecidas, e dar-lhes aspeto próprio obrigava a mudar o código e a publicar o portal. Essas tabelas vão ser substituídas pelo cálculo seguinte.

1. A chave é o nome completo da skill, com o prefixo do plugin quando o tem (`plugin:skill`). Duas skills com o mesmo nome curto e origens diferentes são duas skills.
2. A semente é um hash estável da chave (FNV-1a, por exemplo). O mesmo nome dá o mesmo aspeto em qualquer browser e em qualquer sala.
3. Cada atributo sai de um conjunto curto e escolhido à mão: a roupa de uma paleta verificada em claro e escuro, o chapéu de uma lista, o objeto de outra. As combinações têm de passar com folga o número de skills esperado: 10 cores, 6 chapéus e 12 objetos dão 720.
4. A primeira vez que o portal vê a skill, guarda o aspeto calculado. Se a combinação já é de outra skill guardada, avança para a seguinte livre a partir da semente. Depois de guardado, o aspeto não muda, mesmo quando chegam skills novas.
5. Na administração, quem gere troca a cor, o chapéu, o objeto e o nome a mostrar. O ajuste fica no portal, e «Repor» volta ao calculado.
6. O nome a mostrar, por omissão, é o nome da skill legível (hífenes passam a espaços, maiúscula no início). O que a skill faz vem da `description` do `SKILL.md`, lida pelo portal.
7. Se o portal sabe que categorias do conhecimento a skill cita, o objeto pode vir da que ela cita mais, para o objeto querer dizer alguma coisa. Continua calculado a partir do que a skill é, sem ela declarar nada.
8. A figura (corpo, cabelo, tom de pele) sai também da semente. Se o dono quiser uma figura por tipo de skill (no projeto de origem, as de design, estética e modelação visual têm figura de mulher), essa escolha é dele e vive na configuração do portal, ajustável na administração como o resto do aspeto; nunca numa lista no código nem na skill.

O aspeto nunca se declara dentro da skill. O `SKILL.md` aceita um campo `metadata` livre, que o Claude Code não usa, e seria fácil pôr lá uma cor. Isso faria a skill saber que há um portal e partia a dependência num só sentido ([Quando compensa um portal de agentes e como se monta](portal-de-agentes-quando-e-como.md)).

### O que verificar

- Uma skill de teste criada no repositório das skills aparece na sala com aspeto próprio, diferente de todas as outras, sem publicar o portal.
- Ajustar o aspeto na administração muda o boneco; «Repor» devolve o calculado.
- Uma captura da sala passada a tons de cinzento continua a deixar distinguir os papéis.
- As marcas que contam medem 3:1 contra o fundo, em claro e em escuro.
- O avaliador nunca aparece na pauta com nota.

**Para uma skill:** dá a cada tipo de ator que os eventos mostram um papel com uma regra escrita para quando há vários; faz o papel ler-se pela forma, com a cor só como reforço e o mesmo dado em texto; calcula o aspeto de qualquer skill a partir do nome, guarda-o no portal e deixa a administração ajustá-lo. Nenhuma tabela de skills no código e nenhum campo de aspeto no `SKILL.md`.

## Ver também

- [Escolher o mundo de cada público](um-mundo-por-publico.md) (Portais e mundos de agentes)
- [Quando compensa um portal de agentes e como se monta](portal-de-agentes-quando-e-como.md) (Portais e mundos de agentes)
- [Eventos das sessões e origem das skills](eventos-e-origem-das-skills.md) (Portais e mundos de agentes)
- [Avaliar as skills em cada push](avaliacao-de-skills-por-push.md) (Portais e mundos de agentes)
- [Um espaço por pessoa, um projeto por repositório](espaco-por-pessoa-e-projeto-por-repositorio.md) (Portais e mundos de agentes)
- [Mundo 3D movido por agentes](../3d-webgl/mundo-3d-movido-por-agentes.md) (3D, WebGL e animação)
- [Cor com significado](../design/cor-com-significado.md) (Design e experiência de utilizador)
- [Acessibilidade (WCAG 2.2 AA)](../design/acessibilidade-wcag.md) (Design e experiência de utilizador)
- [Configuração fora do código (os doze fatores)](../produto/configuracao-fora-do-codigo.md) (Modularização e produtização)
- [Subagentes e orquestração](../ia/subagentes-e-orquestracao.md) (Construir com IA)

## Fontes oficiais

*Lidas a 2026-11-18.*

- [W3C: WCAG 2.2](https://www.w3.org/TR/WCAG22/): 1.4.1 Use of Color e 1.4.11 Non-text Contrast (3:1 para as partes de um gráfico necessárias para o perceber)
- [Claude Code: skills](https://code.claude.com/docs/en/skills): onde as skills vivem, precedência entre elas, nome `plugin:skill`, chamada pela ferramenta Skill, `metadata` livre sem efeito no Claude Code
- [Claude Code: referência de hooks](https://code.claude.com/docs/en/hooks): `session_id` em todos os eventos; `agent_id` e `agent_type` no `SubagentStart` e no `SubagentStop`; agentes internos no `SubagentStop`
- [Claude Code: subagentes](https://code.claude.com/docs/en/sub-agents): subagentes lançados pela ferramenta Agent, cada um no seu contexto

## Histórico

- **2026-11-25**: antes, na tabela, «Professor, se for a mais antiga; auxiliar, se não» e, na regra, «A sessão mais antiga é o professor e as outras são auxiliares. A mais antiga dá estabilidade: uma sessão nova não tira o lugar a quem já lá estava.» (experiência do projeto de 2026-11-18). Mudou porque o dono pediu uma sala por sessão, já que com várias sessões os bonecos ficavam uns em cima dos outros: cada sessão passou a professor da sua sala, e a regra da mais antiga ficou só para uma sala com mais de uma sessão. Editado a 2026-11-25.

Fonte: experiência do projeto de origem e as fontes acima. Não vem do PDF.

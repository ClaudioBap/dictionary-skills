---
id: portais-de-agentes/eventos-e-origem-das-skills
titulo: "Eventos das sessões e origem das skills"
seccao: "Portais e mundos de agentes"
paginas: []
fonte: "https://code.claude.com/docs/en/hooks"
data_lancamento: null
confianca: media
verificado_em: 2026-11-18
---

# Eventos das sessões e origem das skills

**Resumo:** Um portal sabe o que as sessões do Claude Code estão a fazer por hooks assíncronos que mandam o tipo do evento, a sessão, o projeto e o nome da skill ou do agente, e nunca conteúdo; um batimento diz que a sessão continua viva; e a origem de cada skill descobre-se procurando nos sítios onde a documentação diz que as skills vivem, pela mesma ordem, sem ler o conteúdo nem a transcrição.

## Conteúdo

Origem: o projeto de origem, um portal que acompanha as sessões do Claude Code de uma equipa, construído e posto à prova entre 2026-11-16 e 2026-11-18 com o Claude Code 2.1.325. O que vem só dessa experiência está marcado *(experiência do projeto)*. O resto foi confirmado nas fontes oficiais lidas a 2026-11-18. A tabela que liga cada hook a um evento e cada evento a uma animação está em [Mundo 3D movido por agentes](../3d-webgl/mundo-3d-movido-por-agentes.md) e não se repete aqui: esta entrada serve a qualquer portal, com ou sem 3D.

### O que se envia e o que nunca se envia

Cada evento é uma linha pequena: o tipo, o id da sessão, o instante, o nome da pasta (só o nome, sem o caminho), o identificador do repositório e, conforme o tipo, o nome da skill, o tipo de agente, o id do subagente ou o tipo de notificação. Numa skill vai também de onde ela veio (ver abaixo). Se a pessoa deu um título à conversa (`--name`, `/rename`), o `SessionStart` e o `UserPromptSubmit` trazem-no em `session_title`; o título que o Claude Code gera sozinho não chega aos hooks.

Nunca saem do PC:

- o texto do pedido (`prompt`) e as respostas (`last_assistant_message`);
- o resto de `tool_input`, além do nome da skill e do tipo de agente;
- o conteúdo de ficheiros, caminhos completos e o caminho da transcrição;
- as credenciais que o endereço do `origin` tenha. O hook manda só o identificador normalizado (anfitrião e caminho, em minúsculas, sem esquema nem `.git`). Na origem, lia o `origin` de `.git/config` sem lançar o git, para não pagar um processo em cada evento; assim não se aplicam as regras `insteadOf` do git *(experiência do projeto)*. Como se usa esse identificador para juntar sessões no mesmo projeto está em [Um espaço por pessoa, um projeto por repositório](espaco-por-pessoa-e-projeto-por-repositorio.md).

O título da conversa é escrito pela pessoa e pode trazer o que ela colou: passa por um filtro de segredos, fica numa linha e é cortado (60 carateres na origem) *(experiência do projeto)*. Um campo novo só entra se o portal precisar dele para mostrar um estado.

### Hooks que nunca estragam uma sessão

Estes hooks correm em todas as sessões da máquina, também nas que nada têm a ver com o portal. As regras que o código tem de cumprir:

1. **Registo nas definições do utilizador** (`~/.claude/settings.json`), que valem para todos os projetos da máquina. Nas do projeto só apanhavam as sessões abertas nesse repositório.
2. **`async: true` em todos os hooks que só informam.** Correm em segundo plano e não bloqueiam a sessão; por isso também não decidem nada. Depois de lançado, o Claude Code não lhes aplica o `timeout`: é o próprio script que tem de acabar. Na origem, cada hook sai ao fim de 10 s e desiste de ler o stdin aos 5 s *(experiência do projeto)*.
3. **Sair sempre com 0 e sem saída.** O corpo inteiro corre dentro de uma função que apanha qualquer erro. Um campo vazio sai do evento antes de enviar, porque o portal recusa o lote inteiro se um campo vier mal *(experiência do projeto)*.
4. **Prazo curto e pausa depois de uma falha.** Cada pedido ao portal desiste aos 2 s. Depois de uma falha de rede, os hooks ficam 60 s sem tentar, com a marca num ficheiro de estado que todos leem, para um portal em baixo não atrasar cada chamada de ferramenta *(experiência do projeto)*. O estado grava-se num ficheiro temporário e muda-se de nome por cima do antigo, para quem lê nunca apanhar um ficheiro a meio.
5. **Forma exec no Windows.** `command` com um executável real (o `node.exe` por caminho absoluto) e `args` com o caminho do script, sem shell: caminhos com espaços e acentos dispensam aspas. Os `.cmd` e `.bat` não correm nesta forma.
6. **Matcher sempre que der.** Um hook de ferramenta sem matcher lança um processo em cada chamada de ferramenta; o arranque do Node custou cerca de 100 ms por chamada na origem *(experiência do projeto)*. O campo `if` (uma regra de permissão, como `Bash(git *)`) restringe ainda mais, nos eventos de ferramenta.

Duas coisas que a documentação diz e que mudam o que se vê no portal:

- Numa sessão interativa, o Claude Code retém os hooks de todos os ficheiros de definições, também os do utilizador, até a pessoa aceitar o diálogo de confiança da pasta. Uma sessão numa pasta ainda não confiada não aparece no portal, e isso não é uma falha do portal.
- Os hooks de comando correm com todas as permissões do utilizador. O instalador regista scripts de uma pasta que só esse utilizador escreve e diz o que regista.

Um hook que decide (responder a uma pergunta, aprovar uma permissão, entregar uma instrução quando a sessão para) é síncrono, com timeout longo e saída própria. Está em [Responder às sessões à distância](caixa-de-perguntas-a-distancia.md).

### O batimento

Quando a pessoa interrompe um pedido, o Claude Code não corre o `Stop` nem outro hook *(experiência do projeto)*. Sem mais nada, o portal mostrava a sessão a trabalhar para sempre.

- Um hook assíncrono no `PreToolUse` e no `PostToolUse`, sem matcher, manda um sinal sem conteúdo: a sessão, a pasta e o repositório.
- No máximo um sinal de 20 em 20 s por sessão. A marca grava-se antes de enviar, para duas ferramentas seguidas não mandarem dois sinais.
- O portal tira da vista a sessão sem sinal há demasiado tempo (duas horas na origem) e volta a mostrá-la com o evento seguinte. Uma sessão parada à espera de instruções do portal conta como viva pelas próprias consultas.
- Limite: uma sessão que passa muito tempo a pensar sem chamar ferramentas não dá sinal. O prazo para a dar como parada tem de ser muito maior do que o intervalo do sinal.

### De onde veio cada skill, sem ler o conteúdo

A entrada do `PreToolUse` traz `tool_name`, `tool_input` e `tool_use_id`. Na ferramenta `Skill`, `tool_input` só trazia `{ "skill": "<nome>" }` *(experiência do projeto)*: nada diz de que pasta a skill foi carregada. A transcrição tem uma linha com essa pasta, mas a documentação avisa que o formato das linhas é interno e muda entre versões. Não se constrói nada em cima dela.

O método: o hook refaz a procura que o Claude Code faz, nos sítios e pela ordem documentados, só com `stat` e a leitura de JSON pequenos.

| Origem | Onde procurar | Como o nome chega ao hook |
|---|---|---|
| Organização | `.claude/skills/<nome>/SKILL.md` na pasta das definições geridas | `nome` |
| Pessoal | `~/.claude/skills/<nome>/SKILL.md`, ou na pasta de `CLAUDE_CONFIG_DIR` | `nome` |
| Projeto | `.claude/skills/<nome>/SKILL.md` na pasta da sessão e em cada pasta acima, até à raiz do repositório | `nome` |
| Plugin | `installed_plugins.json` (cada instalação, com `scope`, `installPath` e `version`) na raiz dos plugins, `~/.claude/plugins` ou a de `CLAUDE_CODE_PLUGIN_CACHE_DIR` | `plugin:skill` |
| Conta claude.ai | `~/.claude/skills/synced/` | `nome`, ou `anthropic-skills:nome` |
| Vem com o Claude Code | sem pasta documentada | `nome` |

As regras de desempate, da documentação: a da organização ganha à pessoal e a pessoal à do projeto; qualquer uma delas substitui uma que venha com o Claude Code com o mesmo nome; as de plugin nunca colidem porque levam o prefixo; uma sincronizada da conta só responde pelo nome curto se nada mais o usar; e uma skill de uma pasta juntada com `--add-dir` com o nome de outra corre com prefixo.

No hook, isto dá esta ordem:

1. Nome com `:`. Se o prefixo for um plugin instalado, é plugin. Se não, e a skill estiver nas sincronizadas, é da conta. Sobra o que o hook não distingue (ver «Limites»).
2. Nome sem `:`. Organização, depois pessoal, depois projeto (da pasta da sessão para cima, parando na raiz do repositório). Não encontrada em nenhuma, vem com o Claude Code.
3. Qualquer erro devolve origem nula, e o evento sai na mesma.

O projeto de origem não procurava na pasta gerida, e uma skill da organização contava como do Claude Code. Quem tem skills geridas procura lá primeiro.

### O repositório de onde a skill vem

Além da origem, vai o identificador do repositório, normalizado como o do projeto, nunca a pasta:

- o que um registo de instalação diz, quando a skill foi instalada por uma ferramenta que o guarda. Na origem foi o `skills-lock.json` do projeto, com `source` e `sourceType` (`github`, `gitlab`) ou `sourceUrl` *(experiência do projeto)*;
- senão, o repositório git a que a pasta da skill pertence;
- num plugin, o `source` do marketplace, que o Claude Code regista em `known_marketplaces.json`.

De quem é a skill decide-o o portal quando lê os eventos, e não o hook:

- da Anthropic: as que vêm com o Claude Code, as da conta claude.ai e as de um repositório da Anthropic;
- da própria pessoa: o dono do repositório é uma das contas git que ela tem no PC. O agente local tira-as de `gh auth status --json hosts` e manda só `anfitrião/utilizador` das que têm `state` igual a `success`. Com `--json`, o comando sai sempre com 0, por isso lê-se o `state` e não o código de saída;
- de um colega: o dono é uma conta git que o portal conhece de outra pessoa. O nome do colega só aparece a quem já o vê na sala;
- sem repositório, ou enquanto o portal não conhece as contas git da pessoa: conta como da própria pessoa.

### Limites conhecidos

- Uma skill que a pessoa escreve à mão (`/nome`) não passa pelo `PreToolUse`. O `UserPromptExpansion` corre nesse caminho; o projeto de origem não o usou, e essas skills não apareciam.
- Um nome com prefixo pode ser de um plugin, da conta, de um plugin sincronizado da conta (que não tem registo de instalação) ou de uma pasta juntada com `--add-dir`. O hook da origem só distinguia os dois primeiros.
- De quem é a skill calcula-se na leitura: uma página aberta antes de o agente mandar as contas git só mostra a classificação nova depois de recarregar *(experiência do projeto)*.

### O que verificar

- Uma prova que corre o hook a sério num perfil temporário (pasta pessoal trocada e `CLAUDE_CONFIG_DIR` a apontar para lá), com uma skill de cada origem: do projeto com e sem registo, uma pessoal com o mesmo nome de uma do projeto (tem de ganhar a pessoal), de plugin, da conta e do Claude Code. Na origem foram 19 verificações, e o hook acabou entre 113 e 214 ms.
- Nenhum caminho do PC chega ao portal: procurar no corpo de cada pedido a pasta pessoal e a pasta da sessão.
- Com o portal desligado, a sessão segue normal e cada hook acaba dentro do seu prazo.
- Uma sessão real, pelo menos uma vez, com amostras do stdin gravadas numa pasta local só quando uma opção o pede, para fixar a forma de cada evento na versão do Claude Code em uso.

### Por reconfirmar na fonte

- `tool_input.skill` com o nome da skill, no `PreToolUse` da ferramenta `Skill`: visto nas corridas, não aparece na referência de hooks lida hoje.
- Interromper um pedido não corre nenhum hook: visto com o Claude Code 2.1.325, a referência não o diz.
- O `manifest.json` das skills sincronizadas (com `skills[].source`) e o formato do `skills-lock.json` não vêm na documentação do Claude Code.
- O caminho da pasta das definições geridas em cada sistema não foi lido.

**Para uma skill:** os eventos de um portal de sessões vêm de hooks `async` registados nas definições do utilizador, em forma exec, que saem sempre com 0, têm prazo curto e pausa depois de uma falha e nunca mandam conteúdo; há um batimento para dar a sessão como parada; e a origem de cada skill sai da ordem documentada (organização, pessoal, projeto, plugin, conta, Claude Code), sem ler a transcrição, provada num perfil temporário com uma skill de cada origem.

## Ver também

- [Mundo 3D movido por agentes](../3d-webgl/mundo-3d-movido-por-agentes.md) (3D, WebGL e animação)
- [Um espaço por pessoa, um projeto por repositório](espaco-por-pessoa-e-projeto-por-repositorio.md) (Portais e mundos de agentes)
- [Responder às sessões à distância](caixa-de-perguntas-a-distancia.md) (Portais e mundos de agentes)
- [Agent skills](../ia/agent-skills.md) (Construir com IA)
- [Minimização e retenção](../privacidade/minimizacao-e-retencao.md) (Privacidade e conformidade)

## Fontes oficiais

*Lidas a 2026-11-18.*

- [Claude Code: referência de hooks](https://code.claude.com/docs/en/hooks): onde se registam, `async` sem bloquear e sem `timeout` depois de lançado, forma exec e a regra dos `.cmd` no Windows, matcher com `|`, campo `if`, entrada do `PreToolUse`, `session_title`, `/nome` a passar ao lado do `PreToolUse`, confiança da pasta e permissões dos hooks
- [Claude Code: skills](https://code.claude.com/docs/en/skills): onde as skills vivem, procura até à raiz do repositório, desempate pelo nome, skills sincronizadas da conta e prefixo `anthropic-skills`, `--add-dir`
- [Claude Code: carregamento de plugins](https://code.claude.com/docs/en/plugins/loading): raiz dos plugins, `installed_plugins.json`, `known_marketplaces.json`, `CLAUDE_CODE_PLUGIN_CACHE_DIR`, plugins sincronizados sem registo de instalação
- [Claude Code: definições](https://code.claude.com/docs/en/settings): âmbito de `~/.claude/settings.json` e `CLAUDE_CONFIG_DIR`
- [Claude Code: sessões](https://code.claude.com/docs/en/sessions): o formato da transcrição é interno e muda entre versões
- [GitHub CLI: gh auth status](https://cli.github.com/manual/gh_auth_status): `--json hosts` e saída sempre 0 com `--json`

Fonte: experiência do projeto de origem e as fontes acima. Não vem do PDF.

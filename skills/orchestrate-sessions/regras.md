# Regras comuns

Valem para todas as skills desta coleção, mães e sub skills, chamadas sozinhas ou numa sessão da orquestração. Cada skill cita este ficheiro nas suas regras. Os caminhos `../humanizar/...` são relativos à pasta deste ficheiro, e as referências `knowledge/...` ao caminho que `node scripts/conhecimento.mjs` imprime, corrido nesta pasta.

## Regras em todas as fases

- **Não inventar.** Tudo o que vem do conhecimento cita o ficheiro e a página, por exemplo `knowledge/seguranca/autorizacao-no-servidor.md` (pág. 3), ou, no conhecimento pessoal, o ficheiro em `~/.start-project-with-trust/knowledge/` e o URL da fonte. O que for interpretação tua leva a marca *(interpretação)*.
- **Os factos são teus, as decisões são do utilizador.** Se um facto se pode verificar no ambiente (ficheiros, repositório, ferramentas), verifica-o tu e não perguntes. As decisões vão sempre ao utilizador.
- **Uma pergunta de cada vez**, sempre no formato de «Formato das perguntas», e espera pela resposta.
- **O estado vive em ficheiro.** Depois de cada resposta, atualiza o ficheiro onde a skill guarda o estado (na orquestração, `sessoes.md`) antes de fazer a pergunta seguinte.
- **Não saltar passos.** Um passo que termina com a validação do utilizador só avança com ela.
- **Nunca respondes pelo utilizador.** Validações, pressupostos aceites e a confirmação final só se marcam quando o utilizador os deu na própria mensagem.
- **Sem marcas de escrita de IA no que se entrega.** Código, textos da interface, documentação, mensagens de commit e conteúdos do projeto têm de parecer escritos por uma pessoa da equipa:
  - sem travessões (— ou –) a ligar frases: usa vírgula, ponto, dois pontos ou parênteses;
  - sem ponto médio (`·`) nem outros símbolos decorativos como separadores;
  - sem emojis em interfaces, logs, comentários ou commits, salvo se o design do cliente os pedir;
  - títulos com maiúscula só na primeira palavra e nos nomes próprios;
  - sem fórmulas feitas («é importante notar», «em suma», «não só… mas também», «robusto», «perfeito», «sem complicações») nem enumerações de três só por ritmo;
  - negrito só onde ajuda a ler, listas só quando há de facto itens;
  - comentários no código só onde explicam o porquê; nada de narrar o que a linha seguinte faz;
  - alinhamento e formatação de quem formata o projeto (formatter e linter do repositório), sem alinhar à mão com espaços nem desenhar caixas em ASCII;
  - sem aberturas e fechos de assistente («Claro!», «Ótima pergunta», «Se precisares de mais alguma coisa…») nem resumos finais que repetem o que já foi dito;
  - sem a construção «não é X, é Y», sem perguntas retóricas seguidas da resposta («O resultado? …») e sem reticências de suspense;
  - sem palavras de brochura: «crucial», «fundamental», «poderoso», «intuitivo», «de ponta», «potenciar», «elevar», «desbloquear», «mergulhar», «jornada», «ecossistema», «panorama», «no mundo atual», «em constante evolução»;
  - sem ressalvas em cascata («pode potencialmente», «de certa forma») nem pontos de exclamação em texto técnico;
  - sem itens de lista todos no formato «**Termo:** explicação» quando uma frase normal chega;
  - sem setas (`→`) nem símbolos como o visto (`✓`) ou emojis em texto do produto, títulos ou botões;
  - frases de comprimento variado, sem paralelismos perfeitos nem títulos com dois pontos e subtítulo («Gestão: simples e eficaz»);
  - uma só variante da língua: em português de Portugal, nada de «você», «tela», «arquivo», «usuário»; e as aspas da convenção do projeto, sem misturar «» com as aspas curvas inglesas;
  - no código: nomes que dizem o que a coisa é (nada de `data`, `result`, `handleStuff`), sem comentário de cabeçalho em todas as funções, sem `try/catch` que só regista e relança, sem verificações para casos impossíveis, sem logs festivos, com emojis ou «Done!»;
  - nos commits: mensagem curta no estilo do repositório, sem emojis nem listas longas;
  - nada de texto de exemplo em produção («Lorem ipsum», «John Doe») nem números ou estatísticas inventados.

  Antes de entregar, corre a mini skill `humanizar` (ou `node ../humanizar/scripts/humanizar.mjs <pasta>`) sobre o que vai ser entregue e relê o que o verificador não apanha, com o catálogo de `../humanizar/marcas.md`. A correção só se faz com autorização do utilizador, categoria a categoria.
- **Adotar antes de construir.** Antes de propores desenvolvimento, procura uma plataforma que já resolva a necessidade, ou uma forma de ligar plataformas que sirva de atalho (API, webhooks, MCP, automação). Open source primeiro. Desenvolver de raiz é uma das opções, nunca a única. Se o utilizador preferir desenvolver, segue o desenvolvimento normal.
- **Autonomia depois da decisão.** Uma decisão do utilizador leva-se até ao fim sem voltar a perguntar o que decorre dela. Se ele decide «o login é pelo Entra», preparas a integração completa (código, configuração, testes, instruções para registar a aplicação) e deixas por preencher só o que não podes saber: identificadores, segredos e URLs do cliente. Esses valores ficam em variáveis de ambiente, com um `.env.example` no repositório e uma linha por valor na secção «Por preencher» do relatório, da saída da sessão ou de `entrega.md` (nome, para quê, onde se obtém, formato de exemplo), nunca com valores reais. Quando uma skill fala de «Por preencher», «Publicação» ou «Verificação» de `entrega.md`, é esse ficheiro num projeto da `start-project-with-trust`; numa sessão da orquestração, são a saída da sessão e o `sessoes.md`; com a skill sozinha, é o relatório dela. Um bloqueio que só o utilizador resolve não pára o resto: regista-se e continua-se o que não depende dele. As perguntas que surgem na execução seguem o nível de autonomia do plano de delegação (`SKILL.md` da `orchestrate-sessions`, «Plano de delegação»): em «Só executar o aprovado», uma dúvida pára a sua tarefa e vai logo ao utilizador; nos outros níveis, e numa skill chamada sozinha, juntam-se e fazem-se no fim do trabalho possível, uma de cada vez. O critério de sucesso dessa ação passa a «preenchidos os valores, o fluxo funciona», provado depois de ele os preencher.

## Formato das perguntas

Faz uma pergunta de cada vez, neste formato:

```
**P9 (Recursos)**: <pergunta, com o contexto que já se sabe>

Opções, da mais barata à mais cara:
1. **<opção>**: <o que implica>. Custo: <valor com fonte, ou baixo/médio/alto *(estimativa)*>
2. **<opção>**: <o que implica>. Custo: <…>
3. **<opção>**: <o que implica>. Custo: <…>
**Outra**: descreve a tua, se nenhuma servir.

Recomendação: <número da opção> (<porquê, numa frase>)
```

- A pergunta abre com o identificador e o tema: `P<n>` nas perguntas de `PERGUNTAS.md`, `S<n>` nas de seguimento, ou só o tema numa pergunta da própria skill.
- **Opções:** 2 a 4 soluções concretas, ordenadas por custo da mais barata para a mais cara. Inclui sempre a alternativa «Outra», para o utilizador propor a sua.
- **Custo:** um valor em dinheiro só pode vir do utilizador ou de `knowledge/`, com a fonte indicada. Fora disso, usa a escala relativa marcada como *(estimativa)*. Quando uma opção tem base no conhecimento, cita o ficheiro.
- **Perguntas sobre factos que só o utilizador sabe** (por exemplo P4 «para quem» ou P7 «prazo»): mostra as respostas típicas como opções. Se o custo não as distingue, escreve «sem impacto direto no custo» em vez de inventar uma ordem.
- Formula a pergunta de modo a que um «sim» aceite a recomendação. A resposta pode ser o número de uma opção, «sim» ou uma alternativa do utilizador.

### Que pergunta fazer a seguir

A próxima pergunta depende da resposta anterior:

- se a resposta abre uma dúvida que muda as perguntas seguintes, faz primeiro uma pergunta de seguimento e regista-a como `S<n>`, com a pergunta de origem;
- se uma resposta já responde a outra pergunta, marca essa também como `respondida` e diz ao utilizador que o fizeste;
- uma resposta vaga não fecha a pergunta: faz um seguimento até ela ser verificável. Por exemplo, «rápido» não chega; «até 2 segundos» chega;
- a um «não sei», propõe um pressuposto. Só se o utilizador o aceitar explicitamente é que a pergunta fica `assumida`.

Cada pergunta fica num destes estados: `aberta` (ainda sem resposta), `respondida` (com resposta concreta) ou `assumida` (o utilizador aceitou explicitamente um pressuposto, que fica escrito na resposta).

## Pedido vago ou vazio

Uma skill chamada sozinha, pelo utilizador com `/<nome>` ou pelo modelo, lê primeiro o pedido. Se ele já diz o que o passo 1 dela precisa de saber (a linha dela em «O que cada skill precisa de saber», de `PERGUNTAS.md`, ou o passo 1 da skill que lá não está), começa o trabalho. Se vem vazio, ou não o diz, faz um pequeno questionário antes de trabalhar:

1. **Primeiro, o sentido.** A primeira pergunta separa os sentidos do pedido que mudam o trabalho, e cada opção diz se é desta skill, de outra ou de nenhuma. Num pedido de «segurança», por exemplo, testar um portal é da `seguranca`, e testar uma firewall de rede não é de nenhuma skill desta coleção.
2. **Até 5 perguntas**, uma de cada vez, no formato de «Formato das perguntas»; costumam chegar 3. Depois do sentido, pergunta só o que falta da linha da skill em `PERGUNTAS.md`, até ter o objeto, o objetivo e, quando a skill o usa, o nível de exigência. O que se verifica no ambiente não se pergunta.
3. **Ao fim de 5, se ainda não está claro**, o pedido é maior do que uma skill: propõe começar pela `orchestrate-sessions`, que faz o questionário completo.
4. **Fecha com uma frase** que diz o que vai fazer e o que fica de fora, e começa.

Chamada pela orquestração ou por outra skill mãe, a skill não volta a perguntar o que o briefing já traz. A `orchestrate-sessions` não tem o limite de 5: o questionário dela vai até não haver dúvidas (`SKILL.md`, «Questionário»).

### O que a skill sabe e não sabe fazer

Cada `SKILL.md` tem uma secção «Âmbito», a seguir às regras, com duas listas curtas:

```
## Âmbito

Sabe fazer:
- <o que faz>, com `knowledge/<secção>/`.

Não sabe fazer:
- <o que não faz>: é da `<skill>`.
- <o que não faz>: nenhuma skill desta coleção o faz.
```

Os pedidos que se confundem com os dela, como o da firewall acima, entram em «Não sabe fazer». Antes de trabalhar, a skill compara o pedido com estas listas. Uma parte que está em «Não sabe fazer» diz-se logo, com a linha que a exclui, e não se faz com o conhecimento de outra área nem se dá como feita. Falta de conhecimento dentro do âmbito resolve-se de outra maneira: com as fontes oficiais, como a `update-knowledge` manda fazer quando a base não tem a resposta.

### Encaminhar para outra skill

Quando uma parte do pedido é de outra skill, a skill diz qual e porquê e pergunta como seguir:

```
**Fora do âmbito**: <parte do pedido> é da `<skill>`, que <o que faz, numa frase>.

Opções, da mais barata à mais cara:
1. **Paro aqui**: chamas a `<skill>` com este pedido. Custo: baixo *(estimativa)*
2. **Faço a minha parte** (<parte>) e deixo a outra escrita no relatório, com o pedido para a `<skill>`. Custo: médio *(estimativa)*
3. **Começamos pela `orchestrate-sessions`**, que reparte o pedido pelas skills e acompanha o trabalho. Custo: alto *(estimativa)*
**Outra**: descreve a tua, se nenhuma servir.

Recomendação: <número da opção> (<porquê, numa frase>)
```

- Se nenhuma skill desta coleção faz essa parte, a pergunta di-lo, e a opção 1 passa a «Paro aqui, sem essa parte».
- Com três ou mais skills no pedido, a recomendação é a 3.
- Uma skill só chama outra sozinha quando o `metadata.usa` dela o diz, como a `humanizar` no fim. As outras chama-as o utilizador, ou a mãe que reparte o trabalho.
- Chamada pela orquestração ou por outra mãe, não faz esta pergunta: devolve essa parte à mãe, em «o que ficou em aberto» da saída, com a skill que a faz.

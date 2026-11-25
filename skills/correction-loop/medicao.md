# Medição do correction-loop

Até 2026-11-12 esta skill chamava-se `recursive-loop` e servia para construir, corrigir e investigar. Os ensaios abaixo foram feitos com esse nome e esse âmbito, e ficam como histórico. O nome mudou para `correction-loop`, o âmbito ficou na correção de erros em sistemas que já existem, e a skill passou a ser independente das outras da coleção: o diagnóstico faz-se no projeto, sem lote de perguntas, e só há uma pergunta, no início, se não houver forma de continuar. A versão independente foi medida uma vez, no fim deste ficheiro.

**Estado: em testes.** A skill foi um teste para aumentar a performance, à procura de respostas mais rápidas a problemas. Ficou no repositório, fora do `npx skills add` com `--skill '*'`, porque o último ensaio mostrou que, num erro simples, uma prompt sem skill chega à mesma correção mais depressa e mais barato.

Compara o recursive-loop com o goal-loop da `start-project-with-trust` no mesmo objetivo. Serve para decidir se esta skill compensa e se algum método de «Candidatos» (`algoritmos.md`) entra na tabela.

## Como medir

1. Escolhe um objetivo real que se divida em três ou quatro partes.
2. Resolve-o duas vezes, em pastas separadas e em sessões novas, uma com cada ciclo.
3. Em cada sessão, regista o tempo do primeiro pedido à aceitação, os tokens e o custo do `/usage`, o número de perguntas feitas ao utilizador e se o critério de sucesso ficou provado.
4. Na sessão do recursive-loop, confirma que nenhuma mensagem mostrou o nome de um método.

## Ensaios

| Data | Objetivo | Ciclo | Tempo | Tokens | Custo | Perguntas | Critério provado | Notas |
|------|----------|-------|-------|--------|-------|-----------|------------------|-------|
| 2026-11-11 | Biblioteca `utilitarios-pt`: três funções com testes e README | goal-loop | 4 min 57 s | Subagentes: 41 141 (1 `sonnet` `low`). Sessão principal por medir | Por medir (`/usage`) | 25: 18 pela folha, 6 assumidas, 1 por responder (aceitação) | Sim: 12 testes passam; o verificador da entrega pára só na aceitação | Sessão em Fable. Cerca de 22 chamadas. O percurso inclui a descoberta completa (P1 a P16) e cinco documentos |
| 2026-11-11 | O mesmo | recursive-loop | 1 min 40 s | Subagentes: cerca de 154 700 (4 `sonnet` `low` em paralelo). Sessão principal por medir | Por medir (`/usage`) | 1, pela folha | Sim: 10 testes passam; o verificador da árvore pára só na aceitação | Sessão em Fable. Cerca de 14 chamadas. Uma divisão, quatro folhas, sem ramos abandonados. Nenhum nome de método em mensagens ou briefings |
| 2026-11-11 | O mesmo, com a skill revista | recursive-loop | 1 min 48 s | Subagentes: 42 918 (1 `sonnet` `low` com as quatro folhas). Sessão principal por medir | Por medir (`/usage`) | 2: 1 pela folha, 1 assumida (entrada inválida) | Sim: 14 testes passam; o verificador pára só na aceitação | Sessão em Opus 5.5. Cerca de 16 chamadas. A sessão já tinha resolvido este objetivo uma vez |
| 2026-11-11 | Biblioteca `faturacao-pt`: NIF de cliente e de fornecedor, moeda, resumo, e um módulo legado com um erro num de 12 commits | goal-loop | 6 min 56 s | Subagentes: 46 350 (1 `sonnet` `low` com as sete ações). Sessão principal por medir | Por medir (`/usage`) | 30: 18 pela folha, 11 assumidas, 1 por responder (aceitação) | Sim: 10 testes novos e os 2 do legado passam; o verificador da entrega pára só na aceitação | Sessão em Opus 5.5. Cerca de 35 chamadas. Commit do erro certo, com `git bisect run`, 4 commits testados. NIF escrito uma vez. Duas voltas atrás (rastreabilidade de P2, espaços no exemplo do README) |
| 2026-11-11 | O mesmo | recursive-loop | 4 min 0 s | Subagentes: 48 493 (1 `sonnet` `low` com as seis folhas). Sessão principal por medir | Por medir (`/usage`) | 3: 1 pela folha, 2 assumidas (entrada inválida; NIF inválido nos totais) | Sim: 13 testes novos e os 2 do legado passam; o verificador da árvore pára só na aceitação | Sessão em Opus 5.5. Cerca de 18 chamadas. Commit do erro certo, pela metade de cada vez, 4 commits testados e uma passagem de 3 perdida por um filtro errado. NIF resolvido uma vez (o nó do fornecedor reutiliza o do cliente). Sem ramos abandonados. Nenhum nome de método em mensagens ou briefings |

Condições do ensaio: o utilizador não esteve presente e as perguntas foram respondidas por uma folha igual para os dois ciclos. A aceitação não se marcou em nenhum. Os testes e os dois verificadores foram corridos outra vez pela sessão que lançou o ensaio, com as mesmas saídas. Os relatórios estão em `ensaio-recursive-loop/<ciclo>/resultado.md`, fora deste repositório.

## Conclusão do primeiro ensaio

Num objetivo simples, o recursive-loop chegou ao resultado provado em cerca de um terço do tempo, e gastou perto de quatro vezes mais tokens em subagentes.

A diferença de tempo não vem da recursividade. O goal-loop corre dentro da `start-project-with-trust`, que fez 25 perguntas e escreveu cinco documentos antes e depois de construir; o recursive-loop fez uma pergunta e passou à construção. O ensaio compara dois percursos de tamanho diferente, e não dois ciclos sobre o mesmo percurso.

A diferença de tokens vem de lançar um subagente por folha. Cada um gastou perto de 38 000 tokens para escrever um ou dois ficheiros de dez linhas. O goal-loop entregou as cinco ações a um só subagente.

O resultado do goal-loop saiu mais completo: quatro testes por função, com casos-limite e erros tratados, contra três ou quatro do recursive-loop.

Ficou por testar: o ensaio só exercitou `dividir` e `direto`. Não houve sub-objetivos repetidos (`memo`), várias decisões em aberto (`pergunta`) nem falhas (`bissecção` e ramos abandonados). O custo total também está por medir, porque falta o `/usage` das duas sessões.

O que o ensaio mostrou faltar na `SKILL.md`:

- um limiar abaixo do qual a folha se faz na sessão principal, em vez de ir para um subagente;
- onde fica o código em relação a `recursao/<objetivo>/`;
- quem cria o que os filhos partilham (aqui, o `package.json` e os nomes da interface);
- quando muda o campo «Estado», que hoje só tem regra para `Concluído`;
- a pergunta do nível de exigência só aparece em `modelo-e-effort.md`, num ficheiro de outra skill.

## Conclusão do segundo ensaio

A skill foi revista com as cinco lacunas acima e medida outra vez, no mesmo objetivo e num maior.

Contra o goal-loop, o recursive-loop ficou à frente em três pontos e atrás num:

- tempo: 1 min 48 s contra 4 min 57 s no objetivo simples, e 4 min 0 s contra 6 min 56 s no maior;
- perguntas: 2 contra 25, e 3 contra 30;
- testes: 14 contra 12, e 13 contra 10 nas funções novas;
- tokens em subagentes: 42 918 contra 41 141, e 48 493 contra 46 350. Ficou 4% a 5% acima nos dois.

Juntar as folhas pequenas num só subagente baixou os tokens do objetivo simples de cerca de 154 700 para 42 918. A regra dos casos-limite subiu os testes de 10 para 14, e custou uma pergunta a mais em cada ensaio, sobre o que fazer com a entrada inválida.

Os métodos não fizeram diferença contra o goal-loop. No objetivo maior, as duas sessões escreveram a validação do NIF uma só vez e as duas chegaram ao commit do erro testando quatro commits pela metade. O modelo fê-lo sozinho no goal-loop, sem a skill lho pedir. A vantagem medida vem de o recursive-loop ter menos cerimónia (uma árvore em vez de cinco documentos e trinta perguntas), e não da recursividade nem do catálogo.

Limites desta medição:

- o custo total continua por medir: falta o `/usage` das sessões, e a sessão principal do goal-loop fez cerca do dobro das chamadas;
- as respostas vieram de uma folha, sem o utilizador presente;
- no primeiro ensaio as sessões correram em Fable e no segundo em Opus 5.5;
- a repetição do objetivo simples correu numa sessão que já o tinha resolvido;
- nenhum ensaio teve ramos abandonados nem mais do que uma divisão.

O que a sessão ainda achou ambíguo na `SKILL.md`:

- o pedido diz «na pasta de trabalho» e a skill manda pôr o código numa pasta ao lado de `recursao/`;
- se um nó pode reutilizar um irmão que ainda está `aberto`;
- como tratar uma falha que já existia e é ela própria o objetivo de um nó;
- a ordem das folhas dependentes dentro de um briefing único;
- se o comportamento com a entrada inválida é uma decisão do utilizador.

## Terceiro ensaio, com agentes novos e o total de tokens

O objetivo `faturacao-pt` foi resolvido por três agentes novos em Opus 5.5, sem contexto dos ensaios anteriores, com a mesma folha de respostas. O total de tokens é o que o Claude Code devolve no fim de cada agente; os tokens dos subagentes que cada um lançou vêm à parte, e não é dito se já estão incluídos no total.

| Ciclo | Tempo | Tokens do agente | Subagentes | Chamadas | Perguntas | Testes novos (por função) | Commits testados |
|---|---|---|---|---|---|---|---|
| goal-loop | 11 min 36 s | 185 888 | 1 `sonnet`: 53 436, e 57 759 numa retoma | 46 | 25: 16 pela folha, 3 pelo pedido, 6 assumidas | 20 (5, 3, 3, 4, 5, com duas funções de NIF a mais) | pelo menos 5 |
| recursive-loop, folhas juntas num subagente | 6 min 2 s | 96 226 | 1 `sonnet`: 50 675 | 22 | 2: 1 pela folha, 1 assumida | 13 (4, 4, 5) | 6 |
| recursive-loop, folhas feitas pela sessão principal | 3 min 50 s | 86 005 | nenhum | 26 | 2: 1 pela folha, 1 assumida | 14 (5, 4, 5) | 6 |

Os três chegaram ao commit certo (`be1ec8c`), escreveram a regra do NIF uma só vez e pararam só na aceitação. As saídas dos dois recursive-loop foram reproduzidas pela sessão que lançou o ensaio.

O que isto mostra:

- Com as folhas feitas pela sessão principal, o recursive-loop levou um terço do tempo do goal-loop e menos de metade dos tokens, mesmo na leitura mais favorável ao goal-loop (subagentes já incluídos no total dele).
- Fazer as folhas pequenas na sessão principal foi mais rápido do que juntá-las num subagente (3 min 50 s contra 6 min 2 s) e gastou menos tokens. Passou a ser a regra da skill. Em dinheiro a diferença pode ser menor, porque a sessão principal corre num modelo mais caro do que o subagente; só o `/usage` o diz.
- Nos testes, o goal-loop tem mais no total, porque escreveu três funções de NIF em vez de uma. Por função, o recursive-loop tem tantos ou mais (mínimo de 4 contra 3).
- O goal-loop teve uma volta atrás por um briefing pouco claro («três testes por função» lido como três asserções).
- A pergunta sobre a entrada inválida deixou de aparecer. A que ficou (se uma fatura com NIF inválido entra no total) é uma decisão do utilizador, e os ciclos assumiram respostas diferentes.

O que os agentes apontaram na skill, já corrigido: «Depende de» sem valor para «nenhum» (o verificador lia «—» como um ID), «diretório atual» contra a pasta do pedido, mandar seguir as regras de outro ficheiro e dizer que não é preciso abri-lo, a regra de juntar ficheiros contra dois irmãos com a mesma chave de memo, a linha da pergunta só para duas ou mais decisões, a sonda e os extremos na procura de uma falha, os casos-limite aplicados a documentação e a correções, e o nome do método a aparecer em descrições de ferramentas e em relatórios de subagentes.

## Rondas de afinação

Depois do terceiro ensaio a skill foi corrigida e medida mais duas vezes, sempre com agentes novos em Opus 5.5 e a skill seguida como está escrita.

| Ronda | Objetivo | Tempo | Tokens do agente | Chamadas | Perguntas | Testes novos | Pontos que custaram chamadas |
|---|---|---|---|---|---|---|---|
| 2 | `faturacao-pt` | 6 min 2 s | 104 484 | 42 | 2 | 14 | Uma barra vertical na sonda partia a célula da tabela; edições ao relatório |
| 3 | `faturacao-pt` | 6 min 51 s | 116 110 | 22 | 2 | 16 | Leu o verificador por precaução |
| 3 | `agenda-pt`: feriados, dias úteis, linha de comandos | 6 min 52 s | 113 022 | 35 | 2 | 20 | Uma dependência entre irmãos mal definida; leu o verificador |

Em todas, o critério ficou provado, o verificador parou só na aceitação, não houve subagentes e o nome do método não apareceu fora da coluna «Método». As saídas foram reproduzidas pela sessão que lançou os ensaios. A lista de feriados de 2026 e os 20 dias úteis de dezembro de 2026 foram conferidos à mão.

O que as rondas mostram:

- O recursive-loop ficou sempre abaixo do goal-loop medido no terceiro ensaio (11 min 36 s, 185 888 tokens, 25 perguntas): cerca de 40% menos tempo e de 40% menos tokens, com 2 perguntas.
- As correções tiraram as ambiguidades que custavam chamadas, e não tornaram a skill mais rápida. Os 3 min 50 s e os 86 005 tokens do terceiro ensaio não se repetiram: as rondas seguintes ficaram entre 6 e 7 minutos e entre 104 000 e 116 000 tokens. Com uma corrida por configuração, não se distingue a variação normal do peso de uma skill que cresceu a cada ronda.
- A skill funcionou num objetivo diferente daquele em que foi afinada (`agenda-pt`), com dependências em cadeia.
- Em nenhum ensaio a árvore passou de uma divisão, e nunca houve um ramo abandonado. A profundidade e o abandono continuam por testar.

As dúvidas apontadas na última ronda, já sem custo em chamadas, foram corrigidas no texto, e essa versão final não voltou a ser medida.

## Variação entre corridas iguais

A versão final da skill correu três vezes no objetivo `faturacao-pt`, ao mesmo tempo, com agentes novos em Opus 5.5.

| Corrida | Tempo | Tokens do agente | Chamadas | Perguntas | Testes novos | Notas |
|---|---|---|---|---|---|---|
| a | 6 min 27 s | 100 626 | 22 | 2 | 14 | |
| b | 5 min 30 s | 93 809 | 13 | 2 | 13 | Nenhum ponto da skill custou chamadas a mais |
| c | 7 min 51 s | 110 100 | 19 | 2 | 13 | Perdeu 8 chamadas num comando de shell que falhou, sem culpa da skill |

As três chegaram ao mesmo commit com os mesmos seis commits testados, resolveram o NIF uma vez, não lançaram subagentes e pararam só na aceitação. O nome do método não apareceu fora da árvore. As saídas foram reproduzidas pela sessão que lançou os ensaios.

O que a variação mostra:

- Com a mesma skill e o mesmo objetivo, o tempo foi de 5 min 30 s a 7 min 51 s e os tokens de 93 809 a 110 100. A média das três é de cerca de 6 min 35 s e 101 500 tokens.
- Juntando as duas corridas das rondas de afinação, são cinco corridas entre 5 min 30 s e 7 min 51 s, e entre 93 809 e 116 110 tokens. Os 3 min 50 s do terceiro ensaio ficam fora deste intervalo: foi uma corrida favorável, ou a skill dessa altura, mais curta, era mais rápida. Essa versão não ficou guardada e não se pode voltar a correr.
- A pior das cinco corridas continua abaixo do goal-loop (11 min 36 s, 185 888 tokens), que só foi medido uma vez desta forma.
- A última versão não trouxe ambiguidades que custassem chamadas. O que custa chamadas é a estrutura: ler três ficheiros no início, escrever a árvore ao criar e ao fechar, e criar a interface comum antes dos filhos.

## Teste prático, com um objetivo pequeno e um grande

Cinco agentes novos em Opus 5.5, cada um lançado por uma sessão sem contexto. A versão da skill era a anterior à fase de especificação. O pedido de cada objetivo vinha completo, e as respostas vinham de uma folha. Tokens, chamadas e tempo são os que o Claude Code devolve no fim de cada agente. Os resultados foram conferidos com testes de aceitação que os agentes não viam: 17 casos no pequeno, 26 no grande, validados antes contra uma implementação de referência.

| Objetivo | Ciclo | Tokens | Chamadas | Tempo | Perguntas | Testes escondidos |
|---|---|---|---|---|---|---|
| `telefone-pt`, uma função | goal-loop | 172 756 | 41 | 11 min 29 s | 15 | 17 de 17 |
| | recursive-loop | 65 351 | 14 | 2 min 44 s | 1 | 17 de 17 |
| `inventario-pt`, onze pontos e o legado | goal-loop | 192 127 (mais 117 353 em 2 subagentes `sonnet`) | 49 | 14 min 55 s | 24 | 26 de 26 |
| | recursive-loop | 107 970 (mais 79 088 em 1 subagente `sonnet`) | 16 | 12 min 5 s | 2 | 26 de 26 |
| | agregado: perguntas da start-project-with-trust, execução pela árvore | 205 963 (mais 84 035 em 1 subagente `sonnet`) | 40 | 17 min 57 s | 23 | 26 de 26 |

Não se sabe se os tokens dos subagentes já estão dentro do total de cada agente; a comparação não muda com nenhuma das duas leituras.

Contra o critério fixado antes (pelo menos 20% menos tempo e tokens, os mesmos testes escondidos, tantas perguntas ou menos):

- pequeno: o recursive-loop ganha, com 62% menos tokens e 76% menos tempo;
- grande: 44% menos tokens e 19% menos tempo, por isso empata no tempo pela regra dos 20%;
- agregado: não ganha (7% mais tokens, 20% mais tempo), mas fechou as perguntas obrigatórias todas.

No grande, a árvore teve pela primeira vez três níveis (15 nós) e três validações reutilizadas. A decisão sobre o serviço de taxas, que não existe, foi ao utilizador como pergunta. Não houve ramo abandonado, porque o agente testou o serviço antes de construir.

O maior custo do recursive-loop no grande veio da regra «mais de dez ficheiros vão juntos num subagente»: 19 ficheiros, 79 088 tokens e 32 chamadas, que a sessão principal teria feito em 10 a 12.

O agregado mostrou onde as duas skills não encaixam: o sítio da árvore; a regra do subagente contra a recomendação «sem agentes» da start-project-with-trust; a aceitação que a skill diz ser a da Fase 5 e o verificador da árvore exige à parte; e o modelo de briefing a pedir um `/usage` que um subagente não consegue correr.

O que este teste não mede: com o pedido completo, as perguntas do goal-loop não tinham informação nova a recolher. A fase de especificação foi acrescentada a seguir para o caso do pedido vago, e é medida no teste seguinte.

## Pedido vago, com requisitos escondidos

Testa a fase de especificação. As duas sessões receberam o mesmo pedido vago («Preciso de uma ferramenta simples para gerir as marcações de consultas da nossa clínica: ver que horários estão livres e marcar consultas.») e trabalharam elas próprias, em Opus 5.5. A sessão que lançou o teste fez de cliente, com uma folha fixada antes de começar: seis requisitos escondidos, cada um ligado a um tema das perguntas obrigatórias, revelados só quando uma pergunta, um ponto do guia ou uma proposta do lote tocava esse tema. Na pasta estava um ficheiro do «sistema antigo» com três marcações.

| | goal-loop | recursive-loop |
|---|---|---|
| Mensagens ao cliente | 29 (27 entregues; 2 reenviadas por cortes na ligação) | 3: o pedido de especificação, o lote, uma pergunta na execução |
| Perguntas | 23, mais 3 validações e a confirmação | 1 guia, 6 decisões no lote (mais 12 pontos em «Assumo também»), 1 na execução |
| Tempo (pelo `date`) | 25 min 59 s | 16 min 34 s |
| Chamadas na sessão | cerca de 157 | 40 |
| Subagente `sonnet` | 83 387 tokens na construção, 92 157 nas correções | 86 819 tokens |
| Tokens da sessão: saída | 127 805 | 81 432 |
| Tokens da sessão: escritos em cache | 266 172 | 151 371 |
| Tokens da sessão: lidos da cache | 17 226 593 | 3 752 729 |
| Respostas do modelo na sessão | 100 | 30 |
| Testes próprios | 78 | 45 |
| Requisitos escondidos cumpridos | 6 de 6 | 6 de 6 |

Os seis requisitos foram verificados pela sessão que lançou o teste, numa cópia de cada ferramenta, com os mesmos comandos:
- importar o ficheiro antigo e ver as horas dele ocupadas;
- domingo, Natal, Sexta-feira Santa e Corpo de Deus de 2027 bloqueados, e um dia normal com 20 horários;
- marcação nova pendente, fora dos livres, segunda marcação recusada, confirmação;
- Braga com 30 horários das 9h00 às 18h40;
- nenhum nome nem telefone nos livres nem na consola fora da ficha;
- nenhuma dependência nem import fora do Node.

Como cada ciclo recolheu os requisitos:
- recursive-loop: quatro no guia da ronda 1 (sistema antigo, sem internet, dados pessoais, Braga) e dois no lote, um por um ponto do lote (dias de funcionamento) e outro por uma proposta de «Assumo também» corrigida pelo cliente (marcações pendentes);
- goal-loop: um por pergunta, ao longo de 20 perguntas (P2, S4, P5, P9, P11, P16).

Os tokens da sessão vêm dos registos locais de cada sessão (os ficheiros `.jsonl` do Claude Code), somados só entre as 17:19 e as 17:48. O painel do `/usage` mostra os limites da conta, iguais nas duas janelas, e não separa as sessões.

Contra o critério fixado antes do teste: o recursive-loop apanhou os mesmos requisitos, com 3 interações (o limite era 4), em 36% menos tempo, com 75% menos chamadas, 36% menos tokens de saída e 78% menos tokens lidos da cache.

A diferença maior está na leitura da cache. Cada resposta do modelo volta a ler o contexto todo, que vai crescendo; com 100 respostas contra 30, o goal-loop leu 17,2 milhões de tokens contra 3,8 milhões. Cada pergunta a mais custa uma leitura do contexto inteiro, e é aqui que juntar as perguntas num lote poupa mais.

Em dinheiro, com os preços de `../orchestrate-sessions/modelo-e-effort.md` (Opus 5.5 a $4/$20, Sonnet 5.5 a $2/$10 por milhão) e supondo a escrita em cache a 1,25 vezes e a leitura a 0,1 vezes o preço de entrada *(estimativa)*: cerca de $11,60 no goal-loop e $4,70 no recursive-loop, 60% menos.

O tempo inclui a resposta do cliente simulado a cada mensagem. Com 29 idas e voltas contra 3, isso pesa mais no goal-loop; com um cliente humano, pesaria muito mais.

O goal-loop entregou mais do que o recursive-loop:
- duas perguntas de seguimento úteis (feriados municipais; estado das marcações importadas, que o recursive-loop também fez, na execução);
- a fonte oficial dos feriados e a pesquisa de duas plataformas existentes;
- um comando para repor cópias;
- um README para quem não é técnico;
- mais testes.

Também expôs ao cliente uma contradição entre duas regras da coleção (subagente ou não), que o cliente não devia ter de decidir.

O recursive-loop provou que duas janelas abertas ao mesmo tempo não marcam o mesmo horário, e fez a importação «tudo ou nada».

O que a fase de especificação mostrou a corrigir:
- o verificador não tinha origem para uma resposta dada na execução, nem aceitava duas origens numa linha (custou 6 chamadas); corrigido, com a origem `execução` e várias origens separadas por vírgulas;
- os nomes e telefones reais do ficheiro antigo entraram no briefing e nos testes, e a sessão trocou-os por dados fictícios (4 chamadas). O goal-loop também leu o ficheiro real nos testes;
- a regra «mais de dez ficheiros vão juntos num subagente» voltou a mandar a construção (15 ficheiros) para um subagente de 86 819 tokens.

## Investigação e implementação com mudança a meio

Quatro agentes novos em Opus 5.5, ao mesmo tempo, com a versão da skill que já tinha a fase de especificação e os critérios do conhecimento nos nós. A sessão que lançou o teste fez de cliente, com folhas fixadas antes (seis requisitos escondidos por teste). No teste B, a resposta a «Primeira versão pronta» foi uma mudança de regra: as horas ao sábado passam a contar como extra a dobrar. Tokens somados dos registos locais de cada agente e dos subagentes que lançou. Custo com os preços de `../orchestrate-sessions/modelo-e-effort.md` e a cache a 1,25 vezes (escrita) e 0,1 vezes (leitura) o preço de entrada *(estimativa)*.

**Teste A, investigação: «Que solução devemos usar para enviar lembretes das consultas?»**

| | goal-loop | recursive-loop |
|---|---|---|
| Tempo | 29 min 26 s | 19 min 22 s |
| Mensagens ao cliente | 31 | 3 |
| Tokens de saída, com subagentes | 195 699 | 129 078 |
| Tokens lidos da cache, com subagentes | 21,4 milhões | 10,5 milhões |
| Custo estimado | cerca de $13,10 | cerca de $7,20 |
| Requisitos escondidos respeitados | 6 de 6 | 6 de 6 |
| Fornecedores comparados | 9 | 4 |
| Preço da recomendação | smsonline.pt, confirmado na fonte | E-goi, pacote de 139,90 € não confirmável; a página citada diz «desde 0,016 €» e plano sem mensalidade, que o documento deixou por confirmar |

**Teste B, implementação: folhas de horas, com a mudança do sábado**

| | goal-loop | recursive-loop |
|---|---|---|
| Tempo total | 48 min 38 s | 17 min 21 s |
| Primeira versão | aos 34 min 37 s | aos 11 min 33 s |
| Da mudança ao fim | 14 min, com mais duas ações e duas perguntas | 5 min 48 s |
| Mensagens ao cliente | 33 | 4 |
| Tokens de saída, com subagentes | 302 506 | 104 717 |
| Tokens lidos da cache, com subagentes | 41,0 milhões | 9,1 milhões |
| Custo estimado | cerca de $23,10 | cerca de $6,60 |
| Requisitos escondidos cumpridos | 6 de 6 | 6 de 6 |
| Totais de abril depois da mudança | certos | certos |
| Testes | 87, em Windows e Linux | 20, em Windows e Linux |
| Documentação | README com instalação, papéis, comandos, regras e operação | nenhuma |
| NIF em repouso | num ficheiro só do gestor | num ficheiro da pasta partilhada que todos leem |

Verificação feita pela sessão que lançou o teste: no B, as duas ferramentas foram corridas numa cópia (importar, totais, NIF na consola e no relatório, dependências, nomes no código); no A, quatro preços foram conferidos nas fontes citadas.

O que isto mostra:

- O recursive-loop ganha em tempo, interações, tokens e custo nos dois testes, por margens de 34% a 90%.
- Empata nos requisitos escondidos: as duas fases de especificação apanharam os seis, nos dois testes.
- Perde em profundidade. Na investigação, comparou menos opções e deixou por resolver uma dúvida que a própria fonte respondia. Na implementação, não escreveu documentação e não pensou no NIF em repouso.
- As vantagens do goal-loop vieram de perguntas de seguimento que nasceram de resultados intermédios: o teto como média mensal e o texto num só SMS no A, o gestor que não regista horas e o NIF num ficheiro só do gestor no B. O recursive-loop fez uma pergunta deste tipo, a do feriado que calha ao sábado.

## Decisão sobre os candidatos

Nenhum entra na tabela. Em dois ensaios não houve um caso em que os métodos atuais tenham perdido tempo ou tokens por falta de um candidato, e os que já lá estão não mostraram vantagem sobre o que o modelo faz sem instruções.

Um candidato só se justifica com um objetivo em que o modelo sozinho falhe: mais de uma divisão, alternativas com custos diferentes, ou um ramo que tenha de ser abandonado.

## Prompt simples contra a skill, num erro com um teste a falhar

Dois agentes novos em Opus 5.5, ao mesmo tempo, cada um com uma cópia do mesmo repositório: 12 commits, e um erro de arredondamento ao meio cêntimo que entrou no 7.º, num commit chamado «Formatação em euros». A causa está numa função partilhada por faturas e recibos, e só o teste das faturas falhava. Os dois receberam o mesmo pedido («Está a dar erro: o total de algumas faturas sai errado. Corrige.»); um deles também a indicação de usar esta skill. Ninguém respondia a perguntas. A qualidade foi medida com 8 testes escondidos, validados antes contra a correção na causa (8 de 8) e contra um remendo só na fatura (6 de 8, com os recibos ainda errados).

| | Prompt simples | Com a skill |
|---|---|---|
| Tempo | 2 min 18 s | 5 min 23 s |
| Chamadas a ferramentas | 16 | 22 |
| Tokens de saída | 12 529 | 30 140 |
| Tokens lidos da cache | 0,61 milhões | 1,23 milhões |
| Custo estimado | cerca de $0,80 | cerca de $1,55 |
| Testes escondidos | 8 de 8 | 8 de 8 |

Os dois corrigiram a causa na função partilhada, encontraram o commit culpado, e corrigiram também valores que o arredondamento original já errava (4,015, 20,295, 2,135). A skill acrescentou a localização pelo meio (quatro versões testadas), a comparação de três formas de corrigir, a correção num ramo com commit e a árvore com as provas. A prompt simples deixou as alterações por fazer commit.

Conclusão: num erro pequeno com um teste que o mostra, a skill não chega mais depressa; é 2,3 vezes mais lenta e custa cerca do dobro, pelo tempo de ler as instruções e pelo rigor que impõe. Os casos em que os métodos de localização poderiam compensar (sem teste que mostre o erro, teste instável, histórico longo, falha que só aparece com várias alterações juntas) não foram medidos. Uma corrida por configuração.

## Critério de saída

O utilizador decidiu a 2026-11-25 fechar a skill: fica em testes, sem mais investimento. Só volta a contar se ganhar a uma prompt simples, medida como no ensaio acima (dois agentes novos, o mesmo repositório, o mesmo pedido e testes escondidos), num caso em que a localização por bissecção faz diferença: uma regressão sem nenhum teste que aponte a causa. Ganhar quer dizer o critério já usado nestes ensaios: os mesmos testes escondidos, com pelo menos 20% menos tempo e tokens.

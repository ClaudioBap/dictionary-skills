# Marcas de escrita e de construção de IA

O que denuncia que um texto, um código ou uma interface foi feito por uma ferramenta, e o que uma pessoa da equipa faria no lugar. Cada marca tem a indicação de quem a apanha: **V** o verificador `scripts/humanizar.mjs`, por padrão; **L** só a leitura da skill, porque depende do contexto.

As marcas de texto repetem a regra «Sem marcas de escrita de IA» de `../orchestrate-sessions/regras.md`, que vale em todas as skills. As outras secções acrescentam o que essa regra não cobria.

## Texto

| Marca | O que uma pessoa faz | Quem apanha |
|---|---|---|
| Travessões a ligar frases («—», «–») | Vírgula, ponto, dois pontos ou parênteses | V `travessao` |
| Ponto médio e símbolos decorativos como separadores | Vírgula, barra ou quebra de linha | V `separador` |
| Setas, vistos e símbolos (→, ✓, ✨, 🚀) no texto do produto | A palavra: «para», «feito», «falhou» | V `simbolos` |
| Emojis em texto técnico, títulos ou botões | Nenhum, salvo se o design do cliente os pedir | V `emoji` |
| Reticências de suspense no fim da frase | Ponto final | V `reticencias` |
| Pontos de exclamação em texto técnico | Ponto final | V `exclamacao` |
| Palavras de brochura («crucial», «poderoso», «seamless», «leverage») | O facto concreto, ou nada | V `brochura` |
| Fórmulas feitas («é importante notar», «em suma», «não só… mas também») | Vai direto ao que quer dizer | V `formula` |
| Aberturas e fechos de assistente («Claro!», «Espero que ajude») | Nenhum | V `assistente` |
| «Não é X, é Y» | Afirma só o que é | V `nao-e-x` |
| Pergunta retórica seguida da resposta | A afirmação | V `retorica` |
| Ressalvas em cascata («pode potencialmente», «de certa forma») | Ou é, ou não é; se há incerteza, diz qual | V `ressalvas` |
| Títulos com todas as palavras em maiúscula | Maiúscula só na primeira palavra e nos nomes próprios | V `titulo-maiusculas` |
| Título com dois pontos e subtítulo («Gestão: simples e eficaz») | Um título só | V `titulo-subtitulo` |
| Lista com todos os itens em «**Termo:** explicação» | Frases normais, ou uma tabela se houver mesmo colunas | V `lista-termo` |
| Negrito em todos os termos | Negrito só onde ajuda a ler | V `negrito` |
| Português do Brasil em texto de Portugal («você», «arquivo», «usuário», «tela») | Uma só variante | V `pt-br` |
| Aspas «» e “” misturadas | A convenção do projeto | V `aspas-mistas` |
| Frases todas do mesmo comprimento, parágrafos todos do mesmo tamanho | Ritmo variado, parágrafos com o tamanho do que dizem | L |
| Enumerações de três só por ritmo, paralelismos perfeitos | O número de itens que há | L |
| Resumo final que repete o que foi dito, «em conclusão» | Termina quando acaba | L |
| Um título para cada duas linhas | Títulos só onde há secção | L |
| Tom igual do princípio ao fim, sem uma opinião | A voz de quem escreve, com o que acha e o que não sabe | L |
| Números, estatísticas e testemunhos inventados | Só números com fonte | L |

## Código

| Marca | O que uma pessoa faz | Quem apanha |
|---|---|---|
| Comentário que narra a linha seguinte («// cria o cliente») | Apaga, ou explica o porquê | V `comentario-narrativo` |
| Comentário de cabeçalho em todas as funções | Só onde acrescenta o que o nome e a assinatura não dizem | V `doc-em-todas` |
| `try/catch` que só regista e relança | Deixa o erro subir, ou trata-o | V `catch-relanca` |
| Logs com emoji ou «Done!» | O facto, em texto simples | V `log-festivo` |
| Nomes que não dizem o que a coisa é (`data`, `result`, `handleStuff`, `foo`) | O nome do domínio | V `nome-generico` |
| Caixas e separadores em ASCII nos comentários | Títulos de secção, ou nada | V `caixa-ascii` |
| Alinhamento à mão com espaços | O formatter do projeto | V `alinhado-a-mao` |
| Verificações para casos impossíveis (`if (x !== null && x !== undefined && x)`) | Confia nos tipos e no contrato | L |
| Abstração para um uso só: interface com uma implementação, fábrica com um produto, configuração do que nunca muda | O código direto; abstrai quando houver o segundo caso | L |
| Ficheiro `utils` onde cai tudo | Cada coisa no módulo do seu domínio | L |
| Todos os módulos com a mesma estrutura, mesmo quando não faz sentido | A estrutura que cada módulo pede | L |
| Código comentado deixado, `TODO` sem dono | Apaga, ou abre um issue com nome | L |
| Mensagens de erro genéricas («Something went wrong», «Ocorreu um erro») | O que falhou e o que a pessoa pode fazer | L |
| Testes que só verificam que existe (`toBeDefined`) ou que repetem a implementação | Testes do comportamento, com casos de fronteira do domínio | L |
| README com badges e secções que ninguém pediu | O que quem chega precisa: correr, testar, publicar | L |

## Interface e design

| Marca | O que uma pessoa faz | Quem apanha |
|---|---|---|
| Quase tudo centrado | Alinha a uma grelha e ao conteúdo: uma coluna dominante, texto alinhado à esquerda, elementos relacionados alinhados entre si e os outros não | V `tudo-centrado` |
| Caixas e cartões todos do mesmo tamanho, com a mesma sombra e os mesmos cantos | Cada bloco com o tamanho e o peso que o conteúdo pede; sombra e cantos só onde separam de facto | V `cartoes-iguais` |
| Cartões da mesma fila com alturas diferentes, cada um pelo seu texto | Numa fila, os cartões têm todos a mesma altura e o rodapé alinha em baixo; o texto comprido corta-se ou abre-se a pedido | L |
| Campos de formulário todos da mesma largura | A largura do que recebem: código postal curto, morada longa, data com o tamanho da data | L |
| Espaçamentos todos iguais | Mais espaço entre grupos do que dentro deles; o espaço diz o que pertence a quê | L |
| Números em tabelas alinhados à esquerda ou ao centro | Números à direita, com o mesmo número de casas decimais; texto à esquerda | L |
| Paleta por omissão: roxo, índigo ou violeta com gradiente | A paleta do cliente, com uma cor de ação e uma de alerta | V `paleta-por-omissao` |
| Página inicial de modelo: título gigante em negrito, dois botões, três cartões de funcionalidades, rodapé de quatro colunas | A página que o produto precisa, a partir do que a pessoa vem fazer | V `hero-generico`, L |
| Emojis como ícones | Um só conjunto de ícones, com o mesmo traço | V `icone-emoji` |
| Textos genéricos («Get Started», «Saiba mais», «Your Company») | O verbo da ação concreta, na língua e no tom do projeto | V `copia-generica` |
| A mesma animação de entrada em tudo, sombras em tudo, cantos muito arredondados em tudo | Movimento onde responde ou explica: transição nos estados (passar, carregar, focar, abrir e fechar), entrada das secções uma vez, micro-interações que confirmam a ação; sombra no que flutua; cantos ligeiramente arredondados. O que denuncia é o mesmo efeito em tudo, não o movimento. `prefers-reduced-motion` respeitado | L |
| Imagens de banco aleatórias | Imagens do cliente, ou nenhuma | L |
| Ícones de bibliotecas misturadas | Um conjunto | L |
| Tipografia por omissão da ferramenta (a mesma fonte em todos os projetos) | A tipografia do cliente, ou uma escolhida com razão | L |
| Estados vazios, de erro e de carregamento ausentes ou iguais em todos os ecrãs | Cada estado diz o que aconteceu e o que fazer a seguir, com as palavras do domínio | L |
| Tudo responsivo por empilhar | Prioridades diferentes por ecrã: o que fica, o que sai, o que encolhe | L |

### Listas, filtros e tabelas

Uma ferramenta enche o ecrã de listas com bolas e de filtros em comprimidos redondos. Uma equipa usa o que as pessoas já conhecem das aplicações de trabalho e do Excel.

| Marca | O que uma pessoa faz | Quem apanha |
|---|---|---|
| Listas com bolas para mostrar dados ou registos | Uma tabela, ou linhas alinhadas sem marcador; as bolas ficam para texto corrido, quando fazem falta | L |
| Filtros em comprimidos redondos, em filas, um por cada valor | Listas pendentes retas com o nome do filtro e o valor escolhido («Unidade: todas»), ao lado da caixa de pesquisa | L |
| Tabelas que só mostram, sem ordenar nem filtrar | Como no Excel: cada cabeçalho ordena e abre o seu filtro (valores, texto, intervalo), e há exportação para Excel quando os dados se levam para fora | L |
| Secções que começam por uma lista comprida | Separadores com o número do que está pendente em cada um, cartões de resumo com o número e o que está parado, uma barra que mostra onde está cada coisa, e só depois a pesquisa, os filtros e a tabela; as ações ficam à direita | L |
| Componentes inventados para cada ecrã | Os de uma biblioteca conhecida (Bootstrap ou a que o projeto já usa) para listas pendentes, tabelas, separadores e botões | L |

### Navegação e deslocamento

Uma ferramenta liga cada página a um pai fixo e deixa o browser resolver o que não cabe com barras de scroll. Uma pessoa pensa em de onde se vem e no que se vê de uma vez (pedidos do Cláudio de 2026-11-22; `knowledge/design/navegacao-e-arquitetura-de-informacao.md` e `tabelas-e-dados-densos.md`).

| Marca | O que uma pessoa faz | Quem apanha |
|---|---|---|
| «Voltar» com destino fixo, que leva sempre ao mesmo pai, venha-se de onde se vier | Volta ao sítio de onde se veio; a migalha mostra a hierarquia e, quando se veio de outro sítio, «‹ Voltar ao …» ao lado | L |
| Barra de scroll para o lado dentro de uma tabela ou de uma coluna, num ecrã largo | Colunas curtas só com a largura do conteúdo e a principal com o resto; sem lugar, os botões empilham-se e cada linha passa a cartão | L |
| Painel preso mais alto do que o ecrã: para lhe ver o fundo, desloca-se a página toda | Lista e detalhe presos com a altura do ecrã, cada um com o seu scroll, e a roda num não mexe no resto | L |
| Lista ao lado que desce muito abaixo do bloco vizinho e deixa um espaço vazio no meio | As primeiras que cabem e «Ver todas as N», que abre o resto ali mesmo | L |
| Uma ação que pede confirmação e depois abre outro ecrã onde se volta a escolher | Um toque faz o trabalho todo, de A a Z; só se pergunta quando há uma decisão que é mesmo da pessoa | L |

### Informação a mais

Menos é mais: uma ferramenta mostra tudo o que tem; uma pessoa mostra o que quem usa precisa para decidir ou agir.

| Marca | O que uma pessoa faz | Quem apanha |
|---|---|---|
| O mesmo dado em dois sítios do ecrã (a data no cabeçalho do dia e em cada cartão; a mesma ligação numa lista e num gráfico) | Cada dado uma vez, no sítio onde se usa | L |
| Metadados com o mesmo valor em todas as linhas («verificada há 13 dias», «Confiança alta», o mesmo aprovador) | Só a exceção leva marca; o valor comum sai | L |
| Explicações para programadores no ecrã de quem usa (fórmulas, pesos, caminhos de ficheiros, «como se calcula») | No ecrã, o resultado e o que fazer com ele; o método fica na documentação técnica | L |
| Gráficos que não respondem a nenhuma pergunta (contagens por tipo, barras de totais) | Cada gráfico responde a uma pergunta de quem o vê, como «melhorou ou piorou?»; se não responde, sai | L |
| Paredes de texto onde se quer analisar | O gráfico primeiro e o texto curto; o detalhe só quando se abre | L |
| Rótulos longos na vertical ou cortados | Rótulos curtos na horizontal; o nome completo na dica | L |
| O que é novo misturado com o resto | O novo primeiro | L |

### Interface achatada

Corrigir as marcas só por subtração (sem sombras, sem cantos, sem movimento, sem cor nos botões) deixa uma interface quadrada e parada, que também denuncia ferramenta. O ponto certo é o do meio («nem 8 nem 80», o Cláudio, 2026-11-19, sobre umas maquetes «sem esse full reto», que «parecem um site feito por um júnior»): nem blocos retos empilhados, nem gradientes, vidro, sombras fortes e cantos muito redondos em tudo. Uma aplicação de trabalho bem feita tem profundidade leve, cantos de 8 a 12 px nos cartões, uma cor de destaque usada com parcimónia e movimento curto. A NN/g mediu que os elementos planos, com sinais fracos de clique, se encontram mais devagar (`knowledge/design/botoes-movimento-e-micro-interacoes.md`). Em todas as linhas, `prefers-reduced-motion` respeitado.

| Marca | O que uma pessoa faz | Quem apanha |
|---|---|---|
| Ações em links sublinhados ou em texto solto («Aprovar», «Guardar» a azul) | Botão a sério: o principal cheio, o secundário com contorno ou fantasma; o link sublinhado fica para navegar dentro do texto | L |
| Botões em pílula (comprimido) | Cantos ligeiramente arredondados, com o raio do design system | L |
| Nada responde ao passar, carregar ou focar | Cada controlo com estado ao passar, premido, com foco visível e a carregar, com transição curta | L |
| Secções e painéis que aparecem ou desaparecem de golpe | A secção entra uma vez, sem atrasar a leitura; o que abre e fecha mostra de onde vem | L |
| Tudo plano, mesmo onde há camadas (menu por cima, diálogo, o que se arrasta) | Sombra leve no que flutua; 3D (three.js) quando ajuda a perceber o que se vê, pela `design-3d-motion` | L |
| A página inteira feita de blocos brancos da largura toda, empilhados uns por baixo dos outros, todos com a mesma borda fina e o mesmo peso (parece feita por um júnior) | Uma composição: o que pede ação agora em destaque, maior e com fundo próprio; o resto numa grelha com tamanhos diferentes conforme a importância; superfícies separadas por espaço e elevação leve, não por linhas à volta de tudo | L |
| Tabelas com aspeto de folha de cálculo crua (cabeçalho cinzento cheio, linhas de grelha em todo o lado) | O Excel é o comportamento (ordenar e filtrar no cabeçalho), não o aspeto: cabeçalho em texto pequeno sem fundo, uma linha fina só entre registos, a linha responde ao passar, os números com peso onde decidem | L |
| Menu lateral em texto simples, sem ícones nem identidade | Ícones do mesmo traço em cada entrada, a página atual marcada, a marca do produto no topo, grupos com espaço entre si | L |
| Títulos, números e texto quase do mesmo tamanho | Hierarquia: um título claro, números grandes onde se decide, rótulos pequenos e mais claros | L |

## Vídeo e voz

| Marca | O que uma pessoa faz | Quem apanha |
|---|---|---|
| Narração que descreve o ecrã («Aqui temos o botão…») | Diz o que a pessoa ganha com o passo; o ecrã mostra o resto | L |
| Fórmulas de apresentador («Neste vídeo vamos ver», «Vamos explorar», «Sem mais demoras») | Começa pelo que interessa | L |
| Frases todas do mesmo comprimento e com a mesma entoação | Frases curtas nas ações, uma mais longa onde se explica | L |
| Cursor em linha reta, à mesma velocidade, a clicar sem pausa | Movimento com aceleração e uma pausa curta antes do clique, como uma mão | L |
| Zoom, scroll ou destaque em todos os passos | Só onde a frase precisa; no resto o ecrã fica quieto | L |
| Voz sem pausas entre ideias, ou com palavras estrangeiras lidas à portuguesa | Pausas onde se respira; termos estrangeiros ditos em português ou ensinados à voz | L |

## Commits, documentação e dados

| Marca | O que uma pessoa faz | Quem apanha |
|---|---|---|
| Emojis nas mensagens de commit | Nenhum | V `commit-emoji` |
| Assunto do commit com mais de 72 caracteres | Assunto curto; o detalhe no corpo | V `commit-longo` |
| Corpo do commit com a lista de tudo o que mudou | Duas ou três frases sobre o sentido da mudança; o diff já tem a lista | V `commit-lista` |
| Estilo de mensagem misto (uns commits convencionais, outros não) | O estilo que o repositório já tinha | V `commit-estilo-misto` |
| Palavras de brochura em commits | O que mudou | V `commit-brochura` |
| Texto de exemplo em produção («Lorem ipsum», «John Doe», «Acme») | Dados reais, ou dados de teste com nomes plausíveis do domínio | V `placeholder` |
| CHANGELOG que repete o diff | O que muda para quem usa | L |
| Documentação que explica o óbvio e cala o difícil (como configurar, o que falha, porquê esta decisão) | O que a pessoa seguinte não consegue descobrir sozinha | L |
| Datas, versões e nomes inventados em exemplos | Os reais, ou marcados como exemplo | L |

## Convenções da casa

Neste repositório, há duas marcas que são convenção e não se corrigem:

- `titulo-subtitulo` nos títulos «# Exemplos: <skill>» e «## Exemplo: <caso>» dos `EXEMPLOS.md`, que é o formato desses ficheiros;
- `simbolos` no ✓ e no ✗ que os verificadores imprimem, porque o `CONTRIBUTING.md` pede que terminem em ✓, e nos ficheiros que citam ou definem as marcas, como este e o `humanizar.mjs`.

Para verificar as skills sem esse ruído: `node skills/humanizar/scripts/humanizar.mjs skills --permitir titulo-subtitulo,simbolos`. Num projeto de cliente, as convenções são as do projeto e passam-se da mesma forma.

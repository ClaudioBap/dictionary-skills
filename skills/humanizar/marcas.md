# Marcas de escrita e de construção de IA

O que denuncia que um texto, um código ou uma interface foi feito por uma ferramenta, e o que uma pessoa da equipa faria no lugar. Cada marca tem a indicação de quem a apanha: **V** o verificador `scripts/humanizar.mjs`, por padrão; **L** só a leitura da skill, porque depende do contexto.

As marcas de texto repetem a regra «Sem marcas de escrita de IA» da `start-project-with-trust`, que continua a valer em todas as skills. As outras secções acrescentam o que essa regra não cobria.

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
| Campos de formulário todos da mesma largura | A largura do que recebem: código postal curto, morada longa, data com o tamanho da data | L |
| Espaçamentos todos iguais | Mais espaço entre grupos do que dentro deles; o espaço diz o que pertence a quê | L |
| Números em tabelas alinhados à esquerda ou ao centro | Números à direita, com o mesmo número de casas decimais; texto à esquerda | L |
| Paleta por omissão: roxo, índigo ou violeta com gradiente | A paleta do cliente, com uma cor de ação e uma de alerta | V `paleta-por-omissao` |
| Página inicial de modelo: título gigante em negrito, dois botões, três cartões de funcionalidades, rodapé de quatro colunas | A página que o produto precisa, a partir do que a pessoa vem fazer | V `hero-generico`, L |
| Emojis como ícones | Um só conjunto de ícones, com o mesmo traço | V `icone-emoji` |
| Textos genéricos («Get Started», «Saiba mais», «Your Company») | O verbo da ação concreta, na língua e no tom do projeto | V `copia-generica` |
| Animações de entrada em tudo, sombras em tudo, cantos arredondados em tudo | Movimento só onde explica uma mudança; `prefers-reduced-motion` respeitado | L |
| Imagens de banco aleatórias | Imagens do cliente, ou nenhuma | L |
| Ícones de bibliotecas misturadas | Um conjunto | L |
| Tipografia por omissão da ferramenta (a mesma fonte em todos os projetos) | A tipografia do cliente, ou uma escolhida com razão | L |
| Estados vazios, de erro e de carregamento ausentes ou iguais em todos os ecrãs | Cada estado diz o que aconteceu e o que fazer a seguir, com as palavras do domínio | L |
| Tudo responsivo por empilhar | Prioridades diferentes por ecrã: o que fica, o que sai, o que encolhe | L |

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

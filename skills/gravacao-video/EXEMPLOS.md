# Exemplos: gravacao-video

## O que faz

Grava vídeos de um site ou de várias aplicações com narração em português de Portugal e, do mesmo guião, noutras línguas, com legendas, cursor visível e zoom ao que a voz refere. Por cima do vídeo põe o nome da secção e a frase-chave de cada passo; entre partes do site, cenas animadas de ecrã inteiro (gancho, ligações, frase, grelha, apelo e marca); por baixo da voz, música com licença confirmada. Há três formatos: teaser (até 30 s), demonstração (1 a 3 min) e explicação (3 a 10 min), cada um com o seu ritmo. O trabalho passa por segmentos (guião, voz, gravação, montagem e prova) e um defeito corrige-se no segmento onde nasce. Grava o browser com Playwright, gera a voz com vozes gratuitas (Piper ou Azure em português, Kokoro em inglês), escolhidas de ouvido com uma frase de teste, e monta com ffmpeg. Cada lacuna da voz que se aponta fica no `voz.json` e corrige-se sozinha nos vídeos seguintes. No fim entrega o pacote para publicar: legendas em ficheiro, miniatura e descrição com capítulos e créditos.

## Quando usar

- Um teaser curto para apresentar um site.
- Uma demonstração de uma funcionalidade, passo a passo, com voz.
- Uma explicação longa para quem vai usar o sistema pela primeira vez.
- Corrigir a voz de um vídeo já feito, frase a frase.

## Quando não usar

- Vídeos com pessoas, câmara ou animação feita à mão: a skill só grava o browser.
- Gravar com uma conta real e dados pessoais à vista: usa-se uma conta de teste, ou desfoca-se na montagem.

## Exemplo: teaser do dados.gov.pt

**Pedido:** «Faz um teaser de 30 segundos do dados.gov.pt para quem nunca o usou: como se chega a um ficheiro de dados.»

**O que a skill faz:**

1. Escreve `guiao.md`, com uma frase curta por ação dita antes dela, e pede validação; passa o mesmo para `guiao.json`, com `formato: teaser` e `estilo: apresentacao`.
2. Corre `node narrar.mjs`: quatro tomadas por frase com a voz `pt_PT-tugão-medium` do Piper, fica a melhor, e «CSV» diz-se pelo dicionário de pronúncias.
3. Escreve `gravar.mjs` com o estúdio: abrir o portal, pesquisar «bibliotecas», abrir o primeiro resultado e mostrar os ficheiros com zoom.
4. Corre `node montar.mjs`, que junta a voz, gera as legendas, aplica o zoom e exporta `final/dados-gov-1920x1080.mp4`.
5. Entrega o vídeo com `escuta.md`, a folha com cada frase numerada e o seu tempo, para quem o vai ouvir.

**Resultado:** É o vídeo de teste em `video-teste/video/dados-gov/`, feito com esta skill.

## Exemplo: demonstração com mudanças de página

**Pedido:** «Agora uma demonstração de minuto e meio do mesmo portal, com a pesquisa, um conjunto de dados, a organização e as reutilizações.»

**O que a skill faz:**

1. Muda o formato para `demonstracao`: meio segundo entre frases, fala e cursor mais lentos.
2. Dá a cada mudança de página duas frases, uma que acaba no clique e outra que já fala da página nova.
3. Mostra no ecrã o que está em inglês e di-lo em português: a voz diz «a licença é aberta» com o zoom em «Creative Commons Attribution 4.0».
4. Só faz scroll quando a frase refere algo fora de vista: quatro no vídeo inteiro, cada um com a sua frase, e os filtros da lista ficaram de fora para poupar dois.
5. Confirma nos fotogramas que cada frase mostra aquilo de que fala e que nenhum dado pessoal aparece.

**Resultado:** É o vídeo `video-teste/video/dados-gov-demo/`, com 12 passos.

## Exemplo: vídeo de produto em português e inglês, com música

**Pedido:** «Quero um vídeo do portal ao nível dos vídeos de produto que se veem no YouTube, em português e em inglês, com música.»

**O que a skill faz:**

1. Escreve o guião como uma história: um gancho com a pergunta de quem vê, o portal a responder (pesquisa, um conjunto de dados, a licença, os ficheiros, as reutilizações), e cenas para as ligações entre partes, os perfis de quem usa, a frase de marca, o apelo e o fecho. Escreve o inglês como um falante nativo, com as frases na mesma ordem.
2. Narra cada língua à parte: `node narrar.mjs` com o Piper e `node narrar.mjs --lingua en` com o Kokoro.
3. Grava as duas com o mesmo `gravar.mjs` (`--lingua en` na segunda). O estúdio fotografa oito páginas do portal antes de gravar, para o gancho as mostrar a flutuar em 3D.
4. Junta a música «Inspired», de Kevin MacLeod, com a licença CC BY 3.0 lida no Wikimedia Commons e escrita no guião. Na montagem, a música fica cerca de 18 dB abaixo da voz quando ela fala e cerca de 8 dB abaixo nas pausas.
5. Entrega os dois MP4, as legendas em `.srt`, as miniaturas e a descrição com capítulos e o crédito da música.

**Resultado:** É o vídeo `video-teste/video/dados-gov-nivel/`, com 74 s em português e 85 s em inglês.

## Exemplo: corrigir a voz depois de ouvir

**Pedido:** «Na frase 9, a sigla INE soa mal, e a frase 3 acaba cortada.»

**O que a skill faz:**

1. Para a sigla, corre `node narrar.mjs --lacuna 9 pronuncia "INE=iné"`, que a guarda no `voz.json` e refaz só as frases que a usam.
2. Para a frase cortada, corre `node narrar.mjs --lacuna 3 fim-cortado`: as frases que acabam na mesma palavra passam a ter mais tomadas, neste vídeo e nos seguintes.
3. Se o fim continua cortado em todas as tomadas, muda a última palavra da frase no guião.
4. Vê se as frases novas cabem no tempo gravado: se cabem, basta `node montar.mjs`; se não, grava outra vez primeiro.

**Resultado:** O vídeo com a voz corrigida e as duas lacunas guardadas para os vídeos seguintes. A skill não ouve o áudio, por isso a última palavra é sempre de quem ouve.

---
name: gravacao-video
description: "Mini skill para gravar vídeos de um site ou de várias aplicações: teaser, demonstração ou explicação detalhada, em português de Portugal e noutras línguas a partir do mesmo guião (inglês com voz local gratuita), com legendas, cursor visível a mover-se e a clicar, zoom ao que a narração refere, nome da secção e frase-chave por cima do vídeo, cenas animadas de ecrã inteiro (gancho com capturas em 3D, ligações, frase, grelha, apelo e marca), música com licença confirmada que baixa quando a voz fala, e o pacote para publicar (legendas em ficheiro, miniatura, descrição com capítulos e créditos). Trabalha por segmentos (guião, voz, gravação, montagem, prova), cada um com regras de qualidade que os scripts da pasta scripts/ aplicam e verificam. Grava o browser com Playwright (sites com login por uma sessão guardada à mão, nunca com credenciais no ficheiro), gera a voz com vozes gratuitas escolhidas de ouvido (Piper ou Azure em pt-PT, Kokoro em inglês) ou usa a voz da própria pessoa, gravada frase a frase numa página local, e guarda cada lacuna da voz para os vídeos seguintes, monta e exporta com ffmpeg. Usar quando se quer mostrar um site, uma funcionalidade ou um produto em vídeo. É uma sub skill, que faz uma parte do trabalho, sozinha ou chamada por uma skill mãe."
argument-hint: "URL do site, formato (teaser, demo, explicação), línguas, estilo (apresentação ou sóbrio) e guião, ou nada para perguntar"
metadata:
  estado: produção
  tipo: sub
  usa: [humanizar]
  impacto: { ia: 5, seguranca: 0, nuvem: 0, desenvolvimento: 2, web: 10 }
---

# GravacaoVideo

O caminho do conhecimento obtém-se com `node ../orchestrate-sessions/scripts/conhecimento.mjs`; as referências `knowledge/...` são relativas a esse caminho.

O conhecimento está em `knowledge/ia/multimodal/`: `voz-tts-e-stt.md` para a voz, `gravacao-do-browser-com-playwright.md` para a gravação, `montagem-e-exportacao-com-ffmpeg.md` para a montagem e a exportação, e `musica-para-videos.md` para a música e as licenças. Se `~/.start-project-with-trust/knowledge/ia/multimodal/` tiver uma entrada com o mesmo caminho, vale a pessoal. Os scripts em `scripts/` aplicam essas entradas; o que fizeres fora deles passa pelo passo 3 e fica registado.

## Regras

- Seguem-se as regras comuns de `../orchestrate-sessions/regras.md`: cada facto cita o ficheiro da base ou o URL da fonte; os factos verificas tu, as decisões são do utilizador; uma pergunta de cada vez, no formato que lá está; sem marcas de escrita de IA no guião, nos títulos e nas legendas; autonomia depois da decisão, com o que só o utilizador pode dar (credenciais, marca, música licenciada) em «Por preencher».
- Credenciais vêm de variáveis de ambiente, lidas pelos scripts, ou de uma sessão guardada com `entrar.mjs` fora do projeto. Nunca ficam no guião, no briefing, nos ficheiros do projeto nem no vídeo. Sempre que possível grava-se com uma conta de teste.
- Licenças antes de instalar: cada ferramenta, cada voz e cada música entram só depois de leres a licença na página oficial e de a registares. Um modelo de voz com licença não comercial não entra em vídeos de clientes sem os termos confirmados (ver a entrada de voz). Uma música sem `licenca` e `fonte` no guião não entra: o `montar.mjs` recusa-a.
- Tu não ouves o áudio. O que os scripts medem (ruído no arranque, fins cortados, palavras que o reconhecimento de fala não ouviu, pronúncias por rever, silêncios) reportas com números; o que só o ouvido decide (timbre, naturalidade, uma palavra mal dita) pedes ao utilizador que ouça, e dizes-lhe em que frases. O reconhecimento de fala também erra: aponta onde ouvir, não substitui o ouvido.
- O modelo e o effort seguem `../orchestrate-sessions/modelo-e-effort.md`: o guião e o desenho das transições são «Design e interface» ao nível pedido; a gravação e a montagem são «Construir»; a leitura de documentação é `haiku low`.

## Âmbito

Sabe fazer, com as entradas de `ia/multimodal/`: vídeos de um site ou de várias aplicações gravados no browser (teaser, demonstração ou explicação), com narração por uma voz gratuita em português de Portugal, ou pela voz da própria pessoa, e, do mesmo guião, noutras línguas (o inglês com o Kokoro, local); legendas tiradas do guião, cursor, zoom, cartões e transições; nome da secção e frase-chave de cada passo por cima do vídeo; cenas animadas de ecrã inteiro; música com licença confirmada, que baixa quando a voz fala; sites com login, por uma sessão guardada à mão; exportação em MP4 com o pacote para publicar (legendas em `.srt`, miniatura, descrição com capítulos e créditos). E corrigir a voz de um vídeo que fez, frase a frase.

Não sabe fazer:

| Pedido | Para onde vai |
|---|---|
| Filmagem com pessoas ou câmara, avatares, animação de personagens, vídeo programático (Remotion, Motion Canvas) | fora da base: passo 3, com a documentação e a licença oficiais lidas antes de usar |
| Compor ou gerar música | fora da base: a skill usa música já feita, com licença confirmada (passo 3 para outra fonte) |
| Gravar uma aplicação de secretária ou o ecrã fora do browser | fora da base: o Playwright só grava o browser; passo 3 |
| Transcrever ou legendar um vídeo que já existe | `ia-aplicada` (voz e reconhecimento de fala) |
| Corrigir o site para ficar bem no vídeo (um ecrã partido, um texto errado) | `design-ux` ou `boas-praticas-codigo`, antes de gravar |
| Animação ou 3D dentro do próprio site | `design-3d-motion` |

Pedidos que se confundem:
- «Um vídeo do site»: uma demonstração gravada no browser, sim; um vídeo promocional com filmagens ou animação feita à mão, não.
- «Legendas»: as do vídeo que esta skill grava, tiradas do guião, sim; legendar um vídeo que já existe, não (`ia-aplicada`).
- «Uma voz melhor»: escolher entre as vozes gratuitas e corrigir as lacunas no `voz.json`, sim; uma voz paga só a pedido, com o custo dito à partida.
- «Animação»: cursor, zoom, transições e as cenas de ecrã inteiro do `cenas.mjs`, sim; animação dentro do site, não (`design-3d-motion`).
- «Noutra língua»: o mesmo vídeo narrado e legendado noutra língua, sim (`linguas` no guião); traduzir o próprio site, não.
- «Música»: uma faixa com licença confirmada, ajustada à duração e por baixo da voz, sim; compor a música, não.

Quando parte do pedido é de outra skill, segue `../orchestrate-sessions/regras.md`: diz qual e porquê; chamada por uma mãe, devolve-lhe essa parte; sozinha, recomenda-a.

## 1. O que vamos gravar?

Se o pedido, ou o briefing da mãe, já diz o site, o que mostrar e o formato, passa ao passo 2. Se não, pergunta só o que falta, uma coisa de cada vez, no formato de `../orchestrate-sessions/regras.md`, e pára quando tiveres as três:

1. **O site e o que mostrar:** o URL e o percurso ou a funcionalidade, ou as várias aplicações e a ordem. Se o site pede login, se a conta de teste entra com MFA (sessão guardada com `entrar.mjs`) ou por credenciais em variáveis de ambiente.
2. **Para quem e para quê:** quem nunca usou o site, quem o vai usar a seguir, ou quem decide se o compra.
3. **O formato**, do mais curto ao mais longo: `teaser` (até 30 s), `demonstracao` (1 a 3 min) ou `explicacao` (3 a 10 min). Recomenda pelo objetivo: o teaser para apresentar, a demonstração para mostrar uma funcionalidade ou um produto, a explicação para quem vai usar o sistema.
4. **As línguas**, se o vídeo vai para fora de Portugal: português e inglês do mesmo guião é o caso mais comum.

No máximo cinco perguntas (a do login só se o site o pedir, a das línguas só se o público não for só português). O estilo é o de apresentação, salvo se o utilizador pedir o sóbrio; a voz escolhe-se de ouvido no passo 4.2; a música e a marca (logótipo, cores, letra, contactos) ficam em «Por preencher» se o utilizador não as der, e o vídeo faz-se na mesma.

Formatos. O formato define a duração e o ritmo (a fala, as pausas e a velocidade do cursor):

| Formato | Duração | Entre frases | Folga por passo | Movimentos | Fala |
|---|---|---|---|---|---|
| `teaser` | até 30 s | 0,25 s | 0,4 s | normais | normal (Piper em português: cerca de 5% mais lenta) |
| `demonstracao` | 1 a 3 min | 0,7 s | 1,2 s | 1,3x mais lentos | 8% mais lenta (Piper em português: cerca de 11%) |
| `explicacao` | 3 a 10 min | 0,9 s | 1,5 s | 1,5x mais lentos | 12% mais lenta (Piper em português: cerca de 15%) |

A voz portuguesa do Piper abranda mais porque fala mais depressa do que as outras. Num teste de 2026-11-25, com `length_scale` 1,08 dizia cerca de 6,3 grupos de vogais por segundo, contra 4,2 do Kokoro em inglês, e a demonstração em português ouvia-se apressada. O Piper não abranda na proporção do valor, porque os fonemas curtos arredondam para tramas de 11,6 ms. Face a 1,08, o 1,2 deu 5% mais tempo, o 1,3 deu 11% e o 1,45 deu 21%. A 1,45, porém, a primeira sílaba das frases perdia-se mais vezes: «Cada» em 7 de 8 tomadas, «Aqui» em 6 de 8. Por isso o `narrar.mjs` usa 1,2, 1,3 e 1,4, e o resto do abrandamento vem das pausas, alargadas no mesmo teste.

Estilos:
1. **Apresentação** (por omissão): cartão de abertura e de fecho, cursor visível com movimento suave e onda discreta a cada clique, zoom a 1,5x ao que a narração refere (de um alvo para outro, o zoom desliza), dissolve entre páginas (a última imagem da página antiga desvanece sobre a nova, com um leve zoom), títulos em terço inferior, nome da secção no canto superior esquerdo e frase-chave do passo no direito, legendas numa caixa da cor do vídeo e cenas de ecrã inteiro onde o site não chega (o gancho, as ligações entre partes, a frase de marca, o apelo e o fecho). O destaque faz-se com o cursor e o zoom; caixas coloridas à volta de elementos só se o utilizador as pedir. Saída a 1920x1080, gravada a 2x para o zoom ficar nítido.
2. **Sóbrio**: sem cartões nem cursor; títulos, caixas e cortina escura entre páginas. Saída na resolução da janela.

## 2. Ler só o que interessa

Lê as entradas de `ia/multimodal/`. Na de voz, aplica a linha «Para uma skill»: as vozes gratuitas vêm primeiro (em pt-PT a do Piper, `pt_PT-tugão-medium`, e as do escalão gratuito do Azure; em inglês as do Kokoro e a `en_GB-cori-high` do Piper), e a escolha faz-se de ouvido no passo 4.2; com o Azure, conta os caracteres do guião face ao limite mensal do escalão gratuito. Na de música, as fontes com licença lida, o texto de atribuição que cada uma pede e os níveis da mistura; uma fonte nova lê-se na página dela (no Wikimedia Commons, pela API, com `prop=imageinfo&iiprop=extmetadata`) e regista-se no guião. As vozes pagas ficam na entrada, para quem quiser pagar. Nas de gravação e montagem, lê as linhas «Para uma skill» e as armadilhas conhecidas (escala a 2x, scripts de início antes do `<head>`, sites de página única em que a navegação não cria documento novo, sites que limpam os filhos de `<html>`, diálogos na camada de topo, `scroll-behavior: smooth`, caminhos com acentos no Piper, fins de frase cortados pelo Piper).

## 3. Se a biblioteca não tem a resposta

Os scripts cobrem gravação, cenas, narração com Piper, Azure ou Kokoro, música com licença, montagem e exportação em MP4. Para algo fora disso (outra voz, outra fonte de música, outro formato de saída, uma ferramenta de vídeo programático como Remotion ou Motion Canvas), segue «Quando falta conhecimento» em `../update-knowledge/SKILL.md` antes de instalar ou usar, com o registo em `ia/multimodal/`. Fontes oficiais: a documentação e a licença no site do próprio projeto; diz também que licenças confirmaste. Se mudaste um script de `scripts/`, a alteração entra na skill com a razão no commit.

## Onde fica cada coisa

Tudo vive em `video/<nome-do-video>/`, no projeto:
- `guiao.md`: a tabela do passo 4.1, validada;
- `guiao.json`: o que os scripts leem (ver o passo 4.1);
- `estudio.mjs`, `cenas.mjs`, `narrar.mjs`, `gravar-voz.mjs`, `montar.mjs`, `entrar.mjs`, `comum.mjs` e `pronuncias.json`: cópias de `scripts/` desta skill, sem alterações;
- `gravar.mjs`: o script deste vídeo, escrito sobre o estúdio; lê as credenciais do ambiente; o mesmo script grava todas as línguas;
- `audio/`: um ficheiro por frase (`<passo>-<n>.wav`), `duracoes.json`, a narração completa, a mistura com a música, `tomadas/`, com todas as tomadas de cada frase, `vozes/`, com a frase de teste dita por cada voz gratuita, e `gravada/`, com as frases gravadas pela pessoa;
- `escuta.md`: a folha de escuta, com as frases numeradas e o tempo de cada uma no vídeo;
- `gravacao/`: o vídeo bruto, uma captura JPEG por passo, `tempos.json` (o relógio da gravação), os PNG do nome da secção e da frase-chave, e `filtro.txt` (o filtro ffmpeg usado);
- `legendas.srt`: geradas a partir do guião;
- `<lingua>/`: numa língua que não é a primeira de `linguas`, os mesmos `audio/`, `gravacao/`, `legendas.srt` e `escuta.md` dessa língua;
- `musica/`: a faixa, com a licença e a fonte escritas em `musica` no guião;
- `final/`: as exportações, uma por língua, formato e resolução, e o pacote para publicar de cada uma (`<nome>.srt`, `<nome>-miniatura.jpg` e `<nome>-publicar.md`).
O projeto precisa de `playwright` e `ffmpeg-static` no `package.json`, de `kokoro-js` se narra em inglês, de `@huggingface/transformers` para o reconhecimento de fala que confere as palavras (vem com o `kokoro-js`; num projeto só em português, `npm i @huggingface/transformers`), e do Piper em `ferramentas/piper/`: o executável em `piper/piper.exe` e a voz como `pt_PT-tugao-medium.onnx` e `pt_PT-tugao-medium.onnx.json`, sem o til do nome oficial `pt_PT-tugão-medium` (ou nas variáveis `PIPER_EXE`, `PIPER_MODELO` e `PIPER_ESPEAK`). A sessão de um site com login fica fora do projeto, em `~/.start-project-with-trust/sessoes/`. Nada desta pasta vai para o repositório com segredos; `.gitignore` exclui `ferramentas/`, `gravacao/*.webm`, `audio/narracao.wav`, `audio/mistura.wav`, `audio/tomadas/` e o mesmo dentro de cada `<lingua>/`.

## 4. Produzir, segmento a segmento

Cada segmento tem as suas regras de qualidade e só passa ao seguinte quando as cumpre. Um defeito corrige-se no segmento onde nasce: uma palavra mal dita corrige-se no guião ou nas pronúncias, e não na montagem.

### 4.1 Guião

Escreves `guiao.md`, uma tabela com passo, ação no browser (o que o cursor faz, onde há zoom, onde há scroll), a narração frase a frase e o que aparece no ecrã, e pedes validação antes de gravar. Textos finais que faltem ficam em «Por preencher». Depois passas o mesmo para `guiao.json` e copias `scripts/*` desta skill para `video/<nome>/`.

Regras de qualidade:
- **Uma frase por ação**, curta (até 16 palavras), dita antes da ação a que se refere: a voz vai à frente do cursor. Onde o cursor vai clicar, uma frase de ligação («Abrimos o primeiro.»).
- **Uma mudança de página pede duas frases**: uma que acaba no clique («No menu principal está a secção Reutilizações.») e outra que começa já na página nova («Reúne aplicações e estudos feitos com estes dados.»). Uma frase só, longa, deixa o ecrã parado enquanto se fala do que ainda não se vê.
- **Só o que se vê.** Cada frase fala do que está no ecrã nesse momento, ou do que o passo vai mostrar logo a seguir. Se a frase nomeia uma coisa («estudos, mapas e aplicações»), o ecrã mostra-a (scroll até ela, zoom nela); se o passo não a mostra, a frase não a diz. Uma frase sobre o que não está à vista obriga a ações para encher o tempo (um zoom num título, um scroll sem alvo) e dá transições estranhas.
- **Câmara calma.** No máximo um zoom por frase, no sítio onde o cursor já está. Dois zooms seguidos em lados opostos do ecrã, com menos de 3 s entre eles, parecem a imagem a ir para um lado e para o outro: junta-os num só, escolhe alvos próximos (o zoom desliza de um para o outro) ou deixa a imagem parada entre eles. O `montar.mjs` avisa quando isto acontece.
- **Português corrente.** Termos estrangeiros mostram-se no ecrã (zoom, título) e dizem-se em português: «a licença é aberta», com o zoom em «Creative Commons». A voz sintética lê inglês com fonética portuguesa e soa mal.
- **Sem palavras curtas encostadas.** O Piper come palavras átonas curtas seguidas: «de que», «quem o», «com que». Num teste de 2026-11-25, o reconhecimento de fala não as ouviu em nenhuma das 4 tomadas de «Onde estão os dados públicos de que precisa?» nem de «Cada conjunto diz quem o publica e com que licença.». Reescreve-as («Onde estão os dados públicos que procura?», «Cada conjunto mostra a entidade que o publica e a licença.»).
- **Primeira palavra forte.** O Piper começa cada frase sem rampa, e a primeira sílaba pode sair tão fraca que quem ouve diz que a frase vem cortada. Num teste de 2026-11-25, o reconhecimento de fala não ouviu a primeira palavra em nenhuma das 8 tomadas de «Conserva o conteúdo e as fotografias da época.» (ouviu «observe»), «Comece pelo arquivo.pt.» e «Pode começar no arquivo.pt.». Ouviu-a em todas as tomadas de «Ficaram as fotografias e o conteúdo da época.» e em «Encontre-a no arquivo.pt.». As frases que começam por vogal («Abrimos», «Agora», «O Arquivo.pt») saíram sempre bem. Começa as frases por uma vogal ou por uma sílaba tónica; o `narrar.mjs` diz que frases ficaram sem a primeira palavra, e essas reescrevem-se.
- **Siglas, endereços e nomes** dizem-se como se leem. As siglas correntes e os endereços (`dados.gov.pt`) o script trata; o resto ensina-se com `--ensinar` (passo 4.2) ou, se só valer para este vídeo, vai para `pronuncias` no `guiao.json` (`{ "INE": "iné" }`). As legendas ficam com a grafia original.
- **Scroll só com propósito**: quando o que a frase refere não está à vista, e no máximo um por página. Nunca scroll para «mostrar a página». Um regresso ao topo para usar o menu conta como scroll e leva uma frase.
- **Zoom e título não se juntam**, o zoom sai antes de o cursor ir para longe, e um zoom fica pelo menos o tempo de uma frase: entrar e sair logo a seguir incomoda.
- **Uma história, não uma visita.** Numa demonstração ou num teaser de produto, a ordem é: gancho (a pergunta ou o problema de quem vê, numa cena), o produto a resolvê-lo no ecrã, a prova (um número, um caso, o que já se fez com ele), e o apelo. Numa explicação, a ordem é a do trabalho de quem vai usar o sistema.
- **Cenas só onde o site não chega**: o gancho, as ligações entre partes, a frase de marca, o apelo e o fecho. No máximo um terço do vídeo em cenas; o resto é o produto a funcionar. Cada cena diz uma coisa só, com o texto que a voz diz ou um resumo dele, nunca outra coisa.
- **Nome da secção e frase-chave curtos**: o nome tem até 3 palavras e muda quando muda a parte do produto; a frase-chave tem até 6 palavras, diz o ganho do passo («Licença aberta», e não «Aqui vê-se a licença») e não repete a legenda.
- **Cada língua escrita por quem a fala.** O inglês não é o português traduzido palavra a palavra: as frases têm a mesma função e a mesma ordem (o `gravar.mjs` é o mesmo), mas cada uma soa natural na sua língua. Os nomes que o site mostra dizem-se como aparecem no ecrã dessa língua; um termo que fica em português (um nome próprio, uma pesquisa) explica-se uma vez.
- **Humanizado antes de gravar.** A narração e as ações não podem deixar perceber que foram feitas por uma IA. Antes de pedir validação, corre a mini skill `humanizar` (ou `node ../humanizar/scripts/humanizar.mjs guiao.md`) e relê o guião com as secções «Texto» e «Vídeo e voz» de `../humanizar/marcas.md`. Corriges só com autorização, categoria a categoria.

`guiao.json`:
- `nome`, `url`, `formato` (`teaser`, `demonstracao` ou `explicacao`), `estilo` (`apresentacao` ou `sobrio`), `largura` e `altura` da janela (1280x720), `escala` (2 no estilo apresentação, 1 no sóbrio), `saida` (`{ "largura": 1920, "altura": 1080 }`);
- `capa` e `fecho`, cada um com `titulo` e `subtitulo` (a `capa` também `segundos`, 2,5 por omissão, e `narrarAntes`, os segundos de voz ainda sobre o cartão, 1,5 por omissão);
- `passos`: lista de `{ "id": "01-...", "narracao": "..." }`, com o texto exato do guião. A narração divide-se em frases pela pontuação final (ou por `|`, para forçar a divisão). Cada passo pode ter ainda `etiqueta` (o nome da secção, que fica até mudar), `manchete` (a frase-chave do passo) e `capitulo` (o título do capítulo na descrição, onde o passo começa);
- línguas: `linguas` (`["pt", "en"]`; a primeira é a principal). Qualquer texto pode ser `{ "pt": "...", "en": "..." }`, também o `url`, a `voz`, o `motorVoz` e as `pronuncias`; cada corrida usa o da sua língua;
- voz: `motorVoz` (`piper` por omissão em português, `kokoro` em inglês, `azure`, ou `gravada` para a voz da própria pessoa), `voz`, `pronuncias`, `vozOpcoes` (`length_scale`, `noise_w`, `noise_scale`, `tomadas`);
- `cenas`: `{ "<id>": { "tipo": ..., ... } }`, com os tipos `pergunta` (`rotulo`, `texto`, `subtitulo`, `capturas`: endereços do site que o estúdio fotografa antes de gravar, ou `imagens`), `ligacoes` (`nos`, `titulo`, `subtitulo`), `frase` (`linhas`, `destaque`, `marca` ou `logo`), `grelha` (`titulo`, `cartoes` com `titulo`, `texto` e `imagem`, `destaque`, `rodape`), `apelo` (`titulo`, `botao`, `contactos`, `rodape`, `marca` ou `logo`) e `marca` (`nome` ou `logo`, `slogan`, `subtitulo`). As imagens são caminhos relativos à pasta do vídeo;
- `etiquetaSobre`: a linha pequena por cima do nome da secção (o produto ou a aplicação);
- `musica`: `ficheiro`, `titulo`, `autor`, `licenca`, `licencaUrl`, `fonte` (a página onde a licença foi lida), `atribuicao` (o texto que a licença pede, se pede), e para afinar `nivel` (−27 LUFS por omissão), `inicio` (segundos a saltar no início da faixa), `entrada` e `saida` (desvaneceres);
- `publicar`: `titulo`, `descricao`, `rodape`, `miniatura` (o passo de onde sai a miniatura) e `miniaturaEm` (segundos depois do início desse passo);
- `sessao`: `true` num site com login (a sessão de `entrar.mjs`);
- para afinar o ritmo do formato: `pausaFrases`, `folga`, `ritmo` (multiplicador da duração dos movimentos); `cores` (`fundo` e `realce`); `fonte` (uma letra do Google Fonts para as cenas, os cartões e os gráficos); `fonteLegendas`, `margemLegendas` e `legendasNaImagem` (`false` para exportar sem legendas gravadas e carregar o `.srt`).

### 4.2 Voz

**Voz própria.** Em vez de uma voz sintética, a pessoa pode narrar o vídeo com a sua voz. Com `"motorVoz": "gravada"` no `guiao.json` (numa língua só, se quiser: `{ "pt": "gravada", "en": "kokoro" }`), corre `node gravar-voz.mjs`, que abre uma página em `http://localhost:8795`, ligada só a este PC. A página mostra cada frase do guião em letra grande, com a seguinte por baixo, e grava pelo microfone (espaço para gravar e parar, setas para mudar de frase, O para ouvir). Cada frase fica em `audio/gravada/<passo>-<n>.wav`, sem os primeiros 150 ms e os últimos 300 ms, onde se ouve o clique da tecla; gravar outra vez substitui a anterior. Depois, `node narrar.mjs` trata as gravações como trata as tomadas de uma voz sintética (corta o silêncio, nivela o volume e confere as palavras com o reconhecimento de fala) e diz que frases faltam gravar. A gravação do ecrã adapta-se ao tempo de cada frase como sempre. Uma frase que soa mal grava-se outra vez na página. Pede-lhe um sítio sossegado e, se tiver, um auricular com microfone; as pronúncias e as lacunas do `voz.json` não se aplicam.

Antes de narrar, se o `guiao.json` ainda não tem `voz`, corre `node narrar.mjs --vozes`. O script diz a primeira frase do guião com cada voz gratuita em português de Portugal e grava-a em `audio/vozes/<voz>.wav`. As vozes do Azure só entram com `AZURE_SPEECH_KEY` e `AZURE_SPEECH_REGION`; sem elas, o script diz que as saltou. Pede ao utilizador que as ouça e escolha. A escolhida vai para `motorVoz` e `voz` no `guiao.json`. Num vídeo de cliente só entram vozes cuja licença, na entrada de voz, permite uso comercial; uma licença não comercial só serve para vídeos que não são de clientes.

Num guião com várias línguas, cada língua narra-se à parte, com `--lingua`: `node narrar.mjs --lingua en`, e a frase de teste com `node narrar.mjs --vozes --lingua en`. Em inglês, as vozes gratuitas são as do Kokoro (licença Apache-2.0, local, sem GPU; `npm i kokoro-js`, que na primeira vez descarrega o modelo, cerca de 90 MB) e a `en_GB-cori-high` do Piper (dataset em domínio público). As do Piper com dataset não comercial (`semaine`) ou sem licença no cartão (`alan`, `jenny_dioco`) ficam de fora. O Kokoro dá sempre a mesma frase: uma tomada chega, e uma frase que sai mal corrige-se no texto ou com uma pronúncia. As pronúncias e as lacunas de cada língua ficam separadas no `voz.json`.

`node narrar.mjs` gera um ficheiro por frase e `audio/duracoes.json`. Faz isto antes de gravar: a gravação usa as durações para encaixar cada frase. Só narra o que falta ou mudou; o que já estava bom fica como está.

O script trata de:
- dizer siglas e endereços pelos dicionários de pronúncias, e avisar de cada palavra que pareça estrangeirismo ou sigla sem pronúncia;
- ouvir cada tomada com um reconhecimento de fala local (Whisper `small`, pesos com licença MIT, pelo `@huggingface/transformers`; na primeira vez descarrega o modelo e demora cerca de 80 s a carregar, depois cerca de 1,5 s por tomada) e contar quantas palavras do texto lá estão;
- com o Piper, que não é determinista, gerar quatro tomadas de cada frase, guardá-las em `audio/tomadas/` e ficar com a que diz mais palavras do texto, com peso a mais para a primeira palavra, depois a que não tem ruído no arranque e acaba menos cortada, e por fim a de duração mais próxima da mediana. Se nenhuma das quatro chega a 85% das palavras, ou nenhuma diz a primeira palavra, gera mais quatro;
- cortar o que vem antes da fala e o silêncio depois dela, sem tocar na fala: o corte vai até onde o som desce abaixo de −50 dB, porque as vogais finais átonas e os «s» do português ficam muitas vezes abaixo de −37 dB, e os desvaneceres ficam no silêncio (só um fim que o modelo cortou leva 20 ms de descida); depois nivelar o volume entre frases;
- abrandar a fala conforme o formato.

As correções vêm de três sítios, e a mais específica ganha: `pronuncias.json` da skill (para todos), `~/.start-project-with-trust/voz.json` (o que esta pessoa ensinou e as lacunas que apontou, para todos os vídeos dela; o `pronuncias.json` pessoal antigo continua a ser lido) e `pronuncias` no `guiao.json` (só deste vídeo).

O `voz.json` tem duas partes:

```json
{
  "pronuncias": { "INE": "iné" },
  "lacunas": [
    { "tipo": "estrangeirismo", "termo": "Commons", "diz": "cómons", "visto": "dados-gov-demo, frase 9, 2026-11-25" },
    { "tipo": "fim-cortado", "voz": "pt_PT-tugao-medium", "termo": "aberta", "tomadas": 8, "visto": "dados-gov-demo, frase 3, 2026-11-25" }
  ]
}
```

- `tipo`: `pronuncia`, `estrangeirismo`, `palavra-comida`, `entoacao`, `fim-cortado` ou `ruido`;
- `voz`: a voz em que se ouviu. Sem ela, vale para todas (as pronúncias e os estrangeirismos não dependem da voz);
- `termo`: a palavra ou o trecho onde se ouviu; numa lacuna `fim-cortado`, a última palavra da frase. Sem termo, vale para todas as frases dessa voz;
- a correção: `diz`, como a voz o deve dizer (as legendas ficam com o texto do guião), ou `tomadas`, quantas tomadas gerar nas frases onde aparece;
- `visto`: o vídeo, a frase e a data.

O `narrar.mjs` aplica-as sozinho: um `diz` entra no texto dito, um `tomadas` sobe as tomadas dessas frases, e as frases que uma lacuna nova toca refazem-se na corrida seguinte. Uma correção `diz` sem `voz` sai igual em todas as vozes. Mais tomadas só ajudam no Piper, que não é determinista, e tornam o defeito menos provável sem o garantir. Se ele voltar, a correção passa a ser de texto.

Corrigir com o utilizador. Ele ouve o vídeo com `escuta.md` ao lado e aponta o problema pelo número da frase ou pelo tempo. A cada tipo de reparo corresponde um comando:

| O que ele diz | O que fazes |
|---|---|
| Uma palavra soa mal, ou um termo estrangeiro | `node narrar.mjs --lacuna 9 pronuncia "palavra=como se diz"` (ou `estrangeirismo`): fica no `voz.json` e refaz as frases que a usam, neste vídeo e nos seguintes |
| A entoação errada num trecho | `node narrar.mjs --lacuna 9 entoacao "trecho=o trecho com outra pontuação"` |
| Uma palavra comida | `node narrar.mjs --lacuna 9 palavra-comida palavra` (mais tomadas nas frases que a têm), ou `"palavra=outra grafia"` |
| Um «i» que não existe antes do «ch» («textos» dito «teistos») | `node narrar.mjs --frase 9` e o utilizador escolhe de ouvido uma tomada sem ele (`--tomada`); se nenhuma servir, reescreve a frase sem a palavra. A grafia não resolve: «textos», «têstos» e «têchtos» dão os mesmos fonemas (`tˈeʃtʊʃ`), e o «i» vem do próprio modelo, que também o mete noutras palavras com «e» antes de «ch» («testes», «sexta», «pesca»). «Têxtos» troca o «ch» por um «s», que soa a português do Brasil |
| O fim cortado, ou ruído antes da fala | `node narrar.mjs --lacuna 9 fim-cortado` (mais tomadas nas frases que acabam na mesma palavra) ou `node narrar.mjs --lacuna 9 ruido` (mais tomadas em todas as frases desta voz) |
| Uma frase saiu mal só desta vez | `node narrar.mjs --frase 9`: gera tomadas novas só para essa frase |
| Prefere outra tomada | `node narrar.mjs --frase 9 --tomada 3`: fica com a tomada 3, sem gerar nada |
| O fim continua cortado em todas as tomadas | muda a última palavra da frase no guião e corre `node narrar.mjs` |
| O timbre ou a naturalidade | não se corrige neste motor: propõe outra voz |

Depois de cada correção, o `narrar.mjs` diz se a frase nova cabe no tempo gravado: se cabe, basta `node montar.mjs`; se não, `node gravar.mjs` primeiro. Como não ouves, uma pronúncia pode pedir duas ou três tentativas: propõe uma grafia, o utilizador ouve, e afinas. Quando uma pronúncia ensinada serve a toda a gente (uma sigla, um termo técnico) e estás numa cópia git do repositório, junta-a também a `scripts/pronuncias.json` desta skill, no mesmo commit.

Regras de qualidade:
- **Zero avisos de pronúncia** antes de gravar: reescreve a frase em português ou ensina a pronúncia. Os avisos de estrangeirismo são só da narração em português.
- Reporta quantas frases ficaram com o fim cortado e com ruído retirado (as frases acabadas em vogal átona são as que o Piper mais corta), e as frases abaixo de 90% das palavras, com o que o reconhecimento ouviu. Uma frase que fica abaixo em todas as tomadas reescreve-se (ver «Sem palavras curtas encostadas»); a `escuta.md` mostra o que foi ouvido em cada uma.
- **Pede ao utilizador que ouça** o vídeo com a folha de escuta antes de dar a voz como boa, e indica-lhe as frases com pronúncias e as que ficaram com o fim cortado.
- Cada reparo que possa voltar fica como lacuna no `voz.json`, e não só como tomada nova.
- As vozes do Azure (`"motorVoz": "azure"`, com `pt-PT-RaquelNeural`, `pt-PT-DuarteNeural` ou `pt-PT-FernandaNeural`) entram na frase de teste quando há chave. Fica em «Por preencher»: as variáveis `AZURE_SPEECH_KEY` (a chave do recurso Speech, no portal do Azure, em «Keys and Endpoint») e `AZURE_SPEECH_REGION` (a região do recurso, por exemplo `westeurope`). O caminho Azure do script segue a documentação da API REST mas ainda não correu com uma chave real: na primeira vez, confirma um ficheiro antes de narrar tudo.
- Se nenhuma voz gratuita serve, as pagas ficam na entrada de voz, para quem quiser pagar, e só entram a pedido do utilizador, com o custo dito à partida. Entre elas está a API da Fish Audio, paga à utilização e com um modelo a 0 USD. O português não está confirmado nas páginas dela e o `narrar.mjs` ainda não a suporta: entra pelo passo 3, com uma frase de teste que o utilizador ouve antes de narrar tudo, e com a licença confirmada (o plano gratuito da aplicação é só para uso não comercial).

### 4.3 Gravação

Com `scripts/*` copiado para `video/<nome>/` (antes de narrar), escreve `gravar.mjs` com o estúdio e corre `node gravar.mjs`:

```js
import { abrirEstudio } from './estudio.mjs';
const e = await abrirEstudio();          // lê guiao.json, aquece o site, abre o browser a gravar
const { page, guiao } = e;
await e.passo('01-gancho', async () => { await e.abrir(undefined, { cena: 'gancho' }); await e.narrar(); }); // o cartão revela a cena
await e.passo('02-pesquisar', async () => {        // "etiqueta" e "manchete" deste passo entram quando a cena sai
  await e.semCena();
  await e.narrar();                                        // 1.ª frase: «Para encontrar dados, basta escrever um tema.»
  await e.clicar(page.getByRole('button', { name: 'Pesquisar' }), { ate: page.locator('#campo') }); // confirma que o campo abriu
  await e.zoom(page.locator('#campo'), { fator: 1.5 });    // marca para a montagem
  await e.narrar();                                        // 2.ª frase: «Vamos procurar bibliotecas.»
  await e.clicar(page.locator('#campo'));
  await e.escrever('bibliotecas');
  await e.navegar(() => e.tecla('Enter'), { url: /resultados/, visivel: 'a.resultado' });
});
await e.passo('05-outra-app', async () => { await e.irPara('https://outra.app.exemplo/', { visivel: 'main h1' }); await e.narrar(); });
await e.passo('06-apelo', async () => { await e.cena('apelo'); await e.narrar(); });
await e.passo('07-marca', async () => { await e.cena('marca'); await e.pausa(4000); }); // a cena nova entra por cima da anterior
await e.terminar();                      // grava bruto.webm e tempos.json
```

O estúdio dá: `abrir(url, { cena })`, `mover(alvo)`, `clicar(alvo)`, `escrever(texto)`, `tecla(nome)`, `percorrerAte(locator)`, `percorrer(px)`, `titulo(texto)`, `esconderTitulo()`, `zoom(alvo, { fator })`, `zoomFora()`, `navegar(acao, { url, visivel })`, `irPara(url, { visivel })`, `cena(id)`, `semCena()`, `etiqueta(texto, sobre)`, `manchete(texto)`, `semManchete()`, `fecho()`, `narrar()`, `ateFrase(ms)`, `ateNarracao(ms)`, `pausa(ms)`, `destacar(locator)`, `retirarDestaque()`, `terminar()`. Um alvo é um locator do Playwright ou `{ x, y }`. `e.lingua` diz a língua da corrida, para os locators que dependem do texto do site (`L('Pesquisar', 'Search')`); prefere locators que não dependem dele (ids, `href`).

Numa língua que não é a principal, o mesmo script corre com `node gravar.mjs --lingua en`: abre o `url` dessa língua, usa o `locale` dela e as frases dela, e grava em `en/gravacao/`.

Regras de qualidade:
- Cada `narrar()` vem **antes** da ação a que a frase se refere e encaixa a frase seguinte do passo (se a anterior ainda vai a meio, espera por ela); as que não encaixares seguem-se à última. `abrir()` encaixa a primeira frase ainda sobre o cartão.
- `navegar()` muda de página no fim da frase em curso: chama-o logo a seguir ao `narrar()` da frase que acaba no clique, e o `narrar()` da frase seguinte logo depois dele.
- `percorrerAte()` não faz nada se o alvo já está à vista, e `mover()` só faz scroll se menos de 70% do alvo estiver no ecrã. `percorrer(px)` às cegas fica para casos sem alvo. No fim, `gravar.mjs` imprime os scrolls que houve e em que passo: se aparecer um que o guião não previa, corrige o guião ou a ordem das ações.
- As esperas são por elementos (`visivel`), não por tempo. O tempo que o site demora debaixo do cartão ou da imagem parada sai na montagem. Um clique que abre algo leva `ate`: `e.clicar(botao, { ate: campo })` confirma que o campo apareceu e, se a página ainda estava a acordar, clica outra vez.
- O login, se existir, faz-se de uma de duas maneiras, e nunca com o valor no ficheiro. Com MFA ou várias aplicações da mesma conta (por exemplo Microsoft 365): o utilizador corre `node entrar.mjs`, entra à mão na janela que abre, com a conta de teste, abre as aplicações que o vídeo mostra e carrega em Enter; a sessão fica em `~/.start-project-with-trust/sessoes/<site>.json` (cookies, `localStorage` e IndexedDB) e em `<site>.sessionstorage.json` (o `sessionStorage`, que o Playwright não guarda e onde as aplicações Microsoft 365 costumam ter a sessão), e o guião usa-a com `"sessao": true`. Quando a sessão expira, corre-se outra vez `node entrar.mjs`. Sem MFA: um passo com `e.escrever(process.env.NOME_DA_VARIAVEL)`. Abre as capturas de `gravacao/` e confirma que não aparecem dados pessoais nem credenciais; se aparecerem, usa a conta de teste ou desfoca na montagem.
- **Cenas e gráficos.** Uma cena entra no início do passo e a narração dele fala por cima; o ritmo das animações segue a duração dessa narração. Duas cenas seguidas não deixam a página espreitar. O nome da secção e a frase-chave saem durante as cenas e voltam a seguir. Um passo que começa com uma cena no ecrã só mostra a sua etiqueta e a sua manchete depois de `semCena()`; um passo que começa a mudar de página (`navegar()` ou `irPara()` antes de qualquer `narrar()`) troca-as quando a página nova aparece. Um zoom ainda ativo fica pelo menos 1,5 s antes de a página mudar.

### 4.4 Montagem

`node montar.mjs` (com `--lingua en` para as outras línguas) alinha o relógio do script com o vídeo pelos momentos escuros (cartões), retira os tempos mortos, junta a narração num só WAV com cada frase no seu tempo, gera `legendas.srt` com uma legenda por frase, aplica o zoom das marcas com o `zoompan` do ffmpeg, grava as legendas na imagem numa caixa da cor do vídeo, põe por cima o nome da secção e a frase-chave (desenhados pelo Chromium à resolução de saída, por isso fora do zoom), normaliza o volume para −16 LUFS e exporta `final/<nome>[-<lingua>]-<largura>x<altura>.mp4` (H.264, AAC a 48 kHz, 25 fps).

A música entra com `musica` no guião e só com `licenca` e `fonte` escritas. Ajusta-se à duração do vídeo, entra e sai em desvanecer, fica a −27 LUFS antes da mistura e desce quando a voz fala (`sidechaincompress`, com a narração adiantada 0,25 s como sinal). Assim já está em baixo quando entra a primeira sílaba. Antes descia depois dela, e as consoantes fracas do arranque («f», «s») e as palavras curtas («O», «As») ficavam por baixo da música: a frase ouvia-se cortada no início. O script mede-a no fim: cerca de 18 dB abaixo da voz enquanto ela fala, 7 a 9 dB abaixo nas pausas, e o nível nos primeiros 200 ms de cada frase, com aviso se aí ficar a menos de 12 dB da voz. Sem música com licença, fica em «Por preencher» e o vídeo sai só com voz.

Escreve também `escuta.md`, a folha de escuta, e o pacote para publicar em `final/`: as legendas em `.srt`, a miniatura a 1280x720 tirada do passo `publicar.miniatura`, e `<nome>-publicar.md` com o título, a descrição, os capítulos (dos passos com `capitulo`; o primeiro em 0:00, com aviso se houver menos de 3 ou algum abaixo de 10 s, as regras do YouTube) e o crédito da música que a licença pede. Imprime a duração, os pontos de sincronização, os silêncios, os scrolls, os zooms, as cenas, os gráficos e o nível da música.

### 4.5 Prova

- O vídeo abre e toca do princípio ao fim, e a duração está dentro do formato.
- Para a sincronização, extrai um fotograma 0,5 s depois do início de cada frase (ou de três, num vídeo longo) e confirma que no ecrã está aquilo de que a frase fala: cada coisa que a frase nomeia está à vista nesse fotograma ou no seguinte.
- Para a câmara, lê os avisos de zoom do `montar.mjs`: nenhum salto entre lados opostos do ecrã em menos de 3 s.
- Para o ritmo, lê os silêncios entre frases que o `montar.mjs` lista. Dentro de um passo ficam perto da pausa do formato; acima de 2 s só numa mudança de página, e nesse caso vê se a frase seguinte pode entrar mais cedo ou acompanhar a ação.
- Para as transições, extrai fotogramas a 5 por segundo à volta de cada mudança de página e confirma que não há fotogramas pequenos, cinzentos ou escuros fora dos cartões.
- Para o scroll, lê a lista que o `montar.mjs` imprime com o passo de cada um; cada scroll tem uma frase que o justifica e não há dois seguidos em sentidos opostos.
- Para a voz, junta o que o `narrar.mjs` reportou ao pedido para o utilizador ouvir, e entrega-lhe o vídeo com `escuta.md`.
- Nenhum segredo nem dado pessoal aparece em nenhum fotograma, e as legendas correspondem ao guião.
- Para as cenas e os gráficos, fotogramas a 5 por segundo à volta da entrada e da saída de cada cena (sem a página a espreitar entre duas cenas) e um fotograma com zoom em cada passo com etiqueta (o nome da secção e a frase-chave inteiros, sem corte nem ampliação).
- Para a música, o nível que o `montar.mjs` mediu, com voz e nas pausas, e a licença com o crédito em `<nome>-publicar.md`. Quem decide se está alta ou baixa é o ouvido do utilizador.
- Em cada língua, as mesmas provas: duração, sincronização, silêncios e fotogramas.
- Para a humanização, a saída final do verificador sobre o guião e a revisão do vídeo final com a secção «Vídeo e voz» de `../humanizar/marcas.md` (voz, cursor, zoom e scroll), com os achados que ficaram e porquê.
Cola os comandos corridos, as durações e os caminhos dos ficheiros.

## Relatório

- O formato, o estilo, as línguas, a duração de cada vídeo e o guião final.
- As ferramentas, as vozes e a música usadas, com a licença de cada uma e a fonte, o crédito que a música pede, e as lacunas registadas no `voz.json` neste vídeo.
- As provas, segmento a segmento, com os números; e o que fica para o ouvido do utilizador.
- As entradas novas registadas e o que ficou por preencher.


## Documentação

Se a skill `documentacao` estiver instalada (existe `../documentacao/SKILL.md`), no fim de um trabalho com resultado escreve o relatório do processo, como diz o modo «processo» dela. Uma consulta sem alterações não leva relatório.

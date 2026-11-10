---
name: gravacao-video
description: Mini skill para gravar vídeos de um site: teaser, demonstração ou explicação detalhada, com narração em português de Portugal, legendas, cartões de abertura e fecho, cursor visível a mover-se e a clicar, zoom ao que a narração refere, scroll suave e transições. Grava o browser com Playwright a seguir um guião, com os scripts prontos da pasta scripts/, usa credenciais só de variáveis de ambiente, gera a voz com uma opção gratuita (Piper pt_PT ou o escalão gratuito do Azure), monta e exporta com ffmpeg. Usar quando se quer mostrar um site ou uma funcionalidade em vídeo.
argument-hint: "URL do site, formato (teaser, demo, explicação), estilo (apresentação ou sóbrio) e guião, ou nada para perguntar"
---

# GravacaoVideo

O conhecimento está em `../start-project-with-trust/knowledge/ia/multimodal/` (relativo à pasta deste `SKILL.md`): `voz-tts-e-stt.md` para a voz, `gravacao-do-browser-com-playwright.md` para a gravação e `montagem-e-exportacao-com-ffmpeg.md` para a montagem e a exportação. Se `~/.start-project-with-trust/knowledge/ia/multimodal/` tiver uma entrada com o mesmo caminho, vale a pessoal. Os scripts em `scripts/` (relativo à pasta deste `SKILL.md`) aplicam essas entradas; o que fizeres fora deles passa pelo passo 3 e fica registado.

## Regras

- Seguem-se as regras da secção «Regras em todas as fases» de `../start-project-with-trust/SKILL.md`: cada facto cita o ficheiro da base ou o URL da fonte; os factos verificas tu, as decisões são do utilizador; uma pergunta de cada vez, no formato da Fase 1; sem marcas de escrita de IA no guião, nos títulos e nas legendas; autonomia depois da decisão, com o que só o utilizador pode dar (credenciais, marca, música licenciada) em «Por preencher».
- Credenciais vêm de variáveis de ambiente, lidas pelo script de gravação. Nunca ficam no guião, no briefing, nos ficheiros do projeto nem no vídeo. Sempre que possível grava-se com uma conta de teste.
- Licenças antes de instalar: cada ferramenta e cada voz entram só depois de leres a licença na página oficial e de a registares. Um modelo de voz com licença não comercial não entra em vídeos de clientes sem os termos confirmados (ver a entrada de voz).
- A narração é contínua, como numa apresentação: frases encadeadas com uma pausa curta entre elas e uma folga no fim de cada passo (ambas pelo formato, ver o passo 1), e as ações do cursor acontecem enquanto a voz fala. Cada frase encaixa-se no momento certo (`await e.narrar()` antes da ação a que se refere); só se espera pelo fim de uma frase para mudar de página. O guião escreve-se em frases curtas, uma por ação, com frases de ligação («Abrimos o primeiro.») onde o cursor vai fazer algo.
- O modelo e o effort seguem `../orchestrate-sessions/modelo-e-effort.md`: o guião e o desenho das transições são «Design e interface» ao nível pedido; a gravação e a montagem são «Construir»; a leitura de documentação é `haiku low`.

## 1. O que vamos gravar?

Se o pedido já o diz, passa ao passo 2. Se não, pergunta numa só pergunta: o URL, o que mostrar, o público, se é preciso login (e em que variáveis de ambiente estão as credenciais), o formato e o estilo.

Formatos, com a duração de cada um:
1. **Teaser**: até 30 segundos, sem explicação, só o essencial com títulos.
2. **Demonstração**: 1 a 3 minutos, um fluxo completo narrado.
3. **Explicação detalhada**: 3 a 10 minutos, funcionalidade a funcionalidade, com legendas.

Estilos:
1. **Apresentação** (por omissão): cartão de abertura e de fecho, cursor visível com movimento suave e onda a cada clique, zoom a 1,5x ao que a narração refere, scroll suave, dissolve entre páginas (a última imagem da página antiga desvanece sobre a nova, com um leve zoom), títulos em terço inferior. O destaque faz-se com o cursor e o zoom; caixas coloridas à volta de elementos só se o utilizador as pedir. Saída a 1920x1080, gravada a 2x para o zoom ficar nítido.
2. **Sóbrio**: sem cartões nem cursor; títulos, caixas e cortina escura entre páginas. Saída na resolução da janela.

O ritmo segue o formato e pode afinar-se no `guiao.json`: teaser com 0,25 s entre frases e 0,4 s de folga; demonstração com 0,5 s e 0,9 s e movimentos 1,3x mais lentos; explicação com 0,7 s e 1,2 s e movimentos 1,5x mais lentos.

Com a resposta, escreves o guião: uma tabela com passo, ação no browser (incluindo o que o cursor faz e onde há zoom), texto da narração e o que aparece no ecrã, e pedes validação antes de gravar. Textos finais que faltem ficam em «Por preencher».

## 2. Ler só o que interessa

Lê as três entradas de `ia/multimodal/`. Na de voz, aplica a linha «Para uma skill»: primeiro uma voz local gratuita (Piper, voz `pt_PT-tugão-medium`), depois o escalão gratuito do Azure com uma voz pt-PT; ouve a voz antes de a dar como escolhida (tu não a ouves: pede ao utilizador) e conta os caracteres do guião face ao limite mensal do escalão gratuito. Nas de gravação e montagem, lê as linhas «Para uma skill» e as armadilhas conhecidas (escala a 2x, scripts de início antes do `<head>`, sites de página única em que a navegação não cria documento novo, sites que limpam os filhos de `<html>`, diálogos na camada de topo, `scroll-behavior: smooth`, caminhos com acentos no Piper).

## 3. Se a biblioteca não tem a resposta

Os scripts cobrem gravação, narração com Piper, montagem e exportação em MP4. Quando precisares de algo fora disso (outra voz, música, outro formato de saída, uma ferramenta de vídeo programático como Remotion ou Motion Canvas), antes de instalar ou usar:

1. Lê a documentação oficial e a licença no site do próprio projeto. Não contornes bloqueios: se uma fonte recusar o acesso automático, pede ao utilizador o conteúdo ou regista-a como não lida.
2. Dá a cada facto a confiança segundo os critérios de `../update-knowledge/SKILL.md`. Um facto `baixa` não serve de base.
3. Regista antes de usar: numa cópia git do repositório, propõe uma entrada nova ou uma edição em `ia/multimodal/` no formato do passo 3 de `../update-knowledge/SKILL.md`, e só a escreves com aprovação; fora disso, no conhecimento pessoal (`~/.start-project-with-trust/knowledge/ia/multimodal/<slug>.md`, fonte em `FONTES.md` pessoal, linha no `CHANGELOG.md` pessoal). Se o que encontraste substitui o que uma entrada diz, segue a regra de edição da `update-knowledge`, com o texto anterior no «Histórico». Se mudaste um script de `scripts/`, a alteração entra na skill com a razão no commit.
4. Diz ao utilizador que fontes leste, que licenças confirmaste e o que registaste.

## Onde fica cada coisa

Tudo vive em `video/<nome-do-video>/`, no projeto:
- `guiao.md`: a tabela do passo 1, validada;
- `guiao.json`: o que os scripts leem (ver o passo 4);
- `estudio.mjs`, `narrar.mjs`, `montar.mjs`, `comum.mjs`: cópias de `scripts/` desta skill, sem alterações;
- `gravar.mjs`: o script deste vídeo, escrito sobre o estúdio; lê as credenciais do ambiente;
- `gravacao/`: o vídeo bruto, uma captura JPEG por passo, `tempos.json` (o relógio da gravação) e `filtro.txt` (o filtro ffmpeg usado);
- `audio/`: um ficheiro por passo, com o nome do passo, `duracoes.json` e a narração completa;
- `legendas.srt`: geradas a partir do guião;
- `final/`: as exportações, uma por formato e resolução.
O projeto precisa de `playwright` e `ffmpeg-static` no `package.json` e do Piper em `ferramentas/piper/` (ou nas variáveis `PIPER_EXE`, `PIPER_MODELO` e `PIPER_ESPEAK`). Nada desta pasta vai para o repositório com segredos; `.gitignore` exclui `ferramentas/`, `gravacao/*.webm` e `audio/narracao.wav`.

## 4. Gravar, montar e provar

1. **Preparar.** Copia `scripts/*.mjs` para `video/<nome>/` e escreve `guiao.json`:
   - `nome`, `url`, `formato` (`teaser`, `demonstracao` ou `explicacao`: define o ritmo), `largura` e `altura` da janela (1280x720 por omissão), `escala` (2 no estilo apresentação, 1 no sóbrio), `saida` (`{ "largura": 1920, "altura": 1080 }`), `estilo` (`apresentacao` ou `sobrio`), `voz`, e para afinar o ritmo do formato: `pausaFrases` (segundos entre frases seguidas), `folga` (depois da última frase de cada passo) e `ritmo` (multiplicador da duração dos movimentos); `cores` (`fundo` e `realce`, opcionais);
   - `capa` e `fecho`, cada um com `titulo` e `subtitulo` (a `capa` também `segundos`, 2,5 por omissão, e `narrarAntes`, os segundos de voz ainda sobre o cartão, 1,5 por omissão);
   - `passos`: lista de `{ "id": "01-...", "narracao": "..." }`, com o texto exato do guião. A narração divide-se em frases pela pontuação final (ou por `|`, se quiseres forçar a divisão).
2. **Narrar.** `node narrar.mjs` gera `audio/<passo>-<n>.wav` por frase com o Piper e `audio/duracoes.json`. Faz isto antes de gravar: a gravação usa as durações para encaixar cada frase e esperar pelo fim dela.
3. **Gravar.** Escreve `gravar.mjs` com o estúdio e corre `node gravar.mjs`:
   ```js
   import { abrirEstudio } from './estudio.mjs';
   const e = await abrirEstudio();          // lê guiao.json, aquece o site, abre o browser a gravar
   const { page, guiao } = e;
   await e.passo('01-inicio', async () => { await e.abrir(); await e.titulo('Nome do site'); });
   await e.passo('02-pesquisar', async () => {
     await e.narrar();                                        // 1.ª frase: «Para encontrar dados, basta escrever um tema.»
     await e.clicar(page.getByRole('button', { name: 'Pesquisar' }));
     await e.zoom(page.locator('#campo'), { fator: 1.5 });    // marca para a montagem
     await e.clicar(page.locator('#campo'));
     await e.narrar();                                        // 2.ª frase: «Vamos procurar bibliotecas.»
     await e.escrever('bibliotecas');
     await e.navegar(() => e.tecla('Enter'), { url: /resultados/, visivel: 'a.resultado' });
   });
   await e.passo('06-fecho', async () => { await e.fecho(); await e.narrar(); });
   await e.terminar();                      // grava bruto.webm e tempos.json
   ```
   O estúdio dá: `abrir(url)`, `mover(alvo)`, `clicar(alvo)`, `escrever(texto)`, `tecla(nome)`, `percorrer(px)`, `percorrerAte(locator)`, `destacar(locator)`, `retirarDestaque()`, `titulo(texto)`, `esconderTitulo()`, `zoom(alvo, { fator })`, `zoomFora()`, `navegar(acao, { url, visivel })`, `fecho()`, `narrar()`, `ateFrase(ms)`, `ateNarracao(ms)`, `pausa(ms)`, `terminar()`. Um alvo é um locator do Playwright ou `{ x, y }`. Cada `narrar()` encaixa a frase seguinte do passo no momento em que é chamado (se a anterior ainda vai a meio, espera por ela); as frases que não encaixares seguem-se à última. `abrir()` encaixa a primeira frase ainda sobre o cartão. As esperas são por elementos (`visivel`), não por tempo. O zoom sai sozinho antes de mudar de página e antes do fecho; um título com zoom ativo pode ficar fora do enquadramento, por isso não os juntes. O login, se existir, é um passo com `e.escrever(process.env.NOME_DA_VARIAVEL)` e nunca com o valor no ficheiro. Antes de seguir, abre as capturas de `gravacao/` e confirma que não aparecem dados pessoais nem credenciais; se aparecerem, usa a conta de teste ou desfoca na montagem.
4. **Montar e exportar.** `node montar.mjs` alinha o relógio do script com o vídeo pelos momentos escuros (cartões), retira os tempos mortos (página lenta debaixo do cartão ou da ponte), junta a narração num só WAV com cada frase no seu tempo, gera `legendas.srt` com uma legenda por frase, aplica o zoom das marcas com o `zoompan` do ffmpeg, grava as legendas na imagem e exporta `final/<nome>-<largura>x<altura>.mp4` (H.264, AAC, 25 fps). Imprime a duração, os pontos de sincronização e os zooms. A música só entra com licença confirmada ou fica em «Por preencher».
5. **Provar.** O vídeo abre e toca do princípio ao fim; a duração está dentro do formato; o áudio coincide com a ação no ecrã nos passos em que a narração refere algo visível (extrai um fotograma 0,5 s depois do início de três narrações e vê o que está no ecrã); o cursor e o zoom aparecem onde o guião diz; não há escuro acima de 1 s fora dos cartões; nenhum segredo nem dado pessoal aparece em nenhum frame (percorre as capturas dos passos de login e de dados); as legendas correspondem ao guião. Cola os comandos corridos, as durações e os caminhos dos ficheiros.

## Relatório

- O formato, o estilo, a duração e o guião final.
- As ferramentas e a voz usadas, com a licença de cada uma e a fonte.
- As provas: reprodução, duração, sincronização, cursor e zoom, ausência de segredos, legendas.
- As entradas novas registadas e o que ficou por preencher.

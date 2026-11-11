---
name: gravacao-video
description: Mini skill para gravar vídeos de um site: teaser, demonstração ou explicação detalhada, com narração em português de Portugal, legendas, cartões de abertura e fecho, cursor visível a mover-se e a clicar, zoom ao que a narração refere e transições. Trabalha por segmentos (guião, voz, gravação, montagem, prova), cada um com regras de qualidade que os scripts da pasta scripts/ aplicam e verificam. Grava o browser com Playwright, usa credenciais só de variáveis de ambiente, gera a voz com uma opção gratuita (Piper pt_PT ou o escalão gratuito do Azure), monta e exporta com ffmpeg. Usar quando se quer mostrar um site ou uma funcionalidade em vídeo.
argument-hint: "URL do site, formato (teaser, demo, explicação), estilo (apresentação ou sóbrio) e guião, ou nada para perguntar"
---

# GravacaoVideo

O conhecimento está em `../start-project-with-trust/knowledge/ia/multimodal/` (relativo à pasta deste `SKILL.md`): `voz-tts-e-stt.md` para a voz, `gravacao-do-browser-com-playwright.md` para a gravação e `montagem-e-exportacao-com-ffmpeg.md` para a montagem e a exportação. Se `~/.start-project-with-trust/knowledge/ia/multimodal/` tiver uma entrada com o mesmo caminho, vale a pessoal. Os scripts em `scripts/` (relativo à pasta deste `SKILL.md`) aplicam essas entradas; o que fizeres fora deles passa pelo passo 3 e fica registado.

## Regras

- Seguem-se as regras da secção «Regras em todas as fases» de `../start-project-with-trust/SKILL.md`: cada facto cita o ficheiro da base ou o URL da fonte; os factos verificas tu, as decisões são do utilizador; uma pergunta de cada vez, no formato da Fase 1; sem marcas de escrita de IA no guião, nos títulos e nas legendas; autonomia depois da decisão, com o que só o utilizador pode dar (credenciais, marca, música licenciada) em «Por preencher».
- Credenciais vêm de variáveis de ambiente, lidas pelos scripts. Nunca ficam no guião, no briefing, nos ficheiros do projeto nem no vídeo. Sempre que possível grava-se com uma conta de teste.
- Licenças antes de instalar: cada ferramenta e cada voz entram só depois de leres a licença na página oficial e de a registares. Um modelo de voz com licença não comercial não entra em vídeos de clientes sem os termos confirmados (ver a entrada de voz).
- Tu não ouves o áudio. O que os scripts medem (ruído no arranque, fins cortados, pronúncias por rever, silêncios) reportas com números; o que só o ouvido decide (timbre, naturalidade, uma palavra mal dita) pedes ao utilizador que ouça, e dizes-lhe em que frases.
- O modelo e o effort seguem `../orchestrate-sessions/modelo-e-effort.md`: o guião e o desenho das transições são «Design e interface» ao nível pedido; a gravação e a montagem são «Construir»; a leitura de documentação é `haiku low`.

## 1. O que vamos gravar?

Se o pedido já o diz, passa ao passo 2. Se não, pergunta numa só pergunta: o URL, o que mostrar, o público, se é preciso login (e em que variáveis de ambiente estão as credenciais), o formato e o estilo.

Formatos. O formato define a duração e o ritmo (a fala, as pausas e a velocidade do cursor):

| Formato | Duração | Entre frases | Folga por passo | Movimentos | Fala |
|---|---|---|---|---|---|
| `teaser` | até 30 s | 0,25 s | 0,4 s | normais | normal |
| `demonstracao` | 1 a 3 min | 0,5 s | 0,9 s | 1,3x mais lentos | 8% mais lenta |
| `explicacao` | 3 a 10 min | 0,7 s | 1,2 s | 1,5x mais lentos | 12% mais lenta |

Estilos:
1. **Apresentação** (por omissão): cartão de abertura e de fecho, cursor visível com movimento suave e onda discreta a cada clique, zoom a 1,5x ao que a narração refere, dissolve entre páginas (a última imagem da página antiga desvanece sobre a nova, com um leve zoom), títulos em terço inferior. O destaque faz-se com o cursor e o zoom; caixas coloridas à volta de elementos só se o utilizador as pedir. Saída a 1920x1080, gravada a 2x para o zoom ficar nítido.
2. **Sóbrio**: sem cartões nem cursor; títulos, caixas e cortina escura entre páginas. Saída na resolução da janela.

## 2. Ler só o que interessa

Lê as três entradas de `ia/multimodal/`. Na de voz, aplica a linha «Para uma skill»: primeiro uma voz local gratuita (Piper, voz `pt_PT-tugão-medium`), depois o escalão gratuito do Azure com uma voz pt-PT; conta os caracteres do guião face ao limite mensal do escalão gratuito. Nas de gravação e montagem, lê as linhas «Para uma skill» e as armadilhas conhecidas (escala a 2x, scripts de início antes do `<head>`, sites de página única em que a navegação não cria documento novo, sites que limpam os filhos de `<html>`, diálogos na camada de topo, `scroll-behavior: smooth`, caminhos com acentos no Piper, fins de frase cortados pelo Piper).

## 3. Se a biblioteca não tem a resposta

Os scripts cobrem gravação, narração com Piper ou Azure, montagem e exportação em MP4. Quando precisares de algo fora disso (outra voz, música, outro formato de saída, uma ferramenta de vídeo programático como Remotion ou Motion Canvas), antes de instalar ou usar:

1. Lê a documentação oficial e a licença no site do próprio projeto. Não contornes bloqueios: se uma fonte recusar o acesso automático, pede ao utilizador o conteúdo ou regista-a como não lida.
2. Dá a cada facto a confiança segundo os critérios de `../update-knowledge/SKILL.md`. Um facto `baixa` não serve de base.
3. Regista antes de usar: numa cópia git do repositório, propõe uma entrada nova ou uma edição em `ia/multimodal/` no formato do passo 3 de `../update-knowledge/SKILL.md`, e só a escreves com aprovação; fora disso, no conhecimento pessoal (`~/.start-project-with-trust/knowledge/ia/multimodal/<slug>.md`, fonte em `FONTES.md` pessoal, linha no `CHANGELOG.md` pessoal). Se o que encontraste substitui o que uma entrada diz, segue a regra de edição da `update-knowledge`, com o texto anterior no «Histórico». Se mudaste um script de `scripts/`, a alteração entra na skill com a razão no commit.
4. Diz ao utilizador que fontes leste, que licenças confirmaste e o que registaste.

## Onde fica cada coisa

Tudo vive em `video/<nome-do-video>/`, no projeto:
- `guiao.md`: a tabela do passo 4.1, validada;
- `guiao.json`: o que os scripts leem (ver o passo 4.1);
- `estudio.mjs`, `narrar.mjs`, `montar.mjs`, `comum.mjs`: cópias de `scripts/` desta skill, sem alterações;
- `gravar.mjs`: o script deste vídeo, escrito sobre o estúdio; lê as credenciais do ambiente;
- `audio/`: um ficheiro por frase (`<passo>-<n>.wav`), `duracoes.json` e a narração completa;
- `gravacao/`: o vídeo bruto, uma captura JPEG por passo, `tempos.json` (o relógio da gravação) e `filtro.txt` (o filtro ffmpeg usado);
- `legendas.srt`: geradas a partir do guião;
- `final/`: as exportações, uma por formato e resolução.
O projeto precisa de `playwright` e `ffmpeg-static` no `package.json` e do Piper em `ferramentas/piper/` (ou nas variáveis `PIPER_EXE`, `PIPER_MODELO` e `PIPER_ESPEAK`). Nada desta pasta vai para o repositório com segredos; `.gitignore` exclui `ferramentas/`, `gravacao/*.webm` e `audio/narracao.wav`.

## 4. Produzir, segmento a segmento

Cada segmento tem as suas regras de qualidade e só passa ao seguinte quando as cumpre. Um defeito corrige-se no segmento onde nasce: uma palavra mal dita corrige-se no guião ou nas pronúncias, e não na montagem.

### 4.1 Guião

Escreves `guiao.md`, uma tabela com passo, ação no browser (o que o cursor faz, onde há zoom, onde há scroll), a narração frase a frase e o que aparece no ecrã, e pedes validação antes de gravar. Textos finais que faltem ficam em «Por preencher». Depois passas o mesmo para `guiao.json`.

Regras de qualidade:
- **Uma frase por ação**, curta (até 16 palavras), dita antes da ação a que se refere: a voz vai à frente do cursor. Onde o cursor vai clicar, uma frase de ligação («Abrimos o primeiro.»).
- **Uma mudança de página pede duas frases**: uma que acaba no clique («No menu principal está a secção Reutilizações.») e outra que começa já na página nova («Reúne aplicações e estudos feitos com estes dados.»). Uma frase só, longa, deixa o ecrã parado enquanto se fala do que ainda não se vê.
- **Português corrente.** Termos estrangeiros mostram-se no ecrã (zoom, título) e dizem-se em português: «a licença é aberta», com o zoom em «Creative Commons». A voz sintética lê inglês com fonética portuguesa e soa mal.
- **Siglas, endereços e nomes** dizem-se como se leem. As siglas correntes e os endereços (`dados.gov.pt`) o script trata; o resto vai para `pronuncias` no `guiao.json` (`{ "INE": "iné", "Nuxt": "nâcst" }`). As legendas ficam com a grafia original.
- **Scroll só com propósito**: quando o que a frase refere não está à vista, e no máximo um por página. Nunca scroll para «mostrar a página». Um regresso ao topo para usar o menu conta como scroll e leva uma frase.
- **Zoom e título não se juntam**, o zoom sai antes de o cursor ir para longe, e um zoom fica pelo menos o tempo de uma frase: entrar e sair logo a seguir incomoda.

`guiao.json`:
- `nome`, `url`, `formato` (`teaser`, `demonstracao` ou `explicacao`), `estilo` (`apresentacao` ou `sobrio`), `largura` e `altura` da janela (1280x720), `escala` (2 no estilo apresentação, 1 no sóbrio), `saida` (`{ "largura": 1920, "altura": 1080 }`);
- `capa` e `fecho`, cada um com `titulo` e `subtitulo` (a `capa` também `segundos`, 2,5 por omissão, e `narrarAntes`, os segundos de voz ainda sobre o cartão, 1,5 por omissão);
- `passos`: lista de `{ "id": "01-...", "narracao": "..." }`, com o texto exato do guião. A narração divide-se em frases pela pontuação final (ou por `|`, para forçar a divisão);
- voz: `motorVoz` (`piper` por omissão, ou `azure`), `voz`, `pronuncias`, `vozOpcoes` (`length_scale`, `noise_w`, `noise_scale`, `tomadas`);
- para afinar o ritmo do formato: `pausaFrases`, `folga`, `ritmo` (multiplicador da duração dos movimentos); `cores` (`fundo` e `realce`).

### 4.2 Voz

`node narrar.mjs` gera um ficheiro por frase e `audio/duracoes.json`. Faz isto antes de gravar: a gravação usa as durações para encaixar cada frase.

O script trata de:
- dizer siglas e endereços pelo dicionário, e avisar de cada palavra que pareça estrangeirismo ou sigla sem pronúncia;
- com o Piper, que não é determinista, gerar quatro tomadas de cada frase e ficar com a que não tem ruído no arranque, acaba menos cortada e tem a duração mais próxima da mediana (uma tomada curta engoliu sílabas);
- cortar o que vem antes da fala, entrar e sair com um desvanecer curto (mais longo quando o modelo cortou a última vogal) e nivelar o volume entre frases;
- abrandar a fala conforme o formato.

Regras de qualidade:
- **Zero avisos de pronúncia** antes de gravar: reescreve a frase em português ou junta a palavra a `pronuncias`.
- Reporta quantas frases ficaram com o fim cortado e com ruído retirado. Se uma frase ficar cortada em todas as tomadas, muda a última palavra (as frases acabadas em vogal átona são as que o Piper mais corta).
- **Pede ao utilizador que ouça** `audio/narracao.wav` ou o vídeo antes de dar a voz como boa, e indica-lhe as frases com pronúncias e as que ficaram com o fim cortado.
- Para vídeos de clientes, ou quando o utilizador não fica satisfeito com o Piper, propõe o Azure: `"motorVoz": "azure"` e `"voz": "pt-PT-RaquelNeural"` (ou `pt-PT-DuarteNeural`, `pt-PT-FernandaNeural`). Fica em «Por preencher»: as variáveis `AZURE_SPEECH_KEY` (a chave do recurso Speech, no portal do Azure, em «Keys and Endpoint») e `AZURE_SPEECH_REGION` (a região do recurso, por exemplo `westeurope`). O caminho Azure do script segue a documentação da API REST mas ainda não correu com uma chave real: na primeira vez, confirma um ficheiro antes de narrar tudo.

### 4.3 Gravação

Copia `scripts/*.mjs` para `video/<nome>/`, escreve `gravar.mjs` com o estúdio e corre `node gravar.mjs`:

```js
import { abrirEstudio } from './estudio.mjs';
const e = await abrirEstudio();          // lê guiao.json, aquece o site, abre o browser a gravar
const { page, guiao } = e;
await e.passo('01-inicio', async () => { await e.abrir(); await e.titulo('Nome do site'); });
await e.passo('02-pesquisar', async () => {
  await e.narrar();                                        // 1.ª frase: «Para encontrar dados, basta escrever um tema.»
  await e.clicar(page.getByRole('button', { name: 'Pesquisar' }));
  await e.zoom(page.locator('#campo'), { fator: 1.5 });    // marca para a montagem
  await e.narrar();                                        // 2.ª frase: «Vamos procurar bibliotecas.»
  await e.clicar(page.locator('#campo'));
  await e.escrever('bibliotecas');
  await e.navegar(() => e.tecla('Enter'), { url: /resultados/, visivel: 'a.resultado' });
});
await e.passo('06-fecho', async () => { await e.fecho(); await e.narrar(); });
await e.terminar();                      // grava bruto.webm e tempos.json
```

O estúdio dá: `abrir(url)`, `mover(alvo)`, `clicar(alvo)`, `escrever(texto)`, `tecla(nome)`, `percorrerAte(locator)`, `percorrer(px)`, `titulo(texto)`, `esconderTitulo()`, `zoom(alvo, { fator })`, `zoomFora()`, `navegar(acao, { url, visivel })`, `fecho()`, `narrar()`, `ateFrase(ms)`, `ateNarracao(ms)`, `pausa(ms)`, `destacar(locator)`, `retirarDestaque()`, `terminar()`. Um alvo é um locator do Playwright ou `{ x, y }`.

Regras de qualidade:
- Cada `narrar()` vem **antes** da ação a que a frase se refere e encaixa a frase seguinte do passo (se a anterior ainda vai a meio, espera por ela); as que não encaixares seguem-se à última. `abrir()` encaixa a primeira frase ainda sobre o cartão.
- `navegar()` muda de página no fim da frase em curso: chama-o logo a seguir ao `narrar()` da frase que acaba no clique, e o `narrar()` da frase seguinte logo depois dele.
- `percorrerAte()` não faz nada se o alvo já está à vista, e `mover()` só faz scroll se menos de 70% do alvo estiver no ecrã. `percorrer(px)` às cegas fica para casos sem alvo. No fim, `gravar.mjs` imprime os scrolls que houve e em que passo: se aparecer um que o guião não previa, corrige o guião ou a ordem das ações.
- As esperas são por elementos (`visivel`), não por tempo. O tempo que o site demora debaixo do cartão ou da imagem parada sai na montagem.
- O login, se existir, é um passo com `e.escrever(process.env.NOME_DA_VARIAVEL)` e nunca com o valor no ficheiro. Abre as capturas de `gravacao/` e confirma que não aparecem dados pessoais nem credenciais; se aparecerem, usa a conta de teste ou desfoca na montagem.

### 4.4 Montagem

`node montar.mjs` alinha o relógio do script com o vídeo pelos momentos escuros (cartões), retira os tempos mortos, junta a narração num só WAV com cada frase no seu tempo, gera `legendas.srt` com uma legenda por frase, aplica o zoom das marcas com o `zoompan` do ffmpeg, grava as legendas na imagem, normaliza o volume para −16 LUFS e exporta `final/<nome>-<largura>x<altura>.mp4` (H.264, AAC a 48 kHz, 25 fps). Imprime a duração, os pontos de sincronização e os zooms. A música só entra com licença confirmada ou fica em «Por preencher».

### 4.5 Prova

- O vídeo abre e toca do princípio ao fim, e a duração está dentro do formato.
- Para a sincronização, extrai um fotograma 0,5 s depois do início de cada frase (ou de três, num vídeo longo) e confirma que no ecrã está aquilo de que a frase fala.
- Para o ritmo, lê os silêncios entre frases que o `montar.mjs` lista. Dentro de um passo ficam perto da pausa do formato; acima de 2 s só numa mudança de página, e nesse caso vê se a frase seguinte pode entrar mais cedo ou acompanhar a ação.
- Para as transições, extrai fotogramas a 5 por segundo à volta de cada mudança de página e confirma que não há fotogramas pequenos, cinzentos ou escuros fora dos cartões.
- Para o scroll, lê a lista que o `montar.mjs` imprime com o passo de cada um; cada scroll tem uma frase que o justifica e não há dois seguidos em sentidos opostos.
- Para a voz, junta o que o `narrar.mjs` reportou ao pedido para o utilizador ouvir.
- Nenhum segredo nem dado pessoal aparece em nenhum fotograma, e as legendas correspondem ao guião.
Cola os comandos corridos, as durações e os caminhos dos ficheiros.

## Relatório

- O formato, o estilo, a duração e o guião final.
- As ferramentas e a voz usadas, com a licença de cada uma e a fonte.
- As provas, segmento a segmento, com os números; e o que fica para o ouvido do utilizador.
- As entradas novas registadas e o que ficou por preencher.

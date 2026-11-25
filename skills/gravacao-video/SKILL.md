---
name: gravacao-video
description: "Mini skill para gravar vídeos de um site: teaser, demonstração ou explicação detalhada, com narração em português de Portugal, legendas, cartões de abertura e fecho, cursor visível a mover-se e a clicar, zoom ao que a narração refere e transições. Trabalha por segmentos (guião, voz, gravação, montagem, prova), cada um com regras de qualidade que os scripts da pasta scripts/ aplicam e verificam. Grava o browser com Playwright, usa credenciais só de variáveis de ambiente, gera a voz com uma das vozes gratuitas em português de Portugal (Piper ou o escalão gratuito do Azure), escolhida de ouvido, e guarda cada lacuna da voz para os vídeos seguintes, monta e exporta com ffmpeg. Usar quando se quer mostrar um site ou uma funcionalidade em vídeo. É uma sub skill, que faz uma parte do trabalho, sozinha ou chamada por uma skill mãe."
argument-hint: "URL do site, formato (teaser, demo, explicação), estilo (apresentação ou sóbrio) e guião, ou nada para perguntar"
metadata:
  estado: produção
  tipo: sub
  usa: [humanizar]
  impacto: { ia: 5, seguranca: 0, nuvem: 0, desenvolvimento: 2, web: 10 }
---

# GravacaoVideo

O caminho do conhecimento obtém-se com `node ../orchestrate-sessions/scripts/conhecimento.mjs`; as referências `knowledge/...` são relativas a esse caminho.

O conhecimento está em `knowledge/ia/multimodal/`: `voz-tts-e-stt.md` para a voz, `gravacao-do-browser-com-playwright.md` para a gravação e `montagem-e-exportacao-com-ffmpeg.md` para a montagem e a exportação. Se `~/.start-project-with-trust/knowledge/ia/multimodal/` tiver uma entrada com o mesmo caminho, vale a pessoal. Os scripts em `scripts/` aplicam essas entradas; o que fizeres fora deles passa pelo passo 3 e fica registado.

## Regras

- Seguem-se as regras comuns de `../orchestrate-sessions/regras.md`: cada facto cita o ficheiro da base ou o URL da fonte; os factos verificas tu, as decisões são do utilizador; uma pergunta de cada vez, no formato que lá está; sem marcas de escrita de IA no guião, nos títulos e nas legendas; autonomia depois da decisão, com o que só o utilizador pode dar (credenciais, marca, música licenciada) em «Por preencher».
- Credenciais vêm de variáveis de ambiente, lidas pelos scripts. Nunca ficam no guião, no briefing, nos ficheiros do projeto nem no vídeo. Sempre que possível grava-se com uma conta de teste.
- Licenças antes de instalar: cada ferramenta e cada voz entram só depois de leres a licença na página oficial e de a registares. Um modelo de voz com licença não comercial não entra em vídeos de clientes sem os termos confirmados (ver a entrada de voz).
- Tu não ouves o áudio. O que os scripts medem (ruído no arranque, fins cortados, pronúncias por rever, silêncios) reportas com números; o que só o ouvido decide (timbre, naturalidade, uma palavra mal dita) pedes ao utilizador que ouça, e dizes-lhe em que frases.
- O modelo e o effort seguem `../orchestrate-sessions/modelo-e-effort.md`: o guião e o desenho das transições são «Design e interface» ao nível pedido; a gravação e a montagem são «Construir»; a leitura de documentação é `haiku low`.

## Âmbito

Sabe fazer, com as três entradas de `ia/multimodal/`: vídeos de um site gravados no browser (teaser, demonstração ou explicação), com narração em português de Portugal por uma voz gratuita, legendas tiradas do guião, cursor, zoom, cartões e transições, exportados em MP4; e corrigir a voz de um vídeo que fez, frase a frase.

Não sabe fazer:

| Pedido | Para onde vai |
|---|---|
| Filmagem com pessoas ou câmara, avatares, animação feita à mão, vídeo programático (Remotion, Motion Canvas) | fora da base: passo 3, com a documentação e a licença oficiais lidas antes de usar |
| Gravar uma aplicação de secretária ou o ecrã fora do browser | fora da base: o Playwright só grava o browser; passo 3 |
| Transcrever ou legendar um vídeo que já existe | `ia-aplicada` (voz e reconhecimento de fala) |
| Corrigir o site para ficar bem no vídeo (um ecrã partido, um texto errado) | `design-ux` ou `boas-praticas-codigo`, antes de gravar |
| Animação ou 3D dentro do próprio site | `design-3d-motion` |

Pedidos que se confundem:
- «Um vídeo do site»: uma demonstração gravada no browser, sim; um vídeo promocional com filmagens ou animação feita à mão, não.
- «Legendas»: as do vídeo que esta skill grava, tiradas do guião, sim; legendar um vídeo que já existe, não (`ia-aplicada`).
- «Uma voz melhor»: escolher entre as vozes gratuitas e corrigir as lacunas no `voz.json`, sim; uma voz paga só a pedido, com o custo dito à partida.
- «Animação»: cursor, zoom e transições na montagem, sim; animação dentro do site, não (`design-3d-motion`).

Quando parte do pedido é de outra skill, segue `../orchestrate-sessions/regras.md`: diz qual e porquê; chamada por uma mãe, devolve-lhe essa parte; sozinha, recomenda-a.

## 1. O que vamos gravar?

Se o pedido, ou o briefing da mãe, já diz o site, o que mostrar e o formato, passa ao passo 2. Se não, pergunta só o que falta, uma coisa de cada vez, no formato de `../orchestrate-sessions/regras.md`, e pára quando tiveres as três:

1. **O site e o que mostrar:** o URL e o percurso ou a funcionalidade. Se o site pede login, em que variáveis de ambiente estão as credenciais de uma conta de teste.
2. **Para quem e para quê:** quem nunca usou o site, quem o vai usar a seguir, ou quem decide se o compra.
3. **O formato**, do mais curto ao mais longo: `teaser` (até 30 s), `demonstracao` (1 a 3 min) ou `explicacao` (3 a 10 min). Recomenda pelo objetivo: o teaser para apresentar, a demonstração para mostrar uma funcionalidade, a explicação para quem vai usar o sistema.

No máximo quatro perguntas (a do login só se o site o pedir). O estilo é o de apresentação, salvo se o utilizador pedir o sóbrio, e a voz escolhe-se de ouvido no passo 4.2.

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

Lê as três entradas de `ia/multimodal/`. Na de voz, aplica a linha «Para uma skill»: as vozes gratuitas vêm primeiro (a do Piper, `pt_PT-tugão-medium`, e as pt-PT do escalão gratuito do Azure), e a escolha faz-se de ouvido no passo 4.2; com o Azure, conta os caracteres do guião face ao limite mensal do escalão gratuito. As vozes pagas ficam na entrada, para quem quiser pagar. Nas de gravação e montagem, lê as linhas «Para uma skill» e as armadilhas conhecidas (escala a 2x, scripts de início antes do `<head>`, sites de página única em que a navegação não cria documento novo, sites que limpam os filhos de `<html>`, diálogos na camada de topo, `scroll-behavior: smooth`, caminhos com acentos no Piper, fins de frase cortados pelo Piper).

## 3. Se a biblioteca não tem a resposta

Os scripts cobrem gravação, narração com Piper ou Azure, montagem e exportação em MP4. Para algo fora disso (outra voz, música, outro formato de saída, uma ferramenta de vídeo programático como Remotion ou Motion Canvas), segue «Quando falta conhecimento» em `../update-knowledge/SKILL.md` antes de instalar ou usar, com o registo em `ia/multimodal/`. Fontes oficiais: a documentação e a licença no site do próprio projeto; diz também que licenças confirmaste. Se mudaste um script de `scripts/`, a alteração entra na skill com a razão no commit.

## Onde fica cada coisa

Tudo vive em `video/<nome-do-video>/`, no projeto:
- `guiao.md`: a tabela do passo 4.1, validada;
- `guiao.json`: o que os scripts leem (ver o passo 4.1);
- `estudio.mjs`, `narrar.mjs`, `montar.mjs`, `comum.mjs` e `pronuncias.json`: cópias de `scripts/` desta skill, sem alterações;
- `gravar.mjs`: o script deste vídeo, escrito sobre o estúdio; lê as credenciais do ambiente;
- `audio/`: um ficheiro por frase (`<passo>-<n>.wav`), `duracoes.json`, a narração completa, `tomadas/`, com todas as tomadas de cada frase, e `vozes/`, com a frase de teste dita por cada voz gratuita;
- `escuta.md`: a folha de escuta, com as frases numeradas e o tempo de cada uma no vídeo;
- `gravacao/`: o vídeo bruto, uma captura JPEG por passo, `tempos.json` (o relógio da gravação) e `filtro.txt` (o filtro ffmpeg usado);
- `legendas.srt`: geradas a partir do guião;
- `final/`: as exportações, uma por formato e resolução.
O projeto precisa de `playwright` e `ffmpeg-static` no `package.json` e do Piper em `ferramentas/piper/` (ou nas variáveis `PIPER_EXE`, `PIPER_MODELO` e `PIPER_ESPEAK`). Nada desta pasta vai para o repositório com segredos; `.gitignore` exclui `ferramentas/`, `gravacao/*.webm`, `audio/narracao.wav` e `audio/tomadas/`.

## 4. Produzir, segmento a segmento

Cada segmento tem as suas regras de qualidade e só passa ao seguinte quando as cumpre. Um defeito corrige-se no segmento onde nasce: uma palavra mal dita corrige-se no guião ou nas pronúncias, e não na montagem.

### 4.1 Guião

Escreves `guiao.md`, uma tabela com passo, ação no browser (o que o cursor faz, onde há zoom, onde há scroll), a narração frase a frase e o que aparece no ecrã, e pedes validação antes de gravar. Textos finais que faltem ficam em «Por preencher». Depois passas o mesmo para `guiao.json` e copias `scripts/*` desta skill para `video/<nome>/`.

Regras de qualidade:
- **Uma frase por ação**, curta (até 16 palavras), dita antes da ação a que se refere: a voz vai à frente do cursor. Onde o cursor vai clicar, uma frase de ligação («Abrimos o primeiro.»).
- **Uma mudança de página pede duas frases**: uma que acaba no clique («No menu principal está a secção Reutilizações.») e outra que começa já na página nova («Reúne aplicações e estudos feitos com estes dados.»). Uma frase só, longa, deixa o ecrã parado enquanto se fala do que ainda não se vê.
- **Português corrente.** Termos estrangeiros mostram-se no ecrã (zoom, título) e dizem-se em português: «a licença é aberta», com o zoom em «Creative Commons». A voz sintética lê inglês com fonética portuguesa e soa mal.
- **Siglas, endereços e nomes** dizem-se como se leem. As siglas correntes e os endereços (`dados.gov.pt`) o script trata; o resto ensina-se com `--ensinar` (passo 4.2) ou, se só valer para este vídeo, vai para `pronuncias` no `guiao.json` (`{ "INE": "iné" }`). As legendas ficam com a grafia original.
- **Scroll só com propósito**: quando o que a frase refere não está à vista, e no máximo um por página. Nunca scroll para «mostrar a página». Um regresso ao topo para usar o menu conta como scroll e leva uma frase.
- **Zoom e título não se juntam**, o zoom sai antes de o cursor ir para longe, e um zoom fica pelo menos o tempo de uma frase: entrar e sair logo a seguir incomoda.
- **Humanizado antes de gravar.** A narração e as ações não podem deixar perceber que foram feitas por uma IA. Antes de pedir validação, corre a mini skill `humanizar` (ou `node ../humanizar/scripts/humanizar.mjs guiao.md`) e relê o guião com as secções «Texto» e «Vídeo e voz» de `../humanizar/marcas.md`. Corriges só com autorização, categoria a categoria.

`guiao.json`:
- `nome`, `url`, `formato` (`teaser`, `demonstracao` ou `explicacao`), `estilo` (`apresentacao` ou `sobrio`), `largura` e `altura` da janela (1280x720), `escala` (2 no estilo apresentação, 1 no sóbrio), `saida` (`{ "largura": 1920, "altura": 1080 }`);
- `capa` e `fecho`, cada um com `titulo` e `subtitulo` (a `capa` também `segundos`, 2,5 por omissão, e `narrarAntes`, os segundos de voz ainda sobre o cartão, 1,5 por omissão);
- `passos`: lista de `{ "id": "01-...", "narracao": "..." }`, com o texto exato do guião. A narração divide-se em frases pela pontuação final (ou por `|`, para forçar a divisão);
- voz: `motorVoz` (`piper` por omissão, ou `azure`), `voz`, `pronuncias`, `vozOpcoes` (`length_scale`, `noise_w`, `noise_scale`, `tomadas`);
- para afinar o ritmo do formato: `pausaFrases`, `folga`, `ritmo` (multiplicador da duração dos movimentos); `cores` (`fundo` e `realce`).

### 4.2 Voz

Antes de narrar, se o `guiao.json` ainda não tem `voz`, corre `node narrar.mjs --vozes`. O script diz a primeira frase do guião com cada voz gratuita em português de Portugal e grava-a em `audio/vozes/<voz>.wav`. As vozes do Azure só entram com `AZURE_SPEECH_KEY` e `AZURE_SPEECH_REGION`; sem elas, o script diz que as saltou. Pede ao utilizador que as ouça e escolha. A escolhida vai para `motorVoz` e `voz` no `guiao.json`. Num vídeo de cliente só entram vozes cuja licença, na entrada de voz, permite uso comercial; uma licença não comercial só serve para vídeos que não são de clientes.

`node narrar.mjs` gera um ficheiro por frase e `audio/duracoes.json`. Faz isto antes de gravar: a gravação usa as durações para encaixar cada frase. Só narra o que falta ou mudou; o que já estava bom fica como está.

O script trata de:
- dizer siglas e endereços pelos dicionários de pronúncias, e avisar de cada palavra que pareça estrangeirismo ou sigla sem pronúncia;
- com o Piper, que não é determinista, gerar quatro tomadas de cada frase, guardá-las em `audio/tomadas/` e ficar com a que não tem ruído no arranque, acaba menos cortada e tem a duração mais próxima da mediana (uma tomada curta engoliu sílabas);
- cortar o que vem antes da fala, entrar e sair com um desvanecer curto (mais longo quando o modelo cortou a última vogal) e nivelar o volume entre frases;
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
| O fim cortado, ou ruído antes da fala | `node narrar.mjs --lacuna 9 fim-cortado` (mais tomadas nas frases que acabam na mesma palavra) ou `node narrar.mjs --lacuna 9 ruido` (mais tomadas em todas as frases desta voz) |
| Uma frase saiu mal só desta vez | `node narrar.mjs --frase 9`: gera tomadas novas só para essa frase |
| Prefere outra tomada | `node narrar.mjs --frase 9 --tomada 3`: fica com a tomada 3, sem gerar nada |
| O fim continua cortado em todas as tomadas | muda a última palavra da frase no guião e corre `node narrar.mjs` |
| O timbre ou a naturalidade | não se corrige neste motor: propõe outra voz |

Depois de cada correção, o `narrar.mjs` diz se a frase nova cabe no tempo gravado: se cabe, basta `node montar.mjs`; se não, `node gravar.mjs` primeiro. Como não ouves, uma pronúncia pode pedir duas ou três tentativas: propõe uma grafia, o utilizador ouve, e afinas. Quando uma pronúncia ensinada serve a toda a gente (uma sigla, um termo técnico) e estás numa cópia git do repositório, junta-a também a `scripts/pronuncias.json` desta skill, no mesmo commit.

Regras de qualidade:
- **Zero avisos de pronúncia** antes de gravar: reescreve a frase em português ou ensina a pronúncia.
- Reporta quantas frases ficaram com o fim cortado e com ruído retirado (as frases acabadas em vogal átona são as que o Piper mais corta).
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
await e.passo('01-inicio', async () => { await e.abrir(); await e.titulo('Nome do site'); });
await e.passo('02-pesquisar', async () => {
  await e.narrar();                                        // 1.ª frase: «Para encontrar dados, basta escrever um tema.»
  await e.clicar(page.getByRole('button', { name: 'Pesquisar' }), { ate: page.locator('#campo') }); // confirma que o campo abriu
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
- As esperas são por elementos (`visivel`), não por tempo. O tempo que o site demora debaixo do cartão ou da imagem parada sai na montagem. Um clique que abre algo leva `ate`: `e.clicar(botao, { ate: campo })` confirma que o campo apareceu e, se a página ainda estava a acordar, clica outra vez.
- O login, se existir, é um passo com `e.escrever(process.env.NOME_DA_VARIAVEL)` e nunca com o valor no ficheiro. Abre as capturas de `gravacao/` e confirma que não aparecem dados pessoais nem credenciais; se aparecerem, usa a conta de teste ou desfoca na montagem.

### 4.4 Montagem

`node montar.mjs` alinha o relógio do script com o vídeo pelos momentos escuros (cartões), retira os tempos mortos, junta a narração num só WAV com cada frase no seu tempo, gera `legendas.srt` com uma legenda por frase, aplica o zoom das marcas com o `zoompan` do ffmpeg, grava as legendas na imagem, normaliza o volume para −16 LUFS e exporta `final/<nome>-<largura>x<altura>.mp4` (H.264, AAC a 48 kHz, 25 fps). Escreve `escuta.md`, a folha de escuta, e imprime a duração, os pontos de sincronização, os silêncios, os scrolls e os zooms. A música só entra com licença confirmada ou fica em «Por preencher».

### 4.5 Prova

- O vídeo abre e toca do princípio ao fim, e a duração está dentro do formato.
- Para a sincronização, extrai um fotograma 0,5 s depois do início de cada frase (ou de três, num vídeo longo) e confirma que no ecrã está aquilo de que a frase fala.
- Para o ritmo, lê os silêncios entre frases que o `montar.mjs` lista. Dentro de um passo ficam perto da pausa do formato; acima de 2 s só numa mudança de página, e nesse caso vê se a frase seguinte pode entrar mais cedo ou acompanhar a ação.
- Para as transições, extrai fotogramas a 5 por segundo à volta de cada mudança de página e confirma que não há fotogramas pequenos, cinzentos ou escuros fora dos cartões.
- Para o scroll, lê a lista que o `montar.mjs` imprime com o passo de cada um; cada scroll tem uma frase que o justifica e não há dois seguidos em sentidos opostos.
- Para a voz, junta o que o `narrar.mjs` reportou ao pedido para o utilizador ouvir, e entrega-lhe o vídeo com `escuta.md`.
- Nenhum segredo nem dado pessoal aparece em nenhum fotograma, e as legendas correspondem ao guião.
- Para a humanização, a saída final do verificador sobre o guião e a revisão do vídeo final com a secção «Vídeo e voz» de `../humanizar/marcas.md` (voz, cursor, zoom e scroll), com os achados que ficaram e porquê.
Cola os comandos corridos, as durações e os caminhos dos ficheiros.

## Relatório

- O formato, o estilo, a duração e o guião final.
- As ferramentas e a voz usadas, com a licença de cada uma e a fonte, e as lacunas registadas no `voz.json` neste vídeo.
- As provas, segmento a segmento, com os números; e o que fica para o ouvido do utilizador.
- As entradas novas registadas e o que ficou por preencher.


## Documentação

Se a skill `documentacao` estiver instalada (existe `../documentacao/SKILL.md`), no fim de um trabalho com resultado escreve o relatório do processo, como diz o modo «processo» dela. Uma consulta sem alterações não leva relatório.

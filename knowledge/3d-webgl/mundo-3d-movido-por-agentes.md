---
id: 3d-webgl/mundo-3d-movido-por-agentes
titulo: "Mundo 3D movido por agentes"
seccao: "3D, WebGL e animação"
paginas: []
fonte: "https://code.claude.com/docs/en/hooks"
data_lancamento: null
confianca: media
verificado_em: 2026-11-17
---

# Mundo 3D movido por agentes

**Resumo:** Um mundo 3D em que bonecos mostram o que agentes de IA estão a fazer só se justifica se mostrar algo verdadeiro que de outro modo não se vê (quem trabalha, quem espera resposta, quem parou). A metáfora sai do que o produto é; os eventos reais (hooks do Claude Code, sem conteúdo) alimentam um modelo sem 3D, e a cena, a lista acessível e a repetição leem todos desse modelo.

## Conteúdo

Origem: padrão construído e medido na Oficina da administração do site-noticias (sessões S2-O2 e S3-O3, 2026-11-16 e 17). O que vem dessa experiência está marcado como *(experiência do projeto)*. As afirmações sobre hooks e three.js vêm das fontes em baixo, lidas pelas sessões a 2026-11-16 e não relidas na fonte a 2026-11-17 (ver «Por reconfirmar»).

### Quando faz sentido e quando é enfeite

- Faz sentido quando a cena responde a uma pergunta que a pessoa faz de verdade: quem está a trabalhar, quem espera uma resposta minha, quem parou e porquê. Cada estado tem de ter um sinal que se lê num relance, e o mesmo estado tem de aparecer também em texto.
- É enfeite quando os bonecos se mexem sem que o movimento corresponda a um evento, ou quando uma tabela dava a mesma informação mais depressa. Aplica antes `3d-na-web-quando-e-porque.md`: se uma lista com estados chega, propõe a lista.
- Teste prático: tira o 3D e vê o que se perde. Se não se perde nenhuma informação, é enfeite.

### A metáfora sai do que o produto é *(experiência do projeto)*

- Proposta rejeitada: uma redação de jornal. A administração do site-noticias não é um jornal (o jornal é só a face pública), e a metáfora trazia rotativas e estética de imprensa a uma ferramenta de trabalho.
- Proposta que ficou: biblioteca com oficina. As estantes são o conhecimento (uma por categoria, um volume por entrada) e as bancadas são as skills (um boneco por skill). Cada elemento da cena corresponde a uma coisa que o produto tem, por isso a pessoa percebe a cena sem legenda.
- Método: lista o que o produto tem (coisas que se guardam, coisas que fazem trabalho, quem pede), escolhe um lugar conhecido onde essas relações existem e rejeita o que importa estética de outro produto. Pergunta ao dono antes de construir.

### Eventos e animações *(experiência do projeto)*

Cada evento é uma linha sem conteúdo (`id` crescente, sessão, tipo, nome, instante). A tabela é a da Oficina; noutro produto muda a cena, não a forma.

| Evento | Na cena |
|---|---|
| Sessão começa | Acende-se um posto livre; o boneco da sessão entra pela porta, senta-se e trabalha |
| Skill chamada | O boneco dessa skill levanta-se, vai às estantes que ela lê, traz volumes e trabalha na bancada |
| Subagente começa / acaba | Um ajudante aparece ao lado de quem o lançou e consulta uma estante; ao acabar, entrega e sai |
| Pergunta ou pedido de permissão | O boneco da sessão para e levanta o braço, com um balão «?»; os das skills dela param |
| Resposta | Baixa o braço e volta ao trabalho |
| Paragem (à espera de instruções) | Senta-se virado para a câmara, com um balão «…» |
| Falha por limite | Adormece sobre a mesa, com «Zz» |
| Outra falha | Cabisbaixo, com «!» |
| Sessão acaba | Os volumes voltam à estante, o boneco sai pela porta e o posto fica livre |
| Evento sem animação própria (notificação, instrução, skill desconhecida) | Só o último passo no cartão |

Regra: o estado de uma sessão tem de se ler no boneco da própria sessão, e não só nos das skills, porque uma sessão pode ter uma pergunta sem ter chamado skill nenhuma.

### De onde vêm os eventos

Dos hooks do Claude Code, comandos que a ferramenta corre em pontos do ciclo de vida. Os usados e o que o stdin trouxe nas corridas reais da S2-O2 (Claude Code 2.1.325) *(experiência do projeto, formato confirmado com a ferramenta a correr)*:

| Hook | Serve para | Traz (além de `session_id`, `cwd`, `hook_event_name`) |
|---|---|---|
| `SessionStart`, `SessionEnd`, `UserPromptSubmit` | começar, acabar, voltar ao trabalho | `source`, `reason`, `prompt` (este não se envia) |
| `PreToolUse` com matcher `Skill\|Agent` | skill chamada, agente lançado | `tool_input.skill` com o nome da skill; `tool_input.subagent_type` no `Agent` (a ferramenta chama-se `Task` na lista, mas o hook recebe `Agent`) |
| `SubagentStart`, `SubagentStop` | ajudante entra e sai | `agent_id`, `agent_type` |
| `Stop` | paragem | `stop_hook_active`, `last_assistant_message` (não se envia) |
| `StopFailure`, `Notification` | falha, aviso | `error`, `notification_type` |

- **O que não se envia:** o texto do pedido, as respostas, `tool_input` além do nome da skill e do tipo de agente, `last_assistant_message`, caminhos de transcrições. O evento diz o que aconteceu e a quem, nunca o conteúdo.
- **Os hooks de eventos são assíncronos** (`async: true`) e nunca bloqueiam a sessão: tudo corre dentro de uma função que apanha qualquer erro e sai com 0; um pedido ao portal tem prazo de 2 s, e depois de uma falha de rede há uma pausa de 60 s sem tentar.
- **Windows:** registar o hook na forma exec (`command` com o executável e `args` com o caminho do script), sem shell, para caminhos com espaços.
- **Um hook que decide** (responder a uma pergunta, aprovar uma permissão, dar uma instrução no `Stop`) é outro desenho, com timeout longo e saída própria. Fica fora deste padrão; a vista só mostra.
- O `PermissionRequest` dispara também para `AskUserQuestion` quando o `PreToolUse` não decidiu: quem trata permissões tem de o ignorar para a mesma pergunta não aparecer duas vezes.

### Ao vivo e repetição, do mesmo registo *(experiência do projeto)*

1. **Modelo puro.** `aplicar(sala, evento)` só mexe em dados, sem three.js, sem DOM, sem relógio próprio. Os mesmos eventos pela mesma ordem dão a mesma sala.
2. **Cena que persegue o modelo.** Recebe a sala inteira, calcula a situação de cada boneco e, se mudou, escreve-lhe um plano novo a partir de onde ele está. Não ouve eventos.
3. **Repetição.** Aplicar os eventos até um instante, mostrar esse estado de uma vez e ir aplicando os seguintes com um temporizador. Um silêncio entre dois eventos nunca demora mais de 3 s; a velocidade é 1×, 4× ou 16×. No fim, volta sozinha ao vivo. Ao vivo e em repetição corre o mesmo código.
4. **Consulta.** O servidor guarda os eventos com `id` crescente e a vista pede `desde=<id>`; a retenção (7 dias na Oficina) é o tamanho da repetição. Intervalo de 3 s com trabalho em curso, 15 s em repouso, nenhum com a página escondida. O que os eventos não dizem (nome do projeto, perguntas que expiraram) acerta-se com um pedido de estado.
5. **Planos de boneco.** Uma fila de passos (`ir`, `esperar`, `fazer`, `pose`). A situação desejada resume-se numa chave, e só se escreve plano novo quando a chave muda, para um evento repetido não reiniciar o boneco. O plano parte da posição atual e do que o boneco leva nas mãos. O que muda o mundo (volumes, sinais) fica em passos `fazer`, para acontecer também quando o plano se cumpre de uma vez.

### Interação *(experiência do projeto)*

- Clicar ou tocar num boneco, ou no nome dele, abre um cartão: skill, projeto, o que faz, há quanto tempo e último passo.
- Com uma pergunta ou permissão pendente, o cartão traz o mesmo componente que a caixa de entrada do produto, e responde-se ali. Com a sessão à espera de instruções, traz a caixa para escrever.
- Numa repetição não se responde nem se escreve: o que se vê já passou.
- Os nomes são HTML por cima do canvas, botões a sério na ordem do Tab; o Enter abre o cartão com o foco no título e o Esc fecha-o e devolve o foco ao boneco.

### Orçamento, carregamento e alternativas

- **Carregamento:** a vista importa-se dinamicamente, só quando se abre; quem não a abre não paga o three.js. A prova da Oficina: noutra vista não se pede nenhum ficheiro da cena.
- **Pausa:** um só `requestAnimationFrame`, parado com a página escondida ou a cena fora do ecrã (com a página escondida: 0 quadros e 0 consultas em 8 s). Com movimento reduzido só se desenha quando algo muda. O manual do three.js descreve o render a pedido.
- **Sem WebGL:** fica a lista dos agentes, com os mesmos estados, o mesmo cartão e a mesma repetição.
- **Movimento reduzido:** ninguém se desloca; a cada evento os bonecos aparecem já no sítio, com a pose e o sinal novos. É o mesmo caminho de arrastar a linha do tempo.
- **Lista acessível:** sempre no DOM (escondida da vista quando há 3D, à vista quando não há); uma frase-resumo em região `status` («3 sessões: 1 a trabalhar, 1 à espera de resposta, 1 à espera de instruções.»); canvas com `aria-hidden`.
- **Vigia de desempenho:** mede os quadros por segundo com a cena a correr; abaixo de 22 baixa a resolução, e se continuar abaixo de 14 desmonta a cena e fica a lista.
- **Medições da Oficina** *(experiência do projeto; Chrome sem janela com placa gráfica ANGLE/Direct3D 11)*:

| O quê | Valor |
|---|---|
| Código da vista | 22,2 kB com gzip |
| three.js, partilhado com outra vista | 137 kB com gzip |
| Modelos e texturas | 0 bytes |
| Clique no separador até ao primeiro quadro | 300 a 371 ms |
| Computador, sala cheia | 60 quadros por segundo; 1,9 ms de trabalho por quadro |
| Telemóvel médio emulado (390 px, CPU 4× mais lenta) | 60,1 quadros por segundo; 4,9 ms por quadro |

  Os 60 são o teto do ecrã: a folga lê-se no tempo por quadro (16,7 ms disponíveis). A limitação de CPU não abranda a placa gráfica, por isso falta medir num telemóvel a sério. Orçamento usado: 60 no computador, 30 no telemóvel médio, até 60 kB (gzip) de código próprio, até 2 MB de modelos. Medir sempre com placa gráfica ligada (`--enable-gpu --use-angle=d3d11` no Windows) e registar o nome dela; desenho por software dá medições que não valem.
- **Performance da cena:** tudo o que não se mexe fundido em poucas malhas por material; repetições (volumes, 367 na Oficina) numa `InstancedMesh`; sombras dos móveis calculadas uma vez (`shadowMap.autoUpdate = false`); cada boneco em seis malhas, com a cor nos vértices e um material só.

### Bonecos: licença livre ou por código *(experiência do projeto)*

- Pacotes de licença livre (Kenney, Quaternius) poupam o modelar, mas as animações que trazem raramente incluem as poses de que o mundo precisa (dormir na bancada, braço no ar, carregar volumes), e distinguir 16 bonecos pedia edição no Blender. A S3-O3 não foi confirmar hoje o que cada pacote traz nem a licença: antes de os usar, lê a licença de cada um e regista-a num `LICENCAS.md`.
- Por código: cada pose é um conjunto de ângulos (ancas, tronco, cabeça, braços, pernas) e em cada quadro o boneco aproxima-se deles com `a += (alvo - a) * (1 - exp(-k * dt))`, por isso qualquer pose passa para qualquer outra sem animações de transição. O repouso vivo usa um gerador de acaso por boneco, com semente pelo nome. Custo em modelos: zero bytes.
- Caminhos: grelha de 25 cm com os móveis (mais a folga de um boneco) fechados, procura em largura sem cortar esquinas, e fica-se só com as esquinas. Para uma sala de 22 por 17 m são 6 mil células e a procura não se nota.
- Inspiração: Autopolis (autopolis.city). Não se encontrou código aberto nem licença, por isso nada se copia de lá.

### O que verificar

- A sequência simulada passa por todos os estados, com capturas em claro e escuro, largo e estreito. Abrir cada captura. Um script que faz de fonte de eventos (`simular-agentes.mjs` na Oficina) dispensa uma sessão real, mas uma sessão real tem de se ver pelo menos uma vez.
- Cada página de teste na sua janela: num browser sem janela só o separador da frente conta como visível.
- axe-core com o cartão aberto e fechado; a mesma sequência sem WebGL e com movimento reduzido.

### Por reconfirmar na fonte

Nesta sessão (2026-11-17) não foi possível ler a documentação oficial. Ficam por reconfirmar na fonte: os nomes dos hooks e os campos de cada um (lidos pela S2-O2 a 2026-11-16 e confirmados com o Claude Code 2.1.325 a correr, mas não relidos hoje), o comportamento do matcher `Skill|Agent`, a forma exec no Windows, e a afirmação de que `async: true` não bloqueia a sessão. `StopFailure` e `Notification` não apareceram nas corridas reais e foram testados com a forma da documentação.

**Para uma skill:** antes de propor um mundo 3D de agentes, confirma que mostra algo que a lista não mostra e escolhe a metáfora a partir do que o produto é, validada com o dono. Os eventos vêm de hooks assíncronos sem conteúdo; um modelo sem 3D entre os eventos e a cena serve a cena, a lista HTML e a repetição. A vista carrega a pedido, pausa escondida, tem alternativa sem WebGL e com movimento reduzido, e prova-se com capturas de cada estado e medições com placa gráfica ligada.

## Ver também

- [3D na web: quando e porquê](3d-na-web-quando-e-porque.md) (3D, WebGL e animação)
- [Orçamento de desempenho 3D](orcamento-de-desempenho-3d.md) (3D, WebGL e animação)
- [Acessibilidade e movimento](acessibilidade-e-movimento.md) (3D, WebGL e animação)
- [Three.js / WebGL](threejs-webgl.md) (3D, WebGL e animação)

## Fontes oficiais

*Lidas pelas sessões S2-O2 e S3-O3 a 2026-11-16; não relidas a 2026-11-17.*

- [Claude Code: referência de hooks](https://code.claude.com/docs/en/hooks) — eventos, entrada, saída e registo dos hooks
- [Manual do Three.js: render a pedido](https://threejs.org/manual/pages/rendering-on-demand.html) — desenhar só quando algo muda

Fonte: implementação em `site-noticias/web-admin/src/oficina-3d/` e saídas S2-O2 e S3-O3 da orquestração da fase 2. Não vem do PDF.

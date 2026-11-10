---
name: gravacao-video
description: Mini skill para gravar vídeos de um site: teaser, demonstração ou explicação detalhada, com narração em português de Portugal, legendas, transições, formas e títulos animados. Grava o browser com Playwright a seguir um guião, usa credenciais só de variáveis de ambiente, gera a voz com uma opção gratuita (Piper pt_PT ou o escalão gratuito do Azure), monta e exporta com ffmpeg. A biblioteca só tem a entrada de voz; o resto vai às fontes oficiais e fica registado. Usar quando se quer mostrar um site ou uma funcionalidade em vídeo.
argument-hint: "URL do site, formato (teaser, demo, explicação) e guião, ou nada para perguntar"
---

# GravacaoVideo

O conhecimento está em `../start-project-with-trust/knowledge/ia/multimodal/voz-tts-e-stt.md` (relativo à pasta deste `SKILL.md`). Para gravação, montagem e exportação ainda não há entradas: tudo o que fizeres nessas partes passa pelo passo 3 e fica registado. Se `~/.start-project-with-trust/knowledge/ia/multimodal/` tiver uma entrada com o mesmo caminho, vale a pessoal.

## Regras

- Seguem-se as regras da secção «Regras em todas as fases» de `../start-project-with-trust/SKILL.md`: cada facto cita o ficheiro da base ou o URL da fonte; os factos verificas tu, as decisões são do utilizador; uma pergunta de cada vez, no formato da Fase 1; sem marcas de escrita de IA no guião, nos títulos e nas legendas; autonomia depois da decisão, com o que só o utilizador pode dar (credenciais, marca, música licenciada) em «Por preencher».
- Credenciais vêm de variáveis de ambiente, lidas pelo script de gravação. Nunca ficam no guião, no briefing, nos ficheiros do projeto nem no vídeo. Sempre que possível grava-se com uma conta de teste.
- Licenças antes de instalar: cada ferramenta e cada voz entram só depois de leres a licença na página oficial e de a registares. Um modelo de voz com licença não comercial não entra em vídeos de clientes sem os termos confirmados (ver a entrada de voz).
- O modelo e o effort seguem `../orchestrate-sessions/modelo-e-effort.md`: o guião e o desenho das transições são «Design e interface» ao nível pedido; a gravação e a montagem são «Construir»; a leitura de documentação é `haiku low`.

## 1. O que vamos gravar?

Se o pedido já o diz, passa ao passo 2. Se não, pergunta numa só pergunta: o URL, o que mostrar, o público, se é preciso login (e em que variáveis de ambiente estão as credenciais), e o formato, com a duração de cada um:
1. **Teaser**: até 30 segundos, sem explicação, só o essencial com títulos.
2. **Demonstração**: 1 a 3 minutos, um fluxo completo narrado.
3. **Explicação detalhada**: 3 a 10 minutos, funcionalidade a funcionalidade, com legendas.

Com a resposta, escreves o guião: uma tabela com passo, ação no browser, texto da narração e título ou forma a mostrar, e pedes validação antes de gravar. Textos finais que faltem ficam em «Por preencher».

## 2. Ler só o que interessa

Lê `voz-tts-e-stt.md` e aplica a linha «Para uma skill» dela: primeiro uma voz local gratuita (Piper, pasta `pt_PT`), depois o escalão gratuito do Azure com uma voz pt-PT. Os nomes e a qualidade das vozes Piper pt_PT não estão confirmados na entrada: confirma-os na página do Hugging Face, ouve a voz e só depois a escolhes. Conta os caracteres do guião face ao limite mensal do escalão gratuito.

## 3. Se a biblioteca não tem a resposta

A gravação, a montagem e a exportação não têm entradas na base. Antes de instalar ou usar cada ferramenta:

1. Lê a documentação oficial e a licença no site do próprio projeto: o Playwright para gravar o browser (vídeo da sessão e capturas), uma ferramenta de vídeo programático para transições, formas e títulos animados (candidatas a comparar: Remotion e Motion Canvas; confirma a licença de cada uma e o que ela permite num uso comercial antes de escolher), e o ffmpeg para juntar, sincronizar e exportar. Não contornes bloqueios: se uma fonte recusar o acesso automático, pede ao utilizador o conteúdo ou regista-a como não lida.
2. Dá a cada facto a confiança segundo os critérios de `../update-knowledge/SKILL.md`. Um facto `baixa` não serve de base.
3. Regista antes de usar: numa cópia git do repositório, propõe uma entrada nova em `ia/multimodal/` (por exemplo, gravação do browser, vídeo programático, exportação com ffmpeg) no formato do passo 3 de `../update-knowledge/SKILL.md`, e só a escreves com aprovação; fora disso, no conhecimento pessoal (`~/.start-project-with-trust/knowledge/ia/multimodal/<slug>.md`, fonte em `FONTES.md` pessoal, linha no `CHANGELOG.md` pessoal). Se o que encontraste substitui o que uma entrada diz, segue a regra de edição da `update-knowledge`, com o texto anterior no «Histórico».
4. Diz ao utilizador que fontes leste, que licenças confirmaste e o que registaste.

## Onde fica cada coisa

Tudo vive em `video/<nome-do-video>/`, no projeto:
- `guiao.md`: a tabela do passo 1, validada;
- `gravar.mjs` (ou `.py`): o script Playwright, que lê as credenciais do ambiente;
- `gravacao/`: o vídeo bruto e as capturas por passo;
- `audio/`: um ficheiro por passo, com o nome do passo;
- `legendas.srt`: geradas a partir do guião;
- `final/`: as exportações, uma por formato e resolução.
Nada desta pasta vai para o repositório com segredos; `.gitignore` exclui `gravacao/` e `final/` se forem grandes.

## 4. Gravar, montar e provar

1. **Gravar.** Um script Playwright segue o guião passo a passo, com esperas pelos elementos e não por tempo, numa janela com a resolução do formato final. O login usa as variáveis de ambiente. Antes de gravar, confirma no ecrã que não aparecem dados pessoais nem credenciais; se aparecerem, usa a conta de teste ou desfoca na montagem.
2. **Narrar.** Gera um ficheiro de áudio por passo do guião com a voz escolhida, e as legendas a partir do texto do guião, com os tempos de cada passo.
3. **Montar.** Junta a gravação, o áudio e as legendas na ferramenta escolhida no passo 3: transições entre passos, formas a destacar o que a narração refere, títulos animados no início de cada parte. A música só entra com licença confirmada ou fica em «Por preencher».
4. **Exportar.** Com ffmpeg, nos formatos e na resolução pedidos.
5. **Provar.** O vídeo abre e toca do princípio ao fim; a duração está dentro do formato; o áudio coincide com a ação no ecrã nos passos em que a narração refere algo visível (verifica três pontos, com os tempos); nenhum segredo nem dado pessoal aparece em nenhum frame (percorre as capturas dos passos de login e de dados); as legendas correspondem ao guião. Cola os comandos corridos, as durações e os caminhos dos ficheiros.

## Relatório

- O formato, a duração e o guião final.
- As ferramentas e a voz usadas, com a licença de cada uma e a fonte.
- As provas: reprodução, duração, sincronização, ausência de segredos, legendas.
- As entradas novas registadas e o que ficou por preencher.

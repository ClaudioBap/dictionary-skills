---
name: update-knowledge
description: Atualiza a base de conhecimento partilhada em knowledge/, que a orchestrate-sessions e as sub skills leem, e o conhecimento pessoal do utilizador (~/.start-project-with-trust). Percorre as fontes aprovadas em knowledge/FONTES.md e as fontes pessoais, encontra novidades com a data de lançamento e um nível de confiança, aplica-as segundo o fluxo por confiança, regista tudo no CHANGELOG e, com autorização, publica a base partilhada no GitHub para que cada «npx skills update» traga o conhecimento atualizado. É uma sub skill, que faz uma parte do trabalho, sozinha ou chamada por uma skill mãe.
argument-hint: "Tema a atualizar (ex.: ia), «pessoal» para só o conhecimento pessoal, ou nada para todos"
disable-model-invocation: true
metadata:
  estado: produção
  tipo: sub
  usa: []
  impacto: { ia: 5, seguranca: 5, nuvem: 5, desenvolvimento: 5, web: 5 }
---

> Só corre quando alguém a chama explicitamente (`/update-knowledge`). O agente nunca a inicia sozinho.

# Atualizar o conhecimento

Esta skill só altera o conhecimento segundo o fluxo por confiança abaixo. Tudo o resto exige aprovação explícita do utilizador, alteração a alteração.

## Âmbito

Faz:
- pôr a base partilhada em dia com as fontes de `knowledge/FONTES.md` e os pontos «A vigiar», em todos os temas ou num só;
- aplicar as novidades pela confiança: editar a entrada e guardar o anterior no «Histórico», ou acrescentar ao `ATUALIZACOES.md` da secção, e arquivar o que tem mais de um ano;
- atualizar as passagens das skills que copiam um valor que mudou (passo 4, ponto 1b);
- propor fontes e entradas novas, uma de cada vez, também para um tema que a base ainda não cobre;
- tirar uma novidade que entrou, a pedido;
- manter o conhecimento pessoal, também sem cópia git (modo local), e publicar a corrida no GitHub.

Pedidos que se confundem:
- «Atualiza o .NET»: o que a base diz sobre o .NET, sim; migrar um projeto para o .NET 10, não, porque esta skill muda a base e não o código de um projeto. Vai para a `boas-praticas-codigo`; as imagens e o pipeline, para a `infra-deploy`.
- «Atualiza as skills»: os valores que uma skill copia da base, sim. Instalar a versão nova das skills é o `npx skills@latest update`. Mudar o que uma skill faz fica fora desta skill e propõe-se com o `CONTRIBUTING.md`.
- «Falta isto na base»: acrescentar o tema à base partilhada, sim, como proposta. A resposta para o trabalho em curso é da sub skill do tema, que segue «Quando falta conhecimento».
- «Põe isto na base»: com fonte oficial, sim; de memória, de um blogue ou de uma rede social, não: fica fora da base.

Também não lê páginas que recusam o acesso automático (pede ao utilizador que cole o conteúdo), não documenta um projeto (`documentacao`) e não revê marcas de escrita de IA (`humanizar`).

## Regras

- **Fluxo por confiança** (só para atualizações, ver «Níveis de confiança»):
  - `alta`: se a novidade muda o que uma entrada diz (uma prática substituída, uma versão, um algoritmo, um valor, uma recomendação), **edita a entrada** para dizer o que vale hoje e guarda o anterior no «Histórico» dela (passo 3); se não muda o texto, entra no ficheiro de atualizações da secção (`<secção>/ATUALIZACOES.md`), na categoria certa. Em ambos os casos, sem pedir aprovação;
  - `media`: entra como a `alta` (edição ou atualização, sem pedir aprovação), mas marcada com «Confiança: media» para se distinguir. Se o utilizador pedir para tirar uma novidade, retira-a (passo 2);
  - `baixa`: ignora.
- **Atualizações com mais de um ano saem do `ATUALIZACOES.md`, mas não se apagam.** Em cada corrida, as linhas cuja data «Adicionado a» tenha mais de 12 meses passam, sem alterações, para `<secção>/ATUALIZACOES-ARQUIVO.md`, na mesma categoria, com uma linha no `CHANGELOG.md`. Conta a data em que a linha entrou, e não a data de lançamento, para não arquivar logo um prazo antigo que ainda está a correr.
- **Nunca alterar sem aprovação explícita** o resto (novas entradas e fontes novas), uma alteração de cada vez. O silêncio ou um «ok» genérico a um lote não conta, a não ser que o utilizador peça expressamente para aprovar o lote todo.
- **Nunca inventar.**
  - Cada novidade tem fonte (URL) e data de lançamento tal como a fonte a indica.
  - Se a fonte não indicar data, escreve «data não indicada» e a confiança fica, no máximo, `media`.
  - O que for interpretação tua leva a marca *(interpretação)*.
- **Nunca contornar bloqueios.** Se uma fonte recusar o acesso automático (403, página vazia, ou marcada em `FONTES.md` como «não lida: bloqueia acesso automático»):
  - não uses identidades de browser falsas nem automação de ecrã;
  - pede ao utilizador que abra a página e cole o conteúdo, ou salta-a e regista-a no relatório.
- **O conhecimento diz o que vale hoje.** A melhor prática de hoje pode deixar de o ser amanhã: um algoritmo de cifra substituído por outro, uma API descontinuada, um modelo novo. Quando uma fonte `alta` o mostra, a entrada é reescrita com o que vale agora, também quando o texto veio do PDF. Nada se perde: o texto anterior fica na secção «Histórico» da entrada, com a data, a razão e a fonte, e a alteração tem linha no `CHANGELOG.md`.
- **Toda a alteração tem uma linha no `knowledge/CHANGELOG.md`.** O registo é só de acrescentar.
- **O que deixou de valer e ficou por reescrever marca-se.** Quando uma novidade mostra que parte de uma entrada deixou de valer (fim de suporte, modelo ou API descontinuados, código removido, versão recomendada com falha) e a corrida não a reescreve logo, porque falta ler o guia de migração, a substituição ainda não é clara ou é precisa uma decisão do utilizador, a entrada fica marcada como desatualizada (formato no passo 3). A Redação do site de notícias faz descer as skills que leem essa entrada até uma «Edição:» a reescrever. Uma novidade retirada como lixo nunca conta, nem para subir nem para descer.

## Níveis de confiança

| Nível | Quando |
|---|---|
| `alta` | Fonte oficial primária (o próprio fornecedor, organismo ou autor do standard), lida diretamente, com data explícita. **Entra diretamente: edita a entrada, se muda o que ela diz, ou entra no `ATUALIZACOES.md` da secção.** |
| `media` | Fonte oficial, mas com uma de três limitações: é indireta (feed só com título, página de resumo); foi lida só em parte; ou o conteúdo foi colado pelo utilizador sem que o pudesses confirmar. Também é `media` quando a data não é indicada. **Entra diretamente, como a `alta`, com «Confiança: media».** Sai só se o utilizador o pedir (passo 2). |
| `baixa` | Fonte não oficial ou da comunidade, ou informação sem fonte verificável. **Nunca altera o conhecimento.** |

## 0. Preparar

Antes de tudo, o pedido. Sem argumento, faz uma só pergunta: todos os temas (recomendado) ou um só. Com um tema, `pessoal` ou o caminho de uma entrada, não perguntes nada. Com um pedido vago (por exemplo «vê o que mudou na segurança» ou «põe isto na base»), pergunta uma coisa de cada vez, no máximo três, no formato de `../orchestrate-sessions/regras.md`, com uma recomendação, e pára quando tens o que precisas:
- o quê: uma entrada ou um ponto «A vigiar» (o mais barato), um tema, ou todos (o mais caro); recomenda o tema que o pedido nomeia;
- onde: a base partilhada, numa cópia git, ou só o conhecimento pessoal; recomenda a partilhada quando há cópia git;
- para fazer o quê: procurar novidades, tirar uma novidade que entrou (passo 2, ponto 1) ou propor uma fonte ou uma entrada nova (passo 2, ponto 4).

Se parte do pedido é de outra skill (ver «Âmbito»), diz qual e porquê antes da primeira pergunta e recomenda-a. Esta skill só corre com `/update-knowledge`, por isso nenhuma skill mãe a chama e não há parte a devolver.

1. **Encontrar o repositório.** A base partilhada trabalha-se numa cópia git de `ClaudioBap/dictionary-skills`, e não na cópia instalada pelo `npx`.
   - Se o diretório atual (ou um pai) tiver `knowledge/INDEX.md`, usa-o.
   - Senão, pergunta ao utilizador onde está a cópia, ou propõe clonar com `gh repo clone ClaudioBap/dictionary-skills`.
   - Se o utilizador não tiver nem quiser a cópia (por exemplo, só instalou as skills), trabalha em **modo local**: as fontes da base partilhada leem-se na cópia instalada, sem a alterar, e o que se encontrar vai para o conhecimento pessoal. Ver «Modo local», no passo 5.
   - Se pediu `pessoal`, salta a base partilhada e faz só o passo 5, com as fontes pessoais.
2. Com a cópia git, trabalha no `main` (sem ramos à parte) e faz `git pull`. Se `git status` mostrar alterações em `knowledge/` de uma corrida anterior que não chegou a publicar, trata delas antes de procurar novidades: escreve as linhas do `CHANGELOG.md` que faltem (o `verificar-alteracoes.mjs` diz quais) e publica-as com o passo 4. Uma corrida nunca começa em cima de trabalho por gravar.
3. Lê:
   - `knowledge/FONTES.md`: o registo por tema e a secção «A vigiar»;
   - `knowledge/INDEX.md`: a taxonomia;
   - `fontes-verificadas.json`, na pasta desta skill: a data a partir da qual procurar em cada fonte. Sem data, usa a última data do `CHANGELOG.md`.

Os caminhos `scripts/...` e `fontes-verificadas.json` são relativos à pasta deste `SKILL.md`. `knowledge/` é relativo à raiz do repositório. Em modo local, `knowledge/` é a pasta que `node ../orchestrate-sessions/scripts/conhecimento.mjs` imprime.

## 1. Procurar novidades

**Primeiro, sem IA: `recolher.mjs`.** Não percorras as fontes à mão. Corre `node scripts/recolher.mjs <repo> --estado <pasta fora do repositório>` e lê só o dossier que ele escreve (`<estado>/dossier-AAAA-MM-DD.json`): os blocos de texto novos de cada página, os itens novos de cada feed e a lista de fontes por ler (bloqueadas ou que só mostram texto com JavaScript, nunca contornadas). A primeira corrida usa `--linha-de-base`, que só grava o estado. O estado (ETag, Last-Modified, hashes dos blocos, ids de feeds já vistos) fica fora do repositório. Cada corrida custa assim só o que mudou.

O fluxo da corrida da noite, cada passo com o seu script em `scripts/`:
1. `recolher.mjs`: vai às fontes de `FONTES.md` (e aos feeds do jornal, com `--feeds-jornal`) sem IA e escreve o dossier;
2. `analisar.mjs --dossier <f> --saida <novidades.json>`: um modelo médio (`claude -p`, sem ferramentas) vê só o dossier e as 5 entradas candidatas de cada item (`recuperar.mjs`, BM25) e devolve as novidades no formato dos passos 2 e 3, mais uma chamada por entrada a editar;
3. `aplicar.mjs --novidades <f> --saida <aplicadas.json>`: escreve as linhas, as edições, as fontes, as entradas novas e o `CHANGELOG.md`, e corre o índice e o verificador (passo 4, pontos 2 e 3);
4. `publicar.mjs` (passo 4, ponto 4);
5. `contexto.mjs --aplicadas <f> --estado <pasta> --jornal <url> --desde <ISO>`: depois de publicado, liga cada novidade à notícia do jornal e gera o contexto das notícias dos feeds para o CID (`contexto-noticias/AAAA-MM-DD.json`).

A leitura a fundo, com agentes que percorrem as fontes (abaixo), só se faz se a pessoa a pedir, por exemplo para uma fonte que o dossier não cobre.

**Leitura a fundo, a pedido.** Para cada tema (ou só o que o utilizador indicou) e para cada fonte do registo:

- **Feed RSS/Atom** (por exemplo `openai.com/news/rss.xml`): corre `node scripts/novidades-rss.mjs <url> --desde <data>`. Para cada item relevante, lê a página do item para o resumo.
- **Página normal:** lê-a e retira só as novidades com data posterior à última verificação.
- **Fonte bloqueada:** aplica a regra «nunca contornar bloqueios».
- **«A vigiar»:** verifica sempre cada ponto da secção, mesmo que a fonte não tenha novidades datadas.

Quando há muitas fontes, podes dividir a leitura por subagentes, um por tema, com um modelo mais barato (`knowledge/ia/subagentes-e-orquestracao.md`, pág. 68). Os subagentes só leem e devolvem as novidades encontradas. Não propõem nem alteram nada.

**Filtrar.** Uma novidade só entra se disser respeito a uma entrada e mudar o que se faz a seguir: atualizar, migrar, configurar ou deixar de usar, ou uma prática, versão, preço, prazo ou regra que a entrada indica. Ficam de fora, mesmo vindas de fonte oficial:
- promoções e créditos;
- produtos e modelos de acesso restrito;
- versões de aplicações de consumo;
- páginas de documentação novas que não trazem regra nova;
- eventos que passam, como uma core update ou uma conferência;
- vulnerabilidades de produtos que nenhuma entrada recomenda;
- o que repete outra novidade.

Na dúvida, procura o produto nas entradas: se nenhuma o cita, fica de fora. O utilizador decidiu esta regra a 2026-11-16, depois de retirar 15 novidades destas.

## 2. Aplicar por confiança, propor o resto

1. **Novidades a tirar.** Não há validação: as novidades entram pela confiança e só saem se o utilizador pedir para tirar alguma (por exemplo, por ser lixo à luz do «Filtrar»). Para cada uma, procura-a pela ligação e pela data de lançamento:
   - numa atualização, apaga a linha do `ATUALIZACOES.md`;
   - numa edição, repõe na entrada o texto anterior que está no «Histórico» e acrescenta ao «Histórico» uma linha a dizer que a edição foi retirada a pedido do utilizador.
   Em ambos os casos, regista no `CHANGELOG.md` uma linha cuja Alteração começa por «Retirada:» (com o motivo entre parênteses), com o ficheiro, a mesma fonte, a mesma data de lançamento, a mesma confiança e, em «Aprovado por», o nome do utilizador. O site de notícias lê essa linha e deixa de mostrar a novidade.
2. **Atualizações e edições `alta`:** aplica-as diretamente (passo 3), sem pedir aprovação, e mostra a lista do que entrou.
3. **Atualizações e edições `media`:** aplica-as como as `alta` (passo 3), sem pedir aprovação, com `Confiança: media` na linha e, no `CHANGELOG.md`, «aplicada sem aprovação (fonte média)» em «Aprovado por». Mostra-as numa lista à parte das `alta`, para o utilizador saber o que pode querer tirar.
4. **Novas entradas e fontes novas**, qualquer que seja a confiança: propõe uma de cada vez, como abaixo.

Para cada novidade, identifica onde encaixa:
- **Edição** de uma entrada, quando a novidade muda o que ela diz (com `alta` ou `media`, aplica-se logo);
- **Atualização**, quando é uma novidade sobre o tema que não muda o texto de nenhuma entrada (diz a que entrada diz respeito, se houver);
- **Nova entrada** numa secção existente (propõe o nome do ficheiro);
- **Fonte** nova para o registo.

Apresenta-a assim e espera pela resposta:

```
🆕 N3 de 12 — <título>
📅 Lançado a: <data da fonte | data não indicada>
🔗 Fonte: <nome> — <url>
🎯 Confiança: <alta|media|baixa> — <porquê, numa frase>
📂 Encaixa em: <knowledge/ia/escolher-o-modelo-claude.md> (<edição | atualização | nova entrada | fonte>)

Proposta:
  Antes: <texto atual, para edições; ou «(sem alteração)»>
  Acrescentar/Depois: <texto proposto, em português, só com o que a fonte diz>

Opções:
1. **Aprovar**: altera o conhecimento
2. **Editar**: dizes o que mudar e eu volto a propor
3. **Rejeitar**
```

## 3. Aplicar o que foi aprovado

- **Atualização:** acrescenta uma linha ao `knowledge/<secção>/ATUALIZACOES.md`, debaixo do título `## <categoria>` (fornecedor ou tema, ex.: «Claude (Anthropic)», «OpenAI», «Regulação»), da mais recente para a mais antiga. Serve para novidades que não mudam o que uma entrada diz; as que mudam são edições. Se o ficheiro não existir, cria-o com o título `# Atualizações: <título da secção>` e uma frase a dizer que não altera o texto das entradas. Cada linha:
  `- **<data de lançamento>** em [<título da entrada>](<slug>.md): <texto>. Fonte: [<nome>](<url>). Confiança: <nível>. Adicionado a <hoje>.`
  A parte «em [...]» diz a entrada a que a novidade diz respeito; uma novidade sem entrada não passa no «Filtrar». O `indice.mjs` ignora o `ATUALIZACOES.md` e o `ATUALIZACOES-ARQUIVO.md`; não são entradas.
- **Nova entrada:** cria `knowledge/<secção>/<slug>.md` com a mesma estrutura das outras: frontmatter, título, `**Resumo:**`, «Conteúdo», «Para uma skill» e rodapé. O frontmatter leva:
  ```
  id: <secção>/<slug>
  titulo: "<título>"
  seccao: "<título da secção>"
  paginas: []
  fonte: "<url da fonte>"
  data_lancamento: <data | null>
  confianca: <nível>
  verificado_em: <hoje>
  ```
- **Edição:** reescreve só a parte da entrada que deixou de valer, para dizer o que vale hoje (incluindo a linha «Para uma skill», se o critério mudou), e acrescenta a fonte nova em «Fontes oficiais». O texto que lá estava passa, sem alterações, para uma secção `## Histórico` no fim da entrada (cria-a se não existir), da mais recente para a mais antiga:
  `- **<data de lançamento>**: antes, «<texto anterior>» (<origem: PDF pág. X, ou a fonte anterior>). Mudou porque <novidade>. Fonte: [<nome>](<url>). Editado a <hoje>.`
  Numa edição `media`, escreve `Confiança: media.` antes de «Editado a».
  No frontmatter, atualiza `verificado_em` e acrescenta `editado_em: <hoje>`. Numa entrada do PDF, `paginas` e `fonte` ficam como estão: dizem de onde a entrada nasceu.
- **Fonte:** acrescenta a linha ao registo do tema em `FONTES.md`.
- **Desatualizada:** não muda nenhum ficheiro; só acrescenta ao `CHANGELOG.md` uma linha cuja Alteração começa por «Desatualizada:», com o que deixou de valer e a data da novidade, o caminho da entrada em Ficheiro, e a fonte, a data de lançamento e a confiança da novidade:
  `| <hoje> | Desatualizada: <o que deixou de valer> (novidade de <data>) | <secção>/<slug>.md | [<nome>](<url>) | <data de lançamento> | <nível> | <quem aprovou> |`
  A entrada volta a contar quando uma linha «Edição:» do mesmo ficheiro a reescreve. Se a marca estava errada, desfaz-se com uma linha «Retirada: marca Desatualizada (<motivo>)» com o mesmo ficheiro, a mesma fonte e a mesma data de lançamento. A novidade que deu origem à marca continua no conhecimento e no jornal.

Depois de cada alteração aprovada:
acrescenta uma linha ao `knowledge/CHANGELOG.md` (data, alteração, caminho do ficheiro relativo a `knowledge/`, fonte, data de lançamento, confiança, «Aprovado por» com o nome do utilizador).

As rejeitadas também têm uma linha no `CHANGELOG.md`, marcada como rejeitada, para não voltarem a ser propostas.

## 4. Verificar e publicar

1. Atualiza as datas em `fontes-verificadas.json`.
1a. **Arquiva o que tem mais de um ano.** Em cada `ATUALIZACOES.md`, passa para `ATUALIZACOES-ARQUIVO.md` da mesma secção as linhas com «Adicionado a» há mais de 12 meses, sem alterar o texto, na mesma categoria. Se o arquivo não existir, cria-o com o título `# Arquivo de atualizações: <título da secção>`. Uma linha no `CHANGELOG.md` por secção arquivada.
1b. **Atualiza as skills que dependem do que mudou.** As skills da coleção (`skills/*/`) citam entradas e às vezes copiam valores delas, como nomes de modelos, preços ou algoritmos. Para cada entrada editada, procura em `skills/`, fora de `knowledge/`, o caminho da entrada e o valor antigo, e atualiza essas passagens para o valor novo, citando a entrada. Se a novidade tira o sentido a um passo de uma skill (por exemplo, uma ferramenta descontinuada que a skill manda usar), não o reescrevas sozinho: mostra-o ao utilizador e pergunta.
2. Corre `node scripts/indice.mjs <repo>/knowledge` para pôr em dia o `INDEX.md`, os `README.md` das secções e as contagens do `README.md` e do `README.en.md` da raiz.
3. Corre `node scripts/verificar-alteracoes.mjs <repo>` e **mostra a saída**. Se falhar, corrige (normalmente falta uma linha no CHANGELOG) e corre outra vez. Não avances sem `✓`.
4. **Publica, sem perguntar:** corre `node scripts/publicar.mjs <repo>`, com `--incluir <caminho>` para cada skill alterada no passo 1b, e **mostra a saída**. O utilizador decidiu a 2026-11-16 que cada corrida termina publicada, para o trabalho não se acumular por gravar. O script:
   - volta a correr o índice e o verificador;
   - faz commit no `main`, com uma mensagem que junta as alterações do `CHANGELOG.md`;
   - faz `git pull --rebase` e `git push`.
   Se o pull trouxer conflitos ou o push for recusado, o commit fica local: mostra o erro ao utilizador e nunca forces o push.
5. A partir daí, quem lê a base a partir de `~/.dictionary-skills` recebe o conhecimento novo com `node ../orchestrate-sessions/scripts/conhecimento.mjs --atualizar`, e o site de notícias apanha-o na sincronização seguinte.

## 5. Conhecimento pessoal

Sempre que esta skill corre, atualiza também o conhecimento pessoal do utilizador em `~/.start-project-with-trust/` (no Windows, `%USERPROFILE%\.start-project-with-trust\`), criado com as fontes do tipo de trabalho dessa pessoa. Se a pasta não existir (por exemplo, numa primeira instalação), cria-a com `perfil.md`, `FONTES.md`, `CHANGELOG.md` e `pendentes.md` só com o título, e diz ao utilizador onde fica e para que serve.

### Modo local

Para quem só instalou as skills, sem cópia git do repositório. A cópia instalada nunca se altera, porque o próximo `npx skills update` a substituiria. Nesse modo:

- **Fontes:** além das pessoais, percorre as de `knowledge/FONTES.md` da cópia instalada, incluindo os pontos «A vigiar», com as regras do passo 1. Procura a partir da data de cada fonte em `~/.start-project-with-trust/fontes-verificadas.json`; se lá não estiver, a de `fontes-verificadas.json` desta skill, que vem com a instalação.
- **Aplicar:** como no ponto 3 abaixo, sempre no conhecimento pessoal.
- **Novas entradas, edições e fontes novas** não se aplicam à base partilhada. Diz ao utilizador que as pode propor ao repositório com os modelos de issue (ver `CONTRIBUTING.md`).
- Não corre os passos 2 a 4 (`CHANGELOG.md` partilhado, verificadores, commit e push).

1. **Validações pendentes.** Lê `pendentes.md`. Para cada novidade lá registada, pergunta ao utilizador se entra: se sim, aplica-a como em 2; se não, regista-a como rejeitada no `CHANGELOG.md` pessoal. Tira-a de `pendentes.md` em ambos os casos.
2. **Procurar.** Para cada fonte de `FONTES.md` pessoal (e de `perfil.md`, se indicar temas sem fonte), procura novidades desde a última verificação, com as mesmas regras do passo 1: data como a fonte a indica, sem contornar bloqueios e com os mesmos níveis de confiança.
3. **Aplicar por confiança:**
   - `alta`: se a novidade muda o que uma entrada da base partilhada diz, cria no conhecimento pessoal uma cópia dessa entrada no mesmo caminho (`knowledge/<secção>/<slug>.md`), já editada como no passo 3, com o «Histórico»; as skills que leem a base usam a pessoal em vez da partilhada (ponto 1 de «Quando falta conhecimento»). Se não muda o texto, acrescenta a linha a `knowledge/<secção>/ATUALIZACOES.md` pessoal, na categoria certa. Sem pedir aprovação;
   - `media`: não altera nada; regista-a em `pendentes.md` (data, título, fonte, motivo da confiança) para o utilizador decidir na corrida seguinte;
   - `baixa`: ignora.
4. **Registar.** Uma linha no `CHANGELOG.md` pessoal por alteração, e a data da verificação de cada fonte em `FONTES.md` pessoal. Em qualquer modo, grava em `~/.start-project-with-trust/fontes-verificadas.json` (mesmo formato do desta skill) a data de hoje em `atualizado_em` e, em modo local, a data de cada fonte da base partilhada verificada. A `orchestrate-sessions` usa esta data para saber há quanto tempo o conhecimento não é atualizado.
4a. **Arquivar.** A mesma regra de um ano da base partilhada: as linhas com «Adicionado a» há mais de 12 meses passam para `ATUALIZACOES-ARQUIVO.md` da secção, sem se apagarem.
5. **Nunca partilhar.** O conhecimento pessoal não vai para o repositório da skill, nem para o `CHANGELOG.md` partilhado, e não tem commit nem push.

## Relatório final

Mostra:
- as novidades encontradas: aplicadas (as `media` à parte), retiradas e rejeitadas;
- as entradas editadas, cada uma com o antes e o depois numa linha;
- as passagens de skills atualizadas por causa dessas edições, e as que ficaram para o utilizador decidir;
- as fontes percorridas e as que ficaram por ler (bloqueadas ou indisponíveis);
- o estado de cada ponto «A vigiar»;
- o commit publicado;
- no conhecimento pessoal: o que entrou, o que ficou em `pendentes.md` e as fontes por ler.


## Quando falta conhecimento

Esta secção não faz parte de uma corrida da update-knowledge. É o procedimento que as outras skills seguem quando a base não tem a resposta, ou quando uma entrada está desatualizada face ao que o utilizador descreve ou à versão que o projeto usa. Cada skill diz, numa linha, quando o usa e que fontes oficiais servem o seu tema.

1. Vê primeiro o conhecimento pessoal em `~/.start-project-with-trust/knowledge/`: o que falta pode já lá estar, de uma vez anterior. Se uma entrada pessoal tem o mesmo caminho que uma da base partilhada, vale a pessoal, porque é a versão já atualizada.
2. Lê as fontes oficiais primárias do tema: as que a skill indica, ou as do fornecedor, do autor ou do organismo em causa. Não contornes bloqueios: se uma fonte recusar o acesso automático, pede ao utilizador o conteúdo ou regista-a como não lida.
3. Dá a cada facto a confiança de «Níveis de confiança» (`alta`, `media`, `baixa`). Um facto `baixa` não serve de base.
4. Regista o que encontraste antes de responder, construir ou usar:
   - numa cópia git do repositório (existe `knowledge/INDEX.md` no diretório atual ou acima), propõe ao utilizador a entrada nova na secção certa, ou a secção nova se a base não a tem, no formato do passo 3, e só a escreves com a aprovação dele;
   - fora disso, no conhecimento pessoal: a entrada em `~/.start-project-with-trust/knowledge/<secção>/<slug>.md`, a fonte em `FONTES.md` pessoal e uma linha no `CHANGELOG.md` pessoal;
   - se o que encontraste substitui o que uma entrada diz, segue a regra de edição do passo 3: a entrada passa a dizer o que vale hoje e o texto anterior fica no «Histórico» dela (fora de uma cópia git, numa cópia pessoal da entrada).
5. Diz ao utilizador que fontes leste e o que registaste.

## Documentação

Se a skill `documentacao` estiver instalada (existe `../documentacao/SKILL.md`), no fim de uma corrida que alterou o conhecimento escreve o relatório do processo, como diz o modo «processo» dela, com a referência às linhas novas do `CHANGELOG.md`. Uma corrida sem alterações não leva relatório.

---
name: update-knowledge
description: Atualiza a base de conhecimento da skill start-project-with-trust e os dados do site de notícias. Percorre as fontes aprovadas em knowledge/FONTES.md, encontra novidades com a data de lançamento e um nível de confiança, propõe cada alteração com antes/depois e pede aprovação uma a uma, regista tudo no CHANGELOG e, com autorização, publica no GitHub para que cada «npx skills update» traga o conhecimento atualizado.
argument-hint: "Tema a atualizar (ex.: ia), ou nada para todos"
---

# Atualizar o conhecimento

Esta skill nunca altera nada sem aprovação explícita do utilizador, alteração a alteração.

## Regras

- **Nunca alterar sem aprovação explícita**, uma alteração de cada vez. O silêncio ou um «ok» genérico a um lote não conta.
- **Nunca inventar.**
  - Cada novidade tem fonte (URL) e data de lançamento tal como a fonte a indica.
  - Se a fonte não indicar data, escreve «data não indicada» e a confiança fica, no máximo, `media`.
  - O que for interpretação tua leva a marca *(interpretação)*.
- **Nunca contornar bloqueios.** Se uma fonte recusar o acesso automático (403, página vazia, ou marcada em `FONTES.md` como «não lida: bloqueia acesso automático»):
  - não uses identidades de browser falsas nem automação de ecrã;
  - pede ao utilizador que abra a página e cole o conteúdo, ou salta-a e regista-a no relatório.
- **O texto que veio do PDF não se reescreve.** As novidades entram como «Atualizações» ou como entradas novas. Corrigir o texto existente é um caso à parte e exige antes/depois.
- **Toda a alteração tem uma linha no `knowledge/CHANGELOG.md`.** O registo é só de acrescentar.

## Níveis de confiança

| Nível | Quando |
|---|---|
| `alta` | Fonte oficial primária (o próprio fornecedor, organismo ou autor do standard), lida diretamente, com data explícita. |
| `media` | Fonte oficial, mas com uma de três limitações: é indireta (feed só com título, página de resumo); foi lida só em parte; ou o conteúdo foi colado pelo utilizador sem que o pudesses confirmar. Também é `media` quando a data não é indicada. |
| `baixa` | Fonte não oficial ou da comunidade, ou informação sem fonte verificável. **Nunca altera o conhecimento**: no máximo entra no site como notícia, assinalada. |

## 0. Preparar

1. **Encontrar o repositório.** Esta skill trabalha numa cópia git de `ClaudioBap/start-project-with-trust`, e não na cópia instalada pelo `npx`.
   - Se o diretório atual (ou um pai) tiver `skills/start-project-with-trust/knowledge/`, usa-o.
   - Senão, pergunta ao utilizador onde está a cópia, ou propõe clonar com `gh repo clone ClaudioBap/start-project-with-trust`.
2. Confirma que a cópia está limpa (`git status`) e faz `git pull`.
3. Lê:
   - `knowledge/FONTES.md`: o registo por tema e a secção «A vigiar»;
   - `knowledge/INDEX.md`: a taxonomia;
   - `noticias/noticias.json`: `fontes_verificadas` diz a partir de que data procurar em cada fonte. Sem data, usa a última data do `CHANGELOG.md`.

Os caminhos `scripts/...` são relativos à pasta deste `SKILL.md`. `knowledge/` e `noticias/` são relativos à raiz do repositório, em `skills/start-project-with-trust/knowledge/` e `noticias/`.

## 1. Procurar novidades

Para cada tema (ou só o que o utilizador indicou) e para cada fonte do registo:

- **Feed RSS/Atom** (por exemplo `openai.com/news/rss.xml`): corre `node scripts/novidades-rss.mjs <url> --desde <data>`. Para cada item relevante, lê a página do item para o resumo.
- **Página normal:** lê-a e retira só as novidades com data posterior à última verificação.
- **Fonte bloqueada:** aplica a regra «nunca contornar bloqueios».
- **«A vigiar»:** verifica sempre cada ponto da secção, mesmo que a fonte não tenha novidades datadas.

Quando há muitas fontes, podes dividir a leitura por subagentes, um por tema, com um modelo mais barato (`knowledge/ia/subagentes-e-orquestracao.md`, pág. 68). Os subagentes só leem e devolvem as novidades encontradas. Não propõem nem alteram nada.

**Filtrar.** Fica só o que muda uma boa prática, uma versão, um preço, um prazo, uma regra ou uma recomendação. O que é marketing, um caso de cliente ou um evento sem consequência para o conhecimento entra no máximo como notícia para o site, se o utilizador quiser.

## 2. Propor, uma de cada vez

Para cada novidade, identifica onde encaixa:
- **Atualização** de uma entrada existente (diz qual);
- **Nova entrada** numa secção existente (propõe o nome do ficheiro);
- **Correção** do texto de uma entrada, só quando a fonte o contradiz;
- **Fonte** nova para o registo.

Apresenta-a assim e espera pela resposta:

```
🆕 N3 de 12 — <título>
📅 Lançado a: <data da fonte | data não indicada>
🔗 Fonte: <nome> — <url>
🎯 Confiança: <alta|media|baixa> — <porquê, numa frase>
📂 Encaixa em: <knowledge/ia/escolher-o-modelo-claude.md> (<atualização | nova entrada | correção | fonte>)

Proposta:
  Antes: <texto atual, para correções; ou «(sem alteração)»>
  Acrescentar/Depois: <texto proposto, em português, só com o que a fonte diz>

Opções:
1. **Aprovar**: altera o conhecimento e publica no site
2. **Só notícia**: publica no site sem alterar o conhecimento
3. **Editar**: dizes o que mudar e eu volto a propor
4. **Rejeitar**
```

## 3. Aplicar o que foi aprovado

- **Atualização:** acrescenta no fim da entrada, antes do rodapé `Fonte:`, uma secção `## Atualizações` (cria-a se não existir) com uma linha por novidade:
  `- **<data de lançamento>**: <texto>. Fonte: [<nome>](<url>). Confiança: <nível>. Adicionado a <hoje>.`
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
- **Correção:** altera só o texto aprovado. Se a entrada vem do PDF, o texto original fica como `> Texto original do PDF (pág. X): …` logo abaixo da correção.
- **Fonte:** acrescenta a linha ao registo do tema em `FONTES.md`.

Depois de cada alteração aprovada:
1. acrescenta uma linha ao `knowledge/CHANGELOG.md` (data, alteração, caminho do ficheiro relativo a `knowledge/`, fonte, data de lançamento, confiança, «Aprovado por» com o nome do utilizador);
2. acrescenta ou atualiza a notícia em `noticias/noticias.json` (formato em `noticias/README.md`), com o `estado` que o utilizador escolheu.

As rejeitadas também entram em `noticias.json`, com `estado: rejeitada`, para não voltarem a ser propostas.

## 4. Verificar e publicar

1. Atualiza `fontes_verificadas` e `atualizado_em` em `noticias.json`.
2. Corre `node scripts/indice.mjs <repo>/skills/start-project-with-trust/knowledge` para pôr o `INDEX.md` e os `README.md` em dia.
3. Corre `node scripts/verificar-alteracoes.mjs <repo>` e **mostra a saída**. Se falhar, corrige (normalmente falta uma linha no CHANGELOG) e corre outra vez. Não avances sem `✓`.
4. Mostra `git diff --stat` e um resumo das alterações, e pergunta se pode fazer commit e push.
5. Com autorização, faz commit (uma mensagem que resuma as novidades) e `git push`. A partir daí, `npx skills update start-project-with-trust` traz o conhecimento novo a quem tem a skill instalada, e o site lê o `noticias.json` atualizado.

## Relatório final

Mostra:
- as novidades encontradas, aprovadas, só notícia e rejeitadas;
- as fontes percorridas e as que ficaram por ler (bloqueadas ou indisponíveis);
- o estado de cada ponto «A vigiar»;
- o commit publicado.

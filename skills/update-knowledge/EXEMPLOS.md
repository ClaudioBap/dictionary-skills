# Exemplos: update-knowledge

## O que faz

Atualiza a base de conhecimento partilhada, que a `orchestrate-sessions` e as sub skills leem, e o conhecimento pessoal de quem as usa. Percorre as fontes aprovadas em `knowledge/FONTES.md`, encontra as novidades com a data de lançamento e dá a cada uma uma confiança: o que vem de fonte oficial primária com data (`alta`) entra sem pedir aprovação, o de confiança `media` entra da mesma forma mas marcado como médio, e o de confiança `baixa` é ignorado. Cada alteração tem uma linha no `CHANGELOG.md`, e cada corrida termina publicada no GitHub, com commit e push. Só corre quando alguém a chama com `/update-knowledge`.

## Quando usar

- De tempos a tempos, para pôr a base em dia com as fontes oficiais.
- Quando a `orchestrate-sessions` avisa que o conhecimento tem mais de 3 meses.
- Para um tema só, por exemplo `/update-knowledge ia`.
- Para atualizar só o conhecimento pessoal, com `/update-knowledge pessoal`, mesmo sem cópia git do repositório.

## Quando não usar

- Uma pergunta pontual que a base não cobre: as mini skills já vão às fontes e registam o que encontram, com «Quando falta conhecimento» do `SKILL.md` desta skill.
- Para mudar o conhecimento sem fonte: a skill nunca inventa, e uma novidade sem data fica no máximo com confiança `media`.

## Exemplo: todas as secções de uma vez

**Pedido:** «/update-knowledge»

**O que a skill faz:**

1. Confirma que a cópia git está limpa, faz `git pull` e lê `FONTES.md` e `INDEX.md`.
2. Percorre as fontes de cada tema desde a última verificação, incluindo os pontos «A vigiar», e fica só com o que muda uma prática, uma versão, um prazo ou uma regra.
3. Aplica as novidades de confiança `alta` no `ATUALIZACOES.md` de cada secção, por exemplo o Docker Engine 29.9.3 (segurança) e o Compose 5.7.0.
4. Corre `scripts/indice.mjs` e `scripts/verificar-alteracoes.mjs` até passar e mostra o `git diff --stat`.
5. Publica com `scripts/publicar.mjs`: verifica o CHANGELOG e o índice, faz commit no `main` e push, sem perguntar.

**Resultado:** Foi a corrida de 2026-11-04 no repositório das skills, com um commit por secção, de «Atualização IA» a «Atualização Plataformas».

## Exemplo: uma entrada reescrita com histórico

**Pedido:** «/update-knowledge ia»

**O que a skill faz:**

1. Encontra nas notas de lançamento da Anthropic, uma fonte `alta`, que o Fable 5.2 passou a ser o modelo mais capaz e o Fable 5.1 a legado.
2. Como a novidade muda o que `ia/escolher-o-modelo-claude.md` diz, reescreve a entrada sem pedir aprovação e passa o texto anterior para a secção «Histórico», com a data, a razão e a fonte.
3. Faz o mesmo em `ia/pensar-e-esforco.md` e acrescenta o lançamento a `ia/ATUALIZACOES.md`.
4. Procura nas skills as passagens que copiavam o valor antigo e atualiza a tabela de `orchestrate-sessions/modelo-e-effort.md`.
5. Escreve uma linha no `CHANGELOG.md` por alteração, marcada como aplicada sem aprovação por ser de fonte `alta`.

**Resultado:** Foi a primeira edição pela regra nova, a 2026-11-10, no commit `8166afc` do repositório das skills.

## Exemplo: só o conhecimento pessoal

**Pedido:** «/update-knowledge pessoal»

**O que a skill faz:**

1. Salta a base partilhada e lê `~/.start-project-with-trust/FONTES.md` e as novidades pessoais à espera de decisão, perguntando a decisão de cada uma.
2. Procura novidades nas fontes pessoais com as mesmas regras de data e confiança; uma fonte que recusa o acesso automático fica por ler, ou o utilizador cola o conteúdo.
3. Quando uma novidade `alta` muda uma entrada partilhada, cria uma cópia pessoal da entrada já editada, que as skills passam a usar no lugar da partilhada.
4. Grava a data de hoje em `~/.start-project-with-trust/fontes-verificadas.json`.

**Resultado:** O conhecimento pessoal em dia, sem nada enviado para o repositório da skill.

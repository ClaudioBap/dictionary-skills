---
id: portais-de-agentes/avaliacao-de-skills-por-push
titulo: "Avaliar as skills em cada push"
seccao: "Portais e mundos de agentes"
paginas: []
fonte: "https://code.claude.com/docs/en/hooks"
data_lancamento: null
confianca: alta
verificado_em: 2026-11-18
---

# Avaliar as skills em cada push

**Resumo:** Depois de um `git push` que enviou alguma coisa, um hook `PostToolUse` devolve à sessão, em `additionalContext`, o pedido para dar uma nota de 0 a 10 a cada skill usada no projeto desde o push anterior, com o critério escrito por extenso; a sessão avalia, um script tira os segredos e envia, e as notas ficam numa pauta por projeto, sem prazo. É autoavaliação feita por um modelo: serve para ver tendências, não substitui um eval.

## Conteúdo

Origem: o projeto de origem, um portal que acompanha as sessões do Claude Code de uma equipa, onde as notas por push foram construídas e postas à prova a 2026-11-17 e 2026-11-18. O que vem só dessa experiência está marcado *(experiência do projeto)*; o que é do Claude Code foi confirmado nas fontes oficiais lidas a 2026-11-18.

### O disparo

- O evento é o `PostToolUse`, que só corre quando a ferramenta acaba bem. Um comando que falha vai para o `PostToolUseFailure` e nunca chega a este hook.
- O hook regista-se nas ferramentas de consola. No Bash, com `if: "Bash(git *)"`, para não ser lançado em cada comando. O `if` aceita uma regra de permissão, e as regras do PowerShell têm a mesma forma que as do Bash, por isso no PowerShell o registo leva `if: "PowerShell(git *)"`. O projeto de origem registou o PowerShell sem `if` (não provou esta forma) e pagou o arranque do Node, cerca de 100 ms, em cada comando *(experiência do projeto)*.
- É síncrono, com `timeout` curto (15 s na origem). Um hook `async` só entrega o que devolve no turno seguinte, e se a sessão estiver parada espera pela próxima interação: o pedido chegava tarde.
- A resposta vai em `hookSpecificOutput.additionalContext`, com `hookEventName: "PostToolUse"`: o Claude Code junta esse texto ao resultado da ferramenta. Há um teto de 10 000 carateres; o pedido da origem tinha cerca de 1400.

### Reconhecer um push que enviou alguma coisa

O hook recebe `tool_input.command` e, no Bash, `tool_response` com `stdout`, `stderr`, `interrupted` e `isImage`. O código de saída não está entre os campos documentados. O reconhecimento faz-se em dois passos *(experiência do projeto)*:

1. O comando tem `git push`, também com opções antes do subcomando (`git -C pasta push`) e dentro de comandos compostos. `git stash push` não conta. `--dry-run`, `-n` e `--help` não enviam nada.
2. O que o git escreveu confirma: `[rejected]`, `error:`, `fatal:` ou `failed to push` querem dizer que falhou (um `git push || true` acaba bem com o push recusado); «Everything up-to-date» sem nenhuma referência enviada quer dizer que não saiu nada; `interrupted` verdadeiro também não conta.

Um push feito por um script que a sessão corre não se reconhece pelo texto do comando.

### O pedido à sessão

- O hook pergunta ao portal que skills o projeto usou desde o último push com notas. Sem nenhuma, não pede nada. Com o portal em baixo, ou fora de um projeto que o portal conheça, também não.
- «Desde o push anterior» quer dizer desde o último push que recebeu notas: se a sessão não chegar a avaliar, as skills passam para o push seguinte em vez de se perderem *(experiência do projeto)*.
- Contam as skills de todas as sessões do projeto, não só as da sessão que fez o push. Quem fez o push avalia; numa skill que correu noutra sessão, avalia pelo que ficou no repositório e di-lo na frase.
- O texto devolvido traz a lista das skills, o critério por extenso, o JSON já preenchido com a sessão e o instante do push, e o comando para enviar. O instante é o que o hook viu; com o projeto e a skill, é ele que torna o envio idempotente.

### O critério

Este é o texto que o hook devolve à sessão. Vive no próprio hook do portal, e não numa skill: a sessão que faz o push não depende de nenhuma skill instalada para saber como avaliar. Esta entrada é a fonte de onde se tira.

1. **Fez o que a descrição promete?** Compara o que a skill entregou com a `description` do `SKILL.md` dela, e não com o esforço que deu.
2. **Deixou prova?** Um teste, um comando com a saída, uma captura ou um ficheiro que outra pessoa possa abrir e repetir.
3. **Quanto retrabalho o utilizador pediu depois?** Cada correção pedida ao que a skill entregou baixa a nota.

Um 10 exige prova. Sem prova, a nota não passa de 6. A frase diz o que pesou na nota, em 300 carateres no máximo, sem segredos nem dados pessoais. A sessão avalia o seu próprio trabalho e tende a ser generosa: na dúvida entre duas notas, dá a mais baixa.

Quem muda o critério muda-o aqui primeiro e depois copia-o para o texto do hook. Um critério que só existe no hook diverge sem ninguém dar por isso.

### O avaliador não se avalia

Se o portal tem um papel de avaliador (uma skill ou um agente que conduz a avaliação na sala), esse não recebe nota: seria juiz em causa própria. O papel é configuração do portal, não um nome escrito no código, para outro conjunto de skills poder escolher o seu.

### Enviar e guardar

- A sessão envia as notas com um script local, que valida antes de sair do PC: inteiro de 0 a 10, uma frase por skill, segredos que se reconhecem tirados, tudo numa linha, cortado a 300 carateres. Os segredos saem antes do corte, para um token não ficar a meio e passar sem ser reconhecido *(experiência do projeto)*.
- O servidor só aceita skills que o projeto usou entre o push anterior e este, e um push novo tem de ser posterior aos que já têm notas: um PC não enche a pauta com o que quiser.
- Uma linha por push e por skill. Enviar outra vez o mesmo push não muda a nota que lá está (primeira vez 201, repetições 200).
- As notas não têm prazo: ficam fora da limpeza dos eventos e continuam lá quando a sessão sai ou o projeto é arquivado. A frase é conteúdo de trabalho guardado sem prazo, com a conta de quem a deu, e a equipa tem de o saber.
- A pauta é por projeto: uma tabela com o push mais recente primeiro (data, skill, nota, frase, sessão e, numa sala partilhada, a pessoa), filtro no cabeçalho de cada coluna, ordenação por clique e, por cima, uma linha por skill com a última nota e a média. Sem gráficos que não respondam a uma pergunta.
- O comando que envia as notas pede permissão como outro qualquer, a não ser que esteja na lista de permitidos *(experiência do projeto)*.

### Limites

- É autoavaliação: quem dá a nota é a sessão que fez o trabalho. O teto de 6 sem prova e a regra da nota mais baixa na dúvida travam a generosidade, mas não a eliminam.
- É o julgamento de um modelo, e não uma medição. A mesma sessão pode dar notas diferentes ao mesmo trabalho. Lê-se a tendência de várias notas, não uma nota sozinha.
- Uma nota calculada (testes a passar, tempo, tamanho do diff) foi posta de parte no projeto de origem: não mede se a skill fez o que a descrição promete.
- Para saber se uma mudança numa skill a melhorou, a pauta não chega: corre-se um eval antes e depois. Ver [Avaliação (evals)](../ia/avaliacao-evals.md).

### O que verificar

- Um push verdadeiro para um remoto local, com o hook a correr sobre a entrada que o Claude Code lhe dá: pede notas só com skills usadas, e nunca com `git status`, push recusado, «Everything up-to-date», `--dry-run` ou `git stash push`.
- Nota fora de 0 a 10, skill não usada no intervalo e push anterior aos já avaliados: recusados.
- O mesmo push enviado duas vezes: a nota não muda.
- Uma frase com um token conhecido chega ao portal sem ele.
- Um push real numa sessão real, pelo menos uma vez, para ver o modelo a responder ao pedido.

**Para uma skill:** as notas por push vêm de um hook `PostToolUse` síncrono nas ferramentas de consola (com `if` no Bash e no PowerShell), que só pede notas quando o git confirma que enviou alguma coisa, devolve em `additionalContext` o critério por extenso desta entrada e um JSON pronto, e as guarda sem prazo, uma por push e por skill, só para skills usadas no intervalo; o avaliador não se avalia, e a pauta é lida como tendência de autoavaliação, nunca como eval.

## Ver também

- [Avaliação (evals)](../ia/avaliacao-evals.md) (Construir com IA)
- [Eventos das sessões e origem das skills](eventos-e-origem-das-skills.md) (Portais e mundos de agentes)
- [Idempotência e processamento fiável](../fiabilidade/idempotencia-e-processamento-fiavel.md) (Fiabilidade e resiliência)
- [Tabelas e dados densos](../design/tabelas-e-dados-densos.md) (Design e experiência de utilizador)

## Fontes oficiais

*Lidas a 2026-11-18.*

- [Claude Code: referência de hooks](https://code.claude.com/docs/en/hooks): `PostToolUse` só depois de a ferramenta acabar bem, `PostToolUseFailure`, `additionalContext` e o teto de 10 000 carateres, `tool_response` do Bash (`stdout`, `stderr`, `interrupted`, `isImage`), campo `if`, saída dos hooks `async` só no turno seguinte
- [Claude Code: permissões](https://code.claude.com/docs/en/permissions): regras `Bash(git *)` e regras do PowerShell com a mesma forma

Fonte: experiência do projeto de origem e as fontes acima. Não vem do PDF.

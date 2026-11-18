# Exemplos: documentacao

## O que faz

Documenta um projeto a partir de uma fonte única: um relatório Markdown por processo, escrito por quem fez o trabalho. Daí gera um livro Excel com os processos e as estatísticas em fórmulas, o Word «Entendimento do desenvolvimento» e o relatório final em Word, ligado aos outros. Antes de gerar, pede ficheiros-padrão da casa para seguir o estilo; sem eles, usa um estilo sóbrio revisto pela `humanizar` e pela `design-ux`.

## Quando usar

- No fim de cada trabalho com resultado, para registar o processo (as outras skills chamam-na).
- No fim de uma fase da `orchestrate-sessions` ou na entrega da `start-project-with-trust`.
- Para documentar um projeto que já vai a meio e nunca teve relatórios.

## Quando não usar

- Escrever um ADR ou um runbook: são documentos do próprio projeto, com as entradas de `knowledge/estrutura/` e a skill `operar`.
- Rever só o texto de um documento que já existe: `humanizar`.

## Exemplo: documentar um projeto que já vai a meio

**Pedido:** «Documenta o portal: um relatório de cada processo, o Excel de processos e de estatísticas, o Word de entendimento e o relatório final.»

**O que a skill faz:**

1. Pergunta pelos ficheiros-padrão da casa. Sem resposta, segue com o estilo por omissão e deixa dito que basta voltar a gerar quando os ficheiros chegarem.
2. Reconstrói 43 relatórios de processo a partir de 33 saídas da orquestração, dos planos, dos ADR e de 151 commits. Todos levam `reconstruido: true`; a duração, o modelo e o effort ficam vazios onde não há registo.
3. Corre `gerar.mjs`, escreve o Entendimento (12 decisões que juntam 19 ADR, a cronologia e os riscos) e o relatório final com os números que o script imprimiu, e volta a gerar.
4. Corre `verificar.mjs` (530 ligações que existem) e abre os ficheiros no Word e no Excel: abrem sem reparação, e as 111 fórmulas dão o mesmo valor que está guardado.
5. Passa a `humanizar` pelos 48 Markdown, sem achados.

**Resultado:** Foi a primeira prova da skill, no portal que acompanha os agentes da equipa: 43 processos (33 feitos, 29 com prova), um Entendimento de 17 páginas e um relatório final de 3. A prova mostrou instruções vagas sobre o cabeçalho e a reconstrução, que passaram a «Regras do cabeçalho», e encontrou falhas do próprio projeto que nenhum documento registava.

## Exemplo: registar o processo que acabou

**Pedido:** a `design-ux` acaba o ecrã de login de uma aplicação, com capturas a 390 px e em ecrã largo.

**O que a skill faz:**

1. Vê que é trabalho com resultado e escolhe o número seguinte em `documentacao/processos/`.
2. Preenche o cabeçalho com o que se verifica: a skill, as datas, os commits do `git log`, `estado: feito` e `prova: sim`.
3. Escreve em poucas linhas o pedido, o que mudou, onde estão as capturas, a decisão sobre a mensagem de erro e o que ficou por preencher (o logótipo do cliente).

**Resultado:** Um relatório que entra no Excel da próxima vez que se gerar, sem ninguém ter de se lembrar do que se fez.

# Exemplos: performance-verifier

## O que faz

Mede antes de propor. Analisa a velocidade e o custo de um site, de uma API ou base de dados, de uma cena 3D ou de uma solução com IA, e compara com um alvo: o critério de sucesso do projeto, o orçamento, ou um valor como «até 2 segundos». Devolve uma tabela de melhorias da mais barata à mais cara, cada uma com o ganho estimado e a entrada que a sustenta. Depois de aplicar o que o utilizador escolhe, volta a medir, e uma melhoria que não mostra ganho é revertida.

## Quando usar

- Um site lento no telemóvel, com um alvo de tempo.
- Uma API com endpoints lentos ou queries sem índice.
- Uma solução com IA cujo custo subiu, para ver o custo por tarefa concluída.
- Antes de mudar de modelo ou de effort, para saber quanto se poupa de facto.

## Quando não usar

- Escolher o modelo para uma funcionalidade nova, sem nada a medir: `ia-aplicada`.
- Construir uma interface ou uma cena: a `design-ux` e a `design-3d-motion` já trazem o seu orçamento de desempenho.

## Exemplo: o custo da classificação de emails

**Pedido:** «A classificação automática dos emails passou a custar mais de 300 euros por mês. Quero ficar abaixo de 100.»

**O que a skill faz:**

1. Fixa o alvo (menos de 100 euros por mês) e lê `ia/otimizacao-de-custo-da-ia.md`, `ia/api-claude/prompt-caching.md`, `ia/api-claude/message-batches.md` e `ia/operacao/uso-e-custo-da-claude-api.md`.
2. Mede a linha de base por tipo de tarefa: tokens de entrada, de saída e da cache, o modelo, o effort e o custo por tarefa concluída, a partir do relatório de uso da API, e marca o que podia esperar e ir em batch.
3. Propõe a tabela, primeiro as poupanças grátis (cache das instruções que se repetem, menos tokens por pedido) e depois os compromissos (effort mais baixo, outro modelo, batch), com *(estimativa)* em cada ganho que não vem de uma medição.
4. Aplica as melhorias escolhidas uma a uma e repete a medição depois de cada uma; a que não mostra ganho é revertida e fica registada.

**Resultado:** O antes e o depois de cada melhoria na mesma tabela, e o custo dentro do alvo, provado pela medição.

## Exemplo: uma página lenta no telemóvel

**Pedido:** «A página de produto demora a abrir no telemóvel. Quero o LCP abaixo de 2,5 segundos.»

**O que a skill faz:**

1. Lê `design/desempenho-web-core-web-vitals.md`, `design/orcamento-de-desempenho.md` e `design/otimizacao-de-imagens-e-media.md`.
2. Mede as páginas principais em telemóvel e em computador e escreve a linha de base: métrica, valor, como foi medido e alvo.
3. Ordena as melhorias da mais barata à mais cara, por exemplo as imagens no tamanho certo antes de uma mudança de alojamento, e pede ao utilizador que escolha.
4. Aplica por ordem e volta a medir depois de cada uma.

**Resultado:** O LCP medido antes e depois, com a ferramenta, o comando e a data de cada número.

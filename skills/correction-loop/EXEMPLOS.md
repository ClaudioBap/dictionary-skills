# Exemplos: correction-loop

## O que faz

Corrige um erro a partir de pouco mais do que «está a dar erro». Descobre sozinha o sintoma, a forma de o reproduzir e o comportamento certo, escreve a prova de que falha, localiza a causa e compara até três formas de corrigir. O estado fica numa árvore em `correcao/<erro>/arvore.md`, e só fecha com a falha provada antes, resolvida depois e os testes antigos a passar. Está em testes e o `npx skills add` com `--skill '*'` não a instala.

## Quando usar

- Algo deixou de funcionar e não se sabe em que commit.
- Um teste passou a falhar depois de uma série de alterações.
- Uma regra de negócio mudou e é preciso saber que partes do código ela toca.
- Quando se quer a prova antes e depois e as correções postas de parte, e não só o remendo.

## Quando não usar

- Um erro pequeno com um teste que o mostra: no ensaio abaixo, uma prompt simples chegou à mesma correção em menos de metade do tempo.
- Construir algo novo: `boas-praticas-codigo` ou `backend-dados`.
- Erros que pedem dados de produção, segredos ou publicação: a skill não lhes toca sem autorização.

## Exemplo: o total das faturas sai errado

**Pedido:** «Está a dar erro: o total de algumas faturas sai errado. Corrige.»

**O que a skill faz:**

1. Preenche o diagnóstico sem perguntar: o sintoma vem do teste das faturas que falha, o comportamento certo dos testes que passavam, e o que não pode mudar dos testes existentes.
2. Regista os testes que passam, como base para provar no fim que nada partiu.
3. Testa versões do histórico pelo meio (quatro, em 12 commits) até chegar ao commit «Formatação em euros», e confirma a causa lendo a alteração: um arredondamento ao meio cêntimo numa função partilhada por faturas e recibos.
4. Prova três formas de corrigir contra a reprodução e os testes, e fica com a que corrige a causa na função partilhada, e não só o sintoma na fatura.
5. Corre `scripts/verificar-arvore.mjs` sobre a árvore e pede a aceitação.

**Resultado:** Foi um dos ensaios da skill, num repositório de teste, e a correção passou os 8 testes escondidos. Uma prompt simples chegou à mesma correção em 2 min 18 s, contra 5 min 23 s com a skill e cerca do dobro do custo.

## Exemplo: uma exportação que deixou de funcionar

**Pedido:** «Desde a última versão, o CSV dos clientes sai com as datas trocadas.»

**O que a skill faz:**

1. Procura no projeto como se gera o CSV e o comportamento certo nas versões anteriores, e assume o que faltar, com a origem `assumida` no diagnóstico.
2. Escreve um teste que reproduz o erro e corre-o para colar a falha.
3. Como o teste não existe nas versões antigas, a verificação repete-se sem os ficheiros de teste dessas versões, até encontrar a primeira que falha.
4. Corrige a causa com a alteração mais pequena e prova o caso normal, a entrada vazia, a inválida e o limite.
5. Escreve na mensagem de commit a causa e a correção numa ou duas frases.

**Resultado:** O teste que reproduzia o erro passa, os que já passavam continuam a passar, e o relatório diz o que custa desfazer a correção.

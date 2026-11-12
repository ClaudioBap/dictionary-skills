# Métodos do correction-loop

Em cada nó medem-se os sinais e escolhe-se o método pela tabela. O nome fica na coluna «Método» de `arvore.md` e não aparece na conversa nem no relatório.

## Sinais

| Sinal | Como se mede |
|---|---|
| Repetição | A chave de memo do nó já existe noutro nó `fechado` |
| Regra mudada | O pedido muda uma regra ou um requisito de algo que já funciona |
| Espaço ordenado | As causas possíveis têm uma ordem em que tudo antes de um ponto está bem e tudo depois está mal: commits, versões, alterações aplicadas em sequência, linhas de uma entrada |
| Sinal numérico | A sonda devolve um número que muda com a causa (tempo, erro, número de testes a falhar), e não só passa ou falha |
| Suspeita por ponto | Uns pontos são mais suspeitos do que outros: tocam os ficheiros ligados ao sintoma, ou são alterações grandes |
| Interação | A falha só aparece com várias alterações juntas, ou a entrada que a provoca é grande |
| Teste instável | A mesma sonda, no mesmo ponto, ora passa ora falha |
| Cobertura | Há testes que passam e testes que falham, e dá para saber que código cada um corre |
| Várias correções | A causa está encontrada e há mais de uma forma razoável de a corrigir |
| Falta da pessoa | Algo sem o qual não se pode continuar e que só a pessoa tem |
| Variáveis em aberto | O que falta fixar para o critério do nó se poder provar |

## Tabela

Lê-se de cima para baixo e fica a primeira linha que serve.

| Situação do nó | Método | Nome em `arvore.md` |
|---|---|---|
| A chave de memo já está resolvida noutro nó | Memoização: reutiliza o resultado e a prova desse nó | `memo` |
| Uma regra ou um requisito mudou | Propagação: reabre só os nós que dependem do que mudou, pela ordem das dependências, como uma folha de cálculo que recalcula; o resto fica fechado | `propagar` |
| Teste instável num espaço ordenado | Bissecção probabilística: repete a sonda em cada ponto, atualiza a probabilidade de cada intervalo conter a causa e testa onde a incerteza é maior | `probabilistica` |
| Espaço ordenado e sinal numérico | Método ITP: estima por interpolação onde a sonda passa o limiar, com a garantia de nunca precisar de mais passos do que a bissecção | `itp` |
| Espaço ordenado e sonda que só passa ou falha | Bissecção ponderada: corta onde a suspeita acumulada chega a metade, e não a meio da contagem; sem razões para pesos, é a bissecção normal | `bissecção` |
| A falha precisa de várias alterações juntas, ou a entrada é grande | Delta debugging: reduz ao conjunto mínimo de alterações, ou de entrada, que ainda provoca a falha | `delta` |
| Sem ordem, com testes que passam e que falham | Localização por espectro: ordena as funções pela fórmula de Ochiai e lê primeiro as mais suspeitas | `espectro` |
| Causa encontrada, com várias formas de corrigir | Comparação: prova até três formas contra a reprodução e os testes, corta as que partem alguma coisa e fica com a primeira pela ordem do passo 3 de `SKILL.md` | `comparar` |
| Falta algo que só a pessoa tem | Uma única mensagem no passo 0, com uma proposta para cada ponto; depois disso decide-se e regista-se, sem perguntar | `pergunta` |
| Uma variável, uma ação com prova | Caso base: faz-se e prova-se | `direto` |
| Duas ou mais variáveis | Dividir: um filho por grupo de variáveis dependentes; os grupos independentes em paralelo | `dividir` |

Regras:

- O memo consulta-se antes de qualquer outro método.
- `dividir` e `propagar` não podem estar no último nível (três divisões abaixo da raiz). Um nó aí com variáveis a mais fica `abandonado`, e o pai divide de outra forma.
- O método muda quando os sinais mudam. A coluna guarda o último.
- No ITP, o limiar é o valor da sonda que separa «bem» de «mal» (por exemplo, o tempo aceitável), e fica escrito no critério do nó.
- Na localização por espectro, a suspeita de uma função é `F_corre / √(F × (F_corre + P_corre))`, em que `F_corre` e `P_corre` são os testes que falham e que passam e correm essa função, e `F` é o total de testes que falham.

Fontes:

- ITP: I. F. D. Oliveira e R. H. C. Takahashi, «An Enhancement of the Bisection Method Average Performance Preserving Minmax Optimality», ACM Transactions on Mathematical Software 47(1), 2021, doi 10.1145/3423597.
- Delta debugging: A. Zeller e R. Hildebrandt, «Simplifying and Isolating Failure-Inducing Input», IEEE Transactions on Software Engineering, 2002.
- Ochiai na localização de falhas: R. Abreu, P. Zoeteweij e A. van Gemund, «On the Accuracy of Spectrum-based Fault Localization», 2007.
- Bissecção probabilística: M. Horstein, 1963; R. Waeber, P. Frazier e S. Henderson, «Bisection Search with Noisy Responses», 2013.

## Candidatos

Um candidato entra na tabela quando `medicao.md` mostrar um caso em que os métodos acima perderam tempo, tokens ou qualidade e o sinal dele estava presente.

| Método | Sinal que o pediria |
|---|---|
| Guloso, do mais barato para o mais caro | Muitas correções independentes, com teste barato e custo conhecido |
| Melhor-primeiro (A*) | Muitas formas de corrigir o mesmo nó, com custo e distância ao critério estimáveis |
| Retrocesso com propagação de restrições | Alterações em malha, em que fixar uma limita as outras |
| Subir pela métrica, com reinício | O critério é um número que se melhora aos poucos, como o tempo de resposta |

Até 2026-11-12 esta skill chamava-se `recursive-loop` e servia também para construir e investigar. A investigação saiu, e com ela o método do feixe; a ordenação topológica entrou como `propagar`, e a escolha entre formas de corrigir (melhor de N, com poda) entrou como `comparar`.

---
name: correction-loop
description: Encontra e corrige a causa de um erro a partir de pouco mais do que «está a dar erro». Descobre sozinho o sintoma, como se reproduz e o que devia acontecer; localiza a causa com o método que melhor serve o sinal disponível; compara as formas de corrigir e fica com a melhor; e só fecha com a falha provada antes e resolvida depois, sem partir o resto. Não faz perguntas, salvo uma vez, no início, se não houver forma de continuar. Usar quando algo deixou de funcionar, um teste falha, há uma regressão ou uma regra mudou.
argument-hint: "O erro como o vês; pode ser só «está a dar erro» e onde"
metadata:
  internal: true
---

# CorrectionLoop

> **Em testes.** Esta skill foi um teste para aumentar a performance: chegar mais depressa à resposta certa de um problema, com um ciclo recursivo e métodos de procura escolhidos pelo sinal disponível. Nos ensaios, num erro com um teste a falhar, uma prompt simples chegou à mesma correção em menos de metade do tempo e por cerca de metade do custo. Fica no repositório como registo do que se aprendeu (`medicao.md`), e o `npx skills add` não a instala com `--skill '*'`.

Recebe um erro e devolve a melhor correção, provada. O erro é a raiz de uma árvore, e cada nó é uma parte do trabalho com um critério que se prova. Um nó só fecha quando os filhos fecharam e o critério dele está provado.

A skill é independente: tudo o que precisa está nesta pasta. Os métodos estão em `algoritmos.md`, o modelo da árvore em `modelos/arvore.md` e o verificador em `scripts/verificar-arvore.mjs`.

## Regras

- **Sem perguntas.** A pessoa diz que está a dar erro; o resto descobres tu. Só se pergunta uma vez, no passo 0, e só se não houver forma de continuar. Durante o trabalho, o que seria decisão da pessoa decide-se pela opção que recomendarias e fica registado para o fim.
- **Nada se corrige sem reprodução.** Primeiro a prova de que falha, depois a correção, depois a mesma prova a passar.
- **Nada parte.** Os testes que passavam antes continuam a passar.
- **Um nó só fecha com prova:** o comando com a saída, ou o ficheiro. No máximo três divisões abaixo da raiz.
- **Os factos verificam-se.** O que vem de documentação externa cita-se com a fonte.
- **O estado vive em ficheiro**, para o trabalho poder parar e retomar.
- **O método não se mostra.** O nome fica na coluna «Método» da árvore. Na conversa, nos commits e no relatório diz-se o que se fez por palavras comuns («testei a versão do meio»).
- **O que fica no projeto segue o estilo do projeto:** código, testes e mensagens de commit como os escreveria uma pessoa da equipa, sem comentários que narram o óbvio.
- **Modelos.** A sessão principal localiza, escolhe e faz as partes pequenas (um ou dois ficheiros). Um subagente só para leitura pesada (`haiku`) ou para corrigir partes grandes e independentes em paralelo (`sonnet`); quem escreve na árvore é sempre a sessão principal. Uma correção que falha duas vezes sobe um modelo.

## Início

A árvore fica em `correcao/<nome-curto-do-erro>/arvore.md`, na raiz do projeto. Nessa pasta não fica mais nada.

- **Se a árvore existe**, corre o verificador, diz o que está fechado e o que falta, e retoma.
- **Se não existe**, cria-a a partir de `modelos/arvore.md`. Preenchida como dizem os comentários, passa o verificador.

## 0. Diagnóstico

Preenche «Diagnóstico» sem perguntar, com o que a pessoa disse e com o que encontras no projeto:

| ID | O que se procura | Onde se encontra |
|---|---|---|
| C1 | Sintoma: o que falha, a mensagem, onde aparece | a mensagem da pessoa, a saída do comando, os registos |
| C2 | Reprodução: o comando ou os passos que fazem o erro aparecer | os testes, o README, os scripts do projeto |
| C3 | Comportamento certo | testes que passavam, documentação, versões anteriores, casos iguais que funcionam |
| C4 | O que não pode mudar | os testes existentes, as interfaces públicas, os formatos dos dados |
| C5 | Onde procurar | o histórico desde a última versão que funcionava, os ficheiros ligados à mensagem |
| C6 | Limites | no repositório pode tocar-se; dados de produção, segredos e publicação não, salvo se a pessoa o disse |

Cada linha leva a origem: `pedido`, `ambiente`, ou `assumida` quando ficou a tua melhor leitura, que vai para o relatório.

Só se pergunta se, depois de procurar, não houver forma de continuar: o erro não se reproduz e não há registos que o mostrem, ou falta um acesso. Nesse caso, uma única mensagem com tudo o que falta, cada ponto com a tua proposta; essas linhas ficam com a origem `pergunta`. Depois disso não se pergunta mais nada.

## 1. Reproduzir

Escreve a prova de que falha: um teste automático que reproduz o erro ou, se não for possível, um comando fixo com saída verificável. Corre-o e cola a falha na prova do nó `1`. Corre os testes que já existem e regista os que passam: são a base para provar que nada partiu.

Se não reproduz, tenta com os dados e as versões de C5. Se mesmo assim não reproduz, corrige pelo que os registos mostram, e a prova diz que não houve reprodução e porquê.

## 2. Localizar

Mede os sinais de `algoritmos.md` e escolhe o método pela tabela; o nome vai para a coluna «Método».

- Usa sempre a mesma sonda, escrita no critério do nó numa linha. Se o teste que falha não existe nas versões antigas, a sonda repete a verificação sem os ficheiros de teste dessas versões. Tem três saídas, passa, falha ou não corre, e uma versão onde não corre salta-se.
- Antes de começar, confirma um ponto onde passa e outro onde falha.
- A prova lista os pontos testados, pela ordem, e a causa. Confirma a causa lendo a alteração ou o código.

## 3. Escolher a correção

Com a causa encontrada, pensa em até três formas de corrigir, por exemplo:

- corrigir a causa onde ela está;
- desfazer a alteração que a introduziu, se essa alteração não traz mais nada de que se precise;
- proteger o ponto onde o erro aparece, quando a causa está fora do teu alcance (uma dependência, um serviço externo).

Prova cada uma contra a reprodução e os testes, e escolhe por esta ordem: a reprodução passa; nenhum teste que passava falha; corrige a causa e não só o sintoma; é a alteração mais pequena; é a mais fácil de desfazer. Regista em «Correções consideradas» as que ficaram de fora e porquê. Quando só uma forma faz sentido, não inventes outras.

## 4. Dividir, quando é preciso

Divide quando há várias causas, várias partes a mudar, ou uma regra que mudou e toca várias coisas.

1. Junta no mesmo filho o que depende entre si ou mexe nos mesmos ficheiros. Dois pedidos iguais sobre coisas diferentes ficam dois filhos com a mesma chave de memo, e o segundo reutiliza o primeiro: `reutiliza <ID>` na prova.
2. Cada filho tem critério, chave de memo e «Depende de» (`-` se não depende de nenhum). Um filho depende de um irmão quando a prova dele o chama.
3. O critério de um filho que muda uma função diz o caso normal e o que acontece com a entrada vazia, a inválida e no limite.
4. O que os filhos partilham (nomes, configuração) crias tu antes deles.
5. Cada filho repete os passos 1 a 3, e fecha-se pela ordem das dependências.

## 5. Decisões pelo caminho

Uma escolha que seria da pessoa (o que fazer com um dado inválido, que comportamento manter quando dois testes se contradizem) toma-se pela opção que recomendarias: a que cumpre C3 e C4 com a alteração mais pequena; entre duas iguais, a mais fácil de mudar depois. Regista-a no diagnóstico, numa linha `S` com o seu número e a origem `execução`, com a razão, e continua.

## 6. Falha de um ramo

Quando uma correção não passa a prova:

1. Localiza outra vez (passo 2), agora sobre o que mudaste.
2. Experimenta a forma de corrigir seguinte (passo 3), ou sobe um modelo.
3. Se o nó não tem solução como foi dividido, marca-o `abandonado`, e aos descendentes, regista a razão em «Ramos abandonados» e divide o pai de outra forma.
4. Na raiz, sem outra forma, pára: o relatório diz o que foi tentado e porque falhou.

## 7. Fechar

Prova a raiz sobre o conjunto:

- a prova de reprodução passa agora;
- os testes que passavam continuam a passar, e o que C4 diz que não pode mudar está igual;
- cada função alterada tem prova do caso normal, do vazio, do inválido e do limite;
- a mensagem de commit, ou o registo de alterações do projeto se existir, diz a causa e a correção numa ou duas frases.

Depois corre o verificador e mostra a saída completa:

```
node <pasta desta skill>/scripts/verificar-arvore.mjs correcao/<nome-curto-do-erro>
```

Cada falha que não seja a aceitação resolve-se no nó indicado. Quando só faltar a aceitação, entrega o relatório e pede-a:

```
✅ O erro está corrigido e provado. Aceitas a correção?
```

- **Sim:** marca a aceitação com o nome e a data, muda o estado para `Concluído`, corre outra vez o verificador e mostra a saída.
- **Não:** o que faltar passa a nó `aberto` e o ciclo continua.

## Relatório

- O erro, a causa e como se chegou a ela, por palavras comuns.
- A correção escolhida e as que ficaram de fora, com a razão.
- A prova antes e depois, e os testes que continuam a passar.
- O que ficou assumido no diagnóstico e as decisões tomadas pelo caminho.
- O que custa desfazer a correção.

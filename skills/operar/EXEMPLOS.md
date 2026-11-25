# Exemplos: operar

## O que faz

Deixa uma plataforma pronta para quem a vai operar sem saber como foi construída. Percorre a lista de prontidão operacional (monitorização dos quatro sinais, sondas de saúde, cópias de segurança 3-2-1, runbooks, processo de incidentes e registo de alterações) e só dá cada item por feito com prova. «Está configurado» não conta: a cópia prova-se com um restauro, a sonda com a resposta que devolve, o alerta com um disparo de teste. No fim escreve o documento de operação, com as rotinas e as emergências passo a passo.

## Quando usar

- Antes de passar uma plataforma a outra equipa ou a um cliente.
- Numa sessão lançada pela `orchestrate-sessions` antes da entrega, ou na Fase 5 da `start-project-with-trust`, para a secção «Operação» da entrega.
- Numa plataforma que já existe e em que ninguém sabe fazer a cópia nem o restauro.
- Para escrever o que fazer quando o serviço cai, o disco enche ou o certificado expira.

## Quando não usar

- Montar o pipeline, os contentores e o alojamento: `infra-deploy`.
- Perceber porque é que um serviço está lento: `performance-verifier`.

## Exemplo: operação leve de um site pessoal

**Pedido:** «Operação: leve. Sondas de saúde, cópia de segurança da base de dados testada e um runbook curto, escrito para mim.»

**O que a skill faz:**

1. Põe a sonda `/health` a dizer se a base de dados responde e quando foi a última sincronização, com 503 e a razão quando uma das duas falha, e testes para os três casos.
2. Escreve dois scripts, um que exporta a base para um ficheiro SQL com data e outro que a restaura numa base vazia; o ficheiro da cópia nunca entra no repositório.
3. Prova a cópia com um restauro em local: o número de notícias, votos e decisões é igual nas duas bases.
4. Escreve o documento de operação (aqui `RUNBOOK.md`, como o projeto pedia) para quem opera sozinho: ver se está tudo bem, fazer a cópia, renovar o token do GitHub antes dos 90 dias, e cada emergência com o sintoma, a causa provável e o que fazer.
5. Marca «depois da publicação» os passos que dependem da conta.

**Resultado:** Foi a tarefa T11a do site de notícias, com 181 testes a passar. A sonda dizia «parada» quando o conhecimento só não tinha mudado, e passou depois a olhar para a última corrida.

## Exemplo: passar uma plataforma à equipa de suporte

**Pedido:** «Vamos passar a plataforma de faturação à equipa de suporte. Prepara a operação.»

**O que a skill faz:**

1. Pergunta onde corre, quem a vai operar e com que conhecimento, e manda um subagente `haiku` inventariar o que já existe: sondas, painéis, alertas, cópias e documentação.
2. Mede latência, tráfego, erros e saturação por serviço, com um alerta por sinal, e dispara um alerta de teste.
3. Põe as sondas liveness e readiness em cada contentor e cola a resposta de cada uma.
4. Escreve um runbook por rotina e por emergência, e pede a alguém que não o escreveu, ou a uma sessão nova, que siga um do início ao fim.
5. Define quem é avisado, por onde e quem decide, e faz um exercício de mesa; quem recebe os alertas e onde ficam as cópias fora do local ficam «Por preencher».

**Resultado:** O `OPERACAO.md` com as rotinas, as emergências e, no fim, a tabela «Prontidão» com uma prova por item.

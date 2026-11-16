# Exemplos: backend-dados

## O que faz

Desenha e constrói a API e a base de dados de um projeto, por esta ordem: primeiro o contrato OpenAPI, depois o esquema, as migrações e o código. O esquema leva chaves, restrições e tipos que impedem dados inválidos, e as migrações só acrescentam e têm sempre reversão. Cada passo fecha com uma prova que outra pessoa pode repetir, como a migração aplicada e revertida numa cópia da base ou os testes de contrato verdes no pipeline.

## Quando usar

- Uma API nova, em que o contrato tem de existir antes do primeiro endpoint.
- Um esquema novo, ou uma alteração a uma base que já tem dados.
- Renomear ou apagar colunas em produção sem parar a aplicação.
- Tarefas em segundo plano e escritas que não podem duplicar nada se correrem duas vezes.
- Dados pessoais que pedem retenção, apagamento e auditoria no próprio esquema.

## Quando não usar

- Ecrãs, formulários e navegação: `design-ux`.
- Pipeline, contentores e alojamento: `infra-deploy`.
- Uma API lenta sem se saber porquê: a `performance-verifier` mede antes de mudar.

## Exemplo: votos únicos e decisões com histórico

**Pedido:** «Preciso do contrato da API e do esquema: cópia das notícias, um voto por visitante e novidade, e as decisões do admin com histórico.»

**O que a skill faz:**

1. Escreve o contrato em `api/openapi.yaml`, com os erros num só formato (`{erro: {codigo, mensagem}}`), a paginação e o 409 `voto-repetido`.
2. Desenha o esquema com a unicidade do voto por visitante e novidade como restrição da base, e cada decisão como uma linha nova que nunca se altera.
3. Escreve a migração `0001_inicial.sql` com a reversão em `migracoes/reversao/`, e aplica-a e reverte-a numa base limpa.
4. Prova as restrições com testes: o segundo voto do mesmo visitante falha, uma decisão fora de «entra» ou «não entra» falha, e uma decisão antiga não se apaga.

**Resultado:** Foi assim que se fizeram o contrato e o esquema do site de notícias, com 9 testes a passar. A validação do contrato com uma ferramenta própria ficou para depois.

## Exemplo: tarefa agendada que não repete trabalho

**Pedido:** «A sincronização tem de correr sozinha de 2 em 2 minutos e ir buscar a imagem de cada fonte, sem pedir duas vezes a mesma.»

**O que a skill faz:**

1. Acrescenta uma migração aditiva, `0002_imagem_tentada.sql`, que regista cada tentativa, com a reversão testada.
2. Liga a tarefa agendada ao Worker público e limita cada corrida a 5 notícias, com 3 segundos e 64 KB por pedido.
3. Prova com testes que duas corridas deixam 103 notícias na base, sem duplicados, e que uma fonte já tentada não volta a ser pedida.
4. Acerta o contrato com as respostas que o código já devolvia (403, 400 e 500).
5. Deixa `GITHUB_TOKEN` e `GITHUB_REPO` por preencher, e o resto feito.

**Resultado:** Foi a tarefa T4b do site de notícias, com 145 testes a passar. O disparo real de 2 em 2 minutos só se prova depois de publicar.

## Exemplo: renomear uma coluna com dados

**Pedido:** «Quero mudar o nome da coluna `cliente_nome` para `nome_cliente` na tabela das encomendas, que já está em produção.»

**O que a skill faz:**

1. Trata o pedido como decisão com risco, porque mexe em dados que existem, e inventaria as migrações e os testes que já há.
2. Divide a mudança em dois passos, como pede `base-de-dados/migracoes.md`: uma migração acrescenta a coluna nova e copia os dados; outra, depois de a aplicação usar só a nova, remove a antiga.
3. Escreve a reversão de cada uma e aplica e reverte as duas numa cópia da base, com a saída colada.
4. Corre os testes unitários e de integração e os testes de contrato no pipeline.

**Resultado:** Duas migrações reversíveis e a aplicação a ler a coluna nova, sem nenhum momento em que o código e a base discordem.

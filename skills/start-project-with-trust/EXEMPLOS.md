# Exemplos: start-project-with-trust

## O que faz

Conduz um projeto com um cliente do arranque à entrega verificada. Faz a descoberta uma pergunta de cada vez, sempre com opções da mais barata à mais cara e uma recomendação, cruza as respostas com a base `knowledge/` e escreve o plano e o plano custo-benefício. Antes de propor código procura uma plataforma que já resolva o problema. Só termina quando cada critério de sucesso tem prova, a publicação passou no verificador e o utilizador aceita a entrega.

## Quando usar

- Arrancar um projeto novo com um cliente, interno ou externo.
- Retomar um projeto a meio: a skill lê `arranque/<projeto>/objetivo.md` e diz em que fase ficou.
- Um pedido vago de um cliente que tem de acabar num plano aprovado e numa entrega aceite, com prova de cada critério de sucesso.
- Decidir entre adotar uma plataforma e desenvolver de raiz.

## Quando não usar

- Um trabalho já definido e dividido em tarefas, ou um pedido em que ainda não se sabe que skills entram: `orchestrate-sessions`, que é por onde se começa.
- Uma tarefa técnica isolada: a mini skill do tema, como `backend-dados` ou `design-ux`.
- Uma correção pequena: as 16 perguntas obrigatórias e os documentos do arranque pesam mais do que o trabalho.

## Exemplo: arrancar com as respostas já escritas

**Pedido:** «/start-project-with-trust site-noticias. Respondo já às perguntas obrigatórias (P1 a P15); marca-as como respondidas e só me perguntes o que ficar vago.»

**O que a skill faz:**

1. Mostra as datas da última atualização do conhecimento, partilhado e local, e só propõe atualizar se a mais recente tiver mais de 3 meses.
2. Cria `arranque/<projeto>/` com `objetivo.md`, `necessidades.md`, `plano.md` e `custo-beneficio.md`, e preenche a tabela das perguntas obrigatórias.
3. Marca como respondidas as que o texto cobre, diz quais, e faz seguimentos só onde a resposta não se pode verificar: «rápido» não chega, «até 2 segundos» chega.
4. Pede a validação do resumo de `necessidades.md` antes de passar ao plano.

**Resultado:** O pedido do site de notícias (`requisitos.md`) foi escrito assim, com as respostas de P1 a P16. A construção seguiu com a `orchestrate-sessions`, que usou as regras e a base `knowledge/` desta skill.

## Exemplo: do plano ao «Plano aprovado»

**Pedido:** «Precisamos de um sistema de tickets para o apoio interno.»

**O que a skill faz:**

1. Para cada necessidade procura em `knowledge/plataformas/` uma plataforma que já a cubra, e regista as candidatas em `plano.md`.
2. Decide com o utilizador entre adotar uma plataforma open source, ligar plataformas que já existem, adotar e estender, ou desenvolver de raiz, com a licença e a dependência do fornecedor na coluna do risco.
3. Toma as outras decisões obrigatórias: publicação e exposição, específico ou modular, sessões em paralelo e agentes.
4. Relê os quatro documentos, transforma cada lacuna numa pergunta aberta e corre `node scripts/verificar.mjs arranque/<projeto>` até só faltar a confirmação.
5. Com a confirmação do utilizador, corre outra vez o verificador e passa o estado a «Plano aprovado».

**Resultado:** Um plano em que cada ação responde a uma pergunta do utilizador, pronto a executar.

## Exemplo: fechar a entrega

**Pedido:** «Já está tudo feito. Podemos fechar o projeto?»

**O que a skill faz:**

1. Prova cada critério de sucesso do plano com um comando, um teste, um URL ou um ficheiro, e cola a saída em `entrega.md`.
2. Corre `../orchestrate-sessions/scripts/verificar-publicacao.mjs` sobre o domínio, que tem de terminar em `✓ Publicação verificada`.
3. Revê os acessos com o utilizador, preenche a secção «Operação» e corre a `humanizar` sobre o que vai ser entregue.
4. Corre `node scripts/verificar.mjs arranque/<projeto> --entrega` e, quando só falta a aceitação, pede-a.

**Resultado:** O estado só passa a «Concluído» com a aceitação dada pelo utilizador e os dois verificadores verdes.

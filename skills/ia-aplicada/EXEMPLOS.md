# Exemplos: ia-aplicada

## O que faz

Serve para qualquer trabalho com IA: usar a API do Claude ou de outro fornecedor, pesquisar nos documentos da empresa (RAG), construir agentes, ter um modelo próprio, escolher um modelo aberto, voz, segurança e operação. Pergunta primeiro o que se vai fazer, lê só a subpasta de `knowledge/ia/` desse tema e responde ou executa citando as entradas. Quando a base não chega, vai às fontes oficiais e regista o que encontrou antes de responder.

## Quando usar

- Escolher o modelo e o fornecedor para uma funcionalidade com IA.
- Montar uma pesquisa nos documentos internos (RAG).
- Desenhar um agente com ferramentas ou servidores MCP.
- Proteger uma aplicação com LLM contra a injeção de prompt.
- Decidir entre ficar pela API, usar um modelo aberto ou adaptar um modelo próprio.

## Quando não usar

- Baixar o custo de uma solução com IA que já está a correr: a `performance-verifier` mede o custo por tarefa antes de propor.
- Auditar a segurança de uma aplicação inteira: `seguranca`, que lê `ia/seguranca/` quando há LLM.
- Gravar um vídeo narrado: `gravacao-video`.
- Prever valores a partir de dados em tabela, como as vendas do próximo mês (machine learning clássico): a base não o cobre.

## Exemplo: perguntas aos procedimentos internos

**Pedido:** «Quero que a equipa faça perguntas aos procedimentos internos, que estão em PDF e Word.»

**O que a skill faz:**

1. O pedido já diz o tema, por isso lê `ia/rag/README.md` e as entradas que o tocam: `embeddings-e-base-vetorial.md`, `rag-recuperacao-contextual-hibrida-e-reranking.md` e `avaliar-rag-ragas.md`, mais as de modelos e custos da raiz de `ia/`.
2. Apresenta as decisões (onde ficam os vetores, que modelo responde) com as opções da mais barata à mais cara, a entrada que sustenta cada uma e uma recomendação.
3. Depois da escolha, constrói, com o critério de fim tirado da linha «Para uma skill» das entradas usadas.
4. Só dá a tarefa por feita com prova: o comando da avaliação e a saída.

**Resultado:** A pesquisa montada com a opção escolhida, e a avaliação guardada para correr outra vez quando os documentos mudarem.

## Exemplo: que modelo para classificar pedidos

**Pedido:** «Que modelo do Claude uso para classificar os pedidos de suporte que chegam por email?»

**O que a skill faz:**

1. Lê `ia/escolher-o-modelo-claude.md`, `ia/pensar-e-esforco.md` e `ia/otimizacao-de-custo-da-ia.md`.
2. Mostra as opções da mais barata à mais cara, cada uma com o preço citado da entrada e o que se ganha ou perde.
3. Recomenda uma e deixa a decisão ao utilizador.

**Resultado:** Uma decisão tomada com a base de cada opção à vista, pronta para a `performance-verifier` medir quando estiver a correr.

## Exemplo: um fornecedor que a base não cobre

**Pedido:** «Quero transcrever as chamadas do apoio ao cliente com um fornecedor europeu. O que há?»

**O que a skill faz:**

1. Lê `ia/multimodal/voz-tts-e-stt.md` e vê que não cobre os fornecedores pedidos.
2. Vai à documentação, aos preços e aos termos de cada fornecedor, sem contornar bloqueios: uma página que recusa o acesso automático fica por ler, ou o utilizador cola o conteúdo.
3. Dá a cada facto a confiança alta, média ou baixa, pelos critérios da `update-knowledge`; um facto de confiança baixa não serve de base.
4. Regista antes de responder: numa cópia git do repositório, propõe a entrada nova e só a escreve com aprovação; fora disso, guarda-a no conhecimento pessoal em `~/.start-project-with-trust/knowledge/`.
5. Responde com as opções da mais barata à mais cara e diz que fontes leu e o que registou.

**Resultado:** A resposta com as fontes citadas, e o conhecimento novo guardado para a próxima pergunta igual não voltar às fontes.

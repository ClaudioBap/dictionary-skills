# Exemplos: design-3d-motion

## O que faz

Trata do 3D na web, do WebGL, da animação em CSS e SVG e do movimento ligado ao scroll, ao nível topo por omissão. Quando o pedido não diz que é 3D, propõe primeiro a opção mais barata que dá o mesmo efeito (CSS ou SVG), com o 3D como opção seguinte. Cumpre um orçamento de desempenho medido, respeita `prefers-reduced-motion` com uma alternativa parada e carrega a cena depois do conteúdo, para a página servir quem não a vai ver.

## Quando usar

- Uma cena 3D, ou um produto que roda, num site.
- Animação ligada ao scroll ou animação de SVG.
- Uma experiência em que a qualidade do movimento faz parte do pedido.
- Rever uma animação que pesa demais no telemóvel ou ignora o movimento reduzido.

## Quando não usar

- Layout, formulários e navegação sem movimento: `design-ux`.
- Só medir uma cena que já existe, sem a mudar: `performance-verifier`.

## Exemplo: o conhecimento das skills em 3D

**Pedido:** «Sê criativo mas quero algo de topo relacionado ao tema.»

**O que a skill faz:**

1. Como o 3D já estava decidido (ADR 0009), passa logo ao desenho e fixa o orçamento a partir de `orcamento-de-desempenho-3d.md` e dos limites do web.dev.
2. Desenha a cena só com os dados da API: cada secção é uma pilha, cada notícia uma camada, a cor diz a confiança e as novidades em validação orbitam a pilha.
3. Mostra primeiro a alternativa parada e só importa o three.js se houver WebGL 2 e o movimento não estiver reduzido.
4. Mede em emulação de telemóvel (360 px, processador 4 vezes mais lento): 60 fps, LCP de 1,0 s e 143 KB comprimidos de código da cena.
5. Prova com capturas que, com movimento reduzido ou sem WebGL, a página fica parada e mostra as mesmas notícias.

**Resultado:** Foi assim que se fez a cena 3D da fase 1 do site de notícias. O TBT passou o orçamento numa de três corridas, e as medições ficaram em emulação, por não haver lista de aparelhos combinada.

## Exemplo: movimento só com CSS

**Pedido:** «Motion e scroll na interface, com alternativa para quem pede movimento reduzido.»

**O que a skill faz:**

1. Aplica `3d-na-web-quando-e-porque.md` a um portal de leitura, com texto denso, e conclui que o CSS chega.
2. Faz todo o movimento dentro de `@media (prefers-reduced-motion: no-preference)`: transição de vista entre páginas, cartões que sobem com o scroll (`animation-timeline`) e contagem de votos que salta.
3. Mede o scroll a 360 px com o processador 4 vezes mais lento (60 fps) e confirma que só `transform` e `opacity` animam.
4. Prova que, com `prefers-reduced-motion: reduce`, a listagem fica com 0 animações e abrir uma notícia não tem transição.

**Resultado:** Foi a primeira versão do movimento do site de notícias. Cumpria o critério escrito, mas o Cláudio queria 3D e a tarefa foi reaberta. Quando se quer 3D, convém dizê-lo no pedido: a skill salta a pergunta e passa à leitura.

## Exemplo: um produto que roda

**Pedido:** «Na página do produto quero o equipamento em 3D, a rodar quando se arrasta.»

**O que a skill faz:**

1. Pergunta, numa só pergunta, em que aparelhos tem de funcionar e o que a pessoa deve perceber, e propõe primeiro uma sequência de imagens, com o 3D como opção seguinte.
2. Com o 3D escolhido, segue `pipeline-blender-gltf.md` do Blender ao glTF comprimido; o modelo final do cliente fica «Por preencher» e entra um de substituição marcado como tal.
3. Carrega a cena a pedido, com um estado de carregamento visível.
4. Mede o tamanho dos assets, o tempo até à primeira imagem e os frames por segundo num telemóvel de gama média e num portátil sem placa gráfica dedicada.

**Resultado:** O produto a rodar dentro do orçamento, com uma imagem parada para quem pede movimento reduzido ou não tem WebGL.

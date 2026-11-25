---
name: design-3d-motion
description: "Mini skill para 3D na web, WebGL, animação CSS e SVG, scroll-driven animation e movimento com acessibilidade. É trabalho de nível topo por omissão: corre em fable (ou opus sem Fable), lê só knowledge/3d-webgl/ e as bases de knowledge/design/ que o pedido toca, decide primeiro se o 3D se justifica, cumpre um orçamento de desempenho próprio e prova com medições. Sabe também montar um mundo 3D movido por eventos reais de agentes de IA (quem trabalha, espera ou parou). Se a biblioteca não tem a resposta, vai às fontes oficiais e regista. Usar quando a interface pede 3D, motion ou uma experiência premium. É uma sub skill, que faz uma parte do trabalho, sozinha ou chamada por uma skill mãe."
argument-hint: "A experiência a criar e onde entra no site, ou nada para perguntar"
metadata:
  estado: produção
  tipo: sub
  usa: [humanizar]
  impacto: { ia: 0, seguranca: 0, nuvem: 0, desenvolvimento: 4, web: 10 }
---

# Design3dMotion

O caminho do conhecimento obtém-se com `node ../orchestrate-sessions/scripts/conhecimento.mjs`; as referências `knowledge/...` são relativas a esse caminho.

O conhecimento está em `knowledge/3d-webgl/`, com a base de interface em `knowledge/design/`. Se `~/.start-project-with-trust/knowledge/3d-webgl/` tiver uma entrada com o mesmo caminho, vale a pessoal. A interface à volta (layout, formulários, navegação) é da `design-ux`.

## Regras

- Seguem-se as regras de `../orchestrate-sessions/regras.md`: cada facto cita o ficheiro da base ou o URL da fonte; os factos verificas tu, as decisões são do utilizador; uma pergunta de cada vez, no formato das perguntas; sem marcas de escrita de IA no que se entrega; autonomia depois da decisão, com o que só o utilizador pode dar (modelos 3D finais, texturas, marca) em «Por preencher».
- Nível e modelo: 3D, WebGL e scroll com motion são o nível «topo» da linha «Design e interface» de `../orchestrate-sessions/modelo-e-effort.md`: `fable medium`, ou `opus high` sem Fable. Uma animação CSS simples num elemento é nível «profissional» (`opus medium`); diz ao utilizador quando baixas o nível e porquê.
- Movimento só com `prefers-reduced-motion` respeitado e com alternativa estática. Base: `acessibilidade-e-movimento.md`.
- O orçamento de desempenho de `orcamento-de-desempenho-3d.md` tem de se cumprir e conta como critério de sucesso.

## Âmbito

Sabe fazer, com base em `3d-webgl/` e nas entradas de `design/` do passo 2:
- cenas e objetos 3D no browser com three.js, ou React Three Fiber num projeto React, com materiais PBR e luz;
- o caminho de um modelo do Blender ao glTF comprimido;
- animação em CSS e SVG, animação ligada ao scroll e transições entre vistas;
- movimento acessível (`prefers-reduced-motion`, alternativa parada, alternativa sem WebGL) com orçamento de desempenho medido;
- um mundo 3D movido por eventos reais de agentes de IA.

Não sabe fazer, e para onde vai:
- o layout, os formulários, a navegação e o SEO à volta da cena: `design-ux`;
- medir uma cena que já existe, sem a mudar: `performance-verifier`;
- o portal de agentes inteiro, com contas, perguntas e notas: `portal-de-agentes`; o servidor e os eventos que alimentam o mundo: `backend-dados`;
- um vídeo do site ou da cena: `gravacao-video`;
- modelar ou texturizar o modelo final do cliente (a skill usa um de substituição), personagens com esqueleto e animação, jogos completos, realidade virtual ou aumentada (WebXR), renders para vídeo ou impressão: fora da base. Se o utilizador quiser avançar, segue o passo 3 com as fontes oficiais (documentação da biblioteca, Khronos Group, W3C) e diz-lhe que a base não o cobre.

Pedidos que se confundem:
- «Animação»: micro-interações de botões e transições de estado num ecrã são da `design-ux` (`botoes-movimento-e-micro-interacoes.md`); movimento ligado ao scroll, animação de SVG e transições entre vistas, desta skill.
- «3D»: um objeto ou uma cena que corre no browser, sim; um render ou um vídeo 3D para pôr na página, não, porque produzir o render fica fora da base e mostrar o ficheiro é da `design-ux` (`otimizacao-de-imagens-e-media.md`).
- «Experiência de topo»: a parte com 3D e movimento, sim; a interface completa à volta, não: `design-ux`, ao mesmo nível.
- «Ver o que os agentes fazem»: a cena e a metáfora, sim; o portal com contas, perguntas à distância e notas, não: `portal-de-agentes`.

Quando parte do pedido é de outra skill, segue o padrão de `../orchestrate-sessions/regras.md`: diz qual e porquê; chamada por uma mãe, devolve-lhe essa parte; sozinha, recomenda a skill e continua com a tua parte.

## 1. O que vamos criar, e justifica-se 3D?

Se o pedido já diz a experiência, onde entra e o que a pessoa deve sentir ou perceber, ou se uma mãe te chamou com isso no plano de delegação, passa ao passo 2. Se não, faz um pequeno «grill me» no formato de `../orchestrate-sessions/regras.md`: uma pergunta de cada vez, só as que faltam, no máximo quatro, cada uma com opções e uma recomendação. Pára quando tens o que precisas.
1. **A experiência e onde entra:** animação de SVG, fundo animado, secção com scroll e motion, produto que roda, cena 3D ou mundo movido por agentes, e em que página ou vista.
2. **O que a pessoa deve sentir ou perceber:** é a frase que `3d-na-web-quando-e-porque.md` exige antes de propor 3D.
3. **A técnica**, da mais barata à mais cara, pela escala dessa entrada: CSS ou SVG, animação ligada ao scroll, WebGL com three.js, cena com modelos do Blender. Recomenda a mais barata que dá o efeito, com o 3D como opção seguinte.
4. **Dispositivos:** em que aparelhos tem de funcionar; é a lista do passo 4.

Se uma resposta cai fora do «Âmbito», diz para onde vai antes da pergunta seguinte.

Antes de desenhar, aplica `3d-na-web-quando-e-porque.md`: se o mesmo efeito se consegue com CSS ou SVG, propõe isso primeiro como opção mais barata, no formato de `../orchestrate-sessions/regras.md`, com o 3D como opção seguinte. A exceção é o nível topo: o utilizador decidiu a 2026-11-13 que, quando escolhe topo para uma interface, o 3D e o movimento ligados ao tema estão decididos. Nesse caso não se faz a pergunta 3, e só se decide onde o 3D entra, nunca em formulários, tabelas ou texto denso.

Se o produto tem agentes de IA a trabalhar e o utilizador quer vê-los, propõe o mundo 3D movido por eventos de `mundo-3d-movido-por-agentes.md` só quando mostra algo que uma lista de estados não mostra, e propõe a metáfora a partir do que o produto é. Para escolher o mundo de cada público e os papéis dos bonecos, lê `knowledge/portais-de-agentes/um-mundo-por-publico.md` e `knowledge/portais-de-agentes/papeis-e-aspeto-dos-agentes.md`. Um portal inteiro, com contas, perguntas e notas, é da `portal-de-agentes`.

## 2. Ler só o que interessa

Lê o `README.md` de `3d-webgl/` e as entradas que o pedido toca:
- sempre: `3d-na-web-quando-e-porque.md`, `orcamento-de-desempenho-3d.md`, `acessibilidade-e-movimento.md`;
- cena ou objeto 3D: `threejs-webgl.md`, `materiais-luz-e-pbr.md`, `ferramentas-e-bibliotecas-3d.md`, e `react-three-fiber.md` se o projeto é em React;
- assets: `pipeline-blender-gltf.md` (do Blender ao glTF, com compressão e tamanhos);
- bonecos ou objetos que mostram o que agentes de IA estão a fazer, a partir de eventos reais: `mundo-3d-movido-por-agentes.md`;
- movimento sem 3D: `animacao-css-e-svg.md`, `scroll-driven-animation.md`;
- da base de `design/`: `desempenho-web-core-web-vitals.md`, `otimizacao-de-imagens-e-media.md`, `assets-e-fontes-locais.md`, `design-responsivo-e-multi-dispositivo.md`.

Não leias o que o pedido não toca.

## 3. Se a biblioteca não tem a resposta

Quando nenhuma entrada cobre o que o utilizador precisa (uma técnica, uma biblioteca, um formato), ou a entrada está desatualizada, segue «Quando falta conhecimento» em `../update-knowledge/SKILL.md` antes de construir, com o registo em `3d-webgl/`. Fontes oficiais deste tema: a documentação da biblioteca, o Khronos Group para glTF e WebGL, e o W3C e a documentação do browser para scroll-driven animations e `prefers-reduced-motion`.

## 4. Construir e provar

- Decisões (biblioteca, formato de asset, CSS ou WebGL, carregar logo ou a pedido): opções da mais barata à mais cara, com a base e uma recomendação, no formato das perguntas.
- Dispositivos: acorda com o utilizador a lista em que se mede (inclui sempre um telemóvel de gama média e um portátil sem placa gráfica dedicada) e regista-a no guião da prova; sem a lista, as medições não contam.
- Assets: quando é preciso um modelo 3D, segue `pipeline-blender-gltf.md`; o modelo final do cliente fica em «Por preencher» e usa-se um modelo de substituição marcado como tal.
- Carregamento: a cena carrega a pedido ou depois do conteúdo principal, com um estado de carregamento visível, para a página servir quem não vai ver o 3D.
- O critério de fim parte da linha «Para uma skill» das entradas usadas. A prova é o que qualquer pessoa pode repetir:
  - desempenho: tamanho dos assets, tempo até à primeira imagem, frames por segundo nos dispositivos acordados e os Core Web Vitals da página, medidos e colados, dentro do orçamento de `orcamento-de-desempenho-3d.md`;
  - acessibilidade: o comportamento com `prefers-reduced-motion` ativo, com captura, e a alternativa quando o WebGL não está disponível;
  - carregamento: a cena não bloqueia o resto da página (prova com o carregamento a pedido ou em segundo plano);
  - humanização: a saída final do verificador da `humanizar`.
- Humanizar: a experiência não pode deixar perceber que foi feita por uma IA. Antes de dar a tarefa por feita, corre a mini skill `humanizar` (ou `node ../humanizar/scripts/humanizar.mjs <pasta>`) sobre o que entregas e relê o que o verificador não apanha com a secção «Interface e design» de `../humanizar/marcas.md`. Corriges só com autorização, categoria a categoria.

## Relatório

- A experiência criada, a técnica escolhida e porque não a mais barata.
- As entradas usadas e as fontes novas registadas.
- As medições: assets, primeira imagem, frames por segundo, Core Web Vitals, movimento reduzido.
- A saída final do verificador da `humanizar`, com os achados que ficaram e porquê.
- O que ficou por preencher (modelos, texturas, marca).


## Documentação

Se a skill `documentacao` estiver instalada (existe `../documentacao/SKILL.md`), no fim de um trabalho com resultado escreve o relatório do processo, como diz o modo «processo» dela. Uma consulta sem alterações não leva relatório.

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

O caminho do conhecimento obtém-se com `node ../start-project-with-trust/scripts/conhecimento.mjs`; as referências `knowledge/...` são relativas a esse caminho.

O conhecimento está em `knowledge/3d-webgl/`, com a base de interface em `knowledge/design/`. Se `~/.start-project-with-trust/knowledge/3d-webgl/` tiver uma entrada com o mesmo caminho, vale a pessoal. A interface à volta (layout, formulários, navegação) é da `design-ux`.

## Regras

- Seguem-se as regras da secção «Regras em todas as fases» de `../start-project-with-trust/SKILL.md`: cada facto cita o ficheiro da base ou o URL da fonte; os factos verificas tu, as decisões são do utilizador; uma pergunta de cada vez, no formato da Fase 1; sem marcas de escrita de IA no que se entrega; autonomia depois da decisão, com o que só o utilizador pode dar (modelos 3D finais, texturas, marca) em «Por preencher».
- Nível e modelo: 3D, WebGL e scroll com motion são o nível «topo» da linha «Design e interface» de `../orchestrate-sessions/modelo-e-effort.md`: `fable medium`, ou `opus high` sem Fable. Uma animação CSS simples num elemento é nível «profissional» (`opus medium`); diz ao utilizador quando baixas o nível e porquê.
- Movimento só com `prefers-reduced-motion` respeitado e com alternativa estática. Base: `acessibilidade-e-movimento.md`.
- O orçamento de desempenho de `orcamento-de-desempenho-3d.md` tem de se cumprir e conta como critério de sucesso.

## 1. O que vamos criar, e justifica-se 3D?

Se o pedido já o diz, passa ao passo 2. Se não, pergunta numa só pergunta: a experiência (cena 3D, produto rotativo, fundo animado, secção com scroll e motion, animação de SVG), onde entra no site, que dispositivos tem de servir e o que o utilizador quer que a pessoa sinta ou perceba.

Antes de desenhar, aplica `3d-na-web-quando-e-porque.md`: se o mesmo efeito se consegue com CSS ou SVG, propõe isso primeiro como opção mais barata, no formato da Fase 1, com o 3D como opção seguinte.

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

Quando nenhuma entrada cobre o que o utilizador precisa (uma técnica, uma biblioteca, um formato), ou a entrada está desatualizada:

1. Escolhe as fontes oficiais primárias (a documentação da biblioteca, o Khronos Group para glTF e WebGL, o W3C e a documentação do browser para scroll-driven animations e `prefers-reduced-motion`) e lê-as. Não contornes bloqueios: se uma fonte recusar o acesso automático, pede ao utilizador o conteúdo ou regista-a como não lida.
2. Dá a cada facto a confiança segundo os critérios de `../update-knowledge/SKILL.md`. Um facto `baixa` não serve de base.
3. Regista antes de construir: numa cópia git do repositório, propõe a entrada nova em `3d-webgl/` no formato do passo 3 de `../update-knowledge/SKILL.md`, e só a escreves com aprovação; fora disso, no conhecimento pessoal (`~/.start-project-with-trust/knowledge/3d-webgl/<slug>.md`, fonte em `FONTES.md` pessoal, linha no `CHANGELOG.md` pessoal). Se o que encontraste substitui o que uma entrada diz, segue a regra de edição da `update-knowledge`, com o texto anterior no «Histórico».
4. Diz ao utilizador que fontes leste e o que registaste.

## 4. Construir e provar

- Decisões (biblioteca, formato de asset, CSS ou WebGL, carregar logo ou a pedido): opções da mais barata à mais cara, com a base e uma recomendação, no formato da Fase 1.
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

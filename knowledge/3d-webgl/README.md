# 3D, WebGL e animação

Tags no Logseq: `#design` `#3d`.

Menu para evoluir os sites, do mais leve ao mais pesado. Escolher o efeito pelo objetivo, não pela novidade.

Fonte: págs. 20–23 (Dicionario-Boas-Praticas.pdf)

## Entradas

- [3D na web: quando e porquê](3d-na-web-quando-e-porque.md) — Escolher o efeito pelo objetivo e subir na escala de peso só se pagar em compreensão ou emoção. *(pág. 20)*
- [Animação CSS e SVG](animacao-css-e-svg.md) — Transições e keyframes sem bibliotecas, animando só `transform`/`opacity` e com durações curtas. *(pág. 20)*
- [Scroll-driven animation](scroll-driven-animation.md) — Animar pela posição do scroll sem nunca o sequestrar, com trabalho por frame mínimo. *(págs. 20, 21)*
- [Three.js / WebGL](threejs-webgl.md) — Cenas 3D no browser com o maior custo da lista: exige deteção de WebGL, fallback 2D, pausa e limpeza de memória. *(pág. 21)*
- [React Three Fiber (R3F)](react-three-fiber.md) — Three.js como componentes React, só quando o projeto já é React e a cena é complexa. *(pág. 21)*
- [Pipeline Blender → glTF](pipeline-blender-gltf.md) — Modelar no Blender, exportar para glTF e otimizar (Draco/Meshopt, KTX2) antes de publicar. *(págs. 21, 22)*
- [Materiais, luz e PBR](materiais-luz-e-pbr.md) — Materiais PBR realistas, preferindo iluminação por environment map a sombras dinâmicas quando o desempenho aperta. *(pág. 22)*
- [Orçamento de desempenho 3D](orcamento-de-desempenho-3d.md) — Medir FPS, peso e memória, com metas de partida, carregamento tardio e pausa fora de vista. *(pág. 22)*
- [Acessibilidade e movimento](acessibilidade-e-movimento.md) — Respeitar sempre `prefers-reduced-motion`, ter fallback 2D e manter o conteúdo em HTML real. *(págs. 22, 23)*
- [Ferramentas e bibliotecas 3D](ferramentas-e-bibliotecas-3d.md) — Catálogo de motores, bibliotecas de movimento, modelação e otimização para 3D na web. *(pág. 23)*

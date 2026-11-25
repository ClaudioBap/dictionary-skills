---
id: 3d-webgl/orcamento-de-desempenho-3d
titulo: "Orçamento de desempenho 3D"
seccao: "3D, WebGL e animação"
paginas: [22]
fonte: Dicionario-Boas-Praticas.pdf
verificado_em: 2026-11-03
fontes_oficiais_consultadas_em: 2026-11-04
---

# Orçamento de desempenho 3D

**Resumo:** Medir FPS, peso e memória, com metas de partida, carregamento tardio e pausa fora de vista.

## Conteúdo

- **Medir, não adivinhar:** FPS, tempo de carregamento, peso dos modelos e texturas, memória de GPU.
- **Metas de partida:** 60 FPS no desktop e um mínimo aceitável no telemóvel; carregar o 3D só quando entra no ecrã; cena pausada quando não está visível.
- **Técnicas:** `instancedMesh` para repetições, níveis de detalhe (LOD), texturas comprimidas, limitar `pixelRatio`, menos draw calls.
- **A página à volta da cena:** os Core Web Vitals no percentil 75, em telemóvel e em desktop: LCP até 2,5 s, INP até 200 ms e CLS até 0,1. Ver [Desempenho web (Core Web Vitals)](../design/desempenho-web-core-web-vitals.md).

**Para uma skill:** o 3D tem um orçamento (MB e FPS) verificado, carrega tarde e pausa fora de vista.

## Fontes oficiais

*Ligações externas que apoiam esta entrada, consultadas a 2026-11-04. Não alteram o texto acima.*

- [Rendering on Demand (Three.js)](https://threejs.org/manual/pages/rendering-on-demand.html) — Renderizar só quando algo muda, poupando energia e bateria
- [Scaling performance (R3F)](https://r3f.docs.pmnd.rs/advanced/scaling-performance) — Instancing, menos draw calls e render a pedido
- [Intersection Observer API (MDN)](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API) — Carregamento tardio e animar só quando visível

> **Nota (fonte oficial):** Metas concretas (60 FPS desktop, mínimo em telemóvel) sem fonte oficial encontrada.

Fonte: pág. 22 (Dicionario-Boas-Praticas.pdf)

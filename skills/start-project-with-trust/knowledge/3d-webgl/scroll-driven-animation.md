---
id: 3d-webgl/scroll-driven-animation
titulo: "Scroll-driven animation"
seccao: "3D, WebGL e animação"
paginas: [20, 21]
fonte: Dicionario-Boas-Praticas.pdf
verificado_em: 2026-11-03
fontes_oficiais_consultadas_em: 2026-11-04
---

# Scroll-driven animation

**Resumo:** Animar pela posição do scroll sem nunca o sequestrar, com trabalho por frame mínimo.

## Conteúdo

- **O que é:** animar em função da posição do scroll. Nativo com CSS `scroll-timeline` / `view-timeline`, ou com GSAP ScrollTrigger, ou Lenis para scroll suave.
- **Quando vale:** narrativa ao descer a página, revelar secções, fixar e animar um elemento (pinning).
- **Custo:** médio. O trabalho por frame tem de ser barato, senão o scroll engasga; quem rola depressa não pode ficar preso.
- **Boas práticas:** nunca sequestrar o scroll a ponto de o utilizador o perder; trabalho por frame mínimo; testar em telemóvel.

**Para uma skill:** o conteúdo é legível e navegável com a animação desligada, e o scroll nunca fica preso.

## Fontes oficiais

*Ligações externas que apoiam esta entrada, consultadas a 2026-11-04. Não alteram o texto acima.*

- [CSS scroll-driven animations (MDN)](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_scroll-driven_animations) — Animação nativa por scroll com scroll-timeline e view-timeline
- [ScrollTrigger (GSAP)](https://gsap.com/docs/v3/Plugins/ScrollTrigger/) — Animações ligadas ao scroll, com pinning e scrub
- [WCAG 2.3.3 Animation from Interactions](https://www.w3.org/WAI/WCAG22/Understanding/animation-from-interactions.html) — Movimento desencadeado por interação deve poder desligar-se

Fonte: págs. 20, 21 (Dicionario-Boas-Praticas.pdf)

---
id: 3d-webgl/scroll-driven-animation
titulo: "Scroll-driven animation"
seccao: "3D, WebGL e animação"
paginas: [20, 21]
fonte: Dicionario-Boas-Praticas.pdf
verificado_em: 2026-11-03
---

# Scroll-driven animation

**Resumo:** Animar pela posição do scroll sem nunca o sequestrar, com trabalho por frame mínimo.

## Conteúdo

- **O que é:** animar em função da posição do scroll. Nativo com CSS `scroll-timeline` / `view-timeline`, ou com GSAP ScrollTrigger, ou Lenis para scroll suave.
- **Quando vale:** narrativa ao descer a página, revelar secções, fixar e animar um elemento (pinning).
- **Custo:** médio. O trabalho por frame tem de ser barato, senão o scroll engasga; quem rola depressa não pode ficar preso.
- **Boas práticas:** nunca sequestrar o scroll a ponto de o utilizador o perder; trabalho por frame mínimo; testar em telemóvel.

**Para uma skill:** o conteúdo é legível e navegável com a animação desligada, e o scroll nunca fica preso.

Fonte: págs. 20, 21 (Dicionario-Boas-Praticas.pdf)

---
id: 3d-webgl/animacao-css-e-svg
titulo: "Animação CSS e SVG"
seccao: "3D, WebGL e animação"
paginas: [20]
fonte: Dicionario-Boas-Praticas.pdf
verificado_em: 2026-11-03
---

# Animação CSS e SVG

**Resumo:** Transições e keyframes sem bibliotecas, animando só `transform`/`opacity` e com durações curtas.

## Conteúdo

- **O que é:** transições, `@keyframes`, `transform` e SVG animado. Sem bibliotecas, corre no compositor do browser.
- **Quando vale:** microinterações (hover, foco, estados), realces, loaders, transições entre vistas.
- **Custo:** quase nulo se animar só `transform` e `opacity` (não dispara relayout). Animar `width`, `top` e afins é caro.
- **Boas práticas:** animar `transform` / `opacity`; `will-change` com conta; durações curtas (150–300 ms); curvas de easing naturais.

**Para uma skill:** uma animação de interface usa `transform` / `opacity` e dura menos de ~400 ms.

Fonte: pág. 20 (Dicionario-Boas-Praticas.pdf)

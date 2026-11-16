---
id: 3d-webgl/animacao-css-e-svg
titulo: "Animação CSS e SVG"
seccao: "3D, WebGL e animação"
paginas: [20]
fonte: Dicionario-Boas-Praticas.pdf
verificado_em: 2026-11-03
fontes_oficiais_consultadas_em: 2026-11-04
---

# Animação CSS e SVG

**Resumo:** Transições e keyframes sem bibliotecas, animando só `transform`/`opacity` e com durações curtas.

## Conteúdo

- **O que é:** transições, `@keyframes`, `transform` e SVG animado. Sem bibliotecas, corre no compositor do browser.
- **Quando vale:** microinterações (hover, foco, estados), realces, loaders, transições entre vistas.
- **Custo:** quase nulo se animar só `transform` e `opacity` (não dispara relayout). Animar `width`, `top` e afins é caro.
- **Boas práticas:** animar `transform` / `opacity`; `will-change` com conta; durações curtas (150–300 ms); curvas de easing naturais.

**Para uma skill:** uma animação de interface usa `transform` / `opacity` e dura menos de ~400 ms.

## Fontes oficiais

*Ligações externas que apoiam esta entrada, consultadas a 2026-11-04. Não alteram o texto acima.*

- [Animations guide (web.dev)](https://web.dev/articles/animations-guide) — Restringir animações a opacity e transform; will-change com parcimónia
- [Using CSS animations (MDN)](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_animations/Using_CSS_animations) — @keyframes, duração e função de easing sem bibliotecas
- [will-change (MDN)](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/will-change) — will-change como último recurso e usado com parcimónia

> **Nota (fonte oficial):** MDN é mais restritivo que «will-change com conta»: só como último recurso para um problema de desempenho já existente, nunca preventivo. A meta de 150–300 ms não tem fonte oficial encontrada.

Fonte: pág. 20 (Dicionario-Boas-Praticas.pdf)

---
id: 3d-webgl/threejs-webgl
titulo: "Three.js / WebGL"
seccao: "3D, WebGL e animação"
paginas: [21]
fonte: Dicionario-Boas-Praticas.pdf
verificado_em: 2026-11-03
fontes_oficiais_consultadas_em: 2026-11-04
---

# Three.js / WebGL

**Resumo:** Cenas 3D no browser com o maior custo da lista: exige deteção de WebGL, fallback 2D, pausa e limpeza de memória.

## Conteúdo

- **O que é:** biblioteca sobre WebGL para cenas 3D no browser: geometria, câmaras, luz, materiais, partículas, pós-processamento.
- **Quando vale:** herói 3D, produto rotativo, partículas vivas, dados em 3D, cenas interativas.
- **Custo:** o maior da lista. GPU, memória e bateria. Uma GPU bloqueada ou um telemóvel fraco pode não ter WebGL.
- **Boas práticas:** uma só cena e um `requestAnimationFrame`; pausar quando a aba não está visível ou a cena sai do ecrã; limitar `pixelRatio`; dispor (`dispose`) geometrias e texturas.

**Para uma skill:** toda a cena Three.js tem deteção de WebGL, fallback 2D, pausa fora de vista e limpeza de memória.

## Fontes oficiais

*Ligações externas que apoiam esta entrada, consultadas a 2026-11-04. Não alteram o texto acima.*

- [WebGL Compatibility Check (Three.js)](https://threejs.org/manual/pages/webgl-compatibility-check.html) — Detetar suporte WebGL e mostrar alternativa quando falta
- [How to dispose of Objects (Three.js)](https://threejs.org/manual/pages/how-to-dispose-of-objects.html) — Geometrias, materiais e texturas exigem dispose() para libertar memória
- [Page Visibility API (MDN)](https://developer.mozilla.org/en-US/docs/Web/API/Page_Visibility_API) — Evitar trabalho com a aba oculta; rAF suspenso em segundo plano

> **Nota (fonte oficial):** O exemplo atual do Three.js verifica WebGL 2 (WebGL.isWebGL2Available()), não WebGL 1.

Fonte: pág. 21 (Dicionario-Boas-Praticas.pdf)

---
id: 3d-webgl/acessibilidade-e-movimento
titulo: "Acessibilidade e movimento"
seccao: "3D, WebGL e animação"
paginas: [22, 23]
fonte: Dicionario-Boas-Praticas.pdf
verificado_em: 2026-11-03
---

# Acessibilidade e movimento

**Resumo:** Respeitar sempre `prefers-reduced-motion`, ter fallback 2D e manter o conteúdo em HTML real.

## Conteúdo

- **`prefers-reduced-motion`:** respeitar sempre. Quem o ativou recebe uma versão sem movimento ou mínima (imagem fixa em vez da cena animada).
- **Fallback 2D:** a página funciona e lê-se sem WebGL; a informação e a navegação vivem em HTML real, não dentro da cena.
- **Não prender nem enjoar:** nada de scroll-hijack que tire o controlo; movimento grande e rápido pode causar mal-estar.
- **Foco e leitor de ecrã:** a cena é decoração (`aria-hidden` quando não é conteúdo); o conteúdo equivalente está acessível.

**Para uma skill:** sem fallback 2D e sem respeito por `prefers-reduced-motion`, o 3D não passa.

## Ver também

- [Acessibilidade (WCAG 2.1 AA)](../design/acessibilidade-wcag.md) (Design e experiência de utilizador)

Fonte: págs. 22, 23 (Dicionario-Boas-Praticas.pdf)

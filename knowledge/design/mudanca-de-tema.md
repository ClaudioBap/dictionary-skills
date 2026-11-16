---
id: design/mudanca-de-tema
titulo: "Mudança de tema (claro/escuro)"
seccao: "Design e experiência de utilizador"
paginas: [15]
fonte: Dicionario-Boas-Praticas.pdf
verificado_em: 2026-11-03
fontes_oficiais_consultadas_em: 2026-11-04
---

# Mudança de tema (claro/escuro)

**Resumo:** Temas por tokens que seguem o sistema, deixam alternar e guardam a escolha, com contraste AA nos dois.

## Conteúdo

- Temas por tokens: um conjunto de cores para claro e outro para escuro, trocados numa variável, sem reescrever o CSS.
- Respeitar `prefers-color-scheme` do sistema e deixar o utilizador escolher e guardar a escolha; aplicar o tema antes de pintar, para não haver flash.
- Contraste AA nos dois temas; imagens, ícones e sombras adaptados ao fundo.

**Para uma skill:** o site segue o tema do sistema, deixa alternar e guarda a escolha, com contraste AA nos dois.

## Ver também

- [Design system como código](../design/design-system-como-codigo.md) (Design e experiência de utilizador)

## Fontes oficiais

*Ligações externas que apoiam esta entrada, consultadas a 2026-11-04. Não alteram o texto acima.*

- [web.dev – Supporting dark mode](https://web.dev/articles/prefers-color-scheme) — Tokens por tema, escolha guardada, evitar flash, adaptar imagens
- [MDN – prefers-color-scheme](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-color-scheme) — Detetar a preferência clara/escura do sistema
- [WCAG 2.2 – 1.4.3 Contrast (Minimum)](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html) — Contraste AA exigido (aplica-se a cada tema)

Fonte: pág. 15 (Dicionario-Boas-Praticas.pdf)

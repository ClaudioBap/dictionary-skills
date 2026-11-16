---
id: design/design-system-como-codigo
titulo: "Design system como código"
seccao: "Design e experiência de utilizador"
paginas: [13]
fonte: Dicionario-Boas-Praticas.pdf
verificado_em: 2026-11-03
fontes_oficiais_consultadas_em: 2026-11-04
---

# Design system como código

**Resumo:** Tokens no `:root`, componentes construídos sobre os tokens e um catálogo com todos os estados.

## Conteúdo

- Tokens (cor, espaçamento, raio, tipografia) no `:root`, com variante clara e escura (`prefers-color-scheme`).
- Tokens → componentes (botão, tabela, diálogo, chip de estado) → páginas; uma folha por componente; nada de `style="..."` solto.
- Um catálogo de componentes com os estados (normal, foco, erro, desativado, a carregar).

**Para uma skill:** uma cor ou medida nova sai de um token; o componente existe antes de se duplicar HTML.

## Ver também

- [Mudança de tema (claro/escuro)](../design/mudanca-de-tema.md) (Design e experiência de utilizador)
- [Hierarquia visual e tipografia](../design/hierarquia-visual-e-tipografia.md) (Design e experiência de utilizador)

## Fontes oficiais

*Ligações externas que apoiam esta entrada, consultadas a 2026-11-04. Não alteram o texto acima.*

- [MDN – Using CSS custom properties](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties) — Propriedades personalizadas em :root reutilizadas globalmente
- [MDN – prefers-color-scheme](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-color-scheme) — Variante clara e escura segundo a preferência do sistema
- [W3C Design Tokens Community Group](https://www.designtokens.org/) — Formato normalizado para definir e trocar design tokens

> **Nota (fonte oficial):** O Design Tokens Community Group (W3C) publicou a primeira versão estável da especificação (2025.10) em outubro de 2025.

Fonte: pág. 13 (Dicionario-Boas-Praticas.pdf)

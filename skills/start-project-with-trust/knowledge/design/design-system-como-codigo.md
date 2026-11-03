---
id: design/design-system-como-codigo
titulo: "Design system como código"
seccao: "Design e experiência de utilizador"
paginas: [13]
fonte: Dicionario-Boas-Praticas.pdf
verificado_em: 2026-11-03
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

Fonte: pág. 13 (Dicionario-Boas-Praticas.pdf)

---
id: design/acessibilidade-wcag
titulo: "Acessibilidade (WCAG 2.1 AA)"
seccao: "Design e experiência de utilizador"
paginas: [13]
fonte: Dicionario-Boas-Praticas.pdf
verificado_em: 2026-11-03
fontes_oficiais_consultadas_em: 2026-11-04
---

# Acessibilidade (WCAG 2.1 AA)

**Resumo:** Alvo mínimo WCAG 2.1 AA: teclado, foco visível, leitor de ecrã, contraste e axe/pa11y no CI.

## Conteúdo

- Alvo mínimo WCAG 2.1 AA (obrigatório para serviço público em Portugal, DL 83/2018).
- Navegável só por teclado; foco visível; diálogos que se anunciam no leitor de ecrã; contraste medido.
- `axe` ou `pa11y` no CI; funciona a 360 px de largura.

**Para uma skill:** cada ecrã passa no axe, é navegável por teclado e tem contraste AA.

## Ver também

- [Ferramentas: qualidade do frontend](../cicd/ferramentas-qualidade-do-frontend.md) (CI/CD e ferramentas)

## Fontes oficiais

*Ligações externas que apoiam esta entrada, consultadas a 2026-11-04. Não alteram o texto acima.*

- [W3C WAI – WCAG Overview](https://www.w3.org/WAI/standards-guidelines/wcag/) — WCAG 2.2 é a versão atual; W3C recomenda usar a mais recente
- [ARIA APG – Dialog (Modal)](https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/) — Foco e anúncio de diálogos ao leitor de ecrã
- [Decreto-Lei n.º 83/2018](https://diariodarepublica.pt/dr/detalhe/decreto-lei/83-2018-116734769) — Acessibilidade de sítios web e apps do setor público (não lida: bloqueia acesso automático)

> **Nota (fonte oficial):** WCAG 2.2 é Recomendação W3C (5/10/2023, atualizada a 12/12/2024); acrescenta 9 critérios à 2.1 (ex.: 2.5.8 Target Size Minimum, AA) e o W3C recomenda usar a versão mais recente. O alvo legal português (DL 83/2018) não foi verificado por bloqueio do site.

> **Nota (fonte oficial):** O critério 1.4.10 Reflow (AA) exige funcionamento a 320 CSS px de largura, abaixo dos 360 px da entrada.

Fonte: pág. 13 (Dicionario-Boas-Praticas.pdf)

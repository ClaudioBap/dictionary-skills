---
id: design/acessibilidade-wcag
titulo: "Acessibilidade (WCAG 2.2 AA)"
seccao: "Design e experiência de utilizador"
paginas: [13]
fonte: Dicionario-Boas-Praticas.pdf
verificado_em: 2026-11-25
editado_em: 2026-11-25
fontes_oficiais_consultadas_em: 2026-11-04
---

# Acessibilidade (WCAG 2.2 AA)

**Resumo:** Alvo mínimo WCAG 2.2 AA: teclado, foco visível, leitor de ecrã, contraste e axe/pa11y no CI.

## Conteúdo

- Alvo mínimo WCAG 2.2 AA. O que cumpre a 2.2 cumpre também a 2.1, por isso cobre a 2.1 AA obrigatória para o serviço público em Portugal (DL 83/2018). Fonte: [W3C WAI: WCAG Overview](https://www.w3.org/WAI/standards-guidelines/wcag/)
- Navegável só por teclado; foco visível; diálogos que se anunciam no leitor de ecrã; contraste medido.
- `axe` ou `pa11y` no CI; funciona a 320 CSS px de largura sem deslocamento nas duas direções (critério 1.4.10 Reflow, AA). Fonte: [WCAG 2.2 (Recomendação W3C, 2024-12-12)](https://www.w3.org/TR/WCAG22/)
- Critérios que se medem: contraste de pelo menos 4,5:1 no texto e de 3:1 no texto grande, ou seja 18 pt, ou 14 pt em negrito (1.4.3); 3:1 nos componentes da interface e nos gráficos que dão informação (1.4.11); foco visível (2.4.7). A WCAG 2.2 acrescenta, no nível AA, que o foco não pode ficar totalmente tapado por conteúdo do próprio site (2.4.11) e que os alvos têm pelo menos 24×24 CSS px ou espaço suficiente à volta (2.5.8). Fonte: [WCAG 2.2 (Recomendação W3C, 2024-12-12)](https://www.w3.org/TR/WCAG22/)

**Para uma skill:** cada ecrã passa no axe, é navegável por teclado e tem contraste AA. Contraste AA quer dizer 4,5:1 no texto e 3:1 no texto grande, nos ícones e nos contornos dos controlos; o foco vê-se e não fica tapado; o conteúdo não obriga a deslocar nas duas direções a 320 CSS px de largura.

## Ver também

- [Ferramentas: qualidade do frontend](../cicd/ferramentas-qualidade-do-frontend.md) (CI/CD e ferramentas)
- [Ato Europeu da Acessibilidade (produtos e serviços)](ato-europeu-da-acessibilidade.md) (Design e experiência de utilizador)

## Fontes oficiais

*Ligações externas que apoiam esta entrada, consultadas a 2026-11-04. Não alteram o texto acima.*

- [W3C WAI – WCAG Overview](https://www.w3.org/WAI/standards-guidelines/wcag/) — WCAG 2.2 é a versão atual; W3C recomenda usar a mais recente
- [ARIA APG – Dialog (Modal)](https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/) — Foco e anúncio de diálogos ao leitor de ecrã
- [Decreto-Lei n.º 83/2018](https://diariodarepublica.pt/dr/detalhe/decreto-lei/83-2018-116734769) — Acessibilidade de sítios web e apps do setor público (não lida: bloqueia acesso automático)

> **Nota (fonte oficial):** WCAG 2.2 é Recomendação W3C (5/10/2023, atualizada a 12/12/2024); acrescenta 9 critérios à 2.1 (ex.: 2.5.8 Target Size Minimum, AA) e o W3C recomenda usar a versão mais recente. O alvo legal português (DL 83/2018) não foi verificado por bloqueio do site.

## Histórico

- **2024-12-12**: antes, «Alvo mínimo WCAG 2.1 AA (obrigatório para serviço público em Portugal, DL 83/2018).», com o título «Acessibilidade (WCAG 2.1 AA)» (PDF pág. 13). Mudou porque o W3C recomenda a versão mais recente e diz que o que cumpre a WCAG 2.2 cumpre também a 2.1 e a 2.0, por isso o alvo passa a 2.2 AA sem deixar de cobrir a lei. Fonte: [W3C WAI: WCAG Overview](https://www.w3.org/WAI/standards-guidelines/wcag/). Editado a 2026-11-25.
- **2024-12-12**: antes, «`axe` ou `pa11y` no CI; funciona a 360 px de largura.» (PDF pág. 13). Mudou porque o critério 1.4.10 Reflow (AA) da WCAG pede 320 CSS px de largura, como dizia a nota que esta entrada tinha. Fonte: [WCAG 2.2 (Recomendação W3C)](https://www.w3.org/TR/WCAG22/). Editado a 2026-11-25.

Fonte: pág. 13 (Dicionario-Boas-Praticas.pdf)

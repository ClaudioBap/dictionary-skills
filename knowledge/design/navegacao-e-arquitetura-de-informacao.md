---
id: design/navegacao-e-arquitetura-de-informacao
titulo: "Navegação e arquitetura de informação"
seccao: "Design e experiência de utilizador"
paginas: [17]
fonte: Dicionario-Boas-Praticas.pdf
verificado_em: 2026-11-18
editado_em: 2026-11-18
fontes_oficiais_consultadas_em: 2026-11-04
---

# Navegação e arquitetura de informação

**Resumo:** Estrutura previsível, agrupada por tarefa, onde o utilizador sabe sempre onde está e como voltar; um só deslocamento por ecrã, grupos do menu que abrem e fecham, e nada escondido por um filtro.

## Conteúdo

- Estrutura previsível: o utilizador sabe sempre onde está e como voltar (navegação, breadcrumbs, estado ativo).
- Agrupar por tarefa, não pelo organograma interno; nomes que o utilizador reconhece; profundidade rasa.
- Pesquisa quando o conteúdo é muito; a mesma coisa no mesmo sítio em todos os ecrãs.
- Um só deslocamento por ecrã. Numa aplicação com menu lateral, a moldura ocupa a altura do ecrã e só o conteúdo se desloca; a página inteira não se desloca por cima de colunas que também se deslocam, e duas ou três barras de scroll lado a lado querem dizer que a moldura ficou por fechar *(interpretação)*. No telemóvel, a altura do ecrã mede-se com `100dvh`, que acompanha as barras do browser a aparecer e a desaparecer; o `vh` equivale à altura maior, com as barras escondidas, e pode deixar conteúdo tapado. Quando uma zona interior chega ao fim, o browser passa o scroll à de fora («scroll chaining»), e `overscroll-behavior: contain` corta essa passagem. Fontes: [MDN: length, unidades de viewport (2026-07-08)](https://developer.mozilla.org/en-US/docs/Web/CSS/length), [MDN: overscroll-behavior (2026-10-13)](https://developer.mozilla.org/en-US/docs/Web/CSS/overscroll-behavior)
- O menu lateral nunca se desloca inteiro *(interpretação)*: se os itens não cabem, só a parte do meio se desloca, e o bloco da conta (perfil, sair) fica fixo em baixo. Como não se sabe a altura do ecrã de cada pessoa, os itens menos importantes vão para o fim da lista; no desktop, o menu fica à vista, sem se esconder atrás de um botão. Fonte: [NN/g: Left-Side Vertical Navigation on Desktop (2021-05-16)](https://www.nngroup.com/articles/vertical-nav/)
- Grupos que abrem e fecham. Num menu lateral com várias categorias, cada grupo é um botão que mostra e esconde os seus itens (padrão «disclosure» da APG do W3C): `<button aria-expanded="false" aria-controls="id-do-grupo">`, Enter e Espaço alternam, e uma seta para a direita (fechado) ou para baixo (aberto) mostra o estado. Todos fechados à partida *(interpretação)*; para não se perder o «onde estou», um grupo fechado mostra ao lado do nome a página em que se está *(interpretação)*. A pessoa abre os que quer, vários ao mesmo tempo, porque fechar um quando se abre outro impede comparar. A NN/g encontrou na seta e no «+» os sinais que melhor funcionam, quer que o título e o ícone abram ambos o grupo, e avisa que esconder prejudica quando a pessoa precisa de quase tudo: aí, menos grupos ou tudo à vista. Fontes: [W3C WAI-ARIA APG: Disclosure (data não indicada)](https://www.w3.org/WAI/ARIA/apg/patterns/disclosure/), [W3C WAI-ARIA APG: Accordion (data não indicada)](https://www.w3.org/WAI/ARIA/apg/patterns/accordion/), [NN/g: Accordions on Desktop (2023-07-30)](https://www.nngroup.com/articles/accordions-on-desktop/)
- Nada desaparece por um filtro *(interpretação)*: o que não cabe em nenhuma categoria (por exemplo, sessões fora de um projeto) aparece num grupo próprio, «Sem projeto», e nunca some da lista.

**Para uma skill:** em qualquer ecrã vê-se onde se está e como chegar ao resto em poucos cliques. Em capturas a 1600 e a 390 px há uma só barra de scroll, a do conteúdo; o menu lateral tem os grupos em botões com `aria-expanded`, fechados à partida, e o bloco da conta fixo em baixo; o que não cabe numa categoria aparece num grupo próprio.

## Fontes oficiais

*Ligações externas que apoiam esta entrada, consultadas a 2026-11-04. Não alteram o texto acima.*

- [GOV.UK – Breadcrumbs](https://design-system.service.gov.uk/components/breadcrumbs/) — Ajudar a perceber e mover-se entre níveis do site
- [NN/g – Flat vs. Deep Hierarchies](https://www.nngroup.com/articles/flat-vs-deep-hierarchy/) — Profundidade adequada; card sorting e tree testing
- [NN/g – Search: Visible and Simple](https://www.nngroup.com/articles/search-visible-and-simple/) — Pesquisa disponível e visível em todas as páginas

> **Nota (fonte oficial):** A NN/g não recomenda sempre profundidade rasa: escolher conforme os utilizadores e evitar extremos.

*As fontes da edição de 2026-11-18 (MDN, W3C APG e NN/g) estão ligadas em cada ponto do «Conteúdo».*

## Histórico

- **2026-11-18**: antes, o resumo dizia «Estrutura previsível, agrupada por tarefa, onde o utilizador sabe sempre onde está e como voltar.» e a linha «Para uma skill» dizia «em qualquer ecrã vê-se onde se está e como chegar ao resto em poucos cliques.» (PDF pág. 17). Mudou porque a entrada passou a cobrir a moldura das aplicações com menu lateral: um só deslocamento por ecrã, grupos do menu que abrem e fecham e um grupo próprio para o que não cabe num filtro. Fontes: [W3C WAI-ARIA APG: Disclosure](https://www.w3.org/WAI/ARIA/apg/patterns/disclosure/), [NN/g: Accordions on Desktop](https://www.nngroup.com/articles/accordions-on-desktop/), [MDN: overscroll-behavior](https://developer.mozilla.org/en-US/docs/Web/CSS/overscroll-behavior). Confiança: media. Editado a 2026-11-18.

Fonte: pág. 17 (Dicionario-Boas-Praticas.pdf)

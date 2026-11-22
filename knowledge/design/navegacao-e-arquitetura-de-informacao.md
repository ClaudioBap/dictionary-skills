---
id: design/navegacao-e-arquitetura-de-informacao
titulo: "Navegação e arquitetura de informação"
seccao: "Design e experiência de utilizador"
paginas: [17]
fonte: Dicionario-Boas-Praticas.pdf
verificado_em: 2026-11-22
editado_em: 2026-11-22
fontes_oficiais_consultadas_em: 2026-11-04
---

# Navegação e arquitetura de informação

**Resumo:** Estrutura previsível, agrupada por tarefa, onde o utilizador sabe sempre onde está e como voltar: a migalha mostra a hierarquia e «voltar» leva para onde se veio; um só deslocamento por zona, com lista e detalhe a deslocar-se cada um sozinho, grupos do menu que abrem e fecham, e nada escondido por um filtro.

## Conteúdo

- Estrutura previsível: o utilizador sabe sempre onde está e como voltar (navegação, breadcrumbs, estado ativo).
- A migalha mostra onde a página está na hierarquia, e não o caminho feito. A NN/g di-lo na orientação 2: «Breadcrumbs Should Display the Current Location in the Site's Hierarchical Structure, Not the Session History», e na 1, que a migalha acompanha a navegação e não a substitui. Fonte: [NN/g: Breadcrumbs: 11 Design Guidelines for Desktop and Mobile (2018-12-23, revista a 2026-09-01)](https://www.nngroup.com/articles/breadcrumbs/)
- «Voltar» leva para onde se veio *(interpretação)*. Uma página que se abre de vários sítios tem um «voltar» que segue o caminho feito, e não um destino fixo. Por exemplo, as pessoas de um projeto abertas no próprio projeto voltam ao projeto, e abertas na lista voltam à lista. Uma skill aberta pelo Impacto mostra «‹ Voltar ao Impacto» ao lado da migalha «Skills / nome». Um «voltar» que leva sempre ao mesmo pai obriga a refazer o caminho. O sítio de onde se veio sabe-se pelo endereço anterior (`oldURL` do evento `hashchange`, numa aplicação de rotas por `#`). Aberta à mão, sem sítio anterior, a página volta ao pai natural dela. Decisão do Cláudio, 2026-11-22.
- Agrupar por tarefa, não pelo organograma interno; nomes que o utilizador reconhece; profundidade rasa.
- Pesquisa quando o conteúdo é muito; a mesma coisa no mesmo sítio em todos os ecrãs.
- Um só deslocamento por ecrã. Numa aplicação com menu lateral, a moldura ocupa a altura do ecrã e só o conteúdo se desloca; a página inteira não se desloca por cima de colunas que também se deslocam, e duas ou três barras de scroll lado a lado querem dizer que a moldura ficou por fechar *(interpretação)*. No telemóvel, a altura do ecrã mede-se com `100dvh`, que acompanha as barras do browser a aparecer e a desaparecer; o `vh` equivale à altura maior, com as barras escondidas, e pode deixar conteúdo tapado. Quando uma zona interior chega ao fim, o browser passa o scroll à de fora («scroll chaining»), e `overscroll-behavior: contain` corta essa passagem. Fontes: [MDN: length, unidades de viewport (2026-07-08)](https://developer.mozilla.org/en-US/docs/Web/CSS/length), [MDN: overscroll-behavior (2026-10-13)](https://developer.mozilla.org/en-US/docs/Web/CSS/overscroll-behavior)
- Numa vista de lista e detalhe, cada painel desloca-se sozinho *(interpretação)*. A lista e o detalhe ficam presos lado a lado (`position: sticky` com `top`), cada um com a altura do ecrã (`max-height: calc(100dvh - …)`) e o seu `overflow: auto`. O `overscroll-behavior: contain` impede que a roda num deles mexa na página ou no outro, e o cabeçalho de uma tabela comprida fica preso dentro do painel. Um painel preso mais alto do que o ecrã é o erro a evitar: para lhe ver o fundo, desloca-se a página toda, e a lista ao lado foge. O MDN descreve o elemento preso como deslocado «relative to its nearest scrolling ancestor». No telemóvel, lista e detalhe são dois ecrãs, e isto não se aplica. Decisão do Cláudio, 2026-11-22: «cada um tem o seu scroll próprio». Fonte: [MDN: position (2026-07-26)](https://developer.mozilla.org/en-US/docs/Web/CSS/position)
- Uma lista ao lado de um bloco mais curto mostra as primeiras que cabem *(interpretação)*. Por baixo, «Ver todas as N» abre o resto ali mesmo, com `aria-expanded`, e volta a fechar. Com a lista toda, a coluna descia muito abaixo do bloco vizinho e deixava um espaço vazio no meio da página. Decisão do Cláudio, 2026-11-22.
- O menu lateral nunca se desloca inteiro *(interpretação)*: se os itens não cabem, só a parte do meio se desloca, e o bloco da conta (perfil, sair) fica fixo em baixo. Como não se sabe a altura do ecrã de cada pessoa, os itens menos importantes vão para o fim da lista; no desktop, o menu fica à vista, sem se esconder atrás de um botão. Fonte: [NN/g: Left-Side Vertical Navigation on Desktop (2021-05-16)](https://www.nngroup.com/articles/vertical-nav/)
- Grupos que abrem e fecham. Num menu lateral com várias categorias, cada grupo é um botão que mostra e esconde os seus itens (padrão «disclosure» da APG do W3C): `<button aria-expanded="false" aria-controls="id-do-grupo">`, Enter e Espaço alternam, e uma seta para a direita (fechado) ou para baixo (aberto) mostra o estado. Todos fechados à partida *(interpretação)*; para não se perder o «onde estou», um grupo fechado mostra ao lado do nome a página em que se está *(interpretação)*. A pessoa abre os que quer, vários ao mesmo tempo, porque fechar um quando se abre outro impede comparar. A NN/g encontrou na seta e no «+» os sinais que melhor funcionam, quer que o título e o ícone abram ambos o grupo, e avisa que esconder prejudica quando a pessoa precisa de quase tudo: aí, menos grupos ou tudo à vista. Fontes: [W3C WAI-ARIA APG: Disclosure (data não indicada)](https://www.w3.org/WAI/ARIA/apg/patterns/disclosure/), [W3C WAI-ARIA APG: Accordion (data não indicada)](https://www.w3.org/WAI/ARIA/apg/patterns/accordion/), [NN/g: Accordions on Desktop (2023-07-30)](https://www.nngroup.com/articles/accordions-on-desktop/)
- Nada desaparece por um filtro *(interpretação)*: o que não cabe em nenhuma categoria (por exemplo, sessões fora de um projeto) aparece num grupo próprio, «Sem projeto», e nunca some da lista.

**Para uma skill:**
- Em qualquer ecrã vê-se onde se está e como chegar ao resto em poucos cliques.
- A migalha mostra a hierarquia, e uma página que se abre de vários sítios volta ao sítio de onde se veio, o que se prova abrindo-a de cada um.
- Em capturas a 1600 e a 390 px há uma só barra de scroll por zona.
- Numa vista de lista e detalhe, a roda num painel não mexe na página nem no outro: `scrollY` e o `scrollTop` do outro ficam iguais.
- O menu lateral tem os grupos em botões com `aria-expanded`, fechados à partida, e o bloco da conta fixo em baixo.
- O que não cabe numa categoria aparece num grupo próprio.
- Uma lista ao lado de um bloco mais curto tem «Ver todas as N».

## Fontes oficiais

*Ligações externas que apoiam esta entrada, consultadas a 2026-11-04. Não alteram o texto acima.*

- [GOV.UK – Breadcrumbs](https://design-system.service.gov.uk/components/breadcrumbs/) — Ajudar a perceber e mover-se entre níveis do site
- [NN/g – Flat vs. Deep Hierarchies](https://www.nngroup.com/articles/flat-vs-deep-hierarchy/) — Profundidade adequada; card sorting e tree testing
- [NN/g – Search: Visible and Simple](https://www.nngroup.com/articles/search-visible-and-simple/) — Pesquisa disponível e visível em todas as páginas

> **Nota (fonte oficial):** A NN/g não recomenda sempre profundidade rasa: escolher conforme os utilizadores e evitar extremos.

*As fontes da edição de 2026-11-18 (MDN, W3C APG e NN/g) estão ligadas em cada ponto do «Conteúdo».*

## Histórico

- **2026-11-22**: antes, o resumo dizia «Estrutura previsível, agrupada por tarefa, onde o utilizador sabe sempre onde está e como voltar; um só deslocamento por ecrã, grupos do menu que abrem e fecham, e nada escondido por um filtro.» e a linha «Para uma skill» dizia «em qualquer ecrã vê-se onde se está e como chegar ao resto em poucos cliques. Em capturas a 1600 e a 390 px há uma só barra de scroll, a do conteúdo; o menu lateral tem os grupos em botões com `aria-expanded`, fechados à partida, e o bloco da conta fixo em baixo; o que não cabe numa categoria aparece num grupo próprio.» Mudou por três pedidos do Cláudio no portal de agentes: um «voltar» que levava sempre ao Edifício, mesmo vindo do projeto, e uma skill aberta pelo Impacto que só voltava às Skills; um painel preso mais alto do que o ecrã, que obrigava a deslocar a página toda; e uma lista ao lado que deixava um espaço vazio no meio. A migalha manteve-se na hierarquia, como a NN/g recomenda. Fontes: [NN/g: Breadcrumbs](https://www.nngroup.com/articles/breadcrumbs/), [MDN: position](https://developer.mozilla.org/en-US/docs/Web/CSS/position). Confiança: alta. Editado a 2026-11-22.
- **2026-11-18**: antes, o resumo dizia «Estrutura previsível, agrupada por tarefa, onde o utilizador sabe sempre onde está e como voltar.» e a linha «Para uma skill» dizia «em qualquer ecrã vê-se onde se está e como chegar ao resto em poucos cliques.» (PDF pág. 17). Mudou porque a entrada passou a cobrir a moldura das aplicações com menu lateral: um só deslocamento por ecrã, grupos do menu que abrem e fecham e um grupo próprio para o que não cabe num filtro. Fontes: [W3C WAI-ARIA APG: Disclosure](https://www.w3.org/WAI/ARIA/apg/patterns/disclosure/), [NN/g: Accordions on Desktop](https://www.nngroup.com/articles/accordions-on-desktop/), [MDN: overscroll-behavior](https://developer.mozilla.org/en-US/docs/Web/CSS/overscroll-behavior). Confiança: media. Editado a 2026-11-18.

Fonte: pág. 17 (Dicionario-Boas-Praticas.pdf)

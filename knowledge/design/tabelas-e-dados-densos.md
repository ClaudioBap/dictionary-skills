---
id: design/tabelas-e-dados-densos
titulo: "Tabelas e dados densos"
seccao: "Design e experiência de utilizador"
paginas: [17]
fonte: Dicionario-Boas-Praticas.pdf
verificado_em: 2026-11-22
editado_em: 2026-11-22
fontes_oficiais_consultadas_em: 2026-11-04
---

# Tabelas e dados densos

**Resumo:** Tabelas com ordenação, filtro, pesquisa e paginação, que nunca se deslocam para o lado. Mudam pela largura do sítio onde estão: primeiro os botões empilham-se, depois cada linha passa a cartão.

## Conteúdo

- Ordenar, filtrar, pesquisar e paginar; ações em massa; as colunas essenciais primeiro.
- Alinhar números à direita; destacar a linha ativa; estados de vazio e de carregamento.
- Em ecrã pequeno, repensar a tabela (cartões, colunas colapsáveis), não encolher até ficar ilegível.
- Uma tabela nunca se desloca para o lado *(interpretação)*. As colunas curtas (nível, data, números, botões) ficam só com a largura do conteúdo: numa tabela automática, `width: 1%` com `white-space: nowrap`. A coluna principal fica com o resto, e assim os emails e os nomes cabem inteiros. Larguras fixas generosas nas colunas curtas e uma fila de botões que não quebra são o que empurra a tabela para fora do cartão. Decisão do Cláudio, 2026-11-22: «não quero scroll aqui».
- A tabela muda pela largura do sítio onde está, e não pela do ecrã. Ao lado de outro painel, ou num ecrã com zoom, o cartão pode ser estreito num ecrã largo. Por isso a lista declara-se contentor (`container: lista / inline-size`) e a tabela responde a `@container lista (max-width: …)`. Num cartão médio, os botões de cada linha empilham-se com a mesma largura. Num cartão estreito, cada linha passa a cartão, como no telemóvel, e o filtro do cabeçalho passa para ao lado da pesquisa. O MDN apresenta as consultas ao contentor como a alternativa às de media, que olham para o ecrã. Fonte: [MDN: CSS container queries (2026-07-08)](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_containment/Container_queries)

**Para uma skill:**
- Tabelas grandes têm ordenação, filtro e paginação, e uma forma legível em telemóvel.
- A caixa de cada tabela não se desloca para o lado, de 1920 a 390 px: `scrollWidth` igual a `clientWidth`.
- Mede-se a caixa da tabela, e não só a página, porque a barra de scroll fica dentro da caixa, onde uma prova da página inteira não a vê.
- Nenhum email nem nome se parte a meio quando há espaço para ele.

## Fontes oficiais

*Ligações externas que apoiam esta entrada, consultadas a 2026-11-04. Não alteram o texto acima.*

- [NN/g – Data Tables](https://www.nngroup.com/articles/data-tables/) — Ordenar, filtrar, indicar filtros ativos, destacar a linha
- [NN/g – Mobile tables](https://www.nngroup.com/articles/mobile-tables/) — Adaptar tabelas a ecrã pequeno sem perder legibilidade

*A fonte da edição de 2026-11-22 (MDN) está ligada no ponto do «Conteúdo».*

## Histórico

- **2026-11-22**: antes, o resumo dizia «Tabelas com ordenação, filtro, pesquisa e paginação, repensadas para ecrã pequeno.» e a linha «Para uma skill» dizia «tabelas grandes têm ordenação, filtro e paginação, e uma forma legível em telemóvel.» (PDF pág. 17). Mudou porque a tabela de pessoas do portal de agentes se deslocava para o lado num ecrã largo e a prova da página não o via. Fonte: [MDN: CSS container queries](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_containment/Container_queries). Confiança: alta. Editado a 2026-11-22.

Fonte: pág. 17 (Dicionario-Boas-Praticas.pdf)

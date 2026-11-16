# Exemplos: design-ux

## O que faz

Desenha interfaces: páginas, fluxos, formulários, painéis de administração e sites de conteúdos. Pergunta o que é e a que nível (simples, profissional ou topo), lê só as entradas de `design/` e `seo/` que o pedido toca e trabalha dentro do design system do projeto. Só dá o trabalho por feito com provas que outra pessoa pode repetir: verificação automática de acessibilidade, navegação por teclado, Core Web Vitals medidos e capturas nas larguras certas.

## Quando usar

- Uma página, um fluxo ou um formulário novos.
- Um painel de administração com tabelas e dados densos.
- Tornar uma interface acessível e boa de usar no telemóvel.
- SEO técnico e dados estruturados num site público.

## Quando não usar

- 3D, WebGL e movimento: `design-3d-motion`.
- Baixar o tempo de carregamento de um site que já existe: `performance-verifier`.
- Procurar marcas de IA nos textos da interface: `humanizar`.

## Exemplo: a interface do portal e do admin

**Pedido:** «Listagem com filtros, notícia com fonte, data, confiança e imagem, área em validação com votos, e os ecrãs do admin. Nível topo.»

**O que a skill faz:**

1. Regista o nível e de onde veio: a resposta do Cláudio na divisão das tarefas.
2. Lê as entradas que o pedido toca com dois subagentes de leitura em `haiku`.
3. Põe os filtros no endereço (`/?tema=ia&confianca=alta`), para sobreviverem a recarregar, e dá a cada lista os estados de carregamento, vazio e erro.
4. Corre o axe em seis páginas e três larguras (320, 360 e 390 px), sem violações, e descreve a ordem do Tab passo a passo.
5. Mede os Core Web Vitals com o Lighthouse em modo telemóvel: LCP entre 0,9 e 1,2 s e CLS de 0,045 no máximo.

**Resultado:** Foi assim que se fez a primeira interface do site de notícias. O nome do portal e o endereço público ficaram «Por preencher».

## Exemplo: um site que se folheia como um jornal

**Pedido:** «Eu gostava de ter um site de notícias que fosse visualmente bonito como se alguém estivesse mesmo a paginar um jornal e aparecesse notícias.»

**O que a skill faz:**

1. Regista o nível topo a partir das palavras do pedido.
2. Deixa o virar de página em 3D para a `design-3d-motion` e fica com a grelha, a tipografia, a navegação por cadernos e as duas línguas (`internacionalizacao.md`).
3. Usa tipos de letra com licença OFL servidos pelo próprio site, como pede `assets-e-fontes-locais.md`.
4. Prova a responsividade com capturas a 390 e a 1440 px da primeira página, de um caderno, de uma notícia e de uma página a virar.

**Resultado:** É o jornal do site de notícias, ainda em construção: a primeira página, os cadernos e o virar de página já existem, em português e em inglês.

## Exemplo: um formulário simples

**Pedido:** «Preciso de um formulário de contacto para o site da clínica.»

**O que a skill faz:**

1. Classifica o pedido como simples e lê `formularios.md`, `microcopia-erros-e-estados-claros.md` e `acessibilidade-wcag.md`.
2. Desenha o formulário com etiquetas visíveis, erros junto ao campo que falhou e uma mensagem clara depois do envio.
3. Prova com o axe sem erros e com o envio feito só com o teclado, descrito passo a passo.
4. Deixa «Por preencher» o endereço que recebe os contactos e os textos finais, com texto de substituição marcado.

**Resultado:** Um formulário pronto a ligar, com as provas coladas e só o que a clínica tem de dar por preencher.

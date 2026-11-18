---
id: portais-de-agentes/um-mundo-por-publico
titulo: "Escolher o mundo de cada público"
seccao: "Portais e mundos de agentes"
paginas: []
fonte: "https://www.w3.org/TR/WCAG22/"
data_lancamento: null
confianca: alta
verificado_em: 2026-11-18
---

# Escolher o mundo de cada público

**Resumo:** Cada público do portal tem o seu mundo, tirado do que o produto tem e do que esse público vem fazer; o mundo de um público não se estende a outro, a metáfora valida-se com o dono numa maqueta antes do código e, quando ele escolhe o nível «topo», o 3D e o movimento ligados ao tema ficam decididos.

## Conteúdo

Origem: os três mundos do projeto de origem (um jornal público, uma administração e uma escola) e as propostas que o dono recusou pelo caminho *(experiência do projeto)*. O desenho de metáforas não tem fonte oficial: o que aqui está é método e experiência. Só a regra da cor vem da WCAG 2.2, lida a 2026-11-18. Os eventos e as animações, o ao vivo e a repetição e o orçamento de desempenho estão em [Mundo 3D movido por agentes](../3d-webgl/mundo-3d-movido-por-agentes.md) e não se repetem aqui.

### Um público, um mundo

Um público é um grupo de pessoas que vem fazer a mesma coisa. Quem lê novidades, quem gere o conhecimento e as skills e quem acompanha as suas sessões são três públicos, mesmo quando a mesma pessoa está nos três.

- Cada público tem o seu mundo. O de um não se estende a outro, por mais bonito que seja e por mais feito que já esteja.
- O mundo de quem gere é uma ferramenta: aspeto de aplicação de trabalho, claro e escuro, tabelas. Pode ter uma cena 3D, ligada ao que se gere (o conhecimento, as skills), e nunca ao estilo da face pública.
- Um público que só lê pode ter o mundo mais temático, porque vem ver e não trabalhar.

### Método

1. Escreve os públicos e, para cada um, a frase «vem aqui para…». Dois públicos com a mesma frase são um só.
2. Lista o que o produto tem: o que se guarda (conhecimento, notas), o que trabalha (sessões, skills, subagentes), quem pede (pessoas) e o que acontece (começar, perguntar, parar, falhar, enviar).
3. Escolhe um lugar conhecido onde essas relações já existem e se leem sem legenda. Cada coisa da lista ganha um elemento do lugar, e cada estado que importa ganha um sinal (quem espera resposta levanta o braço).
4. Recusa os elementos sem correspondência e os que trazem a estética de outro produto. Um elemento do mundo que não corresponde a nada do produto é enfeite.
5. Verifica a escala. Com dez pessoas e trinta projetos o mundo ainda se lê? A unidade do mundo tem de ser a unidade do trabalho: uma pessoa, um repositório.
6. Escreve a tabela evento para cena, no formato de [Mundo 3D movido por agentes](../3d-webgl/mundo-3d-movido-por-agentes.md), antes de desenhar. Um evento sem sítio no mundo mostra que a metáfora não serve.
7. Leva ao dono duas ou três propostas, com a recomendada e a razão.
8. Faz a maqueta da proposta escolhida e só depois o código.

O que o projeto de origem tinha e como ficou em cada um dos dois mundos de trabalho:

| O produto tem | Biblioteca com oficina (administração) | Escola (trabalho de cada pessoa) |
|---|---|---|
| Conhecimento por categoria | Uma estante por categoria, um volume por entrada | Estantes na sala |
| Skills | Uma bancada e um boneco por skill | Alunos, só as skills que o projeto usou |
| Sessões | Postos de trabalho | Professor (a mais antiga) e auxiliares |
| Subagentes | Ajudantes que vão às estantes | Ajudantes |
| Orquestrador | Um boneco como os outros | Avaliador, com a pauta na parede |
| Pessoa | Sem elemento: a administração é de uma pessoa | Um edifício |
| Repositório git | Sem elemento | Um andar, que é uma sala de aula |
| Pergunta à espera | Braço no ar, com «?» | O professor vira-se para a porta, de braço no ar |
| Push | Sem elemento | O avaliador passa pelas secretárias e afixa as notas |

### Propostas recusadas *(experiência do projeto)*

| Proposta | Para quem | Porque saiu |
|---|---|---|
| Um painel do conhecimento, com números e pouco conteúdo | O público | O dono queria um jornal que se folheia. O painel era o que ele queria gerir, posto no sítio errado, e passou para a administração |
| Uma redação de jornal | A administração | A face pública não se estende à ferramenta. Trazia rotativas e tipos de imprensa a uma ferramenta de trabalho; ficou a biblioteca com oficina |
| Uma só sala com as sessões de todas as pastas | A equipa | Não crescia para várias pessoas e projetos, e juntava pastas com o mesmo nome. Passou a escola, com um edifício por pessoa e um andar por repositório |
| Um emblema no peito e o tampo da secretária pintado, para dizer de onde vem a skill | A escola | O dono achou a marca feia. Ficaram a silhueta, o cachecol e a placa ([Papéis e aspeto dos agentes na cena](papeis-e-aspeto-dos-agentes.md)) |
| Sem 3D, por aplicação do critério geral do conhecimento | O público | O dono tinha pedido «topo». O critério serve quando ninguém decidiu |

### «Topo» quer dizer 3D e movimento ligados ao tema

- Quando o dono escolhe o nível «topo» para uma interface, quer 3D e movimento a sério, ligados ao tema do produto. Fica decidido, e nenhum briefing nem skill o reabre com «o 3D justifica-se?». O critério de [3D na web: quando e porquê](../3d-webgl/3d-na-web-quando-e-porque.md) aplica-se quando ninguém decidiu.
- Ligado ao tema quer dizer alimentado pelos dados verdadeiros: a cena mostra o que existe e o que muda (categorias, novidades, sessões, perguntas). Uma cena bonita sem dados é decoração solta do conteúdo.
- O conteúdo continua a ler-se sem a cena. Sem WebGL, com movimento reduzido ou num telemóvel fraco fica a alternativa com os mesmos dados ([Acessibilidade e movimento](../3d-webgl/acessibilidade-e-movimento.md)).
- A prova é o que o dono vê: capturas de cada estado, em claro e escuro, a 390 px e em ecrã largo, abertas e vistas antes de dar o trabalho por feito. Números de desempenho não chegam.

### A maqueta antes de construir

- Uma página navegável com todos os ecrãs, dados de exemplo plausíveis e o mundo em esboço, que pode já ser 3D simples. Serve para o dono dizer «é isto» antes de haver código.
- Tem os mesmos ecrãs a 390 px, porque o telemóvel é onde se vai usar.
- No projeto de origem houve maqueta antes da escola (edifício em corte, sala, pauta, caixa de perguntas, gestão) e antes da passagem do portal a ecrã inteiro. As duas foram aprovadas pelo dono antes de se escrever código.

### Cor, forma e legenda

Pela WCAG 2.2 (1.4.1), a cor não pode ser o único meio visual de passar informação ou de distinguir um elemento. Num mundo, o significado lê-se primeiro pela forma (silhueta, objeto, posição) e a cor reforça. A legenda fica onde se inspeciona um boneco, e não espalhada pela cena ([Papéis e aspeto dos agentes na cena](papeis-e-aspeto-dos-agentes.md)).

**Para uma skill:** antes de desenhar um mundo, escreve os públicos com o «vem aqui para…» de cada um, a lista do que o produto tem e a correspondência elemento a elemento; não estendas o mundo de um público a outro; leva ao dono duas ou três propostas e uma maqueta navegável, também a 390 px, antes do código. Com «topo» decidido, o 3D ligado aos dados não se discute e prova-se com capturas.

## Ver também

- [Quando compensa um portal de agentes e como se monta](portal-de-agentes-quando-e-como.md) (Portais e mundos de agentes)
- [Perguntas antes de construir um portal de agentes](perguntas-antes-de-construir.md) (Portais e mundos de agentes)
- [Papéis e aspeto dos agentes na cena](papeis-e-aspeto-dos-agentes.md) (Portais e mundos de agentes)
- [Eventos das sessões e origem das skills](eventos-e-origem-das-skills.md) (Portais e mundos de agentes)
- [Mundo 3D movido por agentes](../3d-webgl/mundo-3d-movido-por-agentes.md) (3D, WebGL e animação)
- [3D na web: quando e porquê](../3d-webgl/3d-na-web-quando-e-porque.md) (3D, WebGL e animação)
- [Acessibilidade e movimento](../3d-webgl/acessibilidade-e-movimento.md) (3D, WebGL e animação)
- [Painel de administração e controlo](../design/painel-de-administracao-e-controlo.md) (Design e experiência de utilizador)
- [Cor com significado](../design/cor-com-significado.md) (Design e experiência de utilizador)

## Fontes oficiais

*Lidas a 2026-11-18.*

- [W3C: WCAG 2.2](https://www.w3.org/TR/WCAG22/): 1.4.1 Use of Color, a cor não é o único meio visual de passar informação

O desenho de metáforas não tem fonte oficial.

Fonte: experiência do projeto de origem e a fonte acima. Não vem do PDF.

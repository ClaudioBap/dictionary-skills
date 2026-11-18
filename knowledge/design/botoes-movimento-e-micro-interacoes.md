---
id: design/botoes-movimento-e-micro-interacoes
titulo: "Botões, movimento e micro-interações"
seccao: "Design e experiência de utilizador"
paginas: []
fonte: "https://www.nngroup.com/articles/flat-ui-less-attention-cause-uncertainty/"
data_lancamento: 2017-09-03
confianca: alta
verificado_em: 2026-11-18
---

# Botões, movimento e micro-interações

**Resumo:** As ações são botões que se reconhecem como botões, com estados ao passar, premir, focar e carregar; o movimento responde à ação ou explica uma mudança, e com `prefers-reduced-motion` a interface funciona sem ele. Tirar as marcas de IA não é achatar: uma interface toda reta e parada também denuncia ferramenta.

## Conteúdo

- Ação é botão, navegação é link. Um botão faz uma coisa (guardar, aprovar, enviar); um link leva a outro sítio. O GOV.UK usa o botão para a pessoa fazer uma ação, e o botão «Start», que só leva ao início do serviço, é um link com aspeto de botão. Usa-se o `<button>` nativo, que já traz o foco e a ativação por Enter e Espaço; um link a fazer de botão precisa de `role="button"` e de tratar a tecla Espaço à mão. Fontes: [GOV.UK Design System: Button (alterações recentes até julho de 2026)](https://design-system.service.gov.uk/components/button/), [MDN: ARIA button role (2026-08-21)](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Roles/button_role)
- Os links são sublinhados por omissão, e o sublinhado só sai quando o contexto já diz que aquilo é um link. *(interpretação)* O texto sublinhado fica para navegar dentro do texto e nunca serve de botão de ação. Fonte: [GOV.UK Design System: Links (data não indicada)](https://design-system.service.gov.uk/styles/links/)
- Hierarquia: um botão principal por ecrã ou por grupo, porque vários principais na mesma página perdem força; secundários para as outras ações; o de aviso só para ações graves e difíceis de desfazer, com um passo de confirmação e sem depender só do vermelho. O texto diz a ação, com maiúscula só na primeira palavra («Guardar e continuar»). Dois ou mais botões vão num grupo, com o principal alinhado à esquerda do formulário. Fonte: [GOV.UK Design System: Button](https://design-system.service.gov.uk/components/button/)
- Forma *(interpretação)*: o principal cheio, o secundário com contorno ou, nas ações de menos peso, fantasma (só texto, com fundo ao passar); cantos ligeiramente arredondados, com o raio do design system, e nunca em pílula.
- Sinais fortes de clique. Num estudo da NN/g, os elementos com sinais fracos (botões fantasma, links sem sublinhado com aspeto de texto, separadores muito planos) levaram cerca de 22% mais tempo a encontrar, com cerca de 25% mais fixações, e as pessoas olhavam para o alvo e seguiam em frente por não terem a certeza. Os sinais fortes são a forma de botão com alguma profundidade, uma cor de contraste guardada para o que se clica e os links sublinhados. O plano corre menos risco com pouca informação no ecrã, um layout habitual e alvos com contraste alto. Por isso o fantasma nunca fica na ação que a pessoa procura *(interpretação)*. Fonte: [NN/g: Flat UI Elements Attract Less Attention and Cause Uncertainty (2017-09-03)](https://www.nngroup.com/articles/flat-ui-less-attention-cause-uncertainty/)
- Estados: cada botão e cada controlo muda ao passar o rato, ao ser premido, com o foco de teclado visível e, quando a ação demora, a carregar, com uma transição curta entre estados. Para a resposta ser lida como efeito da ação, tem de começar até 0,1 s depois dela. Fonte: [NN/g: Animation for Attention and Comprehension (2014-09-21)](https://www.nngroup.com/articles/animation-usability/); o foco visível é critério de [Acessibilidade (WCAG 2.1 AA)](acessibilidade-wcag.md).
- Micro-interações: pares de gatilho e resposta, como um favorito que se marca ou um campo que confirma a regra da palavra-passe enquanto se escreve. Mostram o estado do sistema, ajudam a evitar erros e dão a voz do produto; querem-se subtis e breves, para não tirarem a atenção da tarefa. Fonte: [NN/g: Microinteractions in User Experience (2018-10-21)](https://www.nngroup.com/articles/microinteractions/)
- Movimento que explica: a animação mostra a relação entre elementos e a mudança de estado (campos que aparecem depois de uma escolha, um painel que abre a partir do botão) e chama a atenção para o que se tem de ver já. Prejudica quando é decoração, quando se repete sempre que a pessoa passa pelo mesmo sítio e quando não se pode saltar. A NN/g fecha com usar a animação com moderação e só quando acrescenta sentido. A entrada das secções faz-se uma vez, sem atrasar a leitura *(interpretação)*. Fonte: [NN/g: Animation for Attention and Comprehension](https://www.nngroup.com/articles/animation-usability/)
- 3D com three.js entra onde ajuda a perceber o que se vê, decidido com [3D na web: quando e porquê](../3d-webgl/3d-na-web-quando-e-porque.md) e com a alternativa estática de [Acessibilidade e movimento](../3d-webgl/acessibilidade-e-movimento.md).
- Movimento reduzido: `@media (prefers-reduced-motion: reduce)` deteta que a pessoa pediu ao sistema menos movimento não essencial, e a interface remove, reduz ou substitui as animações com movimento (por exemplo, opacidade em vez de escala). Escalar ou deslocar objetos grandes pode provocar mal-estar a quem tem perturbações vestibulares. Fonte: [MDN: prefers-reduced-motion (2026-06-10)](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion)
- WCAG: o critério 2.3.3 (nível AAA) pede que o movimento desencadeado por uma interação se possa desligar, salvo se for essencial; mudanças de cor, desfoque e opacidade não contam como movimento. O critério 2.2.2 (nível A) pede que o que se mexe sozinho durante mais de cinco segundos, ao lado de outro conteúdo, se possa pausar, parar ou esconder. Fontes: [WCAG 2.2: Understanding 2.3.3 (atualizado a 2025-09-16)](https://www.w3.org/WAI/WCAG22/Understanding/animation-from-interactions.html), [WCAG 2.2: Understanding 2.2.2 (atualizado a 2026-10-04)](https://www.w3.org/WAI/WCAG22/Understanding/pause-stop-hide.html)
- Achatar também denuncia ferramenta *(interpretação)*: tirar de uma vez sombras, cantos, estados e movimento para fugir às marcas de IA deixa uma interface quadrada e parada, com os sinais fracos que o estudo da NN/g mediu. O que se corrige é o mesmo efeito repetido em tudo, e não a resposta da interface.
- A página de movimento do Material Design não foi lida: só mostra texto depois de correr JavaScript.

**Para uma skill:** cada ação é um `<button>` com aspeto de botão (principal cheio, secundário com contorno ou fantasma, cantos ligeiramente arredondados, nunca pílula), com estados ao passar, premir, focar e carregar e uma transição curta entre eles; o texto sublinhado só navega. O movimento responde à ação ou explica uma mudança e, com `prefers-reduced-motion: reduce`, a interface funciona sem ele. A prova é percorrer as ações com o rato e com o teclado, e repetir com o movimento reduzido ligado no sistema.

## Ver também

- [Feedback e desempenho percebido](feedback-e-desempenho-percebido.md) (Design e experiência de utilizador)
- [Consistência e padrões estabelecidos](consistencia-e-padroes-estabelecidos.md) (Design e experiência de utilizador)
- [Animação CSS e SVG](../3d-webgl/animacao-css-e-svg.md) (3D, WebGL e animação)

Fonte: W3C, MDN, GOV.UK Design System e Nielsen Norman Group, ligados em cada ponto; lidos a 2026-11-18. Não vem do PDF.

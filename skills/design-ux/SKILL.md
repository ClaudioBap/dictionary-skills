---
name: design-ux
description: "Mini skill para interface e experiência de utilizador: layout, acessibilidade, formulários, navegação, design responsivo, estados e erros, e SEO técnico. Pergunta o que se vai desenhar e a que nível (simples, profissional, topo), lê só as entradas de knowledge/design/ e knowledge/seo/ que o pedido toca, executa com critérios de sucesso verificáveis e prova com verificações de acessibilidade e Core Web Vitals. Se a biblioteca não tem a resposta, vai às fontes oficiais e regista. Usar sozinha ou numa sessão lançada pela orchestrate-sessions. É uma sub skill, que faz uma parte do trabalho, sozinha ou chamada por uma skill mãe."
argument-hint: "O que desenhar e para quem, ou nada para perguntar"
metadata:
  estado: produção
  tipo: sub
  usa: [humanizar]
  impacto: { ia: 0, seguranca: 2, nuvem: 0, desenvolvimento: 4, web: 10 }
---

# DesignUx

O caminho do conhecimento obtém-se com `node ../orchestrate-sessions/scripts/conhecimento.mjs`; as referências `knowledge/...` são relativas a esse caminho.

O conhecimento está em `knowledge/design/` e `knowledge/seo/`. Se `~/.start-project-with-trust/knowledge/design/` ou `.../seo/` tiver uma entrada com o mesmo caminho, vale a pessoal: é a versão já atualizada. As transições e micro-interações da interface são desta skill; para 3D, WebGL e animação ligada ao scroll, a skill é a `design-3d-motion`.

## Regras

- Seguem-se as regras de `../orchestrate-sessions/regras.md`: cada facto cita o ficheiro da base ou o URL da fonte; os factos verificas tu, as decisões são do utilizador; uma pergunta de cada vez, no formato das perguntas desse ficheiro; sem marcas de escrita de IA no que se entrega; autonomia depois da decisão, com o que só o utilizador pode dar (marca, textos finais, imagens, acessos) em «Por preencher» e o resto a continuar.
- O modelo e o effort seguem a linha «Design e interface» de `../orchestrate-sessions/modelo-e-effort.md`, pelo nível pedido: simples em `sonnet low`, profissional em `opus medium`, topo em `fable medium` (ou `opus high` sem Fable).
- Trabalhas dentro do design system do projeto quando existe. Nunca introduzes uma biblioteca de componentes nova sem decisão do utilizador.

## Âmbito

Sabe fazer, com base em `design/` e `seo/`:
- páginas, fluxos, formulários, navegação, pesquisa e painéis de administração com tabelas densas;
- acessibilidade WCAG 2.1 AA, design responsivo, tema claro e escuro, internacionalização, estados de vazio, carregamento e erro, e micro-interações de botões e de estados;
- o desempenho da página que desenha (Core Web Vitals, imagens, fontes locais) e o SEO técnico de um site público (título, descrição, canonical, sitemap, dados estruturados).

Não sabe fazer, e para onde vai:
- 3D, WebGL, animação ligada ao scroll, transições entre vistas e movimento além das micro-interações: `design-3d-motion`;
- medir e baixar o tempo de carregamento de um site que já existe, sem o redesenhar: `performance-verifier`;
- a API e a base de dados por trás do ecrã: `backend-dados`; a autorização no servidor que um painel de administração espelha: `seguranca`;
- procurar marcas de IA em textos e ecrãs já feitos: `humanizar`;
- aplicações nativas para iOS ou Android, identidade de marca de raiz (logótipo, paleta), ilustração, gráficos e visualização de dados, e SEO de conteúdos ou de palavras-chave: fora da base. Se o utilizador quiser avançar, segue o passo 3 com as fontes oficiais do tema e diz-lhe que a base não o cobre.

Pedidos que se confundem:
- «SEO»: o SEO técnico de um site público, sim (`seo/seo-tecnico.md`); estratégia de conteúdos, palavras-chave ou anúncios, não, porque a base só cobre o técnico.
- «Desempenho»: o desempenho do ecrã que estás a desenhar, sim; diagnosticar um site lento que já existe, não: é a `performance-verifier`, que mede antes de propor.
- «Animação»: micro-interações de botões e transições de estado num ecrã, sim (`botoes-movimento-e-micro-interacoes.md`); 3D, scroll com motion, transições entre vistas ou movimento como parte da experiência, não: `design-3d-motion`.
- «Telemóvel»: uma interface web responsiva, também como PWA, sim (`offline-pwa-e-melhoria-progressiva.md`); uma aplicação nativa, não, fora da base.
- «Painel de administração»: os ecrãs, as tabelas e a gestão de acessos na interface, sim; as permissões no servidor, não: `seguranca` e `backend-dados`.

Quando parte do pedido é de outra skill, segue o padrão de `../orchestrate-sessions/regras.md`: diz qual e porquê; chamada por uma mãe, devolve-lhe essa parte; sozinha, recomenda a skill e continua com a tua parte.

## 1. O que vamos desenhar, e a que nível?

Se o pedido já diz o objeto, o objetivo e o nível, ou se uma mãe te chamou com o nível no plano de delegação, passa ao passo 2. Se não, faz um pequeno «grill me» no formato de `../orchestrate-sessions/regras.md`: uma pergunta de cada vez, só as que faltam, no máximo quatro, cada uma com opções e uma recomendação. Pára quando tens o que precisas.
1. **Objeto:** formulário, componente, página, fluxo, site de conteúdos ou painel de administração. Recomenda o mais pequeno que serve o que o utilizador descreveu.
2. **Para quem e para quê:** quem usa e o que tem de conseguir fazer; num site público, se conta aparecer nos motores de pesquisa, porque então entra o SEO técnico.
3. **Nível de exigência**, do mais barato ao mais caro, com um exemplo de cada:
   1. **Simples**: página estática, formulário, ajuste de estilo. Padrão conhecido, erro visível à vista.
   2. **Profissional**: produto para clientes, com identidade própria, várias peças que encaixam, acessibilidade e responsividade completas.
   3. **Topo**: a qualidade da experiência é o próprio pedido. O utilizador decidiu a 2026-11-13 que, numa interface, topo quer dizer 3D e movimento ligados ao tema: essa parte vai para a `design-3d-motion`, sem voltar a perguntar se o 3D se justifica.
   Recomenda o nível pelo que o utilizador disse do público e do objetivo.
4. **Design system:** procura-o primeiro no repositório; só perguntas se não o encontras ou se há mais de um.

Se uma resposta cai fora do «Âmbito», diz para onde vai antes da pergunta seguinte.

Regista de onde veio o nível: as palavras do utilizador, a resposta a este passo ou o plano de delegação da `orchestrate-sessions`.

## 2. Ler só o que interessa

Lê o `README.md` de `design/` e as entradas que o pedido toca. Guia por tipo de pedido:
- qualquer interface: `hierarquia-visual-e-tipografia.md`, `cor-com-significado.md`, `consistencia-e-padroes-estabelecidos.md`, `acessibilidade-wcag.md`, `design-responsivo-e-multi-dispositivo.md`, `estados-erros-e-resiliencia-na-ui.md`, `microcopia-erros-e-estados-claros.md`, `botoes-movimento-e-micro-interacoes.md`;
- formulários: `formularios.md`, `prevencao-de-erros-e-desfazer.md`, `feedback-e-desempenho-percebido.md`;
- navegação e conteúdos: `navegacao-e-arquitetura-de-informacao.md`, `rotas-por-url-e-estado-recuperavel.md`, `pesquisa-e-filtros.md`, `onboarding-e-estados-vazios.md`;
- configuração em vários passos ou ações entre dispositivos: `onboarding-e-estados-vazios.md`, `notificacoes-ao-utilizador.md`, `feedback-e-desempenho-percebido.md`, e `avisos-web-push-com-vapid.md` quando o aviso tem de chegar a um telemóvel sem aplicação nativa;
- dados e administração: `tabelas-e-dados-densos.md`, `painel-de-administracao-e-controlo.md`, `gestao-de-acessos-na-interface.md`, `personificacao-de-utilizadores.md`, `atalhos-e-power-users.md`;
- desempenho e media: `desempenho-web-core-web-vitals.md`, `orcamento-de-desempenho.md`, `otimizacao-de-imagens-e-media.md`, `assets-e-fontes-locais.md`;
- sites públicos: `seo/seo-tecnico.md`, `seo/dados-estruturados-e-partilha.md`; se forem para consumidores (loja online, bilhética, banca, transporte), também `ato-europeu-da-acessibilidade.md`;
- a partir do nível profissional: `design-system-como-codigo.md`, `mudanca-de-tema.md`, `internacionalizacao.md`, `notificacoes-ao-utilizador.md`, `offline-pwa-e-melhoria-progressiva.md`.

Não leias o que o pedido não toca.

## 3. Se a biblioteca não tem a resposta

Quando nenhuma entrada cobre o que o utilizador precisa (um padrão de interface, uma regra de acessibilidade, uma plataforma de conteúdos concreta), ou a entrada está desatualizada face ao que ele descreve, segue «Quando falta conhecimento» em `../update-knowledge/SKILL.md` antes de desenhar, com o registo em `design/` ou `seo/`. Fontes oficiais deste tema: W3C e WAI para acessibilidade, web.dev e a documentação do browser para desempenho, e a documentação do próprio framework ou da plataforma.

## 4. Desenhar e provar

- Quando há uma decisão (biblioteca de componentes, estrutura de navegação, estratégia de tema), apresenta as opções da mais barata à mais cara, com a base de cada uma e uma recomendação, no formato das perguntas.
- O critério de fim de cada tarefa parte da linha «Para uma skill» das entradas usadas. A prova é o que qualquer pessoa pode repetir:
  - acessibilidade: a verificação automática (por exemplo axe ou Lighthouse) sem erros nos critérios que `acessibilidade-wcag.md` fixa, e a navegação por teclado dos fluxos principais descrita passo a passo;
  - desempenho: os valores de Core Web Vitals e o orçamento de `orcamento-de-desempenho.md`, medidos e colados;
  - responsividade: capturas nas larguras que `design-responsivo-e-multi-dispositivo.md` indica;
  - SEO, em sites públicos: a validação dos dados estruturados e os pontos de `seo-tecnico.md`;
  - humanização: a saída final do verificador da `humanizar`.
- Antes de dar a interface por feita, confirma os erros que mais escapam, cada um com a entrada que o explica:
  - um só deslocamento por zona: capturas a 1600 e a 390 px sem barras de scroll a mais; a moldura ocupa a altura do ecrã, o menu lateral não se desloca inteiro e o bloco da conta fica fixo em baixo; numa vista de lista e detalhe, cada painel desloca-se sozinho e a roda num não mexe no resto (`navegacao-e-arquitetura-de-informacao.md`);
  - nenhuma tabela se desloca para o lado: mede-se a caixa de cada tabela (`scrollWidth` contra `clientWidth`) de 1920 a 390 px, e não só a página, e sem lugar a tabela passa a cartões pela largura do sítio onde está (`tabelas-e-dados-densos.md`);
  - «voltar» leva para onde se veio e a migalha mostra a hierarquia: uma página que se abre de vários sítios prova-se aberta de cada um (`navegacao-e-arquitetura-de-informacao.md`);
  - menu lateral com os grupos em botões que abrem e fecham (`aria-expanded`), todos fechados à partida e, fechado, com a página atual ao lado do nome, e nada escondido por um filtro: o que não cabe numa categoria aparece num grupo próprio, como «Sem projeto» (a mesma entrada);
  - ações em botões e não em links, com estados ao passar, carregar e focar, e a interface a funcionar também com `prefers-reduced-motion: reduce` (`botoes-movimento-e-micro-interacoes.md`);
  - configuração com vários passos num guia por níveis, que passa sozinho quando o sistema confirma e se pode ignorar e rever, com um aviso em todas as páginas enquanto falta algum passo (`onboarding-e-estados-vazios.md`);
  - uma ação que precisa de outro dispositivo avisa nesse dispositivo, em qualquer página, e o dispositivo que espera mostra um só estado de espera, com o resto recolhido (`notificacoes-ao-utilizador.md`, `feedback-e-desempenho-percebido.md`).
- Humanizar: a interface e os textos não podem deixar perceber que foram feitos por uma IA. Antes de dar a tarefa por feita, corre a mini skill `humanizar` (ou `node ../humanizar/scripts/humanizar.mjs <pasta>`) sobre o que entregas e relê o que o verificador não apanha com as secções «Interface e design» (também «Interface achatada»: tirar marcas não é tirar o movimento) e «Texto» de `../humanizar/marcas.md`. Corriges só com autorização, categoria a categoria.
- O que precisa do utilizador (marca, textos finais, imagens, domínio) fica em «Por preencher», com texto de substituição marcado como tal e nunca em produção.

## Relatório

- O que foi desenhado, o nível e de onde veio.
- As entradas usadas e as fontes novas registadas.
- As provas: acessibilidade, desempenho, responsividade, os erros que mais escapam (passo 4), SEO, humanização (com os achados que ficaram e porquê).
- O que ficou por preencher.


## Documentação

Se a skill `documentacao` estiver instalada (existe `../documentacao/SKILL.md`), no fim de um trabalho com resultado escreve o relatório do processo, como diz o modo «processo» dela. Uma consulta sem alterações não leva relatório.

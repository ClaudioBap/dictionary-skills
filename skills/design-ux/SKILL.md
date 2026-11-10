---
name: design-ux
description: Mini skill para interface e experiência de utilizador: layout, acessibilidade, formulários, navegação, design responsivo, estados e erros, e SEO técnico. Pergunta o que se vai desenhar e a que nível (simples, profissional, topo), lê só as entradas de knowledge/design/ e knowledge/seo/ que o pedido toca, executa com critérios de sucesso verificáveis e prova com verificações de acessibilidade e Core Web Vitals. Se a biblioteca não tem a resposta, vai às fontes oficiais e regista. Usar sozinha ou numa sessão lançada pela orchestrate-sessions.
argument-hint: "O que desenhar e para quem, ou nada para perguntar"
---

# DesignUx

O conhecimento está em `../start-project-with-trust/knowledge/design/` e `../start-project-with-trust/knowledge/seo/` (relativos à pasta deste `SKILL.md`). Se `~/.start-project-with-trust/knowledge/design/` ou `.../seo/` tiver uma entrada com o mesmo caminho, vale a pessoal: é a versão já atualizada. Para 3D, WebGL e animação com movimento, a skill é a `design-3d-motion`.

## Regras

- Seguem-se as regras da secção «Regras em todas as fases» de `../start-project-with-trust/SKILL.md`: cada facto cita o ficheiro da base ou o URL da fonte; os factos verificas tu, as decisões são do utilizador; uma pergunta de cada vez, no formato da Fase 1 dessa skill; sem marcas de escrita de IA no que se entrega; autonomia depois da decisão, com o que só o utilizador pode dar (marca, textos finais, imagens, acessos) em «Por preencher» e o resto a continuar.
- O modelo e o effort seguem a linha «Design e interface» de `../orchestrate-sessions/modelo-e-effort.md`, pelo nível pedido: simples em `sonnet low`, profissional em `opus medium`, topo em `fable medium` (ou `opus high` sem Fable).
- Trabalhas dentro do design system do projeto quando existe. Nunca introduzes uma biblioteca de componentes nova sem decisão do utilizador.

## 1. O que vamos desenhar, e a que nível?

Se o pedido já o diz, passa ao passo 2. Se não, pergunta numa só pergunta: o que é (página, fluxo, componente, painel de administração, formulário, site de conteúdos), para quem, e o nível de exigência, com um exemplo de cada:
1. **Simples**: página estática, formulário, ajuste de estilo. Padrão conhecido, erro visível à vista.
2. **Profissional**: produto para clientes, com identidade própria, várias peças que encaixam, acessibilidade e responsividade completas.
3. **Topo**: a qualidade da experiência é o próprio pedido; se envolve 3D ou movimento, passa para a `design-3d-motion`.

Regista de onde veio o nível: as palavras do utilizador ou a resposta em `objetivo.md`.

## 2. Ler só o que interessa

Lê o `README.md` de `design/` e as entradas que o pedido toca. Guia por tipo de pedido:
- qualquer interface: `hierarquia-visual-e-tipografia.md`, `cor-com-significado.md`, `consistencia-e-padroes-estabelecidos.md`, `acessibilidade-wcag.md`, `design-responsivo-e-multi-dispositivo.md`, `estados-erros-e-resiliencia-na-ui.md`, `microcopia-erros-e-estados-claros.md`;
- formulários: `formularios.md`, `prevencao-de-erros-e-desfazer.md`, `feedback-e-desempenho-percebido.md`;
- navegação e conteúdos: `navegacao-e-arquitetura-de-informacao.md`, `rotas-por-url-e-estado-recuperavel.md`, `pesquisa-e-filtros.md`, `onboarding-e-estados-vazios.md`;
- dados e administração: `tabelas-e-dados-densos.md`, `painel-de-administracao-e-controlo.md`, `gestao-de-acessos-na-interface.md`, `personificacao-de-utilizadores.md`, `atalhos-e-power-users.md`;
- desempenho e media: `desempenho-web-core-web-vitals.md`, `orcamento-de-desempenho.md`, `otimizacao-de-imagens-e-media.md`, `assets-e-fontes-locais.md`;
- sites públicos: `seo/seo-tecnico.md`, `seo/dados-estruturados-e-partilha.md`;
- a partir do nível profissional: `design-system-como-codigo.md`, `mudanca-de-tema.md`, `internacionalizacao.md`, `notificacoes-ao-utilizador.md`, `offline-pwa-e-melhoria-progressiva.md`.

Não leias o que o pedido não toca.

## 3. Se a biblioteca não tem a resposta

Quando nenhuma entrada cobre o que o utilizador precisa (um padrão de interface, uma regra de acessibilidade, uma plataforma de conteúdos concreta), ou a entrada está desatualizada face ao que ele descreve:

1. Escolhe as fontes oficiais primárias (W3C e WAI para acessibilidade, web.dev e a documentação do browser para desempenho, a documentação do próprio framework ou da plataforma) e lê-as. Não contornes bloqueios: se uma fonte recusar o acesso automático, pede ao utilizador o conteúdo ou regista-a como não lida.
2. Dá a cada facto a confiança segundo os critérios de `../update-knowledge/SKILL.md` (`alta`, `media`, `baixa`). Um facto `baixa` não serve de base.
3. Regista antes de desenhar: numa cópia git do repositório, propõe a entrada nova em `design/` ou `seo/` no formato do passo 3 de `../update-knowledge/SKILL.md`, e só a escreves com aprovação; fora disso, no conhecimento pessoal (`~/.start-project-with-trust/knowledge/design/<slug>.md`, fonte em `FONTES.md` pessoal, linha no `CHANGELOG.md` pessoal). Se o que encontraste substitui o que uma entrada diz, segue a regra de edição da `update-knowledge`, com o texto anterior no «Histórico».
4. Diz ao utilizador que fontes leste e o que registaste.

## 4. Desenhar e provar

- Quando há uma decisão (biblioteca de componentes, estrutura de navegação, estratégia de tema), apresenta as opções da mais barata à mais cara, com a base de cada uma e uma recomendação, no formato da Fase 1.
- O critério de fim de cada tarefa parte da linha «Para uma skill» das entradas usadas. A prova é o que qualquer pessoa pode repetir:
  - acessibilidade: a verificação automática (por exemplo axe ou Lighthouse) sem erros nos critérios que `acessibilidade-wcag.md` fixa, e a navegação por teclado dos fluxos principais descrita passo a passo;
  - desempenho: os valores de Core Web Vitals e o orçamento de `orcamento-de-desempenho.md`, medidos e colados;
  - responsividade: capturas nas larguras que `design-responsivo-e-multi-dispositivo.md` indica;
  - SEO, em sites públicos: a validação dos dados estruturados e os pontos de `seo-tecnico.md`.
- O que precisa do utilizador (marca, textos finais, imagens, domínio) fica em «Por preencher», com texto de substituição marcado como tal e nunca em produção.

## Relatório

- O que foi desenhado, o nível e de onde veio.
- As entradas usadas e as fontes novas registadas.
- As provas: acessibilidade, desempenho, responsividade, SEO.
- O que ficou por preencher.

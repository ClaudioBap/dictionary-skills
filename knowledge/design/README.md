# Design e experiência de utilizador

Tag no Logseq: `#design`.

Fonte: págs. 13–19 (Dicionario-Boas-Praticas.pdf)

## Entradas

- [Design system como código](design-system-como-codigo.md) — Tokens no `:root`, componentes construídos sobre os tokens e um catálogo com todos os estados. *(pág. 13)*
- [Acessibilidade (WCAG 2.1 AA)](acessibilidade-wcag.md) — Alvo mínimo WCAG 2.1 AA: teclado, foco visível, leitor de ecrã, contraste e axe/pa11y no CI. *(pág. 13)*
- [Rotas por URL e estado recuperável](rotas-por-url-e-estado-recuperavel.md) — Cada vista importante tem o seu URL e o estado da interface sobrevive a um recarregamento. *(pág. 13)*
- [Assets e fontes locais (sem CDN)](assets-e-fontes-locais.md) — Fontes e assets servidos pela própria aplicação, sem Google Fonts nem CDN. *(pág. 13)*
- [Orçamento de desempenho](orcamento-de-desempenho.md) — Um orçamento por página verificado no CI, com compressão, caching e o pesado carregado tarde. *(pág. 14)*
- [Microcópia, erros e estados claros](microcopia-erros-e-estados-claros.md) — A interface diz o que falta na própria linha, mostra erros com referência curta e desenha os estados de vazio, carregamento e erro. *(pág. 14)*
- [Desempenho web (Core Web Vitals)](desempenho-web-core-web-vitals.md) — Cumprir LCP, INP e CLS, com caching, menos JavaScript e medição com dados reais. *(pág. 14)*
- [Otimização de imagens e media](otimizacao-de-imagens-e-media.md) — Formatos modernos, tamanhos responsivos, dimensões fixas e lazy loading do que está abaixo da dobra. *(pág. 14)*
- [Internacionalização (i18n/l10n)](internacionalizacao.md) — Separar o texto do código desde o início e formatar datas, números e moeda pela localidade. *(págs. 14, 15)*
- [Offline, PWA e melhoria progressiva](offline-pwa-e-melhoria-progressiva.md) — A página base funciona sem JavaScript pesado e, quando faz sentido, como PWA com rede fraca ou offline. *(pág. 15)*
- [Estados, erros e resiliência na UI](estados-erros-e-resiliencia-na-ui.md) — Desenhar vazio, carregamento, erro e sucesso, com mensagens acionáveis e sem perder o que o utilizador escreveu. *(pág. 15)*
- [Mudança de tema (claro/escuro)](mudanca-de-tema.md) — Temas por tokens que seguem o sistema, deixam alternar e guardam a escolha, com contraste AA nos dois. *(pág. 15)*
- [Personificação de utilizadores (impersonation)](personificacao-de-utilizadores.md) — Deixar um administrador «entrar como» um utilizador, com auditoria, tarja visível, âmbito limitado e ações sensíveis bloqueadas. *(págs. 15, 16)*
- [Painel de administração e controlo](painel-de-administracao-e-controlo.md) — Um painel que mostra o estado e deixa agir, com cada vista protegida no servidor e ações perigosas confirmadas e registadas. *(pág. 16)*
- [Gestão de acessos na interface](gestao-de-acessos-na-interface.md) — Uma interface para gerir utilizadores, papéis e âmbito, com registo, que espelha a autorização do servidor. *(pág. 16)*
- [Design responsivo e multi-dispositivo](design-responsivo-e-multi-dispositivo.md) — Desenhar do telemóvel para cima, com layout fluido, alvos de toque grandes e sem scroll horizontal. *(pág. 16)*
- [Formulários (design e UX)](formularios.md) — Pedir o mínimo, rótulos sempre visíveis, validar na linha e preservar o que já foi escrito. *(págs. 16, 17)*
- [Navegação e arquitetura de informação](navegacao-e-arquitetura-de-informacao.md) — Estrutura previsível, agrupada por tarefa, onde o utilizador sabe sempre onde está e como voltar: a migalha mostra a hierarquia e «voltar» leva para onde se veio; um só deslocamento por zona, com lista e detalhe a deslocar-se cada um sozinho, grupos do menu que abrem e fecham, e nada escondido por um filtro. *(pág. 17)*
- [Feedback e desempenho percebido](feedback-e-desempenho-percebido.md) — Toda a ação dá resposta imediata e o que demora mostra progresso. *(pág. 17)*
- [Tabelas e dados densos](tabelas-e-dados-densos.md) — Tabelas com ordenação, filtro, pesquisa e paginação, que nunca se deslocam para o lado. Mudam pela largura do sítio onde estão: primeiro os botões empilham-se, depois cada linha passa a cartão. *(pág. 17)*
- [Hierarquia visual e tipografia](hierarquia-visual-e-tipografia.md) — Uma escala tipográfica e de espaçamento consistentes, que guiam a atenção, com leitura confortável. *(págs. 17, 18)*
- [Cor com significado](cor-com-significado.md) — Cores semânticas consistentes e nunca só a cor para dar informação. *(pág. 18)*
- [Onboarding e estados vazios](onboarding-e-estados-vazios.md) — O primeiro uso e as listas vazias explicam o que é e oferecem o próximo passo; uma configuração com vários passos é um guia por níveis que passa sozinho quando o sistema confirma e se pode ignorar e rever. *(pág. 18)*
- [Notificações ao utilizador](notificacoes-ao-utilizador.md) — Distinguir o urgente do informativo e deixar o utilizador controlar o que chega e por que canal; uma ação que precisa de outro dispositivo avisa nesse dispositivo, em qualquer página. *(pág. 18)*
- [Pesquisa e filtros](pesquisa-e-filtros.md) — Pesquisa visível e tolerante que trata o «sem resultados», com filtros combináveis sempre à vista. *(págs. 18, 19)*
- [Consistência e padrões estabelecidos](consistencia-e-padroes-estabelecidos.md) — Reutilizar padrões conhecidos; a mesma ação comporta-se igual em todo o lado. *(pág. 19)*
- [Prevenção de erros e desfazer](prevencao-de-erros-e-desfazer.md) — Prevenir em vez de corrigir, oferecer desfazer e dizer como resolver. *(pág. 19)*
- [Atalhos e power users](atalhos-e-power-users.md) — Atalhos de teclado e paleta de comandos para quem usa muito, sem prejudicar os ocasionais. *(pág. 19)*
- [Avisos Web Push com VAPID, sem corpo](avisos-web-push-com-vapid.md) — Para avisar um telemóvel sem aplicação nativa, a aplicação web subscreve o Web Push com a chave pública VAPID e o servidor envia um POST sem corpo, assinado com um JWT ES256; o service worker mostra um texto fixo e o conteúdo só se lê na aplicação. No iPhone exige o iOS 16.4 e a aplicação no ecrã principal. *(fora do PDF)*
- [Botões, movimento e micro-interações](botoes-movimento-e-micro-interacoes.md) — As ações são botões que se reconhecem como botões, com estados ao passar, premir, focar e carregar; o movimento responde à ação ou explica uma mudança, e com `prefers-reduced-motion` a interface funciona sem ele. Tirar as marcas de IA não é achatar: uma interface toda reta e parada também denuncia ferramenta. *(fora do PDF)*
- [Ato Europeu da Acessibilidade (produtos e serviços)](ato-europeu-da-acessibilidade.md) — Desde 28 de junho de 2025, as lojas online, a bilhética, a banca e outros produtos e serviços ao consumidor colocados no mercado da UE têm de ser acessíveis; em Portugal, pelo Decreto-Lei n.º 82/2022. Ficam de fora as microempresas de serviços e há exceções limitadas. *(fora do PDF)*

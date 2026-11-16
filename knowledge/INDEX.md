# Índice do conhecimento

Mapa de todos os ficheiros de `knowledge/`, extraídos do PDF **Dicionário de Boas Práticas e Possibilidades** (`Dicionario-Boas-Praticas.pdf`, 69 págs.).

## Sobre a fonte

- Referência genérica para construir e rever sites e sistemas: segurança, design, fiabilidade, soberania, código, entrega e infraestrutura. *(pág. 1)*
- Cada entrada termina com uma linha **Para uma skill:** — o critério verificável que uma skill futura pode usar para confirmar o que está conforme e o que falta. *(pág. 1)*
- Compilado a 2026-11-03 · Cláudio Baptista, BSO Consulting. *(pág. 1)*

## Convenções desta pasta

> Esta secção descreve a organização dos ficheiros. Não é conteúdo do PDF.

- Uma pasta por secção do PDF, pela ordem do índice da pág. 2, e um `.md` por entrada (cada `▸` do PDF).
- Cada pasta tem um `README.md` com a tag Logseq, a introdução da secção (quando existe) e a lista das entradas.
- Cada ficheiro tem: metadados (`id`, `paginas`, `verificado_em`), título, resumo, conteúdo, «Para uma skill», «Ver também» (quando existe) e «Fonte: pág. X».
- O **resumo** condensa o texto da própria entrada, sem informação nova. O **conteúdo** segue o PDF; só se corrigiram quebras de linha e hifenização da extração.
- «Ver também» liga entradas que o PDF repete ou relaciona noutras secções. A escolha das ligações é editorial.
- A entrada «Decisões registadas (ADR)» aparece nas págs. 42 e 59; está num só ficheiro (`estrutura/`) e a secção Governação aponta para ele.
- **⚠️ Fora do PDF:** as secções `javascript/`, `node/`, `publicacao/`, `acesso-remoto/` e `plataformas/` não vêm do PDF. Cada ponto liga à fonte oficial que o apoia (MDN, Node.js, npm, OWASP, etc., consulta a 2026-11-03); os pontos marcados «sem fonte oficial» são convenções escritas pelo assistente. Têm `paginas: []` e a origem no campo `fonte`.
- **Fontes oficiais:** as entradas que vêm do PDF têm, quando foi possível, uma secção «Fontes oficiais» com ligações externas que as apoiam (consulta a 2026-11-04). Quando uma fonte oficial diz algo diferente ou mais atual, fica uma «Nota (fonte oficial)» e o texto do PDF mantém-se. A lista dos sites por tema, que o agente de atualização percorre, está em [FONTES.md](FONTES.md).
- Totais: 26 secções; 238 entradas do PDF em 237 ficheiros; 130 entradas fora do PDF; 367 ficheiros de entrada no total.

## Secções

### 1. [Segurança](seguranca/README.md) — págs. 3–9 (29 entradas)

- [Autorização no servidor, negar por omissão](seguranca/autorizacao-no-servidor.md) — A decisão de quem pode o quê vive no servidor, cada endpoint declara o que exige e, sem declaração, recusa. *(pág. 3)*
- [Defesa contra XSS: escapar e CSP](seguranca/defesa-contra-xss.md) — Escapar por omissão todo o texto do utilizador e ter uma CSP sem `unsafe-inline` como segunda rede. *(pág. 3)*
- [CSRF: verificar a origem, não só o cookie](seguranca/csrf-verificar-a-origem.md) — Como o browser envia o cookie sozinho, os métodos que mudam dados verificam a origem e nunca são `GET`. *(pág. 3)*
- [Menor privilégio na base de dados](seguranca/menor-privilegio-na-base-de-dados.md) — A identidade da aplicação na base de dados tem só o que precisa, separada por função, com regras críticas impostas também na base. *(pág. 4)*
- [Auditoria append-only e à prova de adulteração](seguranca/auditoria-append-only.md) — Registar quem, quando e o quê em cada operação que muda dados, num trilho que a aplicação só pode acrescentar e ler. *(pág. 4)*
- [Integridade dos dados e migrações aditivas](seguranca/integridade-e-migracoes-aditivas.md) — Nunca perder o rasto de um dado: ledger, chaves referenciadas estáveis, correções por versão e migrações só aditivas por release. *(pág. 4)*
- [Queries parametrizadas (sem injeção de SQL)](seguranca/queries-parametrizadas.md) — Todo o acesso à base de dados usa parâmetros; texto do utilizador nunca entra no comando por concatenação. *(pág. 4)*
- [Segredos num cofre, fora do código e do disco](seguranca/segredos-num-cofre.md) — Segredos guardados num cofre, nunca no código nem em configuração versionada, com deteção de segredos no CI. *(pág. 5)*
- [Ambientes seguros por omissão](seguranca/ambientes-seguros-por-omissao.md) — Sem configuração, ou com configuração errada, a aplicação cai no modo mais restrito: falha fechado. *(pág. 5)*
- [Autenticação forte, sem passwords fracas](seguranca/autenticacao-forte.md) — Preferir SSO/OIDC com MFA; se houver password, hash forte, comparação em tempo constante e rate limit. *(pág. 5)*
- [Sessões robustas](seguranca/sessoes-robustas.md) — Identidade no servidor, cookie só com identificador assinado, sessões persistentes fora do processo, revogáveis e com timeout. *(págs. 5, 6)*
- [Rate limit e WAF](seguranca/rate-limit-e-waf.md) — Uma WAF à frente, rate limit nos caminhos sensíveis e a configuração da borda versionada. *(pág. 6)*
- [Dados de teste sintéticos e minimização](seguranca/dados-de-teste-sinteticos-e-minimizacao.md) — Nunca copiar dados pessoais reais para dev; gerar dados sintéticos e recolher o mínimo, com retenção. *(pág. 6)*
- [Contentores endurecidos](seguranca/contentores-endurecidos.md) — Imagens fixadas por digest, non-root, só-leitura e com o mínimo de capacidades; só o proxy exposto. *(pág. 6)*
- [CI como portão do deploy](seguranca/ci-como-portao-do-deploy.md) — O deploy só corre com CI verde, ações fixadas, produção só do branch protegido e caminho de rollback. *(pág. 6)*
- [Cadeia de fornecimento verificada](seguranca/cadeia-de-fornecimento-verificada.md) — Dependências atualizadas e auditadas, análise estática, scan de imagens, SBOM e imagens assinadas por release. *(pág. 7)*
- [TLS e cabeçalhos versionados](seguranca/tls-e-cabecalhos-versionados.md) — TLS e cabeçalhos de segurança definidos em configuração versionada, coerentes num só sítio. *(pág. 7)*
- [Endpoints de saúde discretos](seguranca/endpoints-de-saude-discretos.md) — O `/health` público diz só «vivo»; o diagnóstico detalhado fica autenticado ou na rede interna. *(pág. 7)*
- [Observabilidade e alertas](seguranca/observabilidade-e-alertas.md) — Logs estruturados e centralizados, alertas em eventos de segurança e erros sem detalhe técnico no ecrã. *(pág. 7)*
- [Validação de entradas](seguranca/validacao-de-entradas.md) — Validar toda a entrada na fronteira do servidor por allowlist e escapar na saída conforme o destino. *(pág. 8)*
- [Segurança de API](seguranca/seguranca-de-api.md) — Autorização por objeto (BOLA), só campos esperados, sem SSRF e CORS com origens explícitas. *(pág. 8)*
- [Criptografia e proteção de dados](seguranca/criptografia-e-protecao-de-dados.md) — Dados cifrados em trânsito e em repouso, chaves num cofre com rotação e criptografia só de bibliotecas. *(pág. 8)*
- [Testes de segurança ativos](seguranca/testes-de-seguranca-ativos.md) — Threat modeling antes de construir, DAST sobre a aplicação a correr e pentest ou bug bounty periódico. *(págs. 8, 9)*
- [OWASP como referencial](seguranca/owasp-como-referencial.md) — Usar o OWASP Top 10 como checklist, o ASVS como nível-alvo e as Cheat Sheets como receitas. *(pág. 9)*
- [Deteção e resposta a incidentes](seguranca/detecao-e-resposta-a-incidentes.md) — Saber detetar, ter um plano escrito de resposta, ensaiá-lo e fazer pós-incidente sem culpa. *(pág. 9)*
- [Exportar CSV sem injeção de fórmulas](seguranca/exportacao-csv-sem-formulas.md) — Um CSV que leva texto de utilizadores pode executar fórmulas quando abre numa folha de cálculo; neutraliza-se cada célula que começa por `=`, `+`, `-`, `@`, tabulação ou retorno de linha, e a exportação de registos de auditoria guarda quem, quando e o quê sem alterar o que se exporta. *(fora do PDF)*
- [MFA imposto pelo fornecedor de identidade, não pela aplicação](seguranca/mfa-imposto-pelo-fornecedor-de-identidade.md) — Quando o login é por OIDC com o Microsoft Entra, o segundo fator é exigido pelas políticas do tenant (Conditional Access ou security defaults) e a aplicação não implementa MFA próprio; o que se faz é confirmar no teste do login real que a política se aplica e preparar a aplicação para os desafios que o fornecedor pode devolver. *(fora do PDF)*
- [Login por OIDC: código com PKCE, state, nonce e validação do id_token](seguranca/oidc-codigo-com-pkce-state-e-nonce.md) — Num login por OIDC com servidor, usa-se o fluxo de código com PKCE (S256), um `state` ligado ao navegador que começou o pedido, um `nonce` no id_token, o URI de retorno exato, e valida-se o id_token (assinatura, emissor, audiência, validade e nonce) antes de abrir sessão, identificando a pessoa por `oid` ou `sub`. *(fora do PDF)*
- [Sessões: tempos, rotação do identificador, resumo guardado e cookies](seguranca/sessoes-tempos-rotacao-e-cookies.md) — Os números que a OWASP dá para uma sessão: identificador com pelo menos 64 bits de entropia, renovado a cada mudança de privilégio, timeout por inatividade mais curto nas áreas de maior valor e um limite absoluto, invalidação no servidor, só um resumo do identificador guardado e cookie `__Host-` com `SameSite`. *(fora do PDF)*

### 2. [Privacidade e conformidade](privacidade/README.md) — pág. 10 (4 entradas)

- [RGPD operacional](privacidade/rgpd-operacional.md) — Cada tratamento tem base legal e registo, há processo para os direitos do titular e privacidade desde a conceção. *(pág. 10)*
- [Cookies e consentimento](privacidade/cookies-e-consentimento.md) — Só cookies essenciais sem consentimento; recusar é tão fácil como aceitar e nada carrega antes do «sim». *(pág. 10)*
- [Analytics com privacidade](privacidade/analytics-com-privacidade.md) — Medir o uso sem cookies nem perfis, com agregados e sem enviar dados pessoais a terceiros. *(pág. 10)*
- [Minimização e retenção](privacidade/minimizacao-e-retencao.md) — Recolher o mínimo, com justificação por campo, prazo de retenção e apagamento automático. *(pág. 10)*

### 3. [Fiabilidade e resiliência](fiabilidade/README.md) — págs. 11–12 (10 entradas)

- [SLO, SLI e orçamento de erro](fiabilidade/slo-sli-e-orcamento-de-erro.md) — Definir o que se mede (SLI), a meta (SLO) e usar o orçamento de erro para decidir entre lançar e estabilizar. *(pág. 11)*
- [Degradação graciosa](fiabilidade/degradacao-graciosa.md) — Timeouts, retries com recuo, circuit breaker e fallback: melhor servir menos do que cair por inteiro. *(pág. 11)*
- [Testes de carga e resiliência](fiabilidade/testes-de-carga-e-resiliencia.md) — Testar carga e resiliência (chaos) para saber onde o sistema parte e se recupera. *(pág. 11)*
- [Recuperação de desastre](fiabilidade/recuperacao-de-desastre.md) — Definir RTO e RPO, ensaiar o restauro completo e ter plano para perder máquina, região e fornecedor. *(pág. 11)*
- [Idempotência e processamento fiável](fiabilidade/idempotencia-e-processamento-fiavel.md) — Operações repetíveis são idempotentes, com chaves de idempotência e filas com dead-letter. *(pág. 12)*
- [Cópias de segurança 3-2-1](fiabilidade/copias-de-seguranca-3-2-1.md) — Três cópias, em dois tipos de suporte, uma fora do local; e uma cópia só conta depois de se provar que se consegue repor. *(fora do PDF)*
- [Incidentes e postmortem sem culpa](fiabilidade/incidentes-e-postmortem-sem-culpa.md) — Um incidente segue um processo escrito, com papéis e passos definidos, e termina num postmortem que procura as causas e não culpados. *(fora do PDF)*
- [Monitorização: os quatro sinais dourados](fiabilidade/monitorizacao-quatro-sinais.md) — Quatro medidas chegam para saber se um serviço está bem (latência, tráfego, erros e saturação), e recolhem-se com um padrão aberto em vez da ferramenta de um só fornecedor. *(fora do PDF)*
- [Operação padronizada e runbooks](fiabilidade/operacao-padronizada-e-runbooks.md) — As operações de rotina, pontuais e de emergência seguem procedimentos escritos e iguais para todos, apoiados em infraestrutura como código, monitorização e entregas seguras. *(fora do PDF)*
- [Prontidão operacional e passagem](fiabilidade/prontidao-operacional-e-passagem.md) — Uma plataforma só se entrega a quem a vai operar quando existem, com prova, monitorização, runbooks, cópias testadas, processo de incidentes, registo de alterações e sondas de saúde. *(fora do PDF)*

### 4. [Design e experiência de utilizador](design/README.md) — págs. 13–19 (29 entradas)

- [Design system como código](design/design-system-como-codigo.md) — Tokens no `:root`, componentes construídos sobre os tokens e um catálogo com todos os estados. *(pág. 13)*
- [Acessibilidade (WCAG 2.1 AA)](design/acessibilidade-wcag.md) — Alvo mínimo WCAG 2.1 AA: teclado, foco visível, leitor de ecrã, contraste e axe/pa11y no CI. *(pág. 13)*
- [Rotas por URL e estado recuperável](design/rotas-por-url-e-estado-recuperavel.md) — Cada vista importante tem o seu URL e o estado da interface sobrevive a um recarregamento. *(pág. 13)*
- [Assets e fontes locais (sem CDN)](design/assets-e-fontes-locais.md) — Fontes e assets servidos pela própria aplicação, sem Google Fonts nem CDN. *(pág. 13)*
- [Orçamento de desempenho](design/orcamento-de-desempenho.md) — Um orçamento por página verificado no CI, com compressão, caching e o pesado carregado tarde. *(pág. 14)*
- [Microcópia, erros e estados claros](design/microcopia-erros-e-estados-claros.md) — A interface diz o que falta na própria linha, mostra erros com referência curta e desenha os estados de vazio, carregamento e erro. *(pág. 14)*
- [Desempenho web (Core Web Vitals)](design/desempenho-web-core-web-vitals.md) — Cumprir LCP, INP e CLS, com caching, menos JavaScript e medição com dados reais. *(pág. 14)*
- [Otimização de imagens e media](design/otimizacao-de-imagens-e-media.md) — Formatos modernos, tamanhos responsivos, dimensões fixas e lazy loading do que está abaixo da dobra. *(pág. 14)*
- [Internacionalização (i18n/l10n)](design/internacionalizacao.md) — Separar o texto do código desde o início e formatar datas, números e moeda pela localidade. *(págs. 14, 15)*
- [Offline, PWA e melhoria progressiva](design/offline-pwa-e-melhoria-progressiva.md) — A página base funciona sem JavaScript pesado e, quando faz sentido, como PWA com rede fraca ou offline. *(pág. 15)*
- [Estados, erros e resiliência na UI](design/estados-erros-e-resiliencia-na-ui.md) — Desenhar vazio, carregamento, erro e sucesso, com mensagens acionáveis e sem perder o que o utilizador escreveu. *(pág. 15)*
- [Mudança de tema (claro/escuro)](design/mudanca-de-tema.md) — Temas por tokens que seguem o sistema, deixam alternar e guardam a escolha, com contraste AA nos dois. *(pág. 15)*
- [Personificação de utilizadores (impersonation)](design/personificacao-de-utilizadores.md) — Deixar um administrador «entrar como» um utilizador, com auditoria, tarja visível, âmbito limitado e ações sensíveis bloqueadas. *(págs. 15, 16)*
- [Painel de administração e controlo](design/painel-de-administracao-e-controlo.md) — Um painel que mostra o estado e deixa agir, com cada vista protegida no servidor e ações perigosas confirmadas e registadas. *(pág. 16)*
- [Gestão de acessos na interface](design/gestao-de-acessos-na-interface.md) — Uma interface para gerir utilizadores, papéis e âmbito, com registo, que espelha a autorização do servidor. *(pág. 16)*
- [Design responsivo e multi-dispositivo](design/design-responsivo-e-multi-dispositivo.md) — Desenhar do telemóvel para cima, com layout fluido, alvos de toque grandes e sem scroll horizontal. *(pág. 16)*
- [Formulários (design e UX)](design/formularios.md) — Pedir o mínimo, rótulos sempre visíveis, validar na linha e preservar o que já foi escrito. *(págs. 16, 17)*
- [Navegação e arquitetura de informação](design/navegacao-e-arquitetura-de-informacao.md) — Estrutura previsível, agrupada por tarefa, onde o utilizador sabe sempre onde está e como voltar. *(pág. 17)*
- [Feedback e desempenho percebido](design/feedback-e-desempenho-percebido.md) — Toda a ação dá resposta imediata e o que demora mostra progresso. *(pág. 17)*
- [Tabelas e dados densos](design/tabelas-e-dados-densos.md) — Tabelas com ordenação, filtro, pesquisa e paginação, repensadas para ecrã pequeno. *(pág. 17)*
- [Hierarquia visual e tipografia](design/hierarquia-visual-e-tipografia.md) — Uma escala tipográfica e de espaçamento consistentes, que guiam a atenção, com leitura confortável. *(págs. 17, 18)*
- [Cor com significado](design/cor-com-significado.md) — Cores semânticas consistentes e nunca só a cor para dar informação. *(pág. 18)*
- [Onboarding e estados vazios](design/onboarding-e-estados-vazios.md) — O primeiro uso e as listas vazias explicam o que é e oferecem o próximo passo. *(pág. 18)*
- [Notificações ao utilizador](design/notificacoes-ao-utilizador.md) — Distinguir o urgente do informativo e deixar o utilizador controlar o que chega e por que canal. *(pág. 18)*
- [Pesquisa e filtros](design/pesquisa-e-filtros.md) — Pesquisa visível e tolerante que trata o «sem resultados», com filtros combináveis sempre à vista. *(págs. 18, 19)*
- [Consistência e padrões estabelecidos](design/consistencia-e-padroes-estabelecidos.md) — Reutilizar padrões conhecidos; a mesma ação comporta-se igual em todo o lado. *(pág. 19)*
- [Prevenção de erros e desfazer](design/prevencao-de-erros-e-desfazer.md) — Prevenir em vez de corrigir, oferecer desfazer e dizer como resolver. *(pág. 19)*
- [Atalhos e power users](design/atalhos-e-power-users.md) — Atalhos de teclado e paleta de comandos para quem usa muito, sem prejudicar os ocasionais. *(pág. 19)*
- [Avisos Web Push com VAPID, sem corpo](design/avisos-web-push-com-vapid.md) — Para avisar um telemóvel sem aplicação nativa, a aplicação web subscreve o Web Push com a chave pública VAPID e o servidor envia um POST sem corpo, assinado com um JWT ES256; o service worker mostra um texto fixo e o conteúdo só se lê na aplicação. No iPhone exige o iOS 16.4 e a aplicação no ecrã principal. *(fora do PDF)*

### 5. [3D, WebGL e animação](3d-webgl/README.md) — págs. 20–23 (10 entradas)

- [3D na web: quando e porquê](3d-webgl/3d-na-web-quando-e-porque.md) — Escolher o efeito pelo objetivo e subir na escala de peso só se pagar em compreensão ou emoção. *(pág. 20)*
- [Animação CSS e SVG](3d-webgl/animacao-css-e-svg.md) — Transições e keyframes sem bibliotecas, animando só `transform`/`opacity` e com durações curtas. *(pág. 20)*
- [Scroll-driven animation](3d-webgl/scroll-driven-animation.md) — Animar pela posição do scroll sem nunca o sequestrar, com trabalho por frame mínimo. *(págs. 20, 21)*
- [Three.js / WebGL](3d-webgl/threejs-webgl.md) — Cenas 3D no browser com o maior custo da lista: exige deteção de WebGL, fallback 2D, pausa e limpeza de memória. *(pág. 21)*
- [React Three Fiber (R3F)](3d-webgl/react-three-fiber.md) — Three.js como componentes React, só quando o projeto já é React e a cena é complexa. *(pág. 21)*
- [Pipeline Blender → glTF](3d-webgl/pipeline-blender-gltf.md) — Modelar no Blender, exportar para glTF e otimizar (Draco/Meshopt, KTX2) antes de publicar. *(págs. 21, 22)*
- [Materiais, luz e PBR](3d-webgl/materiais-luz-e-pbr.md) — Materiais PBR realistas, preferindo iluminação por environment map a sombras dinâmicas quando o desempenho aperta. *(pág. 22)*
- [Orçamento de desempenho 3D](3d-webgl/orcamento-de-desempenho-3d.md) — Medir FPS, peso e memória, com metas de partida, carregamento tardio e pausa fora de vista. *(pág. 22)*
- [Acessibilidade e movimento](3d-webgl/acessibilidade-e-movimento.md) — Respeitar sempre `prefers-reduced-motion`, ter fallback 2D e manter o conteúdo em HTML real. *(págs. 22, 23)*
- [Ferramentas e bibliotecas 3D](3d-webgl/ferramentas-e-bibliotecas-3d.md) — Catálogo de motores, bibliotecas de movimento, modelação e otimização para 3D na web. *(pág. 23)*

### 6. [SEO e descoberta](seo/README.md) — pág. 24 (2 entradas)

- [SEO técnico](seo/seo-tecnico.md) — Cada página pública tem título, descrição e canonical, entra no sitemap e é rápida em telemóvel. *(pág. 24)*
- [Dados estruturados e partilha](seo/dados-estruturados-e-partilha.md) — Dados estruturados para os motores e cartões de partilha para os links. *(pág. 24)*

### 7. [Desenho de API](api/README.md) — págs. 25–26 (6 entradas)

- [Design de API REST](api/design-de-api-rest.md) — Recursos no plural, verbos e estados HTTP com o seu significado e um formato de erro único. *(pág. 25)*
- [Versionamento e compatibilidade de API](api/versionamento-e-compatibilidade-de-api.md) — Versionar a API, subir de versão em mudanças que quebram e depreciar com aviso e prazo. *(pág. 25)*
- [Contrato e documentação de API](api/contrato-e-documentacao-de-api.md) — Um contrato explícito (OpenAPI ou schema) verificado contra a implementação, com documentação viva. *(pág. 25)*
- [Testes de contrato](api/testes-de-contrato.md) — Garantir que fornecedor e consumidor da API concordam, apanhando quebras antes de produção. *(pág. 25)*
- [Paginação, filtros e limites](api/paginacao-filtros-e-limites.md) — Nunca devolver listas sem limite: paginar, filtrar e limitar tamanho e taxa. *(págs. 25, 26)*
- [GraphQL: quando e cuidados](api/graphql-quando-e-cuidados.md) — GraphQL serve quando o cliente molda a resposta, mas exige limitar complexidade e autorizar por campo. *(pág. 26)*

### 8. [Base de dados](base-de-dados/README.md) — págs. 27–30 (18 entradas)

- [Nomenclatura](base-de-dados/nomenclatura.md) — Nomes consistentes em `snake_case`, uma convenção mantida e nomes que dizem o conteúdo. *(pág. 27)*
- [Chaves primárias](base-de-dados/chaves-primarias.md) — Toda a tabela tem chave primária estável, e as chaves referenciadas nunca se reutilizam nem renumeram. *(pág. 27)*
- [Chaves estrangeiras e integridade referencial](base-de-dados/chaves-estrangeiras-e-integridade-referencial.md) — Declarar as chaves estrangeiras com ação intencional e indexar as suas colunas. *(pág. 27)*
- [Constraints e integridade](base-de-dados/constraints-e-integridade.md) — A base impõe as regras invariantes com `NOT NULL`, `UNIQUE`, `CHECK` e `DEFAULT`. *(pág. 27)*
- [Tipos de dados](base-de-dados/tipos-de-dados.md) — Escolher o tipo certo: dinheiro em decimal, tempo em UTC, nada de números em texto. *(pág. 28)*
- [Normalização e desenho](base-de-dados/normalizacao-e-desenho.md) — Normalizar até à 3.ª forma normal por omissão e só desnormalizar com razão medida e documentada. *(pág. 28)*
- [Índices](base-de-dados/indices.md) — Indexar o que se filtra, junta e ordena, sem sobre-indexar, medindo com o plano de execução. *(pág. 28)*
- [Transações e ACID](base-de-dados/transacoes-e-acid.md) — Agrupar em transações curtas as escritas que têm de acontecer todas ou nenhuma. *(pág. 28)*
- [Isolamento e concorrência](base-de-dados/isolamento-e-concorrencia.md) — Conhecer os níveis de isolamento e escolher explicitamente controlo otimista ou pessimista. *(págs. 28, 29)*
- [Migrações](base-de-dados/migracoes.md) — Toda a mudança de esquema é uma migração versionada, de preferência aditiva e reversível. *(pág. 29)*
- [Auditoria e apagamento](base-de-dados/auditoria-e-apagamento.md) — Colunas de auditoria, histórico append-only para o sensível e apagamento que preserva o rasto. *(pág. 29)*
- [Desempenho de queries](base-de-dados/desempenho-de-queries.md) — Pedir só o necessário, paginar, evitar N+1 e analisar as queries lentas pelo plano. *(pág. 29)*
- [Segurança da base de dados](base-de-dados/seguranca-da-base-de-dados.md) — Conta da aplicação com permissões mínimas, queries parametrizadas e dados sensíveis cifrados. *(pág. 29)*
- [Backups e recuperação](base-de-dados/backups-e-recuperacao.md) — Backups regulares, cifrados e fora do servidor, com restauro ensaiado. *(págs. 29, 30)*
- [Big data e lakehouse (Parquet, Delta, Iceberg, Spark, Kafka)](base-de-dados/big-data-e-lakehouse.md) — Só se sai da base relacional quando os dados são demasiado grandes ou variados para ela, ou chegam como fluxo sem fim. Nesse caso guardam-se em ficheiros Parquet com um formato de tabela aberto (Delta ou Iceberg), processam-se com Spark em lote ou em fluxo, usa-se Kafka para os eventos e organizam-se em camadas bronze, prata e ouro. *(fora do PDF)*
- [Microsoft Fabric (OneLake, Lakehouse, Warehouse, capacidade e segurança)](base-de-dados/microsoft-fabric.md) — O Fabric é uma plataforma de análise em SaaS sobre um só lago, o OneLake. Escolhe-se Lakehouse para Spark e dados de qualquer forma, Warehouse para T-SQL com transações entre tabelas, e base de dados SQL para o operacional; paga-se por uma capacidade (SKU F) que se pode pausar, e a segurança de cada dado impõe-se na origem. *(fora do PDF)*
- [MongoDB: consistência, réplicas, sharding, segurança e Atlas](base-de-dados/mongodb-consistencia-escala-seguranca-e-atlas.md) — O MongoDB tem transações entre documentos, mas o desenho do esquema deve evitá-las. Uma réplica (replica set) dá disponibilidade, o sharding só se usa com uma boa chave, o controlo de acesso vem desligado por omissão, e o Atlas é o serviço gerido, com um escalão gratuito limitado e sem backups nele. *(fora do PDF)*
- [MongoDB: modelo de documentos, índices e agregação](base-de-dados/mongodb-modelo-indices-e-agregacao.md) — Usa-se MongoDB quando os dados se leem juntos e o esquema muda; o que se lê junto guarda-se junto (embutido), e referencia-se quando o filho cresce sem limite. Os índices compostos seguem a regra Igualdade, Ordenação, Intervalo (ESR) e medem-se com `explain`, e a agregação corre em estágios com limite de memória. *(fora do PDF)*

### 9. [Boas práticas de Python](python/README.md) — págs. 31–34 (13 entradas)

- [Estilo e formatação](python/estilo-e-formatacao.md) — Seguir a PEP 8 com formatador e linter automáticos no CI e nomes que dizem a intenção. *(pág. 31)*
- [Type hints e tipagem estática](python/type-hints-e-tipagem-estatica.md) — Anotar as assinaturas públicas e correr mypy ou pyright no CI, evitando `Any`. *(pág. 31)*
- [Estrutura de projeto e imports](python/estrutura-de-projeto-e-imports.md) — Layout `src/`, imports absolutos, um módulo por responsabilidade e sem ciclos. *(pág. 31)*
- [Ambientes e dependências](python/ambientes-e-dependencias.md) — Ambiente isolado, dependências fixadas com lock e auditadas. *(págs. 31, 32)*
- [Erros e exceções](python/erros-e-excecoes.md) — Apanhar exceções específicas, nunca engolir erros e relançar com contexto. *(pág. 32)*
- [Gestão de recursos (context managers)](python/gestao-de-recursos-context-managers.md) — Abrir ficheiros, ligações e locks com `with`, para garantir o fecho mesmo com exceção. *(pág. 32)*
- [Funções: design e armadilhas](python/funcoes-design-e-armadilhas.md) — Funções pequenas com um propósito, sem defaults mutáveis nem efeitos escondidos. *(pág. 32)*
- [Classes, dataclasses e composição](python/classes-dataclasses-e-composicao.md) — Dataclasses para dados e composição em vez de herança profunda. *(págs. 32, 33)*
- [Programação assíncrona](python/programacao-assincrona.md) — `asyncio` para I/O sem nunca bloquear o event loop. *(pág. 33)*
- [Testes](python/testes.md) — `pytest` com testes rápidos e isolados, que testam comportamento e incluem casos de erro. *(pág. 33)*
- [Logging](python/logging.md) — Usar o módulo `logging`, nunca `print`, sem segredos nem dados pessoais. *(pág. 33)*
- [Segurança em Python](python/seguranca-em-python.md) — Sem `eval`, `shell=True` nem `pickle` sobre dados externos, e SQL sempre parametrizado. *(pág. 33)*
- [Desempenho e código idiomático](python/desempenho-e-codigo-idiomatico.md) — Código idiomático com built-ins e geradores, e otimização só depois de medir. *(págs. 33, 34)*

### 10. [Boas práticas de Java](java/README.md) — págs. 35–37 (13 entradas)

- [Convenções e estilo](java/convencoes-e-estilo.md) — Convenções de nomes Java e formatador e linter a correr no CI. *(pág. 35)*
- [Estrutura, packages e build](java/estrutura-packages-e-build.md) — Pacotes por domínio invertido e build Maven ou Gradle com versões geridas centralmente. *(pág. 35)*
- [Imutabilidade e records](java/imutabilidade-e-records.md) — Preferir objetos imutáveis, `record` para dados e coleções imutáveis. *(pág. 35)*
- [Null safety e Optional](java/null-safety-e-optional.md) — Não retornar `null`; usar `Optional` para ausência, nunca em campos nem parâmetros. *(pág. 35)*
- [Exceções](java/excecoes.md) — Apanhar o mais específico, nunca `catch` vazio, try-with-resources para recursos. *(págs. 35, 36)*
- [Coleções, generics e Streams](java/colecoes-generics-e-streams.md) — Programar para interfaces de coleção, com generics e Streams legíveis. *(pág. 36)*
- [Concorrência](java/concorrencia.md) — Preferir imutabilidade e `java.util.concurrent`, sem estado mutável partilhado sem proteção. *(pág. 36)*
- [Design OO e SOLID](java/design-oo-e-solid.md) — Princípios SOLID, composição e injeção de dependências. *(pág. 36)*
- [equals, hashCode e toString](java/equals-hashcode-e-tostring.md) — `equals` e `hashCode` coerentes e `toString` útil, sem dados sensíveis. *(pág. 36)*
- [Gestão de recursos](java/gestao-de-recursos.md) — try-with-resources para recursos e atenção a fugas de memória. *(págs. 36, 37)*
- [Testes](java/testes.md) — JUnit 5, AssertJ e Mockito, com testes rápidos que testam comportamento. *(pág. 37)*
- [Logging](java/logging.md) — SLF4J com mensagens parametrizadas, nunca `System.out`, sem segredos. *(pág. 37)*
- [Segurança em Java](java/seguranca-em-java.md) — `PreparedStatement` sempre, sem desserializar dados não confiáveis e sem cripto caseira. *(pág. 37)*

### 11. [Boas práticas de C#](csharp/README.md) — págs. 38–40 (13 entradas)

- [Convenções e estilo](csharp/convencoes-e-estilo.md) — Convenções de nomes C#, `.editorconfig` partilhado e `dotnet format` com analisadores no CI. *(pág. 38)*
- [Estrutura, namespaces e build](csharp/estrutura-namespaces-e-build.md) — Namespaces que seguem as pastas e pacotes NuGet geridos centralmente. *(pág. 38)*
- [Imutabilidade e records](csharp/imutabilidade-e-records.md) — `record` para dados e DTOs, com `init`/`readonly` e coleções só-leitura. *(pág. 38)*
- [Nullable reference types](csharp/nullable-reference-types.md) — Ligar nullable, distinguir `string` de `string?` e tratar os avisos como erros. *(pág. 38)*
- [Async/await](csharp/async-await.md) — `async`/`await` para I/O, sem `async void` nem bloqueios, com cancelamento propagado. *(págs. 38, 39)*
- [LINQ e coleções](csharp/linq-e-colecoes.md) — Expor interfaces de coleção e ter atenção à execução adiada do LINQ. *(pág. 39)*
- [Exceções](csharp/excecoes.md) — Apanhar o mais específico, nunca `catch` vazio, relançar com `throw;`. *(pág. 39)*
- [Gestão de recursos (IDisposable)](csharp/gestao-de-recursos-idisposable.md) — `using` para tudo o que é `IDisposable`, sem ligações nem streams por fechar. *(pág. 39)*
- [Design, SOLID e injeção de dependências](csharp/design-solid-e-injecao-de-dependencias.md) — SOLID, injeção de dependências pelo contentor e serviços sem estado partilhado mutável. *(pág. 39)*
- [Testes](csharp/testes.md) — xUnit ou NUnit com testes rápidos e isolados que testam comportamento. *(págs. 39, 40)*
- [Logging](csharp/logging.md) — `ILogger` com logging estruturado, nunca `Console.WriteLine`, sem segredos. *(pág. 40)*
- [Segurança em C#](csharp/seguranca-em-csharp.md) — Queries parametrizadas, segredos num cofre e criptografia da biblioteca padrão. *(pág. 40)*
- [Pattern matching e features modernas](csharp/pattern-matching-e-features-modernas.md) — Usar as features modernas para clareza, não por moda. *(pág. 40)*

### 12. [Boas práticas de JavaScript](javascript/README.md) — ⚠️ fora do PDF (14 entradas)

- [Estilo e formatação](javascript/estilo-e-formatacao.md) — Prettier para a formatação e ESLint para a qualidade, ambos a falhar o CI; `const`/`let` e comparação estrita. *(fora do PDF)*
- [TypeScript e tipagem](javascript/typescript-e-tipagem.md) — TypeScript com `strict`, sem `any` (usar `unknown` nas fronteiras), `satisfies` e `tsc --noEmit` no CI. *(fora do PDF)*
- [Módulos ES](javascript/modulos-es.md) — `import`/`export` estáticos, sem globais nem ciclos; `import()` dinâmico só quando é preciso. *(fora do PDF)*
- [Tipos, números e coerção](javascript/tipos-numeros-e-coercao.md) — Evitar a coerção implícita; os números são vírgula flutuante, por isso dinheiro em cêntimos ou com biblioteca, e inteiros grandes em `BigInt` ou string. *(fora do PDF)*
- [Programação assíncrona](javascript/programacao-assincrona.md) — `async`/`await`, nenhuma promessa sem tratamento, paralelismo com `Promise.all`/`allSettled` e timeouts com `AbortSignal`. *(fora do PDF)*
- [Erros e exceções](javascript/erros-e-excecoes.md) — Lançar sempre `Error` com `cause`, só apanhar o recuperável, nunca `catch` vazio, e mostrar ao utilizador uma resposta genérica com o detalhe no log. *(fora do PDF)*
- [Imutabilidade e estado](javascript/imutabilidade-e-estado.md) — Não mutar argumentos; preferir os métodos de cópia (`toSorted`, `with`) e `structuredClone` para cópias profundas. *(fora do PDF)*
- [Segurança no browser](javascript/seguranca-no-browser.md) — `textContent` em vez de `innerHTML`, DOMPurify quando é preciso HTML, sem `eval` nem handlers inline e sem identificadores de sessão em `localStorage`. *(fora do PDF)*
- [DOM e desempenho](javascript/dom-e-desempenho.md) — Scripts que não bloqueiam, código dividido por rota, delegação de eventos e leituras/escritas ao DOM agrupadas. *(fora do PDF)*
- [Testes](javascript/testes.md) — Testes que se parecem com o uso real, consultas por papel, mocks só no que não se controla e poucos ponta-a-ponta nos fluxos críticos. *(fora do PDF)*
- [Dependências do frontend](javascript/dependencias-frontend.md) — Lockfile versionado, `npm ci`, auditoria com limiar no CI, assinaturas verificadas e bibliotecas não usadas removidas. *(fora do PDF)*
- [Datas, números e localidade](javascript/datas-numeros-e-localidade.md) — Formatar com `Intl`, transmitir datas com `toISOString()` (UTC) e não concatenar frases traduzidas. *(fora do PDF)*
- [Fetch e respostas HTTP](javascript/fetch-e-respostas-http.md) — `fetch` não rejeita em 4xx/5xx: verificar `response.ok`, definir timeout e permitir cancelar. *(fora do PDF)*
- [Coleções: Map, Set e agrupamento](javascript/colecoes-map-set-e-agrupamento.md) — `Map` para dicionários dinâmicos ou com chaves de fora; `Object.groupBy` para agrupar. *(fora do PDF)*

### 13. [Boas práticas de Node.js](node/README.md) — ⚠️ fora do PDF (14 entradas)

- [Versões e runtime](node/versoes-e-runtime.md) — Usar uma versão Active ou Maintenance LTS, declarada no projeto, igual em todos os ambientes e atualizada antes do fim de suporte. *(fora do PDF)*
- [Gestão de pacotes](node/gestao-de-pacotes.md) — Lockfile versionado, `npm ci` no CI, sem dependências de dev em produção, scripts de instalação desligados e assinaturas verificadas. *(fora do PDF)*
- [Estrutura de projeto](node/estrutura-de-projeto.md) — Módulos ES com `type` declarado, imports internos com `#` e API pública declarada em `exports`. *(fora do PDF)*
- [Configuração e segredos](node/configuracao-e-segredos.md) — Segredos num serviço de gestão de segredos, `.env` só em desenvolvimento e `NODE_ENV=production` sempre em produção. *(fora do PDF)*
- [Event loop e trabalho pesado](node/event-loop-e-trabalho-pesado.md) — Nunca bloquear o event loop: sem APIs síncronas no servidor, streams para o que é grande e `worker_threads` para CPU. *(fora do PDF)*
- [Erros e processo](node/erros-e-processo.md) — Tratar todas as rejeições, encadear erros com `cause` e terminar o processo depois de uma exceção não apanhada. *(fora do PDF)*
- [Encerramento gracioso](node/encerramento-gracioso.md) — Ao receber `SIGTERM`, deixar de aceitar ligações, fechar as inativas e só forçar o fecho no fim do prazo. *(fora do PDF)*
- [Segurança em Node.js](node/seguranca-em-node.md) — Limitar pedidos, cabeçalhos de segurança, sem shell nem `vm` com dados externos, proteção contra prototype pollution e timeouts do servidor. *(fora do PDF)*
- [Permissões do processo](node/permissoes-do-processo.md) — Limitar o que o processo pode fazer com o Permission Model, sabendo que não protege contra código malicioso. *(fora do PDF)*
- [Logging e observabilidade](node/logging-e-observabilidade.md) — Logger estruturado com campos sensíveis ocultos, identificador de pedido com `AsyncLocalStorage` e OpenTelemetry carregado antes da aplicação. *(fora do PDF)*
- [Testes](node/testes.md) — Test runner nativo (`node:test`, Stable) ou Vitest/Jest, com mocks e snapshots nativos. *(fora do PDF)*
- [Desempenho e escala](node/desempenho-e-escala.md) — Aplicação sem estado em memória, ligações reutilizadas e otimização só depois de medir com os perfis nativos. *(fora do PDF)*
- [TypeScript nativo](node/typescript-nativo.md) — Executar `.ts` diretamente com type stripping (Stable), mantendo a verificação de tipos no CI. *(fora do PDF)*
- [Node.js em contentores](node/node-em-contentores.md) — Imagem fixada por digest, multi-stage, sem dependências de dev, utilizador `node`, `--init` e limites de memória. *(fora do PDF)*

### 14. [Estrutura e documentação](estrutura/README.md) — págs. 41–44 (17 entradas)

- [Estrutura do repositório](estrutura/estrutura-do-repositorio.md) — Pastas por responsabilidade, com nomes que dizem o conteúdo e sem pastas «diversos». *(pág. 41)*
- [Documentação em camadas](estrutura/documentacao-em-camadas.md) — Separar referência, estado, decisões e registo, que envelhecem a ritmos diferentes. *(pág. 41)*
- [Documento de entrada (leia primeiro)](estrutura/documento-de-entrada.md) — Um só ponto de entrada, curto e atual, que é o mapa do projeto. *(pág. 41)*
- [Como escrever um documento de referência](estrutura/como-escrever-um-documento-de-referencia.md) — Cada documento diz para quem é, o que cobre e quando foi verificado, com um tema por documento. *(págs. 41, 42)*
- [Referência trancada](estrutura/referencia-trancada.md) — A referência só muda com pedido explícito do dono e cada alteração deixa entrada no registo. *(pág. 42)*
- [Documento de estado vivo](estrutura/documento-de-estado-vivo.md) — Um documento que diz onde estamos, atualizado a cada entrega. *(pág. 42)*
- [Registo de alterações (o sentido da mudança)](estrutura/registo-de-alteracoes.md) — Um registo append-only de quem alterou a referência, o quê e porquê. *(pág. 42)*
- [Decisões registadas (ADR)](estrutura/decisoes-registadas-adr.md) — Uma decisão de arquitetura por ficheiro, numerada e imutável, criada antes do código. Esta entrada aparece em duas secções do PDF (Estrutura e documentação, pág. 42; Governação e processo, pág. 59) e foi juntada aqui. *(págs. 42, 59)*
- [Regras do projeto (pessoas e agentes)](estrutura/regras-do-projeto.md) — Um ficheiro de regras na raiz, para pessoas e agentes de IA, que manda sobre o hábito. *(pág. 43)*
- [Hooks do git versionados](estrutura/hooks-do-git-versionados.md) — Hooks no repositório que correm lint, testes e procura de segredos antes de cada commit. *(pág. 43)*
- [Hooks de guarda](estrutura/hooks-de-guarda.md) — Hooks que protegem o frágil, mordendo só no que devem e com um interruptor deliberado. *(pág. 43)*
- [Um assunto por ficheiro, e um índice](estrutura/um-assunto-por-ficheiro-e-um-indice.md) — Documentos atómicos, um assunto por ficheiro, todos listados num índice. *(pág. 43)*
- [Trabalho em curso separado da referência](estrutura/trabalho-em-curso-separado-da-referencia.md) — Planos, rascunhos e briefings vivem numa área própria, fora da fonte de verdade. *(págs. 43, 44)*
- [Regras automatizadas, não só escritas](estrutura/regras-automatizadas-nao-so-escritas.md) — A regra que importa vira verificação em hook ou CI; o documento explica, a automação impõe. *(pág. 44)*
- [Ambiente de desenvolvimento reproduzível (dev containers)](estrutura/ambiente-de-desenvolvimento-reproduzivel.md) — O ambiente de trabalho viaja com o repositório, num contentor descrito por um ficheiro, para que uma pessoa nova ou um agente arranque com as mesmas ferramentas sem passos manuais. *(fora do PDF)*
- [Diagramas de arquitetura (modelo C4)](estrutura/diagramas-c4.md) — Quatro níveis de zoom, do sistema ao código, com o mesmo vocabulário em todos; os dois primeiros chegam para mostrar o que é núcleo e o que é específico de cada caso. *(fora do PDF)*
- [Especificação antes do código](estrutura/especificacao-antes-do-codigo.md) — Com agentes de código, escreve-se primeiro o que se quer e porquê, deixa-se o agente planear e implementar a partir disso, e só se aceita o trabalho com a prova à vista; as regras sem exceção vão para hooks, não para texto. *(fora do PDF)*

### 15. [CI/CD e ferramentas](cicd/README.md) — págs. 45–50 (24 entradas)

- [CI vs CD](cicd/ci-vs-cd.md) — CI integra e verifica cada alteração cedo; CD deixa pronto ou publica o que passa, em lotes pequenos e frequentes. *(pág. 45)*
- [Pipeline como portão](cicd/pipeline-como-portao.md) — O pipeline é a única porta para produção, com fases ordenadas por custo. *(pág. 45)*
- [Build reprodutível e artefacto imutável](cicd/build-reprodutivel-e-artefacto-imutavel.md) — O mesmo commit dá o mesmo artefacto, construído uma vez e promovido entre ambientes. *(pág. 45)*
- [Testes no pipeline](cicd/testes-no-pipeline.md) — Pirâmide de testes rápida e determinística, sem tolerar testes instáveis. *(págs. 45, 46)*
- [Segurança do pipeline](cicd/seguranca-do-pipeline.md) — Proteger o pipeline como produção: credenciais mínimas, ações fixadas por SHA e segredos fora do log. *(pág. 46)*
- [Estratégias de deploy](cicd/estrategias-de-deploy.md) — Rolling, blue-green ou canary e feature flags, escolhidos pela tolerância ao risco. *(pág. 46)*
- [Rollback e recuperação](cicd/rollback-e-recuperacao.md) — Voltar atrás tem de ser rápido e ensaiado, com o artefacto anterior guardado. *(pág. 46)*
- [Ambientes e promoção](cicd/ambientes-e-promocao.md) — Dev → staging → produção, cada um com a sua configuração e dados, promovendo o mesmo artefacto. *(págs. 46, 47)*
- [Infraestrutura e migrações no fluxo](cicd/infraestrutura-e-migracoes-no-fluxo.md) — Infraestrutura como código e migrações versionadas fazem parte do deploy. *(pág. 47)*
- [Observabilidade do deploy](cicd/observabilidade-do-deploy.md) — Depois de subir, provar que está vivo com smoke test e confirmar a configuração. *(pág. 47)*
- [Estratégia de branches e CI](cicd/estrategia-de-branches-e-ci.md) — Lotes pequenos e branches de vida curta, com CI verde antes do merge. *(pág. 47)*
- [Agentes de IA a par do CI/CD](cicd/agentes-de-ia-a-par-do-cicd.md) — Agentes podem questionar o que o pipeline já verifica, mas propõem e assinalam, nunca aprovam nem publicam. *(págs. 47, 48)*
- [Ferramentas: linters e formatadores](cicd/ferramentas-linters-e-formatadores.md) — Formatador e linter por linguagem, a correr no CI. *(pág. 48)*
- [Ferramentas: tipagem estática](cicd/ferramentas-tipagem-estatica.md) — Verificadores de tipos por linguagem, a correr no CI com avisos tratados como erro. *(pág. 48)*
- [Ferramentas: frameworks de teste](cicd/ferramentas-frameworks-de-teste.md) — Frameworks de teste por linguagem e para ponta-a-ponta web. *(pág. 48)*
- [Ferramentas: análise estática de segurança (SAST)](cicd/ferramentas-sast.md) — Ferramentas SAST que correm a cada PR e apontam padrões perigosos. *(pág. 48)*
- [Ferramentas: segredos (deteção e cofres)](cicd/ferramentas-segredos.md) — Deteção de segredos no repositório e cofres para os guardar. *(págs. 48, 49)*
- [Ferramentas: dependências (auditoria e atualização)](cicd/ferramentas-dependencias.md) — Auditoria de vulnerabilidades e atualização automática de dependências. *(pág. 49)*
- [Ferramentas: contentores (scan, SBOM, assinatura)](cicd/ferramentas-contentores.md) — Scan de vulnerabilidades, SBOM e assinatura das imagens. *(pág. 49)*
- [Ferramentas: migrações de base de dados](cicd/ferramentas-migracoes-de-base-de-dados.md) — Ferramentas que versionam o esquema com tabela de controlo. *(pág. 49)*
- [Ferramentas: qualidade do frontend](cicd/ferramentas-qualidade-do-frontend.md) — Acessibilidade e desempenho do frontend verificados no CI. *(pág. 49)*
- [Ferramentas: acesso e rede](cicd/ferramentas-acesso-e-rede.md) — Acesso por identidade, rede de confiança zero e proxy de borda. *(págs. 49, 50)*
- [Ferramentas: observabilidade](cicd/ferramentas-observabilidade.md) — Ferramentas de logs, métricas e tracing. *(pág. 50)*
- [Pirâmide de testes](cicd/piramide-de-testes.md) — Muitos testes unitários, menos testes de serviço e poucos testes de interface; quanto mais alto o nível, menos testes. *(fora do PDF)*

### 16. [Docker e orquestração](docker/README.md) — págs. 51–53 (14 entradas)

- [Imagens e Dockerfile](docker/imagens-e-dockerfile.md) — Imagens multi-stage com base pequena fixada por digest e `.dockerignore`. *(pág. 51)*
- [Imagem endurecida](docker/imagem-endurecida.md) — Imagens non-root, só-leitura, com healthcheck, sem segredos e escaneadas. *(pág. 51)*
- [Contentores: execução e configuração](docker/contentores-execucao-e-configuracao.md) — Configuração por ambiente, segredos montados e limites de recursos. *(pág. 51)*
- [Volumes e persistência](docker/volumes-e-persistencia.md) — Os dados que têm de durar vivem em volumes com backup; o contentor é descartável. *(pág. 51)*
- [Redes do Docker](docker/redes-do-docker.md) — Rede interna entre serviços e só o proxy a publicar portas. *(págs. 51, 52)*
- [Docker Compose](docker/docker-compose.md) — A stack multi-serviço descrita e versionada num ficheiro, que sobe com um comando. *(pág. 52)*
- [Escalonar com réplicas](docker/escalonar-com-replicas.md) — Várias réplicas atrás de um balanceador, com a aplicação sem estado. *(pág. 52)*
- [Docker Swarm](docker/docker-swarm.md) — Orquestração simples sobre o Docker, degrau intermédio antes do Kubernetes. *(pág. 52)*
- [Kubernetes: conceitos](docker/kubernetes-conceitos.md) — Orquestrador declarativo que mantém o estado desejado: Pod, Deployment, Service e Ingress. *(pág. 52)*
- [Kubernetes: configuração e segredos](docker/kubernetes-configuracao-e-segredos.md) — ConfigMap para configuração e segredos num cofre, nunca na imagem. *(pág. 53)*
- [Kubernetes: escalonamento e atualizações](docker/kubernetes-escalonamento-e-atualizacoes.md) — Escalar por métrica com HPA e atualizar sem downtime, com rollback. *(pág. 53)*
- [Kubernetes: saúde e armazenamento](docker/kubernetes-saude-e-armazenamento.md) — Probes de liveness e readiness e estado persistente em PV/PVC. *(pág. 53)*
- [Kubernetes: segurança e entrega](docker/kubernetes-seguranca-e-entrega.md) — Non-root, NetworkPolicy e RBAC, com entrega por Helm e GitOps. *(pág. 53)*
- [Sondas de saúde (liveness, readiness, startup)](docker/sondas-de-saude.md) — Três sondas com funções diferentes: a de liveness reinicia o contentor preso, a de readiness tira-o do tráfego até estar pronto, e a de startup dá tempo ao arranque antes de as outras duas começarem. *(fora do PDF)*

### 17. [Serviços de infraestrutura](infraestrutura/README.md) — págs. 54–56 (10 entradas)

- [Jump server (bastion)](infraestrutura/jump-server-bastion.md) — Uma porta de entrada única, endurecida e auditada para os servidores privados, ou alternativas por identidade. *(pág. 54)*
- [Proxy reverso e borda (Traefik, Nginx, Caddy)](infraestrutura/proxy-reverso-e-borda.md) — O proxy fica à frente dos serviços e faz TLS, encaminhamento e limites num só sítio. *(pág. 54)*
- [Cache e sessões (Redis / Valkey)](infraestrutura/cache-e-sessoes-redis-valkey.md) — Armazém chave-valor em memória para cache, sessões partilhadas, filas simples e locks. *(págs. 54, 55)*
- [Base de dados relacional (PostgreSQL)](infraestrutura/base-de-dados-relacional-postgresql.md) — PostgreSQL como escolha soberana por omissão, com réplicas de leitura, backups e PITR. *(pág. 55)*
- [Mensageria e filas (RabbitMQ, Kafka, NATS)](infraestrutura/mensageria-e-filas.md) — Filas que desacoplam serviços, absorvem picos e permitem processar em segundo plano. *(pág. 55)*
- [Observabilidade (Grafana, Prometheus, Loki, Tempo)](infraestrutura/observabilidade-grafana-prometheus-loki-tempo.md) — Métricas, logs e traces centralizados, com painéis e alertas no Grafana. *(pág. 55)*
- [Pesquisa (OpenSearch, Meilisearch)](infraestrutura/pesquisa-opensearch-meilisearch.md) — Um motor de pesquisa próprio para texto, em vez de `LIKE` na base. *(pág. 55)*
- [Armazenamento de objetos (MinIO, S3)](infraestrutura/armazenamento-de-objetos-minio-s3.md) — Ficheiros grandes em armazenamento de objetos, fora da base e do contentor. *(págs. 55, 56)*
- [Gestão de segredos (Vault / OpenBao)](infraestrutura/gestao-de-segredos-vault-openbao.md) — Um cofre central que guarda, controla, audita e roda segredos. *(pág. 56)*
- [Identidade (Keycloak)](infraestrutura/identidade-keycloak.md) — Servidor de identidade aberto com SSO, OIDC/SAML e MFA, alternativa soberana. *(pág. 56)*

### 18. [Soberania digital](soberania/README.md) — págs. 57–58 (6 entradas)

- [Inventário de dependências por jurisdição](soberania/inventario-de-dependencias-por-jurisdicao.md) — Uma tabela de cada dependência externa com função, jurisdição, dados que lá passam e decisão. *(pág. 57)*
- [Estratégia de saída](soberania/estrategia-de-saida.md) — O sistema funciona sem um fornecedor específico, com exportação aberta e restauro provado. *(pág. 57)*
- [Código e CI soberanos](soberania/codigo-e-ci-soberanos.md) — Git e CI em infraestrutura europeia ou self-hosted, com espelho do repositório. *(pág. 57)*
- [Um só cofre de segredos soberano](soberania/um-so-cofre-de-segredos-soberano.md) — Um só secret manager europeu ou self-hosted em todos os ambientes. *(pág. 57)*
- [Identidade por OIDC genérico](soberania/identidade-por-oidc-generico.md) — Falar OIDC padrão para trocar de IdP ser configuração e não código. *(pág. 58)*
- [Minimização e residência dos dados](soberania/minimizacao-e-residencia-dos-dados.md) — Recolher o mínimo e saber a região onde cada armazém de dados vive. *(pág. 58)*

### 19. [Governação e processo](governacao/README.md) — págs. 59–60 (7 entradas)

- [Branch protegida e promoção controlada](governacao/branch-protegida-e-promocao-controlada.md) — Tudo entra por PR com CI verde e revisão; produção só do branch principal, com aprovação. *(pág. 59)*
- [Decisões registadas (ADR)](estrutura/decisoes-registadas-adr.md) — Uma decisão de arquitetura por ficheiro, numerada e imutável, criada antes do código. Esta entrada aparece em duas secções do PDF (Estrutura e documentação, pág. 42; Governação e processo, pág. 59) e foi juntada aqui. *(págs. 42, 59)*
- [Versão de uma só fonte](governacao/versao-de-uma-so-fonte.md) — A versão vem de um só sítio e o CHANGELOG é gerado dos PRs. *(pág. 59)*
- [Higiene das branches](governacao/higiene-das-branches.md) — Apagar branches fundidas e fechar ou documentar as antigas sem PR. *(pág. 59)*
- [Bus factor: duas pessoas por passo](governacao/bus-factor-duas-pessoas-por-passo.md) — Nenhum passo crítico depende de uma só pessoa; automatizar o mecânico. *(págs. 59, 60)*
- [Ficheiros de governação](governacao/ficheiros-de-governacao.md) — Um projeto arranca com SECURITY.md, LICENSE, DPIA, runbooks e plano de backups, nem que sejam esqueletos. *(pág. 60)*
- [Regras no CI, não só no agente](governacao/regras-no-ci-nao-so-no-agente.md) — As regras que importam vivem em hooks e no CI; o agente de IA é um atalho, não a barreira. *(pág. 60)*

### 20. [Nuvem e identidade (AWS, Azure, Microsoft, OVH)](nuvem/README.md) — págs. 61–62 (8 entradas)

- [Escolher o fornecedor de nuvem](nuvem/escolher-o-fornecedor-de-nuvem.md) — Escolher a nuvem por jurisdição, custo, serviços, segurança e facilidade de saída, e registar o critério. *(pág. 61)*
- [AWS (Amazon Web Services)](nuvem/aws.md) — O maior catálogo, com acesso por roles IAM de menor privilégio e regiões europeias. *(pág. 61)*
- [Microsoft Azure e Entra ID](nuvem/microsoft-azure-e-entra-id.md) — A nuvem da Microsoft, com identidade por Entra ID com MFA e segredos no Key Vault. *(pág. 61)*
- [Azure PIM (Privileged Identity Management)](nuvem/azure-pim.md) — Acesso privilegiado just-in-time e temporário, com aprovação e auditoria, em vez de permanente. *(págs. 61, 62)*
- [Microsoft 365 e Graph](nuvem/microsoft-365-e-graph.md) — Integrar com o Microsoft 365 pela Graph, com permissões mínimas e consentidas. *(pág. 62)*
- [OVHcloud](nuvem/ovhcloud.md) — Fornecedor europeu para quando os dados têm de ficar na UE e se quer fugir ao lock-in. *(pág. 62)*
- [Multi-cloud, lock-in e saída](nuvem/multi-cloud-lock-in-e-saida.md) — Preferir peças portáveis e ser capaz de migrar, mais do que correr em duas nuvens. *(pág. 62)*
- [Login com Microsoft Entra ID (OpenID Connect)](nuvem/login-com-entra-id-oidc.md) — Para um utilizador entrar com a conta Microsoft da organização, regista-se a aplicação no Entra, usa-se o endpoint v2.0 através de uma biblioteca MSAL, e ficam por preencher só o tenant, o client ID, a credencial e os URIs. *(fora do PDF)*

### 21. [Sessões, orquestração e custo-eficiência](custo/README.md) — págs. 63–64 (8 entradas)

- [Custo-eficiência (FinOps)](custo/custo-eficiencia-finops.md) — Tornar o custo visível por etiquetas, responsabilizar quem gasta e medir o custo por unidade útil. *(pág. 63)*
- [Dimensionar e escalar (right-sizing e autoscaling)](custo/dimensionar-e-escalar.md) — Começar pequeno, dimensionar ao uso real, escalar com a procura e desligar o que não se usa. *(pág. 63)*
- [Capacidade barata (spot e reservas)](custo/capacidade-barata-spot-e-reservas.md) — Spot para trabalho tolerante a interrupção e reservas para a carga base estável. *(pág. 63)*
- [Serverless vs. sempre-ligado](custo/serverless-vs-sempre-ligado.md) — Serverless para carga irregular, sempre-ligado para carga constante, pelo custo real medido. *(pág. 63)*
- [Gestão de sessões e estado para escalar](custo/gestao-de-sessoes-e-estado-para-escalar.md) — A sessão e o estado saem do processo para um serviço partilhado, para escalar horizontalmente. *(pág. 64)*
- [Orquestração de trabalho (filas, workers, agendadores)](custo/orquestracao-de-trabalho.md) — A API responde depressa e põe o trabalho pesado numa fila, processada por workers com concorrência limitada. *(pág. 64)*
- [Caching em camadas](custo/caching-em-camadas.md) — Cachear o caro e repetido na camada certa, com regra de invalidação. *(pág. 64)*
- [Orçamento e alertas de custo](custo/orcamento-e-alertas-de-custo.md) — Um orçamento com alertas que disparam antes de a fatura surpreender. *(pág. 64)*

### 22. [Publicação e alojamento web](publicacao/README.md) — ⚠️ fora do PDF (10 entradas)

- [Alojamento estático gratuito](publicacao/alojamento-estatico-gratuito.md) — GitHub Pages, GitLab Pages, Cloudflare (Workers com ativos estáticos ou Pages), Netlify Free e Vercel Hobby publicam sites estáticos sem custo, com domínio próprio e HTTPS, mas com limites de tamanho, tráfego e builds e, no GitHub Pages e na Vercel Hobby, com restrições ao uso comercial. *(fora do PDF)*
- [Alojamento dinâmico e de teste gratuito](publicacao/alojamento-dinamico-e-de-teste-gratuito.md) — Para testar back-ends sem custo há escalões grátis permanentes (Cloudflare Workers, Render, Oracle Always Free, Google Cloud Free Tier) e créditos iniciais temporários (AWS, Google Cloud, Azure), cada um com limites de uso, regiões, prazos e, em alguns casos, cartão obrigatório. *(fora do PDF)*
- [Expor um serviço local para testes](publicacao/expor-um-servico-local.md) — Cloudflare Tunnel e Tailscale Funnel publicam uma app que corre no próprio computador através de ligações de saída cifradas, sem abrir portas nem expor o IP, mas o serviço fica acessível na Internet e tem limites próprios. *(fora do PDF)*
- [Alojamento pago e empresarial](publicacao/alojamento-pago-e-empresarial.md) — Ao sair do grátis, as opções vão de VPS europeus a partir de poucos euros por mês, a PaaS pagos com planos de equipa e Enterprise, até à nuvem pública com planos de suporte pagos e tempos de resposta definidos. *(fora do PDF)*
- [Limites e condições dos planos gratuitos](publicacao/limites-e-condicoes-dos-planos-gratuitos.md) — Os planos grátis podem proibir uso comercial, adormecer, suspender o site ao atingir limites, exigir cartão, apagar dados ao expirar, alojar fora da UE e mudar com frequência. *(fora do PDF)*
- [Domínios e DNS](publicacao/dominios-e-dns.md) — Para teste pessoal basta o subdomínio grátis da plataforma; para produção regista-se domínio próprio (Cloudflare Registrar a preço de custo ou .pt através de um registrar credenciado pelo .PT), com DNS gerido na Cloudflare e DNSSEC ativo. *(fora do PDF)*
- [Certificados TLS e HTTPS](publicacao/certificados-tls.md) — O HTTPS vem grátis e automático nas plataformas e na Cloudflare (Universal SSL, sempre em Full (strict)), no servidor próprio usa-se Let's Encrypt com renovação automática porque a validade está a encurtar, autoassinados só em desenvolvimento e OV/EV pagos só quando a política da empresa o exige. *(fora do PDF)*
- [WAF e proteção DDoS](publicacao/waf-e-protecao-ddos.md) — Do grátis ao empresarial: Cloudflare Free (DDoS ilimitado e regras geridas base), WAF open source com OWASP CRS, Bunny Shield, Cloudflare Pro/Business/Enterprise e WAF dos fornecedores de nuvem. *(fora do PDF)*
- [Acesso restrito à área de administração](publicacao/acesso-restrito-a-area-de-administracao.md) — A área de administração fica atrás de SSO com MFA obrigatório (Cloudflare Access, Entra application proxy ou OIDC com Keycloak) ou só numa rede privada (Tailscale), seguindo as cheat sheets OWASP de autenticação e MFA. *(fora do PDF)*
- [Service tokens do Cloudflare Access (um programa a entrar numa aplicação protegida)](publicacao/service-tokens-do-cloudflare-access.md) — Quando um programa sem pessoa (um script, um hook, outro servidor) tem de entrar numa aplicação atrás do Cloudflare Access, usa um service token: envia o Client ID e o Client Secret em dois cabeçalhos, a política da aplicação tem uma regra «Service Auth», e a origem valida o JWT do Access e reconhece o programa pelo `common_name`. *(fora do PDF)*

### 23. [Construir com IA](ia/README.md) — págs. 65–69 (63 entradas)

- [Certificação Claude Certified Architect (Foundations e avançado)](ia/certificacao-claude-certified-architect.md) — As quatro certificações da Anthropic com exame e o seu formato; o PDF indica que vêm de fontes da comunidade, a confirmar. *(pág. 65)*
- [Domínios do exame (o que um bom sistema de IA cobre)](ia/dominios-do-exame.md) — Os domínios dos exames Foundations e Professional, usados como eixos para avaliar um sistema de IA. *(pág. 65)*
- [Cursos gratuitos da Anthropic Academy](ia/cursos-gratuitos-da-anthropic-academy.md) — Os cursos gratuitos da Anthropic Academy, de base e para construir, com certificado de conclusão. *(pág. 66)*
- [Escolher a superfície (do simples ao agente)](ia/escolher-a-superficie.md) — Começar pelo mais simples que resolve (chamada, workflow, agente) e só subir de nível com justificação. *(pág. 66)*
- [Escolher o modelo Claude](ia/escolher-o-modelo-claude.md) — Os modelos Claude, os seus preços indicativos e a regra de escolher por medição na tarefa real. *(pág. 66)*
- [Pensar (thinking) e esforço (effort)](ia/pensar-e-esforco.md) — Adaptive thinking com o nível de esforço afinado por rota. *(págs. 66, 67)*
- [Prompt engineering e saída estruturada](ia/prompt-engineering-e-saida-estruturada.md) — Instruções claras com estrutura, e saída estruturada validada por esquema para JSON. *(pág. 67)*
- [Tool use (ferramentas e function calling)](ia/tool-use.md) — Ferramentas que deixam o modelo agir, com esquema estrito e erros devolvidos marcados. *(pág. 67)*
- [MCP (Model Context Protocol)](ia/mcp-model-context-protocol.md) — Protocolo aberto para ligar o modelo a fontes e ferramentas externas de forma padronizada. *(pág. 67)*
- [Agentes: as quatro formas de construir](ia/agentes-as-quatro-formas-de-construir.md) — Loop manual, Tool Runner, Managed Agents ou Claude Agent SDK, escolhidos por quem corre o ciclo e quem aloja. *(págs. 67, 68)*
- [Subagentes e orquestração](ia/subagentes-e-orquestracao.md) — Dividir o trabalho por subagentes só quando há leitura pesada ou trabalho independente, com modelos baratos na leitura. *(pág. 68)*
- [Agent skills](ia/agent-skills.md) — Pacotes de instruções e recursos carregados para uma tarefa, que mantêm o contexto limpo e o comportamento reutilizável. *(pág. 68)*
- [Claude Code e Claude Agent SDK](ia/claude-code-e-claude-agent-sdk.md) — O Claude Code como agente de código configurável e o Agent SDK que o empacota como biblioteca. *(pág. 68)*
- [Gestão de contexto e fiabilidade](ia/gestao-de-contexto-e-fiabilidade.md) — Gerir o contexto com caching, compaction e edição, e validar sempre a saída do modelo. *(págs. 68, 69)*
- [Avaliação (evals)](ia/avaliacao-evals.md) — Medir a qualidade com evals antes e depois de cada mudança; sem evals, «melhorou» é opinião. *(pág. 69)*
- [Otimização de custo da IA](ia/otimizacao-de-custo-da-ia.md) — Primeiro as poupanças grátis (caching, higiene de tokens), depois os trade-offs, medindo o custo por tarefa concluída. *(pág. 69)*
- [Segurança e governação de IA](ia/seguranca-e-governacao-de-ia.md) — O conteúdo externo nunca comanda o agente, ações perigosas exigem aprovação e o uso de IA é auditado. *(pág. 69)*
- [Engenharia de contexto para agentes](ia/agentes/engenharia-de-contexto.md) — O contexto é um orçamento finito; um agente carrega a informação quando precisa dela, resume quando se aproxima do limite e guarda notas fora da janela. *(fora do PDF)*
- [Frameworks de agentes (OpenAI Agents SDK, Google ADK, LangGraph)](ia/agentes/frameworks-de-agentes.md) — Três frameworks open source para quando o ciclo do agente já não cabe em código simples; escolhe-se pelo controlo que se quer sobre o estado e pelo fornecedor. *(fora do PDF)*
- [Padrões de agentes (workflows e agentes)](ia/agentes/padroes-de-agentes.md) — Começar pela solução mais simples, muitas vezes sem agente; quando é preciso mais, escolher entre cinco padrões de workflow antes de dar ao modelo o controlo do processo. *(fora do PDF)*
- [Protocolo A2A (Agent2Agent)](ia/agentes/protocolo-a2a.md) — Padrão aberto para agentes independentes conversarem entre si como pares; complementa o MCP, que liga um agente a ferramentas e dados. *(fora do PDF)*
- [Citações](ia/api-claude/citacoes.md) — Com as citações ligadas, cada afirmação da resposta vem acompanhada do excerto exato do documento que a apoia. *(fora do PDF)*
- [Computer use](ia/api-claude/computer-use.md) — O Claude controla um ambiente de trabalho com capturas de ecrã, rato e teclado, e é a tua aplicação que executa cada ação. *(fora do PDF)*
- [Contagem de tokens](ia/api-claude/contagem-de-tokens.md) — Um endpoint grátis devolve uma estimativa dos tokens de entrada antes de o pedido ser enviado, para controlar custo, limites e escolha de modelo. *(fora do PDF)*
- [Execução de código](ia/api-claude/execucao-de-codigo.md) — O Claude corre Python e Bash num contentor isolado sem internet, pago por tempo de execução depois de uma quota mensal grátis. *(fora do PDF)*
- [Files API](ia/api-claude/files-api.md) — Carrega-se um ficheiro uma vez e usa-se o `file_id` em vários pedidos, sem voltar a enviar o conteúdo. *(fora do PDF)*
- [Limites de taxa e erros](ia/api-claude/limites-de-taxa-e-erros.md) — Os limites contam pedidos e tokens por minuto, por classe de modelo; a leitura da cache não conta para a entrada, e os erros 429 e 529 tratam-se com novas tentativas e espera crescente. *(fora do PDF)*
- [Message Batches API](ia/api-claude/message-batches.md) — Pedidos que não precisam de resposta imediata vão num batch assíncrono a metade do preço, com os resultados disponíveis durante 29 dias. *(fora do PDF)*
- [Prompt caching](ia/api-claude/prompt-caching.md) — A API retoma o processamento a partir de prefixos que já estão em cache, o que baixa o preço da entrada repetida para uma fração do normal. *(fora do PDF)*
- [Retenção de dados e retenção zero (ZDR)](ia/api-claude/retencao-de-dados-e-zdr.md) — Por omissão a API não guarda prompts nem respostas, mas várias funcionalidades guardam dados durante dias ou até serem apagados, e ficam fora da retenção zero. *(fora do PDF)*
- [Saída estruturada (JSON e strict tool use)](ia/api-claude/saida-estruturada.md) — A resposta é obrigada a seguir um JSON Schema, e as chamadas de ferramentas a seguir o esquema delas com `strict: true`. *(fora do PDF)*
- [Streaming](ia/api-claude/streaming.md) — Com `"stream": true`, a resposta chega aos poucos como server-sent events, em vez de chegar toda no fim. *(fora do PDF)*
- [Imagens e PDF](ia/api-claude/visao-e-pdf.md) — O Claude lê imagens e PDFs enviados no pedido, com limites de tamanho, de número e de páginas que decidem como dividir os documentos. *(fora do PDF)*
- [Web search e web fetch](ia/api-claude/web-search-e-web-fetch.md) — Duas ferramentas de servidor dão ao Claude acesso à web: a pesquisa traz resultados com citações, e o fetch lê o conteúdo completo de páginas e PDFs. *(fora do PDF)*
- [Batch e cache entre fornecedores (Claude, OpenAI, Gemini)](ia/fornecedores/batch-e-cache-entre-fornecedores.md) — Os três fornecedores cobram metade em batch e descontam a entrada em cache, mas diferem nos limites, no tempo de resposta, no mínimo para a cache e na duração dela. *(fora do PDF)*
- [Gemini API: modelos, batch, cache, grounding e dados](ia/fornecedores/gemini-api.md) — O que a API do Gemini oferece para trabalho em lote, cache, pesquisa na web, saída estruturada, ficheiros e voz, e a diferença entre o escalão grátis e o pago no uso dos dados. *(fora do PDF)*
- [OpenAI API: batch, cache, saída estruturada e controlo de dados](ia/fornecedores/openai-api.md) — O que a API da OpenAI oferece para trabalho em lote, cache, saída estruturada, pesquisa em ficheiros e voz, e em que condições guarda os dados e os mantém na Europa. *(fora do PDF)*
- [Definição OSI de IA open source](ia/modelos-abertos/definicao-osi-de-ia-open-source.md) — Para a OSI, um sistema de IA só é open source se publicar informação sobre os dados de treino, o código de treino e execução, e os parâmetros; pesos abertos sozinhos não chegam. *(fora do PDF)*
- [Famílias de modelos abertos e licenças](ia/modelos-abertos/familias-de-modelos-abertos-e-licencas.md) — Pesos abertos não querem dizer licença aberta: a licença confirma-se modelo a modelo, porque a mesma família mistura Apache 2.0, licenças próprias e modelos só por API. *(fora do PDF)*
- [Adaptar um modelo (LoRA e QLoRA)](ia/modelos-proprios/adaptar-um-modelo-lora-e-qlora.md) — Em vez de treinar todos os pesos, treinam-se só matrizes pequenas por cima do modelo congelado; com quantização a 4 bits, um modelo de 65B afina-se numa só GPU de 48 GB. *(fora do PDF)*
- [Alinhamento (DPO) e destilação](ia/modelos-proprios/alinhamento-dpo-e-destilacao.md) — O DPO ajusta o modelo às preferências com uma perda de classificação simples, sem o ciclo de RLHF; a destilação passa o conhecimento de um modelo grande para um mais pequeno e barato de servir. *(fora do PDF)*
- [Construir um LLM do zero](ia/modelos-proprios/construir-um-llm-do-zero.md) — Para aprender, um portátil chega; para treinar um modelo de chat completo, o caminho mais curto documentado é o nanochat num nó de 8 GPUs H100, com custo e tempo indicados pelo autor. *(fora do PDF)*
- [Fine-tuning do Claude](ia/modelos-proprios/fine-tuning-do-claude.md) — O fine-tuning do Claude foi lançado no Amazon Bedrock para o Claude 3 Haiku, com throughput provisionado; a lista atual de modelos elegíveis não está confirmada. *(fora do PDF)*
- [Memória e hardware](ia/modelos-proprios/memoria-e-hardware.md) — A memória necessária estima-se antes de comprar ou alugar hardware; a estimativa cobre só os pesos, a inferência acrescenta até 20% e o treino multiplica várias vezes. *(fora do PDF)*
- [Obrigações do AI Act para modelos próprios](ia/modelos-proprios/obrigacoes-do-ai-act-para-modelos-proprios.md) — Quem treina um modelo de finalidade geral, ou o modifica com mais de um terço do compute de treino original, passa a ser fornecedor no AI Act, com documentação, política de direitos de autor e resumo público dos dados de treino. *(fora do PDF)*
- [Requisitos para ter um LLM próprio](ia/modelos-proprios/requisitos-para-ter-um-llm-proprio.md) — Há três caminhos (usar uma API, adaptar um modelo aberto, treinar de raiz) e cada um pede coisas diferentes em dados, hardware, equipa, custo e obrigações legais; começa-se pelo mais barato que cumpre o pedido. *(fora do PDF)*
- [Servir um modelo próprio](ia/modelos-proprios/servir-um-modelo-proprio.md) — Para servir em escala, o vLLM com API compatível com a da OpenAI e a da Anthropic; para correr em local ou em CPU, o llama.cpp ou o Ollama; o TGI da Hugging Face está em modo de manutenção. *(fora do PDF)*
- [Voz: síntese (TTS) e reconhecimento (STT)](ia/multimodal/voz-tts-e-stt.md) — Para narrar em português de Portugal sem custo há uma opção local (Piper, com vozes pt_PT) e um escalão gratuito na nuvem (Azure, com vozes pt-PT); a licença do motor, das vozes e do modelo decide o que se pode usar com clientes. *(fora do PDF)*
- [Gravação do browser com Playwright](ia/multimodal/gravacao-do-browser-com-playwright.md) — O Playwright grava o browser em WebM a partir de um contexto com `recordVideo`; o cursor, os títulos, as caixas, os cartões e as transições desenham-se na própria página, com um script de início, e ficam na gravação; para o zoom ficar nítido grava-se a 2x com a escala forçada do Chromium. *(fora do PDF)*
- [Montagem e exportação de vídeo com ffmpeg](ia/multimodal/montagem-e-exportacao-com-ffmpeg.md) — Sem instalar nada no sistema, o pacote npm `ffmpeg-static` traz o ffmpeg que alinha o áudio com a gravação pelos momentos escuros, corta os tempos mortos, faz o zoom em pós-produção, grava as legendas na imagem e exporta em MP4; a narração monta-se em Node a partir dos WAV de cada passo. *(fora do PDF)*
- [Gateway de LLM (LiteLLM)](ia/operacao/gateway-de-llm-litellm.md) — Um gateway põe todas as aplicações a falar com os modelos por um só ponto, com uma chave por aplicação ou pessoa, orçamento, limite de pedidos e custo registado por pedido. *(fora do PDF)*
- [Observabilidade de aplicações com LLM](ia/operacao/observabilidade-de-llm.md) — Cada chamada ao modelo e às ferramentas fica num trace com tokens, custo e resultado, para depurar, avaliar e comparar versões de prompts; há convenções abertas e ferramentas open source que se podem alojar. *(fora do PDF)*
- [Uso e custo da Claude API](ia/operacao/uso-e-custo-da-claude-api.md) — A organização lê por API os tokens e o custo em dólares, por modelo, workspace ou chave, com uma chave de administração; a Usage and Cost API passou a legacy e a recomendada para integrações novas é a Usage and Cost Analytics API. *(fora do PDF)*
- [Avaliar um RAG (RAGAS)](ia/rag/avaliar-rag-ragas.md) — Um RAG avalia-se em três partes separadas (o que se recuperou, a fidelidade da resposta ao que se recuperou e a qualidade da resposta), o que diz onde está a falha. *(fora do PDF)*
- [Embeddings e base vetorial](ia/rag/embeddings-e-base-vetorial.md) — A Anthropic não tem modelo de embeddings, por isso o fornecedor e a base vetorial são uma decisão à parte; o pgvector guarda os vetores no PostgreSQL que o projeto já tem. *(fora do PDF)*
- [Grafos mais leves (LightRAG e HippoRAG)](ia/rag/grafos-leves-lightrag-e-hipporag.md) — Alternativas ao GraphRAG que juntam grafo e vetores com menos chamadas ao LLM; os métodos com grafo podem ficar abaixo do RAG normal em perguntas factuais simples. *(fora do PDF)*
- [Memória de agentes (Mem0, Graphiti, A-MEM, Letta, memory tool)](ia/rag/memoria-de-agentes.md) — Um agente que trabalha durante semanas guarda o que aprendeu numa memória própria, em vez de reenviar a conversa inteira; isso baixa tokens e latência, e um grafo temporal regista como os factos mudam. *(fora do PDF)*
- [RAG adaptativo e autocorretivo (Self-RAG, CRAG, RAPTOR)](ia/rag/rag-adaptativo-e-autocorretivo.md) — Em vez de recuperar sempre o mesmo número de pedaços, o sistema decide quando recuperar, avalia o que recuperou e corrige; para documentos longos, recupera em vários níveis de resumo. *(fora do PDF)*
- [RAG de documentos visuais (ColPali)](ia/rag/rag-de-documentos-visuais-colpali.md) — Quando a informação está em tabelas, figuras ou na paginação, indexar a imagem da página evita a extração de texto e o que ela perde. *(fora do PDF)*
- [RAG em grafos (GraphRAG e LazyGraphRAG)](ia/rag/rag-em-grafos-graphrag.md) — Um grafo de entidades com resumos por comunidade responde a perguntas sobre o corpus inteiro, que a pesquisa vetorial não cobre; o preço é o custo de indexação, que a LazyGraphRAG baixa para o nível do RAG vetorial. *(fora do PDF)*
- [Recuperação contextual, pesquisa híbrida e reranking](ia/rag/rag-recuperacao-contextual-hibrida-e-reranking.md) — Antes de montar um RAG, vê-se se a base cabe no prompt; se não cabe, junta-se contexto a cada pedaço, pesquisa por palavras (BM25) com embeddings, e reranking. *(fora do PDF)*
- [Injeção de prompt: ameaças e mitigações](ia/seguranca/injecao-de-prompt-mitigacoes.md) — Há duas ameaças diferentes (o utilizador como atacante, ou conteúdo de terceiros que o modelo lê) e cada uma tem as suas mitigações; nenhuma camada sozinha resolve, por isso as defesas somam-se. *(fora do PDF)*
- [OWASP Top 10 para aplicações com LLM](ia/seguranca/owasp-top-10-llm.md) — A lista de referência dos dez riscos de uma aplicação com LLM, na versão de 2025, e os primeiros riscos publicados para agentes; serve de lista de verificação na revisão de segurança. *(fora do PDF)*

### 24. [Acesso remoto (SSH e RDP)](acesso-remoto/README.md) — ⚠️ fora do PDF (4 entradas)

- [Acesso por identidade, sem portas abertas](acesso-remoto/acesso-por-identidade-sem-portas-abertas.md) — Em vez de abrir as portas 22 ou 3389, o acesso passa por um serviço que valida a identidade, aplica políticas e regista as sessões: AWS Session Manager, Cloudflare Access for Infrastructure, Tailscale SSH ou Azure Bastion. *(fora do PDF)*
- [Inventário de acessos, sem segredos](acesso-remoto/inventario-de-acessos-sem-segredos.md) — Cada projeto mantém um inventário de quem acede a que servidor, por que via e com que método, revisto com regularidade, com as chaves e passwords guardadas num cofre e nunca no inventário. *(fora do PDF)*
- [RDP protegido](acesso-remoto/rdp-protegido.md) — O RDP não fica aberto diretamente à Internet: passa por um RD Gateway com MFA ou por um serviço como o Azure Bastion, e exige sempre Network Level Authentication. *(fora do PDF)*
- [SSH endurecido](acesso-remoto/ssh-endurecido.md) — No SSH entra-se só com chave (Ed25519, de preferência numa chave de hardware FIDO) ou certificado, nunca com password, sem login direto de root, só para os utilizadores autorizados e com o OpenSSH sempre na versão mais recente. *(fora do PDF)*

### 25. [Plataformas para adotar antes de construir](plataformas/README.md) — ⚠️ fora do PDF (15 entradas)

- [Adotar antes de construir](plataformas/adotar-antes-de-construir.md) — Para cada necessidade funcional procura-se primeiro uma plataforma open source que a resolva e a forma de a ligar ao resto (API, webhooks ou MCP); desenvolver de raiz é uma opção a comparar, não o ponto de partida. *(fora do PDF)*
- [Automação e integração (n8n, Node-RED)](plataformas/automacao-e-integracao.md) — Para ligar plataformas sem código à medida, o Node-RED (Apache 2.0) é open source e corre em qualquer lado; o n8n tem nós MCP oficiais e cloud, mas usa uma licença que o próprio projeto não chama open source. *(fora do PDF)*
- [BI e dashboards (Metabase, Superset)](plataformas/bi-e-dashboards.md) — Para relatórios e dashboards sobre dados que já existem, o Metabase (AGPLv3 na edição open source) e o Apache Superset (Apache 2.0) evitam escrever ecrãs de relatório à mão; os dois têm API REST, alertas por webhook e servidor MCP oficial. *(fora do PDF)*
- [CMS e headless (WordPress, Directus, Strapi)](plataformas/cms-e-headless.md) — Para sites e conteúdos, o WordPress (GPLv2+) é o CMS clássico com API REST; o Strapi (MIT, fora do `ee/`) e o Directus (licença MSCL, com restrições) são headless, com REST, GraphQL, webhooks e servidor MCP oficial. *(fora do PDF)*
- [ERP e CRM (Odoo, Dolibarr)](plataformas/erp-e-crm.md) — Para faturação, clientes, stocks e contabilidade, o Dolibarr (GPLv3) é totalmente open source, com API REST e webhooks; o Odoo tem uma edição Community (LGPLv3) e uma Enterprise proprietária, API JSON-2 e servidor MCP oficial. *(fora do PDF)*
- [Formulários e inquéritos (LimeSurvey)](plataformas/formularios-e-inqueritos.md) — Para inquéritos e formulários, o LimeSurvey (GPLv2+) corre em servidor próprio ou na cloud do projeto e integra-se pela API RemoteControl 2 (JSON-RPC); não tem webhooks nativos nem servidor MCP oficial. *(fora do PDF)*
- [Tickets, ativos e contratos (GLPI, Zammad)](plataformas/tickets-ativos-e-contratos.md) — Para helpdesk, inventário e gestão de contratos, o GLPI (GPLv3) cobre os três e tem API REST, webhooks e servidor MCP oficial; o Zammad (AGPLv3) é só helpdesk, com API REST e webhooks. *(fora do PDF)*
- [Armazenamento de ficheiros (MinIO, API S3)](plataformas/armazenamento-de-ficheiros.md) — Os ficheiros vão para armazenamento de objetos com API S3; o MinIO mudou de rumo (edição comunitária arquivada, documentação centrada no AIStor comercial), por isso a licença tem de se confirmar antes de adotar. *(fora do PDF)*
- [Autenticação e SSO (Keycloak, OpenID Connect)](plataformas/autenticacao-e-sso.md) — Antes de programar um login, adota-se um servidor de identidade: o Keycloak dá SSO, OpenID Connect, OAuth 2.0 e SAML 2.0 com licença Apache 2.0, e a aplicação só precisa de falar OpenID Connect. *(fora do PDF)*
- [Email: envio transacional e leitura de caixas de correio](plataformas/email-transacional-e-ingestao.md) — Enviar email passa por um serviço transacional com API e SMTP; ler caixas de correio para alimentar uma base de conhecimento passa pela API do Microsoft 365 ou do Gmail, com âmbitos só de leitura e sincronização incremental. *(fora do PDF)*
- [Feature flags e notificações (Unleash, Flagsmith, Novu)](plataformas/feature-flags-e-notificacoes.md) — Ligar funcionalidades por cliente ou por fase sem fazer outra versão do código, e enviar notificações por vários canais, são blocos que se adotam; as licenças do Unleash e do Flagsmith ainda precisam de confirmação. *(fora do PDF)*
- [Ferramentas internas e back office (Appsmith, Directus)](plataformas/ferramentas-internas.md) — Painéis de administração e ferramentas internas montam-se sobre a base de dados com um construtor open source, em vez de código à medida. *(fora do PDF)*
- [Pagamentos e faturação (Stripe Billing, Invoice Ninja)](plataformas/pagamentos-e-faturacao.md) — Subscrições, uso medido e faturas resolvem-se com uma plataforma de pagamentos; na faturação dita open source, a licença tem de se ler, porque «source available» não é open source. *(fora do PDF)*
- [Pesquisa (Meilisearch, Typesense)](plataformas/pesquisa.md) — Pesquisa de texto com tolerância a erros e facetas vem de um motor próprio; a licença do Meilisearch é dupla (MIT, e BUSL-1.1 na edição Enterprise) e a do Typesense não se conseguiu ler. *(fora do PDF)*
- [Tarefas em segundo plano (Temporal, BullMQ)](plataformas/tarefas-em-segundo-plano.md) — Trabalho que demora ou pode falhar sai do pedido HTTP para uma fila com repetições (BullMQ) ou para um motor de workflows duráveis que retoma onde parou (Temporal); ambos têm licença MIT. *(fora do PDF)*

### 26. [Modularização e produtização](produto/README.md) — ⚠️ fora do PDF (7 entradas)

- [Configuração fora do código (os doze fatores)](produto/configuracao-fora-do-codigo.md) — O que muda de instalação para instalação vive no ambiente, e os serviços de que a aplicação depende são recursos ligados que se trocam sem tocar no código. *(fora do PDF)*
- [Específico ou modular](produto/especifico-ou-modular.md) — Antes de construir, decide-se se o resultado serve um caso só ou vai ser reutilizado; a opção mais barata que cumpre o pedido é a certa, e abstrair sem um segundo caso à vista é custo sem retorno. *(fora do PDF)*
- [Feature flags (toggles)](produto/feature-flags.md) — Uma flag liga ou desliga um comportamento sem mudar o código instalado; há quatro tipos, e o de permissão é o que dá a um cliente uma funcionalidade que os outros não têm, sem copiar o projeto. *(fora do PDF)*
- [Modelos de projeto reutilizáveis (Cookiecutter e Copier)](produto/modelos-de-projeto-reutilizaveis.md) — Um modelo de projeto gera o segundo caso a partir do primeiro; a diferença entre as ferramentas está em se os projetos já gerados recebem as melhorias feitas depois ao modelo. *(fora do PDF)*
- [Multi-inquilino (modelos de tenancy)](produto/multi-inquilino.md) — Servir vários clientes com uma instalação partilhada é mais barato e mais arriscado do que uma instalação por cliente; a escolha depende do número de clientes previsto e é também uma decisão comercial. *(fora do PDF)*
- [Núcleo e adaptadores (arquitetura hexagonal)](produto/nucleo-e-adaptadores.md) — A aplicação fala com o exterior por portas, e cada dispositivo, base de dados ou cliente liga-se por um adaptador; o que é específico de um caso fica no adaptador e o núcleo mantém-se igual. *(fora do PDF)*
- [Versionamento e registo de alterações (SemVer, Conventional Commits, Keep a Changelog)](produto/versionamento-e-registo-de-alteracoes.md) — Um núcleo partilhado por vários casos precisa de um número de versão que diga se uma atualização parte alguma coisa, de commits que permitam derivar esse número e de um registo de alterações escrito para pessoas. *(fora do PDF)*

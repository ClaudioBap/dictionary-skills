# Fontes por tema

Sites oficiais que o agente de atualização percorre, por secção de `knowledge/`. Aprovados pelo dono do repositório; lista revista a 2026-11-04.

> Esta lista não é conteúdo do PDF. Alterações a esta lista seguem a mesma regra das alterações ao conhecimento: proposta, aprovação explícita e entrada no CHANGELOG.

## [Segurança](seguranca/README.md)

| Fonte | Para quê |
|---|---|
| [OWASP Cheat Sheet Series](https://cheatsheetseries.owasp.org/) | receitas práticas por tema de segurança aplicacional |
| [OWASP Top 10](https://top10.owasp.org/) | lista das falhas web mais críticas (edição atual: 2025) |
| [OWASP ASVS](https://asvs.owasp.org/) | requisitos e níveis de verificação de segurança aplicacional |
| [OWASP API Security Top 10](https://api-security.owasp.org/) | riscos principais específicos de APIs |
| [OWASP Session Management Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Session_Management_Cheat_Sheet.html) | Tempos, identificador, cookies e invalidação das sessões |
| [OWASP CSV Injection](https://owasp.org/www-community/attacks/CSV_Injection) | Exportação para CSV sem fórmulas |
| [OWASP Logging Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Logging_Cheat_Sheet.html) | O que registar e como proteger o registo |
| [OWASP Forgot Password Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Forgot_Password_Cheat_Sheet.html) | Tokens enviados por email: aleatórios, de uso único, com prazo, sem entrar sozinho |
| [RFC 9700: OAuth 2.0 Security Best Current Practice](https://datatracker.ietf.org/doc/html/rfc9700) | PKCE, state e URI de retorno exatos |
| [RFC 7636: PKCE](https://datatracker.ietf.org/doc/html/rfc7636) | Prova de posse do código em OAuth |
| [OpenID Connect Core 1.0](https://openid.net/specs/openid-connect-core-1_0.html) | Validação do id_token, amr e acr |
| [Entra: Conditional Access com MFA](https://learn.microsoft.com/en-us/entra/identity/conditional-access/policy-all-users-mfa-strength) | MFA do tenant por política |
| [Entra: security defaults](https://learn.microsoft.com/en-us/entra/fundamentals/security-defaults) | MFA sem licença extra |
| [Entra: fluxo de código de autorização](https://learn.microsoft.com/en-us/entra/identity-platform/v2-oauth2-auth-code-flow) | PKCE, state e nonce no Entra |
| [MITRE CWE](https://cwe.mitre.org/) | catálogo de fraquezas de software, com mitigação |
| [NIST CSRC](https://csrc.nist.gov/) | publicações NIST: autenticação, resposta a incidentes, SSDF, contentores |
| [ENISA](https://www.enisa.europa.eu/) | ameaças, publicações e orientações de cibersegurança da UE |
| [CNCS Portugal](https://www.cncs.gov.pt/) | referência nacional e incidentes (não lida: bloqueia acesso automático) |
| [EUR-Lex: Diretiva NIS2 (2022/2555)](https://eur-lex.europa.eu/eli/dir/2022/2555/oj) | entidades abrangidas, medidas mínimas e prazos de notificação de incidentes |
| [EUR-Lex: transposição da NIS2](https://eur-lex.europa.eu/legal-content/EN/NIM/?uri=CELEX:32022L2555) | medidas nacionais de cada Estado-Membro (em Portugal, o Decreto-Lei n.º 125/2025 e o Regulamento n.º 756/2026) |
| [Comissão Europeia: NIS2](https://digital-strategy.ec.europa.eu/en/policies/nis2-directive) | estado da diretiva e alterações propostas |
| [Comissão Europeia: NIS2 em Portugal](https://digital-strategy.ec.europa.eu/en/policies/nis2-directive-portugal) | ponto único de contacto e CSIRT nacional |
| [EUR-Lex: Cyber Resilience Act (2024/2847)](https://eur-lex.europa.eu/eli/reg/2024/2847/oj) | âmbito, datas, notificação e requisitos dos produtos com elementos digitais |
| [Comissão Europeia: notificação no CRA](https://digital-strategy.ec.europa.eu/en/policies/cra-reporting) | prazos e encaminhamento das notificações dos fabricantes |
| [ENISA: plataforma única de notificação do CRA](https://www.enisa.europa.eu/topics/product-security/vulnerability-services/eu-incident-response-and-cyber-crisis-management/single-reporting-platform-srp) | onde os fabricantes notificam e versões da plataforma |

## [Privacidade e conformidade](privacidade/README.md)

| Fonte | Para quê |
|---|---|
| [EUR-Lex: RGPD](https://eur-lex.europa.eu/eli/reg/2016/679/oj) | texto oficial |
| [EDPB](https://www.edpb.europa.eu/) | diretrizes europeias sobre RGPD, consentimento e cookies |
| [EDPB: guia para PME](https://www.edpb.europa.eu/sme-data-protection-guide/home_en) | guia prático de conformidade com o RGPD |
| [CNPD](https://www.cnpd.pt/) | autoridade portuguesa: orientações, AIPD, violações de dados |
| [CNPD: Diretriz/2023/1](https://www.cnpd.pt/umbraco/surface/cnpdDecision/download/122048) | medidas organizativas e de segurança dos tratamentos de dados pessoais (PDF) |
| [Comissão Europeia: RGPD](https://commission.europa.eu/law/law-topic/data-protection/information-business-and-organisations/principles-gdpr_en) | explicações oficiais de princípios, fundamentos e direitos |

## [Fiabilidade e resiliência](fiabilidade/README.md)

| Fonte | Para quê |
|---|---|
| [Google SRE books](https://sre.google/books/) | SLO, orçamento de erro, falhas em cascata, prática de SRE |
| [AWS Well-Architected – Reliability](https://docs.aws.amazon.com/wellarchitected/latest/reliability-pillar/welcome.html) | Boas práticas de fiabilidade: idempotência, retries, DR testado |
| [Azure Well-Architected – Reliability](https://learn.microsoft.com/en-us/azure/well-architected/reliability/) | Metas, testes de resiliência, recuperação de desastre, padrões |
| [Azure Architecture Center – padrões](https://learn.microsoft.com/en-us/azure/architecture/patterns/) | Circuit breaker, retry, bulkhead e outros padrões de resiliência |
| [Documentação k6](https://grafana.com/docs/k6/latest/) | Tipos de teste de carga e utilização da ferramenta |
| [Documentação Gatling](https://docs.gatling.io/) | Testes de carga com Gatling |
| [Documentação Locust](https://docs.locust.io/en/stable/) | Testes de carga com Locust |
| [Google SRE Book: Monitoring Distributed Systems](https://sre.google/sre-book/monitoring-distributed-systems/) | Os quatro sinais dourados da monitorização |
| [Google SRE Book: Postmortem Culture](https://sre.google/sre-book/postmortem-culture/) | Postmortem sem culpa |
| [Azure Well-Architected: Operational Excellence checklist](https://learn.microsoft.com/en-us/azure/well-architected/operational-excellence/checklist) | Lista de verificação de excelência operacional (OE:01 a OE:11) |
| [OpenTelemetry: What is OpenTelemetry?](https://opentelemetry.io/docs/what-is-opentelemetry/) | Padrão aberto de telemetria: traces, métricas e logs |
| [CISA: Back up business data](https://www.cisa.gov/audiences/small-and-medium-businesses/secure-your-business/back-up-business-data) | Regra 3-2-1 das cópias de segurança |
| [Keep a Changelog 1.1.0](https://keepachangelog.com/en/1.1.0/) | Registo de alterações legível por pessoas |
| [Prometheus: Instrumentation](https://prometheus.io/docs/practices/instrumentation/) | Tarefas em lote: a hora do último sucesso como métrica principal |
| [Prometheus: Alerting](https://prometheus.io/docs/practices/alerting/) | Alerta de uma tarefa em lote com margem de duas corridas completas |
| [AWS Well-Architected: OPS07-BP03 Use runbooks](https://docs.aws.amazon.com/wellarchitected/latest/operational-excellence-pillar/ops_ready_to_support_use_runbooks.html) | Runbooks no controlo de versões e atualizados com frequência (página de referência histórica) |

## [Design e experiência de utilizador](design/README.md)

| Fonte | Para quê |
|---|---|
| [W3C WAI – WCAG](https://www.w3.org/WAI/standards-guidelines/wcag/) | Versão atual da WCAG e critérios de acessibilidade |
| [AMA – acessibilidade.gov.pt](https://www.acessibilidade.gov.pt/) | Acessibilidade no setor público português (não lida: bloqueia acesso automático) |
| [MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web) | Referência de CSS, HTML, APIs, PWA e desempenho |
| [web.dev](https://web.dev/) | Core Web Vitals, orçamentos de desempenho, caching, imagens |
| [GOV.UK Design System](https://design-system.service.gov.uk/) | Componentes e padrões: formulários, erros, navegação |
| [GOV.UK Service Manual](https://www.gov.uk/service-manual) | Melhoria progressiva e boas práticas de serviço digital |
| [Nielsen Norman Group](https://www.nngroup.com/articles/) | Heurísticas e investigação de UX |
| [OWASP Cheat Sheet Series](https://cheatsheetseries.owasp.org/) | Autorização no servidor e registo de ações administrativas |
| [W3C WAI-ARIA Authoring Practices Guide (APG)](https://www.w3.org/WAI/ARIA/apg/patterns/) | Padrões de componentes acessíveis, como disclosure e accordion (grupos que abrem e fecham) |
| [Material Design 3: Motion](https://m3.material.io/styles/motion/overview/how-it-works) | Princípios e durações do movimento na interface (não lida: só mostra texto depois de correr JavaScript) |
| [Your Europe: requisitos de acessibilidade](https://europa.eu/youreurope/business/selling-in-eu/selling-goods-services/accessibility/index_en.htm) | Ato Europeu da Acessibilidade: o que abrange, desde quando e exceções |
| [Comissão Europeia: European Accessibility Act](https://commission.europa.eu/strategy-and-policy/policies/justice-and-fundamental-rights/disability/union-equality-strategy-rights-persons-disabilities-2021-2030/european-accessibility-act_en) | Produtos e serviços abrangidos pela Diretiva (UE) 2019/882 |
| [mosaico.gov.pt: Decreto-Lei n.º 82/2022](https://mosaico.gov.pt/legislacao-e-regulamentos/decreto-lei-82-2022) | Transposição portuguesa do Ato Europeu da Acessibilidade |
| [Diário da República: Decreto-Lei n.º 82/2022](https://diariodarepublica.pt/dr/detalhe/decreto-lei/82-2022-204379872) | Texto do diploma (não lida: só mostra texto depois de correr JavaScript) |
| [EUR-Lex: Diretiva (UE) 2019/882](https://eur-lex.europa.eu/eli/dir/2019/882/oj) | Texto da diretiva (não lida: bloqueia acesso automático) |
| [Lighthouse CI: configuração](https://github.com/GoogleChrome/lighthouse-ci/blob/main/docs/configuration.md) | Asserções do orçamento de desempenho no CI |
| [Chrome for Developers: Lighthouse 10](https://developer.chrome.com/blog/lighthouse-10-0) | Métricas do Lighthouse (o TTI saiu na versão 10) |
| [Lighthouse: Score Variability](https://github.com/GoogleChrome/lighthouse/blob/main/docs/variability.md) | Variação entre corridas e a mediana de 5 corridas |

## [3D, WebGL e animação](3d-webgl/README.md)

| Fonte | Para quê |
|---|---|
| [MDN WebGL API](https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API) | Base técnica do 3D no browser; aponta three.js |
| [Manual do Three.js](https://threejs.org/manual/) | Guias oficiais: compatibilidade, limpeza, render a pedido, glTF |
| [Documentação React Three Fiber](https://r3f.docs.pmnd.rs/getting-started/introduction) | Three.js como componentes React; desempenho e armadilhas |
| [Khronos glTF](https://www.khronos.org/gltf/) | Especificação do formato 3D de entrega para runtime |
| [glTF Transform](https://gltf-transform.dev/) | Otimização e compressão de modelos glTF |
| [MDN prefers-reduced-motion](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion) | Respeitar a preferência de movimento reduzido |
| [WCAG 2.2 — 2.3.3](https://www.w3.org/WAI/WCAG22/Understanding/animation-from-interactions.html) | Critério de acessibilidade para animação desencadeada por interação |
| [GSAP ScrollTrigger](https://gsap.com/docs/v3/Plugins/ScrollTrigger/) | Animação ligada ao scroll, pinning e scrub |
| [Claude Code: referência de hooks](https://code.claude.com/docs/en/hooks) | Eventos de sessão, skill e subagente que alimentam um mundo 3D de agentes |

## [SEO e descoberta](seo/README.md)

| Fonte | Para quê |
|---|---|
| [Google — title links](https://developers.google.com/search/docs/appearance/title-link) | Um <title> distinto e descritivo por página |
| [Google — canonical](https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls) | Consolidar URLs duplicados com rel="canonical" |
| [Google — sitemaps](https://developers.google.com/search/docs/crawling-indexing/sitemaps/overview) | Para que serve o sitemap no rastreio |
| [Google — robots.txt](https://developers.google.com/search/docs/crawling-indexing/robots/intro) | Controlar rastreio; não impede indexação |
| [Google — links rastreáveis](https://developers.google.com/search/docs/crawling-indexing/links-crawlable) | Páginas alcançáveis por <a href> |
| [Google — Core Web Vitals](https://developers.google.com/search/docs/appearance/core-web-vitals) | Relação entre Core Web Vitals e pesquisa |
| [Google — dados estruturados](https://developers.google.com/search/docs/appearance/structured-data/intro-structured-data) | JSON-LD e vocabulário schema.org |
| [Open Graph protocol](https://ogp.me/) | Metadados de partilha og:title, og:type, og:image, og:url |
| [Google — noindex](https://developers.google.com/search/docs/crawling-indexing/block-indexing) | Tirar páginas dos resultados sem as bloquear no robots.txt |
| [Google — controlar o que se partilha](https://developers.google.com/search/docs/crawling-indexing/control-what-you-share) | Palavra-passe para o conteúdo privado, noindex para o resto |
| [Google — versões localizadas](https://developers.google.com/search/docs/specialty/international/localized-versions) | hreflang recíproco e x-default em sites com várias línguas |

## [Desenho de API](api/README.md)

| Fonte | Para quê |
|---|---|
| [RFC 9110 HTTP Semantics](https://www.rfc-editor.org/rfc/rfc9110.html) | Semântica normativa de métodos e códigos de estado HTTP |
| [RFC 9457 Problem Details](https://www.rfc-editor.org/rfc/rfc9457.html) | Formato normalizado de erro para APIs HTTP |
| [RFC 9745 Deprecation header](https://www.rfc-editor.org/rfc/rfc9745.html) | Sinalizar depreciação de recursos por cabeçalho HTTP |
| [OpenAPI Specification](https://spec.openapis.org/oas/latest.html) | Contrato de APIs HTTP legível por pessoas e máquinas |
| [OpenAPI — Best Practices](https://learn.openapis.org/best-practices.html) | Design-first, fonte única, CI contra desvios |
| [OpenAPI — esquemas oficiais](https://spec.openapis.org/oas/) | Validar o documento OpenAPI contra o esquema da sua versão |
| [Pact](https://docs.pact.io/) | Testes de contrato consumidor–fornecedor |
| [OWASP API4:2023](https://api-security.owasp.org/editions/2023/en/0xa4-unrestricted-resource-consumption) | Limites de paginação, taxa e tamanho de payload |
| [GraphQL — Security](https://graphql.org/learn/security/) | Profundidade, complexidade, trusted documents, rate limiting |

## [Base de dados](base-de-dados/README.md)

| Fonte | Para quê |
|---|---|
| [PostgreSQL — Constraints](https://www.postgresql.org/docs/current/ddl-constraints.html) | PK, FK com ações, NOT NULL, UNIQUE, CHECK |
| [PostgreSQL — Índices](https://www.postgresql.org/docs/current/indexes.html) | Tipos de índice, custo e uso |
| [PostgreSQL — EXPLAIN](https://www.postgresql.org/docs/current/using-explain.html) | Ler o plano de execução |
| [PostgreSQL — Isolamento](https://www.postgresql.org/docs/current/transaction-iso.html) | Níveis de isolamento e falhas de serialização |
| [PostgreSQL — Backup e restauro](https://www.postgresql.org/docs/current/backup.html) | Estratégias de backup: dump, ficheiros, arquivo contínuo |
| [SQL Server — Backup e restauro](https://learn.microsoft.com/en-us/sql/relational-databases/backup-restore/back-up-and-restore-of-sql-server-databases) | Testar restauro, cifrar, guardar separado |
| [OWASP SQL Injection Prevention](https://cheatsheetseries.owasp.org/cheatsheets/SQL_Injection_Prevention_Cheat_Sheet.html) | Queries parametrizadas e menor privilégio |
| [Flyway — Migrations](https://documentation.red-gate.com/fd/migrations-271585107.html) | Migrações versionadas com tabela de histórico |
| [Microsoft Learn: big data architectures](https://learn.microsoft.com/en-us/azure/architecture/databases/guide/big-data-architectures) | Quando os dados deixam de caber numa base tradicional; lote, fluxo, Lambda, Kappa, lakehouse |
| [Microsoft Learn: arquitetura medalhão](https://learn.microsoft.com/en-us/azure/databricks/lakehouse/medallion) | Camadas bronze, prata e ouro |
| [Apache Spark: documentação](https://spark.apache.org/docs/latest/) | Motor de processamento em lote e em fluxo; versão atual |
| [Delta Lake: documentação](https://docs.delta.io/latest/index.html) | Formato de tabela com ACID e viagem no tempo; compatibilidade com o Spark |
| [Apache Iceberg: documentação](https://iceberg.apache.org/docs/latest/) | Formato de tabela aberto e a sua especificação |
| [Apache Parquet: visão geral](https://parquet.apache.org/docs/overview/) | Formato de ficheiro colunar |
| [Apache Kafka: introdução](https://kafka.apache.org/intro) | Eventos, tópicos, partições e retenção |
| [Microsoft Fabric: visão geral](https://learn.microsoft.com/en-us/fabric/fundamentals/microsoft-fabric-overview) | O que é o Fabric e as suas cargas |
| [Microsoft Fabric: OneLake](https://learn.microsoft.com/en-us/fabric/onelake/onelake-overview) | Armazenamento único, formatos Delta e Iceberg, atalhos e espelho |
| [Microsoft Fabric: licenças e capacidade](https://learn.microsoft.com/en-us/fabric/enterprise/licenses) | SKUs F, trial, licenças por utilizador |
| [Microsoft Fabric: segurança](https://learn.microsoft.com/en-us/fabric/security/security-overview) | Camadas de acesso, OneLake security, rede e cifra |
| [Microsoft Fabric: novidades](https://learn.microsoft.com/en-us/fabric/fundamentals/whats-new) | Lista mensal de novidades do Fabric |
| [MongoDB: manual](https://www.mongodb.com/docs/manual/) | Modelo de dados, índices, agregação, transações, réplicas, sharding e segurança |
| [MongoDB Atlas](https://www.mongodb.com/docs/atlas/) | Serviço gerido: escalões, limites do Free e backups |
| [MongoDB: ciclos de vida](https://www.mongodb.com/legal/support-policy/lifecycles) | Datas de lançamento e de fim de vida das versões |
| [Cloudflare D1: Pricing](https://developers.cloudflare.com/d1/platform/pricing/) | Linhas lidas como medida de custo e o teto do plano Free |
| [Cloudflare D1: Metrics and analytics](https://developers.cloudflare.com/d1/observability/metrics-analytics/) | Linhas lidas por query e o `wrangler d1 insights` |

## [Boas práticas de Python](python/README.md)

| Fonte | Para quê |
|---|---|
| [Python downloads](https://www.python.org/downloads/) | versões ativas, datas de lançamento e fim de suporte |
| [What's New in Python](https://docs.python.org/3/whatsnew/index.html) | novidades por versão da linguagem |
| [PEP 8](https://peps.python.org/pep-0008/) | guia oficial de estilo e nomes |
| [typing](https://docs.python.org/3/library/typing.html) | referência de type hints |
| [Ruff](https://docs.astral.sh/ruff/) | linter e formatador (substitui Black, isort, flake8) |
| [mypy](https://mypy.readthedocs.io/en/stable/getting_started.html) | verificação estática de tipos |
| [pytest good practices](https://docs.pytest.org/en/stable/explanation/goodpractices.html) | organização de projeto e testes |
| [Security Considerations](https://docs.python.org/3/library/security_warnings.html) | módulos da stdlib com avisos de segurança |
| [pip-audit](https://pypi.org/project/pip-audit/) | auditoria de vulnerabilidades nas dependências |
| [Bandit](https://bandit.readthedocs.io/en/latest/) | análise estática de segurança do código Python |

## [Boas práticas de Java](java/README.md)

| Fonte | Para quê |
|---|---|
| [Java SE Documentation](https://docs.oracle.com/en/java/javase/) | versões do JDK (atual JDK 27; LTS JDK 25) |
| [Java SE 25 API](https://docs.oracle.com/en/java/javase/25/docs/api/java.base/java/util/Optional.html) | Javadoc oficial das classes da plataforma |
| [Java Tutorials](https://docs.oracle.com/javase/tutorial/essential/exceptions/tryResourceClose.html) | convenções e tutoriais oficiais (escritos para JDK 8) |
| [JUnit User Guide](https://docs.junit.org/current/user-guide/) | framework de testes (versão atual 6) |
| [SLF4J manual](https://www.slf4j.org/manual.html) | fachada de logging |
| [Maven dependency mechanism](https://maven.apache.org/guides/introduction/introduction-to-dependency-mechanism.html) | dependencyManagement e BOM |
| [OWASP Deserialization](https://cheatsheetseries.owasp.org/cheatsheets/Deserialization_Cheat_Sheet.html) | desserialização segura em Java |
| [OWASP Dependency-Check](https://dependency-check.github.io/DependencyCheck/) | vulnerabilidades conhecidas nas dependências (plugins Maven e Gradle) |

## [Boas práticas de C#](csharp/README.md)

| Fonte | Para quê |
|---|---|
| [The history of C#](https://learn.microsoft.com/en-us/dotnet/csharp/whats-new/csharp-version-history) | versões da linguagem e novidades |
| [What's new in C# 15](https://learn.microsoft.com/en-us/dotnet/csharp/whats-new/csharp-15) | novidades do C# 15, lançado com o .NET 11 em novembro de 2026 |
| [.NET Coding Conventions](https://learn.microsoft.com/en-us/dotnet/csharp/fundamentals/coding-style/coding-conventions) | convenções oficiais de código C# |
| [Code analysis in .NET](https://learn.microsoft.com/en-us/dotnet/fundamentals/code-analysis/overview) | analisadores Roslyn, .editorconfig, warnings como erros |
| [Best practices for exceptions](https://learn.microsoft.com/en-us/dotnet/standard/exceptions/best-practices-for-exceptions) | tratamento de exceções em .NET |
| [Unit testing best practices](https://learn.microsoft.com/en-us/dotnet/core/testing/unit-testing-best-practices) | testes unitários em .NET |
| [OWASP .NET Security](https://cheatsheetseries.owasp.org/cheatsheets/DotNet_Security_Cheat_Sheet.html) | segurança em .NET |
| [dotnet package list](https://learn.microsoft.com/en-us/dotnet/core/tools/dotnet-package-list) | pacotes vulneráveis (`--vulnerable`) |
| [Auditing package dependencies](https://learn.microsoft.com/en-us/nuget/concepts/auditing-packages) | auditoria do NuGet no restore |
| [dotnet/core releases-index.json](https://raw.githubusercontent.com/dotnet/core/main/release-notes/releases-index.json) | fases e datas de fim de suporte de cada versão do .NET |

## [Boas práticas de JavaScript](javascript/README.md)

| Fonte | Para quê |
|---|---|
| [MDN: JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript) | Referência da linguagem e das APIs web |
| [web.dev: Baseline](https://web.dev/baseline) | Que funcionalidades já são seguras em todos os browsers |
| [TC39: propostas](https://github.com/tc39/proposals) | Novidades da linguagem a caminho do standard |
| [Blog do TypeScript](https://devblogs.microsoft.com/typescript/) | Lançamentos e mudanças do TypeScript |
| [TypeScript: release notes](https://www.typescriptlang.org/docs/handbook/release-notes/overview.html) | Funcionalidades por versão do TypeScript |
| [Blog do ESLint](https://eslint.org/blog/) | Lançamentos e mudanças de regras do ESLint |
| [OWASP: prevenção de XSS](https://cheatsheetseries.owasp.org/cheatsheets/Cross_Site_Scripting_Prevention_Cheat_Sheet.html) | Segurança de JavaScript no browser |

## [Boas práticas de Node.js](node/README.md)

| Fonte | Para quê |
|---|---|
| [Blog do Node.js](https://nodejs.org/en/blog) | Lançamentos e anúncios do Node.js |
| [Node.js: avisos de segurança](https://nodejs.org/en/blog/vulnerability) | Vulnerabilidades e versões corrigidas |
| [Node.js: versões](https://nodejs.org/en/about/previous-releases) | Estado LTS e fim de suporte de cada versão |
| [Node.js: calendário de releases](https://github.com/nodejs/Release) | Datas de LTS, manutenção e EOL |
| [Documentação do npm](https://docs.npmjs.com/) | Comandos e configuração do npm |
| [GitHub changelog: npm](https://github.blog/changelog/label/npm/) | Novidades do npm e do registo |
| [npm CLI: CHANGELOG](https://github.com/npm/cli/blob/latest/CHANGELOG.md) | Mudanças incompatíveis de cada versão do npm |
| [OWASP: segurança em Node.js](https://cheatsheetseries.owasp.org/cheatsheets/Nodejs_Security_Cheat_Sheet.html) | Boas práticas de segurança em Node.js |

## [Boas práticas de Rust](rust/README.md)

| Fonte | Para quê |
|---|---|
| [Rust Blog (feed Atom oficial)](https://blog.rust-lang.org/feed.xml) | versões estáveis e anúncios com data; ler por aqui |
| [The Rust Book](https://doc.rust-lang.org/book/) | posse, erros, testes, concorrência e o ciclo de lançamentos |
| [Cargo Book](https://doc.rust-lang.org/cargo/) | manifesto, Cargo.lock, resolver, perfis, features, workspaces e [lints] |
| [Edition Guide](https://doc.rust-lang.org/edition-guide/) | edições e migração com `cargo fix --edition` |
| [Rust API Guidelines](https://rust-lang.github.io/api-guidelines/) | nomes, erros e a lista para bibliotecas públicas |
| [Clippy](https://doc.rust-lang.org/clippy/) | grupos de lints e uso no CI |
| [rustfmt](https://github.com/rust-lang/rustfmt) | formatação e `cargo fmt --check` |
| [Rustonomicon](https://doc.rust-lang.org/nomicon/) | `unsafe`, Send e Sync |
| [Async Book](https://rust-lang.github.io/async-book/) | código assíncrono |
| [rustup: overrides](https://rust-lang.github.io/rustup/overrides.html) | `rust-toolchain.toml` e precedência |
| [Tokio: spawn_blocking](https://docs.rs/tokio/latest/tokio/task/fn.spawn_blocking.html) | trabalho bloqueante fora do runtime |
| [tracing](https://github.com/tokio-rs/tracing) | logging estruturado |
| [log](https://github.com/rust-lang/log) | fachada de logging da rust-lang |
| [RustSec (feed Atom oficial)](https://rustsec.org/feed.xml) | avisos de segurança dos crates; ler por aqui |
| [cargo-audit (releases)](https://github.com/rustsec/rustsec/releases) | versões do `cargo audit` |
| [cargo-deny](https://github.com/EmbarkStudios/cargo-deny) | avisos, licenças, crates proibidos e origens |
| [candle (releases)](https://github.com/huggingface/candle/releases) | versões do candle (Hugging Face) |
| [burn (releases)](https://github.com/tracel-ai/burn/releases) | versões do burn (tem pré-lançamentos) |
| [mistral.rs (releases)](https://github.com/EricLBuehler/mistral.rs/releases) | versões do mistral.rs e do servidor compatível com a OpenAI |
| [ort](https://github.com/pykeio/ort) | ligações ao ONNX Runtime e quando sai a 2.0 estável |
| [PyO3 (releases)](https://github.com/PyO3/pyo3/releases) | versões do PyO3 e versões mínimas de Rust e Python |
| [maturin: distribuição](https://www.maturin.rs/distribution.html) | wheels, manylinux e publicação |
| [SDKs da Anthropic](https://platform.claude.com/docs/en/cli-sdks-libraries/overview) | se aparece um SDK oficial em Rust |
| [Bibliotecas da OpenAI](https://developers.openai.com/api/docs/libraries) | SDKs oficiais e da comunidade |
| [SDKs do MCP](https://modelcontextprotocol.io/docs/sdk) | nível e estado do SDK oficial `rmcp` |

## [Estrutura e documentação](estrutura/README.md)

| Fonte | Para quê |
|---|---|
| [Diátaxis](https://diataxis.fr/) | Separar tipos de documentação segundo a necessidade de quem lê |
| [ADR (adr.github.io)](https://adr.github.io/) | O que é um ADR e o registo de decisões |
| [Documenting Architecture Decisions (Nygard)](https://www.cognitect.com/blog/2011/11/15/documenting-architecture-decisions) | Origem do ADR: numerados, no repositório, marcados como substituídos |
| [Keep a Changelog](https://keepachangelog.com/en/1.1.0/) | Registo de alterações escrito para pessoas, não um dump do git |
| [Claude Code: CLAUDE.md e memória](https://code.claude.com/docs/en/memory) | Ficheiro de regras do projeto para agentes, versionado |
| [Claude Code: referência de hooks](https://code.claude.com/docs/en/hooks) | Hooks PreToolUse que bloqueiam escritas ou comandos perigosos |
| [AGENTS.md](https://agents.md/) | Formato aberto de instruções para agentes na raiz do repositório |
| [pre-commit](https://pre-commit.com/) | Hooks do git declarados num ficheiro versionado, também no CI |
| [GitHub spec-kit](https://github.com/github/spec-kit) | Especificação antes do código: especificar, planear, tarefas, implementar |
| [Claude Code: best practices](https://code.claude.com/docs/en/best-practices) | Prova por comando e saída; regras sem exceção em hooks |
| [C4 model](https://c4model.com/) | Diagramas de arquitetura em quatro níveis |
| [Development Containers](https://containers.dev/) | Ambiente de desenvolvimento reproduzível em contentor |

## [CI/CD e ferramentas](cicd/README.md)

| Fonte | Para quê |
|---|---|
| [Continuous Integration (Fowler)](https://martinfowler.com/articles/continuousIntegration.html) | Práticas de CI: integrar diariamente, build auto-testado e rápido |
| [Continuous Delivery (Fowler)](https://martinfowler.com/bliki/ContinuousDelivery.html) | Distinção entre entrega e implantação contínuas |
| [GitHub Actions: Secure use reference](https://docs.github.com/en/actions/security-for-github-actions/security-guides/security-hardening-for-github-actions) | Fixar ações por SHA, token mínimo, segredos fora dos logs |
| [GitHub: protected branches](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-protected-branches/about-protected-branches) | Verificações e aprovações obrigatórias antes do merge |
| [GitHub: environments](https://docs.github.com/en/actions/deployment/targeting-different-environments/managing-environments-for-deployment) | Ambientes com aprovadores, branches permitidos e segredos próprios |
| [SLSA Build Track](https://slsa.dev/spec/v1.2/build-track-basics) | Níveis de proveniência e builds em plataforma alojada |
| [Sigstore cosign](https://docs.sigstore.dev/cosign/signing/overview/) | Assinatura de imagens e artefactos |
| [OpenSSF Scorecard](https://scorecard.dev/) | Avaliar dependências fixadas, permissões de token, proteção de branches |
| [The Practical Test Pyramid (Fowler)](https://martinfowler.com/articles/practical-test-pyramid.html) | Camadas de testes e quantos ter em cada uma |
| [GitHub: deployments and environments](https://docs.github.com/en/actions/reference/workflows-and-actions/deployments-and-environments) | Que branches podem publicar num ambiente e regras de proteção |
| [GitHub Actions: OpenID Connect](https://docs.github.com/en/actions/concepts/security/openid-connect) | Tokens de nuvem de curta duração por job, em vez de segredos guardados |
| [GitHub Actions: workflow syntax](https://docs.github.com/en/actions/reference/workflows-and-actions/workflow-syntax) | Permissões do `GITHUB_TOKEN` e grupos de concorrência (`cancel-in-progress`) |
| [GitHub: keeping your actions up to date with Dependabot](https://docs.github.com/en/code-security/dependabot/working-with-dependabot/keeping-your-actions-up-to-date-with-dependabot) | O Dependabot a propor as versões novas das ações dos workflows |
| [GitHub Changelog: Node 20 nos runners](https://github.blog/changelog/2025-09-19-deprecation-of-node-20-on-github-actions-runners/) | O Node 24 por omissão nos runners a partir de 16 de junho de 2026 |

## [Docker e orquestração](docker/README.md)

| Fonte | Para quê |
|---|---|
| [Docker build best practices](https://docs.docker.com/build/building/best-practices/) | Regras oficiais para Dockerfile: multi-stage, digest, non-root, .dockerignore |
| [Docker Compose docs](https://docs.docker.com/compose/) | Referência oficial para stacks multi-serviço num ficheiro YAML |
| [Docker Swarm mode](https://docs.docker.com/engine/swarm/) | Orquestração nativa do Docker: réplicas, overlay, rolling updates |
| [Kubernetes docs](https://kubernetes.io/docs/concepts/overview/) | Conceitos oficiais: estado desejado, objetos, configuração declarativa |
| [Kubernetes releases](https://kubernetes.io/releases/) | Versões mantidas e datas de fim de suporte |
| [Helm docs](https://helm.sh/docs/intro/using_helm/) | Empacotamento de recursos Kubernetes em charts |
| [Argo CD docs](https://argo-cd.readthedocs.io/en/stable/) | Entrega GitOps declarativa para Kubernetes |
| [Trivy (Aqua Security)](https://github.com/aquasecurity/trivy) | Scan de vulnerabilidades, segredos e misconfigurações em imagens |
| [Kubernetes: Liveness, Readiness and Startup Probes](https://kubernetes.io/docs/concepts/configuration/liveness-readiness-startup-probes/) | Definições oficiais das três sondas de saúde |
| [Kubernetes: Deployments](https://kubernetes.io/docs/concepts/workloads/controllers/deployment/) | Rollback com rollout undo, histórico de revisões e prazo de progresso |
| [Docker Engine security](https://docs.docker.com/engine/security/) | Retirar todas as capacidades Linux menos as necessárias |
| [Docker: running containers](https://docs.docker.com/engine/containers/run/) | Capacidades, privilégios e opções de execução |

## [Serviços de infraestrutura](infraestrutura/README.md)

| Fonte | Para quê |
|---|---|
| [AWS SSM Session Manager](https://docs.aws.amazon.com/systems-manager/latest/userguide/session-manager.html) | Acesso a servidores sem bastion, portas abertas ou chaves SSH |
| [Teleport docs](https://goteleport.com/docs/) | Acesso a infraestrutura por identidade, com auditoria de sessões |
| [Tailscale](https://tailscale.com/kb/1151/what-is-tailscale) | Rede de confiança zero sobre WireGuard |
| [PostgreSQL](https://www.postgresql.org/about/) | Base relacional aberta; documentação atual é a versão 19 |
| [Valkey](https://valkey.io/) | Armazém chave-valor BSD da Linux Foundation |
| [Grafana Alerting](https://grafana.com/docs/grafana/latest/alerting/) | Alertas a partir de várias fontes de dados |
| [OpenBao](https://openbao.org/) | Gestor de segredos aberto, fork comunitário do Vault |
| [Keycloak](https://www.keycloak.org/) | Servidor de identidade aberto com SSO, OIDC e SAML |

## [Soberania digital](soberania/README.md)

| Fonte | Para quê |
|---|---|
| [Data Act explained (CE)](https://digital-strategy.ec.europa.eu/en/policies/data-act-explained) | Mudança de fornecedor de nuvem, portabilidade, fim de custos de saída |
| [Regulamento (UE) 2023/2854 (Data Act)](https://eur-lex.europa.eu/eli/reg/2023/2854/oj) | Texto legal sobre mudança entre serviços de tratamento de dados |
| [RGPD (UE) 2016/679](https://eur-lex.europa.eu/eli/reg/2016/679/oj) | Texto legal: minimização, registo de tratamentos, AIPD |
| [EDPB, guia para PME](https://www.edpb.europa.eu/sme-data-protection-guide/data-protection-basics_en) | Princípios do RGPD explicados: minimização e limitação da conservação |
| [CNPD: AIPD](https://www.cnpd.pt/organizacoes/outras-obrigacoes/avaliacao-de-impacto/) | Quando a AIPD é obrigatória em Portugal |
| [Gaia-X](https://gaia-x.eu/) | Infraestrutura de dados federada europeia e soberania de dados |
| [OpenID Foundation](https://openid.net/developers/how-connect-works/) | Norma OIDC para identidade sem amarra a fornecedor |
| [Decisões de adequação (CE)](https://commission.europa.eu/law/law-topic/data-protection/international-dimension-data-protection/adequacy-decisions_en) | Países para onde os dados pessoais circulam sem outras garantias |
| [Cláusulas contratuais-tipo (CE)](https://commission.europa.eu/law/law-topic/data-protection/international-dimension-data-protection/standard-contractual-clauses-scc_en) | Garantias para transferências para países sem adequação |
| [Uso seguro do GitHub Actions](https://docs.github.com/en/actions/reference/security/secure-use) | Riscos dos runners self-hosted em repositórios públicos |

## [Governação e processo](governacao/README.md)

| Fonte | Para quê |
|---|---|
| [GitHub protected branches](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-protected-branches/about-protected-branches) | Revisões, status checks e restrição de pushes no branch principal |
| [GitHub rulesets](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-rulesets/about-rulesets) | Regras de push, eliminação e renomeação de branches e tags |
| [Semantic Versioning 2.0.0](https://semver.org/) | Regras MAJOR.MINOR.PATCH |
| [Keep a Changelog 1.1.0](https://keepachangelog.com/en/1.1.0/) | Formato e princípios de um CHANGELOG |
| [Conventional Commits 1.0.0](https://www.conventionalcommits.org/en/v1.0.0/) | Commits estruturados para gerar CHANGELOG e versão |
| [Open Source Guides: governação](https://opensource.guide/leadership-and-governance/) | Equipa núcleo, admin de reserva, GOVERNANCE.md |
| [CNPD: AIPD](https://www.cnpd.pt/organizacoes/outras-obrigacoes/avaliacao-de-impacto/) | Obrigação de DPIA (AIPD) em Portugal |

## [Nuvem e identidade (AWS, Azure, Microsoft, OVH)](nuvem/README.md)

| Fonte | Para quê |
|---|---|
| [AWS What's New](https://aws.amazon.com/new/) | novidades oficiais de serviços, funcionalidades e regiões AWS (não lida: só mostra texto depois de correr JavaScript) |
| [Azure updates](https://azure.microsoft.com/en-us/updates) | novidades oficiais de produtos e funcionalidades Azure (não lida: só mostra texto depois de correr JavaScript) |
| [AWS What's New (feed RSS oficial)](https://aws.amazon.com/about-aws/whats-new/recent/feed/) | Novidades da AWS com data; ler por aqui |
| [Azure updates (feed RSS oficial)](https://www.microsoft.com/releasecommunications/api/v2/azure/rss) | Novidades do Azure com data; ler por aqui |
| [Microsoft Entra releases](https://learn.microsoft.com/en-us/entra/fundamentals/whats-new) | novidades, depreciações e mudanças futuras do Entra |
| [Google Cloud release notes](https://docs.cloud.google.com/release-notes) | alterações recentes (60 dias) dos serviços Google Cloud |
| [Microsoft 365 Roadmap](https://www.microsoft.com/en-us/microsoft-365/roadmap) | datas previstas de funcionalidades Microsoft 365 (agora focado em IA) |
| [AWS Well-Architected](https://docs.aws.amazon.com/wellarchitected/latest/framework/welcome.html) | boas práticas de arquitetura e revisão de cargas na AWS |
| [Azure Well-Architected](https://learn.microsoft.com/en-us/azure/well-architected/) | pilares e ferramentas de revisão de arquitetura Azure |
| [Entra: register an application](https://learn.microsoft.com/en-us/entra/identity-platform/quickstart-register-app) | Registo de aplicações, tipos de conta, client ID |
| [Entra: OpenID Connect](https://learn.microsoft.com/en-us/entra/identity-platform/v2-protocols-oidc) | Authority v2.0, descoberta, scopes, logout |
| [Entra: add credentials](https://learn.microsoft.com/en-us/entra/identity-platform/how-to-add-credentials) | Certificado vs segredo, validade dos segredos |
| [Entra: security best practices for app registration](https://learn.microsoft.com/en-us/entra/identity-platform/security-best-practices-for-app-registration) | Redirect URIs, credenciais, menor privilégio |
| [Entra: ID token claims](https://learn.microsoft.com/en-us/entra/identity-platform/id-token-claims-reference) | Que claim identifica o utilizador (oid, sub, tid) |
| [MSAL overview](https://learn.microsoft.com/en-us/entra/identity-platform/msal-overview) | Bibliotecas oficiais por linguagem |
| [Entra licensing](https://learn.microsoft.com/en-us/entra/fundamentals/licensing) | O que vem no Free, P1 e P2 |

## [Sessões, orquestração e custo-eficiência](custo/README.md)

| Fonte | Para quê |
|---|---|
| [FinOps Principles](https://www.finops.org/framework/principles/) | princípios oficiais FinOps: responsabilidade, valor, dados acessíveis |
| [AWS Cost Optimization Pillar](https://docs.aws.amazon.com/wellarchitected/latest/cost-optimization-pillar/welcome.html) | práticas oficiais AWS de otimização de custo |
| [Azure WAF Cost Optimization](https://learn.microsoft.com/en-us/azure/well-architected/cost-optimization/) | princípios, checklist e guias Azure de otimização de custo |
| [AWS Budgets](https://docs.aws.amazon.com/cost-management/latest/userguide/budgets-managing-costs.html) | orçamentos e alertas de custo na AWS |

## [Publicação e alojamento web](publicacao/README.md)

| Fonte | Para quê |
|---|---|
| [Limites do GitHub Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/github-pages-limits) | tamanho, banda, builds e usos proibidos do GitHub Pages |
| [Preços Cloudflare Workers](https://developers.cloudflare.com/workers/platform/pricing/) | limites do plano grátis e mínimo do plano pago |
| [Changelog Cloudflare](https://developers.cloudflare.com/changelog/) | novidades de Workers, Pages e Tunnel (tem RSS) |
| [Planos por créditos Netlify](https://docs.netlify.com/manage/accounts-and-billing/billing/billing-for-credit-based-plans/credit-based-pricing-plans/) | créditos incluídos e custo por recurso |
| [Plano Hobby Vercel](https://vercel.com/docs/plans/hobby) | uso incluído e restrição não comercial |
| [Changelog Vercel](https://vercel.com/changelog) | alterações de planos e preços da Vercel |
| [Render Free](https://render.com/docs/free) | adormecimento, horas grátis e expiração do Postgres |
| [Changelog Render](https://render.com/changelog) | alterações de planos e do escalão grátis |
| [FAQ AWS Free Tier](https://aws.amazon.com/free/free-tier-faqs/) | créditos, duração e apagamento de contas Free |
| [Google Cloud Free](https://docs.cloud.google.com/free/docs/free-cloud-features) | crédito de teste, Free Tier e regiões elegíveis |
| [Cloudflare changelog](https://developers.cloudflare.com/changelog/) | Novidades de WAF, SSL, DNS, Access e Registrar |
| [Planos Cloudflare](https://www.cloudflare.com/plans/) | Preços e funcionalidades Free, Pro, Business, Enterprise |
| [Cloudflare Access planos](https://www.cloudflare.com/zero-trust/products/access/) | Limite de utilizadores do plano Free do Access |
| [Let's Encrypt news](https://letsencrypt.org/blog/) | Mudanças de validade, perfis ACME e ARI |
| [CA/Browser Forum posts](https://cabforum.org/posts/) | Ballots que alteram Baseline Requirements e EV Guidelines |
| [OWASP CRS releases](https://github.com/coreruleset/coreruleset/releases) | Novas versões e LTS do Core Rule Set |
| [Coraza releases](https://github.com/corazawaf/coraza/releases) | Novas versões do motor WAF Coraza |
| [Bunny Shield planos](https://bunny.net/shield/) | Preços e limites da alternativa europeia de WAF |
| [Hostinger VPS](https://www.hostinger.com/vps-hosting) | Planos KVM, preço promocional e de renovação, cópias de segurança e centros de dados |

## [Acesso remoto (SSH e RDP)](acesso-remoto/README.md)

| Fonte | Para quê |
|---|---|
| [OpenSSH release notes](https://www.openssh.org/releasenotes.html) | versões do OpenSSH, correções de segurança e depreciações |
| [OpenSSH security](https://www.openssh.org/security.html) | vulnerabilidades corrigidas por versão |
| [sshd_config(5)](https://man.openbsd.org/sshd_config) | opções e valores por omissão do servidor SSH |
| [ssh-keygen(1)](https://man.openbsd.org/ssh-keygen) | tipos de chave, chaves FIDO e certificados SSH |
| [NIST IR 7966](https://csrc.nist.gov/pubs/ir/7966/final) | gestão de acessos e chaves SSH numa organização |
| [NIST SP 800-46 Rev. 2](https://csrc.nist.gov/pubs/sp/800/46/r2/final) | segurança do acesso remoto e teletrabalho |
| [Permitir acesso por Remote Desktop](https://learn.microsoft.com/en-us/windows-server/remote/remote-desktop-services/clients/remote-desktop-allow-access) | NLA e condições do acesso RDP |
| [RD Gateway role](https://learn.microsoft.com/en-us/windows-server/remote/remote-desktop-services/remote-desktop-gateway-role) | RDP através da Internet sem expor as máquinas |
| [RD Gateway com Entra MFA](https://learn.microsoft.com/en-us/entra/identity/authentication/howto-mfa-nps-extension-rdg) | MFA no RD Gateway pela extensão NPS |
| [Azure Bastion](https://learn.microsoft.com/en-us/azure/bastion/bastion-overview) | RDP/SSH para VMs sem IP público; SKUs |
| [AWS Session Manager](https://docs.aws.amazon.com/systems-manager/latest/userguide/session-manager.html) | acesso sem portas abertas, bastion nem chaves SSH |
| [Cloudflare: aplicações não-HTTP](https://developers.cloudflare.com/cloudflare-one/access-controls/applications/non-http/) | SSH/RDP atrás do Access, certificados de curta duração |
| [Tailscale SSH](https://tailscale.com/kb/1193/tailscale-ssh) | SSH por identidade na tailnet, check mode e gravação |
| [Tailscale: preços](https://tailscale.com/pricing) | Planos da rede privada (Personal grátis, Standard, Premium, Enterprise) e o que cada um inclui |
| [OWASP Secrets Management Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Secrets_Management_Cheat_Sheet.html) | cofre e ciclo de vida dos segredos |

## [Plataformas para adotar antes de construir](plataformas/README.md)

| Fonte | Para quê |
|---|---|
| [GLPI (releases)](https://github.com/glpi-project/glpi/releases) | versões do GLPI |
| [GLPI AI 2.0](https://www.glpi-project.org/en/glpi-ai-2-0-plugin/) | servidor MCP oficial e condições de subscrição |
| [Preços GLPI Network](https://www.glpi-project.org/en/pricing/) | preços da cloud GLPI |
| [Zammad (releases)](https://zammad.com/en/product/releases/7-2-2) | versões do Zammad |
| [Licenças Odoo](https://www.odoo.com/documentation/20.0/legal/licenses.html) | Community LGPLv3 e Enterprise |
| [Odoo MCP](https://www.odoo.com/documentation/20.0/applications/productivity/ai/mcp_server.html) | servidor MCP oficial e requisitos |
| [Preços Odoo](https://www.odoo.com/pricing) | planos e o que inclui a API externa |
| [Dolibarr (releases)](https://github.com/Dolibarr/dolibarr/releases) | versões e estado do MCP experimental |
| [Node-RED (releases)](https://github.com/node-red/node-red/releases) | versões do Node-RED |
| [WordPress MCP Adapter](https://github.com/WordPress/mcp-adapter) | pacote MCP oficial do WordPress |
| [Licença Directus](https://directus.com/mscl) | MSCL e passagem a GPL |
| [Directus MCP](https://directus.com/docs/guides/ai/mcp) | servidor MCP integrado |
| [Strapi MCP](https://docs.strapi.io/cms/features/strapi-mcp-server) | servidor MCP integrado |
| [Preços Strapi Cloud](https://strapi.io/pricing-cloud) | preços da cloud (não lida: bloqueia acesso automático) |
| [Metabase MCP](https://www.metabase.com/docs/latest/ai/mcp) | servidor MCP oficial |
| [Preços Metabase](https://www.metabase.com/pricing/) | planos da cloud |
| [Superset MCP](https://superset.apache.org/admin-docs/6.1.0/configuration/mcp-server/) | servidor MCP integrado |
| [LimeSurvey RemoteControl 2](https://www.limesurvey.org/manual/RemoteControl_2_API) | API JSON-RPC |
| [Preços LimeSurvey](https://www.limesurvey.org/pricing) | planos da cloud |
| [Keycloak](https://www.keycloak.org/) | Servidor de identidade: SSO, OIDC, OAuth 2.0, SAML 2.0 |
| [OpenID Foundation: How OpenID Connect Works](https://openid.net/developers/how-connect-works/) | Definição do protocolo OpenID Connect |
| [Postmark: Developer e Pricing](https://postmarkapp.com/pricing) | Envio transacional: limites e preços por plano |
| [Brevo Developers](https://developers.brevo.com/) | Messaging API (email, SMS, WhatsApp); escalão grátis por confirmar |
| [Microsoft Graph: Outlook mail API](https://learn.microsoft.com/en-us/graph/api/resources/mail-api-overview) | Leitura de caixas de correio do Microsoft 365, delta query e subscrições |
| [Gmail API: scopes](https://developers.google.com/workspace/gmail/api/auth/scopes) | Âmbitos de leitura do Gmail |
| [Stripe Billing](https://docs.stripe.com/billing) | Subscrições, uso medido e faturas |
| [Invoice Ninja (repositório)](https://github.com/invoiceninja/invoiceninja) | Faturação source available (Elastic License) |
| [Temporal: Why Temporal](https://docs.temporal.io/evaluate/why-temporal) | Workflows duráveis (MIT) |
| [BullMQ](https://docs.bullmq.io/) | Filas de trabalhos em Node (MIT) |
| [Meilisearch docs e LICENSE](https://github.com/meilisearch/meilisearch/blob/main/LICENSE) | Motor de pesquisa; licença MIT e BUSL-1.1 |
| [Typesense docs](https://typesense.org/docs/) | Motor de pesquisa; licença por confirmar |
| [MinIO AIStor docs](https://docs.min.io/enterprise/aistor-object-store/) | Armazenamento de objetos com API S3; licença AIStor por ler |
| [Unleash docs](https://docs.getunleash.io/) | Feature flags; licença AGPL v3 por confirmar |
| [Flagsmith docs](https://docs.flagsmith.com/) | Feature flags; licença por confirmar |
| [Novu docs](https://docs.novu.co/) | Notificações multicanal (MIT) |
| [Appsmith docs](https://docs.appsmith.com/) | Ferramentas internas (Apache 2.0) |

## [Construir com IA](ia/README.md)

| Fonte | Para quê |
|---|---|
| [Anthropic Newsroom](https://www.anthropic.com/news) | novidades oficiais da Anthropic (modelos, produtos, parcerias) |
| [Claude Platform release notes](https://platform.claude.com/docs/en/release-notes/overview) | alterações da API, modelos, betas e depreciações |
| [OpenAI News](https://openai.com/news/) | novidades oficiais da OpenAI (não lida: bloqueia acesso automático) |
| [OpenAI API changelog](https://developers.openai.com/api/docs/changelog) | alterações de modelos e API da OpenAI |
| [AI Act (Comissão Europeia)](https://digital-strategy.ec.europa.eu/en/policies/regulatory-framework-ai) | calendário de aplicação do AI Act e alterações do Omnibus |
| [Regulamento (UE) 2024/1689](https://eur-lex.europa.eu/eli/reg/2024/1689/oj) | texto legal oficial do AI Act (não lida: bloqueia acesso automático) |
| [European AI Office](https://digital-strategy.ec.europa.eu/en/policies/ai-office) | supervisão europeia e regras para modelos de finalidade geral |
| [ANACOM – Inteligência Artificial](https://www.anacom.pt/render.jsp?contentId=1816215) | autoridade portuguesa apontada para o Regulamento da IA (não lida: bloqueia acesso automático) |
| [AI Act Service Desk: artigo 50.º](https://ai-act-service-desk.ec.europa.eu/en/ai-act/article-50) | Obrigações de transparência: marcar e divulgar conteúdo gerado por IA |
| [EDPB Statement 3/2024](https://www.edpb.europa.eu/our-work-tools/our-documents/statements/statement-32024-data-protection-authorities-role-artificial_en) | papel das autoridades de proteção de dados no AI Act |
| [NIST AI RMF](https://www.nist.gov/itl/ai-risk-management-framework) | gestão de risco de IA, incl. perfil de IA generativa |
| [OECD.AI](https://oecd.ai/en/) | observatório de políticas, dados e análise sobre IA |
| [Anthropic Economic Index](https://www.anthropic.com/economic-index) | efeitos da IA na economia e na adoção |
| [Anthropic Research](https://www.anthropic.com/research) | investigação: alinhamento, economia, interpretabilidade, red-teaming |
| [Anthropic system cards](https://www.anthropic.com/system-cards) | avaliações de segurança por modelo Claude |
| [OpenAI Deployment Safety Hub](https://deploymentsafety.openai.com/) | system cards e avaliações de segurança dos modelos OpenAI |
| [OpenAI News (feed RSS oficial)](https://openai.com/news/rss.xml) | Notícias da OpenAI com data de publicação; ler por aqui |
| [OpenAI Academy](https://academy.openai.com/) | Cursos da OpenAI; vigiar lançamento de certificação |
| [graphrag no PyPI](https://pypi.org/project/graphrag/) | Versões e estado do Microsoft GraphRAG |
| [HKUDS/LightRAG](https://github.com/HKUDS/LightRAG) | Versões e alterações do LightRAG |
| [OSU-NLP-Group/HippoRAG](https://github.com/OSU-NLP-Group/HippoRAG) | Versões do HippoRAG |
| [Claude: Embeddings](https://platform.claude.com/docs/en/build-with-claude/embeddings) | Fornecedores e modelos de embeddings recomendados pela Anthropic |
| [pgvector CHANGELOG](https://github.com/pgvector/pgvector/blob/master/CHANGELOG.md) | Versões do pgvector |
| [mem0ai/mem0](https://github.com/mem0ai/mem0) | Versões do Mem0 (memória de agentes) |
| [getzep/graphiti](https://github.com/getzep/graphiti) | Versões do Graphiti (grafo temporal para memória de agentes) |
| [letta-ai/letta](https://github.com/letta-ai/letta) | Versões do Letta (agentes com estado) |
| [Claude: Memory tool](https://platform.claude.com/docs/en/agents-and-tools/tool-use/memory-tool) | Memory tool da Claude Platform |
| [Claude: boas práticas de skills](https://platform.claude.com/docs/en/agents-and-tools/agent-skills/best-practices) | Régua de autoria de skills: limites do name e da description, 500 linhas, referências, avaliações |
| [MCP: especificação](https://modelcontextprotocol.io/specification/latest) | Versão atual da especificação MCP |
| [Gemini API: modelos](https://aistudio.google.com/docs/models) | Modelos Gemini, estado e descontinuações |
| [Gemini API: preços](https://aistudio.google.com/docs/pricing) | Preços do Gemini, batch, cache e grounding |
| [vLLM](https://docs.vllm.ai) | Servir modelos próprios (servidor compatível com OpenAI e Anthropic) |
| [llama.cpp](https://github.com/ggml-org/llama.cpp) | Inferência local em CPU e GPU, quantização |
| [Ollama](https://github.com/ollama/ollama) | Correr modelos abertos localmente |
| [Hugging Face TRL](https://huggingface.co/docs/trl) | Treino SFT, DPO e GRPO |
| [Hugging Face PEFT](https://huggingface.co/docs/peft) | Fine-tuning eficiente (LoRA) |
| [karpathy/nanochat](https://github.com/karpathy/nanochat) | Treinar um LLM de raiz, de ponta a ponta |
| [rasbt/LLMs-from-scratch](https://github.com/rasbt/LLMs-from-scratch) | Construir um LLM de raiz, capítulo a capítulo |
| [Mistral: modelos](https://docs.mistral.ai/models/) | Modelos Mistral e licença de cada um |
| [Mistral: preços](https://docs.mistral.ai/inference/pricing) | Preços da API Mistral por modelo, batch, cache e inferência regional na UE |
| [Gemma: termos](https://gemma.ai/resources/terms/) | Licença dos modelos Gemma |
| [OSI: Open Source AI Definition](https://opensource.org/ai/open-source-ai-definition) | O que conta como IA open source |
| [Comissão Europeia: perguntas e respostas sobre modelos GPAI](https://digital-strategy.ec.europa.eu/en/faqs/general-purpose-ai-models-ai-act-questions-answers) | Quem é fornecedor de um modelo de finalidade geral e o que deve |
| [Código de Conduta GPAI](https://digital-strategy.ec.europa.eu/en/policies/contents-code-gpai) | Transparência, direitos de autor e segurança para fornecedores de modelos |
| [A2A: especificação](https://a2a-protocol.org/latest/specification/) | Protocolo entre agentes, versões |
| [OWASP Top 10 para LLM](https://genai.owasp.org/llm-top-10/) | Riscos de segurança de aplicações com LLM e de agentes |
| [OWASP Top 10 for Agentic Applications 2026](https://genai.owasp.org/resource/owasp-top-10-for-agentic-applications-for-2026/) | Os dez riscos de aplicações agênticas, ASI01 a ASI10 |
| [LiteLLM](https://docs.litellm.ai) | Gateway de LLM com orçamentos e chaves virtuais |
| [Langfuse](https://langfuse.com/docs) | Observabilidade, avaliação e gestão de prompts |
| [Piper: vozes](https://huggingface.co/rhasspy/piper-voices) | Vozes TTS locais, incluindo pt_PT |
| [Azure AI Speech: preços](https://azure.microsoft.com/en-us/pricing/details/cognitive-services/speech-services/) | Escalão grátis de TTS e STT |
| [abliteration.ai](https://abliteration.ai/) | Modelos sem restrições por API, compatíveis com a OpenAI e a Anthropic (Claude Code); política de dados declarada pelo fornecedor |
| [abliteration.ai: preços](https://abliteration.ai/pricing) | Planos, créditos pré-pagos e preço por milhão de tokens dos modelos sem restrições |
| [Ollama: preços](https://ollama.com/pricing) | Execução local sem limite, planos e preço por token da nuvem Ollama, e onde ficam os modelos |
| [Fish Audio: planos](https://fish.audio/plan/) | Planos da aplicação de voz e uso comercial em cada um |
| [Fish Audio: preços da API](https://docs.fish.audio/developer-guide/models-pricing/pricing-and-rate-limits) | Preço por modelo de voz e de transcrição, promoções e limites de pedidos em simultâneo |
| [Chatterbox pt-PT (Resemble AI)](https://huggingface.co/ResembleAI/Chatterbox-Multilingual-pt-pt) | Modelo de voz aberto afinado para português de Portugal, licença e ficheiros |
| [Kokoro-82M: vozes](https://huggingface.co/hexgrad/Kokoro-82M/blob/main/VOICES.md) | Línguas e vozes do Kokoro |
| [kokoro.js](https://github.com/hexgrad/kokoro/tree/main/kokoro.js) | Kokoro em Node (pacote kokoro-js): licença, uso e vozes |
| [Piper: vozes en_GB](https://huggingface.co/rhasspy/piper-voices/tree/main/en/en_GB) | Vozes inglesas do Piper e licença do dataset de cada uma |
| [Wikimedia Commons: API](https://commons.wikimedia.org/w/api.php) | Licença, autor e texto de atribuição de cada ficheiro de música |
| [incompetech: licenças](https://incompetech.com/music/royalty-free/licenses/) | Licenças da música de Kevin MacLeod, gratuita com crédito ou paga |
| [Pixabay: resumo da licença](https://pixabay.com/service/license-summary/) | Uso comercial e proibições do conteúdo da Pixabay, também música |
| [Pixabay: termos](https://pixabay.com/service/terms/) | Termos completos da licença da Pixabay |
| [Playwright: Authentication](https://playwright.dev/docs/auth) | Guardar e reabrir sessões com login (storageState) e o que fica de fora (sessionStorage) |
| [XTTS-v2: licença](https://huggingface.co/coqui/XTTS-v2/blob/main/LICENSE.txt) | Termos da Coqui Public Model License (só uso não comercial) |
| [Google Cloud TTS: preços](https://cloud.google.com/text-to-speech/pricing) | Escalão grátis por tipo de voz, preço por milhão de caracteres e preço do Gemini TTS |
| [Google Cloud TTS: vozes](https://cloud.google.com/text-to-speech/docs/list-voices-and-types) | Vozes pt-PT disponíveis por tipo |
| [Amazon Polly: preços](https://aws.amazon.com/polly/pricing/) | Escalão grátis e preço por tipo de voz |
| [Amazon Polly: perguntas frequentes](https://aws.amazon.com/polly/faqs/) | Uso dos dados, região, opt-out e direitos sobre o áudio |
| [ElevenLabs: preços](https://elevenlabs.io/pricing) | Planos, créditos por carácter e licença comercial por plano |
| [ElevenLabs: residência de dados](https://elevenlabs.io/docs/overview/administration/data-residency) | Onde ficam os dados e residência na UE |
| [OpenAI: text to speech](https://developers.openai.com/api/docs/guides/text-to-speech) | Modelos de voz, línguas, aviso de voz gerada por IA e descontinuação |
| [Azure: API de preços de retalho](https://prices.azure.com/api/retail/prices?currencyCode=EUR) | Preço por região das vozes neurais e HD, em euros |
| [Claude Code: execução sem interface](https://code.claude.com/docs/en/headless) | `claude -p`, stream-json, `--resume` e permissões numa corrida sem interface |
| [Claude Code: variáveis de ambiente](https://code.claude.com/docs/en/env-vars) | `CLAUDE_CONFIG_DIR` por conta e as chaves que ganham ao login da subscrição |
| [Codex: modo não interativo](https://learn.chatgpt.com/docs/non-interactive-mode) | `codex exec`, eventos JSONL, `resume` e sandbox por omissão |
| [Codex: variáveis de ambiente](https://learn.chatgpt.com/codex/config-file/environment-variables) | `CODEX_HOME` por conta e credenciais para automação |
| [Codex: configuração avançada](https://learn.chatgpt.com/docs/config-file/config-advanced) | `--oss`, `oss_provider` e fornecedores próprios com `base_url` |
| [Ollama: Codex](https://docs.ollama.com/integrations/codex) | Ligar o Codex ao Ollama e o contexto mínimo para o Codex |
| [Ollama: tamanho do contexto](https://docs.ollama.com/context-length) | Contexto por omissão pela memória da placa e como o mudar |
| [Ollama: tool calling](https://docs.ollama.com/capabilities/tool-calling) | Chamadas a ferramentas nos modelos do Ollama |
| [Mistral Vibe: CLI](https://docs.mistral.ai/vibe/code/cli) | Instalação, chave e configuração do Vibe |
| [Mistral Vibe: trabalhar na CLI](https://docs.mistral.ai/vibe/code/cli/work-with-cli) | Modo sem interface, formatos de saída, retoma e códigos de saída |
| [Mistral Vibe: segurança e aprovações](https://docs.mistral.ai/vibe/code/safety-approvals-permissions) | Políticas de aprovação e o que se recusa sem interface |
| [Anthropic: Consumer Terms](https://www.anthropic.com/legal/consumer-terms) | Contas pessoais, partilha de credenciais e acesso automatizado |
| [OpenAI: Terms of Use (Europa)](https://openai.com/policies/eu-terms-of-use/) | Partilha de contas e limites nos serviços da OpenAI |

## [Modularização e produtização](produto/README.md)

| Fonte | Para quê |
|---|---|
| [Yagni (Fowler)](https://martinfowler.com/bliki/Yagni.html) | Não construir o que ainda não é preciso |
| [MonolithFirst (Fowler)](https://martinfowler.com/bliki/MonolithFirst.html) | Começar por um sistema só, modular por dentro |
| [MicroservicePrerequisites (Fowler)](https://martinfowler.com/bliki/MicroservicePrerequisites.html) | O que é preciso ter antes de dividir em serviços |
| [Hexagonal architecture (Cockburn)](https://alistair.cockburn.us/hexagonal-architecture/) | Núcleo isolado de dispositivos e bases de dados por portas e adaptadores |
| [The Twelve-Factor App](https://12factor.net) | Configuração no ambiente e serviços de apoio como recursos ligados |
| [Azure Architecture Center: tenancy models](https://learn.microsoft.com/en-us/azure/architecture/guide/multitenant/considerations/tenancy-models) | Modelos de multi-inquilino e os seus compromissos |
| [Semantic Versioning](https://semver.org) | Regras de versão maior, menor e correção |
| [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) | Formato de commit que liga ao SemVer |
| [Feature Toggles (Hodgson)](https://martinfowler.com/articles/feature-toggles.html) | Categorias de flags e quando usar cada uma |
| [Cookiecutter](https://cookiecutter.readthedocs.io) | Gerar projetos a partir de um modelo |
| [Copier](https://copier.readthedocs.io) | Modelos de projeto que atualizam os projetos gerados |
| [Stripe Entitlements](https://docs.stripe.com/billing/entitlements) | Direitos por funcionalidade ligados à subscrição; webhook e leitura dos direitos ativos |
| [OpenFeature Specification](https://openfeature.dev/specification/) | Padrão aberto de avaliação de flags: contexto, targeting key e valor por omissão |
| [OWASP Top 10:2025, A01](https://top10.owasp.org/2025/A01_2025-Broken_Access_Control/) | Controlo de acesso no servidor e negar por omissão |

## [Portais e mundos de agentes](portais-de-agentes/README.md)

| Fonte | Para quê |
|---|---|
| [Claude Code: hooks](https://code.claude.com/docs/en/hooks) | Eventos e entrada dos hooks, `async`, `PermissionRequest`, `SubagentStart` e `SubagentStop`, `Notification`, `PostToolUse` e `additionalContext` |
| [Claude Code: skills](https://code.claude.com/docs/en/skills) | Onde as skills vivem, precedência, frontmatter e `metadata` |
| [Claude Code: sub-agents](https://code.claude.com/docs/en/sub-agents) | Subagentes e a ferramenta Agent |
| [Claude Code: plugins loading](https://code.claude.com/docs/en/plugins/loading) | De onde vêm as skills dos plugins |
| [Claude Code: settings](https://code.claude.com/docs/en/settings) | Âmbitos dos ficheiros onde se registam os hooks |
| [Claude Code: permissions](https://code.claude.com/docs/en/permissions) | Regras de permissão e o campo `if` dos hooks |
| [Claude Code: permission modes](https://code.claude.com/docs/en/permission-modes) | Modo manual e automático, também com `-p` |
| [Claude Code: sessions](https://code.claude.com/docs/en/sessions) | Ciclo de vida e retoma das sessões |
| [Claude Code: CLI reference](https://code.claude.com/docs/en/cli-reference) | Correr o `claude` como subprocesso |
| [Claude Code: authentication](https://code.claude.com/docs/en/authentication) | Ordem das credenciais (subscrição, chave de API, tokens) |
| [Claude Code: legal and compliance](https://code.claude.com/docs/en/legal-and-compliance) | Uso de credenciais de subscrição e de chaves de API |
| [Claude Agent SDK: overview](https://code.claude.com/docs/en/agent-sdk/overview) | Agent SDK e credenciais de subscrição |
| [Claude Code: Remote Control](https://code.claude.com/docs/en/remote-control) | Alternativa oficial a um portal próprio |
| [Cloudflare Access: application token](https://developers.cloudflare.com/cloudflare-one/access-controls/applications/http-apps/authorization-cookie/application-token/) | A identidade que o token traz (email, `common_name`) |
| [Cloudflare Access: validar o JWT](https://developers.cloudflare.com/cloudflare-one/access-controls/applications/http-apps/authorization-cookie/validating-json/) | Validar o token no servidor |
| [Cloudflare Access: service tokens](https://developers.cloudflare.com/cloudflare-one/access-controls/service-credentials/service-tokens/) | Um token por PC e a revogação |
| [Cloudflare Access: políticas](https://developers.cloudflare.com/cloudflare-one/access-controls/policies/) | Allow, Service Auth e seletores |
| [Cloudflare Access: MFA](https://developers.cloudflare.com/cloudflare-one/access-controls/policies/mfa-requirements/) | Segundo fator pelo fornecedor ou pelo Access |
| [Cloudflare Access: GitHub como fornecedor de identidade](https://developers.cloudflare.com/cloudflare-one/integrations/identity-providers/github/) | Entrar com a conta do GitHub |
| [git-remote](https://git-scm.com/docs/git-remote) | O `origin`, `get-url` e as formas de endereço |
| [git-clone](https://git-scm.com/docs/git-clone) | Formas de endereço e `insteadOf` |
| [git-worktree](https://git-scm.com/docs/git-worktree) | Configuração partilhada pelas worktrees |
| [git-rev-list](https://git-scm.com/docs/git-rev-list) | O primeiro commit como identificador |
| [GitHub CLI: gh auth status](https://cli.github.com/manual/gh_auth_status) | Contas git ligadas no PC, sem tokens |
| [WCAG 2.2](https://www.w3.org/TR/WCAG22/) | Uso da cor (1.4.1), contraste não textual (1.4.11) e alvos de toque (2.5.5, 2.5.8) |
| [MDN: Push API](https://developer.mozilla.org/en-US/docs/Web/API/Push_API) | Avisos no telemóvel |
| [RFC 8292 (VAPID)](https://www.rfc-editor.org/rfc/rfc8292) | Identificar o servidor que envia avisos |
| [RFC 8030 (Web Push)](https://www.rfc-editor.org/rfc/rfc8030) | Protocolo dos avisos |
| [MDN: SubtleCrypto.generateKey()](https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/generateKey) | Chave do browser não exportável |
| [MDN: SubtleCrypto.exportKey()](https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/exportKey) | O que uma chave não exportável recusa |
| [MDN: SubtleCrypto](https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto) | Guardar chaves no browser |
| [Microsoft Learn: CryptProtectData](https://learn.microsoft.com/en-us/windows/win32/api/dpapi/nf-dpapi-cryptprotectdata) | Cifrar o cofre local com a conta do Windows |
| [Microsoft Learn: ProtectedData](https://learn.microsoft.com/en-us/dotnet/api/system.security.cryptography.protecteddata) | O mesmo, a partir do .NET |
| [MDN: SubtleCrypto.sign()](https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/sign) | Formato da assinatura ECDSA do browser (`r` e `s` seguidos) |
| [Node.js: crypto](https://nodejs.org/api/crypto.html) | Verificar no servidor a assinatura do browser com `dsaEncoding` |
| [MDN: What is a URL?](https://developer.mozilla.org/en-US/docs/Learn_web_development/Howto/Web_mechanics/What_is_a_URL) | O fragmento depois de `#` não vai ao servidor |
| [Claude Code: managed settings](https://code.claude.com/docs/en/managed-settings) | Pasta das definições e das skills geridas em cada sistema |

## [n8n](n8n/README.md)

| Fonte | Para quê |
|---|---|
| [n8n (releases)](https://github.com/n8n-io/n8n/releases) | versões das linhas 1.x, 2.x e 3.x e as etiquetas stable e beta |
| [Release notes do n8n](https://docs.n8n.io/release-notes/) | novidades por versão e qual é a stable e a beta |
| [Blog do n8n (feed RSS oficial)](https://blog.n8n.io/rss/) | anúncios e «New in n8n» com data; ler por aqui |
| [Avisos de segurança do n8n](https://github.com/n8n-io/n8n/security/advisories) | gravidade, versões afetadas e corrigidas (não há feed) |
| [Licença n8n](https://docs.n8n.io/n8n-community-license) | licença fair-code e limites de uso |
| [LICENSE.md do n8n](https://github.com/n8n-io/n8n/blob/master/LICENSE.md) | texto da Sustainable Use License e ficheiros `.ee.` |
| [Preços n8n](https://n8n.io/pricing/) | planos da cloud |
| [Anúncio da versão 3.0](https://community.n8n.io/t/announcing-n8n-version-3-0/324016) | fim da 1.x e suporte da 2.x |
| [Breaking changes da 3.0](https://docs.n8n.io/changelog/v30-breaking-changes) | o que muda ao passar para a 3.x |
| [Alojar o n8n](https://docs.n8n.io/deploy/host-n8n/) | opções de instalação |
| [Docker Compose](https://docs.n8n.io/deploy/host-n8n/install-options/install-using-docker-compose) | requisitos e base de dados da instalação com Docker |
| [Atualizar o n8n](https://docs.n8n.io/deploy/host-n8n/keep-n8n-running/update-n8n) | regras de atualização e reversão |
| [Cópias de segurança](https://docs.n8n.io/deploy/host-n8n/keep-n8n-running/backup-and-restore) | o que copiar e como restaurar |
| [Queue mode](https://docs.n8n.io/deploy/host-n8n/configure-n8n/scaling/enable-queue-mode) | Redis, workers e processadores de webhooks |
| [Task runners](https://docs.n8n.io/deploy/host-n8n/configure-n8n/set-up-task-runners) | onde corre o código do nó Code |
| [Segurança da instância](https://docs.n8n.io/deploy/host-n8n/configure-n8n/security) | medidas de endurecimento |
| [Bloquear nós](https://docs.n8n.io/deploy/host-n8n/configure-n8n/security/block-specific-nodes) | `NODES_EXCLUDE` e políticas por projeto |
| [Auditoria de segurança](https://docs.n8n.io/deploy/host-n8n/configure-n8n/security/run-security-audits) | `n8n audit` e `POST /audit` |
| [Políticas de segurança](https://docs.n8n.io/deploy/host-n8n/configure-n8n/security/manage-security-policies) | 2FA obrigatória e partilha, por plano |
| [MCP da instância](https://docs.n8n.io/connect/connect-to-n8n-mcp-server/) | ligar clientes MCP ao n8n |
| [Clientes MCP](https://docs.n8n.io/connect/connect-to-n8n-mcp-server/mcp-client-examples) | comandos para o Claude Code e outros clientes |
| [IA no n8n](https://docs.n8n.io/build/integrate-ai) | agentes, modelos, avaliações e MCP |
| [API pública: autenticação](https://docs.n8n.io/api/authentication/) | chave, âmbitos e base da API |
| [Nó Webhook](https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.webhook/) | URLs de teste e de produção e autenticação |

## [Jarvis open source (OpenJarvis e Microsoft JARVIS)](jarvis/README.md)

| Fonte | Para quê |
|---|---|
| [OpenJarvis](https://openjarvis.stanford.edu/) | site oficial: o que é e onde estão o repositório e a documentação |
| [OpenJarvis no PyPI (feed RSS oficial)](https://pypi.org/rss/project/openjarvis/releases.xml) | versões publicadas do pacote oficial; ler por aqui (os releases do GitHub têm várias versões de desenvolvimento por hora) |
| [OpenJarvis: instalação](https://open-jarvis.github.io/OpenJarvis/getting-started/installation/) | requisitos e modelo recomendado pela memória |
| [OpenJarvis: motores](https://open-jarvis.github.io/OpenJarvis/architecture/engine/) | motores locais e na nuvem |
| [OpenJarvis: agentes](https://open-jarvis.github.io/OpenJarvis/user-guide/agents/) | agentes incluídos e modos |
| [OpenJarvis: servidores MCP](https://open-jarvis.github.io/OpenJarvis/user-guide/mcp-external-servers/) | configuração do cliente MCP |
| [OpenJarvis: segurança](https://open-jarvis.github.io/OpenJarvis/user-guide/security/) | guardrails, auditoria e o que ainda não é aplicado |
| [OpenJarvis: fronteiras dos dados](https://open-jarvis.github.io/OpenJarvis/user-guide/data-boundary-scan/) | o que pode sair da máquina e a configuração estritamente local |
| [OpenJarvis: canais e conectores](https://open-jarvis.github.io/OpenJarvis/user-guide/channels-and-connectors/) | email, calendário e permissões |
| [OpenJarvis: aprendizagem](https://open-jarvis.github.io/OpenJarvis/architecture/learning/) | registos das execuções e otimização |
| [OpenJarvis: roadmap](https://open-jarvis.github.io/OpenJarvis/development/roadmap/) | o que está planeado |
| [Artigo do OpenJarvis (arXiv)](https://arxiv.org/abs/2605.17172) | resultados e versões do artigo |
| [Microsoft JARVIS](https://github.com/microsoft/JARVIS) | README: modos, requisitos e projetos irmãos |
| [Microsoft JARVIS (commits, feed Atom)](https://github.com/microsoft/JARVIS/commits/main.atom) | atividade do repositório, que não publica versões; ler por aqui |
| [HuggingGPT (arXiv)](https://arxiv.org/abs/2303.17580) | o artigo |

## A vigiar

Pontos que o agente de atualização verifica sempre, a pedido do dono do repositório.

| Tema | O que vigiar | Onde |
|---|---|---|
| IA | Se a OpenAI lança cursos ou certificação equivalentes; se sim, trazer toda a informação | [https://academy.openai.com/](https://academy.openai.com/) |
| IA | Microsoft GraphRAG em modo de manutenção (3.3.0 a 2026-10-08): avisar se for descontinuado ou se a LazyGraphRAG entrar no pacote open source | [https://pypi.org/project/graphrag/](https://pypi.org/project/graphrag/) |
| IA | Plataforma de fine-tuning da OpenAI em encerramento (já fechada a novos utilizadores): data final | [https://developers.openai.com/api/docs/guides/model-optimization](https://developers.openai.com/api/docs/guides/model-optimization) |
| IA | Hugging Face TGI em modo de manutenção: avisar se for descontinuado | [https://huggingface.co/docs/text-generation-inference](https://huggingface.co/docs/text-generation-inference) |
| IA | Licença do Llama por ler (llama.com redireciona para outro site); ler o texto atual da licença | [https://www.llama.com/](https://www.llama.com/) |
| IA | Fish Audio: o `drama-3` está a 10 USD por milhão de bytes até 2026-11-30 (até 1/12, às 08:00 UTC) e volta a 50 USD; confirmar o preço depois dessa data | [https://docs.fish.audio/developer-guide/models-pricing/pricing-and-rate-limits](https://docs.fish.audio/developer-guide/models-pricing/pricing-and-rate-limits) |
| IA | OpenAI: `tts-1`, `tts-1-hd` e `gpt-4o-mini-tts` desligam a 2027-01-06; a substituição é o `gpt-realtime-2.1-mini` pela Realtime API; confirmar a data e o preço | [https://developers.openai.com/api/docs/guides/text-to-speech](https://developers.openai.com/api/docs/guides/text-to-speech) |
| IA | Google Cloud: o Gemini 3.8 Flash TTS (pré-visualização) passa de 0,50 e 9,00 USD para 1,00 e 18,00 USD por milhão de tokens de texto e de áudio a 2027-01-01; confirmar o preço e se o pt-PT sai da pré-visualização | [https://cloud.google.com/text-to-speech/pricing](https://cloud.google.com/text-to-speech/pricing) |
| IA | Codex no Windows: com `--sandbox read-only` recusa todos os comandos (0.172.0, `windows_sandbox_service` «under development»); avisar quando um par do Codex passar a ler ficheiros no Windows | [https://learn.chatgpt.com/docs/non-interactive-mode](https://learn.chatgpt.com/docs/non-interactive-mode) |
| IA | Formas vistas só em corridas a 2026-11-27 e não documentadas: o `rate_limit_event` do Claude Code numa paragem por limite, o `CODEX_OSS_BASE_URL` do Codex e o `VIBE_HOME` do Vibe; e, por confirmar, a paragem por limite no Codex e no Vibe e o id da sessão do Vibe numa corrida com chave | [https://code.claude.com/docs/en/headless](https://code.claude.com/docs/en/headless) |
| IA (regulação) | Calendário de aplicação do AI Act e alterações do AI Omnibus (ex.: Anexo III a 2/12/2027, Anexo I a 2/8/2028) | [https://digital-strategy.ec.europa.eu/en/policies/regulatory-framework-ai](https://digital-strategy.ec.europa.eu/en/policies/regulatory-framework-ai) |
| Publicação | mudanças no plano grátis e nos créditos da Netlify | [https://docs.netlify.com/manage/accounts-and-billing/billing/billing-for-credit-based-plans/credit-based-pricing-plans/](https://docs.netlify.com/manage/accounts-and-billing/billing/billing-for-credit-based-plans/credit-based-pricing-plans/) |
| Publicação | mudanças nos limites e na restrição comercial da Vercel Hobby | [https://vercel.com/docs/plans/hobby](https://vercel.com/docs/plans/hobby) |
| Publicação | mudanças nos planos de workspace e no escalão grátis do Render | [https://render.com/changelog](https://render.com/changelog) |
| Publicação | mudanças no modelo de créditos do AWS Free Tier | [https://aws.amazon.com/free/free-tier-faqs/](https://aws.amazon.com/free/free-tier-faqs/) |
| Publicação | Redução da validade dos certificados (64 dias em 2027-02-10, 45 dias em 2028) | [https://letsencrypt.org/2026/10/07/64-day-certs](https://letsencrypt.org/2026/10/07/64-day-certs) |
| Publicação | Calendário de validade máxima nas Baseline Requirements (100 dias em 2027, 47 em 2029) | [https://cabforum.org/working-groups/server/baseline-requirements/requirements/](https://cabforum.org/working-groups/server/baseline-requirements/requirements/) |
| Publicação | Regras geridas WAF disponíveis no plano Free da Cloudflare | [https://developers.cloudflare.com/waf/managed-rules/](https://developers.cloudflare.com/waf/managed-rules/) |
| Publicação | Limite de 50 utilizadores no plano Free do Cloudflare Access | [https://www.cloudflare.com/zero-trust/products/access/](https://www.cloudflare.com/zero-trust/products/access/) |
| Publicação | Hostinger VPS: preços de Black Friday sem data de fim na página (KVM 2 a 210,96 USD por 24 meses, renova a 14,99 USD/mês); confirmar os preços quando a promoção acabar | [https://www.hostinger.com/vps-hosting](https://www.hostinger.com/vps-hosting) |
| Acesso remoto | Versão mais recente do OpenSSH e correções de segurança (10.6p2 a 2026-11-05, ainda a mais recente a 2026-11-25; a equipa anunciou lançamentos mais frequentes) | [https://www.openssh.org/releasenotes.html](https://www.openssh.org/releasenotes.html) |
| Acesso remoto | NIST SP 800-46 Rev. 3 em rascunho: avisar quando sair a versão final, que substitui a Rev. 2 que a base cita | [https://csrc.nist.gov/pubs/sp/800/46/r2/final](https://csrc.nist.gov/pubs/sp/800/46/r2/final) |
| Plataformas | Servidores MCP oficiais: novos projetos com MCP, saída do modo experimental no Dolibarr, MCP oficial no Node-RED e no LimeSurvey (o Zammad tem servidor MCP integrado desde a 7.3, de 2026-11-25) | [https://modelcontextprotocol.io/](https://modelcontextprotocol.io/) |
| Plataformas | Mudanças de licença (n8n, Directus, Strapi ee/, Odoo Enterprise) | [https://opensource.org/licenses](https://opensource.org/licenses) |
| C# | Fim de suporte do .NET 10 (LTS) e do .NET 11 (STS), ambos a 2028-11-14 segundo o índice oficial (lido a 2026-11-25), e próximas datas de fim de suporte | [https://raw.githubusercontent.com/dotnet/core/main/release-notes/releases-index.json](https://raw.githubusercontent.com/dotnet/core/main/release-notes/releases-index.json) |
| Soberania | Data Act: fim total dos custos de mudança de fornecedor de nuvem e de saída de dados a 2027-01-12 | [https://digital-strategy.ec.europa.eu/en/policies/data-act-explained](https://digital-strategy.ec.europa.eu/en/policies/data-act-explained) |
| Base de dados | Notas de versão do Microsoft Fabric: capacidades, preços das SKUs F, estado das funcionalidades em pré-visualização (SQL database, OneLake security) e mudanças ao consumo (as taxas «are subject to change at any time») | [https://learn.microsoft.com/en-us/fabric/fundamentals/whats-new](https://learn.microsoft.com/en-us/fabric/fundamentals/whats-new) |
| Base de dados | MongoDB: versão do servidor (9.0 a 2026-11-16, fim de vida a 2031-10-31), datas de fim de vida das 8.0 e 7.0, e a descontinuação do LDAP | [https://www.mongodb.com/legal/support-policy/lifecycles](https://www.mongodb.com/legal/support-policy/lifecycles) |
| Base de dados | Apache Spark (4.3.0) e Delta Lake (4.3.x, compatível com Spark 4.0.x e 4.1.x): a compatibilidade muda a cada versão | [https://docs.delta.io/latest/releases.html](https://docs.delta.io/latest/releases.html) |
| Base de dados | Especificação do Iceberg: versão 4 em desenvolvimento, ainda não adotada (a 2026-11-16) | [https://iceberg.apache.org/spec/](https://iceberg.apache.org/spec/) |
| Segurança | Claim `amr` do id_token: a página do Entra não o documenta (a 2026-11-16); verificar se passa a documentá-lo | [https://learn.microsoft.com/en-us/entra/identity-platform/id-token-claims-reference](https://learn.microsoft.com/en-us/entra/identity-platform/id-token-claims-reference) |
| Segurança (regulação) | NIS2: se as alterações pontuais que a Comissão propôs a 2026-01-20 são aprovadas e o que mudam; e o texto do Decreto-Lei n.º 125/2025 e do Regulamento n.º 756/2026, por ler (o Diário da República só abre com JavaScript e o CNCS bloqueia o acesso automático), para confirmar os prazos nacionais, o canal de notificação e o registo das entidades | [https://digital-strategy.ec.europa.eu/en/policies/nis2-directive](https://digital-strategy.ec.europa.eu/en/policies/nis2-directive) |
| Portais de agentes | Leitura de «intermediate» na página legal do Claude Code (credenciais e uso «on their end users' behalf»): confirmar com a Anthropic se um agente local que conduz o `claude` com a subscrição da própria pessoa é permitido | [https://code.claude.com/docs/en/legal-and-compliance](https://code.claude.com/docs/en/legal-and-compliance) |
| Portais de agentes | Comportamentos vistos só em corridas (o nome da skill em `tool_input.skill` no `PreToolUse`; o `PermissionRequest` também para o `AskUserQuestion`, com a primeira resposta a ganhar): verificar se passam a estar documentados ou mudam | [https://code.claude.com/docs/en/hooks](https://code.claude.com/docs/en/hooks) |

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

## [Privacidade e conformidade](privacidade/README.md)

| Fonte | Para quê |
|---|---|
| [EUR-Lex: RGPD](https://eur-lex.europa.eu/eli/reg/2016/679/oj) | texto oficial (não lida: bloqueia acesso automático) |
| [EDPB](https://www.edpb.europa.eu/) | diretrizes europeias sobre RGPD, consentimento e cookies |
| [EDPB: guia para PME](https://www.edpb.europa.eu/sme-data-protection-guide/home_en) | guia prático de conformidade com o RGPD |
| [CNPD](https://www.cnpd.pt/) | autoridade portuguesa: orientações, AIPD, violações de dados |
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

## [Desenho de API](api/README.md)

| Fonte | Para quê |
|---|---|
| [RFC 9110 HTTP Semantics](https://www.rfc-editor.org/rfc/rfc9110.html) | Semântica normativa de métodos e códigos de estado HTTP |
| [RFC 9457 Problem Details](https://www.rfc-editor.org/rfc/rfc9457.html) | Formato normalizado de erro para APIs HTTP |
| [RFC 9745 Deprecation header](https://www.rfc-editor.org/rfc/rfc9745.html) | Sinalizar depreciação de recursos por cabeçalho HTTP |
| [OpenAPI Specification](https://spec.openapis.org/oas/latest.html) | Contrato de APIs HTTP legível por pessoas e máquinas |
| [OpenAPI — Best Practices](https://learn.openapis.org/best-practices.html) | Design-first, fonte única, CI contra desvios |
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

## [Boas práticas de C#](csharp/README.md)

| Fonte | Para quê |
|---|---|
| [The history of C#](https://learn.microsoft.com/en-us/dotnet/csharp/whats-new/csharp-version-history) | versões da linguagem e novidades |
| [What's new in C# 15](https://learn.microsoft.com/en-us/dotnet/csharp/whats-new/csharp-15) | próxima versão (pré-lançamento com .NET 11) |
| [.NET Coding Conventions](https://learn.microsoft.com/en-us/dotnet/csharp/fundamentals/coding-style/coding-conventions) | convenções oficiais de código C# |
| [Code analysis in .NET](https://learn.microsoft.com/en-us/dotnet/fundamentals/code-analysis/overview) | analisadores Roslyn, .editorconfig, warnings como erros |
| [Best practices for exceptions](https://learn.microsoft.com/en-us/dotnet/standard/exceptions/best-practices-for-exceptions) | tratamento de exceções em .NET |
| [Unit testing best practices](https://learn.microsoft.com/en-us/dotnet/core/testing/unit-testing-best-practices) | testes unitários em .NET |
| [OWASP .NET Security](https://cheatsheetseries.owasp.org/cheatsheets/DotNet_Security_Cheat_Sheet.html) | segurança em .NET |

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
| [OWASP: segurança em Node.js](https://cheatsheetseries.owasp.org/cheatsheets/Nodejs_Security_Cheat_Sheet.html) | Boas práticas de segurança em Node.js |

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

## [Serviços de infraestrutura](infraestrutura/README.md)

| Fonte | Para quê |
|---|---|
| [AWS SSM Session Manager](https://docs.aws.amazon.com/systems-manager/latest/userguide/session-manager.html) | Acesso a servidores sem bastion, portas abertas ou chaves SSH |
| [Teleport docs](https://goteleport.com/docs/) | Acesso a infraestrutura por identidade, com auditoria de sessões |
| [Tailscale](https://tailscale.com/kb/1151/what-is-tailscale) | Rede de confiança zero sobre WireGuard |
| [PostgreSQL](https://www.postgresql.org/about/) | Base relacional aberta; documentação atual é a versão 18 |
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
| [AWS What's New](https://aws.amazon.com/new/) | novidades oficiais de serviços, funcionalidades e regiões AWS |
| [Azure updates](https://azure.microsoft.com/en-us/updates) | novidades oficiais de produtos e funcionalidades Azure |
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
| [Planos Cloudflare](https://www.cloudflare.com/plans/network-cdn/) | Preços e funcionalidades Free, Pro, Business, Enterprise |
| [Cloudflare Access planos](https://www.cloudflare.com/zero-trust/products/access/) | Limite de utilizadores do plano Free do Access |
| [Let's Encrypt news](https://letsencrypt.org/blog/) | Mudanças de validade, perfis ACME e ARI |
| [CA/Browser Forum posts](https://cabforum.org/posts/) | Ballots que alteram Baseline Requirements e EV Guidelines |
| [OWASP CRS releases](https://github.com/coreruleset/coreruleset/releases) | Novas versões e LTS do Core Rule Set |
| [Coraza releases](https://github.com/corazawaf/coraza/releases) | Novas versões do motor WAF Coraza |
| [Bunny Shield planos](https://bunny.net/shield/) | Preços e limites da alternativa europeia de WAF |

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
| [Licença n8n](https://docs.n8n.io/privacy-and-security/sustainable-use-license) | licença fair-code e limites de uso |
| [Preços n8n](https://n8n.io/pricing/) | planos da cloud |
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
| [Mistral: modelos](https://docs.mistral.ai/getting-started/models/) | Modelos Mistral e licença de cada um |
| [Gemma: termos](https://ai.google.dev/gemma/terms) | Licença dos modelos Gemma |
| [OSI: Open Source AI Definition](https://opensource.org/ai/open-source-ai-definition) | O que conta como IA open source |
| [Comissão Europeia: perguntas e respostas sobre modelos GPAI](https://digital-strategy.ec.europa.eu/en/faqs/general-purpose-ai-models-ai-act-questions-answers) | Quem é fornecedor de um modelo de finalidade geral e o que deve |
| [Código de Conduta GPAI](https://digital-strategy.ec.europa.eu/en/policies/contents-code-gpai) | Transparência, direitos de autor e segurança para fornecedores de modelos |
| [A2A: especificação](https://a2a-protocol.org/latest/specification/) | Protocolo entre agentes, versões |
| [OWASP Top 10 para LLM](https://genai.owasp.org/llm-top-10/) | Riscos de segurança de aplicações com LLM e de agentes |
| [LiteLLM](https://docs.litellm.ai) | Gateway de LLM com orçamentos e chaves virtuais |
| [Langfuse](https://langfuse.com/docs) | Observabilidade, avaliação e gestão de prompts |
| [Piper: vozes](https://huggingface.co/rhasspy/piper-voices) | Vozes TTS locais, incluindo pt_PT |
| [Azure AI Speech: preços](https://azure.microsoft.com/en-us/pricing/details/cognitive-services/speech-services/) | Escalão grátis de TTS e STT |

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

## A vigiar

Pontos que o agente de atualização verifica sempre, a pedido do dono do repositório.

| Tema | O que vigiar | Onde |
|---|---|---|
| IA | Se a OpenAI lança cursos ou certificação equivalentes; se sim, trazer toda a informação | [https://academy.openai.com/](https://academy.openai.com/) |
| IA | Microsoft GraphRAG em modo de manutenção (3.3.0 a 2026-10-08): avisar se for descontinuado ou se a LazyGraphRAG entrar no pacote open source | [https://pypi.org/project/graphrag/](https://pypi.org/project/graphrag/) |
| IA | Plataforma de fine-tuning da OpenAI em encerramento (já fechada a novos utilizadores): data final | [https://developers.openai.com/api/docs/guides/model-optimization](https://developers.openai.com/api/docs/guides/model-optimization) |
| IA | Hugging Face TGI em modo de manutenção: avisar se for descontinuado | [https://huggingface.co/docs/text-generation-inference](https://huggingface.co/docs/text-generation-inference) |
| IA | Preço do grounding com Google Search: duas páginas oficiais com valores diferentes; confirmar qual vale | [https://aistudio.google.com/docs/google-search](https://aistudio.google.com/docs/google-search) |
| IA | Licença do Llama por ler (llama.com redireciona para outro site); ler o texto atual da licença | [https://www.llama.com/](https://www.llama.com/) |
| IA (regulação) | Calendário de aplicação do AI Act e alterações do AI Omnibus (ex.: Anexo III a 2/12/2027, Anexo I a 2/8/2028) | [https://digital-strategy.ec.europa.eu/en/policies/regulatory-framework-ai](https://digital-strategy.ec.europa.eu/en/policies/regulatory-framework-ai) |
| Publicação | mudanças no plano grátis e nos créditos da Netlify | [https://docs.netlify.com/manage/accounts-and-billing/billing/billing-for-credit-based-plans/credit-based-pricing-plans/](https://docs.netlify.com/manage/accounts-and-billing/billing/billing-for-credit-based-plans/credit-based-pricing-plans/) |
| Publicação | mudanças nos limites e na restrição comercial da Vercel Hobby | [https://vercel.com/docs/plans/hobby](https://vercel.com/docs/plans/hobby) |
| Publicação | mudanças nos planos de workspace e no escalão grátis do Render | [https://render.com/changelog](https://render.com/changelog) |
| Publicação | mudanças no modelo de créditos do AWS Free Tier | [https://aws.amazon.com/free/free-tier-faqs/](https://aws.amazon.com/free/free-tier-faqs/) |
| Publicação | Redução da validade dos certificados (64 dias em 2027-02-10, 45 dias em 2028) | [https://letsencrypt.org/2026/10/07/64-day-certs](https://letsencrypt.org/2026/10/07/64-day-certs) |
| Publicação | Calendário de validade máxima nas Baseline Requirements (100 dias em 2027, 47 em 2029) | [https://cabforum.org/working-groups/server/baseline-requirements/requirements/](https://cabforum.org/working-groups/server/baseline-requirements/requirements/) |
| Publicação | Regras geridas WAF disponíveis no plano Free da Cloudflare | [https://developers.cloudflare.com/waf/managed-rules/](https://developers.cloudflare.com/waf/managed-rules/) |
| Publicação | Limite de 50 utilizadores no plano Free do Cloudflare Access | [https://www.cloudflare.com/zero-trust/products/access/](https://www.cloudflare.com/zero-trust/products/access/) |
| Acesso remoto | Versão mais recente do OpenSSH e correções de segurança (10.6 a 2026-10-06; a equipa anunciou lançamentos mais frequentes) | [https://www.openssh.org/releasenotes.html](https://www.openssh.org/releasenotes.html) |
| Plataformas | Servidores MCP oficiais: novos projetos com MCP, saída do modo experimental no Dolibarr, MCP oficial no Zammad, Node-RED e LimeSurvey | [https://modelcontextprotocol.io/](https://modelcontextprotocol.io/) |
| Plataformas | Mudanças de licença (n8n, Directus, Strapi ee/, Odoo Enterprise) | [https://opensource.org/licenses](https://opensource.org/licenses) |
| C# | Fim de suporte do .NET 8 e do .NET 9 (2026-11-10 segundo o índice oficial) e próximas datas de fim de suporte | [https://raw.githubusercontent.com/dotnet/core/main/release-notes/releases-index.json](https://raw.githubusercontent.com/dotnet/core/main/release-notes/releases-index.json) |
| Soberania | Data Act: fim total dos custos de mudança de fornecedor de nuvem e de saída de dados a 2027-01-12 | [https://digital-strategy.ec.europa.eu/en/policies/data-act-explained](https://digital-strategy.ec.europa.eu/en/policies/data-act-explained) |
| Base de dados | Notas de versão do Microsoft Fabric: capacidades, preços das SKUs F, estado das funcionalidades em pré-visualização (SQL database, OneLake security) e mudanças ao consumo (as taxas «are subject to change at any time») | [https://learn.microsoft.com/en-us/fabric/fundamentals/whats-new](https://learn.microsoft.com/en-us/fabric/fundamentals/whats-new) |
| Base de dados | MongoDB: versão do servidor (9.0 a 2026-11-16, fim de vida a 2031-10-31), datas de fim de vida das 8.0 e 7.0, e a descontinuação do LDAP | [https://www.mongodb.com/legal/support-policy/lifecycles](https://www.mongodb.com/legal/support-policy/lifecycles) |
| Base de dados | Apache Spark (4.3.0) e Delta Lake (4.3.x, compatível com Spark 4.0.x e 4.1.x): a compatibilidade muda a cada versão | [https://docs.delta.io/latest/releases.html](https://docs.delta.io/latest/releases.html) |
| Base de dados | Especificação do Iceberg: versão 4 em desenvolvimento, ainda não adotada (a 2026-11-16) | [https://iceberg.apache.org/spec/](https://iceberg.apache.org/spec/) |
| Segurança | Claim `amr` do id_token: a página do Entra não o documenta (a 2026-11-16); verificar se passa a documentá-lo | [https://learn.microsoft.com/en-us/entra/identity-platform/id-token-claims-reference](https://learn.microsoft.com/en-us/entra/identity-platform/id-token-claims-reference) |
| Portais de agentes | Leitura de «intermediate» na página legal do Claude Code (credenciais e uso «on their end users' behalf»): confirmar com a Anthropic se um agente local que conduz o `claude` com a subscrição da própria pessoa é permitido | [https://code.claude.com/docs/en/legal-and-compliance](https://code.claude.com/docs/en/legal-and-compliance) |
| Portais de agentes | Comportamentos vistos só em corridas (o nome da skill em `tool_input.skill` no `PreToolUse`; o `PermissionRequest` também para o `AskUserQuestion`, com a primeira resposta a ganhar): verificar se passam a estar documentados ou mudam | [https://code.claude.com/docs/en/hooks](https://code.claude.com/docs/en/hooks) |

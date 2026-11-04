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

## [Construir com IA (Claude e Anthropic)](ia/README.md)

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

## A vigiar

Pontos que o agente de atualização verifica sempre, a pedido do dono do repositório.

| Tema | O que vigiar | Onde |
|---|---|---|
| IA | Pesos dos domínios do exame Claude Certified Architect: mantêm-se os do PDF (27/18/20/20/15) até haver fonte oficial; guias revistos previstos para 17/11/2026 | [https://anthropic-partners.skilljar.com/page/faq-certifications](https://anthropic-partners.skilljar.com/page/faq-certifications) |
| IA | Se a OpenAI lança cursos ou certificação equivalentes; se sim, trazer toda a informação | [https://academy.openai.com/](https://academy.openai.com/) |
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

# CI/CD e ferramentas

Tag no Logseq: `#cicd`.

Inclui os conceitos de integração e entrega contínuas e o catálogo de ferramentas por propósito.

Fonte: págs. 45–50 (Dicionario-Boas-Praticas.pdf)

## Entradas

- [CI vs CD](ci-vs-cd.md) — CI integra e verifica cada alteração cedo; CD deixa pronto ou publica o que passa, em lotes pequenos e frequentes. *(pág. 45)*
- [Pipeline como portão](pipeline-como-portao.md) — O pipeline é a única porta para produção, com fases ordenadas por custo. *(pág. 45)*
- [Build reprodutível e artefacto imutável](build-reprodutivel-e-artefacto-imutavel.md) — O mesmo commit dá o mesmo artefacto, construído uma vez e promovido entre ambientes. *(pág. 45)*
- [Testes no pipeline](testes-no-pipeline.md) — Pirâmide de testes rápida e determinística, sem tolerar testes instáveis. *(págs. 45, 46)*
- [Segurança do pipeline](seguranca-do-pipeline.md) — Proteger o pipeline como produção: credenciais mínimas, ações fixadas por SHA e segredos fora do log. *(pág. 46)*
- [Estratégias de deploy](estrategias-de-deploy.md) — Rolling, blue-green ou canary e feature flags, escolhidos pela tolerância ao risco. *(pág. 46)*
- [Rollback e recuperação](rollback-e-recuperacao.md) — Voltar atrás tem de ser rápido e ensaiado, com o artefacto anterior guardado. *(pág. 46)*
- [Ambientes e promoção](ambientes-e-promocao.md) — Dev → staging → produção, cada um com a sua configuração e dados, promovendo o mesmo artefacto. *(págs. 46, 47)*
- [Infraestrutura e migrações no fluxo](infraestrutura-e-migracoes-no-fluxo.md) — Infraestrutura como código e migrações versionadas fazem parte do deploy. *(pág. 47)*
- [Observabilidade do deploy](observabilidade-do-deploy.md) — Depois de subir, provar que está vivo com smoke test e confirmar a configuração. *(pág. 47)*
- [Estratégia de branches e CI](estrategia-de-branches-e-ci.md) — Lotes pequenos e branches de vida curta, com CI verde antes do merge. *(pág. 47)*
- [Agentes de IA a par do CI/CD](agentes-de-ia-a-par-do-cicd.md) — Agentes podem questionar o que o pipeline já verifica, mas propõem e assinalam, nunca aprovam nem publicam. *(págs. 47, 48)*
- [Ferramentas: linters e formatadores](ferramentas-linters-e-formatadores.md) — Formatador e linter por linguagem, a correr no CI. *(pág. 48)*
- [Ferramentas: tipagem estática](ferramentas-tipagem-estatica.md) — Verificadores de tipos por linguagem, a correr no CI com avisos tratados como erro. *(pág. 48)*
- [Ferramentas: frameworks de teste](ferramentas-frameworks-de-teste.md) — Frameworks de teste por linguagem e para ponta-a-ponta web. *(pág. 48)*
- [Ferramentas: análise estática de segurança (SAST)](ferramentas-sast.md) — Ferramentas SAST que correm a cada PR e apontam padrões perigosos. *(pág. 48)*
- [Ferramentas: segredos (deteção e cofres)](ferramentas-segredos.md) — Deteção de segredos no repositório e cofres para os guardar. *(págs. 48, 49)*
- [Ferramentas: dependências (auditoria e atualização)](ferramentas-dependencias.md) — Auditoria de vulnerabilidades e atualização automática de dependências. *(pág. 49)*
- [Ferramentas: contentores (scan, SBOM, assinatura)](ferramentas-contentores.md) — Scan de vulnerabilidades, SBOM e assinatura das imagens. *(pág. 49)*
- [Ferramentas: migrações de base de dados](ferramentas-migracoes-de-base-de-dados.md) — Ferramentas que versionam o esquema com tabela de controlo. *(pág. 49)*
- [Ferramentas: qualidade do frontend](ferramentas-qualidade-do-frontend.md) — Acessibilidade e desempenho do frontend verificados no CI. *(pág. 49)*
- [Ferramentas: acesso e rede](ferramentas-acesso-e-rede.md) — Acesso por identidade, rede de confiança zero e proxy de borda. *(págs. 49, 50)*
- [Ferramentas: observabilidade](ferramentas-observabilidade.md) — Ferramentas de logs, métricas e tracing. *(pág. 50)*

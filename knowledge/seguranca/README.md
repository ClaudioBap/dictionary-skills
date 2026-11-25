# Segurança

Tag no Logseq: `#segurança`.

Fonte: págs. 3–9 (Dicionario-Boas-Praticas.pdf)

## Entradas

- [Autorização no servidor, negar por omissão](autorizacao-no-servidor.md) — A decisão de quem pode o quê vive no servidor, cada endpoint declara o que exige e, sem declaração, recusa. *(pág. 3)*
- [Defesa contra XSS: escapar e CSP](defesa-contra-xss.md) — Escapar por omissão todo o texto do utilizador e ter uma CSP sem `unsafe-inline` como segunda rede. *(pág. 3)*
- [CSRF: verificar a origem, não só o cookie](csrf-verificar-a-origem.md) — Como o browser envia o cookie sozinho, os métodos que mudam dados verificam a origem e nunca são `GET`. *(pág. 3)*
- [Menor privilégio na base de dados](menor-privilegio-na-base-de-dados.md) — A identidade da aplicação na base de dados tem só o que precisa, separada por função, com regras críticas impostas também na base. *(pág. 4)*
- [Auditoria append-only e à prova de adulteração](auditoria-append-only.md) — Registar quem, quando e o quê em cada operação que muda dados, num trilho que a aplicação só pode acrescentar e ler. *(pág. 4)*
- [Integridade dos dados e migrações aditivas](integridade-e-migracoes-aditivas.md) — Nunca perder o rasto de um dado: ledger, chaves referenciadas estáveis, correções por versão e migrações só aditivas por release. *(pág. 4)*
- [Queries parametrizadas (sem injeção de SQL)](queries-parametrizadas.md) — Todo o acesso à base de dados usa parâmetros; texto do utilizador nunca entra no comando por concatenação. *(pág. 4)*
- [Segredos num cofre, fora do código e do disco](segredos-num-cofre.md) — Segredos guardados num cofre, nunca no código nem em configuração versionada, com deteção de segredos no CI. *(pág. 5)*
- [Ambientes seguros por omissão](ambientes-seguros-por-omissao.md) — Sem configuração, ou com configuração errada, a aplicação cai no modo mais restrito: falha fechado. *(pág. 5)*
- [Autenticação forte, sem passwords fracas](autenticacao-forte.md) — Preferir SSO/OIDC com MFA; se houver password, hash forte, comparação em tempo constante e rate limit. *(pág. 5)*
- [Sessões robustas](sessoes-robustas.md) — Identidade no servidor, cookie só com identificador assinado, sessões persistentes fora do processo, revogáveis e com timeout. *(págs. 5, 6)*
- [Rate limit e WAF](rate-limit-e-waf.md) — Uma WAF à frente, rate limit nos caminhos sensíveis e a configuração da borda versionada. *(pág. 6)*
- [Dados de teste sintéticos e minimização](dados-de-teste-sinteticos-e-minimizacao.md) — Nunca copiar dados pessoais reais para dev; gerar dados sintéticos e recolher o mínimo, com retenção. *(pág. 6)*
- [Contentores endurecidos](contentores-endurecidos.md) — Imagens fixadas por digest, non-root, só-leitura e com o mínimo de capacidades; só o proxy exposto. *(pág. 6)*
- [CI como portão do deploy](ci-como-portao-do-deploy.md) — O deploy só corre com CI verde, ações fixadas, produção só do branch protegido e caminho de rollback. *(pág. 6)*
- [Cadeia de fornecimento verificada](cadeia-de-fornecimento-verificada.md) — Dependências atualizadas e auditadas, análise estática, scan de imagens, SBOM e imagens assinadas por release. *(pág. 7)*
- [TLS e cabeçalhos versionados](tls-e-cabecalhos-versionados.md) — TLS e cabeçalhos de segurança definidos em configuração versionada, coerentes num só sítio. *(pág. 7)*
- [Endpoints de saúde discretos](endpoints-de-saude-discretos.md) — O `/health` público diz só «vivo»; o diagnóstico detalhado fica autenticado ou na rede interna. *(pág. 7)*
- [Observabilidade e alertas](observabilidade-e-alertas.md) — Logs estruturados e centralizados, alertas em eventos de segurança e erros sem detalhe técnico no ecrã. *(pág. 7)*
- [Validação de entradas](validacao-de-entradas.md) — Validar toda a entrada na fronteira do servidor por allowlist e escapar na saída conforme o destino. *(pág. 8)*
- [Segurança de API](seguranca-de-api.md) — Autorização por objeto (BOLA), só campos esperados, sem SSRF e CORS com origens explícitas. *(pág. 8)*
- [Criptografia e proteção de dados](criptografia-e-protecao-de-dados.md) — Dados cifrados em trânsito e em repouso, chaves num cofre com rotação e criptografia só de bibliotecas. *(pág. 8)*
- [Testes de segurança ativos](testes-de-seguranca-ativos.md) — Threat modeling antes de construir, DAST sobre a aplicação a correr e pentest ou bug bounty periódico. *(págs. 8, 9)*
- [OWASP como referencial](owasp-como-referencial.md) — Usar o OWASP Top 10 como checklist, o ASVS como nível-alvo e as Cheat Sheets como receitas. *(pág. 9)*
- [Deteção e resposta a incidentes](detecao-e-resposta-a-incidentes.md) — Saber detetar, ter um plano escrito de resposta, ensaiá-lo e fazer pós-incidente sem culpa. *(pág. 9)*
- [Exportar CSV sem injeção de fórmulas](exportacao-csv-sem-formulas.md) — Um CSV que leva texto de utilizadores pode executar fórmulas quando abre numa folha de cálculo; neutraliza-se cada célula que começa por `=`, `+`, `-`, `@`, tabulação ou retorno de linha, e a exportação de registos de auditoria guarda quem, quando e o quê sem alterar o que se exporta. *(fora do PDF)*
- [MFA imposto pelo fornecedor de identidade, não pela aplicação](mfa-imposto-pelo-fornecedor-de-identidade.md) — Quando o login é por OIDC com o Microsoft Entra, o segundo fator é exigido pelas políticas do tenant (Conditional Access ou security defaults) e a aplicação não implementa MFA próprio; o que se faz é confirmar no teste do login real que a política se aplica e preparar a aplicação para os desafios que o fornecedor pode devolver. *(fora do PDF)*
- [Login por OIDC: código com PKCE, state, nonce e validação do id_token](oidc-codigo-com-pkce-state-e-nonce.md) — Num login por OIDC com servidor, usa-se o fluxo de código com PKCE (S256), um `state` ligado ao navegador que começou o pedido, um `nonce` no id_token, o URI de retorno exato, e valida-se o id_token (assinatura, emissor, audiência, validade e nonce) antes de abrir sessão, identificando a pessoa por `oid` ou `sub`. *(fora do PDF)*
- [Sessões: tempos, rotação do identificador, resumo guardado e cookies](sessoes-tempos-rotacao-e-cookies.md) — Os números que a OWASP dá para uma sessão: identificador com pelo menos 64 bits de entropia, renovado a cada mudança de privilégio, timeout por inatividade mais curto nas áreas de maior valor e um limite absoluto, invalidação no servidor, só um resumo do identificador guardado e cookie `__Host-` com `SameSite`. *(fora do PDF)*
- [Um link enviado por email nunca dá sessão](links-por-email-sem-sessao.md) — Um email de convite, de aceitação ou de recuperação leva quem o recebe à página de entrada; é lá que a pessoa se autentica. Um token num link é de uso único, expira e não abre sessão. *(fora do PDF)*
- [Cyber Resilience Act, obrigações de quem coloca software ou equipamentos no mercado da UE](cyber-resilience-act.md) — O Regulamento (UE) 2024/2847 aplica-se aos produtos com elementos digitais disponibilizados no mercado da UE numa atividade comercial, a pagar ou de graça. Desde 11 de setembro de 2026 o fabricante notifica as vulnerabilidades ativamente exploradas e os incidentes graves pela plataforma única da ENISA, em 24 e 72 horas; a partir de 11 de dezembro de 2027 aplicam-se os requisitos dos produtos, entre eles a lista de materiais do software (SBOM), a política de divulgação coordenada de vulnerabilidades e um período de suporte de pelo menos cinco anos. *(fora do PDF)*
- [Diretiva NIS2, entidades abrangidas, medidas mínimas e notificação de incidentes](nis2-entidades-medidas-e-notificacao.md) — A NIS2 obriga as entidades essenciais e importantes dos setores dos seus anexos, a partir das médias empresas, a aplicar dez medidas mínimas de cibersegurança aprovadas pela gestão e a notificar cada incidente significativo em três tempos: aviso prévio em 24 horas, notificação em 72 horas e relatório final num mês. Em Portugal foi transposta pelo Decreto-Lei n.º 125/2025. *(fora do PDF)*

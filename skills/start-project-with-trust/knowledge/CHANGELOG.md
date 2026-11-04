# Registo de alterações ao conhecimento

Registo **append-only** de cada alteração aprovada a `knowledge/`: o quê, porquê, de que fonte e quem aprovou. Não se apagam nem reescrevem linhas; uma correção é uma linha nova.

> Segue a entrada «Registo de alterações (o sentido da mudança)» do PDF (pág. 42): o git diz que ficheiros mudaram; este registo diz o sentido da mudança. O script `skills/update-knowledge/scripts/verificar-alteracoes.mjs` recusa um commit em que um ficheiro alterado não tenha aqui a sua linha.

| Data | Alteração | Ficheiro | Fonte | Data de lançamento | Confiança | Aprovado por |
|---|---|---|---|---|---|---|
| 2026-11-03 | Extração inicial do PDF: 238 entradas em 237 ficheiros, com página de origem | (todos, exceto javascript/ e node/) | Dicionario-Boas-Praticas.pdf | 2026-11-03 | alta | Cláudio Baptista |
| 2026-11-03 | Novas secções JavaScript e Node.js, fora do PDF, a pedido do utilizador | javascript/, node/ | Conhecimento do assistente | — | baixa | Cláudio Baptista |
| 2026-11-04 | JavaScript e Node.js reescritos com fonte oficial em cada ponto; 4 entradas novas | javascript/, node/ | MDN, nodejs.org, npm, OWASP, TypeScript, ESLint, Prettier, web.dev, Docker | — | alta | Cláudio Baptista |
| 2026-11-04 | Secção «Fontes oficiais» nas 237 entradas do PDF e 100 notas onde a fonte oficial difere; texto do PDF intacto | (entradas do PDF) | Fontes por tema em FONTES.md | — | alta | Cláudio Baptista |
| 2026-11-04 | Registo de fontes por tema, incluindo novidades OpenAI/Anthropic, regulação e impacto da IA | FONTES.md | Aprovação do utilizador | — | alta | Cláudio Baptista |
| 2026-11-04 | Secção «A vigiar»: pesos do exame, curso/certificação OpenAI, calendário do AI Act | FONTES.md | Pedido do utilizador | — | alta | Cláudio Baptista |
| 2026-11-04 | Nova secção «Publicação e alojamento web» (9 entradas, do grátis ao empresarial: alojamento, túneis, domínio/DNS, TLS, WAF/DDoS, acesso à administração), a pedido do utilizador | publicacao/ | Fontes oficiais dos fornecedores (GitHub, Cloudflare, Netlify, Vercel, Render, AWS, Google Cloud, Oracle, Azure, OVHcloud, Hetzner, Let's Encrypt, CA/B Forum, OWASP, Tailscale) | — | alta | Cláudio Baptista |
| 2026-11-04 | Registo de fontes e «A vigiar» da secção Publicação (planos grátis, preços, validade dos certificados) | FONTES.md | Pedido do utilizador | — | alta | Cláudio Baptista |
| 2026-11-04 | Entrada da secção Publicação | publicacao/acesso-restrito-a-area-de-administracao.md | ver a entrada | — | alta | Cláudio Baptista |
| 2026-11-04 | Entrada da secção Publicação | publicacao/alojamento-dinamico-e-de-teste-gratuito.md | ver a entrada | — | alta | Cláudio Baptista |
| 2026-11-04 | Entrada da secção Publicação | publicacao/alojamento-estatico-gratuito.md | ver a entrada | — | alta | Cláudio Baptista |
| 2026-11-04 | Entrada da secção Publicação | publicacao/alojamento-pago-e-empresarial.md | ver a entrada | — | alta | Cláudio Baptista |
| 2026-11-04 | Entrada da secção Publicação | publicacao/certificados-tls.md | ver a entrada | — | alta | Cláudio Baptista |
| 2026-11-04 | Entrada da secção Publicação | publicacao/dominios-e-dns.md | ver a entrada | — | alta | Cláudio Baptista |
| 2026-11-04 | Entrada da secção Publicação | publicacao/expor-um-servico-local.md | ver a entrada | — | alta | Cláudio Baptista |
| 2026-11-04 | Entrada da secção Publicação | publicacao/limites-e-condicoes-dos-planos-gratuitos.md | ver a entrada | — | alta | Cláudio Baptista |
| 2026-11-04 | Entrada da secção Publicação | publicacao/waf-e-protecao-ddos.md | ver a entrada | — | alta | Cláudio Baptista |
| 2026-11-04 | Nova secção «Acesso remoto (SSH e RDP)» (4 entradas: SSH endurecido, RDP protegido, acesso por identidade, inventário de acessos sem segredos), a pedido do utilizador | acesso-remoto/ | Fontes oficiais (OpenSSH, NIST, Microsoft, AWS, Cloudflare, Tailscale, OWASP) | — | alta | Cláudio Baptista |
| 2026-11-04 | Entrada da secção Acesso remoto | acesso-remoto/ssh-endurecido.md | ver a entrada | — | alta | Cláudio Baptista |
| 2026-11-04 | Entrada da secção Acesso remoto | acesso-remoto/rdp-protegido.md | ver a entrada | — | alta | Cláudio Baptista |
| 2026-11-04 | Entrada da secção Acesso remoto | acesso-remoto/acesso-por-identidade-sem-portas-abertas.md | ver a entrada | — | alta | Cláudio Baptista |
| 2026-11-04 | Entrada da secção Acesso remoto | acesso-remoto/inventario-de-acessos-sem-segredos.md | ver a entrada | — | alta | Cláudio Baptista |
| 2026-11-04 | Registo de fontes e «A vigiar» da secção Acesso remoto (versão do OpenSSH) | FONTES.md | Pedido do utilizador | — | alta | Cláudio Baptista |
| 2026-11-04 | Nova secção «Plataformas para adotar antes de construir» (7 entradas: processo e catálogo de tickets, ERP/CRM, automação, CMS, BI e formulários, com API, webhooks e MCP), a pedido do utilizador | plataformas/ | Sites e documentação oficiais (GLPI, Zammad, Odoo, Dolibarr, n8n, Node-RED, WordPress, Directus, Strapi, Metabase, Superset, LimeSurvey) | — | alta | Cláudio Baptista |
| 2026-11-04 | Entrada da secção Plataformas | plataformas/adotar-antes-de-construir.md | ver a entrada | — | alta | Cláudio Baptista |
| 2026-11-04 | Entrada da secção Plataformas | plataformas/tickets-ativos-e-contratos.md | ver a entrada | — | alta | Cláudio Baptista |
| 2026-11-04 | Entrada da secção Plataformas | plataformas/erp-e-crm.md | ver a entrada | — | alta | Cláudio Baptista |
| 2026-11-04 | Entrada da secção Plataformas | plataformas/automacao-e-integracao.md | ver a entrada | — | alta | Cláudio Baptista |
| 2026-11-04 | Entrada da secção Plataformas | plataformas/cms-e-headless.md | ver a entrada | — | alta | Cláudio Baptista |
| 2026-11-04 | Entrada da secção Plataformas | plataformas/bi-e-dashboards.md | ver a entrada | — | alta | Cláudio Baptista |
| 2026-11-04 | Entrada da secção Plataformas | plataformas/formularios-e-inqueritos.md | ver a entrada | — | alta | Cláudio Baptista |
| 2026-11-04 | Registo de fontes e «A vigiar» da secção Plataformas (MCP oficiais, licenças) | FONTES.md | Pedido do utilizador | — | alta | Cláudio Baptista |
| 2026-11-04 | Retirado de «A vigiar» o ponto dos pesos do exame Claude Certified Architect: a certificação (Foundations e avançado) é base de referência e não se pesquisa | FONTES.md | Pedido do utilizador | — | alta | Cláudio Baptista |
| 2026-11-04 | Novo ficheiro de atualizações da secção IA, por categoria; atualização: fast mode do Opus 4.8 descontinuado, removido a 2026-11-30 | ia/ATUALIZACOES.md | [Claude Platform: fast mode](https://platform.claude.com/docs/en/build-with-claude/fast-mode) | 2026-10-30 | alta | Cláudio Baptista |
| 2026-11-04 | Atualização: Usage and Cost Analytics API em beta; Usage and Cost API passa a legacy | ia/ATUALIZACOES.md | [Claude Platform release notes](https://platform.claude.com/docs/en/release-notes/overview) | 2026-10-29 | alta | Cláudio Baptista |
| 2026-11-04 | Atualização: pedido máximo de 128 MB na Messages API e Token Counting API (só Claude API de primeira parte) | ia/ATUALIZACOES.md | [Claude Platform: API overview](https://platform.claude.com/docs/en/api/overview) | 2026-10-28 | alta | Cláudio Baptista |
| 2026-11-04 | Atualização (categoria OpenAI): GPT-6 Rosalind, acesso restrito, e adenda ao system card | ia/ATUALIZACOES.md | [OpenAI API changelog](https://developers.openai.com/api/docs/changelog); [Deployment Safety Hub](https://deploymentsafety.openai.com/gpt-rosalind-6) | 2026-10-30 | alta | Cláudio Baptista |
| 2026-11-04 | Atualização (categoria OpenAI): nova versão do GPT-6 Luna (29/10), adenda ao system card | ia/ATUALIZACOES.md | [Deployment Safety Hub](https://deploymentsafety.openai.com/gpt-6-luna-october-28-2026-addendum) | 2026-10-29 | alta | Cláudio Baptista |
| 2026-11-04 | Atualização (categoria OpenAI): até 500 USD/mês em créditos de API para ChatGPT Pro e Business | ia/ATUALIZACOES.md | [OpenAI API changelog](https://developers.openai.com/api/docs/changelog) | 2026-10-28 | alta | Cláudio Baptista |
| 2026-11-04 | Novo ficheiro de atualizações da secção Segurança; atualização (NIST): CSWP 50 substitui o IR 7621 Rev. 1 | seguranca/ATUALIZACOES.md | [NIST CSRC](https://csrc.nist.gov/News/2026/small-biz-cybersecurity-non-employer-firms-final) | 2026-11-02 | alta | Cláudio Baptista |
| 2026-11-04 | Atualização (OWASP): SameSite=Lax deve ser definido explicitamente | seguranca/ATUALIZACOES.md | [OWASP PR #2881](https://github.com/OWASP/CheatSheetSeries/pull/2881) | 2026-11-01 | alta | Cláudio Baptista |
| 2026-11-04 | Atualização (OWASP): escapar por omissão todos os valores mostrados (XSS) | seguranca/ATUALIZACOES.md | [OWASP PR #2889](https://github.com/OWASP/CheatSheetSeries/pull/2889) | 2026-11-01 | alta | Cláudio Baptista |
| 2026-11-04 | Novo ficheiro de atualizações da secção 3D, WebGL e animação; atualização (Three.js): r187 remove código descontinuado na r177 e traz alterações que podem partir código | 3d-webgl/ATUALIZACOES.md | [three.js r187](https://github.com/mrdoob/three.js/releases/tag/r187) | 2026-10-30 | alta | Cláudio Baptista |

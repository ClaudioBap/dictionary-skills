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

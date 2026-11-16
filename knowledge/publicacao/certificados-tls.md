---
id: publicacao/certificados-tls
titulo: "Certificados TLS e HTTPS"
seccao: "Publicação e alojamento web"
paginas: []
fonte: "Fontes oficiais dos fornecedores e organismos citados (documentação, preços, limites e termos), ligadas em cada ponto; consultadas a 2026-11-04. Os planos e preços mudam com frequência: confirmar antes de decidir. Não vem do PDF."
verificado_em: 2026-11-03
---

# Certificados TLS e HTTPS

**Resumo:** O HTTPS vem grátis e automático nas plataformas e na Cloudflare (Universal SSL, sempre em Full (strict)), no servidor próprio usa-se Let's Encrypt com renovação automática porque a validade está a encurtar, autoassinados só em desenvolvimento e OV/EV pagos só quando a política da empresa o exige.

## Conteúdo

- HTTPS automático e grátis nas plataformas com certificados Let's Encrypt: GitHub Pages (github.io e domínios próprios; ativar «Enforce HTTPS»), Netlify (criação e renovação automáticas) e Vercel (renova 14 a 30 dias antes de expirar; certificado próprio só no Enterprise) — [GitHub Pages HTTPS](https://docs.github.com/en/pages/getting-started-with-github-pages/securing-your-github-pages-site-with-https), [Netlify HTTPS](https://docs.netlify.com/manage/domains/secure-domains-with-https/https-ssl/), [Vercel SSL](https://vercel.com/docs/domains/working-with-ssl)
- Cloudflare Universal SSL: certificado DV grátis em todos os planos, cobre o domínio raiz e os subdomínios de primeiro nível; níveis mais profundos exigem Total TLS ou Advanced Certificate Manager (a 2026-11-04) — [Universal SSL](https://developers.cloudflare.com/ssl/edge-certificates/universal-ssl/)
- Modos SSL da Cloudflare: Flexible cifra só visitante→Cloudflare e deixa Cloudflare→origem em HTTP sem cifra; Full cifra mas não valida o certificado da origem; Full (strict) valida-o (AC pública ou Cloudflare Origin CA); a Cloudflare recomenda Full ou Full (strict) — usar Full (strict) — [Modos SSL](https://developers.cloudflare.com/ssl/origin-configuration/ssl-modes/)
- Servidor próprio: Let's Encrypt grátis via cliente ACME, 90 dias por omissão e 6 dias por opção; não emite OV nem EV (a 2026-11-04) — [Let's Encrypt FAQ](https://letsencrypt.org/docs/faq/)
- Validade a encurtar: máximo de 200 dias desde 2026-03-15, 100 dias a partir de 2027-03-15 e 47 dias a partir de 2029-03-15; a Let's Encrypt passa a 64 dias em 2027-02-10 e a 45 dias em 2028-02-16 — renovar sempre automaticamente, com ARI ou a cerca de 2/3 da validade — [CA/B Forum Baseline Requirements](https://cabforum.org/working-groups/server/baseline-requirements/requirements/), [Let's Encrypt 64 dias](https://letsencrypt.org/2026/10/07/64-day-certs), [Let's Encrypt 90→45](https://letsencrypt.org/2025/12/02/from-90-to-45/)
- Autoassinados ou mkcert só em desenvolvimento local ou serviços internos: o mkcert serve para desenvolvimento e não para produção, e a chave `rootCA-key.pem` nunca se partilha; em sites públicos os browsers mostram aviso *(sem fonte oficial)* — [mkcert](https://github.com/FiloSottile/mkcert)
- Certificados pagos OV/EV só quando a política da empresa o exigir: no EV a AC verifica a existência legal, o nome e o número de registo da entidade (EV Guidelines 2.0.4, a 2026-11-04) — [CA/B Forum EV Guidelines](https://cabforum.org/working-groups/server/extended-validation/guidelines/)

**Para uma skill:** A proposta indica quem emite e renova o certificado e como a renovação é automática, e, se houver Cloudflare, que o modo SSL é Full (strict) e nunca Flexible.

## Ver também

- [TLS e cabeçalhos versionados](../seguranca/tls-e-cabecalhos-versionados.md) (Segurança)
- [Proxy reverso e borda (Traefik, Nginx, Caddy)](../infraestrutura/proxy-reverso-e-borda.md) (Serviços de infraestrutura)

Fonte: Fontes oficiais dos fornecedores e organismos citados (documentação, preços, limites e termos), ligadas em cada ponto; consultadas a 2026-11-04. Os planos e preços mudam com frequência: confirmar antes de decidir. Não vem do PDF.

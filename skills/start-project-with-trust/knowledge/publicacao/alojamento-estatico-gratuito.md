---
id: publicacao/alojamento-estatico-gratuito
titulo: "Alojamento estático gratuito"
seccao: "Publicação e alojamento web"
paginas: []
fonte: "Fontes oficiais dos fornecedores e organismos citados (documentação, preços, limites e termos), ligadas em cada ponto; consultadas a 2026-11-04. Os planos e preços mudam com frequência: confirmar antes de decidir. Não vem do PDF."
verificado_em: 2026-11-03
---

# Alojamento estático gratuito

**Resumo:** GitHub Pages, GitLab Pages, Cloudflare (Workers com ativos estáticos ou Pages), Netlify Free e Vercel Hobby publicam sites estáticos sem custo, com domínio próprio e HTTPS, mas com limites de tamanho, tráfego e builds e, no GitHub Pages e na Vercel Hobby, com restrições ao uso comercial.

## Conteúdo

- GitHub Pages: grátis a partir de repositório público no GitHub Free; site publicado até 1 GB, limite flexível de 100 GB/mês de largura de banda e de 10 builds/hora (não se aplica com workflow próprio do GitHub Actions), deploy até 10 min; se exceder, o GitHub pode deixar de servir o site; domínio próprio com HTTPS e opção «Enforce HTTPS»; não pode ser alojamento grátis de negócio online, e-commerce ou SaaS (botões de donativo são permitidos) (a 2026-11-04) — [Limites do GitHub Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/github-pages-limits), [Criar um site](https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site), [HTTPS no GitHub Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/securing-your-github-pages-site-with-https), [Termos de produtos adicionais](https://docs.github.com/en/site-policy/github-terms/github-terms-for-additional-products-and-features)
- GitLab Pages: incluído no escalão Free do GitLab.com, sem custo adicional, publicado via GitLab CI/CD; só conteúdo estático (sem PHP/ASP); HTTPS automático em `.gitlab.io` e domínio próprio com certificados Let's Encrypt obtidos e renovados automaticamente (a 2026-11-04) — [GitLab Pages](https://docs.gitlab.com/user/project/pages/)
- Cloudflare: a documentação do Pages diz «Start new projects with Workers»; nos Workers, os pedidos a ativos estáticos são grátis e ilimitados; no Pages Free: 500 builds/mês, 1 build de cada vez, 20 000 ficheiros por site, 25 MiB por ficheiro, 100 domínios próprios por projeto (a 2026-11-04) — [Cloudflare Pages](https://developers.cloudflare.com/pages/), [Preços dos Workers](https://developers.cloudflare.com/workers/platform/pricing/), [Limites do Pages](https://developers.cloudflare.com/pages/platform/limits/)
- Netlify Free: 0 USD com 300 créditos/mês e limite rígido (sem recarga); largura de banda custa 20 créditos/GB e cada deploy de produção 15 créditos (deploy previews não contam); domínios próprios com SSL incluídos; contas novas usam este modelo de créditos desde 2025-09-04 (a 2026-11-04) — [Preços Netlify](https://www.netlify.com/pricing/), [Planos por créditos](https://docs.netlify.com/manage/accounts-and-billing/billing/billing-for-credit-based-plans/credit-based-pricing-plans/)
- Vercel Hobby: grátis, inclui 100 GB de Fast Data Transfer, 1 000 000 de pedidos CDN e 1 000 000 de invocações de funções por mês, 100 deploys/dia, 50 domínios por projeto; restrito a uso pessoal não comercial — conta como comercial qualquer deploy que gere ganho financeiro a alguém envolvido, incluindo um consultor pago para escrever o código, publicidade ou pagamentos (donativos não contam) (a 2026-11-04) — [Plano Hobby](https://vercel.com/docs/plans/hobby), [Fair use: uso comercial](https://vercel.com/docs/limits/fair-use-guidelines)

**Para uma skill:** a opção estática grátis escolhida permite o uso pretendido (comercial ou não), suporta domínio próprio com HTTPS e os seus limites de tamanho, tráfego e builds cobrem o previsto com margem

## Ver também

- [Domínios e DNS](../publicacao/dominios-e-dns.md) (Publicação e alojamento web)
- [Certificados TLS e HTTPS](../publicacao/certificados-tls.md) (Publicação e alojamento web)
- [Desempenho web (Core Web Vitals)](../design/desempenho-web-core-web-vitals.md) (Design e experiência de utilizador)

Fonte: Fontes oficiais dos fornecedores e organismos citados (documentação, preços, limites e termos), ligadas em cada ponto; consultadas a 2026-11-04. Os planos e preços mudam com frequência: confirmar antes de decidir. Não vem do PDF.

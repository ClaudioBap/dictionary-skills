---
id: publicacao/dominios-e-dns
titulo: "Domínios e DNS"
seccao: "Publicação e alojamento web"
paginas: []
fonte: "Fontes oficiais dos fornecedores e organismos citados (documentação, preços, limites e termos), ligadas em cada ponto; consultadas a 2026-11-04. Os planos e preços mudam com frequência: confirmar antes de decidir. Não vem do PDF."
verificado_em: 2026-11-03
---

# Domínios e DNS

**Resumo:** Para teste pessoal basta o subdomínio grátis da plataforma; para produção regista-se domínio próprio (Cloudflare Registrar a preço de custo ou .pt através de um registrar credenciado pelo .PT), com DNS gerido na Cloudflare e DNSSEC ativo.

## Conteúdo

- Grátis, teste pessoal: usar o subdomínio do serviço — `<owner>.github.io` (um site de utilizador por conta), `<projeto>.pages.dev`, `<projeto>.netlify.app` ou `<projeto>-<scope>.vercel.app` (público por omissão) — [GitHub Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/about-github-pages), [Cloudflare Pages domínios](https://developers.cloudflare.com/pages/configuration/custom-domains/), [Netlify domínios](https://docs.netlify.com/manage/domains/get-started-with-domains/), [Vercel URLs geradas](https://vercel.com/docs/deployments/generated-urls)
- Domínio próprio sobre a plataforma: um subdomínio (ex.: `www`) aponta por CNAME para o endereço da plataforma; no Cloudflare Pages um domínio raiz exige que a zona esteja na mesma conta Cloudflare — [Cloudflare Pages domínios](https://developers.cloudflare.com/pages/configuration/custom-domains/), [Netlify domínios](https://docs.netlify.com/manage/domains/get-started-with-domains/)
- DNS autoritativo gerido na Cloudflare, disponível em todos os planos incluindo o Free (a 2026-11-04) — [Cloudflare DNS](https://developers.cloudflare.com/dns/)
- Cloudflare Registrar: registo, transferência e renovação a preço de custo (só taxas do registo e da ICANN, sem margem), mais de 430 TLD, e obriga a usar os nameservers da Cloudflare (a 2026-11-04); confirmar que a extensão pretendida é suportada antes de a propor — [Cloudflare Registrar](https://www.cloudflare.com/products/registrar/), [Registrar docs](https://developers.cloudflare.com/registrar/), [Registrar FAQ](https://developers.cloudflare.com/registrar/faq/)
- Domínios .pt: geridos pela Associação DNS.PT e registados através de Registrars credenciados pelo .PT por protocolo (108 listados a 2026-11-04) — [.PT](https://www.pt.pt/pt/), [O que é um registrar](https://www.pt.pt/pt/registrar/o-que-e-um-registrar/), [Lista de Registrars](https://www.pt.pt/pt/registrars/)
- DNSSEC: na Cloudflare ativa-se num clique, a zona é assinada e o registo DS é colocado no registrar (automático no Cloudflare Registrar), sem custo para clientes Cloudflare; desativar DNSSEC no registrar antigo antes de mudar nameservers; o .pt suporta DNSSEC — [Cloudflare DNSSEC](https://developers.cloudflare.com/dns/dnssec/), [Registrar docs](https://developers.cloudflare.com/registrar/), [DNSSEC no .pt](https://www.pt.pt/pt/seguranca/dnssec/)

**Para uma skill:** A proposta indica se o site usa o subdomínio da plataforma ou domínio próprio, qual o registrar, onde fica o DNS e se o DNSSEC está ativo com o registo DS publicado.

## Ver também

- [Alojamento estático gratuito](../publicacao/alojamento-estatico-gratuito.md) (Publicação e alojamento web)
- [Alojamento pago e empresarial](../publicacao/alojamento-pago-e-empresarial.md) (Publicação e alojamento web)
- [Proxy reverso e borda (Traefik, Nginx, Caddy)](../infraestrutura/proxy-reverso-e-borda.md) (Serviços de infraestrutura)

Fonte: Fontes oficiais dos fornecedores e organismos citados (documentação, preços, limites e termos), ligadas em cada ponto; consultadas a 2026-11-04. Os planos e preços mudam com frequência: confirmar antes de decidir. Não vem do PDF.

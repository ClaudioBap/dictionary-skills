---
id: publicacao/waf-e-protecao-ddos
titulo: "WAF e proteção DDoS"
seccao: "Publicação e alojamento web"
paginas: []
fonte: "Fontes oficiais dos fornecedores e organismos citados (documentação, preços, limites e termos), ligadas em cada ponto; consultadas a 2026-11-04. Os planos e preços mudam com frequência: confirmar antes de decidir. Não vem do PDF."
verificado_em: 2026-11-03
---

# WAF e proteção DDoS

**Resumo:** Do grátis ao empresarial: Cloudflare Free (DDoS ilimitado e regras geridas base), WAF open source com OWASP CRS, Bunny Shield, Cloudflare Pro/Business/Enterprise e WAF dos fornecedores de nuvem.

## Conteúdo

- Cloudflare Free (0 USD): DDoS standard ilimitado nas camadas 3 a 7 em todos os planos; WAF só com o Free Managed Ruleset, 5 regras personalizadas e suporte por comunidade (a 2026-11-04) — [Cloudflare DDoS](https://developers.cloudflare.com/ddos-protection/), [Regras geridas](https://developers.cloudflare.com/waf/managed-rules/), [Regras personalizadas](https://developers.cloudflare.com/waf/custom-rules/), [Planos Cloudflare](https://www.cloudflare.com/plans/)
- WAF open source self-hosted: OWASP CRS (regras genéricas para ModSecurity ou motores compatíveis; versão 4.30.0 e LTS 4.25.2 a 2026-11-04) com OWASP Coraza (100% compatível com o CRS e substituto do ModSecurity); licença grátis, mas exige operar e afinar — [OWASP CRS](https://coreruleset.org/), [Coraza](https://coraza.io/)
- Alternativa europeia Bunny Shield (empresa com sede na Europa): WAF, DDoS, rate limiting e bots; Basic grátis, Advanced 9,5 USD/mês, Business 99 USD/mês, Enterprise sob consulta (a 2026-11-04) — [Bunny Shield](https://bunny.net/shield/), [Sobre a bunny.net](https://bunny.net/about/)
- Cloudflare Pro (20 USD/mês anual ou 25 mensal) e Business (200 ou 250 USD/mês) acrescentam o Cloudflare Managed Ruleset e o OWASP Core Ruleset, 20 e 100 regras personalizadas; o Business tem SLA de 100% e chat; o Enterprise (contrato) tem 1000 regras, Sensitive Data Detection e suporte 24x7 (a 2026-11-04) — [Planos Cloudflare](https://www.cloudflare.com/plans/), [Regras geridas](https://developers.cloudflare.com/waf/managed-rules/), [Regras personalizadas](https://developers.cloudflare.com/waf/custom-rules/)
- WAF de nuvem quando a app já está nesse fornecedor: AWS WAF (CloudFront, ALB, API Gateway, App Runner, Amplify; Shield Standard sem custo extra, Shield Advanced pago), Azure WAF (Application Gateway, Application Gateway for Containers, Front Door; CDN em pré-visualização) e Google Cloud Armor (DDoS L3/L4 sempre ativo, regras pré-configuradas do OWASP CRS 4.22; o Enterprise acrescenta Adaptive Protection) — [AWS WAF](https://docs.aws.amazon.com/waf/latest/developerguide/what-is-aws-waf.html), [Azure WAF](https://learn.microsoft.com/en-us/azure/web-application-firewall/overview), [Cloud Armor](https://docs.cloud.google.com/armor/docs/cloud-armor-overview)

**Para uma skill:** A proposta indica qual o WAF à frente da app, o conjunto de regras ativo (gerido ou OWASP CRS), o plano e o custo mensal com data.

## Ver também

- [Rate limit e WAF](../seguranca/rate-limit-e-waf.md) (Segurança)
- [Proxy reverso e borda (Traefik, Nginx, Caddy)](../infraestrutura/proxy-reverso-e-borda.md) (Serviços de infraestrutura)
- [Alojamento pago e empresarial](../publicacao/alojamento-pago-e-empresarial.md) (Publicação e alojamento web)

Fonte: Fontes oficiais dos fornecedores e organismos citados (documentação, preços, limites e termos), ligadas em cada ponto; consultadas a 2026-11-04. Os planos e preços mudam com frequência: confirmar antes de decidir. Não vem do PDF.

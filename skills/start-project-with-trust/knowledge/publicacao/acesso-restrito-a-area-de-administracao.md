---
id: publicacao/acesso-restrito-a-area-de-administracao
titulo: "Acesso restrito à área de administração"
seccao: "Publicação e alojamento web"
paginas: []
fonte: "Fontes oficiais dos fornecedores e organismos citados (documentação, preços, limites e termos), ligadas em cada ponto; consultadas a 2026-11-04. Os planos e preços mudam com frequência: confirmar antes de decidir. Não vem do PDF."
verificado_em: 2026-11-03
---

# Acesso restrito à área de administração

**Resumo:** A área de administração fica atrás de SSO com MFA obrigatório (Cloudflare Access, Entra application proxy ou OIDC com Keycloak) ou só numa rede privada (Tailscale), seguindo as cheat sheets OWASP de autenticação e MFA.

## Conteúdo

- Cloudflare Access (Zero Trust): plano Free a 0 USD com limite de 50 utilizadores e registos até 24 h; Pay-as-you-go e contrato sem limite de utilizadores (a 2026-11-04) — [Cloudflare Access](https://www.cloudflare.com/zero-trust/products/access/), [Cloudflare One](https://developers.cloudflare.com/cloudflare-one/)
- Identity providers no Access: PIN de uso único por email (expira em 10 min), Google (sem Workspace), GitHub, Microsoft Entra ID e OIDC/SAML genéricos — [Identity providers](https://developers.cloudflare.com/cloudflare-one/integrations/identity-providers/), [OTP por email](https://developers.cloudflare.com/cloudflare-one/integrations/identity-providers/one-time-pin/), [Google](https://developers.cloudflare.com/cloudflare-one/integrations/identity-providers/google/), [GitHub](https://developers.cloudflare.com/cloudflare-one/integrations/identity-providers/github/)
- Exigir MFA no Access: regra Require «Authentication method = mfa» (Okta, Entra ID, OIDC ou SAML genéricos) ou MFA independente do próprio Access ao nível da organização, aplicação ou política — [Requisitos de MFA](https://developers.cloudflare.com/cloudflare-one/access-controls/policies/mfa-requirements/)
- Autenticação na própria app com OIDC via Keycloak (IAM open source com OpenID Connect, OAuth 2.0, SAML e 2FA) — [Keycloak](https://www.keycloak.org/)
- Rede privada com Tailscale (tailnet com WireGuard): Personal grátis até 6 utilizadores só para uso não comercial, Standard 8 USD e Premium 18 USD por utilizador/mês (a 2026-11-04) — [O que é o Tailscale](https://tailscale.com/kb/1151/what-is-tailscale), [Preços Tailscale](https://tailscale.com/pricing)
- Microsoft Entra application proxy: publica apps internas com pré-autenticação Entra ID, Conditional Access e MFA, e o conector só usa ligações de saída — [Entra application proxy](https://learn.microsoft.com/en-us/entra/identity/app-proxy/overview-what-is-app-proxy)
- Boas práticas OWASP: MFA obrigatório para administradores, preferir FIDO2/WebAuthn ou TOTP e evitar SMS; mensagens de erro genéricas, falhas contadas por conta e reautenticação em operações sensíveis — [OWASP MFA Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Multifactor_Authentication_Cheat_Sheet.html), [OWASP Authentication Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Authentication_Cheat_Sheet.html)

**Para uma skill:** Abrir o URL da área de administração numa sessão anónima leva ao login SSO com MFA obrigatório (ou falha fora da rede privada), nunca diretamente à app.

## Ver também

- [Autenticação forte, sem passwords fracas](../seguranca/autenticacao-forte.md) (Segurança)
- [Autorização no servidor, negar por omissão](../seguranca/autorizacao-no-servidor.md) (Segurança)
- [Identidade (Keycloak)](../infraestrutura/identidade-keycloak.md) (Serviços de infraestrutura)
- [Identidade por OIDC genérico](../soberania/identidade-por-oidc-generico.md) (Soberania digital)
- [Microsoft Azure e Entra ID](../nuvem/microsoft-azure-e-entra-id.md) (Nuvem e identidade (AWS, Azure, Microsoft, OVH))
- [Jump server (bastion)](../infraestrutura/jump-server-bastion.md) (Serviços de infraestrutura)
- [Expor um serviço local para testes](../publicacao/expor-um-servico-local.md) (Publicação e alojamento web)

Fonte: Fontes oficiais dos fornecedores e organismos citados (documentação, preços, limites e termos), ligadas em cada ponto; consultadas a 2026-11-04. Os planos e preços mudam com frequência: confirmar antes de decidir. Não vem do PDF.

---
id: nuvem/login-com-entra-id-oidc
titulo: "Login com Microsoft Entra ID (OpenID Connect)"
seccao: "Nuvem e identidade (AWS, Azure, Microsoft, OVH)"
paginas: []
fonte: "Documentação oficial do Microsoft Learn, ligada em cada ponto; consultada a 2026-11-10. Não vem do PDF."
data_lancamento: 2026-06-30
confianca: alta
verificado_em: 2026-11-10
---

# Login com Microsoft Entra ID (OpenID Connect)

**Resumo:** Para um utilizador entrar com a conta Microsoft da organização, regista-se a aplicação no Entra, usa-se o endpoint v2.0 através de uma biblioteca MSAL, e ficam por preencher só o tenant, o client ID, a credencial e os URIs.

## Conteúdo

- Registar a aplicação: no Microsoft Entra admin center, «Entra ID > App registrations > New registration», dar um nome e escolher «Supported account types». A documentação recomenda «Single tenant only» para a maioria das aplicações; as outras opções são «Multiple Entra ID tenants», «Any Entra ID Tenant + Personal Microsoft accounts» e «Personal accounts only». Depois de registar, anotar o «Application (client) ID» da página Overview. Fonte: [Quickstart: register an application (2026-05-14)](https://learn.microsoft.com/en-us/entra/identity-platform/quickstart-register-app)
- Redirect URI: em «Authentication», «Add a platform», plataforma Web, e o URI exato da aplicação (o exemplo da documentação é `https://localhost:8080/`). Regras: «Don't use wildcard reply URLs or insecure URI schemes such as http»; manter a lista curta e ser dono de todos os URIs. Fonte: [OpenID Connect on the Microsoft identity platform (2026-06-30)](https://learn.microsoft.com/en-us/entra/identity-platform/v2-protocols-oidc), [Security best practices for app registration (2026-10-01)](https://learn.microsoft.com/en-us/entra/identity-platform/security-best-practices-for-app-registration)
- Credencial: «Microsoft recommends that you use a certificate instead of a client secret before moving the application to a production environment». Um segredo de cliente dura no máximo 24 meses, a recomendação é menos de 12, e o valor só se vê uma vez. Sempre que possível, uma identidade gerida em vez de credenciais. Fonte: [Add credentials (2025-03-26)](https://learn.microsoft.com/en-us/entra/identity-platform/how-to-add-credentials), [Security best practices for app registration](https://learn.microsoft.com/en-us/entra/identity-platform/security-best-practices-for-app-registration)
- Endpoints v2.0: authority `https://login.microsoftonline.com/{tenant}/v2.0` e documento de descoberta em `/.well-known/openid-configuration`, onde `{tenant}` é o «Directory (tenant) ID», o domínio da organização, ou `common`, `organizations` e `consumers`. O scope `openid` é obrigatório; `profile` e `email` dão os dados do utilizador. Os ID tokens não são emitidos por omissão: se o fluxo os pedir diretamente, ativa-se «ID tokens» em «Implicit grant and hybrid flows». Para aplicações web, `response_mode=form_post`, e a validação dos tokens faz-se com uma biblioteca. O logout usa `/oauth2/v2.0/logout` com um `post_logout_redirect_uri` registado. Fonte: [OpenID Connect on the Microsoft identity platform (2026-06-30)](https://learn.microsoft.com/en-us/entra/identity-platform/v2-protocols-oidc)
- Identificar o utilizador: `oid` é «The immutable identifier for an object, in this case, a user account» e identifica o utilizador em todas as aplicações do tenant; `sub` é imutável mas diferente por aplicação; `preferred_username` «can't be used to make authorization decisions». A chave do utilizador é `oid`, com `tid` quando há vários tenants. Fonte: [ID token claims reference (2023-05-30)](https://learn.microsoft.com/en-us/entra/identity-platform/id-token-claims-reference)
- Bibliotecas: MSAL Node, Python, Java, .NET, MSAL.js e MSAL React. Com a MSAL «There's no need to directly use the OAuth libraries or code against the protocol in your application», e a cache e a renovação de tokens ficam a cargo dela. A ADAL deixou de ter suporte. Fonte: [MSAL overview (2024-11-13)](https://learn.microsoft.com/en-us/entra/identity-platform/msal-overview)
- Que tenant: o tenant workforce «is for your employees, internal business apps, and other organizational resources»; um tenant externo (Entra External ID) é «exclusively for Microsoft Entra External ID scenarios where you want to publish apps to consumers or business customers», separado do primeiro, e «core features are free for your first 50,000 monthly active users». Fonte: [Tenant configurations (2025-05-20)](https://learn.microsoft.com/en-us/entra/external-id/tenant-configurations)
- Licença: o Entra ID Free vem incluído nas subscrições Microsoft (Azure, Microsoft 365). O login básico e o SSO não precisam de mais; o Conditional Access exige P1 e a versão baseada em risco exige P2. Preços e limite de objetos do escalão Free: não confirmados nas páginas lidas. Fonte: [Microsoft Entra licensing (2026-06-18)](https://learn.microsoft.com/en-us/entra/fundamentals/licensing)
- O que fica por preencher pelo dono do tenant *(interpretação, a partir dos pontos acima)*: `ENTRA_TENANT_ID`, `ENTRA_CLIENT_ID`, a credencial (`ENTRA_CLIENT_SECRET` em desenvolvimento, certificado em produção), `ENTRA_REDIRECT_URI` e `ENTRA_POST_LOGOUT_REDIRECT_URI`. Tudo o resto (código, configuração, testes, instruções de registo) fica pronto antes.

**Para uma skill:** um login pelo Entra fica pronto com uma biblioteca MSAL, o authority v2.0 e o utilizador identificado por `oid` (e `tid`), com só o tenant, o client ID, a credencial e os URIs em «Por preencher»; em produção a credencial é um certificado ou uma identidade gerida, não um segredo.

## Ver também

- [Microsoft Azure e Entra ID](microsoft-azure-e-entra-id.md) (Nuvem e identidade)
- [Autenticação e SSO (Keycloak, OpenID Connect)](../plataformas/autenticacao-e-sso.md) (Plataformas para adotar antes de construir)

Fonte: documentação oficial do Microsoft Learn, ligada em cada ponto; consultada a 2026-11-10. Não vem do PDF.

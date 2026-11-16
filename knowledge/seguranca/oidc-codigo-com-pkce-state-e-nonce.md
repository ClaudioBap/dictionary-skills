---
id: seguranca/oidc-codigo-com-pkce-state-e-nonce
titulo: "Login por OIDC: código com PKCE, state, nonce e validação do id_token"
seccao: "Segurança"
paginas: []
fonte: "https://learn.microsoft.com/en-us/entra/identity-platform/v2-oauth2-auth-code-flow"
data_lancamento: 2026-01-09
confianca: media
verificado_em: 2026-11-16
---

# Login por OIDC: código com PKCE, state, nonce e validação do id_token

**Resumo:** Num login por OIDC com servidor, usa-se o fluxo de código com PKCE (S256), um `state` ligado ao navegador que começou o pedido, um `nonce` no id_token, o URI de retorno exato, e valida-se o id_token (assinatura, emissor, audiência, validade e nonce) antes de abrir sessão, identificando a pessoa por `oid` ou `sub`.

## Conteúdo

- Fluxo: usar o código de autorização com PKCE e OIDC em todos os tipos de aplicação. O `code_challenge` é recomendado para clientes públicos e confidenciais; o `code_challenge_method` deve ser S256, que a RFC 7636 define como `BASE64URL(SHA256(ASCII(code_verifier)))` e torna obrigatório no servidor. O `plain` não se usa em implementações novas. O `code_verifier` tem entre 43 e 128 caracteres e, segundo a RFC, pelo menos 256 bits de entropia. Fonte: [Authorization code flow (Microsoft Learn, ms.date 2026-01-09, atualizada 2026-06-15, lida a 2026-11-16)](https://learn.microsoft.com/en-us/entra/identity-platform/v2-oauth2-auth-code-flow), [RFC 7636 (2015)](https://datatracker.ietf.org/doc/html/rfc7636)
- Redirecionamento: o `redirect_uri` tem de coincidir exatamente com um dos registados, e a RFC 9700 exige comparação exata de texto. O servidor de autorização não redireciona automaticamente com uma combinação inválida de `client_id` e URI. Fonte: a página de Microsoft Learn acima, [RFC 9700 (janeiro de 2025; li cerca de dois terços do texto)](https://datatracker.ietf.org/doc/html/rfc9700)
- `state`: um valor aleatório e único contra CSRF, que a resposta devolve igual e a aplicação confirma. Não leva URLs nem dados sensíveis. A RFC 9700 diz que, sem PKCE nem nonce, o `state` tem de estar ligado ao navegador do utilizador, e que o PKCE chega contra CSRF só depois de confirmar que o servidor o suporta. Fonte: as duas páginas acima.
- `nonce`: vai para o id_token como claim, e a aplicação rejeita o token se não coincidir com o do pedido, para evitar repetição de tokens. Fonte: [ID token claims reference (ms.date 2023-05-30)](https://learn.microsoft.com/en-us/entra/identity-platform/id-token-claims-reference)
- O código dura pouco (cerca de 1 minuto). Um cliente confidencial troca-o com segredo ou, melhor, certificado, e junta o `code_verifier`; um cliente público nunca usa segredo. Fonte: a página do fluxo de código.
- Validar o id_token antes de abrir sessão: assinatura e emissor contra o documento de descoberta; `iss` igual ao esperado; `aud` igual ao identificador da aplicação («The token should be rejected if it fails to match»); `exp` e `nbf`; `nonce`. As chaves públicas vêm do `jwks_uri` e escolhem-se pelo `kid` do cabeçalho. O Entra roda as chaves, por isso a aplicação trata as mudanças sozinha, com uma verificação razoável de 24 em 24 horas. O OIDC acrescenta que, se houver `azp`, se valida. Num tenant só, comparar o `iss` exatamente. Fonte: [Access tokens: validar (ms.date 2025-05-14, atualizada 2026-07-17)](https://learn.microsoft.com/en-us/entra/identity-platform/access-tokens), [OpenID Connect Core 1.0, secção 3.1.3.7 (sem data)](https://openid.net/specs/openid-connect-core-1_0.html)
- Identificar a pessoa: `oid` (ou `sub`) é imutável e a chave a guardar; `preferred_username` e o email mudam e nunca servem para autorizar. Fonte: a página dos claims do id_token.
- Grupos: acima de 200 grupos num JWT o claim `groups` não vem no token e aparece um claim de excesso, a resolver pelo Microsoft Graph. Fonte: a mesma página.
- Não ler nem validar tokens de APIs que não são nossas («Don't attempt to validate or read tokens for any API you don't own»). Fonte: a página do fluxo de código.

**Para uma skill:** o login por OIDC usa código com PKCE S256, `state` ligado ao navegador (por exemplo, por um cookie com valor aleatório cujo resumo vai no `state`) e `nonce`; o URI de retorno é exato e só https (http só em localhost); o id_token é validado em `iss`, `aud`, `exp`, `nonce` e assinatura, com as chaves relidas quando aparece um `kid` novo; a pessoa guarda-se por `oid`, e os grupos prevêem o claim de excesso. O ponto do cookie ligado ao navegador é *(interpretação)*, a partir da exigência da RFC 9700 de ligar o `state` ao agente do utilizador. Os pedidos de login por concluir guardam-se com prazo curto e com um máximo por máquina, para quem os começa sem os acabar não encher a memória *(interpretação, sem fonte oficial)*.

## Ver também

- [Login com Microsoft Entra ID (OpenID Connect)](../nuvem/login-com-entra-id-oidc.md) (Nuvem e identidade)
- [Identidade por OIDC genérico](../soberania/identidade-por-oidc-generico.md) (Soberania)
- [MFA imposto pelo fornecedor de identidade](mfa-imposto-pelo-fornecedor-de-identidade.md) (Segurança)
- [Sessões robustas](sessoes-robustas.md) (Segurança)

Fonte: documentação oficial do Microsoft Learn, RFC 7636, RFC 9700 e OpenID Connect Core, ligadas em cada ponto; lidas a 2026-11-16. Confiança média porque a especificação OIDC e a RFC 9700 só foram lidas em parte e não indicam data. Não vem do PDF.

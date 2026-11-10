---
id: plataformas/autenticacao-e-sso
titulo: "Autenticação e SSO (Keycloak, OpenID Connect)"
seccao: "Plataformas para adotar antes de construir"
paginas: []
fonte: "Site do Keycloak, ficheiro LICENSE do repositório e página da OpenID Foundation, ligados em cada ponto; consultados a 2026-11-10, páginas sem data. Não vem do PDF."
data_lancamento: null
confianca: media
verificado_em: 2026-11-10
---

# Autenticação e SSO (Keycloak, OpenID Connect)

**Resumo:** Antes de programar um login, adota-se um servidor de identidade: o Keycloak dá SSO, OpenID Connect, OAuth 2.0 e SAML 2.0 com licença Apache 2.0, e a aplicação só precisa de falar OpenID Connect.

## Conteúdo

- O que cobre: SSO e single sign-out, identity brokering e login social, federação com LDAP e Active Directory, consolas de administração e de conta, e autorização fina. Protocolos: «OpenID Connect, OAuth 2.0, and SAML 2.0». Fonte: [Keycloak](https://www.keycloak.org/)
- Licença: «Apache License, Version 2.0». Fonte: [LICENSE.txt (keycloak/keycloak)](https://github.com/keycloak/keycloak/blob/main/LICENSE.txt)
- O protocolo: «OpenID Connect is an interoperable authentication protocol based on the OAuth 2.0 framework of specifications» (a frase continua com as referências aos RFC 6749 e 6750; foi lida truncada). Fonte: [How OpenID Connect Works](https://openid.net/developers/how-connect-works/)
- Como se liga *(interpretação)*: a aplicação é um cliente OpenID Connect do Keycloak, e qualquer plataforma desta secção que suporte OIDC ou SAML entra no mesmo SSO.
- Alojamento: a página inicial não diz nada sobre auto-alojamento. Localização dos dados na UE: não confirmada nas páginas lidas; auto-alojado, fica onde correr. A entrada de infraestrutura trata o Keycloak como alternativa soberana: ver [Identidade (Keycloak)](../infraestrutura/identidade-keycloak.md).

**Para uma skill:** um pedido com login tem o Keycloak, ou outro servidor OpenID Connect, como opção na decisão «Adotar ou construir», e a aplicação não guarda passwords próprias; a prova é o login por OIDC a funcionar com autenticação forte ativa.

## Ver também

- [Identidade (Keycloak)](../infraestrutura/identidade-keycloak.md) (Serviços de infraestrutura)
- [Autenticação forte, sem passwords fracas](../seguranca/autenticacao-forte.md) (Segurança)
- [Autorização no servidor, negar por omissão](../seguranca/autorizacao-no-servidor.md) (Segurança)
- [Sessões robustas](../seguranca/sessoes-robustas.md) (Segurança)
- [Adotar antes de construir](adotar-antes-de-construir.md) (Plataformas para adotar antes de construir)

Fonte: site do Keycloak, ficheiro LICENSE do repositório e página da OpenID Foundation, ligados em cada ponto; consultados a 2026-11-10, páginas sem data. Não vem do PDF.

---
id: seguranca/autenticacao-forte
titulo: "Autenticação forte, sem passwords fracas"
seccao: "Segurança"
paginas: [5]
fonte: Dicionario-Boas-Praticas.pdf
verificado_em: 2026-11-03
---

# Autenticação forte, sem passwords fracas

**Resumo:** Preferir SSO/OIDC com MFA; se houver password, hash forte, comparação em tempo constante e rate limit.

## Conteúdo

- Preferir SSO/OIDC com MFA; não guardar passwords na aplicação.
- Se houver login por password: nunca em texto nem com comparação ingénua; hash forte (argon2id), comparação em tempo constante, rate limit e bloqueio.
- Nenhum login por password em ambiente exposto com dados reais.

**Para uma skill:** sem passwords em claro, sem `==` em credenciais, com rate limit no login.

## Ver também

- [Identidade (Keycloak)](../infraestrutura/identidade-keycloak.md) (Serviços de infraestrutura)
- [Identidade por OIDC genérico](../soberania/identidade-por-oidc-generico.md) (Soberania digital)

Fonte: pág. 5 (Dicionario-Boas-Praticas.pdf)

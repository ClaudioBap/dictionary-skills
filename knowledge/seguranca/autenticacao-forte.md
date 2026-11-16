---
id: seguranca/autenticacao-forte
titulo: "Autenticação forte, sem passwords fracas"
seccao: "Segurança"
paginas: [5]
fonte: Dicionario-Boas-Praticas.pdf
verificado_em: 2026-11-03
fontes_oficiais_consultadas_em: 2026-11-04
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

## Fontes oficiais

*Ligações externas que apoiam esta entrada, consultadas a 2026-11-04. Não alteram o texto acima.*

- [OWASP Authentication Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Authentication_Cheat_Sheet.html) — MFA, OIDC/SSO, comparação em tempo constante, limitação de tentativas
- [OWASP Password Storage Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Password_Storage_Cheat_Sheet.html) — Argon2id como algoritmo preferido para guardar passwords
- [NIST SP 800-63B-4](https://csrc.nist.gov/pubs/sp/800/63/b/4/final) — diretrizes oficiais de autenticação e gestão de autenticadores

> **Nota (fonte oficial):** NIST SP 800-63B-4 (julho de 2025) substitui a SP 800-63B de 2020; é a versão a citar.

Fonte: pág. 5 (Dicionario-Boas-Praticas.pdf)

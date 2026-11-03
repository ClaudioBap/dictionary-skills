---
id: seguranca/tls-e-cabecalhos-versionados
titulo: "TLS e cabeçalhos versionados"
seccao: "Segurança"
paginas: [7]
fonte: Dicionario-Boas-Praticas.pdf
verificado_em: 2026-11-03
---

# TLS e cabeçalhos versionados

**Resumo:** TLS e cabeçalhos de segurança definidos em configuração versionada, coerentes num só sítio.

## Conteúdo

- TLS terminado por configuração versionada, não só no painel do fornecedor; mTLS ou rede privada entre o proxy e a aplicação.
- Cabeçalhos num só sítio: CSP, HSTS (com `includeSubDomains`), `nosniff`, `frame-ancestors`, Referrer-Policy, Permissions-Policy.
- Sem incoerências entre o proxy e a aplicação.

**Para uma skill:** os cabeçalhos e o TLS estão no repositório e são coerentes num só lugar.

## Ver também

- [Proxy reverso e borda (Traefik, Nginx, Caddy)](../infraestrutura/proxy-reverso-e-borda.md) (Serviços de infraestrutura)

Fonte: pág. 7 (Dicionario-Boas-Praticas.pdf)

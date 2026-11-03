---
id: seguranca/rate-limit-e-waf
titulo: "Rate limit e WAF"
seccao: "Segurança"
paginas: [6]
fonte: Dicionario-Boas-Praticas.pdf
verificado_em: 2026-11-03
---

# Rate limit e WAF

**Resumo:** Uma WAF à frente, rate limit nos caminhos sensíveis e a configuração da borda versionada.

## Conteúdo

- Uma WAF à frente filtra ataques comuns e automação antes de chegarem à aplicação.
- Rate limit no login, nas exportações e nas importações; limites de concorrência por utilizador, como defesa em profundidade.
- A configuração da borda (WAF, TLS, limites) fica versionada, não só no painel do fornecedor.

**Para uma skill:** os caminhos sensíveis têm limite de taxa, e a config da borda está no repositório.

## Ver também

- [Proxy reverso e borda (Traefik, Nginx, Caddy)](../infraestrutura/proxy-reverso-e-borda.md) (Serviços de infraestrutura)

Fonte: pág. 6 (Dicionario-Boas-Praticas.pdf)

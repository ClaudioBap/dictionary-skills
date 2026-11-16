---
id: seguranca/rate-limit-e-waf
titulo: "Rate limit e WAF"
seccao: "Segurança"
paginas: [6]
fonte: Dicionario-Boas-Praticas.pdf
verificado_em: 2026-11-03
fontes_oficiais_consultadas_em: 2026-11-04
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

## Fontes oficiais

*Ligações externas que apoiam esta entrada, consultadas a 2026-11-04. Não alteram o texto acima.*

- [OWASP API4:2023](https://api-security.owasp.org/editions/2023/en/0xa4-unrestricted-resource-consumption) — rate limiting e limites por cliente e por operação
- [OWASP CRS](https://coreruleset.org/) — regras WAF genéricas (ModSecurity/Coraza) contra ataques comuns

Fonte: pág. 6 (Dicionario-Boas-Praticas.pdf)

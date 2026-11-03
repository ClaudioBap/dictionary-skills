---
id: infraestrutura/proxy-reverso-e-borda
titulo: "Proxy reverso e borda (Traefik, Nginx, Caddy)"
seccao: "Serviços de infraestrutura"
paginas: [54]
fonte: Dicionario-Boas-Praticas.pdf
verificado_em: 2026-11-03
---

# Proxy reverso e borda (Traefik, Nginx, Caddy)

**Resumo:** O proxy fica à frente dos serviços e faz TLS, encaminhamento e limites num só sítio.

## Conteúdo

- Põe-se à frente dos serviços: termina o TLS, encaminha por domínio ou caminho, equilibra carga, aplica cabeçalhos e rate limit.
- **Traefik:** descobre serviços sozinho (lê o Docker/Kubernetes), TLS automático; bom para o dinâmico. **Caddy:** simples, TLS automático. **Nginx:** veterano, rápido, configuração manual.

**Para uma skill:** só o proxy está exposto e faz TLS, encaminhamento e limites num só sítio.

## Ver também

- [TLS e cabeçalhos versionados](../seguranca/tls-e-cabecalhos-versionados.md) (Segurança)
- [Rate limit e WAF](../seguranca/rate-limit-e-waf.md) (Segurança)

Fonte: pág. 54 (Dicionario-Boas-Praticas.pdf)

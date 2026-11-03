---
id: cicd/ferramentas-acesso-e-rede
titulo: "Ferramentas: acesso e rede"
seccao: "CI/CD e ferramentas"
paginas: [49, 50]
fonte: Dicionario-Boas-Praticas.pdf
verificado_em: 2026-11-03
---

# Ferramentas: acesso e rede

**Resumo:** Acesso por identidade, rede de confiança zero e proxy de borda.

## Conteúdo

- **Acesso por identidade (em vez do bastion clássico):** `Teleport`, `HashiCorp Boundary`, `AWS SSM Session Manager`.
- **Rede de confiança zero / VPN mesh:** `Tailscale`, `WireGuard`.
- **Proxy e borda:** `Caddy`, `Traefik`, `nginx` (TLS, cabeçalhos, rate limit).

**Para uma skill:** o acesso a servidores passa por um ponto autenticado e auditado, não por SSH direto.

## Ver também

- [Jump server (bastion)](../infraestrutura/jump-server-bastion.md) (Serviços de infraestrutura)

Fonte: págs. 49, 50 (Dicionario-Boas-Praticas.pdf)

---
id: infraestrutura/jump-server-bastion
titulo: "Jump server (bastion)"
seccao: "Serviços de infraestrutura"
paginas: [54]
fonte: Dicionario-Boas-Praticas.pdf
verificado_em: 2026-11-03
---

# Jump server (bastion)

**Resumo:** Uma porta de entrada única, endurecida e auditada para os servidores privados, ou alternativas por identidade.

## Conteúdo

- **O que é:** uma máquina única e endurecida que serve de porta de entrada para os servidores privados; nada se liga diretamente ao interior, passa por aqui.
- **Para que serve:** reduzir a superfície exposta (só o bastion ouve do exterior), centralizar o controlo de acesso e a auditoria, e separar quem entra de onde se trabalha.
- **Boas práticas:** só autenticação por chave ou certificado e MFA, sem passwords; acesso temporário e registado; o bastion não guarda segredos nem corre aplicações; firewall a deixar o interior falar só com ele.
- **Alternativas modernas:** acesso por identidade (Teleport, Boundary, AWS SSM Session Manager) ou rede de confiança zero (Tailscale/WireGuard) em vez do bastion clássico.

**Para uma skill:** nenhum servidor interno aceita ligações diretas do exterior; o acesso passa por um ponto único, autenticado e auditado.

## Ver também

- [Ferramentas: acesso e rede](../cicd/ferramentas-acesso-e-rede.md) (CI/CD e ferramentas)

Fonte: pág. 54 (Dicionario-Boas-Praticas.pdf)

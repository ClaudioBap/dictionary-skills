---
id: acesso-remoto/ssh-endurecido
titulo: "SSH endurecido"
seccao: "Acesso remoto (SSH e RDP)"
paginas: []
fonte: "Fontes oficiais dos projetos, fornecedores e organismos citados (OpenSSH, NIST, Microsoft, AWS, Cloudflare, Tailscale, OWASP), ligadas em cada ponto; consultadas a 2026-11-04. Não vem do PDF."
verificado_em: 2026-11-04
---

# SSH endurecido

**Resumo:** No SSH entra-se só com chave (Ed25519, de preferência numa chave de hardware FIDO) ou certificado, nunca com password, sem login direto de root, só para os utilizadores autorizados e com o OpenSSH sempre na versão mais recente.

## Conteúdo

- Desligar a autenticação por password: `PasswordAuthentication` vem a `yes` por omissão e tem de ser posto a `no`; desligar também `KbdInteractiveAuthentication` quando não se usa — [sshd_config(5)](https://man.openbsd.org/sshd_config)
- Root: `PermitRootLogin` vem a `prohibit-password` por omissão; com `no` o root não entra de todo e cada pessoa entra com a sua conta — [sshd_config(5)](https://man.openbsd.org/sshd_config)
- Limitar quem entra com `AllowUsers`/`AllowGroups`, e exigir vários fatores com `AuthenticationMethods` (por exemplo, chave e depois um segundo método) — [sshd_config(5)](https://man.openbsd.org/sshd_config)
- Chaves: o `ssh-keygen` gera Ed25519 por omissão; as variantes `ed25519-sk` guardam a chave num autenticador FIDO (chave de hardware) — [ssh-keygen(1)](https://man.openbsd.org/ssh-keygen)
- Certificados SSH em vez de `authorized_keys` espalhados: uma CA assina chaves com prazo de validade e o servidor confia nela com `TrustedUserCAKeys` — [ssh-keygen(1), secção CERTIFICATES](https://man.openbsd.org/ssh-keygen), [sshd_config(5)](https://man.openbsd.org/sshd_config)
- Versão: o OpenSSH 10.6 saiu a 2026-10-06; a equipa anunciou que vai lançar versões com mais frequência para fazer chegar mais depressa as correções de segurança, por isso atualizar o OpenSSH faz parte da manutenção — [OpenSSH release notes](https://www.openssh.org/releasenotes.html)
- Windows: o OpenSSH também existe como componente do Windows Server e do Windows — [OpenSSH para Windows](https://learn.microsoft.com/en-us/windows-server/administration/OpenSSH/openssh-overview)

**Para uma skill:** `sshd -T` no servidor mostra `passwordauthentication no` e `permitrootlogin no`, e uma tentativa de login por password é recusada.

## Ver também

- [Jump server (bastion)](../infraestrutura/jump-server-bastion.md) (Serviços de infraestrutura)
- [Acesso por identidade, sem portas abertas](acesso-por-identidade-sem-portas-abertas.md) (Acesso remoto (SSH e RDP))
- [Inventário de acessos, sem segredos](inventario-de-acessos-sem-segredos.md) (Acesso remoto (SSH e RDP))

Fonte: Fontes oficiais dos projetos, fornecedores e organismos citados (OpenSSH, NIST, Microsoft, AWS, Cloudflare, Tailscale, OWASP), ligadas em cada ponto; consultadas a 2026-11-04. Não vem do PDF.

---
id: acesso-remoto/inventario-de-acessos-sem-segredos
titulo: "Inventário de acessos, sem segredos"
seccao: "Acesso remoto (SSH e RDP)"
paginas: []
fonte: "Fontes oficiais dos projetos, fornecedores e organismos citados (OpenSSH, NIST, Microsoft, AWS, Cloudflare, Tailscale, OWASP), ligadas em cada ponto; consultadas a 2026-11-04. Não vem do PDF."
verificado_em: 2026-11-04
---

# Inventário de acessos, sem segredos

**Resumo:** Cada projeto mantém um inventário de quem acede a que servidor, por que via e com que método, revisto com regularidade, com as chaves e passwords guardadas num cofre e nunca no inventário.

## Conteúdo

- Os acessos SSH, interativos ou automáticos, dão muitas vezes privilégios altos e precisam de processos de criação, remoção e monitorização; a gestão das chaves de utilizador SSH costuma ser esquecida — [NIST IR 7966](https://csrc.nist.gov/pubs/ir/7966/final)
- As soluções de acesso remoto e os dispositivos que as usam protegem-se a partir de um modelo de ameaças, com políticas escritas — [NIST SP 800-46 Rev. 2](https://csrc.nist.gov/pubs/sp/800/46/r2/final)
- Os segredos ficam centralizados num cofre, com controlo de acesso, auditoria e ciclo de vida (criação, rotação, revogação e expiração) — [OWASP Secrets Management Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Secrets_Management_Cheat_Sheet.html)
- O inventário regista, por acesso: servidor, protocolo e porta, via (bastion, gateway ou acesso por identidade), quem, método de autenticação, **onde** está o segredo (referência ao cofre) e data da última revisão. *(interpretação: organização do modelo `acessos.md` a partir das fontes acima)*

**Para uma skill:** `acessos.md` tem uma linha por acesso, com revisão datada, e não contém nenhuma chave privada, password ou token.

## Ver também

- [Segredos num cofre, fora do código e do disco](../seguranca/segredos-num-cofre.md) (Segurança)
- [Gestão de segredos (Vault / OpenBao)](../infraestrutura/gestao-de-segredos-vault-openbao.md) (Serviços de infraestrutura)
- [SSH endurecido](ssh-endurecido.md) (Acesso remoto (SSH e RDP))

Fonte: Fontes oficiais dos projetos, fornecedores e organismos citados (OpenSSH, NIST, Microsoft, AWS, Cloudflare, Tailscale, OWASP), ligadas em cada ponto; consultadas a 2026-11-04. Não vem do PDF.

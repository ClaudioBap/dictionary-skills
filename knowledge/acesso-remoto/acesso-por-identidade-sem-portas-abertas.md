---
id: acesso-remoto/acesso-por-identidade-sem-portas-abertas
titulo: "Acesso por identidade, sem portas abertas"
seccao: "Acesso remoto (SSH e RDP)"
paginas: []
fonte: "Fontes oficiais dos projetos, fornecedores e organismos citados (OpenSSH, NIST, Microsoft, AWS, Cloudflare, Tailscale, OWASP), ligadas em cada ponto; consultadas a 2026-11-04. Não vem do PDF."
verificado_em: 2026-11-04
---

# Acesso por identidade, sem portas abertas

**Resumo:** Em vez de abrir as portas 22 ou 3389, o acesso passa por um serviço que valida a identidade, aplica políticas e regista as sessões: AWS Session Manager, Cloudflare Access for Infrastructure, Tailscale SSH ou Azure Bastion.

## Conteúdo

- AWS Systems Manager Session Manager: gestão dos servidores sem portas de entrada abertas, sem bastion e sem chaves SSH, com sessões registadas — [Session Manager](https://docs.aws.amazon.com/systems-manager/latest/userguide/session-manager.html)
- Cloudflare Access for Infrastructure: políticas por servidor, certificados SSH de curta duração em vez de chaves e registo dos comandos SSH exportável por Logpush; também terminal e RDP no browser — [Cloudflare: aplicações não-HTTP](https://developers.cloudflare.com/cloudflare-one/access-controls/applications/non-http/)
- Tailscale SSH: a porta 22 só aceita tráfego da tailnet, o acesso segue as políticas por identidade, o «check mode» obriga a reautenticar nas ligações de risco (por exemplo, como root) e as sessões podem ser gravadas — [Tailscale SSH](https://tailscale.com/kb/1193/tailscale-ssh)
- Tailscale, planos (a 2026-11-24): Personal grátis, até 6 utilizadores e dispositivos ilimitados, só para uso não comercial; Standard a 8 USD e Premium a 18 USD por utilizador/mês; Enterprise à medida. O Tailscale SSH está em todos os planos; o Premium junta o «Advanced Tailscale SSH» e o acesso just-in-time; a gravação de sessões SSH aparece como extensão PAM, a contratar com vendas — [Preços Tailscale](https://tailscale.com/pricing)
- Azure Bastion: RDP/SSH por TLS para VMs sem IP público — [Azure Bastion](https://learn.microsoft.com/en-us/azure/bastion/bastion-overview)
- Teleport: acesso por identidade com gravação de sessões — [Teleport](https://goteleport.com/docs/)

**Para uma skill:** do exterior, as portas 22 e 3389 dos servidores não respondem, e cada sessão fica registada com a identidade de quem entrou.

## Ver também

- [Jump server (bastion)](../infraestrutura/jump-server-bastion.md) (Serviços de infraestrutura)
- [Acesso restrito à área de administração](../publicacao/acesso-restrito-a-area-de-administracao.md) (Publicação e alojamento web)
- [SSH endurecido](ssh-endurecido.md) (Acesso remoto (SSH e RDP))

Fonte: Fontes oficiais dos projetos, fornecedores e organismos citados (OpenSSH, NIST, Microsoft, AWS, Cloudflare, Tailscale, OWASP), ligadas em cada ponto; consultadas a 2026-11-04. Não vem do PDF.

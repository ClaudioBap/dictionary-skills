---
id: acesso-remoto/rdp-protegido
titulo: "RDP protegido"
seccao: "Acesso remoto (SSH e RDP)"
paginas: []
fonte: "Fontes oficiais dos projetos, fornecedores e organismos citados (OpenSSH, NIST, Microsoft, AWS, Cloudflare, Tailscale, OWASP), ligadas em cada ponto; consultadas a 2026-11-04. Não vem do PDF."
verificado_em: 2026-11-04
---

# RDP protegido

**Resumo:** O RDP não fica aberto diretamente à Internet: passa por um RD Gateway com MFA ou por um serviço como o Azure Bastion, e exige sempre Network Level Authentication.

## Conteúdo

- Network Level Authentication (NLA): o utilizador autentica-se antes de a sessão remota ser criada; a Microsoft recomenda-a para a maioria dos ambientes — [Permitir acesso por Remote Desktop](https://learn.microsoft.com/en-us/windows-server/remote/remote-desktop-services/clients/remote-desktop-allow-access)
- RD Gateway: ligações cifradas aos recursos RDS através da Internet, sem VPN, em vez de expor cada máquina — [RD Gateway role](https://learn.microsoft.com/en-us/windows-server/remote/remote-desktop-services/remote-desktop-gateway-role)
- MFA no RD Gateway com a extensão NPS do Microsoft Entra — [RD Gateway com Entra MFA (extensão NPS)](https://learn.microsoft.com/en-us/entra/identity/authentication/howto-mfa-nps-extension-rdg)
- No Azure, o Azure Bastion dá RDP/SSH por TLS a partir do portal ou do cliente nativo; as VMs não precisam de IP público e ficam protegidas de port scanning. SKUs: Developer, Basic, Standard e Premium (este com opção só privada) — [Azure Bastion](https://learn.microsoft.com/en-us/azure/bastion/bastion-overview)
- Fora do Azure, RDP no browser ou por cliente atrás do Cloudflare Access — [Cloudflare: aplicações não-HTTP](https://developers.cloudflare.com/cloudflare-one/access-controls/applications/non-http/)

**Para uma skill:** um varrimento à porta 3389 do IP público não tem resposta; o RDP só se abre através do gateway ou do bastion, com MFA, e a NLA está ligada.

## Ver também

- [Acesso por identidade, sem portas abertas](acesso-por-identidade-sem-portas-abertas.md) (Acesso remoto (SSH e RDP))
- [Microsoft Azure e Entra ID](../nuvem/microsoft-azure-e-entra-id.md) (Nuvem e identidade (AWS, Azure, Microsoft, OVH))

Fonte: Fontes oficiais dos projetos, fornecedores e organismos citados (OpenSSH, NIST, Microsoft, AWS, Cloudflare, Tailscale, OWASP), ligadas em cada ponto; consultadas a 2026-11-04. Não vem do PDF.

---
id: nuvem/ovhcloud
titulo: "OVHcloud"
seccao: "Nuvem e identidade (AWS, Azure, Microsoft, OVH)"
paginas: [62]
fonte: Dicionario-Boas-Praticas.pdf
verificado_em: 2026-11-03
fontes_oficiais_consultadas_em: 2026-11-04
---

# OVHcloud

**Resumo:** Fornecedor europeu para quando os dados têm de ficar na UE e se quer fugir ao lock-in.

## Conteúdo

- Fornecedor europeu (soberania): VMs, Kubernetes gerido, armazenamento de objetos (S3-compatível) e o OKMS (gestor de segredos por mTLS).
- Boa opção quando os dados têm de ficar na UE e se quer fugir ao lock-in dos grandes.

**Para uma skill:** quando a soberania europeia é critério, avaliar OVHcloud (ou Scaleway/Hetzner) antes dos grandes.

## Fontes oficiais

*Ligações externas que apoiam esta entrada, consultadas a 2026-11-04. Não alteram o texto acima.*

- [OVHcloud Secret Manager](https://www.ovhcloud.com/en/identity-security-operations/secret-manager/) — gestor de segredos sobre OKMS, região escolhida para soberania
- [Manage your OKMS access certificate](https://docs.ovhcloud.com/en/guides/manage-and-operate/kms/okms-certificate-management) — certificados de acesso OKMS recomendados para autenticação cliente mTLS
- [OVHcloud Object Storage](https://www.ovhcloud.com/en/public-cloud/object-storage/) — armazenamento de objetos compatível com S3

> **Nota (fonte oficial):** O mTLS é um de três métodos de autenticação do OKMS (token pessoal, conta de serviço, certificado); para a API REST a OVHcloud diz que token/conta de serviço são normalmente mais simples. O produto de segredos chama-se «Secret Manager» (assente no OKMS, API compatível com Vault KV2).

Fonte: pág. 62 (Dicionario-Boas-Praticas.pdf)

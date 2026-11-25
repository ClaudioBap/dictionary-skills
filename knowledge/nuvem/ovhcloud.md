---
id: nuvem/ovhcloud
titulo: "OVHcloud"
seccao: "Nuvem e identidade (AWS, Azure, Microsoft, OVH)"
paginas: [62]
fonte: Dicionario-Boas-Praticas.pdf
verificado_em: 2026-11-25
editado_em: 2026-11-25
fontes_oficiais_consultadas_em: 2026-11-04
---

# OVHcloud

**Resumo:** Fornecedor europeu para quando os dados têm de ficar na UE e se quer fugir ao lock-in.

## Conteúdo

- Fornecedor europeu (soberania): VMs, Kubernetes gerido, armazenamento de objetos (S3-compatível) e o OKMS (gestor de segredos por mTLS).
- Boa opção quando os dados têm de ficar na UE e se quer fugir ao lock-in dos grandes.
- Object Storage: paga-se a capacidade guardada e a recuperação de dados arquivados; as chamadas à API e os dados de entrada e de saída não são cobrados.
- Certificados de acesso ao OKMS: só valem no domínio OKMS em que foram gerados, têm 365 dias de validade por omissão (configurável na criação), ligam-se até 25 identidades do IAM da OVHcloud e a chave privada só se descarrega na criação. A opção «Attach root identity» dá direitos de administrador no domínio e a OVHcloud destina-a a ambientes de teste.
- Secret Manager: o preço depende do número de segredos e da região onde ficam; os segredos podem gerir-se em várias regiões para cumprir requisitos de soberania.

**Para uma skill:** quando a soberania europeia é critério, avaliar OVHcloud (ou Scaleway/Hetzner) antes dos grandes. Critérios a verificar: nenhum certificado OKMS com root identity fora de testes, validade dos certificados definida, segredos e dados numa região da UE.

## Fontes oficiais

*Ligações externas que apoiam esta entrada, consultadas a 2026-11-04. Não alteram o texto acima.*

- [OVHcloud Secret Manager](https://www.ovhcloud.com/en/identity-security-operations/secret-manager/) — gestor de segredos sobre OKMS, região escolhida para soberania
- [Manage your OKMS access certificate](https://docs.ovhcloud.com/en/guides/manage-and-operate/kms/okms-certificate-management) — certificados de acesso OKMS recomendados para autenticação cliente mTLS
- [OVHcloud Object Storage](https://www.ovhcloud.com/en/public-cloud/object-storage/) — armazenamento de objetos compatível com S3

> **Nota (fonte oficial):** O mTLS é um de três métodos de autenticação do OKMS (token pessoal, conta de serviço, certificado); para a API REST a OVHcloud diz que token/conta de serviço são normalmente mais simples. O produto de segredos chama-se «Secret Manager» (assente no OKMS, API compatível com Vault KV2).

Fonte: pág. 62 (Dicionario-Boas-Praticas.pdf)

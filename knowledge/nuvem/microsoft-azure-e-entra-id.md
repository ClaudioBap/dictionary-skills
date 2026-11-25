---
id: nuvem/microsoft-azure-e-entra-id
titulo: "Microsoft Azure e Entra ID"
seccao: "Nuvem e identidade (AWS, Azure, Microsoft, OVH)"
paginas: [61]
fonte: Dicionario-Boas-Praticas.pdf
verificado_em: 2026-11-25
editado_em: 2026-11-25
fontes_oficiais_consultadas_em: 2026-11-04
---

# Microsoft Azure e Entra ID

**Resumo:** A nuvem da Microsoft, com identidade por Entra ID com MFA e segredos no Key Vault.

## Conteúdo

- Nuvem da Microsoft: computação (VMs, App Service, AKS, Functions), dados (SQL, Cosmos) e integração forte com o ecossistema Microsoft.
- Identidade por Entra ID (antigo Azure AD): SSO, OIDC/SAML, MFA, acesso condicional; segredos no Key Vault.
- MFA obrigatório no Azure: desde outubro de 2024 para criar, ler, alterar ou apagar no portal do Azure, no centro de administração do Entra e no do Intune; desde 1 de outubro de 2025, aplicado de forma gradual, na Azure CLI, no Azure PowerShell, na app móvel, nas ferramentas de IaC e nos endpoints REST para criar, alterar ou apagar.
- Automatização com identidades de carga de trabalho (managed identities e service principals), que esse MFA não abrange; a Microsoft não recomenda contas de utilizador para automatização e recomenda migrá-las.
- Key Vault: o soft delete vem ligado e não se pode desligar, com retenção de 7 a 90 dias (90 por omissão, fixada na criação); a proteção contra purga não vem ligada, é recomendada quando há chaves de cifra e a maior parte dos serviços integrados, como o Storage, exige-a.
- Dados na UE: os serviços regionais do Azure instalados numa região do EU Data Boundary ficam abrangidos; os não regionais têm de ser configurados, e o Azure Resource Manager também, para os Professional Services Data ficarem na UE.

**Para uma skill:** identidade por Entra com MFA e acesso condicional; segredos no Key Vault, não em ficheiros. Critérios a verificar: automatização só com managed identities ou service principals, Key Vault com proteção contra purga ligada e recursos em regiões do EU Data Boundary.

## Fontes oficiais

*Ligações externas que apoiam esta entrada, consultadas a 2026-11-04. Não alteram o texto acima.*

- [What is Microsoft Entra?](https://learn.microsoft.com/en-us/entra/fundamentals/whatis) — Entra ID como serviço de identidade e acesso na nuvem
- [Microsoft Entra Conditional Access](https://learn.microsoft.com/en-us/entra/identity/conditional-access/overview) — acesso condicional que pode exigir MFA
- [Azure Key Vault Overview](https://learn.microsoft.com/en-us/azure/key-vault/general/overview) — segredos centralizados no Key Vault, fora do código da aplicação

Fonte: pág. 61 (Dicionario-Boas-Praticas.pdf)

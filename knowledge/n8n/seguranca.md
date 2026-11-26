---
id: n8n/seguranca
titulo: "Segurança de uma instância n8n"
seccao: "n8n"
paginas: []
fonte: "Avisos de segurança do n8n no GitHub e documentação oficial de segurança, ligados em cada ponto; consultados a 2026-11-26. Não vem do PDF."
verificado_em: 2026-11-26
editado_em: 2026-11-26
---

# Segurança de uma instância n8n

**Resumo:** O n8n corre código e guarda as credenciais de outros sistemas, e tem tido falhas graves, como a CVE-2025-68613 (execução remota de código por injeção de expressões). Uma instância exposta corre uma versão com as correções publicadas, bloqueia os nós que mexem no servidor, usa task runners externos, passa a auditoria e tem TLS e 2FA.

## Conteúdo

### Avisos

- O n8n publica os avisos no GitHub, com gravidade, versões afetadas e versões corrigidas; não há feed. Fonte: [avisos de segurança](https://github.com/n8n-io/n8n/security/advisories)
- CVE-2025-68613: execução remota de código por injeção de expressões, crítica, nas versões a partir da 0.211.0; corrigida na 1.120.4, na 1.121.1 e na 1.122.0; publicada a 2025-12-19. Fonte: [GHSA-v98v-ff95-f3cp](https://github.com/n8n-io/n8n/security/advisories/GHSA-v98v-ff95-f3cp)
- GHSA-w6f8-8qh4-h3j4, de 2026-11-26: fuga do sandbox de expressões com execução de código no processo principal, gravidade alta (CVSS 4.0 de 7,7); corrigida no npm a partir da 2.49.2 e no Docker a partir da 3.4.0. Fonte: [GHSA-w6f8-8qh4-h3j4](https://github.com/n8n-io/n8n/security/advisories/GHSA-w6f8-8qh4-h3j4)
- A 2026-10-28 e a 2026-11-13 saíram outros avisos de gravidade alta (isolamento das expressões, GraphicsMagick, nós Code antigos, uma função personalizada que controla o owner). Fonte: [avisos de segurança](https://github.com/n8n-io/n8n/security/advisories). Confiança: alta quanto aos títulos e datas; as versões corrigidas confirmam-se em cada aviso.

### Endurecer

- `NODES_EXCLUDE` bloqueia nós na instância inteira; o exemplo oficial bloqueia o Execute Command e o Read/Write Files from Disk. Para bloquear por projeto, ou sem reiniciar, há políticas de tipos de nó. Fonte: [bloquear nós](https://docs.n8n.io/deploy/host-n8n/configure-n8n/security/block-specific-nodes)
- Auditoria de segurança: `n8n audit` na CLI, ou `POST /audit` na API, autenticado como owner. Fonte: [auditorias de segurança](https://docs.n8n.io/deploy/host-n8n/configure-n8n/security/run-security-audits)
- A documentação de segurança cobre SSL, SSO, 2FA, desligar a API pública, endurecer os task runners, rodar as chaves de cifra, ocultar dados das execuções e proteger contra SSRF. Fonte: [segurança](https://docs.n8n.io/deploy/host-n8n/configure-n8n/security)
- Tornar a 2FA obrigatória e definir políticas de partilha exige a Cloud Enterprise ou o self-hosted Business ou Enterprise (`N8N_MFA_ENFORCED_ENABLED`). Fonte: [políticas de segurança](https://docs.n8n.io/deploy/host-n8n/configure-n8n/security/manage-security-policies)

**Para uma skill:** antes de expor uma instância, a skill compara a versão em uso com as versões corrigidas dos avisos publicados, confirma `NODES_EXCLUDE` com pelo menos o Execute Command e o Read/Write Files from Disk (salvo pedido explícito do utilizador), task runners externos, TLS e 2FA, e guarda a saída de `n8n audit` sem achados críticos por resolver.

## Ver também

- [Alojar, escalar e atualizar o n8n](alojar-e-atualizar.md) (n8n)
- [IA, agentes e MCP no n8n](ia-agentes-e-mcp.md) (n8n)

Fonte: Avisos de segurança do n8n no GitHub e documentação oficial de segurança, ligados em cada ponto; consultados a 2026-11-26. Não vem do PDF.

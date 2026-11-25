---
id: nuvem/azure-pim
titulo: "Azure PIM (Privileged Identity Management)"
seccao: "Nuvem e identidade (AWS, Azure, Microsoft, OVH)"
paginas: [61, 62]
fonte: Dicionario-Boas-Praticas.pdf
verificado_em: 2026-11-25
editado_em: 2026-11-25
fontes_oficiais_consultadas_em: 2026-11-04
---

# Azure PIM (Privileged Identity Management)

**Resumo:** Acesso privilegiado just-in-time e temporário, com aprovação e auditoria, em vez de permanente.

## Conteúdo

- **O que é:** dá acesso privilegiado **just-in-time** e temporário em vez de permanente: pede-se o papel de administrador quando é preciso, por um tempo limitado, com aprovação e justificação.
- **Para que serve:** reduzir as contas sempre-administrador (standing access), que são o maior risco; cada elevação fica registada e pode exigir MFA e aprovador.
- Duração da ativação: cada papel tem uma duração máxima, entre 1 e 24 horas; a ativação pode exigir MFA, justificação e aprovação, e a Microsoft recomenda pelo menos dois aprovadores.
- Zero atribuições ativas permanentes, exceto as contas de acesso de emergência: a Microsoft recomenda duas contas só na nuvem com Global Administrator permanente, não atribuídas a pessoas e usadas só quando as contas normais não servem.
- Por onde começar: pôr primeiro no PIM os papéis Global Administrator e Security Administrator, os que mais estragos fazem se forem comprometidos.
- O PIM exige licença (ver os fundamentos de licenciamento do Microsoft Entra ID Governance).

**Para uma skill:** nenhum papel privilegiado é permanente; a elevação é temporária, aprovada e auditada (PIM ou equivalente). Critérios a verificar: ativação com duração máxima definida (1 a 24 horas), MFA e justificação na ativação, aprovação com dois aprovadores nos papéis críticos, e nenhuma atribuição ativa permanente além das duas contas de emergência.

## Fontes oficiais

*Ligações externas que apoiam esta entrada, consultadas a 2026-11-04. Não alteram o texto acima.*

- [What is Privileged Identity Management?](https://learn.microsoft.com/en-us/entra/id-governance/privileged-identity-management/pim-configure) — acesso just-in-time, temporário, com aprovação, justificação, MFA e auditoria

Fonte: págs. 61, 62 (Dicionario-Boas-Praticas.pdf)

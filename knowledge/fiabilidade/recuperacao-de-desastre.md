---
id: fiabilidade/recuperacao-de-desastre
titulo: "Recuperação de desastre"
seccao: "Fiabilidade e resiliência"
paginas: [11]
fonte: Dicionario-Boas-Praticas.pdf
verificado_em: 2026-11-03
fontes_oficiais_consultadas_em: 2026-11-04
---

# Recuperação de desastre

**Resumo:** Definir RTO e RPO, ensaiar o restauro completo e ter plano para perder máquina, região e fornecedor.

## Conteúdo

- Definir RTO (tempo para recuperar) e RPO (quanto se pode perder); dimensionar backups e réplicas a isso.
- Ensaiar o restauro completo, cronometrado, num ambiente limpo; um backup não testado não conta.
- Ter plano para a perda de uma máquina, de uma região e do fornecedor.

**Para uma skill:** existem RTO/RPO definidos e um restauro completo já ensaiado.

## Ver também

- [Backups e recuperação](../base-de-dados/backups-e-recuperacao.md) (Base de dados)

## Fontes oficiais

*Ligações externas que apoiam esta entrada, consultadas a 2026-11-04. Não alteram o texto acima.*

- [Azure WAF – Disaster recovery](https://learn.microsoft.com/en-us/azure/well-architected/reliability/disaster-recovery) — Define RTO/RPO, ensaios de DR, perda de região, testar restauros
- [AWS REL13-BP03 Test DR implementation](https://docs.aws.amazon.com/wellarchitected/latest/reliability-pillar/rel_planning_for_recovery_dr_tested.html) — Testar regularmente a recuperação e verificar RTO/RPO

Fonte: pág. 11 (Dicionario-Boas-Praticas.pdf)

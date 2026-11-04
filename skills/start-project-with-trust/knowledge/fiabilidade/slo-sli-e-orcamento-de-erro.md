---
id: fiabilidade/slo-sli-e-orcamento-de-erro
titulo: "SLO, SLI e orçamento de erro"
seccao: "Fiabilidade e resiliência"
paginas: [11]
fonte: Dicionario-Boas-Praticas.pdf
verificado_em: 2026-11-03
fontes_oficiais_consultadas_em: 2026-11-04
---

# SLO, SLI e orçamento de erro

**Resumo:** Definir o que se mede (SLI), a meta (SLO) e usar o orçamento de erro para decidir entre lançar e estabilizar.

## Conteúdo

- SLI: o que se mede (latência, disponibilidade, taxa de erro). SLO: a meta (ex.: 99,9% num mês). Orçamento de erro: o que resta antes de falhar a meta.
- Medir o que o utilizador sente, não só o servidor; usar o orçamento para decidir entre lançar e estabilizar.

**Para uma skill:** os serviços têm SLO definido e medido, com alerta quando o orçamento de erro aperta.

## Fontes oficiais

*Ligações externas que apoiam esta entrada, consultadas a 2026-11-04. Não alteram o texto acima.*

- [SRE Book – Service Level Objectives](https://sre.google/sre-book/service-level-objectives/) — Define SLI, SLO e orçamento de erro
- [SRE Workbook – Implementing SLOs](https://sre.google/workbook/implementing-slos/) — Política de orçamento de erro, medir a experiência do utilizador, alertas
- [Azure WAF – Defining reliability targets](https://learn.microsoft.com/en-us/azure/well-architected/reliability/metrics) — Definições de SLO/SLI e tabela de indisponibilidade por percentagem

Fonte: pág. 11 (Dicionario-Boas-Praticas.pdf)

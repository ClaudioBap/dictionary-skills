---
id: custo/capacidade-barata-spot-e-reservas
titulo: "Capacidade barata (spot e reservas)"
seccao: "Sessões, orquestração e custo-eficiência"
paginas: [63]
fonte: Dicionario-Boas-Praticas.pdf
verificado_em: 2026-11-03
fontes_oficiais_consultadas_em: 2026-11-04
---

# Capacidade barata (spot e reservas)

**Resumo:** Spot para trabalho tolerante a interrupção e reservas para a carga base estável.

## Conteúdo

- Instâncias spot/preemptible (muito mais baratas) para trabalho que tolera interrupção (batch, CI, filas); reservas/savings plans para a carga base estável.

**Para uma skill:** o trabalho tolerante a falhas corre em capacidade barata; a carga base estável usa reservas.

## Fontes oficiais

*Ligações externas que apoiam esta entrada, consultadas a 2026-11-04. Não alteram o texto acima.*

- [Spot Instances](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/using-spot-instances.html) — desconto elevado para trabalho flexível e interrompível (batch, background)
- [What are Savings Plans?](https://docs.aws.amazon.com/savingsplans/latest/userguide/what-is-savings-plans.html) — compromisso de 1 ou 3 anos para preços mais baixos

Fonte: pág. 63 (Dicionario-Boas-Praticas.pdf)

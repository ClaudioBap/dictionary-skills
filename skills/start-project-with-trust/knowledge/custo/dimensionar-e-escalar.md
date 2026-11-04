---
id: custo/dimensionar-e-escalar
titulo: "Dimensionar e escalar (right-sizing e autoscaling)"
seccao: "Sessões, orquestração e custo-eficiência"
paginas: [63]
fonte: Dicionario-Boas-Praticas.pdf
verificado_em: 2026-11-03
fontes_oficiais_consultadas_em: 2026-11-04
---

# Dimensionar e escalar (right-sizing e autoscaling)

**Resumo:** Começar pequeno, dimensionar ao uso real, escalar com a procura e desligar o que não se usa.

## Conteúdo

- Começar pequeno e medir; dimensionar ao uso real, não ao pico imaginado; autoscaling para subir e descer com a procura.
- Desligar o que não está a ser usado (ambientes de teste fora de horas).

**Para uma skill:** os serviços escalam com a procura e os ambientes não-produtivos desligam quando ninguém os usa.

## Fontes oficiais

*Ligações externas que apoiam esta entrada, consultadas a 2026-11-04. Não alteram o texto acima.*

- [What is Amazon EC2 Auto Scaling?](https://docs.aws.amazon.com/autoscaling/ec2/userguide/what-is-amazon-ec2-auto-scaling.html) — adicionar capacidade no pico e remover quando a procura baixa
- [Optimizing scaling costs (Azure WAF)](https://learn.microsoft.com/en-us/azure/well-architected/cost-optimization/optimize-scaling-costs) — escalar com base em dados de uso reais; evitar sobreprovisionamento
- [Optimizing environment costs (Azure WAF)](https://learn.microsoft.com/en-us/azure/well-architected/cost-optimization/optimize-environment-costs) — desligar recursos não produtivos fora de horas e fins de semana

Fonte: pág. 63 (Dicionario-Boas-Praticas.pdf)

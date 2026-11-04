---
id: custo/caching-em-camadas
titulo: "Caching em camadas"
seccao: "Sessões, orquestração e custo-eficiência"
paginas: [64]
fonte: Dicionario-Boas-Praticas.pdf
verificado_em: 2026-11-03
fontes_oficiais_consultadas_em: 2026-11-04
---

# Caching em camadas

**Resumo:** Cachear o caro e repetido na camada certa, com regra de invalidação.

## Conteúdo

- Cachear onde dói: no browser (HTTP), na borda (CDN/proxy), na aplicação (Redis) e na base (resultados caros).
- Cada camada evita trabalho e custo abaixo dela; invalidar com critério (a parte difícil).

**Para uma skill:** o que é caro e repetido é cacheado na camada certa, com regra de invalidação.

## Fontes oficiais

*Ligações externas que apoiam esta entrada, consultadas a 2026-11-04. Não alteram o texto acima.*

- [Caching Guidance](https://learn.microsoft.com/en-us/azure/architecture/best-practices/caching) — cache privada e partilhada, expiração e invalidação na escrita
- [Optimizing scaling costs (Azure WAF)](https://learn.microsoft.com/en-us/azure/well-architected/cost-optimization/optimize-scaling-costs) — CDN e Redis reduzem carga e custo; invalidação é o trade-off

Fonte: pág. 64 (Dicionario-Boas-Praticas.pdf)

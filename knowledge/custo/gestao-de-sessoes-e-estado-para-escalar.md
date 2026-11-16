---
id: custo/gestao-de-sessoes-e-estado-para-escalar
titulo: "Gestão de sessões e estado para escalar"
seccao: "Sessões, orquestração e custo-eficiência"
paginas: [64]
fonte: Dicionario-Boas-Praticas.pdf
verificado_em: 2026-11-03
fontes_oficiais_consultadas_em: 2026-11-04
---

# Gestão de sessões e estado para escalar

**Resumo:** A sessão e o estado saem do processo para um serviço partilhado, para escalar horizontalmente.

## Conteúdo

- Aplicação sem estado (stateless): a sessão e o estado saem para um serviço partilhado (base de dados, Redis), para se correr em várias réplicas e escalar barato.
- Sessões na memória do processo prendem a uma só instância e caem no reinício; evitar.

**Para uma skill:** o estado vive fora do processo; a aplicação escala horizontalmente sem sessões presas.

## Ver também

- [Sessões robustas](../seguranca/sessoes-robustas.md) (Segurança)
- [Cache e sessões (Redis / Valkey)](../infraestrutura/cache-e-sessoes-redis-valkey.md) (Serviços de infraestrutura)
- [Escalonar com réplicas](../docker/escalonar-com-replicas.md) (Docker e orquestração)

## Fontes oficiais

*Ligações externas que apoiam esta entrada, consultadas a 2026-11-04. Não alteram o texto acima.*

- [Design to scale out](https://learn.microsoft.com/en-us/azure/architecture/guide/design-principles/scale-out) — evitar afinidade de sessão; sessão em memória impede escalar horizontalmente
- [Optimizing scaling costs (Azure WAF)](https://learn.microsoft.com/en-us/azure/well-architected/cost-optimization/optimize-scaling-costs) — aplicações sem estado escalam mais facilmente

Fonte: pág. 64 (Dicionario-Boas-Praticas.pdf)

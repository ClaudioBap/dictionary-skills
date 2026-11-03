---
id: custo/caching-em-camadas
titulo: "Caching em camadas"
seccao: "Sessões, orquestração e custo-eficiência"
paginas: [64]
fonte: Dicionario-Boas-Praticas.pdf
verificado_em: 2026-11-03
---

# Caching em camadas

**Resumo:** Cachear o caro e repetido na camada certa, com regra de invalidação.

## Conteúdo

- Cachear onde dói: no browser (HTTP), na borda (CDN/proxy), na aplicação (Redis) e na base (resultados caros).
- Cada camada evita trabalho e custo abaixo dela; invalidar com critério (a parte difícil).

**Para uma skill:** o que é caro e repetido é cacheado na camada certa, com regra de invalidação.

Fonte: pág. 64 (Dicionario-Boas-Praticas.pdf)

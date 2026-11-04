---
id: api/paginacao-filtros-e-limites
titulo: "Paginação, filtros e limites"
seccao: "Desenho de API"
paginas: [25, 26]
fonte: Dicionario-Boas-Praticas.pdf
verificado_em: 2026-11-03
fontes_oficiais_consultadas_em: 2026-11-04
---

# Paginação, filtros e limites

**Resumo:** Nunca devolver listas sem limite: paginar, filtrar e limitar tamanho e taxa.

## Conteúdo

- Nunca devolver listas sem limite; paginar (cursor para grandes volumes); filtros e ordenação explícitos.
- Rate limit e tamanho máximo de resposta; campos selecionáveis para não trazer tudo.

**Para uma skill:** nenhuma coleção é devolvida sem paginação e limite.

## Fontes oficiais

*Ligações externas que apoiam esta entrada, consultadas a 2026-11-04. Não alteram o texto acima.*

- [OWASP API4:2023](https://api-security.owasp.org/editions/2023/en/0xa4-unrestricted-resource-consumption) — Máximo de registos por página, rate limit e tamanho máximo de payload
- [Pagination (GraphQL)](https://graphql.org/learn/pagination/) — Paginação por cursor como opção mais robusta
- [429 Too Many Requests (MDN)](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status/429) — Estado HTTP para rate limit, com Retry-After

Fonte: págs. 25, 26 (Dicionario-Boas-Praticas.pdf)

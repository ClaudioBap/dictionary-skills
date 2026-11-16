---
id: api/graphql-quando-e-cuidados
titulo: "GraphQL: quando e cuidados"
seccao: "Desenho de API"
paginas: [26]
fonte: Dicionario-Boas-Praticas.pdf
verificado_em: 2026-11-03
fontes_oficiais_consultadas_em: 2026-11-04
---

# GraphQL: quando e cuidados

**Resumo:** GraphQL serve quando o cliente molda a resposta, mas exige limitar complexidade e autorizar por campo.

## Conteúdo

- Bom quando o cliente precisa de moldar a resposta e juntar várias fontes; evita over/under-fetching.
- Cuidados: limitar profundidade e complexidade da query, persistir queries, autorizar por campo.

**Para uma skill:** se usar GraphQL, limitar complexidade e autorizar por campo.

## Fontes oficiais

*Ligações externas que apoiam esta entrada, consultadas a 2026-11-04. Não alteram o texto acima.*

- [Security (GraphQL)](https://graphql.org/learn/security/) — Limitar profundidade e complexidade, trusted documents, rate limiting
- [Authorization (GraphQL)](https://graphql.org/learn/authorization/) — Autorização por campo e tipo na camada de lógica de negócio
- [Learn GraphQL](https://graphql.org/learn/) — O cliente pede exatamente os dados de que precisa

> **Nota (fonte oficial):** graphql.org chama «trusted documents» às queries persistidas e diz que só servem clientes próprios (first-party), não APIs públicas.

Fonte: pág. 26 (Dicionario-Boas-Praticas.pdf)

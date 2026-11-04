---
id: api/versionamento-e-compatibilidade-de-api
titulo: "Versionamento e compatibilidade de API"
seccao: "Desenho de API"
paginas: [25]
fonte: Dicionario-Boas-Praticas.pdf
verificado_em: 2026-11-03
fontes_oficiais_consultadas_em: 2026-11-04
---

# Versionamento e compatibilidade de API

**Resumo:** Versionar a API, subir de versão em mudanças que quebram e depreciar com aviso e prazo.

## Conteúdo

- Versionar (no caminho ou no cabeçalho); mudanças aditivas não quebram; mudanças que quebram sobem de versão.
- Depreciar com aviso e prazo, nunca remover de repente.

**Para uma skill:** nenhuma mudança que quebra entra sem subir de versão e avisar.

## Fontes oficiais

*Ligações externas que apoiam esta entrada, consultadas a 2026-11-04. Não alteram o texto acima.*

- [RFC 9745 Deprecation header](https://www.rfc-editor.org/rfc/rfc9745.html) — Cabeçalho Deprecation para avisar que um recurso está depreciado
- [RFC 8594 Sunset header](https://www.rfc-editor.org/rfc/rfc8594.html) — Cabeçalho Sunset indica quando o recurso deixa de responder (prazo)
- [OpenAPI Specification](https://spec.openapis.org/oas/latest.html) — Campo deprecated marca operações a evitar pelos consumidores

Fonte: pág. 25 (Dicionario-Boas-Praticas.pdf)

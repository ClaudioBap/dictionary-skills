---
id: api/versionamento-e-compatibilidade-de-api
titulo: "Versionamento e compatibilidade de API"
seccao: "Desenho de API"
paginas: [25]
fonte: Dicionario-Boas-Praticas.pdf
verificado_em: 2026-11-25
editado_em: 2026-11-25
fontes_oficiais_consultadas_em: 2026-11-04
---

# Versionamento e compatibilidade de API

**Resumo:** Versionar a API, subir de versão em mudanças que quebram e depreciar com aviso e prazo.

## Conteúdo

- Versionar (no caminho ou no cabeçalho); mudanças aditivas não quebram; mudanças que quebram sobem de versão.
- Depreciar com aviso e prazo, nunca remover de repente.
- Como se avisa: no OpenAPI, a operação leva `deprecated: true`; nas respostas, o cabeçalho `Deprecation` com a data, no formato de data dos Structured Fields (ex.: `Deprecation: @1688169599`), e, quando há data de fim, o cabeçalho `Sunset` (RFC 8594). A data do `Sunset` não pode ser anterior à do `Deprecation`.

**Para uma skill:** nenhuma mudança que quebra entra sem subir de versão e avisar; o que se deprecia tem `deprecated: true` no OpenAPI e responde com `Deprecation` e, se tem fim marcado, `Sunset`.

## Fontes oficiais

*Ligações externas que apoiam esta entrada, consultadas a 2026-11-04. Não alteram o texto acima.*

- [RFC 9745 Deprecation header](https://www.rfc-editor.org/rfc/rfc9745.html) — Cabeçalho Deprecation para avisar que um recurso está depreciado
- [RFC 8594 Sunset header](https://www.rfc-editor.org/rfc/rfc8594.html) — Cabeçalho Sunset indica quando o recurso deixa de responder (prazo)
- [OpenAPI Specification](https://spec.openapis.org/oas/latest.html) — Campo deprecated marca operações a evitar pelos consumidores

## Histórico

- **2025-03**: antes, «**Para uma skill:** nenhuma mudança que quebra entra sem subir de versão e avisar.» (PDF pág. 25). Mudou porque o critério não dizia como se avisa; a RFC 9745 normaliza o cabeçalho `Deprecation` e a sua relação com o `Sunset`. Fonte: [RFC 9745](https://www.rfc-editor.org/rfc/rfc9745.html). Editado a 2026-11-25.

Fonte: pág. 25 (Dicionario-Boas-Praticas.pdf)

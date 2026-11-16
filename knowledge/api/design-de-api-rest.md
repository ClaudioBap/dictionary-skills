---
id: api/design-de-api-rest
titulo: "Design de API REST"
seccao: "Desenho de API"
paginas: [25]
fonte: Dicionario-Boas-Praticas.pdf
verificado_em: 2026-11-03
fontes_oficiais_consultadas_em: 2026-11-04
---

# Design de API REST

**Resumo:** Recursos no plural, verbos e estados HTTP com o seu significado e um formato de erro único.

## Conteúdo

- Recursos no plural, verbos HTTP com o seu significado (GET lê, POST cria, PUT/PATCH altera, DELETE apaga), estados HTTP corretos.
- Sem verbos no URL; representação consistente; erros num formato único (ex.: Problem Details).

**Para uma skill:** a API usa os verbos e estados HTTP corretos e um formato de erro único.

## Fontes oficiais

*Ligações externas que apoiam esta entrada, consultadas a 2026-11-04. Não alteram o texto acima.*

- [RFC 9110 HTTP Semantics](https://www.rfc-editor.org/rfc/rfc9110.html) — Define GET, POST, PUT, DELETE (sec. 9) e códigos de estado (sec. 15)
- [RFC 5789 PATCH Method](https://www.rfc-editor.org/rfc/rfc5789.html) — Define o método PATCH para alterações parciais
- [RFC 9457 Problem Details](https://www.rfc-editor.org/rfc/rfc9457.html) — Formato único e legível por máquina para erros; substitui RFC 7807

> **Nota (fonte oficial):** «Recursos no plural» e «sem verbos no URL» são convenções sem fonte normativa oficial encontrada.

Fonte: pág. 25 (Dicionario-Boas-Praticas.pdf)

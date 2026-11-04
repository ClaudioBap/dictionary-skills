---
id: csharp/nullable-reference-types
titulo: "Nullable reference types"
seccao: "Boas práticas de C#"
paginas: [38]
fonte: Dicionario-Boas-Praticas.pdf
verificado_em: 2026-11-03
fontes_oficiais_consultadas_em: 2026-11-04
---

# Nullable reference types

**Resumo:** Ligar nullable, distinguir `string` de `string?` e tratar os avisos como erros.

## Conteúdo

- Ligar `<Nullable>enable</Nullable>`; distinguir `string` de `string?`; tratar os avisos como erros.
- Usar `?.`, `??`, `is null`; validar entradas nas fronteiras.

**Para uma skill:** o projeto tem nullable ligado e não ignora os avisos.

## Fontes oficiais

*Ligações externas que apoiam esta entrada, consultadas a 2026-11-04. Não alteram o texto acima.*

- [Nullable reference types](https://learn.microsoft.com/en-us/dotnet/csharp/fundamentals/null-safety/nullable-reference-types) — `<Nullable>enable`, `string` vs `string?`, avisos
- [Code analysis – Treat warnings as errors](https://learn.microsoft.com/en-us/dotnet/fundamentals/code-analysis/overview) — tratar avisos como erros com -warnaserror

> **Nota (fonte oficial):** Os modelos .NET recentes já ativam `<Nullable>enable</Nullable>` por omissão.

Fonte: pág. 38 (Dicionario-Boas-Praticas.pdf)

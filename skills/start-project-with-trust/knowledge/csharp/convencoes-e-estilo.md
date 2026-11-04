---
id: csharp/convencoes-e-estilo
titulo: "Convenções e estilo"
seccao: "Boas práticas de C#"
paginas: [38]
fonte: Dicionario-Boas-Praticas.pdf
verificado_em: 2026-11-03
fontes_oficiais_consultadas_em: 2026-11-04
---

# Convenções e estilo

**Resumo:** Convenções de nomes C#, `.editorconfig` partilhado e `dotnet format` com analisadores no CI.

## Conteúdo

- `PascalCase` para tipos, métodos e propriedades; `camelCase` para locais e parâmetros; `_camelCase` para campos privados.
- `.editorconfig` partilhado; `dotnet format` e analisadores (Roslyn) no CI.

**Para uma skill:** o código passa os analisadores e o `dotnet format` sem avisos.

## Ver também

- [Ferramentas: linters e formatadores](../cicd/ferramentas-linters-e-formatadores.md) (CI/CD e ferramentas)

## Fontes oficiais

*Ligações externas que apoiam esta entrada, consultadas a 2026-11-04. Não alteram o texto acima.*

- [Identifier names](https://learn.microsoft.com/en-us/dotnet/csharp/fundamentals/coding-style/identifier-names) — PascalCase em tipos/membros; camelCase; `_camelCase` em campos privados
- [Code analysis in .NET](https://learn.microsoft.com/en-us/dotnet/fundamentals/code-analysis/overview) — analisadores Roslyn, EnforceCodeStyleInBuild, .editorconfig
- [dotnet format](https://learn.microsoft.com/en-us/dotnet/core/tools/dotnet-format) — formata segundo .editorconfig; `--verify-no-changes` para CI

Fonte: pág. 38 (Dicionario-Boas-Praticas.pdf)

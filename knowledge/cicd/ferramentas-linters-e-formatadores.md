---
id: cicd/ferramentas-linters-e-formatadores
titulo: "Ferramentas: linters e formatadores"
seccao: "CI/CD e ferramentas"
paginas: [48]
fonte: Dicionario-Boas-Praticas.pdf
verificado_em: 2026-11-03
fontes_oficiais_consultadas_em: 2026-11-04
---

# Ferramentas: linters e formatadores

**Resumo:** Formatador e linter por linguagem, a correr no CI.

## Conteúdo

- **Python:** `ruff` (lint + format, rápido), `black` (format), `flake8` (lint).
- **Java:** `spotless` / `google-java-format` (format), `Checkstyle` (estilo), `SpotBugs` / `Error Prone` (bugs).
- **C#:** `dotnet format` + analisadores Roslyn, com `.editorconfig` partilhado.
- **Web:** `eslint` (lint) e `prettier` (format) para JS/TS.

**Para uma skill:** o formatador e o linter da linguagem correm no CI e falham o build com avisos.

## Fontes oficiais

*Ligações externas que apoiam esta entrada, consultadas a 2026-11-04. Não alteram o texto acima.*

- [Ruff](https://docs.astral.sh/ruff/) — Linter e formatador Python rápido, paridade com Flake8, isort e Black
- [Getting Started with ESLint](https://eslint.org/docs/latest/use/getting-started) — Linter de JavaScript baseado em regras
- [dotnet format](https://learn.microsoft.com/en-us/dotnet/core/tools/dotnet-format) — Formata segundo .editorconfig; --verify-no-changes falha no CI

> **Nota (fonte oficial):** A documentação do Ruff apresenta-o como substituto de Flake8, isort e Black numa só ferramenta.

Fonte: pág. 48 (Dicionario-Boas-Praticas.pdf)

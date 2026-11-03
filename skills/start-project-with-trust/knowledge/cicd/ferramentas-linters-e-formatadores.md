---
id: cicd/ferramentas-linters-e-formatadores
titulo: "Ferramentas: linters e formatadores"
seccao: "CI/CD e ferramentas"
paginas: [48]
fonte: Dicionario-Boas-Praticas.pdf
verificado_em: 2026-11-03
---

# Ferramentas: linters e formatadores

**Resumo:** Formatador e linter por linguagem, a correr no CI.

## Conteúdo

- **Python:** `ruff` (lint + format, rápido), `black` (format), `flake8` (lint).
- **Java:** `spotless` / `google-java-format` (format), `Checkstyle` (estilo), `SpotBugs` / `Error Prone` (bugs).
- **C#:** `dotnet format` + analisadores Roslyn, com `.editorconfig` partilhado.
- **Web:** `eslint` (lint) e `prettier` (format) para JS/TS.

**Para uma skill:** o formatador e o linter da linguagem correm no CI e falham o build com avisos.

Fonte: pág. 48 (Dicionario-Boas-Praticas.pdf)

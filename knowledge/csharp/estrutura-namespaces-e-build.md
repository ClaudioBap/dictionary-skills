---
id: csharp/estrutura-namespaces-e-build
titulo: "Estrutura, namespaces e build"
seccao: "Boas práticas de C#"
paginas: [38]
fonte: Dicionario-Boas-Praticas.pdf
verificado_em: 2026-11-03
fontes_oficiais_consultadas_em: 2026-11-04
---

# Estrutura, namespaces e build

**Resumo:** Namespaces que seguem as pastas e pacotes NuGet geridos centralmente.

## Conteúdo

- Namespaces que seguem as pastas; um tipo por ficheiro; visibilidade mínima.
- NuGet com gestão central de pacotes (`Directory.Packages.props`); projetos por camada.
- Projeto novo: `net10.0`, a versão LTS, com suporte até 2028-11-14. O .NET 8 e o .NET 9 saíram de suporte a 2026-11-10. O .NET 11 é STS e tem o mesmo fim de suporte que o 10.

**Para uma skill:** versões de pacotes geridas centralmente, não por projeto; um projeto novo visa `net10.0`, e um projeto em `net8.0` ou `net9.0` fica assinalado ao utilizador como fora de suporte.

## Fontes oficiais

*Ligações externas que apoiam esta entrada, consultadas a 2026-11-04. Não alteram o texto acima.*

- [IDE0130](https://learn.microsoft.com/en-us/dotnet/fundamentals/code-analysis/style-rules/ide0130) — namespace deve corresponder à estrutura de pastas
- [Central Package Management](https://learn.microsoft.com/en-us/nuget/consume-packages/central-package-management) — `Directory.Packages.props` com versões centralizadas

- [dotnet/core releases-index.json](https://raw.githubusercontent.com/dotnet/core/main/release-notes/releases-index.json) — fases de suporte: 10.0 LTS e 11.0 STS até 2028-11-14; 8.0 e 9.0 em fim de suporte desde 2026-11-10

> **Nota (fonte oficial):** As convenções oficiais recomendam namespaces de ficheiro (`namespace X;`); «um tipo por ficheiro» não foi encontrado nas fontes consultadas.

## Histórico

- **2026-11-10**: antes, «versões de pacotes geridas centralmente, não por projeto.» (PDF pág. 38). Mudou porque o .NET 8 e o .NET 9 saíram de suporte e o .NET 10 é a LTS. Fonte: [dotnet/core releases-index.json](https://raw.githubusercontent.com/dotnet/core/main/release-notes/releases-index.json). Editado a 2026-11-25.

Fonte: pág. 38 (Dicionario-Boas-Praticas.pdf)

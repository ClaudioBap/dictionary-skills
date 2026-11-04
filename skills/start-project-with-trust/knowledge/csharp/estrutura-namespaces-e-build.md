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

**Para uma skill:** versões de pacotes geridas centralmente, não por projeto.

## Fontes oficiais

*Ligações externas que apoiam esta entrada, consultadas a 2026-11-04. Não alteram o texto acima.*

- [IDE0130](https://learn.microsoft.com/en-us/dotnet/fundamentals/code-analysis/style-rules/ide0130) — namespace deve corresponder à estrutura de pastas
- [Central Package Management](https://learn.microsoft.com/en-us/nuget/consume-packages/central-package-management) — `Directory.Packages.props` com versões centralizadas

> **Nota (fonte oficial):** As convenções oficiais recomendam namespaces de ficheiro (`namespace X;`); «um tipo por ficheiro» não foi encontrado nas fontes consultadas.

Fonte: pág. 38 (Dicionario-Boas-Praticas.pdf)

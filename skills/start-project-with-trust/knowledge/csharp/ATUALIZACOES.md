# Atualizações: Boas práticas de C#

Novidades com confiança alta, organizadas por categoria e da mais recente para a mais antiga. Não alteram o texto das entradas. Cada linha tem o seu registo no [CHANGELOG](../CHANGELOG.md).

## .NET

- **2026-11-03**: Os pacotes NuGet podem distribuir agent skills (ficheiros SKILL.md com cabeçalho YAML, no formato do agentskills.io). Os skills ficam listados no project.assets.json e vão para a cache local do NuGet no restore. O dotnet-inspect permite descobri-los (`dotnet-inspect package <id> -S Skills`) e o dotnet-package-skills copia-os para o repositório em `.agents/skills` (`dotnet-package-skills install`). O servidor MCP do NuGet ainda não suporta skills, e a forma de os usar com agentes fica para um artigo seguinte. Fonte: [.NET Blog: Delivering Skills in NuGet packages](https://devblogs.microsoft.com/dotnet/delivering-skills-in-nuget-packages/). Confiança: alta. Adicionado a 2026-11-04.
- **data não indicada**: O .NET 8 (LTS) e o .NET 9 (STS) chegam ao fim de suporte a 2026-11-10, segundo o índice oficial de versões do .NET; a página da Microsoft Learn indica só «novembro de 2026». Migrar para o .NET 10 (LTS, suporte até 2028-11-14). Fonte: [dotnet/core releases-index.json](https://raw.githubusercontent.com/dotnet/core/main/release-notes/releases-index.json). Confiança: media, aprovado pelo admin. Adicionado a 2026-11-04.

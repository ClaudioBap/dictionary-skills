# Atualizações: Boas práticas de C#

Novidades com confiança alta, organizadas por categoria e da mais recente para a mais antiga. Não alteram o texto das entradas. Cada linha tem o seu registo no [CHANGELOG](../CHANGELOG.md).

## .NET

- **2026-11-03**: Os pacotes NuGet podem distribuir agent skills (ficheiros SKILL.md com cabeçalho YAML, no formato do agentskills.io). Os skills ficam listados no project.assets.json e vão para a cache local do NuGet no restore. O dotnet-inspect permite descobri-los (`dotnet-inspect package <id> -S Skills`) e o dotnet-package-skills copia-os para o repositório em `.agents/skills` (`dotnet-package-skills install`). O servidor MCP do NuGet ainda não suporta skills, e a forma de os usar com agentes fica para um artigo seguinte. Fonte: [.NET Blog: Delivering Skills in NuGet packages](https://devblogs.microsoft.com/dotnet/delivering-skills-in-nuget-packages/). Confiança: alta. Adicionado a 2026-11-04.

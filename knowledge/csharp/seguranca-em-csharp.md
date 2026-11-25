---
id: csharp/seguranca-em-csharp
titulo: "Segurança em C#"
seccao: "Boas práticas de C#"
paginas: [40]
fonte: Dicionario-Boas-Praticas.pdf
verificado_em: 2026-11-03
fontes_oficiais_consultadas_em: 2026-11-04
---

# Segurança em C#

**Resumo:** Queries parametrizadas, segredos num cofre e criptografia da biblioteca padrão.

## Conteúdo

- Queries parametrizadas sempre (ADO.NET com parâmetros, ou EF Core); validar entradas; segredos fora do código.
- Não desserializar dados não confiáveis; criptografia da `System.Security.Cryptography`, não caseira.
- Dependências: `dotnet package list --vulnerable --include-transitive` lista os pacotes com vulnerabilidades conhecidas, incluindo os transitivos. É a forma do SDK do .NET 10; até ao SDK 9 escreve-se `dotnet list package --vulnerable`. O NuGet também audita no restore e dá os avisos NU1901 a NU1904. Num projeto que visa `net10.0` ou superior, o `NuGetAuditMode` vale `all` (pacotes diretos e transitivos); abaixo disso vale `direct`.

**Para uma skill:** SQL parametrizado; segredos num cofre, não no código; `dotnet package list --vulnerable --include-transitive` sem pacotes vulneráveis, com o comando e a saída na prova.

## Fontes oficiais

*Ligações externas que apoiam esta entrada, consultadas a 2026-11-04. Não alteram o texto acima.*

- [SQL Queries – EF Core](https://learn.microsoft.com/en-us/ef/core/querying/sql-queries) — FromSql/ExecuteSql parametrizados; FromSqlRaw arriscado
- [Safe storage of app secrets](https://learn.microsoft.com/en-us/aspnet/core/security/app-secrets) — segredos fora do código; Key Vault em produção
- [BinaryFormatter security guide](https://learn.microsoft.com/en-us/dotnet/standard/serialization/binaryformatter-security-guide) — desserializar dados não confiáveis nunca é seguro

- [dotnet package list](https://learn.microsoft.com/en-us/dotnet/core/tools/dotnet-package-list) — `--vulnerable` e `--include-transitive`; forma do SDK do .NET 10 (página de 2025-10-28)
- [Auditing package dependencies](https://learn.microsoft.com/en-us/nuget/concepts/auditing-packages) — auditoria no restore, NU1901 a NU1904, `NuGetAuditMode` `all` a partir de net10.0 (página de 2025-10-01)

> **Nota (fonte oficial):** Desde .NET 9 o BinaryFormatter incluído lança exceção ao ser usado; o Secret Manager é só para desenvolvimento (não cifra). Cripto: https://learn.microsoft.com/en-us/dotnet/standard/security/cryptography-model (algoritmos recomendados via System.Security.Cryptography).

## Histórico

- **2025-10-28**: antes, «SQL parametrizado; segredos num cofre, não no código.» (PDF pág. 40). Mudou porque a prova da boas-praticas-codigo pede os comandos da verificação de segurança. Fonte: [dotnet package list](https://learn.microsoft.com/en-us/dotnet/core/tools/dotnet-package-list). Editado a 2026-11-25.

Fonte: pág. 40 (Dicionario-Boas-Praticas.pdf)

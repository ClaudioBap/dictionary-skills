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

**Para uma skill:** SQL parametrizado; segredos num cofre, não no código.

## Fontes oficiais

*Ligações externas que apoiam esta entrada, consultadas a 2026-11-04. Não alteram o texto acima.*

- [SQL Queries – EF Core](https://learn.microsoft.com/en-us/ef/core/querying/sql-queries) — FromSql/ExecuteSql parametrizados; FromSqlRaw arriscado
- [Safe storage of app secrets](https://learn.microsoft.com/en-us/aspnet/core/security/app-secrets) — segredos fora do código; Key Vault em produção
- [BinaryFormatter security guide](https://learn.microsoft.com/en-us/dotnet/standard/serialization/binaryformatter-security-guide) — desserializar dados não confiáveis nunca é seguro

> **Nota (fonte oficial):** Desde .NET 9 o BinaryFormatter incluído lança exceção ao ser usado; o Secret Manager é só para desenvolvimento (não cifra). Cripto: https://learn.microsoft.com/en-us/dotnet/standard/security/cryptography-model (algoritmos recomendados via System.Security.Cryptography).

Fonte: pág. 40 (Dicionario-Boas-Praticas.pdf)

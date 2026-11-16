---
id: csharp/logging
titulo: "Logging"
seccao: "Boas práticas de C#"
paginas: [40]
fonte: Dicionario-Boas-Praticas.pdf
verificado_em: 2026-11-03
fontes_oficiais_consultadas_em: 2026-11-04
---

# Logging

**Resumo:** `ILogger` com logging estruturado, nunca `Console.WriteLine`, sem segredos.

## Conteúdo

- `ILogger` com logging estruturado (`logger.LogInformation("x={X}", x)`), nunca `Console.WriteLine`; níveis corretos.
- Não registar segredos nem dados pessoais.

**Para uma skill:** zero `Console.WriteLine` de diagnóstico; logs estruturados sem segredos.

## Fontes oficiais

*Ligações externas que apoiam esta entrada, consultadas a 2026-11-04. Não alteram o texto acima.*

- [Logging in C# and .NET](https://learn.microsoft.com/en-us/dotnet/core/extensions/logging/overview) — ILogger, message templates com placeholders, níveis

> **Nota (fonte oficial):** A documentação só refere dados sensíveis a propósito do nível Trace; não há orientação geral sobre segredos nos logs.

Fonte: pág. 40 (Dicionario-Boas-Praticas.pdf)

---
id: csharp/logging
titulo: "Logging"
seccao: "Boas práticas de C#"
paginas: [40]
fonte: Dicionario-Boas-Praticas.pdf
verificado_em: 2026-11-03
---

# Logging

**Resumo:** `ILogger` com logging estruturado, nunca `Console.WriteLine`, sem segredos.

## Conteúdo

- `ILogger` com logging estruturado (`logger.LogInformation("x={X}", x)`), nunca `Console.WriteLine`; níveis corretos.
- Não registar segredos nem dados pessoais.

**Para uma skill:** zero `Console.WriteLine` de diagnóstico; logs estruturados sem segredos.

Fonte: pág. 40 (Dicionario-Boas-Praticas.pdf)

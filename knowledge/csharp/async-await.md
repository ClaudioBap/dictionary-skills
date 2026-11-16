---
id: csharp/async-await
titulo: "Async/await"
seccao: "Boas práticas de C#"
paginas: [38, 39]
fonte: Dicionario-Boas-Praticas.pdf
verificado_em: 2026-11-03
fontes_oficiais_consultadas_em: 2026-11-04
---

# Async/await

**Resumo:** `async`/`await` para I/O, sem `async void` nem bloqueios, com cancelamento propagado.

## Conteúdo

- `async` / `await` para I/O; devolver `Task` / `Task<T>`, nunca `async void` (exceto handlers de evento).
- `ConfigureAwait(false)` em bibliotecas; não bloquear com `.Result` / `.Wait()`; `CancellationToken` propagado.

**Para uma skill:** sem `async void`, sem `.Result` / `.Wait()`; tokens de cancelamento propagados.

## Fontes oficiais

*Ligações externas que apoiam esta entrada, consultadas a 2026-11-04. Não alteram o texto acima.*

- [Asynchronous programming scenarios](https://learn.microsoft.com/en-us/dotnet/csharp/asynchronous-programming/async-scenarios) — `async void` só em handlers; não bloquear com Result/Wait
- [CA2007](https://learn.microsoft.com/en-us/dotnet/fundamentals/code-analysis/quality-rules/ca2007) — `ConfigureAwait(false)` destinado a bibliotecas
- [Cancellation in Managed Threads](https://learn.microsoft.com/en-us/dotnet/standard/threading/cancellation-in-managed-threads) — propagar CancellationToken; aceitar token externo

Fonte: págs. 38, 39 (Dicionario-Boas-Praticas.pdf)

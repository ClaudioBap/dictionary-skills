---
id: csharp/async-await
titulo: "Async/await"
seccao: "Boas práticas de C#"
paginas: [38, 39]
fonte: Dicionario-Boas-Praticas.pdf
verificado_em: 2026-11-03
---

# Async/await

**Resumo:** `async`/`await` para I/O, sem `async void` nem bloqueios, com cancelamento propagado.

## Conteúdo

- `async` / `await` para I/O; devolver `Task` / `Task<T>`, nunca `async void` (exceto handlers de evento).
- `ConfigureAwait(false)` em bibliotecas; não bloquear com `.Result` / `.Wait()`; `CancellationToken` propagado.

**Para uma skill:** sem `async void`, sem `.Result` / `.Wait()`; tokens de cancelamento propagados.

Fonte: págs. 38, 39 (Dicionario-Boas-Praticas.pdf)

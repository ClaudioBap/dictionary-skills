---
id: csharp/gestao-de-recursos-idisposable
titulo: "Gestão de recursos (IDisposable)"
seccao: "Boas práticas de C#"
paginas: [39]
fonte: Dicionario-Boas-Praticas.pdf
verificado_em: 2026-11-03
---

# Gestão de recursos (IDisposable)

**Resumo:** `using` para tudo o que é `IDisposable`, sem ligações nem streams por fechar.

## Conteúdo

- `using` para tudo o que é `IDisposable` / `IAsyncDisposable`; implementar o padrão em recursos próprios.
- Não deixar ligações nem streams por fechar; cuidado com eventos que seguram referências.

**Para uma skill:** nenhum `IDisposable` sem `using` ou dispose garantido.

Fonte: pág. 39 (Dicionario-Boas-Praticas.pdf)

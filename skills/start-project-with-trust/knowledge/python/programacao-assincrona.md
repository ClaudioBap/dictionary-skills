---
id: python/programacao-assincrona
titulo: "Programação assíncrona"
seccao: "Boas práticas de Python"
paginas: [33]
fonte: Dicionario-Boas-Praticas.pdf
verificado_em: 2026-11-03
---

# Programação assíncrona

**Resumo:** `asyncio` para I/O sem nunca bloquear o event loop.

## Conteúdo

- `asyncio` com `async/await` para I/O; nunca bloquear o event loop com trabalho pesado (usar `to_thread`/executor).
- Não misturar APIs sync e async sem cuidado; cancelar tarefas de fundo no encerramento.

**Para uma skill:** nada de chamadas bloqueantes dentro de código `async`.

Fonte: pág. 33 (Dicionario-Boas-Praticas.pdf)

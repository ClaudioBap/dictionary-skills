---
id: python/programacao-assincrona
titulo: "Programação assíncrona"
seccao: "Boas práticas de Python"
paginas: [33]
fonte: Dicionario-Boas-Praticas.pdf
verificado_em: 2026-11-03
fontes_oficiais_consultadas_em: 2026-11-04
---

# Programação assíncrona

**Resumo:** `asyncio` para I/O sem nunca bloquear o event loop.

## Conteúdo

- `asyncio` com `async/await` para I/O; nunca bloquear o event loop com trabalho pesado (usar `to_thread`/executor).
- Não misturar APIs sync e async sem cuidado; cancelar tarefas de fundo no encerramento.

**Para uma skill:** nada de chamadas bloqueantes dentro de código `async`.

## Fontes oficiais

*Ligações externas que apoiam esta entrada, consultadas a 2026-11-04. Não alteram o texto acima.*

- [Developing with asyncio](https://docs.python.org/3/library/asyncio-dev.html) — não bloquear o event loop; executor; modo debug
- [Coroutines and Tasks](https://docs.python.org/3/library/asyncio-task.html) — `to_thread`, cancelamento de tarefas, referências a tarefas de fundo

> **Nota (fonte oficial):** A documentação recomenda `asyncio.TaskGroup` para gerir tarefas de fundo e propagar exceções.

Fonte: pág. 33 (Dicionario-Boas-Praticas.pdf)

---
id: python/gestao-de-recursos-context-managers
titulo: "Gestão de recursos (context managers)"
seccao: "Boas práticas de Python"
paginas: [32]
fonte: Dicionario-Boas-Praticas.pdf
verificado_em: 2026-11-03
---

# Gestão de recursos (context managers)

**Resumo:** Abrir ficheiros, ligações e locks com `with`, para garantir o fecho mesmo com exceção.

## Conteúdo

- Abrir ficheiros, ligações e locks com `with`; escrever `__enter__`/`__exit__` ou `contextlib` para recursos próprios.
- Garante fecho mesmo com exceção; evita fugas de ficheiros e ligações.

**Para uma skill:** nenhum recurso aberto sem `with` ou fecho garantido.

Fonte: pág. 32 (Dicionario-Boas-Praticas.pdf)

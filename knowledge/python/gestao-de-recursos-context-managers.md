---
id: python/gestao-de-recursos-context-managers
titulo: "Gestão de recursos (context managers)"
seccao: "Boas práticas de Python"
paginas: [32]
fonte: Dicionario-Boas-Praticas.pdf
verificado_em: 2026-11-03
fontes_oficiais_consultadas_em: 2026-11-04
---

# Gestão de recursos (context managers)

**Resumo:** Abrir ficheiros, ligações e locks com `with`, para garantir o fecho mesmo com exceção.

## Conteúdo

- Abrir ficheiros, ligações e locks com `with`; escrever `__enter__`/`__exit__` ou `contextlib` para recursos próprios.
- Garante fecho mesmo com exceção; evita fugas de ficheiros e ligações.

**Para uma skill:** nenhum recurso aberto sem `with` ou fecho garantido.

## Fontes oficiais

*Ligações externas que apoiam esta entrada, consultadas a 2026-11-04. Não alteram o texto acima.*

- [contextlib](https://docs.python.org/3/library/contextlib.html) — `@contextmanager` com try/finally garante limpeza mesmo com exceção
- [Glossary – context manager](https://docs.python.org/3/glossary.html) — protocolo de gestão de contexto usado por `with`

Fonte: pág. 32 (Dicionario-Boas-Praticas.pdf)

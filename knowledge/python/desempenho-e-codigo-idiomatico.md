---
id: python/desempenho-e-codigo-idiomatico
titulo: "Desempenho e código idiomático"
seccao: "Boas práticas de Python"
paginas: [33, 34]
fonte: Dicionario-Boas-Praticas.pdf
verificado_em: 2026-11-03
fontes_oficiais_consultadas_em: 2026-11-04
---

# Desempenho e código idiomático

**Resumo:** Código idiomático com built-ins e geradores, e otimização só depois de medir.

## Conteúdo

- Preferir compreensões e geradores a ciclos manuais; usar os built-ins (`sum`, `any`, `sorted`) e a biblioteca padrão.
- Não otimizar antes de medir (`cProfile` / `timeit`); gerar em vez de materializar listas grandes.

**Para uma skill:** otimização só com uma medição que a justifique.

## Fontes oficiais

*Ligações externas que apoiam esta entrada, consultadas a 2026-11-04. Não alteram o texto acima.*

- [Functional Programming HOWTO](https://docs.python.org/3/howto/functional.html) — geradores vs listas; any/all/sum
- [The Python Profilers](https://docs.python.org/3/library/profile.html) — medir com cProfile antes de otimizar
- [timeit](https://docs.python.org/3/library/timeit.html) — medir tempo de pequenos excertos

> **Nota (fonte oficial):** Python 3.15: o módulo `profile` está obsoleto (remoção em 3.17); recomendado `profiling.tracing`; `cProfile` continua como alias.

> **Nota (fonte oficial):** Versão atual: Python 3.15.2 (25-10-2026); 3.10 em fim de vida desde outubro de 2026.

Fonte: págs. 33, 34 (Dicionario-Boas-Praticas.pdf)

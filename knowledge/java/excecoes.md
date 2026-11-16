---
id: java/excecoes
titulo: "Exceções"
seccao: "Boas práticas de Java"
paginas: [35, 36]
fonte: Dicionario-Boas-Praticas.pdf
verificado_em: 2026-11-03
fontes_oficiais_consultadas_em: 2026-11-04
---

# Exceções

**Resumo:** Apanhar o mais específico, nunca `catch` vazio, try-with-resources para recursos.

## Conteúdo

- Apanhar o mais específico; nunca engolir (`catch` vazio); relançar com causa.
- `try-with-resources` para tudo o que é `AutoCloseable`; não usar exceções para fluxo normal.
- Checked para erros recuperáveis, unchecked para erros de programação.

**Para uma skill:** nenhum `catch` vazio; recursos sempre em try-with-resources.

## Fontes oficiais

*Ligações externas que apoiam esta entrada, consultadas a 2026-11-04. Não alteram o texto acima.*

- [Unchecked Exceptions — The Controversy](https://docs.oracle.com/javase/tutorial/essential/exceptions/runtime.html) — checked se recuperável, unchecked se não
- [Chained Exceptions](https://docs.oracle.com/javase/tutorial/essential/exceptions/chained.html) — relançar com a causa original
- [The try-with-resources Statement](https://docs.oracle.com/javase/tutorial/essential/exceptions/tryResourceClose.html) — fecho garantido de AutoCloseable

Fonte: págs. 35, 36 (Dicionario-Boas-Praticas.pdf)

---
id: java/gestao-de-recursos
titulo: "Gestão de recursos"
seccao: "Boas práticas de Java"
paginas: [36, 37]
fonte: Dicionario-Boas-Praticas.pdf
verificado_em: 2026-11-03
fontes_oficiais_consultadas_em: 2026-11-04
---

# Gestão de recursos

**Resumo:** try-with-resources para recursos e atenção a fugas de memória.

## Conteúdo

- `try-with-resources` para ficheiros, ligações e streams; implementar `AutoCloseable` em recursos próprios.
- Evitar fugas de memória (listeners não removidos, coleções que só crescem).

**Para uma skill:** nenhum recurso fechado à mão num `finally` quando dá para try-with-resources.

## Fontes oficiais

*Ligações externas que apoiam esta entrada, consultadas a 2026-11-04. Não alteram o texto acima.*

- [The try-with-resources Statement](https://docs.oracle.com/javase/tutorial/essential/exceptions/tryResourceClose.html) — preferir a finally; exceções suprimidas; ordem de fecho
- [Troubleshoot Memory Leaks](https://docs.oracle.com/en/java/javase/25/troubleshoot/troubleshooting-memory-leaks.html) — referências retidas e coleções nunca limpas

> **Nota (fonte oficial):** A página oficial não menciona listeners não removidos.

Fonte: págs. 36, 37 (Dicionario-Boas-Praticas.pdf)

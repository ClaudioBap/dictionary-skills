---
id: java/concorrencia
titulo: "Concorrência"
seccao: "Boas práticas de Java"
paginas: [36]
fonte: Dicionario-Boas-Praticas.pdf
verificado_em: 2026-11-03
fontes_oficiais_consultadas_em: 2026-11-04
---

# Concorrência

**Resumo:** Preferir imutabilidade e `java.util.concurrent`, sem estado mutável partilhado sem proteção.

## Conteúdo

- Preferir imutabilidade e `java.util.concurrent` (ExecutorService, concurrent collections) a `synchronized` manual.
- Não partilhar estado mutável sem proteção; fechar os executores; evitar `Thread` crua.

**Para uma skill:** sem estado mutável partilhado sem sincronização; pools geridos e fechados.

## Fontes oficiais

*Ligações externas que apoiam esta entrada, consultadas a 2026-11-04. Não alteram o texto acima.*

- [java.util.concurrent](https://docs.oracle.com/en/java/javase/25/docs/api/java.base/java/util/concurrent/package-summary.html) — executors, coleções concorrentes, sincronizadores
- [ExecutorService](https://docs.oracle.com/en/java/javase/25/docs/api/java.base/java/util/concurrent/ExecutorService.html) — encerrar executores (shutdown/awaitTermination, close)

> **Nota (fonte oficial):** Desde Java 19 `ExecutorService` é AutoCloseable (`close()` aguarda tarefas): pode usar-se try-with-resources.

Fonte: pág. 36 (Dicionario-Boas-Praticas.pdf)

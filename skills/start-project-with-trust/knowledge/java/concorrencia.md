---
id: java/concorrencia
titulo: "Concorrência"
seccao: "Boas práticas de Java"
paginas: [36]
fonte: Dicionario-Boas-Praticas.pdf
verificado_em: 2026-11-03
---

# Concorrência

**Resumo:** Preferir imutabilidade e `java.util.concurrent`, sem estado mutável partilhado sem proteção.

## Conteúdo

- Preferir imutabilidade e `java.util.concurrent` (ExecutorService, concurrent collections) a `synchronized` manual.
- Não partilhar estado mutável sem proteção; fechar os executores; evitar `Thread` crua.

**Para uma skill:** sem estado mutável partilhado sem sincronização; pools geridos e fechados.

Fonte: pág. 36 (Dicionario-Boas-Praticas.pdf)

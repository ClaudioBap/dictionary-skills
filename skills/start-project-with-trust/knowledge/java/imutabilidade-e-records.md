---
id: java/imutabilidade-e-records
titulo: "Imutabilidade e records"
seccao: "Boas práticas de Java"
paginas: [35]
fonte: Dicionario-Boas-Praticas.pdf
verificado_em: 2026-11-03
fontes_oficiais_consultadas_em: 2026-11-04
---

# Imutabilidade e records

**Resumo:** Preferir objetos imutáveis, `record` para dados e coleções imutáveis.

## Conteúdo

- Preferir objetos imutáveis; `final` nos campos; `record` para dados; coleções imutáveis (`List.of`).
- Imutável é seguro em concorrência e mais fácil de raciocinar.

**Para uma skill:** classes de dados são `record` ou imutáveis por omissão.

## Fontes oficiais

*Ligações externas que apoiam esta entrada, consultadas a 2026-11-04. Não alteram o texto acima.*

- [java.lang.Record](https://docs.oracle.com/en/java/javase/25/docs/api/java.base/java/lang/Record.html) — records são portadores de dados superficialmente imutáveis
- [List – Unmodifiable Lists](https://docs.oracle.com/en/java/javase/25/docs/api/java.base/java/util/List.html) — `List.of`/`copyOf` imutáveis, sem nulls
- [Immutable Objects](https://docs.oracle.com/javase/tutorial/essential/concurrency/immutable.html) — imutáveis são seguros em concorrência

> **Nota (fonte oficial):** Imutabilidade de records é superficial: componentes mutáveis (ex.: listas) exigem cópias defensivas.

Fonte: pág. 35 (Dicionario-Boas-Praticas.pdf)

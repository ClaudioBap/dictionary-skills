---
id: java/colecoes-generics-e-streams
titulo: "Coleções, generics e Streams"
seccao: "Boas práticas de Java"
paginas: [36]
fonte: Dicionario-Boas-Praticas.pdf
verificado_em: 2026-11-03
fontes_oficiais_consultadas_em: 2026-11-04
---

# Coleções, generics e Streams

**Resumo:** Programar para interfaces de coleção, com generics e Streams legíveis.

## Conteúdo

- Programar para interfaces (`List`, `Map`), não implementações; generics em vez de tipos crus.
- Streams para transformações legíveis; não abusar em código com efeitos colaterais; preferir coleções imutáveis à saída.

**Para uma skill:** APIs expõem interfaces de coleção, nunca o tipo concreto.

## Fontes oficiais

*Ligações externas que apoiam esta entrada, consultadas a 2026-11-04. Não alteram o texto acima.*

- [Raw Types](https://docs.oracle.com/javase/tutorial/java/generics/rawTypes.html) — evitar tipos crus; avisos unchecked
- [java.util.stream – Side-effects](https://docs.oracle.com/en/java/javase/25/docs/api/java.base/java/util/stream/package-summary.html) — efeitos colaterais em streams desencorajados
- [Collection Interfaces](https://docs.oracle.com/javase/tutorial/collections/interfaces/index.html) — interfaces de coleção independentes da implementação

> **Nota (fonte oficial):** O tutorial usa `List<> x = new ArrayList<>()` mas não enuncia explicitamente «programar para interfaces».

Fonte: pág. 36 (Dicionario-Boas-Praticas.pdf)

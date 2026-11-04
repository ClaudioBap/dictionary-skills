---
id: java/null-safety-e-optional
titulo: "Null safety e Optional"
seccao: "Boas práticas de Java"
paginas: [35]
fonte: Dicionario-Boas-Praticas.pdf
verificado_em: 2026-11-03
fontes_oficiais_consultadas_em: 2026-11-04
---

# Null safety e Optional

**Resumo:** Não retornar `null`; usar `Optional` para ausência, nunca em campos nem parâmetros.

## Conteúdo

- Não retornar `null` de métodos; usar `Optional` para «pode não existir»; anotar `@Nullable/@NonNull`.
- Nunca `Optional` em campos nem parâmetros; validar entradas com `Objects.requireNonNull`.

**Para uma skill:** métodos novos não retornam `null`; ausência é `Optional`.

## Fontes oficiais

*Ligações externas que apoiam esta entrada, consultadas a 2026-11-04. Não alteram o texto acima.*

- [Optional](https://docs.oracle.com/en/java/javase/25/docs/api/java.base/java/util/Optional.html) — destinado sobretudo a tipo de retorno para «sem resultado»
- [Objects.requireNonNull](https://docs.oracle.com/en/java/javase/25/docs/api/java.base/java/util/Objects.html) — validação de parâmetros em métodos e construtores

> **Nota (fonte oficial):** O Javadoc não proíbe expressamente Optional em campos/parâmetros (diz «primarily intended» para retornos); `@Nullable/@NonNull` não fazem parte do JDK.

Fonte: pág. 35 (Dicionario-Boas-Praticas.pdf)

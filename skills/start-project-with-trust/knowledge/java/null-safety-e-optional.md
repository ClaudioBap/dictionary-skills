---
id: java/null-safety-e-optional
titulo: "Null safety e Optional"
seccao: "Boas práticas de Java"
paginas: [35]
fonte: Dicionario-Boas-Praticas.pdf
verificado_em: 2026-11-03
---

# Null safety e Optional

**Resumo:** Não retornar `null`; usar `Optional` para ausência, nunca em campos nem parâmetros.

## Conteúdo

- Não retornar `null` de métodos; usar `Optional` para «pode não existir»; anotar `@Nullable/@NonNull`.
- Nunca `Optional` em campos nem parâmetros; validar entradas com `Objects.requireNonNull`.

**Para uma skill:** métodos novos não retornam `null`; ausência é `Optional`.

Fonte: pág. 35 (Dicionario-Boas-Praticas.pdf)

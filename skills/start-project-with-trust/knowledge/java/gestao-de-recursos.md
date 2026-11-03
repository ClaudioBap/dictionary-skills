---
id: java/gestao-de-recursos
titulo: "Gestão de recursos"
seccao: "Boas práticas de Java"
paginas: [36, 37]
fonte: Dicionario-Boas-Praticas.pdf
verificado_em: 2026-11-03
---

# Gestão de recursos

**Resumo:** try-with-resources para recursos e atenção a fugas de memória.

## Conteúdo

- `try-with-resources` para ficheiros, ligações e streams; implementar `AutoCloseable` em recursos próprios.
- Evitar fugas de memória (listeners não removidos, coleções que só crescem).

**Para uma skill:** nenhum recurso fechado à mão num `finally` quando dá para try-with-resources.

Fonte: págs. 36, 37 (Dicionario-Boas-Praticas.pdf)

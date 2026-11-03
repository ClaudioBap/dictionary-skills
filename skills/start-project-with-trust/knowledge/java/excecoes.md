---
id: java/excecoes
titulo: "Exceções"
seccao: "Boas práticas de Java"
paginas: [35, 36]
fonte: Dicionario-Boas-Praticas.pdf
verificado_em: 2026-11-03
---

# Exceções

**Resumo:** Apanhar o mais específico, nunca `catch` vazio, try-with-resources para recursos.

## Conteúdo

- Apanhar o mais específico; nunca engolir (`catch` vazio); relançar com causa.
- `try-with-resources` para tudo o que é `AutoCloseable`; não usar exceções para fluxo normal.
- Checked para erros recuperáveis, unchecked para erros de programação.

**Para uma skill:** nenhum `catch` vazio; recursos sempre em try-with-resources.

Fonte: págs. 35, 36 (Dicionario-Boas-Praticas.pdf)

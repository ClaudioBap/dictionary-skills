---
id: python/funcoes-design-e-armadilhas
titulo: "Funções: design e armadilhas"
seccao: "Boas práticas de Python"
paginas: [32]
fonte: Dicionario-Boas-Praticas.pdf
verificado_em: 2026-11-03
---

# Funções: design e armadilhas

**Resumo:** Funções pequenas com um propósito, sem defaults mutáveis nem efeitos escondidos.

## Conteúdo

- Funções pequenas, com um propósito; preferir retornar valores a mutar argumentos.
- Nunca argumentos por omissão mutáveis (`def f(x=[])`); usar `None` e criar dentro.
- Poucos parâmetros; usar palavras-chave para clareza; evitar efeitos colaterais escondidos.

**Para uma skill:** sem defaults mutáveis; funções curtas e com um só propósito.

Fonte: pág. 32 (Dicionario-Boas-Praticas.pdf)

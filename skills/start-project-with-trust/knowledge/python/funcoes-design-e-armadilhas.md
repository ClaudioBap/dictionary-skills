---
id: python/funcoes-design-e-armadilhas
titulo: "Funções: design e armadilhas"
seccao: "Boas práticas de Python"
paginas: [32]
fonte: Dicionario-Boas-Praticas.pdf
verificado_em: 2026-11-03
fontes_oficiais_consultadas_em: 2026-11-04
---

# Funções: design e armadilhas

**Resumo:** Funções pequenas com um propósito, sem defaults mutáveis nem efeitos escondidos.

## Conteúdo

- Funções pequenas, com um propósito; preferir retornar valores a mutar argumentos.
- Nunca argumentos por omissão mutáveis (`def f(x=[])`); usar `None` e criar dentro.
- Poucos parâmetros; usar palavras-chave para clareza; evitar efeitos colaterais escondidos.

**Para uma skill:** sem defaults mutáveis; funções curtas e com um só propósito.

## Fontes oficiais

*Ligações externas que apoiam esta entrada, consultadas a 2026-11-04. Não alteram o texto acima.*

- [More Control Flow Tools](https://docs.python.org/3/tutorial/controlflow.html) — aviso sobre defaults mutáveis; padrão `None`; argumentos por palavra-chave

Fonte: pág. 32 (Dicionario-Boas-Praticas.pdf)

---
id: python/estrutura-de-projeto-e-imports
titulo: "Estrutura de projeto e imports"
seccao: "Boas práticas de Python"
paginas: [31]
fonte: Dicionario-Boas-Praticas.pdf
verificado_em: 2026-11-03
fontes_oficiais_consultadas_em: 2026-11-04
---

# Estrutura de projeto e imports

**Resumo:** Layout `src/`, imports absolutos, um módulo por responsabilidade e sem ciclos.

## Conteúdo

- Layout `src/`, pacotes com `__init__.py`, imports absolutos; nada de imports relativos profundos nem `import *`.
- Um módulo por responsabilidade; evitar ficheiros gigantes e dependências circulares.
- Separar interface de implementação (ex.: um `factory` que devolve a interface).

**Para uma skill:** nenhum `import *`; módulos abaixo de um limite de linhas; sem ciclos de import.

## Fontes oficiais

*Ligações externas que apoiam esta entrada, consultadas a 2026-11-04. Não alteram o texto acima.*

- [src layout vs flat layout](https://packaging.python.org/en/latest/discussions/src-layout-vs-flat-layout/) — vantagens do layout src/
- [PEP 8 – Imports](https://peps.python.org/pep-0008/) — imports absolutos recomendados; evitar `from x import *`
- [The import system](https://docs.python.org/3/reference/import.html) — pacotes regulares com `__init__.py`

> **Nota (fonte oficial):** PEP 8 aceita imports relativos explícitos em layouts de pacotes complexos.

Fonte: pág. 31 (Dicionario-Boas-Praticas.pdf)

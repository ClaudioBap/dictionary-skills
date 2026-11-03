---
id: python/estrutura-de-projeto-e-imports
titulo: "Estrutura de projeto e imports"
seccao: "Boas práticas de Python"
paginas: [31]
fonte: Dicionario-Boas-Praticas.pdf
verificado_em: 2026-11-03
---

# Estrutura de projeto e imports

**Resumo:** Layout `src/`, imports absolutos, um módulo por responsabilidade e sem ciclos.

## Conteúdo

- Layout `src/`, pacotes com `__init__.py`, imports absolutos; nada de imports relativos profundos nem `import *`.
- Um módulo por responsabilidade; evitar ficheiros gigantes e dependências circulares.
- Separar interface de implementação (ex.: um `factory` que devolve a interface).

**Para uma skill:** nenhum `import *`; módulos abaixo de um limite de linhas; sem ciclos de import.

Fonte: pág. 31 (Dicionario-Boas-Praticas.pdf)

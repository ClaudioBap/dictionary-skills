---
id: estrutura/diagramas-c4
titulo: "Diagramas de arquitetura (modelo C4)"
seccao: "Estrutura e documentação"
paginas: []
fonte: "https://c4model.com/ e https://c4model.com/abstractions; consultados a 2026-11-10, páginas sem data. Não vem do PDF."
data_lancamento: null
confianca: media
verificado_em: 2026-11-10
---

# Diagramas de arquitetura (modelo C4)

**Resumo:** Quatro níveis de zoom, do sistema ao código, com o mesmo vocabulário em todos; os dois primeiros chegam para mostrar o que é núcleo e o que é específico de cada caso.

## Conteúdo

- Os quatro níveis, pelos nomes: «1. Software system», «2. Container», «3. Component», «4. Code». Fonte: [C4 model](https://c4model.com/)
- Como se encaixam: «A software system is made up of one or more containers (applications and data stores), each of which contains one or more components»; o código são «classes, interfaces, objects, functions, etc». Fonte: [Abstractions (C4 model)](https://c4model.com/abstractions)
- As definições de uma linha de cada nível não foram lidas à letra. Fonte: as mesmas páginas.
- Para a reutilização *(interpretação)*: no diagrama de contentores, os adaptadores e os dados de um caso aparecem como contentores ou componentes separados do núcleo, e é esse desenho que mostra o que muda de cliente para cliente.

**Para uma skill:** o projeto tem pelo menos os diagramas de sistema e de contentores, e o específico de cada caso aparece como contentor ou componente separado do núcleo.

## Ver também

- [Decisões registadas (ADR)](decisoes-registadas-adr.md) (Estrutura e documentação)
- [Núcleo e adaptadores (arquitetura hexagonal)](../produto/nucleo-e-adaptadores.md) (Modularização e produtização)

Fonte: https://c4model.com/ e https://c4model.com/abstractions, consultados a 2026-11-10, páginas sem data. Não vem do PDF.

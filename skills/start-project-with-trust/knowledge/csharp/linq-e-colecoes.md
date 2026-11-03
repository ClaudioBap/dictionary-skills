---
id: csharp/linq-e-colecoes
titulo: "LINQ e coleções"
seccao: "Boas práticas de C#"
paginas: [39]
fonte: Dicionario-Boas-Praticas.pdf
verificado_em: 2026-11-03
---

# LINQ e coleções

**Resumo:** Expor interfaces de coleção e ter atenção à execução adiada do LINQ.

## Conteúdo

- Expor `IEnumerable` / `IReadOnlyList`, não tipos concretos; LINQ para transformações legíveis.
- Atenção à execução adiada (materializar com `ToList` quando preciso); evitar múltiplas enumerações caras.

**Para uma skill:** APIs expõem interfaces de coleção; sem enumerar a mesma query cara duas vezes.

Fonte: pág. 39 (Dicionario-Boas-Praticas.pdf)

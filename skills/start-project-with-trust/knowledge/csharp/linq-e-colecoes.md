---
id: csharp/linq-e-colecoes
titulo: "LINQ e coleções"
seccao: "Boas práticas de C#"
paginas: [39]
fonte: Dicionario-Boas-Praticas.pdf
verificado_em: 2026-11-03
fontes_oficiais_consultadas_em: 2026-11-04
---

# LINQ e coleções

**Resumo:** Expor interfaces de coleção e ter atenção à execução adiada do LINQ.

## Conteúdo

- Expor `IEnumerable` / `IReadOnlyList`, não tipos concretos; LINQ para transformações legíveis.
- Atenção à execução adiada (materializar com `ToList` quando preciso); evitar múltiplas enumerações caras.

**Para uma skill:** APIs expõem interfaces de coleção; sem enumerar a mesma query cara duas vezes.

## Fontes oficiais

*Ligações externas que apoiam esta entrada, consultadas a 2026-11-04. Não alteram o texto acima.*

- [Introduction to LINQ Queries](https://learn.microsoft.com/en-us/dotnet/csharp/linq/get-started/introduction-to-linq-queries) — execução adiada; materializar com ToList/ToArray
- [CA1851](https://learn.microsoft.com/en-us/dotnet/fundamentals/code-analysis/quality-rules/ca1851) — evitar enumerações múltiplas de IEnumerable
- [Guidelines for Collections](https://learn.microsoft.com/en-us/dotnet/standard/design-guidelines/guidelines-for-collections) — não usar List<T> em APIs públicas

> **Nota (fonte oficial):** Guidelines for Collections é reimpressão de 2008 e pode estar desatualizada.

Fonte: pág. 39 (Dicionario-Boas-Praticas.pdf)

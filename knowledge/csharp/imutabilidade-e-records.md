---
id: csharp/imutabilidade-e-records
titulo: "Imutabilidade e records"
seccao: "Boas práticas de C#"
paginas: [38]
fonte: Dicionario-Boas-Praticas.pdf
verificado_em: 2026-11-03
fontes_oficiais_consultadas_em: 2026-11-04
---

# Imutabilidade e records

**Resumo:** `record` para dados e DTOs, com `init`/`readonly` e coleções só-leitura.

## Conteúdo

- `record` para dados e DTOs; `init` / `readonly` para imutabilidade; `required` para o que é obrigatório.
- Preferir tipos imutáveis; coleções só-leitura na saída (`IReadOnlyList`).

**Para uma skill:** modelos de dados são `record` ou imutáveis por omissão.

## Fontes oficiais

*Ligações externas que apoiam esta entrada, consultadas a 2026-11-04. Não alteram o texto acima.*

- [Records](https://learn.microsoft.com/en-us/dotnet/csharp/language-reference/builtin-types/record) — igualdade por valor, propriedades init, imutabilidade superficial
- [required modifier](https://learn.microsoft.com/en-us/dotnet/csharp/language-reference/keywords/required) — membros obrigatórios no inicializador (C# 11+)
- [Guidelines for Collections](https://learn.microsoft.com/en-us/dotnet/standard/design-guidelines/guidelines-for-collections) — ReadOnlyCollection na saída; não expor List<T>

> **Nota (fonte oficial):** A documentação avisa que records não servem como entidades do EF Core (dependem de igualdade por referência).

Fonte: pág. 38 (Dicionario-Boas-Praticas.pdf)

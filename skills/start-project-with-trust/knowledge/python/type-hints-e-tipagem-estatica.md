---
id: python/type-hints-e-tipagem-estatica
titulo: "Type hints e tipagem estática"
seccao: "Boas práticas de Python"
paginas: [31]
fonte: Dicionario-Boas-Praticas.pdf
verificado_em: 2026-11-03
---

# Type hints e tipagem estática

**Resumo:** Anotar as assinaturas públicas e correr mypy ou pyright no CI, evitando `Any`.

## Conteúdo

- Anotar assinaturas de funções e atributos públicos; correr `mypy` ou `pyright` no CI.
- Usar `list[str]`, `dict`, `X | None`, `Protocol`, `Literal`, `TypedDict`; evitar `Any` a não ser em fronteiras.
- Tipos tornam o código auto-documentado e apanham erros antes de correr.

**Para uma skill:** função pública nova vem tipada e passa o verificador de tipos.

## Ver também

- [Ferramentas: tipagem estática](../cicd/ferramentas-tipagem-estatica.md) (CI/CD e ferramentas)

Fonte: pág. 31 (Dicionario-Boas-Praticas.pdf)

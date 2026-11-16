---
id: estrutura/decisoes-registadas-adr
titulo: "Decisões registadas (ADR)"
seccao: "Estrutura e documentação"
paginas: [42, 59]
fonte: Dicionario-Boas-Praticas.pdf
verificado_em: 2026-11-03
fontes_oficiais_consultadas_em: 2026-11-04
---

# Decisões registadas (ADR)

**Resumo:** Uma decisão de arquitetura por ficheiro, numerada e imutável, criada antes do código. Esta entrada aparece em duas secções do PDF (Estrutura e documentação, pág. 42; Governação e processo, pág. 59) e foi juntada aqui.

## Conteúdo

- Uma decisão de arquitetura por ficheiro, numerada e imutável, com contexto, opção escolhida e «substituído por» quando muda. (pág. 42)
- Evita que o porquê viva só em commits longos e docstrings que envelhecem. (pág. 42)
- Um ADR por decisão de arquitetura (`docs/adr/NNNN-titulo.md`), curto, imutável, com «substituído por» quando muda. (pág. 59)
- A referência gerada do código sempre que possível (OpenAPI, esquema, catálogo), para não envelhecer. (pág. 59)

**Para uma skill:** uma decisão estrutural nova gera um ADR antes do código. (pág. 42)

**Para uma skill:** uma decisão de arquitetura nova gera um ADR antes do código. (pág. 59)

## Fontes oficiais

*Ligações externas que apoiam esta entrada, consultadas a 2026-11-04. Não alteram o texto acima.*

- [Documenting Architecture Decisions](https://www.cognitect.com/blog/2011/11/15/documenting-architecture-decisions) — ADR curtos, numerados sem reutilizar, no repositório, antigos marcados «superseded»
- [Architectural Decision Records](https://adr.github.io/) — Um ADR regista uma decisão e o seu porquê; o conjunto é o registo
- [Diátaxis: Reference](https://diataxis.fr/reference/) — Gerar a referência a partir do código sempre que possível (ex.: API)

> **Nota (fonte oficial):** O artigo original usa o caminho doc/arch/adr-NNN.md (o PDF usa docs/adr/NNNN-titulo.md) e não diz «imutável» nem «antes do código»; diz que uma decisão revertida se mantém marcada como substituída.

Fonte: págs. 42, 59 (Dicionario-Boas-Praticas.pdf)

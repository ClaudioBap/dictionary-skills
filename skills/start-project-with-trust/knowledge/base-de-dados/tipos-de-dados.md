---
id: base-de-dados/tipos-de-dados
titulo: "Tipos de dados"
seccao: "Base de dados"
paginas: [28]
fonte: Dicionario-Boas-Praticas.pdf
verificado_em: 2026-11-03
fontes_oficiais_consultadas_em: 2026-11-04
---

# Tipos de dados

**Resumo:** Escolher o tipo certo: dinheiro em decimal, tempo em UTC, nada de números em texto.

## Conteúdo

- Escolher o tipo certo: `decimal` / `numeric` para dinheiro (nunca `float`), inteiro para contagens, `boolean` para sim/não.
- Datas e horas em UTC com tipo próprio; texto com o tipo e tamanho adequados; `enum`/tabela de referência para domínios fixos.

**Para uma skill:** dinheiro em decimal, tempo em UTC, nada de guardar números em texto.

## Fontes oficiais

*Ligações externas que apoiam esta entrada, consultadas a 2026-11-04. Não alteram o texto acima.*

- [Numeric Types (PostgreSQL)](https://www.postgresql.org/docs/current/datatype-numeric.html) — numeric recomendado para dinheiro; vírgula flutuante é inexata
- [Date/Time Types (PostgreSQL)](https://www.postgresql.org/docs/current/datatype-datetime.html) — Datas/horas com fuso guardadas internamente em UTC

Fonte: pág. 28 (Dicionario-Boas-Praticas.pdf)

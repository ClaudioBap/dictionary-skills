---
id: base-de-dados/indices
titulo: "Índices"
seccao: "Base de dados"
paginas: [28]
fonte: Dicionario-Boas-Praticas.pdf
verificado_em: 2026-11-03
fontes_oficiais_consultadas_em: 2026-11-04
---

# Índices

**Resumo:** Indexar o que se filtra, junta e ordena, sem sobre-indexar, medindo com o plano de execução.

## Conteúdo

- Indexar o que se filtra, junta e ordena; índices compostos pela ordem das colunas mais seletiva; índices de cobertura para queries quentes.
- Não sobre-indexar: cada índice custa nas escritas; medir com o plano de execução.

**Para uma skill:** uma query lenta justifica o índice com o plano, e não se cria índice sem uso.

## Fontes oficiais

*Ligações externas que apoiam esta entrada, consultadas a 2026-11-04. Não alteram o texto acima.*

- [Indexes (PostgreSQL)](https://www.postgresql.org/docs/current/indexes.html) — Índices acrescentam custo ao sistema; usar com critério
- [Multicolumn Indexes (PostgreSQL)](https://www.postgresql.org/docs/current/indexes-multicolumn.html) — Eficiência depende das colunas iniciais; índices compostos com parcimónia
- [Index-Only Scans and Covering Indexes (PostgreSQL)](https://www.postgresql.org/docs/current/indexes-index-only-scans.html) — Índices de cobertura com INCLUDE para queries frequentes

> **Nota (fonte oficial):** O PostgreSQL não orienta a ordem por «coluna mais seletiva»: o índice composto é mais eficiente com restrições (sobretudo igualdade) nas colunas iniciais, e índices compostos devem ser usados com parcimónia.

Fonte: pág. 28 (Dicionario-Boas-Praticas.pdf)

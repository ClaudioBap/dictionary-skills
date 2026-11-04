---
id: base-de-dados/constraints-e-integridade
titulo: "Constraints e integridade"
seccao: "Base de dados"
paginas: [27]
fonte: Dicionario-Boas-Praticas.pdf
verificado_em: 2026-11-03
fontes_oficiais_consultadas_em: 2026-11-04
---

# Constraints e integridade

**Resumo:** A base impõe as regras invariantes com `NOT NULL`, `UNIQUE`, `CHECK` e `DEFAULT`.

## Conteúdo

- Usar `NOT NULL`, `UNIQUE`, `CHECK` e `DEFAULT` para a base impor as regras, não só a aplicação.
- Uma regra garantida na base vale para todos os caminhos de escrita, não só pela app.

**Para uma skill:** regras invariantes (obrigatório, único, domínio) estão em constraints, não só no código.

## Fontes oficiais

*Ligações externas que apoiam esta entrada, consultadas a 2026-11-04. Não alteram o texto acima.*

- [Constraints (PostgreSQL)](https://www.postgresql.org/docs/current/ddl-constraints.html) — CHECK, NOT NULL, UNIQUE e PRIMARY KEY impostos pela base

Fonte: pág. 27 (Dicionario-Boas-Praticas.pdf)

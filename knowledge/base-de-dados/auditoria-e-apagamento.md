---
id: base-de-dados/auditoria-e-apagamento
titulo: "Auditoria e apagamento"
seccao: "Base de dados"
paginas: [29]
fonte: Dicionario-Boas-Praticas.pdf
verificado_em: 2026-11-03
fontes_oficiais_consultadas_em: 2026-11-04
---

# Auditoria e apagamento

**Resumo:** Colunas de auditoria, histórico append-only para o sensível e apagamento que preserva o rasto.

## Conteúdo

- Colunas de auditoria (`criado_em`, `criado_por`, `atualizado_em`); histórico append-only para o que é sensível.
- Soft delete (marcar) quando é preciso recuperar ou auditar; hard delete só com intenção e cuidado com referências.

**Para uma skill:** tabelas importantes têm colunas de auditoria; apagar preserva o rasto necessário.

## Ver também

- [Auditoria append-only e à prova de adulteração](../seguranca/auditoria-append-only.md) (Segurança)

## Fontes oficiais

*Ligações externas que apoiam esta entrada, consultadas a 2026-11-04. Não alteram o texto acima.*

- [Temporal Tables (SQL Server)](https://learn.microsoft.com/en-us/sql/relational-databases/tables/temporal-tables) — Histórico completo de alterações para auditoria e recuperação de erros

> **Nota (fonte oficial):** Colunas de auditoria e soft delete como prática genérica sem fonte oficial encontrada; a fonte cobre só o histórico.

Fonte: pág. 29 (Dicionario-Boas-Praticas.pdf)

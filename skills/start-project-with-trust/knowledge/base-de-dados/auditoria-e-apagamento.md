---
id: base-de-dados/auditoria-e-apagamento
titulo: "Auditoria e apagamento"
seccao: "Base de dados"
paginas: [29]
fonte: Dicionario-Boas-Praticas.pdf
verificado_em: 2026-11-03
---

# Auditoria e apagamento

**Resumo:** Colunas de auditoria, histórico append-only para o sensível e apagamento que preserva o rasto.

## Conteúdo

- Colunas de auditoria (`criado_em`, `criado_por`, `atualizado_em`); histórico append-only para o que é sensível.
- Soft delete (marcar) quando é preciso recuperar ou auditar; hard delete só com intenção e cuidado com referências.

**Para uma skill:** tabelas importantes têm colunas de auditoria; apagar preserva o rasto necessário.

## Ver também

- [Auditoria append-only e à prova de adulteração](../seguranca/auditoria-append-only.md) (Segurança)

Fonte: pág. 29 (Dicionario-Boas-Praticas.pdf)

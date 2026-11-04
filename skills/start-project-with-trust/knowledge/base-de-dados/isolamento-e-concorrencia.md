---
id: base-de-dados/isolamento-e-concorrencia
titulo: "Isolamento e concorrência"
seccao: "Base de dados"
paginas: [28, 29]
fonte: Dicionario-Boas-Praticas.pdf
verificado_em: 2026-11-03
fontes_oficiais_consultadas_em: 2026-11-04
---

# Isolamento e concorrência

**Resumo:** Conhecer os níveis de isolamento e escolher explicitamente controlo otimista ou pessimista.

## Conteúdo

- Conhecer os níveis de isolamento (read committed, repeatable read, serializable) e o seu custo.
- Controlo otimista (coluna de versão) para conflitos raros; pessimista (locks) para disputa alta; prevenir e tratar deadlocks.

**Para uma skill:** escolha de isolamento e de estratégia de concorrência explícita, não por omissão cega.

## Fontes oficiais

*Ligações externas que apoiam esta entrada, consultadas a 2026-11-04. Não alteram o texto acima.*

- [Transaction Isolation (PostgreSQL)](https://www.postgresql.org/docs/current/transaction-iso.html) — Read committed, repeatable read, serializable; repetir após falha de serialização
- [Explicit Locking (PostgreSQL)](https://www.postgresql.org/docs/current/explicit-locking.html) — SELECT FOR UPDATE e prevenir deadlocks com ordem de locks consistente

> **Nota (fonte oficial):** No PostgreSQL, read committed é o nível por omissão, read uncommitted comporta-se como read committed, e repeatable read/serializable exigem que a aplicação repita transações (SQLSTATE 40001).

Fonte: págs. 28, 29 (Dicionario-Boas-Praticas.pdf)

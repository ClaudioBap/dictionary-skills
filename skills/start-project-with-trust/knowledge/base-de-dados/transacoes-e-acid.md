---
id: base-de-dados/transacoes-e-acid
titulo: "Transações e ACID"
seccao: "Base de dados"
paginas: [28]
fonte: Dicionario-Boas-Praticas.pdf
verificado_em: 2026-11-03
fontes_oficiais_consultadas_em: 2026-11-04
---

# Transações e ACID

**Resumo:** Agrupar em transações curtas as escritas que têm de acontecer todas ou nenhuma.

## Conteúdo

- Agrupar numa transação as escritas que têm de acontecer todas ou nenhuma; manter as transações curtas.
- Não deixar transações abertas à espera de I/O ou de interação do utilizador; tratar falhas com rollback.

**Para uma skill:** operações multi-passo correm em transação; transações curtas, sem esperas lá dentro.

## Fontes oficiais

*Ligações externas que apoiam esta entrada, consultadas a 2026-11-04. Não alteram o texto acima.*

- [Transactions (PostgreSQL)](https://www.postgresql.org/docs/current/tutorial-transactions.html) — BEGIN/COMMIT/ROLLBACK: tudo ou nada
- [Explicit Locking (PostgreSQL)](https://www.postgresql.org/docs/current/explicit-locking.html) — Má ideia manter transações abertas muito tempo, p. ex. à espera do utilizador
- [Client Connection Defaults (PostgreSQL)](https://www.postgresql.org/docs/current/runtime-config-client.html) — idle_in_transaction_session_timeout: transações paradas prendem locks e causam bloat

Fonte: pág. 28 (Dicionario-Boas-Praticas.pdf)

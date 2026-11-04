---
id: base-de-dados/backups-e-recuperacao
titulo: "Backups e recuperação"
seccao: "Base de dados"
paginas: [29, 30]
fonte: Dicionario-Boas-Praticas.pdf
verificado_em: 2026-11-03
fontes_oficiais_consultadas_em: 2026-11-04
---

# Backups e recuperação

**Resumo:** Backups regulares, cifrados e fora do servidor, com restauro ensaiado.

## Conteúdo

- Backups regulares e cifrados, guardados fora do servidor; point-in-time recovery onde faz sentido.
- Ensaiar o restauro: um backup que nunca se restaurou não conta.

**Para uma skill:** existe backup cifrado e um restauro já testado e documentado.

## Ver também

- [Recuperação de desastre](../fiabilidade/recuperacao-de-desastre.md) (Fiabilidade e resiliência)

## Fontes oficiais

*Ligações externas que apoiam esta entrada, consultadas a 2026-11-04. Não alteram o texto acima.*

- [Back up and Restore (SQL Server)](https://learn.microsoft.com/en-us/sql/relational-databases/backup-restore/back-up-and-restore-of-sql-server-databases) — Sem restauro testado não há estratégia; cifrar e guardar separado
- [Backup and Restore (PostgreSQL)](https://www.postgresql.org/docs/current/backup.html) — Backups regulares: dump SQL, ficheiros e arquivo contínuo
- [Continuous Archiving and PITR (PostgreSQL)](https://www.postgresql.org/docs/current/continuous-archiving.html) — Point-in-time recovery com backup base e WAL arquivado

Fonte: págs. 29, 30 (Dicionario-Boas-Praticas.pdf)

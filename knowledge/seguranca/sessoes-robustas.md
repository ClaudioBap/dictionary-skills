---
id: seguranca/sessoes-robustas
titulo: "Sessões robustas"
seccao: "Segurança"
paginas: [5, 6]
fonte: Dicionario-Boas-Praticas.pdf
verificado_em: 2026-11-03
fontes_oficiais_consultadas_em: 2026-11-04
---

# Sessões robustas

**Resumo:** Identidade no servidor, cookie só com identificador assinado, sessões persistentes fora do processo, revogáveis e com timeout.

## Conteúdo

- Identidade no servidor; no cookie vai só um identificador assinado (`HttpOnly`, `Secure`, `SameSite`).
- Sessões fora da memória do processo (base de dados ou cache partilhada), para sobreviverem a reinícios e escalarem.
- Revogação imediata, `sid` rodado no login, timeout de inatividade além do absoluto.

**Para uma skill:** sessões persistentes, revogáveis e com timeout; cookie sem dados sensíveis.

## Ver também

- [Gestão de sessões e estado para escalar](../custo/gestao-de-sessoes-e-estado-para-escalar.md) (Sessões, orquestração e custo-eficiência)
- [Cache e sessões (Redis / Valkey)](../infraestrutura/cache-e-sessoes-redis-valkey.md) (Serviços de infraestrutura)

## Fontes oficiais

*Ligações externas que apoiam esta entrada, consultadas a 2026-11-04. Não alteram o texto acima.*

- [OWASP Session Management Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Session_Management_Cheat_Sheet.html) — HttpOnly/Secure/SameSite, renovar ID no login, timeouts, invalidação no servidor

Fonte: págs. 5, 6 (Dicionario-Boas-Praticas.pdf)

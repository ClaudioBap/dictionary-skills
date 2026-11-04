---
id: fiabilidade/degradacao-graciosa
titulo: "Degradação graciosa"
seccao: "Fiabilidade e resiliência"
paginas: [11]
fonte: Dicionario-Boas-Praticas.pdf
verificado_em: 2026-11-03
fontes_oficiais_consultadas_em: 2026-11-04
---

# Degradação graciosa

**Resumo:** Timeouts, retries com recuo, circuit breaker e fallback: melhor servir menos do que cair por inteiro.

## Conteúdo

- Timeouts em toda a chamada externa; retries com recuo exponencial e jitter, só no que é idempotente.
- Circuit breaker para parar de bater num serviço caído; bulkhead para isolar falhas; fallback com valor degradado.
- Melhor servir menos do que cair por inteiro.

**Para uma skill:** toda a chamada externa tem timeout e um plano para quando o outro lado falha.

## Fontes oficiais

*Ligações externas que apoiam esta entrada, consultadas a 2026-11-04. Não alteram o texto acima.*

- [SRE Book – Addressing Cascading Failures](https://sre.google/sre-book/addressing-cascading-failures/) — Prazos/timeouts, retries com recuo exponencial e jitter, degradação graciosa
- [Azure – Circuit Breaker pattern](https://learn.microsoft.com/en-us/azure/architecture/patterns/circuit-breaker) — Circuit breaker, timeouts e fallback com valor degradado

Fonte: pág. 11 (Dicionario-Boas-Praticas.pdf)

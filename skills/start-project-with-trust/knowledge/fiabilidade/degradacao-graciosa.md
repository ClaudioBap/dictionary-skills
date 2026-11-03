---
id: fiabilidade/degradacao-graciosa
titulo: "Degradação graciosa"
seccao: "Fiabilidade e resiliência"
paginas: [11]
fonte: Dicionario-Boas-Praticas.pdf
verificado_em: 2026-11-03
---

# Degradação graciosa

**Resumo:** Timeouts, retries com recuo, circuit breaker e fallback: melhor servir menos do que cair por inteiro.

## Conteúdo

- Timeouts em toda a chamada externa; retries com recuo exponencial e jitter, só no que é idempotente.
- Circuit breaker para parar de bater num serviço caído; bulkhead para isolar falhas; fallback com valor degradado.
- Melhor servir menos do que cair por inteiro.

**Para uma skill:** toda a chamada externa tem timeout e um plano para quando o outro lado falha.

Fonte: pág. 11 (Dicionario-Boas-Praticas.pdf)

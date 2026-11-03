---
id: infraestrutura/cache-e-sessoes-redis-valkey
titulo: "Cache e sessões (Redis / Valkey)"
seccao: "Serviços de infraestrutura"
paginas: [54, 55]
fonte: Dicionario-Boas-Praticas.pdf
verificado_em: 2026-11-03
---

# Cache e sessões (Redis / Valkey)

**Resumo:** Armazém chave-valor em memória para cache, sessões partilhadas, filas simples e locks.

## Conteúdo

- Armazém chave-valor em memória, muito rápido: cache, sessões partilhadas entre réplicas, filas simples, rate limiting, locks.
- Valkey é o sucessor aberto do Redis. Persistência opcional; cuidado com a memória e a expiração das chaves.

**Para uma skill:** sessões e cache partilhados vivem no Redis/Valkey, não na memória do processo.

## Ver também

- [Sessões robustas](../seguranca/sessoes-robustas.md) (Segurança)
- [Gestão de sessões e estado para escalar](../custo/gestao-de-sessoes-e-estado-para-escalar.md) (Sessões, orquestração e custo-eficiência)

Fonte: págs. 54, 55 (Dicionario-Boas-Praticas.pdf)

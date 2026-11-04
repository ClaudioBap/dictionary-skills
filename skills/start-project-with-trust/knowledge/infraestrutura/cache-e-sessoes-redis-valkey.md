---
id: infraestrutura/cache-e-sessoes-redis-valkey
titulo: "Cache e sessões (Redis / Valkey)"
seccao: "Serviços de infraestrutura"
paginas: [54, 55]
fonte: Dicionario-Boas-Praticas.pdf
verificado_em: 2026-11-03
fontes_oficiais_consultadas_em: 2026-11-04
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

## Fontes oficiais

*Ligações externas que apoiam esta entrada, consultadas a 2026-11-04. Não alteram o texto acima.*

- [Valkey](https://valkey.io/) — Armazém chave-valor BSD para cache, filas e base de dados
- [Valkey persistence](https://valkey.io/topics/persistence/) — Persistência RDB/AOF opcional, pode ser desligada para cache
- [Valkey as an LRU cache](https://valkey.io/topics/lru-cache/) — maxmemory e políticas de expulsão de chaves

> **Nota (fonte oficial):** A Redis mudou de novo de licença: Redis Open Source 8.0+ está sob RSALv2, SSPLv1 ou AGPLv3 à escolha (https://redis.io/legal/licenses/). A 7.4–7.8 só tinha RSALv2/SSPLv1. «Valkey é o sucessor aberto do Redis» merece matiz: o Redis 8 voltou a ter uma opção OSI (AGPLv3), e o Valkey (BSD) não se apresenta como «fork».

Fonte: págs. 54, 55 (Dicionario-Boas-Praticas.pdf)

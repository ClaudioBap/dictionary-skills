---
id: docker/escalonar-com-replicas
titulo: "Escalonar com réplicas"
seccao: "Docker e orquestração"
paginas: [52]
fonte: Dicionario-Boas-Praticas.pdf
verificado_em: 2026-11-03
---

# Escalonar com réplicas

**Resumo:** Várias réplicas atrás de um balanceador, com a aplicação sem estado.

## Conteúdo

- Para servir mais, correr várias cópias (réplicas) atrás de um balanceador; exige a aplicação sem estado (stateless).
- O estado (sessões, ficheiros) sai para um serviço partilhado (base de dados, Redis, armazenamento de objetos).

**Para uma skill:** a aplicação é stateless e pode correr em N réplicas sem partilhar memória.

## Ver também

- [Gestão de sessões e estado para escalar](../custo/gestao-de-sessoes-e-estado-para-escalar.md) (Sessões, orquestração e custo-eficiência)

Fonte: pág. 52 (Dicionario-Boas-Praticas.pdf)

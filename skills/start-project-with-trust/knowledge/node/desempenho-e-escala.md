---
id: node/desempenho-e-escala
titulo: "Desempenho e escala"
seccao: "Boas práticas de Node.js"
paginas: []
fonte: "Conhecimento do assistente (Claude), sem fonte verificada; escrito a 2026-11-03 a pedido do utilizador. Não vem do PDF."
verificado_em: 2026-11-03
---

# Desempenho e escala

**Resumo:** Processos sem estado e várias réplicas atrás de um proxy, ligações reutilizadas e otimização só depois de medir.

## Conteúdo

- Aplicação sem estado; escalar com várias réplicas (ou processos) atrás de um proxy, não com estado em memória.
- Reutilizar ligações (pool de base de dados, keep-alive nos clientes HTTP).
- Medir antes de otimizar (`--cpu-prof`, perfis de heap) e procurar fugas de memória (listeners e caches que só crescem).

**Para uma skill:** a aplicação corre em várias réplicas sem estado em memória; otimizações são justificadas por medição.

## Ver também

- [Gestão de sessões e estado para escalar](../custo/gestao-de-sessoes-e-estado-para-escalar.md) (Sessões, orquestração e custo-eficiência)

Fonte: Conhecimento do assistente (Claude), sem fonte verificada; escrito a 2026-11-03 a pedido do utilizador. Não vem do PDF.

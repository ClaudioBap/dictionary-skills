---
id: node/event-loop-e-trabalho-pesado
titulo: "Event loop e trabalho pesado"
seccao: "Boas práticas de Node.js"
paginas: []
fonte: "Conhecimento do assistente (Claude), sem fonte verificada; escrito a 2026-11-03 a pedido do utilizador. Não vem do PDF."
verificado_em: 2026-11-03
---

# Event loop e trabalho pesado

**Resumo:** Nunca bloquear o event loop: I/O assíncrono, streams para ficheiros grandes e `worker_threads` ou filas para CPU.

## Conteúdo

- Não usar APIs síncronas (`fs.readFileSync`, `crypto` síncrono, etc.) no caminho de um pedido.
- Ficheiros e respostas grandes com streams, em vez de carregar tudo em memória.
- Trabalho de CPU pesado vai para `worker_threads` ou para uma fila com workers; cuidado com expressões regulares que podem demorar muito (ReDoS).

**Para uma skill:** nenhum pedido executa trabalho síncrono pesado no event loop.

## Ver também

- [Orquestração de trabalho (filas, workers, agendadores)](../custo/orquestracao-de-trabalho.md) (Sessões, orquestração e custo-eficiência)

Fonte: Conhecimento do assistente (Claude), sem fonte verificada; escrito a 2026-11-03 a pedido do utilizador. Não vem do PDF.

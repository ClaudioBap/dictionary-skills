---
id: node/event-loop-e-trabalho-pesado
titulo: "Event loop e trabalho pesado"
seccao: "Boas práticas de Node.js"
paginas: []
fonte: "Fontes oficiais (documentação do Node.js, npm, OWASP, Docker e projetos citados), ligadas em cada ponto; consultadas a 2026-11-03. Pontos marcados «sem fonte oficial» são convenções escritas pelo assistente. Não vem do PDF."
verificado_em: 2026-11-03
---

# Event loop e trabalho pesado

**Resumo:** Nunca bloquear o event loop: sem APIs síncronas no servidor, streams para o que é grande e `worker_threads` para CPU.

## Conteúdo

- As APIs síncronas (fs, `crypto.pbkdf2Sync`, `zlib.*Sync`, `child_process.*Sync`) não são para usar num servidor. — [nodejs.org: Don't block the event loop](https://nodejs.org/en/learn/asynchronous-work/dont-block-the-event-loop)
- Ficheiros e respostas grandes com streams; ligá-los com `pipeline` de `node:stream/promises`, cancelável com `AbortSignal`. — [nodejs.org/api/stream.html](https://nodejs.org/api/stream.html)
- Trabalho de CPU pesado em `worker_threads`, de preferência com um pool de workers (não ajudam em I/O). — [nodejs.org/api/worker_threads.html](https://nodejs.org/api/worker_threads.html)
- Cuidado com expressões regulares complexas sobre dados do utilizador (ReDoS) e com o tamanho do JSON tratado no event loop. — [nodejs.org: Don't block the event loop](https://nodejs.org/en/learn/asynchronous-work/dont-block-the-event-loop)

**Para uma skill:** nenhum pedido executa trabalho síncrono pesado no event loop.

## Ver também

- [Orquestração de trabalho (filas, workers, agendadores)](../custo/orquestracao-de-trabalho.md) (Sessões, orquestração e custo-eficiência)

Fonte: Fontes oficiais (documentação do Node.js, npm, OWASP, Docker e projetos citados), ligadas em cada ponto; consultadas a 2026-11-03. Pontos marcados «sem fonte oficial» são convenções escritas pelo assistente. Não vem do PDF.

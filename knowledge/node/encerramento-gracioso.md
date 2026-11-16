---
id: node/encerramento-gracioso
titulo: "Encerramento gracioso"
seccao: "Boas práticas de Node.js"
paginas: []
fonte: "Fontes oficiais (documentação do Node.js, npm, OWASP, Docker e projetos citados), ligadas em cada ponto; consultadas a 2026-11-03. Pontos marcados «sem fonte oficial» são convenções escritas pelo assistente. Não vem do PDF."
verificado_em: 2026-11-03
---

# Encerramento gracioso

**Resumo:** Ao receber `SIGTERM`, deixar de aceitar ligações, fechar as inativas e só forçar o fecho no fim do prazo.

## Conteúdo

- Instalar handlers de `SIGTERM` e `SIGINT` (isso remove o comportamento por omissão). — [nodejs.org/api/process.html](https://nodejs.org/api/process.html)
- Sequência: `server.close()` (deixa de aceitar ligações), `server.closeIdleConnections()` e só no fim do prazo `server.closeAllConnections()`. — [nodejs.org/api/http.html](https://nodejs.org/api/http.html)
- Contar com o prazo do orquestrador: o Docker envia `SIGTERM` e, depois do prazo (10 s por omissão em Linux), `SIGKILL`. — [docs.docker.com: docker container stop](https://docs.docker.com/reference/cli/docker/container/stop/)
- **Utilidade:** prazos em chamadas de saída com `AbortSignal.timeout(ms)` (por exemplo em `fetch`). — [nodejs.org/api/globals.html](https://nodejs.org/api/globals.html)
- Durante o encerramento, o health check deixa de reportar «pronto». *(sem fonte oficial)*

**Para uma skill:** um deploy ou reinício não corta pedidos a meio.

## Ver também

- [Kubernetes: saúde e armazenamento](../docker/kubernetes-saude-e-armazenamento.md) (Docker e orquestração)

Fonte: Fontes oficiais (documentação do Node.js, npm, OWASP, Docker e projetos citados), ligadas em cada ponto; consultadas a 2026-11-03. Pontos marcados «sem fonte oficial» são convenções escritas pelo assistente. Não vem do PDF.

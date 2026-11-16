---
id: node/desempenho-e-escala
titulo: "Desempenho e escala"
seccao: "Boas práticas de Node.js"
paginas: []
fonte: "Fontes oficiais (documentação do Node.js, npm, OWASP, Docker e projetos citados), ligadas em cada ponto; consultadas a 2026-11-03. Pontos marcados «sem fonte oficial» são convenções escritas pelo assistente. Não vem do PDF."
verificado_em: 2026-11-03
---

# Desempenho e escala

**Resumo:** Aplicação sem estado em memória, ligações reutilizadas e otimização só depois de medir com os perfis nativos.

## Conteúdo

- Não depender de dados em memória para sessões e login, para correr em várias instâncias; `cluster` só quando é preciso isolar processos, senão `worker_threads`. — [nodejs.org/api/cluster.html](https://nodejs.org/api/cluster.html)
- O agente HTTP global já usa keep-alive desde v19; usar o pool de ligações do driver da base de dados. — [nodejs.org/api/http.html](https://nodejs.org/api/http.html)
- **Utilidade:** medir antes de otimizar com `--cpu-prof` e `--heap-prof` (Stable), e tirar snapshots de heap a pedido com `--heapsnapshot-signal`. — [nodejs.org/api/cli.html](https://nodejs.org/api/cli.html), [nodejs.org: Memory](https://nodejs.org/en/learn/diagnostics/memory)

**Para uma skill:** a aplicação corre em várias instâncias sem estado em memória.

## Ver também

- [Gestão de sessões e estado para escalar](../custo/gestao-de-sessoes-e-estado-para-escalar.md) (Sessões, orquestração e custo-eficiência)

Fonte: Fontes oficiais (documentação do Node.js, npm, OWASP, Docker e projetos citados), ligadas em cada ponto; consultadas a 2026-11-03. Pontos marcados «sem fonte oficial» são convenções escritas pelo assistente. Não vem do PDF.

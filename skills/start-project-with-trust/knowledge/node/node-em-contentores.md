---
id: node/node-em-contentores
titulo: "Node.js em contentores"
seccao: "Boas práticas de Node.js"
paginas: []
fonte: "Fontes oficiais (documentação do Node.js, npm, OWASP, Docker e projetos citados), ligadas em cada ponto; consultadas a 2026-11-03. Pontos marcados «sem fonte oficial» são convenções escritas pelo assistente. Não vem do PDF."
verificado_em: 2026-11-03
---

# Node.js em contentores

**Resumo:** Imagem fixada por digest, multi-stage, sem dependências de dev, utilizador `node`, `--init` e limites de memória.

## Conteúdo

- Fixar a imagem por digest; multi-stage para a imagem final não levar npm nem Yarn. — [docs.docker.com: best practices](https://docs.docker.com/build/building/best-practices/), [docker-node: BestPractices](https://github.com/nodejs/docker-node/blob/main/docs/BestPractices.md)
- A imagem por omissão é a recomendada; slim ou alpine só por restrições de espaço (alpine usa musl: validar a compatibilidade). — [hub.docker.com/_/node](https://hub.docker.com/_/node)
- `npm ci --omit=dev` e `NODE_ENV=production`. — [docker-node: BestPractices](https://github.com/nodejs/docker-node/blob/main/docs/BestPractices.md), [docs.npmjs.com: npm ci](https://docs.npmjs.com/cli/v11/commands/npm-ci)
- Correr com o utilizador `node` (uid 1000). O Node não foi feito para correr como PID 1: `CMD ["node", "server.js"]` com `docker run --init` (ou tini). — [docker-node: BestPractices](https://github.com/nodejs/docker-node/blob/main/docs/BestPractices.md)
- Definir limites de memória do contentor e ajustar o heap com `--max-old-space-size`. — [docker-node: BestPractices](https://github.com/nodejs/docker-node/blob/main/docs/BestPractices.md), [nodejs.org/api/cli.html](https://nodejs.org/api/cli.html)

**Para uma skill:** a imagem Node não corre como root, não tem dependências de dev, corre com `--init` e tem limite de memória.

## Ver também

- [Imagem endurecida](../docker/imagem-endurecida.md) (Docker e orquestração)
- [Contentores endurecidos](../seguranca/contentores-endurecidos.md) (Segurança)

Fonte: Fontes oficiais (documentação do Node.js, npm, OWASP, Docker e projetos citados), ligadas em cada ponto; consultadas a 2026-11-03. Pontos marcados «sem fonte oficial» são convenções escritas pelo assistente. Não vem do PDF.

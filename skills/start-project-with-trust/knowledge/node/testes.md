---
id: node/testes
titulo: "Testes"
seccao: "Boas práticas de Node.js"
paginas: []
fonte: "Conhecimento do assistente (Claude), sem fonte verificada; escrito a 2026-11-03 a pedido do utilizador. Não vem do PDF."
verificado_em: 2026-11-03
---

# Testes

**Resumo:** Testes rápidos com `node:test` ou Vitest/Jest, testes HTTP sem rede real e base de dados descartável.

## Conteúdo

- Unitários com o executor nativo (`node:test`) ou com Vitest/Jest.
- Testes HTTP contra a aplicação em memória (ex.: supertest), sem depender de rede externa.
- Testes de integração contra uma base de dados descartável criada no job.

**Para uma skill:** código novo vem com testes do caminho feliz e dos erros, a correr no CI.

## Ver também

- [Testes no pipeline](../cicd/testes-no-pipeline.md) (CI/CD e ferramentas)

Fonte: Conhecimento do assistente (Claude), sem fonte verificada; escrito a 2026-11-03 a pedido do utilizador. Não vem do PDF.

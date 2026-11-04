---
id: node/testes
titulo: "Testes"
seccao: "Boas práticas de Node.js"
paginas: []
fonte: "Fontes oficiais (documentação do Node.js, npm, OWASP, Docker e projetos citados), ligadas em cada ponto; consultadas a 2026-11-03. Pontos marcados «sem fonte oficial» são convenções escritas pelo assistente. Não vem do PDF."
verificado_em: 2026-11-03
---

# Testes

**Resumo:** Test runner nativo (`node:test`, Stable) ou Vitest/Jest, com mocks e snapshots nativos.

## Conteúdo

- **Utilidade:** `node --test` com o módulo `node:test` (Stable desde v20), incluindo `mock` e snapshots com `t.assert.snapshot`. A cobertura (`--experimental-test-coverage`) e o modo `--test --watch` ainda são Experimental. — [nodejs.org/api/test.html](https://nodejs.org/api/test.html)
- Alternativas: Vitest (exige Node ≥ 22.12) ou Jest. — [vitest.dev](https://vitest.dev/guide/), [jestjs.io](https://jestjs.io/docs/getting-started)
- Testar a aplicação HTTP sem rede externa e as integrações contra uma base de dados descartável criada no job. *(sem fonte oficial)*

**Para uma skill:** código novo vem com testes do caminho feliz e dos erros, a correr no CI.

## Ver também

- [Testes no pipeline](../cicd/testes-no-pipeline.md) (CI/CD e ferramentas)

Fonte: Fontes oficiais (documentação do Node.js, npm, OWASP, Docker e projetos citados), ligadas em cada ponto; consultadas a 2026-11-03. Pontos marcados «sem fonte oficial» são convenções escritas pelo assistente. Não vem do PDF.

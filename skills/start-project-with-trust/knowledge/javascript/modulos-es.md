---
id: javascript/modulos-es
titulo: "Módulos ES"
seccao: "Boas práticas de JavaScript"
paginas: []
fonte: "Conhecimento do assistente (Claude), sem fonte verificada; escrito a 2026-11-03 a pedido do utilizador. Não vem do PDF."
verificado_em: 2026-11-03
---

# Módulos ES

**Resumo:** Usar `import`/`export` (ESM), sem variáveis globais nem dependências circulares.

## Conteúdo

- Módulos ES (`import` / `export`) em vez de scripts globais ou CommonJS em código novo.
- Um módulo por responsabilidade; sem variáveis globais; evitar dependências circulares.
- Exportações com nome facilitam pesquisa, refactoring e remoção de código não usado (tree-shaking).

**Para uma skill:** nenhum código novo cria variáveis globais; os módulos não têm ciclos.

Fonte: Conhecimento do assistente (Claude), sem fonte verificada; escrito a 2026-11-03 a pedido do utilizador. Não vem do PDF.

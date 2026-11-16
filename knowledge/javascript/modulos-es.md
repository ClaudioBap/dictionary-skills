---
id: javascript/modulos-es
titulo: "Módulos ES"
seccao: "Boas práticas de JavaScript"
paginas: []
fonte: "Fontes oficiais (MDN, TypeScript, ESLint, Prettier, web.dev, OWASP, W3C e documentação das ferramentas citadas), ligadas em cada ponto; consultadas a 2026-11-03. Pontos marcados «sem fonte oficial» são convenções escritas pelo assistente. Não vem do PDF."
verificado_em: 2026-11-03
---

# Módulos ES

**Resumo:** `import`/`export` estáticos, sem globais nem ciclos; `import()` dinâmico só quando é preciso.

## Conteúdo

- Usar módulos ES, suportados nativamente por todos os browsers modernos (Baseline Widely available). As variáveis ficam no âmbito do módulo, sem globais. — [MDN: módulos](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules)
- Evitar imports cíclicos, que tornam o código mais propenso a erros. — [MDN: módulos](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules)
- Preferir `import`/`export` estáticos: facilitam a análise estática e o tree-shaking. As exportações com nome usam o mesmo nome em todo o lado. — [MDN: import](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/import), [MDN: export](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/export)
- **Utilidade:** `import()` dinâmico só para código condicional ou carregado a pedido. — [MDN: import()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/import)

**Para uma skill:** nenhum código novo cria variáveis globais; os módulos não têm ciclos.

Fonte: Fontes oficiais (MDN, TypeScript, ESLint, Prettier, web.dev, OWASP, W3C e documentação das ferramentas citadas), ligadas em cada ponto; consultadas a 2026-11-03. Pontos marcados «sem fonte oficial» são convenções escritas pelo assistente. Não vem do PDF.

---
id: javascript/dom-e-desempenho
titulo: "DOM e desempenho"
seccao: "Boas práticas de JavaScript"
paginas: []
fonte: "Fontes oficiais (MDN, TypeScript, ESLint, Prettier, web.dev, OWASP, W3C e documentação das ferramentas citadas), ligadas em cada ponto; consultadas a 2026-11-03. Pontos marcados «sem fonte oficial» são convenções escritas pelo assistente. Não vem do PDF."
verificado_em: 2026-11-03
---

# DOM e desempenho

**Resumo:** Scripts que não bloqueiam, código dividido por rota, delegação de eventos e leituras/escritas ao DOM agrupadas.

## Conteúdo

- Scripts com `type="module"` ou `defer`, para não bloquear o parsing. — [MDN: script](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/script)
- Dividir o bundle e enviar só o código da rota inicial. — [web.dev: code splitting](https://web.dev/articles/reduce-javascript-payloads-with-code-splitting)
- Delegação de eventos no elemento pai em vez de um listener por filho. — [MDN: event bubbling](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Scripting/Event_bubbling)
- Handlers de input curtos, com debounce e alterações visuais em `requestAnimationFrame`; ler estilos antes de os alterar (evitar layout thrashing). — [web.dev: debounce](https://web.dev/articles/debounce-your-input-handlers), [web.dev: layout thrashing](https://web.dev/articles/avoid-large-complex-layouts-and-layout-thrashing)
- **Utilidade:** `addEventListener(..., { passive: true })` em scroll e wheel, e `{ signal }` para remover listeners com `AbortController`. — [MDN: addEventListener](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener)

**Para uma skill:** nenhum script bloqueia o carregamento da página; o código pesado carrega por rota.

## Ver também

- [Desempenho web (Core Web Vitals)](../design/desempenho-web-core-web-vitals.md) (Design e experiência de utilizador)

Fonte: Fontes oficiais (MDN, TypeScript, ESLint, Prettier, web.dev, OWASP, W3C e documentação das ferramentas citadas), ligadas em cada ponto; consultadas a 2026-11-03. Pontos marcados «sem fonte oficial» são convenções escritas pelo assistente. Não vem do PDF.

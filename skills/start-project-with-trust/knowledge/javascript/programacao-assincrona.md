---
id: javascript/programacao-assincrona
titulo: "Programação assíncrona"
seccao: "Boas práticas de JavaScript"
paginas: []
fonte: "Fontes oficiais (MDN, TypeScript, ESLint, Prettier, web.dev, OWASP, W3C e documentação das ferramentas citadas), ligadas em cada ponto; consultadas a 2026-11-03. Pontos marcados «sem fonte oficial» são convenções escritas pelo assistente. Não vem do PDF."
verificado_em: 2026-11-03
---

# Programação assíncrona

**Resumo:** `async`/`await`, nenhuma promessa sem tratamento, paralelismo com `Promise.all`/`allSettled` e timeouts com `AbortSignal`.

## Conteúdo

- Preferir `async`/`await`; não misturar callbacks e promessas (envolver as APIs de callback ao nível mais baixo). — [MDN: Using promises](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises), [MDN: guia de estilo](https://developer.mozilla.org/en-US/docs/MDN/Writing_guidelines/Code_style_guide/JavaScript)
- Nenhuma promessa «flutuante»: toda a rejeição é tratada. — [MDN: Using promises](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises)
- Correr em paralelo o que é independente: `Promise.all`, ou `Promise.allSettled` quando falhas parciais são aceitáveis. — [MDN: Using promises](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises), [MDN: allSettled](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/allSettled)
- **Utilidade:** timeouts com `fetch(url, { signal: AbortSignal.timeout(5000) })`, distinguindo `TimeoutError` de `AbortError`; juntar cancelamento e timeout com `AbortSignal.any([...])` (ambos Baseline Widely available). — [MDN: AbortSignal.timeout](https://developer.mozilla.org/en-US/docs/Web/API/AbortSignal/timeout_static), [MDN: AbortSignal.any](https://developer.mozilla.org/en-US/docs/Web/API/AbortSignal/any_static), [MDN: AbortController](https://developer.mozilla.org/en-US/docs/Web/API/AbortController)

**Para uma skill:** nenhuma promessa fica sem tratamento de erro; chamadas de rede têm timeout.

## Ver também

- [Degradação graciosa](../fiabilidade/degradacao-graciosa.md) (Fiabilidade e resiliência)
- [Fetch e respostas HTTP](../javascript/fetch-e-respostas-http.md) (Boas práticas de JavaScript)

Fonte: Fontes oficiais (MDN, TypeScript, ESLint, Prettier, web.dev, OWASP, W3C e documentação das ferramentas citadas), ligadas em cada ponto; consultadas a 2026-11-03. Pontos marcados «sem fonte oficial» são convenções escritas pelo assistente. Não vem do PDF.

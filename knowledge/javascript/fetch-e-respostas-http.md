---
id: javascript/fetch-e-respostas-http
titulo: "Fetch e respostas HTTP"
seccao: "Boas práticas de JavaScript"
paginas: []
fonte: "Fontes oficiais (MDN, TypeScript, ESLint, Prettier, web.dev, OWASP, W3C e documentação das ferramentas citadas), ligadas em cada ponto; consultadas a 2026-11-03. Pontos marcados «sem fonte oficial» são convenções escritas pelo assistente. Não vem do PDF."
verificado_em: 2026-11-03
---

# Fetch e respostas HTTP

**Resumo:** `fetch` não rejeita em 4xx/5xx: verificar `response.ok`, definir timeout e permitir cancelar.

## Conteúdo

- Um erro HTTP como 404 não rejeita a promessa: verificar `response.ok` e lançar erro quando é falso. — [MDN: Using Fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch)
- Cancelar com `AbortController` (rejeita com `AbortError`) e definir timeouts com `AbortSignal.timeout`. — [MDN: Using Fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch), [MDN: AbortSignal.timeout](https://developer.mozilla.org/en-US/docs/Web/API/AbortSignal/timeout_static)

**Para uma skill:** todos os `fetch` verificam `response.ok` e têm `signal` com timeout.

## Ver também

- [Programação assíncrona](../javascript/programacao-assincrona.md) (Boas práticas de JavaScript)

Fonte: Fontes oficiais (MDN, TypeScript, ESLint, Prettier, web.dev, OWASP, W3C e documentação das ferramentas citadas), ligadas em cada ponto; consultadas a 2026-11-03. Pontos marcados «sem fonte oficial» são convenções escritas pelo assistente. Não vem do PDF.

---
id: javascript/dom-e-desempenho
titulo: "DOM e desempenho"
seccao: "Boas práticas de JavaScript"
paginas: []
fonte: "Conhecimento do assistente (Claude), sem fonte verificada; escrito a 2026-11-03 a pedido do utilizador. Não vem do PDF."
verificado_em: 2026-11-03
---

# DOM e desempenho

**Resumo:** Carregar scripts sem bloquear, dividir o código por rota e evitar trabalho desnecessário no DOM.

## Conteúdo

- Scripts com `type="module"` ou `defer`; dividir o código por rota (import dinâmico) e carregar o pesado só quando é preciso.
- Delegação de eventos em listas grandes; `debounce`/`throttle` em eventos frequentes (scroll, resize, input).
- Agrupar leituras e escritas ao DOM para não forçar relayouts sucessivos.

**Para uma skill:** nenhum script bloqueia o carregamento da página; o código pesado carrega por rota.

## Ver também

- [Desempenho web (Core Web Vitals)](../design/desempenho-web-core-web-vitals.md) (Design e experiência de utilizador)

Fonte: Conhecimento do assistente (Claude), sem fonte verificada; escrito a 2026-11-03 a pedido do utilizador. Não vem do PDF.

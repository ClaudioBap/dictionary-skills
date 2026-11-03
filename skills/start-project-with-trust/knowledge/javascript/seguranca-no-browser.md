---
id: javascript/seguranca-no-browser
titulo: "Segurança no browser"
seccao: "Boas práticas de JavaScript"
paginas: []
fonte: "Conhecimento do assistente (Claude), sem fonte verificada; escrito a 2026-11-03 a pedido do utilizador. Não vem do PDF."
verificado_em: 2026-11-03
---

# Segurança no browser

**Resumo:** Inserir texto com `textContent`, sem `eval`, sem handlers inline e sem tokens em `localStorage`.

## Conteúdo

- Inserir texto do utilizador com `textContent` ou com a renderização da framework, nunca com `innerHTML`; se for mesmo preciso HTML, sanear com uma biblioteca (ex.: DOMPurify).
- Nunca `eval`, `new Function` nem `setTimeout` com strings; sem handlers inline (`onclick="..."`), para a CSP funcionar sem `unsafe-inline`.
- Não guardar tokens de sessão em `localStorage`; preferir cookies `HttpOnly`, `Secure`, `SameSite`.

**Para uma skill:** nenhum `innerHTML` com dados do utilizador, nenhum `eval`, nenhum token em `localStorage`.

## Ver também

- [Defesa contra XSS: escapar e CSP](../seguranca/defesa-contra-xss.md) (Segurança)
- [Sessões robustas](../seguranca/sessoes-robustas.md) (Segurança)

Fonte: Conhecimento do assistente (Claude), sem fonte verificada; escrito a 2026-11-03 a pedido do utilizador. Não vem do PDF.

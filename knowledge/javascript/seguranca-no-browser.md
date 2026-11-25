---
id: javascript/seguranca-no-browser
titulo: "Segurança no browser"
seccao: "Boas práticas de JavaScript"
paginas: []
fonte: "Fontes oficiais (MDN, TypeScript, ESLint, Prettier, web.dev, OWASP, W3C e documentação das ferramentas citadas), ligadas em cada ponto; consultadas a 2026-11-03. Pontos marcados «sem fonte oficial» são convenções escritas pelo assistente. Não vem do PDF."
verificado_em: 2026-11-03
---

# Segurança no browser

**Resumo:** `textContent` em vez de `innerHTML`, DOMPurify quando é preciso HTML, sem `eval` nem handlers inline e sem identificadores de sessão em `localStorage`.

## Conteúdo

- Texto do utilizador com `textContent`; se for mesmo preciso HTML, sanear com DOMPurify. Cuidado com as escapatórias das frameworks (ex.: `dangerouslySetInnerHTML`). — [MDN: innerHTML](https://developer.mozilla.org/en-US/docs/Web/API/Element/innerHTML), [OWASP XSS Prevention](https://cheatsheetseries.owasp.org/cheatsheets/Cross_Site_Scripting_Prevention_Cheat_Sheet.html)
- Nunca `eval`, `new Function` nem strings em `setTimeout`/`setInterval`; sem handlers inline. Assim a CSP funciona sem `unsafe-eval` nem `unsafe-inline`. — [MDN: eval](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/eval), [MDN: CSP](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CSP)
- Não guardar identificadores de sessão em `localStorage`; cookies de sessão com `HttpOnly`. — [OWASP HTML5 Security](https://cheatsheetseries.owasp.org/cheatsheets/HTML5_Security_Cheat_Sheet.html), [MDN: cookies](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/Cookies)
- **Utilidade:** Trusted Types com a CSP `require-trusted-types-for 'script'` obriga a sanear antes de `innerHTML` (Baseline 2026, Newly available). O `setHTML()` (Sanitizer API) ainda tem disponibilidade limitada: por agora, DOMPurify. — [MDN: Trusted Types](https://developer.mozilla.org/en-US/docs/Web/API/Trusted_Types_API), [MDN: setHTML](https://developer.mozilla.org/en-US/docs/Web/API/Element/setHTML)
- **Utilidade:** a verificação corre no linter: as regras `no-eval`, `no-implied-eval` e `no-new-func` ligadas como erro, e a saída de `eslint --max-warnings 0` nos ficheiros tocados é a prova. — [eslint.org: no-eval](https://eslint.org/docs/latest/rules/no-eval), [eslint.org: no-implied-eval](https://eslint.org/docs/latest/rules/no-implied-eval), [eslint.org: no-new-func](https://eslint.org/docs/latest/rules/no-new-func)

**Para uma skill:** nenhum `innerHTML` com dados do utilizador, nenhum `eval`, nenhum identificador de sessão em `localStorage`.

## Ver também

- [Defesa contra XSS: escapar e CSP](../seguranca/defesa-contra-xss.md) (Segurança)
- [Sessões robustas](../seguranca/sessoes-robustas.md) (Segurança)

Fonte: Fontes oficiais (MDN, TypeScript, ESLint, Prettier, web.dev, OWASP, W3C e documentação das ferramentas citadas), ligadas em cada ponto; consultadas a 2026-11-03. Pontos marcados «sem fonte oficial» são convenções escritas pelo assistente. Não vem do PDF.

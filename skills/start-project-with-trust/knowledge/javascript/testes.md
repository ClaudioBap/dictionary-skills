---
id: javascript/testes
titulo: "Testes"
seccao: "Boas práticas de JavaScript"
paginas: []
fonte: "Fontes oficiais (MDN, TypeScript, ESLint, Prettier, web.dev, OWASP, W3C e documentação das ferramentas citadas), ligadas em cada ponto; consultadas a 2026-11-03. Pontos marcados «sem fonte oficial» são convenções escritas pelo assistente. Não vem do PDF."
verificado_em: 2026-11-03
---

# Testes

**Resumo:** Testes que se parecem com o uso real, consultas por papel, mocks só no que não se controla e poucos ponta-a-ponta nos fluxos críticos.

## Conteúdo

- Quanto mais os testes se parecem com o uso real, mais confiança dão; nas consultas, preferir `getByRole` e deixar `getByTestId` para último recurso. — [Testing Library: princípios](https://testing-library.com/docs/guiding-principles), [Testing Library: consultas](https://testing-library.com/docs/queries/about)
- Testar só o que se controla, com testes isolados; mockar o tempo (`vi.setSystemTime`) e a rede (Mock Service Worker) e limpar os mocks. — [playwright.dev: best practices](https://playwright.dev/docs/best-practices), [vitest.dev: mocking](https://vitest.dev/guide/mocking), [vitest.dev: pedidos](https://vitest.dev/guide/mocking/requests)
- Testes ponta-a-ponta só para os casos mais críticos. — [web.dev: estratégias de teste](https://web.dev/articles/ta-strategies)
- Código novo com testes do caminho feliz e dos erros. *(sem fonte oficial)*

**Para uma skill:** os testes correm no CI e os fluxos críticos têm teste ponta-a-ponta.

## Ver também

- [Ferramentas: frameworks de teste](../cicd/ferramentas-frameworks-de-teste.md) (CI/CD e ferramentas)

Fonte: Fontes oficiais (MDN, TypeScript, ESLint, Prettier, web.dev, OWASP, W3C e documentação das ferramentas citadas), ligadas em cada ponto; consultadas a 2026-11-03. Pontos marcados «sem fonte oficial» são convenções escritas pelo assistente. Não vem do PDF.

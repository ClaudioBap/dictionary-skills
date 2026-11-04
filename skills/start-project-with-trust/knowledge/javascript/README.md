# Boas práticas de JavaScript

⚠️ Esta secção não vem do PDF. Cada ponto liga à fonte oficial que o apoia (consulta a 2026-11-03). O estado «Baseline» é o que a MDN mostrava nessa data. Os pontos marcados *(sem fonte oficial)* são convenções escritas pelo assistente a pedido do utilizador.

Fonte: Fontes oficiais (MDN, TypeScript, ESLint, Prettier, web.dev, OWASP, W3C e documentação das ferramentas citadas), ligadas em cada ponto; consultadas a 2026-11-03. Pontos marcados «sem fonte oficial» são convenções escritas pelo assistente. Não vem do PDF.

## Entradas

- [Estilo e formatação](estilo-e-formatacao.md) — Prettier para a formatação e ESLint para a qualidade, ambos a falhar o CI; `const`/`let` e comparação estrita. *(fora do PDF)*
- [TypeScript e tipagem](typescript-e-tipagem.md) — TypeScript com `strict`, sem `any` (usar `unknown` nas fronteiras), `satisfies` e `tsc --noEmit` no CI. *(fora do PDF)*
- [Módulos ES](modulos-es.md) — `import`/`export` estáticos, sem globais nem ciclos; `import()` dinâmico só quando é preciso. *(fora do PDF)*
- [Tipos, números e coerção](tipos-numeros-e-coercao.md) — Evitar a coerção implícita; os números são vírgula flutuante, por isso dinheiro em cêntimos ou com biblioteca, e inteiros grandes em `BigInt` ou string. *(fora do PDF)*
- [Programação assíncrona](programacao-assincrona.md) — `async`/`await`, nenhuma promessa sem tratamento, paralelismo com `Promise.all`/`allSettled` e timeouts com `AbortSignal`. *(fora do PDF)*
- [Erros e exceções](erros-e-excecoes.md) — Lançar sempre `Error` com `cause`, só apanhar o recuperável, nunca `catch` vazio, e mostrar ao utilizador uma resposta genérica com o detalhe no log. *(fora do PDF)*
- [Imutabilidade e estado](imutabilidade-e-estado.md) — Não mutar argumentos; preferir os métodos de cópia (`toSorted`, `with`) e `structuredClone` para cópias profundas. *(fora do PDF)*
- [Segurança no browser](seguranca-no-browser.md) — `textContent` em vez de `innerHTML`, DOMPurify quando é preciso HTML, sem `eval` nem handlers inline e sem identificadores de sessão em `localStorage`. *(fora do PDF)*
- [DOM e desempenho](dom-e-desempenho.md) — Scripts que não bloqueiam, código dividido por rota, delegação de eventos e leituras/escritas ao DOM agrupadas. *(fora do PDF)*
- [Testes](testes.md) — Testes que se parecem com o uso real, consultas por papel, mocks só no que não se controla e poucos ponta-a-ponta nos fluxos críticos. *(fora do PDF)*
- [Dependências do frontend](dependencias-frontend.md) — Lockfile versionado, `npm ci`, auditoria com limiar no CI, assinaturas verificadas e bibliotecas não usadas removidas. *(fora do PDF)*
- [Datas, números e localidade](datas-numeros-e-localidade.md) — Formatar com `Intl`, transmitir datas com `toISOString()` (UTC) e não concatenar frases traduzidas. *(fora do PDF)*
- [Fetch e respostas HTTP](fetch-e-respostas-http.md) — `fetch` não rejeita em 4xx/5xx: verificar `response.ok`, definir timeout e permitir cancelar. *(fora do PDF)*
- [Coleções: Map, Set e agrupamento](colecoes-map-set-e-agrupamento.md) — `Map` para dicionários dinâmicos ou com chaves de fora; `Object.groupBy` para agrupar. *(fora do PDF)*

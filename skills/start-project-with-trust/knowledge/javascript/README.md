# Boas práticas de JavaScript

⚠️ Esta secção não vem do PDF. Foi escrita pelo assistente a pedido do utilizador e deve ser confirmada contra fontes oficiais (por exemplo MDN e documentação do TypeScript).

Fonte: Conhecimento do assistente (Claude), sem fonte verificada; escrito a 2026-11-03 a pedido do utilizador. Não vem do PDF.

## Entradas

- [Estilo e formatação](estilo-e-formatacao.md) — ESLint e Prettier no CI, `const`/`let` em vez de `var` e comparação estrita. *(fora do PDF)*
- [TypeScript e tipagem](typescript-e-tipagem.md) — Preferir TypeScript em modo `strict`, evitar `any` e verificar os tipos no CI. *(fora do PDF)*
- [Módulos ES](modulos-es.md) — Usar `import`/`export` (ESM), sem variáveis globais nem dependências circulares. *(fora do PDF)*
- [Tipos, números e coerção](tipos-numeros-e-coercao.md) — Conhecer as armadilhas da coerção e dos números de vírgula flutuante; dinheiro nunca em `float`. *(fora do PDF)*
- [Programação assíncrona](programacao-assincrona.md) — `async`/`await` com todas as rejeições tratadas, paralelismo explícito e cancelamento com `AbortController`. *(fora do PDF)*
- [Erros e exceções](erros-e-excecoes.md) — Lançar objetos `Error` com contexto, nunca engolir erros e mostrar ao utilizador uma mensagem útil. *(fora do PDF)*
- [Imutabilidade e estado](imutabilidade-e-estado.md) — Não mutar argumentos nem estado partilhado; criar cópias em vez de alterar. *(fora do PDF)*
- [Segurança no browser](seguranca-no-browser.md) — Inserir texto com `textContent`, sem `eval`, sem handlers inline e sem tokens em `localStorage`. *(fora do PDF)*
- [DOM e desempenho](dom-e-desempenho.md) — Carregar scripts sem bloquear, dividir o código por rota e evitar trabalho desnecessário no DOM. *(fora do PDF)*
- [Testes](testes.md) — Testes unitários rápidos, testes de componentes pelo comportamento e alguns ponta-a-ponta. *(fora do PDF)*
- [Dependências do frontend](dependencias-frontend.md) — Lockfile no repositório, instalação reprodutível, auditoria e controlo do peso das dependências. *(fora do PDF)*
- [Datas, números e localidade](datas-numeros-e-localidade.md) — Formatar com a API `Intl`, guardar e transmitir datas em UTC (ISO 8601). *(fora do PDF)*

# Atualizações: Boas práticas de JavaScript

Novidades com confiança alta ou média (as de média levam «Confiança: media»), organizadas por categoria e da mais recente para a mais antiga. Não alteram o texto das entradas. Cada linha tem o seu registo no [CHANGELOG](../CHANGELOG.md).

## TypeScript

- **2026-07-08** em [TypeScript e tipagem](typescript-e-tipagem.md): Saiu o TypeScript 7.0, o compilador reescrito em código nativo, que a equipa diz ser cerca de 10 vezes mais rápido. Adota as predefinições do TypeScript 6.0 (publicado a 2026-03-23): `strict` passa a `true` por omissão, `module` a `esnext` e `types` a `[]`, e por isso os tipos globais de `@types/node` ou do Jest só entram se forem declarados em `types`. As opções que o 6.0 marcou como obsoletas dão erro no 7.0. Quem ainda precisa do 6 instala `typescript@npm:@typescript/typescript6`. Fonte: [Announcing TypeScript 7.0](https://devblogs.microsoft.com/typescript/announcing-typescript-7-0/), [Announcing TypeScript 6.0](https://devblogs.microsoft.com/typescript/announcing-typescript-6-0/). Confiança: alta. Adicionado a 2026-11-25.

## ESLint

- **2026-02-06** em [Estilo e formatação](estilo-e-formatacao.md): O ESLint v10.0.0 retira por completo a configuração eslintrc. Os ficheiros `.eslintrc.*` e `.eslintignore` deixam de ser lidos e só vale a configuração plana (flat config). Deixa também de suportar o Node.js anterior a v20.19.0, a v21 e a v23. Num projeto com `.eslintrc`, migrar a configuração antes de passar para a v10. Fonte: [ESLint v10.0.0 released](https://eslint.org/blog/2026/02/eslint-v10.0.0-released/). Confiança: alta. Adicionado a 2026-11-25.

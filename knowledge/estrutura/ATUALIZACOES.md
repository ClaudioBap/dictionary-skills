# Atualizações: Estrutura e documentação

Novidades com confiança alta ou média (as de média levam «Confiança: media»), organizadas por categoria e da mais recente para a mais antiga. Não alteram o texto das entradas. Cada linha tem o seu registo no [CHANGELOG](../CHANGELOG.md).

## Claude Code

- **2026-11-03** em [Hooks de guarda](hooks-de-guarda.md): No Claude Code 2.1.317, as callbacks de hooks do Agent SDK aceitam `onFailure: "block"`: se a callback falhar, a ação é bloqueada em vez de seguir. Para hooks de guarda, é a opção que evita que uma falha do próprio hook deixe passar a ação. Fonte: [Claude Code v2.1.317](https://github.com/anthropics/claude-code/releases/tag/v2.1.317). Confiança: alta. Adicionado a 2026-11-04.
- **2026-10-31** em [Hooks de guarda](hooks-de-guarda.md): O Claude Code 2.1.316 corrige hooks em PowerShell que não bloqueavam com o código de saída 2 quando o comando começava por uma conversão de tipo, `param`, `using` ou um atributo. Quem usa hooks de guarda em PowerShell deve usar a 2.1.316 ou mais recente. Fonte: [Claude Code v2.1.316](https://github.com/anthropics/claude-code/releases/tag/v2.1.316). Confiança: alta. Adicionado a 2026-11-04.

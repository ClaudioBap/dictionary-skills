# Atualizações: Boas práticas de Java

Novidades com confiança alta ou média (as de média levam «Confiança: media»), organizadas por categoria e da mais recente para a mais antiga. Não alteram o texto das entradas. Cada linha tem o seu registo no [CHANGELOG](../CHANGELOG.md).

## JDK

- **2026-11-11**: Os tipos primitivos em padrões, no `instanceof` e no `switch`, deixam de estar a caminho da linguagem. O rascunho da JEP que seria a sexta pré-visualização (JEP 8393282) foi retirado e a funcionalidade é removida do JDK 28. A página não indica alternativa. Código que dependa desta funcionalidade em pré-visualização tem de ser reescrito antes de passar ao JDK 28. Fonte: [Inside Java: Withdrawing the Primitive Patterns Preview Feature](https://inside.java/2026/11/11/withdraw-primitive-patterns-preview/). Confiança: alta. Adicionado a 2026-11-14.

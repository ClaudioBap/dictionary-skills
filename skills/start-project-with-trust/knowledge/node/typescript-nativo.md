---
id: node/typescript-nativo
titulo: "TypeScript nativo"
seccao: "Boas práticas de Node.js"
paginas: []
fonte: "Fontes oficiais (documentação do Node.js, npm, OWASP, Docker e projetos citados), ligadas em cada ponto; consultadas a 2026-11-03. Pontos marcados «sem fonte oficial» são convenções escritas pelo assistente. Não vem do PDF."
verificado_em: 2026-11-03
---

# TypeScript nativo

**Resumo:** Executar `.ts` diretamente com type stripping (Stable), mantendo a verificação de tipos no CI.

## Conteúdo

- O Node executa sintaxe TypeScript apagável substituindo-a por espaços e não verifica tipos: `tsc --noEmit` continua no CI (Stable desde v25.2.0 e v24.12.0). — [nodejs.org/api/typescript.html](https://nodejs.org/api/typescript.html)
- O Node ignora o `tsconfig.json`; evitar `enum` e `namespace` com código em runtime e ativar `erasableSyntaxOnly` (TypeScript 5.8 ou mais recente). — [nodejs.org/api/typescript.html](https://nodejs.org/api/typescript.html)

**Para uma skill:** o código TypeScript corre sem passo de build e o CI falha com erros de tipos.

## Ver também

- [TypeScript e tipagem](../javascript/typescript-e-tipagem.md) (Boas práticas de JavaScript)

Fonte: Fontes oficiais (documentação do Node.js, npm, OWASP, Docker e projetos citados), ligadas em cada ponto; consultadas a 2026-11-03. Pontos marcados «sem fonte oficial» são convenções escritas pelo assistente. Não vem do PDF.

---
id: javascript/typescript-e-tipagem
titulo: "TypeScript e tipagem"
seccao: "Boas práticas de JavaScript"
paginas: []
fonte: "Conhecimento do assistente (Claude), sem fonte verificada; escrito a 2026-11-03 a pedido do utilizador. Não vem do PDF."
verificado_em: 2026-11-03
---

# TypeScript e tipagem

**Resumo:** Preferir TypeScript em modo `strict`, evitar `any` e verificar os tipos no CI.

## Conteúdo

- Preferir TypeScript em código novo, com `"strict": true` no `tsconfig.json`.
- Evitar `any`; usar `unknown` nas fronteiras (respostas de API, `JSON.parse`) e validar antes de usar.
- Correr `tsc --noEmit` no CI; os erros de tipo falham o build.

**Para uma skill:** o projeto compila com `strict` ligado e sem `any` fora das fronteiras validadas.

## Ver também

- [Ferramentas: tipagem estática](../cicd/ferramentas-tipagem-estatica.md) (CI/CD e ferramentas)

Fonte: Conhecimento do assistente (Claude), sem fonte verificada; escrito a 2026-11-03 a pedido do utilizador. Não vem do PDF.

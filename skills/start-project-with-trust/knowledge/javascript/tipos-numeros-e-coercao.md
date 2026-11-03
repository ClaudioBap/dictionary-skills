---
id: javascript/tipos-numeros-e-coercao
titulo: "Tipos, números e coerção"
seccao: "Boas práticas de JavaScript"
paginas: []
fonte: "Conhecimento do assistente (Claude), sem fonte verificada; escrito a 2026-11-03 a pedido do utilizador. Não vem do PDF."
verificado_em: 2026-11-03
---

# Tipos, números e coerção

**Resumo:** Conhecer as armadilhas da coerção e dos números de vírgula flutuante; dinheiro nunca em `float`.

## Conteúdo

- Evitar a coerção implícita: converter explicitamente (`Number()`, `String()`) e validar o resultado (`Number.isNaN`).
- Todos os `number` são vírgula flutuante: dinheiro em inteiros (cêntimos) ou com biblioteca decimal; `BigInt` para inteiros muito grandes.
- `null` e `undefined` tratados de forma explícita, com `??` e `?.`.

**Para uma skill:** nenhum valor monetário é calculado em vírgula flutuante.

## Ver também

- [Tipos de dados](../base-de-dados/tipos-de-dados.md) (Base de dados)

Fonte: Conhecimento do assistente (Claude), sem fonte verificada; escrito a 2026-11-03 a pedido do utilizador. Não vem do PDF.

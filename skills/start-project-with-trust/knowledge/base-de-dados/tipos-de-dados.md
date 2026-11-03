---
id: base-de-dados/tipos-de-dados
titulo: "Tipos de dados"
seccao: "Base de dados"
paginas: [28]
fonte: Dicionario-Boas-Praticas.pdf
verificado_em: 2026-11-03
---

# Tipos de dados

**Resumo:** Escolher o tipo certo: dinheiro em decimal, tempo em UTC, nada de números em texto.

## Conteúdo

- Escolher o tipo certo: `decimal` / `numeric` para dinheiro (nunca `float`), inteiro para contagens, `boolean` para sim/não.
- Datas e horas em UTC com tipo próprio; texto com o tipo e tamanho adequados; `enum`/tabela de referência para domínios fixos.

**Para uma skill:** dinheiro em decimal, tempo em UTC, nada de guardar números em texto.

Fonte: pág. 28 (Dicionario-Boas-Praticas.pdf)

---
id: javascript/erros-e-excecoes
titulo: "Erros e exceções"
seccao: "Boas práticas de JavaScript"
paginas: []
fonte: "Conhecimento do assistente (Claude), sem fonte verificada; escrito a 2026-11-03 a pedido do utilizador. Não vem do PDF."
verificado_em: 2026-11-03
---

# Erros e exceções

**Resumo:** Lançar objetos `Error` com contexto, nunca engolir erros e mostrar ao utilizador uma mensagem útil.

## Conteúdo

- Lançar sempre `Error` (ou subclasses), nunca strings; juntar a causa com `new Error(msg, { cause })`.
- Nenhum `catch` vazio; cada erro apanhado é tratado, registado ou relançado.
- Na interface, mostrar uma mensagem útil e preservar o que o utilizador escreveu; o detalhe técnico vai para o log.

**Para uma skill:** nenhum `catch` engole o erro; os erros têm mensagem e causa.

## Ver também

- [Estados, erros e resiliência na UI](../design/estados-erros-e-resiliencia-na-ui.md) (Design e experiência de utilizador)

Fonte: Conhecimento do assistente (Claude), sem fonte verificada; escrito a 2026-11-03 a pedido do utilizador. Não vem do PDF.

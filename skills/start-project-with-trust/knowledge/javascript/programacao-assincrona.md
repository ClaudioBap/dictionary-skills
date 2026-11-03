---
id: javascript/programacao-assincrona
titulo: "Programação assíncrona"
seccao: "Boas práticas de JavaScript"
paginas: []
fonte: "Conhecimento do assistente (Claude), sem fonte verificada; escrito a 2026-11-03 a pedido do utilizador. Não vem do PDF."
verificado_em: 2026-11-03
---

# Programação assíncrona

**Resumo:** `async`/`await` com todas as rejeições tratadas, paralelismo explícito e cancelamento com `AbortController`.

## Conteúdo

- `async` / `await` em vez de cadeias de callbacks; não misturar estilos.
- Toda a promessa é aguardada ou tem `.catch`; nenhuma rejeição fica por tratar.
- Paralelizar o que é independente (`Promise.all`, ou `Promise.allSettled` quando falhas parciais são aceitáveis); cancelar pedidos com `AbortController` e definir timeouts.

**Para uma skill:** nenhuma promessa fica sem tratamento de erro; chamadas de rede têm timeout.

## Ver também

- [Degradação graciosa](../fiabilidade/degradacao-graciosa.md) (Fiabilidade e resiliência)

Fonte: Conhecimento do assistente (Claude), sem fonte verificada; escrito a 2026-11-03 a pedido do utilizador. Não vem do PDF.

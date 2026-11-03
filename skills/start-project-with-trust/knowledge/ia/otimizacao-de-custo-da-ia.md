---
id: ia/otimizacao-de-custo-da-ia
titulo: "Otimização de custo da IA"
seccao: "Construir com IA (Claude e Anthropic)"
paginas: [69]
fonte: Dicionario-Boas-Praticas.pdf
verificado_em: 2026-11-03
---

# Otimização de custo da IA

**Resumo:** Primeiro as poupanças grátis (caching, higiene de tokens), depois os trade-offs, medindo o custo por tarefa concluída.

## Conteúdo

- Ordem das poupanças: primeiro as grátis (prompt caching, higiene dos tokens de entrada e de saída, menos pedidos), depois os trade-offs (esforço mais baixo, escolha de modelo, batch).
- **Batch API** corre o não-urgente a ~metade do custo; **cache reads** são muito baratos; medir o custo **por tarefa concluída**, não por pedido.

**Para uma skill:** o caminho de IA tem caching, usa batch onde pode esperar, e o custo é medido por tarefa concluída.

## Ver também

- [Custo-eficiência (FinOps)](../custo/custo-eficiencia-finops.md) (Sessões, orquestração e custo-eficiência)

Fonte: pág. 69 (Dicionario-Boas-Praticas.pdf)

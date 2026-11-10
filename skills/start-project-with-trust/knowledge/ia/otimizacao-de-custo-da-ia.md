---
id: ia/otimizacao-de-custo-da-ia
titulo: "Otimização de custo da IA"
seccao: "Construir com IA"
paginas: [69]
fonte: Dicionario-Boas-Praticas.pdf
verificado_em: 2026-11-10
editado_em: 2026-11-10
fontes_oficiais_consultadas_em: 2026-11-10
---

# Otimização de custo da IA

**Resumo:** Primeiro as poupanças grátis (caching, higiene de tokens), depois os trade-offs, medindo o custo por tarefa concluída.

## Conteúdo

- Ordem das poupanças: primeiro as grátis (prompt caching, higiene dos tokens de entrada e de saída, menos pedidos), depois os trade-offs (esforço mais baixo, escolha de modelo, batch).
- **Batch API** corre o não-urgente a ~metade do custo; **cache reads** são muito baratos; medir o custo **por tarefa concluída**, não por pedido.

**Para uma skill:** o caminho de IA tem caching, usa batch onde pode esperar, e o custo é medido por tarefa concluída.

## Ver também

- [Custo-eficiência (FinOps)](../custo/custo-eficiencia-finops.md) (Sessões, orquestração e custo-eficiência)

## Fontes oficiais

*Ligações externas que apoiam esta entrada, consultadas a 2026-11-04. Não alteram o texto acima.*

- [Batch processing](https://platform.claude.com/docs/en/build-with-claude/batch-processing) — Batch API com 50% de desconto; maioria termina em menos de 1 hora
- [Prompt caching](https://platform.claude.com/docs/en/build-with-claude/prompt-caching) — leituras de cache a 0,1x do preço base de entrada
- [Pricing](https://platform.claude.com/docs/en/about-claude/pricing) — preços de cache e batch por modelo

> **Nota (fonte oficial):** Leituras de cache: 0,1x na generalidade, 0,05x no Opus 5.5 e no Sonnet 5.5, e 0,025x no Fable 5.2, no Mythos 5.2, no Fable 5.1 (legado) e no Mythos 5.1 (página de preços, 2026-11-10).

## Histórico

- **2026-11-09**: antes, a nota dizia «0,025x no Fable 5.1». Mudou porque o Fable 5.2 e o Mythos 5.2 foram lançados com o mesmo multiplicador de leitura da cache. Fonte: [Pricing](https://platform.claude.com/docs/en/about-claude/pricing). Editado a 2026-11-10.

Fonte: pág. 69 (Dicionario-Boas-Praticas.pdf)

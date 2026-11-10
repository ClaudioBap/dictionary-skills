---
id: ia/escolher-o-modelo-claude
titulo: "Escolher o modelo Claude"
seccao: "Construir com IA"
paginas: [66]
fonte: Dicionario-Boas-Praticas.pdf
verificado_em: 2026-11-10
editado_em: 2026-11-10
fontes_oficiais_consultadas_em: 2026-11-10
---

# Escolher o modelo Claude

**Resumo:** Os modelos Claude, os seus preços indicativos e a regra de escolher por medição na tarefa real.

## Conteúdo

- **Fable 5.2** (`claude-fable-5-2`, lançado a 2026-11-09) é o mais capaz, «For demanding reasoning and long-horizon agentic work» ($8/$40 por milhão de tokens de entrada/saída, contexto 1M, saída até 128K, pensamento adaptativo sempre ligado). **Opus 5.5** (`claude-opus-5-5`) é o recomendado para a maioria do trabalho ($4/$20). **Sonnet 5.5** (`claude-sonnet-5-5`) é «The best combination of speed and intelligence» ($2/$10). **Haiku 5.5** (`claude-haiku-5-5`) para alto volume e baixa latência ($0,10/$0,50 em prompts até 100 000 tokens; $0,50/$2,50 acima disso). O **Fable 5.1** (`claude-fable-5-1`) passou a legado, ainda disponível ($10/$50). Os **Mythos 5.1 e 5.2** têm disponibilidade limitada a organizações verificadas.
- Preferir o modelo mais capaz a esforço baixo antes de montar cascatas de modelos; a cache é por modelo, por isso misturar modelos perde reuso de cache.

**Para uma skill:** o modelo e o esforço são escolhidos por medição na tarefa real, não por hábito; o custo mede-se por tarefa concluída, não por pedido.

## Fontes oficiais

*Ligações externas que apoiam esta entrada, consultadas a 2026-11-04 e a 2026-11-10.*

- [Models overview](https://platform.claude.com/docs/en/about-claude/models/overview) — IDs, contexto 1M, saída 128K, pensamento adaptativo e esforço padrão por modelo; Opus 5.5 para a maioria do trabalho, Fable 5.2 para o mais exigente; Fable 5.1 na lista de legados
- [Pricing](https://platform.claude.com/docs/en/about-claude/pricing) — preços por modelo, cache e batch
- [Release notes, 2026-11-09](https://platform.claude.com/docs/en/release-notes/overview) — lançamento do Fable 5.2 e do Mythos 5.2

> **Nota (fonte oficial):** O pensamento adaptativo está sempre ligado no Fable 5.2 e no Opus 5.5; o Haiku 5.5 tem preços mais altos para prompts acima de 100 mil tokens. Que a cache seja por modelo não está escrito explicitamente na documentação lida (que diz que as caches são isoladas por organização ou workspace).

## Histórico

- **2026-11-09**: antes, «**Opus 5.5** (`claude-opus-5-5`) é o equilíbrio e o padrão (~$4/$20 por milhão de tokens in/out, contexto 1M). **Sonnet 5.5** para o dia a dia e código a bom preço (~$2/$10). **Haiku 5.5** para alto volume e baixo custo (~$0,10/$0,50). **Fable 5.1** (`claude-fable-5-1`) é o mais capaz, para o mais difícil (~$10/$50; thinking sempre ligado).» (PDF pág. 66, com nota de 2026-11-04). Mudou porque o Fable 5.2 foi lançado a 2026-11-09, mais barato do que o 5.1, e o Fable 5.1 passou a legado. Fonte: [Release notes](https://platform.claude.com/docs/en/release-notes/overview), [Models overview](https://platform.claude.com/docs/en/about-claude/models/overview). Editado a 2026-11-10.

Fonte: pág. 66 (Dicionario-Boas-Praticas.pdf)

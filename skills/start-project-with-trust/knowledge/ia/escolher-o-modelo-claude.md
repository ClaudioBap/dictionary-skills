---
id: ia/escolher-o-modelo-claude
titulo: "Escolher o modelo Claude"
seccao: "Construir com IA (Claude e Anthropic)"
paginas: [66]
fonte: Dicionario-Boas-Praticas.pdf
verificado_em: 2026-11-03
fontes_oficiais_consultadas_em: 2026-11-04
---

# Escolher o modelo Claude

**Resumo:** Os modelos Claude, os seus preços indicativos e a regra de escolher por medição na tarefa real.

## Conteúdo

- **Opus 5.5** (`claude-opus-5-5`) é o equilíbrio e o padrão (~$4/$20 por milhão de tokens in/out, contexto 1M). **Sonnet 5.5** para o dia a dia e código a bom preço (~$2/$10). **Haiku 5.5** para alto volume e baixo custo (~$0,10/$0,50). **Fable 5.1** (`claude-fable-5-1`) é o mais capaz, para o mais difícil (~$10/$50; thinking sempre ligado).
- Preferir o modelo mais capaz a esforço baixo antes de montar cascatas de modelos; a cache é por modelo, por isso misturar modelos perde reuso de cache.

**Para uma skill:** o modelo e o esforço são escolhidos por medição na tarefa real, não por hábito; o custo mede-se por tarefa concluída, não por pedido.

## Fontes oficiais

*Ligações externas que apoiam esta entrada, consultadas a 2026-11-04. Não alteram o texto acima.*

- [Models overview](https://platform.claude.com/docs/en/about-claude/models/overview) — IDs, preços, contexto 1M; começar por Opus 5.5, Fable 5.1 para o mais difícil
- [Pricing](https://platform.claude.com/docs/en/about-claude/pricing) — preços por modelo, cache e batch

> **Nota (fonte oficial):** Confirma modelos e preços. Nuances: o pensamento adaptativo também está sempre ligado no Opus 5.5 (não só no Fable 5.1); o Haiku 5.5 é «a partir de» $0,10/$0,50, com preços mais altos para prompts acima de 100 mil tokens. Que a cache seja por modelo não está escrito explicitamente na documentação lida (que diz que as caches são isoladas por organização ou workspace).

Fonte: pág. 66 (Dicionario-Boas-Praticas.pdf)

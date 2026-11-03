---
id: ia/escolher-o-modelo-claude
titulo: "Escolher o modelo Claude"
seccao: "Construir com IA (Claude e Anthropic)"
paginas: [66]
fonte: Dicionario-Boas-Praticas.pdf
verificado_em: 2026-11-03
---

# Escolher o modelo Claude

**Resumo:** Os modelos Claude, os seus preços indicativos e a regra de escolher por medição na tarefa real.

## Conteúdo

- **Opus 5.5** (`claude-opus-5-5`) é o equilíbrio e o padrão (~$4/$20 por milhão de tokens in/out, contexto 1M). **Sonnet 5.5** para o dia a dia e código a bom preço (~$2/$10). **Haiku 5.5** para alto volume e baixo custo (~$0,10/$0,50). **Fable 5.1** (`claude-fable-5-1`) é o mais capaz, para o mais difícil (~$10/$50; thinking sempre ligado).
- Preferir o modelo mais capaz a esforço baixo antes de montar cascatas de modelos; a cache é por modelo, por isso misturar modelos perde reuso de cache.

**Para uma skill:** o modelo e o esforço são escolhidos por medição na tarefa real, não por hábito; o custo mede-se por tarefa concluída, não por pedido.

Fonte: pág. 66 (Dicionario-Boas-Praticas.pdf)

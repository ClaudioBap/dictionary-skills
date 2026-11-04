---
id: ia/pensar-e-esforco
titulo: "Pensar (thinking) e esforço (effort)"
seccao: "Construir com IA (Claude e Anthropic)"
paginas: [66, 67]
fonte: Dicionario-Boas-Praticas.pdf
verificado_em: 2026-11-03
fontes_oficiais_consultadas_em: 2026-11-04
---

# Pensar (thinking) e esforço (effort)

**Resumo:** Adaptive thinking com o nível de esforço afinado por rota.

## Conteúdo

- Usar «adaptive thinking» (o modelo decide quando e quanto pensar) e controlar a profundidade com o esforço: `low`, `medium`, `high`, `xhigh`, `max`.
- Mais esforço compensa em código e trabalho agêntico longo; em chat e classificação, `low` / `medium` chegam. Medir antes de subir o padrão.

**Para uma skill:** o esforço é afinado por rota (baixo no leve, alto no difícil), não global.

## Fontes oficiais

*Ligações externas que apoiam esta entrada, consultadas a 2026-11-04. Não alteram o texto acima.*

- [Effort](https://platform.claude.com/docs/en/build-with-claude/effort) — níveis low a max, padrões por modelo, recomendações por tipo de tarefa
- [Thinking](https://platform.claude.com/docs/en/build-with-claude/thinking) — pensamento adaptativo: o modelo decide quando e quanto pensar

> **Nota (fonte oficial):** O esforço padrão é `high` na maioria dos modelos e `medium` no Opus 5.5 e no Haiku 5.5. No Opus 5.5 e no Fable 5.1 o pensamento não pode ser desligado. A documentação recomenda medir com evals («effort sweep») antes de mudar o nível.

Fonte: págs. 66, 67 (Dicionario-Boas-Praticas.pdf)

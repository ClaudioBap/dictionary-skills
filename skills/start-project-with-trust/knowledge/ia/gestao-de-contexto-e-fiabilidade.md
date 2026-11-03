---
id: ia/gestao-de-contexto-e-fiabilidade
titulo: "Gestão de contexto e fiabilidade"
seccao: "Construir com IA (Claude e Anthropic)"
paginas: [68, 69]
fonte: Dicionario-Boas-Praticas.pdf
verificado_em: 2026-11-03
---

# Gestão de contexto e fiabilidade

**Resumo:** Gerir o contexto com caching, compaction e edição, e validar sempre a saída do modelo.

## Conteúdo

- Contexto grande (1M tokens nos modelos atuais), mas não infinito: usar **prompt caching** (reusar o prefixo estável), **compaction** (resumir o antigo), **context editing** (limpar resultados de ferramentas antigos) e a **ferramenta de memória** para o que tem de durar.
- Fiabilidade: validar sempre o que o modelo devolve, tratar o estado de recusa (`refusal`) e ter fallback; nada de confiar cegamente na saída.

**Para uma skill:** conversas longas gerem o contexto (cache + compaction/edição), e a saída do modelo é sempre validada antes de agir.

Fonte: págs. 68, 69 (Dicionario-Boas-Praticas.pdf)

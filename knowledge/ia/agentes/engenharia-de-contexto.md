---
id: ia/agentes/engenharia-de-contexto
titulo: "Engenharia de contexto para agentes"
seccao: "Construir com IA"
paginas: []
fonte: "https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents; consultado a 2026-11-10. Não vem do PDF."
data_lancamento: 2025-09-29
confianca: alta
verificado_em: 2026-11-10
---

# Engenharia de contexto para agentes

**Resumo:** O contexto é um orçamento finito; um agente carrega a informação quando precisa dela, resume quando se aproxima do limite e guarda notas fora da janela.

## Conteúdo

- Engenharia de contexto é «the set of strategies for curating and maintaining the optimal set of tokens (information) during LLM inference», e o objetivo é «find the smallest set of high-signal tokens that maximize the likelihood of your desired outcome». O contexto é tratado como um «attention budget». Fonte: [Effective context engineering for AI agents (Anthropic, 2025-09-29)](https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents)
- Recuperação no momento: o agente guarda identificadores leves (caminhos de ficheiros, consultas, links) e só carrega os dados quando precisa, descobrindo o contexto aos poucos. É mais lento e precisa de boas instruções para não gastar contexto à toa. Fonte: o mesmo artigo.
- Compactação: resumir o conteúdo quando a conversa se aproxima do limite, primeiro sem perder nada e depois a cortar o que sobra. Limpar resultados de ferramentas antigos é a forma mais leve e segura. Fonte: o mesmo artigo.
- Notas estruturadas (um NOTES.md, listas de tarefas) guardam o estado fora da janela. Os subagentes devolvem só «a condensed, distilled summary of its work (often 1,000-2,000 tokens)». Fonte: o mesmo artigo.
- Quando usar cada uma: compactação em conversas longas, notas em trabalho iterativo com marcos, vários agentes em investigação complexa e paralela. Fonte: o mesmo artigo.

**Para uma skill:** um agente de tarefas longas tem definido o que carrega só quando precisa, quando compacta e onde guarda as notas.

## Ver também

- [Gestão de contexto e fiabilidade](../gestao-de-contexto-e-fiabilidade.md) (Construir com IA)
- [Subagentes e orquestração](../subagentes-e-orquestracao.md) (Construir com IA)
- [Memória de agentes](../rag/memoria-de-agentes.md) (Construir com IA)

Fonte: https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents, consultado a 2026-11-10. Não vem do PDF.

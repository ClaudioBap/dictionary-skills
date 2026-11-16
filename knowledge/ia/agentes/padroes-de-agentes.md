---
id: ia/agentes/padroes-de-agentes
titulo: "Padrões de agentes (workflows e agentes)"
seccao: "Construir com IA"
paginas: []
fonte: "https://www.anthropic.com/engineering/building-effective-agents; consultado a 2026-11-10. Não vem do PDF."
data_lancamento: 2024-12-19
confianca: alta
verificado_em: 2026-11-10
---

# Padrões de agentes (workflows e agentes)

**Resumo:** Começar pela solução mais simples, muitas vezes sem agente; quando é preciso mais, escolher entre cinco padrões de workflow antes de dar ao modelo o controlo do processo.

## Conteúdo

- Workflows e agentes são coisas diferentes. «Workflows are systems where LLMs and tools are orchestrated through predefined code paths.» Os agentes são «systems where LLMs dynamically direct their own processes and tool usage». Fonte: [Building effective agents (Anthropic, 2024-12-19)](https://www.anthropic.com/engineering/building-effective-agents)
- «We recommend finding the simplest solution possible, and only increasing complexity when needed.» Isso pode querer dizer não construir um sistema agêntico, e a complexidade só se acrescenta «only when it demonstrably improves outcomes». Fonte: o mesmo artigo.
- Os cinco padrões e quando servem, segundo o artigo:
  - encadear prompts, quando a tarefa se divide de forma limpa em subtarefas fixas;
  - encaminhar (routing), quando há categorias distintas que se tratam melhor em separado;
  - paralelizar, quando as subtarefas podem correr ao mesmo tempo;
  - orquestrador e trabalhadores, quando não se consegue prever as subtarefas;
  - avaliador e otimizador, quando há critérios de avaliação claros.

  Fonte: o mesmo artigo.
- Para começar, usar diretamente a API do modelo: muitos padrões fazem-se em poucas linhas. Com um framework, «ensure you understand the underlying code». Fonte: o mesmo artigo.
- O próprio artigo avisa que muitas das ferramentas que refere mudaram desde a publicação. Fonte: o mesmo artigo.

**Para uma skill:** um plano com agente diz porque um workflow fixo não chega, e qual dos cinco padrões usa nas partes previsíveis.

## Ver também

- [Escolher a superfície (do simples ao agente)](../escolher-a-superficie.md) (Construir com IA)
- [Agentes: as quatro formas de construir](../agentes-as-quatro-formas-de-construir.md) (Construir com IA)
- [Subagentes e orquestração](../subagentes-e-orquestracao.md) (Construir com IA)
- [Frameworks de agentes](frameworks-de-agentes.md) (Construir com IA)

Fonte: https://www.anthropic.com/engineering/building-effective-agents, consultado a 2026-11-10. Não vem do PDF.

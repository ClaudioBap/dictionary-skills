---
id: jarvis/microsoft-jarvis-hugginggpt
titulo: "Microsoft JARVIS (HuggingGPT)"
seccao: "Jarvis open source (OpenJarvis e Microsoft JARVIS)"
paginas: []
fonte: "Repositório oficial microsoft/JARVIS e artigos dos autores no arXiv, ligados em cada ponto; consultados a 2026-11-26. Não vem do PDF."
verificado_em: 2026-11-26
editado_em: 2026-11-26
---

# Microsoft JARVIS (HuggingGPT)

**Resumo:** Projeto de investigação da Microsoft (2023, licença MIT) em que um LLM planeia a tarefa, escolhe modelos do Hugging Face, executa-os e junta a resposta. O repositório não publica versões, o último commit é de 2025-07-29 e a pilha é de 2023, por isso serve para estudar o padrão e os benchmarks (TaskBench, EasyTool), não para pôr em produção.

## Conteúdo

### O que é

- Um LLM controlador trabalha em quatro fases: planeia a tarefa, escolhe os modelos, executa-os e gera a resposta a partir dos resultados. Fontes: [repositório](https://github.com/microsoft/JARVIS), [artigo HuggingGPT](https://arxiv.org/abs/2303.17580) (v1 a 2023-03-30, v4 a 2023-12-03)
- Licença MIT. Fonte: [repositório](https://github.com/microsoft/JARVIS)
- No mesmo repositório: o TaskBench, um benchmark de automação de tarefas por LLM ([artigo](https://arxiv.org/abs/2311.18760)), e o EasyTool, que dá aos agentes instruções de ferramentas mais curtas ([artigo](https://arxiv.org/abs/2401.06201)). Fonte: [repositório](https://github.com/microsoft/JARVIS)

### Estado e requisitos

- Não há versões publicadas; o último commit é de 2025-07-29 e o anterior de 2024-09-26; o repositório não está marcado como arquivado. Fonte: [commits](https://github.com/microsoft/JARVIS/commits/main.atom)
- O README pede, no modo local, Ubuntu 16.04, 24 GB de VRAM, 12 a 80 GB de RAM conforme o perfil e mais de 284 GB de disco; no modo lite usa só os endpoints do Hugging Face. Nos dois, chave da OpenAI e token do Hugging Face, com Python 3.8 e CUDA 11.7. Fonte: [repositório](https://github.com/microsoft/JARVIS). Confiança: media (o README tem valores de RAM que não batem certo entre si).

### Hoje

- O mesmo padrão, um orquestrador que planeia e entrega partes a modelos ou ferramentas especializadas, faz-se hoje com tool use e subagentes. Ver [Subagentes e orquestração](../ia/subagentes-e-orquestracao.md) e [Padrões de agentes](../ia/agentes/padroes-de-agentes.md). *(interpretação)*

**Para uma skill:** o Microsoft JARVIS entra num plano só como referência de arquitetura ou para correr o TaskBench; para um sistema novo, a skill propõe o padrão com as entradas de agentes da base e diz porquê (pilha de 2023, sem versões publicadas).

## Ver também

- [Tool use (ferramentas e function calling)](../ia/tool-use.md) (Construir com IA)
- [Avaliação (evals)](../ia/avaliacao-evals.md) (Construir com IA)

Fonte: Repositório oficial microsoft/JARVIS e artigos dos autores no arXiv, ligados em cada ponto; consultados a 2026-11-26. Não vem do PDF.

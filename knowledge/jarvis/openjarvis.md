---
id: jarvis/openjarvis
titulo: "OpenJarvis, o assistente pessoal que corre no próprio computador"
seccao: "Jarvis open source (OpenJarvis e Microsoft JARVIS)"
paginas: []
fonte: "Site, documentação, repositório, PyPI e artigo oficiais do OpenJarvis, ligados em cada ponto; consultados a 2026-11-26. Não vem do PDF."
verificado_em: 2026-11-26
editado_em: 2026-11-26
---

# OpenJarvis, o assistente pessoal que corre no próprio computador

**Resumo:** O OpenJarvis (Stanford, Apache 2.0) monta agentes pessoais sobre modelos locais (Ollama, vLLM, llama.cpp e outros) ou, se se configurar, sobre modelos na nuvem como o Claude. Recomenda o modelo pela memória da máquina, agenda agentes (como um resumo da manhã), liga-se a servidores MCP e aprende com os registos das próprias execuções.

## Conteúdo

### O que é

- Framework de IA pessoal que trabalha primeiro no computador da pessoa, com a nuvem como opção, em cinco partes: Intelligence (catálogo de modelos), Engine (motor de inferência), Agents, Tools & Memory e Learning. Fonte: [site](https://openjarvis.stanford.edu/)
- Feito no Hazy Research e no Scaling Intelligence Lab da Stanford, com licença Apache 2.0. Fontes: [repositório](https://github.com/open-jarvis/OpenJarvis), [artigo](https://arxiv.org/abs/2605.17172) (2026-05-16)
- O repositório oficial é `open-jarvis/OpenJarvis`, para onde apontam o site, o blog e o artigo; o pacote oficial no PyPI é `openjarvis`. Há outros repositórios e pacotes com nomes parecidos, por isso a origem confirma-se pelo site. Fontes: [site](https://openjarvis.stanford.edu/), [PyPI](https://pypi.org/project/openjarvis/)
- Versões: a 1.0.4 é a última publicada no PyPI (2026-09-18); no GitHub saem versões de desenvolvimento várias vezes por hora (a v1.0.5.dev1395 a 2026-11-26). Fontes: [PyPI](https://pypi.org/rss/project/openjarvis/releases.xml), [releases](https://github.com/open-jarvis/OpenJarvis/releases)
- O artigo mostra que trocar um modelo de topo na nuvem por um modelo local de 9B perde 25 a 39 pontos nos benchmarks; com a pesquisa de configurações guiada por um LLM, a versão local iguala ou supera a nuvem em 4 de 8 benchmarks e fica a 3,2 pontos da melhor em média, com um custo marginal de API cerca de 800 vezes menor e latência 4 vezes menor. Fonte: [artigo](https://arxiv.org/abs/2605.17172) (lido o resumo)

### Instalar

- `git clone` do repositório e `./scripts/quickstart.sh`, ou instalação manual com `uv sync` e `maturin`. Exige Python 3.11 a 3.13 e Rust; há instaladores para desktop. Fonte: [instalação](https://open-jarvis.github.io/OpenJarvis/getting-started/installation/)
- O `jarvis init` recomenda o modelo pela memória: `qwen3.5:2b` com 5 a 14 GB de RAM (ou 1 a 8 GB de VRAM), `4b` com 15 a 24 (9 a 17), `9b` com 25 a 44 (18 a 35) e `27b` com 45 ou mais (36 ou mais). Fonte: [instalação](https://open-jarvis.github.io/OpenJarvis/getting-started/installation/)

### Motores, agentes e ferramentas

- Motores locais (Ollama, vLLM, SGLang, llama.cpp, MLX, LM Studio, entre outros) e um motor Cloud com os SDKs da OpenAI, da Anthropic e da Google, que escolhe o fornecedor pelo nome do modelo. Fonte: [motores](https://open-jarvis.github.io/OpenJarvis/architecture/engine/)
- `jarvis serve` expõe uma API compatível com a da OpenAI. Fonte: [site](https://openjarvis.stanford.edu/)
- Agentes incluídos, entre eles `simple`, `orchestrator`, `native_react`, `claude_code` (pelo Claude Agent SDK), `deep_research` e `morning_digest`, a pedido, agendados ou contínuos, com limites de tokens e de custo. Fonte: [agentes](https://open-jarvis.github.io/OpenJarvis/user-guide/agents/). Confiança: media (página lida em parte).
- Cliente MCP: os servidores configuram-se em `[tools.mcp]` no `config.toml`, por Streamable HTTP ou stdio, com filtro das ferramentas. Fonte: [servidores MCP](https://open-jarvis.github.io/OpenJarvis/user-guide/mcp-external-servers/)
- Aprendizagem: o registo de cada execução fica em SQLite, no computador, e serve para afinar prompts, o encaminhamento entre modelos e os pesos (o SFT funciona; o GRPO ainda não está implementado), com reversão automática se um benchmark piorar. Fonte: [aprendizagem](https://open-jarvis.github.io/OpenJarvis/architecture/learning/)

**Para uma skill:** uma instalação prova-se com o modelo escolhido pela tabela de memória da máquina, `jarvis scan --data-boundaries` sem avisos por resolver (ver [o que sai da máquina](openjarvis-privacidade-e-seguranca.md)) e uma execução do agente pedido; um modelo na nuvem só entra se o utilizador aceitar que os dados saem da máquina.

## Ver também

- [O que sai da máquina no OpenJarvis e como o fechar](openjarvis-privacidade-e-seguranca.md) (Jarvis open source)
- [Memória e hardware](../ia/modelos-proprios/memoria-e-hardware.md) (Construir com IA)
- [Avaliação (evals)](../ia/avaliacao-evals.md) (Construir com IA)

Fonte: Site, documentação, repositório, PyPI e artigo oficiais do OpenJarvis, ligados em cada ponto; consultados a 2026-11-26. Não vem do PDF.

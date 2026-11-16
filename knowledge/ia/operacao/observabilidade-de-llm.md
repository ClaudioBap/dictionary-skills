---
id: ia/operacao/observabilidade-de-llm
titulo: "Observabilidade de aplicações com LLM"
seccao: "Construir com IA"
paginas: []
fonte: "Repositório do OpenTelemetry e documentação do Langfuse e do Arize Phoenix, ligados em cada ponto; consultados a 2026-11-10, páginas sem data. Não vem do PDF."
data_lancamento: null
confianca: media
verificado_em: 2026-11-10
---

# Observabilidade de aplicações com LLM

**Resumo:** Cada chamada ao modelo e às ferramentas fica num trace com tokens, custo e resultado, para depurar, avaliar e comparar versões de prompts; há convenções abertas e ferramentas open source que se podem alojar.

## Conteúdo

- OpenTelemetry: as convenções semânticas para IA generativa saíram do site do OpenTelemetry e vivem agora num repositório próprio, com licença Apache-2.0. O repositório não mostra o estado (experimental ou estável) nem a versão, e os nomes dos atributos não foram confirmados. Fonte: [open-telemetry/semantic-conventions-genai](https://github.com/open-telemetry/semantic-conventions-genai)
- Langfuse: plataforma open source com tracing («Traces include all LLM and non-LLM calls»), gestão de prompts (versões, deployment por etiqueta, playground), avaliação (LLM como juiz, datasets, experiências, filas de anotação, scores próprios) e um AI Gateway (endpoint único, chaves por utilizador, análise de gasto, aprovação de modelos). Diz-se «open, self-hostable, and extensible». A licença não aparece na página lida. Fonte: [Langfuse docs](https://langfuse.com/docs)
- Arize Phoenix: ferramenta de observabilidade e avaliação construída sobre OpenTelemetry e instrumentada com OpenInference; cobre traces, avaliações (com LLM, com código e humanas), iteração de prompts e experiências sobre os mesmos dados. A licença e as opções de alojamento próprio não aparecem na página lida. O Arize AX é uma plataforma gerida à parte. Fonte: [Arize Phoenix](https://arize.com/docs/phoenix)

**Para uma skill:** uma aplicação com LLM em produção regista em traces cada chamada ao modelo e às ferramentas, com tokens e custo, numa ferramenta escolhida com licença confirmada; a escolha prefere uma que se possa alojar quando os dados não podem sair da organização.

## Ver também

- [Gateway de LLM (LiteLLM)](gateway-de-llm-litellm.md) (Construir com IA)
- [Uso e custo da Claude API](uso-e-custo-da-claude-api.md) (Construir com IA)
- [Avaliação (evals)](../avaliacao-evals.md) (Construir com IA)

Fonte: repositório do OpenTelemetry e documentação do Langfuse e do Arize Phoenix, ligados em cada ponto; consultados a 2026-11-10, páginas sem data. Não vem do PDF.

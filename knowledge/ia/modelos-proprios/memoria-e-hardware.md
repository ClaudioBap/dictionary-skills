---
id: ia/modelos-proprios/memoria-e-hardware
titulo: "Memória e hardware"
seccao: "Construir com IA"
paginas: []
fonte: "https://huggingface.co/docs/accelerate/usage_guides/model_size_estimator; consultado a 2026-11-10, página sem data. Não vem do PDF."
data_lancamento: null
confianca: media
verificado_em: 2026-11-10
---

# Memória e hardware

**Resumo:** A memória necessária estima-se antes de comprar ou alugar hardware; a estimativa cobre só os pesos, a inferência acrescenta até 20% e o treino multiplica várias vezes.

## Conteúdo

- O estimador da Hugging Face corre com `accelerate estimate-memory <modelo>` e carrega o modelo «on the meta device», sem descarregar os pesos. Cobre modelos de `timm` e `transformers`, e é «accurate within a few % of the actual value». Fonte: [Model memory estimator](https://huggingface.co/docs/accelerate/usage_guides/model_size_estimator)
- Limite da estimativa: «This calculator will tell you how much memory is needed to purely load the model in, *not* to perform inference.» Na inferência, «you can expect to add up to an additional 20% as found by EleutherAI». Fonte: a mesma página.
- Exemplo da página, para o idefics-80b-instruct: só carregar pede «148.56 GB» em float16, «74.28 GB» em int8 e «37.14 GB» em int4; treinar com Adam em float16 pede «594.24 GB». Fonte: a mesma página.
- A quantização reduz a memória: o llama.cpp suporta de 1.5 a 8 bits e o bitsandbytes faz 8 e 4 bits. Ver [Servir um modelo próprio](servir-um-modelo-proprio.md) e [Adaptar um modelo (LoRA e QLoRA)](adaptar-um-modelo-lora-e-qlora.md).

**Para uma skill:** um plano com modelo próprio inclui a estimativa de memória para carregar, para inferência (mais até 20%) e, se houver, para treino, e escolhe o hardware a partir dela.

## Ver também

- [Requisitos para ter um LLM próprio](requisitos-para-ter-um-llm-proprio.md) (Construir com IA)
- [Construir um LLM do zero](construir-um-llm-do-zero.md) (Construir com IA)

Fonte: https://huggingface.co/docs/accelerate/usage_guides/model_size_estimator, consultado a 2026-11-10, página sem data. Não vem do PDF.

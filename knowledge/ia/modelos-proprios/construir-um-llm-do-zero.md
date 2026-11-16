---
id: ia/modelos-proprios/construir-um-llm-do-zero
titulo: "Construir um LLM do zero"
seccao: "Construir com IA"
paginas: []
fonte: "Repositórios dos autores (Sebastian Raschka, Andrej Karpathy), curso da Hugging Face e artigos (arXiv), ligados em cada ponto; consultados a 2026-11-10. Não vem do PDF."
data_lancamento: null
confianca: media
verificado_em: 2026-11-10
---

# Construir um LLM do zero

**Resumo:** Para aprender, um portátil chega; para treinar um modelo de chat completo, o caminho mais curto documentado é o nanochat num nó de 8 GPUs H100, com custo e tempo indicados pelo autor.

## Conteúdo

- «Build a Large Language Model (From Scratch)»: o repositório segue o livro por capítulos (texto e tokenização, mecanismos de atenção, um modelo GPT de raiz, pré-treino, afinação para classificação e para seguir instruções, e LoRA em apêndice). Está «designed to run on conventional laptops within a reasonable timeframe and does not require specialized hardware», e usa a GPU se houver. Licença Apache 2.0. Fonte: [rasbt/LLMs-from-scratch](https://github.com/rasbt/LLMs-from-scratch)
- nanochat: treina de ponta a ponta o tokenizador (`tok_train.py`), o pré-treino (`base_train.py`), o SFT (`chat_sft.py`) e o RL (`chat_rl.py`), com avaliação e uma interface de chat na linha de comandos. Está «designed to be run on an 8XH100 GPU node»; o custo indicado é «for only $48 (~2 hours of 8XH100 GPU node)», ou «closer to ~$15» com instâncias spot, e o README também diz «as this will take ~1.5 hours to run». Licença MIT. Fonte: [karpathy/nanochat](https://github.com/karpathy/nanochat)
- O nanoGPT, do mesmo autor, está marcado como «now very old and deprecated», com a indicação de usar o nanochat. Fonte: [karpathy/nanoGPT](https://github.com/karpathy/nanoGPT)
- O curso de LLM da Hugging Face cobre a biblioteca Transformers, afinação, datasets, tokenizadores e técnicas de LLM, mas não tem um capítulo de pré-treino de raiz. Fonte: [Hugging Face LLM Course](https://huggingface.co/learn/llm-course)
- A arquitetura de base é o Transformer: «a new simple network architecture, the Transformer, based solely on attention mechanisms». Fonte: [Attention Is All You Need (arXiv, 2017-06-12)](https://arxiv.org/abs/1706.03762)
- Dimensionar o treino: «for compute-optimal training, the model size and the number of training tokens should be scaled equally». Fonte: [Chinchilla (arXiv, 2022-03-29)](https://arxiv.org/abs/2203.15556)

**Para uma skill:** um plano que inclua treinar de raiz indica o objetivo (aprender ou produção), o hardware e o custo com fonte, e justifica porque não basta adaptar um modelo aberto.

## Ver também

- [Requisitos para ter um LLM próprio](requisitos-para-ter-um-llm-proprio.md) (Construir com IA)
- [Adaptar um modelo (LoRA e QLoRA)](adaptar-um-modelo-lora-e-qlora.md) (Construir com IA)
- [Memória e hardware](memoria-e-hardware.md) (Construir com IA)

Fonte: repositórios dos autores (Sebastian Raschka, Andrej Karpathy), curso da Hugging Face e artigos (arXiv), ligados em cada ponto; consultados a 2026-11-10. Não vem do PDF.

---
id: ia/modelos-proprios/adaptar-um-modelo-lora-e-qlora
titulo: "Adaptar um modelo (LoRA e QLoRA)"
seccao: "Construir com IA"
paginas: []
fonte: "Artigos dos autores (arXiv) e documentação da Hugging Face, ligados em cada ponto; consultados a 2026-11-10, só o resumo dos artigos. Não vem do PDF."
data_lancamento: 2021-06-17
confianca: media
verificado_em: 2026-11-10
---

# Adaptar um modelo (LoRA e QLoRA)

**Resumo:** Em vez de treinar todos os pesos, treinam-se só matrizes pequenas por cima do modelo congelado; com quantização a 4 bits, um modelo de 65B afina-se numa só GPU de 48 GB.

## Conteúdo

- LoRA: congela os pesos do modelo e «injects trainable rank decomposition matrices into each layer of the Transformer architecture». Face a afinar o GPT-3 175B com Adam, «LoRA can reduce the number of trainable parameters by 10,000 times and the GPU memory requirement by 3 times», com mais débito de treino. Fonte: [LoRA (arXiv, 2021-06-17)](https://arxiv.org/abs/2106.09685)
- QLoRA: junta LoRA com o modelo quantizado a 4 bits (tipo NF4, dupla quantização e otimizadores paginados) e «reduces memory usage enough to finetune a 65B parameter model on a single 48GB GPU». Fonte: [QLoRA (arXiv, 2023-05-23)](https://arxiv.org/abs/2305.14314)
- PEFT, a biblioteca da Hugging Face para estes métodos: «PEFT methods only fine-tune a small number of (extra) model parameters», com custos de computação e de armazenamento muito menores e desempenho comparável ao de afinar o modelo todo. Integra-se com Transformers, Diffusers e Accelerate. Fonte: [PEFT](https://huggingface.co/docs/peft)
- bitsandbytes (licença MIT) faz a quantização: a 8 bits, «inference with only half the required memory and without any performance degradation»; a 4 bits, serve o treino QLoRA. Fonte: [bitsandbytes](https://huggingface.co/docs/bitsandbytes)

**Para uma skill:** antes de propor afinar um modelo, o plano indica os dados de treino disponíveis, a GPU e a memória com fonte, e prefere LoRA ou QLoRA a afinar todos os pesos.

## Ver também

- [Alinhamento (DPO) e destilação](alinhamento-dpo-e-destilacao.md) (Construir com IA)
- [Memória e hardware](memoria-e-hardware.md) (Construir com IA)
- [Fine-tuning do Claude](fine-tuning-do-claude.md) (Construir com IA)

Fonte: artigos dos autores (arXiv) e documentação da Hugging Face, ligados em cada ponto; consultados a 2026-11-10, só o resumo dos artigos. Não vem do PDF.

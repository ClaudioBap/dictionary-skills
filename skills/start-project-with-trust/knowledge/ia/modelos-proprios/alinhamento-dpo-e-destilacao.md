---
id: ia/modelos-proprios/alinhamento-dpo-e-destilacao
titulo: "Alinhamento (DPO) e destilação"
seccao: "Construir com IA"
paginas: []
fonte: "Artigos dos autores (arXiv) e documentação da Hugging Face TRL, ligados em cada ponto; consultados a 2026-11-10, só o resumo dos artigos. Não vem do PDF."
data_lancamento: 2023-05-29
confianca: media
verificado_em: 2026-11-10
---

# Alinhamento (DPO) e destilação

**Resumo:** O DPO ajusta o modelo às preferências com uma perda de classificação simples, sem o ciclo de RLHF; a destilação passa o conhecimento de um modelo grande para um mais pequeno e barato de servir.

## Conteúdo

- DPO (Direct Preference Optimization): resolve o problema do RLHF «with only a simple classification loss». Os autores descrevem o RLHF como «a complex and often unstable procedure» e o DPO como «substantially simpler to implement and train», «eliminating the need for sampling from the LM during fine-tuning or performing significant hyperparameter tuning». Fonte: [DPO (arXiv, 2023-05-29)](https://arxiv.org/abs/2305.18290)
- Destilação: «compress the knowledge in an ensemble into a single model which is much easier to deploy». Fonte: [Distilling the Knowledge in a Neural Network (arXiv, 2015-03-09)](https://arxiv.org/abs/1503.02531)
- TRL, a biblioteca da Hugging Face para estes treinos (versão 1.17.1 na documentação): tem `SFTTrainer`, `DPOTrainer`, `GRPOTrainer`, `RewardTrainer`, `KTOTrainer`, `RLOOTrainer` e `DistillationTrainer`, e integra-se com Transformers, com exemplos de LoRA para o SFT. Fonte: [TRL](https://huggingface.co/docs/trl)

**Para uma skill:** um plano que ajusta o comportamento do modelo com preferências usa DPO (ou outro método da TRL) com uma eval antes e depois, em vez de montar RLHF com modelo de recompensa sem justificação.

## Ver também

- [Adaptar um modelo (LoRA e QLoRA)](adaptar-um-modelo-lora-e-qlora.md) (Construir com IA)
- [Avaliação (evals)](../avaliacao-evals.md) (Construir com IA)

Fonte: artigos dos autores (arXiv) e documentação da Hugging Face TRL, ligados em cada ponto; consultados a 2026-11-10, só o resumo dos artigos. Não vem do PDF.

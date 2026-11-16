---
id: ia/modelos-proprios/fine-tuning-do-claude
titulo: "Fine-tuning do Claude"
seccao: "Construir com IA"
paginas: []
fonte: "Blogue da Anthropic e blogue da AWS, ligados em cada ponto; consultados a 2026-11-10. Não vem do PDF."
data_lancamento: 2024-07-10
confianca: media
verificado_em: 2026-11-10
---

# Fine-tuning do Claude

**Resumo:** O fine-tuning do Claude foi lançado no Amazon Bedrock para o Claude 3 Haiku, com throughput provisionado; a lista atual de modelos elegíveis não está confirmada.

## Conteúdo

- A Anthropic anunciou a 2024-07-10 o fine-tuning do Claude 3 Haiku no Amazon Bedrock, e a disponibilidade geral foi anunciada a 2024-11-01. No lançamento, a região era US West (Oregon). Fonte: [Fine-tune Claude 3 Haiku](https://claude.com/blog/fine-tune-claude-3-haiku)
- Os dados de treino vão em ficheiros JSON Lines (JSONL), e «Before using a customized model, you need to purchase Provisioned Throughput for Amazon Bedrock». Fonte: [AWS: fine-tuning do Claude 3 Haiku em disponibilidade geral (2024-11-01)](https://aws.amazon.com/blogs/aws/fine-tuning-for-anthropics-claude-3-haiku-model-in-amazon-bedrock-is-now-generally-available/)
- A página da Anthropic não diz se há fine-tuning diretamente pela Claude API. A lista atual de modelos elegíveis no Bedrock não está confirmada e o preço não foi encontrado.

**Para uma skill:** antes de propor fine-tuning do Claude, o plano confirma na documentação do Bedrock que modelos são elegíveis e o custo do throughput provisionado, e compara com melhorar o prompt ou usar RAG.

## Ver também

- [Adaptar um modelo (LoRA e QLoRA)](adaptar-um-modelo-lora-e-qlora.md) (Construir com IA)
- [Escolher o modelo Claude](../escolher-o-modelo-claude.md) (Construir com IA)

Fonte: blogue da Anthropic e blogue da AWS, ligados em cada ponto; consultados a 2026-11-10. Não vem do PDF.

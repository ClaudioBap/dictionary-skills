---
id: ia/modelos-proprios/requisitos-para-ter-um-llm-proprio
titulo: "Requisitos para ter um LLM próprio"
seccao: "Construir com IA"
paginas: []
fonte: "Síntese das entradas desta pasta, cada uma com as suas fontes oficiais; consultadas a 2026-11-10. Não vem do PDF."
data_lancamento: null
confianca: media
verificado_em: 2026-11-10
---

# Requisitos para ter um LLM próprio

**Resumo:** Há três caminhos (usar uma API, adaptar um modelo aberto, treinar de raiz) e cada um pede coisas diferentes em dados, hardware, equipa, custo e obrigações legais; começa-se pelo mais barato que cumpre o pedido.

## Conteúdo

- Usar uma API de um fornecedor: sem treino nem hardware próprio; o custo é por token. Ver [Escolher o modelo Claude](../escolher-o-modelo-claude.md) e [Otimização de custo da IA](../otimizacao-de-custo-da-ia.md). *(interpretação: ordem dos caminhos, do mais barato ao mais caro)*
- Adaptar um modelo aberto: o LoRA congela os pesos originais e treina só matrizes pequenas, e o QLoRA permite afinar «a 65B parameter model on a single 48GB GPU». Precisa de dados de exemplo da tarefa e de uma GPU. Ver [Adaptar um modelo (LoRA e QLoRA)](adaptar-um-modelo-lora-e-qlora.md).
- Treinar de raiz: o nanochat treina um modelo completo, do tokenizador ao chat, num nó de 8 GPUs H100 «for only $48 (~2 hours of 8XH100 GPU node)». É um modelo de demonstração, não um modelo de produção *(interpretação)*. Ver [Construir um LLM do zero](construir-um-llm-do-zero.md).
- Hardware para servir: só carregar os pesos de um modelo de 80B em float16 pede «148.56 GB», e a inferência acrescenta até 20%. Ver [Memória e hardware](memoria-e-hardware.md) e [Servir um modelo próprio](servir-um-modelo-proprio.md).
- Licença do modelo de base: cada família tem a sua, e algumas não são open source pela definição da OSI. Ver [Famílias de modelos abertos e licenças](../modelos-abertos/familias-de-modelos-abertos-e-licencas.md).
- Obrigações legais: quem modifica um modelo com mais de um terço do compute de treino original passa a fornecedor de um modelo de finalidade geral no AI Act. Ver [Obrigações do AI Act para modelos próprios](obrigacoes-do-ai-act-para-modelos-proprios.md).
- Equipa: o caminho de adaptar pede quem prepare dados e avalie resultados; o de treinar de raiz pede também quem gira treino distribuído em várias GPUs *(interpretação)*.

**Para uma skill:** um plano que propõe um modelo próprio regista o caminho escolhido (API, adaptar ou treinar), porque não serve o mais barato, a licença do modelo de base e se o projeto passa a ser fornecedor no AI Act.

## Ver também

- [Adotar antes de construir](../../plataformas/adotar-antes-de-construir.md) (Plataformas para adotar antes de construir)
- [Inventário de dependências por jurisdição](../../soberania/inventario-de-dependencias-por-jurisdicao.md) (Soberania digital)
- [Fine-tuning do Claude](fine-tuning-do-claude.md) (Construir com IA)

Fonte: síntese das entradas desta pasta, cada uma com as suas fontes oficiais; consultadas a 2026-11-10. Não vem do PDF.

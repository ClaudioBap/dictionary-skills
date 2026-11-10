---
id: ia/modelos-proprios/servir-um-modelo-proprio
titulo: "Servir um modelo próprio"
seccao: "Construir com IA"
paginas: []
fonte: "Documentação e repositórios oficiais de cada projeto, ligados em cada ponto; consultados a 2026-11-10. Não vem do PDF."
data_lancamento: null
confianca: media
verificado_em: 2026-11-10
---

# Servir um modelo próprio

**Resumo:** Para servir em escala, o vLLM com API compatível com a da OpenAI e a da Anthropic; para correr em local ou em CPU, o llama.cpp ou o Ollama; o TGI da Hugging Face está em modo de manutenção.

## Conteúdo

- vLLM: «a fast and easy-to-use library for LLM inference and serving», com «OpenAI-compatible API server, plus Anthropic Messages API and gRPC support». Suporta GPUs NVIDIA e AMD e CPUs x86, ARM e PowerPC. Os requisitos mínimos de GPU não estão na página lida. Fonte: [vLLM](https://docs.vllm.ai)
- llama.cpp (licença MIT): «Plain C/C++ implementation without any dependencies», otimizado para Apple silicon, com kernels CUDA para NVIDIA e suporte de AMD, Vulkan e SYCL, e «1.5-bit, 2-bit, 3-bit, 4-bit, 5-bit, 6-bit, and 8-bit integer quantization for faster inference and reduced memory use». Fonte: [ggml-org/llama.cpp](https://github.com/ggml-org/llama.cpp)
- Ollama (licença MIT): corre modelos em local com um comando, por exemplo `ollama run gemma4`. A página lida não indica a memória necessária por tamanho de modelo. Fonte: [ollama/ollama](https://github.com/ollama/ollama)
- Text Generation Inference: «text-generation-inference is now in maintenance mode», e a própria documentação recomenda o vLLM e o SGLang, ou motores locais como o llama.cpp e o MLX. Fonte: [TGI](https://huggingface.co/docs/text-generation-inference)

**Para uma skill:** um projeto novo que serve um modelo próprio não começa com o TGI; o plano escolhe o motor (vLLM, llama.cpp ou Ollama) pelo hardware disponível e regista a licença.

## Ver também

- [Memória e hardware](memoria-e-hardware.md) (Construir com IA)
- [Famílias de modelos abertos e licenças](../modelos-abertos/familias-de-modelos-abertos-e-licencas.md) (Construir com IA)
- [Inventário de dependências por jurisdição](../../soberania/inventario-de-dependencias-por-jurisdicao.md) (Soberania digital)

Fonte: documentação e repositórios oficiais de cada projeto, ligados em cada ponto; consultados a 2026-11-10. Não vem do PDF.

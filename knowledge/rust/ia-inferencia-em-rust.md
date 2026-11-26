---
id: rust/ia-inferencia-em-rust
titulo: "Servir modelos de IA em Rust"
seccao: "Boas práticas de Rust"
paginas: []
fonte: "Repositórios oficiais do candle, burn, mistral.rs, ort e llama.cpp, e o registo crates.io, ligados em cada ponto; consultados a 2026-11-26. Não vem do PDF."
verificado_em: 2026-11-26
editado_em: 2026-11-26
---

# Servir modelos de IA em Rust

**Resumo:** Para correr um modelo sem Python há o candle (Hugging Face), o burn (Tracel), o mistral.rs (com um servidor compatível com a API da OpenAI) e o ort (ONNX Runtime, ainda em versão candidata). O Rust compensa quando se quer um binário leve, sem Python, para serverless, edge ou o browser (WASM).

## Conteúdo

- **candle** (Hugging Face, Apache-2.0 ou MIT): o objetivo declarado é tornar possível a inferência serverless, com binários leves e sem Python em produção (nem o GIL). Corre em CPU, CUDA (várias GPUs com NCCL) e no browser com WASM; lê safetensors, npz, ggml e pesos do PyTorch, GGUF nos exemplos quantizados e ONNX pelo `candle-onnx`. O `candle-core` 0.11.1 é de 2026-10-31. Fontes: [candle](https://github.com/huggingface/candle), [crates.io](https://crates.io/crates/candle-core)
- **burn** (Tracel, MIT ou Apache-2.0): o mesmo código treina e corre em produção, em CUDA, ROCm, Metal, Vulkan, WebGPU e CPU, também em WASM; importa ONNX (só parte dos operadores) e pesos do PyTorch e safetensors. O backend LibTorch saiu na 0.22.0; a estável é a 0.22.1 (2026-10-20). Fonte: [burn](https://github.com/tracel-ai/burn)
- **mistral.rs** (Eric Buehler, numa conta pessoal; MIT): CPU, CUDA e Metal, modelos GGUF e UQFF, e `mistralrs serve` com endpoints `/v1` compatíveis com a API da OpenAI; tem também ligações para Python. A v0.9.5 é de 2026-10-19 no GitHub, mas o crates.io ainda tem a 0.8.1. Fonte: [mistral.rs](https://github.com/EricLBuehler/mistral.rs)
- **ort** (comunidade pyke, Apache-2.0 ou MIT): ligações ao ONNX Runtime da Microsoft, mas não é da Microsoft. Está na 2.0.0-rc.15 (2026-10-19), sem versão 2.0 estável. Fonte: [ort](https://github.com/pykeio/ort). A lista de aceleradores fica por confirmar (a documentação recusou o acesso automático).
- **llama.cpp**: não tem ligações oficiais para Rust; o crate `llama-cpp-2` é de terceiros. Fontes: [llama.cpp](https://github.com/ggml-org/llama.cpp), [llama-cpp-2](https://crates.io/crates/llama-cpp-2). Confiança: media.

**Para uma skill:** a proposta de servir um modelo em Rust diz porque não chega o Python (um binário só, sem runtime Python, edge ou WASM), escolhe a biblioteca pelo formato do modelo e pelo hardware alvo, fixa a versão no `Cargo.toml` (e evita versões candidatas em produção) e prova com uma inferência no hardware alvo, com o tempo e a memória medidos.

## Ver também

- [Servir um modelo próprio](../ia/modelos-proprios/servir-um-modelo-proprio.md) (Construir com IA)
- [Memória e hardware](../ia/modelos-proprios/memoria-e-hardware.md) (Construir com IA)
- [Rust por baixo de Python (PyO3 e maturin)](ia-rust-a-acelerar-python.md) (Boas práticas de Rust)

Fonte: Repositórios oficiais do candle, burn, mistral.rs, ort e llama.cpp, e o registo crates.io, ligados em cada ponto; consultados a 2026-11-26. Não vem do PDF.

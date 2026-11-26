---
id: rust/ia-chamar-llms-e-mcp-em-rust
titulo: "Chamar modelos e servir MCP a partir de Rust"
seccao: "Boas práticas de Rust"
paginas: []
fonte: "Listas oficiais de SDKs da Anthropic e da OpenAI, documentação e repositório oficiais do MCP, e o registo crates.io, ligados em cada ponto; consultados a 2026-11-26. Não vem do PDF."
verificado_em: 2026-11-26
editado_em: 2026-11-26
---

# Chamar modelos e servir MCP a partir de Rust

**Resumo:** Nem a Anthropic nem a OpenAI têm um SDK oficial em Rust: chama-se a API por HTTP ou usa-se um crate de terceiros, sabendo que o é. Para o MCP há SDK oficial em Rust, o `rmcp`, de nível 1.

## Conteúdo

- A Anthropic tem SDKs oficiais em Python, TypeScript, C#, Go, Java, PHP e Ruby, além da CLI `ant`; não em Rust. Fonte: [SDKs da Anthropic](https://platform.claude.com/docs/en/cli-sdks-libraries/overview)
- A OpenAI tem SDKs oficiais em TypeScript, Python, .NET, Java, Go e Ruby; o Rust aparece só nas bibliotecas da comunidade (`async-openai`), que a OpenAI diz não verificar. Fonte: [bibliotecas da OpenAI](https://developers.openai.com/api/docs/libraries)
- Em Rust, chama-se a API por HTTP (por exemplo com `reqwest` e `serde`) ou usa-se um crate de terceiros, como o `async-openai` ou o `rig`. Fontes: [async-openai](https://crates.io/crates/async-openai), [rig-core](https://crates.io/crates/rig-core). Confiança: media (crates de terceiros, lidos só no registo).
- MCP: o `rmcp` (`modelcontextprotocol/rust-sdk`) é o SDK oficial em Rust, sobre o Tokio, e a documentação do MCP põe-no no nível 1. Implementa a especificação 2026-07-28 e continua compatível com a 2025-11-25; a 3.12.0 é de 2026-11-26. Fontes: [SDKs do MCP](https://modelcontextprotocol.io/docs/sdk), [rust-sdk](https://github.com/modelcontextprotocol/rust-sdk)

**Para uma skill:** um serviço em Rust que chama o Claude usa a API HTTP como diz a base em `knowledge/ia/api-claude/`, com a chave numa variável de ambiente; um crate de terceiros só entra com a licença e a última versão confirmadas e dito como tal no relatório; um servidor MCP em Rust usa o `rmcp`.

## Ver também

- [MCP (Model Context Protocol)](../ia/mcp-model-context-protocol.md) (Construir com IA)
- [Tool use (ferramentas e function calling)](../ia/tool-use.md) (Construir com IA)
- [Segurança em Rust](seguranca-em-rust.md) (Boas práticas de Rust)

Fonte: Listas oficiais de SDKs da Anthropic e da OpenAI, documentação e repositório oficiais do MCP, e o registo crates.io, ligados em cada ponto; consultados a 2026-11-26. Não vem do PDF.

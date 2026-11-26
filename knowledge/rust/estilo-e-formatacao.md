---
id: rust/estilo-e-formatacao
titulo: "Estilo e formatação"
seccao: "Boas práticas de Rust"
paginas: []
fonte: "rustfmt, Clippy, Cargo Book e Rust API Guidelines, ligados em cada ponto; consultados a 2026-11-26. Não vem do PDF."
verificado_em: 2026-11-26
editado_em: 2026-11-26
---

# Estilo e formatação

**Resumo:** O código formata-se com `cargo fmt` e revê-se com o Clippy, os dois no CI com os avisos a parar a compilação; os lints do projeto ficam em `[lints]` no `Cargo.toml`, e os nomes seguem o RFC 430 (UpperCamelCase para tipos e traits, snake_case para valores e funções).

## Conteúdo

- `cargo fmt` formata o projeto inteiro; com `--check`, só verifica, para usar no CI. Fonte: [rustfmt](https://github.com/rust-lang/rustfmt)
- O Clippy tem mais de 800 lints, em grupos: `correctness` dá erro; `suspicious`, `style`, `complexity` e `perf` dão aviso; `pedantic`, `restriction`, `nursery` e `cargo` estão desligados. O grupo `restriction` não se liga de uma vez: escolhe-se lint a lint. Fonte: [Clippy](https://doc.rust-lang.org/clippy/)
- No CI, os avisos param a compilação com `cargo clippy -- -D warnings`, ou com `[build] warnings = "deny"` em `.cargo/config.toml`. Fonte: [usar o Clippy](https://doc.rust-lang.org/clippy/usage.html)
- `[lints]` no `Cargo.toml`, com as tabelas `[lints.rust]`, `[lints.clippy]` e `[lints.cargo]` e os níveis `forbid`, `deny`, `warn` e `allow`, aplica-se só ao pacote, não às dependências (desde o Cargo 1.74). Fonte: [manifesto](https://doc.rust-lang.org/cargo/reference/manifest.html)
- Nomes, pelo RFC 430: UpperCamelCase para tipos e traits, snake_case para módulos, funções e variáveis. Fonte: [API Guidelines, nomes](https://rust-lang.github.io/api-guidelines/naming.html)

**Para uma skill:** `cargo fmt --check` e `cargo clippy -- -D warnings` terminam sem erros depois da alteração, com os lints que o projeto declara em `[lints]`; o código novo segue os nomes do RFC 430.

## Ver também

- [Toolchain, edições e dependências](toolchain-edicoes-e-dependencias.md) (Boas práticas de Rust)
- [Estrutura de projeto, crates e workspaces](estrutura-de-projeto-crates-e-workspaces.md) (Boas práticas de Rust)

Fonte: rustfmt, Clippy, Cargo Book e Rust API Guidelines, ligados em cada ponto; consultados a 2026-11-26. Não vem do PDF.

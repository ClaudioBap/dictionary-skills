---
id: rust/seguranca-em-rust
titulo: "Segurança em Rust"
seccao: "Boas práticas de Rust"
paginas: []
fonte: "Rustonomicon, Clippy, The Book, RustSec, Cargo Book e Rust Blog, ligados em cada ponto; consultados a 2026-11-26. Não vem do PDF."
verificado_em: 2026-11-26
editado_em: 2026-11-26
---

# Segurança em Rust

**Resumo:** O Rust seguro não causa comportamento indefinido; o `unsafe` passa essa garantia para quem escreve, por isso cada bloco leva um `// SAFETY:` com a razão. O overflow de inteiros não dá erro em `release`, e as dependências auditam-se com o `cargo audit` contra a base do RustSec.

## Conteúdo

### unsafe

- O `unsafe` declara um contrato que o compilador não verifica; num bloco, declara que quem escreveu o verificou. O Rust seguro não pode causar comportamento indefinido. Fonte: [Rustonomicon](https://doc.rust-lang.org/nomicon/safe-unsafe-meaning.html)
- O lint `clippy::undocumented_unsafe_blocks` exige um comentário `// SAFETY:` antes de cada bloco ou `impl` `unsafe`; é do grupo `restriction` e liga-se em `[lints.clippy]`. Fonte: [Clippy](https://github.com/rust-lang/rust-clippy/blob/master/clippy_lints/src/undocumented_unsafe_blocks.rs)

### Aritmética e pânicos

- Em debug, o overflow de inteiros dá pânico; em `release` dá a volta (complemento para dois), e depender disso é um erro. Para dados de fora usam-se `checked_*`, `wrapping_*`, `saturating_*` ou `overflowing_*`. Fonte: [The Book, tipos de dados](https://doc.rust-lang.org/book/ch03-02-data-types.html)
- Um pânico provocado por dados de fora derruba o pedido ou o processo: num serviço, é uma negação de serviço. *(interpretação)*

### Dependências e compilação

- O RustSec é a base de avisos de segurança dos crates publicados no crates.io, mantida pelo Rust Secure Code Working Group; o `cargo audit` procura no `Cargo.lock` os crates com avisos. Fonte: [RustSec](https://rustsec.org/)
- O `cargo-deny` (da Embark Studios, fora da rust-lang) verifica avisos, crates proibidos, licenças e origens das dependências. Fonte: [cargo-deny](https://github.com/EmbarkStudios/cargo-deny)
- O `min-publish-age` (desde a 1.100.0) faz o Cargo ignorar as versões publicadas há menos tempo do que o definido, que é quando as versões maliciosas costumam ser apanhadas. Fonte: [Rust 1.100.0](https://blog.rust-lang.org/2026/11/12/Rust-1.100.0/)
- O `build.rs` compila-se e corre antes do pacote e deve escrever só em `OUT_DIR`. Fonte: [build scripts](https://doc.rust-lang.org/cargo/reference/build-scripts.html). Corre com as permissões de quem compila, tal como as macros procedimentais: uma dependência nova é código que corre na máquina de quem compila. *(interpretação)*

**Para uma skill:** cada `unsafe` novo leva `// SAFETY:` com a razão (e o projeto liga `clippy::undocumented_unsafe_blocks` se ainda não o tiver); a aritmética sobre dados de fora usa `checked_*` ou `saturating_*`; nenhum caminho com dados de fora faz `unwrap` ou `panic!`; e `cargo audit` termina sem avisos por resolver depois de uma dependência nova.

## Ver também

- [Toolchain, edições e dependências](toolchain-edicoes-e-dependencias.md) (Boas práticas de Rust)
- [Erros com Result, ? e panic](erros-result-e-panic.md) (Boas práticas de Rust)

Fonte: Rustonomicon, Clippy, The Book, RustSec, Cargo Book e Rust Blog, ligados em cada ponto; consultados a 2026-11-26. Não vem do PDF.

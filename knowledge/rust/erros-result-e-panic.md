---
id: rust/erros-result-e-panic
titulo: "Erros com Result, ? e panic"
seccao: "Boas práticas de Rust"
paginas: []
fonte: "The Book, Rust API Guidelines e Clippy, ligados em cada ponto; consultados a 2026-11-26. Não vem do PDF."
verificado_em: 2026-11-26
editado_em: 2026-11-26
---

# Erros com Result, ? e panic

**Resumo:** Uma função que pode falhar devolve `Result` e quem chama decide o que fazer; `panic!` fica para os bugs e para os estados que nunca deviam acontecer; `unwrap` e `expect` servem em exemplos, protótipos e testes; e os tipos de erro públicos implementam `std::error::Error`.

## Conteúdo

- Por omissão, devolve-se `Result`, para quem chama decidir; `panic!` é para estados inválidos, contratos violados e situações em que continuar seria inseguro. Fonte: [The Book, panic ou não](https://doc.rust-lang.org/book/ch09-03-to-panic-or-not-to-panic.html)
- `unwrap` e `expect` aceitam-se em exemplos, protótipos e testes; fora disso, usa-se `expect` com a razão escrita quando se sabe que o erro não pode acontecer. Fonte: [The Book, panic ou não](https://doc.rust-lang.org/book/ch09-03-to-panic-or-not-to-panic.html)
- O sistema de tipos evita verificações repetidas: um tipo com o campo privado e um construtor que valida garante que o valor é sempre válido. Fonte: [The Book, panic ou não](https://doc.rust-lang.org/book/ch09-03-to-panic-or-not-to-panic.html)
- Os tipos de erro de uma biblioteca implementam `std::error::Error` e, para poderem passar entre threads, `Send + Sync`. Fonte: [API Guidelines, interoperabilidade](https://rust-lang.github.io/api-guidelines/interoperability.html)
- Para proibir o `unwrap` num projeto, há o lint `clippy::unwrap_used`, do grupo `restriction` (desligado por omissão), que se liga em `[lints.clippy]`. Fonte: [Clippy](https://doc.rust-lang.org/clippy/)

**Para uma skill:** o código novo que trata dados de fora (ficheiros, rede, entrada do utilizador) propaga os erros com `Result` e `?`, sem `unwrap` nem `panic!` nesses caminhos; um `expect` novo leva a razão na mensagem; e um tipo de erro público implementa `std::error::Error`.

## Ver também

- [Segurança em Rust](seguranca-em-rust.md) (Boas práticas de Rust)
- [Testes](testes.md) (Boas práticas de Rust)

Fonte: The Book, Rust API Guidelines e Clippy, ligados em cada ponto; consultados a 2026-11-26. Não vem do PDF.

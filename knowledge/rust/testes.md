---
id: rust/testes
titulo: "Testes"
seccao: "Boas práticas de Rust"
paginas: []
fonte: "The Book, ligado em cada ponto; consultado a 2026-11-26. Não vem do PDF."
verificado_em: 2026-11-26
editado_em: 2026-11-26
---

# Testes

**Resumo:** Os testes unitários ficam no próprio ficheiro, num módulo `#[cfg(test)]`; os de integração em `tests/`, onde cada ficheiro é um crate; e os exemplos da documentação também correm. Tudo corre com `cargo test`.

## Conteúdo

- Testes unitários em `src/`, num módulo `tests` com `#[cfg(test)]`, que só compila nos testes e pode testar funções privadas. Fonte: [The Book, organização dos testes](https://doc.rust-lang.org/book/ch11-03-test-organization.html)
- Testes de integração em `tests/`: cada ficheiro é um crate à parte que só vê a API pública; o código comum vai para `tests/common/mod.rs`. Fonte: [The Book, organização dos testes](https://doc.rust-lang.org/book/ch11-03-test-organization.html)
- O `cargo test` corre os testes unitários, os de integração e os exemplos da documentação, por esta ordem. Fonte: [The Book, organização dos testes](https://doc.rust-lang.org/book/ch11-03-test-organization.html)

**Para uma skill:** a alteração traz um teste unitário no módulo que mudou, ou um teste de integração em `tests/` se muda o comportamento visto de fora, incluindo o caso de erro; e `cargo test` passa.

## Ver também

- [Estrutura de projeto, crates e workspaces](estrutura-de-projeto-crates-e-workspaces.md) (Boas práticas de Rust)
- [Erros com Result, ? e panic](erros-result-e-panic.md) (Boas práticas de Rust)

Fonte: The Book, ligado em cada ponto; consultado a 2026-11-26. Não vem do PDF.

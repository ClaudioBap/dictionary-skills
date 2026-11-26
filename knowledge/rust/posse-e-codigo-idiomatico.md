---
id: rust/posse-e-codigo-idiomatico
titulo: "Posse, empréstimos e desempenho"
seccao: "Boas práticas de Rust"
paginas: []
fonte: "The Book e Cargo Book, ligados em cada ponto; consultados a 2026-11-26. Não vem do PDF."
verificado_em: 2026-11-26
editado_em: 2026-11-26
---

# Posse, empréstimos e desempenho

**Resumo:** Cada valor tem um dono e é libertado quando o dono sai de âmbito; para usar um valor sem ficar com ele, empresta-se uma referência, em vez de o copiar com `clone`. O desempenho mede-se no perfil `release`, que já otimiza ao máximo mas não verifica o overflow de inteiros.

## Conteúdo

- As regras da posse: cada valor tem um dono, só um de cada vez, e é libertado quando o dono sai de âmbito; uma referência empresta o valor sem tirar a posse. Fonte: [The Book, posse](https://doc.rust-lang.org/book/ch04-00-understanding-ownership.html)
- `clone` copia também os dados no heap e pode sair caro; quando basta ler, empresta-se uma referência. Fonte: [The Book, posse](https://doc.rust-lang.org/book/ch04-01-what-is-ownership.html)
- O perfil `release` tem por omissão `opt-level = 3`, `overflow-checks = false`, `debug-assertions = false`, `lto = false`, `codegen-units = 16` e `panic = "unwind"`. Fonte: [perfis](https://doc.rust-lang.org/cargo/reference/profiles.html)
- Mede-se com `--release` antes de otimizar; as medições em debug não dizem nada sobre o desempenho em produção. *(interpretação)*

**Para uma skill:** o código novo não acrescenta `clone` onde uma referência chega; uma otimização só entra com a medição antes e depois, feita em `--release`; e se o projeto muda o perfil `release`, o relatório diz o que mudou e porquê.

## Ver também

- [Segurança em Rust](seguranca-em-rust.md) (Boas práticas de Rust), pelo overflow em `release`
- [Concorrência e código assíncrono](concorrencia-e-assincrono.md) (Boas práticas de Rust)

Fonte: The Book e Cargo Book, ligados em cada ponto; consultados a 2026-11-26. Não vem do PDF.

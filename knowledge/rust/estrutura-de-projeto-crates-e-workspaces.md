---
id: rust/estrutura-de-projeto-crates-e-workspaces
titulo: "Estrutura de projeto, crates e workspaces"
seccao: "Boas práticas de Rust"
paginas: []
fonte: "The Book, Cargo Book e Rust API Guidelines, ligados em cada ponto; consultados a 2026-11-26. Não vem do PDF."
verificado_em: 2026-11-26
editado_em: 2026-11-26
---

# Estrutura de projeto, crates e workspaces

**Resumo:** Num binário, a lógica fica em `src/lib.rs` e o `main.rs` só a chama, para se poder testar; vários crates juntam-se num workspace com um só `Cargo.lock`; as features só acrescentam funcionalidade; e uma biblioteca pública passa pela lista das API Guidelines.

## Conteúdo

- Num crate binário, a lógica vai para `src/lib.rs` e o `src/main.rs` fica pequeno, porque os testes de integração só usam a biblioteca. Fonte: [The Book, organização dos testes](https://doc.rust-lang.org/book/ch11-03-test-organization.html)
- Num workspace, todos os pacotes partilham o mesmo `Cargo.lock`, na raiz, e a mesma pasta de saída. Fonte: [workspaces](https://doc.rust-lang.org/cargo/reference/workspaces.html)
- As features são aditivas: ligar uma não pode desligar funcionalidade, e qualquer combinação tem de compilar e funcionar. Fonte: [features](https://doc.rust-lang.org/cargo/reference/features.html)
- Uma biblioteca para outros usarem passa pela lista das API Guidelines, em 11 grupos: nomes, interoperabilidade, macros, documentação, previsibilidade, flexibilidade, segurança de tipos, fiabilidade, depuração, preparação para o futuro e o essencial. Fonte: [API Guidelines, lista](https://rust-lang.github.io/api-guidelines/checklist.html)

**Para uma skill:** num binário, o código novo vai para a biblioteca e não para o `main.rs`; uma feature nova não muda o que já existe quando está desligada; e numa biblioteca pública a alteração respeita a lista das API Guidelines nos pontos que toca.

## Ver também

- [Testes](testes.md) (Boas práticas de Rust)
- [Erros com Result, ? e panic](erros-result-e-panic.md) (Boas práticas de Rust)

Fonte: The Book, Cargo Book e Rust API Guidelines, ligados em cada ponto; consultados a 2026-11-26. Não vem do PDF.

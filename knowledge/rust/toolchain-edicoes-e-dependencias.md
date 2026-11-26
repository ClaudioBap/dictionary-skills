---
id: rust/toolchain-edicoes-e-dependencias
titulo: "Toolchain, edições e dependências"
seccao: "Boas práticas de Rust"
paginas: []
fonte: "Rust Blog, The Book, Cargo Book, Edition Guide e rustup, ligados em cada ponto; consultados a 2026-11-26. Não vem do PDF."
verificado_em: 2026-11-26
editado_em: 2026-11-26
---

# Toolchain, edições e dependências

**Resumo:** Sai uma versão estável do Rust a cada 6 semanas (a 1.100.0 a 2026-11-12) e a edição atual é a 2024. O projeto fixa o toolchain em `rust-toolchain.toml`, declara o `rust-version` mínimo, guarda o `Cargo.lock` no controlo de versões e muda de edição com `cargo fix --edition`.

## Conteúdo

### Versões e edições

- Há três canais (stable, beta e nightly) e sai uma versão estável a cada seis semanas. Fonte: [The Book, apêndice G](https://doc.rust-lang.org/book/appendix-07-nightly-rust.html)
- A versão estável é a 1.100.0, de 2026-11-12. No Cargo, passa a avisar das dependências que não se usam e estabiliza o `min-publish-age`: com `[registry] global-min-publish-age = "3 days"` em `.cargo/config.toml`, o Cargo ignora as versões publicadas há menos tempo do que isso, porque as versões maliciosas costumam ser apanhadas nas primeiras horas ou dias. Fonte: [Rust 1.100.0](https://blog.rust-lang.org/2026/11/12/Rust-1.100.0/)
- A edição 2024 estabilizou-se na 1.85.0 (2025-02-20); o `cargo new` cria projetos com ela e, sem o campo `edition`, o Cargo assume a 2015. Fontes: [Edition Guide](https://doc.rust-lang.org/edition-guide/rust-2024/index.html), [manifesto](https://doc.rust-lang.org/cargo/reference/manifest.html)
- Para mudar de edição: `cargo update`, `cargo fix --edition`, pôr a edição nova em `edition` no `Cargo.toml`, `cargo build` ou `cargo test` para confirmar, e `cargo fmt`. Fonte: [Edition Guide](https://doc.rust-lang.org/edition-guide/editions/transitioning-an-existing-project-to-a-new-edition.html)

### Toolchain e versão mínima

- `rust-toolchain.toml`, na secção `[toolchain]`, fixa o `channel`, os `components`, os `targets` e o `profile`; manda sobre a predefinição, mas não sobre `+toolchain`, `RUSTUP_TOOLCHAIN` nem `rustup override`. Fonte: [rustup](https://rust-lang.github.io/rustup/overrides.html)
- `rust-version` no `Cargo.toml` declara a versão mais antiga do Rust suportada (um número, sem operadores); com um toolchain mais antigo o Cargo dá erro. O Cargo Book pede uma política escrita para essa versão mínima. Fonte: [rust-version](https://doc.rust-lang.org/cargo/reference/rust-version.html)
- O resolver 3, por omissão na edição 2024 (exige o Rust 1.84 ou superior), prefere versões das dependências compatíveis com o `rust-version`. Num workspace virtual, o resolver declara-se em `[workspace]`. Fonte: [resolver](https://doc.rust-lang.org/cargo/reference/resolver.html)

### Dependências

- O `Cargo.lock` tem as versões exatas e não se edita à mão; em caso de dúvida, vai para o controlo de versões. Fonte: [Cargo.toml e Cargo.lock](https://doc.rust-lang.org/cargo/guide/cargo-toml-vs-cargo-lock.html)
- `cargo update` reavalia as dependências dentro do que o `Cargo.toml` permite e reescreve o `Cargo.lock`; `cargo update <pacote>` mexe só nesse. Fonte: [Cargo.toml e Cargo.lock](https://doc.rust-lang.org/cargo/guide/cargo-toml-vs-cargo-lock.html)

**Para uma skill:** o projeto tem `edition` e `rust-version` no `Cargo.toml`, o `Cargo.lock` no repositório e, se a equipa precisa da mesma versão, um `rust-toolchain.toml`; uma dependência nova entra com `cargo add` e o `Cargo.lock` atualizado no mesmo commit.

## Ver também

- [Segurança em Rust](seguranca-em-rust.md) (Boas práticas de Rust)
- [Estilo e formatação](estilo-e-formatacao.md) (Boas práticas de Rust)

Fonte: Rust Blog, The Book, Cargo Book, Edition Guide e rustup, ligados em cada ponto; consultados a 2026-11-26. Não vem do PDF.

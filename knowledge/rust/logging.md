---
id: rust/logging
titulo: "Logging"
seccao: "Boas práticas de Rust"
paginas: []
fonte: "Repositórios e documentação oficiais do log (rust-lang) e do tracing (tokio-rs), ligados em cada ponto; consultados a 2026-11-26. Não vem do PDF."
verificado_em: 2026-11-26
editado_em: 2026-11-26
---

# Logging

**Resumo:** O crate `log`, da própria rust-lang, é a fachada simples; o `tracing`, do projeto Tokio, junta eventos estruturados e spans e não obriga a usar o runtime. As bibliotecas emitem e a aplicação escolhe onde os registos vão parar, sem segredos nem dados pessoais.

## Conteúdo

- `log` é uma fachada de logging mantida pela rust-lang: a biblioteca emite e a aplicação escolhe a implementação. Licenças Apache-2.0 e MIT. Fonte: [log](https://github.com/rust-lang/log)
- `tracing` é mantido pelo projeto Tokio e funciona sem o runtime Tokio; regista eventos e spans estruturados. O `tracing-log` liga-o ao `log`, e as bibliotecas não devem ligar a feature `log-always`. Fontes: [tracing](https://github.com/tokio-rs/tracing), [documentação](https://docs.rs/tracing/latest/tracing/)
- Os registos não levam segredos, tokens nem dados pessoais. *(regra comum às linguagens da base)*

**Para uma skill:** o código novo regista com o `log` ou o `tracing` que o projeto já usa (nunca com `println!` em código de produção), em campos estruturados, e sem segredos nem dados pessoais; uma biblioteca não escolhe a implementação do logging.

## Ver também

- [Segurança em Rust](seguranca-em-rust.md) (Boas práticas de Rust)

Fonte: Repositórios e documentação oficiais do log (rust-lang) e do tracing (tokio-rs), ligados em cada ponto; consultados a 2026-11-26. Não vem do PDF.

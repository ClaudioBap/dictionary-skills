---
id: rust/concorrencia-e-assincrono
titulo: "Concorrência e código assíncrono"
seccao: "Boas práticas de Rust"
paginas: []
fonte: "The Book, Rustonomicon, Async Book e documentação oficial do Tokio, ligados em cada ponto; consultados a 2026-11-26. Não vem do PDF."
verificado_em: 2026-11-26
editado_em: 2026-11-26
---

# Concorrência e código assíncrono

**Resumo:** O compilador só deixa passar dados entre threads quando os tipos são `Send` e `Sync`; o estado partilhado vai em `Arc<Mutex<T>>`. No código assíncrono, o Tokio é o runtime de referência, e o trabalho que bloqueia sai do runtime com `spawn_blocking` (curto), uma thread própria (longo) ou o rayon (CPU).

## Conteúdo

- `Send` e `Sync` são traits que o compilador deriva sozinho quando os tipos o permitem; implementá-las à mão é `unsafe`. Fonte: [Rustonomicon, Send e Sync](https://doc.rust-lang.org/nomicon/send-and-sync.html)
- Para estado partilhado entre threads, `Arc<Mutex<T>>`; para passar mensagens, canais. Fonte: [The Book, concorrência](https://doc.rust-lang.org/book/ch16-00-concurrency.html)
- O Async Book está a ser reescrito e diz que falta muita coisa; os exemplos usam o Tokio. Fonte: [Async Book](https://rust-lang.github.io/async-book/)
- `spawn_blocking` é para trabalho bloqueante curto; para trabalho longo, `thread::spawn`; para cálculo pesado, um executor de CPU como o rayon. Uma tarefa de `spawn_blocking` não se cancela depois de começar, e o encerramento do runtime espera por ela. Fonte: [Tokio, spawn_blocking](https://docs.rs/tokio/latest/tokio/task/fn.spawn_blocking.html)

**Para uma skill:** nenhuma chamada que bloqueia (I/O síncrono, `std::thread::sleep`, cálculo pesado) corre diretamente dentro de uma função `async`; vai para `spawn_blocking`, para uma thread própria ou para o rayon; e um `impl Send` ou `impl Sync` manual leva um comentário `// SAFETY:` com a razão.

## Ver também

- [Segurança em Rust](seguranca-em-rust.md) (Boas práticas de Rust)
- [Posse, empréstimos e desempenho](posse-e-codigo-idiomatico.md) (Boas práticas de Rust)

Fonte: The Book, Rustonomicon, Async Book e documentação oficial do Tokio, ligados em cada ponto; consultados a 2026-11-26. Não vem do PDF.

---
id: rust/ia-rust-a-acelerar-python
titulo: "Rust por baixo de Python (PyO3 e maturin)"
seccao: "Boas práticas de Rust"
paginas: []
fonte: "Documentação e repositórios oficiais do PyO3, maturin, tokenizers, safetensors, pydantic e polars, ligados em cada ponto; consultados a 2026-11-26. Não vem do PDF."
verificado_em: 2026-11-26
editado_em: 2026-11-26
---

# Rust por baixo de Python (PyO3 e maturin)

**Resumo:** Boa parte das bibliotecas de IA e dados que se usam em Python tem o núcleo em Rust (tokenizers, safetensors, pydantic-core, polars). O PyO3 liga o Rust ao Python e o maturin compila e publica as wheels; passa-se uma parte para Rust só depois de medir que é ali que o Python é lento.

## Conteúdo

- **PyO3** (Apache-2.0 ou MIT): ligações entre Rust e Python, com `#[pyfunction]` e `#[pymodule]`. A 0.30.1 é de 2026-10-14 e exige o Rust 1.85 ou superior; suporta CPython 3.9 ou superior, PyPy 7.3 e GraalPy 25.4 ou superior. Fontes: [PyO3](https://pyo3.rs/), [repositório](https://github.com/PyO3/pyo3)
- **maturin** (organização PyO3, Apache-2.0 ou MIT): `maturin new` ou `init` cria o projeto, `maturin develop` instala no ambiente (com `--release` para medir), `maturin build` faz as wheels em `target/wheels` e `maturin sdist` o pacote de código. Em Linux, as wheels precisam da imagem manylinux (2014 ou mais recente) ou de `--zig`; `maturin generate-ci github` cria o CI, e a publicação pode ser por OIDC, sem chave guardada. A 1.16.0 é de 2026-10-29. Fontes: [distribuição](https://www.maturin.rs/distribution.html), [maturin](https://github.com/PyO3/maturin)
- Exemplos com o núcleo em Rust e a interface em Python, pelo PyO3: os tokenizers da Hugging Face (compilados com o maturin; o ramo principal está a ser reescrito), os safetensors (agora em `safetensors/safetensors`), o pydantic-core (dentro de `pydantic/pydantic`) e o polars. Fontes: [tokenizers](https://github.com/huggingface/tokenizers), [safetensors](https://github.com/safetensors/safetensors), [pydantic](https://github.com/pydantic/pydantic), [polars](https://github.com/pola-rs/polars)

**Para uma skill:** uma parte de Python só passa para Rust depois de a `performance-verifier` medir que é ali o tempo; a extensão compila com `maturin build --release`, os testes Python passam com ela instalada, e a medição antes e depois fica no relatório.

## Ver também

- [Servir modelos de IA em Rust](ia-inferencia-em-rust.md) (Boas práticas de Rust)
- [Desempenho e código idiomático](../python/desempenho-e-codigo-idiomatico.md) (Boas práticas de Python)

Fonte: Documentação e repositórios oficiais do PyO3, maturin, tokenizers, safetensors, pydantic e polars, ligados em cada ponto; consultados a 2026-11-26. Não vem do PDF.

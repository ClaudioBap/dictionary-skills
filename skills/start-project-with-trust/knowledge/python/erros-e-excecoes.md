---
id: python/erros-e-excecoes
titulo: "Erros e exceções"
seccao: "Boas práticas de Python"
paginas: [32]
fonte: Dicionario-Boas-Praticas.pdf
verificado_em: 2026-11-03
fontes_oficiais_consultadas_em: 2026-11-04
---

# Erros e exceções

**Resumo:** Apanhar exceções específicas, nunca engolir erros e relançar com contexto.

## Conteúdo

- Apanhar exceções específicas, nunca `except:` nem `except Exception` cego; relançar com contexto (`raise ... from e`).
- Falhar cedo e alto; não engolir erros em silêncio; estilo EAFP (tentar e tratar) onde é idiomático.
- Exceções próprias do domínio para erros esperados; não usar exceções para fluxo normal.

**Para uma skill:** zero `except` genérico que engole o erro; cada exceção apanhada é tratada ou relançada.

## Fontes oficiais

*Ligações externas que apoiam esta entrada, consultadas a 2026-11-04. Não alteram o texto acima.*

- [Errors and Exceptions](https://docs.python.org/3/tutorial/errors.html) — exceções específicas, `raise ... from`, exceções próprias, re-raise
- [Glossary – EAFP](https://docs.python.org/3/glossary.html) — definição do estilo EAFP idiomático em Python

Fonte: pág. 32 (Dicionario-Boas-Praticas.pdf)

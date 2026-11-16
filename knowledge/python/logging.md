---
id: python/logging
titulo: "Logging"
seccao: "Boas práticas de Python"
paginas: [33]
fonte: Dicionario-Boas-Praticas.pdf
verificado_em: 2026-11-03
fontes_oficiais_consultadas_em: 2026-11-04
---

# Logging

**Resumo:** Usar o módulo `logging`, nunca `print`, sem segredos nem dados pessoais.

## Conteúdo

- Usar o módulo `logging`, nunca `print`; níveis (DEBUG/INFO/WARNING/ERROR); logs estruturados com contexto.
- Não registar segredos nem dados pessoais; deixar a configuração do handler para a aplicação.

**Para uma skill:** zero `print` de diagnóstico; segredos nunca vão para o log.

## Fontes oficiais

*Ligações externas que apoiam esta entrada, consultadas a 2026-11-04. Não alteram o texto acima.*

- [Logging HOWTO](https://docs.python.org/3/howto/logging.html) — print vs logging, níveis, bibliotecas só com NullHandler

> **Nota (fonte oficial):** A documentação oficial não trata de segredos/dados pessoais nos logs; esse ponto fica sem fonte oficial.

Fonte: pág. 33 (Dicionario-Boas-Praticas.pdf)

---
id: python/estilo-e-formatacao
titulo: "Estilo e formatação"
seccao: "Boas práticas de Python"
paginas: [31]
fonte: Dicionario-Boas-Praticas.pdf
verificado_em: 2026-11-03
fontes_oficiais_consultadas_em: 2026-11-04
---

# Estilo e formatação

**Resumo:** Seguir a PEP 8 com formatador e linter automáticos no CI e nomes que dizem a intenção.

## Conteúdo

- Seguir a PEP 8; automatizar com um formatador (black/ruff-format) e um linter (ruff/flake8) no CI, para não discutir estilo à mão.
- Nomes: `snake_case` para funções e variáveis, `PascalCase` para classes, `MAIÚSCULAS` para constantes; nomes que dizem a intenção, não o tipo.
- Linhas curtas (88/100), uma instrução por linha; `import` absolutos e ordenados (isort/ruff).

**Para uma skill:** o código passa o formatador e o linter sem avisos antes de entrar.

## Ver também

- [Ferramentas: linters e formatadores](../cicd/ferramentas-linters-e-formatadores.md) (CI/CD e ferramentas)

## Fontes oficiais

*Ligações externas que apoiam esta entrada, consultadas a 2026-11-04. Não alteram o texto acima.*

- [PEP 8 – Style Guide](https://peps.python.org/pep-0008/) — nomes snake_case/CapWords/MAIÚSCULAS, imports absolutos, comprimento de linha
- [Ruff](https://docs.astral.sh/ruff/) — linter e formatador rápido, substituto de Black e isort
- [The Ruff Formatter](https://docs.astral.sh/ruff/formatter/) — formatador compatível com Black; ordenar imports via regras `I`

> **Nota (fonte oficial):** PEP 8 fixa 79 caracteres (72 em docstrings/comentários); 88/100 são configurações de ferramentas, não da PEP.

Fonte: pág. 31 (Dicionario-Boas-Praticas.pdf)

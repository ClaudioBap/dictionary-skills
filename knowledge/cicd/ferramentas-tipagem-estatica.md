---
id: cicd/ferramentas-tipagem-estatica
titulo: "Ferramentas: tipagem estática"
seccao: "CI/CD e ferramentas"
paginas: [48]
fonte: Dicionario-Boas-Praticas.pdf
verificado_em: 2026-11-03
fontes_oficiais_consultadas_em: 2026-11-04
---

# Ferramentas: tipagem estática

**Resumo:** Verificadores de tipos por linguagem, a correr no CI com avisos tratados como erro.

## Conteúdo

- **Python:** `mypy` ou `pyright`. **JS/TS:** `TypeScript` (`tsc`). **Java/C#:** a tipagem é da linguagem; reforçar com nullable (C#) e analisadores.

**Para uma skill:** o verificador de tipos corre no CI e os avisos contam como erro.

## Fontes oficiais

*Ligações externas que apoiam esta entrada, consultadas a 2026-11-04. Não alteram o texto acima.*

- [mypy](https://mypy.readthedocs.io/en/stable/) — Verificador estático de tipos para Python
- [TSConfig: strict](https://www.typescriptlang.org/tsconfig/#strict) — Modo strict ativa verificações de tipos mais fortes no tsc

> **Nota (fonte oficial):** A referência atual do TSConfig indica «strict» com valor por omissão true (antes era false).

Fonte: pág. 48 (Dicionario-Boas-Praticas.pdf)

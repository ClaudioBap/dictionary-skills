---
id: cicd/ferramentas-sast
titulo: "Ferramentas: análise estática de segurança (SAST)"
seccao: "CI/CD e ferramentas"
paginas: [48]
fonte: Dicionario-Boas-Praticas.pdf
verificado_em: 2026-11-03
fontes_oficiais_consultadas_em: 2026-11-04
---

# Ferramentas: análise estática de segurança (SAST)

**Resumo:** Ferramentas SAST que correm a cada PR e apontam padrões perigosos.

## Conteúdo

- `CodeQL` (GitHub), `Semgrep` (regras por padrão), `Bandit` (Python), `SpotBugs` + FindSecBugs (Java).
- Correm sobre o código a cada PR e apontam padrões perigosos (injeção, cripto fraca, etc.).

**Para uma skill:** o PR passa por SAST antes do merge.

## Fontes oficiais

*Ligações externas que apoiam esta entrada, consultadas a 2026-11-04. Não alteram o texto acima.*

- [About code scanning with CodeQL](https://docs.github.com/en/code-security/code-scanning/introduction-to-code-scanning/about-code-scanning-with-codeql) — Motor do GitHub que automatiza verificações de segurança no código
- [Semgrep Docs](https://docs.semgrep.dev/) — Análise estática com regras próprias e scan no CI
- [Bandit](https://bandit.readthedocs.io/en/latest/) — Encontra problemas de segurança comuns em código Python

Fonte: pág. 48 (Dicionario-Boas-Praticas.pdf)

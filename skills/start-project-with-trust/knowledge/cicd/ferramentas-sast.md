---
id: cicd/ferramentas-sast
titulo: "Ferramentas: análise estática de segurança (SAST)"
seccao: "CI/CD e ferramentas"
paginas: [48]
fonte: Dicionario-Boas-Praticas.pdf
verificado_em: 2026-11-03
---

# Ferramentas: análise estática de segurança (SAST)

**Resumo:** Ferramentas SAST que correm a cada PR e apontam padrões perigosos.

## Conteúdo

- `CodeQL` (GitHub), `Semgrep` (regras por padrão), `Bandit` (Python), `SpotBugs` + FindSecBugs (Java).
- Correm sobre o código a cada PR e apontam padrões perigosos (injeção, cripto fraca, etc.).

**Para uma skill:** o PR passa por SAST antes do merge.

Fonte: pág. 48 (Dicionario-Boas-Praticas.pdf)

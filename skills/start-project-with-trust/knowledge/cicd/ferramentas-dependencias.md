---
id: cicd/ferramentas-dependencias
titulo: "Ferramentas: dependências (auditoria e atualização)"
seccao: "CI/CD e ferramentas"
paginas: [49]
fonte: Dicionario-Boas-Praticas.pdf
verificado_em: 2026-11-03
fontes_oficiais_consultadas_em: 2026-11-04
---

# Ferramentas: dependências (auditoria e atualização)

**Resumo:** Auditoria de vulnerabilidades e atualização automática de dependências.

## Conteúdo

- **Auditoria:** `pip-audit` (Python), `npm audit` / `osv-scanner`, `OWASP Dependency-Check` (Java).
- **Atualização automática:** `Dependabot`, `Renovate` (PRs de atualização, auto-merge de patches).

**Para uma skill:** dependências auditadas no CI e atualizadas por bot, com versões fixadas.

## Ver também

- [Cadeia de fornecimento verificada](../seguranca/cadeia-de-fornecimento-verificada.md) (Segurança)

## Fontes oficiais

*Ligações externas que apoiam esta entrada, consultadas a 2026-11-04. Não alteram o texto acima.*

- [pip-audit](https://pypi.org/project/pip-audit/) — Procura vulnerabilidades conhecidas em dependências Python
- [About Dependabot version updates](https://docs.github.com/en/code-security/dependabot/dependabot-version-updates/about-dependabot-version-updates) — PRs automáticos para manter dependências atualizadas
- [Renovate](https://docs.renovatebot.com/) — PRs automáticos de atualização de dependências e lock files

> **Nota (fonte oficial):** A documentação do Dependabot indica que, por omissão, uma nova versão espera três dias antes de ser proposta (as atualizações de segurança não esperam).

Fonte: pág. 49 (Dicionario-Boas-Praticas.pdf)

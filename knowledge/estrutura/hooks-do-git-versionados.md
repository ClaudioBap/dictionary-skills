---
id: estrutura/hooks-do-git-versionados
titulo: "Hooks do git versionados"
seccao: "Estrutura e documentação"
paginas: [43]
fonte: Dicionario-Boas-Praticas.pdf
verificado_em: 2026-11-03
fontes_oficiais_consultadas_em: 2026-11-04
---

# Hooks do git versionados

**Resumo:** Hooks no repositório que correm lint, testes e procura de segredos antes de cada commit.

## Conteúdo

- Hooks no repositório (não só na máquina), para quem clona ter logo o pre-commit: lint, testes rápidos e procura de segredos.
- O mesmo que o CI corre, para apanhar cedo; com uma forma de desligar localmente quando é preciso.

**Para uma skill:** o pre-commit versionado corre lint, testes e gitleaks antes de cada commit.

## Fontes oficiais

*Ligações externas que apoiam esta entrada, consultadas a 2026-11-04. Não alteram o texto acima.*

- [pre-commit](https://pre-commit.com/) — .pre-commit-config.yaml versionado; SKIP para desligar; mesmos hooks no CI
- [githooks](https://git-scm.com/docs/githooks) — pre-commit corre antes do commit; core.hooksPath; contornável com --no-verify
- [Gitleaks](https://github.com/gitleaks/gitleaks) — Hook pre-commit do gitleaks trava commits com segredos

> **Nota (fonte oficial):** O githooks confirma que o pre-commit local é contornável com --no-verify; por isso o mesmo controlo tem de existir no CI.

Fonte: pág. 43 (Dicionario-Boas-Praticas.pdf)

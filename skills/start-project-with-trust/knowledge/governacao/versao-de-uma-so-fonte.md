---
id: governacao/versao-de-uma-so-fonte
titulo: "Versão de uma só fonte"
seccao: "Governação e processo"
paginas: [59]
fonte: Dicionario-Boas-Praticas.pdf
verificado_em: 2026-11-03
fontes_oficiais_consultadas_em: 2026-11-04
---

# Versão de uma só fonte

**Resumo:** A versão vem de um só sítio e o CHANGELOG é gerado dos PRs.

## Conteúdo

- A versão vem de um só sítio (tag git → build → interface e `/health`); sem a repetir à mão em vários ficheiros.
- CHANGELOG gerado dos PRs; versão semântica.

**Para uma skill:** subir de versão toca num sítio só e gera o CHANGELOG.

## Fontes oficiais

*Ligações externas que apoiam esta entrada, consultadas a 2026-11-04. Não alteram o texto acima.*

- [Semantic Versioning 2.0.0](https://semver.org/) — Regras de incremento MAJOR, MINOR, PATCH
- [Conventional Commits 1.0.0](https://www.conventionalcommits.org/en/v1.0.0/) — Gerar CHANGELOG e decidir o incremento de versão automaticamente
- [Automatically generated release notes](https://docs.github.com/en/repositories/releasing-projects-on-github/automatically-generated-release-notes) — Notas de versão geradas a partir dos PRs fundidos

> **Nota (fonte oficial):** O Keep a Changelog (https://keepachangelog.com/en/1.1.0/) diz que usar diffs do log de commits como changelog é «a bad idea», porque o changelog é para humanos. Um CHANGELOG gerado dos PRs deve ser curado, não um despejo automático.

Fonte: pág. 59 (Dicionario-Boas-Praticas.pdf)

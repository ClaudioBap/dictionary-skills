---
id: cicd/estrategia-de-branches-e-ci
titulo: "Estratégia de branches e CI"
seccao: "CI/CD e ferramentas"
paginas: [47]
fonte: Dicionario-Boas-Praticas.pdf
verificado_em: 2026-11-03
fontes_oficiais_consultadas_em: 2026-11-04
---

# Estratégia de branches e CI

**Resumo:** Lotes pequenos e branches de vida curta, com CI verde antes do merge.

## Conteúdo

- Lotes pequenos e integração frequente (trunk-based ou PRs curtos) para o merge ser barato e os conflitos raros.
- Branch de vida curta; o CI corre no PR; «delete branch on merge».

**Para uma skill:** PRs pequenos e frequentes, com CI verde antes do merge.

## Ver também

- [Higiene das branches](../governacao/higiene-das-branches.md) (Governação e processo)

## Fontes oficiais

*Ligações externas que apoiam esta entrada, consultadas a 2026-11-04. Não alteram o texto acima.*

- [Patterns for Managing Source Code Branches](https://martinfowler.com/articles/branching-patterns.html) — Branches de vida curta e integração diária no mainline
- [Automatic deletion of branches](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/configuring-pull-request-merges/managing-the-automatic-deletion-of-branches) — Apagar automaticamente o branch após o merge
- [About protected branches](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-protected-branches/about-protected-branches) — Verificações de estado obrigatórias antes do merge

Fonte: pág. 47 (Dicionario-Boas-Praticas.pdf)

---
id: cicd/seguranca-do-pipeline
titulo: "Segurança do pipeline"
seccao: "CI/CD e ferramentas"
paginas: [46]
fonte: Dicionario-Boas-Praticas.pdf
verificado_em: 2026-11-25
editado_em: 2026-11-25
fontes_oficiais_consultadas_em: 2026-11-04
---

# Segurança do pipeline

**Resumo:** Proteger o pipeline como produção: credenciais mínimas, ações fixadas por SHA e segredos fora do log.

## Conteúdo

- Menor privilégio: a credencial do CI só lê o que precisa; segredos no cofre, nunca no log.
- Ações e plugins de terceiros fixados por SHA; cada job com limite de tempo; auditoria de dependências e scan de imagens.
- O pipeline é um alvo: quem o controla publica código; proteger como se fosse produção.
- No GitHub Actions, as permissões do `GITHUB_TOKEN` declaram-se no workflow, e ao declarar uma, todas as que não se declaram ficam a `none`. Cada passo precisa das que lê: uma procura de segredos que, num pull request, lista os commits pela API precisa de `pull-requests: read` e, sem ela, falha sem analisar nada *(experiência do projeto, 2026-11-25)*. Um pipeline que só correu no branch de produção ainda não está provado nos pull requests.
- Uma ação fixada por SHA não se atualiza sozinha. O Dependabot vigia as ações com `package-ecosystem: "github-actions"` no `.github/dependabot.yml` e propõe as versões novas, também nas referências por commit (`actions/checkout@<commit>`). Sem ele, a ação fica parada enquanto o runner muda: desde 16 de junho de 2026 os runners do GitHub usam o Node 24 por omissão, e uma ação feita para o Node 20 passa a correr forçada no 24 *(experiência do projeto, 2026-11-25)*.

**Para uma skill:** ações fixadas por SHA e atualizadas pelo Dependabot, permissões do token declaradas e só as que cada passo lê, segredos fora do log, e o pipeline verde em cada evento que ouve (push ao branch de produção e pull request).

## Ver também

- [CI como portão do deploy](../seguranca/ci-como-portao-do-deploy.md) (Segurança)

## Fontes oficiais

*Ligações externas que apoiam esta entrada, consultadas a 2026-11-04. Não alteram o texto acima.*

- [Secure use reference](https://docs.github.com/en/actions/security-for-github-actions/security-guides/security-hardening-for-github-actions) — Fixar ações por SHA completo, GITHUB_TOKEN mínimo, mascarar segredos nos logs
- [OpenSSF Scorecard](https://scorecard.dev/) — Verifica dependências fixadas e permissões de token só de leitura
- [Workflow syntax: permissions](https://docs.github.com/en/actions/reference/workflows-and-actions/workflow-syntax#permissions) — Ao declarar uma permissão, as que não se declaram ficam a `none` (consultada a 2026-11-25)
- [Keeping your actions up to date with Dependabot](https://docs.github.com/en/code-security/dependabot/working-with-dependabot/keeping-your-actions-up-to-date-with-dependabot) — `package-ecosystem: "github-actions"` no `dependabot.yml` (consultada a 2026-11-25)
- [Secure use reference](https://docs.github.com/en/actions/reference/security/secure-use) — O Dependabot atualiza ações referidas por tag ou por commit (consultada a 2026-11-25)
- [Deprecation of Node 20 on GitHub Actions runners](https://github.blog/changelog/2025-09-19-deprecation-of-node-20-on-github-actions-runners/) — Os runners usam o Node 24 por omissão a partir de 16 de junho de 2026 (consultada a 2026-11-25)

> **Nota (fonte oficial):** A página do GitHub (hoje «Secure use reference») diz que, quando disponíveis, os lockfiles de dependências de workflow são a proteção mais forte e substituem a fixação por SHA; também avisa que o mascaramento de segredos nos logs não é garantido.

## Histórico

- **2026-11-25**: antes, «**Para uma skill:** ações fixadas por SHA, credenciais mínimas, segredos fora do log.» (PDF pág. 46). Mudou porque uma ação fixada fica parada sem o Dependabot, porque declarar uma permissão do token põe as outras a `none` e um passo pode falhar só nos pull requests, e porque o critério passa a pedir o pipeline verde em cada evento. Fonte: [Workflow syntax: permissions](https://docs.github.com/en/actions/reference/workflows-and-actions/workflow-syntax#permissions). Editado a 2026-11-25.

Fonte: pág. 46 (Dicionario-Boas-Praticas.pdf)

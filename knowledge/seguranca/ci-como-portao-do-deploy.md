---
id: seguranca/ci-como-portao-do-deploy
titulo: "CI como portão do deploy"
seccao: "Segurança"
paginas: [6]
fonte: Dicionario-Boas-Praticas.pdf
verificado_em: 2026-11-03
fontes_oficiais_consultadas_em: 2026-11-04
---

# CI como portão do deploy

**Resumo:** O deploy só corre com CI verde, ações fixadas, produção só do branch protegido e caminho de rollback.

## Conteúdo

- O deploy só corre se o CI passar: lint, testes, auditoria de dependências e testes de integração.
- Ações de terceiros fixadas por SHA; a chave do CI só lê o repositório; cada job com limite de tempo.
- Produção só do branch protegido, com aprovação; smoke-test depois de subir; rollback rápido.

**Para uma skill:** nada chega a produção sem CI verde, revisão e caminho de rollback.

## Ver também

- [Pipeline como portão](../cicd/pipeline-como-portao.md) (CI/CD e ferramentas)
- [Segurança do pipeline](../cicd/seguranca-do-pipeline.md) (CI/CD e ferramentas)
- [Branch protegida e promoção controlada](../governacao/branch-protegida-e-promocao-controlada.md) (Governação e processo)

## Fontes oficiais

*Ligações externas que apoiam esta entrada, consultadas a 2026-11-04. Não alteram o texto acima.*

- [OWASP CI/CD Security Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/CI_CD_Security_Cheat_Sheet.html) — branches protegidos, aprovação manual para produção, menor privilégio, SAST/SCA
- [GitHub: hardening de Actions](https://docs.github.com/en/actions/security-for-github-actions/security-guides/security-hardening-for-github-actions) — fixar ações por SHA; GITHUB_TOKEN com permissões mínimas

> **Nota (fonte oficial):** A documentação do GitHub indica que, em repositórios que adotem lockfiles de dependências de workflows, estes substituem a fixação por SHA.

Fonte: pág. 6 (Dicionario-Boas-Praticas.pdf)

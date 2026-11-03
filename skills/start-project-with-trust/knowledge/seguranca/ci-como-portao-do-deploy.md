---
id: seguranca/ci-como-portao-do-deploy
titulo: "CI como portão do deploy"
seccao: "Segurança"
paginas: [6]
fonte: Dicionario-Boas-Praticas.pdf
verificado_em: 2026-11-03
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

Fonte: pág. 6 (Dicionario-Boas-Praticas.pdf)

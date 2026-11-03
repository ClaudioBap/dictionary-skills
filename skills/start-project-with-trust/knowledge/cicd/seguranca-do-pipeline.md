---
id: cicd/seguranca-do-pipeline
titulo: "Segurança do pipeline"
seccao: "CI/CD e ferramentas"
paginas: [46]
fonte: Dicionario-Boas-Praticas.pdf
verificado_em: 2026-11-03
---

# Segurança do pipeline

**Resumo:** Proteger o pipeline como produção: credenciais mínimas, ações fixadas por SHA e segredos fora do log.

## Conteúdo

- Menor privilégio: a credencial do CI só lê o que precisa; segredos no cofre, nunca no log.
- Ações e plugins de terceiros fixados por SHA; cada job com limite de tempo; auditoria de dependências e scan de imagens.
- O pipeline é um alvo: quem o controla publica código; proteger como se fosse produção.

**Para uma skill:** ações fixadas por SHA, credenciais mínimas, segredos fora do log.

## Ver também

- [CI como portão do deploy](../seguranca/ci-como-portao-do-deploy.md) (Segurança)

Fonte: pág. 46 (Dicionario-Boas-Praticas.pdf)

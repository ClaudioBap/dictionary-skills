---
id: cicd/seguranca-do-pipeline
titulo: "Segurança do pipeline"
seccao: "CI/CD e ferramentas"
paginas: [46]
fonte: Dicionario-Boas-Praticas.pdf
verificado_em: 2026-11-03
fontes_oficiais_consultadas_em: 2026-11-04
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

## Fontes oficiais

*Ligações externas que apoiam esta entrada, consultadas a 2026-11-04. Não alteram o texto acima.*

- [Secure use reference](https://docs.github.com/en/actions/security-for-github-actions/security-guides/security-hardening-for-github-actions) — Fixar ações por SHA completo, GITHUB_TOKEN mínimo, mascarar segredos nos logs
- [OpenSSF Scorecard](https://scorecard.dev/) — Verifica dependências fixadas e permissões de token só de leitura

> **Nota (fonte oficial):** A página do GitHub (hoje «Secure use reference») diz que, quando disponíveis, os lockfiles de dependências de workflow são a proteção mais forte e substituem a fixação por SHA; também avisa que o mascaramento de segredos nos logs não é garantido.

Fonte: pág. 46 (Dicionario-Boas-Praticas.pdf)

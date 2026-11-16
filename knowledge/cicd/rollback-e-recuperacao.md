---
id: cicd/rollback-e-recuperacao
titulo: "Rollback e recuperação"
seccao: "CI/CD e ferramentas"
paginas: [46]
fonte: Dicionario-Boas-Praticas.pdf
verificado_em: 2026-11-03
fontes_oficiais_consultadas_em: 2026-11-04
---

# Rollback e recuperação

**Resumo:** Voltar atrás tem de ser rápido e ensaiado, com o artefacto anterior guardado.

## Conteúdo

- Voltar atrás tem de ser rápido e ensaiado: guardar a versão anterior e poder trocar em segundos.
- Preferir reverter para o artefacto anterior a corrigir à pressa; migrações compatíveis para trás (expandir-depois-contrair).

**Para uma skill:** todo o deploy tem um rollback testado e um artefacto anterior guardado.

## Fontes oficiais

*Ligações externas que apoiam esta entrada, consultadas a 2026-11-04. Não alteram o texto acima.*

- [Blue Green Deployment](https://martinfowler.com/bliki/BlueGreenDeployment.html) — Rollback rápido trocando o router; esquema compatível com as duas versões
- [Canary Release](https://martinfowler.com/bliki/CanaryRelease.html) — Rollback é reencaminhar utilizadores para a versão antiga
- [Parallel Change](https://martinfowler.com/bliki/ParallelChange.html) — Expandir, migrar, contrair: mudanças compatíveis para trás, incluindo esquema

Fonte: pág. 46 (Dicionario-Boas-Praticas.pdf)

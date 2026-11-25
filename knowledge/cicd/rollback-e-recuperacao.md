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
- Em Kubernetes, `kubectl rollout undo deployment/<nome>` volta à revisão anterior e `--to-revision=<n>` volta a uma revisão escolhida. As revisões são os ReplicaSets antigos que `.spec.revisionHistoryLimit` guarda (10 por omissão). Com 0, o histórico apaga-se e o Deployment deixa de poder voltar atrás.
- `.spec.progressDeadlineSeconds` define ao fim de quanto tempo o controlador dá um rollout como parado (o exemplo oficial usa 600 segundos). Um Deployment parado continua a poder ser revertido.

**Para uma skill:** todo o deploy tem um rollback testado e um artefacto anterior guardado. Prova: um rollback feito em teste, com o comando e o tempo que demorou; em Kubernetes, `revisionHistoryLimit` diferente de 0.

## Fontes oficiais

*Ligações externas que apoiam esta entrada, consultadas a 2026-11-04. Não alteram o texto acima.*

- [Blue Green Deployment](https://martinfowler.com/bliki/BlueGreenDeployment.html) — Rollback rápido trocando o router; esquema compatível com as duas versões
- [Canary Release](https://martinfowler.com/bliki/CanaryRelease.html) — Rollback é reencaminhar utilizadores para a versão antiga
- [Parallel Change](https://martinfowler.com/bliki/ParallelChange.html) — Expandir, migrar, contrair: mudanças compatíveis para trás, incluindo esquema
- [Kubernetes: Deployments](https://kubernetes.io/docs/concepts/workloads/controllers/deployment/) — rollout undo, revisionHistoryLimit (10 por omissão) e progressDeadlineSeconds (consultada a 2026-11-25)

Fonte: pág. 46 (Dicionario-Boas-Praticas.pdf)

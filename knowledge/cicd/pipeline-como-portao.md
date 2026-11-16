---
id: cicd/pipeline-como-portao
titulo: "Pipeline como portão"
seccao: "CI/CD e ferramentas"
paginas: [45]
fonte: Dicionario-Boas-Praticas.pdf
verificado_em: 2026-11-03
fontes_oficiais_consultadas_em: 2026-11-04
---

# Pipeline como portão

**Resumo:** O pipeline é a única porta para produção, com fases ordenadas por custo.

## Conteúdo

- O pipeline é a única porta para produção: se falha, nada avança; sem passos manuais que se esqueçam.
- Fases por ordem de custo: lint → testes rápidos → testes de integração → build → deploy → smoke test.
- Falhar cedo e barato; cada fase prova algo antes da seguinte.

**Para uma skill:** não há caminho para produção que não passe pelo pipeline.

## Ver também

- [CI como portão do deploy](../seguranca/ci-como-portao-do-deploy.md) (Segurança)
- [Branch protegida e promoção controlada](../governacao/branch-protegida-e-promocao-controlada.md) (Governação e processo)

## Fontes oficiais

*Ligações externas que apoiam esta entrada, consultadas a 2026-11-04. Não alteram o texto acima.*

- [About protected branches](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-protected-branches/about-protected-branches) — Verificações obrigatórias têm de passar antes de juntar ao branch protegido
- [Continuous Delivery](https://martinfowler.com/bliki/ContinuousDelivery.html) — Pipeline: build, testes automáticos e promoção por ambientes
- [Continuous Integration](https://martinfowler.com/articles/continuousIntegration.html) — Build rápido e corrigir um build partido é a prioridade máxima

Fonte: pág. 45 (Dicionario-Boas-Praticas.pdf)

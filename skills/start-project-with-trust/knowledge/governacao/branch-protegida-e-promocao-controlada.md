---
id: governacao/branch-protegida-e-promocao-controlada
titulo: "Branch protegida e promoção controlada"
seccao: "Governação e processo"
paginas: [59]
fonte: Dicionario-Boas-Praticas.pdf
verificado_em: 2026-11-03
fontes_oficiais_consultadas_em: 2026-11-04
---

# Branch protegida e promoção controlada

**Resumo:** Tudo entra por PR com CI verde e revisão; produção só do branch principal, com aprovação.

## Conteúdo

- O branch principal não aceita pushes diretos; entra tudo por PR com CI verde e revisão.
- Produção só a partir do branch principal, com portão no workflow e aprovação; promoção dev → QA → produção, sem saltar etapas.

**Para uma skill:** nada chega a produção sem PR aprovado e CI verde.

## Ver também

- [CI como portão do deploy](../seguranca/ci-como-portao-do-deploy.md) (Segurança)
- [Ambientes e promoção](../cicd/ambientes-e-promocao.md) (CI/CD e ferramentas)

## Fontes oficiais

*Ligações externas que apoiam esta entrada, consultadas a 2026-11-04. Não alteram o texto acima.*

- [About protected branches](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-protected-branches/about-protected-branches) — Exigir revisões de PR e status checks; restringir pushes
- [Managing environments for deployment](https://docs.github.com/en/actions/how-tos/deploy/configure-and-manage-deployments/manage-environments) — Revisores obrigatórios e branches restritos por ambiente de deploy
- [About rulesets](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-rulesets/about-rulesets) — Controlar quem pode fazer push, apagar ou renomear branches

Fonte: pág. 59 (Dicionario-Boas-Praticas.pdf)

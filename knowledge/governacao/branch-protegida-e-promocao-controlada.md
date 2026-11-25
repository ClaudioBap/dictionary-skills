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
- No GitHub, as regras do branch principal têm estes nomes: «Require pull request reviews before merging», com «Dismiss stale pull request approvals when new commits are pushed» ou «Require approval of the most recent reviewable push»; «Require status checks to pass before merging», com «Require branches to be up to date before merging»; «Require conversation resolution before merging»; e «Do not allow bypassing the above settings», para os administradores também cumprirem. «Allow force pushes» e «Allow deletions» ficam desligados *(interpretação)*. Fonte: [About protected branches](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-protected-branches/about-protected-branches)
- Disponibilidade: «Protected branches are available in public repositories with GitHub Free and GitHub Free for organizations», e em repositórios públicos e privados nos planos Pro, Team, Enterprise Cloud e Enterprise Server. Fonte: a mesma página.
- No ambiente de produção: «Required reviewers», com «Prevent self-review» para quem lança não aprovar o próprio deploy, e os ramos permitidos limitados em «Selected branches and tags». Nos planos Free, Pro e Team, os revisores obrigatórios e o tempo de espera «are only available for public repositories». Fonte: [Managing environments for deployment](https://docs.github.com/en/actions/how-tos/deploy/configure-and-manage-deployments/manage-environments)

**Para uma skill:** nas definições do repositório, o branch principal tem ligadas as revisões obrigatórias (com aprovações antigas descartadas ou aprovação do último push), os status checks obrigatórios com o branch atualizado e «Do not allow bypassing the above settings»; o ambiente de produção tem revisores obrigatórios com «Prevent self-review» e só aceita o branch principal. Num repositório privado, os branches protegidos pedem o plano Pro, Team ou Enterprise e os revisores obrigatórios do ambiente pedem o Enterprise; sem isso, estas proteções não existem e o plano regista isso como risco.

## Ver também

- [CI como portão do deploy](../seguranca/ci-como-portao-do-deploy.md) (Segurança)
- [Ambientes e promoção](../cicd/ambientes-e-promocao.md) (CI/CD e ferramentas)

## Fontes oficiais

*Ligações externas que apoiam esta entrada, consultadas a 2026-11-04. Não alteram o texto acima.*

- [About protected branches](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-protected-branches/about-protected-branches) — Exigir revisões de PR e status checks; restringir pushes
- [Managing environments for deployment](https://docs.github.com/en/actions/how-tos/deploy/configure-and-manage-deployments/manage-environments) — Revisores obrigatórios e branches restritos por ambiente de deploy
- [About rulesets](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-rulesets/about-rulesets) — Controlar quem pode fazer push, apagar ou renomear branches

Fonte: pág. 59 (Dicionario-Boas-Praticas.pdf)

---
id: cicd/pipeline-como-portao
titulo: "Pipeline como portão"
seccao: "CI/CD e ferramentas"
paginas: [45]
fonte: Dicionario-Boas-Praticas.pdf
verificado_em: 2026-11-25
editado_em: 2026-11-25
fontes_oficiais_consultadas_em: 2026-11-04
---

# Pipeline como portão

**Resumo:** O pipeline é a única porta para produção, com fases ordenadas por custo.

## Conteúdo

- O pipeline é a única porta para produção: se falha, nada avança; sem passos manuais que se esqueçam.
- Fases por ordem de custo: lint → testes rápidos → testes de integração → build → deploy → smoke test.
- Falhar cedo e barato; cada fase prova algo antes da seguinte.
- No GitHub, a «única porta» prova-se no branch de produção com uma regra de proteção que exige verificações obrigatórias antes do merge, no modo estrito (o branch tem de estar atualizado com a base, o que é o comportamento por omissão) ou com merge queue. Em cada verificação obrigatória escolhe-se a app que a pode marcar (por exemplo, GitHub Actions), porque qualquer pessoa ou integração com escrita no repositório pode definir o estado de uma verificação. Liga-se também «Do not allow bypassing the above settings», porque por omissão as regras não se aplicam a administradores. O force push e o apagar do branch ficam bloqueados por omissão.
- No ambiente de produção: em «Deployment branches and tags», escolher «Protected branches only» ou uma lista de branches (com «Protected branches only», se nenhum branch tiver regra de proteção, todos podem publicar); revisores obrigatórios; «Allow administrators to bypass configured protection rules» desligado; credenciais de produção guardadas como segredos do ambiente, que o job só consegue ler depois de as regras passarem.
- Para publicar na nuvem, usar OIDC em vez de segredos de longa duração. O fornecedor emite um token de curta duração, válido só para um job, e a condição de confiança pode exigir que o pedido venha do ambiente de produção (o claim `sub` inclui `environment:<nome>`).
- Limites por plano: no GitHub Free, os branches protegidos só existem em repositórios públicos. Em repositórios privados ou internos, ambientes, segredos de ambiente e branches de deploy pedem GitHub Pro, Team ou Enterprise. Nos planos Free, Pro e Team, revisores obrigatórios e temporizador só existem em repositórios públicos. Se faltar alguma destas peças, o portão fica incompleto e isso diz-se ao utilizador.
- O deploy publica a ponta do branch, nunca um commit que já foi ultrapassado. Um grupo de concorrência só impede dois deploys ao mesmo tempo: quando entra um novo pendente, o pendente anterior é cancelado, mas não há ordem por commit. Se o CI do commit mais antigo acabar depois do CI do mais novo, o deploy do antigo corre em último e tapa o novo *(experiência do projeto, 2026-11-25, com duas sessões a publicar no mesmo repositório)*. Há duas defesas, e qualquer uma chega: o deploy compara o commit com a ponta atual do branch e sai sem publicar se não for o mesmo; ou o CI do branch de produção usa um grupo de concorrência com `cancel-in-progress: true`, que cancela o CI do commit antigo quando chega um novo, e o deploy, que só corre com o CI em sucesso, já não acontece.

**Para uma skill:** não há caminho para produção que não passe pelo pipeline, e o deploy só publica a ponta do branch. Prova: a regra de proteção do branch de produção (verificações obrigatórias com a app de origem, sem exceção para administradores), a configuração do ambiente de produção (branches que podem publicar, revisores, credenciais só no ambiente), em captura ou pela API, e no workflow a comparação com a ponta do branch ou o `cancel-in-progress` no CI desse branch.

## Ver também

- [CI como portão do deploy](../seguranca/ci-como-portao-do-deploy.md) (Segurança)
- [Branch protegida e promoção controlada](../governacao/branch-protegida-e-promocao-controlada.md) (Governação e processo)

## Fontes oficiais

*Ligações externas que apoiam esta entrada, consultadas a 2026-11-04. Não alteram o texto acima.*

- [About protected branches](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-protected-branches/about-protected-branches) — Verificações obrigatórias têm de passar antes de juntar ao branch protegido
- [Continuous Delivery](https://martinfowler.com/bliki/ContinuousDelivery.html) — Pipeline: build, testes automáticos e promoção por ambientes
- [Continuous Integration](https://martinfowler.com/articles/continuousIntegration.html) — Build rápido e corrigir um build partido é a prioridade máxima
- [Deployments and environments](https://docs.github.com/en/actions/reference/workflows-and-actions/deployments-and-environments) — «Protected branches only» e o que acontece quando nenhum branch tem regra de proteção (consultada a 2026-11-25)
- [Managing environments for deployment](https://docs.github.com/en/actions/deployment/targeting-different-environments/managing-environments-for-deployment) — Revisores, bypass de administradores, segredos lidos só depois das regras, limites por plano (consultada a 2026-11-25)
- [OpenID Connect](https://docs.github.com/en/actions/concepts/security/openid-connect) — Token de nuvem de curta duração, válido só para um job, em vez de segredos guardados (consultada a 2026-11-25)
- [Workflow syntax: concurrency](https://docs.github.com/en/actions/reference/workflows-and-actions/workflow-syntax#concurrency) — O pendente novo cancela o pendente anterior do grupo; `cancel-in-progress: true` cancela também o que está a correr (consultada a 2026-11-25)

## Histórico

- **2026-11-25**: antes, «**Para uma skill:** não há caminho para produção que não passe pelo pipeline. Prova: a regra de proteção do branch de produção (verificações obrigatórias com a app de origem, sem exceção para administradores) e a configuração do ambiente de produção (branches que podem publicar, revisores, credenciais só no ambiente), em captura ou pela API.» (PDF pág. 45 e as fontes de 2026-11-25). Mudou porque um grupo de concorrência não ordena os deploys por commit, e um commit ultrapassado pode tapar o mais novo: o critério passa a pedir que o deploy só publique a ponta do branch. Fonte: [Workflow syntax: concurrency](https://docs.github.com/en/actions/reference/workflows-and-actions/workflow-syntax#concurrency). Editado a 2026-11-25.

Fonte: pág. 45 (Dicionario-Boas-Praticas.pdf)

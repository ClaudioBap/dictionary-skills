---
id: cicd/ambientes-e-promocao
titulo: "Ambientes e promoção"
seccao: "CI/CD e ferramentas"
paginas: [46, 47]
fonte: Dicionario-Boas-Praticas.pdf
verificado_em: 2026-11-03
fontes_oficiais_consultadas_em: 2026-11-04
---

# Ambientes e promoção

**Resumo:** Dev → staging → produção, cada um com a sua configuração e dados, promovendo o mesmo artefacto.

## Conteúdo

- Dev → staging/QA → produção; cada ambiente com a sua configuração e os seus dados, nunca a escrever no de produção.
- Promover o mesmo artefacto; produção só a partir do branch protegido, com aprovação; staging o mais parecido possível com produção.
- No GitHub, a aprovação faz-se com revisores obrigatórios no ambiente de produção (até 6 pessoas ou equipas, e basta uma aprovar) e com «Prevent self-review», para que quem lançou a execução não a possa aprovar. Pode também exigir-se que a alteração tenha sido publicada com sucesso em staging antes de entrar no branch principal (regra «Require deployments to succeed before merging»).

**Para uma skill:** nada salta etapas; produção recebe só o que passou por staging e PR.

## Fontes oficiais

*Ligações externas que apoiam esta entrada, consultadas a 2026-11-04. Não alteram o texto acima.*

- [Managing environments for deployment](https://docs.github.com/en/actions/deployment/targeting-different-environments/managing-environments-for-deployment) — Aprovadores obrigatórios, branches permitidos e segredos por ambiente
- [Continuous Delivery](https://martinfowler.com/bliki/ContinuousDelivery.html) — Promover executáveis por ambientes progressivamente mais parecidos com produção
- [Continuous Integration](https://martinfowler.com/articles/continuousIntegration.html) — Ambiente de teste o mais parecido possível com produção

Fonte: págs. 46, 47 (Dicionario-Boas-Praticas.pdf)

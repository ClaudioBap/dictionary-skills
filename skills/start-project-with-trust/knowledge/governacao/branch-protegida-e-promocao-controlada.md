---
id: governacao/branch-protegida-e-promocao-controlada
titulo: "Branch protegida e promoção controlada"
seccao: "Governação e processo"
paginas: [59]
fonte: Dicionario-Boas-Praticas.pdf
verificado_em: 2026-11-03
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

Fonte: pág. 59 (Dicionario-Boas-Praticas.pdf)

---
id: cicd/ambientes-e-promocao
titulo: "Ambientes e promoção"
seccao: "CI/CD e ferramentas"
paginas: [46, 47]
fonte: Dicionario-Boas-Praticas.pdf
verificado_em: 2026-11-03
---

# Ambientes e promoção

**Resumo:** Dev → staging → produção, cada um com a sua configuração e dados, promovendo o mesmo artefacto.

## Conteúdo

- Dev → staging/QA → produção; cada ambiente com a sua configuração e os seus dados, nunca a escrever no de produção.
- Promover o mesmo artefacto; produção só a partir do branch protegido, com aprovação; staging o mais parecido possível com produção.

**Para uma skill:** nada salta etapas; produção recebe só o que passou por staging e PR.

Fonte: págs. 46, 47 (Dicionario-Boas-Praticas.pdf)

---
id: cicd/build-reprodutivel-e-artefacto-imutavel
titulo: "Build reprodutível e artefacto imutável"
seccao: "CI/CD e ferramentas"
paginas: [45]
fonte: Dicionario-Boas-Praticas.pdf
verificado_em: 2026-11-03
fontes_oficiais_consultadas_em: 2026-11-04
---

# Build reprodutível e artefacto imutável

**Resumo:** O mesmo commit dá o mesmo artefacto, construído uma vez e promovido entre ambientes.

## Conteúdo

- O mesmo commit produz o mesmo artefacto (imagem/pacote), fixado por digest ou hash.
- Construir uma vez e promover o mesmo artefacto por dev → staging → produção; não reconstruir por ambiente.
- Dependências fixadas (lock); nada de «funciona na minha máquina».

**Para uma skill:** o artefacto que vai a produção é o mesmo que passou nos testes, por digest.

## Fontes oficiais

*Ligações externas que apoiam esta entrada, consultadas a 2026-11-04. Não alteram o texto acima.*

- [Reproducible Builds](https://reproducible-builds.org/) — Build determinístico: a mesma fonte dá sempre o mesmo resultado
- [docker image pull](https://docs.docker.com/reference/cli/docker/image/pull/) — Puxar por digest fixa exatamente a mesma imagem
- [Using artifact attestations](https://docs.github.com/en/actions/security-for-github-actions/using-artifact-attestations/using-artifact-attestations-to-establish-provenance-for-builds) — Proveniência do build ligada ao digest SHA256 da imagem, verificável

Fonte: pág. 45 (Dicionario-Boas-Praticas.pdf)

---
id: cicd/build-reprodutivel-e-artefacto-imutavel
titulo: "Build reprodutível e artefacto imutável"
seccao: "CI/CD e ferramentas"
paginas: [45]
fonte: Dicionario-Boas-Praticas.pdf
verificado_em: 2026-11-03
---

# Build reprodutível e artefacto imutável

**Resumo:** O mesmo commit dá o mesmo artefacto, construído uma vez e promovido entre ambientes.

## Conteúdo

- O mesmo commit produz o mesmo artefacto (imagem/pacote), fixado por digest ou hash.
- Construir uma vez e promover o mesmo artefacto por dev → staging → produção; não reconstruir por ambiente.
- Dependências fixadas (lock); nada de «funciona na minha máquina».

**Para uma skill:** o artefacto que vai a produção é o mesmo que passou nos testes, por digest.

Fonte: pág. 45 (Dicionario-Boas-Praticas.pdf)

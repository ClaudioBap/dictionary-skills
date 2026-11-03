---
id: docker/imagens-e-dockerfile
titulo: "Imagens e Dockerfile"
seccao: "Docker e orquestração"
paginas: [51]
fonte: Dicionario-Boas-Praticas.pdf
verificado_em: 2026-11-03
---

# Imagens e Dockerfile

**Resumo:** Imagens multi-stage com base pequena fixada por digest e `.dockerignore`.

## Conteúdo

- Base pequena e fixada por digest; multi-stage (compilar numa fase, correr noutra mínima); ordenar instruções para aproveitar a cache de layers.
- `.dockerignore` para não copiar lixo; uma responsabilidade por imagem.

**Para uma skill:** imagem multi-stage, base por digest, com `.dockerignore`.

Fonte: pág. 51 (Dicionario-Boas-Praticas.pdf)

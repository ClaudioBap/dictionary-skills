---
id: docker/imagens-e-dockerfile
titulo: "Imagens e Dockerfile"
seccao: "Docker e orquestração"
paginas: [51]
fonte: Dicionario-Boas-Praticas.pdf
verificado_em: 2026-11-03
fontes_oficiais_consultadas_em: 2026-11-04
---

# Imagens e Dockerfile

**Resumo:** Imagens multi-stage com base pequena fixada por digest e `.dockerignore`.

## Conteúdo

- Base pequena e fixada por digest; multi-stage (compilar numa fase, correr noutra mínima); ordenar instruções para aproveitar a cache de layers.
- `.dockerignore` para não copiar lixo; uma responsabilidade por imagem.

**Para uma skill:** imagem multi-stage, base por digest, com `.dockerignore`.

## Fontes oficiais

*Ligações externas que apoiam esta entrada, consultadas a 2026-11-04. Não alteram o texto acima.*

- [Building best practices](https://docs.docker.com/build/building/best-practices/) — Multi-stage, base fixada por digest, .dockerignore, uma responsabilidade por contentor
- [Docker Official Images](https://docs.docker.com/docker-hub/image-library/trusted-content/) — Imagens base verificadas e atualizadas como ponto de partida

Fonte: pág. 51 (Dicionario-Boas-Praticas.pdf)

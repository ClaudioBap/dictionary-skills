---
id: seguranca/contentores-endurecidos
titulo: "Contentores endurecidos"
seccao: "Segurança"
paginas: [6]
fonte: Dicionario-Boas-Praticas.pdf
verificado_em: 2026-11-03
---

# Contentores endurecidos

**Resumo:** Imagens fixadas por digest, non-root, só-leitura e com o mínimo de capacidades; só o proxy exposto.

## Conteúdo

- Imagens fixadas por digest; non-root; sistema de ficheiros só-leitura; `cap_drop: [ALL]`; `no-new-privileges`.
- Só o proxy exposto; os serviços internos só na rede privada.
- Cada contentor com o mínimo de capacidades e serviços.

**Para uma skill:** nenhum contentor corre root nem com imagem por etiqueta móvel; só o proxy publica portas.

## Ver também

- [Imagem endurecida](../docker/imagem-endurecida.md) (Docker e orquestração)
- [Redes do Docker](../docker/redes-do-docker.md) (Docker e orquestração)

Fonte: pág. 6 (Dicionario-Boas-Praticas.pdf)

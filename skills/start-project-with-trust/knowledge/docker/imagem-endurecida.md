---
id: docker/imagem-endurecida
titulo: "Imagem endurecida"
seccao: "Docker e orquestração"
paginas: [51]
fonte: Dicionario-Boas-Praticas.pdf
verificado_em: 2026-11-03
---

# Imagem endurecida

**Resumo:** Imagens non-root, só-leitura, com healthcheck, sem segredos e escaneadas.

## Conteúdo

- Correr non-root (`USER`); sistema de ficheiros só-leitura; `HEALTHCHECK`; sem segredos na imagem nem nas layers.
- Menos pacotes, menos superfície; `LABEL` com metadados; escanear com Trivy.

**Para uma skill:** a imagem corre non-root, tem healthcheck e passa o scan.

## Ver também

- [Contentores endurecidos](../seguranca/contentores-endurecidos.md) (Segurança)

Fonte: pág. 51 (Dicionario-Boas-Praticas.pdf)

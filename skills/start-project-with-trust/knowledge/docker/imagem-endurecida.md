---
id: docker/imagem-endurecida
titulo: "Imagem endurecida"
seccao: "Docker e orquestração"
paginas: [51]
fonte: Dicionario-Boas-Praticas.pdf
verificado_em: 2026-11-03
fontes_oficiais_consultadas_em: 2026-11-04
---

# Imagem endurecida

**Resumo:** Imagens non-root, só-leitura, com healthcheck, sem segredos e escaneadas.

## Conteúdo

- Correr non-root (`USER`); sistema de ficheiros só-leitura; `HEALTHCHECK`; sem segredos na imagem nem nas layers.
- Menos pacotes, menos superfície; `LABEL` com metadados; escanear com Trivy.

**Para uma skill:** a imagem corre non-root, tem healthcheck e passa o scan.

## Ver também

- [Contentores endurecidos](../seguranca/contentores-endurecidos.md) (Segurança)

## Fontes oficiais

*Ligações externas que apoiam esta entrada, consultadas a 2026-11-04. Não alteram o texto acima.*

- [Building best practices](https://docs.docker.com/build/building/best-practices/) — USER non-root e LABEL com metadados
- [Build secrets](https://docs.docker.com/build/building/secrets/) — Build args e ENV persistem na imagem; usar secret mounts
- [Trivy](https://github.com/aquasecurity/trivy) — Scanner oficial de imagens: CVE, segredos, misconfigurações

Fonte: pág. 51 (Dicionario-Boas-Praticas.pdf)

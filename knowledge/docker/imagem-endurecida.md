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
- Fixar a imagem base por digest (`FROM <imagem>:<tag>@sha256:<digest>`), porque as tags são mutáveis e o publicador pode apontá-las para outra imagem. O Dependabot (`package-ecosystem: "docker"`) abre pull requests para atualizar a tag e o digest.
- Reconstruir as imagens com regularidade e com `docker build --pull`, que força a descarga da versão mais recente da imagem base. `--no-cache` serve para um build limpo e as duas opções podem usar-se juntas.
- Ao correr: retirar todas as capacidades Linux menos as que o processo precisa (`--cap-drop=ALL` e `--cap-add` só das necessárias) e montar o sistema de ficheiros com `--read-only`, com volumes só onde a aplicação escreve.

**Para uma skill:** a imagem corre non-root, tem healthcheck e passa o scan. Prova: o Dockerfile com a base por digest e `USER`, o relatório do scan e o comando ou o ficheiro compose com `--read-only` e as capacidades retiradas.

## Ver também

- [Contentores endurecidos](../seguranca/contentores-endurecidos.md) (Segurança)

## Fontes oficiais

*Ligações externas que apoiam esta entrada, consultadas a 2026-11-04. Não alteram o texto acima.*

- [Building best practices](https://docs.docker.com/build/building/best-practices/) — USER non-root e LABEL com metadados
- [Build secrets](https://docs.docker.com/build/building/secrets/) — Build args e ENV persistem na imagem; usar secret mounts
- [Trivy](https://github.com/aquasecurity/trivy) — Scanner oficial de imagens: CVE, segredos, misconfigurações
- [Docker Engine security](https://docs.docker.com/engine/security/) — Retirar todas as capacidades menos as que o processo precisa (consultada a 2026-11-25)
- [Running containers](https://docs.docker.com/engine/containers/run/) — --cap-drop e --cap-add aceitam o valor ALL (consultada a 2026-11-25)
- [docker container run](https://docs.docker.com/reference/cli/docker/container/run/) — --read-only com volumes onde a aplicação escreve (consultada a 2026-11-25)

Fonte: pág. 51 (Dicionario-Boas-Praticas.pdf)

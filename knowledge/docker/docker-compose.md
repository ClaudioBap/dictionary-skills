---
id: docker/docker-compose
titulo: "Docker Compose"
seccao: "Docker e orquestração"
paginas: [52]
fonte: Dicionario-Boas-Praticas.pdf
verificado_em: 2026-11-03
fontes_oficiais_consultadas_em: 2026-11-04
---

# Docker Compose

**Resumo:** A stack multi-serviço descrita e versionada num ficheiro, que sobe com um comando.

## Conteúdo

- Descrever a stack multi-serviço num ficheiro; `depends_on` com healthcheck; `profiles` para ligar partes só quando precisas.
- Ótimo para dev e para stacks pequenas; configuração versionada.

**Para uma skill:** a stack local sobe com um comando e está versionada em Compose.

## Fontes oficiais

*Ligações externas que apoiam esta entrada, consultadas a 2026-11-04. Não alteram o texto acima.*

- [Docker Compose](https://docs.docker.com/compose/) — Stack multi-contentor num YAML, arrancada com um só comando
- [Control startup order](https://docs.docker.com/compose/how-tos/startup-order/) — depends_on com condition: service_healthy e healthcheck
- [Using profiles](https://docs.docker.com/compose/how-tos/profiles/) — Ativar seletivamente serviços com profiles

Fonte: pág. 52 (Dicionario-Boas-Praticas.pdf)

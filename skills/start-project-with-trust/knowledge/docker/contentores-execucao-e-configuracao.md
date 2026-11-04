---
id: docker/contentores-execucao-e-configuracao
titulo: "Contentores: execução e configuração"
seccao: "Docker e orquestração"
paginas: [51]
fonte: Dicionario-Boas-Praticas.pdf
verificado_em: 2026-11-03
fontes_oficiais_consultadas_em: 2026-11-04
---

# Contentores: execução e configuração

**Resumo:** Configuração por ambiente, segredos montados e limites de recursos.

## Conteúdo

- Configuração por variáveis de ambiente; segredos montados, nunca na imagem; limites de CPU e memória.
- Um processo por contentor; logs para stdout; política de `restart`.

**Para uma skill:** o contentor configura-se por ambiente e tem limites de recursos.

## Fontes oficiais

*Ligações externas que apoiam esta entrada, consultadas a 2026-11-04. Não alteram o texto acima.*

- [Resource constraints](https://docs.docker.com/engine/containers/resource_constraints/) — Limites de memória e CPU por contentor
- [Set environment variables](https://docs.docker.com/compose/how-tos/environment-variables/set-environment-variables/) — Configuração por ambiente; não passar passwords por variáveis, usar secrets
- [docker container run](https://docs.docker.com/reference/cli/docker/container/run/) — Políticas --restart, -e/--env-file e --read-only

Fonte: pág. 51 (Dicionario-Boas-Praticas.pdf)

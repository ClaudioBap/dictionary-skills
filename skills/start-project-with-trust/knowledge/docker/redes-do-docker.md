---
id: docker/redes-do-docker
titulo: "Redes do Docker"
seccao: "Docker e orquestração"
paginas: [51, 52]
fonte: Dicionario-Boas-Praticas.pdf
verificado_em: 2026-11-03
fontes_oficiais_consultadas_em: 2026-11-04
---

# Redes do Docker

**Resumo:** Rede interna entre serviços e só o proxy a publicar portas.

## Conteúdo

- Rede interna entre serviços; só o proxy publica portas no host; nomes de serviço como DNS.
- Isolar o que não precisa de falar; não expor a base de dados ao exterior.

**Para uma skill:** só o proxy publica portas; os serviços internos falam por rede privada.

## Ver também

- [Contentores endurecidos](../seguranca/contentores-endurecidos.md) (Segurança)

## Fontes oficiais

*Ligações externas que apoiam esta entrada, consultadas a 2026-11-04. Não alteram o texto acima.*

- [Networking overview](https://docs.docker.com/engine/network/) — Redes definidas pelo utilizador, DNS por nome, publicação de portas
- [Networking in Compose](https://docs.docker.com/compose/how-tos/networking/) — Nome do serviço como hostname; redes separadas isolam serviços

Fonte: págs. 51, 52 (Dicionario-Boas-Praticas.pdf)

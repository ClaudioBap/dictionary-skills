---
id: docker/volumes-e-persistencia
titulo: "Volumes e persistência"
seccao: "Docker e orquestração"
paginas: [51]
fonte: Dicionario-Boas-Praticas.pdf
verificado_em: 2026-11-03
fontes_oficiais_consultadas_em: 2026-11-04
---

# Volumes e persistência

**Resumo:** Os dados que têm de durar vivem em volumes com backup; o contentor é descartável.

## Conteúdo

- Dados que têm de durar vivem em volumes (geridos) ou bind mounts; o contentor é descartável, o volume não.
- Separar dados de código; fazer backup dos volumes.

**Para uma skill:** nenhum dado importante vive dentro do contentor; está num volume com backup.

## Fontes oficiais

*Ligações externas que apoiam esta entrada, consultadas a 2026-11-04. Não alteram o texto acima.*

- [Volumes](https://docs.docker.com/engine/storage/volumes/) — Dados persistem após remover o contentor; backup e restauro de volumes

Fonte: pág. 51 (Dicionario-Boas-Praticas.pdf)

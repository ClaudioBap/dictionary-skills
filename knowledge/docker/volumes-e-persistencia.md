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
- Cópia de um volume: um contentor temporário monta o volume com `--volumes-from` e uma pasta local em `/backup`, e arquiva os dados com `tar`. Exemplo oficial: `docker run --rm --volumes-from dbstore -v $(pwd):/backup ubuntu tar cvf /backup/backup.tar /dbdata`. O restauro faz o inverso para um contentor novo, com `tar xvf /backup/backup.tar --strip 1` dentro da pasta de dados.

**Para uma skill:** nenhum dado importante vive dentro do contentor; está num volume com backup. Prova: um restauro do volume para um contentor novo, com os dados conferidos.

## Fontes oficiais

*Ligações externas que apoiam esta entrada, consultadas a 2026-11-04. Não alteram o texto acima.*

- [Volumes](https://docs.docker.com/engine/storage/volumes/) — Dados persistem após remover o contentor; backup e restauro de volumes

Fonte: pág. 51 (Dicionario-Boas-Praticas.pdf)

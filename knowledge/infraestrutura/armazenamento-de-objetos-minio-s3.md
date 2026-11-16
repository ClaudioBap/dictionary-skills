---
id: infraestrutura/armazenamento-de-objetos-minio-s3
titulo: "Armazenamento de objetos (MinIO, S3)"
seccao: "Serviços de infraestrutura"
paginas: [55, 56]
fonte: Dicionario-Boas-Praticas.pdf
verificado_em: 2026-11-03
fontes_oficiais_consultadas_em: 2026-11-04
---

# Armazenamento de objetos (MinIO, S3)

**Resumo:** Ficheiros grandes em armazenamento de objetos, fora da base e do contentor.

## Conteúdo

- Guarda ficheiros (imagens, documentos, backups) fora da base e do contentor, acessíveis por URL.
- **MinIO** é compatível com a API S3 e self-hosted (soberano); S3 e equivalentes europeus na nuvem.

**Para uma skill:** ficheiros grandes vivem em armazenamento de objetos, não na base nem no disco do contentor.

## Fontes oficiais

*Ligações externas que apoiam esta entrada, consultadas a 2026-11-04. Não alteram o texto acima.*

- [What is Amazon S3?](https://docs.aws.amazon.com/AmazonS3/latest/userguide/Welcome.html) — Armazenamento de objetos em buckets, para ficheiros e backups
- [minio/minio (GitHub)](https://github.com/minio/minio) — Servidor de objetos compatível com S3, código AGPLv3

> **Nota (fonte oficial):** O repositório da edição comunitária do MinIO foi arquivado a 25-04-2026 («THIS REPOSITORY IS NO LONGER MAINTAINED») e já não há binários pré-compilados da versão comunitária, só código-fonte AGPLv3. A MinIO aponta para AIStor Free/Enterprise. Rever a recomendação de «MinIO self-hosted».

Fonte: págs. 55, 56 (Dicionario-Boas-Praticas.pdf)

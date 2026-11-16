---
id: plataformas/armazenamento-de-ficheiros
titulo: "Armazenamento de ficheiros (MinIO, API S3)"
seccao: "Plataformas para adotar antes de construir"
paginas: []
fonte: "Documentação do MinIO (AIStor) e ficheiro de licença do repositório, ligados em cada ponto; consultados a 2026-11-10, páginas sem data. Não vem do PDF."
data_lancamento: null
confianca: media
verificado_em: 2026-11-10
---

# Armazenamento de ficheiros (MinIO, API S3)

**Resumo:** Os ficheiros vão para armazenamento de objetos com API S3; o MinIO mudou de rumo (edição comunitária arquivada, documentação centrada no AIStor comercial), por isso a licença tem de se confirmar antes de adotar.

## Conteúdo

- A documentação em `min.io/docs` redireciona para a do AIStor, que diz «is licensed under the MinIO Software License» e «AIStor natively supports the S3 API for objects.» Instala-se em Kubernetes, RHEL, Ubuntu, OpenShift, contentores, macOS e Windows. Os termos da «MinIO Software License» não foram lidos: não confirmado. Fonte: [AIStor Object Store docs](https://docs.min.io/enterprise/aistor-object-store/)
- O repositório `minio/minio` tem a licença «GNU AFFERO GENERAL PUBLIC LICENSE, Version 3». A entrada de infraestrutura regista que esse repositório foi arquivado a 2026-04-25 e já não tem binários pré-compilados da edição comunitária: ver [Armazenamento de objetos (MinIO, S3)](../infraestrutura/armazenamento-de-objetos-minio-s3.md). Fonte: [LICENSE (minio/minio)](https://github.com/minio/minio/blob/master/LICENSE)
- Risco *(interpretação)*: a edição comunitária deixou de ter manutenção e a edição atual tem licença própria por ler; qualquer alternativa com API S3 (do fornecedor de nuvem ou outro servidor open source) entra na mesma decisão.
- Localização dos dados na UE: não confirmada nas páginas lidas; auto-alojado, os dados ficam onde correr.

**Para uma skill:** ficheiros não ficam na base de dados nem no contentor; o plano escolhe um armazenamento com API S3 e regista a licença e o estado de manutenção do candidato na coluna «Risco».

## Ver também

- [Armazenamento de objetos (MinIO, S3)](../infraestrutura/armazenamento-de-objetos-minio-s3.md) (Serviços de infraestrutura)
- [Inventário de dependências por jurisdição](../soberania/inventario-de-dependencias-por-jurisdicao.md) (Soberania digital)
- [Adotar antes de construir](adotar-antes-de-construir.md) (Plataformas para adotar antes de construir)

Fonte: documentação do MinIO (AIStor) e ficheiro de licença do repositório, ligados em cada ponto; consultados a 2026-11-10, páginas sem data. Não vem do PDF.

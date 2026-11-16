---
id: nuvem/aws
titulo: "AWS (Amazon Web Services)"
seccao: "Nuvem e identidade (AWS, Azure, Microsoft, OVH)"
paginas: [61]
fonte: Dicionario-Boas-Praticas.pdf
verificado_em: 2026-11-03
fontes_oficiais_consultadas_em: 2026-11-04
---

# AWS (Amazon Web Services)

**Resumo:** O maior catálogo, com acesso por roles IAM de menor privilégio e regiões europeias.

## Conteúdo

- O maior catálogo: computação (EC2, Lambda, ECS/EKS), armazenamento (S3), bases de dados (RDS, Aurora, DynamoDB), rede e IAM.
- Acesso por IAM com menor privilégio (políticas, roles, sem chaves de longa duração); segredos no Secrets Manager; regiões europeias disponíveis.

**Para uma skill:** acesso por roles IAM de menor privilégio, sem chaves estáticas; região europeia quando a soberania o exige.

## Fontes oficiais

*Ligações externas que apoiam esta entrada, consultadas a 2026-11-04. Não alteram o texto acima.*

- [Security best practices in IAM](https://docs.aws.amazon.com/IAM/latest/UserGuide/best-practices.html) — menor privilégio, roles com credenciais temporárias, evitar chaves de longa duração
- [What is AWS Secrets Manager?](https://docs.aws.amazon.com/secretsmanager/latest/userguide/intro.html) — segredos geridos e rodados, sem credenciais no código
- [Overview of Amazon Web Services](https://docs.aws.amazon.com/whitepapers/latest/aws-overview/introduction.html) — catálogo amplo: computação, armazenamento, bases de dados, rede, segurança

Fonte: pág. 61 (Dicionario-Boas-Praticas.pdf)

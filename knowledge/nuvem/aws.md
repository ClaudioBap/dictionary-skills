---
id: nuvem/aws
titulo: "AWS (Amazon Web Services)"
seccao: "Nuvem e identidade (AWS, Azure, Microsoft, OVH)"
paginas: [61]
fonte: Dicionario-Boas-Praticas.pdf
verificado_em: 2026-11-25
editado_em: 2026-11-25
fontes_oficiais_consultadas_em: 2026-11-04
---

# AWS (Amazon Web Services)

**Resumo:** O maior catálogo, com acesso por roles IAM de menor privilégio e regiões europeias.

## Conteúdo

- O maior catálogo: computação (EC2, Lambda, ECS/EKS), armazenamento (S3), bases de dados (RDS, Aurora, DynamoDB), rede e IAM.
- Acesso por IAM com menor privilégio (políticas, roles, sem chaves de longa duração); segredos no Secrets Manager; regiões europeias disponíveis.
- Para exigências de soberania mais apertadas há a AWS European Sovereign Cloud. Segundo a AWS, é uma nuvem separada das outras regiões AWS, física e logicamente, com a infraestrutura toda na UE e a operação diária só por pessoal residente na UE. A primeira região fica em Brandemburgo (Alemanha), e a AWS anunciou Local Zones na Bélgica, nos Países Baixos e em Portugal. Tem consola própria (console.aws.eu) e começa pelos serviços principais: antes de a propor, confirmar na lista de capacidades por região que os serviços de que o projeto precisa já lá existem (a 2026-11-25).
- Conta raiz: sem chaves de acesso e com MFA (controlos IAM.4 e IAM.9 do Security Hub; o IAM.6 pede MFA de hardware). A AWS recomenda MFA resistente a phishing, como passkeys e chaves de segurança, e um utilizador administrativo para o dia a dia em vez da raiz.
- Chaves de acesso de longa duração, só quando não há alternativa: rodadas em 90 dias ou menos (controlo IAM.3, com maxAccessKeyAge de 90, não configurável); credenciais sem uso há 45 dias removidas (IAM.22).
- Nenhuma política IAM com privilégios administrativos completos «*» (IAM.1) e MFA em todos os utilizadores IAM (IAM.19).
- Dados: o cliente escolhe a região onde o conteúdo fica, e a AWS diz que não o move nem replica para fora das regiões escolhidas sem acordo do cliente.

**Para uma skill:** acesso por roles IAM de menor privilégio, sem chaves estáticas; região europeia quando a soberania o exige. Critérios a verificar: raiz sem chaves de acesso e com MFA, nenhuma chave de acesso com mais de 90 dias, credenciais paradas há 45 dias removidas, políticas sem «*» administrativo e região da UE escolhida para os dados.

## Fontes oficiais

*Ligações externas que apoiam esta entrada, consultadas a 2026-11-04. Não alteram o texto acima.*

- [Security best practices in IAM](https://docs.aws.amazon.com/IAM/latest/UserGuide/best-practices.html) — menor privilégio, roles com credenciais temporárias, evitar chaves de longa duração
- [What is AWS Secrets Manager?](https://docs.aws.amazon.com/secretsmanager/latest/userguide/intro.html) — segredos geridos e rodados, sem credenciais no código
- [Overview of Amazon Web Services](https://docs.aws.amazon.com/whitepapers/latest/aws-overview/introduction.html) — catálogo amplo: computação, armazenamento, bases de dados, rede, segurança

Fonte: pág. 61 (Dicionario-Boas-Praticas.pdf)

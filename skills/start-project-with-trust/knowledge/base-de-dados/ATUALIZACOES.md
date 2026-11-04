# Atualizações: Base de dados

Novidades com confiança alta, organizadas por categoria e da mais recente para a mais antiga. Não alteram o texto das entradas. Cada linha tem o seu registo no [CHANGELOG](../CHANGELOG.md).

## PostgreSQL (extensões)

- **2026-10-31** em [Segurança da base de dados](seguranca-da-base-de-dados.md): O E-Maj 5.0.1 corrige uma vulnerabilidade presente em todas as versões anteriores que, em certas circunstâncias, permitia a alguns utilizadores obter privilégios de superuser. É compatível com o PostgreSQL 14 a 19, e os autores recomendam atualizar o mais depressa possível. Fonte: [PostgreSQL News: E-Maj 5.0.1](https://www.postgresql.org/about/news/e-maj-501-major-security-update-3425/). Confiança: alta. Adicionado a 2026-11-04.
- **2026-10-28** em [Segurança da base de dados](seguranca-da-base-de-dados.md): O PostgreSQL Anonymizer 3.3 corrige 12 vulnerabilidades críticas (CVE-2026-105612 a CVE-2026-105620 e CVE-2026-110181 a CVE-2026-110183) que permitiam obter privilégios de superuser ou deixar utilizadores mascarados ler dados pessoais. Todos os utilizadores devem atualizar para a 3.3 o mais depressa possível e mudar o valor do parâmetro anon.salt. Fonte: [PostgreSQL News: PostgreSQL Anonymizer 3.3](https://www.postgresql.org/about/news/postgresql-anonymizer-33-major-security-update-3423/). Confiança: alta. Adicionado a 2026-11-04.

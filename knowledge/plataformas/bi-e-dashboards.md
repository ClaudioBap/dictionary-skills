---
id: plataformas/bi-e-dashboards
titulo: "BI e dashboards (Metabase, Superset)"
seccao: "Plataformas para adotar antes de construir"
paginas: []
fonte: "Sites, documentação e repositórios oficiais de cada plataforma, ligados em cada ponto; consultados a 2026-11-04. Não vem do PDF."
verificado_em: 2026-11-04
---

# BI e dashboards (Metabase, Superset)

**Resumo:** Para relatórios e dashboards sobre dados que já existem, o Metabase (AGPLv3 na edição open source) e o Apache Superset (Apache 2.0) evitam escrever ecrãs de relatório à mão; os dois têm API REST, alertas por webhook e servidor MCP oficial.

## Conteúdo

### Metabase

- Open Source Edition em AGPL v3; edição Enterprise com licença comercial. Fonte: [licença](https://www.metabase.com/license)
- Open source self-hosted gratuito, ou cloud a partir de 100 $ por mês (90 $ com faturação anual) com 5 utilizadores e 6 $ por utilizador extra (a 2026-11-04). Fonte: [preços](https://www.metabase.com/pricing/)
- API REST documentada, e webhooks como destino de alertas. Fontes: [API](https://www.metabase.com/docs/latest/api), [webhooks](https://www.metabase.com/docs/latest/configuring-metabase/webhooks)
- Servidor MCP oficial incluído. Fonte: [MCP](https://www.metabase.com/docs/latest/ai/mcp)
- Versão 0.65.2, de 2026-10-30. Fonte: [releases](https://github.com/metabase/metabase/releases/tag/v0.65.2)

### Apache Superset

- Licença Apache 2.0. Fonte: [LICENSE](https://github.com/apache/superset/blob/master/LICENSE.txt)
- Self-hosted.
- API REST com especificação OpenAPI. Fonte: [API](https://superset.apache.org/developer-docs/api)
- Webhooks como canal de alertas e relatórios, com a feature flag `ALERT_REPORT_WEBHOOK`. Fonte: [alertas e relatórios](https://superset.apache.org/admin-docs/6.1.0/configuration/alerts-reports/)
- Servidor MCP oficial integrado (exige Superset 5.0 ou superior). Fonte: [servidor MCP](https://superset.apache.org/admin-docs/6.1.0/configuration/mcp-server/)
- Versão 6.1.0, de 2026-05-13. Fonte: [releases](https://github.com/apache/superset/releases/tag/6.1.0)

**Para uma skill:** um pedido de relatórios ou dashboards sobre uma base de dados existente tem o Metabase ou o Superset como opção na decisão «Adotar ou construir».

## Ver também

- [Adotar antes de construir](adotar-antes-de-construir.md) (Plataformas para adotar antes de construir)
- [Tabelas e dados densos](../design/tabelas-e-dados-densos.md) (Design e experiência de utilizador)

Fonte: Sites, documentação e repositórios oficiais de cada plataforma, ligados em cada ponto; consultados a 2026-11-04. Não vem do PDF.

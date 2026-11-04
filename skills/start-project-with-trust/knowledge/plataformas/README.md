# Plataformas para adotar antes de construir

⚠️ Esta secção não vem do PDF. Foi acrescentada a pedido do utilizador para que, antes de propor desenvolvimento, a skill procure plataformas que já resolvem a necessidade (open source primeiro) e formas de as ligar por API, webhooks ou MCP. Cada ponto liga à fonte oficial do projeto (consulta a 2026-11-04). Preços, licenças e suporte a MCP mudam depressa: confirmar antes de decidir.

Fonte: Sites, documentação e repositórios oficiais de cada plataforma, ligados em cada ponto; consultados a 2026-11-04. Não vem do PDF.

## Entradas

- [Adotar antes de construir](adotar-antes-de-construir.md) — Para cada necessidade funcional procura-se primeiro uma plataforma open source que a resolva e a forma de a ligar ao resto (API, webhooks ou MCP); desenvolver de raiz é uma opção a comparar, não o ponto de partida. *(fora do PDF)*
- [Automação e integração (n8n, Node-RED)](automacao-e-integracao.md) — Para ligar plataformas sem código à medida, o Node-RED (Apache 2.0) é open source e corre em qualquer lado; o n8n tem nós MCP oficiais e cloud, mas usa uma licença que o próprio projeto não chama open source. *(fora do PDF)*
- [BI e dashboards (Metabase, Superset)](bi-e-dashboards.md) — Para relatórios e dashboards sobre dados que já existem, o Metabase (AGPLv3 na edição open source) e o Apache Superset (Apache 2.0) evitam escrever ecrãs de relatório à mão; os dois têm API REST, alertas por webhook e servidor MCP oficial. *(fora do PDF)*
- [CMS e headless (WordPress, Directus, Strapi)](cms-e-headless.md) — Para sites e conteúdos, o WordPress (GPLv2+) é o CMS clássico com API REST; o Strapi (MIT, fora do `ee/`) e o Directus (licença MSCL, com restrições) são headless, com REST, GraphQL, webhooks e servidor MCP oficial. *(fora do PDF)*
- [ERP e CRM (Odoo, Dolibarr)](erp-e-crm.md) — Para faturação, clientes, stocks e contabilidade, o Dolibarr (GPLv3) é totalmente open source, com API REST e webhooks; o Odoo tem uma edição Community (LGPLv3) e uma Enterprise proprietária, API JSON-2 e servidor MCP oficial. *(fora do PDF)*
- [Formulários e inquéritos (LimeSurvey)](formularios-e-inqueritos.md) — Para inquéritos e formulários, o LimeSurvey (GPLv2+) corre em servidor próprio ou na cloud do projeto e integra-se pela API RemoteControl 2 (JSON-RPC); não tem webhooks nativos nem servidor MCP oficial. *(fora do PDF)*
- [Tickets, ativos e contratos (GLPI, Zammad)](tickets-ativos-e-contratos.md) — Para helpdesk, inventário e gestão de contratos, o GLPI (GPLv3) cobre os três e tem API REST, webhooks e servidor MCP oficial; o Zammad (AGPLv3) é só helpdesk, com API REST e webhooks. *(fora do PDF)*

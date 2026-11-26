---
id: plataformas/erp-e-crm
titulo: "ERP e CRM (Odoo, Dolibarr)"
seccao: "Plataformas para adotar antes de construir"
paginas: []
fonte: "Sites, documentação e repositórios oficiais de cada plataforma, ligados em cada ponto; consultados a 2026-11-04. Não vem do PDF."
verificado_em: 2026-11-26
editado_em: 2026-11-26
---

# ERP e CRM (Odoo, Dolibarr)

**Resumo:** Para faturação, clientes, stocks e contabilidade, o Dolibarr (GPLv3) é totalmente open source, com API REST e webhooks; o Odoo tem uma edição Community (LGPLv3) e uma Enterprise proprietária, API JSON-2 e servidor MCP oficial.

## Conteúdo

### Odoo

- Duas edições: Community em LGPL v3 e Enterprise sob licença proprietária. Fonte: [licenças](https://www.odoo.com/documentation/20.0/legal/licenses.html)
- Odoo Online, Odoo.sh ou on-premise. Planos (a 2026-11-04): One App Free a 0 €, Standard a 14,90 € por utilizador/mês (preço promocional de 12 meses) e Custom a 27,90 €, o único que inclui a API externa e a IA com agentes. Fonte: [preços](https://www.odoo.com/pricing)
- API externa JSON-2, introduzida na versão 19; o XML-RPC e o JSON-RPC estão a ser descontinuados. Fonte: [API externa](https://www.odoo.com/documentation/20.0/developer/reference/external_api.html)
- Webhooks de entrada e de saída, criados no Odoo Studio. Fonte: [webhooks](https://www.odoo.com/documentation/20.0/applications/studio/automated_actions/webhooks.html)
- Servidor MCP oficial na app Odoo AI. Por confirmar se exige a edição Enterprise ou o plano Custom. Fonte: [servidor MCP](https://www.odoo.com/documentation/20.0/applications/productivity/ai/mcp_server.html)
- Odoo 20, lançado em setembro de 2026. Fonte: [suporte por versão](https://www.odoo.com/documentation/20.0/administration/standard_extended_support.html)

### Dolibarr

- Cobre CRM, vendas, contratos, tickets, RH, stocks, compras, faturação, contabilidade, projetos e POS. Fonte: [dolibarr.org](https://www.dolibarr.org/)
- Licença GPL-3.0. Fonte: [repositório](https://github.com/Dolibarr/dolibarr)
- Self-hosted; não há cloud oficial única, só fornecedores parceiros listados no wiki. Fonte: [soluções cloud](https://wiki.dolibarr.org/index.php/Cloud_Solutions_for_Dolibarr_ERP_CRM)
- API REST com explorador integrado, e módulo Webhook que envia JSON para um URL externo. Fontes: [API REST](https://wiki.dolibarr.org/index.php/Module_Web_Services_API_REST_(developer)), [webhook](https://wiki.dolibarr.org/index.php?title=Module_Webhook)
- MCP: existe no core desde a 24.0.0, ainda em modo experimental. Fonte: [issue oficial](https://github.com/Dolibarr/dolibarr/issues/38356)
- Versão 24.0.4, de 2026-11-25, que acrescenta verificações de autorização em falta na API REST dos módulos `mos` e `eventattendees` (acesso entre clientes) e um token CSRF em falta na configuração da agenda. Fonte: [releases](https://github.com/Dolibarr/dolibarr/releases/tag/24.0.4)

**Para uma skill:** um pedido de faturação, CRM ou stocks tem o Dolibarr e o Odoo Community como opções na decisão «Adotar ou construir», e a coluna «Risco» indica o que no Odoo exige Enterprise ou o plano Custom.

## Ver também

- [Adotar antes de construir](adotar-antes-de-construir.md) (Plataformas para adotar antes de construir)
- [Tickets, ativos e contratos (GLPI, Zammad)](tickets-ativos-e-contratos.md) (Plataformas para adotar antes de construir)

## Histórico

- **2026-11-25**: antes, «Versão 24.0.1, de 2026-09-07. Fonte: [releases](https://github.com/Dolibarr/dolibarr/releases/tag/24.0.1)» (releases do Dolibarr, consultadas a 2026-11-04). Mudou porque saiu o Dolibarr 24.0.4, com verificações de autorização em falta na API REST. Fonte: [Dolibarr 24.0.4](https://github.com/Dolibarr/dolibarr/releases/tag/24.0.4). Confiança: alta. Editado a 2026-11-26.

Fonte: Sites, documentação e repositórios oficiais de cada plataforma, ligados em cada ponto; consultados a 2026-11-04. Não vem do PDF.

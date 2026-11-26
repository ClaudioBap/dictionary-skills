---
id: plataformas/tickets-ativos-e-contratos
titulo: "Tickets, ativos e contratos (GLPI, Zammad)"
seccao: "Plataformas para adotar antes de construir"
paginas: []
fonte: "Sites, documentação e repositórios oficiais de cada plataforma, ligados em cada ponto; consultados a 2026-11-04. Não vem do PDF."
verificado_em: 2026-11-26
editado_em: 2026-11-26
---

# Tickets, ativos e contratos (GLPI, Zammad)

**Resumo:** Para helpdesk, inventário e gestão de contratos, o GLPI (GPLv3) cobre os três e tem API REST, webhooks e servidor MCP oficial; o Zammad (AGPLv3) é só helpdesk, com API REST e webhooks.

## Conteúdo

### GLPI

- Cobre tickets (incidentes, pedidos, catálogo de serviços, SLA), inventário e CMDB, e contratos ligados a fornecedores com histórico de despesa. Fontes: [helpdesk](https://www.glpi-project.org/en/helpdesk-software/), [CMDB](https://www.glpi-project.org/en/cmdb-software/), [gestão financeira](https://www.glpi-project.org/en/financial-management-software/)
- Licença GPL-3.0. Fonte: [repositório](https://github.com/glpi-project/glpi)
- Self-hosted, ou cloud GLPI Network: Public Cloud a 19 € por agente/mês e Private Cloud a 21 € com mínimo de 25 agentes, sem IVA (a 2026-11-04). Fonte: [preços](https://www.glpi-project.org/en/pricing/)
- API REST v2 com OAuth2, e GraphQL só de leitura; cada instância publica o Swagger em `/api.php/doc`. Fonte: [API v2](https://help.glpi-project.org/documentation/modules/configuration/general/api/restful-api-v2)
- Webhooks nativos. Fonte: [webhooks](https://help.glpi-project.org/documentation/modules/configuration/webhook)
- Servidor MCP oficial no plugin GLPI AI 2.0, incluído nas subscrições GLPI Network. Por confirmar se está disponível sem subscrição. Fonte: [GLPI AI 2.0](https://www.glpi-project.org/en/glpi-ai-2-0-plugin/)
- Versão 12.0.2, de 2026-11-12, um lançamento de segurança com atualização recomendada: corrige cinco falhas de gravidade alta (escalada de privilégios pela API legada, contorno do consentimento do servidor OAuth, tomada de conta por dashboard embebido e por sequestro da reposição de palavra-passe, XSS armazenado em nomes de ficheiros); o 11.0.13, do mesmo dia, traz as correções à série 11. Fonte: [releases](https://github.com/glpi-project/glpi/releases/tag/12.0.2)

### Zammad

- Helpdesk com portal de cliente, SLA, base de conhecimento e canais (SMS, WhatsApp, redes sociais). Não faz inventário nem contratos. Fonte: [funcionalidades](https://zammad.com/en/product/features)
- Licença AGPLv3. Fonte: [repositório](https://github.com/zammad/zammad)
- Self-hosted gratuito, ou cloud a partir de 7 € por agente/mês com faturação anual (9 € mensal), sem IVA (a 2026-11-04). Fontes: [zammad.org](https://zammad.org/), [preços](https://zammad.com/en/pricing)
- API REST e webhooks. Fontes: [API](https://docs.zammad.org/en/latest/api/intro.html), [webhooks](https://admin-docs.zammad.org/en/latest/manage/webhook.html)
- MCP: o Zammad 7.3 traz o primeiro servidor MCP integrado, desligado por omissão (o administrador decide se o liga); os agentes ligam-se com um token de acesso pessoal do perfil, e o acesso segue as permissões que o Zammad já dá. A página não diz se depende da edição ou da licença. Fonte: [notas da versão 7.3](https://zammad.com/en/product/releases/7-3)
- Versão 7.3, de 2026-11-25: a atualização exige reindexar o Elasticsearch e traz alterações incompatíveis (pesquisa de tickets para clientes, login SSO, processamento de email, e apagar organizações pela API passa a exigir a permissão `admin.organization`). A 7.2.3, de 2026-11-11, corrigiu 43 vulnerabilidades (SSO, 2FA, controlo de acesso, sanitização de HTML); numa instalação própria atualiza-se de imediato e, com SSO atrás de nginx ou Apache2, o proxy define exatamente um de `X-Forwarded-User` e `Remote-User` e limpa o outro. Fontes: [notas da versão 7.3](https://zammad.com/en/product/releases/7-3), [notas da versão 7.2.3](https://zammad.com/en/product/releases/7-2-3)

**Para uma skill:** um pedido de tickets, inventário ou contratos tem o GLPI (ou o Zammad, se for só helpdesk) como opção na decisão «Adotar ou construir», com a forma de ligação indicada.

## Ver também

- [Adotar antes de construir](adotar-antes-de-construir.md) (Plataformas para adotar antes de construir)
- [Automação e integração (n8n, Node-RED)](automacao-e-integracao.md) (Plataformas para adotar antes de construir)

## Histórico

- **2026-11-25**: antes, «MCP: sem servidor oficial; a equipa disse no fórum oficial que os servidores existentes não são dela. Fonte: [fórum Zammad](https://community.zammad.org/t/mcp-and-ai-agentic-integration/19660)» e «Versão 7.2.2, de 2026-10-08. Fonte: [notas da versão](https://zammad.com/en/product/releases/7-2-2)» (fórum e notas da versão do Zammad, consultados a 2026-11-04). Mudou porque saiu o Zammad 7.3, com o primeiro servidor MCP integrado, depois da 7.2.3, de segurança. Fonte: [Zammad: notas da versão 7.3](https://zammad.com/en/product/releases/7-3). Confiança: alta. Editado a 2026-11-26.
- **2026-11-12**: antes, «Versão 12.0.1, de 2026-10-28. Fonte: [releases](https://github.com/glpi-project/glpi/releases/tag/12.0.1)» (releases do GLPI, consultadas a 2026-11-04). Mudou porque saíram o GLPI 12.0.2 e o 11.0.13, lançamentos de segurança. Fonte: [GLPI 12.0.2](https://github.com/glpi-project/glpi/releases/tag/12.0.2). Confiança: alta. Editado a 2026-11-26.

Fonte: Sites, documentação e repositórios oficiais de cada plataforma, ligados em cada ponto; consultados a 2026-11-04. Não vem do PDF.

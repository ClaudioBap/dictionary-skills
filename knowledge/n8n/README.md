# n8n

⚠️ Esta secção não vem do PDF. Foi acrescentada a pedido do utilizador (2026-11-26) para que a sub skill `n8n` decida, instale, construa e proteja workflows do n8n a partir das fontes oficiais do projeto. A comparação com o Node-RED, como forma de ligar plataformas sem código à medida, continua em [Automação e integração](../plataformas/automacao-e-integracao.md).

Fonte: documentação, repositório, avisos de segurança e anúncios oficiais do n8n, ligados em cada ponto; consultados a 2026-11-26. Não vem do PDF.

## Entradas

- [Alojar, escalar e atualizar o n8n](alojar-e-atualizar.md) — Em produção, o n8n corre em Docker com PostgreSQL, task runners externos e a chave de cifra guardada fora do servidor; escala em queue mode, com Redis e workers; atualiza-se pelo menos uma vez por mês, com a versão fixada. A cloud do n8n guarda os dados em Frankfurt. *(fora do PDF)*
- [API, webhooks e workflows no n8n](api-webhooks-e-workflows.md) — Os workflows falam com outros sistemas pelo nó Webhook (um URL de teste e outro de produção, com autenticação) e pela API pública (chave no cabeçalho `X-N8N-API-KEY`, limites por chave). Cada workflow tem um error workflow; o controlo de versões em Git só existe nos planos Business e Enterprise. *(fora do PDF)*
- [IA, agentes e MCP no n8n](ia-agentes-e-mcp.md) — O nó AI Agent trabalha sempre como agente com ferramentas e aceita modelos da Anthropic, entre outros. O MCP entra de três formas: um workflow exposto como servidor MCP, um nó que chama servidores MCP externos, e a instância inteira como servidor MCP, a que o Claude Code se liga por OAuth. *(fora do PDF)*
- [Licença, versões e canais do n8n](licenca-e-versoes.md) — O n8n é «fair-code»: a Sustainable Use License deixa usá-lo dentro da empresa e cobrar consultoria, mas não revendê-lo nem pô-lo à disposição dos clientes para ligarem as contas deles sem um acordo com a n8n. Há três linhas mantidas em paralelo (1.x até ao fim de 2026, 2.x e 3.x, que só corre em Docker), com os canais stable e beta. *(fora do PDF)*
- [Segurança de uma instância n8n](seguranca.md) — O n8n corre código e guarda as credenciais de outros sistemas, e tem tido falhas graves, como a CVE-2025-68613 (execução remota de código por injeção de expressões). Uma instância exposta corre uma versão com as correções publicadas, bloqueia os nós que mexem no servidor, usa task runners externos, passa a auditoria e tem TLS e 2FA. *(fora do PDF)*

# Exemplos: n8n

## O que faz

Serve para tudo o que é n8n: decidir se serve ao caso, instalar ou atualizar uma instância, construir workflows, ligá-los à IA e ao Claude Code por MCP, e proteger uma instância exposta. Pergunta primeiro o objetivo, onde corre e para quem é, lê só as entradas de `knowledge/n8n/` que o pedido toca e responde ou executa citando-as. Quando a base não chega, vai às fontes oficiais do n8n e regista o que encontrou.

## Quando usar

- Instalar o n8n num servidor próprio para produção, ou atualizar uma instância que já corre.
- Construir um workflow que recebe um webhook de uma plataforma e chama a API de outra.
- Ligar o Claude Code aos workflows do n8n por MCP.
- Saber se a licença deixa usar o n8n num serviço para clientes.
- Rever a segurança de uma instância antes de a abrir à internet.

## Quando não usar

- Escolher entre o n8n, o Node-RED ou código à medida num plano de projeto: a `orchestrate-sessions`, que lê `knowledge/plataformas/` no questionário.
- Preparar o servidor, o domínio e o TLS: `infra-deploy`.
- Escolher o modelo e o prompt de um agente: `ia-aplicada`.

## Exemplo: o Claude Code a usar os workflows

**Pedido:** «Quero que o Claude Code consiga correr os workflows do nosso n8n.»

**O que a skill faz:**

1. Pergunta onde corre o n8n e que versão tem, porque o MCP da instância e o diálogo «Connect a client» dependem da versão.
2. Lê `n8n/ia-agentes-e-mcp.md` e `n8n/seguranca.md`.
3. Liga o MCP da instância, marca como «Available in MCP» só os workflows que o pedido precisa e liga o Claude Code com `claude mcp add --transport http n8n https://<domínio>/mcp-server/http`, com OAuth.
4. Prova com a lista de ferramentas no Claude Code e uma execução no histórico do n8n.

**Resultado:** O Claude Code vê e corre só os workflows escolhidos, e o relatório diz onde ficou o token, sem o valor.

## Exemplo: o n8n para os clientes

**Pedido:** «Queremos oferecer aos nossos clientes um portal onde eles ligam as contas deles e montam automações. Usamos o n8n por baixo?»

**O que a skill faz:**

1. Lê `n8n/licenca-e-versoes.md`.
2. Diz que este uso fica fora do uso interno da licença e pede um acordo com a n8n, citando a página da licença.
3. Apresenta as opções da mais barata à mais cara (pedir o acordo à n8n, usar o Node-RED, que é Apache 2.0, ou escrever a integração) e recomenda uma, deixando a decisão ao utilizador.

**Resultado:** Uma decisão tomada antes de se construir, com a licença citada.

## Exemplo: abrir a instância à internet

**Pedido:** «Temos o n8n na rede interna e precisamos de receber webhooks de fora.»

**O que a skill faz:**

1. Lê a versão em uso e compara-a com os avisos de segurança publicados (`n8n/seguranca.md` e a página dos avisos, que muda depressa).
2. Se há um aviso crítico ou alto por corrigir, atualiza primeiro, com a cópia de segurança antes (`n8n/alojar-e-atualizar.md`).
3. Confirma `NODES_EXCLUDE`, task runners externos, TLS e 2FA, autentica os webhooks e corre `n8n audit`.
4. Passa à `infra-deploy` a parte do domínio e do proxy.

**Resultado:** A instância aberta só aos webhooks, com a saída de `n8n audit` no relatório.

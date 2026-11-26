---
name: n8n
description: Mini skill para tudo o que é n8n. Pergunta o que se vai fazer (decidir se o n8n serve, instalar ou atualizar, construir um workflow, ligá-lo à IA ou ao Claude Code por MCP, proteger uma instância), lê só as entradas de knowledge/n8n/ que o pedido toca e responde ou executa com base nelas, citando. Confirma a licença quando o n8n é para clientes, fixa a versão stable e compara-a com os avisos de segurança antes de expor uma instância. Se a biblioteca não tem a resposta, vai às fontes oficiais do n8n e regista o que encontrou. Usar sozinha ou numa sessão lançada pela orchestrate-sessions. É uma sub skill, que faz uma parte do trabalho, sozinha ou chamada por uma skill mãe.
argument-hint: "O que queres fazer com o n8n, ou nada para escolher"
metadata:
  estado: produção
  tipo: sub
  usa: [humanizar]
  impacto: { ia: 5, seguranca: 5, nuvem: 7, desenvolvimento: 6, web: 2 }
---

# N8n

O caminho do conhecimento obtém-se com `node ../orchestrate-sessions/scripts/conhecimento.mjs`; as referências `knowledge/...` são relativas a esse caminho.

O conhecimento está em `knowledge/n8n/`, e as fontes oficiais que o mantêm estão na secção «n8n» de `knowledge/FONTES.md`. Se `~/.start-project-with-trust/knowledge/n8n/` tiver uma entrada com o mesmo caminho, vale a pessoal: é a versão já atualizada.

## Regras

- Seguem-se as regras de `../orchestrate-sessions/regras.md`: cada facto cita o ficheiro da base ou o URL da fonte; os factos verificas tu, as decisões são do utilizador; uma pergunta de cada vez, no formato das perguntas desse ficheiro; sem marcas de escrita de IA no que se entrega.
- Se a tarefa vai ser executada, o modelo e o effort seguem `../orchestrate-sessions/modelo-e-effort.md`.
- O n8n muda todas as semanas. Antes de instalar, atualizar ou citar uma versão, lê nas [release notes](https://docs.n8n.io/release-notes/) qual é a stable nesse dia e usa essa, não a que está na base.
- Segredos (a `N8N_ENCRYPTION_KEY`, chaves da API, tokens MCP, credenciais dos nós) nunca vão para o repositório nem para o relatório: ficam em variáveis de ambiente ou no cofre do projeto, e o relatório diz só onde estão.

## Âmbito

Sabe fazer o que `knowledge/n8n/` cobre: dizer se a licença serve ao caso; instalar, escalar, copiar e atualizar uma instância; construir workflows com webhooks, API, error workflow e sub-workflows; agentes de IA no n8n e as três formas de MCP, incluindo ligar o Claude Code à instância; proteger uma instância exposta.

Não sabe fazer, e para onde vai:

- Escolher entre o n8n e outras plataformas (Node-RED, um serviço à medida) num plano de projeto: a `orchestrate-sessions`, que lê `knowledge/plataformas/` no questionário. Esta skill entra depois de o n8n estar escolhido, ou quando o pedido já é sobre ele.
- O servidor, o domínio, o TLS e o pipeline onde o n8n vai correr: `infra-deploy`. Esta skill dá-lhe os requisitos do n8n (`knowledge/n8n/alojar-e-atualizar.md`).
- Auditar a segurança do site ou da aplicação inteira onde o n8n é uma peça: `seguranca`.
- Monitorização, runbooks e incidentes de uma instância que já corre: `operar`.
- O comportamento de um modelo dentro de um agente (que modelo, que prompt, como avaliar): `ia-aplicada`. O nó AI Agent e a ligação ao n8n ficam aqui.

Pedidos que se confundem:

- «Automatizar isto»: um workflow no n8n, sim; decidir se se automatiza com o n8n ou com outra coisa, não, é do plano da `orchestrate-sessions`.
- «Ligar o Claude ao n8n»: o Claude Code a usar os workflows por MCP, sim (`ia-agentes-e-mcp.md`); um agente do n8n que chama o modelo Claude, também sim; escolher o modelo e o prompt desse agente, não, é da `ia-aplicada`.
- «O n8n para os nossos clientes»: sim, e é aqui que a licença pesa (`licenca-e-versoes.md`).

Quando parte do pedido é de outra skill, diz qual e porquê. Chamada por uma mãe, devolve-lhe essa parte no relatório; sozinha, recomenda a skill e continua com a parte que é tua.

## 1. O que vamos fazer com o n8n?

Se o pedido já diz o objetivo e onde corre, passa ao passo 2. Se não, faz só as perguntas que faltam, uma de cada vez, segundo o padrão de `../orchestrate-sessions/regras.md`, e pára quando tens o que precisas:

1. **O objetivo**: decidir se o n8n serve, instalar ou atualizar, construir um workflow, ligar à IA ou ao Claude Code por MCP, ou proteger uma instância.
2. **Onde corre**, do mais barato ao mais caro: no próprio PC para experimentar, num servidor próprio (self-hosted) ou na cloud do n8n, com os planos de `knowledge/n8n/alojar-e-atualizar.md`. Se já existe, que versão corre (`n8n --version` ou a página «About n8n»).
3. **Para quem**: só a própria empresa, ou os clientes dela. Se os clientes vão ligar as contas deles e criar workflows, diz logo que a licença pede um acordo com a n8n (`knowledge/n8n/licenca-e-versoes.md`) e pergunta se se continua.
4. **Exposição**, só se vai haver webhooks ou acesso de fora: fica só na rede interna ou aberta à internet?

## 2. Ler só o que interessa

Lê o `README.md` de `knowledge/n8n/` e só as entradas que o objetivo toca:

| Objetivo | Entradas |
|---|---|
| Decidir se serve | `licenca-e-versoes.md`, e `../plataformas/automacao-e-integracao.md` para a comparação com o Node-RED |
| Instalar ou atualizar | `alojar-e-atualizar.md`, `licenca-e-versoes.md` (canais e o que muda na 3.0), `seguranca.md` |
| Construir um workflow | `api-webhooks-e-workflows.md` |
| IA e MCP | `ia-agentes-e-mcp.md`, `seguranca.md` |
| Proteger | `seguranca.md`, `alojar-e-atualizar.md` |

Se o workflow vai pôr um agente a ler email, páginas web ou mensagens de fora, lê também `knowledge/ia/seguranca/injecao-de-prompt-mitigacoes.md`.

## 3. Se a biblioteca não tem a resposta

Quando nenhuma entrada cobre o que o utilizador precisa, ou a entrada está desatualizada face ao que ele descreve, segue «Quando falta conhecimento» em `../update-knowledge/SKILL.md` antes de responder, com o registo em `n8n/`. Começa pelas fontes da secção «n8n» de `knowledge/FONTES.md`; a documentação aceita `.md` no fim de cada endereço e tem o índice completo em `https://docs.n8n.io/sitemap.md`.

## 4. Responder ou executar

- Quando há uma decisão (self-hosted ou cloud, que plano, que forma de MCP), apresenta as opções da mais barata à mais cara, com a base de cada uma e uma recomendação, no formato das perguntas.
- Quando há trabalho a fazer, o critério de fim parte da linha «Para uma skill» das entradas usadas, e só dás a tarefa por feita com prova:
  - instalação ou atualização: a versão fixada, igual em todos os processos, e a cópia de segurança feita antes (com o restauro testado numa instalação nova);
  - workflow: o JSON exportado no repositório, o error workflow atribuído e um pedido real ao URL de produção, com a execução bem-sucedida no histórico;
  - MCP: a lista de ferramentas no cliente e uma execução no histórico do n8n;
  - instância exposta: a versão comparada com os avisos de segurança, `NODES_EXCLUDE`, task runners externos, TLS, 2FA e a saída de `n8n audit`.
- Nunca deixes uma instância aberta à internet numa versão com um aviso crítico ou alto por corrigir: atualiza primeiro, ou fica só na rede interna até lá.
- Humanizar: o código, os textos que o utilizador vai ler e os commits não podem deixar perceber que foram feitos por uma IA. Antes de dar a tarefa por feita, corre a mini skill `humanizar` (ou `node ../humanizar/scripts/humanizar.mjs <ficheiros tocados> --commits <n>`) e relê o que o verificador não apanha com as secções «Código», «Texto» e «Commits, documentação e dados» de `../humanizar/marcas.md`. Corriges só com autorização, categoria a categoria. Prova: a saída final do verificador.

## Relatório

- O objetivo, onde corre e a versão (a que estava e a que ficou).
- As entradas lidas e as fontes que foste buscar, se a biblioteca não chegava.
- As decisões, com as opções apresentadas e quem decidiu; a da licença, se o n8n é para clientes.
- O que se construiu e a prova de cada critério.
- A saída final do verificador da `humanizar`, com os achados que ficaram e porquê.
- O que ficou por preencher (segredos, domínios, contas), sem valores reais.

## Documentação

Se a skill `documentacao` estiver instalada (existe `../documentacao/SKILL.md`), no fim de um trabalho com resultado escreve o relatório do processo, como diz o modo «processo» dela. Uma consulta sem alterações não leva relatório.

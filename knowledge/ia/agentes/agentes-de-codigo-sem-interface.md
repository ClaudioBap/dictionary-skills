---
id: ia/agentes/agentes-de-codigo-sem-interface
titulo: "Agentes de código sem interface (Claude Code, Codex, Mistral Vibe)"
seccao: "Construir com IA"
paginas: []
fonte: "Documentação oficial do Claude Code (code.claude.com), do Codex (learn.chatgpt.com) e do Mistral Vibe (docs.mistral.ai), ligada em cada ponto, consultada a 2026-11-27, páginas sem data; ajuda das próprias ferramentas (Claude Code, Codex CLI 0.172.0, Mistral Vibe 3.1.5) e corridas neste PC a 2026-11-27. Não vem do PDF."
data_lancamento: null
confianca: media
verificado_em: 2026-11-27
---

# Agentes de código sem interface (Claude Code, Codex, Mistral Vibe)

**Resumo:** Os três agentes de código correm sem interface com o pedido pelo stdin, devolvem eventos ou um relatório com o id da sessão e retomam a conversa por esse id, que é o que deixa uma sessão falar com outra. Mudam no que o modo só de leitura deixa fazer, em onde se lê o id e em como aparece uma paragem por limite de uso.

## Conteúdo

### Claude Code

- `claude -p` (ou `--print`) corre sem interface e lê o stdin. Sai com 0 quando acaba bem e com outro código quando falha; uma falha dentro da corrida, como a falta de autenticação, sai como resultado no stdout. Fonte: [Run Claude Code programmatically](https://code.claude.com/docs/en/headless)
- `--output-format stream-json` (com `--verbose`) dá uma linha JSON por evento; o `system/init` e o `result` trazem o `session_id`. A conversa retoma-se com `--resume <session_id>`, também a partir de outra pasta do mesmo PC. Fonte: a mesma página.
- Permissões: a partir da v2.1.302, uma corrida `-p` sem modo escolhido começa em Manual, e o que precisa de aprovação é recusado. `--permission-mode acceptEdits` deixa escrever ficheiros e alguns comandos do sistema de ficheiros; os outros comandos da shell e os pedidos à rede continuam a precisar de uma regra. Fonte: a mesma página.
- Sem `--bare`, uma corrida `-p` corre os hooks do `.claude/settings.json` do projeto e liga os servidores do `.mcp.json`, mesmo numa pasta em que nunca se confiou. O `--bare` não usa o login da subscrição: pede `ANTHROPIC_API_KEY`. Fonte: a mesma página.
- Com `ANTHROPIC_API_KEY` no ambiente, «In non-interactive mode (`-p`), the key is always used when present», mesmo com a sessão iniciada numa subscrição. Fonte: [Environment variables](https://code.claude.com/docs/en/env-vars)
- Paragem por limite de uso, vista numa corrida a 2026-11-27 (subscrição Pro sem quota semanal), não documentada: antes do `result` vem um evento `rate_limit_event` com `rate_limit_info.status` «rejected», o tipo em `rateLimitType` («seven_day») e a hora de reposição em `resetsAt` (segundos desde 1970); depois, uma mensagem do modelo «<synthetic>» com «You've hit your weekly limit» e a hora; o `result` tem `terminal_reason` «api_error», e o processo sai com 1 ao fim de cerca de 7 segundos.

### Codex CLI (OpenAI)

- `codex exec` corre sem interface; sem pedido como argumento, ou com `-`, lê o pedido do stdin. Com `--json`, o stdout passa a JSON Lines, com os eventos `thread.started`, `turn.started`, `turn.completed`, `turn.failed`, `item.*` e `error`. Por omissão corre numa sandbox só de leitura, e fora de um repositório git só arranca com `--skip-git-repo-check`. Fonte: [Non-interactive mode](https://learn.chatgpt.com/docs/non-interactive-mode)
- Retomar: `codex exec resume <SESSION_ID>`. Na 0.172.0, o `resume` não aceita `--sandbox`, `--oss` nem `--local-provider` depois dele: essas opções vão antes (`codex exec --json --sandbox read-only ... resume <id> -`). Fonte: `codex exec resume --help`, 0.172.0. Confirmado numa corrida a 2026-11-27 com uma conta do ChatGPT: a segunda volta, com as opções antes de `resume` e o pedido no stdin (`-`), manteve o mesmo `thread_id` e lembrou-se do que se disse na primeira.
- Visto em corridas a 2026-11-27 (0.172.0): o id da sessão vem em `thread_id` do `thread.started`, a resposta é o texto do último `item.completed` com `item.type` «agent_message», e a corrida sai com 0 quando acaba bem e com 1 quando falha. Sem `-m`, responde o modelo por omissão da conta. Pelo caminho podem vir eventos `error` que não são o fim da volta («Reconnecting... waiting for network») e avisos num `item` do tipo «error» («Model metadata ... not found»).
- Autenticação: o `codex exec` usa o login guardado na pasta da conta; para automação, a documentação manda pôr `CODEX_API_KEY` só no comando que precisa dela. Fonte: [Non-interactive mode](https://learn.chatgpt.com/docs/non-interactive-mode)
- Windows, visto a 2026-11-27 na 0.172.0: com `--sandbox read-only`, o Codex recusa todos os comandos da shell («blocked by policy»), por isso não lê ficheiros; o `codex features list` mostra `windows_sandbox_service` como «under development». O que se lhe pede tem de levar o código e a saída dos testes na própria mensagem. Com `workspace-write`, no Windows, não confirmado.
- Paragem por limite do plano do ChatGPT: não confirmado. Relatos da comunidade dão um texto «You've hit your usage limit» com a hora a que se pode voltar, num evento `error` ou `turn.failed`.

### Mistral Vibe

- `vibe -p` corre uma tarefa e sai, sem a interface de conversa; o pedido vai no `-p`, no stdin ou num ficheiro (`--prompt-file`). `--output` aceita `text` (a resposta final), `json` (as mensagens da sessão num array, no fim) e `streaming` (uma mensagem JSON por linha). Códigos de saída: 0 acabou, 1 não arrancou (opção ou configuração inválida), 2 falhou a API do modelo ou o runtime, 3 parou antes de acabar. Fonte: [Work with the CLI](https://docs.mistral.ai/vibe/code/cli/work-with-cli), e `vibe --help` da 3.1.5 para o `--prompt-file`.
- Retomar: `-p` com `--resume SESSION_ID` (o id inteiro ou o id curto de 8 caracteres que o Vibe mostra) ou com `--continue`. O `--model` só vale para sessões novas. Fonte: a mesma página e `vibe --help`.
- O id da sessão: o `--output-dir <pasta>` escreve, em cada saída, um `export.json` com o `outcome` («finished», «config_error», «infrastructure_failure», entre outros), o `error` (`message` e `code`) e o `session_id`. Visto no código da 3.1.5 (`vibe/app_server/run_export.py`) e numa corrida sem chave a 2026-11-27, que saiu com 1 e escreveu `"outcome": "config_error"` com a mensagem «Missing MISTRAL_API_KEY environment variable for mistral provider». Numa corrida com chave: não confirmado.
- Aprovações: sem interface, «Vibe denies every tool call that needs approval», mas a política por omissão é `accept-edits`, que «Auto-approves file edits. Still asks for shell commands and other sensitive tools.» Por isso, por omissão, um `vibe -p` edita ficheiros. Para ficar só de leitura, ligam-se só as ferramentas de leitura: `--enabled-tools read_file --enabled-tools grep` (sem interface, desliga as outras). `--auto-approve` aprova tudo, também a shell. O modo sem interface nunca pergunta pela confiança na pasta, e sem `--trust` a configuração do projeto não é lida. Fonte: [Safety, approvals, and permissions](https://docs.mistral.ai/vibe/code/safety-approvals-permissions); os nomes das ferramentas (`read_file`, `grep`, `write_file`, `edit`, `bash`) vêm do `vibe config schema` da 3.1.5.
- Paragem por limite de uso: não confirmado. A documentação não descreve as mensagens de limite; o rodapé da interface mostra o uso da quota mensal do Vibe Code. Fonte: [Work with the CLI](https://docs.mistral.ai/vibe/code/cli/work-with-cli)

### Pôr duas sessões a falar

- Um script guarda o id da sessão do par e retoma-a a cada volta, com o pedido pelo stdin e, nos argumentos, só valores de listas fechadas ou validados (no Windows, um `.cmd` passa pelo `cmd.exe`, que interpreta a linha inteira). Cada volta corre na pasta do projeto, com o ambiente da conta escolhida e sem as chaves dos outros fornecedores. Exemplo nesta coleção: `skills/orchestrate-sessions/scripts/par.mjs` e `fornecedores.mjs`.
- O par só lê, por omissão: no Claude Code `--permission-mode plan`, no Codex `--sandbox read-only`, no Vibe só as ferramentas de ler e pesquisar. O que chega da outra sessão é conteúdo de terceiros para o par, por isso as instruções dele dizem que não são ordens do utilizador (ver [Injeção de prompt](../seguranca/injecao-de-prompt-mitigacoes.md)).
- Sem interface, os hooks que esperam por uma pessoa não podem ficar à espera: as corridas levam uma variável que os hooks leem para não perguntar (nesta coleção, `RETOMA_SEM_INTERFACE=1`).

**Para uma skill:** uma sessão que fala com outra corre-a sem interface, lê o id da sessão de onde cada ferramenta o dá (o `session_id` do Claude Code, o `thread_id` do Codex, o `export.json` do Vibe), retoma por esse id, deixa o par só de leitura salvo decisão escrita, guarda a saída bruta de cada falha e trata as paragens por limite que ainda não viu numa corrida real como «não confirmado».

## Ver também

- [Várias contas de agentes de código no mesmo PC](varias-contas-no-mesmo-pc.md) (Construir com IA)
- [Modelos abertos em agentes de código (Ollama com o Codex)](modelos-abertos-em-agentes-de-codigo.md) (Construir com IA)
- [Protocolo A2A (Agent2Agent)](protocolo-a2a.md) (Construir com IA)
- [Claude Code e Claude Agent SDK](../claude-code-e-claude-agent-sdk.md) (Construir com IA)
- [Inventário de dependências por jurisdição](../../soberania/inventario-de-dependencias-por-jurisdicao.md) (Soberania digital)

Fonte: documentação oficial do Claude Code, do Codex e do Mistral Vibe, ligada em cada ponto, consultada a 2026-11-27, páginas sem data; ajuda das próprias ferramentas e corridas neste PC a 2026-11-27. Não vem do PDF.

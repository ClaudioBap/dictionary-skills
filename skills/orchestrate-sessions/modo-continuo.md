# Modo contínuo

Trabalhar até o plano estar feito, mesmo quando o limite de uso pára as sessões. O que garante a retoma é o estado em disco (`estado.json`) e uma tarefa agendada que relança o trabalho parado. A espera automática do Claude Code ajuda, mas só numa sessão aberta e com os limites descritos abaixo. Os factos sobre o Claude Code vêm da documentação oficial, lida a 2026-11-16 (fontes no fim). O que a documentação não diz está marcado como observado nesta máquina, com a data.

## O que a skill pergunta antes de arrancar

Três perguntas, uma de cada vez, no formato de `regras.md`. A primeira, o nível de autonomia, faz-se em todos os trabalhos, como parte 2 do plano de delegação (`SKILL.md`); as outras duas, só quando o trabalho deve continuar sozinho. As respostas ficam em «Decisões» de `sessoes.md` (ou de `custo-beneficio.md`).

1. **Nível de autonomia**, do mais cauteloso ao mais autónomo:

   | Nível | O que faz sozinha | O que pergunta |
   |---|---|---|
   | Só executar o aprovado | As tarefas do plano aprovado. Uma dúvida pára essa tarefa e passa à seguinte | Tudo o resto, incluindo commit e push |
   | Executar e registar | O anterior, mais commits num ramo próprio (nunca no ramo principal), a lista «Por preencher» e as perguntas juntas para o fim | As decisões |
   | Decidir o pequeno | O anterior, mais decisões pequenas dentro do já aprovado (por exemplo, escolher entre bibliotecas equivalentes), registadas como pressupostos | Arquitetura, custo acima do orçamento, publicação, dados |
   | Máxima | O anterior, mais merge para o ramo principal e publicação em QA quando os verificadores estão verdes | Produção e gastos de dinheiro |

   Recomendação por omissão: «Executar e registar». Na retoma sem interface ninguém pode aprovar nada: o que o nível deixa fazer tem de estar em `retoma-permissoes.json`, e o resto fica em «Por preencher».
2. **Onde corre**: nesta máquina (tarefa agendada do Windows), na cloud (tarefas agendadas na cloud), ou ambos, com cada tarefa num só sítio. Recomendação: nesta máquina, se puder ficar ligada e com a sessão do Windows iniciada (bloqueada serve); na cloud, se não puder.
3. **Quota**: que parte da janela de 5 horas pode ir para trabalho autónomo. Por omissão, 100%: trabalha até ao limite e a tarefa agendada relança o que parou depois das pausas. Abaixo de 100% só funciona com a linha de estado a correr (ver «Vigiar o uso»): o orquestrador pára de lançar trabalho quando a percentagem usada chega ao valor escolhido e escreve a hora de reposição em `pausado_ate`, e a tarefa agendada só relança depois dessa hora.

## O que a espera automática faz e o que não faz

- Numa sessão interativa com conta claude.ai, quando o limite pára uma tarefa, o Claude Code espera na sessão aberta e continua depois da reposição (`autoContinueAtUsageLimit`, ligada por omissão desde a versão 2.1.234). Na continuação pede as permissões como sempre, por isso pode parar numa pergunta.
- A espera acaba sem continuar quando se sai do Claude Code (não recomeça ao retomar a sessão), quando a conversa muda de mãos (`/login`, `/resume`, `/restart`, passar para segundo plano ou para a cloud) ou quando se envia outra mensagem.
- Se o computador esteve suspenso mais de cerca de 30 minutos e o limite repôs durante esse tempo, fica à espera de um Enter.
- Ao fim de três continuações automáticas, pára.
- Não começa sozinha quando a reposição está a mais de 24 horas (o limite semanal pode repor daqui a dias), e não existe em corridas `-p` nem em sessões em segundo plano.
- A documentação não diz se vale no painel do VS Code. Observado nesta máquina até 2026-11-16: nos registos das sessões nunca houve uma continuação automática.
- Os subagentes não esperam: um subagente que bate no limite acaba com o erro `Agent terminated early due to an API error` (ou devolve o resultado parcial) e tem de ser relançado ou retomado depois da reposição.
- `/loop` e as tarefas de cron da sessão só correm com a sessão aberta e parada, e deixam de correr quando ela sai. Ao retomar com `--resume`, voltam as de cron que não expiraram (7 dias), mas não um `/loop` de intervalo escolhido pelo Claude.
- Observado nesta máquina a 2026-11-16: um reinício do Windows Update a meio da noite fechou todas as sessões.

## Como funciona nesta máquina

- **Estado em disco.** `estado.json` na pasta da orquestração (modelo em `modelos/estado.json`) tem uma linha por tarefa: `id`, `onda`, `sessao`, `modelo`, `briefing`, `saida`, `depende` e `estado` (`por fazer`, `em curso` ou `feito`). O orquestrador atualiza-o a cada tarefa que começa ou acaba e põe `terminado: true` no fim. `pausado_ate` e `falhas_seguidas` são do script de retoma, salvo a pausa por quota. `sessoes.md`, os briefings e as saídas são para pessoas e para a retoma ler.
- **Tarefa agendada.** O Agendador de Tarefas corre `scripts/retomar.mjs` de 15 em 15 minutos e ao iniciar sessão no Windows. O script só relança quando:
  - há tarefas que não estão `feito` e `terminado` é falso;
  - não há pausa em curso (`pausado_ate` no futuro);
  - ninguém escreve nas conversas da pasta onde as sessões abrem há 20 minutos (lê `~/.claude/projects/`; muda-se com `RETOMAR_SILENCIO_MIN`);
  - não há outra retoma viva (`retoma.lock`, com o PID).
- **O que lança.** `claude -p` sem interface, na pasta onde as sessões abrem, com o modelo do orquestrador (`--modelo`, por omissão `opus`) e as permissões de `retoma-permissoes.json`. O pedido manda ler o plano, `sessoes.md`, `estado.json`, os briefings e as saídas, relançar com o Agent as tarefas `em curso` sem saída, lançar as que já podem arrancar e atualizar o estado. Como numa corrida `-p` os subagentes em segundo plano param ao fim de 10 minutos de espera, o script põe `CLAUDE_CODE_PRINT_BG_WAIT_CEILING_MS=0`.
- **Pausas.** Uma corrida sem interface não espera pela reposição: se bate no limite, falha. Corridas seguidas que falham, ou que acabam sem mudar o estado de nenhuma tarefa (por exemplo, paradas numa permissão negada), dão pausas de 30, 60, 120 e 300 minutos, e depois de 300 em 300. Uma corrida que avança repõe o contador.
- **Na sessão aberta**, o orquestrador escreve `estado.json` a cada tarefa. Quando um subagente ou uma sessão morre por limite, a tarefa fica `em curso` e volta a ser lançada depois da pausa, pela sessão aberta se a espera automática a continuar, ou pela tarefa agendada.
- **Subagentes e sessões em paralelo gastam a mesma quota.** Dez em paralelo gastam-na cerca de dez vezes mais depressa. Com quota curta, a skill reduz o número de sessões em paralelo antes de reduzir o trabalho.
- **Ao retomar**, a primeira coisa é correr os verificadores e ler as saídas das sessões que terminaram entretanto, para não repetir trabalho.

## Instalar

Pré-requisito: a CLI autónoma (`npm install -g @anthropic-ai/claude-code`), com sessão iniciada na conta claude.ai. A extensão do VS Code traz uma cópia própria da CLI que não fica no PATH.

1. Copia `modelos/estado.json` e `modelos/retoma-permissoes.json` para a pasta da orquestração e preenche as tarefas. Acrescenta a `deny` os comandos de publicação do projeto (por exemplo, `Bash(*wrangler deploy*)`).
2. Pede autorização ao utilizador e regista a tarefa:
   `node <pasta desta skill>/scripts/agendar-retoma.mjs <pasta da orquestração> <pasta onde as sessões abrem> --modelo opus` (ou `fable`).
   A pasta onde as sessões abrem é a que o utilizador abre no VS Code ou onde corre `claude`: a retoma arranca lá, com o `CLAUDE.md` e as skills dessa pasta, e é nas conversas dela que se mede o silêncio. O nome da tarefa é «Claude - retomar <nome da pasta da orquestração>», ou o que se der em `--nome`. Uma tarefa com o mesmo nome não é substituída sem `--substituir`.
3. No fim do trabalho, remove-a: `node <pasta desta skill>/scripts/agendar-retoma.mjs --remover <pasta da orquestração>`.

A tarefa corre `wscript.exe scripts/retomar.vbs`, que lança o `node` sem abrir janela.

**macOS e Linux, não provado:** só o Windows foi testado. O `agendar-retoma.mjs` não regista nada nesses sistemas e mostra a linha para o cron (`crontab -e`):
`*/15 * * * * "<node>" "<pasta desta skill>/scripts/retomar.mjs" "<pasta da orquestração>" "<pasta onde as sessões abrem>" --modelo opus`.
No macOS também serve um LaunchAgent em `~/Library/LaunchAgents` com `StartInterval` 900 e `RunAtLoad`.

## Confirmar que está a funcionar

- `Get-ScheduledTask -TaskName "<nome>" | Get-ScheduledTaskInfo`: `LastRunTime` há menos de 15 minutos e `LastTaskResult` 0.
- `retoma.log`, na pasta da orquestração: uma linha quando relança («… a relançar com o modelo opus») e outra quando a corrida acaba («corrida de N min terminou», «falhou …; nova tentativa daqui a N min» ou «terminou … sem mudar o estado de nenhuma tarefa»). As verificações em que não há nada a fazer não ficam no registo.
- `node <pasta desta skill>/scripts/retomar.mjs <pasta da orquestração> <pasta onde as sessões abrem> --simular` diz se relançaria agora e, se não, porquê. Não lança nada.

Provado a 2026-11-16 nesta máquina: numa orquestração de teste com uma tarefa `em curso` sem saída, a tarefa agendada relançou-a com o modelo `haiku`, a tarefa ficou feita e o estado passou a terminado.

## Limites que ficam

- A tarefa só corre com a sessão do Windows iniciada. Depois de um reinício sem ninguém entrar no Windows, nada corre até alguém iniciar sessão; aí retoma.
- Computador desligado ou suspenso: nada corre.
- A corrida sem interface só faz o que a lista de permissões deixar. O que pedisse aprovação é negado, incluindo um `cd` seguido de `git` ou de um redirecionamento no mesmo comando; o pedido manda usar um comando de cada vez e `git -C <pasta>`.
- A corrida sem interface não tem linha de estado, por isso não vê a quota *(interpretação)*: com menos de 100%, só a sessão aberta a respeita.
- Se a sessão aberta continuar sozinha à mesma hora em que a tarefa agendada relança, as duas podem pegar na mesma tarefa: o trinco só cobre as corridas da tarefa agendada, e o silêncio de 20 minutos só reduz essa probabilidade.
- Com o limite semanal, as tentativas falham até à reposição, de 5 em 5 horas.

## Vigiar o uso

- A linha de estado recebe `rate_limits.five_hour` e `rate_limits.seven_day`, cada um com `used_percentage` e `resets_at` (segundos desde 1970). Só existem nos planos Pro, Max e Ultra da claude.ai, depois da primeira resposta da sessão, e cada janela desaparece quando passa o seu `resets_at`.
- O script `scripts/estado-uso.mjs` grava esses valores em `~/.start-project-with-trust/estado-uso.json` e mostra-os na linha de estado. Com uma quota abaixo de 100%, o orquestrador lê esse ficheiro antes de lançar cada sessão ou subagente.
- Para instalar, a skill pergunta primeiro e junta a `~/.claude/settings.json`, com o caminho absoluto e barras `/` (no Windows com o Git Bash instalado, as barras invertidas perdem-se):
  ```json
  "statusLine": { "type": "command", "command": "node C:/caminho/para/orchestrate-sessions/scripts/estado-uso.mjs" }
  ```
- Observado nesta máquina até 2026-11-16: no painel do VS Code a linha de estado não se mostrou fiável, e com um caminho relativo nunca correu. A documentação só mostra a quota na linha de estado, no `/usage` e no anel de uso da aplicação Desktop; não encontrei nela forma de a ler de fora de uma sessão.
- Sem a linha de estado, o modo contínuo funciona na mesma; só a quota abaixo de 100% deixa de ser possível, e a skill diz isso ao utilizador.

## Como funciona na cloud

Não provado nesta máquina.

- As tarefas agendadas na cloud (antes chamadas «routines»; `/schedule` ou claude.ai/code/routines) estão em pré-visualização. Correm na infraestrutura da Anthropic com o computador desligado, no mínimo de hora a hora (expressões mais frequentes são recusadas), e gastam a quota do plano como as sessões interativas. Sem créditos de uso, as corridas a mais são recusadas até a janela repor.
- Cada corrida clona os repositórios a partir do ramo por omissão e põe as alterações em ramos com o prefixo `claude/`. Por isso, o estado tem de estar no repositório (commits), e a tarefa agendada começa por ler `sessoes.md` e `estado.json`.
- As variáveis de ambiente do ambiente cloud são visíveis a quem o usa: as chaves vão para os segredos de rede. O que a tarefa não puder fazer sem acessos locais fica «Por preencher».
- Cada corrida começa em modo auto: um classificador aprova ou bloqueia cada ação, e bloqueios repetidos deixam uma pergunta à espera de resposta.
- Limite: 100 corridas agendadas por hora por conta; as que passam disso esperam.
- A aplicação Desktop também tem tarefas agendadas locais, mas só correm com a aplicação aberta e o computador acordado. Não foram provadas aqui.

## Fontes

Lidas a 2026-11-16.

- [Interactive mode: wait for a usage limit to reset](https://code.claude.com/docs/en/interactive-mode#wait-for-a-usage-limit-to-reset) e [Settings reference](https://code.claude.com/docs/en/settings-reference#autocontinueatusagelimit): espera automática, os casos em que acaba e `autoContinueAtUsageLimit`.
- [Run Claude Code programmatically](https://code.claude.com/docs/en/headless): `claude -p`, código de saída, `--output-format json`, permissões sem interface, `--permission-prompts none` e `CLAUDE_CODE_PRINT_BG_WAIT_CEILING_MS`.
- [CLI reference](https://code.claude.com/docs/en/cli-reference): `--model`, `--permission-mode`, `--settings`, `--add-dir`, `--max-turns`.
- [Scheduled tasks](https://code.claude.com/docs/en/scheduled-tasks): `/loop`, tarefas de cron da sessão e as suas limitações.
- [Status line](https://code.claude.com/docs/en/statusline): campos `rate_limits` e configuração no Windows.
- [Hooks: StopFailure](https://code.claude.com/docs/en/hooks#stopfailure): corre quando a vez acaba num erro da API, com `error` igual a `rate_limit`, entre outros; só para registo e avisos.
- [Sub-agents: API errors in subagents](https://code.claude.com/docs/en/sub-agents#api-errors-in-subagents) e [Errors](https://code.claude.com/docs/en/errors#youve-hit-your-session-limit): subagentes que batem no limite e limites de sessão e semanal.
- [Permissions](https://code.claude.com/docs/en/permissions#compound-commands): comandos compostos, `cd` e redirecionamentos.
- [Cloud scheduled tasks](https://code.claude.com/docs/en/routines) e [Desktop scheduled tasks](https://code.claude.com/docs/en/desktop-scheduled-tasks): tarefas agendadas na cloud e na aplicação Desktop.
- [VS Code](https://code.claude.com/docs/en/vs-code): a extensão traz uma cópia própria da CLI, fora do PATH.

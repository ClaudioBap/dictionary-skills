# Modo contínuo

Trabalhar sem parar até o plano estar feito, mesmo quando o limite de uso do plano é atingido: a sessão espera pela reposição e retoma onde ficou. Este ficheiro diz o que a skill pergunta, como vigia o uso e como retoma. Os factos sobre o Claude Code vêm da documentação oficial, consultada a 2026-11-10 (ligações no fim).

## O que a skill pergunta antes de arrancar

Três perguntas, uma de cada vez, no formato da Fase 1 da `start-project-with-trust`. As respostas ficam em «Decisões» de `sessoes.md` (ou de `custo-beneficio.md`).

1. **Nível de autonomia**, do mais cauteloso ao mais autónomo:

   | Nível | O que faz sozinha | O que pergunta |
   |---|---|---|
   | Só executar o aprovado | As tarefas do plano aprovado. Uma dúvida pára essa tarefa e passa à seguinte | Tudo o resto, incluindo commit e push |
   | Executar e registar | O anterior, mais commits num ramo próprio (nunca no ramo principal), a lista «Por preencher» e as perguntas juntas para o fim | As decisões |
   | Decidir o pequeno | O anterior, mais decisões pequenas dentro do já aprovado (por exemplo, escolher entre bibliotecas equivalentes), registadas como pressupostos | Arquitetura, custo acima do orçamento, publicação, dados |
   | Máxima | O anterior, mais merge para o ramo principal e publicação em QA quando os verificadores estão verdes | Produção e gastos de dinheiro |

   Recomendação por omissão: «Executar e registar».
2. **Onde corre**: nesta máquina (sessão aberta), na cloud (tarefas agendadas), ou ambos. Recomendação: nesta máquina, salvo se o utilizador não a puder deixar ligada.
3. **Quota**: que parte da janela de 5 horas pode ir para trabalho autónomo. Por omissão, 100%: ao bater no limite, espera e continua. Com menos de 100%, pára quando a percentagem usada chegar ao valor escolhido e retoma à hora da reposição.

## Como funciona nesta máquina

- **Estado em ficheiro.** Tudo o que é preciso para retomar está em `sessoes.md`, nos briefings e nas saídas das sessões. Nunca em memória da conversa.
- **Esperar pela reposição.** Numa sessão interativa com conta claude.ai, o Claude Code espera sozinho pela reposição do limite e continua a tarefa (definição `autoContinueAtUsageLimit`, ligada por omissão a partir da versão 2.1.234; a espera cancela-se com Esc). Não é preciso fazer nada; convém não desligar a sessão.
- **Vigiar o uso.** A linha de estado recebe `rate_limits.five_hour` e `rate_limits.seven_day`, cada um com `used_percentage` e `resets_at` (segundos desde 1970). O script `scripts/estado-uso.mjs` desta skill grava esses valores em `~/.start-project-with-trust/estado-uso.json` e mostra-os na linha de estado. A skill lê esse ficheiro antes de lançar cada sessão ou subagente.
- **Quota abaixo de 100%.** Quando `used_percentage` da janela de 5 horas chega ao valor escolhido, a skill não lança mais trabalho, escreve em `sessoes.md` «pausado até <hora de resets_at>» e agenda a retoma para essa hora com o `/loop` (modo dinâmico) ou com uma tarefa de cron da sessão. Ao acordar, lê `sessoes.md` e continua.
- **Subagentes e sessões em paralelo gastam a mesma quota.** Dez em paralelo gastam-na cerca de dez vezes mais depressa. Com quota curta, a skill reduz o número de sessões em paralelo antes de reduzir o trabalho.
- **Ao retomar**, a primeira coisa é correr os verificadores e ler as saídas das sessões que terminaram entretanto, para não repetir trabalho.

## Como funciona na cloud

- As tarefas agendadas (`/schedule`) correm na cloud da Anthropic com o computador desligado, no mínimo de hora a hora, e contam para a mesma quota do plano. Sem créditos de uso, as corridas são recusadas até à reposição.
- Cada corrida clona o repositório de fresco a partir do ramo principal e põe as alterações em ramos com o prefixo `claude/`. Por isso, o estado tem de estar no repositório (commits), e a tarefa agendada começa por ler `sessoes.md`.
- Segredos vão para os segredos da rede, não para variáveis de ambiente visíveis. O que a tarefa não puder fazer sem acessos locais fica «Por preencher».
- Limites: 100 corridas agendadas por hora por conta, expressões mais frequentes do que de hora a hora são recusadas.

## Instalar a linha de estado

Na primeira vez, a skill pergunta se pode instalar a linha de estado. Se sim, junta a `~/.claude/settings.json` (ou ao `.claude/settings.json` do projeto):

```json
"statusLine": { "type": "command", "command": "node <pasta desta skill>/scripts/estado-uso.mjs" }
```

Sem a linha de estado, o modo contínuo funciona na mesma com a espera automática; só a quota abaixo de 100% deixa de ser possível, e a skill diz isso ao utilizador.

## Fontes

- [Interactive mode: wait for a usage limit to reset](https://code.claude.com/docs/en/interactive-mode#wait-for-a-usage-limit-to-reset) e [Settings reference](https://code.claude.com/docs/en/settings-reference): espera automática e `autoContinueAtUsageLimit`.
- [Status line](https://code.claude.com/docs/en/statusline): campos `rate_limits.five_hour`, `rate_limits.seven_day`, `used_percentage`, `resets_at`, `cost.total_cost_usd`.
- [Scheduled tasks](https://code.claude.com/docs/en/scheduled-tasks): `/loop` e tarefas de cron da sessão.
- [Routines](https://code.claude.com/docs/en/routines): tarefas agendadas na cloud, limites e quota.
- [Agent view](https://code.claude.com/docs/en/agent-view#limitations): sessões em paralelo gastam a mesma quota.
- [Errors](https://code.claude.com/docs/en/errors): mensagens de limite e `CLAUDE_CODE_RETRY_WATCHDOG` para sessões sem supervisão.

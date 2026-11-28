---
id: ia/agentes/varias-contas-no-mesmo-pc
titulo: "Várias contas de agentes de código no mesmo PC"
seccao: "Construir com IA"
paginas: []
fonte: "Documentação oficial do Claude Code (code.claude.com), do Codex (learn.chatgpt.com) e do Mistral Vibe (docs.mistral.ai); Consumer Terms da Anthropic (em vigor desde 2025-10-08) e Terms of Use da OpenAI para a Europa (atualizados a 2026-01-16); consultados a 2026-11-27. Não vem do PDF."
data_lancamento: null
confianca: media
verificado_em: 2026-11-27
---

# Várias contas de agentes de código no mesmo PC

**Resumo:** No Claude Code e no Codex, cada conta é uma pasta de configuração própria (`CLAUDE_CONFIG_DIR`, `CODEX_HOME`) com o login, as definições e as sessões, e uma chave de API no ambiente ganha ao login da subscrição. O Mistral Vibe fica com uma conta por PC. As contas são pessoais: os termos da Anthropic e da OpenAI proíbem partilhá-las, e os da OpenAI proíbem contornar limites.

## Conteúdo

### Uma pasta por conta

- Claude Code: `CLAUDE_CONFIG_DIR` muda a pasta de configuração (por omissão `~/.claude`); «All settings, session history, and plugins are stored under this path», e serve «for running multiple accounts side by side», por exemplo `alias claude-work='CLAUDE_CONFIG_DIR=~/.claude-work claude'`. Escreve-se como caminho absoluto, e as definições do projeto não a podem mudar. Fonte: [Environment variables](https://code.claude.com/docs/en/env-vars)
- Claude Code, o que ganha ao login: `ANTHROPIC_API_KEY` «is used instead of your Claude Pro, Max, Ultra, Team, or Enterprise subscription even if you are logged in», e numa corrida `-p` é sempre usada quando existe; `CLAUDE_CODE_OAUTH_TOKEN` «Takes precedence over keychain-stored credentials». Numa corrida por conta, estas variáveis saem do ambiente, ou a corrida não gasta a subscrição da pasta. Fonte: a mesma página.
- Codex: `CODEX_HOME` (por omissão `~/.codex`) é a raiz do estado (configuração, autenticação, registos, sessões e skills), e «If set, the directory must already exist». `CODEX_API_KEY` e `CODEX_ACCESS_TOKEN` dão credenciais a um processo sem interface. Fonte: [Environment variables](https://learn.chatgpt.com/codex/config-file/environment-variables)
- Codex, onde fica o login: em `CODEX_HOME` ficam o `config.toml` e o `auth.json`, ou as credenciais no cofre do sistema. Fonte: [Advanced configuration](https://learn.chatgpt.com/docs/config-file/config-advanced). Neste PC (Windows, Codex 0.172.0), o login do ChatGPT ficou num `auth.json` dentro de `~/.codex` (visto a 2026-11-27); com outra `CODEX_HOME`, o login fica no `auth.json` dessa pasta *(interpretação)*. Quando as credenciais vão para o cofre do sistema, se duas pastas guardam logins separados não está confirmado.
- Mistral Vibe: a configuração vive em `~/.vibe/config.toml`, e o assistente de instalação guarda a chave «in your OS keyring, or in ~/.vibe/.env if no keyring is available»; em alternativa, `MISTRAL_API_KEY` no ambiente. Fonte: [CLI](https://docs.mistral.ai/vibe/code/cli). A documentação não tem variável para mudar a pasta. O código da 3.1.5 lê `VIBE_HOME` (`vibe/utils/vibe_home.py`), mas não está documentada, e se a chave no cofre do sistema fica separada por pasta não foi confirmado; por isso, uma conta da Mistral por PC.

### Termos

- Anthropic (contas Free, Pro, Max e Ultra, também no Claude Code): «You may not share your Account login information, Anthropic API key, or Account credentials with anyone else» nem tornar a conta disponível a outra pessoa. O acesso «through automated or non-human means, whether through a bot, script, or otherwise» é proibido, «Except when you are accessing our Services via an Anthropic API Key or where we otherwise explicitly permit it». Os termos não falam de uma pessoa ter várias contas. Fonte: [Consumer Terms of Service](https://www.anthropic.com/legal/consumer-terms), em vigor desde 2025-10-08.
- Claude Code: o login por OAuth é para quem comprou a subscrição e serve «ordinary use of Claude Code and other native Anthropic applications»; os limites anunciados dos planos Pro, Max e Ultra «assume ordinary, individual usage of Claude Code and the Agent SDK». Ninguém pode encaminhar pedidos pelas credenciais de uma subscrição em nome de outros utilizadores. Fonte: [Legal and compliance](https://code.claude.com/docs/en/legal-and-compliance)
- OpenAI (contas do ChatGPT na Europa): «You may not share your account credentials or make your account available to anyone else», e é proibido interferir com os serviços, «including circumventing any rate limits or restrictions». Os termos não falam de uma pessoa ter várias contas. Fonte: [Terms of Use (Europa)](https://openai.com/policies/eu-terms-of-use/), atualizados a 2026-01-16.
- Mistral: os termos que cobrem o Vibe não foram lidos (o índice está em [legal.mistral.ai](https://legal.mistral.ai/terms)).
- *(interpretação)* Uma pessoa com duas subscrições suas pode tê-las no mesmo PC, cada uma na sua pasta; cada conta é de uma pessoa só. Passar o trabalho para outra conta quando uma chega ao limite pode ser lido, nos termos da OpenAI, como contornar limites, e a Anthropic diz que os limites assumem uso individual e normal: antes de automatizar a troca, confirma-se com o fornecedor.

**Para uma skill:** cada conta é uma pasta registada com o fornecedor, o id e o caminho, e nunca com credenciais; a corrida aponta a variável da pasta e tira do ambiente as chaves que ganhariam ao login; a troca automática de conta num limite só acontece com decisão escrita do utilizador, e os termos de cada fornecedor confirmam-se antes de se usar mais de uma conta.

## Ver também

- [Agentes de código sem interface (Claude Code, Codex, Mistral Vibe)](agentes-de-codigo-sem-interface.md) (Construir com IA)
- [Licença, emparelhamento e cofre do agente local](../../portais-de-agentes/agente-local-licenca-e-emparelhamento.md) (Portais e mundos de agentes)

Fonte: documentação oficial do Claude Code, do Codex e do Mistral Vibe, e os termos da Anthropic e da OpenAI, ligados em cada ponto; consultados a 2026-11-27. Não vem do PDF.

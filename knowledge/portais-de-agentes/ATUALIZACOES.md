# Atualizações: Portais e mundos de agentes

Novidades com confiança alta ou média (as de média levam «Confiança: media»), organizadas por categoria e da mais recente para a mais antiga. Não alteram o texto das entradas. Cada linha tem o seu registo no [CHANGELOG](../CHANGELOG.md).

## Claude Code

- **data não indicada** em [Licença, emparelhamento e cofre do agente local](agente-local-licenca-e-emparelhamento.md): O login claude.ai do Claude Code tem fim, e usá-lo não o prolonga. A partir da v2.1.318, `claude auth status --text` mostra a janela em que acaba (linha `Sign-in ends: between ... and ...`); antes da data mais antiga volta-se a entrar com `/login` ou `claude auth login`. Quando faltam menos de 10 dias para a data mais tardia, uma corrida `claude -p` com saída de texto escreve `Warning: this sign-in` no stderr. Depois de expirar, sem outra credencial os pedidos falham (`Login reached its time limit` ou `Login expired`), uma sessão de Remote Control desliga-se e uma sessão em segundo plano deixa de avançar. O token de um ano do `claude setup-token` só serve para pedidos ao modelo, não para o Remote Control nem para os conectores do claude.ai. Fonte: [Claude Code: authentication](https://code.claude.com/docs/en/authentication). Confiança: media. Adicionado a 2026-11-26.

---
id: ia/agentes-as-quatro-formas-de-construir
titulo: "Agentes: as quatro formas de construir"
seccao: "Construir com IA (Claude e Anthropic)"
paginas: [67, 68]
fonte: Dicionario-Boas-Praticas.pdf
verificado_em: 2026-11-03
fontes_oficiais_consultadas_em: 2026-11-04
---

# Agentes: as quatro formas de construir

**Resumo:** Loop manual, Tool Runner, Managed Agents ou Claude Agent SDK, escolhidos por quem corre o ciclo e quem aloja.

## Conteúdo

- **Loop manual** (tu escreves o ciclo pedido→executar→repetir): controlo total. **Tool Runner** (o SDK corre o ciclo das tuas ferramentas): a mais comum para um agente de ferramentas próprias. **Managed Agents** (a Anthropic corre o ciclo e aloja um sandbox por sessão): agentes persistentes, versionados, agendáveis. **Claude Agent SDK** (o Claude Code como biblioteca, com ferramentas de ficheiros, bash, pesquisa): agente de código pronto a usar, na tua infraestrutura.

**Para uma skill:** escolher a forma pela pergunta «quem corre o ciclo e quem aloja»; começar pela mais simples que serve.

## Fontes oficiais

*Ligações externas que apoiam esta entrada, consultadas a 2026-11-04. Não alteram o texto acima.*

- [Agent SDK overview](https://code.claude.com/docs/en/agent-sdk/overview) — compara Agent SDK, Client SDK (loop manual/tool runner) e Managed Agents
- [Tool runner (SDK)](https://platform.claude.com/docs/en/agents-and-tools/tool-use/tool-runner) — o SDK corre o ciclo de ferramentas; loop manual para controlo
- [Claude Managed Agents overview](https://platform.claude.com/docs/en/managed-agents/overview) — harness gerido, sandbox por sessão, execuções agendadas

> **Nota (fonte oficial):** Tool Runner e Managed Agents estão em beta. Managed Agents também aceita sandbox self-hosted na infraestrutura do cliente, não só alojado pela Anthropic.

Fonte: págs. 67, 68 (Dicionario-Boas-Praticas.pdf)

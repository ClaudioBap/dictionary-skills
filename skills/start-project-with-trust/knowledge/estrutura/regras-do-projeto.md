---
id: estrutura/regras-do-projeto
titulo: "Regras do projeto (pessoas e agentes)"
seccao: "Estrutura e documentação"
paginas: [43]
fonte: Dicionario-Boas-Praticas.pdf
verificado_em: 2026-11-03
fontes_oficiais_consultadas_em: 2026-11-04
---

# Regras do projeto (pessoas e agentes)

**Resumo:** Um ficheiro de regras na raiz, para pessoas e agentes de IA, que manda sobre o hábito.

## Conteúdo

- Um ficheiro de regras na raiz (ex.: `CLAUDE.md` / `AGENTS.md`) com as convenções, o que fazer e o que nunca fazer, e onde está cada coisa.
- Escrito para quem chega e para agentes de IA; concreto, com exemplos; a referência manda, não o hábito.
- Atualizado quando uma regra muda; uma contradição com os documentos para o trabalho.

**Para uma skill:** existe um ficheiro de regras, e o trabalho novo está de acordo com ele.

## Ver também

- [Claude Code e Claude Agent SDK](../ia/claude-code-e-claude-agent-sdk.md) (Construir com IA (Claude e Anthropic))

## Fontes oficiais

*Ligações externas que apoiam esta entrada, consultadas a 2026-11-04. Não alteram o texto acima.*

- [How Claude remembers your project](https://code.claude.com/docs/en/memory) — CLAUDE.md na raiz com convenções, comandos e regras partilhadas via git
- [AGENTS.md](https://agents.md/) — «README para agentes» na raiz; o ficheiro mais próximo prevalece

> **Nota (fonte oficial):** A documentação do Claude Code diz que o Claude Code lê AGENTS.md diretamente (versões recentes), recomenda menos de 200 linhas por CLAUDE.md e avisa que instruções contraditórias podem ser escolhidas arbitrariamente; o CLAUDE.md é contexto, não imposição (para bloquear, usar hook PreToolUse).

Fonte: pág. 43 (Dicionario-Boas-Praticas.pdf)

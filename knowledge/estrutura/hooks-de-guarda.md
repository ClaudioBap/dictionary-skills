---
id: estrutura/hooks-de-guarda
titulo: "Hooks de guarda"
seccao: "Estrutura e documentação"
paginas: [43]
fonte: Dicionario-Boas-Praticas.pdf
verificado_em: 2026-11-03
fontes_oficiais_consultadas_em: 2026-11-04
---

# Hooks de guarda

**Resumo:** Hooks que protegem o frágil, mordendo só no que devem e com um interruptor deliberado.

## Conteúdo

- Hooks que protegem o que é frágil: travar escritas a ficheiros trancados, verificar a versão antes de um deploy, bloquear um comando perigoso.
- A guarda morde só no que deve (precisão), com um interruptor para destravar de propósito.

**Para uma skill:** ações perigosas (deploy, escrita na referência) passam por uma guarda automática.

## Ver também

- [Referência trancada](../estrutura/referencia-trancada.md) (Estrutura e documentação)

## Fontes oficiais

*Ligações externas que apoiam esta entrada, consultadas a 2026-11-04. Não alteram o texto acima.*

- [Hooks reference](https://code.claude.com/docs/en/hooks) — PreToolUse bloqueia comandos destrutivos ou escritas; filtros por ferramenta
- [pre-commit](https://pre-commit.com/) — Interruptor deliberado por hook (variável SKIP), sem desligar os restantes

> **Nota (fonte oficial):** A referência de hooks do Claude Code avisa que, por omissão, um hook PreToolUse que excede o tempo não bloqueia (usar "onFailure": "block") e que o filtro «if» é best-effort; para um allow/deny rígido recomenda o sistema de permissões.

Fonte: pág. 43 (Dicionario-Boas-Praticas.pdf)

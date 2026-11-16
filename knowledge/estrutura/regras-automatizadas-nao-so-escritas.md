---
id: estrutura/regras-automatizadas-nao-so-escritas
titulo: "Regras automatizadas, não só escritas"
seccao: "Estrutura e documentação"
paginas: [44]
fonte: Dicionario-Boas-Praticas.pdf
verificado_em: 2026-11-03
fontes_oficiais_consultadas_em: 2026-11-04
---

# Regras automatizadas, não só escritas

**Resumo:** A regra que importa vira verificação em hook ou CI; o documento explica, a automação impõe.

## Conteúdo

- A regra que importa vira verificação (hook ou CI), não fica só num documento nem na cabeça de alguém.
- O documento explica a regra; a automação impõe-na; vale a quem não leu o documento.

**Para uma skill:** uma regra nova que se queira garantir vira um hook ou um passo de CI.

## Ver também

- [Regras no CI, não só no agente](../governacao/regras-no-ci-nao-so-no-agente.md) (Governação e processo)

## Fontes oficiais

*Ligações externas que apoiam esta entrada, consultadas a 2026-11-04. Não alteram o texto acima.*

- [How Claude remembers your project](https://code.claude.com/docs/en/memory) — CLAUDE.md é contexto, não imposição; para bloquear, usar hook PreToolUse
- [pre-commit](https://pre-commit.com/) — As mesmas regras correm como hook local e como passo de CI
- [About protected branches](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-protected-branches/about-protected-branches) — Verificações obrigatórias antes do merge impõem a regra a todos

Fonte: pág. 44 (Dicionario-Boas-Praticas.pdf)

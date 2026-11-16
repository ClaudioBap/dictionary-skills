---
id: estrutura/especificacao-antes-do-codigo
titulo: "Especificação antes do código"
seccao: "Estrutura e documentação"
paginas: []
fonte: "Repositório do GitHub spec-kit e documentação do Claude Code, ligados em cada ponto; consultados a 2026-11-10, páginas sem data. Não vem do PDF."
data_lancamento: null
confianca: media
verificado_em: 2026-11-10
---

# Especificação antes do código

**Resumo:** Com agentes de código, escreve-se primeiro o que se quer e porquê, deixa-se o agente planear e implementar a partir disso, e só se aceita o trabalho com a prova à vista; as regras sem exceção vão para hooks, não para texto.

## Conteúdo

- O spec-kit (GitHub, licença MIT) descreve-se assim: «Define what to build and why, then turn the specification into a plan, tasks, and working code». Os comandos correm um de cada vez no agente: `/speckit-specify`, `/speckit-plan`, `/speckit-tasks`, `/speckit-implement`. A página não descreve cada passo em separado. Fonte: [spec-kit](https://github.com/github/spec-kit)
- Prova, não afirmação: a documentação do Claude Code manda pedir «evidence: the command it ran and its output, or the screenshot. 'All tests pass' on its own tells you very little». Fonte: [Best practices for Claude Code](https://code.claude.com/docs/en/best-practices)
- Regras sem exceção: «If something has to happen every time, make it a hook, a deny rule, or a managed setting. CLAUDE.md is for guidelines, and Claude is allowed to decide a guideline doesn't apply». Um hook de paragem «sends Claude back to work if the script exits with code 2». Fonte: a mesma página.
- O ficheiro de regras custa atenção: «Claude Code loads CLAUDE.md into every session, which means every line in it takes a little of Claude's attention on every task». Fica lá só o que o agente «couldn't work out from the code itself». Fonte: a mesma página.
- Memória é contexto, não imposição: «Claude treats them as context, not enforced configuration»; «To block an action regardless of what Claude decides, use a PreToolUse hook instead». Fonte: [How Claude remembers your project](https://code.claude.com/docs/en/memory)

**Para uma skill:** cada funcionalidade tem uma especificação escrita antes do código, com o critério de aceitação; a entrega mostra o comando e a saída, e as regras sem exceção estão em hooks e não só em texto.

## Ver também

- [Regras do projeto (pessoas e agentes)](regras-do-projeto.md) (Estrutura e documentação)
- [Regras automatizadas, não só escritas](regras-automatizadas-nao-so-escritas.md) (Estrutura e documentação)
- [Hooks de guarda](hooks-de-guarda.md) (Estrutura e documentação)

Fonte: repositório do GitHub spec-kit e documentação do Claude Code, ligados em cada ponto; consultados a 2026-11-10, páginas sem data. Não vem do PDF.

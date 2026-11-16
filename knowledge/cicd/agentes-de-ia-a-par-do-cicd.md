---
id: cicd/agentes-de-ia-a-par-do-cicd
titulo: "Agentes de IA a par do CI/CD"
seccao: "CI/CD e ferramentas"
paginas: [47, 48]
fonte: Dicionario-Boas-Praticas.pdf
verificado_em: 2026-11-03
fontes_oficiais_consultadas_em: 2026-11-04
---

# Agentes de IA a par do CI/CD

**Resumo:** Agentes podem questionar o que o pipeline já verifica, mas propõem e assinalam, nunca aprovam nem publicam.

## Conteúdo

- Além do pipeline que verifica o que está escrito, agentes podem correr em paralelo para questionar se continua a fazer sentido: testes obsoletos, cobertura em falta, documentação que já não bate com o código, dependências a envelhecer.
- O agente **propõe e assinala** (abre um PR, comenta, cria uma tarefa); nunca contorna o pipeline nem aprova sozinho. Os portões e as pessoas decidem.
- Bons alvos: detetar testes instáveis, sugerir casos em falta, apontar drift entre documentação, código e testes, propor atualização de dependências, rever o diff.
- Guardrails: o agente não publica; as sugestões passam pelo mesmo CI e revisão; as ações ficam registadas e são reversíveis.

**Para uma skill:** um agente que valida o pipeline abre PRs e assinala, mas o merge e o deploy continuam a exigir CI verde e aprovação humana.

## Fontes oficiais

*Ligações externas que apoiam esta entrada, consultadas a 2026-11-04. Não alteram o texto acima.*

- [Claude Code GitHub Actions](https://code.claude.com/docs/en/github-actions) — Agente abre PRs e comenta revisões; rever as alterações antes do merge
- [About protected branches](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-protected-branches/about-protected-branches) — Aprovações e verificações obrigatórias valem também para PRs de agentes

> **Nota (fonte oficial):** A documentação do Claude Code GitHub Actions indica que a app tem permissão de escrita em conteúdos e pode fazer push de commits; o «nunca aprova nem publica» tem de ser imposto pela proteção de branches e pelas permissões do workflow, não é garantido pela ferramenta.

Fonte: págs. 47, 48 (Dicionario-Boas-Praticas.pdf)

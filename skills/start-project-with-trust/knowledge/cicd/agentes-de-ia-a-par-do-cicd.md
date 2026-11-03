---
id: cicd/agentes-de-ia-a-par-do-cicd
titulo: "Agentes de IA a par do CI/CD"
seccao: "CI/CD e ferramentas"
paginas: [47, 48]
fonte: Dicionario-Boas-Praticas.pdf
verificado_em: 2026-11-03
---

# Agentes de IA a par do CI/CD

**Resumo:** Agentes podem questionar o que o pipeline já verifica, mas propõem e assinalam, nunca aprovam nem publicam.

## Conteúdo

- Além do pipeline que verifica o que está escrito, agentes podem correr em paralelo para questionar se continua a fazer sentido: testes obsoletos, cobertura em falta, documentação que já não bate com o código, dependências a envelhecer.
- O agente **propõe e assinala** (abre um PR, comenta, cria uma tarefa); nunca contorna o pipeline nem aprova sozinho. Os portões e as pessoas decidem.
- Bons alvos: detetar testes instáveis, sugerir casos em falta, apontar drift entre documentação, código e testes, propor atualização de dependências, rever o diff.
- Guardrails: o agente não publica; as sugestões passam pelo mesmo CI e revisão; as ações ficam registadas e são reversíveis.

**Para uma skill:** um agente que valida o pipeline abre PRs e assinala, mas o merge e o deploy continuam a exigir CI verde e aprovação humana.

Fonte: págs. 47, 48 (Dicionario-Boas-Praticas.pdf)

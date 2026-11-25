---
id: ia/avaliacao-evals
titulo: "Avaliação (evals)"
seccao: "Construir com IA"
paginas: [69]
fonte: Dicionario-Boas-Praticas.pdf
verificado_em: 2026-11-03
fontes_oficiais_consultadas_em: 2026-11-04
---

# Avaliação (evals)

**Resumo:** Medir a qualidade com evals antes e depois de cada mudança; sem evals, «melhorou» é opinião.

## Conteúdo

- Medir a qualidade com um conjunto de avaliação (evals): casos reais, método de pontuação claro, script que corre; sem evals, «melhorou» é opinião.
- Iterar contra os evals (hill-climbing) com divisão treino/validação/teste; cada corrida custa dinheiro, por isso definir orçamento.
- Critérios de sucesso: específicos (em vez de «bom desempenho», «classificação de sentimento correta»), mensuráveis (métricas numéricas ou escalas qualitativas bem definidas) e realistas para as capacidades dos modelos de ponta. Fonte: [Define success criteria and build evaluations](https://platform.claude.com/docs/en/test-and-evaluate/develop-tests) (página sem data, lida a 2026-11-25)
- Casos: seguem a distribuição real da tarefa e incluem casos-limite, como uma entrada irrelevante ou inexistente. Muitos casos com pontuação automática valem mais do que poucos pontuados à mão («Prioritize volume over quality»). Fonte: a mesma página.
- Pontuação, da mais rápida à mais cara: por código (correspondência exata ou de texto), a mais fiável e escalável mas sem nuance; por LLM, rápida e boa para juízos complexos, com a fiabilidade testada antes de escalar, uma rubrica detalhada e o avaliador com thinking ligado; e humana, flexível e de alta qualidade mas lenta e cara, a evitar se possível. Fonte: a mesma página.

**Para uma skill:** uma mudança num sistema de IA passa por um eval antes e depois; sem eval, não se sabe se melhorou. A prova regista os critérios de sucesso, o número de casos (com os casos-limite), o método de pontuação e o resultado antes e depois.

## Fontes oficiais

*Ligações externas que apoiam esta entrada, consultadas a 2026-11-04. Não alteram o texto acima.*

- [Define success criteria and build evaluations](https://platform.claude.com/docs/en/test-and-evaluate/develop-tests) — critérios mensuráveis, casos reais, pontuação por código, LLM ou humanos

Fonte: pág. 69 (Dicionario-Boas-Praticas.pdf)

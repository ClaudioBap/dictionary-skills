---
id: governacao/bus-factor-duas-pessoas-por-passo
titulo: "Bus factor: duas pessoas por passo"
seccao: "Governação e processo"
paginas: [59, 60]
fonte: Dicionario-Boas-Praticas.pdf
verificado_em: 2026-11-03
fontes_oficiais_consultadas_em: 2026-11-04
---

# Bus factor: duas pessoas por passo

**Resumo:** Nenhum passo crítico depende de uma só pessoa; automatizar o mecânico.

## Conteúdo

- Nenhum passo crítico (SQL, merges, deploys) deve depender de uma só pessoa.
- Automatizar o mecânico (migrações, versão, CHANGELOG) para reduzir a dependência.
- Um ficheiro `CODEOWNERS` em `.github/`, na raiz ou em `docs/` diz quem responde por cada parte: «Code owners are automatically requested for review when someone opens a pull request that modifies code that they own.» Fonte: [About code owners](https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/about-code-owners)
- Para o bus factor *(interpretação)*: cada caminho crítico do `CODEOWNERS` tem pelo menos duas pessoas ou uma equipa, para a revisão não parar quando uma falta.

**Para uma skill:** um passo que só uma pessoa sabe fazer é um risco a registar.

## Fontes oficiais

*Ligações externas que apoiam esta entrada, consultadas a 2026-11-04. Não alteram o texto acima.*

- [Leadership and Governance](https://opensource.guide/leadership-and-governance/) — Equipa núcleo e pelo menos um admin de reserva
- [Best Practices for Maintainers](https://opensource.guide/best-practices/) — Documentar processos e automatizar tarefas (testes, semantic-release)
- [About code owners](https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/about-code-owners) — Revisão obrigatória de code owner antes do merge

Fonte: págs. 59, 60 (Dicionario-Boas-Praticas.pdf)

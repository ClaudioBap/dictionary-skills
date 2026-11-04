---
id: governacao/regras-no-ci-nao-so-no-agente
titulo: "Regras no CI, não só no agente"
seccao: "Governação e processo"
paginas: [60]
fonte: Dicionario-Boas-Praticas.pdf
verificado_em: 2026-11-03
fontes_oficiais_consultadas_em: 2026-11-04
---

# Regras no CI, não só no agente

**Resumo:** As regras que importam vivem em hooks e no CI; o agente de IA é um atalho, não a barreira.

## Conteúdo

- As regras que importam (migrações aplicadas, versão coerente, segredos, documentação atualizada) vivem em hooks do git e no CI.
- Valem a quem não usa um agente de IA; o agente é um atalho, não a barreira.

**Para uma skill:** uma regra nova vira verificação no CI, não só instrução ao agente.

## Ver também

- [Regras automatizadas, não só escritas](../estrutura/regras-automatizadas-nao-so-escritas.md) (Estrutura e documentação)

## Fontes oficiais

*Ligações externas que apoiam esta entrada, consultadas a 2026-11-04. Não alteram o texto acima.*

- [githooks (Git manual)](https://git-scm.com/docs/githooks) — Hooks pre-commit/pre-push no cliente; pre-receive no servidor
- [About protected branches](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-protected-branches/about-protected-branches) — «Require status checks before merging»: o CI como barreira
- [Best Practices for Maintainers](https://opensource.guide/best-practices/) — Testes automáticos obrigatórios antes do merge

> **Nota (fonte oficial):** O manual do git diz que o pre-commit se contorna com --no-verify. Isto reforça a ideia da entrada: a barreira real é o CI no servidor.

Fonte: pág. 60 (Dicionario-Boas-Praticas.pdf)

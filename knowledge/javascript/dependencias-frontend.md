---
id: javascript/dependencias-frontend
titulo: "Dependências do frontend"
seccao: "Boas práticas de JavaScript"
paginas: []
fonte: "Fontes oficiais (MDN, TypeScript, ESLint, Prettier, web.dev, OWASP, W3C e documentação das ferramentas citadas), ligadas em cada ponto; consultadas a 2026-11-03. Pontos marcados «sem fonte oficial» são convenções escritas pelo assistente. Não vem do PDF."
verificado_em: 2026-11-03
---

# Dependências do frontend

**Resumo:** Lockfile versionado, `npm ci`, auditoria com limiar no CI, assinaturas verificadas e bibliotecas não usadas removidas.

## Conteúdo

- Lockfile versionado e `npm ci` no CI. — [docs.npmjs.com: package-lock.json](https://docs.npmjs.com/cli/v11/configuring-npm/package-lock-json), [docs.npmjs.com: npm ci](https://docs.npmjs.com/cli/v11/commands/npm-ci)
- **Utilidade:** `npm audit --audit-level=high` faz o CI falhar acima do limiar; `npm audit signatures` verifica a proveniência. Atualizações automáticas por bot (ex.: Dependabot). — [docs.npmjs.com: npm audit](https://docs.npmjs.com/cli/v11/commands/npm-audit), [docs.github.com: Dependabot](https://docs.github.com/en/code-security/dependabot/dependabot-version-updates/about-dependabot-version-updates)
- Analisar o bundle, remover bibliotecas não usadas, carregar em diferido as que não são precisas no arranque e preferir alternativas leves. — [web.dev: remover código não usado](https://web.dev/articles/remove-unused-code)

**Para uma skill:** dependências fixadas pelo lockfile, auditadas no CI e sem bibliotecas não usadas no bundle.

## Ver também

- [Ferramentas: dependências (auditoria e atualização)](../cicd/ferramentas-dependencias.md) (CI/CD e ferramentas)
- [Gestão de pacotes](../node/gestao-de-pacotes.md) (Boas práticas de Node.js)

Fonte: Fontes oficiais (MDN, TypeScript, ESLint, Prettier, web.dev, OWASP, W3C e documentação das ferramentas citadas), ligadas em cada ponto; consultadas a 2026-11-03. Pontos marcados «sem fonte oficial» são convenções escritas pelo assistente. Não vem do PDF.

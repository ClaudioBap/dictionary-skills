---
id: node/gestao-de-pacotes
titulo: "Gestão de pacotes"
seccao: "Boas práticas de Node.js"
paginas: []
fonte: "Fontes oficiais (documentação do Node.js, npm, OWASP, Docker e projetos citados), ligadas em cada ponto; consultadas a 2026-11-03. Pontos marcados «sem fonte oficial» são convenções escritas pelo assistente. Não vem do PDF."
verificado_em: 2026-11-25
editado_em: 2026-11-25
---

# Gestão de pacotes

**Resumo:** Lockfile versionado, `npm ci` no CI, sem dependências de dev em produção, scripts de instalação desligados e assinaturas verificadas.

## Conteúdo

- O `package-lock.json` é para versionar no repositório. — [docs.npmjs.com: package-lock.json](https://docs.npmjs.com/cli/v11/configuring-npm/package-lock-json)
- No CI e nos deploys, instalar com `npm ci`: falha em vez de alterar o lockfile. — [docs.npmjs.com: npm ci](https://docs.npmjs.com/cli/v11/commands/npm-ci)
- Separar `devDependencies` e omiti-las em produção (`--omit=dev`, por omissão quando `NODE_ENV=production`). — [docs.npmjs.com: npm install](https://docs.npmjs.com/cli/v11/commands/npm-install)
- Auditar vulnerabilidades com `npm audit` e verificar assinaturas e proveniência com `npm audit signatures`. — [docs.npmjs.com: npm audit](https://docs.npmjs.com/cli/v11/commands/npm-audit)
- Não deixar correr os scripts de instalação das dependências sem aprovação. No npm 12 já estão bloqueados por omissão: aprovar só os que precisam deles com `npm install-scripts approve`, que os grava no campo `allowScripts` do `package.json`, e ligar `strict-allow-scripts=true` no CI para a instalação falhar quando aparece um script por rever. No npm 11, que é o que vem com o Node 26.13.1, pôr `ignore-scripts=true` no `.npmrc` e permitir só os pacotes que precisam deles. — [npm CLI: CHANGELOG](https://github.com/npm/cli/blob/latest/CHANGELOG.md), [docs.npmjs.com: config (v12)](https://docs.npmjs.com/cli/v12/using-npm/config), [OWASP NPM Security Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/NPM_Security_Cheat_Sheet.html), [docs.npmjs.com: config](https://docs.npmjs.com/cli/v11/using-npm/config)
- Desconfiar de pacotes muito recentes sem histórico e dar tempo às versões novas antes de as adotar (opção `min-release-age` do npm 11; confirmar a versão do npm). — [OWASP NPM Security Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/NPM_Security_Cheat_Sheet.html), [docs.npmjs.com: config](https://docs.npmjs.com/cli/v11/using-npm/config)

**Para uma skill:** build reprodutível a partir do lockfile com `npm ci`; dependências auditadas, assinaturas verificadas e sem pacotes de dev em produção.

## Ver também

- [Cadeia de fornecimento verificada](../seguranca/cadeia-de-fornecimento-verificada.md) (Segurança)
- [Ferramentas: dependências (auditoria e atualização)](../cicd/ferramentas-dependencias.md) (CI/CD e ferramentas)

Fonte: Fontes oficiais (documentação do Node.js, npm, OWASP, Docker e projetos citados), ligadas em cada ponto; consultadas a 2026-11-03. Pontos marcados «sem fonte oficial» são convenções escritas pelo assistente. Não vem do PDF.

## Histórico

- **2026-07-08**: antes, «Desligar os scripts de instalação por omissão (`ignore-scripts=true` no `.npmrc`) e permitir só os pacotes que precisam deles.» ([OWASP NPM Security Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/NPM_Security_Cheat_Sheet.html), [docs.npmjs.com: config](https://docs.npmjs.com/cli/v11/using-npm/config)). Mudou porque o npm 12.0.0 passou a bloquear por omissão os scripts de instalação das dependências que a política `allowScripts` do projeto não autoriza. Fonte: [npm CLI: CHANGELOG](https://github.com/npm/cli/blob/latest/CHANGELOG.md). Editado a 2026-11-25.

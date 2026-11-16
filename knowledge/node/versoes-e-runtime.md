---
id: node/versoes-e-runtime
titulo: "Versões e runtime"
seccao: "Boas práticas de Node.js"
paginas: []
fonte: "Fontes oficiais (documentação do Node.js, npm, OWASP, Docker e projetos citados), ligadas em cada ponto; consultadas a 2026-11-03. Pontos marcados «sem fonte oficial» são convenções escritas pelo assistente. Não vem do PDF."
verificado_em: 2026-11-03
---

# Versões e runtime

**Resumo:** Usar uma versão Active ou Maintenance LTS, declarada no projeto, igual em todos os ambientes e atualizada antes do fim de suporte.

## Conteúdo

- Em produção, usar só versões Active LTS ou Maintenance LTS. A 2026-11-03: v26 (Active LTS, EOL 2029-04-30), v24 (Maintenance, EOL 2028-04-30) e v22 (Maintenance, EOL 2027-04-30). — [nodejs.org/en/about/previous-releases](https://nodejs.org/en/about/previous-releases), [github.com/nodejs/Release](https://github.com/nodejs/Release)
- Declarar a versão em `engines` e, para a equipa e o CI, em `devEngines.runtime` com `onFail: "error"`; o `engines` sozinho só gera avisos. Usar a mesma versão maior em dev, CI e produção. — [docs.npmjs.com: package.json](https://docs.npmjs.com/cli/v11/configuring-npm/package-json)
- Planear a atualização antes da data de fim de suporte (EOL) da linha em uso. — [nodejs.org/en/about/previous-releases](https://nodejs.org/en/about/previous-releases)
- **Utilidade:** `node --run <script>` corre scripts do `package.json` sem arrancar o npm. — [nodejs.org/api/cli.html](https://nodejs.org/api/cli.html)
- **Utilidade:** `node --watch` reinicia o processo quando os ficheiros mudam (Stable). — [nodejs.org/api/cli.html](https://nodejs.org/api/cli.html)

**Para uma skill:** a versão é Active ou Maintenance LTS, está declarada no `package.json` e é a mesma versão maior em todos os ambientes.

Fonte: Fontes oficiais (documentação do Node.js, npm, OWASP, Docker e projetos citados), ligadas em cada ponto; consultadas a 2026-11-03. Pontos marcados «sem fonte oficial» são convenções escritas pelo assistente. Não vem do PDF.

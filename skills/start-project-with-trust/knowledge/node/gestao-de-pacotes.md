---
id: node/gestao-de-pacotes
titulo: "Gestão de pacotes"
seccao: "Boas práticas de Node.js"
paginas: []
fonte: "Conhecimento do assistente (Claude), sem fonte verificada; escrito a 2026-11-03 a pedido do utilizador. Não vem do PDF."
verificado_em: 2026-11-03
---

# Gestão de pacotes

**Resumo:** Lockfile versionado, `npm ci` no CI, dependências de dev separadas e scripts de instalação vigiados.

## Conteúdo

- Lockfile (`package-lock.json` ou equivalente) versionado; no CI e nas imagens instalar com `npm ci`.
- Separar `dependencies` de `devDependencies`; em produção instalar sem as de dev.
- Auditar (`npm audit`) e atualizar por bot; desconfiar de pacotes novos, pouco usados ou com scripts de instalação (`postinstall`).

**Para uma skill:** build reprodutível a partir do lockfile; dependências auditadas e sem pacotes de dev em produção.

## Ver também

- [Cadeia de fornecimento verificada](../seguranca/cadeia-de-fornecimento-verificada.md) (Segurança)
- [Ferramentas: dependências (auditoria e atualização)](../cicd/ferramentas-dependencias.md) (CI/CD e ferramentas)

Fonte: Conhecimento do assistente (Claude), sem fonte verificada; escrito a 2026-11-03 a pedido do utilizador. Não vem do PDF.

---
id: javascript/dependencias-frontend
titulo: "Dependências do frontend"
seccao: "Boas práticas de JavaScript"
paginas: []
fonte: "Conhecimento do assistente (Claude), sem fonte verificada; escrito a 2026-11-03 a pedido do utilizador. Não vem do PDF."
verificado_em: 2026-11-03
---

# Dependências do frontend

**Resumo:** Lockfile no repositório, instalação reprodutível, auditoria e controlo do peso das dependências.

## Conteúdo

- Lockfile versionado; instalar no CI com `npm ci` (ou o equivalente do gestor usado).
- Auditar vulnerabilidades no CI e atualizar por bot (Dependabot/Renovate).
- Antes de juntar uma dependência, ver o peso que acrescenta ao bundle e se a funcionalidade nativa chega.

**Para uma skill:** as dependências estão fixadas pelo lockfile, auditadas, e cada nova dependência justifica o seu peso.

## Ver também

- [Ferramentas: dependências (auditoria e atualização)](../cicd/ferramentas-dependencias.md) (CI/CD e ferramentas)

Fonte: Conhecimento do assistente (Claude), sem fonte verificada; escrito a 2026-11-03 a pedido do utilizador. Não vem do PDF.

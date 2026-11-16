---
id: node/permissoes-do-processo
titulo: "Permissões do processo"
seccao: "Boas práticas de Node.js"
paginas: []
fonte: "Fontes oficiais (documentação do Node.js, npm, OWASP, Docker e projetos citados), ligadas em cada ponto; consultadas a 2026-11-03. Pontos marcados «sem fonte oficial» são convenções escritas pelo assistente. Não vem do PDF."
verificado_em: 2026-11-03
---

# Permissões do processo

**Resumo:** Limitar o que o processo pode fazer com o Permission Model, sabendo que não protege contra código malicioso.

## Conteúdo

- Arrancar com `--permission` e conceder só o necessário (`--allow-fs-read`, `--allow-fs-write`, `--allow-child-process`, `--allow-worker`, etc.) (Stable). — [nodejs.org/api/permissions.html](https://nodejs.org/api/permissions.html)
- Verificar permissões em runtime com `process.permission.has()`. — [nodejs.org/api/permissions.html](https://nodejs.org/api/permissions.html)
- É um «cinto de segurança»: não protege contra código malicioso. — [nodejs.org/api/permissions.html](https://nodejs.org/api/permissions.html)

**Para uma skill:** o processo arranca com `--permission` e as permissões concedidas estão no repositório.

Fonte: Fontes oficiais (documentação do Node.js, npm, OWASP, Docker e projetos citados), ligadas em cada ponto; consultadas a 2026-11-03. Pontos marcados «sem fonte oficial» são convenções escritas pelo assistente. Não vem do PDF.

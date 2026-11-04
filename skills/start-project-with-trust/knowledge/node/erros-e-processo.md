---
id: node/erros-e-processo
titulo: "Erros e processo"
seccao: "Boas práticas de Node.js"
paginas: []
fonte: "Fontes oficiais (documentação do Node.js, npm, OWASP, Docker e projetos citados), ligadas em cada ponto; consultadas a 2026-11-03. Pontos marcados «sem fonte oficial» são convenções escritas pelo assistente. Não vem do PDF."
verificado_em: 2026-11-03
---

# Erros e processo

**Resumo:** Tratar todas as rejeições, encadear erros com `cause` e terminar o processo depois de uma exceção não apanhada.

## Conteúdo

- Qualquer promessa pode ser rejeitada; tratar sempre a rejeição. Desde v15, uma rejeição não tratada termina o processo (`--unhandled-rejections=throw` por omissão). — [nodejs.org/api/errors.html](https://nodejs.org/api/errors.html), [nodejs.org/api/cli.html](https://nodejs.org/api/cli.html)
- Depois de `uncaughtException` não é seguro continuar: registar e terminar; o orquestrador reinicia. — [nodejs.org/api/process.html](https://nodejs.org/api/process.html)
- **Utilidade:** encadear erros com `new Error(msg, { cause })`. — [nodejs.org/api/errors.html](https://nodejs.org/api/errors.html)
- Preferir `process.exitCode` a `process.exit()`, para o processo terminar naturalmente. — [nodejs.org/api/process.html](https://nodejs.org/api/process.html)

**Para uma skill:** não há rejeições por tratar; um erro fatal regista-se e termina o processo.

Fonte: Fontes oficiais (documentação do Node.js, npm, OWASP, Docker e projetos citados), ligadas em cada ponto; consultadas a 2026-11-03. Pontos marcados «sem fonte oficial» são convenções escritas pelo assistente. Não vem do PDF.

---
id: node/configuracao-e-segredos
titulo: "Configuração e segredos"
seccao: "Boas práticas de Node.js"
paginas: []
fonte: "Fontes oficiais (documentação do Node.js, npm, OWASP, Docker e projetos citados), ligadas em cada ponto; consultadas a 2026-11-03. Pontos marcados «sem fonte oficial» são convenções escritas pelo assistente. Não vem do PDF."
verificado_em: 2026-11-03
---

# Configuração e segredos

**Resumo:** Segredos num serviço de gestão de segredos, `.env` só em desenvolvimento e `NODE_ENV=production` sempre em produção.

## Conteúdo

- Guardar segredos num serviço de gestão de segredos; variáveis de ambiente só quando não houver alternativa. — [OWASP Secrets Management Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Secrets_Management_Cheat_Sheet.html)
- **Utilidade:** em desenvolvimento, carregar o `.env` com `node --env-file=.env` (ou `--env-file-if-exists`) ou com `process.loadEnvFile()`, sem a dependência dotenv (Stable). O `.env` fica fora do git. — [nodejs.org: variáveis de ambiente](https://nodejs.org/en/learn/command-line/how-to-read-environment-variables-from-nodejs), [nodejs.org/api/cli.html](https://nodejs.org/api/cli.html)
- Definir `NODE_ENV=production` em todos os ambientes que correm a aplicação; usar `NODE_ENV` para distinguir ambientes é um antipadrão. — [nodejs.org: development vs production](https://nodejs.org/en/learn/getting-started/nodejs-the-difference-between-development-and-production)
- Não registar segredos em texto claro. — [OWASP Secrets Management Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Secrets_Management_Cheat_Sheet.html)
- Ler a configuração num só módulo, validada no arranque, e recusar arrancar se estiver incompleta. *(sem fonte oficial)*

**Para uma skill:** nenhum segredo no repositório; segredos num serviço de gestão de segredos; `NODE_ENV=production` em produção.

## Ver também

- [Segredos num cofre, fora do código e do disco](../seguranca/segredos-num-cofre.md) (Segurança)
- [Ambientes seguros por omissão](../seguranca/ambientes-seguros-por-omissao.md) (Segurança)

Fonte: Fontes oficiais (documentação do Node.js, npm, OWASP, Docker e projetos citados), ligadas em cada ponto; consultadas a 2026-11-03. Pontos marcados «sem fonte oficial» são convenções escritas pelo assistente. Não vem do PDF.

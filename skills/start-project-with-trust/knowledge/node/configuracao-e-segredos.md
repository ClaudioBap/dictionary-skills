---
id: node/configuracao-e-segredos
titulo: "Configuração e segredos"
seccao: "Boas práticas de Node.js"
paginas: []
fonte: "Conhecimento do assistente (Claude), sem fonte verificada; escrito a 2026-11-03 a pedido do utilizador. Não vem do PDF."
verificado_em: 2026-11-03
---

# Configuração e segredos

**Resumo:** Configuração por variáveis de ambiente, validada no arranque e lida num só módulo; segredos fora do repositório.

## Conteúdo

- Ler `process.env` num só módulo de configuração, validado com um esquema no arranque; se faltar algo, a aplicação não arranca.
- `.env` só para desenvolvimento local e fora do git; em produção, segredos vêm de um cofre ou do orquestrador.
- Nunca registar valores de configuração sensíveis no log.

**Para uma skill:** a aplicação valida a configuração ao arrancar e falha se estiver incompleta; nenhum segredo no repositório.

## Ver também

- [Segredos num cofre, fora do código e do disco](../seguranca/segredos-num-cofre.md) (Segurança)
- [Ambientes seguros por omissão](../seguranca/ambientes-seguros-por-omissao.md) (Segurança)

Fonte: Conhecimento do assistente (Claude), sem fonte verificada; escrito a 2026-11-03 a pedido do utilizador. Não vem do PDF.

---
id: seguranca/ambientes-seguros-por-omissao
titulo: "Ambientes seguros por omissão"
seccao: "Segurança"
paginas: [5]
fonte: Dicionario-Boas-Praticas.pdf
verificado_em: 2026-11-03
---

# Ambientes seguros por omissão

**Resumo:** Sem configuração, ou com configuração errada, a aplicação cai no modo mais restrito: falha fechado.

## Conteúdo

- Sem configuração, a aplicação cai no modo mais restrito, não no mais permissivo.
- Só o valor literal de produção compra os privilégios de produção; um valor errado falha para o lado seguro.
- A aplicação recusa arrancar se o ambiente declarado não bater com o destino a que está ligada.

**Para uma skill:** um erro ou falta de configuração nunca abre privilégios; falha fechado.

Fonte: pág. 5 (Dicionario-Boas-Praticas.pdf)

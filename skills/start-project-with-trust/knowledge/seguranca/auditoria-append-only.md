---
id: seguranca/auditoria-append-only
titulo: "Auditoria append-only e à prova de adulteração"
seccao: "Segurança"
paginas: [4]
fonte: Dicionario-Boas-Praticas.pdf
verificado_em: 2026-11-03
---

# Auditoria append-only e à prova de adulteração

**Resumo:** Registar quem, quando e o quê em cada operação que muda dados, num trilho que a aplicação só pode acrescentar e ler.

## Conteúdo

- Registar quem, quando, que ação, o detalhe e o estado anterior, em cada operação que muda dados ou permissões.
- Só acrescentar e ler: a aplicação não atualiza nem apaga eventos; a base de dados nega `UPDATE` / `DELETE` à conta da app.
- Opcional: hash encadeado por linha, para qualquer adulteração ser detetável.

**Para uma skill:** existe trilho de auditoria que a própria aplicação não consegue apagar.

## Ver também

- [Auditoria e apagamento](../base-de-dados/auditoria-e-apagamento.md) (Base de dados)

Fonte: pág. 4 (Dicionario-Boas-Praticas.pdf)

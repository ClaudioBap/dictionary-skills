---
id: seguranca/auditoria-append-only
titulo: "Auditoria append-only e à prova de adulteração"
seccao: "Segurança"
paginas: [4]
fonte: Dicionario-Boas-Praticas.pdf
verificado_em: 2026-11-03
fontes_oficiais_consultadas_em: 2026-11-04
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

## Fontes oficiais

*Ligações externas que apoiam esta entrada, consultadas a 2026-11-04. Não alteram o texto acima.*

- [OWASP Logging Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Logging_Cheat_Sheet.html) — registar quem/quando/o quê; deteção de adulteração e suporte só-leitura
- [OWASP Top 10:2025 A09](https://top10.owasp.org/2025/A09_2025-Security_Logging_and_Alerting_Failures/) — trilho de auditoria com controlos de integridade contra adulteração ou apagamento

Fonte: pág. 4 (Dicionario-Boas-Praticas.pdf)

---
id: base-de-dados/desempenho-de-queries
titulo: "Desempenho de queries"
seccao: "Base de dados"
paginas: [29]
fonte: Dicionario-Boas-Praticas.pdf
verificado_em: 2026-11-03
---

# Desempenho de queries

**Resumo:** Pedir só o necessário, paginar, evitar N+1 e analisar as queries lentas pelo plano.

## Conteúdo

- Pedir só as colunas necessárias (sem `SELECT *`); paginar resultados grandes; evitar o problema N+1.
- Ler o plano de execução (`EXPLAIN`); filtrar na base, não na aplicação; cuidado com funções sobre colunas indexadas.

**Para uma skill:** nenhuma query traz tudo sem paginar; as lentas são analisadas pelo plano.

Fonte: pág. 29 (Dicionario-Boas-Praticas.pdf)

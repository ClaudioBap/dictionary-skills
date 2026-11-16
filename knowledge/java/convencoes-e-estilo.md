---
id: java/convencoes-e-estilo
titulo: "Convenções e estilo"
seccao: "Boas práticas de Java"
paginas: [35]
fonte: Dicionario-Boas-Praticas.pdf
verificado_em: 2026-11-03
fontes_oficiais_consultadas_em: 2026-11-04
---

# Convenções e estilo

**Resumo:** Convenções de nomes Java e formatador e linter a correr no CI.

## Conteúdo

- `PascalCase` para classes, `camelCase` para métodos e variáveis, `MAIÚSCULAS` para constantes; pacotes em minúsculas (domínio invertido).
- Formatador e linter no CI (google-java-format, Checkstyle, SpotBugs/Error Prone).

**Para uma skill:** o código passa o formatador e a análise estática sem avisos.

## Ver também

- [Ferramentas: linters e formatadores](../cicd/ferramentas-linters-e-formatadores.md) (CI/CD e ferramentas)

## Fontes oficiais

*Ligações externas que apoiam esta entrada, consultadas a 2026-11-04. Não alteram o texto acima.*

- [Variables – naming](https://docs.oracle.com/javase/tutorial/java/nutsandbolts/variables.html) — camelCase em variáveis, MAIÚSCULAS_COM_UNDERSCORE em constantes
- [Checkstyle](https://checkstyle.org/) — análise de estilo com configurações Google e Sun
- [Error Prone](https://errorprone.info/) — erros comuns apanhados durante a compilação

Fonte: pág. 35 (Dicionario-Boas-Praticas.pdf)

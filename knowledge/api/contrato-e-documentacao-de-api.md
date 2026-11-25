---
id: api/contrato-e-documentacao-de-api
titulo: "Contrato e documentação de API"
seccao: "Desenho de API"
paginas: [25]
fonte: Dicionario-Boas-Praticas.pdf
verificado_em: 2026-11-25
editado_em: 2026-11-25
fontes_oficiais_consultadas_em: 2026-11-04
---

# Contrato e documentação de API

**Resumo:** Um contrato explícito (OpenAPI ou schema) verificado contra a implementação, com documentação viva.

## Conteúdo

- Contrato explícito: OpenAPI (REST) ou schema (GraphQL), gerado ou verificado, não escrito à mão e esquecido.
- Documentação viva a partir do contrato; exemplos de pedido e resposta.
- O contrato escreve-se antes do código (design-first) e entra no controlo de versões como ficheiro de código, entre os primeiros. Há uma só fonte: se o OpenAPI é gerado a partir de anotações, mantém-se só um dos dois (o ficheiro ou as anotações) como fonte, ou um teste no CI confirma que os dois coincidem.
- Validar o contrato: o documento passa no esquema JSON oficial da sua versão minor, na iteração mais recente. Na 3.1 e na 3.2, o `schema-base` valida também os Schema Objects e o `schema` simples não os valida. O esquema não apanha todas as violações e, se discordar do texto da especificação, vale a especificação. Na 3.2, cada exemplo em `dataValue` tem de ser válido contra o Schema Object a que pertence.
- Provar que a implementação cumpre: uma ferramenta de validação corre no CI e verifica que o comportamento do código segue o OpenAPI; um desvio parte o pipeline.

**Para uma skill:** o OpenAPI (ou o schema GraphQL) está no repositório antes do código; o OpenAPI passa no esquema oficial da sua versão, com os exemplos válidos, e o CI parte quando a implementação se desvia dele. A prova é a saída das duas verificações.

## Fontes oficiais

*Ligações externas que apoiam esta entrada, consultadas a 2026-11-04. Não alteram o texto acima.*

- [OpenAPI Specification v3.2](https://spec.openapis.org/oas/latest.html) — Descrição de API HTTP compreensível sem ler código
- [OpenAPI Best Practices](https://learn.openapis.org/best-practices.html) — Design-first, fonte única no controlo de versões, CI para detetar desvios
- [OpenAPI — Getting Started](https://learn.openapis.org/) — Gerar documentação e código a partir da descrição OpenAPI
- [OpenAPI Specification: versões e esquemas](https://spec.openapis.org/oas/) — Esquemas JSON oficiais por versão minor; o `schema-base` valida também os Schema Objects (consultada a 2026-11-25)

> **Nota (fonte oficial):** A versão atual da especificação é OpenAPI 3.2.1 (setembro de 2026).

## Histórico

- **2026-11-12**: antes, «**Para uma skill:** a API tem contrato OpenAPI/schema testado contra a implementação.» (PDF pág. 25). Mudou porque o critério não dizia contra quê se valida o contrato nem como se prova que a implementação o cumpre; as boas práticas da OpenAPI Initiative e a página dos esquemas oficiais (iteração 3.2 de 2026-11-12) dizem-no. Fonte: [OpenAPI Best Practices](https://learn.openapis.org/best-practices.html), [OpenAPI Specification: versões e esquemas](https://spec.openapis.org/oas/). Editado a 2026-11-25.

Fonte: pág. 25 (Dicionario-Boas-Praticas.pdf)

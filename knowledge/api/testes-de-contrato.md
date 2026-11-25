---
id: api/testes-de-contrato
titulo: "Testes de contrato"
seccao: "Desenho de API"
paginas: [25]
fonte: Dicionario-Boas-Praticas.pdf
verificado_em: 2026-11-25
editado_em: 2026-11-25
fontes_oficiais_consultadas_em: 2026-11-04
---

# Testes de contrato

**Resumo:** Garantir que fornecedor e consumidor da API concordam, apanhando quebras antes de produção.

## Conteúdo

- Garantir que o fornecedor e o consumidor da API concordam (Pact, ou testes contra o OpenAPI).
- Apanha quebras entre serviços antes de chegarem a produção.
- Com o Pact, o teste do consumidor faz pedidos reais a um fornecedor simulado, que compara cada pedido com o esperado e devolve a resposta combinada. Do lado do fornecedor, as interações repetem-se contra o serviço real, com o estado de que cada uma precisa (provider state) preparado antes.
- Os resultados da verificação publicam-se no Pact Broker com a versão do fornecedor. Antes de cada deploy, `pact-broker can-i-deploy --pacticipant <serviço> --version <versão> --to-environment <ambiente>` diz se essa versão já foi verificada com as que estão nesse ambiente.

**Para uma skill:** mudanças na API passam por testes de contrato antes do merge: a implementação verificada contra o OpenAPI no CI e, com mais de um serviço, a verificação do fornecedor publicada e o `can-i-deploy` a responder que sim antes do deploy.

## Fontes oficiais

*Ligações externas que apoiam esta entrada, consultadas a 2026-11-04. Não alteram o texto acima.*

- [Pact docs](https://docs.pact.io/) — Consumidor e fornecedor concordam; apanha quebras antes de implementar
- [Testing scope (Pact)](https://docs.pact.io/getting_started/testing-scope) — Âmbito dos testes de consumidor e de fornecedor
- [OpenAPI Best Practices](https://learn.openapis.org/best-practices.html) — Verificações em CI contra desvio entre código e descrição
- [How Pact works](https://docs.pact.io/getting_started/how_pact_works) — Fornecedor simulado do lado do consumidor e repetição das interações contra o fornecedor real (consultada a 2026-11-25)
- [Can I Deploy (Pact)](https://docs.pact.io/pact_broker/can_i_deploy) — Comando que decide se uma versão pode ir para um ambiente (consultada a 2026-11-25)

## Histórico

- **2024-12-23**: antes, «**Para uma skill:** mudanças na API passam por testes de contrato antes do merge.» (PDF pág. 25). Mudou porque o critério não dizia o que se verifica de cada lado nem o que mostra que passou. Fonte: [How Pact works](https://docs.pact.io/getting_started/how_pact_works), [Can I Deploy (Pact)](https://docs.pact.io/pact_broker/can_i_deploy). Editado a 2026-11-25.

Fonte: pág. 25 (Dicionario-Boas-Praticas.pdf)

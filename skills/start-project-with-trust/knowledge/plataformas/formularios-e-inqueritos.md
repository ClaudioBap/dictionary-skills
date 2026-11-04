---
id: plataformas/formularios-e-inqueritos
titulo: "Formulários e inquéritos (LimeSurvey)"
seccao: "Plataformas para adotar antes de construir"
paginas: []
fonte: "Sites, documentação e repositórios oficiais de cada plataforma, ligados em cada ponto; consultados a 2026-11-04. Não vem do PDF."
verificado_em: 2026-11-04
---

# Formulários e inquéritos (LimeSurvey)

**Resumo:** Para inquéritos e formulários, o LimeSurvey (GPLv2+) corre em servidor próprio ou na cloud do projeto e integra-se pela API RemoteControl 2 (JSON-RPC); não tem webhooks nativos nem servidor MCP oficial.

## Conteúdo

- Licença GPL v2 com opção por versões posteriores. Fonte: [repositório](https://github.com/LimeSurvey/LimeSurvey)
- Community Edition self-hosted, ou LimeSurvey Cloud com plano gratuito e Basic a 34 € por mês com IVA incluído (a 2026-11-04). Fonte: [preços](https://www.limesurvey.org/pricing)
- API RemoteControl 2 em XML-RPC ou JSON-RPC (recomendado JSON-RPC). Fonte: [RemoteControl 2](https://www.limesurvey.org/manual/RemoteControl_2_API)
- Sem webhooks nativos documentados: para avisar outro sistema de uma resposta nova, consulta-se a API a intervalos (por exemplo, a partir do n8n ou do Node-RED). *(interpretação)*
- MCP: só servidores da comunidade.
- Versão 7.9.1 da Community Edition. Fonte: [downloads](https://community.limesurvey.org/downloads/)

**Para uma skill:** um pedido de formulários ou inquéritos tem o LimeSurvey como opção na decisão «Adotar ou construir», com a ligação por JSON-RPC indicada.

## Ver também

- [Adotar antes de construir](adotar-antes-de-construir.md) (Plataformas para adotar antes de construir)
- [Formulários](../design/formularios.md) (Design e experiência de utilizador)
- [Automação e integração (n8n, Node-RED)](automacao-e-integracao.md) (Plataformas para adotar antes de construir)

Fonte: Sites, documentação e repositórios oficiais de cada plataforma, ligados em cada ponto; consultados a 2026-11-04. Não vem do PDF.

---
id: plataformas/adotar-antes-de-construir
titulo: "Adotar antes de construir"
seccao: "Plataformas para adotar antes de construir"
paginas: []
fonte: "Sites, documentação e repositórios oficiais de cada plataforma, ligados em cada ponto; consultados a 2026-11-04. Não vem do PDF."
verificado_em: 2026-11-04
---

# Adotar antes de construir

**Resumo:** Para cada necessidade funcional procura-se primeiro uma plataforma open source que a resolva e a forma de a ligar ao resto (API, webhooks ou MCP); desenvolver de raiz é uma opção a comparar, não o ponto de partida.

## Conteúdo

- Ordem das opções, da mais barata à mais cara: adotar uma plataforma; ligar plataformas que já existem; adotar e estender só no que falta; desenvolver de raiz. *(interpretação: processo pedido pelo utilizador)*
- Ligação por API: quase todas as plataformas desta secção têm API REST documentada (algumas também GraphQL ou JSON-RPC), o que permite integrá-las sem lhes mexer no código. Ver cada entrada.
- Ligação por eventos: webhooks avisam outro sistema quando algo muda (um ticket criado, um formulário submetido), sem consultas repetidas. Ver cada entrada.
- Ligação a agentes de IA: um servidor MCP expõe a plataforma como ferramentas para um agente. Vários projetos já têm servidor MCP oficial (GLPI, Odoo, n8n, Directus, Strapi, Metabase, Superset); noutros só há servidores da comunidade, que não se apresentam como oficiais. Fonte: [Model Context Protocol](https://modelcontextprotocol.io/)
- Ligar várias plataformas sem código à medida: uma ferramenta de automação (n8n, Node-RED) recebe o webhook de uma e chama a API da outra. Ver [Automação e integração](automacao-e-integracao.md).
- Licença conta como risco: «open source» quer dizer licença aprovada pela OSI. Licenças como a Sustainable Use License (n8n) ou a MSCL (Directus) limitam alguns usos e entram na coluna «Risco». Fonte: [Licenças aprovadas pela OSI](https://opensource.org/licenses)

**Para uma skill:** a decisão «Adotar ou construir» do custo-benefício lista, para cada necessidade funcional, pelo menos uma plataforma candidata com fonte oficial, ou regista a pesquisa feita sem resultado.

## Ver também

- [MCP (Model Context Protocol)](../ia/mcp-model-context-protocol.md) (Construir com IA)
- [Inventário de dependências por jurisdição](../soberania/inventario-de-dependencias-por-jurisdicao.md) (Soberania digital)
- [Estratégia de saída](../soberania/estrategia-de-saida.md) (Soberania digital)

Fonte: Sites, documentação e repositórios oficiais de cada plataforma, ligados em cada ponto; consultados a 2026-11-04. Não vem do PDF.

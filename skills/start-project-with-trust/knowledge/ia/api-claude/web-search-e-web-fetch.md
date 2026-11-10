---
id: ia/api-claude/web-search-e-web-fetch
titulo: "Web search e web fetch"
seccao: "Construir com IA"
paginas: []
fonte: "Documentação da Claude Platform, ligada em cada ponto; consultada a 2026-11-10, páginas sem data. Não vem do PDF."
data_lancamento: null
confianca: media
verificado_em: 2026-11-10
---

# Web search e web fetch

**Resumo:** Duas ferramentas de servidor dão ao Claude acesso à web: a pesquisa traz resultados com citações, e o fetch lê o conteúdo completo de páginas e PDFs.

## Conteúdo

- Web search: dá «direct access to real-time web content», e a resposta traz citações. Serve para acontecimentos recentes, preços atuais e informação que muda sobre organizações, pessoas ou produtos. Fonte: [Web search tool](https://platform.claude.com/docs/en/agents-and-tools/tool-use/web-search-tool)
- Como usar a pesquisa: em `tools`, `{"type": "web_search_20250305", "name": "web_search", "max_uses": 5}`. Versões mais recentes: `web_search_20260209` (filtragem dinâmica) e `web_search_20260318` (acrescenta `response_inclusion`). Parâmetros: `max_uses`, `allowed_domains` ou `blocked_domains` (não os dois), `user_location` e `allowed_callers`. Fonte: [Web search tool](https://platform.claude.com/docs/en/agents-and-tools/tool-use/web-search-tool)
- Preço e limites da pesquisa: «$10 USD per 1,000 searches, plus standard token costs». As pesquisas falhadas não se pagam, mas contam para `max_uses`. «Single-fact queries typically use 1–3 searches; comparative or multientity research can use 10 or more.» Os erros chegam com HTTP 200 (por exemplo `max_uses_exceeded` ou `too_many_requests`). Quando o resultado é mostrado a utilizadores finais, as citações são obrigatórias. Fonte: [Web search tool](https://platform.claude.com/docs/en/agents-and-tools/tool-use/web-search-tool)
- Web fetch: lê o conteúdo completo de páginas e de PDFs indicados. Usa-se com `{"type": "web_fetch_20250910", "name": "web_fetch", "max_uses": 5}`, ou com as versões `web_fetch_20260209`, `web_fetch_20260309` (acrescenta `use_cache`) e `web_fetch_20260318`. Parâmetros: `max_uses` (sem limite por omissão), `allowed_domains`, `blocked_domains`, `url_sources`, `citations` (desligado por omissão), `max_content_tokens` e `use_cache`. Não tem custo além dos tokens; uma página média de 10 kB dá cerca de 2 500 tokens. Fonte: [Web fetch tool](https://platform.claude.com/docs/en/agents-and-tools/tool-use/web-fetch-tool)
- Limites do fetch: não corre JavaScript; o URL tem de já ter aparecido na conversa e não pode passar de 250 caracteres; só aceita texto, HTML e PDF. Fonte: [Web fetch tool](https://platform.claude.com/docs/en/agents-and-tools/tool-use/web-fetch-tool)
- Segurança: com conteúdo não confiável ao lado de dados sensíveis, o fetch «poses data exfiltration risks». As mitigações indicadas são desligá-lo ou usar `max_uses`, `allowed_domains` e `url_sources`. Fonte: [Web fetch tool](https://platform.claude.com/docs/en/agents-and-tools/tool-use/web-fetch-tool)
- Dados: as duas ferramentas entram na retenção zero de dados, exceto com filtragem dinâmica. Fonte: [API and data retention](https://platform.claude.com/docs/en/manage-claude/api-and-data-retention)

**Para uma skill:** um agente com web fetch e acesso a dados do cliente tem `allowed_domains` definidos e `max_uses` baixo, e a interface mostra as citações das pesquisas.

## Ver também

- [Segurança e governação de IA](../seguranca-e-governacao-de-ia.md) (Construir com IA)
- [Retenção de dados e retenção zero (ZDR)](retencao-de-dados-e-zdr.md) (Construir com IA)

Fonte: documentação da Claude Platform, ligada em cada ponto; consultada a 2026-11-10, páginas sem data. Não vem do PDF.

---
id: ia/api-claude/retencao-de-dados-e-zdr
titulo: "Retenção de dados e retenção zero (ZDR)"
seccao: "Construir com IA"
paginas: []
fonte: "Documentação da Claude Platform, ligada em cada ponto; consultada a 2026-11-10, páginas sem data. Não vem do PDF."
data_lancamento: null
confianca: media
verificado_em: 2026-11-10
---

# Retenção de dados e retenção zero (ZDR)

**Resumo:** Por omissão a API não guarda prompts nem respostas, mas várias funcionalidades guardam dados durante dias ou até serem apagados, e ficam fora da retenção zero.

## Conteúdo

- Por omissão: «Conversation content (your prompts and Claude's outputs) is not retained by default; the exception is Covered Models, which require 30-day retention.» Fonte: [API and data retention](https://platform.claude.com/docs/en/manage-claude/api-and-data-retention)
- Entram na retenção zero: Messages API, citações, prompt caching (a cache fica só durante o TTL), web search e web fetch (sem filtragem dinâmica), computer use, editor de texto, ferramenta Bash, thinking, saída estruturada (com reservas), contagem de tokens e residência de dados (`inference_geo`). Fonte: [API and data retention](https://platform.claude.com/docs/en/manage-claude/api-and-data-retention)
- Ficam de fora: execução de código (30 dias), Files API («retained until explicitly deleted»), batches (29 dias), conector MCP, programmatic tool calling e Managed Agents. Fonte: [API and data retention](https://platform.claude.com/docs/en/manage-claude/api-and-data-retention)
- Exceção: mesmo com retenção zero, os dados podem ser guardados até 2 anos quando a lei o exige ou quando os sistemas de confiança e segurança os assinalam. No Claude Platform na AWS e no Google Cloud, a retenção é tratada pelo fornecedor de nuvem. Fonte: [API and data retention](https://platform.claude.com/docs/en/manage-claude/api-and-data-retention)
- A página de residência de dados não foi lida: as regiões e os preços de `inference_geo` estão por confirmar.

**Para uma skill:** um projeto com dados pessoais ou com contrato de retenção zero lista as funcionalidades da API que usa e confirma que todas são elegíveis; os batches, a Files API e a execução de código precisam de justificação.

## Ver também

- [Minimização e retenção](../../privacidade/minimizacao-e-retencao.md) (Privacidade e conformidade)
- [Files API](files-api.md) (Construir com IA)
- [Message Batches API](message-batches.md) (Construir com IA)
- [Execução de código](execucao-de-codigo.md) (Construir com IA)

Fonte: documentação da Claude Platform, ligada em cada ponto; consultada a 2026-11-10, páginas sem data. Não vem do PDF.

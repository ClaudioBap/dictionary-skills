---
id: ia/api-claude/saida-estruturada
titulo: "Saída estruturada (JSON e strict tool use)"
seccao: "Construir com IA"
paginas: []
fonte: "Documentação da Claude Platform, ligada em cada ponto; consultada a 2026-11-10, páginas sem data, a parte final da página por ler. Não vem do PDF."
data_lancamento: null
confianca: media
verificado_em: 2026-11-10
---

# Saída estruturada (JSON e strict tool use)

**Resumo:** A resposta é obrigada a seguir um JSON Schema, e as chamadas de ferramentas a seguir o esquema delas com `strict: true`.

## Conteúdo

- O que é: serve para «constrain Claude's responses to follow a specific schema». Tem duas partes: saída em JSON e strict tool use (`strict: true`). Está estável. Fonte: [Structured outputs](https://platform.claude.com/docs/en/build-with-claude/structured-outputs)
- Como usar: `output_config.format` com `{"type": "json_schema", "schema": {...}}`. Nos SDK, `client.messages.parse()` com Pydantic em Python e `zodOutputFormat()` em TypeScript. O parâmetro `output_format` está obsoleto; o cabeçalho beta `structured-outputs-2025-11-13` mantém-no a funcionar. Fonte: [Structured outputs](https://platform.claude.com/docs/en/build-with-claude/structured-outputs)
- O que o esquema não aceita (a API devolve 400): esquemas recursivos, tipos complexos dentro de enums, `$ref` externos, restrições numéricas (`minimum`, `maximum`, `multipleOf`), restrições de texto (`minLength`, `maxLength`), restrições de arrays além de `minItems` 0 ou 1, e `additionalProperties` diferente de `false`. Por pedido: 20 ferramentas strict, 24 parâmetros opcionais e 16 parâmetros com união de tipos. A compilação do esquema tem um limite de 180 segundos. Fonte: [Structured outputs](https://platform.claude.com/docs/en/build-with-claude/structured-outputs)
- Quando o JSON não sai completo: numa recusa, `stop_reason: "refusal"`; num corte, `stop_reason: "max_tokens"`, e a saída «might be incomplete». Fonte: [Structured outputs](https://platform.claude.com/docs/en/build-with-claude/structured-outputs)
- Dados e compatibilidade: é compatível com a retenção zero, com reservas: «Only the JSON schema is cached, for up to 24 hours since last use». Os esquemas não podem levar dados de saúde protegidos. Não se pode usar com citações. Fonte: [Structured outputs](https://platform.claude.com/docs/en/build-with-claude/structured-outputs), [Citations](https://platform.claude.com/docs/en/build-with-claude/citations)

**Para uma skill:** a validação de mínimos, máximos e comprimentos faz-se no código depois da resposta, porque o esquema não os aceita, e o código trata `refusal` e `max_tokens`.

## Ver também

- [Prompt engineering e saída estruturada](../prompt-engineering-e-saida-estruturada.md) (Construir com IA)
- [Citações](citacoes.md) (Construir com IA)

Fonte: documentação da Claude Platform, ligada em cada ponto; consultada a 2026-11-10, páginas sem data, a parte final da página por ler. Não vem do PDF.

# Notícias

`noticias.json` é escrito pela skill `update-knowledge` e lido pelo site de notícias. É o contrato entre os dois.

## Formato

```json
{
  "atualizado_em": "2026-11-04T10:00:00Z",
  "fontes_verificadas": { "https://openai.com/news/rss.xml": "2026-11-04" },
  "noticias": [
    {
      "id": "2026-11-03-openai-cisco-cyber",
      "titulo": "How Cisco defends at machine speed with OpenAI",
      "resumo": "Resumo em português, sem informação que não esteja na fonte.",
      "tema": "ia",
      "fonte_nome": "OpenAI News",
      "fonte_url": "https://openai.com/index/cisco-cyber",
      "data_lancamento": "2026-11-03",
      "data_recolha": "2026-11-04",
      "confianca": "alta",
      "confianca_motivo": "Fonte oficial primária, lida diretamente, com data explícita.",
      "estado": "aprovada",
      "alteracao": { "tipo": "atualizacao", "ficheiro": "ia/seguranca-e-governacao-de-ia.md" }
    }
  ]
}
```

| Campo | Regra |
|---|---|
| `id` | `AAAA-MM-DD-<slug>`, único |
| `tema` | Uma secção de `knowledge/` (ex.: `ia`, `seguranca`, `nuvem`) |
| `data_lancamento` | A data que a fonte indica; `null` se a fonte não a indicar (nunca inventada) |
| `confianca` | `alta`, `media` ou `baixa` (critérios em `skills/update-knowledge/SKILL.md`) |
| `estado` | `aprovada`, `so-noticia` (aprovada para o site, sem alterar o conhecimento), `em-validacao` (confiança `media`: os visitantes votam e o admin decide se entra no `ATUALIZACOES.md` da secção) ou `rejeitada` |
| `alteracao` | `null`, ou o tipo (`atualizacao`, `nova-entrada`, `correcao`, `fonte`) e o ficheiro de `knowledge/` alterado |
| `fontes_verificadas` | Última data em que cada fonte foi percorrida; a próxima corrida procura novidades a partir daí |

O site deve mostrar, em cada notícia, a fonte (com ligação), a data de lançamento e a confiança.

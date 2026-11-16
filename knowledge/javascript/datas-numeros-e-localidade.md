---
id: javascript/datas-numeros-e-localidade
titulo: "Datas, números e localidade"
seccao: "Boas práticas de JavaScript"
paginas: []
fonte: "Fontes oficiais (MDN, TypeScript, ESLint, Prettier, web.dev, OWASP, W3C e documentação das ferramentas citadas), ligadas em cada ponto; consultadas a 2026-11-03. Pontos marcados «sem fonte oficial» são convenções escritas pelo assistente. Não vem do PDF."
verificado_em: 2026-11-03
---

# Datas, números e localidade

**Resumo:** Formatar com `Intl`, transmitir datas com `toISOString()` (UTC) e não concatenar frases traduzidas.

## Conteúdo

- Formatar datas, números e moeda com `Intl.DateTimeFormat` e `Intl.NumberFormat` (Baseline Widely available). — [MDN: DateTimeFormat](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat), [MDN: NumberFormat](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat)
- Transmitir datas com `toISOString()` (baseado em ISO 8601, sempre em UTC) e converter para a hora local só na apresentação. — [MDN: toISOString](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toISOString)
- Não concatenar frases: mensagens com parâmetros que o tradutor pode reordenar. — [W3C: mensagens compostas](https://www.w3.org/International/articles/composite-messages/)
- **Utilidade:** `Intl.PluralRules` e `Intl.RelativeTimeFormat` para plurais e «há 3 dias» (Baseline Widely available). O `Temporal` ainda não é Baseline. — [MDN: PluralRules](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/PluralRules), [MDN: RelativeTimeFormat](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/RelativeTimeFormat), [MDN: Temporal](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Temporal)

**Para uma skill:** nenhuma data ou número é formatado à mão; as datas circulam em UTC.

## Ver também

- [Internacionalização (i18n/l10n)](../design/internacionalizacao.md) (Design e experiência de utilizador)

Fonte: Fontes oficiais (MDN, TypeScript, ESLint, Prettier, web.dev, OWASP, W3C e documentação das ferramentas citadas), ligadas em cada ponto; consultadas a 2026-11-03. Pontos marcados «sem fonte oficial» são convenções escritas pelo assistente. Não vem do PDF.

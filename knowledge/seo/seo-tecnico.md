---
id: seo/seo-tecnico
titulo: "SEO técnico"
seccao: "SEO e descoberta"
paginas: [24]
fonte: Dicionario-Boas-Praticas.pdf
verificado_em: 2026-11-25
editado_em: 2026-11-25
fontes_oficiais_consultadas_em: 2026-11-04
---

# SEO técnico

**Resumo:** Cada página pública tem título, descrição e canonical, entra no sitemap e é rápida em telemóvel.

## Conteúdo

- Um `<title>` e uma meta description por página; URLs limpos; `canonical` para evitar duplicados.
- `sitemap.xml` e `robots.txt`; HTML semântico; cada página alcançável por link.
- Áreas de administração, de teste e de pré-publicação: o que é privado fica atrás de palavra-passe, o que também o tira dos resultados da Google. O que só não deve aparecer nos resultados leva `noindex`, na meta tag `robots` ou no cabeçalho HTTP `X-Robots-Tag: noindex`, que serve também para PDFs e outros ficheiros. Essas páginas não se bloqueiam no `robots.txt`: se o rastreador não as pode ler, não vê o `noindex`, e a página pode aparecer na mesma. Fontes: [Google: Block search indexing with noindex (2025-12-10)](https://developers.google.com/search/docs/crawling-indexing/block-indexing), [Google: Control what you share (2026-10-21)](https://developers.google.com/search/docs/crawling-indexing/control-what-you-share)
- Várias línguas: cada versão aponta, com `hreflang`, para todas as outras e para si própria (código de língua ISO 639-1, com região opcional), em `<link rel="alternate">` no HTML, no cabeçalho HTTP ou no sitemap, sempre com URLs completos (`https://...`). As ligações têm de ser recíprocas: se duas páginas não apontam uma para a outra, a Google ignora-as. O valor `x-default` indica a página para as línguas sem versão, como um seletor de língua. A Google não usa o `hreflang` nem o atributo `lang` para detetar a língua da página. Fonte: [Google: Tell Google about localized versions of your page (2026-09-21)](https://developers.google.com/search/docs/specialty/international/localized-versions)
- Rápido e móvel: a Google recomenda bons Core Web Vitals para ter sucesso na pesquisa e diz que se alinham com o que os seus sistemas de ranking procuram recompensar. Fonte: [Google: Core Web Vitals and Google Search results (2025-12-10)](https://developers.google.com/search/docs/appearance/core-web-vitals)

**Para uma skill:** cada página pública tem título, descrição, canonical e entra no sitemap. As áreas de administração e de teste têm palavra-passe ou `noindex`, e nunca só o bloqueio no `robots.txt`; num site com várias línguas, cada página tem `hreflang` recíproco para todas as versões e para si própria.

## Ver também

- [Desempenho web (Core Web Vitals)](../design/desempenho-web-core-web-vitals.md) (Design e experiência de utilizador)

## Fontes oficiais

*Ligações externas que apoiam esta entrada, consultadas a 2026-11-04. Não alteram o texto acima.*

- [Influencing Title Links](https://developers.google.com/search/docs/appearance/title-link) — <title> distinto e descritivo em cada página
- [Control your snippets](https://developers.google.com/search/docs/appearance/snippet) — Meta description única por página; descrições iguais não ajudam
- [Canonical URL](https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls) — rel="canonical" como forma preferida de consolidar duplicados
- [Block search indexing with noindex](https://developers.google.com/search/docs/crawling-indexing/block-indexing) — noindex na meta tag ou no X-Robots-Tag, sem bloquear no robots.txt; consultada a 2026-11-25
- [Control what you share](https://developers.google.com/search/docs/crawling-indexing/control-what-you-share) — palavra-passe para o conteúdo privado; consultada a 2026-11-25
- [Localized versions](https://developers.google.com/search/docs/specialty/international/localized-versions) — hreflang recíproco e x-default; consultada a 2026-11-25

> **Nota (fonte oficial):** A Google não diz que os Core Web Vitals «contam para o ranking» de forma direta: diz que se alinham com o que os sistemas de ranking recompensam (https://developers.google.com/search/docs/appearance/core-web-vitals). E robots.txt controla rastreio, não impede que a página apareça nos resultados.

## Histórico

- **2025-12-10**: antes, «Rápido e móvel (os Core Web Vitals contam para o ranking).» (PDF pág. 24). Mudou porque a Google diz que bons Core Web Vitals se alinham com o que os seus sistemas de ranking procuram recompensar, e não que contam diretamente. Fonte: [Google: Core Web Vitals and Google Search results](https://developers.google.com/search/docs/appearance/core-web-vitals). Editado a 2026-11-25.

Fonte: pág. 24 (Dicionario-Boas-Praticas.pdf)

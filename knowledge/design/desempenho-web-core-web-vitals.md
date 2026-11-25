---
id: design/desempenho-web-core-web-vitals
titulo: "Desempenho web (Core Web Vitals)"
seccao: "Design e experiência de utilizador"
paginas: [14]
fonte: Dicionario-Boas-Praticas.pdf
verificado_em: 2026-11-25
editado_em: 2026-11-25
fontes_oficiais_consultadas_em: 2026-11-04
---

# Desempenho web (Core Web Vitals)

**Resumo:** Cumprir LCP, INP e CLS, com caching, menos JavaScript e medição com dados reais.

## Conteúdo

- Metas: LCP (carregar depressa), INP (responder ao toque), CLS (não saltar o layout).
- Limiares de «bom»: LCP até 2,5 s, INP até 200 ms e CLS até 0,1. A página passa quando cumpre os três no percentil 75 das visitas, medido em separado em telemóvel e em computador. Fonte: [web.dev: Web Vitals (2024-10-31)](https://web.dev/articles/vitals)
- O INP não se mede em laboratório, porque não há utilizador a interagir: o Lighthouse dá o Total Blocking Time (TBT) como aproximação, e o INP real vem dos dados de campo, como o Chrome User Experience Report. Fonte: [web.dev: Web Vitals (2024-10-31)](https://web.dev/articles/vitals)
- Caching HTTP com impressão digital, comprimir (brotli), menos e menor JavaScript, código por rota.
- Medir com dados reais (RUM) além do laboratório (Lighthouse).
- Uma medição de laboratório varia de corrida para corrida, por isso um antes e depois não se decide com uma corrida só: «Run Lighthouse multiple times and beware of variability before drawing conclusions about a performance-impacting change.» Compara-se a mediana de 5 corridas, nas mesmas condições (dispositivo emulado, rede e máquina): «The median Lighthouse score of 5 runs is twice as stable as 1 run.» Fonte: [Lighthouse: Score Variability](https://github.com/GoogleChrome/lighthouse/blob/main/docs/variability.md)

**Para uma skill:** cada página cumpre os Core Web Vitals e tem orçamento verificado no CI. A prova são os três valores no percentil 75 (LCP até 2,5 s, INP até 200 ms, CLS até 0,1), em telemóvel e em computador; sem dados de campo, cola-se o LCP e o CLS do Lighthouse e o TBT, ditos como medição de laboratório, com a mediana de 5 corridas.

## Ver também

- [Orçamento de desempenho](../design/orcamento-de-desempenho.md) (Design e experiência de utilizador)

## Fontes oficiais

*Ligações externas que apoiam esta entrada, consultadas a 2026-11-04. Não alteram o texto acima.*

- [web.dev – Web Vitals](https://web.dev/articles/vitals) — LCP, INP, CLS, limiares e dados de campo vs laboratório
- [web.dev – HTTP cache](https://web.dev/articles/http-cache) — Caching HTTP com URLs versionados
- [Lighthouse: Score Variability](https://github.com/GoogleChrome/lighthouse/blob/main/docs/variability.md) — Correr várias vezes e comparar a mediana, não uma corrida (consultada a 2026-11-25)

## Histórico

- **2026-11-25**: antes, «**Para uma skill:** cada página cumpre os Core Web Vitals e tem orçamento verificado no CI. A prova são os três valores no percentil 75 (LCP até 2,5 s, INP até 200 ms, CLS até 0,1), em telemóvel e em computador; sem dados de campo, cola-se o LCP e o CLS do Lighthouse e o TBT, ditos como medição de laboratório.» (web.dev, Web Vitals). Mudou porque uma corrida do Lighthouse sozinha varia demais para decidir um antes e depois: a medição de laboratório passa a ser a mediana de 5 corridas. Fonte: [Lighthouse: Score Variability](https://github.com/GoogleChrome/lighthouse/blob/main/docs/variability.md). Editado a 2026-11-25.

Fonte: pág. 14 (Dicionario-Boas-Praticas.pdf)

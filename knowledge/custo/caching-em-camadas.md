---
id: custo/caching-em-camadas
titulo: "Caching em camadas"
seccao: "Sessões, orquestração e custo-eficiência"
paginas: [64]
fonte: Dicionario-Boas-Praticas.pdf
verificado_em: 2026-11-03
fontes_oficiais_consultadas_em: 2026-11-04
---

# Caching em camadas

**Resumo:** Cachear o caro e repetido na camada certa, com regra de invalidação.

## Conteúdo

- Cachear onde dói: no browser (HTTP), na borda (CDN/proxy), na aplicação (Redis) e na base (resultados caros).
- Cada camada evita trabalho e custo abaixo dela; invalidar com critério (a parte difícil).
- No browser e na borda, a regra escreve-se no cabeçalho `Cache-Control`. `max-age` diz ao fim de quantos segundos a resposta fica desatualizada. `s-maxage` faz o mesmo só para caches partilhadas (CDN, proxy) e sobrepõe-se ao `max-age`. `no-cache` obriga a validar com o servidor antes de reutilizar. `private` impede uma cache partilhada de guardar a resposta, que é de um só utilizador. `no-store` proíbe guardar. Fonte: [RFC 9111, HTTP Caching (junho de 2022)](https://www.rfc-editor.org/rfc/rfc9111)
- A validação usa um validador. O `ETag` dá a etiqueta da representação atual; o cliente reenvia-a em `If-None-Match` e, se nada mudou, o servidor responde `304 (Not Modified)` sem reenviar o corpo. Fonte: [RFC 9110, HTTP Semantics (junho de 2022)](https://www.rfc-editor.org/rfc/rfc9110), secção 8.8.3; RFC 9111, secção 4.3.
- Por omissão *(interpretação)*: respostas com dados de um utilizador levam `private` ou `no-store`; ficheiros com o hash no nome levam `max-age` longo; o HTML leva `no-cache` com `ETag`.

**Para uma skill:** o que é caro e repetido é cacheado na camada certa, com regra de invalidação; nas respostas HTTP, a regra vê-se no `Cache-Control` e no `ETag` (por exemplo com `curl -sI <url>`), e um pedido repetido com `If-None-Match` recebe `304`.

## Fontes oficiais

*Ligações externas que apoiam esta entrada, consultadas a 2026-11-04. Não alteram o texto acima.*

- [Caching Guidance](https://learn.microsoft.com/en-us/azure/architecture/best-practices/caching) — cache privada e partilhada, expiração e invalidação na escrita
- [Optimizing scaling costs (Azure WAF)](https://learn.microsoft.com/en-us/azure/well-architected/cost-optimization/optimize-scaling-costs) — CDN e Redis reduzem carga e custo; invalidação é o trade-off

Fonte: pág. 64 (Dicionario-Boas-Praticas.pdf)

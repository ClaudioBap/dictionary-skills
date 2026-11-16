---
id: custo/serverless-vs-sempre-ligado
titulo: "Serverless vs. sempre-ligado"
seccao: "Sessões, orquestração e custo-eficiência"
paginas: [63]
fonte: Dicionario-Boas-Praticas.pdf
verificado_em: 2026-11-03
fontes_oficiais_consultadas_em: 2026-11-04
---

# Serverless vs. sempre-ligado

**Resumo:** Serverless para carga irregular, sempre-ligado para carga constante, pelo custo real medido.

## Conteúdo

- Serverless (funções, contentores sob pedido) paga por uso: ótimo para carga irregular; mau para carga constante e sensível à latência (cold starts).
- Sempre-ligado é mais barato e previsível para tráfego constante.

**Para uma skill:** escolher serverless para carga irregular e sempre-ligado para carga constante, pelo custo real medido.

## Fontes oficiais

*Ligações externas que apoiam esta entrada, consultadas a 2026-11-04. Não alteram o texto acima.*

- [Lambda execution environment lifecycle](https://docs.aws.amazon.com/lambda/latest/dg/lambda-runtime-environment.html) — cold starts acrescentam latência; concorrência provisionada reduz-nos

> **Nota (fonte oficial):** A AWS indica que cold starts ocorrem tipicamente em menos de 1% das invocações (100 ms a mais de 1 s), mais em ambientes pouco usados.

Fonte: pág. 63 (Dicionario-Boas-Praticas.pdf)

---
id: custo/serverless-vs-sempre-ligado
titulo: "Serverless vs. sempre-ligado"
seccao: "Sessões, orquestração e custo-eficiência"
paginas: [63]
fonte: Dicionario-Boas-Praticas.pdf
verificado_em: 2026-11-03
---

# Serverless vs. sempre-ligado

**Resumo:** Serverless para carga irregular, sempre-ligado para carga constante, pelo custo real medido.

## Conteúdo

- Serverless (funções, contentores sob pedido) paga por uso: ótimo para carga irregular; mau para carga constante e sensível à latência (cold starts).
- Sempre-ligado é mais barato e previsível para tráfego constante.

**Para uma skill:** escolher serverless para carga irregular e sempre-ligado para carga constante, pelo custo real medido.

Fonte: pág. 63 (Dicionario-Boas-Praticas.pdf)

---
id: cicd/testes-no-pipeline
titulo: "Testes no pipeline"
seccao: "CI/CD e ferramentas"
paginas: [45, 46]
fonte: Dicionario-Boas-Praticas.pdf
verificado_em: 2026-11-03
---

# Testes no pipeline

**Resumo:** Pirâmide de testes rápida e determinística, sem tolerar testes instáveis.

## Conteúdo

- Pirâmide: muitos testes unitários rápidos, alguns de integração, poucos ponta-a-ponta; o rápido corre primeiro.
- Testes de integração contra uma base de dados descartável que nasce e morre no job; testes independentes e determinísticos.
- Feedback em minutos; um teste instável (flaky) trata-se, não se ignora.

**Para uma skill:** o pipeline corre testes a cada mudança e não tolera testes instáveis silenciados.

Fonte: págs. 45, 46 (Dicionario-Boas-Praticas.pdf)

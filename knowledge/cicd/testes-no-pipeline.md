---
id: cicd/testes-no-pipeline
titulo: "Testes no pipeline"
seccao: "CI/CD e ferramentas"
paginas: [45, 46]
fonte: Dicionario-Boas-Praticas.pdf
verificado_em: 2026-11-03
fontes_oficiais_consultadas_em: 2026-11-04
---

# Testes no pipeline

**Resumo:** Pirâmide de testes rápida e determinística, sem tolerar testes instáveis.

## Conteúdo

- Pirâmide: muitos testes unitários rápidos, alguns de integração, poucos ponta-a-ponta; o rápido corre primeiro.
- Testes de integração contra uma base de dados descartável que nasce e morre no job; testes independentes e determinísticos.
- Feedback em minutos; um teste instável (flaky) trata-se, não se ignora.

**Para uma skill:** o pipeline corre testes a cada mudança e não tolera testes instáveis silenciados.

## Fontes oficiais

*Ligações externas que apoiam esta entrada, consultadas a 2026-11-04. Não alteram o texto acima.*

- [The Practical Test Pyramid](https://martinfowler.com/articles/practical-test-pyramid.html) — Muitos unitários rápidos, alguns de integração, poucos ponta-a-ponta
- [Eradicating Non-Determinism in Tests](https://martinfowler.com/articles/nonDeterminism.html) — Testes instáveis: quarentena e correção rápida, nunca ignorar
- [About service containers](https://docs.github.com/en/actions/using-containerized-services/about-service-containers) — Base de dados de serviço criada e destruída por job

Fonte: págs. 45, 46 (Dicionario-Boas-Praticas.pdf)

---
id: cicd/piramide-de-testes
titulo: "Pirâmide de testes"
seccao: "CI/CD e ferramentas"
paginas: []
fonte: "https://martinfowler.com/articles/practical-test-pyramid.html; consultado a 2026-11-10. Não vem do PDF."
data_lancamento: 2018-02-26
confianca: alta
verificado_em: 2026-11-10
---

# Pirâmide de testes

**Resumo:** Muitos testes unitários, menos testes de serviço e poucos testes de interface; quanto mais alto o nível, menos testes.

## Conteúdo

- As camadas, de baixo para cima: «Unit Tests», «Service Tests», «User Interface Tests». Fonte: [The Practical Test Pyramid (Fowler, 2018-02-26)](https://martinfowler.com/articles/practical-test-pyramid.html)
- A regra: «The more high-level you get the fewer tests you should have». Fonte: o mesmo artigo.
- Para a reutilização *(interpretação)*: o núcleo partilhado prova-se com testes unitários e de serviço que correm sem os adaptadores de nenhum cliente; os testes de interface, poucos, ficam para cada caso instalado.

**Para uma skill:** o projeto tem muitos testes unitários, menos de serviço e poucos de interface, e todos correm no pipeline.

## Ver também

- [Testes no pipeline](testes-no-pipeline.md) (CI/CD e ferramentas)
- [Ferramentas: frameworks de teste](ferramentas-frameworks-de-teste.md) (CI/CD e ferramentas)
- [Núcleo e adaptadores (arquitetura hexagonal)](../produto/nucleo-e-adaptadores.md) (Modularização e produtização)

Fonte: https://martinfowler.com/articles/practical-test-pyramid.html, consultado a 2026-11-10. Não vem do PDF.

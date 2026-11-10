---
id: produto/modelos-de-projeto-reutilizaveis
titulo: "Modelos de projeto reutilizáveis (Cookiecutter e Copier)"
seccao: "Modularização e produtização"
paginas: []
fonte: "Documentação do Cookiecutter e do Copier, ligada em cada ponto; consultada a 2026-11-10, páginas sem data nem versão. Não vem do PDF."
data_lancamento: null
confianca: media
verificado_em: 2026-11-10
---

# Modelos de projeto reutilizáveis (Cookiecutter e Copier)

**Resumo:** Um modelo de projeto gera o segundo caso a partir do primeiro; a diferença entre as ferramentas está em se os projetos já gerados recebem as melhorias feitas depois ao modelo.

## Conteúdo

- Cookiecutter: «Cookiecutter creates projects from cookiecutters (project templates), e.g. Python package projects from Python package templates». É um gerador de uma só vez; a página lida não descreve nenhum mecanismo de atualização dos projetos gerados. Fonte: [Cookiecutter](https://cookiecutter.readthedocs.io)
- Copier: «A library and CLI app for rendering project templates». Entre os objetivos: «Code lifecycle management. When the template evolves, let consumers update their projects». Com um limite: «Not all templates allow updating». Fonte: [Copier](https://copier.readthedocs.io)
- Para a reutilização *(interpretação)*: o projeto do segundo cliente nasce do modelo com as respostas desse cliente; com um modelo atualizável, uma correção feita ao modelo chega aos projetos que já existem, em vez de ser repetida à mão em cada um.

**Para uma skill:** quando a decisão é «produto», existe um modelo de projeto e o segundo caso é gerado a partir dele; se os casos têm de receber melhorias futuras, o modelo é atualizável.

## Ver também

- [Específico ou modular](especifico-ou-modular.md) (Modularização e produtização)
- [Configuração fora do código (os doze fatores)](configuracao-fora-do-codigo.md) (Modularização e produtização)

Fonte: documentação do Cookiecutter e do Copier, ligada em cada ponto; consultada a 2026-11-10, páginas sem data nem versão. Não vem do PDF.

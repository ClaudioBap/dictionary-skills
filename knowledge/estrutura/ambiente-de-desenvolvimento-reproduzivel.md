---
id: estrutura/ambiente-de-desenvolvimento-reproduzivel
titulo: "Ambiente de desenvolvimento reproduzível (dev containers)"
seccao: "Estrutura e documentação"
paginas: []
fonte: "https://containers.dev/ e https://containers.dev/implementors/json_reference/; consultados a 2026-11-10, páginas sem data nem versão. Não vem do PDF."
data_lancamento: null
confianca: media
verificado_em: 2026-11-10
---

# Ambiente de desenvolvimento reproduzível (dev containers)

**Resumo:** O ambiente de trabalho viaja com o repositório, num contentor descrito por um ficheiro, para que uma pessoa nova ou um agente arranque com as mesmas ferramentas sem passos manuais.

## Conteúdo

- «A development container (or dev container for short) allows you to use a container as a full-featured development environment». Fonte: [Development Containers](https://containers.dev/)
- O ficheiro de definição: «The devcontainer.json file contains any needed metadata and settings required to configure a development container»; «It can be used by tools and services that support the dev container spec to create a development environment». Fonte: [devcontainer.json reference](https://containers.dev/implementors/json_reference/)
- A especificação é da Microsoft («© 2026 Microsoft»); as páginas lidas não indicam versão. Fonte: as mesmas páginas.
- Para a reutilização *(interpretação)*: o segundo caso, ou a pessoa que o vai operar, começa com o mesmo ambiente que o primeiro, porque a definição está no repositório e não na máquina de quem o fez.

**Para uma skill:** o repositório traz a definição do ambiente de desenvolvimento (por exemplo `.devcontainer/devcontainer.json`), e quem chega arranca sem passos manuais além de abrir o contentor.

## Ver também

- [Regras do projeto (pessoas e agentes)](regras-do-projeto.md) (Estrutura e documentação)
- [Configuração fora do código (os doze fatores)](../produto/configuracao-fora-do-codigo.md) (Modularização e produtização)

Fonte: https://containers.dev/ e https://containers.dev/implementors/json_reference/, consultados a 2026-11-10, páginas sem data nem versão. Não vem do PDF.

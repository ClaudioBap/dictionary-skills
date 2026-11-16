---
id: produto/configuracao-fora-do-codigo
titulo: "Configuração fora do código (os doze fatores)"
seccao: "Modularização e produtização"
paginas: []
fonte: "https://12factor.net; consultado a 2026-11-10, só os títulos dos fatores. Não vem do PDF."
data_lancamento: null
confianca: media
verificado_em: 2026-11-10
---

# Configuração fora do código (os doze fatores)

**Resumo:** O que muda de instalação para instalação vive no ambiente, e os serviços de que a aplicação depende são recursos ligados que se trocam sem tocar no código.

## Conteúdo

- Os doze fatores, pelos títulos: I Codebase, «One codebase tracked in revision control, many deploys»; II Dependencies, «Explicitly declare and isolate dependencies»; III Config, «Store config in the environment»; IV Backing services, «Treat backing services as attached resources»; V Build, release, run, «Strictly separate build and run stages»; VI Processes, «Execute the app as one or more stateless processes»; VII Port binding, «Export services via port binding»; VIII Concurrency, «Scale out via the process model»; IX Disposability, «Maximize robustness with fast startup and graceful shutdown»; X Dev/prod parity, «Keep development, staging, and production as similar as possible»; XI Logs, «Treat logs as event streams»; XII Admin processes, «Run admin/management tasks as one-off processes». Fonte: [The Twelve-Factor App](https://12factor.net)
- A página indica «Last updated 2017». Só os títulos foram lidos; o texto de cada fator não foi confirmado. Fonte: a mesma página.
- Para a reutilização *(interpretação)*: o fator III põe o que muda de caso para caso (credenciais, URLs, nomes) no ambiente e fora do código; o fator IV trata a caixa de correio, a base de dados ou o serviço de pesquisa como recursos ligados, trocáveis por caso sem alterar a aplicação.

**Para uma skill:** nenhum valor específico de um caso (credenciais, URLs, nomes de clientes) está no código, e o projeto arranca noutro caso só com outro ambiente.

## Ver também

- [Núcleo e adaptadores (arquitetura hexagonal)](nucleo-e-adaptadores.md) (Modularização e produtização)
- [Kubernetes: configuração e segredos](../docker/kubernetes-configuracao-e-segredos.md) (Docker e orquestração)

Fonte: https://12factor.net, consultado a 2026-11-10, só os títulos dos fatores. Não vem do PDF.

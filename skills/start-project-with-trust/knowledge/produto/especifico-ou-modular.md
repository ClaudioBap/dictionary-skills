---
id: produto/especifico-ou-modular
titulo: "Específico ou modular"
seccao: "Modularização e produtização"
paginas: []
fonte: "Martin Fowler (Yagni, MonolithFirst, MicroservicePrerequisites) e Azure Architecture Center (tenancy models), ligados em cada ponto; consultados a 2026-11-10. Não vem do PDF."
data_lancamento: 2015-05-26
confianca: alta
verificado_em: 2026-11-10
---

# Específico ou modular

**Resumo:** Antes de construir, decide-se se o resultado serve um caso só ou vai ser reutilizado; a opção mais barata que cumpre o pedido é a certa, e abstrair sem um segundo caso à vista é custo sem retorno.

## Conteúdo

- As quatro opções, da mais barata à mais cara *(interpretação: escala desta base)*:
  1. **Específico:** feito só para este caso, sem abstrações.
  2. **Específico com o variável isolado:** o que muda de caso para caso (dados, textos, marca, ligações a outros sistemas) fica em configuração e em ficheiros separados do código, pronto a copiar e adaptar. Ver [Configuração fora do código](configuracao-fora-do-codigo.md).
  3. **Núcleo partilhado com adaptadores:** o núcleo é um módulo versionado, igual para todos os casos; cada caso é um adaptador e uma configuração. Ver [Núcleo e adaptadores](nucleo-e-adaptadores.md) e [Versionamento e registo de alterações](versionamento-e-registo-de-alteracoes.md).
  4. **Produto:** um modelo de projeto atualizável ou uma solução multi-inquilino, com as funcionalidades de cada cliente atrás de flags. Ver [Modelos de projeto reutilizáveis](modelos-de-projeto-reutilizaveis.md), [Multi-inquilino](multi-inquilino.md) e [Feature flags](feature-flags.md).
- Não construir o que ainda não é preciso: «Yagni originally is an acronym that stands for "You Aren't Gonna Need It"». Quem constrói funcionalidades presumidas fá-lo porque «they think it will be cheaper to build it now rather than build it later»; o autor responde que essa comparação tem de pesar também o custo do atraso e a probabilidade de a funcionalidade nunca vir a ser precisa. Fonte: [Yagni (Fowler, 2015-05-26)](https://martinfowler.com/bliki/Yagni.html)
- Começar por um só sistema, bem dividido por dentro: «you shouldn't start a new project with microservices». «The logical way is to design a monolith carefully, paying attention to modularity within the software.» Só depois, «as boundaries stabilize, break down into finer-grained services». O aviso: «Most systems acquire too many dependencies between their modules, and thus can't be sensibly broken apart». Fonte: [MonolithFirst (Fowler, 2015-06-03)](https://martinfowler.com/bliki/MonolithFirst.html)
- Dividir em serviços exige condições prévias: provisionar depressa («you should be able to fire up a new server in a matter of hours»), monitorização básica («it's essential that a monitoring regime is in place to detect serious problems quickly»), implantação rápida em teste e em produção, e «close collaboration between developers and operations». Fonte: [MicroservicePrerequisites (Fowler, 2014-08-28)](https://martinfowler.com/bliki/MicroservicePrerequisites.html)
- Servir vários clientes na mesma instalação é uma decisão de negócio, e não só técnica: «Selecting a tenancy model isn't only a technical decision. It's also a commercial decision.» Fonte: [Tenancy models (Azure Architecture Center, 2025-06-11)](https://learn.microsoft.com/en-us/azure/architecture/guide/multitenant/considerations/tenancy-models)
- Exemplo *(interpretação)*: uma base de conhecimento feita a partir dos emails de um departamento. O núcleo é o que não depende do departamento: a ingestão dos emails, a indexação, a pesquisa e a interface. O específico é o que muda: os emails em si, o vocabulário do negócio e as regras de acesso. Para uma segunda empresa só o específico muda, e a opção 3 permite instalar o núcleo sem lhe tocar.
- Quando escolher cada uma *(interpretação)*: a 1 ou a 2 quando a resposta a «vai ser reutilizado?» é «não» ou «não sei»; a 3 quando há um segundo caso conhecido ou provável; a 4 só com vários casos previstos e uma decisão comercial de produto.

**Para uma skill:** o plano regista a opção escolhida e porque não serve a mais barata; nas opções 3 e 4, um dos critérios de sucesso é um segundo caso instanciado só com configuração e conhecimento novos, sem alterar o núcleo.

## Ver também

- [Adotar antes de construir](../plataformas/adotar-antes-de-construir.md) (Plataformas para adotar antes de construir)
- [Decisões registadas (ADR)](../estrutura/decisoes-registadas-adr.md) (Estrutura e documentação)

Fonte: Martin Fowler (Yagni, MonolithFirst, MicroservicePrerequisites) e Azure Architecture Center (tenancy models), ligados em cada ponto; consultados a 2026-11-10. Não vem do PDF.

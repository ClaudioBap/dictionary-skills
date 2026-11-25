---
id: plataformas/feature-flags-e-notificacoes
titulo: "Feature flags e notificações (Unleash, Flagsmith, Novu)"
seccao: "Plataformas para adotar antes de construir"
paginas: []
fonte: "Documentação e ficheiros de licença do Unleash, do Flagsmith e do Novu, ligados em cada ponto; consultados a 2026-11-10, páginas sem data. Não vem do PDF."
data_lancamento: null
confianca: media
verificado_em: 2026-11-10
---

# Feature flags e notificações (Unleash, Flagsmith, Novu)

**Resumo:** Ligar funcionalidades por cliente ou por fase sem fazer outra versão do código, e enviar notificações por vários canais, são blocos que se adotam; as licenças do Unleash e do Flagsmith ainda precisam de confirmação.

## Conteúdo

- Unleash: «SaaS or self-hosted deployment options.» A documentação não separa a edição open source da enterprise nem indica a licença. Licença no repositório: AGPL-3.0, confirmada a 2026-11-25 no ficheiro LICENSE («GNU AFFERO GENERAL PUBLIC LICENSE, Version 3, 19 November 2007») e na identificação de licença do GitHub (`AGPL-3.0`). Fonte: [Unleash docs](https://docs.getunleash.io/), [LICENSE (Unleash/unleash)](https://github.com/Unleash/unleash/blob/main/LICENSE)
- Flagsmith: flags e configuração remota, SDKs de cliente e de servidor, compatível com OpenFeature, Management API e uma secção de auto-alojamento. O ficheiro LICENSE.md começa com «Copyright (c) 2024 Bullet Train Ltd ... All rights reserved.» e segue com as três condições da licença BSD de 3 cláusulas; o GitHub identifica-a como `BSD-3-Clause` (lido a 2026-11-25, só o LICENSE.md da raiz). Fonte: [Flagsmith docs](https://docs.flagsmith.com/), [LICENSE.md (Flagsmith/flagsmith)](https://github.com/Flagsmith/flagsmith/blob/main/LICENSE.md)
- Novu: «open-source infrastructure» de notificações, com os canais «Inbox, email, SMS, push, and chat», e Novu Connect para agentes de IA. Licença no repositório: «MIT License». Auto-alojamento e região: não indicados na página. Fonte: [Novu docs](https://docs.novu.co/), [LICENSE (novuhq/novu)](https://github.com/novuhq/novu/blob/main/LICENSE)
- Localização dos dados na UE: não confirmada nas páginas lidas, em nenhum dos três.

**Para uma skill:** uma funcionalidade que só alguns clientes têm, ou que vai ser ligada por fases, fica atrás de uma flag em vez de outra versão do código; o plano regista a licença do serviço de flags (AGPL no Unleash, por confirmar) na coluna «Risco».

## Ver também

- [Feature flags (toggles)](../produto/feature-flags.md) (Modularização e produtização)
- [Automação e integração (n8n, Node-RED)](automacao-e-integracao.md) (Plataformas para adotar antes de construir)
- [Adotar antes de construir](adotar-antes-de-construir.md) (Plataformas para adotar antes de construir)

Fonte: documentação e ficheiros de licença do Unleash, do Flagsmith e do Novu, ligados em cada ponto; consultados a 2026-11-10, páginas sem data. Não vem do PDF.

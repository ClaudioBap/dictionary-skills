---
id: design/notificacoes-ao-utilizador
titulo: "Notificações ao utilizador"
seccao: "Design e experiência de utilizador"
paginas: [18]
fonte: Dicionario-Boas-Praticas.pdf
verificado_em: 2026-11-18
editado_em: 2026-11-18
fontes_oficiais_consultadas_em: 2026-11-04
---

# Notificações ao utilizador

**Resumo:** Distinguir o urgente do informativo e deixar o utilizador controlar o que chega e por que canal; uma ação que precisa de outro dispositivo avisa nesse dispositivo, em qualquer página.

## Conteúdo

- Distinguir o urgente do informativo; centro de notificações para o que não é imediato; não interromper sem razão.
- Deixar controlar o que chega e por que canal (app, email); marcar como lido; não repetir.
- Uma ação que precisa de outro dispositivo avisa nesse dispositivo, em qualquer página em que a pessoa esteja, e não só numa página de definições *(interpretação)*. Por exemplo, um telemóvel novo que pede acesso aparece como aviso no browser do PC, com a aprovação ali mesmo. Na classificação da NN/g é uma notificação que pede ação, e essas costumam ser urgentes e mais intrusivas; as passivas não pedem nada e ficam discretas. Fonte: [NN/g: Indicators, Validations, and Notifications (2024-01-17)](https://www.nngroup.com/articles/indicators-validations-notifications/)
- Aviso de toda a aplicação (por exemplo, enquanto falta um passo da configuração): um só por página, antes do título principal e com a largura do resto do conteúdo, com `role="region"` e `aria-labelledby` a apontar para o título do aviso. O GOV.UK pede que se use com moderação, porque as pessoas muitas vezes não o veem, e menos ainda quando aparece sempre; o que diz respeito à tarefa da página vai no conteúdo, e não num aviso. Sobre dispensar o aviso, o GOV.UK diz que ainda falta investigação; *(interpretação)* quando a pessoa já sabe o que falta, pode dispensá-lo com um botão. Fonte: [GOV.UK Design System: Notification banner (alterações recentes até agosto de 2022)](https://design-system.service.gov.uk/components/notification-banner/)

**Para uma skill:** as notificações são controláveis pelo utilizador e não interrompem sem necessidade. Uma ação que espera por outro dispositivo avisa nesse dispositivo, em qualquer página; um aviso de toda a aplicação aparece um de cada vez, antes do título, e pode ser dispensado.

## Fontes oficiais

*Ligações externas que apoiam esta entrada, consultadas a 2026-11-04. Não alteram o texto acima.*

- [NN/g – Indicators, validations, notifications](https://www.nngroup.com/articles/indicators-validations-notifications/) — Notificações urgentes intrusivas vs passivas informativas
- [NN/g – Push notification mistakes](https://www.nngroup.com/articles/push-notification/) — Controlo por tipo, preferências na app, não sobrecarregar
- [Apple HIG – Managing notifications](https://developer.apple.com/design/human-interface-guidelines/managing-notifications) — Níveis de interrupção e controlo pelo utilizador (não lida: bloqueia acesso automático)

*As fontes da edição de 2026-11-18 (NN/g e GOV.UK) estão ligadas em cada ponto do «Conteúdo».*

## Histórico

- **2026-11-18**: antes, o resumo dizia «Distinguir o urgente do informativo e deixar o utilizador controlar o que chega e por que canal.» e a linha «Para uma skill» dizia «as notificações são controláveis pelo utilizador e não interrompem sem necessidade.» (PDF pág. 18). Mudou porque a entrada passou a cobrir as ações que esperam por outro dispositivo e o aviso de toda a aplicação enquanto falta um passo. Fontes: [NN/g: Indicators, Validations, and Notifications](https://www.nngroup.com/articles/indicators-validations-notifications/), [GOV.UK Design System: Notification banner](https://design-system.service.gov.uk/components/notification-banner/). Editado a 2026-11-18.

Fonte: pág. 18 (Dicionario-Boas-Praticas.pdf)

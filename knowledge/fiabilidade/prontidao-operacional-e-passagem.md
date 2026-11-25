---
id: fiabilidade/prontidao-operacional-e-passagem
titulo: "Prontidão operacional e passagem"
seccao: "Fiabilidade e resiliência"
paginas: []
fonte: "Síntese das entradas ligadas, cada uma com as suas fontes oficiais; consultadas a 2026-11-10. Não vem do PDF."
data_lancamento: null
confianca: media
verificado_em: 2026-11-25
editado_em: 2026-11-25
---

# Prontidão operacional e passagem

**Resumo:** Uma plataforma só se entrega a quem a vai operar quando existem, com prova, monitorização, runbooks, cópias testadas, processo de incidentes, registo de alterações e sondas de saúde.

## Conteúdo

Lista do que tem de existir antes da passagem a uma equipa sem conhecimento operacional profundo *(interpretação: a lista é uma síntese; cada ponto remete para a entrada com a fonte)*:

- Monitorização nos quatro sinais (latência, tráfego, erros, saturação), com alertas a chegar a alguém. Ver [Monitorização: os quatro sinais dourados](monitorizacao-quatro-sinais.md).
- Objetivo de serviço escrito, para se saber o que é «estar bem». Ver [SLO, SLI e orçamento de erro](slo-sli-e-orcamento-de-erro.md).
- Um runbook por operação recorrente, seguido com sucesso por quem não o escreveu. Ver [Operação padronizada e runbooks](operacao-padronizada-e-runbooks.md).
- Cópias 3-2-1 com uma reposição de teste registada. Ver [Cópias de segurança 3-2-1](copias-de-seguranca-3-2-1.md).
- Processo de incidentes e modelo de postmortem sem culpa. Ver [Incidentes e postmortem sem culpa](incidentes-e-postmortem-sem-culpa.md).
- Registo de alterações legível por pessoas: «Changelogs are _for humans_, not machines.» Ver [Registo de alterações (o sentido da mudança)](../estrutura/registo-de-alteracoes.md). Fonte: [Keep a Changelog 1.1.0](https://keepachangelog.com/en/1.1.0/)
- Sondas de saúde em cada serviço, para o orquestrador reiniciar o que está preso e não enviar tráfego ao que não está pronto. Ver [Sondas de saúde (liveness, readiness, startup)](../docker/sondas-de-saude.md).
- Um documento de operação no repositório que aponta para tudo isto e diz o estado atual. Ver [Documento de estado vivo](../estrutura/documento-de-estado-vivo.md).

**Para uma skill:** a passagem inclui um documento de operação com estes pontos, cada um com a sua prova (painel e alerta disparado, runbook executado por outra pessoa, reposição feita, exercício de incidente, registo de alterações, sondas a responder); a entrega não se aceita sem ele.

## Ver também

- [Monitorização: os quatro sinais dourados](monitorizacao-quatro-sinais.md) (Fiabilidade e resiliência)
- [Operação padronizada e runbooks](operacao-padronizada-e-runbooks.md) (Fiabilidade e resiliência)
- [Cópias de segurança 3-2-1](copias-de-seguranca-3-2-1.md) (Fiabilidade e resiliência)
- [Incidentes e postmortem sem culpa](incidentes-e-postmortem-sem-culpa.md) (Fiabilidade e resiliência)
- [Sondas de saúde (liveness, readiness, startup)](../docker/sondas-de-saude.md) (Docker e orquestração)
- [Documento de estado vivo](../estrutura/documento-de-estado-vivo.md) (Estrutura e documentação)

## Histórico

- **data não indicada**: antes, «**Para uma skill:** a Fase 5 inclui um documento de operação» (síntese de 2026-11-10). Mudou porque a entrada serve também a `operar` e a `orchestrate-sessions`, fora da Fase 5 da `start-project-with-trust`; o resto da linha não mudou. Editado a 2026-11-25.

Fonte: síntese das entradas ligadas, cada uma com as suas fontes oficiais; consultadas a 2026-11-10. Não vem do PDF.

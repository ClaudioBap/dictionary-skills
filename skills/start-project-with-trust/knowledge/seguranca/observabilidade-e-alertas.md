---
id: seguranca/observabilidade-e-alertas
titulo: "Observabilidade e alertas"
seccao: "Segurança"
paginas: [7]
fonte: Dicionario-Boas-Praticas.pdf
verificado_em: 2026-11-03
---

# Observabilidade e alertas

**Resumo:** Logs estruturados e centralizados, alertas em eventos de segurança e erros sem detalhe técnico no ecrã.

## Conteúdo

- Logs estruturados com identificador de pedido, enviados para um sítio central.
- Métricas e alertas em logins falhados, revogações, escritas sensíveis e erros 5xx.
- Erros mostram ao utilizador uma referência; o detalhe fica no log, nunca no ecrã.

**Para uma skill:** eventos de segurança geram alerta; os erros não expõem detalhe técnico ao utilizador.

## Ver também

- [Observabilidade (Grafana, Prometheus, Loki, Tempo)](../infraestrutura/observabilidade-grafana-prometheus-loki-tempo.md) (Serviços de infraestrutura)
- [Ferramentas: observabilidade](../cicd/ferramentas-observabilidade.md) (CI/CD e ferramentas)
- [Deteção e resposta a incidentes](../seguranca/detecao-e-resposta-a-incidentes.md) (Segurança)

Fonte: pág. 7 (Dicionario-Boas-Praticas.pdf)

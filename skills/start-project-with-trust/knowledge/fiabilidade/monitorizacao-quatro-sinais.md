---
id: fiabilidade/monitorizacao-quatro-sinais
titulo: "Monitorização: os quatro sinais dourados"
seccao: "Fiabilidade e resiliência"
paginas: []
fonte: "Google SRE Book (capítulo 6) e documentação do OpenTelemetry, ligados em cada ponto; consultados a 2026-11-10, páginas sem data de publicação. Não vem do PDF."
data_lancamento: null
confianca: media
verificado_em: 2026-11-10
---

# Monitorização: os quatro sinais dourados

**Resumo:** Quatro medidas chegam para saber se um serviço está bem (latência, tráfego, erros e saturação), e recolhem-se com um padrão aberto em vez da ferramenta de um só fornecedor.

## Conteúdo

- Latência: «Latency: The time it takes to service a request.» Fonte: [Monitoring Distributed Systems (SRE Book, cap. 6)](https://sre.google/sre-book/monitoring-distributed-systems/)
- Tráfego: «Traffic: A measure of how much demand is being placed on your system, measured in a high-level system-specific metric.» Fonte: [Monitoring Distributed Systems](https://sre.google/sre-book/monitoring-distributed-systems/)
- Erros e saturação: o capítulo define erros como a taxa de pedidos que falham, de forma explícita (por exemplo HTTP 500) ou implícita, e saturação como o quão «cheio» está o serviço, com ênfase nos recursos mais limitados. As duas frases não foram lidas até ao fim, por isso não se citam à letra. Fonte: [Monitoring Distributed Systems](https://sre.google/sre-book/monitoring-distributed-systems/)
- OpenTelemetry é «An observability framework and toolkit», «Open source, as well as vendor- and tool-agnostic», e «OpenTelemetry is not an observability backend itself.» Os sinais que recolhe: «traces, metrics, and logs». Fonte: [What is OpenTelemetry?](https://opentelemetry.io/docs/what-is-opentelemetry/)
- Para onde vão os dados e como se fazem painéis e alertas: ver [Observabilidade (Grafana, Prometheus, Loki, Tempo)](../infraestrutura/observabilidade-grafana-prometheus-loki-tempo.md).

**Para uma skill:** cada serviço em produção expõe os quatro sinais num painel com alertas, recolhidos com OpenTelemetry ou num formato que ele exporte; a prova é o painel aberto e um alerta de teste disparado.

## Ver também

- [Observabilidade (Grafana, Prometheus, Loki, Tempo)](../infraestrutura/observabilidade-grafana-prometheus-loki-tempo.md) (Serviços de infraestrutura)
- [SLO, SLI e orçamento de erro](slo-sli-e-orcamento-de-erro.md) (Fiabilidade e resiliência)
- [Prontidão operacional e passagem](prontidao-operacional-e-passagem.md) (Fiabilidade e resiliência)
- [Observabilidade de aplicações com LLM](../ia/operacao/observabilidade-de-llm.md) (Construir com IA)

Fonte: Google SRE Book (capítulo 6) e documentação do OpenTelemetry, ligados em cada ponto; consultados a 2026-11-10, páginas sem data de publicação. Não vem do PDF.

---
id: cicd/observabilidade-do-deploy
titulo: "Observabilidade do deploy"
seccao: "CI/CD e ferramentas"
paginas: [47]
fonte: Dicionario-Boas-Praticas.pdf
verificado_em: 2026-11-03
fontes_oficiais_consultadas_em: 2026-11-04
---

# Observabilidade do deploy

**Resumo:** Depois de subir, provar que está vivo com smoke test e confirmar a configuração.

## Conteúdo

- Depois de subir, provar que está vivo: smoke test, health check e confirmar que a configuração é a esperada.
- Métricas e alertas antes e depois; um deploy verde não prova que a funcionalidade funciona.

**Para uma skill:** todo o deploy corre um smoke test e confirma a configuração em produção.

## Fontes oficiais

*Ligações externas que apoiam esta entrada, consultadas a 2026-11-04. Não alteram o texto acima.*

- [Liveness, Readiness, and Startup Probes](https://kubernetes.io/docs/concepts/configuration/liveness-readiness-startup-probes/) — Health checks decidem reinício e se o contentor recebe tráfego
- [Prometheus overview](https://prometheus.io/docs/introduction/overview/) — Métricas e regras de alerta sobre os dados recolhidos

Fonte: pág. 47 (Dicionario-Boas-Praticas.pdf)

---
id: docker/kubernetes-conceitos
titulo: "Kubernetes: conceitos"
seccao: "Docker e orquestração"
paginas: [52]
fonte: Dicionario-Boas-Praticas.pdf
verificado_em: 2026-11-03
fontes_oficiais_consultadas_em: 2026-11-04
---

# Kubernetes: conceitos

**Resumo:** Orquestrador declarativo que mantém o estado desejado: Pod, Deployment, Service e Ingress.

## Conteúdo

- Orquestrador que mantém o estado desejado num cluster. **Pod:** um ou mais contentores juntos. **Deployment:** gere réplicas e atualizações. **Service:** endereço estável para os pods. **Ingress:** entrada HTTP de fora.
- Declarativo: descreve-se o que se quer (YAML) e o cluster trata de lá chegar.

**Para uma skill:** o estado do cluster é declarado em manifestos versionados, não por comandos à mão.

## Fontes oficiais

*Ligações externas que apoiam esta entrada, consultadas a 2026-11-04. Não alteram o texto acima.*

- [Overview](https://kubernetes.io/docs/concepts/overview/) — Declarativo: o cluster converge para o estado desejado
- [Pods](https://kubernetes.io/docs/concepts/workloads/pods/) — Pod é um grupo de contentores com rede e armazenamento partilhados
- [Service](https://kubernetes.io/docs/concepts/services-networking/service/) — Endereço estável para um conjunto de pods

> **Nota (fonte oficial):** A página oficial de Ingress (https://kubernetes.io/docs/concepts/services-networking/ingress/) diz que a API Ingress está congelada e o projeto recomenda Gateway API em vez de Ingress.

Fonte: pág. 52 (Dicionario-Boas-Praticas.pdf)

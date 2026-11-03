---
id: docker/kubernetes-conceitos
titulo: "Kubernetes: conceitos"
seccao: "Docker e orquestração"
paginas: [52]
fonte: Dicionario-Boas-Praticas.pdf
verificado_em: 2026-11-03
---

# Kubernetes: conceitos

**Resumo:** Orquestrador declarativo que mantém o estado desejado: Pod, Deployment, Service e Ingress.

## Conteúdo

- Orquestrador que mantém o estado desejado num cluster. **Pod:** um ou mais contentores juntos. **Deployment:** gere réplicas e atualizações. **Service:** endereço estável para os pods. **Ingress:** entrada HTTP de fora.
- Declarativo: descreve-se o que se quer (YAML) e o cluster trata de lá chegar.

**Para uma skill:** o estado do cluster é declarado em manifestos versionados, não por comandos à mão.

Fonte: pág. 52 (Dicionario-Boas-Praticas.pdf)

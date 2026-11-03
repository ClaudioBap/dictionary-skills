---
id: docker/kubernetes-configuracao-e-segredos
titulo: "Kubernetes: configuração e segredos"
seccao: "Docker e orquestração"
paginas: [53]
fonte: Dicionario-Boas-Praticas.pdf
verificado_em: 2026-11-03
---

# Kubernetes: configuração e segredos

**Resumo:** ConfigMap para configuração e segredos num cofre, nunca na imagem.

## Conteúdo

- `ConfigMap` para configuração, `Secret` para segredos (cifrar em repouso; melhor, integrar com um cofre externo).
- Variáveis e ficheiros montados nos pods; nunca segredos na imagem.

**Para uma skill:** configuração em ConfigMap, segredos num cofre, nunca na imagem.

Fonte: pág. 53 (Dicionario-Boas-Praticas.pdf)

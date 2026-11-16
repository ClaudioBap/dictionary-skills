---
id: docker/kubernetes-configuracao-e-segredos
titulo: "Kubernetes: configuração e segredos"
seccao: "Docker e orquestração"
paginas: [53]
fonte: Dicionario-Boas-Praticas.pdf
verificado_em: 2026-11-03
fontes_oficiais_consultadas_em: 2026-11-04
---

# Kubernetes: configuração e segredos

**Resumo:** ConfigMap para configuração e segredos num cofre, nunca na imagem.

## Conteúdo

- `ConfigMap` para configuração, `Secret` para segredos (cifrar em repouso; melhor, integrar com um cofre externo).
- Variáveis e ficheiros montados nos pods; nunca segredos na imagem.

**Para uma skill:** configuração em ConfigMap, segredos num cofre, nunca na imagem.

## Fontes oficiais

*Ligações externas que apoiam esta entrada, consultadas a 2026-11-04. Não alteram o texto acima.*

- [ConfigMaps](https://kubernetes.io/docs/concepts/configuration/configmap/) — Configuração não confidencial como variáveis ou ficheiros montados
- [Secrets](https://kubernetes.io/docs/concepts/configuration/secret/) — Secrets não cifrados por omissão; cifrar em repouso, cofre externo

Fonte: pág. 53 (Dicionario-Boas-Praticas.pdf)

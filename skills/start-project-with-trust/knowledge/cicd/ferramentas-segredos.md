---
id: cicd/ferramentas-segredos
titulo: "Ferramentas: segredos (deteção e cofres)"
seccao: "CI/CD e ferramentas"
paginas: [48, 49]
fonte: Dicionario-Boas-Praticas.pdf
verificado_em: 2026-11-03
---

# Ferramentas: segredos (deteção e cofres)

**Resumo:** Deteção de segredos no repositório e cofres para os guardar.

## Conteúdo

- **Deteção no repositório:** `gitleaks`, `trufflehog`.
- **Cofres (secret managers):** `HashiCorp Vault` / `OpenBao`, `OVH OKMS`, `Azure Key Vault`, `AWS Secrets Manager`.
- A deteção apanha o que escapa; o cofre guarda os valores fora do código.

**Para uma skill:** `gitleaks` no CI e os segredos num cofre, nunca no repositório.

## Ver também

- [Segredos num cofre, fora do código e do disco](../seguranca/segredos-num-cofre.md) (Segurança)

Fonte: págs. 48, 49 (Dicionario-Boas-Praticas.pdf)

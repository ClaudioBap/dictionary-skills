---
id: cicd/ferramentas-segredos
titulo: "Ferramentas: segredos (deteção e cofres)"
seccao: "CI/CD e ferramentas"
paginas: [48, 49]
fonte: Dicionario-Boas-Praticas.pdf
verificado_em: 2026-11-03
fontes_oficiais_consultadas_em: 2026-11-04
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

## Fontes oficiais

*Ligações externas que apoiam esta entrada, consultadas a 2026-11-04. Não alteram o texto acima.*

- [Gitleaks](https://github.com/gitleaks/gitleaks) — Deteta passwords, chaves e tokens em repositórios git
- [TruffleHog](https://github.com/trufflesecurity/trufflehog) — Descobre, classifica e valida credenciais expostas
- [What is Vault](https://developer.hashicorp.com/vault/docs/what-is-vault) — Cofre centralizado e auditado para segredos, chaves e certificados

> **Nota (fonte oficial):** O README do gitleaks declara a ferramenta «feature complete» (só patches de segurança daqui em diante) e o mantenedor a mudar o foco para o Betterleaks.

Fonte: págs. 48, 49 (Dicionario-Boas-Praticas.pdf)

---
id: infraestrutura/gestao-de-segredos-vault-openbao
titulo: "Gestão de segredos (Vault / OpenBao)"
seccao: "Serviços de infraestrutura"
paginas: [56]
fonte: Dicionario-Boas-Praticas.pdf
verificado_em: 2026-11-03
fontes_oficiais_consultadas_em: 2026-11-04
---

# Gestão de segredos (Vault / OpenBao)

**Resumo:** Um cofre central que guarda, controla, audita e roda segredos.

## Conteúdo

- Cofre central para segredos: guarda, controla o acesso, audita, roda e pode emitir credenciais dinâmicas de curta duração.
- OpenBao é o sucessor aberto do Vault; alternativa soberana ao cofre do fornecedor de nuvem.

**Para uma skill:** os serviços lêem os segredos de um cofre, com rotação, não de ficheiros.

## Ver também

- [Segredos num cofre, fora do código e do disco](../seguranca/segredos-num-cofre.md) (Segurança)
- [Um só cofre de segredos soberano](../soberania/um-so-cofre-de-segredos-soberano.md) (Soberania digital)

## Fontes oficiais

*Ligações externas que apoiam esta entrada, consultadas a 2026-11-04. Não alteram o texto acima.*

- [What is OpenBao](https://openbao.org/docs/what-is-openbao/) — Segredos centralizados, auditoria, segredos dinâmicos com lease
- [What is Vault](https://developer.hashicorp.com/vault/docs/about-vault/what-is-vault) — Gestão centralizada de segredos com auditoria de toda a atividade
- [Vault database secrets engine](https://developer.hashicorp.com/vault/docs/secrets/databases) — Credenciais de base de dados dinâmicas com TTL

> **Nota (fonte oficial):** O OpenBao descreve-se como «fork» comunitário do Vault (OpenSSF/Linux Foundation), não como «sucessor». O Vault continua a ser mantido pela HashiCorp (edições Community e Enterprise).

Fonte: pág. 56 (Dicionario-Boas-Praticas.pdf)

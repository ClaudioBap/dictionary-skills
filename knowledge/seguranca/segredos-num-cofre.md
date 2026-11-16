---
id: seguranca/segredos-num-cofre
titulo: "Segredos num cofre, fora do código e do disco"
seccao: "Segurança"
paginas: [5]
fonte: Dicionario-Boas-Praticas.pdf
verificado_em: 2026-11-03
fontes_oficiais_consultadas_em: 2026-11-04
---

# Segredos num cofre, fora do código e do disco

**Resumo:** Segredos guardados num cofre, nunca no código nem em configuração versionada, com deteção de segredos no CI.

## Conteúdo

- Segredos atrás de uma interface, nunca no código nem em configuração versionada; `.env` fora do git.
- Um cofre guarda os valores; a máquina tem só a credencial mínima que o abre, idealmente sem ficheiro (identidade de carga).
- Procura de segredos no CI (gitleaks ou equivalente); diagnósticos mostram nomes, nunca valores.

**Para uma skill:** nenhum segredo no repositório; rotação e expiração pensadas.

## Ver também

- [Gestão de segredos (Vault / OpenBao)](../infraestrutura/gestao-de-segredos-vault-openbao.md) (Serviços de infraestrutura)
- [Um só cofre de segredos soberano](../soberania/um-so-cofre-de-segredos-soberano.md) (Soberania digital)
- [Ferramentas: segredos (deteção e cofres)](../cicd/ferramentas-segredos.md) (CI/CD e ferramentas)

## Fontes oficiais

*Ligações externas que apoiam esta entrada, consultadas a 2026-11-04. Não alteram o texto acima.*

- [OWASP Secrets Management Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Secrets_Management_Cheat_Sheet.html) — cofre centralizado, rotação e expiração, deteção de segredos, não registar valores

Fonte: pág. 5 (Dicionario-Boas-Praticas.pdf)

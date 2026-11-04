---
id: seguranca/testes-de-seguranca-ativos
titulo: "Testes de segurança ativos"
seccao: "Segurança"
paginas: [8, 9]
fonte: Dicionario-Boas-Praticas.pdf
verificado_em: 2026-11-03
fontes_oficiais_consultadas_em: 2026-11-04
---

# Testes de segurança ativos

**Resumo:** Threat modeling antes de construir, DAST sobre a aplicação a correr e pentest ou bug bounty periódico.

## Conteúdo

- **Threat modeling** antes de construir: o que pode correr mal, quem é o atacante, o que proteger (STRIDE).
- **DAST:** testar a aplicação a correr (OWASP ZAP, Burp), além do SAST sobre o código.
- **Pentest / bug bounty** periódico; corrigir e registar.

**Para uma skill:** uma funcionalidade sensível passa por threat modeling e por um teste dinâmico antes de produção.

## Fontes oficiais

*Ligações externas que apoiam esta entrada, consultadas a 2026-11-04. Não alteram o texto acima.*

- [OWASP Threat Modeling Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Threat_Modeling_Cheat_Sheet.html) — modelação de ameaças na fase de design, STRIDE, as quatro perguntas
- [OWASP WSTG](https://owasp.org/www-project-web-security-testing-guide/) — guia de testes de segurança de aplicações web
- [ZAP](https://www.zaproxy.org/) — scanner de aplicações web em execução (teste dinâmico)

> **Nota (fonte oficial):** O site oficial do ZAP apresenta-o como «by Checkmarx» e «projeto open source independente»; já não é designado «OWASP ZAP».

Fonte: págs. 8, 9 (Dicionario-Boas-Praticas.pdf)

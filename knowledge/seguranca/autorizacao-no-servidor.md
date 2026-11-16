---
id: seguranca/autorizacao-no-servidor
titulo: "Autorização no servidor, negar por omissão"
seccao: "Segurança"
paginas: [3]
fonte: Dicionario-Boas-Praticas.pdf
verificado_em: 2026-11-03
fontes_oficiais_consultadas_em: 2026-11-04
---

# Autorização no servidor, negar por omissão

**Resumo:** A decisão de quem pode o quê vive no servidor, cada endpoint declara o que exige e, sem declaração, recusa.

## Conteúdo

- Toda a decisão de quem pode o quê vive no servidor; o frontend é só um espelho, nunca a fonte da verdade.
- Negar por omissão: cada endpoint declara o que exige; sem declaração, recusa.
- Guardas com nome de intenção (quem lê, quem escreve, quem administra) e verificação de âmbito contra acesso a dados de outros (anti-IDOR).

**Para uma skill:** cada endpoint que muda dados tem uma guarda explícita e um teste de quem pode e quem não pode.

## Ver também

- [Segurança de API](../seguranca/seguranca-de-api.md) (Segurança)
- [Gestão de acessos na interface](../design/gestao-de-acessos-na-interface.md) (Design e experiência de utilizador)

## Fontes oficiais

*Ligações externas que apoiam esta entrada, consultadas a 2026-11-04. Não alteram o texto acima.*

- [OWASP Authorization Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Authorization_Cheat_Sheet.html) — negar por omissão, controlo no servidor, verificação por objeto (IDOR)
- [OWASP API1:2023 BOLA](https://api-security.owasp.org/editions/2023/en/0xa1-broken-object-level-authorization) — verificar se o utilizador pode agir sobre cada registo pedido

Fonte: pág. 3 (Dicionario-Boas-Praticas.pdf)

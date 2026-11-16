---
id: seguranca/seguranca-de-api
titulo: "Segurança de API"
seccao: "Segurança"
paginas: [8]
fonte: Dicionario-Boas-Praticas.pdf
verificado_em: 2026-11-03
fontes_oficiais_consultadas_em: 2026-11-04
---

# Segurança de API

**Resumo:** Autorização por objeto (BOLA), só campos esperados, sem SSRF e CORS com origens explícitas.

## Conteúdo

- **Autorização por objeto (BOLA):** confirmar que o utilizador pode aceder ao recurso pedido, não só que está autenticado; é a falha nº1 de APIs.
- **Mass assignment:** aceitar só os campos esperados, nunca ligar o corpo do pedido diretamente ao modelo.
- **SSRF:** não deixar o servidor pedir URLs que o utilizador controla sem allowlist; bloquear redes internas.
- **CORS:** lista de origens explícita, nunca `*` com credenciais; rate limit por cliente.

**Para uma skill:** cada endpoint verifica o dono do recurso, aceita só campos conhecidos e não segue URLs arbitrários.

## Ver também

- [Autorização no servidor, negar por omissão](../seguranca/autorizacao-no-servidor.md) (Segurança)

## Fontes oficiais

*Ligações externas que apoiam esta entrada, consultadas a 2026-11-04. Não alteram o texto acima.*

- [OWASP API Security Top 10 2023](https://api-security.owasp.org/editions/2023/en/0x11-t10) — BOLA é o API1:2023; inclui mass assignment (API3) e SSRF (API7)
- [OWASP SSRF Prevention Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Server_Side_Request_Forgery_Prevention_Cheat_Sheet.html) — allowlist de destinos; bloquear redes internas e metadados cloud
- [MDN: CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CORS) — proibido Access-Control-Allow-Origin * em pedidos com credenciais

Fonte: pág. 8 (Dicionario-Boas-Praticas.pdf)

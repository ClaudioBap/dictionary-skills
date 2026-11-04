---
id: seguranca/csrf-verificar-a-origem
titulo: "CSRF: verificar a origem, não só o cookie"
seccao: "Segurança"
paginas: [3]
fonte: Dicionario-Boas-Praticas.pdf
verificado_em: 2026-11-03
fontes_oficiais_consultadas_em: 2026-11-04
---

# CSRF: verificar a origem, não só o cookie

**Resumo:** Como o browser envia o cookie sozinho, os métodos que mudam dados verificam a origem e nunca são `GET`.

## Conteúdo

- O browser envia o cookie de sessão sozinho; um site externo pode disparar uma ação na sessão aberta da vítima.
- Camadas: cookie `SameSite` (strict na app, lax só no login), verificação de `Origin` / `Sec-Fetch-Site` nos métodos que mudam dados, e token anti-CSRF onde fizer sentido.
- Ações que mudam dados nunca em `GET`; links de email que agem levam token de uso único.

**Para uma skill:** todo o método que muda dados verifica a origem e não é um `GET`.

## Fontes oficiais

*Ligações externas que apoiam esta entrada, consultadas a 2026-11-04. Não alteram o texto acima.*

- [OWASP CSRF Prevention Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Cross-Site_Request_Forgery_Prevention_Cheat_Sheet.html) — SameSite, Origin, Sec-Fetch-Site, tokens; nunca GET para mudar estado

> **Nota (fonte oficial):** A cheat sheet da OWASP trata agora o Sec-Fetch-Site (Fetch Metadata) como «sinal principal» de proteção CSRF; SameSite surge como defesa em profundidade.

Fonte: pág. 3 (Dicionario-Boas-Praticas.pdf)

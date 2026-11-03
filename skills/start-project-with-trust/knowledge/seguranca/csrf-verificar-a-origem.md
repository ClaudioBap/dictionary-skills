---
id: seguranca/csrf-verificar-a-origem
titulo: "CSRF: verificar a origem, não só o cookie"
seccao: "Segurança"
paginas: [3]
fonte: Dicionario-Boas-Praticas.pdf
verificado_em: 2026-11-03
---

# CSRF: verificar a origem, não só o cookie

**Resumo:** Como o browser envia o cookie sozinho, os métodos que mudam dados verificam a origem e nunca são `GET`.

## Conteúdo

- O browser envia o cookie de sessão sozinho; um site externo pode disparar uma ação na sessão aberta da vítima.
- Camadas: cookie `SameSite` (strict na app, lax só no login), verificação de `Origin` / `Sec-Fetch-Site` nos métodos que mudam dados, e token anti-CSRF onde fizer sentido.
- Ações que mudam dados nunca em `GET`; links de email que agem levam token de uso único.

**Para uma skill:** todo o método que muda dados verifica a origem e não é um `GET`.

Fonte: pág. 3 (Dicionario-Boas-Praticas.pdf)

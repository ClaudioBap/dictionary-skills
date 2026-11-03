---
id: seguranca/defesa-contra-xss
titulo: "Defesa contra XSS: escapar e CSP"
seccao: "Segurança"
paginas: [3]
fonte: Dicionario-Boas-Praticas.pdf
verificado_em: 2026-11-03
---

# Defesa contra XSS: escapar e CSP

**Resumo:** Escapar por omissão todo o texto do utilizador e ter uma CSP sem `unsafe-inline` como segunda rede.

## Conteúdo

- Escapar por omissão todo o texto do utilizador antes de o mostrar, para um dado nunca virar HTML ou script. Preferir renderização que escapa sozinha a escapar à mão.
- CSP como segunda rede: sem `unsafe-inline` no `script-src`, com nonce, para código injetado não correr mesmo que o escape falhe.
- `form-action 'self'` e `connect-src 'self'` para um formulário ou pedido injetado não enviar dados para fora.

**Para uma skill:** nenhum `innerHTML` com texto por escapar; CSP sem `unsafe-inline` no script.

## Ver também

- [TLS e cabeçalhos versionados](../seguranca/tls-e-cabecalhos-versionados.md) (Segurança)

Fonte: pág. 3 (Dicionario-Boas-Praticas.pdf)

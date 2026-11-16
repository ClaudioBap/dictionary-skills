---
id: seguranca/validacao-de-entradas
titulo: "Validação de entradas"
seccao: "Segurança"
paginas: [8]
fonte: Dicionario-Boas-Praticas.pdf
verificado_em: 2026-11-03
fontes_oficiais_consultadas_em: 2026-11-04
---

# Validação de entradas

**Resumo:** Validar toda a entrada na fronteira do servidor por allowlist e escapar na saída conforme o destino.

## Conteúdo

- Validar toda a entrada na fronteira do servidor, por lista de permissão (o que é aceite), não de exclusão; nunca confiar no cliente.
- Verificar tipo, formato, tamanho, intervalo e codificação; rejeitar cedo com erro claro.
- Separar validação (recusar o inválido) de saneamento, e escapar na saída conforme o destino (HTML, SQL, shell, URL).

**Para uma skill:** todo o endpoint valida as entradas por allowlist antes de as usar.

## Fontes oficiais

*Ligações externas que apoiam esta entrada, consultadas a 2026-11-04. Não alteram o texto acima.*

- [OWASP Input Validation Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Input_Validation_Cheat_Sheet.html) — validar no servidor, allowlist, tipo/formato/tamanho/intervalo, separar de output encoding

Fonte: pág. 8 (Dicionario-Boas-Praticas.pdf)

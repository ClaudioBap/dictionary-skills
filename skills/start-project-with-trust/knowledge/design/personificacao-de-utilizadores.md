---
id: design/personificacao-de-utilizadores
titulo: "Personificação de utilizadores (impersonation)"
seccao: "Design e experiência de utilizador"
paginas: [15, 16]
fonte: Dicionario-Boas-Praticas.pdf
verificado_em: 2026-11-03
---

# Personificação de utilizadores (impersonation)

**Resumo:** Deixar um administrador «entrar como» um utilizador, com auditoria, tarja visível, âmbito limitado e ações sensíveis bloqueadas.

## Conteúdo

- Deixar um administrador ver e usar a aplicação como um utilizador, para apoio e diagnóstico («entrar como»). Também relevante para segurança.
- Guardrails: registar sempre na auditoria quem personificou quem e quando; tarja bem visível de que está em modo personificação; âmbito limitado e saída fácil.
- Bloquear ações sensíveis em personificação (mudar password, apagar conta, pagamentos); só quem tem permissão o pode fazer.

**Para uma skill:** a personificação é auditada, mostra tarja, não permite ações sensíveis e sai com um clique.

## Ver também

- [Auditoria append-only e à prova de adulteração](../seguranca/auditoria-append-only.md) (Segurança)

Fonte: págs. 15, 16 (Dicionario-Boas-Praticas.pdf)

---
id: ia/seguranca-e-governacao-de-ia
titulo: "Segurança e governação de IA"
seccao: "Construir com IA (Claude e Anthropic)"
paginas: [69]
fonte: Dicionario-Boas-Praticas.pdf
verificado_em: 2026-11-03
---

# Segurança e governação de IA

**Resumo:** O conteúdo externo nunca comanda o agente, ações perigosas exigem aprovação e o uso de IA é auditado.

## Conteúdo

- Tratar a entrada do utilizador e o conteúdo externo como não confiável (prompt injection): não deixar o modelo seguir instruções escondidas em dados; isolar ferramentas perigosas com aprovação humana.
- Não enviar dados pessoais desnecessários ao modelo; registar o que a IA faz (auditoria); o modelo pode recusar (estado `refusal`) e deve haver fallback.

**Para uma skill:** o conteúdo externo nunca comanda o agente; ações perigosas passam por aprovação; o uso de IA é auditado.

Fonte: pág. 69 (Dicionario-Boas-Praticas.pdf)

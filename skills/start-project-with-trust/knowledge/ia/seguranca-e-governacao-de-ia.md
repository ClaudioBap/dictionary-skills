---
id: ia/seguranca-e-governacao-de-ia
titulo: "Segurança e governação de IA"
seccao: "Construir com IA (Claude e Anthropic)"
paginas: [69]
fonte: Dicionario-Boas-Praticas.pdf
verificado_em: 2026-11-03
fontes_oficiais_consultadas_em: 2026-11-04
---

# Segurança e governação de IA

**Resumo:** O conteúdo externo nunca comanda o agente, ações perigosas exigem aprovação e o uso de IA é auditado.

## Conteúdo

- Tratar a entrada do utilizador e o conteúdo externo como não confiável (prompt injection): não deixar o modelo seguir instruções escondidas em dados; isolar ferramentas perigosas com aprovação humana.
- Não enviar dados pessoais desnecessários ao modelo; registar o que a IA faz (auditoria); o modelo pode recusar (estado `refusal`) e deve haver fallback.

**Para uma skill:** o conteúdo externo nunca comanda o agente; ações perigosas passam por aprovação; o uso de IA é auditado.

## Fontes oficiais

*Ligações externas que apoiam esta entrada, consultadas a 2026-11-04. Não alteram o texto acima.*

- [OWASP Top 10 for LLM Applications 2025](https://genai.owasp.org/llm-top-10/) — LLM01 Prompt Injection e LLM06 Excessive Agency
- [Mitigate jailbreaks and prompt injections](https://platform.claude.com/docs/en/test-and-evaluate/strengthen-guardrails/mitigate-jailbreaks) — conteúdo externo não confiável, menor privilégio, triagem de resultados de ferramentas
- [NIST AI Risk Management Framework](https://www.nist.gov/itl/ai-risk-management-framework) — quadro de gestão e governação do risco de IA

Fonte: pág. 69 (Dicionario-Boas-Praticas.pdf)

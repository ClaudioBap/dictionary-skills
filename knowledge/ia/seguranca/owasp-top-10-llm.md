---
id: ia/seguranca/owasp-top-10-llm
titulo: "OWASP Top 10 para aplicações com LLM"
seccao: "Construir com IA"
paginas: []
fonte: "Páginas oficiais do OWASP GenAI Security Project, ligadas em cada ponto; consultadas a 2026-11-10. Não vem do PDF."
data_lancamento: 2025-12-09
confianca: media
verificado_em: 2026-11-10
---

# OWASP Top 10 para aplicações com LLM

**Resumo:** A lista de referência dos dez riscos de uma aplicação com LLM, na versão de 2025, e os primeiros riscos publicados para agentes; serve de lista de verificação na revisão de segurança.

## Conteúdo

- Versão em vigor: «OWASP Top 10 for LLM Applications, 2025 version». Os dez riscos, com o identificador e o nome da fonte (a explicação em português é *(interpretação)* do texto de apresentação de cada risco). Fonte: [OWASP Top 10 for LLM Applications](https://genai.owasp.org/llm-top-10/)
  - LLM01:2025 Prompt Injection: a entrada do utilizador altera o comportamento do modelo.
  - LLM02:2025 Sensitive Information Disclosure: o modelo ou a aplicação expõe dados confidenciais.
  - LLM03:2025 Supply Chain: componentes, modelos ou dados de terceiros trazem vulnerabilidades.
  - LLM04:2025 Data and Model Poisoning: dados de treino, de fine-tuning ou de embeddings adulterados corrompem o comportamento.
  - LLM05:2025 Improper Output Handling: a saída do modelo passa a outros sistemas sem validação.
  - LLM06:2025 Excessive Agency: o modelo tem mais permissões ou autonomia do que precisa.
  - LLM07:2025 System Prompt Leakage: o prompt de sistema fica exposto.
  - LLM08:2025 Vector and Embedding Weaknesses: falhas nos sistemas de recuperação (RAG).
  - LLM09:2025 Misinformation: informação falsa em que a aplicação confia.
  - LLM10:2025 Unbounded Consumption: consumo sem limite de recursos (negação de serviço, custo).
- Agentes: a 2025-12-09 o OWASP anunciou um Top 10 de riscos para IA agêntica. A página do anúncio nomeia três: «Agent Behavior Hijacking», «Tool Misuse and Exploitation» e «Identity and Privilege Abuse». A lista completa («OWASP Top 10 for Agentic Applications for 2026») não foi lida e fica por confirmar. Fonte: [anúncio do OWASP GenAI Security Project](https://genai.owasp.org/2025/12/09/owasp-genai-security-project-releases-top-10-risks-and-mitigations-for-agentic-ai-security/)
- O mesmo anúncio liga a recursos de apoio: «Agentic AI Threats and Mitigations», «The State of Agentic Security and Governance 1.0», «A Practical Guide to Securing Agentic Applications» e uma aplicação de referência (OWASP FinBot CTF). Fonte: o mesmo anúncio.

**Para uma skill:** a revisão de segurança de uma aplicação com LLM percorre os dez riscos LLM01 a LLM10 e regista, para cada um, a mitigação aplicada ou porque não se aplica; num agente, verifica também os três riscos agênticos nomeados.

## Ver também

- [Injeção de prompt: ameaças e mitigações](injecao-de-prompt-mitigacoes.md) (Construir com IA)
- [Segurança e governação de IA](../seguranca-e-governacao-de-ia.md) (Construir com IA)

Fonte: páginas oficiais do OWASP GenAI Security Project, ligadas em cada ponto; consultadas a 2026-11-10. Não vem do PDF.

---
id: ia/seguranca/injecao-de-prompt-mitigacoes
titulo: "Injeção de prompt: ameaças e mitigações"
seccao: "Construir com IA"
paginas: []
fonte: "Documentação da Claude Platform e artigo de investigação da Anthropic, ligados em cada ponto; consultados a 2026-11-10. Não vem do PDF."
data_lancamento: 2025-11-24
confianca: media
verificado_em: 2026-11-10
---

# Injeção de prompt: ameaças e mitigações

**Resumo:** Há duas ameaças diferentes (o utilizador como atacante, ou conteúdo de terceiros que o modelo lê) e cada uma tem as suas mitigações; nenhuma camada sozinha resolve, por isso as defesas somam-se.

## Conteúdo

- Dois modelos de ameaça: «Jailbreaks and direct prompt injection», em que o atacante é o próprio utilizador, e «Indirect prompt injection», em que o utilizador é de confiança mas o Claude lê conteúdo de terceiros. Fonte: [Mitigate jailbreaks and prompt injections (Claude Platform)](https://platform.claude.com/docs/en/test-and-evaluate/strengthen-guardrails/mitigate-jailbreaks)
- Contra a ameaça direta: «Harmlessness screens», «Input validation», «Prompt engineering» e «Respond to repeat offenders». O filtro prévio usa um modelo leve (a página indica o Claude Haiku 5.5) com saída estruturada, e um `stop_reason: "refusal"` do filtro conta como veredicto de conteúdo nocivo. Fonte: a mesma página.
- Contra a ameaça indireta: «Put untrusted content only in tool results», «Tell Claude what the content is and where it came from», «State the policy in your system prompt», «JSON-encode untrusted content», «Don't put your own instructions in tool results», «Limit Claude's access to sensitive data and actions», «Screen tool outputs before Claude acts on them» e «Red-team your own agent». A página junta ainda monitorização contínua e cadeias de salvaguardas. Fonte: a mesma página.
- Nas ferramentas de computer use e de browser, a Anthropic corre classificadores adicionais sobre o conteúdo devolvido (capturas de ecrã, texto das páginas). Fonte: a mesma página.
- A Anthropic treina o próprio modelo para resistir à injeção («We use reinforcement learning to build prompt injection robustness directly into Claude's capabilities»), analisa todo o conteúdo não confiável que entra no contexto e usa red teaming humano, porque «Human security researchers consistently outperform automated systems at discovering creative attack vectors». Fonte: [Prompt injection defenses (Anthropic, 2025-11-24)](https://www.anthropic.com/research/prompt-injection-defenses)
- Taxa de sucesso de ataques adaptativos (Best-of-N, 100 tentativas por ambiente; só o modelo, salvaguardas antigas, salvaguardas melhoradas): Sonnet 4 13.8%, 10.7%, 2.0%; Sonnet 4.5 13.8%, 10.8%, 1.9%; Haiku 4.5 12.0%, 11.1%, 2.4%; Opus 4.5 8.0%, 7.6%, 1.4%. E a conclusão do artigo: «No browser agent is immune to prompt injection». Fonte: o mesmo artigo.

**Para uma skill:** um agente que lê conteúdo de terceiros põe esse conteúdo só em resultados de ferramentas, tem acesso mínimo a dados e ações sensíveis, e tem um teste de injeção indireta no plano de verificação.

## Ver também

- [OWASP Top 10 para aplicações com LLM](owasp-top-10-llm.md) (Construir com IA)
- [Segurança e governação de IA](../seguranca-e-governacao-de-ia.md) (Construir com IA)
- [Tool use (ferramentas e function calling)](../tool-use.md) (Construir com IA)

Fonte: documentação da Claude Platform e artigo de investigação da Anthropic, ligados em cada ponto; consultados a 2026-11-10. Não vem do PDF.

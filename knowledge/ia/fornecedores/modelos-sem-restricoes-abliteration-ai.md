---
id: ia/fornecedores/modelos-sem-restricoes-abliteration-ai
titulo: "Modelos sem restrições por API (abliteration.ai)"
seccao: "Construir com IA"
paginas: []
fonte: "https://abliteration.ai/ e https://abliteration.ai/pricing, consultadas a 2026-11-24, páginas sem data. Não vem do PDF."
data_lancamento: null
confianca: media
verificado_em: 2026-11-24
---

# Modelos sem restrições por API (abliteration.ai)

**Resumo:** A abliteration.ai vende acesso por API a modelos sem restrições («abliterated»), compatível com a API da OpenAI e com a da Anthropic e listado como integração do Claude Code; paga-se por token, os planos mensais dão o mesmo valor em crédito, e a promessa de não guardar perguntas nem respostas é do fornecedor e está por verificar.

## Conteúdo

- O que é: «Unrestricted AI for High-Risk Work», um modelo alojado que responde a pedidos de investigação, segurança e dados de treino «without the refusal theater that blocks legitimate work». Fonte: [abliteration.ai](https://abliteration.ai/)
- Compatibilidade: «Compatible with OpenAI's Chat Completions API and Anthropic's Messages API». Com um cliente da OpenAI, aponta-se para `https://api.abliteration.ai/v1` com a chave da abliteration.ai e um dos identificadores de modelo publicados. O Claude Code está na lista de integrações (CLI) e tem um guia próprio em [docs.abliteration.ai](https://docs.abliteration.ai/integrations/claude-code), que não foi lido; as páginas lidas não dão o endereço nem as variáveis para a API da Anthropic. Fonte: [abliteration.ai](https://abliteration.ai/), [preços](https://abliteration.ai/pricing)
- Dados: o fornecedor diz «Prompts and responses never stored» e «Your prompts and responses stay out of our logs». É uma afirmação dele, não verificada: os termos, a política de privacidade e o DPA não foram lidos. A localização dos servidores não é indicada; o plano Enterprise refere «Region-specific hosting», sem dizer que regiões. Fonte: [abliteration.ai](https://abliteration.ai/), [preços](https://abliteration.ai/pricing)
- Conta e planos (a 2026-11-24, em dólares): conta Free sem cartão de crédito; Developer a 20 USD/mês, Growth a 50 USD/mês e Scale a 200 USD/mês, cada um com o mesmo valor em crédito de uso por mês e 2,5%, 5% e 10% de desconto no uso da API; Enterprise sob consulta («Contact us»), com SSO, SLA e alojamento por região. Os carregamentos listados começam nos 20 USD, mas a consola aceita um valor à escolha a partir de 5 USD. Fonte: [preços](https://abliteration.ai/pricing)
- Preço por milhão de tokens, entrada / entrada em cache / saída (a 2026-11-24): Abliterated Model (`abliterated-model`, 256K de contexto, texto e imagem) a 1 / 0,10 / 3 USD; Abliterated Large v2 (`abliterated-model-large-v2`, 1M, texto) a 3 / 0,30 / 5 USD; Abliterated Large Flash (`abliterated-model-large-flash`, 1M, texto e imagem) a 1 / 0,10 / 2 USD. A página tem ainda o Abliterated Large (`abliterated-model-large`, 3 / 0,30 / 5 USD) e a palavra «Deprecated» junto aos modelos, sem dizer a qual se refere. A pesquisa na web custa 8 USD por 1000 pesquisas, mais os tokens. Os limites sobem com o gasto: «A Free-plan account reaches Tier 1 after $20 in total payments, Tier 2 after $50, and Tier 3 after $200». Fonte: [preços](https://abliteration.ai/pricing)
- Exemplo de uso, fonte secundária (vídeo de Jack Roberts, com patrocínios e ligações de afiliado, indicado a 2026-11-24): [«I Tested Uncensored AI...»](https://www.youtube.com/watch?v=bc7QaDmLmoA) foi indicado como exemplo de como trocar o modelo do Claude Code por um sem restrições, correr modelos locais com o Ollama e ligar o servidor por Tailscale. Serve só de exemplo, nunca de fonte de preços nem de factos. A 2026-11-24 a página só mostrou o título, sem canal, data nem descrição, por isso o conteúdo não foi confirmado.

**Para uma skill:** um modelo sem restrições entra só para o uso que o justifica (investigação, segurança, dados de treino) e com a decisão do utilizador registada; antes de lhe enviar dados de clientes, leem-se os termos, a política de privacidade e o DPA, porque a retenção zero e a localização dos dados não estão confirmadas; os preços confirmam-se na página no dia da decisão.

## Ver também

- [Servir um modelo próprio](../modelos-proprios/servir-um-modelo-proprio.md) (Construir com IA)
- [OWASP Top 10 para aplicações com LLM](../seguranca/owasp-top-10-llm.md) (Construir com IA)
- [Segurança e governação de IA](../seguranca-e-governacao-de-ia.md) (Construir com IA)
- [Acesso por identidade, sem portas abertas](../../acesso-remoto/acesso-por-identidade-sem-portas-abertas.md) (Acesso remoto (SSH e RDP))

Fonte: https://abliteration.ai/ e https://abliteration.ai/pricing, consultadas a 2026-11-24, páginas sem data. Não vem do PDF.

---
id: produto/direitos-por-plano-no-servidor
titulo: "Direitos por plano no servidor"
seccao: "Modularização e produtização"
paginas: []
fonte: "https://owasp.org/Top10/2025/A01_2025-Broken_Access_Control/, https://docs.stripe.com/billing/entitlements, https://openfeature.dev/specification/sections/evaluation-context e https://openfeature.dev/specification/sections/flag-evaluation; consultados a 2026-11-25, páginas sem data. Não vem do PDF."
data_lancamento: null
confianca: media
verificado_em: 2026-11-25
---

# Direitos por plano no servidor

**Resumo:** O que cada cliente comprou decide-se no servidor, a partir de uma cópia dos direitos guardada do lado do servidor e atualizada pela faturação; sem direito ativo, a resposta é recusar.

## Conteúdo

- O controlo de acesso só vale no servidor: «Access control is only effective when implemented in trusted server-side code or serverless APIs, where the attacker cannot modify the access control check or metadata.» E: «Except for public resources, deny by default.» Fonte: [OWASP Top 10:2025, A01 Broken Access Control](https://owasp.org/Top10/2025/A01_2025-Broken_Access_Control/) (data não indicada)
- No Stripe, o direito nasce da subscrição: «When a customer’s subscription is first activated, Stripe creates entitlements for the features that they’re subscribed to», e mantém-se enquanto a subscrição estiver ativa. Quando o cliente subscreve, sobe, desce ou cancela, o Stripe dispara o webhook `entitlements.active_entitlement_summary.updated`. Fonte: [Stripe Entitlements](https://docs.stripe.com/billing/entitlements) (data não indicada)
- Os direitos também se leem pela API List Active Entitlements, para usar «on application startup, for authorization checks, or to reconcile state after a webhook delivery failure». A recomendação: «We recommend you persist these entitlements internally for faster resolution.» Fonte: a mesma página.
- Uma mudança nas funcionalidades de um produto só chega às subscrições existentes no período seguinte: «Existing subscriptions will create active entitlements for any product feature changes at the start of the next billing period.» Fonte: a mesma página.
- Com um serviço de flags no padrão OpenFeature, a avaliação leva um contexto cujo «targeting key» identifica «the subject (end-user, or client service) of a flag evaluation». Fonte: [OpenFeature, Evaluation Context](https://openfeature.dev/specification/sections/evaluation-context) (data não indicada). Se a avaliação falhar, «Flag evaluation calls must always return the default value in the event of abnormal execution». Fonte: [OpenFeature, Flag Evaluation API](https://openfeature.dev/specification/sections/flag-evaluation) (data não indicada)
- Para os direitos *(interpretação)*: a verificação fica num só ponto do servidor (middleware ou guarda por rota), pergunta pela chave da funcionalidade e lê a cópia local dos direitos. O valor por omissão de uma flag de direito é «sem acesso», para que uma falha do serviço de flags feche em vez de abrir. Esconder o botão na interface ajuda quem usa, mas não controla o acesso.

**Para uma skill:** cada rota de uma parte vendável verifica no servidor a chave da funcionalidade contra os direitos do cliente guardados do lado do servidor; num teste com uma conta sem o plano, cada rota dessa parte responde com recusa (403); o valor por omissão das flags de direito é «sem acesso».

## Ver também

- [Autorização no servidor, negar por omissão](../seguranca/autorizacao-no-servidor.md) (Segurança)
- [Segmentar em partes vendáveis](segmentar-em-partes-vendaveis.md) (Modularização e produtização)
- [Feature flags (toggles)](feature-flags.md) (Modularização e produtização)
- [Pagamentos e faturação (Stripe Billing, Invoice Ninja)](../plataformas/pagamentos-e-faturacao.md) (Plataformas para adotar antes de construir)

Fonte: OWASP Top 10:2025 (A01), Stripe Entitlements e OpenFeature (Evaluation Context e Flag Evaluation API), ligados em cada ponto; consultados a 2026-11-25, páginas sem data. Não vem do PDF.

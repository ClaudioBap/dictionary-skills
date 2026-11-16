---
id: plataformas/email-transacional-e-ingestao
titulo: "Email: envio transacional e leitura de caixas de correio"
seccao: "Plataformas para adotar antes de construir"
paginas: []
fonte: "Documentação do Postmark, da Brevo, do Microsoft Graph e da Gmail API, ligadas em cada ponto; consultadas a 2026-11-10, páginas sem data. Não vem do PDF."
data_lancamento: null
confianca: media
verificado_em: 2026-11-10
---

# Email: envio transacional e leitura de caixas de correio

**Resumo:** Enviar email passa por um serviço transacional com API e SMTP; ler caixas de correio para alimentar uma base de conhecimento passa pela API do Microsoft 365 ou do Gmail, com âmbitos só de leitura e sincronização incremental.

## Conteúdo

- Postmark (envio): API REST, com envio único e em lote, e SMTP. Tem uma secção de receção (servidor inbound, encaminhamento de domínio, parsing de email, webhook e regras), sem a mecânica descrita na página. Limites: «10 MB max per email.» (conteúdo, cabeçalhos e anexos somados) e «50 recipients per message, combined.» Fonte: [Postmark Developer](https://postmarkapp.com/developer)
- Postmark (preços): Developer «100 emails/month.», «No overages allowed in this plan.», «$0.00/mo»; Basic «$15.00/mo» com «Extra emails @ $1.80 / 1,000.»; Pro «$16.50/mo» («$1.30 / 1,000»); Platform «$18.00/mo» («$1.20 / 1,000»); IP dedicado «Starts at $50/month per IP.» Localização dos dados na UE: não confirmada nas páginas lidas. Fonte: [Postmark Pricing](https://postmarkapp.com/pricing)
- Brevo: a Messaging API envia «transactional emails, SMS, and WhatsApp messages», com envio em lote e agendamento. A página de preços não abriu, por isso o escalão grátis fica por confirmar. Localização dos dados na UE: não confirmada nas páginas lidas. Fonte: [Brevo Developers](https://developers.brevo.com/)
- Microsoft Graph (Microsoft 365): lê caixas de correio de utilizador, primárias e partilhadas (não os arquivos in-place), através dos recursos `message` e `mailFolder`, com delta query para sincronização incremental e subscrições de notificações de alteração para mensagens novas. A página remete para «delegated or application mail permissions»; os nomes exatos das permissões não foram confirmados. Fonte: [Outlook mail API overview](https://learn.microsoft.com/en-us/graph/api/resources/mail-api-overview)
- Gmail API: extração só de leitura, indexação e cópia, filtros e ordenação, notificações push por «watch» da caixa, e leitura delegada dentro de uma organização Workspace. Âmbitos de leitura: `https://www.googleapis.com/auth/gmail.readonly` («Read email messages and settings.», restrito) e `https://www.googleapis.com/auth/gmail.metadata` («Read message metadata such as labels and headers, without the body.», restrito); `gmail.modify` e `https://mail.google.com/` dão mais do que leitura. Fonte: [Gmail API guides](https://developers.google.com/workspace/gmail/api/guides), [Gmail API scopes](https://developers.google.com/workspace/gmail/api/auth/scopes)
- Base de conhecimento alimentada por emails *(interpretação)*: pede o âmbito mínimo (só leitura, ou só metadados se o corpo não for preciso), sincronização incremental (delta query ou watch) em vez de reler tudo, e o registo da base legal e da retenção. O que muda de um cliente para outro é a caixa de correio e as regras de filtragem; a cadeia de leitura, indexação e pesquisa é igual.

**Para uma skill:** um pedido de envio de email tem um serviço transacional como opção em «Adotar ou construir», com os limites do plano na coluna «Risco»; um pedido de leitura de caixas de correio regista o âmbito mínimo pedido, a forma de sincronização incremental e a base legal do tratamento.

## Ver também

- [Recuperação contextual, pesquisa híbrida e reranking](../ia/rag/rag-recuperacao-contextual-hibrida-e-reranking.md) (Construir com IA)
- [Embeddings e base vetorial](../ia/rag/embeddings-e-base-vetorial.md) (Construir com IA)
- [RGPD operacional](../privacidade/rgpd-operacional.md) (Privacidade e conformidade)
- [Automação e integração (n8n, Node-RED)](automacao-e-integracao.md) (Plataformas para adotar antes de construir)
- [Adotar antes de construir](adotar-antes-de-construir.md) (Plataformas para adotar antes de construir)

Fonte: documentação do Postmark, da Brevo, do Microsoft Graph e da Gmail API, ligadas em cada ponto; consultadas a 2026-11-10, páginas sem data. Não vem do PDF.

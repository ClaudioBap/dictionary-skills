---
id: nuvem/microsoft-365-e-graph
titulo: "Microsoft 365 e Graph"
seccao: "Nuvem e identidade (AWS, Azure, Microsoft, OVH)"
paginas: [62]
fonte: Dicionario-Boas-Praticas.pdf
verificado_em: 2026-11-03
fontes_oficiais_consultadas_em: 2026-11-04
---

# Microsoft 365 e Graph

**Resumo:** Integrar com o Microsoft 365 pela Graph, com permissões mínimas e consentidas.

## Conteúdo

- Produtividade (Exchange, SharePoint, Teams) e a Microsoft Graph como API única para os dados do tenant (utilizadores, email, ficheiros, calendário).
- Integrar por app registration com permissões mínimas (delegadas ou de aplicação), consentidas explicitamente; enviar email por Graph quando o SMTP básico está bloqueado.

**Para uma skill:** a integração com o Microsoft 365 usa a Graph com permissões mínimas e consentidas.

## Fontes oficiais

*Ligações externas que apoiam esta entrada, consultadas a 2026-11-04. Não alteram o texto acima.*

- [Overview of Microsoft Graph permissions](https://learn.microsoft.com/en-us/graph/permissions-overview) — permissões delegadas vs aplicação, consentimento e menor privilégio
- [user: sendMail - Microsoft Graph](https://learn.microsoft.com/en-us/graph/api/user-sendmail) — envio de email pela Graph com permissão mínima Mail.Send

Fonte: pág. 62 (Dicionario-Boas-Praticas.pdf)

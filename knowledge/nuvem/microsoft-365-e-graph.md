---
id: nuvem/microsoft-365-e-graph
titulo: "Microsoft 365 e Graph"
seccao: "Nuvem e identidade (AWS, Azure, Microsoft, OVH)"
paginas: [62]
fonte: Dicionario-Boas-Praticas.pdf
verificado_em: 2026-11-25
editado_em: 2026-11-25
fontes_oficiais_consultadas_em: 2026-11-04
---

# Microsoft 365 e Graph

**Resumo:** Integrar com o Microsoft 365 pela Graph, com permissões mínimas e consentidas.

## Conteúdo

- Produtividade (Exchange, SharePoint, Teams) e a Microsoft Graph como API única para os dados do tenant (utilizadores, email, ficheiros, calendário).
- Integrar por app registration com permissões mínimas (delegadas ou de aplicação), consentidas explicitamente; enviar email por Graph quando o SMTP básico está bloqueado.
- Cada página de API da Graph marca as permissões de menor privilégio; usam-se essas e só se sobe se a app precisar. Para enviar email (sendMail) a menor é Mail.Send.
- Permissões de aplicação (sem utilizador com sessão) chegam a todos os dados que cobrem: com Files.Read.All de aplicação, a app lê qualquer ficheiro da organização. Com permissões delegadas, só o que o utilizador já pode ver.
- Para limitar uma app a algumas caixas de correio, usa-se o RBAC for Applications do Exchange Online com âmbito de recursos (substitui as Application Access Policies) e retira-se a permissão sem âmbito dada no Entra ID; se ficarem as duas, somam-se e o âmbito deixa de valer.
- Localização: no Microsoft 365, os tenants com local de registo num país da UE ou da EFTA ficam no EU Data Boundary, exceto os que compraram Multi-Geo; o país do tenant vê-se no centro de administração do Microsoft 365.

**Para uma skill:** a integração com o Microsoft 365 usa a Graph com permissões mínimas e consentidas. Critérios a verificar: só as permissões marcadas como de menor privilégio na página de cada API, nenhuma permissão de aplicação sem âmbito quando a app só precisa de algumas caixas, e tenant dentro do EU Data Boundary.

## Fontes oficiais

*Ligações externas que apoiam esta entrada, consultadas a 2026-11-04. Não alteram o texto acima.*

- [Overview of Microsoft Graph permissions](https://learn.microsoft.com/en-us/graph/permissions-overview) — permissões delegadas vs aplicação, consentimento e menor privilégio
- [user: sendMail - Microsoft Graph](https://learn.microsoft.com/en-us/graph/api/user-sendmail) — envio de email pela Graph com permissão mínima Mail.Send

Fonte: pág. 62 (Dicionario-Boas-Praticas.pdf)

---
id: seguranca/mfa-imposto-pelo-fornecedor-de-identidade
titulo: "MFA imposto pelo fornecedor de identidade, não pela aplicação"
seccao: "Segurança"
paginas: []
fonte: "https://learn.microsoft.com/en-us/entra/identity/conditional-access/policy-all-users-mfa-strength"
data_lancamento: 2026-03-24
confianca: alta
verificado_em: 2026-11-16
---

# MFA imposto pelo fornecedor de identidade, não pela aplicação

**Resumo:** Quando o login é por OIDC com o Microsoft Entra, o segundo fator é exigido pelas políticas do tenant (Conditional Access ou security defaults) e a aplicação não implementa MFA próprio; o que se faz é confirmar no teste do login real que a política se aplica e preparar a aplicação para os desafios que o fornecedor pode devolver.

## Conteúdo

- Quem impõe: a Microsoft recomenda uma política base de Conditional Access que abranja todos os utilizadores e todos os recursos, sem exclusões de aplicações, e que exija autenticação multifator (controlo «Require authentication strength», com a força «Multifactor authentication strength»). Pede-se primeiro em modo «Report-only» e passa-se a ativa depois de rever o impacto. Exclui-se só o que a página manda: contas de emergência («break-glass»), contas de serviço e, em sincronização híbrida, a função de sincronização de diretório. Quem a cria precisa de ser, no mínimo, Conditional Access Administrator. Fonte: [Require MFA for all users with authentication strength (ms.date 2026-03-24, lida a 2026-11-16)](https://learn.microsoft.com/en-us/entra/identity/conditional-access/policy-all-users-mfa-strength)
- Alternativa sem licença extra: as security defaults exigem registo de MFA a todos os utilizadores e MFA aos administradores, e bloqueiam a autenticação antiga e o device code flow; «Required licenses: None». O Conditional Access exige, no mínimo, Entra ID P1, e quem o usa tem de desligar as security defaults. Nas security defaults é a Microsoft que decide quando pede o segundo fator, segundo o local, o dispositivo, a função e a tarefa. Fonte: [Security defaults (ms.date 2025-07-21, atualizada 2026-10-16)](https://learn.microsoft.com/en-us/entra/fundamentals/security-defaults)
- O que muda na aplicação: «In most common cases, Conditional Access doesn't change an app's behavior or requires any changes from the developer». Uma aplicação que só autentica o utilizador não implementa o MFA: a política é invocada sozinha no login. Precisam de código as aplicações que chamam outras APIs em nome do utilizador (on-behalf-of) ou vários serviços. A política avalia-se no momento em que o token é pedido, e o cliente pode aplicá-la ou retirá-la a qualquer altura. Fonte: [Developer guidance for Conditional Access (ms.date 2020-05-18, atualizada 2026-06-15)](https://learn.microsoft.com/en-us/entra/identity-platform/v2-conditional-access-dev-guide)
- Desafios: se a política exigir mais, o Entra devolve `interaction_required` (por exemplo, `AADSTS50076`, que pede MFA) e a aplicação repete o pedido de forma interativa; uma API devolve 401 com `insufficient_claims` e o parâmetro `claims`, e a aplicação limpa o token da sessão e volta ao Entra com esse parâmetro. A aplicação só recebe estes desafios se declarar a capacidade `cp1`. Fonte: [Claims challenges (ms.date 2024-04-10, atualizada 2026-06-15)](https://learn.microsoft.com/en-us/entra/identity-platform/claims-challenge), o guia de programação acima.
- Provar no id_token: o OIDC define o claim `amr` como «JSON array of strings that are identifiers for authentication methods used», e diz que, se se pediu `acr`, o cliente deve verificar que o valor é adequado. A página do Entra sobre os claims do id_token não documenta o `amr`, por isso não se assume que o Entra o devolve: confirma-se num login real antes de a aplicação decidir seja o que for por ele. Fonte: [OpenID Connect Core 1.0 (sem data; li só os primeiros 100 000 caracteres de 286 003)](https://openid.net/specs/openid-connect-core-1_0.html), [ID token claims reference (ms.date 2023-05-30, atualizada 2026-06-15)](https://learn.microsoft.com/en-us/entra/identity-platform/id-token-claims-reference)

**Para uma skill:** com login pelo Entra, a aplicação não tem MFA próprio. A proposta diz que o MFA é do tenant (Conditional Access com P1, ou security defaults), deixa «Por preencher» quem no cliente o configura, e inclui no plano um teste de login real com uma conta sem exceção para confirmar que o segundo fator é pedido. Se a aplicação chamar APIs em nome do utilizador, trata `interaction_required` e os desafios de claims. A administração fica atrás do mesmo login, com o papel verificado no servidor (ver [Autorização no servidor](autorizacao-no-servidor.md)).

## Ver também

- [Autenticação forte](autenticacao-forte.md) (Segurança)
- [Login com Microsoft Entra ID (OpenID Connect)](../nuvem/login-com-entra-id-oidc.md) (Nuvem e identidade)
- [Login por OIDC: código com PKCE, state e nonce](oidc-codigo-com-pkce-state-e-nonce.md) (Segurança)

Fonte: documentação oficial do Microsoft Learn e especificação OpenID Connect, ligadas em cada ponto; lidas a 2026-11-16. Não vem do PDF.

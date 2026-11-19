---
id: seguranca/links-por-email-sem-sessao
titulo: "Um link enviado por email nunca dá sessão"
seccao: "Segurança"
paginas: []
fonte: "https://cheatsheetseries.owasp.org/cheatsheets/Forgot_Password_Cheat_Sheet.html"
data_lancamento: null
confianca: alta
verificado_em: 2026-11-20
---

# Um link enviado por email nunca dá sessão

**Resumo:** Um email de convite, de aceitação ou de recuperação leva quem o recebe à página de entrada; é lá que a pessoa se autentica. Um token num link é de uso único, expira e não abre sessão.

## Conteúdo

- O email pode ser lido por quem não devia: reencaminhado, numa caixa partilhada, num telemóvel desbloqueado, num histórico de navegação. Um link que entra sozinho dá a conta a quem tiver o email.
- Um email que só avisa (a conta foi aceite, há trabalho à espera) leva o endereço público do portal, sem token. A pessoa entra pelo caminho de sempre (o fornecedor de identidade, o código, a passkey).
- Quando um link tem de levar um token (confirmar o email, repor uma palavra-passe, aceitar um convite): o token é gerado com um gerador criptográfico, é comprido o bastante contra força bruta, é de uso único, expira cedo e deixa de valer depois de usado. A OWASP: «Single use and expire after an appropriate period» e «Invalidated after they have been used».
- O link com token confirma o que tem a confirmar e manda a pessoa entrar. A OWASP, no fim de uma reposição: «Don't automatically log the user in» e «the user should then login through the usual mechanism».
- A página aberta pelo link não deixa o token sair noutros pedidos: `Referrer-Policy: no-referrer` (a OWASP: «adds the Referrer Policy tag with the no-referrer value»), sem recursos de terceiros, e o token sai do endereço depois de lido.
- Depois de mudar algo sensível da conta (o email, a palavra-passe, os papéis), as sessões antigas são revistas e os tokens rodados, como na reautenticação da OWASP («Invalidate sessions after re-authentication and rotate tokens»).
- Um link com token que alguém usa uma segunda vez, fora de prazo ou noutro sítio, falha da mesma forma que um token errado e fica no registo de eventos de segurança.

**Para uma skill:** nenhum email transacional abre sessão: os de aviso levam só o endereço do portal; os que precisam de token levam um token aleatório, de uso único, com prazo curto, que só confirma e manda entrar, numa página com `Referrer-Policy: no-referrer`. Prova: um teste que usa o link duas vezes e fora de prazo e não consegue sessão nenhuma.

## Ver também

- [Autenticação forte, sem passwords fracas](autenticacao-forte.md) (Segurança)
- [Sessões robustas](sessoes-robustas.md) (Segurança)
- [Sessões: tempos, rotação do identificador, resumo guardado e cookies](sessoes-tempos-rotacao-e-cookies.md) (Segurança)

## Fontes oficiais

*Ligações externas que apoiam esta entrada, consultadas a 2026-11-20. Não alteram o texto acima.*

- [OWASP Forgot Password Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Forgot_Password_Cheat_Sheet.html) — tokens aleatórios, compridos, de uso único e com prazo; `Referrer-Policy: no-referrer`; não entrar sozinho depois de repor
- [OWASP Authentication Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Authentication_Cheat_Sheet.html) — reautenticação depois de mudanças sensíveis, sessões invalidadas e tokens rodados

Fonte: pedido do Cláudio Baptista (2026-11-19: «com um link não deve ser possível entrar sem sessão»), com as fontes acima.

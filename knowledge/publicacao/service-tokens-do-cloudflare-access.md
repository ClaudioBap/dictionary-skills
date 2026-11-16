---
id: publicacao/service-tokens-do-cloudflare-access
titulo: "Service tokens do Cloudflare Access (um programa a entrar numa aplicação protegida)"
seccao: "Publicação e alojamento web"
paginas: []
fonte: "https://developers.cloudflare.com/cloudflare-one/access-controls/service-credentials/service-tokens/"
data_lancamento: 2026-11-11
confianca: alta
verificado_em: 2026-11-16
---

# Service tokens do Cloudflare Access (um programa a entrar numa aplicação protegida)

**Resumo:** Quando um programa sem pessoa (um script, um hook, outro servidor) tem de entrar numa aplicação atrás do Cloudflare Access, usa um service token: envia o Client ID e o Client Secret em dois cabeçalhos, a política da aplicação tem uma regra «Service Auth», e a origem valida o JWT do Access e reconhece o programa pelo `common_name`.

## Conteúdo

- Criar: Zero Trust > Access controls > Service credentials > Service Tokens > Create Service Token. O Access gera um Client ID e um Client Secret, e o segredo só se mostra nessa altura. A duração escolhida define a data de expiração, e pode configurar-se um alerta uma semana antes. Fonte: [Service tokens (atualizada a 2026-11-11)](https://developers.cloudflare.com/cloudflare-one/access-controls/service-credentials/service-tokens/)
- Usar: o programa envia `CF-Access-Client-Id` e `CF-Access-Client-Secret` em cada pedido. Uma aplicação self-hosted pode aceitar o token num só cabeçalho (`read_service_tokens_from_header`, configurado pela API). Fonte: a mesma.
- Política: a ação tem de ser «Service Auth»; com outra, o Access pede o login no fornecedor de identidade. Com a autenticação estrita por service token ligada, só as políticas «Service Auth» autorizam, e o Access ignora as políticas «Allow» e o cookie `CF_Authorization`. Fonte: a mesma.
- Rodar e revogar: rodar mantém o Client ID e emite um segredo novo, com um período de transição de uma hora a 30 dias ou com o antigo revogado logo; renovar prolonga o token por um ano; para cortar o acesso antes de expirar, apaga-se o token. Fonte: a mesma.
- Na origem: o Access passa o token à aplicação no cabeçalho `Cf-Access-Jwt-Assertion`. Valida-se esse cabeçalho, e não o cookie, com as chaves de `https://<equipa>.cloudflareaccess.com/cdn-cgi/access/certs`, o `aud` da aplicação e o `iss` da equipa. As chaves rodam de 6 em 6 semanas e as anteriores valem mais 7 dias, por isso escolhe-se a chave pelo `kid`. Num Worker com o Access à frente, `ctx.access` confirma a autenticação sem validar o JWT à mão (a página manda ver antes as limitações com Static Assets e Service Bindings). Fonte: [Validate JWTs (atualizada a 2026-11-02)](https://developers.cloudflare.com/cloudflare-one/access-controls/applications/http-apps/authorization-cookie/validating-json/)
- Quem é: no JWT de um service token, `common_name` é o Client ID (`CF-Access-Client-Id`) e `sub` vem vazio; o de uma pessoa traz `email` e, em `sub`, o id do utilizador. Fonte: [Application token (atualizada a 2026-06-25)](https://developers.cloudflare.com/cloudflare-one/access-controls/applications/http-apps/authorization-cookie/application-token/)
- Plano: a página dos service tokens não indica restrição de plano; o alerta de expiração diz «Included with: Purchase of Access». Confirmar no plano gratuito antes de decidir.

**Para uma skill:** um programa que entra numa aplicação atrás do Access usa um service token só seu, com a regra «Service Auth» na política; o Client Secret vai para um cofre ou para um ficheiro fora do repositório, nunca para o código. A aplicação valida o `Cf-Access-Jwt-Assertion` (ou usa `ctx.access` num Worker) e dá ao programa, reconhecido pelo `common_name`, um papel só com o que ele precisa; as rotas das pessoas nunca aceitam esse papel. A prova é um pedido com o token que entra só nas rotas do programa e um pedido sem token que é recusado.

## Ver também

- [Acesso restrito à área de administração](acesso-restrito-a-area-de-administracao.md) (Publicação e alojamento web)
- [Autorização no servidor, negar por omissão](../seguranca/autorizacao-no-servidor.md) (Segurança)
- [Segredos num cofre](../seguranca/segredos-num-cofre.md) (Segurança)

Fonte: documentação oficial do Cloudflare One, ligada em cada ponto; lida a 2026-11-16. Não vem do PDF.

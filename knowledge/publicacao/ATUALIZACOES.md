# Atualizações: Publicação e alojamento web

Novidades com confiança alta ou média (as de média levam «Confiança: media»), organizadas por categoria e da mais recente para a mais antiga. Não alteram o texto das entradas. Cada linha tem o seu registo no [CHANGELOG](../CHANGELOG.md).

## Cloudflare

- **2026-11-13** em [Limites e condições dos planos gratuitos](limites-e-condicoes-dos-planos-gratuitos.md): Os Workers e os Durable Objects passam a ter limites de gasto. Ao chegar ao limite, a Cloudflare bloqueia a utilização; com a opção «Block usage» desligada, só envia alertas por email. Configura-se em Billing > Spend limits (limite, email e limiares) ou com `cf billing spend-policies create`, com o valor em cêntimos de USD. A página não diz em que planos está disponível. Fonte: [Cloudflare changelog](https://developers.cloudflare.com/changelog/post/2026-11-13-spend-management/). Confiança: alta. Adicionado a 2026-11-14.
- **2026-11-06** em [Acesso restrito à área de administração](acesso-restrito-a-area-de-administracao.md): O Cloudflare Access aceita passkeys para entrar nas aplicações protegidas e no App Launcher, em vez do PIN de uso único ou de um fornecedor de identidade. O utilizador confirma a identidade com um método que já tenha antes de registar a passkey. Os administradores escolhem em que aplicações se aplica e podem remover passkeys. Fonte: [Cloudflare changelog](https://developers.cloudflare.com/changelog/post/2026-11-06-access-passkeys/). Confiança: alta. Adicionado a 2026-11-14.

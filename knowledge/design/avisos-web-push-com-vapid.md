---
id: design/avisos-web-push-com-vapid
titulo: "Avisos Web Push com VAPID, sem corpo"
seccao: "Design e experiência de utilizador"
paginas: []
fonte: "https://www.rfc-editor.org/rfc/rfc8292"
data_lancamento: 2017-11
confianca: alta
verificado_em: 2026-11-16
---

# Avisos Web Push com VAPID, sem corpo

**Resumo:** Para avisar um telemóvel sem aplicação nativa, a aplicação web subscreve o Web Push com a chave pública VAPID e o servidor envia um POST sem corpo, assinado com um JWT ES256; o service worker mostra um texto fixo e o conteúdo só se lê na aplicação. No iPhone exige o iOS 16.4 e a aplicação no ecrã principal.

## Conteúdo

- Envio: o servidor da aplicação faz um POST ao `endpoint` da subscrição. O cabeçalho `TTL` (em segundos) é obrigatório, e sem ele o serviço de push devolve 400; com `TTL: 0`, a mensagem só é entregue se o dispositivo estiver disponível nesse momento. `Urgency` aceita `very-low`, `low`, `normal` (por omissão) e `high`, e `Topic` substitui uma mensagem pendente com o mesmo tópico. 201 quer dizer aceite, não entregue; 404 quer dizer que a subscrição expirou; acima de 4096 bytes de corpo o serviço pode responder 413. Fonte: [RFC 8030 (dezembro de 2016)](https://www.rfc-editor.org/rfc/rfc8030)
- Identificação do servidor (VAPID): um JWT assinado com ECDSA na curva P-256 (`ES256`), com `aud` igual à origem do `endpoint`, `exp` a não mais de 24 horas do pedido e, de preferência, `sub` com um contacto `mailto:` ou `https:`. Vai no cabeçalho `Authorization: vapid t=<JWT>, k=<chave pública>`, com a chave pública em forma não comprimida e em base64url. Uma subscrição criada com essa chave só aceita mensagens assinadas pela chave privada correspondente; sem token válido, o serviço recusa (401 ou 403). Fonte: [RFC 8292 (novembro de 2017)](https://www.rfc-editor.org/rfc/rfc8292)
- No browser: `registration.pushManager.subscribe({ userVisibleOnly: true, applicationServerKey })`. A `applicationServerKey` é a chave pública VAPID (ponto P-256 não comprimido, 65 octetos, em base64url quando vai como texto) e não é a chave que cifra as mensagens. O Chrome e o Edge rejeitam a subscrição sem `userVisibleOnly: true`, que promete mostrar ao utilizador o efeito de cada mensagem. A subscrição devolve o `endpoint` e as chaves `p256dh` e `auth`. Pede-se em resposta a um gesto do utilizador: o Firefox recusa notificações pedidas sem gesto desde a versão 72. Fontes: [W3C Push API (rascunho de trabalho; lidos 100 000 de 157 633 caracteres)](https://www.w3.org/TR/push-api/), [MDN: PushManager.subscribe() (2025-06-23)](https://developer.mozilla.org/en-US/docs/Web/API/PushManager/subscribe)
- Sem corpo: o browser só decifra quando a mensagem traz conteúdo; sem conteúdo, o evento `push` dispara na mesma, com `data` a `null`. As mensagens com conteúdo têm de ir cifradas com `aes128gcm`, a partir das chaves `p256dh` e `auth` da subscrição. *(interpretação)* Um aviso sem corpo dispensa essa cifra e não faz passar conteúdo nenhum pelo serviço de push: o service worker mostra um texto fixo, e o resto lê-se na aplicação, depois do login. Fontes: [W3C Push API](https://www.w3.org/TR/push-api/), [RFC 8291 (novembro de 2017)](https://www.rfc-editor.org/rfc/rfc8291)
- iPhone e iPad: Web Push desde o iOS e o iPadOS 16.4, só para aplicações web adicionadas ao ecrã principal (manifesto com `display` igual a `standalone` ou `fullscreen`). O pedido de permissão tem de responder a uma interação direta, como tocar num botão. Não precisa de conta no Apple Developer Program. Quem filtra os endpoints aceites deixa passar `*.push.apple.com`. A página da Apple sobre Web Push (developer.apple.com) não foi lida: bloqueia acesso automático. Fonte: [WebKit: Web Push for Web Apps on iOS and iPadOS (2023-02-16)](https://webkit.org/blog/13878/web-push-for-web-apps-on-ios-and-ipados/)
- Subscrições mortas: o guia da Google manda apagar a subscrição quando o serviço responde 404 (expirou) ou 410 (deixou de ser válida, por exemplo depois de `unsubscribe()`). Fonte: [web.dev: The Web Push Protocol (sem data)](https://web.dev/articles/push-notifications-web-push-protocol)

**Para uma skill:** um aviso para telemóvel numa aplicação web vai por Web Push sem corpo. O servidor assina um JWT VAPID `ES256` com `exp` até 24 horas, manda sempre `TTL`, apaga a subscrição com 404 ou 410 e guarda a chave privada como segredo; o service worker mostra um texto fixo e abre a aplicação. A interface pede a permissão num botão e, no iPhone, explica como pôr a aplicação no ecrã principal. A prova é um teste ao POST (sem corpo, com `Authorization: vapid`) e, depois de publicar, um aviso recebido num telemóvel real.

## Ver também

- [Notificações ao utilizador](notificacoes-ao-utilizador.md) (Design e experiência de utilizador)
- [Offline, PWA e melhoria progressiva](offline-pwa-e-melhoria-progressiva.md) (Design e experiência de utilizador)
- [Segredos num cofre](../seguranca/segredos-num-cofre.md) (Segurança)

Fonte: especificações do IETF e do W3C, MDN, blogue do WebKit e web.dev, ligados em cada ponto; lidos a 2026-11-16. Não vem do PDF.

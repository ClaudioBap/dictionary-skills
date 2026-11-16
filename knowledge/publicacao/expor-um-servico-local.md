---
id: publicacao/expor-um-servico-local
titulo: "Expor um serviço local para testes"
seccao: "Publicação e alojamento web"
paginas: []
fonte: "Fontes oficiais dos fornecedores e organismos citados (documentação, preços, limites e termos), ligadas em cada ponto; consultadas a 2026-11-04. Os planos e preços mudam com frequência: confirmar antes de decidir. Não vem do PDF."
verificado_em: 2026-11-03
---

# Expor um serviço local para testes

**Resumo:** Cloudflare Tunnel e Tailscale Funnel publicam uma app que corre no próprio computador através de ligações de saída cifradas, sem abrir portas nem expor o IP, mas o serviço fica acessível na Internet e tem limites próprios.

## Conteúdo

- Cloudflare Quick Tunnels (trycloudflare): não exigem conta Cloudflare nem domínio; são só para testes e desenvolvimento, aceitam até 200 pedidos em curso (os restantes recebem 429) e não suportam Server-Sent Events (a 2026-11-04) — [Quick Tunnels](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/do-more-with-tunnels/trycloudflare/)
- Cloudflare Tunnel: disponível em todos os planos; o daemon `cloudflared` abre uma ligação só de saída e cifrada para a Cloudflare — sem portas de entrada abertas nem IP público — e o tráfego passa pela CDN, WAF e proteção DDoS da Cloudflare (a 2026-11-04) — [Cloudflare Tunnel](https://developers.cloudflare.com/tunnel/), [Visão geral do Tunnel](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/)
- Risco no Cloudflare Tunnel: uma aplicação publicada num nome de anfitrião fica visível a qualquer pessoa («Anyone can now view your application»); publicar não exige plano pago, mas proteger com políticas Access exige lugares Access (a 2026-11-04) — [Aplicações publicadas](https://developers.cloudflare.com/cloudflare-one/connections/connect-networks/routing-to-tunnel/)
- Tailscale Funnel: em beta, disponível em todos os planos e desligado por omissão; exige MagicDNS, HTTPS e o atributo `funnel` na política; só portas 443, 8443 e 10000, só TLS e só nomes em `ts.net`; tráfego sujeito a limites de largura de banda não configuráveis; para partilhar só dentro da tailnet recomenda-se Tailscale Serve (a 2026-11-04) — [Tailscale Funnel](https://tailscale.com/kb/1223/funnel)
- Vantagens e riscos do Funnel: tráfego cifrado ponta a ponta (os relays não o decifram), IP do dispositivo oculto e só o recurso partilhado fica exposto; pedidos frequentes de certificados podem esbarrar nos limites do Let's Encrypt (espera até 34 h) e um URL novo pode demorar até 10 min a propagar (a 2026-11-04) — [Tailscale Funnel](https://tailscale.com/kb/1223/funnel)

**Para uma skill:** o serviço local exposto é só de teste, fica desligado quando não está em uso e, se tiver dados ou área de administração, está protegido por autenticação antes de ser publicado

## Ver também

- [Proxy reverso e borda (Traefik, Nginx, Caddy)](../infraestrutura/proxy-reverso-e-borda.md) (Serviços de infraestrutura)
- [Acesso restrito à área de administração](../publicacao/acesso-restrito-a-area-de-administracao.md) (Publicação e alojamento web)
- [WAF e proteção DDoS](../publicacao/waf-e-protecao-ddos.md) (Publicação e alojamento web)

Fonte: Fontes oficiais dos fornecedores e organismos citados (documentação, preços, limites e termos), ligadas em cada ponto; consultadas a 2026-11-04. Os planos e preços mudam com frequência: confirmar antes de decidir. Não vem do PDF.

# Atualizações: Plataformas para adotar antes de construir

Novidades com confiança alta ou média (as de média levam «Confiança: media»), organizadas por categoria e da mais recente para a mais antiga. Não alteram o texto das entradas. Cada linha tem o seu registo no [CHANGELOG](../CHANGELOG.md).

## GLPI

- **2026-10-28** em [Tickets, ativos e contratos (GLPI, Zammad)](tickets-ativos-e-contratos.md): O GLPI 12.0.1 e o 11.0.12 são lançamentos de segurança, com atualização recomendada. Corrigem um contorno crítico da autenticação externa, uma escalada de privilégios por administrador de entidade, vários XSS (refletidos na categoria de ticket, na lista de autorizações e no cabeçalho de formulários; armazenados em VLAN e dashboards) e a desativação da conta de administrador por um utilizador sem permissão. Fonte: [GLPI 12.0.1](https://github.com/glpi-project/glpi/releases/tag/12.0.1). Confiança: alta. Adicionado a 2026-11-04.

## Keycloak

- **2026-11-05** em [Autenticação e SSO (Keycloak, OpenID Connect)](autenticacao-e-sso.md): O Keycloak 26.8.2 corrige dezenas de falhas de segurança, entre elas a tomada de conta no login com identificação primeiro nas Organizations (CVE-2026-112208), o sequestro de sessão por `id_token_hint` injetado (CVE-2026-107124), o Device Authorization Grant a contornar `minimum.acr.value` (CVE-2026-105305), negação de serviço sem autenticação no endpoint SAML (CVE-2026-107123), XSS armazenado na página de login (CVE-2026-107889), a emissão de tokens da vítima por um `sub` injetado no CIBA (CVE-2026-97174) e a tomada do realm por um gestor de cliente (CVE-2026-97847). As notas pedem para ler o guia de migração antes de atualizar. Fonte: [Keycloak 26.8.2](https://github.com/keycloak/keycloak/releases/tag/26.8.2). Confiança: alta. Adicionado a 2026-11-26.

# Atualizações: Docker e orquestração

Novidades com confiança alta, organizadas por categoria e da mais recente para a mais antiga. Não alteram o texto das entradas. Cada linha tem o seu registo no [CHANGELOG](../CHANGELOG.md).

## Docker

- **2026-11-03** em [Docker Swarm](docker-swarm.md): O Docker Engine 29.9.3 corrige várias vulnerabilidades, entre elas: redes overlay do Swarm que perdiam a cifra e a proteção contra falsificação depois de o firewalld limpar as regras de iptables do Docker (CVE-2026-115538); um nó worker com certificado TLS válido que podia obter um certificado de manager logo após uma mudança de líder do Swarm (CVE-2026-115539); e consumo excessivo de CPU ou panic com chaves RSA e dados zstd manipulados (CVE-2026-116587, CVE-2026-116591). Inclui também correções de segurança do BuildKit 0.34.2. Atualizar o Engine, sobretudo em clusters Swarm. Fonte: [moby docker-v29.9.3](https://github.com/moby/moby/releases/tag/docker-v29.9.3). Confiança: alta. Adicionado a 2026-11-04.
- **2026-11-02** em [Docker Compose](docker-compose.md): O Docker Compose 5.7.0 descontinua a opção `--ignore-push-failures` do `push` em favor de `--ignore-missing` e atualiza dependências com correções de segurança (Go 1.26.10, containerd 2.4.2, golang.org/x/net). Fonte: [docker/compose v5.7.0](https://github.com/docker/compose/releases/tag/v5.7.0). Confiança: alta. Adicionado a 2026-11-04.

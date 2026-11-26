---
id: n8n/alojar-e-atualizar
titulo: "Alojar, escalar e atualizar o n8n"
seccao: "n8n"
paginas: []
fonte: "Documentação oficial de alojamento do n8n e página de preços, ligadas em cada ponto; consultadas a 2026-11-26. Não vem do PDF."
verificado_em: 2026-11-26
editado_em: 2026-11-26
---

# Alojar, escalar e atualizar o n8n

**Resumo:** Em produção, o n8n corre em Docker com PostgreSQL, task runners externos e a chave de cifra guardada fora do servidor; escala em queue mode, com Redis e workers; atualiza-se pelo menos uma vez por mês, com a versão fixada. A cloud do n8n guarda os dados em Frankfurt.

## Conteúdo

### Instalar

- Opções oficiais: Docker Compose, instalação numa linha, nuvens (AWS, Azure, GCP, DigitalOcean, Hetzner, Heroku, OpenShift) e Helm. Fonte: [alojar o n8n](https://docs.n8n.io/deploy/host-n8n/)
- O guia de Docker Compose pede 4 GB de RAM e 2 vCPU. Usa SQLite por omissão, com PostgreSQL 18 opcional para produção, e não migra os dados de SQLite para PostgreSQL. A própria página diz que esta configuração é para desenvolvimento e testes. Fonte: [Docker Compose](https://docs.n8n.io/deploy/host-n8n/install-options/install-using-docker-compose)

### Produção

- Task runners: o modo externo (imagem `n8nio/runners`, com a mesma versão do n8n) é o recomendado em produção; o modo interno está descontinuado na 3.0 e a documentação diz que é inseguro por natureza. Fonte: [task runners](https://docs.n8n.io/deploy/host-n8n/configure-n8n/set-up-task-runners)
- Queue mode: `EXECUTIONS_MODE=queue`, Redis e PostgreSQL, workers (`n8n worker`, 10 execuções em simultâneo por omissão) e processadores de webhooks. Todos os processos usam a mesma `N8N_ENCRYPTION_KEY`. O URL público dos webhooks vai em `N8N_WEBHOOK_URL` desde a 2.30.0 (antes, `WEBHOOK_URL`). Vários processos principais só no plano Enterprise. Fonte: [queue mode](https://docs.n8n.io/deploy/host-n8n/configure-n8n/scaling/enable-queue-mode)

### Cópias e atualizações

- A cópia leva a pasta `.n8n` (onde está a chave de cifra) e a base PostgreSQL. Sem a chave, as credenciais não se recuperam. A exportação pela CLI não leva utilizadores, execuções nem variáveis. Fonte: [cópias de segurança](https://docs.n8n.io/deploy/host-n8n/keep-n8n-running/backup-and-restore)
- Atualizar pelo menos uma vez por mês: ler as release notes, testar primeiro, fixar a etiqueta da imagem (nunca `latest`), usar a mesma versão no processo principal, nos workers, nos processadores de webhooks e nos runners, e copiar a base e a chave antes. As migrações correm no arranque; para voltar atrás, `n8n db:revert` ou o restauro da cópia. Fonte: [atualizar o n8n](https://docs.n8n.io/deploy/host-n8n/keep-n8n-running/update-n8n)

### Cloud

- Starter a 20 € por mês (2 500 execuções, 5 em simultâneo), Pro a 50 € por mês (10 000 execuções), Business a 667 € por mês só em self-hosted (SSO e queue mode), Enterprise sob consulta; faturação anual; dados em Frankfurt, na UE. Fonte: [preços](https://n8n.io/pricing/). Confiança: media (página sem data; valores lidos a 2026-11-26).
- Na cloud, o n8n atualiza cada instância pelo menos de 2 em 2 semanas, com 1 a 2 minutos sem serviço. Fonte: [atualizar na cloud](https://docs.n8n.io/deploy/use-n8n-cloud/update-your-version)

**Para uma skill:** uma instalação de produção prova-se com a versão fixada (não `latest`) igual em todos os processos, PostgreSQL em vez de SQLite, task runners externos, `N8N_ENCRYPTION_KEY` definida e guardada fora do servidor, e uma cópia restaurada com sucesso.

## Ver também

- [Licença, versões e canais do n8n](licenca-e-versoes.md) (n8n)
- [Segurança de uma instância n8n](seguranca.md) (n8n)

Fonte: Documentação oficial de alojamento do n8n e página de preços, ligadas em cada ponto; consultadas a 2026-11-26. Não vem do PDF.

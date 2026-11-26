---
id: n8n/licenca-e-versoes
titulo: "Licença, versões e canais do n8n"
seccao: "n8n"
paginas: []
fonte: "Licença, release notes, releases e anúncios oficiais do n8n, ligados em cada ponto; consultados a 2026-11-26. Não vem do PDF."
verificado_em: 2026-11-26
editado_em: 2026-11-26
---

# Licença, versões e canais do n8n

**Resumo:** O n8n é «fair-code»: a Sustainable Use License deixa usá-lo dentro da empresa e cobrar consultoria, mas não revendê-lo nem pô-lo à disposição dos clientes para ligarem as contas deles sem um acordo com a n8n. Há três linhas mantidas em paralelo (1.x até ao fim de 2026, 2.x e 3.x, que só corre em Docker), com os canais stable e beta.

## Conteúdo

### Licença

- O código sem `.ee.` no nome está sob a Sustainable Use License v1.0; os ficheiros `.ee.` exigem licença Enterprise. Fonte: [LICENSE.md](https://github.com/n8n-io/n8n/blob/master/LICENSE.md)
- A licença deixa usar e modificar o n8n para fins internos do negócio, não comerciais ou pessoais, e distribuí-lo só de graça e sem fins comerciais. Fonte: [Community license](https://docs.n8n.io/n8n-community-license)
- Consultoria e suporte pagos são permitidos: a restrição do Commons Clause foi levantada. Fonte: [Community license](https://docs.n8n.io/n8n-community-license)
- Fica fora do uso interno pôr o n8n à disposição dos clientes para ligarem as contas deles e criarem workflows; esse uso pede um acordo com a n8n (license@n8n.io). Fonte: [Community license](https://docs.n8n.io/n8n-community-license)
- Não é open source no sentido da OSI: a licença entra na coluna «Risco» da comparação de plataformas. Ver [Adotar antes de construir](../plataformas/adotar-antes-de-construir.md).

### Versões e canais

- Há dois canais: stable, para produção, e beta, a mais recente, que pode ser instável. Sai uma versão minor quase todas as semanas. A 2026-11-26, a stable é a 2.49.7 e a beta a 2.50.2. Fonte: [release notes](https://docs.n8n.io/release-notes/)
- Os releases publicam as três linhas em paralelo: a 2026-11-26 saíram a n8n@3.4.1, a 2.50.2, a 2.49.7 e a 1.123.102. Fonte: [releases](https://github.com/n8n-io/n8n/releases)
- Plano anunciado a 2026-10-23: a 1.x termina a 2026-12-31, e quem lá está passa pela 2.x antes da 3.x; a 2.x recebe correções de segurança e críticas durante 12 meses depois de a 3.x ser stable; a 3.x stable estava prevista para o início de dezembro de 2026; a passagem para a 3.x não se desfaz. Fonte: [anúncio da versão 3.0](https://community.n8n.io/t/announcing-n8n-version-3-0/324016). Confiança: media (o plano pode ter mudado depois do anúncio).
- A 3.0 só corre em Docker (deixa de haver `npm` e `npx n8n`), retira a versão 1 do nó AI Agent, desliga por omissão os pacotes da comunidade não verificados (`N8N_UNVERIFIED_PACKAGES_ENABLED=false`) e baixa o tempo máximo de uma tarefa do nó Code de 300 para 60 segundos (`N8N_RUNNERS_TASK_TIMEOUT`). Fonte: [breaking changes da 3.0](https://docs.n8n.io/changelog/v30-breaking-changes)

**Para uma skill:** antes de propor o n8n, a skill regista quem o vai usar (a própria empresa ou os clientes dela) e, se forem os clientes a ligar as contas deles, que é preciso um acordo com a n8n; antes de instalar ou atualizar, lê nas release notes qual é a stable e fixa essa versão.

## Ver também

- [Automação e integração (n8n, Node-RED)](../plataformas/automacao-e-integracao.md) (Plataformas para adotar antes de construir)
- [Alojar, escalar e atualizar o n8n](alojar-e-atualizar.md) (n8n)

Fonte: Licença, release notes, releases e anúncios oficiais do n8n, ligados em cada ponto; consultados a 2026-11-26. Não vem do PDF.

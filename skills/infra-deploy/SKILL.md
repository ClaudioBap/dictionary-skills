---
name: infra-deploy
description: Mini skill para o pipeline, os contentores, o alojamento e a publicação de um projeto. Decide com o utilizador onde e como publicar (do grátis ao empresarial), monta o pipeline como portão do deploy, endurece as imagens, mantém os segredos fora do repositório, confirma a localização dos dados na UE e termina sempre com o verificador de publicação quando o projeto está exposto. Usar sozinha ou numa sessão lançada pela orchestrate-sessions. É uma sub skill, que faz uma parte do trabalho, sozinha ou chamada por uma skill mãe.
argument-hint: "Pasta do projeto e o que se quer: pipeline, contentores, alojamento, publicação ou tudo"
metadata:
  estado: produção
  tipo: sub
  usa: [humanizar]
  impacto: { ia: 0, seguranca: 6, nuvem: 10, desenvolvimento: 3, web: 2 }
---

# Infra e deploy

O caminho do conhecimento obtém-se com `node ../orchestrate-sessions/scripts/conhecimento.mjs`; as referências `knowledge/...` são relativas a esse caminho.

O conhecimento está em `knowledge/`: `cicd/`, `docker/`, `infraestrutura/`, `nuvem/`, `publicacao/` e `soberania/`. Se `~/.start-project-with-trust/knowledge/` tiver uma entrada com o mesmo caminho, vale a pessoal: é a versão já atualizada.

## Regras

- Seguem-se as regras de `../orchestrate-sessions/regras.md`, incluindo a autonomia depois da decisão: decidido o alojamento, preparas tudo até ao fim e só ficam «Por preencher» as contas, os domínios e as chaves que o utilizador tem de criar.
- Modelo e effort segundo `../orchestrate-sessions/modelo-e-effort.md`: escolher fornecedor, borda e topologia é «Rever e decidir com risco»; escrever o pipeline e os ficheiros de contentores é «Construir»; recolher o estado atual é «Ler».
- Segredos nunca entram no repositório nem nos registos do pipeline: ficam no cofre ou nas variáveis do fornecedor, com um `.env.example` só com nomes e formatos. Base: `cicd/ferramentas-segredos.md`, `infraestrutura/gestao-de-segredos-vault-openbao.md`, `soberania/um-so-cofre-de-segredos-soberano.md`.
- Cada serviço externo que entra (alojamento, base de dados, cache, email, DNS) leva a jurisdição dos dados registada. Base: `soberania/inventario-de-dependencias-por-jurisdicao.md`, `soberania/minimizacao-e-residencia-dos-dados.md`.
- Planos gratuitos e preços mudam: confirma na fonte antes de decidir. Base: `publicacao/limites-e-condicoes-dos-planos-gratuitos.md`.

## Âmbito

Publica aplicações com as secções do passo 2: decide onde, do grátis ao empresarial (alojamento, domínio, TLS, borda com WAF e proteção contra DDoS, administração fechada), monta o pipeline como portão, os contentores e os serviços de apoio (proxy, PostgreSQL, Redis ou Valkey, armazenamento de objetos, filas), e regista onde ficam os dados.

| Pedido | Esta skill | Porquê, e para onde vai |
|---|---|---|
| Publicar uma aplicação ou um site, com pipeline, contentores, alojamento, domínio e TLS | Sim | É o passo 4. |
| Pôr uma WAF, proteção contra DDoS ou um proxy à frente da aplicação | Sim | Escolhe e monta (`publicacao/waf-e-protecao-ddos.md`, `infraestrutura/proxy-reverso-e-borda.md`). Auditar se ficou bem é da `seguranca`. |
| Montar a rede ou os servidores de um escritório (firewall, VPN entre sedes, Wi-Fi, virtualização) | Não | A base só cobre as redes dos contentores, o proxy, o bastion e o acesso por identidade: fica fora da base. |
| Auditar a segurança do que está publicado | Não | `seguranca`. Aqui só se corre o verificador de publicação no fim (passo 5). |
| Esquema, migrações e dados da base de dados | Não | `backend-dados`. Aqui aloja-se a base e as migrações entram no fluxo do deploy (`cicd/infraestrutura-e-migracoes-no-fluxo.md`). |
| Monitorização, runbooks, cópias de segurança e incidentes | Não | `operar`. |
| Custo ou velocidade de uma infraestrutura que já corre | Não | `performance-verifier`. |

Quando parte do pedido cai numa linha que não é desta skill, encaminha essa parte como diz `../orchestrate-sessions/regras.md`.

## 1. O que falta montar

Lança primeiro um subagente (`haiku`, `low`) para inventariar o que o repositório já tem: ficheiros de pipeline, `Dockerfile`, `compose`, manifestos, variáveis. Chamada por uma mãe, o briefing traz o objeto, o objetivo e o nível: passa ao passo 2. Sozinha, com um pedido que não diz o que falta, ou sem pedido, pergunta só o que o inventário não responde, uma pergunta de cada vez, no formato de `../orchestrate-sessions/regras.md`, e pára quando souberes o que montar, para quê e com que limites:

1. **Objeto.** O que falta montar: pipeline (CI e CD), contentores, alojamento e domínio, publicação com TLS e borda, ou tudo. Recomenda o que o inventário mostra que falta. Se o pedido falar de rede ou de firewall, pergunta se é a da aplicação (redes dos contentores, proxy, WAF) ou a de um escritório: a primeira é desta skill, a segunda fica fora da base. Para outra linha do «Âmbito» que não é desta skill, diz para onde vai antes de continuar.
2. **Objetivo e nível** (P14 de `../orchestrate-sessions/PERGUNTAS.md`), do mais barato ao mais caro: teste pessoal, grátis; uso da organização, pago; empresarial. Inclui se fica público ou só interno, e se há área de administração. O nível dá a coluna de `../orchestrate-sessions/modelo-e-effort.md`: teste pessoal é simples, uso da organização ou empresarial é profissional, e com dados sensíveis ou desempenho crítico é topo *(interpretação)*.
3. **Limites**, um de cada vez e só os que mudam a decisão: orçamento (P8), dados pessoais e onde podem ficar (P11), tecnologia imposta (P10).

## 2. Ler só o que interessa

- Pipeline: `cicd/ci-vs-cd.md`, `cicd/pipeline-como-portao.md`, `cicd/testes-no-pipeline.md`, `cicd/build-reprodutivel-e-artefacto-imutavel.md`, `cicd/ambientes-e-promocao.md`, `cicd/estrategias-de-deploy.md`, `cicd/rollback-e-recuperacao.md`, `cicd/seguranca-do-pipeline.md`, `cicd/infraestrutura-e-migracoes-no-fluxo.md`, `cicd/estrategia-de-branches-e-ci.md`, `cicd/observabilidade-do-deploy.md`. Para as verificações que o pipeline corre: `cicd/ferramentas-sast.md`, `cicd/ferramentas-dependencias.md`.
- Contentores: `docker/imagens-e-dockerfile.md`, `docker/imagem-endurecida.md`, `docker/contentores-execucao-e-configuracao.md`, `docker/docker-compose.md`, `docker/volumes-e-persistencia.md`, `docker/redes-do-docker.md`, `docker/sondas-de-saude.md`; com Kubernetes, as entradas `docker/kubernetes-*.md`.
- Serviços de apoio: `infraestrutura/proxy-reverso-e-borda.md`, `infraestrutura/base-de-dados-relacional-postgresql.md`, `infraestrutura/cache-e-sessoes-redis-valkey.md`, `infraestrutura/armazenamento-de-objetos-minio-s3.md`, `infraestrutura/mensageria-e-filas.md`.
- Fornecedor: `nuvem/escolher-o-fornecedor-de-nuvem.md`, `nuvem/multi-cloud-lock-in-e-saida.md` e a entrada do fornecedor em causa (`nuvem/aws.md`, `nuvem/microsoft-azure-e-entra-id.md`, `nuvem/ovhcloud.md`).
- Publicação: `publicacao/` inteira, em especial `alojamento-estatico-gratuito.md`, `alojamento-dinamico-e-de-teste-gratuito.md`, `alojamento-pago-e-empresarial.md`, `dominios-e-dns.md`, `certificados-tls.md`, `waf-e-protecao-ddos.md`, `acesso-restrito-a-area-de-administracao.md`.
- Soberania: `soberania/codigo-e-ci-soberanos.md`, `soberania/estrategia-de-saida.md`, além das duas entradas das regras.

## 3. Se a biblioteca não tem a resposta

Quando nenhuma entrada cobre o fornecedor ou a ferramenta em causa, ou os limites de um plano mudaram, segue «Quando falta conhecimento» em `../update-knowledge/SKILL.md` antes de responder. Fontes oficiais deste tema: a documentação, os preços e os termos do fornecedor.

## 4. Decidir e montar

1. **Onde publicar.** Se a decisão «Publicação e exposição» do projeto ainda não existe, apresenta as opções do grátis ao empresarial (numa tabela com as colunas opção, custo, benefício, risco e base no conhecimento, e a recomendação no fim): alojamento, domínio, certificado TLS, borda com WAF e proteção contra DDoS, e como se fecha a área de administração. Na coluna «Risco» entram as condições dos planos gratuitos e a jurisdição dos dados. A decisão é do utilizador.
2. **Pipeline como portão.** Build reprodutível, testes, análise estática e verificação de dependências antes de qualquer deploy; ambientes com promoção; migrações no fluxo; reversão definida. O critério de fim de cada parte é a linha «Para uma skill» da entrada correspondente.
   - O deploy só publica a ponta do branch. Compara o commit com a ponta atual e sai sem publicar se já foi ultrapassado, ou o CI do branch de produção cancela o anterior com `cancel-in-progress: true`. Um grupo de concorrência sozinho não chega, porque não ordena por commit (`cicd/pipeline-como-portao.md`).
   - As ações ficam fixadas por SHA, com um `.github/dependabot.yml` (`package-ecosystem: "github-actions"`) que as atualiza. O token leva declaradas as permissões que cada passo lê, e nenhuma além delas (`cicd/seguranca-do-pipeline.md`).
3. **Contentores.** Imagem mínima e endurecida, utilizador sem privilégios, configuração por variáveis de ambiente, sondas de saúde, volumes só onde há estado.
4. **Segredos e variáveis.** Cada valor que o utilizador tem de criar (conta, domínio, chave de API, segredo de cliente) vai para o `.env.example` com o nome e o formato, e para «Por preencher» de `entrega.md`. O resto continua até ao fim.
5. **Jurisdição.** Para cada serviço externo, regista a localização dos dados e a fonte; se não está na UE e o projeto o exige (P11), a decisão volta ao utilizador com alternativas.
6. **Prova.** Pipeline verde em cada evento que ouve, com o registo de cada execução: um push ao branch de produção e um pull request de teste, porque um passo pode precisar de uma permissão que só falta no pull request (`cicd/seguranca-do-pipeline.md`); imagem construída e a correr; deploy e reversão feitos em teste, e cada deploy seguido do smoke test que confirma a configuração (`cicd/observabilidade-do-deploy.md`).

## 5. Publicar e verificar

Com o projeto exposto, corre a partir da pasta desta skill e cola a saída completa em `entrega.md` («Publicação»):

```
node ../orchestrate-sessions/scripts/verificar-publicacao.mjs https://<domínio> --admin <caminho da administração, sem barra inicial>
```

Tem de terminar com `✓ Publicação verificada`. Se o projeto não está exposto, escreve «Não aplicável:» e a razão. Base: `publicacao/certificados-tls.md`, `seguranca/tls-e-cabecalhos-versionados.md`, `publicacao/acesso-restrito-a-area-de-administracao.md`.

**Humanizar.** Os ficheiros do pipeline e dos contentores, o `.env.example` e as instruções de publicação não podem deixar perceber que foram feitos por uma IA. Corre a mini skill `humanizar` (ou `node ../humanizar/scripts/humanizar.mjs <ficheiros tocados> --commits <n>`) e relê o que o verificador não apanha com as secções «Código» e «Commits, documentação e dados» de `../humanizar/marcas.md`. Corriges só com autorização, categoria a categoria, e a saída final entra no relatório.

## Relatório

- A decisão de publicação (alojamento, domínio, TLS, borda, administração) e as razões.
- O pipeline, as imagens e os ambientes montados, cada um com a prova.
- A tabela de serviços externos com a jurisdição dos dados.
- O que ficou por preencher pelo utilizador, com onde se obtém cada valor.
- O que ficou fora do âmbito e para onde foi: a skill, pelo nome, ou «fora da base».
- A saída do verificador de publicação.
- As fontes que foste buscar, se a biblioteca não chegava.


## Documentação

Se a skill `documentacao` estiver instalada (existe `../documentacao/SKILL.md`), no fim de um trabalho com resultado escreve o relatório do processo, como diz o modo «processo» dela. Uma consulta sem alterações não leva relatório.

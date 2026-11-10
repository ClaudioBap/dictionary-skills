---
name: infra-deploy
description: Mini skill para o pipeline, os contentores, o alojamento e a publicação de um projeto. Decide com o utilizador onde e como publicar (do grátis ao empresarial), monta o pipeline como portão do deploy, endurece as imagens, mantém os segredos fora do repositório, confirma a localização dos dados na UE e termina sempre com o verificador de publicação quando o projeto está exposto. Usar sozinha ou numa sessão lançada pela orchestrate-sessions.
argument-hint: "Pasta do projeto e o que se quer: pipeline, contentores, alojamento, publicação ou tudo"
---

# Infra e deploy

O conhecimento está em `../start-project-with-trust/knowledge/` (relativo à pasta deste `SKILL.md`): `cicd/`, `docker/`, `infraestrutura/`, `nuvem/`, `publicacao/` e `soberania/`. Se `~/.start-project-with-trust/knowledge/` tiver uma entrada com o mesmo caminho, vale a pessoal: é a versão já atualizada.

## Regras

- Seguem-se as regras da secção «Regras em todas as fases» de `../start-project-with-trust/SKILL.md`, incluindo a autonomia depois da decisão: decidido o alojamento, preparas tudo até ao fim e só ficam «Por preencher» as contas, os domínios e as chaves que o utilizador tem de criar.
- Modelo e effort segundo `../orchestrate-sessions/modelo-e-effort.md`: escolher fornecedor, borda e topologia é «Rever e decidir com risco»; escrever o pipeline e os ficheiros de contentores é «Construir»; recolher o estado atual é «Ler».
- Segredos nunca entram no repositório nem nos registos do pipeline: ficam no cofre ou nas variáveis do fornecedor, com um `.env.example` só com nomes e formatos. Base: `cicd/ferramentas-segredos.md`, `infraestrutura/gestao-de-segredos-vault-openbao.md`, `soberania/um-so-cofre-de-segredos-soberano.md`.
- Cada serviço externo que entra (alojamento, base de dados, cache, email, DNS) leva a jurisdição dos dados registada. Base: `soberania/inventario-de-dependencias-por-jurisdicao.md`, `soberania/minimizacao-e-residencia-dos-dados.md`.
- Planos gratuitos e preços mudam: confirma na fonte antes de decidir. Base: `publicacao/limites-e-condicoes-dos-planos-gratuitos.md`.

## 1. O que falta montar

Se o pedido já o diz, passa ao passo 2. Se não, pergunta no formato da Fase 1 da `start-project-with-trust`, com as opções: pipeline (CI e CD), contentores, alojamento e domínio, publicação com TLS e borda, ou tudo. Confirma as restrições do projeto se ainda não estão registadas: exposição pública e área de administração (P14), orçamento (P8), dados pessoais ou jurisdição (P11), tecnologia imposta (P10). Lança um subagente (`haiku`, `low`) para inventariar o que o repositório já tem: ficheiros de pipeline, `Dockerfile`, `compose`, manifestos, variáveis.

## 2. Ler só o que interessa

- Pipeline: `cicd/ci-vs-cd.md`, `cicd/pipeline-como-portao.md`, `cicd/testes-no-pipeline.md`, `cicd/build-reprodutivel-e-artefacto-imutavel.md`, `cicd/ambientes-e-promocao.md`, `cicd/estrategias-de-deploy.md`, `cicd/rollback-e-recuperacao.md`, `cicd/seguranca-do-pipeline.md`, `cicd/infraestrutura-e-migracoes-no-fluxo.md`, `cicd/estrategia-de-branches-e-ci.md`.
- Contentores: `docker/imagens-e-dockerfile.md`, `docker/imagem-endurecida.md`, `docker/contentores-execucao-e-configuracao.md`, `docker/docker-compose.md`, `docker/volumes-e-persistencia.md`, `docker/redes-do-docker.md`, `docker/sondas-de-saude.md`; com Kubernetes, as entradas `docker/kubernetes-*.md`.
- Serviços de apoio: `infraestrutura/proxy-reverso-e-borda.md`, `infraestrutura/base-de-dados-relacional-postgresql.md`, `infraestrutura/cache-e-sessoes-redis-valkey.md`, `infraestrutura/armazenamento-de-objetos-minio-s3.md`, `infraestrutura/mensageria-e-filas.md`.
- Fornecedor: `nuvem/escolher-o-fornecedor-de-nuvem.md`, `nuvem/multi-cloud-lock-in-e-saida.md` e a entrada do fornecedor em causa (`nuvem/aws.md`, `nuvem/microsoft-azure-e-entra-id.md`, `nuvem/ovhcloud.md`).
- Publicação: `publicacao/` inteira, em especial `alojamento-estatico-gratuito.md`, `alojamento-dinamico-e-de-teste-gratuito.md`, `alojamento-pago-e-empresarial.md`, `dominios-e-dns.md`, `certificados-tls.md`, `waf-e-protecao-ddos.md`, `acesso-restrito-a-area-de-administracao.md`.
- Soberania: `soberania/codigo-e-ci-soberanos.md`, `soberania/estrategia-de-saida.md`, além das duas entradas das regras.

## 3. Se a biblioteca não tem a resposta

Quando nenhuma entrada cobre o fornecedor ou a ferramenta em causa, ou os limites de um plano mudaram:

1. Escolhe as fontes oficiais primárias certas (a documentação, os preços e os termos do fornecedor) e lê-as. Não contornes bloqueios: se uma fonte recusar o acesso automático, pede ao utilizador o conteúdo ou regista-a como não lida.
2. Dá a cada facto a confiança segundo os critérios de `../update-knowledge/SKILL.md` (`alta`, `media`, `baixa`). Um facto `baixa` não serve de base.
3. Regista o que encontraste antes de responder: numa cópia git do repositório, propõe a entrada nova na secção certa, no formato do passo 3 de `../update-knowledge/SKILL.md`, e só a escreves com a aprovação do utilizador; fora disso, no conhecimento pessoal (`~/.start-project-with-trust/knowledge/<secção>/<slug>.md`, fonte em `FONTES.md` pessoal, linha no `CHANGELOG.md` pessoal). Se o que encontraste substitui o que uma entrada diz, segue a regra de edição da `update-knowledge`: a entrada passa a dizer o que vale hoje e o texto anterior fica no «Histórico» dela.
4. Diz ao utilizador que fontes leste e o que registaste.

## 4. Decidir e montar

1. **Onde publicar.** Se a decisão «Publicação e exposição» do projeto ainda não existe, apresenta as opções do grátis ao empresarial, como na Fase 3 da `start-project-with-trust`: alojamento, domínio, certificado TLS, borda com WAF e proteção contra DDoS, e como se fecha a área de administração. Na coluna «Risco» entram as condições dos planos gratuitos e a jurisdição dos dados. A decisão é do utilizador.
2. **Pipeline como portão.** Build reprodutível, testes, análise estática e verificação de dependências antes de qualquer deploy; ambientes com promoção; migrações no fluxo; reversão definida. O critério de fim de cada parte é a linha «Para uma skill» da entrada correspondente.
3. **Contentores.** Imagem mínima e endurecida, utilizador sem privilégios, configuração por variáveis de ambiente, sondas de saúde, volumes só onde há estado.
4. **Segredos e variáveis.** Cada valor que o utilizador tem de criar (conta, domínio, chave de API, segredo de cliente) vai para o `.env.example` com o nome e o formato, e para «Por preencher» de `entrega.md`. O resto continua até ao fim.
5. **Jurisdição.** Para cada serviço externo, regista a localização dos dados e a fonte; se não está na UE e o projeto o exige (P11), a decisão volta ao utilizador com alternativas.
6. **Prova.** Pipeline verde com o registo da execução; imagem construída e a correr; deploy e reversão feitos em teste.

## 5. Publicar e verificar

Com o projeto exposto, corre a partir da pasta desta skill e cola a saída completa em `entrega.md` («Publicação»):

```
node ../start-project-with-trust/scripts/verificar-publicacao.mjs https://<domínio> --admin <caminho da administração, sem barra inicial>
```

Tem de terminar com `✓ Publicação verificada`. Se o projeto não está exposto, escreve «Não aplicável:» e a razão. Base: `publicacao/certificados-tls.md`, `seguranca/tls-e-cabecalhos-versionados.md`, `publicacao/acesso-restrito-a-area-de-administracao.md`.

## Relatório

- A decisão de publicação (alojamento, domínio, TLS, borda, administração) e as razões.
- O pipeline, as imagens e os ambientes montados, cada um com a prova.
- A tabela de serviços externos com a jurisdição dos dados.
- O que ficou por preencher pelo utilizador, com onde se obtém cada valor.
- A saída do verificador de publicação.
- As fontes que foste buscar, se a biblioteca não chegava.

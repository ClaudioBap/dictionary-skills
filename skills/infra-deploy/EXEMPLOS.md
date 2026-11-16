# Exemplos: infra-deploy

## O que faz

Monta o pipeline, os contentores, o alojamento e a publicação de um projeto. Decide com o utilizador onde publicar, do grátis ao empresarial, com as condições dos planos gratuitos e a localização dos dados na coluna do risco. Faz do pipeline o portão do deploy, mantém os segredos fora do repositório (o `.env.example` só leva nomes e formatos) e, com o projeto exposto, termina sempre com o verificador de publicação.

## Quando usar

- Escolher o alojamento, o domínio e o certificado de um projeto.
- Montar o CI e o CD, com testes e análise antes de qualquer deploy.
- Escrever o `Dockerfile` e o `compose`, com uma imagem mínima e endurecida.
- Preparar a publicação e deixar por preencher só as contas e as chaves que o utilizador tem de criar.

## Quando não usar

- Auditar a segurança de um site já publicado: `seguranca`.
- Monitorização, runbooks e cópias de segurança: `operar`.
- O custo de uma infraestrutura que já está a correr: `performance-verifier`.

## Exemplo: esqueleto e CI de um projeto novo

**Pedido:** «Esqueleto do projeto: linter, formatador, testes, CI com as regras, versão de uma só fonte, SECURITY.md, LICENSE e .env.example.»

**O que a skill faz:**

1. Monta o pipeline em `.github/workflows/ci.yml`, com lint, tipos, testes e build antes de qualquer deploy.
2. Põe no `.env.example` só os nomes do que o dono tem de criar (`CLOUDFLARE_API_TOKEN`, `CLOUDFLARE_ACCOUNT_ID`, `ACCESS_AUD`) e lista-os em «Por preencher».
3. Prova em local: lint, tipos e testes sem erros, e os dois Workers a empacotar com `wrangler deploy --dry-run`.

**Resultado:** Foi a tarefa T2 do site de notícias. O alojamento já vinha decidido nos ADR, por isso o passo que mais contou foi o dos segredos; o CI só se prova depois do primeiro push.

## Exemplo: preparar a publicação sem as contas

**Pedido:** «Prepara tudo o que não depende de mim para publicar: deploy pelo pipeline, pré-visualização por pull request e um guia com os valores que tenho de criar.»

**O que a skill faz:**

1. Escreve `deploy.yml`, que só corre quando o CI termina verde num push a `main`, aplica as migrações antes do deploy e tem as ações fixadas por SHA.
2. Troca no CI os identificadores por preencher pelos valores das variáveis do GitHub, só na cópia que publica, para nenhum valor do dono entrar no repositório.
3. Confirma na documentação da Cloudflare os comandos e os limites do plano Free, e marca como «não confirmado» o que a página oficial não diz.
4. Escreve `docs/publicacao.md`, um guia em 10 passos que termina com a tabela única do que fica por preencher.
5. Deixa para depois do push o que só se prova publicado, incluindo o verificador de publicação e a localização da base de dados na UE.

**Resultado:** Foi a tarefa T10a do site de notícias. A publicação espera agora pelas contas do Cláudio.

## Exemplo: onde publicar

**Pedido:** «Onde publico esta aplicação Node com PostgreSQL? Tem dados de clientes portugueses e pouco orçamento.»

**O que a skill faz:**

1. Confirma a exposição, a área de administração, o orçamento e a jurisdição dos dados, e manda um subagente `haiku` inventariar o que o repositório já tem.
2. Apresenta as opções do grátis ao empresarial (alojamento, domínio, certificado TLS, borda com WAF e como se fecha a administração), com as condições dos planos e a localização dos dados no risco.
3. Depois da decisão, regista a jurisdição de cada serviço externo; se algum guarda dados fora da UE, a decisão volta ao utilizador com alternativas.
4. Monta o pipeline e os contentores, faz um deploy e uma reversão em teste e corre `node ../start-project-with-trust/scripts/verificar-publicacao.mjs https://<domínio> --admin <caminho>`.

**Resultado:** A aplicação publicada, com a saída do verificador a terminar em `✓ Publicação verificada` colada em `entrega.md`.

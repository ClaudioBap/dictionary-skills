# Exemplos: boas-praticas-codigo

## O que faz

Escreve ou revê código em Python, Java, C#, JavaScript ou Node.js. Descobre a linguagem pelos ficheiros do repositório e lê só a pasta de conhecimento dessa linguagem. Mexe apenas no que o pedido toca, segue as convenções do projeto mesmo quando a base prefere outras, e prova o trabalho com o formatador, o linter e os testes do próprio repositório.

## Quando usar

- Uma funcionalidade nova ou uma correção num projeto numa destas cinco linguagens.
- Uma revisão de código antes de um pull request, com prova de linter, testes e segurança.
- Uma refatoração em que nada fora do pedido pode mudar de formato.
- Decidir se vale a pena acrescentar uma dependência nova.

## Quando não usar

- API e base de dados: `backend-dados`.
- Interface e acessibilidade: `design-ux`.
- Auditar a segurança de um site inteiro: `seguranca`.

## Exemplo: as decisões do admin a chegar à update-knowledge

**Pedido:** «Quero que as minhas decisões no site cheguem à update-knowledge sem mexer no repositório das skills.»

**O que a skill faz:**

1. Deteta TypeScript em Cloudflare Workers pelo `package.json` e segue as convenções já fixadas no repositório (ESLint, Prettier e Vitest).
2. Escreve a rota `GET /admin/decisoes/por-aplicar/texto`, que lê a tabela das decisões e devolve uma linha por novidade, com título, fonte, data, decisão e votos.
3. Escreve 4 testes do caso completo: uma decisão registada aparece no texto, uma decisão contrária troca a linha sem a duplicar e uma decisão aplicada desaparece.
4. Corre os testes do projeto e faz um commit só com esta alteração.

**Resultado:** Foi a tarefa T8 do site de notícias. A prova chegou até ao texto que o admin cola na `update-knowledge`; a skill em si não correu nesse teste.

## Exemplo: rever um módulo Python

**Pedido:** «Revê o módulo `faturas.py` antes de eu abrir o pull request.»

**O que a skill faz:**

1. Encontra o `pyproject.toml` e lê só `knowledge/python/`, além das regras do projeto (`CONTRIBUTING.md` e a configuração do formatador e do linter).
2. Revê só o que o pull request muda, com as entradas que ele toca: `type-hints-e-tipagem-estatica.md`, `erros-e-excecoes.md`, `testes.md` e `seguranca-em-python.md`.
3. Corre o formatador, o linter e os testes nos ficheiros tocados e cola os comandos e a saída.
4. Aplica a verificação de segurança da entrada ao que mudou.

**Resultado:** Uma lista de achados por ficheiro, cada um com a entrada que o sustenta, sem reformatar nada que o pull request não tocou.

## Exemplo: uma dependência nova em Node.js

**Pedido:** «Preciso de validar datas no serviço de marcações. Instala o que for preciso.»

**O que a skill faz:**

1. Deteta Node.js pelo `engines.node` do `package.json` e lê `node/gestao-de-pacotes.md` e `node/versoes-e-runtime.md`.
2. Trata a biblioteca nova como uma decisão: confirma a licença e a manutenção na página oficial e põe ao lado a alternativa sem dependência, com o que o runtime já traz.
3. Mostra as opções da mais barata à mais cara, com uma recomendação, e espera pela escolha.
4. Escreve os testes do caso normal e dos limites, depois o código, e corre o linter, o formatador e os testes.

**Resultado:** A validação feita com a opção escolhida, a razão registada e um commit no estilo do repositório.

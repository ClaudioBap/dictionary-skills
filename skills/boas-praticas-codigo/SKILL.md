---
name: boas-praticas-codigo
description: "Mini skill para escrever ou rever código numa das linguagens da base (Python, Java, C#, JavaScript, Node.js). Deteta a linguagem do projeto pelo repositório e lê só a pasta de knowledge/ dessa linguagem: estilo, estrutura, erros, testes, segurança. Executa com o formatador, o linter e os testes do próprio projeto como prova, sem reformatar o que o pedido não tocou. Se a biblioteca não tem a resposta, vai às fontes oficiais e regista. Usar sozinha ou numa sessão lançada pela orchestrate-sessions. É uma sub skill, que faz uma parte do trabalho, sozinha ou chamada por uma skill mãe."
argument-hint: "O que fazer no código, ou nada para perguntar"
metadata:
  estado: produção
  tipo: sub
  usa: [humanizar]
  impacto: { ia: 0, seguranca: 4, nuvem: 0, desenvolvimento: 10, web: 3 }
---

# BoasPraticasCodigo

O caminho do conhecimento obtém-se com `node ../orchestrate-sessions/scripts/conhecimento.mjs`; as referências `knowledge/...` são relativas a esse caminho.

O conhecimento está em `knowledge/python/`, `java/`, `csharp/`, `javascript/` e `node/`. Lê só a pasta da linguagem do projeto. Se `~/.start-project-with-trust/knowledge/<linguagem>/` tiver uma entrada com o mesmo caminho, vale a pessoal. API e base de dados são da `backend-dados`; interface, da `design-ux`.

## Regras

- Seguem-se as regras de `../orchestrate-sessions/regras.md`: cada facto cita o ficheiro da base ou o URL da fonte; os factos verificas tu, as decisões são do utilizador; uma pergunta de cada vez, no formato das perguntas desse ficheiro; sem marcas de escrita de IA no código (nomes que dizem o que a coisa é, comentários só com o porquê, sem logs decorativos); autonomia depois da decisão, com segredos e identificadores em variáveis de ambiente e «Por preencher».
- O modelo e o effort seguem `../orchestrate-sessions/modelo-e-effort.md`: ler o repositório em `haiku low`; aplicar um padrão já decidido em `sonnet low`; construir em `sonnet low` (simples), `sonnet medium` (profissional) ou `opus high` (topo); decidir uma arquitetura ou depurar o que já falhou na linha «Rever e decidir com risco».
- Alterações cirúrgicas: mexes só no que o pedido exige. Não reformatas, não renomeias nem «melhoras» ficheiros adjacentes. O formatador e o linter do repositório é que formatam, nunca à mão.
- Segues as convenções do projeto, mesmo que a entrada da base prefira outras; se as duas chocam, dizes ao utilizador e ele decide.

## Âmbito

Sabe fazer: escrever e rever código em Python, Java, C#, JavaScript no browser (com TypeScript) e Node.js, com as entradas da pasta da linguagem: estilo, estrutura, erros, testes, logging, segurança da linguagem, tipagem, código assíncrono e dependências. Prova com o formatador, o linter e os testes do projeto. Noutra linguagem também trabalha, mas primeiro vai às fontes oficiais (passo 3), por isso custa mais.

Não faz, e para onde vai:
- contrato da API, esquema e migrações: `backend-dados`;
- interface, acessibilidade e SEO: `design-ux`; 3D e animação: `design-3d-motion`;
- auditar a segurança de um site ou de uma aplicação inteira: `seguranca`. Testar uma firewall ou uma rede: fora da base, e nenhuma skill explora falhas;
- medir a velocidade ou o custo: `performance-verifier`;
- imagem do contentor, pipeline e alojamento: `infra-deploy`;
- prompts, modelos, RAG e agentes: `ia-aplicada` (o código à volta é desta skill);
- decidir por onde se vende um produto: `produtizar`.

Pedidos que se confundem:
- «Revê a segurança deste código»: sim, a verificação de `seguranca-em-<linguagem>.md` nos ficheiros tocados. «Audita a segurança do portal»: não, é da `seguranca`.
- «Este código está lento»: sim, se o problema está no código (`python/desempenho-e-codigo-idiomatico.md`, `node/event-loop-e-trabalho-pesado.md`, `node/desempenho-e-escala.md`, `javascript/dom-e-desempenho.md`); se ainda ninguém mediu, primeiro a `performance-verifier`.
- «Põe o serviço Node num contentor»: o processo Node lá dentro (`node/node-em-contentores.md`) é desta skill; a imagem e o pipeline são da `infra-deploy`.

Quando parte do pedido é de outra skill, diz qual e porquê, como manda `../orchestrate-sessions/regras.md`.

## 1. Que linguagem, e o que fazer?

Deteta a linguagem pelos ficheiros, sem perguntar: `pyproject.toml`, `requirements.txt` ou `setup.cfg` (Python); `pom.xml` ou `build.gradle` (Java); `*.csproj` ou `*.sln` (C#); `package.json` com `engines.node` ou dependências de servidor (Node.js); `package.json` com framework de browser, `*.html` ou bundler (JavaScript no browser). Um projeto pode ter mais de uma: lês cada pasta correspondente. Se não encontras nenhuma das cinco, segue o passo 3 para a linguagem do projeto.

Se o pedido, o questionário da `orchestrate-sessions` ou a mãe que te chamou não dizem o objeto, o objetivo e o nível, pergunta o que falta, uma coisa de cada vez, no formato das perguntas de `../orchestrate-sessions/regras.md`, e pára quando tens os três:

1. **O quê.** Só o que o diff ou o pull request muda, um ficheiro ou módulo, ou o repositório inteiro. Recomenda o mais pequeno que serve o pedido.
2. **Para quê.** Revisão (só lê e aponta), correção, refatoração sem mudar o comportamento, funcionalidade nova ou dependência nova.
3. **A que nível.** Simples, profissional ou topo, com o modelo de cada um (secção «Regras»). Recomenda profissional, salvo se o pedido disser outra coisa.

Se uma resposta mostra que parte do pedido é de outra skill (ver «Âmbito»), diz qual antes de começar.

Lê também as regras do projeto (`CLAUDE.md`, `AGENTS.md`, `CONTRIBUTING.md`, configuração do formatador e do linter) antes de escrever.

## 2. Ler só o que interessa

Lê o `README.md` da pasta da linguagem e as entradas que o pedido toca. Em todas as linguagens há uma entrada de estilo (`estilo-e-formatacao.md` ou `convencoes-e-estilo.md`), uma de estrutura do projeto, uma de erros e exceções, uma de testes (`testes.md`), uma de logging e uma de segurança (`seguranca-em-<linguagem>.md`). Para o resto, pelo pedido:
- Python: `type-hints-e-tipagem-estatica.md`, `classes-dataclasses-e-composicao.md`, `funcoes-design-e-armadilhas.md`, `gestao-de-recursos-context-managers.md`, `programacao-assincrona.md`, `ambientes-e-dependencias.md`;
- Java: `design-oo-e-solid.md`, `imutabilidade-e-records.md`, `null-safety-e-optional.md`, `colecoes-generics-e-streams.md`, `concorrencia.md`, `gestao-de-recursos.md`;
- C#: `nullable-reference-types.md`, `async-await.md`, `linq-e-colecoes.md`, `design-solid-e-injecao-de-dependencias.md`, `gestao-de-recursos-idisposable.md`, `pattern-matching-e-features-modernas.md`;
- JavaScript: `typescript-e-tipagem.md`, `modulos-es.md`, `programacao-assincrona.md`, `fetch-e-respostas-http.md`, `dom-e-desempenho.md`, `imutabilidade-e-estado.md`, `dependencias-frontend.md`;
- Node.js: `configuracao-e-segredos.md`, `erros-e-processo.md`, `event-loop-e-trabalho-pesado.md`, `encerramento-gracioso.md`, `gestao-de-pacotes.md`, `versoes-e-runtime.md`, `node-em-contentores.md`, `permissoes-do-processo.md`.

Não leias as outras linguagens.

## 3. Se a biblioteca não tem a resposta

Quando a linguagem ou o framework do projeto não está na base, ou uma entrada está desatualizada face à versão que o projeto usa, segue «Quando falta conhecimento» em `../update-knowledge/SKILL.md` antes de escrever código. Fontes oficiais deste tema: a documentação da linguagem, do framework e das ferramentas do próprio projeto.

## 4. Escrever e provar

- Decisões (biblioteca, padrão de erros, estratégia de testes): opções da mais barata à mais cara, com a base e uma recomendação, no formato das perguntas de `../orchestrate-sessions/regras.md`.
- Se o pedido, o questionário da `orchestrate-sessions` ou o plano dizem que o projeto se vende por partes, cada parte vendável que escreves de raiz é um módulo com fronteira própria e o direito a ela verifica-se no servidor, nunca só na interface. Base: `knowledge/produto/segmentar-em-partes-vendaveis.md` e `knowledge/produto/direitos-por-plano-no-servidor.md`. Decidir por onde se vende é da `produtizar`.
- Testes primeiro quando a entrada `testes.md` da linguagem o pede para o tipo de alteração; sem testes no projeto, propões o mínimo que prova a alteração.
- O critério de fim parte da linha «Para uma skill» das entradas usadas. A prova é o que qualquer pessoa pode repetir: o formatador e o linter do projeto sem erros nos ficheiros tocados, os testes a passar, e a verificação de segurança da entrada `seguranca-em-<linguagem>.md` aplicada ao que mudou, com os comandos e a saída colados.
- Dependências novas são uma decisão: antes de acrescentar uma biblioteca, confirmas a licença e a manutenção na página oficial e apresentas a alternativa sem dependência, no formato das perguntas de `../orchestrate-sessions/regras.md`.
- Commits no estilo do repositório, uma alteração por commit, sem emojis nem listas longas, como pede a regra de escrita de `../orchestrate-sessions/regras.md`.
- Nada de segredos no código: ficam em variáveis de ambiente, com `.env.example` e «Por preencher».
- Humanizar: o código, os comentários e os commits não podem deixar perceber que foram feitos por uma IA. Antes de dar a tarefa por feita, corre a mini skill `humanizar` (ou `node ../humanizar/scripts/humanizar.mjs <ficheiros tocados> --commits <n>`) e relê o que o verificador não apanha com as secções «Código» e «Commits, documentação e dados» de `../humanizar/marcas.md`. Corriges só com autorização, categoria a categoria, e a saída final entra nas provas.

## Relatório

- A linguagem detetada e as entradas usadas.
- O que mudou, ficheiro a ficheiro, e porquê.
- As provas: formatador, linter, testes, segurança, humanização (com os achados que ficaram e porquê).
- As fontes novas registadas e o que ficou por preencher.


## Documentação

Se a skill `documentacao` estiver instalada (existe `../documentacao/SKILL.md`), no fim de um trabalho com resultado escreve o relatório do processo, como diz o modo «processo» dela. Uma consulta sem alterações não leva relatório.

---
name: boas-praticas-codigo
description: "Mini skill para escrever ou rever código numa das linguagens da base (Python, Java, C#, JavaScript, Node.js). Deteta a linguagem do projeto pelo repositório e lê só a pasta de knowledge/ dessa linguagem: estilo, estrutura, erros, testes, segurança. Executa com o formatador, o linter e os testes do próprio projeto como prova, sem reformatar o que o pedido não tocou. Se a biblioteca não tem a resposta, vai às fontes oficiais e regista. Usar sozinha ou numa sessão lançada pela orchestrate-sessions."
argument-hint: "O que fazer no código, ou nada para perguntar"
---

# BoasPraticasCodigo

O conhecimento está em `../start-project-with-trust/knowledge/python/`, `java/`, `csharp/`, `javascript/` e `node/` (relativos à pasta deste `SKILL.md`). Lê só a pasta da linguagem do projeto. Se `~/.start-project-with-trust/knowledge/<linguagem>/` tiver uma entrada com o mesmo caminho, vale a pessoal. API e base de dados são da `backend-dados`; interface, da `design-ux`.

## Regras

- Seguem-se as regras da secção «Regras em todas as fases» de `../start-project-with-trust/SKILL.md`: cada facto cita o ficheiro da base ou o URL da fonte; os factos verificas tu, as decisões são do utilizador; uma pergunta de cada vez, no formato da Fase 1; sem marcas de escrita de IA no código (nomes que dizem o que a coisa é, comentários só com o porquê, sem logs decorativos); autonomia depois da decisão, com segredos e identificadores em variáveis de ambiente e «Por preencher».
- O modelo e o effort seguem `../orchestrate-sessions/modelo-e-effort.md`: ler o repositório em `haiku low`; aplicar um padrão já decidido em `sonnet low`; construir em `sonnet medium` (profissional) ou `opus high` (topo); decidir uma arquitetura ou depurar o que já falhou na linha «Rever e decidir com risco».
- Alterações cirúrgicas: mexes só no que o pedido exige. Não reformatas, não renomeias nem «melhoras» ficheiros adjacentes. O formatador e o linter do repositório é que formatam, nunca à mão.
- Segues as convenções do projeto, mesmo que a entrada da base prefira outras; se as duas chocam, dizes ao utilizador e ele decide.

## 1. Que linguagem, e o que fazer?

Deteta a linguagem pelos ficheiros, sem perguntar: `pyproject.toml`, `requirements.txt` ou `setup.cfg` (Python); `pom.xml` ou `build.gradle` (Java); `*.csproj` ou `*.sln` (C#); `package.json` com `engines.node` ou dependências de servidor (Node.js); `package.json` com framework de browser, `*.html` ou bundler (JavaScript no browser). Um projeto pode ter mais de uma: lês cada pasta correspondente. Se não encontras nenhuma das cinco, segue o passo 3 para a linguagem do projeto.

Se o pedido não diz o que fazer, pergunta numa só pergunta: nova funcionalidade, correção, revisão ou refatoração, e o nível (simples, profissional, topo), com um exemplo de cada.

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

Quando a linguagem ou o framework do projeto não está na base, ou uma entrada está desatualizada face à versão que o projeto usa:

1. Escolhe as fontes oficiais primárias (a documentação da linguagem, do framework e das ferramentas do próprio projeto) e lê-as. Não contornes bloqueios: se uma fonte recusar o acesso automático, pede ao utilizador o conteúdo ou regista-a como não lida.
2. Dá a cada facto a confiança segundo os critérios de `../update-knowledge/SKILL.md`. Um facto `baixa` não serve de base.
3. Regista antes de escrever código: numa cópia git do repositório, propõe a entrada nova (ou a secção nova, para uma linguagem que a base não tem) no formato do passo 3 de `../update-knowledge/SKILL.md`, e só a escreves com aprovação; fora disso, no conhecimento pessoal (`~/.start-project-with-trust/knowledge/<secção>/<slug>.md`, fonte em `FONTES.md` pessoal, linha no `CHANGELOG.md` pessoal). Se o que encontraste substitui o que uma entrada diz, segue a regra de edição da `update-knowledge`, com o texto anterior no «Histórico».
4. Diz ao utilizador que fontes leste e o que registaste.

## 4. Escrever e provar

- Decisões (biblioteca, padrão de erros, estratégia de testes): opções da mais barata à mais cara, com a base e uma recomendação, no formato da Fase 1.
- Testes primeiro quando a entrada `testes.md` da linguagem o pede para o tipo de alteração; sem testes no projeto, propões o mínimo que prova a alteração.
- O critério de fim parte da linha «Para uma skill» das entradas usadas. A prova é o que qualquer pessoa pode repetir: o formatador e o linter do projeto sem erros nos ficheiros tocados, os testes a passar, e a verificação de segurança da entrada `seguranca-em-<linguagem>.md` aplicada ao que mudou, com os comandos e a saída colados.
- Dependências novas são uma decisão: antes de acrescentar uma biblioteca, confirmas a licença e a manutenção na página oficial e apresentas a alternativa sem dependência, no formato da Fase 1.
- Commits no estilo do repositório, uma alteração por commit, sem emojis nem listas longas, como pede a regra de escrita da `start-project-with-trust`.
- Nada de segredos no código: ficam em variáveis de ambiente, com `.env.example` e «Por preencher».
- Humanizar: o código, os comentários e os commits não podem deixar perceber que foram feitos por uma IA. Antes de dar a tarefa por feita, corre a mini skill `humanizar` (ou `node ../humanizar/scripts/humanizar.mjs <ficheiros tocados> --commits <n>`) e relê o que o verificador não apanha com as secções «Código» e «Commits, documentação e dados» de `../humanizar/marcas.md`. Corriges só com autorização, categoria a categoria, e a saída final entra nas provas.

## Relatório

- A linguagem detetada e as entradas usadas.
- O que mudou, ficheiro a ficheiro, e porquê.
- As provas: formatador, linter, testes, segurança, humanização (com os achados que ficaram e porquê).
- As fontes novas registadas e o que ficou por preencher.

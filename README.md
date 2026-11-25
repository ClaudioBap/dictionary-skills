# Dictionary Skills

[English version](README.en.md)

Coleção das minhas skills para agentes de código (Claude Code, Codex, Cursor, GitHub Copilot), apoiadas numa base de conhecimento de boas práticas que se mantém atualizada a partir de fontes oficiais. Neste momento há duas skills principais e catorze mini skills:

- **`orchestrate-sessions`** é por onde se começa. Faz uma pergunta de cada vez até perceber o que queres e propõe um plano de delegação: que skills entram e quando, com que autonomia (que decide se as dúvidas te chegam pelo caminho ou juntas no fim), quantas sessões do VS Code se abrem e quantos agentes correm em cada uma, com o modelo e o effort mais baratos que fazem cada tarefa. Depois distribui o trabalho, recolhe as saídas com prova e, no fim, dá uma nota a cada skill que usou.
- **Mini skills**, uma por tema, usadas sozinhas ou em sessões lançadas pela `orchestrate-sessions`: `design-ux`, `design-3d-motion`, `seguranca`, `performance-verifier`, `backend-dados`, `infra-deploy`, `boas-praticas-codigo`, `ia-aplicada`, `produtizar`, `operar`, `gravacao-video`, `humanizar`, `portal-de-agentes` e `documentacao`. Cada uma pergunta o que se vai fazer, lê só a parte do conhecimento que interessa e, se a biblioteca não tiver a resposta, vai às fontes oficiais e regista o que encontrou. Com a decisão «Específico ou modular», a `produtizar` transforma o que foi feito para um caso num núcleo reutilizável. A `humanizar` verifica tudo o que vai ser entregue à procura de marcas de IA (texto, código, interface, commits) e só corrige com autorização. A `portal-de-agentes` decide e desenha um portal onde uma equipa acompanha os seus agentes de IA (um mundo por público, contas, perguntas respondidas à distância, notas às skills), com o método da secção «Portais e mundos de agentes». A `documentacao` está ligada a todas as outras: cada skill escreve o relatório do seu processo, e ela gera daí um livro Excel de processos e estatísticas, o Word «Entendimento do desenvolvimento» e o relatório final, no estilo da casa quando lhe dão ficheiros-padrão.
- **`update-knowledge`** mantém o conhecimento em dia: percorre as fontes oficiais, encontra o que mudou e aplica-o segundo o nível de confiança. Quando algo é substituído por uma prática melhor, reescreve a entrada, guarda o texto anterior no «Histórico» e atualiza as skills que o usavam.

## O que está neste repositório

| Parte | O que é | Para quem |
|---|---|---|
| [`skills/start-project-with-trust/`](skills/start-project-with-trust/SKILL.md) | A versão completa do arranque de projetos, em testes | Quem faz projetos para clientes (consultores, equipas de desenvolvimento) e a instala pelo nome |
| [`knowledge/`](knowledge/INDEX.md) | <!-- conhecimento:inicio -->388 entradas de boas práticas em 27 secções<!-- conhecimento:fim -->, cada uma com fonte | Usada pela skill; também se lê diretamente |
| [`skills/orchestrate-sessions/`](skills/orchestrate-sessions/SKILL.md) | A skill por onde se começa: pergunta o que queres, propõe o plano de delegação e distribui o trabalho por sessões, com modelo e effort por tarefa. Tem também as regras comuns, as perguntas e o caminho da base | Toda a gente |
| `skills/<mini skill>/` | As catorze mini skills, uma por tema (ver [catálogo](skills/orchestrate-sessions/catalogo.md)) | Quem executa uma tarefa de um tema, sozinho ou numa sessão da orquestração |
| [`skills/update-knowledge/`](skills/update-knowledge/SKILL.md) | A skill que atualiza o conhecimento | Quem mantém a base (e cada utilizador, para o seu conhecimento pessoal) |

## start-project-with-trust

Está em testes e instala-se à parte (ver [Em testes](#em-testes)). Conduz um projeto sempre pela mesma ordem, e cada fase só avança com a validação do utilizador:

1. **Descoberta.** Uma pergunta de cada vez, com opções ordenadas da mais barata à mais cara e uma recomendação. São 16 perguntas obrigatórias (o quê, porquê, como se mede o sucesso, para quem, âmbito, prazo, orçamento, recursos, restrições, dados e RGPD, riscos, quem decide, publicação, acesso remoto, reutilização). Se a resposta for vaga, pergunta até ficar verificável.
2. **Plano com o que temos.** Cruza as necessidades com a base de conhecimento e usa só os recursos que o cliente declarou. Antes de propor código, procura uma plataforma open source que já resolva a necessidade.
3. **Plano custo-benefício.** Opções com custo e benefício, e a divisão do trabalho entre um orquestrador e sessões.
4. **Goal-loop.** Volta a perguntar até não haver nada em aberto. Termina no marco «Plano aprovado».
5. **Execução.** Faz cada ação do plano.
6. **Verificação com prova.** Prova cada critério de sucesso, a publicação (HTTPS, certificado, cabeçalhos, área de administração protegida) e os acessos, até o cliente aceitar a entrega.

O que a distingue:

- **Não inventa.** Cada prática do plano cita o ficheiro da base de conhecimento ou a fonte oficial de onde veio.
- **Vai às fontes quando não sabe.** Se uma necessidade não está na base, procura fontes oficiais primárias, regista-as no conhecimento pessoal do utilizador e só depois planeia.
- **Rastreabilidade.** Cada ação e cada decisão indica a que pergunta do cliente responde; o que não responde a nenhum pedido não entra no plano.
- **Verificadores automáticos e hooks** que impedem dar o plano ou a entrega por concluídos enquanto houver falhas (ver [Como o goal-loop é garantido](#como-o-goal-loop-é-garantido)).
- **Escrita sem marcas de IA** no que se entrega: código, interface, documentação e commits.
- **Autonomia depois da decisão.** Uma decisão do utilizador leva-se até ao fim; só os valores que ele tem de dar (segredos, identificadores, URLs) ficam numa lista «Por preencher», sem valores reais, e o resto continua.

### O que cria

A skill trabalha na pasta `arranque/<nome-do-projeto>/`:

| Ficheiro | Conteúdo |
|----------|----------|
| `objetivo.md` | Estado do goal-loop: perguntas, respostas, pressupostos e confirmação final |
| `necessidades.md` | Fase 1: resumo das necessidades, para validação |
| `plano.md` | Fase 2: plano feito só com os recursos disponíveis, com base em `knowledge/` |
| `custo-beneficio.md` | Fase 3: opções com custo e benefício, orquestrador e sessões |
| `acessos.md` | Inventário dos acessos SSH/RDP (P15), sem segredos; só se houver acessos remotos |
| `entrega.md` | Fases 4 e 5: execução de cada ação, prova de cada critério, publicação, acessos, operação (para quem vai operar), valores por preencher e aceitação |

Se interromperes, voltar a chamar a skill para o mesmo projeto retoma onde ficou.

## Base de conhecimento

<!-- conhecimento:inicio -->
388 entradas em 27 secções. A maior parte foi extraída do PDF «Dicionário de Boas Práticas e Possibilidades» (Cláudio Baptista, BSO Consulting, 2026-11-03), com a página de origem em cada ficheiro; as secções marcadas como «fora do PDF» foram escritas a partir de fontes oficiais. Cada entrada tem um resumo, o conteúdo, uma linha «Para uma skill» com o critério a verificar e as fontes oficiais que a apoiam.

| Secção | Entradas | Secção | Entradas |
|---|---|---|---|
| [Segurança](knowledge/seguranca/README.md) | 32 | [Estrutura e documentação](knowledge/estrutura/README.md) | 17 |
| [Privacidade e conformidade](knowledge/privacidade/README.md) | 4 | [CI/CD e ferramentas](knowledge/cicd/README.md) | 24 |
| [Fiabilidade e resiliência](knowledge/fiabilidade/README.md) | 10 | [Docker e orquestração](knowledge/docker/README.md) | 14 |
| [Design e experiência de utilizador](knowledge/design/README.md) | 31 | [Serviços de infraestrutura](knowledge/infraestrutura/README.md) | 10 |
| [3D, WebGL e animação](knowledge/3d-webgl/README.md) | 11 | [Soberania digital](knowledge/soberania/README.md) | 6 |
| [SEO e descoberta](knowledge/seo/README.md) | 2 | [Governação e processo](knowledge/governacao/README.md) | 7 |
| [Desenho de API](knowledge/api/README.md) | 6 | [Nuvem e identidade](knowledge/nuvem/README.md) | 8 |
| [Base de dados](knowledge/base-de-dados/README.md) | 18 | [Sessões, orquestração e custo-eficiência](knowledge/custo/README.md) | 8 |
| [Python](knowledge/python/README.md) | 13 | [Publicação e alojamento web](knowledge/publicacao/README.md) (fora do PDF) | 10 |
| [Java](knowledge/java/README.md) | 13 | [Construir com IA](knowledge/ia/README.md) | 65 |
| [C#](knowledge/csharp/README.md) | 13 | [Acesso remoto (SSH e RDP)](knowledge/acesso-remoto/README.md) (fora do PDF) | 4 |
| [JavaScript](knowledge/javascript/README.md) (fora do PDF) | 14 | [Plataformas para adotar antes de construir](knowledge/plataformas/README.md) (fora do PDF) | 15 |
| [Node.js](knowledge/node/README.md) (fora do PDF) | 14 | [Modularização e produtização](knowledge/produto/README.md) (fora do PDF) | 10 |
| [Portais e mundos de agentes](knowledge/portais-de-agentes/README.md) (fora do PDF) | 9 | | |
<!-- conhecimento:fim -->

Ficheiros de referência:

- [`INDEX.md`](knowledge/INDEX.md): todas as entradas, por secção.
- [`FONTES.md`](knowledge/FONTES.md): as fontes oficiais de cada secção e a lista «A vigiar» (prazos e limites que se verificam em cada atualização, como a validade dos certificados TLS ou os planos gratuitos de alojamento).
- `<secção>/ATUALIZACOES.md`: as novidades de cada secção que não mudam o texto de nenhuma entrada, por categoria e data. Quando uma novidade muda o que uma entrada diz, a entrada é reescrita e o texto anterior fica na secção «Histórico» dela. As que entraram há mais de um ano passam para `ATUALIZACOES-ARQUIVO.md`, sem se apagarem.
- [`CHANGELOG.md`](knowledge/CHANGELOG.md): cada alteração, com fonte, data de lançamento, confiança e quem aprovou.

### Conhecimento pessoal

Cada utilizador tem um conhecimento pessoal em `~/.start-project-with-trust/` (no Windows, `%USERPROFILE%\.start-project-with-trust\`), fora da pasta das skills, para não se perder nas atualizações. Guarda o perfil dos tipos de trabalho da pessoa e as fontes oficiais que as skills foram buscar para os seus projetos. A `update-knowledge` mantém-no atualizado. Fica sempre só na máquina do utilizador: nunca vai para este repositório.

## update-knowledge

Mantém a base de conhecimento e o conhecimento pessoal em dia. Só corre quando alguém a chama com `/update-knowledge` (para um tema, por exemplo `/update-knowledge ia`, ou `/update-knowledge pessoal` só para o conhecimento pessoal).

1. Percorre as fontes de [`FONTES.md`](knowledge/FONTES.md) e verifica sempre os pontos «A vigiar». Usa feeds RSS e APIs públicas quando existem, para gastar pouco.
2. Dá a cada novidade a data de lançamento indicada pela fonte e um nível de confiança, e aplica-a segundo esse nível:

   | Confiança | Quando | O que acontece |
   |---|---|---|
   | Alta | Fonte oficial primária, lida diretamente, com data | Se muda o que uma entrada diz, reescreve a entrada e guarda o texto anterior no «Histórico»; se não, entra no `ATUALIZACOES.md` da secção |
   | Média | Fonte oficial mas indireta, lida em parte ou sem data | Entra como a alta, marcada «Confiança: media»; sai só se pedires para a tirar |
   | Baixa | Fonte não oficial | Nunca altera o conhecimento |

   Novas entradas e fontes novas pedem sempre aprovação, uma a uma, qualquer que seja a confiança. Depois de editar uma entrada, atualiza também as skills que usavam o valor antigo.
3. Regista cada alteração no `CHANGELOG.md`, com fonte, data de lançamento, confiança e quem aprovou.
4. Corre os verificadores e publica sem perguntar, com commit e push no `main`. Quem lê a base a partir de `~/.dictionary-skills` recebe o conhecimento novo com `conhecimento.mjs --atualizar`.
5. Atualiza também o conhecimento pessoal do utilizador: as novidades de confiança alta entram, as de confiança média ficam para ele decidir na corrida seguinte.

Não contorna sites que bloqueiam o acesso automático: nesses casos pede que abras a página e coles o conteúdo, ou regista a fonte como não lida.

Para manter a base partilhada, trabalha numa cópia git deste repositório (`gh repo clone ClaudioBap/dictionary-skills`) e não na cópia instalada. Quem só instalou as skills corre-a em **modo local**: percorre as mesmas fontes da base partilhada, mas guarda as novidades no conhecimento pessoal, sem alterar a cópia instalada (que o `npx skills update` substituiria).

Ao abrir, a `orchestrate-sessions` mostra a data da última atualização da base partilhada e a do conhecimento local. Se a mais recente tiver mais de 3 meses, pergunta se queres correr `/update-knowledge` antes de começar, avisando que as novidades ficam no teu conhecimento local e que a atualização gasta tokens.

## Instalação

Requisitos:

- [Node.js](https://nodejs.org) 22.20 ou superior. É o que o instalador `skills` exige.
- Git.
- Um agente compatível com skills, por exemplo Claude Code, Codex, Cursor ou GitHub Copilot.

Todas as skills da coleção, com um só comando:

```bash
npx skills@latest add ClaudioBap/dictionary-skills --skill '*'
```

As skills que se juntarem à coleção entram neste comando sem mudar nada, menos as que estão em testes (ver [Em testes](#em-testes)). Depois de instalar, começa-se pela `orchestrate-sessions` (ver [Utilização](#utilização)).

Para instalar só uma mini skill, junta-lhe a `orchestrate-sessions`, a `update-knowledge` e a `humanizar`, de que todas precisam: a primeira tem o caminho da base de conhecimento, as regras comuns e as perguntas, a segunda mantém o conhecimento em dia e a terceira verifica o que se entrega. Por exemplo:

```bash
npx skills@latest add ClaudioBap/dictionary-skills --skill seguranca --skill orchestrate-sessions --skill update-knowledge --skill humanizar
```

- Sem opções, a skill fica instalada no projeto atual e só aparece nas sessões abertas nessa pasta. Para a teres em todos os projetos, junta `-g`.
- O instalador deteta os agentes que tens. Para escolher um diretamente, junta `-a claude-code` (ou outro agente).
- A base de conhecimento (`knowledge/`) vive na raiz do repositório e não vem dentro das skills. Na primeira vez que uma skill a procura, `skills/orchestrate-sessions/scripts/conhecimento.mjs` clona o repositório para `~/.dictionary-skills` (precisa de Git) e as skills leem-na daí. Para atualizar, corre `node skills/orchestrate-sessions/scripts/conhecimento.mjs --atualizar`. Quem já tem um clone aponta-lhe com a variável `DICTIONARY_SKILLS_KNOWLEDGE` ou com o campo `repositorio` de `~/.start-project-with-trust/config.json`.
- No Windows, se o PowerShell não encontrar o `npx` ou bloquear scripts, usa `npx.cmd` e confirma que a pasta do Node.js está no PATH.

## Utilização

No agente, começa pela `orchestrate-sessions`, com o que queres fazer ou sem nada:

```
/orchestrate-sessions <o que queres fazer>
```

Ela faz uma pergunta de cada vez até perceber o que queres e propõe o plano de delegação antes de começar. Podes dar logo no primeiro pedido o que já sabes, e ela só pergunta o que falta.

Uma mini skill também se chama sozinha, por exemplo `/seguranca`. Com um pedido vago ou sem pedido, pergunta primeiro o que queres e diz quando uma parte é de outra skill.

Para atualizar o conhecimento:

```
/update-knowledge            todos os temas
/update-knowledge ia         só um tema
/update-knowledge pessoal    só o conhecimento pessoal
```

## Como o goal-loop é garantido

- **Verificador** (`scripts/verificar.mjs`, Node, sem dependências). Falha enquanto houver:
  - perguntas abertas;
  - campos «por definir»;
  - validações por marcar;
  - confirmação final sem nome e data.

  A skill tem de o correr e mostrar a saída antes de terminar. Também o podes correr tu:
  ```bash
  node .claude/skills/start-project-with-trust/scripts/verificar.mjs arranque/<projeto>
  ```
  Inclui a **rastreabilidade**:
  - cada ação do plano, cada decisão e o orquestrador indicam em «Responde a» as perguntas do utilizador (P/S) a que respondem, e essas perguntas têm de existir e estar fechadas;
  - todas as perguntas obrigatórias têm pelo menos uma ação ou decisão que lhes responde.

  Com `--entrega`, verifica também a entrega: cada ação `feito` e com prova `✓`, a publicação verificada, a operação documentada com prova, `acessos.md` e «Por preencher» sem segredos, e a aceitação com nome e data.
- **Verificador da publicação** (`scripts/verificar-publicacao.mjs`, na `orchestrate-sessions`): confirma o redirecionamento de HTTP para HTTPS, certificado válido, TLS 1.2 ou superior, cabeçalhos de segurança e que a área de administração não abre sem login.
  ```bash
  node .claude/skills/orchestrate-sessions/scripts/verificar-publicacao.mjs https://<domínio> --admin admin
  ```
- **Hooks do Claude Code**, que a skill propõe instalar no projeto na primeira execução (configuração em `scripts/hooks-settings.json`):

  | Hook | Evento | O que faz |
  |---|---|---|
  | Guarda (`guarda-hook.mjs`) | PreToolUse | Bloqueia marcar `Plano aprovado` (e as fases 4 e 5) enquanto o verificador do plano falhar, e `Concluído` enquanto o plano ou a entrega falharem. |
  | Rastreabilidade (`rastreabilidade-hook.mjs`) | PostToolUse | Depois de cada escrita no plano ou no custo-benefício, devolve ao agente as decisões sem ligação a um pedido, para as reabrir no goal-loop. |
  | Verificador semântico (`type: "agent"`) | PostToolUse | Um modelo lê o `objetivo.md` e confirma que cada decisão responde de facto ao que foi pedido e não contradiz restrições. Se não, devolve ao agente a lista de pontos para reabrir. É uma funcionalidade experimental do Claude Code e gasta tokens a cada edição. |

**Limites:**
- A guarda garante que a confirmação final está registada, mas não consegue provar quem a deu. Essa regra («o agente nunca responde pelo utilizador») está nas instruções da skill.
- O verificador semântico é um julgamento de um modelo, não uma verificação determinística.

## Atualizar as skills

```bash
npx skills@latest update
```

## Skills mãe e sub skills

Cada skill diz no `metadata` do `SKILL.md`:

- `tipo`: `mãe` conduz as outras e reparte o trabalho por elas; `sub` faz uma parte do trabalho, sozinha ou chamada por uma skill mãe;
- `usa`: as skills a que pede partes do trabalho (`[]` se nenhuma; `todas` só numa mãe que pode usar qualquer uma);
- `impacto`: de 0 a 10, quanto serve para trabalho em cada área. 10 é a skill a usar, 7 é parte grande do trabalho, 4 a 6 ajuda em alguns casos, 1 a 3 é de passagem e 0 não serve.

Os casos em que se usa estão no `EXEMPLOS.md` de cada skill, em «Quando usar», e a descrição diz se é mãe ou sub. Uma skill nova traz tudo isto: `node skills/update-knowledge/scripts/catalogo-skills.mjs .` verifica-o e escreve a tabela abaixo.

<!-- skills:inicio -->
| Skill | Tipo | Usa | IA | Segurança | Nuvem | Desenvolvimento | Web |
|---|---|---|---:|---:|---:|---:|---:|
| `orchestrate-sessions` | mãe | qualquer uma | 10 | 0 | 3 | 4 | 0 |
| `start-project-with-trust` | mãe | `orchestrate-sessions`, `operar`, `humanizar`, `documentacao`, `update-knowledge`, `portal-de-agentes` | 7 | 7 | 7 | 7 | 7 |
| `backend-dados` | sub | `humanizar` | 0 | 5 | 5 | 10 | 0 |
| `boas-praticas-codigo` | sub | `humanizar` | 0 | 4 | 0 | 10 | 3 |
| `correction-loop` | sub | nenhuma | 0 | 0 | 3 | 10 | 3 |
| `design-3d-motion` | sub | `humanizar` | 0 | 0 | 0 | 4 | 10 |
| `design-ux` | sub | `humanizar` | 0 | 2 | 0 | 4 | 10 |
| `documentacao` | sub | `humanizar`, `design-ux` | 3 | 2 | 3 | 7 | 2 |
| `gravacao-video` | sub | `humanizar` | 5 | 0 | 0 | 2 | 10 |
| `humanizar` | sub | nenhuma | 0 | 0 | 0 | 10 | 10 |
| `ia-aplicada` | sub | `humanizar` | 10 | 3 | 3 | 5 | 0 |
| `infra-deploy` | sub | `humanizar` | 0 | 6 | 10 | 3 | 2 |
| `operar` | sub | `humanizar` | 2 | 3 | 10 | 2 | 0 |
| `performance-verifier` | sub | `humanizar` | 6 | 0 | 7 | 6 | 7 |
| `portal-de-agentes` | sub | `design-3d-motion`, `design-ux`, `backend-dados`, `seguranca`, `infra-deploy`, `ia-aplicada`, `operar`, `humanizar`, `documentacao` | 10 | 5 | 5 | 7 | 7 |
| `produtizar` | sub | `humanizar` | 0 | 0 | 3 | 10 | 0 |
| `seguranca` | sub | `humanizar` | 4 | 10 | 5 | 5 | 2 |
| `update-knowledge` | sub | nenhuma | 5 | 5 | 5 | 5 | 5 |
<!-- skills:fim -->

## Estado de cada skill

Cada `SKILL.md` diz o seu estado em `metadata.estado`:

- `produção`: está pronta. O portal Central Industry of Development leva-a aos computadores ligados, sem a instalar.
- `testes`: está a ser experimentada.
- `demo`: serve só para mostrar.

As de `testes` e `demo` não vão para os computadores, e as que têm `metadata.internal` também não aparecem no armazém do conhecimento. Uma skill sem estado conta
como `testes`. Para mudar o estado, muda-se essa linha.

Hoje, `correction-loop` está em testes. As outras estão em produção.

## Em testes

`skills/correction-loop/` é uma skill em testes e não se instala com `--skill '*'`: o campo `metadata.internal` do `SKILL.md` deixa-a de fora. Foi um teste para aumentar a performance, à procura de respostas mais rápidas a problemas: a partir de pouco mais do que «está a dar erro», descobrir como reproduzir o erro, localizar a causa com métodos de procura escolhidos pelo sinal disponível e entregar a melhor correção, provada.

Nos ensaios, num erro com um teste a falhar, uma prompt simples chegou à mesma correção em menos de metade do tempo e por cerca de metade do custo. Os resultados estão em [`medicao.md`](skills/correction-loop/medicao.md). O utilizador decidiu fechá-la a 2026-11-25, sem mais investimento. Só volta a contar se ganhar a uma prompt simples num caso em que a localização por bissecção (testar versões pelo meio do histórico) faz diferença, como uma regressão sem nenhum teste que aponte a causa. Quem a quiser experimentar instala-a pelo nome:

```bash
npx skills@latest add ClaudioBap/dictionary-skills --skill correction-loop
```

`skills/start-project-with-trust/` também está em testes e fica de fora do `--skill '*'` pelo mesmo campo. É a versão completa do arranque de um projeto com um cliente, com o goal-loop até ao «Plano aprovado», os verificadores e os hooks (ver [start-project-with-trust](#start-project-with-trust) e [Como o goal-loop é garantido](#como-o-goal-loop-é-garantido)). Usa as regras, as perguntas e o caminho da base da `orchestrate-sessions`, por isso instala-se depois da coleção. São dois comandos, porque o instalador só traz uma skill em testes quando é pedida pelo nome, sem `'*'` no mesmo pedido:

```bash
npx skills@latest add ClaudioBap/dictionary-skills --skill '*'
npx skills@latest add ClaudioBap/dictionary-skills --skill start-project-with-trust
```

Depois chama-se com `/start-project-with-trust <nome-do-projeto>`.

## Contribuir

Fontes novas, correções ao conhecimento e melhorias às skills são bem-vindas. As regras (fonte oficial, data, confiança) estão em [CONTRIBUTING.md](CONTRIBUTING.md), e há modelos de issue para cada caso. Falhas de segurança nos scripts ou nos hooks reportam-se em privado, como explicado em [SECURITY.md](SECURITY.md).

## Estrutura

```
skills/start-project-with-trust/   em testes
├── SKILL.md        instruções das fases e do goal-loop
├── modelos/        esqueletos dos documentos
└── scripts/        verificadores do plano e da entrega, e hooks do goal-loop
knowledge/          base de conhecimento (INDEX.md, FONTES.md, CHANGELOG.md, e um ATUALIZACOES.md e um ATUALIZACOES-ARQUIVO.md por secção)
skills/orchestrate-sessions/
├── SKILL.md            tarefas, número de sessões, agentes, briefings, execução e recolha
├── regras.md           regras comuns a todas as skills e formato das perguntas
├── PERGUNTAS.md        perguntas obrigatórias, P1 a P16
├── catalogo.md         mini skills e as secções de knowledge/ que cada uma usa
├── modelo-e-effort.md  modelo e effort por tipo de tarefa, e quando subir de nível
├── modelos/            sessoes.md, briefing.md, estado.json e retoma-permissoes.json
├── modo-continuo.md    trabalhar até ao fim, esperar pela reposição do limite e retomar
└── scripts/            conhecimento.mjs (caminho da base), verificar-publicacao.mjs, estado-uso.mjs (linha de estado que grava o uso do plano), retomar.mjs, retomar.vbs e agendar-retoma.mjs (retoma agendada)
skills/<mini skill>/          design-ux, design-3d-motion, seguranca, performance-verifier, backend-dados, infra-deploy,
│                             boas-praticas-codigo, ia-aplicada, produtizar, operar, gravacao-video, humanizar,
│                             portal-de-agentes, documentacao
└── SKILL.md        processo do tema: pergunta o que se vai fazer, lê só essa parte de knowledge/ e vai às fontes quando falta
skills/documentacao/
├── SKILL.md        modos «processo» e «gerar», padrão da casa e controlo
├── modelos/        processo.md, entendimento.md e relatorio-final.md
└── scripts/        padrao.mjs (estilo dos ficheiros-padrão), gerar.mjs (Excel e Word) e verificar.mjs
skills/update-knowledge/
├── SKILL.md        procura de novidades, fluxo por confiança, publicação e conhecimento pessoal
├── fontes-verificadas.json   data da última verificação de cada fonte
└── scripts/        indice.mjs, verificar-alteracoes.mjs, novidades-rss.mjs

~/.start-project-with-trust/   conhecimento pessoal de cada utilizador (fora do repositório)
├── perfil.md       tipos de trabalho
├── FONTES.md       fontes pessoais
├── pendentes.md    novidades de confiança média à espera de decisão
├── CHANGELOG.md
├── fontes-verificadas.json   data da última atualização local e de cada fonte verificada
└── knowledge/      entradas e ATUALIZACOES.md por secção
```

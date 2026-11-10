# Dictionary Skills

[English version](README.en.md)

Coleção das minhas skills para agentes de código (Claude Code, Codex, Cursor, GitHub Copilot), apoiadas numa base de conhecimento de boas práticas que se mantém atualizada a partir de fontes oficiais. Neste momento há quatro:

- **`start-project-with-trust`** conduz um projeto de cliente da primeira conversa à entrega verificada: descoberta guiada, plano, plano custo-benefício, execução e verificação com prova. Não termina enquanto cada critério de sucesso não tiver prova e o cliente não aceitar a entrega.
- **`orchestrate-sessions`** divide um trabalho por várias sessões Claude em paralelo, cada uma com a sua mini skill. Pergunta quantas sessões queres e onde usar subagentes, e dá a cada tarefa o modelo e o effort mais baratos que a fazem. A `start-project-with-trust` usa-a na Fase 3 e na Fase 4.
- **`ia-aplicada`** é a mini skill para trabalho com IA: pergunta o que vamos fazer (APIs, RAG, agentes, modelo próprio, voz…), lê só essa parte do conhecimento e, se a biblioteca não tiver a resposta, vai às fontes oficiais e regista o que encontrou.
- **`update-knowledge`** mantém o conhecimento em dia: percorre as fontes oficiais, encontra o que mudou e aplica-o segundo o nível de confiança. Quando algo é substituído por uma prática melhor, reescreve a entrada, guarda o texto anterior no «Histórico» e atualiza as skills que o usavam.

## O que está neste repositório

| Parte | O que é | Para quem |
|---|---|---|
| [`skills/start-project-with-trust/`](skills/start-project-with-trust/SKILL.md) | A skill que arranca e conduz projetos | Quem faz projetos para clientes (consultores, equipas de desenvolvimento) |
| [`knowledge/`](skills/start-project-with-trust/knowledge/INDEX.md) | 355 entradas de boas práticas em 26 secções, cada uma com fonte | Usada pela skill; também se lê diretamente |
| [`skills/orchestrate-sessions/`](skills/orchestrate-sessions/SKILL.md) | A skill que distribui o trabalho por sessões, com modelo e effort por tarefa | Quem executa trabalho com várias sessões em paralelo |
| [`skills/ia-aplicada/`](skills/ia-aplicada/SKILL.md) | A mini skill para trabalho com IA | Quem constrói ou decide sobre IA |
| [`skills/update-knowledge/`](skills/update-knowledge/SKILL.md) | A skill que atualiza o conhecimento | Quem mantém a base (e cada utilizador, para o seu conhecimento pessoal) |

## start-project-with-trust

Conduz um projeto sempre pela mesma ordem, e cada fase só avança com a validação do utilizador:

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
| `entrega.md` | Fases 4 e 5: execução de cada ação, prova de cada critério, publicação, acessos e aceitação |

Se interromperes, voltar a chamar a skill para o mesmo projeto retoma onde ficou.

### Conhecimento pessoal

Cada utilizador tem um conhecimento pessoal em `~/.start-project-with-trust/` (no Windows, `%USERPROFILE%\.start-project-with-trust\`), fora da pasta da skill, para não se perder nas atualizações. Guarda o perfil dos tipos de trabalho da pessoa e as fontes oficiais que a skill foi buscar para os seus projetos. A `update-knowledge` mantém-no atualizado. Fica sempre só na máquina do utilizador: nunca vai para este repositório.

## Base de conhecimento

355 entradas em 26 secções. A maior parte foi extraída do PDF «Dicionário de Boas Práticas e Possibilidades» (Cláudio Baptista, BSO Consulting, 2026-11-03), com a página de origem em cada ficheiro; as secções marcadas como «fora do PDF» foram escritas a partir de fontes oficiais. Cada entrada tem um resumo, o conteúdo, uma linha «Para uma skill» com o critério a verificar e as fontes oficiais que a apoiam.

| Secção | Entradas | Secção | Entradas |
|---|---|---|---|
| [Segurança](skills/start-project-with-trust/knowledge/seguranca/README.md) | 25 | [Estrutura e documentação](skills/start-project-with-trust/knowledge/estrutura/README.md) | 17 |
| [Privacidade e conformidade](skills/start-project-with-trust/knowledge/privacidade/README.md) | 4 | [CI/CD e ferramentas](skills/start-project-with-trust/knowledge/cicd/README.md) | 24 |
| [Fiabilidade e resiliência](skills/start-project-with-trust/knowledge/fiabilidade/README.md) | 10 | [Docker e orquestração](skills/start-project-with-trust/knowledge/docker/README.md) | 14 |
| [Design e experiência de utilizador](skills/start-project-with-trust/knowledge/design/README.md) | 28 | [Serviços de infraestrutura](skills/start-project-with-trust/knowledge/infraestrutura/README.md) | 10 |
| [3D, WebGL e animação](skills/start-project-with-trust/knowledge/3d-webgl/README.md) | 10 | [Soberania digital](skills/start-project-with-trust/knowledge/soberania/README.md) | 6 |
| [SEO e descoberta](skills/start-project-with-trust/knowledge/seo/README.md) | 2 | [Governação e processo](skills/start-project-with-trust/knowledge/governacao/README.md) | 7 |
| [Desenho de API](skills/start-project-with-trust/knowledge/api/README.md) | 6 | [Nuvem e identidade](skills/start-project-with-trust/knowledge/nuvem/README.md) | 7 |
| [Base de dados](skills/start-project-with-trust/knowledge/base-de-dados/README.md) | 14 | [Sessões, orquestração e custo-eficiência](skills/start-project-with-trust/knowledge/custo/README.md) | 8 |
| [Python](skills/start-project-with-trust/knowledge/python/README.md) | 13 | [Publicação e alojamento web](skills/start-project-with-trust/knowledge/publicacao/README.md) (fora do PDF) | 9 |
| [Java](skills/start-project-with-trust/knowledge/java/README.md) | 13 | [Construir com IA](skills/start-project-with-trust/knowledge/ia/README.md) | 61 |
| [C#](skills/start-project-with-trust/knowledge/csharp/README.md) | 13 | [Acesso remoto (SSH e RDP)](skills/start-project-with-trust/knowledge/acesso-remoto/README.md) (fora do PDF) | 4 |
| [JavaScript](skills/start-project-with-trust/knowledge/javascript/README.md) (fora do PDF) | 14 | [Plataformas para adotar antes de construir](skills/start-project-with-trust/knowledge/plataformas/README.md) (fora do PDF) | 15 |
| [Node.js](skills/start-project-with-trust/knowledge/node/README.md) (fora do PDF) | 14 | [Modularização e produtização](skills/start-project-with-trust/knowledge/produto/README.md) (fora do PDF) | 7 |

Ficheiros de referência:

- [`INDEX.md`](skills/start-project-with-trust/knowledge/INDEX.md): todas as entradas, por secção.
- [`FONTES.md`](skills/start-project-with-trust/knowledge/FONTES.md): as fontes oficiais de cada secção e a lista «A vigiar» (prazos e limites que se verificam em cada atualização, como a validade dos certificados TLS ou os planos gratuitos de alojamento).
- `<secção>/ATUALIZACOES.md`: as novidades de cada secção que não mudam o texto de nenhuma entrada, por categoria e data. Quando uma novidade muda o que uma entrada diz, a entrada é reescrita e o texto anterior fica na secção «Histórico» dela. As que entraram há mais de um ano passam para `ATUALIZACOES-ARQUIVO.md`, sem se apagarem.
- `PENDENTES.md`: as novidades de confiança média à espera de decisão.
- [`CHANGELOG.md`](skills/start-project-with-trust/knowledge/CHANGELOG.md): cada alteração, com fonte, data de lançamento, confiança e quem aprovou.

## update-knowledge

Mantém a base de conhecimento e o conhecimento pessoal em dia. Só corre quando alguém a chama com `/update-knowledge` (para um tema, por exemplo `/update-knowledge ia`, ou `/update-knowledge pessoal` só para o conhecimento pessoal).

1. Percorre as fontes de [`FONTES.md`](skills/start-project-with-trust/knowledge/FONTES.md) e verifica sempre os pontos «A vigiar». Usa feeds RSS e APIs públicas quando existem, para gastar pouco.
2. Dá a cada novidade a data de lançamento indicada pela fonte e um nível de confiança, e aplica-a segundo esse nível:

   | Confiança | Quando | O que acontece |
   |---|---|---|
   | Alta | Fonte oficial primária, lida diretamente, com data | Se muda o que uma entrada diz, reescreve a entrada e guarda o texto anterior no «Histórico»; se não, entra no `ATUALIZACOES.md` da secção |
   | Média | Fonte oficial mas indireta, lida em parte ou sem data | Fica em `PENDENTES.md` até decidires se entra |
   | Baixa | Fonte não oficial | Nunca altera o conhecimento |

   Novas entradas, fontes novas e edições sustentadas só por fontes de confiança média pedem sempre aprovação, uma a uma. Depois de editar uma entrada, atualiza também as skills que usavam o valor antigo.
3. Regista cada alteração no `CHANGELOG.md`, com fonte, data de lançamento, confiança e quem aprovou.
4. Corre os verificadores e, com a tua autorização, faz commit e push. Quem tem as skills instaladas recebe o conhecimento novo no próximo `npx skills update`.
5. Atualiza também o conhecimento pessoal do utilizador: as novidades de confiança alta entram, as de confiança média ficam para ele decidir na corrida seguinte.

Não contorna sites que bloqueiam o acesso automático: nesses casos pede que abras a página e coles o conteúdo, ou regista a fonte como não lida.

Para manter a base partilhada, trabalha numa cópia git deste repositório (`gh repo clone ClaudioBap/dictionary-skills`) e não na cópia instalada. Quem só instalou as skills corre-a em **modo local**: percorre as mesmas fontes da base partilhada, mas guarda as novidades no conhecimento pessoal, sem alterar a cópia instalada (que o `npx skills update` substituiria).

Ao abrir, a `start-project-with-trust` mostra a data da última atualização da base partilhada e a do conhecimento local. Se a mais recente tiver mais de 3 meses, pergunta se queres correr `/update-knowledge` antes de começar, avisando que as novidades ficam no teu conhecimento local e que a atualização gasta tokens.

## Instalação

Requisitos:

- [Node.js](https://nodejs.org) 22.20 ou superior. É o que o instalador `skills` exige.
- Git.
- Um agente compatível com skills, por exemplo Claude Code, Codex, Cursor ou GitHub Copilot.

Todas as skills da coleção, com um só comando:

```bash
npx skills@latest add ClaudioBap/dictionary-skills --skill '*'
```

As skills que se juntarem à coleção entram neste comando sem mudar nada. Para instalar só uma, troca `'*'` pelo nome, por exemplo `--skill start-project-with-trust`.

- Sem opções, a skill fica instalada no projeto atual e só aparece nas sessões abertas nessa pasta. Para a teres em todos os projetos, junta `-g`.
- O instalador deteta os agentes que tens. Para escolher um diretamente, junta `-a claude-code` (ou outro agente).
- A base de conhecimento (`knowledge/`) é instalada com a skill. Não há passos extra.
- No Windows, se o PowerShell não encontrar o `npx` ou bloquear scripts, usa `npx.cmd` e confirma que a pasta do Node.js está no PATH.

## Utilização

No agente, pede para arrancar um projeto, ou invoca a skill pelo nome:

```
/start-project-with-trust <nome-do-projeto>
```

Podes responder às perguntas uma a uma, ou dar logo no primeiro pedido o que já sabes do projeto: a skill marca como respondidas as perguntas que o teu texto já cobre e só pergunta o que falta.

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

  Com `--entrega`, verifica também a entrega: cada ação `feito` e com prova `✓`, a publicação verificada, `acessos.md` sem segredos e a aceitação com nome e data.
- **Verificador da publicação** (`scripts/verificar-publicacao.mjs`): confirma HTTP→HTTPS, certificado válido, TLS 1.2 ou superior, cabeçalhos de segurança e que a área de administração não abre sem login.
  ```bash
  node .claude/skills/start-project-with-trust/scripts/verificar-publicacao.mjs https://<domínio> --admin admin
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

## Contribuir

Fontes novas, correções ao conhecimento e melhorias às skills são bem-vindas. As regras (fonte oficial, data, confiança) estão em [CONTRIBUTING.md](CONTRIBUTING.md), e há modelos de issue para cada caso. Falhas de segurança nos scripts ou nos hooks reportam-se em privado, como explicado em [SECURITY.md](SECURITY.md).

## Estrutura

```
skills/start-project-with-trust/
├── SKILL.md        instruções das fases e do goal-loop
├── PERGUNTAS.md    lista fixa de perguntas obrigatórias
├── modelos/        esqueletos dos documentos
├── scripts/        verificadores (plano, entrega, publicação) e hooks do goal-loop
└── knowledge/      base de conhecimento (INDEX.md, FONTES.md, CHANGELOG.md, PENDENTES.md, e um ATUALIZACOES.md e um ATUALIZACOES-ARQUIVO.md por secção)
skills/orchestrate-sessions/
├── SKILL.md            tarefas, número de sessões, agentes, briefings, execução e recolha
├── catalogo.md         mini skills e as secções de knowledge/ que cada uma usa
├── modelo-e-effort.md  modelo e effort por tipo de tarefa, e quando subir de nível
└── modelos/            sessoes.md e briefing.md
skills/ia-aplicada/
└── SKILL.md        pergunta o que se vai fazer com IA, lê só essa subpasta de knowledge/ia/ e vai às fontes quando falta
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

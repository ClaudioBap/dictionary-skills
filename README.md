# StartProjectWithTrust

Skill para arrancar projetos com clientes. Conduz uma descoberta guiada, uma pergunta de cada vez, cruza as necessidades com uma base de conhecimento de boas práticas e produz um plano e um plano custo-benefício. Só termina quando todas as perguntas estão respondidas e o utilizador confirma (goal-loop).

## Requisitos

- [Node.js](https://nodejs.org) 22.20 ou superior. É o que o instalador `skills` exige.
- Git.
- Um agente compatível com skills, por exemplo Claude Code, Codex, Cursor ou GitHub Copilot.

## Instalação

```bash
npx skills@latest add ClaudioBap/start-project-with-trust --skill start-project-with-trust
```

O repositório é privado: para instalar, precisas de acesso a ele no GitHub, e de ter sessão iniciada no git ou no GitHub CLI (`gh auth login`).

O instalador deteta os agentes que tens. Para escolher um diretamente, junta `-a claude-code` (ou outro agente). Para instalar para o teu utilizador em vez de no projeto atual, junta `-g`.

A base de conhecimento (`knowledge/`) é instalada com a skill. Não há passos extra.

## Utilização

No agente, pede para arrancar um projeto, ou invoca a skill pelo nome:

```
/start-project-with-trust <nome-do-projeto>
```

A skill trabalha na pasta `arranque/<nome-do-projeto>/` e cria lá quatro documentos:

| Ficheiro | Conteúdo |
|----------|----------|
| `objetivo.md` | Estado do goal-loop: perguntas, respostas, pressupostos e confirmação final |
| `necessidades.md` | Fase 1: resumo das necessidades, para validação |
| `plano.md` | Fase 2: plano feito só com os recursos disponíveis, com base em `knowledge/` |
| `custo-beneficio.md` | Fase 3: opções com custo e benefício, orquestrador e sessões |

Se interromperes, voltar a chamar a skill para o mesmo projeto retoma onde ficou.

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
- **Hooks do Claude Code**, que a skill propõe instalar no projeto na primeira execução (configuração em `scripts/hooks-settings.json`):

  | Hook | Evento | O que faz |
  |---|---|---|
  | Guarda (`guarda-hook.mjs`) | PreToolUse | Bloqueia marcar o arranque como `Concluído` enquanto o verificador falhar. |
  | Rastreabilidade (`rastreabilidade-hook.mjs`) | PostToolUse | Depois de cada escrita no plano ou no custo-benefício, devolve ao agente as decisões sem ligação a um pedido, para as reabrir no goal-loop. |
  | Verificador semântico (`type: "agent"`) | PostToolUse | Um modelo lê o `objetivo.md` e confirma que cada decisão responde de facto ao que foi pedido e não contradiz restrições. Se não, devolve ao agente a lista de pontos para reabrir. É uma funcionalidade experimental do Claude Code e gasta tokens a cada edição. |

**Limites:**
- A guarda garante que a confirmação final está registada, mas não consegue provar quem a deu. Essa regra («o agente nunca responde pelo utilizador») está nas instruções da skill.
- O verificador semântico é um julgamento de um modelo, não uma verificação determinística.

## Atualizar

```bash
npx skills@latest update start-project-with-trust
```

## Estrutura

```
skills/start-project-with-trust/
├── SKILL.md        instruções das fases e do goal-loop
├── PERGUNTAS.md    lista fixa de perguntas obrigatórias
├── modelos/        esqueletos dos quatro documentos
├── scripts/        verificador e guarda do goal-loop
└── knowledge/      base de conhecimento (comece por knowledge/INDEX.md)
```

O conteúdo de `knowledge/` foi extraído do PDF «Dicionário de Boas Práticas e Possibilidades» (Cláudio Baptista, BSO Consulting, 2026-11-03). Cada ficheiro indica a página de origem.

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
└── knowledge/      base de conhecimento (comece por knowledge/INDEX.md)
```

O conteúdo de `knowledge/` foi extraído do PDF «Dicionário de Boas Práticas e Possibilidades» (Cláudio Baptista, BSO Consulting, 2026-11-03). Cada ficheiro indica a página de origem.

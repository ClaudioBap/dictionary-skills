# StartProjectWithTrust

Skill para arrancar projetos com clientes. Conduz uma descoberta guiada, uma pergunta de cada vez, cruza as necessidades com uma base de conhecimento de boas práticas e produz um plano e um plano custo-benefício. O goal-loop passa pelo marco «Plano aprovado» (todas as perguntas respondidas e o utilizador confirma), executa o plano e só termina com a entrega verificada: cada critério de sucesso com prova, publicação e acessos verificados, e a entrega aceite pelo utilizador.

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

A skill trabalha na pasta `arranque/<nome-do-projeto>/` e cria lá estes documentos:

| Ficheiro | Conteúdo |
|----------|----------|
| `objetivo.md` | Estado do goal-loop: perguntas, respostas, pressupostos e confirmação final |
| `necessidades.md` | Fase 1: resumo das necessidades, para validação |
| `plano.md` | Fase 2: plano feito só com os recursos disponíveis, com base em `knowledge/` |
| `custo-beneficio.md` | Fase 3: opções com custo e benefício, orquestrador e sessões |
| `acessos.md` | Inventário dos acessos SSH/RDP (P15), sem segredos; só se houver acessos remotos |
| `entrega.md` | Fases 4 e 5: execução de cada ação, prova de cada critério, publicação, acessos e aceitação |

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

## Atualizar

```bash
npx skills@latest update start-project-with-trust
```

## Atualizar o conhecimento (skill `update-knowledge`)

A segunda skill deste repositório mantém o conhecimento atualizado. Nunca corre sozinha: só quando alguém a chama com `/update-knowledge`.

1. percorre as fontes aprovadas em [`knowledge/FONTES.md`](skills/start-project-with-trust/knowledge/FONTES.md), incluindo a secção «A vigiar»;
2. encontra as novidades, cada uma com a data de lançamento e um nível de confiança (alta, média ou baixa);
3. propõe cada alteração com antes e depois, e **pede aprovação uma a uma**;
4. regista cada alteração aprovada em [`knowledge/CHANGELOG.md`](skills/start-project-with-trust/knowledge/CHANGELOG.md) e as notícias em [`noticias/noticias.json`](noticias/README.md), que é o que o site lê;
5. com a tua autorização, faz commit e push. Quem tem a skill instalada recebe o conhecimento novo no próximo `npx skills update`.

Trabalha numa cópia git deste repositório (`gh repo clone ClaudioBap/start-project-with-trust`) e não na cópia instalada:

```bash
npx skills@latest add ClaudioBap/start-project-with-trust --skill update-knowledge
```

Não contorna sites que bloqueiam o acesso automático. Nesses casos, pede-te que abras a página e coles o conteúdo.

## Estrutura

```
skills/start-project-with-trust/
├── SKILL.md        instruções das fases e do goal-loop
├── PERGUNTAS.md    lista fixa de perguntas obrigatórias
├── modelos/        esqueletos dos documentos
├── scripts/        verificadores (plano, entrega, publicação) e hooks do goal-loop
└── knowledge/      base de conhecimento (INDEX.md, FONTES.md, CHANGELOG.md)
skills/update-knowledge/
├── SKILL.md        procura de novidades, aprovação uma a uma, publicação
└── scripts/        indice.mjs, verificar-alteracoes.mjs, novidades-rss.mjs
noticias/
└── noticias.json   dados do site de notícias (formato em noticias/README.md)
```

O conteúdo de `knowledge/` foi extraído do PDF «Dicionário de Boas Práticas e Possibilidades» (Cláudio Baptista, BSO Consulting, 2026-11-03). Cada ficheiro indica a página de origem.

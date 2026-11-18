# Dictionary Skills

[Versão em português](README.md)

A collection of my skills for coding agents (Claude Code, Codex, Cursor, GitHub Copilot), backed by a knowledge base of good practices that is kept up to date from official sources. There are currently three main skills and fourteen mini skills:

- **`start-project-with-trust`** takes a client project from the first conversation to a verified delivery: guided discovery, plan, cost-benefit plan, execution and verification with evidence. It does not finish until every success criterion has evidence and the client accepts the delivery.
- **`orchestrate-sessions`** splits a piece of work across several Claude sessions running in parallel, each with its own mini skill. It asks how many sessions you want and where to use subagents, and gives each task the cheapest model and effort that can do it. `start-project-with-trust` uses it in Phases 3 and 4.
- **Mini skills**, one per topic, used on their own or in sessions launched by `orchestrate-sessions`: `design-ux`, `design-3d-motion`, `seguranca`, `performance-verifier`, `backend-dados`, `infra-deploy`, `boas-praticas-codigo`, `ia-aplicada`, `produtizar`, `operar`, `gravacao-video` (in development), `humanizar`, `portal-de-agentes` and `documentacao`. Each asks what the work is, reads only the relevant part of the knowledge and, if the library has no answer, goes to the official sources and records what it found. After the «Specific or modular» decision, `produtizar` turns what was built for one case into a reusable core. `humanizar` checks everything about to be delivered for AI tells (text, code, interface, commits) and only fixes with permission. `portal-de-agentes` guides building a portal where a team follows its AI agents (one world per audience, accounts, questions answered remotely, scores for the skills), using the method in the «Portais e mundos de agentes» section. `documentacao` is linked to all the others: each skill writes a report of its process, and from those it generates an Excel workbook of processes and statistics, the Word document «Entendimento do desenvolvimento» and the final report, in the house style when given sample files.
- **`update-knowledge`** keeps the knowledge current: it goes through the official sources, finds what changed and applies it according to its confidence level. When a practice is replaced by a better one, it rewrites the entry, keeps the previous text in «Histórico» and updates the skills that used it.

The skills and the knowledge base are written in Portuguese (Portugal).

## What is in this repository

| Part | What it is | For whom |
|---|---|---|
| [`skills/start-project-with-trust/`](skills/start-project-with-trust/SKILL.md) | The skill that starts and runs projects | People who build projects for clients (consultants, development teams) |
| [`knowledge/`](knowledge/INDEX.md) | 356 good-practice entries in 26 sections, each with its source | Used by the skill; can also be read directly |
| [`skills/orchestrate-sessions/`](skills/orchestrate-sessions/SKILL.md) | The skill that spreads work across sessions, with a model and effort per task | Whoever runs work with several sessions in parallel |
| `skills/<mini skill>/` | The fourteen mini skills, one per topic (see the [catalogue](skills/orchestrate-sessions/catalogo.md)) | Whoever runs a task on one topic, alone or in an orchestrated session |
| [`skills/update-knowledge/`](skills/update-knowledge/SKILL.md) | The skill that updates the knowledge | Whoever maintains the base (and each user, for their personal knowledge) |

## start-project-with-trust

It always runs a project in the same order, and each phase only moves on once the user validates it:

1. **Discovery.** One question at a time, with options ordered from cheapest to most expensive and a recommendation. There are 16 mandatory questions (what, why, how success is measured, for whom, scope, deadline, budget, resources, constraints, data and GDPR, risks, who decides, publishing, remote access, reuse). Vague answers get follow-up questions until they are verifiable.
2. **Plan with what we have.** It matches the needs against the knowledge base and only uses the resources the client declared. Before proposing code, it looks for an open source platform that already solves the need.
3. **Cost-benefit plan.** Options with cost and benefit, and how the work is split between an orchestrator and sessions.
4. **Goal loop.** It keeps asking until nothing is left open. It ends at the «Plano aprovado» (plan approved) milestone.
5. **Execution.** It carries out each action in the plan.
6. **Verification with evidence.** It proves each success criterion, the publishing (HTTPS, certificate, headers, protected admin area) and the access setup, until the client accepts the delivery.

What sets it apart:

- **It does not make things up.** Every practice in the plan cites the knowledge base file or the official source it came from.
- **It goes to the sources when it does not know.** If a need is not covered by the base, it looks for primary official sources, records them in the user's personal knowledge and only then plans.
- **Traceability.** Every action and decision states which client question it answers; anything that answers no request does not go into the plan.
- **Automatic checkers and hooks** that prevent marking the plan or the delivery as done while there are failures (see [How the goal loop is enforced](#how-the-goal-loop-is-enforced)).
- **Writing without AI tells** in everything delivered: code, interface, documentation and commits.
- **Autonomy after the decision.** A decision by the user is carried through to the end; only the values they must provide (secrets, identifiers, URLs) go on a «Por preencher» (to fill in) list, never with real values, and the rest continues.

### What it creates

The skill works in the `arranque/<project-name>/` folder:

| File | Contents |
|------|----------|
| `objetivo.md` | Goal loop state: questions, answers, assumptions and final confirmation |
| `necessidades.md` | Phase 1: summary of the needs, for validation |
| `plano.md` | Phase 2: plan built only with the available resources, based on `knowledge/` |
| `custo-beneficio.md` | Phase 3: options with cost and benefit, orchestrator and sessions |
| `acessos.md` | Inventory of SSH/RDP access (question P15), without secrets; only if there is remote access |
| `entrega.md` | Phases 4 and 5: execution of each action, evidence for each criterion, publishing, access, operations (for whoever will run it), values to fill in and acceptance |

If you stop, calling the skill again for the same project resumes where it left off.

### Personal knowledge

Each user has personal knowledge in `~/.start-project-with-trust/` (on Windows, `%USERPROFILE%\.start-project-with-trust\`), outside the skill folder so that updates do not erase it. It holds the profile of the kinds of work the person does and the official sources the skill fetched for their projects. `update-knowledge` keeps it current. It always stays on the user's machine: it never goes to this repository.

## Knowledge base

356 entries in 26 sections. Most were extracted from the PDF «Dicionário de Boas Práticas e Possibilidades» (Cláudio Baptista, BSO Consulting, 2026-11-03), with the source page in each file; the sections marked «outside the PDF» were written from official sources. Each entry has a summary, the content, a «Para uma skill» line with the criterion to check, and the official sources that back it.

| Section | Entries | Section | Entries |
|---|---|---|---|
| [Security](knowledge/seguranca/README.md) | 25 | [Structure and documentation](knowledge/estrutura/README.md) | 17 |
| [Privacy and compliance](knowledge/privacidade/README.md) | 4 | [CI/CD and tools](knowledge/cicd/README.md) | 24 |
| [Reliability and resilience](knowledge/fiabilidade/README.md) | 10 | [Docker and orchestration](knowledge/docker/README.md) | 14 |
| [Design and user experience](knowledge/design/README.md) | 28 | [Infrastructure services](knowledge/infraestrutura/README.md) | 10 |
| [3D, WebGL and animation](knowledge/3d-webgl/README.md) | 10 | [Digital sovereignty](knowledge/soberania/README.md) | 6 |
| [SEO and discovery](knowledge/seo/README.md) | 2 | [Governance and process](knowledge/governacao/README.md) | 7 |
| [API design](knowledge/api/README.md) | 6 | [Cloud and identity](knowledge/nuvem/README.md) | 7 |
| [Databases](knowledge/base-de-dados/README.md) | 14 | [Sessions, orchestration and cost efficiency](knowledge/custo/README.md) | 8 |
| [Python](knowledge/python/README.md) | 13 | [Web publishing and hosting](knowledge/publicacao/README.md) (outside the PDF) | 9 |
| [Java](knowledge/java/README.md) | 13 | [Building with AI](knowledge/ia/README.md) | 61 |
| [C#](knowledge/csharp/README.md) | 13 | [Remote access (SSH and RDP)](knowledge/acesso-remoto/README.md) (outside the PDF) | 4 |
| [JavaScript](knowledge/javascript/README.md) (outside the PDF) | 14 | [Platforms to adopt before building](knowledge/plataformas/README.md) (outside the PDF) | 15 |
| [Node.js](knowledge/node/README.md) (outside the PDF) | 14 | [Modularisation and productisation](knowledge/produto/README.md) (outside the PDF) | 7 |
| [Agent portals and worlds](knowledge/portais-de-agentes/README.md) (outside the PDF) | 9 | | |

Reference files:

- [`INDEX.md`](knowledge/INDEX.md): every entry, by section.
- [`FONTES.md`](knowledge/FONTES.md): the official sources for each section and the «A vigiar» (watch) list: deadlines and limits checked on every update, such as TLS certificate lifetimes or free hosting plans.
- `<section>/ATUALIZACOES.md`: each section's updates that do not change the text of any entry, by category and date. When an update changes what an entry says, the entry is rewritten and the previous text moves to its «Histórico» (history) section. Lines added more than a year ago move to `ATUALIZACOES-ARQUIVO.md`, without being deleted.
- [`CHANGELOG.md`](knowledge/CHANGELOG.md): every change, with source, release date, confidence and who approved it.

## update-knowledge

It keeps the knowledge base and the personal knowledge up to date. It only runs when someone calls it with `/update-knowledge` (for one topic, for example `/update-knowledge ia`, or `/update-knowledge pessoal` for the personal knowledge only).

1. It goes through the sources in [`FONTES.md`](knowledge/FONTES.md) and always checks the «A vigiar» points. It uses RSS feeds and public APIs where they exist, to keep costs low.
2. It gives each change the release date stated by the source and a confidence level, and applies it according to that level:

   | Confidence | When | What happens |
   |---|---|---|
   | High | Primary official source, read directly, with a date | If it changes what an entry says, the entry is rewritten and the previous text kept in «Histórico»; otherwise it goes into the section's `ATUALIZACOES.md` |
   | Medium | Official source but indirect, partly read or undated | Goes in like a high one, marked «Confiança: media»; it only comes out if you ask for it |
   | Low | Unofficial source | Never changes the knowledge |

   New entries, new sources and edits backed only by medium-confidence sources always require approval, one at a time. After editing an entry, it also updates the skills that used the old value.
3. It records each change in `CHANGELOG.md`, with source, release date, confidence and who approved it.
4. It runs the checkers and, with your permission, commits and pushes. Anyone reading the base from `~/.dictionary-skills` gets the new knowledge with `conhecimento.mjs --atualizar`.
5. It also updates the user's personal knowledge: high-confidence changes go in, medium-confidence changes wait for the user's decision on the next run.

It does not get around sites that block automated access: in those cases it asks you to open the page and paste the content, or records the source as unread.

To maintain the shared base, work on a git clone of this repository (`gh repo clone ClaudioBap/dictionary-skills`), not on the installed copy. If you only installed the skills, it runs in **local mode**: it goes through the same sources as the shared base, but stores the changes in your personal knowledge without touching the installed copy (which `npx skills update` would replace).

When it opens, `start-project-with-trust` shows the date of the last shared-base update and of your local knowledge. If the more recent one is over 3 months old, it asks whether you want to run `/update-knowledge` before starting, noting that the changes stay in your local knowledge and that the update uses tokens.

## Installation

Requirements:

- [Node.js](https://nodejs.org) 22.20 or later, as required by the `skills` installer.
- Git.
- An agent that supports skills, for example Claude Code, Codex, Cursor or GitHub Copilot.

Every skill in the collection, with a single command:

```bash
npx skills@latest add ClaudioBap/dictionary-skills --skill '*'
```

Skills added to the collection later are picked up by the same command. To install just one, replace `'*'` with its name, for example `--skill start-project-with-trust`.

- Without options, the skill is installed in the current project and only shows up in sessions opened in that folder. To have it in every project, add `-g`.
- The installer detects the agents you have. To pick one directly, add `-a claude-code` (or another agent).
- The knowledge base (`knowledge/`) lives at the repository root and is not shipped inside the skills. The first time a skill looks for it, `skills/start-project-with-trust/scripts/conhecimento.mjs` clones the repository into `~/.dictionary-skills` (Git required) and the skills read it from there. To update it, run `node skills/start-project-with-trust/scripts/conhecimento.mjs --atualizar`. If you already have a clone, point to it with the `DICTIONARY_SKILLS_KNOWLEDGE` variable or the `repositorio` field of `~/.start-project-with-trust/config.json`.
- On Windows, if PowerShell cannot find `npx` or blocks scripts, use `npx.cmd` and make sure the Node.js folder is in your PATH.

## Usage

In the agent, ask to start a project, or call the skill by name:

```
/start-project-with-trust <project-name>
```

You can answer the questions one by one, or give everything you already know about the project in the first request: the skill marks as answered the questions your text already covers and only asks what is missing.

To update the knowledge:

```
/update-knowledge            all topics
/update-knowledge ia         one topic only
/update-knowledge pessoal    personal knowledge only
```

## How the goal loop is enforced

- **Checker** (`scripts/verificar.mjs`, Node, no dependencies). It fails while there are:
  - open questions;
  - fields marked «por definir» (to be defined);
  - unchecked validations;
  - a final confirmation without a name and date.

  The skill must run it and show the output before finishing. You can also run it yourself:
  ```bash
  node .claude/skills/start-project-with-trust/scripts/verificar.mjs arranque/<project>
  ```
  It includes **traceability**:
  - every plan action, every decision and the orchestrator state in «Responde a» which user questions (P/S) they answer, and those questions must exist and be closed;
  - every mandatory question has at least one action or decision that answers it.

  With `--entrega`, it also checks the delivery: each action `feito` (done) with evidence `✓`, publishing verified, operations documented with evidence, `acessos.md` and «Por preencher» without secrets, and acceptance with a name and date.
- **Publishing checker** (`scripts/verificar-publicacao.mjs`): confirms HTTP→HTTPS, a valid certificate, TLS 1.2 or later, security headers and that the admin area does not open without login.
  ```bash
  node .claude/skills/start-project-with-trust/scripts/verificar-publicacao.mjs https://<domain> --admin admin
  ```
- **Claude Code hooks**, which the skill offers to install in the project on its first run (configuration in `scripts/hooks-settings.json`):

  | Hook | Event | What it does |
  |---|---|---|
  | Guard (`guarda-hook.mjs`) | PreToolUse | Blocks setting `Plano aprovado` (and phases 4 and 5) while the plan checker fails, and `Concluído` while the plan or the delivery fail. |
  | Traceability (`rastreabilidade-hook.mjs`) | PostToolUse | After each write to the plan or the cost-benefit document, returns to the agent the decisions that are not tied to a request, so they are reopened in the goal loop. |
  | Semantic checker (`type: "agent"`) | PostToolUse | A model reads `objetivo.md` and confirms each decision really answers what was asked and does not contradict constraints. If not, it returns the list of points to reopen. This is an experimental Claude Code feature and uses tokens on every edit. |

**Limits:**
- The guard ensures the final confirmation is recorded, but cannot prove who gave it. That rule («the agent never answers on behalf of the user») is in the skill's instructions.
- The semantic checker is a model's judgement, not a deterministic check.

## Updating the skills

```bash
npx skills@latest update
```

## Contributing

New sources, corrections to the knowledge and improvements to the skills are welcome. The rules (official source, date, confidence) are in [CONTRIBUTING.md](CONTRIBUTING.md), and there are issue templates for each case. Security issues in the scripts or hooks are reported privately, as explained in [SECURITY.md](SECURITY.md). Both files are in Portuguese; contributions in English are fine.

## Structure

```
skills/start-project-with-trust/
├── SKILL.md        phase and goal loop instructions
├── PERGUNTAS.md    fixed list of mandatory questions
├── modelos/        document templates
└── scripts/        checkers (plan, delivery, publishing), conhecimento.mjs (path of the base) and goal loop hooks
knowledge/          knowledge base (INDEX.md, FONTES.md, CHANGELOG.md, and one ATUALIZACOES.md and one ATUALIZACOES-ARQUIVO.md per section)
skills/orchestrate-sessions/
├── SKILL.md            tasks, number of sessions, agents, briefings, execution and collection
├── catalogo.md         mini skills and the knowledge/ sections each one uses
├── modelo-e-effort.md  model and effort per task type, and when to step up
├── modelos/            sessoes.md, briefing.md, estado.json and retoma-permissoes.json
├── modo-continuo.md    work to the end, wait for the usage-limit reset and resume
└── scripts/            estado-uso.mjs (status line that records plan usage), retomar.mjs, retomar.vbs and agendar-retoma.mjs (scheduled resume)
skills/<mini skill>/          design-ux, design-3d-motion, seguranca, performance-verifier, backend-dados, infra-deploy,
│                             boas-praticas-codigo, ia-aplicada, produtizar, operar, gravacao-video, humanizar,
│                             portal-de-agentes, documentacao
└── SKILL.md        the topic process: asks what the work is, reads only that part of knowledge/ and goes to the sources when something is missing
skills/documentacao/
├── SKILL.md        «processo» and «gerar» modes, house style and checks
├── modelos/        processo.md, entendimento.md and relatorio-final.md
└── scripts/        padrao.mjs (style from sample files), gerar.mjs (Excel and Word) and verificar.mjs
skills/update-knowledge/
├── SKILL.md        finding updates, confidence flow, publishing and personal knowledge
├── fontes-verificadas.json   date each source was last checked
└── scripts/        indice.mjs, verificar-alteracoes.mjs, novidades-rss.mjs

~/.start-project-with-trust/   each user's personal knowledge (outside the repository)
├── perfil.md       kinds of work
├── FONTES.md       personal sources
├── pendentes.md    medium-confidence changes awaiting a decision
├── CHANGELOG.md
├── fontes-verificadas.json   date of the last local update and of each source checked
└── knowledge/      entries and ATUALIZACOES.md per section
```

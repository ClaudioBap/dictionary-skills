# Dictionary Skills

[Versão em português](README.md)

A collection of my skills for coding agents (Claude Code, Codex, Cursor, GitHub Copilot), backed by a knowledge base of good practices that is kept up to date from official sources. There are currently two main skills and sixteen mini skills:

- **`orchestrate-sessions`** is where you start. It asks one question at a time until it understands what you want, then proposes a delegation plan: which skills come in and when, how much autonomy they get (which decides whether questions reach you along the way or together at the end), how many VS Code sessions to open and how many agents run in each, with the cheapest model and effort that can do each task. It then hands out the work, collects the outputs with evidence and, at the end, gives a score to each skill it used.
- **Mini skills**, one per topic, used on their own or in sessions launched by `orchestrate-sessions`: `design-ux`, `design-3d-motion`, `seguranca`, `performance-verifier`, `backend-dados`, `infra-deploy`, `boas-praticas-codigo`, `ia-aplicada`, `produtizar`, `operar`, `gravacao-video`, `humanizar`, `portal-de-agentes`, `documentacao`, `n8n` and `jarvis`. Each asks what the work is, reads only the relevant part of the knowledge and, if the library has no answer, goes to the official sources and records what it found. After the «Specific or modular» decision, `produtizar` turns what was built for one case into a reusable core. `humanizar` checks everything about to be delivered for AI tells (text, code, interface, commits) and only fixes with permission. `portal-de-agentes` is called by a parent skill when the work needs a portal where a team follows its AI agents (one world per audience, accounts, questions answered remotely, scores for the skills): it makes the decisions with the method in the «Portais e mundos de agentes» section, sketches the mock-up and hands the phased plan back to the parent skill, which splits the build. It can also recreate the original portal. `documentacao` is linked to all the others: each skill writes a report of its process, and from those it generates an Excel workbook of processes and statistics, the Word document «Entendimento do desenvolvimento» and the final report, in the house style when given sample files.
- **`update-knowledge`** keeps the knowledge current: it goes through the official sources, finds what changed and applies it according to its confidence level. When a practice is replaced by a better one, it rewrites the entry, keeps the previous text in «Histórico» and updates the skills that used it.

The skills and the knowledge base are written in Portuguese (Portugal).

## What is in this repository

| Part | What it is | For whom |
|---|---|---|
| [`skills/start-project-with-trust/`](skills/start-project-with-trust/SKILL.md) | The full version of starting projects, in testing | People who build projects for clients (consultants, development teams) and install it by name |
| [`knowledge/`](knowledge/INDEX.md) | <!-- conhecimento:inicio -->410 good-practice entries in 30 sections<!-- conhecimento:fim -->, each with its source | Used by the skill; can also be read directly |
| [`skills/orchestrate-sessions/`](skills/orchestrate-sessions/SKILL.md) | The skill you start with: it asks what you want, proposes the delegation plan and spreads the work across sessions, with a model and effort per task. It also holds the shared rules, the questions and the knowledge path | Everyone |
| `skills/<mini skill>/` | The sixteen mini skills, one per topic (see the [catalogue](skills/orchestrate-sessions/catalogo.md)) | Whoever runs a task on one topic, alone or in an orchestrated session |
| [`skills/update-knowledge/`](skills/update-knowledge/SKILL.md) | The skill that updates the knowledge | Whoever maintains the base (and each user, for their personal knowledge) |

## start-project-with-trust

It is in testing and installed separately (see [In testing](#in-testing)). It always runs a project in the same order, and each phase only moves on once the user validates it:

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

## Knowledge base

<!-- conhecimento:inicio -->
410 entries in 30 sections. Most were extracted from the PDF «Dicionário de Boas Práticas e Possibilidades» (Cláudio Baptista, BSO Consulting, 2026-11-03), with the source page in each file; the sections marked «outside the PDF» were written from official sources. Each entry has a summary, the content, a «Para uma skill» line with the criterion to check, and the official sources that back it.

| Section | Entries | Section | Entries |
|---|---|---|---|
| [Security](knowledge/seguranca/README.md) | 32 | [Structure and documentation](knowledge/estrutura/README.md) | 17 |
| [Privacy and compliance](knowledge/privacidade/README.md) | 4 | [CI/CD and tools](knowledge/cicd/README.md) | 24 |
| [Reliability and resilience](knowledge/fiabilidade/README.md) | 10 | [Docker and orchestration](knowledge/docker/README.md) | 14 |
| [Design and user experience](knowledge/design/README.md) | 31 | [Infrastructure services](knowledge/infraestrutura/README.md) | 10 |
| [3D, WebGL and animation](knowledge/3d-webgl/README.md) | 11 | [Digital sovereignty](knowledge/soberania/README.md) | 6 |
| [SEO and discovery](knowledge/seo/README.md) | 2 | [Governance and process](knowledge/governacao/README.md) | 7 |
| [API design](knowledge/api/README.md) | 6 | [Cloud and identity](knowledge/nuvem/README.md) | 8 |
| [Databases](knowledge/base-de-dados/README.md) | 18 | [Sessions, orchestration and cost efficiency](knowledge/custo/README.md) | 8 |
| [Python](knowledge/python/README.md) | 13 | [Web publishing and hosting](knowledge/publicacao/README.md) (outside the PDF) | 10 |
| [Java](knowledge/java/README.md) | 13 | [Building with AI](knowledge/ia/README.md) | 67 |
| [C#](knowledge/csharp/README.md) | 13 | [Remote access (SSH and RDP)](knowledge/acesso-remoto/README.md) (outside the PDF) | 4 |
| [JavaScript](knowledge/javascript/README.md) (outside the PDF) | 14 | [Platforms to adopt before building](knowledge/plataformas/README.md) (outside the PDF) | 15 |
| [Node.js](knowledge/node/README.md) (outside the PDF) | 14 | [Modularisation and productisation](knowledge/produto/README.md) (outside the PDF) | 10 |
| [Agent portals and worlds](knowledge/portais-de-agentes/README.md) (outside the PDF) | 9 | [n8n](knowledge/n8n/README.md) (outside the PDF) | 5 |
| [Open source Jarvis (OpenJarvis and Microsoft JARVIS)](knowledge/jarvis/README.md) (outside the PDF) | 3 | [Rust](knowledge/rust/README.md) (outside the PDF) | 12 |
<!-- conhecimento:fim -->

Reference files:

- [`INDEX.md`](knowledge/INDEX.md): every entry, by section.
- [`FONTES.md`](knowledge/FONTES.md): the official sources for each section and the «A vigiar» (watch) list: deadlines and limits checked on every update, such as TLS certificate lifetimes or free hosting plans.
- `<section>/ATUALIZACOES.md`: each section's updates that do not change the text of any entry, by category and date. When an update changes what an entry says, the entry is rewritten and the previous text moves to its «Histórico» (history) section. Lines added more than a year ago move to `ATUALIZACOES-ARQUIVO.md`, without being deleted.
- [`CHANGELOG.md`](knowledge/CHANGELOG.md): every change, with source, release date, confidence and who approved it.

### Personal knowledge

Each user has personal knowledge in `~/.start-project-with-trust/` (on Windows, `%USERPROFILE%\.start-project-with-trust\`), outside the skills folder so that updates do not erase it. It holds the profile of the kinds of work the person does and the official sources the skills fetched for their projects. `update-knowledge` keeps it current. It always stays on the user's machine: it never goes to this repository.

## update-knowledge

It keeps the knowledge base and the personal knowledge up to date. It only runs when someone calls it with `/update-knowledge` (for one topic, for example `/update-knowledge ia`, or `/update-knowledge pessoal` for the personal knowledge only).

1. It goes through the sources in [`FONTES.md`](knowledge/FONTES.md) and always checks the «A vigiar» points. It uses RSS feeds and public APIs where they exist, to keep costs low.
2. It gives each change the release date stated by the source and a confidence level, and applies it according to that level:

   | Confidence | When | What happens |
   |---|---|---|
   | High | Primary official source, read directly, with a date | If it changes what an entry says, the entry is rewritten and the previous text kept in «Histórico»; otherwise it goes into the section's `ATUALIZACOES.md` |
   | Medium | Official source but indirect, partly read or undated | Goes in like a high one, marked «Confiança: media»; it only comes out if you ask for it |
   | Low | Unofficial source | Never changes the knowledge |

   New entries and new sources always require approval, one at a time, whatever their confidence. After editing an entry, it also updates the skills that used the old value.
3. It records each change in `CHANGELOG.md`, with source, release date, confidence and who approved it.
4. It runs the checkers and publishes without asking, with a commit and push to `main`. Anyone reading the base from `~/.dictionary-skills` gets the new knowledge with `conhecimento.mjs --atualizar`.
5. It also updates the user's personal knowledge: high-confidence changes go in, medium-confidence changes wait for the user's decision on the next run.

It does not get around sites that block automated access: in those cases it asks you to open the page and paste the content, or records the source as unread.

To maintain the shared base, work on a git clone of this repository (`gh repo clone ClaudioBap/dictionary-skills`), not on the installed copy. If you only installed the skills, it runs in **local mode**: it goes through the same sources as the shared base, but stores the changes in your personal knowledge without touching the installed copy (which `npx skills update` would replace).

When it opens, `orchestrate-sessions` shows the date of the last shared-base update and of your local knowledge. If the more recent one is over 3 months old, it asks whether you want to run `/update-knowledge` before starting, noting that the changes stay in your local knowledge and that the update uses tokens.

## Installation

Requirements:

- [Node.js](https://nodejs.org) 22.20 or later, as required by the `skills` installer.
- Git.
- An agent that supports skills, for example Claude Code, Codex, Cursor or GitHub Copilot.

Every skill in the collection, with a single command:

```bash
npx skills@latest add ClaudioBap/dictionary-skills --skill '*'
```

Skills added to the collection later are picked up by the same command, except those in testing (see [In testing](#in-testing)). Once installed, you start with `orchestrate-sessions` (see [Usage](#usage)).

To install a single mini skill, add `orchestrate-sessions`, `update-knowledge` and `humanizar`, which they all need: the first holds the path to the knowledge base, the shared rules and the questions, the second keeps the knowledge current and the third checks what is delivered. For example:

```bash
npx skills@latest add ClaudioBap/dictionary-skills --skill seguranca --skill orchestrate-sessions --skill update-knowledge --skill humanizar
```

- Without options, the skill is installed in the current project and only shows up in sessions opened in that folder. To have it in every project, add `-g`.
- The installer detects the agents you have. To pick one directly, add `-a claude-code` (or another agent).
- The knowledge base (`knowledge/`) lives at the repository root and is not shipped inside the skills. The first time a skill looks for it, `skills/orchestrate-sessions/scripts/conhecimento.mjs` clones the repository into `~/.dictionary-skills` (Git required) and the skills read it from there. To update it, run `node skills/orchestrate-sessions/scripts/conhecimento.mjs --atualizar`. If you already have a clone, point to it with the `DICTIONARY_SKILLS_KNOWLEDGE` variable or the `repositorio` field of `~/.start-project-with-trust/config.json`.
- On Windows, if PowerShell cannot find `npx` or blocks scripts, use `npx.cmd` and make sure the Node.js folder is in your PATH.

## Usage

In the agent, start with `orchestrate-sessions`, with what you want to do or with nothing:

```
/orchestrate-sessions <what you want to do>
```

It asks one question at a time until it understands what you want, and proposes the delegation plan before starting. You can give what you already know in the first request, and it only asks what is missing.

A mini skill can also be called on its own, for example `/seguranca`. With a vague request or none, it first asks what you want and says when part of it belongs to another skill.

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
- **Publishing checker** (`scripts/verificar-publicacao.mjs`, in `orchestrate-sessions`): confirms the redirect from HTTP to HTTPS, a valid certificate, TLS 1.2 or later, security headers and that the admin area does not open without login.
  ```bash
  node .claude/skills/orchestrate-sessions/scripts/verificar-publicacao.mjs https://<domain> --admin admin
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

## Parent skills and sub skills

Each skill states in the `metadata` of its `SKILL.md`:

- `tipo`: `mãe` (parent) leads the others and splits the work among them; `sub` does one part of the work, on its own or called by a parent skill;
- `usa`: the skills it asks for parts of the work (`[]` if none; `todas` only in a parent that can use any of them);
- `impacto`: from 0 to 10, how useful it is for work in each area. 10 is the skill to use, 7 is a large part of the work, 4 to 6 helps in some cases, 1 to 3 is in passing and 0 does not help.

The cases where each skill is used are in its `EXEMPLOS.md`, under «Quando usar», and the description says whether it is a parent or a sub skill. A new skill brings all of this: `node skills/update-knowledge/scripts/catalogo-skills.mjs .` checks it and writes the table of every skill in the [Portuguese README](README.md#skills-mãe-e-sub-skills), which is the only copy, so it never goes out of date.

## State of each skill

Each `SKILL.md` states its state in `metadata.estado`:

- `produção`: it is ready. The Central Industry of Development portal takes it to the connected computers, without installing it.
- `testes`: it is being tried out.
- `demo`: it is only for showing.

Skills in `testes` and `demo` do not go to the computers, and those with `metadata.internal` do not appear in the knowledge warehouse either. A skill without a state counts as `testes`. To change the state, change that line.

Today, `correction-loop` and `start-project-with-trust` are in testing. The others are in production.

## In testing

`skills/correction-loop/` is a skill in testing and is not installed with `--skill '*'`: the `metadata.internal` field of its `SKILL.md` leaves it out. It was a test to improve performance, looking for faster answers to problems: from little more than «it is giving an error», find how to reproduce the error, locate the cause with search methods chosen by the available signal and deliver the best fix, proven.

In the trials, on an error with a failing test, a simple prompt reached the same fix in less than half the time and for about half the cost. The results are in [`medicao.md`](skills/correction-loop/medicao.md). The owner decided to close it on 2026-11-25, with no further investment. It only counts again if it beats a simple prompt in a case where locating by bisection (testing versions from the middle of the history) makes a difference, such as a regression with no test that points to the cause. Whoever wants to try it installs it by name:

```bash
npx skills@latest add ClaudioBap/dictionary-skills --skill correction-loop
```

`skills/start-project-with-trust/` is in testing and is not installed with `--skill '*'`: the `metadata.internal` field of its `SKILL.md` leaves it out. It is the full version of starting a client project, with the goal loop up to «Plano aprovado», the checkers and the hooks (see [start-project-with-trust](#start-project-with-trust) and [How the goal loop is enforced](#how-the-goal-loop-is-enforced)). It uses the rules, the questions and the knowledge path from `orchestrate-sessions`, so it is installed after the collection. It takes two commands, because the installer only brings a skill in testing when it is requested by name, without `'*'` in the same request:

```bash
npx skills@latest add ClaudioBap/dictionary-skills --skill '*'
npx skills@latest add ClaudioBap/dictionary-skills --skill start-project-with-trust
```

Then call it with `/start-project-with-trust <project-name>`.

## Contributing

New sources, corrections to the knowledge and improvements to the skills are welcome. The rules (official source, date, confidence) are in [CONTRIBUTING.md](CONTRIBUTING.md), and there are issue templates for each case. Security issues in the scripts or hooks are reported privately, as explained in [SECURITY.md](SECURITY.md). Both files are in Portuguese; contributions in English are fine.

## Structure

```
skills/start-project-with-trust/   in testing
├── SKILL.md        phase and goal loop instructions
├── modelos/        document templates
└── scripts/        plan and delivery checkers, and goal loop hooks
knowledge/          knowledge base (INDEX.md, FONTES.md, CHANGELOG.md, and one ATUALIZACOES.md and one ATUALIZACOES-ARQUIVO.md per section)
skills/orchestrate-sessions/
├── SKILL.md            tasks, number of sessions, agents, briefings, execution and collection
├── regras.md           rules shared by every skill and the question format
├── PERGUNTAS.md        mandatory questions, P1 to P16
├── catalogo.md         mini skills and the knowledge/ sections each one uses
├── modelo-e-effort.md  model and effort per task type, and when to step up
├── modelos/            sessoes.md, briefing.md, estado.json and retoma-permissoes.json
├── modo-continuo.md    work to the end, wait for the usage-limit reset and resume
└── scripts/            conhecimento.mjs (path of the base), verificar-publicacao.mjs, estado-uso.mjs (status line that records plan usage), retomar.mjs, retomar.vbs and agendar-retoma.mjs (scheduled resume)
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

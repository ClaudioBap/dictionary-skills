# Dictionary Skills

[Versão em português](README.md)

A collection of my skills for coding agents (Claude Code, Codex, Cursor, GitHub Copilot), backed by a knowledge base of good practices that is kept up to date from official sources. There are currently two:

- **`start-project-with-trust`** takes a client project from the first conversation to a verified delivery: guided discovery, plan, cost-benefit plan, execution and verification with evidence. It does not finish until every success criterion has evidence and the client accepts the delivery.
- **`update-knowledge`** keeps the knowledge current: it goes through the official sources, finds what changed and applies it according to its confidence level.

The skills and the knowledge base are written in Portuguese (Portugal).

## What is in this repository

| Part | What it is | For whom |
|---|---|---|
| [`skills/start-project-with-trust/`](skills/start-project-with-trust/SKILL.md) | The skill that starts and runs projects | People who build projects for clients (consultants, development teams) |
| [`knowledge/`](skills/start-project-with-trust/knowledge/INDEX.md) | 285 good-practice entries in 25 sections, each with its source | Used by the skill; can also be read directly |
| [`skills/update-knowledge/`](skills/update-knowledge/SKILL.md) | The skill that updates the knowledge | Whoever maintains the base (and each user, for their personal knowledge) |

## start-project-with-trust

It always runs a project in the same order, and each phase only moves on once the user validates it:

1. **Discovery.** One question at a time, with options ordered from cheapest to most expensive and a recommendation. There are 15 mandatory questions (what, why, how success is measured, for whom, scope, deadline, budget, resources, constraints, data and GDPR, risks, who decides, publishing, remote access). Vague answers get follow-up questions until they are verifiable.
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

### What it creates

The skill works in the `arranque/<project-name>/` folder:

| File | Contents |
|------|----------|
| `objetivo.md` | Goal loop state: questions, answers, assumptions and final confirmation |
| `necessidades.md` | Phase 1: summary of the needs, for validation |
| `plano.md` | Phase 2: plan built only with the available resources, based on `knowledge/` |
| `custo-beneficio.md` | Phase 3: options with cost and benefit, orchestrator and sessions |
| `acessos.md` | Inventory of SSH/RDP access (question P15), without secrets; only if there is remote access |
| `entrega.md` | Phases 4 and 5: execution of each action, evidence for each criterion, publishing, access and acceptance |

If you stop, calling the skill again for the same project resumes where it left off.

### Personal knowledge

Each user has personal knowledge in `~/.start-project-with-trust/` (on Windows, `%USERPROFILE%\.start-project-with-trust\`), outside the skill folder so that updates do not erase it. It holds the profile of the kinds of work the person does and the official sources the skill fetched for their projects. `update-knowledge` keeps it current. It always stays on the user's machine: it never goes to this repository.

## Knowledge base

285 entries in 25 sections. Most were extracted from the PDF «Dicionário de Boas Práticas e Possibilidades» (Cláudio Baptista, BSO Consulting, 2026-11-03), with the source page in each file; the sections marked «outside the PDF» were written from official sources. Each entry has a summary, the content, a «Para uma skill» line with the criterion to check, and the official sources that back it.

| Section | Entries | Section | Entries |
|---|---|---|---|
| [Security](skills/start-project-with-trust/knowledge/seguranca/README.md) | 25 | [Structure and documentation](skills/start-project-with-trust/knowledge/estrutura/README.md) | 14 |
| [Privacy and compliance](skills/start-project-with-trust/knowledge/privacidade/README.md) | 4 | [CI/CD and tools](skills/start-project-with-trust/knowledge/cicd/README.md) | 23 |
| [Reliability and resilience](skills/start-project-with-trust/knowledge/fiabilidade/README.md) | 5 | [Docker and orchestration](skills/start-project-with-trust/knowledge/docker/README.md) | 13 |
| [Design and user experience](skills/start-project-with-trust/knowledge/design/README.md) | 28 | [Infrastructure services](skills/start-project-with-trust/knowledge/infraestrutura/README.md) | 10 |
| [3D, WebGL and animation](skills/start-project-with-trust/knowledge/3d-webgl/README.md) | 10 | [Digital sovereignty](skills/start-project-with-trust/knowledge/soberania/README.md) | 6 |
| [SEO and discovery](skills/start-project-with-trust/knowledge/seo/README.md) | 2 | [Governance and process](skills/start-project-with-trust/knowledge/governacao/README.md) | 7 |
| [API design](skills/start-project-with-trust/knowledge/api/README.md) | 6 | [Cloud and identity](skills/start-project-with-trust/knowledge/nuvem/README.md) | 7 |
| [Databases](skills/start-project-with-trust/knowledge/base-de-dados/README.md) | 14 | [Sessions, orchestration and cost efficiency](skills/start-project-with-trust/knowledge/custo/README.md) | 8 |
| [Python](skills/start-project-with-trust/knowledge/python/README.md) | 13 | [Web publishing and hosting](skills/start-project-with-trust/knowledge/publicacao/README.md) (outside the PDF) | 9 |
| [Java](skills/start-project-with-trust/knowledge/java/README.md) | 13 | [Building with AI (Claude and Anthropic)](skills/start-project-with-trust/knowledge/ia/README.md) | 17 |
| [C#](skills/start-project-with-trust/knowledge/csharp/README.md) | 13 | [Remote access (SSH and RDP)](skills/start-project-with-trust/knowledge/acesso-remoto/README.md) (outside the PDF) | 4 |
| [JavaScript](skills/start-project-with-trust/knowledge/javascript/README.md) (outside the PDF) | 14 | [Platforms to adopt before building](skills/start-project-with-trust/knowledge/plataformas/README.md) (outside the PDF) | 7 |
| [Node.js](skills/start-project-with-trust/knowledge/node/README.md) (outside the PDF) | 14 | | |

Reference files:

- [`INDEX.md`](skills/start-project-with-trust/knowledge/INDEX.md): every entry, by section.
- [`FONTES.md`](skills/start-project-with-trust/knowledge/FONTES.md): the official sources for each section and the «A vigiar» (watch) list: deadlines and limits checked on every update, such as TLS certificate lifetimes or free hosting plans.
- `<section>/ATUALIZACOES.md`: each section's updates, by category and date, without changing the text of the entries. Lines added more than a year ago move to `ATUALIZACOES-ARQUIVO.md`, without being deleted.
- `PENDENTES.md`: medium-confidence changes awaiting a decision.
- [`CHANGELOG.md`](skills/start-project-with-trust/knowledge/CHANGELOG.md): every change, with source, release date, confidence and who approved it.

## update-knowledge

It keeps the knowledge base and the personal knowledge up to date. It only runs when someone calls it with `/update-knowledge` (for one topic, for example `/update-knowledge ia`, or `/update-knowledge pessoal` for the personal knowledge only).

1. It goes through the sources in [`FONTES.md`](skills/start-project-with-trust/knowledge/FONTES.md) and always checks the «A vigiar» points. It uses RSS feeds and public APIs where they exist, to keep costs low.
2. It gives each change the release date stated by the source and a confidence level, and applies it according to that level:

   | Confidence | When | What happens |
   |---|---|---|
   | High | Primary official source, read directly, with a date | Goes into the section's `ATUALIZACOES.md` |
   | Medium | Official source but indirect, partly read or undated | Stays in `PENDENTES.md` until you decide whether it goes in |
   | Low | Unofficial source | Never changes the knowledge |

   New entries, corrections to the text and new sources always require approval, one at a time.
3. It records each change in `CHANGELOG.md`, with source, release date, confidence and who approved it.
4. It runs the checkers and, with your permission, commits and pushes. Anyone who has the skills installed gets the new knowledge on the next `npx skills update`.
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
- The knowledge base (`knowledge/`) is installed with the skill. There are no extra steps.
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

  With `--entrega`, it also checks the delivery: each action `feito` (done) with evidence `✓`, publishing verified, `acessos.md` without secrets and acceptance with a name and date.
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
├── scripts/        checkers (plan, delivery, publishing) and goal loop hooks
└── knowledge/      knowledge base (INDEX.md, FONTES.md, CHANGELOG.md, PENDENTES.md, and one ATUALIZACOES.md and one ATUALIZACOES-ARQUIVO.md per section)
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

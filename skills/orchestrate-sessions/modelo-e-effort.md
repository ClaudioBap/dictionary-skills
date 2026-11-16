# Modelo e effort por tarefa

Cada tarefa leva o modelo e o effort que o nível pedido exige, e não mais. Decidem duas coisas: o tipo de tarefa e o nível de exigência que o utilizador quer para ela. O caminho do conhecimento obtém-se com `node ../start-project-with-trust/scripts/conhecimento.mjs`; os caminhos `knowledge/` são relativos a ele.

## Nível de exigência

O nível vem do que o utilizador pediu para aquela tarefa, não do tipo. Regista de onde veio: as palavras dele, ou a resposta em `objetivo.md`. Se ele não o disse, pergunta.

| Nível | Quando | Exemplos |
|---|---|---|
| Simples | O resultado segue um padrão conhecido e um erro vê-se logo | Página estática, formulário, ajuste de texto ou de estilo, script, CRUD |
| Profissional | Produto para clientes, com identidade própria e várias peças que têm de encaixar | Design system, aplicação completa responsiva e acessível, animações CSS, API com autenticação, integração entre plataformas |
| Topo | A qualidade da experiência é o próprio pedido, ou o problema é difícil | 3D e WebGL, scroll com motion, experiência premium de marca, desempenho crítico, concorrência, dados sensíveis |

## Tabela

| Tipo | Simples | Profissional | Topo |
|---|---|---|---|
| Planear: descoberta, plano, custo-benefício, arquitetura, divisão em tarefas, orquestração | `fable` `low` | `fable` `medium` | `fable` `high` |
| Design e interface | `sonnet` `low` | `opus` `medium` | `fable` `medium` |
| Construir: código, integrações, testes | `sonnet` `low` | `sonnet` `medium` | `opus` `high` |
| Rever e decidir com risco: segurança, migrações, depuração que já falhou, revisão final | `sonnet` `medium` | `opus` `medium` | `fable` `medium` |
| Mecânica: aplicar um padrão já decidido, renomear, formatar | `sonnet` `low` | `sonnet` `low` | `sonnet` `low` |
| Ler: inventário, documentação, resumos, extração | `haiku` `low` | `haiku` `low` | `haiku` `low` |

**Sem Fable** (o utilizador não tem acesso, ou não aceita o custo): onde a tabela diz `fable`, usa `opus` com o effort um nível acima (`low` passa a `medium`, `medium` a `high`, `high` a `xhigh`).

Base:

- Planear sempre em `opus` ou `fable`: regra desta skill. Usar o mais capaz com effort baixo em vez de um modelo mais barato segue `knowledge/ia/escolher-o-modelo-claude.md` (pág. 66), que também põe o Fable (hoje o 5.2) no mais difícil e o Opus 5.5 como recomendado para a maioria do trabalho.
- Effort afinado por nível, mais alto em código e trabalho agêntico longo: `knowledge/ia/pensar-e-esforco.md` (págs. 66, 67).
- Ler com `haiku` e `low`: `knowledge/ia/subagentes-e-orquestracao.md` (pág. 68).
- Os níveis, os exemplos e as células da tabela são *(interpretação)*. Ajustam-se com o que se mede (regra 6).

Preços de referência por milhão de tokens (entrada/saída): Haiku 5.5 $0,10/$0,50 (prompts até 100 000 tokens), Sonnet 5.5 $2/$10, Opus 5.5 $4/$20, Fable 5.2 $8/$40; o Fable 5.1 é legado ($10/$50) (`knowledge/ia/escolher-o-modelo-claude.md`, editado a 2026-11-10). O custo real mede-se por tarefa concluída (`knowledge/ia/otimizacao-de-custo-da-ia.md`, pág. 69).

## Regras

1. **Tipo e nível em cada tarefa.** Na dúvida entre dois níveis, pergunta ao utilizador; não escolhas o mais barato em silêncio.
2. **Planear nunca desce de `opus`.**
3. **Sobe só com prova.** Se a tarefa falhar o critério de fim, sobe um degrau e regista a subida com a razão:

   `haiku low`, `sonnet low`, `sonnet medium`, `opus medium`, `opus high`, `fable medium`, `fable high`

   Usar `fable` quando o utilizador disse que não, ou `xhigh` e `max` fora do que a tabela dá, pede autorização: é uma decisão de custo.
4. **Um modelo por sessão.** Uma tarefa que pede outro modelo vai para um subagente ou para outra sessão, para o custo de cada sessão continuar atribuível *(interpretação)*.
5. **Paralelo só com trabalho independente** (`knowledge/ia/subagentes-e-orquestracao.md`, pág. 68). Duas sessões em paralelo nunca editam os mesmos ficheiros.
6. **Mede.** No fim de cada sessão, corre `/usage` e regista o custo estimado e o uso por modelo.

## Como se aplica no Claude Code

Fonte: documentação oficial, consultada a 2026-11-10 ([model-config](https://code.claude.com/docs/en/model-config), [sub-agents](https://code.claude.com/docs/en/sub-agents), [costs](https://code.claude.com/docs/en/costs)).

- **Sessão nova:** `claude --model sonnet --effort low`. A meio da sessão: `/model` e `/effort`.
- **Subagente lançado por uma sessão:** a ferramenta Agent aceita `model` (`haiku`, `sonnet`, `opus`, `fable`) e `effort`. Num agente definido em `.claude/agents/*.md`, os mesmos campos vão no frontmatter.
- **Subagentes dentro de subagentes:** permitidos até três níveis abaixo da sessão principal.
- **Effort padrão no Claude Code:** `medium` no Haiku 5.5, Sonnet 5.5, Opus 5.5 e Fable. Aceitam de `low` a `max`. Na API os padrões são outros (`knowledge/ia/pensar-e-esforco.md`).
- **Custo:** `/usage` mostra a estimativa da sessão a preço de tabela, o uso por modelo e a cache.

Noutros agentes (Codex, Cursor, Copilot), regista o modelo e o effort no briefing e diz ao utilizador como os escolher nesse agente.

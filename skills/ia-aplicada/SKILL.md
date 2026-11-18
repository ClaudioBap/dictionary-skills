---
name: ia-aplicada
description: Mini skill para qualquer trabalho com IA. Começa por perguntar o que se vai fazer com IA (usar a API do Claude ou de outro fornecedor, RAG e grafos, agentes, modelo próprio, modelos abertos, voz, segurança, operação), lê só a subpasta de knowledge/ia/ que interessa e responde ou executa com base nela, citando. Se a biblioteca não tem o que é preciso, vai às fontes oficiais, regista o que encontrou e só depois responde. Usar sozinha ou numa sessão lançada pela orchestrate-sessions.
argument-hint: "O que queres fazer com IA, ou nada para escolher"
---

# IaAplicada

O caminho do conhecimento obtém-se com `node ../start-project-with-trust/scripts/conhecimento.mjs`; as referências `knowledge/...` são relativas a esse caminho.

O conhecimento está em `knowledge/ia/`. A raiz de `ia/` tem os fundamentos (modelos Claude, effort, prompts, tool use, MCP, subagentes, custos, segurança e governação); cada subpasta tem um tema. Se `~/.start-project-with-trust/knowledge/ia/` tiver uma entrada com o mesmo caminho, vale a pessoal: é a versão já atualizada.

## Regras

- Seguem-se as regras da secção «Regras em todas as fases» de `../start-project-with-trust/SKILL.md`: cada facto cita o ficheiro da base ou o URL da fonte; os factos verificas tu, as decisões são do utilizador; uma pergunta de cada vez, no formato da Fase 1 dessa skill; sem marcas de escrita de IA no que se entrega.
- Se a tarefa vai ser executada, o modelo e o effort seguem `../orchestrate-sessions/modelo-e-effort.md`.

## 1. O que vamos fazer com IA?

Se o pedido já o diz, passa ao passo 2. Se não, lê `knowledge/ia/README.md` e pergunta, com uma opção por subpasta (o título de cada subpasta está no README) e a opção «Outra». Por exemplo: usar a API do Claude, usar ou comparar outro fornecedor, pesquisar nos documentos da empresa (RAG), construir um agente, ter um modelo próprio, escolher um modelo aberto, voz e multimodal, proteger uma aplicação com IA, pôr em produção e medir custos.

## 2. Ler só o que interessa

Lê o `README.md` da subpasta escolhida, as entradas dela que o pedido toca e as entradas da raiz de `ia/` que se aplicam. Não leias as outras subpastas.

Se o trabalho é acompanhar ou conduzir sessões do Claude Code a partir de outra aplicação (hooks que enviam eventos, perguntas respondidas à distância, notas às skills, um agente local), lê também `knowledge/portais-de-agentes/eventos-e-origem-das-skills.md`, `caixa-de-perguntas-a-distancia.md`, `avaliacao-de-skills-por-push.md` e `agente-local-licenca-e-emparelhamento.md`, na mesma pasta. Um portal inteiro é da `portal-de-agentes`.

## 3. Se a biblioteca não tem a resposta

Quando nenhuma entrada cobre o que o utilizador precisa, ou a entrada está desatualizada face ao que ele descreve:

1. Escolhe as fontes oficiais primárias certas (o fornecedor, o autor ou o organismo) e lê-as. Não contornes bloqueios: se uma fonte recusar o acesso automático, pede ao utilizador o conteúdo ou regista-a como não lida.
2. Dá a cada facto a confiança segundo os critérios de `../update-knowledge/SKILL.md` (`alta`, `media`, `baixa`). Um facto `baixa` não serve de base.
3. Regista o que encontraste antes de responder:
   - numa cópia git do repositório (existe `knowledge/INDEX.md` no diretório atual ou acima), propõe ao utilizador a entrada nova na subpasta certa, no formato do passo 3 de `../update-knowledge/SKILL.md`, e só a escreves com a aprovação dele;
   - fora disso, no conhecimento pessoal: a entrada em `~/.start-project-with-trust/knowledge/ia/<subpasta>/<slug>.md`, a fonte em `FONTES.md` pessoal e uma linha no `CHANGELOG.md` pessoal.
   - Se o que encontraste substitui o que uma entrada diz, segue a regra de edição da `update-knowledge`: a entrada passa a dizer o que vale hoje e o texto anterior fica no «Histórico» dela (em modo local, numa cópia pessoal da entrada).
4. Diz ao utilizador que fontes leste e o que registaste.

## 4. Responder ou executar

- Quando há uma decisão (que fornecedor, que modelo, adotar ou construir), apresenta as opções da mais barata à mais cara, com a base de cada uma e uma recomendação, no formato da Fase 1.
- Quando há trabalho a fazer, o critério de fim parte da linha «Para uma skill» das entradas usadas, e só dás a tarefa por feita com prova (comando e saída, ficheiro ou URL).


## Documentação

Se a skill `documentacao` estiver instalada (existe `../documentacao/SKILL.md`), no fim de um trabalho com resultado escreve o relatório do processo, como diz o modo «processo» dela. Uma consulta sem alterações não leva relatório.

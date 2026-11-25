---
name: ia-aplicada
description: Mini skill para qualquer trabalho com IA. Começa por perguntar o que se vai fazer com IA (usar a API do Claude ou de outro fornecedor, RAG e grafos, agentes, modelo próprio, modelos abertos, voz, segurança, operação), lê só a subpasta de knowledge/ia/ que interessa e responde ou executa com base nela, citando. Se a biblioteca não tem o que é preciso, vai às fontes oficiais, regista o que encontrou e só depois responde. Usar sozinha ou numa sessão lançada pela orchestrate-sessions. É uma sub skill, que faz uma parte do trabalho, sozinha ou chamada por uma skill mãe.
argument-hint: "O que queres fazer com IA, ou nada para escolher"
metadata:
  estado: produção
  tipo: sub
  usa: [humanizar]
  impacto: { ia: 10, seguranca: 3, nuvem: 3, desenvolvimento: 5, web: 0 }
---

# IaAplicada

O caminho do conhecimento obtém-se com `node ../orchestrate-sessions/scripts/conhecimento.mjs`; as referências `knowledge/...` são relativas a esse caminho.

O conhecimento está em `knowledge/ia/`. A raiz de `ia/` tem os fundamentos (modelos Claude, effort, prompts, tool use, MCP, subagentes, custos, segurança e governação); cada subpasta tem um tema. Se `~/.start-project-with-trust/knowledge/ia/` tiver uma entrada com o mesmo caminho, vale a pessoal: é a versão já atualizada.

## Regras

- Seguem-se as regras de `../orchestrate-sessions/regras.md`: cada facto cita o ficheiro da base ou o URL da fonte; os factos verificas tu, as decisões são do utilizador; uma pergunta de cada vez, no formato das perguntas desse ficheiro; sem marcas de escrita de IA no que se entrega.
- Se a tarefa vai ser executada, o modelo e o effort seguem `../orchestrate-sessions/modelo-e-effort.md`.

## Âmbito

Sabe fazer o que `knowledge/ia/` cobre: escolher o modelo, o fornecedor e o effort; prompts e saída estruturada; ferramentas, MCP e agentes; RAG, grafos e memória de agentes; modelos abertos e licenças; adaptar e servir um modelo próprio; voz e multimodal; proteger uma aplicação com LLM contra a injeção de prompt; observar o uso e o custo em produção.

Não sabe fazer, e para onde vai:

- Baixar o custo ou a latência de uma solução com IA que já corre: `performance-verifier`, que mede antes de propor.
- Auditar a segurança da aplicação inteira, e não só da parte com LLM: `seguranca`.
- Narrar ou gravar um vídeo: `gravacao-video`, que usa a entrada de voz desta base.
- Construir um portal para acompanhar agentes: `portal-de-agentes`.
- Machine learning clássico (prever valores a partir de dados em tabela, visão computacional treinada de raiz, modelos de classificação fora dos LLM): fora da base. Diz-o ao utilizador e, se ele quiser continuar, vai às fontes oficiais da biblioteca em causa e regista o que encontrares, como no passo 3.

Pedidos que se confundem:

- «Segurança da IA»: proteger o assistente de uma aplicação contra a injeção de prompt, sim (`knowledge/ia/seguranca/`); auditar o site onde ele está, não, é da `seguranca`.
- «IA para as vendas»: um assistente que responde a perguntas sobre os relatórios de vendas, sim (RAG); um modelo que prevê as vendas do próximo mês a partir do histórico, não, porque é machine learning clássico e a base só cobre modelos de linguagem, voz e imagem.
- «IA mais barata»: escolher o modelo de uma funcionalidade nova, sim; baixar a fatura de uma que já corre, não, é da `performance-verifier`.

Quando parte do pedido é de outra skill, diz qual e porquê. Chamada por uma mãe, devolve-lhe essa parte no relatório; sozinha, recomenda a skill e continua com a parte que é tua.

## 1. O que vamos fazer com IA?

Se o pedido já diz o tema, o objetivo e o nível, passa ao passo 2. Se não, faz só as perguntas que faltam, uma de cada vez, segundo o padrão de `../orchestrate-sessions/regras.md`, e pára quando tens o que precisas:

1. **O tema.** Lê `knowledge/ia/README.md` e dá uma opção por subpasta (o título de cada uma está no README), mais a opção «Outra». Por exemplo: usar a API do Claude, usar ou comparar outro fornecedor, pesquisar nos documentos da empresa (RAG), construir um agente, ter um modelo próprio, escolher um modelo aberto, voz e multimodal, proteger uma aplicação com IA, pôr em produção e medir custos. Se a resposta cai fora do «Âmbito», diz para onde vai.
2. **O objetivo**: decidir (que fornecedor, que modelo, adotar ou construir), construir, ou rever o que já existe.
3. **O nível**, do mais barato ao mais caro: uma chamada ao modelo, um workflow com passos que tu orquestras, ou um agente (`knowledge/ia/escolher-a-superficie.md`); num modelo próprio, usar uma API, adaptar um modelo aberto ou treinar de raiz (`knowledge/ia/modelos-proprios/requisitos-para-ter-um-llm-proprio.md`). Recomenda o mais simples que resolve o pedido.
4. **Os dados**, só se o trabalho envia documentos da empresa ou dados pessoais a um modelo: podem sair para um fornecedor, e com que retenção? A base é `knowledge/ia/api-claude/retencao-de-dados-e-zdr.md`.

## 2. Ler só o que interessa

Lê o `README.md` da subpasta escolhida, as entradas dela que o pedido toca e as entradas da raiz de `ia/` que se aplicam. Não leias as outras subpastas.

Se o trabalho é acompanhar ou conduzir sessões do Claude Code a partir de outra aplicação (hooks que enviam eventos, perguntas respondidas à distância, notas às skills, um agente local), lê também `knowledge/portais-de-agentes/eventos-e-origem-das-skills.md`, `caixa-de-perguntas-a-distancia.md`, `avaliacao-de-skills-por-push.md` e `agente-local-licenca-e-emparelhamento.md`, na mesma pasta. Um portal inteiro é da `portal-de-agentes`.

Se o trabalho é pôr o Claude Code ou uma aplicação a usar outro modelo (um fornecedor de modelos sem restrições por API, um modelo aberto em local ou na nuvem do Ollama), lê também `knowledge/ia/fornecedores/modelos-sem-restricoes-abliteration-ai.md`, `knowledge/ia/modelos-proprios/servir-um-modelo-proprio.md` e `memoria-e-hardware.md`, na mesma pasta. Se o modelo vai correr num servidor próprio, lê ainda `knowledge/publicacao/alojamento-pago-e-empresarial.md` (os VPS e a memória de cada plano) e `knowledge/acesso-remoto/acesso-por-identidade-sem-portas-abertas.md` (ligar o servidor por uma rede privada como a Tailscale, sem portas abertas).

## 3. Se a biblioteca não tem a resposta

Quando nenhuma entrada cobre o que o utilizador precisa, ou a entrada está desatualizada face ao que ele descreve, segue «Quando falta conhecimento» em `../update-knowledge/SKILL.md` antes de responder, com o registo na subpasta certa de `ia/`. Fontes oficiais deste tema: as do fornecedor, do autor ou do organismo em causa.

## 4. Responder ou executar

- Quando há uma decisão (que fornecedor, que modelo, adotar ou construir), apresenta as opções da mais barata à mais cara, com a base de cada uma e uma recomendação, no formato das perguntas.
- Quando há trabalho a fazer, o critério de fim parte da linha «Para uma skill» das entradas usadas, e só dás a tarefa por feita com prova (comando e saída, ficheiro ou URL).
- Se o trabalho muda o comportamento de um modelo (um prompt, um RAG, um agente, um modelo adaptado), a prova inclui uma avaliação antes e depois da mudança, como diz `knowledge/ia/avaliacao-evals.md`: casos reais, uma forma clara de pontuar e um script que se volta a correr. Num RAG, a avaliação separa o que se recuperou, a fidelidade e a resposta, como em `knowledge/ia/rag/avaliar-rag-ragas.md`. Sem avaliação, «melhorou» fica por provar.
- Humanizar: o código, os textos que o utilizador vai ler e os commits não podem deixar perceber que foram feitos por uma IA. Antes de dar a tarefa por feita, corre a mini skill `humanizar` (ou `node ../humanizar/scripts/humanizar.mjs <ficheiros tocados> --commits <n>`) e relê o que o verificador não apanha com as secções «Código», «Texto» e «Commits, documentação e dados» de `../humanizar/marcas.md`. Corriges só com autorização, categoria a categoria. Prova: a saída final do verificador.


## Relatório

- O tema (a subpasta de `knowledge/ia/`) e as entradas lidas.
- As decisões, com as opções apresentadas e quem decidiu.
- O que se construiu e a prova de cada critério; numa mudança de comportamento de um modelo, a avaliação antes e depois.
- A saída final do verificador da `humanizar`, com os achados que ficaram e porquê.
- O que ficou por preencher.
- As fontes que foste buscar, se a biblioteca não chegava.


## Documentação

Se a skill `documentacao` estiver instalada (existe `../documentacao/SKILL.md`), no fim de um trabalho com resultado escreve o relatório do processo, como diz o modo «processo» dela. Uma consulta sem alterações não leva relatório.

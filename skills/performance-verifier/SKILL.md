---
name: performance-verifier
description: Mini skill que mede antes de propor. Analisa a velocidade e o custo de um site, de uma API ou base de dados, de uma experiência 3D ou de uma solução com IA (tokens por tarefa, cache, modelo e effort, batch), compara com o orçamento de desempenho ou de custo definido, e devolve uma tabela de melhorias ordenada da mais barata à mais cara, cada uma com o ganho estimado e a entrada que a sustenta. Depois de aplicar, volta a medir. Usar sozinha ou numa sessão lançada pela orchestrate-sessions.
argument-hint: "URL, pasta ou pedido a medir, e o alvo (tempo, custo) se houver"
metadata:
  estado: produção
---

# Performance verifier

O caminho do conhecimento obtém-se com `node ../start-project-with-trust/scripts/conhecimento.mjs`; as referências `knowledge/...` são relativas a esse caminho.

O conhecimento está em `knowledge/`. Lê só o que o pedido toca (passo 2). Se `~/.start-project-with-trust/knowledge/` tiver uma entrada com o mesmo caminho, vale a pessoal: é a versão já atualizada.

## Regras

- Seguem-se as regras da secção «Regras em todas as fases» de `../start-project-with-trust/SKILL.md`, incluindo a autonomia depois da decisão: o que só o utilizador pode dar (acessos a painéis de consumo, chaves de administração) fica «Por preencher», e o resto continua.
- Modelo e effort segundo `../orchestrate-sessions/modelo-e-effort.md`: medir e recolher números é «Ler»; decidir o que mudar é «Rever e decidir com risco»; aplicar uma melhoria já decidida é «Construir».
- Sem medição não há proposta. Um número só entra com a forma como foi obtido (ferramenta, comando, data). O que for estimativa leva a marca *(estimativa)*.
- O custo mede-se por tarefa concluída, não por pedido. Base: `ia/otimizacao-de-custo-da-ia.md`, `custo/custo-eficiencia-finops.md`.

## 1. O que medir e contra quê

Se o pedido já o diz, passa ao passo 2. Se não, pergunta no formato da Fase 1 da `start-project-with-trust`, com estas opções:

1. **Site ou aplicação web**: tempos de carregamento e interação (Core Web Vitals), peso das páginas e dos media.
2. **API e base de dados**: latência por endpoint, queries lentas, índices em falta.
3. **Solução com IA**: tokens e custo por tarefa concluída, taxa de leitura da cache, modelo e effort por tipo de tarefa, trabalho que podia ir em batch.
4. **3D e animação**: orçamento de triângulos, texturas e frames.
5. **Infraestrutura**: capacidade, escala, serverless ou sempre ligado, alertas de custo.

Pergunta também o alvo: o critério de sucesso (P3) ou o orçamento (P8) do projeto, ou um valor concreto («até 2 segundos», «menos de 50 euros por mês»). Sem alvo, propõe um a partir da entrada de orçamento e pede que o aceite.

## 2. Ler só o que interessa

- Web: `design/desempenho-web-core-web-vitals.md`, `design/orcamento-de-desempenho.md`, `design/otimizacao-de-imagens-e-media.md`, `design/feedback-e-desempenho-percebido.md`, `custo/caching-em-camadas.md`.
- API e base de dados: `base-de-dados/desempenho-de-queries.md`, `base-de-dados/indices.md`, `api/paginacao-filtros-e-limites.md`, `custo/caching-em-camadas.md`.
- IA: `ia/otimizacao-de-custo-da-ia.md`, `ia/escolher-o-modelo-claude.md`, `ia/pensar-e-esforco.md`, `ia/api-claude/prompt-caching.md`, `ia/api-claude/message-batches.md`, `ia/operacao/uso-e-custo-da-claude-api.md`, `ia/operacao/gateway-de-llm-litellm.md`.
- 3D: `3d-webgl/orcamento-de-desempenho-3d.md`.
- Infraestrutura: `custo/dimensionar-e-escalar.md`, `custo/serverless-vs-sempre-ligado.md`, `custo/capacidade-barata-spot-e-reservas.md`, `custo/orcamento-e-alertas-de-custo.md`, `custo/gestao-de-sessoes-e-estado-para-escalar.md`.

## 3. Se a biblioteca não tem a resposta

Quando nenhuma entrada cobre o que é preciso, ou a entrada está desatualizada face ao que o utilizador descreve (uma ferramenta nova, um preço que mudou):

1. Escolhe as fontes oficiais primárias certas (o fornecedor, a documentação da ferramenta) e lê-as. Não contornes bloqueios: se uma fonte recusar o acesso automático, pede ao utilizador o conteúdo ou regista-a como não lida.
2. Dá a cada facto a confiança segundo os critérios de `../update-knowledge/SKILL.md` (`alta`, `media`, `baixa`). Um facto `baixa` não serve de base.
3. Regista o que encontraste antes de responder: numa cópia git do repositório, propõe a entrada nova na secção certa, no formato do passo 3 de `../update-knowledge/SKILL.md`, e só a escreves com a aprovação do utilizador; fora disso, no conhecimento pessoal (`~/.start-project-with-trust/knowledge/<secção>/<slug>.md`, fonte em `FONTES.md` pessoal, linha no `CHANGELOG.md` pessoal). Se o que encontraste substitui o que uma entrada diz, segue a regra de edição da `update-knowledge`: a entrada passa a dizer o que vale hoje e o texto anterior fica no «Histórico» dela.
4. Diz ao utilizador que fontes leste e o que registaste.

## 4. Medir

Antes de qualquer proposta, regista a linha de base numa tabela com as colunas métrica, valor, como foi medido e alvo:

- Web: as métricas e as ferramentas que `design/desempenho-web-core-web-vitals.md` e `design/orcamento-de-desempenho.md` indicam, por página principal, em telemóvel e em computador.
- API e base de dados: latência por endpoint e o plano de execução das queries mais frequentes, como em `base-de-dados/desempenho-de-queries.md`.
- IA: por tipo de tarefa, os tokens de entrada, de saída, de escrita e de leitura da cache, o modelo e o effort usados, e o custo por tarefa concluída. A fonte dos números é o `/usage` da sessão, o relatório `usage_report` da entrada `ia/operacao/uso-e-custo-da-claude-api.md`, ou os registos do gateway. Marca que tarefas podiam esperar e ir em batch.
- 3D: os contadores que `3d-webgl/orcamento-de-desempenho-3d.md` indica.

Se para medir faltar um acesso (painel de faturação, chave de administração), regista-o em «Por preencher» e mede o resto.

## 5. Propor

Para cada diferença entre a medição e o alvo, uma linha na tabela de melhorias com as colunas melhoria, ganho estimado, custo da alteração, risco e base no conhecimento. A ordem é da mais barata à mais cara, e segue a regra de `ia/otimizacao-de-custo-da-ia.md`: primeiro as poupanças grátis (cache, higiene de tokens, menos pedidos, imagens e media), depois os compromissos (effort mais baixo, outro modelo, batch, outra capacidade). Cada ganho que não vem de uma medição leva *(estimativa)*.

Mostra a tabela e pede ao utilizador que escolha o que aplicar. Numa solução com IA, uma mudança de modelo ou de effort segue também a tabela de `../orchestrate-sessions/modelo-e-effort.md`.

## 6. Aplicar e voltar a medir

Aplica as melhorias escolhidas, por ordem, até ao fim. Depois de cada uma, repete a medição do passo 4 e regista o antes e o depois na mesma tabela. Uma melhoria que não mede ganho reverte-se e fica registada como tal. O critério de fim é a métrica dentro do alvo, provada pela medição.

## Relatório

- A linha de base e o alvo, com a forma como cada número foi medido.
- A tabela de melhorias propostas, da mais barata à mais cara.
- O antes e o depois de cada melhoria aplicada, e as revertidas.
- O que ficou por preencher.
- As fontes que foste buscar, se a biblioteca não chegava.


## Documentação

Se a skill `documentacao` estiver instalada (existe `../documentacao/SKILL.md`), no fim de um trabalho com resultado escreve o relatório do processo, como diz o modo «processo» dela. Uma consulta sem alterações não leva relatório.

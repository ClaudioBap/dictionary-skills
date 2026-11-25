---
name: performance-verifier
description: Mini skill que mede antes de propor. Analisa a velocidade e o custo de um site, de uma API ou base de dados, de uma experiência 3D ou de uma solução com IA (tokens por tarefa, cache, modelo e effort, batch), compara com o orçamento de desempenho ou de custo definido, e devolve uma tabela de melhorias ordenada da mais barata à mais cara, cada uma com o ganho estimado e a entrada que a sustenta. Depois de aplicar, volta a medir. Usar sozinha ou numa sessão lançada pela orchestrate-sessions. É uma sub skill, que faz uma parte do trabalho, sozinha ou chamada por uma skill mãe.
argument-hint: "URL, pasta ou pedido a medir, e o alvo (tempo, custo) se houver"
metadata:
  estado: produção
  tipo: sub
  usa: [humanizar]
  impacto: { ia: 6, seguranca: 0, nuvem: 7, desenvolvimento: 6, web: 7 }
---

# Performance verifier

O caminho do conhecimento obtém-se com `node ../orchestrate-sessions/scripts/conhecimento.mjs`; as referências `knowledge/...` são relativas a esse caminho.

O conhecimento está em `knowledge/`. Lê só o que o pedido toca (passo 2). Se `~/.start-project-with-trust/knowledge/` tiver uma entrada com o mesmo caminho, vale a pessoal: é a versão já atualizada.

## Regras

- Seguem-se as regras de `../orchestrate-sessions/regras.md`, incluindo a autonomia depois da decisão: o que só o utilizador pode dar (acessos a painéis de consumo, chaves de administração) fica «Por preencher», e o resto continua.
- Modelo e effort segundo `../orchestrate-sessions/modelo-e-effort.md`: medir e recolher números é «Ler»; decidir o que mudar é «Rever e decidir com risco»; aplicar uma melhoria já decidida é «Construir».
- Sem medição não há proposta. Um número só entra com a forma como foi obtido (ferramenta, comando, data). O que for estimativa leva a marca *(estimativa)*.
- O custo mede-se por tarefa concluída, não por pedido. Base: `ia/otimizacao-de-custo-da-ia.md`, `custo/custo-eficiencia-finops.md`.

## Âmbito

Sabe medir e propor melhorias para o que as entradas do passo 2 cobrem: os Core Web Vitals e o peso de um site; a latência, as queries e os índices de uma API e da sua base de dados, também sob carga; os tokens, a cache, o modelo, o effort e o batch de uma solução com IA; o orçamento de uma cena 3D; a capacidade, a escala e os alertas de custo da infraestrutura.

Não sabe fazer, e para onde vai:

- Escolher o modelo ou o fornecedor para uma funcionalidade que ainda não existe: `ia-aplicada`.
- Construir a interface ou a cena: `design-ux` e `design-3d-motion`, que já trazem o seu orçamento.
- Montar monitorização permanente, alertas de operação e runbooks: `operar`.
- O desempenho de computadores, da rede do escritório ou da ligação à internet: fora da base. Diz-o ao utilizador e, se ele quiser continuar, vai às fontes oficiais do fabricante ou da ferramenta e regista o que encontrares, como no passo 3.

Pedidos que se confundem:

- «O site está lento»: o tempo de carregamento e de resposta das páginas, sim; um PC lento ou a ligação à internet, não, ficam fora da base.
- «Quanto custa a IA»: o custo por tarefa de uma solução que já corre, sim; quanto vai custar uma funcionalidade nova, é da `ia-aplicada`, que escolhe com os preços citados.
- «Vigiar o desempenho»: uma medição com o antes e o depois, sim; vigilância contínua com alertas, é da `operar`.

Quando parte do pedido é de outra skill, diz qual e porquê. Chamada por uma mãe, devolve-lhe essa parte no relatório; sozinha, recomenda a skill e continua com a parte que é tua.

## 1. O que medir e contra quê

Se o pedido já diz o que medir, o alvo e até onde ir, passa ao passo 2. Se não, faz só as perguntas que faltam, uma de cada vez, segundo o padrão de `../orchestrate-sessions/regras.md`, e pára quando tens as três respostas. Primeiro o que medir, com estas opções:

1. **Site ou aplicação web**: tempos de carregamento e interação (Core Web Vitals), peso das páginas e dos media.
2. **API e base de dados**: latência por endpoint, queries lentas, índices em falta.
3. **Solução com IA**: tokens e custo por tarefa concluída, taxa de leitura da cache, modelo e effort por tipo de tarefa, trabalho que podia ir em batch.
4. **3D e animação**: orçamento de triângulos, texturas e frames.
5. **Infraestrutura**: capacidade, escala, serverless ou sempre ligado, alertas de custo.

Depois o alvo: o critério de sucesso (P3) ou o orçamento (P8) do projeto, ou um valor concreto («até 2 segundos», «menos de 50 euros por mês»). Sem alvo, propõe um a partir da entrada de orçamento e pede que o aceite.

Por fim, até onde ir, do mais barato ao mais caro: só a linha de base e a tabela de melhorias, sem mexer em nada; ou medir, aplicar o que escolheres e voltar a medir. Recomenda o primeiro num sistema de terceiros ou em produção sem janela de alterações, e o segundo num projeto em curso. Com o primeiro, a skill acaba no passo 5.

## 2. Ler só o que interessa

- Web: `design/desempenho-web-core-web-vitals.md`, `design/orcamento-de-desempenho.md`, `design/otimizacao-de-imagens-e-media.md`, `design/feedback-e-desempenho-percebido.md`, `custo/caching-em-camadas.md`.
- API e base de dados: `base-de-dados/desempenho-de-queries.md`, `base-de-dados/indices.md`, `api/paginacao-filtros-e-limites.md`, `custo/caching-em-camadas.md`.
- IA: `ia/otimizacao-de-custo-da-ia.md`, `ia/escolher-o-modelo-claude.md`, `ia/pensar-e-esforco.md`, `ia/api-claude/prompt-caching.md`, `ia/api-claude/message-batches.md`, `ia/operacao/uso-e-custo-da-claude-api.md`, `ia/operacao/gateway-de-llm-litellm.md`.
- 3D: `3d-webgl/orcamento-de-desempenho-3d.md`.
- Infraestrutura: `custo/dimensionar-e-escalar.md`, `custo/serverless-vs-sempre-ligado.md`, `custo/capacidade-barata-spot-e-reservas.md`, `custo/orcamento-e-alertas-de-custo.md`, `custo/gestao-de-sessoes-e-estado-para-escalar.md`.

## 3. Se a biblioteca não tem a resposta

Quando nenhuma entrada cobre o que é preciso, ou a entrada está desatualizada face ao que o utilizador descreve (uma ferramenta nova, um preço que mudou), segue «Quando falta conhecimento» em `../update-knowledge/SKILL.md` antes de responder. Fontes oficiais deste tema: o fornecedor e a documentação da ferramenta.

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

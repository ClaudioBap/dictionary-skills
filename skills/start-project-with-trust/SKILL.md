---
name: start-project-with-trust
description: Arranca um projeto com um cliente e leva-o até à entrega verificada. É a versão completa do arranque, com goal-loop e verificadores, e está em testes, por isso só se instala pelo nome. Faz uma descoberta guiada, uma pergunta de cada vez, cruza as necessidades com a base de conhecimento em knowledge/, produz um plano e um plano custo-benefício (com orquestrador e sessões), fecha o marco «Plano aprovado», executa e só termina quando cada critério de sucesso tem prova e o utilizador aceita a entrega. Usar para conduzir um projeto de cliente do arranque à entrega aceite, ou para retomar um que ficou a meio em arranque/. Para qualquer outro trabalho, começa-se pela orchestrate-sessions. É uma skill mãe, que conduz o projeto e chama as sub skills, na execução pela orchestrate-sessions.
argument-hint: "Nome do projeto, ou nada para retomar o último"
metadata:
  estado: testes
  internal: true
  tipo: mãe
  usa: [orchestrate-sessions, operar, humanizar, documentacao, update-knowledge, portal-de-agentes]
  impacto: { ia: 7, seguranca: 7, nuvem: 7, desenvolvimento: 7, web: 7 }
---

# StartProjectWithTrust

Conduz um projeto do arranque à entrega verificada, sempre por esta ordem:

1. **Descoberta**: perceber o que o cliente precisa.
2. **Plano com o que temos**: cruzar as necessidades com `knowledge/`.
3. **Plano custo-benefício**: opções, orquestrador e sessões.
4. **Goal-loop**: voltar a perguntar até não haver nada em aberto e o utilizador confirmar. Termina no marco **«Plano aprovado»**.
5. **Execução (Fase 4)**: fazer cada ação do plano.
6. **Verificação (Fase 5)**: provar cada critério de sucesso, incluindo a publicação e os acessos, até o utilizador aceitar a entrega.

O goal-loop só fecha com a entrega verificada (`Concluído`), não com o plano.

Os caminhos `modelos/` e `scripts/` são relativos à pasta deste `SKILL.md`. As regras comuns, o formato das perguntas e as perguntas obrigatórias estão na `orchestrate-sessions`, instalada ao lado, em `../orchestrate-sessions/regras.md` e `../orchestrate-sessions/PERGUNTAS.md`. O caminho do conhecimento obtém-se com `node ../orchestrate-sessions/scripts/conhecimento.mjs`; as referências `knowledge/...` são relativas a esse caminho.

**Conhecimento pessoal.** Cada utilizador tem um conhecimento pessoal em `~/.start-project-with-trust/`, descrito em «Conhecimento pessoal» de `../orchestrate-sessions/regras.md`, com a regra de nunca levar dados de clientes.

## Regras em todas as fases

Seguem-se as regras de `../orchestrate-sessions/regras.md`. Nesta skill, os documentos do trabalho são os de `arranque/<projeto>/`, a lista «Por preencher» fica em `entrega.md` e os valores que o utilizador preencher provam-se na Fase 5.

## Início

1. A pasta de trabalho é `arranque/<projeto>/`, no diretório atual. Chamada sem nada, pergunta que projeto é, no formato das perguntas: as opções são os projetos que já há em `arranque/`, cada um com o «Estado» do seu `objetivo.md`, o de «Última atualização» mais recente primeiro e recomendado, e um projeto novo. Sem nenhum em `arranque/`, pergunta o nome do projeto. Com um pedido que não é um projeto a conduzir até à entrega aceite (uma tarefa de um tema, uma correção, um trabalho já dividido em tarefas), segue «Pedido vago ou vazio» de `../orchestrate-sessions/regras.md` e só continua aqui se o utilizador quiser o projeto completo.
1a. **Conhecimento em dia.** Segue «Conhecimento em dia» de `../orchestrate-sessions/regras.md`.
2. **Se a pasta já existe**, lê `objetivo.md`, diz em que fase o trabalho ficou e retoma a partir daí.
3. **Se não existe**, cria-a com cópias de `modelos/objetivo.md`, `modelos/necessidades.md`, `modelos/plano.md` e `modelos/custo-beneficio.md`. Depois preenche a tabela «Perguntas obrigatórias» de `objetivo.md` com todas as perguntas de `../orchestrate-sessions/PERGUNTAS.md`, com o estado `aberta`.
3a. **Conhecimento pessoal.** Se `~/.start-project-with-trust/` existe, lê `perfil.md` e `FONTES.md` para saberes que tipos de trabalho e que fontes o utilizador já tem. Se não existe, cria a pasta com `perfil.md`, `FONTES.md` e `CHANGELOG.md` vazios (só com o título) e diz ao utilizador onde fica e para que serve.
3b. **Modelo da sessão.** As fases 1 a 3 e o goal-loop são planeamento, que nunca desce de `opus` (`../orchestrate-sessions/modelo-e-effort.md`). Num projeto novo, pergunta no formato da Fase 1 se o utilizador tem acesso ao Fable e aceita o custo dele nos planos e nas tarefas de topo, e regista a resposta em `objetivo.md` como pergunta de seguimento com origem P8. Se a sessão não estiver em `fable` (ou em `opus`, sem Fable), pede-lhe para mudar com `/model` antes da primeira pergunta da descoberta.
4. **Hooks do goal-loop (só no Claude Code).** Se `.claude/hooks/start-project-with-trust/` ainda não existe no projeto, pergunta ao utilizador se quer instalar os três hooks. Explica-lhe o que cada um faz:
   - **Guarda** (PreToolUse): impede marcar o estado como `Plano aprovado`, `Fase 4` ou `Fase 5` enquanto o verificador do plano encontrar falhas, e como `Concluído` enquanto o plano ou a entrega tiverem falhas.
   - **Rastreabilidade** (PostToolUse, determinística): depois de cada escrita no plano ou no custo-benefício, confirma que cada ação e decisão responde a perguntas do utilizador que existem e estão fechadas.
   - **Verificador semântico** (PostToolUse, usa um modelo; funcionalidade experimental do Claude Code): confirma que cada decisão responde de facto ao que o utilizador pediu e não contradiz as restrições dele. Gasta tokens a cada edição desses ficheiros.

   Se ele aceitar:
   1. copia `scripts/verificar.mjs`, `scripts/guarda-hook.mjs`, `scripts/rastreabilidade-hook.mjs` e `../orchestrate-sessions/PERGUNTAS.md` para `.claude/hooks/start-project-with-trust/`;
   2. junta as entradas de `scripts/hooks-settings.json` a `hooks.PreToolUse` e `hooks.PostToolUse` em `.claude/settings.json`. Se o ficheiro não existe, cria-o. Se já existe, acrescenta sem apagar nada do que lá está. Se o utilizador recusar só o verificador semântico, não copies o handler `"type": "agent"`;
   3. diz ao utilizador que os hooks normalmente ficam ativos logo, mas que pode confirmar em `/hooks` ou reiniciar a sessão.

   Se ele recusar, ou se o agente não for o Claude Code, continua: o verificador do goal-loop aplica-se na mesma, incluindo a rastreabilidade.

Os estados possíveis de cada pergunta em `objetivo.md`:
- `aberta`: ainda sem resposta.
- `respondida`: tem resposta concreta.
- `assumida`: o utilizador aceitou explicitamente um pressuposto, que fica registado na tabela «Pressupostos».

## Fase 1. Descoberta

Faz uma pergunta de cada vez, no formato das perguntas de `../orchestrate-sessions/regras.md`, e espera pela resposta.

**Que pergunta fazer a seguir.** As perguntas obrigatórias de `../orchestrate-sessions/PERGUNTAS.md` são a base, mas a próxima pergunta depende da resposta anterior:
- se a resposta abre uma dúvida que muda as perguntas seguintes, faz primeiro uma pergunta de seguimento e regista-a em `objetivo.md` como `S<n>`, com a pergunta de origem;
- se uma resposta já responde a outra pergunta obrigatória, marca essa também como `respondida` e diz ao utilizador que o fizeste;
- uma resposta vaga não fecha a pergunta: faz um seguimento até ela ser verificável. Por exemplo, «rápido» não chega; «até 2 segundos» chega;
- a um «não sei», propõe um pressuposto. Só se o utilizador o aceitar explicitamente é que a pergunta fica `assumida`.

**Depois de cada resposta**, atualiza `objetivo.md` (estado e resposta resumida) e a secção certa de `necessidades.md`.

**Acesso remoto (P15).** Se a resposta a P15 indica servidores ou máquinas com acesso SSH ou RDP, cria `acessos.md` a partir de `modelos/acessos.md` e regista uma linha por acesso. **Nunca escrevas lá chaves, passwords nem tokens**: só a referência ao cofre onde estão. O verificador falha se encontrar um segredo. Base: `knowledge/acesso-remoto/`.

**Fim da Fase 1.** Quando nenhuma pergunta obrigatória estiver `aberta`, mostra o resumo de `necessidades.md` e pede validação. Se o utilizador corrigir algo, atualiza e volta a pedir. Só depois de validado é que passas à Fase 2.

Depois da validação, acrescenta a `~/.start-project-with-trust/perfil.md` os tipos de trabalho deste projeto que ainda lá não estão (domínio, tecnologias, setor), sem dados do cliente, e uma linha no `CHANGELOG.md` pessoal.

## Fase 2. Plano com o que temos

1. Lê `knowledge/INDEX.md` e as entradas do conhecimento pessoal em `~/.start-project-with-trust/knowledge/`, incluindo os `ATUALIZACOES.md` pessoais (onde ficam as novidades das fontes da base partilhada encontradas em modo local), e escolhe as relevantes para as necessidades. As pistas «Liga a» de `PERGUNTAS.md` ajudam. Lê esses ficheiros. Se uma entrada pessoal tem o mesmo caminho que uma da base partilhada, vale a pessoal: é a versão já atualizada. As secções podem ter subpastas (por exemplo `knowledge/ia/rag/`).
1a. **Atalhos antes do código.** Para cada necessidade funcional (tickets, contratos, faturação, CRM, conteúdos, dashboards, formulários, automações…):
   - procura em `knowledge/plataformas/` uma plataforma que a cubra, toda ou em parte, e como se liga ao resto (API, webhooks, MCP);
   - se lá não houver nenhuma adequada, pesquisa nas fontes oficiais (site, documentação ou repositório do próprio projeto) plataformas open source que a cubram. Cita cada URL e marca o resultado como *(pesquisa de <data>, fora de knowledge/)*. Nunca apresentes como oficial um servidor MCP da comunidade;
   - regista os candidatos em `plano.md`, na secção «Plataformas candidatas», com o que cobrem, o que falta e como se ligam. A escolha entre adotar e construir é feita na Fase 3.
1b. **Portal de agentes.** Se o projeto é um portal onde uma equipa acompanha os seus agentes de IA, chama a `portal-de-agentes`, se estiver instalada (existe `../portal-de-agentes/SKILL.md`). Ela conduz as decisões e a maqueta e devolve um plano por fases, que entra em «Ações» de `plano.md`, cada ação com o seu «Responde a».
2. Para cada necessidade, escreve em `plano.md`:
   - em «Responde a», os IDs das perguntas de `objetivo.md` (P/S) cujas respostas pedem esta ação. Uma ação que não responde a nenhum pedido não entra no plano;
   - a ação a tomar;
   - o recurso que a executa, que tem de ser um dos que o cliente declarou na pergunta P9;
   - a base no conhecimento (ficheiro e página);
   - o critério de sucesso, partindo da linha «Para uma skill:» da entrada usada;
   - a parte a que pertence, quando P16 indica reutilização: `núcleo` (igual em todos os casos) ou `específico` (só deste caso). Se P16 diz que é um caso só, escreve `—`. Base: `knowledge/produto/especifico-ou-modular.md`.
3. **Só recursos declarados.** Se uma boa prática exige um recurso que o cliente não tem, não o dês como disponível. Regista-o em «Lacunas» e acrescenta a `objetivo.md` uma pergunta `aberta` sobre ele.
4. **Sem base, vai às fontes antes de planear.** Se uma necessidade não tem entrada em `knowledge/` nem no conhecimento pessoal, segue «Quando falta conhecimento» em `../update-knowledge/SKILL.md` antes de planear. O que é só desta skill: a ação em `plano.md` cita a entrada pessoal e o URL, e uma necessidade sem nenhuma fonte oficial vai para «Fora do conhecimento». Diz ao utilizador que fontes foste buscar e o que registaste.
5. Mostra o resumo do plano e pede validação.

## Fase 3. Plano custo-benefício

Escreve `custo-beneficio.md` com quatro partes:

1. **Decisões.** Para cada decisão do plano com mais de uma opção, uma linha `**Responde a:**` com os IDs das perguntas a que responde, uma tabela com as colunas opção, custo, benefício, risco e base no conhecimento, e no fim a recomendação.
   - Um custo em dinheiro só pode vir do cliente ou de `knowledge/`, com a fonte indicada.
   - Fora disso, usa uma escala relativa (baixo, médio, alto) e marca-a como *(estimativa)*.
   - **Decisão obrigatória: publicação e exposição.** Responde a P14 e decide, com opções do grátis ao empresarial (`knowledge/publicacao/`):
     - onde fica alojado;
     - domínio: subdomínio grátis ou próprio;
     - certificado TLS: autoassinado **só** para uso local ou interno; Let's Encrypt ou o incluído na plataforma; pago só se a política da organização o exigir;
     - se passa por uma borda como a Cloudflare, e com que WAF e proteção contra DDoS;
     - como se protege a área de administração (SSO e MFA à frente da aplicação).

     Se o projeto não tem exposição pública, a decisão regista-o e justifica. As condições dos planos gratuitos (uso comercial, limites, dados fora da UE) entram na coluna «Risco».
   - **Decisão obrigatória: adotar ou construir.** Responde a P1, P5 e P10 e decide, para cada necessidade funcional, entre estas opções, da mais barata à mais cara:
     - adotar uma plataforma open source (self-hosted ou na cloud do próprio projeto);
     - ligar plataformas que já existem por API, webhooks ou MCP, ou com uma ferramenta de automação;
     - adotar e estender com código só no que falta;
     - desenvolver de raiz.

     Na coluna «Risco» entram a licença (por exemplo, uma licença que não é OSI ou que restringe o uso comercial), a dependência do fornecedor e a manutenção das atualizações. Se não houver candidatos, a decisão regista a pesquisa feita e recomenda desenvolver. Base: `knowledge/plataformas/`.
   - **Decisão obrigatória: específico ou modular.** Responde a P16, P5 e P8 e decide quanto do que se constrói fica preparado para ser reutilizado noutro cliente, área ou conjunto de dados. Opções, da mais barata à mais cara:
     - específico: feito só para este caso, sem abstrações;
     - específico com o variável isolado: o que muda de caso para caso (dados, marca, textos, ligações) fica em configuração e em ficheiros próprios, fora do código;
     - núcleo partilhado com adaptadores: o núcleo é um módulo versionado e cada caso é um adaptador mais configuração;
     - produto: modelo de projeto atualizável ou multi-inquilino, com funcionalidades ligadas por cliente.

     «Específico» é uma resposta válida: se P16 diz que é um caso só, recomenda-a e justifica. Nas duas últimas opções, o critério de sucesso é um segundo caso instanciado só com configuração e conhecimento novos, provado na Fase 5. Base: `knowledge/produto/`.
   - **Decisão obrigatória: execução em paralelo e agentes.** Segue os passos 1 a 3 de `../orchestrate-sessions/SKILL.md`, com as ações de `plano.md` como tarefas:
     - escreve cada ação em «Tarefas», com a mini skill de `../orchestrate-sessions/catalogo.md`, o tipo, o nível de exigência que o utilizador pediu para ela (simples, profissional ou topo) e o modelo e o effort que esse tipo e esse nível pedem em `../orchestrate-sessions/modelo-e-effort.md`. Se as necessidades validadas não deixam claro o nível de uma ação, pergunta;
     - pergunta o nível de autonomia (a tabela de `../orchestrate-sessions/modo-continuo.md`), depois quantas sessões queres em paralelo e onde usar subagentes (sem agentes, só no orquestrador, em cada sessão ou em todas), cada uma no formato da Fase 1. Regista-as em `objetivo.md` como perguntas de seguimento com origem P7 e P8, e cita-as em «Responde a» desta decisão.

     Base: `knowledge/ia/subagentes-e-orquestracao.md` (pág. 68): só há paralelo quando o trabalho é independente.
2. **Orquestrador.** Por omissão, o orquestrador é a **sessão 0**, a própria sessão que corre esta skill. Faz cinco coisas:
   - coordena a ordem do trabalho;
   - prepara o briefing de cada sessão de trabalho (o que entra);
   - **pede ao utilizador para abrir as sessões Claude que vão correr em paralelo**, indicando para cada uma o comando (com o modelo e o effort) e o briefing a colar;
   - lança os subagentes que a decisão de agentes lhe atribui, com o modelo e o effort de cada tarefa;
   - recolhe o que cada sessão devolve (o que sai) e integra.

   Se o utilizador escolher outro orquestrador (uma pessoa, um papel ou outro agente), regista-o. Indica também o que o orquestrador decide e como aprova. Leva «Responde a», normalmente P13 e P9.
3. **Tarefas e sessões.** A secção «Tarefas» vem da decisão de execução em paralelo e agentes. Depois, uma tabela de sessões com as colunas número, tipo (`orquestrador` ou `trabalho`), objetivo, mini skill, modelo, effort, subagentes, o que entra, o que sai, em paralelo com, como abrir, quem participa e critério de fim.
   - A sessão 0 é sempre a do orquestrador.
   - Cada sessão corre no modelo e no effort da tarefa mais exigente que faz ela própria (passo 4 de `../orchestrate-sessions/SKILL.md`).
   - Para cada sessão de trabalho, escreve `briefings/S<n>.md` a partir de `../orchestrate-sessions/modelos/briefing.md`.
   - A saída de cada sessão é a entrada de uma sessão seguinte, ou uma entrega final.
   - Só correm em paralelo as sessões que não dependem da saída umas das outras.
   - Em «como abrir», diz o que o utilizador faz. Por exemplo: «nova sessão do Claude Code nesta pasta, colar o briefing S2», ou «subagente lançado pelo orquestrador».
4. **Recomendação final**, com as razões.

Mostra o resumo e pede validação.

## Goal-loop

O objetivo é a informação toda que foi sendo produzida sobre o projeto: `objetivo.md`, `necessidades.md`, `plano.md` e `custo-beneficio.md`. Depois da Fase 3, repete este ciclo:

1. **Revê.** Relê os quatro documentos e procura:
   - perguntas `aberta`;
   - pressupostos que ainda não foram aceites;
   - campos «por definir»;
   - lacunas do plano;
   - critérios de sucesso que ninguém sabe ainda como verificar;
   - contradições entre documentos;
   - decisões sem opção escolhida;
   - ações ou decisões que não respondem a nenhum pedido do utilizador, ou que o contradizem;
   - perguntas obrigatórias sem nenhuma ação ou decisão que lhes responda (rastreabilidade).

   Quando um hook devolver uma lista de falhas de rastreabilidade ou do verificador semântico, cada ponto conta como encontrado neste passo.
2. **Regista.** Cada coisa encontrada passa a ser uma pergunta `aberta` em `objetivo.md`, se ainda lá não estiver.
3. **Se ainda há perguntas `aberta`**, faz a próxima, no formato da Fase 1. Com a resposta:
   - atualiza os documentos afetados;
   - se a resposta muda necessidades, revê as partes do plano e do custo-benefício que dependem delas;
   - volta ao passo 1.
4. **Se já não há nenhuma `aberta`**, corre o verificador e mostra ao utilizador a saída completa:

   ```
   node <pasta desta skill>/scripts/verificar.mjs arranque/<projeto>
   ```

   - Se falhar por outra razão que não a confirmação final, cada falha passa a pergunta `aberta`, e voltas ao passo 1.
   - Se a única falha for a confirmação final, pede-a:

     ```
     ✅ Todas as perguntas estão fechadas (<n> respondidas, <m> assumidas). Confirmas que chegámos a um entendimento comum e que o arranque está completo?
     ```

5. **Resposta à confirmação.**
   - **Sim:** marca a confirmação em `objetivo.md` com o nome do utilizador e a data, e **corre outra vez o verificador, mostrando a saída**. Só com `✓` é que mudas o estado para `Plano aprovado` e passas à Fase 4.
   - **Não:** o que faltar passa a pergunta `aberta`, e voltas ao passo 1.

## Fase 4. Execução

1. Muda o estado para `Fase 4` e cria `entrega.md` a partir de `modelos/entrega.md`.
2. Executa as ações do plano pela ordem e com as sessões decididas em `custo-beneficio.md`, seguindo os passos 5 e 6 de `../orchestrate-sessions/SKILL.md`: dás ao utilizador o comando e o briefing de cada sessão, lanças os subagentes do orquestrador com o modelo e o effort de cada tarefa, e recolhes as saídas com a prova e o custo do `/usage`.
3. Por cada ação terminada, preenche a linha em «Execução» com o mesmo número do plano: `feito` e onde ficou (commit, ficheiro ou URL).
4. Uma ação que não se consegue fazer como planeado não se muda em silêncio: passa a pergunta `aberta` em `objetivo.md`, voltas ao goal-loop com o utilizador, e o plano revisto volta a ser validado.
4a. Se o utilizador quiser que a execução continue sozinha até ao fim, incluindo depois de um limite de uso, segue `../orchestrate-sessions/modo-continuo.md`: as perguntas de onde corre e da quota fazem-se uma vez (a autonomia já ficou decidida na Fase 3), no formato da Fase 1, e ficam em «Decisões» de `custo-beneficio.md`.
5. Uma ação bloqueada só por valores que o utilizador tem de dar (segredos, identificadores, acessos) não volta ao goal-loop: fica `por preencher` em «Execução», com uma linha por valor em «Por preencher», e passas à ação seguinte. No fim da sessão pedes os valores, e a prova dessa ação faz-se na Fase 5 depois de ele os preencher.

## Fase 5. Verificação com prova

1. Muda o estado para `Fase 5`. Para cada ação, copia o critério de sucesso do plano para «Verificação» e prova-o: corre o comando ou o teste e cola a saída, ou indica o URL ou o ficheiro que qualquer pessoa pode abrir. Resultado `✓` só com prova. Se der `✗`, corrige (Fase 4) e volta a provar.
2. **Publicação (P14).** Se o projeto está exposto, corre e cola em «Publicação» a saída completa de:

   ```
   node <pasta da orchestrate-sessions>/scripts/verificar-publicacao.mjs https://<domínio> --admin <caminho da administração, sem barra inicial, ou URL completo>
   ```

   O script confirma que o HTTP redireciona para HTTPS, que o certificado é válido, que o TLS é 1.2 ou superior, que os cabeçalhos de segurança estão presentes e que a área de administração não abre sem login. Tem de terminar com `✓ Publicação verificada`. Sem exposição pública, escreve «Não aplicável:» e a razão.
3. **Acessos (P15).** Revê `acessos.md` com o utilizador: cada acesso confirmado e a data de revisão atualizada. Em «Acessos», escreve «Ver acessos.md, revisto em <data>», ou «Não aplicável:» e a razão.
3a. **Operação.** Se a mini skill `operar` estiver instalada (existe `../operar/SKILL.md`), é ela que faz este passo. Preenche «Operação» com um item por linha, a partir de `knowledge/fiabilidade/prontidao-operacional-e-passagem.md` (monitorização dos quatro sinais, runbooks, cópias de segurança 3-2-1 testadas, processo de incidentes, registo de alterações, sondas de saúde): o que ficou feito e a prova. É o documento que quem vai operar a plataforma recebe, para não precisar de saber como foi construída. Sem plataforma a operar, escreve «Não aplicável:» e a razão.
3b. **Humanizar.** Corre a mini skill `humanizar` sobre o que vai ser entregue, pede autorização para as correções e cola a saída final do verificador em «Verificação», como prova do critério «sem marcas de escrita de IA». Os achados que o utilizador decidiu manter ficam registados com a razão.
3c. **Documentação.** Se a skill `documentacao` estiver instalada (existe `../documentacao/SKILL.md`), corre o modo «gerar» dela. Os documentos (relatório final, Entendimento e livro de processos e estatísticas) entram em «Operação» como um item, com a saída do `verificar.mjs` dela como prova. Com «Operação» em «Não aplicável», os caminhos vão só para o relatório final.
4. Corre o verificador da entrega e mostra a saída completa:

   ```
   node <pasta desta skill>/scripts/verificar.mjs arranque/<projeto> --entrega
   ```

   Cada falha passa a pergunta `aberta` ou a trabalho da Fase 4. Quando a única falha for a aceitação, pede-a:

   ```
   ✅ Todas as ações estão feitas e provadas (<n> de <n>), a publicação, os acessos e a operação estão verificados. Aceitas a entrega?
   ```

5. **Sim:** marca a aceitação em `entrega.md` com o nome do utilizador e a data, corre outra vez o verificador da entrega e mostra a saída. Só com `✓ Entrega verificada` é que mudas o estado para `Concluído` e terminas com o relatório final. **Não:** o que faltar volta à Fase 4 ou ao goal-loop.

## Definição de feito

O projeto está feito quando, e só quando, se cumprem as quatro condições:

- [ ] o marco «Plano aprovado» foi atingido com `✓ Arranque completo` depois da confirmação final do utilizador;
- [ ] o verificador da entrega (`--entrega`) foi corrido **depois** da aceitação, e a saída, mostrada ao utilizador nesta conversa, é `✓ Entrega verificada`;
- [ ] a confirmação do plano e a aceitação da entrega foram dadas pelo utilizador, por palavras dele, e não deduzidas por ti;
- [ ] o estado em `objetivo.md` é `Concluído`. Se a guarda estiver instalada, só consegue lá chegar com os dois verificadores verdes.

Enquanto uma destas não se cumprir, o goal-loop continua.

**Não há outra saída do loop.** Se o utilizador quiser parar a meio:
- guarda o estado;
- diz-lhe que o loop continua da próxima vez que a skill for chamada para este projeto;
- não marques nada como concluído.

## Relatório final

Ao terminar, mostra:
- os caminhos dos documentos (`objetivo.md`, `necessidades.md`, `plano.md`, `custo-beneficio.md`, `entrega.md` e, se existir, `acessos.md`);
- os documentos da `documentacao` em `documentacao/`, se correu;
- a saída final de `verificar.mjs --entrega` e de `verificar-publicacao.mjs`;
- o número de perguntas respondidas e assumidas;
- os pressupostos aceites;
- as lacunas que ficam para o projeto resolver;
- a lista das sessões, com o orquestrador, e o modelo, o effort e o custo de cada uma.

---
name: start-project-with-trust
description: Arranca um projeto com um cliente e leva-o até à entrega verificada. Faz uma descoberta guiada, uma pergunta de cada vez, cruza as necessidades com a base de conhecimento em knowledge/, produz um plano e um plano custo-benefício (com orquestrador e sessões), fecha o marco «Plano aprovado», executa e só termina quando cada critério de sucesso tem prova e o utilizador aceita a entrega. Usar para iniciar ou retomar um projeto.
argument-hint: "Nome do projeto, ou nada para retomar o último"
---

# StartProjectWithTrust

Conduz um projeto do arranque à entrega verificada, sempre por esta ordem:

1. **Descoberta**: perceber o que o cliente precisa.
2. **Plano com o que temos**: cruzar as necessidades com `knowledge/`.
3. **Plano custo-benefício**: opções, orquestrador e sessões.
4. **Goal-loop**: voltar a perguntar até não haver nada em aberto e o utilizador confirmar. Termina no marco **«Plano aprovado»**.
5. **Fase 4 — Execução**: fazer cada ação do plano.
6. **Fase 5 — Verificação**: provar cada critério de sucesso, incluindo a publicação e os acessos, até o utilizador aceitar a entrega.

O goal-loop só fecha com a entrega verificada (`Concluído`), não com o plano.

Os caminhos `knowledge/`, `modelos/`, `scripts/` e `PERGUNTAS.md` são relativos à pasta deste `SKILL.md`.

## Regras em todas as fases

- **Não inventar.** Tudo o que vem do conhecimento cita o ficheiro e a página, por exemplo `knowledge/seguranca/autorizacao-no-servidor.md` (pág. 3). O que for interpretação tua leva a marca *(interpretação)*.
- **Os factos são teus, as decisões são do utilizador.** Se um facto se pode verificar no ambiente (ficheiros, repositório, ferramentas), verifica-o tu e não perguntes. As decisões vão sempre ao utilizador.
- **Uma pergunta de cada vez**, sempre no formato da Fase 1, e espera pela resposta.
- **O estado vive em ficheiro.** Depois de cada resposta, atualiza os documentos em `arranque/<projeto>/` antes de fazer a pergunta seguinte.
- **Não saltar fases.** Cada fase termina com validação do utilizador.
- **Nunca respondes pelo utilizador.** Validações, pressupostos aceites e a confirmação final só se marcam quando o utilizador os deu na própria mensagem.
- **Sem marcas de escrita de IA no que se entrega.** Código, textos da interface, documentação, mensagens de commit e conteúdos do projeto têm de parecer escritos por uma pessoa da equipa:
  - sem travessões (— ou –) a ligar frases: usa vírgula, ponto, dois pontos ou parênteses;
  - sem ponto médio (·) nem outros símbolos decorativos como separadores;
  - sem emojis em interfaces, logs, comentários ou commits, salvo se o design do cliente os pedir;
  - títulos com maiúscula só na primeira palavra e nos nomes próprios;
  - sem fórmulas feitas («é importante notar», «em suma», «não só… mas também», «robusto», «perfeito», «sem complicações») nem enumerações de três só por ritmo;
  - negrito só onde ajuda a ler, listas só quando há de facto itens;
  - comentários no código só onde explicam o porquê; nada de narrar o que a linha seguinte faz;
  - alinhamento e formatação de quem formata o projeto (formatter e linter do repositório), sem alinhar à mão com espaços nem desenhar caixas em ASCII;
  - sem aberturas e fechos de assistente («Claro!», «Ótima pergunta», «Se precisares de mais alguma coisa…») nem resumos finais que repetem o que já foi dito;
  - sem a construção «não é X, é Y», sem perguntas retóricas seguidas da resposta («O resultado? …») e sem reticências de suspense;
  - sem palavras de brochura: «crucial», «fundamental», «poderoso», «intuitivo», «de ponta», «potenciar», «elevar», «desbloquear», «mergulhar», «jornada», «ecossistema», «panorama», «no mundo atual», «em constante evolução»;
  - sem ressalvas em cascata («pode potencialmente», «de certa forma») nem pontos de exclamação em texto técnico;
  - sem itens de lista todos no formato «**Termo:** explicação» quando uma frase normal chega;
  - sem setas (→) nem símbolos (✓, ✨, 🚀) em texto do produto, títulos ou botões;
  - frases de comprimento variado, sem paralelismos perfeitos nem títulos com dois pontos e subtítulo («Gestão: simples e eficaz»);
  - uma só variante da língua: em português de Portugal, nada de «você», «tela», «arquivo», «usuário»; e as aspas da convenção do projeto, sem misturar «» com “”;
  - no código: nomes que dizem o que a coisa é (nada de `data`, `result`, `handleStuff`), sem comentário de cabeçalho em todas as funções, sem `try/catch` que só regista e relança, sem verificações para casos impossíveis, sem logs como «✅ Done!»;
  - nos commits: mensagem curta no estilo do repositório, sem emojis nem listas longas;
  - nada de texto de exemplo em produção («Lorem ipsum», «John Doe») nem números ou estatísticas inventados.

  Antes de entregar, relê o texto à procura destes padrões.
- **Adotar antes de construir.** Antes de propores desenvolvimento, procura uma plataforma que já resolva a necessidade, ou uma forma de ligar plataformas que sirva de atalho (API, webhooks, MCP, automação). Open source primeiro. Desenvolver de raiz é uma das opções, nunca a única. Se o utilizador preferir desenvolver, segue o desenvolvimento normal.

## Início

1. A pasta de trabalho é `arranque/<projeto>/`, no diretório atual. Se o utilizador não disser o nome do projeto, pergunta-o.
2. **Se a pasta já existe**, lê `objetivo.md`, diz em que fase o trabalho ficou e retoma a partir daí.
3. **Se não existe**, cria-a com cópias de `modelos/objetivo.md`, `modelos/necessidades.md`, `modelos/plano.md` e `modelos/custo-beneficio.md`. Depois preenche a tabela «Perguntas obrigatórias» de `objetivo.md` com todas as perguntas de `PERGUNTAS.md`, com o estado `aberta`.
4. **Hooks do goal-loop (só no Claude Code).** Se `.claude/hooks/start-project-with-trust/` ainda não existe no projeto, pergunta ao utilizador se quer instalar os três hooks. Explica-lhe o que cada um faz:
   - **Guarda** (PreToolUse): impede marcar o estado como `Plano aprovado`, `Fase 4` ou `Fase 5` enquanto o verificador do plano encontrar falhas, e como `Concluído` enquanto o plano ou a entrega tiverem falhas.
   - **Rastreabilidade** (PostToolUse, determinística): depois de cada escrita no plano ou no custo-benefício, confirma que cada ação e decisão responde a perguntas do utilizador que existem e estão fechadas.
   - **Verificador semântico** (PostToolUse, usa um modelo; funcionalidade experimental do Claude Code): confirma que cada decisão responde de facto ao que o utilizador pediu e não contradiz as restrições dele. Gasta tokens a cada edição desses ficheiros.

   Se ele aceitar:
   1. copia `scripts/verificar.mjs`, `scripts/guarda-hook.mjs`, `scripts/rastreabilidade-hook.mjs` e `PERGUNTAS.md` para `.claude/hooks/start-project-with-trust/`;
   2. junta as entradas de `scripts/hooks-settings.json` a `hooks.PreToolUse` e `hooks.PostToolUse` em `.claude/settings.json`. Se o ficheiro não existe, cria-o. Se já existe, acrescenta sem apagar nada do que lá está. Se o utilizador recusar só o verificador semântico, não copies o handler `"type": "agent"`;
   3. diz ao utilizador que os hooks normalmente ficam ativos logo, mas que pode confirmar em `/hooks` ou reiniciar a sessão.

   Se ele recusar, ou se o agente não for o Claude Code, continua: o verificador do goal-loop aplica-se na mesma, incluindo a rastreabilidade.

Os estados possíveis de cada pergunta em `objetivo.md`:
- `aberta`: ainda sem resposta.
- `respondida`: tem resposta concreta.
- `assumida`: o utilizador aceitou explicitamente um pressuposto, que fica registado na tabela «Pressupostos».

## Fase 1 — Descoberta

Faz uma pergunta de cada vez, neste formato:

```
❓ **P9 — Recursos**: <pergunta, com o contexto que já se sabe>

Opções, da mais barata à mais cara:
1. **<opção>**: <o que implica>. Custo: <valor com fonte, ou baixo/médio/alto *(estimativa)*>
2. **<opção>**: <o que implica>. Custo: <…>
3. **<opção>**: <o que implica>. Custo: <…>
✏️ **Outra**: descreve a tua, se nenhuma servir.

➡️ Recomendação: <número da opção> (<porquê, numa frase>)
```

- **Opções:** 2 a 4 soluções concretas, ordenadas por custo da mais barata para a mais cara. Inclui sempre a alternativa «Outra», para o utilizador propor a sua.
- **Custo:** um valor em dinheiro só pode vir do utilizador ou de `knowledge/`, com a fonte indicada. Fora disso, usa a escala relativa marcada como *(estimativa)*. Quando uma opção tem base no conhecimento, cita o ficheiro.
- **Perguntas sobre factos que só o utilizador sabe** (por exemplo P4 «para quem» ou P7 «prazo»): mostra as respostas típicas como opções. Se o custo não as distingue, escreve «sem impacto direto no custo» em vez de inventar uma ordem.
- Formula a pergunta de modo a que um «sim» aceite a recomendação. A resposta pode ser o número de uma opção, «sim» ou uma alternativa do utilizador.

**Que pergunta fazer a seguir.** As perguntas obrigatórias de `PERGUNTAS.md` são a base, mas a próxima pergunta depende da resposta anterior:
- se a resposta abre uma dúvida que muda as perguntas seguintes, faz primeiro uma pergunta de seguimento e regista-a em `objetivo.md` como `S<n>`, com a pergunta de origem;
- se uma resposta já responde a outra pergunta obrigatória, marca essa também como `respondida` e diz ao utilizador que o fizeste;
- uma resposta vaga não fecha a pergunta: faz um seguimento até ela ser verificável. Por exemplo, «rápido» não chega; «até 2 segundos» chega;
- a um «não sei», propõe um pressuposto. Só se o utilizador o aceitar explicitamente é que a pergunta fica `assumida`.

**Depois de cada resposta**, atualiza `objetivo.md` (estado e resposta resumida) e a secção certa de `necessidades.md`.

**Acesso remoto (P15).** Se a resposta a P15 indica servidores ou máquinas com acesso SSH ou RDP, cria `acessos.md` a partir de `modelos/acessos.md` e regista uma linha por acesso. **Nunca escrevas lá chaves, passwords nem tokens**: só a referência ao cofre onde estão. O verificador falha se encontrar um segredo. Base: `knowledge/acesso-remoto/`.

**Fim da Fase 1.** Quando nenhuma pergunta obrigatória estiver `aberta`, mostra o resumo de `necessidades.md` e pede validação. Se o utilizador corrigir algo, atualiza e volta a pedir. Só depois de validado é que passas à Fase 2.

## Fase 2 — Plano com o que temos

1. Lê `knowledge/INDEX.md` e escolhe as entradas relevantes para as necessidades. As pistas «Liga a» de `PERGUNTAS.md` ajudam. Lê esses ficheiros.
1a. **Atalhos antes do código.** Para cada necessidade funcional (tickets, contratos, faturação, CRM, conteúdos, dashboards, formulários, automações…):
   - procura em `knowledge/plataformas/` uma plataforma que a cubra, toda ou em parte, e como se liga ao resto (API, webhooks, MCP);
   - se lá não houver nenhuma adequada, pesquisa nas fontes oficiais (site, documentação ou repositório do próprio projeto) plataformas open source que a cubram. Cita cada URL e marca o resultado como *(pesquisa de <data>, fora de knowledge/)*. Nunca apresentes como oficial um servidor MCP da comunidade;
   - regista os candidatos em `plano.md`, na secção «Plataformas candidatas», com o que cobrem, o que falta e como se ligam. A escolha entre adotar e construir é feita na Fase 3.
2. Para cada necessidade, escreve em `plano.md`:
   - em «Responde a», os IDs das perguntas de `objetivo.md` (P/S) cujas respostas pedem esta ação. Uma ação que não responde a nenhum pedido não entra no plano;
   - a ação a tomar;
   - o recurso que a executa, que tem de ser um dos que o cliente declarou na pergunta P9;
   - a base no conhecimento (ficheiro e página);
   - o critério de sucesso, partindo da linha «Para uma skill:» da entrada usada.
3. **Só recursos declarados.** Se uma boa prática exige um recurso que o cliente não tem, não o dês como disponível. Regista-o em «Lacunas» e acrescenta a `objetivo.md` uma pergunta `aberta` sobre ele.
4. **Sem base, não inventes.** Se uma necessidade não tem entrada correspondente em `knowledge/`, escreve-o em «Fora do conhecimento» em vez de inventar uma prática.
5. Mostra o resumo do plano e pede validação.

## Fase 3 — Plano custo-benefício

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
   - **Decisão obrigatória: execução em paralelo.** Inclui sempre uma decisão sobre quantas sessões Claude correm em paralelo. As opções vão de tudo sequencial (mais barato em tokens, mais lento) a várias sessões em paralelo (mais tokens, menos tempo). Base: `knowledge/ia/subagentes-e-orquestracao.md` (pág. 68): só há paralelo quando o trabalho é independente.
2. **Orquestrador.** Por omissão, o orquestrador é a **sessão 0**, a própria sessão que corre esta skill. Faz quatro coisas:
   - coordena a ordem do trabalho;
   - prepara o briefing de cada sessão de trabalho (o que entra);
   - **pede ao utilizador para abrir as sessões Claude que vão correr em paralelo**, indicando para cada uma o briefing a colar;
   - recolhe o que cada sessão devolve (o que sai) e integra.

   Se o utilizador escolher outro orquestrador (uma pessoa, um papel ou outro agente), regista-o. Indica também o que o orquestrador decide e como aprova. Leva «Responde a», normalmente P13 e P9.
3. **Sessões.** Uma tabela com as colunas número, tipo (`orquestrador` ou `trabalho`), objetivo, o que entra, o que sai, em paralelo com, como abrir, quem participa e critério de fim.
   - A sessão 0 é sempre a do orquestrador.
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

## Fase 4 — Execução

1. Muda o estado para `Fase 4` e cria `entrega.md` a partir de `modelos/entrega.md`.
2. Executa as ações do plano pela ordem e com as sessões decididas em `custo-beneficio.md`. Como orquestrador, pede ao utilizador para abrir as sessões em paralelo, com o briefing de cada uma.
3. Por cada ação terminada, preenche a linha em «Execução» com o mesmo número do plano: `feito` e onde ficou (commit, ficheiro ou URL).
4. Uma ação que não se consegue fazer como planeado não se muda em silêncio: passa a pergunta `aberta` em `objetivo.md`, voltas ao goal-loop com o utilizador, e o plano revisto volta a ser validado.

## Fase 5 — Verificação com prova

1. Muda o estado para `Fase 5`. Para cada ação, copia o critério de sucesso do plano para «Verificação» e prova-o: corre o comando ou o teste e cola a saída, ou indica o URL ou o ficheiro que qualquer pessoa pode abrir. Resultado `✓` só com prova. Se der `✗`, corrige (Fase 4) e volta a provar.
2. **Publicação (P14).** Se o projeto está exposto, corre e cola em «Publicação» a saída completa de:

   ```
   node <pasta desta skill>/scripts/verificar-publicacao.mjs https://<domínio> --admin <caminho da administração, sem barra inicial, ou URL completo>
   ```

   O script confirma que o HTTP redireciona para HTTPS, que o certificado é válido, que o TLS é 1.2 ou superior, que os cabeçalhos de segurança estão presentes e que a área de administração não abre sem login. Tem de terminar com `✓ Publicação verificada`. Sem exposição pública, escreve «Não aplicável:» e a razão.
3. **Acessos (P15).** Revê `acessos.md` com o utilizador: cada acesso confirmado e a data de revisão atualizada. Em «Acessos», escreve «Ver acessos.md, revisto em <data>», ou «Não aplicável:» e a razão.
4. Corre o verificador da entrega e mostra a saída completa:

   ```
   node <pasta desta skill>/scripts/verificar.mjs arranque/<projeto> --entrega
   ```

   Cada falha passa a pergunta `aberta` ou a trabalho da Fase 4. Quando a única falha for a aceitação, pede-a:

   ```
   ✅ Todas as ações estão feitas e provadas (<n> de <n>), a publicação e os acessos estão verificados. Aceitas a entrega?
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
- a saída final de `verificar.mjs --entrega` e de `verificar-publicacao.mjs`;
- o número de perguntas respondidas e assumidas;
- os pressupostos aceites;
- as lacunas que ficam para o projeto resolver;
- a lista das sessões, com o orquestrador.

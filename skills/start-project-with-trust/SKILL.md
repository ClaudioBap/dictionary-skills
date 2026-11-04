---
name: start-project-with-trust
description: Arranca um projeto com um cliente. Faz uma descoberta guiada, uma pergunta de cada vez, cruza as necessidades com a base de conhecimento em knowledge/, produz um plano e um plano custo-benefício (com orquestrador e sessões), e só termina quando todas as perguntas estão respondidas e o utilizador confirma. Usar para iniciar ou retomar o arranque de um projeto.
argument-hint: "Nome do projeto, ou nada para retomar o último"
---

# StartProjectWithTrust

Conduz o arranque de um projeto em três fases e um goal-loop, sempre por esta ordem:

1. **Descoberta**: perceber o que o cliente precisa.
2. **Plano com o que temos**: cruzar as necessidades com `knowledge/`.
3. **Plano custo-benefício**: opções, orquestrador e sessões.
4. **Goal-loop**: voltar a perguntar até não haver nada em aberto e o utilizador confirmar.

Os caminhos `knowledge/`, `modelos/`, `scripts/` e `PERGUNTAS.md` são relativos à pasta deste `SKILL.md`.

## Regras em todas as fases

- **Não inventar.** Tudo o que vem do conhecimento cita o ficheiro e a página, por exemplo `knowledge/seguranca/autorizacao-no-servidor.md` (pág. 3). O que for interpretação tua leva a marca *(interpretação)*.
- **Os factos são teus, as decisões são do utilizador.** Se um facto se pode verificar no ambiente (ficheiros, repositório, ferramentas), verifica-o tu e não perguntes. As decisões vão sempre ao utilizador.
- **Uma pergunta de cada vez**, sempre no formato da Fase 1, e espera pela resposta.
- **O estado vive em ficheiro.** Depois de cada resposta, atualiza os documentos em `arranque/<projeto>/` antes de fazer a pergunta seguinte.
- **Não saltar fases.** Cada fase termina com validação do utilizador.
- **Nunca respondes pelo utilizador.** Validações, pressupostos aceites e a confirmação final só se marcam quando o utilizador os deu na própria mensagem.

## Início

1. A pasta de trabalho é `arranque/<projeto>/`, no diretório atual. Se o utilizador não disser o nome do projeto, pergunta-o.
2. **Se a pasta já existe**, lê `objetivo.md`, diz em que fase o trabalho ficou e retoma a partir daí.
3. **Se não existe**, cria-a com cópias de `modelos/objetivo.md`, `modelos/necessidades.md`, `modelos/plano.md` e `modelos/custo-beneficio.md`. Depois preenche a tabela «Perguntas obrigatórias» de `objetivo.md` com todas as perguntas de `PERGUNTAS.md`, com o estado `aberta`.
4. **Guarda do goal-loop (só no Claude Code).** Se `.claude/hooks/start-project-with-trust/guarda-hook.mjs` ainda não existe no projeto, pergunta ao utilizador se a quer instalar. Explica-lhe que é um hook que impede marcar o arranque como `Concluído` enquanto o verificador encontrar falhas. Se ele aceitar:
   1. copia `scripts/verificar.mjs`, `scripts/guarda-hook.mjs` e `PERGUNTAS.md` para `.claude/hooks/start-project-with-trust/`;
   2. acrescenta esta entrada a `hooks.PreToolUse` em `.claude/settings.json`. Se o ficheiro não existe, cria-o. Se já existe, não apagues nada do que lá está:
      ```json
      {
        "matcher": "Write|Edit|MultiEdit|Bash",
        "hooks": [
          { "type": "command", "command": "node \"$CLAUDE_PROJECT_DIR/.claude/hooks/start-project-with-trust/guarda-hook.mjs\"" }
        ]
      }
      ```
   3. diz ao utilizador que a guarda pode só ficar ativa depois de reiniciar a sessão ou de a rever em `/hooks`.

   Se ele recusar, ou se o agente não for o Claude Code, continua: o verificador do goal-loop aplica-se na mesma.

Os estados possíveis de cada pergunta em `objetivo.md`:
- `aberta`: ainda sem resposta.
- `respondida`: tem resposta concreta.
- `assumida`: o utilizador aceitou explicitamente um pressuposto, que fica registado na tabela «Pressupostos».

## Fase 1 — Descoberta

Faz uma pergunta de cada vez, neste formato:

```
❓ **P3 — Sucesso**: <pergunta, com o contexto que já se sabe>

➡️ Recomendação: <a tua resposta recomendada, ou «sem recomendação: preciso desta informação tua»>
```

Formula a pergunta de modo a que um «sim» aceite a recomendação.

**Que pergunta fazer a seguir.** As perguntas obrigatórias de `PERGUNTAS.md` são a base, mas a próxima pergunta depende da resposta anterior:
- se a resposta abre uma dúvida que muda as perguntas seguintes, faz primeiro uma pergunta de seguimento e regista-a em `objetivo.md` como `S<n>`, com a pergunta de origem;
- se uma resposta já responde a outra pergunta obrigatória, marca essa também como `respondida` e diz ao utilizador que o fizeste;
- uma resposta vaga não fecha a pergunta: faz um seguimento até ela ser verificável. Por exemplo, «rápido» não chega; «até 2 segundos» chega;
- a um «não sei», propõe um pressuposto. Só se o utilizador o aceitar explicitamente é que a pergunta fica `assumida`.

**Depois de cada resposta**, atualiza `objetivo.md` (estado e resposta resumida) e a secção certa de `necessidades.md`.

**Fim da Fase 1.** Quando nenhuma pergunta obrigatória estiver `aberta`, mostra o resumo de `necessidades.md` e pede validação. Se o utilizador corrigir algo, atualiza e volta a pedir. Só depois de validado é que passas à Fase 2.

## Fase 2 — Plano com o que temos

1. Lê `knowledge/INDEX.md` e escolhe as entradas relevantes para as necessidades. As pistas «Liga a» de `PERGUNTAS.md` ajudam. Lê esses ficheiros.
2. Para cada necessidade, escreve em `plano.md`:
   - a ação a tomar;
   - o recurso que a executa, que tem de ser um dos que o cliente declarou na pergunta P9;
   - a base no conhecimento (ficheiro e página);
   - o critério de sucesso, partindo da linha «Para uma skill:» da entrada usada.
3. **Só recursos declarados.** Se uma boa prática exige um recurso que o cliente não tem, não o dês como disponível. Regista-o em «Lacunas» e acrescenta a `objetivo.md` uma pergunta `aberta` sobre ele.
4. **Sem base, não inventes.** Se uma necessidade não tem entrada correspondente em `knowledge/`, escreve-o em «Fora do conhecimento» em vez de inventar uma prática.
5. Mostra o resumo do plano e pede validação.

## Fase 3 — Plano custo-benefício

Escreve `custo-beneficio.md` com quatro partes:

1. **Decisões.** Para cada decisão do plano com mais de uma opção, uma tabela com as colunas opção, custo, benefício, risco e base no conhecimento, e no fim a recomendação.
   - Um custo em dinheiro só pode vir do cliente ou de `knowledge/`, com a fonte indicada.
   - Fora disso, usa uma escala relativa (baixo, médio, alto) e marca-a como *(estimativa)*.
2. **Orquestrador.** Quem ou o quê coordena o trabalho (pessoa, papel ou agente), o que decide, como aprova e como acompanha as sessões.
3. **Sessões.** Uma tabela com: número, objetivo, o que entra, o que sai, quem participa e critério de fim. A saída de cada sessão é a entrada de uma sessão seguinte, ou uma entrega final.
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
   - decisões sem opção escolhida.
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
   - **Sim:** marca a confirmação em `objetivo.md` com o nome do utilizador e a data, e **corre outra vez o verificador, mostrando a saída**. Só com `✓` é que mudas o estado para `Concluído` e terminas com o relatório final.
   - **Não:** o que faltar passa a pergunta `aberta`, e voltas ao passo 1.

## Definição de feito

O arranque está feito quando, e só quando, se cumprem as três condições:

- [ ] o verificador foi corrido **depois** da confirmação final, e a saída, mostrada ao utilizador nesta conversa, é `✓ Arranque completo`;
- [ ] a confirmação final foi dada pelo utilizador, por palavras dele, e não deduzida por ti;
- [ ] o estado em `objetivo.md` é `Concluído`. Se a guarda estiver instalada, só consegue lá chegar com o verificador verde.

Enquanto uma destas não se cumprir, o goal-loop continua.

**Não há outra saída do loop.** Se o utilizador quiser parar a meio:
- guarda o estado;
- diz-lhe que o loop continua da próxima vez que a skill for chamada para este projeto;
- não marques nada como concluído.

## Relatório final

Ao terminar, mostra:
- os caminhos dos quatro documentos;
- o número de perguntas respondidas e assumidas;
- os pressupostos aceites;
- as lacunas que ficam para o projeto resolver;
- a lista das sessões, com o orquestrador.

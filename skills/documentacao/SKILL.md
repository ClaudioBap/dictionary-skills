---
name: documentacao
description: "Documenta um projeto enquanto se trabalha e no fim. Cada skill que faz trabalho escreve o relatório do seu processo (Markdown com um cabeçalho de campos) em documentacao/processos/; esta skill junta-os com o git log e as saídas da orquestração e gera um livro Excel com os processos e as estatísticas (em fórmulas), o Word «Entendimento do desenvolvimento» e o relatório final em Word, ligado aos outros. Antes de gerar, pede 2 a 3 ficheiros-padrão da casa (aconselha um Excel, um PowerPoint, um PDF e um Word) para seguir o estilo; sem eles, usa um estilo sóbrio, revisto pela humanizar e pela design-ux. Usar para documentar um projeto, no fim de cada processo, no fim de uma fase da orchestrate-sessions ou na entrega da start-project-with-trust. É uma sub skill, que faz uma parte do trabalho, sozinha ou chamada por uma skill mãe."
argument-hint: "«processo» para registar o trabalho que acabou, «gerar» para os documentos, ou nada para perguntar"
metadata:
  estado: produção
  tipo: sub
  usa: [humanizar, design-ux]
  impacto: { ia: 3, seguranca: 2, nuvem: 3, desenvolvimento: 7, web: 2 }
---

# Documentacao

Os caminhos `modelos/` e `scripts/` são relativos à pasta deste `SKILL.md`. O caminho do conhecimento obtém-se com `node ../orchestrate-sessions/scripts/conhecimento.mjs`; as referências `knowledge/...` são relativas a esse caminho.

## Âmbito

Sabe registar cada processo de um projeto. A partir desses registos, do `git log` e das saídas da orquestração, gera o livro Excel de processos e estatísticas, o Word «Entendimento do desenvolvimento» e o relatório final, no estilo da casa quando lhe dão ficheiros-padrão. Também reconstrói os relatórios de um projeto que já vai a meio. Lê as entradas de `knowledge/estrutura/` do passo «Recolher».

Não sabe:

- escrever o README, um ADR ou a documentação técnica do código. São documentos do próprio projeto, feitos com as entradas de `knowledge/estrutura/`; os comentários do código são da `boas-praticas-codigo`, e o contrato de uma API é da `backend-dados`;
- escrever o runbook e o documento de operação: é da `operar`;
- fazer um manual ou um tutorial em vídeo: é da `gravacao-video`;
- rever só o texto de um documento que já existe: é da `humanizar`;
- fazer apresentações, propostas comerciais ou atas, que ficam fora da base. Gera só o Excel e os Word, a partir de `modelos/`; para outro formato, diz que não o faz.

Pedidos que se confundem:

- «Documenta o projeto»: é desta skill quando se quer o registo do que se fez e porquê, e da `operar` quando se quer saber como manter a plataforma de pé.
- «Documenta a API»: é da `backend-dados`.
- «Faz o relatório»: é o relatório final desta skill se é sobre um projeto com processos; o resultado de uma auditoria é da `seguranca`, e uma medição de desempenho é da `performance-verifier`.

Quando parte do pedido é de outra skill, diz qual e porquê. Se foi chamada por uma skill mãe, devolve-lhe essa parte no relatório; se está sozinha, recomenda a skill pelo nome. O padrão comum está em `../orchestrate-sessions/regras.md`.

## O que fica no projeto

Tudo vive em `documentacao/`, na raiz do repositório do projeto:

| Ficheiro | O que é | Quem o escreve |
|---|---|---|
| `processos/P-<nnnn>-<assunto>.md` | Relatório de cada processo | A skill que fez o trabalho, quando acaba (modo «processo») |
| `processos-e-estatisticas.xlsx` | Separadores Processos, Estatísticas e Commits | `scripts/gerar.mjs` |
| `entendimento.md` e `entendimento.docx` | Como o projeto funciona e porque ficou assim, para quem chega | Esta skill escreve o `.md`; o script gera o `.docx` |
| `relatorio-final.md` e `relatorio-final.docx` | Resumo para quem decide, com ligações aos outros documentos | Esta skill escreve o `.md`; o script gera o `.docx` |
| `padrao.json` e `padrao/` | O estilo da casa (letras, cores, página, logo) | `scripts/padrao.mjs`, confirmado pelo utilizador |

Os Markdown são a fonte. O Excel e os Word geram-se sempre de novo a partir deles, por isso uma correção faz-se no relatório e não no Excel. Depois de entregue, quem corrigir uma linha no separador Processos vê as estatísticas acertarem-se sozinhas, porque são fórmulas.

As saídas das sessões da `orchestrate-sessions` (`orquestracao/*/saidas/*.md`) que levam o cabeçalho de processo contam como relatórios: não se escreve outro para o mesmo trabalho.

## Regras

- Seguem-se as regras comuns de `../orchestrate-sessions/regras.md`: não inventar; os factos verificas tu, as decisões são do utilizador; uma pergunta de cada vez, no formato que lá está; sem marcas de escrita de IA; autonomia depois da decisão.
- **Cada número vem de algum lado.** As contagens saem dos relatórios e do `git log`, pelo script. No Entendimento e no relatório final, cada afirmação sobre o projeto cita o ficheiro de onde vem (ADR, plano, saída, commit). O que não se sabe escreve-se assim: «não registado». Nunca se estima uma duração, um modelo ou um custo que ninguém mediu.
- **Sem segredos nem dados pessoais.** Os documentos podem sair para o cliente: nada de tokens, chaves, palavras-passe, emails, IPs internos nem dados de clientes que não estejam já no âmbito do documento.
- **Do ficheiro-padrão só se tira o estilo**, nunca o conteúdo. Os ficheiros que o utilizador dá ficam fora do repositório; só o `padrao.json` e o logo entram.
- **Nível e modelo** (`../orchestrate-sessions/modelo-e-effort.md`): o relatório de um processo escreve-o a própria sessão que fez o trabalho, sem sessão nova. O Entendimento e o relatório final são «Escrever para outros», no nível do projeto. Gerar e verificar são scripts, sem modelo.

## Perceber o pedido

Chamada por outra skill no fim de um trabalho, é o modo «processo» e não pergunta nada. Sozinha, com «processo» ou «gerar» no pedido, segue para esse modo. Com um pedido vago ou vazio, pergunta só o que falta, uma coisa de cada vez e no formato de `../orchestrate-sessions/regras.md`, e pára quando tiver as respostas:

1. **Que projeto:** o repositório onde está, ou outro (diz qual). Fora de um repositório git, o `gerar.mjs` precisa de `--raiz`.
2. **Para quem,** do mais barato ao mais caro:
   - registar o trabalho que acabou: o modo «processo», um relatório;
   - quem decide: os relatórios, o Excel e o relatório final;
   - quem vai manter o projeto: tudo isto e o Entendimento (recomendado quando o projeto muda de mãos ou se entrega).
3. **Desde quando,** só se há commits sem relatório: a partir de agora (mais barato), ou também o trabalho já feito, reconstruído a partir das saídas, dos planos e dos commits, como no passo 2 de «Recolher» (recomendado num projeto que se vai entregar).

O estilo da casa pergunta-se depois, no passo 1 do modo «gerar».

## Modo «processo»

Chamado no fim do trabalho por outra skill, ou diretamente.

1. **Conta como processo** uma tarefa que entregou alguma coisa, ou tentou e falhou: uma tarefa da orquestração, uma ação do plano, uma corrida de uma mini skill que alterou ficheiros. Uma consulta, uma resposta sem alterações ou uma verificação pedida por outra skill não leva relatório próprio: entra no de quem a pediu.
2. Escolhe o número seguinte ao maior que existir em `documentacao/processos/` (`P-0001`, `P-0002`, …) e copia `modelos/processo.md` para `documentacao/processos/P-<nnnn>-<assunto curto>.md`.
3. Preenche o cabeçalho só com o que se verifica: a data de início e de fim, a skill, o modelo e o effort da sessão, os commits (do `git log`), o estado e se há prova. Os campos que não se sabem ficam vazios.
4. Escreve as secções do modelo em poucas linhas cada: o que foi pedido e por quem, o que se fez, a prova (comando e saída, ficheiro, URL ou captura), as decisões tomadas e quem as tomou, e o que ficou por fazer ou por preencher. Escreve para quem vai ler daqui a um ano sem ter estado lá.
5. Numa sessão da orquestração, o cabeçalho vai para a saída da sessão (`saidas/S<n>.md`), e o resto da saída fica como está.

### Regras do cabeçalho

- `skill`: a mini skill ou as skills que fizeram o trabalho, separadas por vírgula. Uma sessão do orquestrador sem mini skill é `orchestrate-sessions`. Sem registo nenhum, `nao-registada`: é o único marcador que um campo obrigatório aceita.
- `sessao`: o nome do ficheiro da saída sem extensão (ex.: `S2-O2`). Quando colide com o nome de uma fase, diz-se no corpo.
- `modelo` e `effort`: os do orquestrador para essa tarefa (`estado.json` ou `sessoes.md`). Com várias tarefas, os valores separados por vírgula, pela ordem delas. Uma divergência entre fontes vai no corpo.
- `inicio` e `fim`: datas `AAAA-MM-DD`, as da saída ou do commit. Sem commit, `fim` é a data da saída.
- `estado`: `parcial` quando a saída lista falhas abertas ou partes da mesma entrega por fazer; uma entrega fechada dentro de uma fase ainda aberta é `feito`.
- `retrabalho`: só o que o utilizador pediu para mudar no que já estava entregue. Pedidos novos não contam.
- `duracao_min`: só o que está registado. Se for o tempo de um subagente e não da sessão, o corpo diz.
- `commits`: só hashes do repositório do projeto, atribuídos pelo que o commit altera (`git show --stat`) e não pela mensagem. Commits de outros repositórios vão no corpo, com o nome do repositório.
- No corpo: sem caminhos absolutos com o nome do utilizador e sem endereços IP.

## Modo «gerar»

### 1. O padrão da casa

Se já existe `documentacao/padrao.json`, usa-o e diz de que ficheiros veio. Se não existe, pergunta, numa só pergunta no formato de `../orchestrate-sessions/regras.md`:

```
📌 Estilo dos documentos

Para o Excel e os Word seguirem o estilo da tua empresa, dá-me 2 a 3 ficheiros que já o usem. Aconselho um Excel, um PowerPoint, um PDF e um Word: do Word e do PowerPoint tiro as letras, as cores, a página e o logo; do Excel, a letra e o cabeçalho das tabelas; do PDF, as letras. Só tiro o estilo, nunca o conteúdo.

1. Dou-te os ficheiros (recomendado): diz-me onde estão.
2. Usa o teu estilo: sóbrio, de escritório, revisto pela humanizar e pela design-ux.
```

Com ficheiros:

1. Corre `node scripts/padrao.mjs <ficheiros> --pasta documentacao`. O script lê o tema, as letras, a página, o logo e o rodapé dos ficheiros do Office. Do PDF só tira as letras: abre-o tu, vê as cores dos títulos e das tabelas e o logo, e completa o `padrao.json` à mão.
2. Mostra o resumo que o script imprime, com os conflitos entre ficheiros, e pede confirmação numa pergunta. Só segues com o padrão confirmado.

Sem ficheiros, os scripts usam o estilo por omissão e o controlo faz-se no passo 5.

### 2. Recolher

1. Os relatórios: `documentacao/processos/` e as saídas da orquestração com cabeçalho.
2. O trabalho sem relatório: compara o `git log` com os commits dos relatórios. Para trabalho antigo, reconstrói o relatório a partir das saídas, dos planos, dos ADR e dos commits, com `reconstruido: true` no cabeçalho e as fontes no corpo, ligadas por caminho relativo. Os campos sem registo ficam vazios.
   - Começa por `git log --reverse --format="%h %ad %s" --date=short` e vê com `git show --stat` os commits cuja mensagem não bate com o que alteram.
   - Conta como processo cada saída de sessão, cada tarefa da tabela do orquestrador (mesmo sem saída), cada ADR com commit próprio e o planeamento de cada fase. O trabalho anterior à orquestração agrupa-se por tema e por dia, nunca um relatório por commit.
   - Se a saída e os commits discordam, o `estado` segue a saída e o corpo cita os commits. Uma saída com tarefas «por fazer» é `parcial`.
   - Empates na ordem dos `id` resolvem-se pela ordem da tabela do orquestrador.
3. As fontes do Entendimento: o README, `docs/adr/`, os planos (`orquestracao/*/plano.md`, `arranque/<projeto>/plano.md` e `entrega.md`), o RUNBOOK, os requisitos e a estrutura do repositório.
4. A base para escrever: `knowledge/estrutura/documentacao-em-camadas.md`, `decisoes-registadas-adr.md`, `documento-de-estado-vivo.md`, `registo-de-alteracoes.md` e `como-escrever-um-documento-de-referencia.md`. Lê só o que o projeto toca.

### 3. Escrever

1. Corre `node scripts/gerar.mjs` uma primeira vez. Gera o Excel e imprime os totais.
2. Escreve `documentacao/entendimento.md` a partir de `modelos/entendimento.md`. É para quem chega ao projeto e o vai manter: o que é e para quem, como as peças se ligam, as decisões e porquê, a cronologia por fase, como se trabalha nele, os limites e riscos conhecidos e um glossário curto.
   - Uma subsecção por decisão que pesa a quem mantém, juntando os ADR que a criaram ou mudaram: o que se decidiu, a alternativa posta de parte, a razão e as ligações.
   - Quando o código e os ADR divergem, descreve o que o código faz e põe a divergência em «Limites e riscos», com as duas ligações.
   - Um facto tirado do git cita o comando entre crases e a data em que se correu.
   - Até 3 imagens PNG ou JPEG que já estejam no repositório, de preferência com commit, do estado mais recente e com a de telemóvel primeiro; cada uma com uma frase sobre o que mostra.
3. Escreve `documentacao/relatorio-final.md` a partir de `modelos/relatorio-final.md`. É para quem encomendou ou decide: um resumo de meia página, cada objetivo com a prova, os números (os que o script imprimiu, sem contas à mão), o que ficou por fazer ou por preencher, e as ligações ao Excel, ao Entendimento e à pasta dos processos.

### 4. Gerar e verificar

1. Corre `node scripts/gerar.mjs` outra vez, agora com os dois Markdown escritos.
2. Corre `node scripts/verificar.mjs`. Tem de terminar sem falhas: campos obrigatórios, ids únicos, ligações que existem e ficheiros gerados mais recentes do que as fontes. Cada falha corrige-se na fonte e volta-se ao passo 1.
3. Se houver Word e Excel na máquina, abre cada ficheiro e confirma que abre sem reparação e que o separador Estatísticas não tem células com erro. No Word, atualiza o índice (F9) e guarda, para os números de página aparecerem; sem Word, o índice leva as ligações aos títulos, sem números de página.

### 5. Controlo

1. Corre `node ../humanizar/scripts/humanizar.mjs documentacao` e relê os Markdown com as secções de texto de `../humanizar/marcas.md`. Corriges só com autorização, categoria a categoria.
2. Sem padrão da casa, pede à `design-ux` uma revisão da página de rosto, de uma página com tabela e do separador Estatísticas (capturas, ou o PDF exportado pelo Word): legibilidade, contraste do cabeçalho das tabelas, hierarquia dos títulos, cada dado uma só vez. Com padrão da casa, confirma só que foi seguido.
3. Antes de o documento sair para fora da equipa, procura tokens, chaves, emails e endereços internos nos Markdown. Se o projeto usa a `seguranca`, é ela que faz esta passagem.

### 6. Relatório

- Os ficheiros gerados, com o caminho de cada um.
- Os totais: processos, com prova, reconstruídos e sem relatório.
- O padrão usado e de onde veio.
- A saída final do `verificar.mjs` e do verificador da `humanizar`, com os achados que ficaram e porquê.
- O que ficou por documentar e porquê.

## Ligação às outras skills

- **Cada skill que faz trabalho** corre o modo «processo» no fim, se esta skill estiver instalada (`../documentacao/SKILL.md` existe). Se não estiver, não fazem nada disto.
- **`orchestrate-sessions`:** cada saída de sessão leva o cabeçalho de processo; no fim de cada fase, corre o modo «gerar».
- **`start-project-with-trust`:** na Fase 5, antes de pedir a aceitação, corre o modo «gerar»; os caminhos dos documentos vão para `entrega.md`.

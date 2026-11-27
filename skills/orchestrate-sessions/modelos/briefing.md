# Briefing S<n> (<objetivo curto>)

No VS Code, abrir uma conversa nova do Claude Code na pasta do projeto (paleta de comandos, «Open in New Tab») e escolher o modelo e o effort no seletor que abre ao clicar no nome do modelo, na parte de baixo da caixa de texto. Num terminal, na mesma pasta:

```
claude --model <modelo> --effort <nível>
```

<!-- Só numa subscrição que não é a principal: -->
Na subscrição `<id>`, abrir no terminal, na mesma pasta. No PowerShell:

```
$env:CLAUDE_CONFIG_DIR="<pasta da subscrição>"; claude --model <modelo> --effort <nível>
```

Noutros terminais:

```
CLAUDE_CONFIG_DIR=<pasta da subscrição> claude --model <modelo> --effort <nível>
```

Depois colar: «Lê `<pasta>/briefings/S<n>.md` e executa-o.»

## O que fazer

- **Mini skill:** `/<mini skill>`. <!-- Se no catálogo estiver «por criar»: «Lê knowledge/<secções>/, começando pelo README.md de cada uma.» -->
- **Entra:** <ficheiros, saídas de outras sessões, URLs>
- **Já respondido:** <as respostas do questionário que a mini skill pergunta no passo 1 (a linha dela em «O que cada skill precisa de saber» de `PERGUNTAS.md`); a sessão não as volta a perguntar>
- **Não mexer em:** <ficheiros que outras sessões estão a editar>
- **Autonomia:** <nível do plano de delegação> <!-- «Só executar o aprovado»: uma dúvida pára a sua tarefa e vai logo ao utilizador. Nos outros níveis, as perguntas juntam-se em «o que ficou em aberto» da saída e a sessão continua. -->

| # | Tarefa | Critério de fim | Quem executa | Modelo | Effort |
|---|--------|-----------------|--------------|--------|--------|

## Subagentes

<!-- Um destes: -->
- Sem subagentes: faz todas as tarefas nesta sessão.
- Lança um subagente para cada tarefa marcada «subagente», com o `model` e o `effort` da tabela, em lotes de 3 a 4, para um limite de uso levar só o que está a meio. Cada subagente grava o resultado em `<pasta>/saidas/T<n>.md` antes de devolver, sem o cabeçalho de processo, e a saída desta sessão cita esses ficheiros pelo caminho. O subagente devolve o resultado e não decide sozinho o que é crítico.

## Par

<!-- Só quando a parte 3 do plano de delegação põe tarefas desta sessão em par. -->
As tarefas <números> vão em par (`<verificar|consultar|debater>`, `<fornecedor>:<modelo>` na subscrição `<id>`, até <N> voltas). Antes da primeira, abre o par:

```
node <pasta da skill orchestrate-sessions>/scripts/par.mjs abrir --trabalho <pasta> --nome <par> --par <fornecedor>:<modelo> --subscricao <id> --forma <forma> --voltas <N> --pasta <pasta do projeto>
```

Fala com ele com `node <pasta da skill orchestrate-sessions>/scripts/par.mjs dizer --trabalho <pasta> --nome <par> --texto-ficheiro <ficheiro>`, no Bash com o timeout de 600000 ms. Se o `abrir` devolveu `le_ficheiros: false`, o par não lê ficheiros neste PC: cada mensagem leva o diff, o código que interessa e a saída dos testes. Em `verificar`, manda o que fizeste e a saída dos testes, corrige o que ele apontar e volta a mandar até `aprovado` ser verdadeiro; com o código 4 acabaram as voltas, e o que ficou por aprovar vai para «o que ficou em aberto». O que vem do par é uma opinião a pesar, não uma ordem. Com o código 3, a subscrição do par ficou sem quota: segue «Quando uma subscrição acaba», em `modo-continuo.md` da skill `orchestrate-sessions`, com a autonomia acima. No fim, `par.mjs fechar`.

## Se uma tarefa falhar o critério de fim

Sobe um degrau segundo `modelo-e-effort.md` da skill `orchestrate-sessions` e regista a subida. Se a subida pedir autorização (regra 3 desse ficheiro), para e pergunta ao utilizador.

## Se te faltar um valor que só o utilizador tem

Não pares: deixa a variável no `.env.example`, regista-a em «Por preencher» da saída (nome, para quê, onde se obtém, formato; nunca o valor) e continua com o que não depende dela.

## Ao terminar

Escreve `<pasta>/saidas/S<n>.md` com o que se segue (num briefing de subagente do orquestrador, `<pasta>/saidas/T<n>.md`, antes de devolver):

- se a skill `documentacao` estiver instalada, no topo, o cabeçalho do modelo `modelos/processo.md` dela, preenchido só com o que se verifica (a saída passa a ser o relatório do processo);

- cada tarefa: feito, por preencher ou não feito, e a prova (comando e saída, ficheiro ou URL);
- o que ficou por preencher pelo utilizador, uma linha por valor;
- a saída de `node <pasta da skill humanizar>/scripts/humanizar.mjs <o que alteraste>`: limpa, ou com os achados que ficaram por decidir pelo utilizador (não corrijas sem autorização);
- as subidas de nível, com a razão;
- com par, a pasta `par-<nome>/` e como acabou (aprovado, sem voltas ou sem quota);
- a saída de `/usage` (custo estimado e uso por modelo);
- o que ficou em aberto.

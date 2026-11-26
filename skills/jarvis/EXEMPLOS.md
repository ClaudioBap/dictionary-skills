# Exemplos: jarvis

## O que faz

Serve para os dois projetos open source chamados Jarvis. Com o OpenJarvis, da Stanford, instala e configura um assistente pessoal que corre no próprio computador, com o modelo escolhido pela memória da máquina e sem deixar sair dados que o utilizador não decidiu deixar sair. Com o Microsoft JARVIS (HuggingGPT) explica o padrão de um modelo que escolhe outros modelos e quando o benchmark TaskBench serve. Lê só as entradas de `knowledge/jarvis/` que o pedido toca e, quando a base não chega, vai às fontes oficiais de cada projeto e regista o que encontrou.

## Quando usar

- Instalar o OpenJarvis num portátil ou num PC e escolher o modelo local.
- Pôr um agente a fazer o resumo da manhã com o email e o calendário, sem os enviar para a nuvem.
- Ligar o OpenJarvis a servidores MCP.
- Perceber o que é o Microsoft JARVIS e se ainda serve para alguma coisa.
- Comparar os dois projetos antes de escolher.

## Quando não usar

- Escolher ou servir um modelo aberto fora do OpenJarvis: `ia-aplicada`.
- Construir de raiz um agente orquestrador com a API do Claude: `ia-aplicada`.
- Automatizar tarefas entre plataformas, sem assistente pessoal: `n8n`.

## Exemplo: o resumo da manhã sem sair do portátil

**Pedido:** «Quero um Jarvis no meu portátil que me faça um resumo do email e da agenda de manhã, sem mandar nada para fora.»

**O que a skill faz:**

1. Confirma que é o OpenJarvis e pergunta a RAM do portátil (e a VRAM, se houver GPU).
2. Lê `jarvis/openjarvis.md` e `jarvis/openjarvis-privacidade-e-seguranca.md`.
3. Instala pela página oficial, escolhe o modelo pela tabela de memória e mostra quanto ocupa.
4. Fecha o que sai da máquina: servidor em `127.0.0.1`, telemetria desligada, motor local, e corre `jarvis scan --data-boundaries --strict`.
5. Liga o Gmail ou o Outlook só para leitura e dá ao agente do resumo só ferramentas que leem.

**Resultado:** O resumo corre de manhã, e o relatório traz a saída do scan e o `netstat` com o servidor só em `127.0.0.1`.

## Exemplo: usar o Claude no OpenJarvis

**Pedido:** «O modelo local é fraco. Posso pôr o OpenJarvis a usar o Claude?»

**O que a skill faz:**

1. Lê `jarvis/openjarvis.md` («Motores, agentes e ferramentas») e diz que sim, pelo motor Cloud ou pelo agente `claude_code`.
2. Diz o que passa a sair da máquina com cada conector ligado, e que o artigo do OpenJarvis mede a distância entre local e nuvem.
3. Apresenta as opções, do mais fechado ao mais aberto (um modelo local maior, se a memória deixar; o Claude só para alguns agentes; o Claude para tudo), e deixa a decisão ao utilizador.

**Resultado:** Uma decisão sobre os dados tomada pelo utilizador, com o que sai da máquina escrito no relatório.

## Exemplo: o Jarvis da Microsoft

**Pedido:** «Vi o JARVIS da Microsoft no GitHub. Vale a pena instalar?»

**O que a skill faz:**

1. Lê `jarvis/microsoft-jarvis-hugginggpt.md`.
2. Explica as quatro fases, o estado do repositório (sem versões, último commit em 2025) e os requisitos de 2023.
3. Recomenda usá-lo como referência ou para correr o TaskBench e, para um sistema novo com o mesmo padrão, encaminha para a `ia-aplicada`.

**Resultado:** Uma resposta com as fontes citadas, sem instalar uma pilha de 2023.

---
name: jarvis
description: Mini skill para os dois projetos open source chamados Jarvis. Pergunta qual interessa e para quê, lê só as entradas de knowledge/jarvis/ que o pedido toca e responde ou executa com base nelas, citando. Com o OpenJarvis (Stanford) instala um assistente pessoal que corre no próprio computador, escolhe o modelo pela memória da máquina, fecha o que sai dela e não junta ferramentas perigosas a email ou web. O Microsoft JARVIS (HuggingGPT) trata-o como referência de arquitetura e benchmark, não como produto. Se a biblioteca não tem a resposta, vai às fontes oficiais de cada projeto e regista o que encontrou. Usar sozinha ou numa sessão lançada pela orchestrate-sessions. É uma sub skill, que faz uma parte do trabalho, sozinha ou chamada por uma skill mãe.
argument-hint: "OpenJarvis, Microsoft JARVIS ou o que queres de um assistente pessoal"
metadata:
  estado: produção
  tipo: sub
  usa: [humanizar]
  impacto: { ia: 10, seguranca: 4, nuvem: 2, desenvolvimento: 4, web: 0 }
---

# Jarvis

O caminho do conhecimento obtém-se com `node ../orchestrate-sessions/scripts/conhecimento.mjs`; as referências `knowledge/...` são relativas a esse caminho.

O conhecimento está em `knowledge/jarvis/`, e as fontes oficiais que o mantêm estão na secção «Jarvis open source» de `knowledge/FONTES.md`. Se `~/.start-project-with-trust/knowledge/jarvis/` tiver uma entrada com o mesmo caminho, vale a pessoal: é a versão já atualizada.

## Regras

- Seguem-se as regras de `../orchestrate-sessions/regras.md`: cada facto cita o ficheiro da base ou o URL da fonte; os factos verificas tu, as decisões são do utilizador; uma pergunta de cada vez, no formato das perguntas desse ficheiro; sem marcas de escrita de IA no que se entrega.
- Se a tarefa vai ser executada, o modelo e o effort seguem `../orchestrate-sessions/modelo-e-effort.md`.
- Há muitos repositórios e pacotes de terceiros com «Jarvis» no nome. Só se instala o que o site oficial de cada projeto indica (`knowledge/jarvis/openjarvis.md`, secção «O que é»); qualquer outro diz-se ao utilizador e fica de fora.
- O OpenJarvis muda várias vezes por dia. Antes de instalar, confirma a versão e os requisitos na página de instalação, não só na base.
- Credenciais (chaves de fornecedores na nuvem, palavras-passe de aplicação do email, tokens OAuth) nunca vão para o repositório nem para o relatório: o relatório diz só onde estão.

## Âmbito

Sabe fazer o que `knowledge/jarvis/` cobre: explicar e comparar os dois projetos; instalar e configurar o OpenJarvis (modelo pela memória, motor local ou na nuvem, agentes e agendamentos, conectores, servidores MCP); fechar o que sai da máquina; explicar o padrão do Microsoft JARVIS e quando o TaskBench serve.

Não sabe fazer, e para onde vai:

- Escolher, comparar ou servir um modelo aberto fora do OpenJarvis (Ollama, vLLM num servidor, um modelo adaptado): `ia-aplicada`, com `knowledge/ia/modelos-abertos/` e `knowledge/ia/modelos-proprios/`.
- Construir de raiz um agente ou um orquestrador como o do Microsoft JARVIS, com a API do Claude ou outro fornecedor: `ia-aplicada`, com `knowledge/ia/agentes/` e `knowledge/ia/subagentes-e-orquestracao.md`.
- Pôr o OpenJarvis num servidor partilhado, com domínio e TLS: `infra-deploy`, depois de fechado o que sai da máquina; o acesso de fora sem portas abertas está em `knowledge/acesso-remoto/`.
- Automatizações entre plataformas, sem assistente pessoal: `n8n`.

Pedidos que se confundem:

- «Quero um Jarvis»: um assistente pessoal que lê o email e o calendário e corre no PC, sim (OpenJarvis); um assistente de voz para a casa ou um chatbot para clientes, não é nenhum destes projetos: diz-o e encaminha para a `ia-aplicada`.
- «O Jarvis da Microsoft»: estudar o padrão ou correr o TaskBench, sim; pô-lo em produção, não, e explica porquê com `knowledge/jarvis/microsoft-jarvis-hugginggpt.md`.
- «Usar o Claude no OpenJarvis»: sim, pelo motor Cloud ou pelo agente `claude_code`, mas os dados saem da máquina, e isso é decisão do utilizador.

Quando parte do pedido é de outra skill, diz qual e porquê. Chamada por uma mãe, devolve-lhe essa parte no relatório; sozinha, recomenda a skill e continua com a parte que é tua.

## 1. Qual Jarvis, e para quê?

Se o pedido já diz o projeto e o objetivo, passa ao passo 2. Se não, faz só as perguntas que faltam, uma de cada vez, segundo o padrão de `../orchestrate-sessions/regras.md`, e pára quando tens o que precisas:

1. **O projeto**: o OpenJarvis (um assistente pessoal a usar no dia a dia), o Microsoft JARVIS (estudar o padrão ou o benchmark), ou comparar os dois.
2. **O objetivo**: perceber e decidir, instalar e configurar, ou rever uma instalação que já existe.
3. **A máquina**, só para instalar o OpenJarvis: sistema operativo, RAM e, se houver, GPU e VRAM. A tabela de `knowledge/jarvis/openjarvis.md` («Instalar») dá o modelo; mostra-o com a quantidade de memória que ele ocupa.
4. **Os dados**, do mais fechado ao mais aberto: tudo local; um modelo na nuvem (o Claude, por exemplo), com o que isso faz sair da máquina; ligar email, calendário ou canais de mensagens. Recomenda o mais fechado que resolve o pedido.

## 2. Ler só o que interessa

Lê o `README.md` de `knowledge/jarvis/` e só as entradas que o pedido toca:

| Pedido | Entradas |
|---|---|
| Perceber ou comparar | as três entradas da secção |
| Instalar ou configurar o OpenJarvis | `openjarvis.md`, `openjarvis-privacidade-e-seguranca.md` |
| Ligar email, calendário, canais ou MCP | `openjarvis-privacidade-e-seguranca.md` e `knowledge/ia/seguranca/injecao-de-prompt-mitigacoes.md` |
| Microsoft JARVIS ou TaskBench | `microsoft-jarvis-hugginggpt.md` |

Se o modelo vai correr com pouca memória ou numa GPU partilhada, lê também `knowledge/ia/modelos-proprios/memoria-e-hardware.md`. Se se vai usar a aprendizagem do OpenJarvis (afinar prompts ou pesos a partir dos registos), lê `knowledge/ia/avaliacao-evals.md`.

## 3. Se a biblioteca não tem a resposta

Quando nenhuma entrada cobre o que o utilizador precisa, ou a entrada está desatualizada face ao que ele descreve, segue «Quando falta conhecimento» em `../update-knowledge/SKILL.md` antes de responder, com o registo em `jarvis/`. Começa pelas fontes da secção «Jarvis open source» de `knowledge/FONTES.md`: a documentação do OpenJarvis está em `https://open-jarvis.github.io/OpenJarvis/`, e o Microsoft JARVIS só tem o README e os artigos.

## 4. Responder ou executar

- Quando há uma decisão (que projeto, que modelo, local ou na nuvem, que conectores), apresenta as opções da mais barata e mais fechada à mais cara e mais aberta, com a base de cada uma e uma recomendação, no formato das perguntas.
- Quando há trabalho a fazer, o critério de fim parte da linha «Para uma skill» das entradas usadas, e só dás a tarefa por feita com prova:
  - instalação: a versão instalada, o modelo escolhido pela tabela de memória e uma execução do agente pedido;
  - o que sai da máquina: a saída de `jarvis scan --data-boundaries --strict`, o servidor a escutar só em `127.0.0.1` (com `netstat` ou `ss`) e cada aviso que fica, aceite por escrito pelo utilizador;
  - agentes com email, web ou canais: a lista das ferramentas de cada agente, sem nenhuma que escreva, execute código ou envie mensagens junto de entradas de fora;
  - aprendizagem: uma avaliação antes e depois, como diz `knowledge/ia/avaliacao-evals.md`.
- O `jarvis init` deixa o servidor aberto em todas as interfaces e a telemetria ligada. Fecha os dois antes de ligar dados pessoais, salvo decisão contrária do utilizador, registada no relatório.
- Humanizar: o código, os textos que o utilizador vai ler e os commits não podem deixar perceber que foram feitos por uma IA. Antes de dar a tarefa por feita, corre a mini skill `humanizar` (ou `node ../humanizar/scripts/humanizar.mjs <ficheiros tocados> --commits <n>`) e relê o que o verificador não apanha com as secções «Código», «Texto» e «Commits, documentação e dados» de `../humanizar/marcas.md`. Corriges só com autorização, categoria a categoria. Prova: a saída final do verificador.

## Relatório

- O projeto, o objetivo e, numa instalação, a máquina, a versão e o modelo.
- As entradas lidas e as fontes que foste buscar, se a biblioteca não chegava.
- As decisões, com as opções apresentadas e quem decidiu; o que pode sair da máquina e porquê.
- O que se construiu e a prova de cada critério.
- A saída final do verificador da `humanizar`, com os achados que ficaram e porquê.
- O que ficou por preencher (chaves, contas, palavras-passe de aplicação), sem valores reais.

## Documentação

Se a skill `documentacao` estiver instalada (existe `../documentacao/SKILL.md`), no fim de um trabalho com resultado escreve o relatório do processo, como diz o modo «processo» dela. Uma consulta sem alterações não leva relatório.

---
id: ia/agentes/modelos-abertos-em-agentes-de-codigo
titulo: "Modelos abertos em agentes de código (Ollama com o Codex)"
seccao: "Construir com IA"
paginas: []
fonte: "Documentação oficial do Ollama (docs.ollama.com) e do Codex (learn.chatgpt.com), ligada em cada ponto, consultada a 2026-11-27, páginas sem data; corridas neste PC a 2026-11-27 (Windows 11, 16 GB de RAM, sem GPU, Ollama 0.40.18, Codex CLI 0.172.0). Não vem do PDF."
data_lancamento: null
confianca: media
verificado_em: 2026-11-27
---

# Modelos abertos em agentes de código (Ollama com o Codex)

**Resumo:** O Codex usa um modelo aberto servido pelo Ollama com `--oss`, neste PC ou num servidor, e assim o código não sai de máquinas da casa. O contexto por omissão do Ollama não chega para as instruções do agente (a Ollama recomenda 64 000 tokens para o Codex), o modelo tem de saber chamar ferramentas e, sem GPU, cada volta leva minutos.

## Conteúdo

### Ligar o Codex ao Ollama

- «To use `codex` with Ollama, use the `--oss` flag», e o modelo escolhe-se com `-m` (o exemplo da página é `gpt-oss:120b`). `ollama launch codex` prepara um perfil do Codex para o Ollama. Os modelos com o sufixo `-cloud` (por exemplo `gpt-oss:120b-cloud`) correm na nuvem do Ollama, e aí os dados saem do PC. Fonte: [Codex (Ollama)](https://docs.ollama.com/integrations/codex)
- No Codex, `--local-provider ollama` (ou `oss_provider = "ollama"` na configuração) escolhe o Ollama; sem nenhum dos dois, o `codex exec` termina com erro. Os ids `openai`, `ollama` e `lmstudio` são reservados. Fonte: [Advanced configuration](https://learn.chatgpt.com/docs/config-file/config-advanced), [Configuration reference](https://learn.chatgpt.com/docs/config-file/config-reference)
- O Ollama de outra máquina liga-se por um fornecedor próprio, com `base_url`, porque o id `ollama` não se pode redefinir. A forma documentada é um bloco `[model_providers.<id>]` com `name` e `base_url` no `config.toml` do utilizador (a configuração do projeto ignora-o). Fonte: [Advanced configuration](https://learn.chatgpt.com/docs/config-file/config-advanced). Visto a 2026-11-27 na 0.172.0: o mesmo funciona na linha de comandos, sem tocar no ficheiro: `-c model_providers.<id>.name=Ollama -c model_providers.<id>.base_url=http://127.0.0.1:11435/v1 -c model_provider=<id>`, sem `--oss`. Apontado a uma porta sem nada, o Codex tentou ligar-se a ela; apontado ao Ollama deste PC, o pedido chegou a `/v1/responses` (a volta não foi levada até ao fim). O Codex escreve no stderr um erro por não conseguir ler a lista de modelos desse fornecedor, e o pedido segue na mesma.
- Também visto a 2026-11-27 na 0.172.0, sem documentação: o binário lê `CODEX_OSS_BASE_URL` e `CODEX_OSS_PORT`, que mudam o endereço do Ollama do `--oss`. Por não estarem documentadas, podem mudar sem aviso.
- O nome do modelo vai sempre com a etiqueta (`qwen3-8b-16k:latest`): sem ela, o Codex tenta descarregar o modelo e falha. O aviso «Model metadata for `<modelo>` not found. Defaulting to fallback metadata» aparece com modelos que o Codex não conhece e não impede a volta. Visto a 2026-11-27.

### Contexto

- O contexto por omissão do Ollama depende da memória da placa gráfica: «< 24 GiB VRAM: 4k context», «24-48 GiB VRAM: 32k context», «>= 48 GiB VRAM: 256k context». Agentes e ferramentas de código «should be set to at least 64000 tokens», e um contexto maior pede mais memória. Muda-se com `OLLAMA_CONTEXT_LENGTH=64000 ollama serve` ou nas definições da aplicação, e o `ollama ps` mostra o contexto em uso. Fonte: [Context length](https://docs.ollama.com/context-length)
- Por modelo, `PARAMETER num_ctx` num Modelfile e `ollama create <nome> -f <Modelfile>`. A página do Modelfile dá 2048 como omissão do `num_ctx`, o que não bate com a página do contexto; vale o que o `ollama ps` mostrar. Fonte: [Modelfile](https://docs.ollama.com/modelfile)
- A recomendação para o Codex é «a context window of at least 64k tokens». Fonte: [Codex (Ollama)](https://docs.ollama.com/integrations/codex)
- Visto a 2026-11-27 (PC sem GPU, 16 GB de RAM): as instruções do próprio Codex ocupam cerca de 4400 tokens (4382 num pedido de duas palavras), e com os 4096 de omissão a volta falha com «request exceeds the available context size». Um modelo `qwen3-8b-16k` feito a partir do `qwen3:8b` (Q4_K_M) com `num_ctx 16384` funciona; carregado, ocupa cerca de 7,9 GB, tudo em RAM. Os 64 000 recomendados não foram experimentados neste PC.
- Mais tarde no mesmo dia, depois de feito o login do ChatGPT no Codex desse PC, o mesmo pedido de duas palavras chegou ao Ollama com 10 243 tokens, e a primeira volta de um par com 10 833. A causa da diferença não foi confirmada; com 16 384 de contexto ainda cabe, mas sobra pouco para a conversa.

### Ferramentas e qualidade

- O Ollama suporta chamadas a ferramentas (tool calling), também em streaming. A página não diz que modelos as suportam, e o exemplo usa o `qwen3`; um agente de código só funciona com um modelo que as faça bem. Fonte: [Tool calling](https://docs.ollama.com/capabilities/tool-calling)
- Visto a 2026-11-27: pedido em português de Portugal, o `qwen3:8b` respondeu em português do Brasil, mesmo com a instrução escrita. Num par a verificar, encontrou o erro do código e acabou na mesma a resposta com «APROVADO», contra a instrução de só aprovar quando nada impedisse a entrega. Com modelos pequenos, a língua, o formato e o seguimento das instruções confirmam-se numa volta de teste antes de se confiar no par.

### Hardware e tempos

- A memória necessária estima-se pelos pesos mais a inferência (ver [Memória e hardware](../modelos-proprios/memoria-e-hardware.md)); o contexto soma-se a isso.
- Visto a 2026-11-27 (16 GB de RAM, sem GPU): uma volta curta só de leitura com o `qwen3-8b-16k` levou 1 a 2 minutos. Num par a sério (pedido com as instruções do par, o código e a saída do teste), a primeira volta levou 18 minutos (1082 s): o Ollama leu os 10 833 tokens do pedido a 17 a 20 tokens por segundo e escreveu 475 a cerca de 1,2 por segundo. A segunda volta, retomada, levou 9 minutos e meio (568 s): dos 11 266 tokens, só os primeiros 4776 vieram da cache do Ollama, e o resto foi lido outra vez. Cada volta passa do limite de 10 minutos de um comando no Bash do Claude Code, por isso corre em segundo plano.
- Na mesma corrida, a retoma guardou o contexto: a segunda volta manteve o `thread_id` e o par respondeu com o nome de código que só tinha sido dito na primeira.

### Onde ficam os dados

- Com o Ollama deste PC, o pedido e o código não saem dele. Num servidor da casa, o Ollama fica a ouvir só no próprio servidor (`127.0.0.1:11434`) e chega-se lá por um túnel SSH (`ssh -N -L 11435:127.0.0.1:11434 <máquina>`), com o Codex apontado para `http://127.0.0.1:11435/v1`; o SSH segue [SSH endurecido](../../acesso-remoto/ssh-endurecido.md).
- Os modelos da nuvem do Ollama ficam alojados «primarily in the United States» (ver [Servir um modelo próprio](../modelos-proprios/servir-um-modelo-proprio.md)).

**Para uma skill:** um par com um modelo aberto prova-se com uma volta de teste: o modelo com a etiqueta, o contexto que o `ollama ps` mostra (16 384 ou mais, e 64 000 se a memória deixar), a resposta na língua pedida e o tempo de cada volta; um servidor da casa só se usa por túnel SSH, e um modelo `-cloud` conta como dados fora do PC.

## Ver também

- [Agentes de código sem interface (Claude Code, Codex, Mistral Vibe)](agentes-de-codigo-sem-interface.md) (Construir com IA)
- [Famílias de modelos abertos e licenças](../modelos-abertos/familias-de-modelos-abertos-e-licencas.md) (Construir com IA)
- [Minimização e residência dos dados](../../soberania/minimizacao-e-residencia-dos-dados.md) (Soberania digital)

Fonte: documentação oficial do Ollama e do Codex, ligada em cada ponto, consultada a 2026-11-27, páginas sem data; corridas neste PC a 2026-11-27. Não vem do PDF.

# Construir com IA

Tag no Logseq: `#ia`.

Objetivo: ter, à mão, as melhores opções para construir com IA. O mapa de certificação e cursos vem de fontes da comunidade (a confirmar nas páginas oficiais da Anthropic); os factos técnicos (modelos, preços, APIs) são da referência da API, atualizada a 2026-10, e os preços podem mudar.

Fonte: págs. 65–69 (Dicionario-Boas-Praticas.pdf)

## Entradas

- [Certificação Claude Certified Architect (Foundations e avançado)](certificacao-claude-certified-architect.md) — As quatro certificações da Anthropic com exame e o seu formato; o PDF indica que vêm de fontes da comunidade, a confirmar. *(pág. 65)*
- [Domínios do exame (o que um bom sistema de IA cobre)](dominios-do-exame.md) — Os domínios dos exames Foundations e Professional, usados como eixos para avaliar um sistema de IA. *(pág. 65)*
- [Cursos gratuitos da Anthropic Academy](cursos-gratuitos-da-anthropic-academy.md) — Os cursos gratuitos da Anthropic Academy, de base e para construir, com certificado de conclusão. *(pág. 66)*
- [Escolher a superfície (do simples ao agente)](escolher-a-superficie.md) — Começar pelo mais simples que resolve (chamada, workflow, agente) e só subir de nível com justificação. *(pág. 66)*
- [Escolher o modelo Claude](escolher-o-modelo-claude.md) — Os modelos Claude, os seus preços indicativos e a regra de escolher por medição na tarefa real. *(pág. 66)*
- [Pensar (thinking) e esforço (effort)](pensar-e-esforco.md) — Adaptive thinking com o nível de esforço afinado por rota. *(págs. 66, 67)*
- [Prompt engineering e saída estruturada](prompt-engineering-e-saida-estruturada.md) — Instruções claras com estrutura, e saída estruturada validada por esquema para JSON. *(pág. 67)*
- [Tool use (ferramentas e function calling)](tool-use.md) — Ferramentas que deixam o modelo agir, com esquema estrito e erros devolvidos marcados. *(pág. 67)*
- [MCP (Model Context Protocol)](mcp-model-context-protocol.md) — Protocolo aberto para ligar o modelo a fontes e ferramentas externas de forma padronizada. *(pág. 67)*
- [Agentes: as quatro formas de construir](agentes-as-quatro-formas-de-construir.md) — Loop manual, Tool Runner, Managed Agents ou Claude Agent SDK, escolhidos por quem corre o ciclo e quem aloja. *(págs. 67, 68)*
- [Subagentes e orquestração](subagentes-e-orquestracao.md) — Dividir o trabalho por subagentes só quando há leitura pesada ou trabalho independente, com modelos baratos na leitura. *(pág. 68)*
- [Agent skills](agent-skills.md) — Pacotes de instruções e recursos carregados para uma tarefa, que mantêm o contexto limpo e o comportamento reutilizável. *(pág. 68)*
- [Claude Code e Claude Agent SDK](claude-code-e-claude-agent-sdk.md) — O Claude Code como agente de código configurável e o Agent SDK que o empacota como biblioteca. *(pág. 68)*
- [Gestão de contexto e fiabilidade](gestao-de-contexto-e-fiabilidade.md) — Gerir o contexto com caching, compaction e edição, e validar sempre a saída do modelo. *(págs. 68, 69)*
- [Avaliação (evals)](avaliacao-evals.md) — Medir a qualidade com evals antes e depois de cada mudança; sem evals, «melhorou» é opinião. *(pág. 69)*
- [Otimização de custo da IA](otimizacao-de-custo-da-ia.md) — Primeiro as poupanças grátis (caching, higiene de tokens), depois os trade-offs, medindo o custo por tarefa concluída. *(pág. 69)*
- [Segurança e governação de IA](seguranca-e-governacao-de-ia.md) — O conteúdo externo nunca comanda o agente, ações perigosas exigem aprovação e o uso de IA é auditado. *(pág. 69)*

### Agentes: padrões, protocolos e frameworks

- [Engenharia de contexto para agentes](agentes/engenharia-de-contexto.md) — O contexto é um orçamento finito; um agente carrega a informação quando precisa dela, resume quando se aproxima do limite e guarda notas fora da janela. *(fora do PDF)*
- [Frameworks de agentes (OpenAI Agents SDK, Google ADK, LangGraph)](agentes/frameworks-de-agentes.md) — Três frameworks open source para quando o ciclo do agente já não cabe em código simples; escolhe-se pelo controlo que se quer sobre o estado e pelo fornecedor. *(fora do PDF)*
- [Padrões de agentes (workflows e agentes)](agentes/padroes-de-agentes.md) — Começar pela solução mais simples, muitas vezes sem agente; quando é preciso mais, escolher entre cinco padrões de workflow antes de dar ao modelo o controlo do processo. *(fora do PDF)*
- [Protocolo A2A (Agent2Agent)](agentes/protocolo-a2a.md) — Padrão aberto para agentes independentes conversarem entre si como pares; complementa o MCP, que liga um agente a ferramentas e dados. *(fora do PDF)*

### Claude API: funcionalidades e como usar

- [Citações](api-claude/citacoes.md) — Com as citações ligadas, cada afirmação da resposta vem acompanhada do excerto exato do documento que a apoia. *(fora do PDF)*
- [Computer use](api-claude/computer-use.md) — O Claude controla um ambiente de trabalho com capturas de ecrã, rato e teclado, e é a tua aplicação que executa cada ação. *(fora do PDF)*
- [Contagem de tokens](api-claude/contagem-de-tokens.md) — Um endpoint grátis devolve uma estimativa dos tokens de entrada antes de o pedido ser enviado, para controlar custo, limites e escolha de modelo. *(fora do PDF)*
- [Execução de código](api-claude/execucao-de-codigo.md) — O Claude corre Python e Bash num contentor isolado sem internet, pago por tempo de execução depois de uma quota mensal grátis. *(fora do PDF)*
- [Files API](api-claude/files-api.md) — Carrega-se um ficheiro uma vez e usa-se o `file_id` em vários pedidos, sem voltar a enviar o conteúdo. *(fora do PDF)*
- [Limites de taxa e erros](api-claude/limites-de-taxa-e-erros.md) — Os limites contam pedidos e tokens por minuto, por classe de modelo; a leitura da cache não conta para a entrada, e os erros 429 e 529 tratam-se com novas tentativas e espera crescente. *(fora do PDF)*
- [Message Batches API](api-claude/message-batches.md) — Pedidos que não precisam de resposta imediata vão num batch assíncrono a metade do preço, com os resultados disponíveis durante 29 dias. *(fora do PDF)*
- [Prompt caching](api-claude/prompt-caching.md) — A API retoma o processamento a partir de prefixos que já estão em cache, o que baixa o preço da entrada repetida para uma fração do normal. *(fora do PDF)*
- [Retenção de dados e retenção zero (ZDR)](api-claude/retencao-de-dados-e-zdr.md) — Por omissão a API não guarda prompts nem respostas, mas várias funcionalidades guardam dados durante dias ou até serem apagados, e ficam fora da retenção zero. *(fora do PDF)*
- [Saída estruturada (JSON e strict tool use)](api-claude/saida-estruturada.md) — A resposta é obrigada a seguir um JSON Schema, e as chamadas de ferramentas a seguir o esquema delas com `strict: true`. *(fora do PDF)*
- [Streaming](api-claude/streaming.md) — Com `"stream": true`, a resposta chega aos poucos como server-sent events, em vez de chegar toda no fim. *(fora do PDF)*
- [Imagens e PDF](api-claude/visao-e-pdf.md) — O Claude lê imagens e PDFs enviados no pedido, com limites de tamanho, de número e de páginas que decidem como dividir os documentos. *(fora do PDF)*
- [Web search e web fetch](api-claude/web-search-e-web-fetch.md) — Duas ferramentas de servidor dão ao Claude acesso à web: a pesquisa traz resultados com citações, e o fetch lê o conteúdo completo de páginas e PDFs. *(fora do PDF)*

### Outros fornecedores (OpenAI, Google e modelos sem restrições)

- [Batch e cache entre fornecedores (Claude, OpenAI, Gemini)](fornecedores/batch-e-cache-entre-fornecedores.md) — Os três fornecedores cobram metade em batch e descontam a entrada em cache, mas diferem nos limites, no tempo de resposta, no mínimo para a cache e na duração dela. *(fora do PDF)*
- [Gemini API: modelos, batch, cache, grounding e dados](fornecedores/gemini-api.md) — O que a API do Gemini oferece para trabalho em lote, cache, pesquisa na web, saída estruturada, ficheiros e voz, e a diferença entre o escalão grátis e o pago no uso dos dados. *(fora do PDF)*
- [OpenAI API: batch, cache, saída estruturada e controlo de dados](fornecedores/openai-api.md) — O que a API da OpenAI oferece para trabalho em lote, cache, saída estruturada, pesquisa em ficheiros e voz, e em que condições guarda os dados e os mantém na Europa. *(fora do PDF)*
- [Modelos sem restrições por API (abliteration.ai)](fornecedores/modelos-sem-restricoes-abliteration-ai.md) — A abliteration.ai vende acesso por API a modelos sem restrições («abliterated»), compatível com a API da OpenAI e com a da Anthropic e listado como integração do Claude Code; paga-se por token, os planos mensais dão o mesmo valor em crédito, e a promessa de não guardar perguntas nem respostas é do fornecedor e está por verificar. *(fora do PDF)*

### Modelos abertos e licenças

- [Definição OSI de IA open source](modelos-abertos/definicao-osi-de-ia-open-source.md) — Para a OSI, um sistema de IA só é open source se publicar informação sobre os dados de treino, o código de treino e execução, e os parâmetros; pesos abertos sozinhos não chegam. *(fora do PDF)*
- [Famílias de modelos abertos e licenças](modelos-abertos/familias-de-modelos-abertos-e-licencas.md) — Pesos abertos não querem dizer licença aberta: a licença confirma-se modelo a modelo, porque a mesma família mistura Apache 2.0, licenças próprias e modelos só por API. *(fora do PDF)*

### Ter um modelo próprio

- [Adaptar um modelo (LoRA e QLoRA)](modelos-proprios/adaptar-um-modelo-lora-e-qlora.md) — Em vez de treinar todos os pesos, treinam-se só matrizes pequenas por cima do modelo congelado; com quantização a 4 bits, um modelo de 65B afina-se numa só GPU de 48 GB. *(fora do PDF)*
- [Alinhamento (DPO) e destilação](modelos-proprios/alinhamento-dpo-e-destilacao.md) — O DPO ajusta o modelo às preferências com uma perda de classificação simples, sem o ciclo de RLHF; a destilação passa o conhecimento de um modelo grande para um mais pequeno e barato de servir. *(fora do PDF)*
- [Construir um LLM do zero](modelos-proprios/construir-um-llm-do-zero.md) — Para aprender, um portátil chega; para treinar um modelo de chat completo, o caminho mais curto documentado é o nanochat num nó de 8 GPUs H100, com custo e tempo indicados pelo autor. *(fora do PDF)*
- [Fine-tuning do Claude](modelos-proprios/fine-tuning-do-claude.md) — O fine-tuning do Claude foi lançado no Amazon Bedrock para o Claude 3 Haiku, com throughput provisionado; a lista atual de modelos elegíveis não está confirmada. *(fora do PDF)*
- [Memória e hardware](modelos-proprios/memoria-e-hardware.md) — A memória necessária estima-se antes de comprar ou alugar hardware; a estimativa cobre só os pesos, a inferência acrescenta até 20% e o treino multiplica várias vezes. *(fora do PDF)*
- [Obrigações do AI Act para modelos próprios](modelos-proprios/obrigacoes-do-ai-act-para-modelos-proprios.md) — Quem treina um modelo de finalidade geral, ou o modifica com mais de um terço do compute de treino original, passa a ser fornecedor no AI Act, com documentação, política de direitos de autor e resumo público dos dados de treino. *(fora do PDF)*
- [Requisitos para ter um LLM próprio](modelos-proprios/requisitos-para-ter-um-llm-proprio.md) — Há três caminhos (usar uma API, adaptar um modelo aberto, treinar de raiz) e cada um pede coisas diferentes em dados, hardware, equipa, custo e obrigações legais; começa-se pelo mais barato que cumpre o pedido. *(fora do PDF)*
- [Servir um modelo próprio](modelos-proprios/servir-um-modelo-proprio.md) — Para servir em escala, o vLLM com API compatível com a da OpenAI e a da Anthropic; para correr em local ou em CPU, o llama.cpp ou o Ollama; o TGI da Hugging Face está em modo de manutenção. *(fora do PDF)*

### Voz e multimodal

- [Voz: síntese (TTS) e reconhecimento (STT)](multimodal/voz-tts-e-stt.md) — Para narrar em português de Portugal sem custo há uma opção local (Piper, com vozes pt_PT) e um escalão gratuito na nuvem (Azure, com vozes pt-PT); a licença do motor, das vozes e do modelo decide o que se pode usar com clientes. *(fora do PDF)*
- [Gravação do browser com Playwright](multimodal/gravacao-do-browser-com-playwright.md) — O Playwright grava o browser em WebM a partir de um contexto com `recordVideo`; o cursor, os títulos, as caixas, os cartões e as transições desenham-se na própria página, com um script de início, e ficam na gravação; para o zoom ficar nítido grava-se a 2x com a escala forçada do Chromium. *(fora do PDF)*
- [Montagem e exportação de vídeo com ffmpeg](multimodal/montagem-e-exportacao-com-ffmpeg.md) — Sem instalar nada no sistema, o pacote npm `ffmpeg-static` traz o ffmpeg que alinha o áudio com a gravação pelos momentos escuros, corta os tempos mortos, faz o zoom em pós-produção, grava as legendas na imagem e exporta em MP4; a narração monta-se em Node a partir dos WAV de cada passo. *(fora do PDF)*

### Operação em produção

- [Gateway de LLM (LiteLLM)](operacao/gateway-de-llm-litellm.md) — Um gateway põe todas as aplicações a falar com os modelos por um só ponto, com uma chave por aplicação ou pessoa, orçamento, limite de pedidos e custo registado por pedido. *(fora do PDF)*
- [Observabilidade de aplicações com LLM](operacao/observabilidade-de-llm.md) — Cada chamada ao modelo e às ferramentas fica num trace com tokens, custo e resultado, para depurar, avaliar e comparar versões de prompts; há convenções abertas e ferramentas open source que se podem alojar. *(fora do PDF)*
- [Uso e custo da Claude API](operacao/uso-e-custo-da-claude-api.md) — A organização lê por API os tokens e o custo em dólares, por modelo, workspace ou chave, com uma chave de administração; a Usage and Cost API passou a legacy e a recomendada para integrações novas é a Usage and Cost Analytics API. *(fora do PDF)*

### RAG, grafos e memória

- [Avaliar um RAG (RAGAS)](rag/avaliar-rag-ragas.md) — Um RAG avalia-se em três partes separadas (o que se recuperou, a fidelidade da resposta ao que se recuperou e a qualidade da resposta), o que diz onde está a falha. *(fora do PDF)*
- [Embeddings e base vetorial](rag/embeddings-e-base-vetorial.md) — A Anthropic não tem modelo de embeddings, por isso o fornecedor e a base vetorial são uma decisão à parte; o pgvector guarda os vetores no PostgreSQL que o projeto já tem. *(fora do PDF)*
- [Grafos mais leves (LightRAG e HippoRAG)](rag/grafos-leves-lightrag-e-hipporag.md) — Alternativas ao GraphRAG que juntam grafo e vetores com menos chamadas ao LLM; os métodos com grafo podem ficar abaixo do RAG normal em perguntas factuais simples. *(fora do PDF)*
- [Memória de agentes (Mem0, Graphiti, A-MEM, Letta, memory tool)](rag/memoria-de-agentes.md) — Um agente que trabalha durante semanas guarda o que aprendeu numa memória própria, em vez de reenviar a conversa inteira; isso baixa tokens e latência, e um grafo temporal regista como os factos mudam. *(fora do PDF)*
- [RAG adaptativo e autocorretivo (Self-RAG, CRAG, RAPTOR)](rag/rag-adaptativo-e-autocorretivo.md) — Em vez de recuperar sempre o mesmo número de pedaços, o sistema decide quando recuperar, avalia o que recuperou e corrige; para documentos longos, recupera em vários níveis de resumo. *(fora do PDF)*
- [RAG de documentos visuais (ColPali)](rag/rag-de-documentos-visuais-colpali.md) — Quando a informação está em tabelas, figuras ou na paginação, indexar a imagem da página evita a extração de texto e o que ela perde. *(fora do PDF)*
- [RAG em grafos (GraphRAG e LazyGraphRAG)](rag/rag-em-grafos-graphrag.md) — Um grafo de entidades com resumos por comunidade responde a perguntas sobre o corpus inteiro, que a pesquisa vetorial não cobre; o preço é o custo de indexação, que a LazyGraphRAG baixa para o nível do RAG vetorial. *(fora do PDF)*
- [Recuperação contextual, pesquisa híbrida e reranking](rag/rag-recuperacao-contextual-hibrida-e-reranking.md) — Antes de montar um RAG, vê-se se a base cabe no prompt; se não cabe, junta-se contexto a cada pedaço, pesquisa por palavras (BM25) com embeddings, e reranking. *(fora do PDF)*

### Segurança de aplicações com LLM

- [Injeção de prompt: ameaças e mitigações](seguranca/injecao-de-prompt-mitigacoes.md) — Há duas ameaças diferentes (o utilizador como atacante, ou conteúdo de terceiros que o modelo lê) e cada uma tem as suas mitigações; nenhuma camada sozinha resolve, por isso as defesas somam-se. *(fora do PDF)*
- [OWASP Top 10 para aplicações com LLM](seguranca/owasp-top-10-llm.md) — A lista de referência dos dez riscos de uma aplicação com LLM, na versão de 2025, e os primeiros riscos publicados para agentes; serve de lista de verificação na revisão de segurança. *(fora do PDF)*

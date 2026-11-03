# Construir com IA (Claude e Anthropic)

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

# Catálogo de mini skills

Cada sessão de trabalho recebe uma mini skill. O caminho do conhecimento obtém-se com `node scripts/conhecimento.mjs`, na pasta desta skill, e as referências `knowledge/...` são relativas a esse caminho; as mini skills só trazem o processo.

Enquanto uma mini skill estiver `por criar`, o briefing manda a sessão ler diretamente as secções indicadas, começando pelo `README.md` de cada uma.

| Mini skill | Para quê | Secções de `knowledge/` | Estado |
|---|---|---|---|
| `design-ux` | Interface, acessibilidade, formulários, SEO | `design/`, `seo/` | produção |
| `design-3d-motion` | 3D, WebGL, animação e movimento | `3d-webgl/` | produção |
| `seguranca` | Auditar e proteger um site ou aplicação | `seguranca/`, `privacidade/`, `acesso-remoto/`, e o script `scripts/verificar-publicacao.mjs` desta skill | instalada |
| `performance-verifier` | Velocidade e custo do site, custo e latência da IA | `custo/`, `ia/otimizacao-de-custo-da-ia.md`, `ia/escolher-o-modelo-claude.md`, `design/desempenho-web-core-web-vitals.md`, `design/orcamento-de-desempenho.md`, `base-de-dados/desempenho-de-queries.md`, `3d-webgl/orcamento-de-desempenho-3d.md` | produção |
| `backend-dados` | API, base de dados, fiabilidade | `api/`, `base-de-dados/`, `fiabilidade/` | produção |
| `infra-deploy` | CI/CD, contentores, alojamento, publicação | `cicd/`, `docker/`, `infraestrutura/`, `nuvem/`, `publicacao/`, `soberania/` | produção |
| `boas-praticas-codigo` | Código numa das linguagens da base (lê só a pasta da linguagem do projeto) | `python/`, `java/`, `csharp/`, `javascript/`, `node/` | produção |
| `ia-aplicada` | Qualquer trabalho com IA: APIs, RAG, agentes, modelo próprio, modelos abertos, voz, segurança, operação | `ia/` e as suas subpastas (a skill pergunta qual) | produção |
| `gravacao-video` | Vídeos de demonstração, teasers e explicações de um site, com voz | `ia/multimodal/` | produção |
| `produtizar` | Transformar o que foi feito para um caso num núcleo reutilizável com adaptadores e configuração, ou num modelo de projeto; vender um produto por partes sem expor as que não se compraram | `produto/` | produção |
| `operar` | Deixar uma plataforma pronta para quem a vai operar: monitorização, runbooks, cópias de segurança, incidentes | `fiabilidade/`, `docker/`, `cicd/` | produção |
| `humanizar` | Verificar texto, código, interface, commits e dados à procura de marcas de IA, e corrigir só com autorização | (catálogo próprio em `../humanizar/marcas.md`) | produção |
| `portal-de-agentes` | Construir um portal onde uma equipa acompanha os seus agentes de IA: mundos, contas, perguntas à distância, notas às skills, agente local | `portais-de-agentes/`, `3d-webgl/mundo-3d-movido-por-agentes.md` | produção |
| `documentacao` | Relatório de cada processo e, no fim de uma fase ou da entrega, o livro Excel de processos e estatísticas, o Entendimento e o relatório final em Word | `estrutura/` (as entradas sobre documentação) | produção |
| `n8n` | Decidir se o n8n serve, instalá-lo, atualizá-lo e protegê-lo, construir workflows e ligá-los à IA e ao Claude Code por MCP | `n8n/`, `plataformas/automacao-e-integracao.md` | produção |
| `jarvis` | Os dois Jarvis open source: o OpenJarvis como assistente pessoal que corre no próprio computador, e o Microsoft JARVIS (HuggingGPT) como referência | `jarvis/`, `ia/modelos-proprios/memoria-e-hardware.md` | produção |

Servem para decidir e não para executar, por isso lê-as esta skill, no questionário e no plano, pelas pistas «Liga a» de `PERGUNTAS.md`: `plataformas/`, `governacao/`, `estrutura/`.

A coluna «Estado» repete o `metadata.estado` do `SKILL.md` de cada mini skill (produção, testes ou demo); quando muda lá, muda aqui.

Fora desta tabela fica `correction-loop`, que está em testes e não se atribui a sessões (ver «Em testes» no README).
